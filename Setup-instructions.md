# This is a summary of all features of this Brain version that are of interest to the user.
## To start with, for some features / replacements, we need additional configuraration information. Most of that information is related to the  code in cp6.js and is stored/added into the file CP6Settings.json located in /opt/cp6. Keep an eye on this file: /opt/cp6/CP6Settings.json.
## No more NEEO-cloud. Where are my...
As NEEO corporation has shutdown their servers, we need to find other ways to gather information that used to be "in the cloud". The cloud used to host:
- account information; by disconnecting the cloud-servers, the account information has become obsolete.
- Channels and logo's: this is used when you add favorites for devices like TV's, DVB's etc. These have been saved and will be stored locally. 
- Infrared devices that were delivered directly by NEEO. These have been saved and will be stored locally. 
- Firmware; provisions have been made to automatically update firmware through local storage. However, as the preferred way to run a Brain is now docker, we are not pursuing this any further, but just update vesions through Docker images; the normal docker mechanism.
To host the objects mentioned above with "stored locally", an HTTP-server has been setup in Meta-Plus from which these objects can be downloaded. They are served in the Meta-Plus package under /opt/meta/NoCloud with these subdirectories:
- devices contains devices.json and channels.json
- firmware (though not really used for updates by me anymore)
- images   (pictures/logos for each channel you use)
- irdevices (the database with devices and their infrared commands; PLEASE NOTE directory cintains a very large number of objects).
Brain downloads objects through the IP-address of the SDK-adapter like for example http://<SDK-IP>:6468/download?type=images&name=RTL_4.png.thumb.png".
<SDK-IP:6468> maps to the GoogleTV.js module thatb hosts the HTTP-server that serves these objects. 
Once the main  component of the Brain (cp6.js) is initialised, it detects the existence of meta-plus and saves it;s IP-address in the /opt/cp6/CPSettings.json file as "CloudReplacementUrl":"<SDK-IP>" for further usage.
## Sending infrared signals
The physical brain has built-in physical infrared transmitters and receivers. A virtualised brain clearly will not have them, so we need to somehow add them ourselves. 
That is done quite easily with a device that is well-known to the Meta (plus) commnityy: broadlink infrared devices like the RM4-min, RM4-pro etc.
The broadlink device simply takes over the infrared role and all transparently and connects to it over the network. The only thing that needs to be done is to tell the brain through a configuration-file which broadlink device we want to use and details on it's network stack. That is done through some JSON-structure definitions in CP6Settings.json:
"BrainBroadLink":{"broadlinkIp":"<IP of broadlink device>","broadlinktype":"0x520d","broadlinkMac":"e870729eab7a"},
This information can be derived from your current Meta-Plus (or Meta).
## Dynamic Logging
Meta-PLus has taken the original solution provided in Meta and enhanced it in multiple ways:
- more levels available
- dynamic changing the loglevel for a component (or globally); use MetaCore driver from Meta-Plus.
- persistant loglevels, even between restarts
- error-override; a function that detects that a severe error has occurred, then replays a given number of messages. This allows you to put loglevels to quiet, but still receive an overview of relevant messages in case of errors. 
Not really needed as MetaCore driver handles all the definitions and changes, but the modules and their loglevels are persisted in /opt/logComponents.js.
## Channel-save
For devices that do not have native "channels", the channel up and channel down buttons do not work.
If you add the "deviceCapabilities":["channelSave"], to your driver, artificial support for channel up and down is added to the device.  
## How to replace your physical brain with an emulated brain
### Migrate the data of 
Okay... for replicating all of your settings (devices, rooms, recipes, shortcuts etc.), you need to have access to the NEEO Brain.
This is easy if you have rooted the Brain, otherwise it is impossible. Easy said: if you have rooted your Brain, you can migrate your data.

With ssh-access to your brain, copy /steady/neeo/cp6 and all of its contentcand subdirectories to a local computer:
scp -r /steady/neeo/cp6/* <user>@<ip-addres your computer>:<localpath on that copmputer>
Some explanation on this command:
scp is network copy
-r means subdirectories as well
/steady/neeo/cp6/* is the location of a number of critical files, of which project-home*.json are the most important ones.
<user>@<ip-addres your computer>:<localpath on that computer>; all this relates to the computer that will receive the files (your local computer, not the brain). <user> is the userid that has rights to write files on the local computer.
<ip-addres your computer> is the ip-address of that local computer
<localpath on that copmputer>; as said: where are we going to store the data we collect from the brain.
For a working example, I'll use this complete command:
 scp -r /steady/neeo/cp6/* ozo@10.0.1.10:/tmp/storage

After this command, you'll find under /tmp/storage on the local computer, a directory called cp6. Two files are really important here:
- project-home*.json (the latest version/the one with the highest alphanumerical name) is the settings-file that contains all of your device-setings. 
- sdkadapter.json; this file points to where your sdk-adapter is located; this is your Meta-Plus system.
Make sure that these are placed in a directory mounted in your docker-compose.yml to /steady/neeo/cp6 like this:
    volumes:
      - /tmp/storage/cp6:/steady/neeo/cp6    ## this allows us to store project-files, sdkadapter wifi-info etc 
Both files can be copied and used directly without making changes to them.
### First time setup
Now we need to setup some configuration, of which some has already been mentioned.
To start with, you need to have a file called CP6Settings.json in /steady/neeo/cp6 (mapped from /tmp/storage in my example).
briefly, the settings in it:
{"CloudReplacementUrl":"10.0.1.22",
"BrainBroadLink":{"broadlinkIp":"192.168.73.47","broadlinktype":"0x520d","broadlinkMac":"e870729eab7a"},
tr2communication":{"neeolinkenabled":false},"version":"0.49.2"}
The first line is the address of your Meta Plus system (SDK-adapter). If not filled in, it will be done automatically once brain is started and Meta-Plus has registered itself within thi Brain.
The second line are the details of the Broadlink device used for sending out Infrared signals. You can obtain this information from a call to the broadlink_discovery function of the excellent Broadlink driver that is placed on the Meta Plus system at /opt/meta/.Python-stuff/python-broadlink/cli.
Just login to your Meta-Plus system, do a cd  /opt/meta/.Python-stuff/python-broadlink/cli, enter and type broadlink_discovery and enter.
After 10 seconds or so, you'll see all the information printed on the Broadlink devicea found. 
Line 3 in CP6Settings.json is static and will be maintained by the NEEO-gui.
### How to copy your devices and settings to the new virtualised brain
As most of the device configuration for the Brain is already stored in the NoCloud folder or on the Meta (Plus) system, not much is needed here.
### How to connect your NEEO Remote with the virtualised brain
This part is a bit tricky. The NEEO-remote is tought once by the orgiginal/physical brain to which IP-address it needs to connect to communicate with the brain. This IP-address is remembered constantly. 
To start with, shutdown your physical brain and remote it's power. I've got 3 physical Brains connected to my ntwork, all without power. 
If we are going to replace the [hysical brain by a virtualized one, we need to make sure that our new virtualized brain uses the same IP-address.
How you do that is up to you, but I'm using a meta-vlan that I've setup once and allows me to pick an IP-adddress from my local network at will. This is done with these keywords in the docker-compose.yml file:
    hostname: NEEOPROD  ## An arbitrary name that you've assigned to your new Brain; I;'ve kept it the same as the old Brain. 
    networks:
     metavlan:
       ipv4_address: 10.0.1.60
networks:
  metavlan:
       external: true        

If the NEEO-remote now tries to connect to the IP-address it previously knew as "Physical Brain", it will contact your docker image.
The communication requires the "airkey" of your brain to be exactly the same as the physical one, but I disabled that requirement in this firmware as I do not see the need for such a requirement and never looked deeply into how the airkey is genrated. Perhaps I'll dive into that at some time, but for now, there is a mismatch between them, but the new Brain happily accepts connections from your NEEO-remote now. 

## Future development
### Dynamic connection/pairing of NEEO-remote and Virtualized Brain
 
