# use with USB wifi-stick
## What is this change (V3.8) 
This new version adds support for using usb wifi-sticks in Meta-brain when using the docker image.
It is still experimental, but works quite well in my own environment.
## I do not have a usb-stick..
No problem, the container starts up normally, checks for a wifi-stick and if not there, continues.
## Which usb-stick should I use?
I'm using a 2.4ghz-only wifi-stick, based on Atheros AR9287 Rev:2. 
The drivers fopr this stick are incorporated into the Ubuntu kernal that Im jusing for MetaBrain.
Others can be made to work as well (bby adding specific drivers) but this is just tyhe easiest. 

## I have this USB wifi-stick and want to use it.
Great! You're mostly set already. The only thing you need to do is to plug in your usb wifi-stick (now is the time to see if the stick appears like the dmesg-records below), get its mac-address (iw dev on the docker host) and instruct the stick to be associated to the MetaBrain-container.
This has all been automated in a new script I added to the Documentation directory, named startup.sh
This is mhy opersonal stadtuop-script that I use to (re-)start MetaBrain with a freshly pulled image.
To identify the correct image, I use the NEEOENV/.env file. For me it states the version number (like NEEOAPP_VERSION=V3.8), but you can just use the line NEEOAPP_VERSION=latest.
Yhe only thing you need to do is to include the mac-adress of our stick in this startuo.sh script.

Start and stop your container with a simple: ./startup.sh.
## Check if it works
Go into your container and check the existence of wifi:
- iw link; should show eth0 and wlan0
- ip a s; should show an ip-address for wlan0
- wpa_cli status; should show the SSID it is connected to

You can use the MetaBrain gui (<ip-address:3200/iui>) to go to wifi, scan for new networks, then connect to them.

## This is still experimental.....

For your information, I'm listing the dmesg-entries related to my USB-stick. 

[899554.826287] usb 1-9: ath9k_htc: Firmware ath9k_htc/htc_7010-1.4.0.fw requested
[899554.826331] usbcore: registered new interface driver ath9k_htc
[899554.930913] usb 1-9: ath9k_htc: Transferred FW: ath9k_htc/htc_7010-1.4.0.fw, size: 72812
[899555.000779] ath9k_htc 1-9:1.0: ath9k_htc: HTC initialized with 45 credits
[899555.222028] ath9k_htc 1-9:1.0: ath9k_htc: FW Version: 1.4
[899555.222038] ath9k_htc 1-9:1.0: FW RMW support: On
[899555.222043] ath: EEPROM regdomain: 0x809c
[899555.222047] ath: EEPROM indicates we should expect a country code
[899555.222050] ath: doing EEPROM country->regdmn map search
[899555.222053] ath: country maps to regdmn code: 0x52
[899555.222057] ath: Country alpha2 being used: CN
[899555.222060] ath: Regpair used: 0x52
[899555.227213] ieee80211 phy65: Atheros AR9287 Rev:2
[899555.232961] ath9k_htc 1-9:1.0 wlx54e6fc0301f0: renamed from wlan0
