# Docker container for running custom Brain
First the usual disclaimers: I'm developing this solution for my own use but do not mind sharing it with others. Please note that I have NO COMMERCIAL intentions with this solution. I work on this project in my own free time, so from time to time my investment might be limited.I do NOT guarantee anything, using this solution will be completely at your own risk, I take no responsibility if anything goes wrong.
## How to setup
These images are directly useable for use in Docker. I've got versions for Intel (or AMD) processors running X64 or ARMV64 uploaded to hub.docker. My development and personal use of ths solution is on Intel, I just generate the ARM64 version on request.
Although directly useable, you should make some preparations to allow the image to settle itselve in your environment. Have a look at the docker-compose.yml file for an example setup. I'll go over the major keywords below and provide some explanation (though you SHOULD know how to handle docker your self).
- **image: ${DOCKER_USER}/${NEEOPROJECT_NAME}:${NEEOAPP_VERSION}**; if you start the container using the startup.sh script, this will load the .env file from the NEEOENV directory which sets up this:
    DOCKER_USER=tonot1, NEEOPROJECT_NAME=neeobrain, NEEOAPP_VERSION=latest.
    this results in the image tonot1/neeobrain:latest. You can also put that literally in the yml-file
- **#build:**; I commented out building the image yourself but left the info for reference.
- **container_name: BrainMetaBeta**; Just a name for you that helps finding the container
- **privileged: true** because of the use of Avahi-daemon, privileged use in Docker. But this is optional. 
- **volumes:** one of the more important keywords and values, mapping files&directories to the Brain
- **- /media/Media/NEEO/Runtime/Beta/cp6:/steady/neeo/cp6**; This directory contains the NEEO-Project files. You can try to dowmnload from NEEO Brain and place your current project-file here. If all goes well, you'll have your old Brain back, but now virtualised. 
- **/media/Media/NEEO/Runtime/Beta/cp6/CP6Settings.json:/opt/cp6/CP6Settings.json**; configuration of your installation. See further below for keywords.
- **/media/Media/NEEO/Runtime/Beta/BrainBroadLink.json:/opt/cp6/BrainBroadLink.json** no longer needed
- **- /dev/bus/usb:/dev/bus/usb** ; optional, when using a Wifi-stick 
- **- /etc/timezone:/etc/timezone:ro**; use the clock from your host
- **hostname: NEEOBETA** Choose a name that suits, or better: use the priginal name of your NEEO BRain. 
- **network_mode: "host"** to use the same IP-address as your Docker host or use a more sophisticated network-setup by means of
-**networks:**; this allows you to choose a specific IP-address but requires more configuration (and a docker meta-VLAN
- **environment:**; define some env-variables to tell Brain what to look for and behave (messages) 
- **- BrainIP='192.168.xxx.yyy'** I think this is a slip of the pen; shouldn't be needed....
- **- Severity=VERBOSE**; the initial message-level for the Brain. Can be changed dynam,ically by the metacore driver.
## CP6Settings.json
This is the global configuration of the Brain. It hosts a number of parameters that control behavior:
- **"CloudReplacementUrl":"<IP-address of Meta-instance>"**; As the NEEO-cloud is gone, data needs to be placed on a directory in your META-container. Specify the IP-address of your META-container here.
- **"broadlinkIp": "<IP-address of Broadlink-device>"**; when using Infrared by Broadlink, specify here the IP-address of Broadlink-device.
- **"broadlinktype": "<Broadlink-type, f.e. 0x520d>"**; use info from Broadlink here; will be ignored in future releases
- **"broadlinkMac": "<Mac-address of Broadlink-device>"}** Same as broadlinktyope
- **"IR":"broadlink"**; this instructs Brain to use a Broadlink-device for sending infrared. At this moment, this is the only option (but I'm working on integrating the original NEEO IR-transmitter)
- **"UseJN516x":false**; for now the only option...
## What other configuration files?
Only one, but that will be created at runtime: logComponents.json.
This file controls the messagelevel of the Brain-components. It will be adapted dynamically by the metaCore driver in Meta.
## Interesting things to know
This Brain is accessible via the IP-address you defined in the yml-file. The normal url applies:
http://<ip>:3200/eui
If you access the Brain-GUI from a mobile device, you HAVE to tell your browser to use a desktop-version (but that applies to the physical NEEO Brain too).
