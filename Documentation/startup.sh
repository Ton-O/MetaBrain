#!/bin/bash

# --- CONFIGURATION ---
ENV_PATH="../NEEOENV/.env"
CONTAINER_NAME="BrainMetaBeta"
WIFI_MAC="54:e6:fA:13:11:f3"

# 1. Check if the .env file exists
if [ ! -f "$ENV_PATH" ]; then
    echo "Error: .env file not found at: $ENV_PATH"
    exit 1
fi

# 2. Cleanup Docker and Pull Latest Image
echo "Stopping old containers..."
docker compose --env-file "$ENV_PATH" down

echo "Pulling new image version..."
docker compose --env-file "$ENV_PATH" pull

# 3. Start the Container
echo "Starting Docker Compose..."
docker compose --env-file "$ENV_PATH" up -d

echo "Waiting for container initialization..."
sleep 2

# 4. Hardware Reset of the WiFi Stick on the Host
echo "Resetting Atheros driver on host..."
sudo modprobe -r ath9k_htc 2>/dev/null && sleep 1 && sudo modprobe ath9k_htc
sleep 3 # Wait for the USB bus to re-detect the stick

# 5. Get the new PID of the fresh container
PID=$(docker inspect -f '{{.State.Pid}}' "$CONTAINER_NAME" 2>/dev/null)

if [ -z "$PID" ] || [ "$PID" -eq 0 ]; then
    echo "Error: Container $CONTAINER_NAME not found. WiFi injection failed."
    exit 1
fi

# 6. Locate the PHY number of the stick on the host
PHY_RAW=$(iw dev | awk '/phy#/{p=$1} /addr '$WIFI_MAC'/{print p}')
PHY=$(echo "$PHY_RAW" | tr -d '#')

if [ -n "$PHY" ]; then
    echo "Injecting $PHY into $CONTAINER_NAME (PID: $PID)..."
    sudo iw "$PHY" set netns "$PID"
    
    # 7. Configure the stick INSIDE the container via a single 'sh -c' block
    docker exec "$CONTAINER_NAME" sh -c "
        # Find the random interface name assigned by the kernel
        IFACE=\$(ip -o link show | grep -i '$WIFI_MAC' | awk -F': ' '{print \$2}' | cut -d'@' -f1 | tr -d ' ')
        
        if [ -n \"\$IFACE\" ]; then
            echo \"Configuring interface: \$IFACE\"
            
            # Setup Link (Rename to wlan0 + Spoof MAC to ..:f1 to avoid host conflict)
            ip link set \$IFACE down
            ip link set \$IFACE name wlan0
            ip link set wlan0 address 54:e6:fc:03:01:f1
            ip link set wlan0 up
            
            # Extract WiFi credentials from the local JSON file
            WIFI_JSON=\$(cat /steady/neeo/cp6/wifi.json)
            SSID=\$(echo \"\$WIFI_JSON\" | jq -r '.ssid')
            PASS=\$(echo \"\$WIFI_JSON\" | jq -r '.password')
            
            # Start WiFi & DHCP (Quiet mode)
            wpa_passphrase \"\$SSID\" \"\$PASS\" > /etc/wpa_supplicant.conf
            pkill wpa_supplicant 2>/dev/null
            mkdir -p /var/run/wpa_supplicant
            wpa_supplicant -q -B -i wlan0 -c /etc/wpa_supplicant.conf -C /var/run/wpa_supplicant
            
            sleep 3
            rm -f /var/lib/dhcp/dhclient.leases
            dhclient -q -v wlan0
            
            # Disable IPv6 to prevent ENETUNREACH errors on GitHub/External URLs
            sysctl -w net.ipv6.conf.all.disable_ipv6=1 >/dev/null 2>&1
            sysctl -w net.ipv6.conf.default.disable_ipv6=1 >/dev/null 2>&1
            
            # Routing: Give eth0 (Macvlan) priority over wlan0 (WiFi)
            GW_ETH=\$(ip route show dev eth0 | grep default | awk '{print \$3}')
            GW_WLAN=\$(ip route show dev wlan0 | grep default | awk '{print \$3}')
            
            ip route del default dev eth0 2>/dev/null
            ip route del default dev wlan0 2>/dev/null
            
            [ -n \"\$GW_ETH\" ] && ip route add default via \$GW_ETH dev eth0 metric 10
            [ -n \"\$GW_WLAN\" ] && ip route add default via \$GW_WLAN dev wlan0 metric 100
            
            echo \"WiFi configured. IP: \$(ip -4 addr show wlan0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}')\"
        else
            echo \"Error: Interface not found in container namespace.\"
        fi
    "
else
    echo "WARNING: WiFi stick not found on host. Please check USB connection."
fi

echo "Startup script completed."
