# Brain functionality for your NEEO-remotes where the original providers abandoned the device. 
## Function
This repository provides updated code that could run on a raspberry-Pi, or (as I do) as a Docker container. 
## Requirements
You still need the NEEO-remote, but as these are beautiful and we're used to them, no-one will see that as an issue. 
You can run this code as-is, you only need to copy the /steady/neeo/cp6 directory (and it's subfolders) to a place on your device (preferably mounted from outside the device/container). That will make sure that your original settings like devices, shortcuts and recipes will also be available in the new environment.
I'll write a more detailed description on setup, how to migrate your old settings and how to make sure your remote will still connect to this brain (if there's anyone interested in it).   
## This release
When this release of brain registers an SDK-adapter (such as META), it checks for the existence of a button named METAREINIT on all powered-on devices that are served by this SDK-adapter (META is an SDK-adapter).
If found, it will generate the press of that button, resulting in the SDK-adapter (META) calling the code behind that button. 
## Usage
That allows us to re-initialize the device (after a restart of META) with things like re-initialize connections, listeners and resending commands; all as desired and triggered by the buttons in the driver
## Raspberry pi or Docker?
Definitely Docker on a decent machine!
Running this on a proper piece of hardware speedds up things tremendously....... the original/physical brain takes a couple of minutes to be usable when started.... the docker container is done within 5 to 10 seconds......
I run my 3 containers in parallel on a Ubuntu server with docker on it, so to me, Docker containers on a Linux is mainstream for me. 
# Note: this is work done because the provider of these devices have abandoned the Nee-device completely and force you to make an even bigger electronic landfill with NEEO-devices.   
