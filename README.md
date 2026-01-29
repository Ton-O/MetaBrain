# This branch (experiment) adds support for re-initializing meta-drivers after a restart of meta.
## Function
If this release of brain registers an SDK-adapter, it checks for the existence of a button named METAREINIT on all powered-on devices that are served by this SDK-adapter (META is an SDK-adapter).
If found, it will generate the press of that button, resulting in the SDK-adapter (META) calling the code behind that button. 
## Usage
That allows us to re-initialize the device with things like re-initialize connections, listeners and resending commands; all as desired and triggered by the buttons in the driver
