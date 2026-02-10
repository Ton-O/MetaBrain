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
# Note: this is work done because the provider of these devices have abandoned the Neeo-device completely thereby forcing you to make an even bigger electronic landfill with these precious NEEO-devices.   

## Update 2026-02-10
I'm very happy with this update, as it helps tremendously in uncomplicated updates to drivers and way less disturbance when restarting Meta-Plus.
### I added support for updates on SDK-adapters (like Meta-Plus on so-called dynamic devices, devices that are discovered automatically).
The original firmware only updates the version numer and some arbitrary fields, but if you added for example a button, slider, label or whatever significant, that change will not be incorporated.
This version of the replacement firmware does exactly that: it takes the complete new driver and creates an entry in the Brains internal project-file for each device that uses that driver. That means: no longer deleting the discoverable device in the GUI, discovering it again and the hassle of setting all other things right (name device, recipe-steps, shortcuts etc.etc.etc. This means an ENORMOUS save of time.
It also adds the METAREINIT support.... I created that functionality here and in Meta Plus to reduce the disturbance of a restart of Meta-Plus. Without METAREINIT, a device that was powered on in the Brain, will become a zombie-device: Brain thinks it is still powered on, but Meta-Plus is frestarted and thinks it is still powered-off. In order to use that device again with you NEEO-remote (have I said that I adore the NEEO-remotea??), you need to "POWER OFF" the device, then "POWER ON" it again.
To me, that as such an dissatisfying experience that I created METAREINIT.
### METAREINIT
The idea is rather simple: if Meta-Plus is restarted, it registers itself within the Brain. This firmware version detects that registration, it then finds all devices that are powered on and serviced by that SDK-adapter (Meta-Pplus); it then checks if that device contains a button named METAREINIT. If so, it simply generates a keypress for that METAREINIT button. 
Meta-Plus now contains functionality to re-initialize that device, with things like connecting and starting listeners and others. In the Meta-Plus driverfile, you just need to have a single entry like this (similar to the __INITIALIZE button: "METAREINIT": {"label": "", "type":"static", "command":""},
Of-course, you can do additional setup in the METAREINIT button if you like.
