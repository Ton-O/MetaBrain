"use strict";
const logModule = "cp6";
process.env.StartupPath = __dirname;
const StartupPath = process.env.StartupPath;
const path = require('path');
const {logModules} = require(path.join(StartupPath,'logComponents'));

const { metaMessage, LOG_TYPE, LOG_LEVEL,initialiseLogComponents, initialiseLogSeverity,OverrideLoglevel, getLoglevels } = require("/opt/meta/metaMessage");
function metaLog(message) {
    let initMessage = { component:logModule, ORIGIN:logModule,type:LOG_TYPE.ERROR, content:'', deviceId: "" };
    let myMessage = {...initMessage, ...message}
    return metaMessage (myMessage);
  } 
initialiseLogSeverity("QUIET",logModule); 
//OverrideLoglevel("QUIET",logModule)   // normally, no logs will be produced
//OverrideLoglevel("DEBUG",logModule) // but activate this line if you want DEBUG logging (or VERBOSE etc)

const moment = require('moment');
const fs = require("fs");
var AllFunctions;
var CloudReplacement;
var CloudReplacementUrl = '';
var BrainBroadLink;
var BrainBroadLinkFile = __dirname + '/BrainBroadLink.json'
fs.readFile(BrainBroadLinkFile, (err, data) => {
        if (err) {
          metaLog({type:LOG_TYPE.ERROR, content:'No BrainBroadLink.json file, cannot send IR-DATA'});
          }
        else 
          if (data && (data != '')) 
            try {
                metaLog({type:LOG_TYPE.DEBUG, content:'Parsing BrainBroadLink.json file'});
                BrainBroadLink = JSON.parse(data);
                metaLog({type:LOG_TYPE.ALWAYS,content:"Brain uses broadlink! "+BrainBroadLink})
            }
            catch (err) 
                    {metaLog({type:LOG_TYPE.ERROR, content:'Invalid BrainBroadLink.json file '+err});
                    BrainBroadLink = {}
                    }
        })
const currChannelArray = [];        
! function(e) {
    function t(n) { 
        if (r[n]) return r[n].exports;
        var o = r[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(o.exports, o, o.exports, t), o.l = !0, o.exports
    }
    var r = {};
    t.m = e, t.c = r, t.d = function(e, r, n) {
        t.o(e, r) || Object.defineProperty(e, r, {
            enumerable: !0,
            get: n
        })
    }, t.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, t.t = function(e, r) {
        if (1 & r && (e = t(e)), 8 & r) return e;
        if (4 & r && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (t.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & r && "string" != typeof e)
            for (var o in e) t.d(n, o, function(t) {
                return e[t]
            }.bind(null, o));
        return n
    }, t.n = function(e) {
        var r = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return t.d(r, "a", r), r
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, 
    // Okay, functions are all defined in array r....
    AllFunctions = t,t.p = "", t(t.s = 181) // This is the hard-coded starting point of CP6: R[181] 
} 

([
   function(e, t, r) {  // Function 0 Initialisation of cp6.js
    "use strict";
    function n(e) {
        this.label = e || i.tag
    }
    const o = r(182),
        i = r(2).log,
        s = r(109),
        a = r(110).hostname(),
        c = i.version,
        u = /true/.test(i.console) && "silent" !== process.env.LOG_LEVEL;
    let d, l, p = !1,
        h = 0;
    setInterval(() => { // this is a timer that is used to limit the maximum number of log messages
        h = 0
    }, 36e5), n._log = function(e, t) {

        return function() {
            let t;
            const r = Array.prototype.shift.call(arguments);
            let n = Array.prototype.slice.call(arguments);
            if (n.length == 0||(n.length == 1 && n[0] == false))
                t = r
            else 
                if  (n = 1 === n.length ? n[0] : n)  // to enable logging, set PM2 env paramater LOG_CONSOLE: true and LOG_LEVEL to anything but "silent"
                    t = r + " " + JSON.stringify(n);
            metaLog({type:e, content:"["+ this.label + "] "+t,deviceId:"_"})
        
            const o = {
                host: a,
                app: i.tag,
                version: c,
                level: e,
                source: this.label,
                message: r,
                timestamp: Date.now()
            };
            o.params = -1 < ["string", "number", "boolean"].indexOf(typeof n) ? {
                msg: n
            } : n, 
            t && d && (++h < i.maximalUpstreamLogMessagePerHour ? d.log(o) : h === i.maximalUpstreamLogMessagePerHour && (o.source = "LOG", o.message = "LOG_COUNT_EXCEEDED", o.level = "WARN", o.params = void 0, d.log(o))), l && "error" === e && l(o)
        }
    }, n.prototype.always = n._log(LOG_TYPE.ALWAYS, !1), n.prototype.debug = n._log(LOG_TYPE.DEBUG, !1), n.prototype.verbose = n._log(LOG_TYPE.VERBOSE, !1), n.prototype.info = n._log(LOG_TYPE.INFO, !0), n.prototype.warn = n._log(LOG_TYPE.WARNING, !0), n.prototype.error = n._log(LOG_TYPE.ERROR, !0), n.prototype.event = (e => {
        s.addEvent(e)
        
    }), e.exports = function(e) {
        return p || (p || /true/.test(i.network) && (d = o.createClient({
            token: i.token,
            subdomain: i.subdomain,
            json: !0
        })), p = !0), new n(e)
    }, e.exports.registerErrorCallback = function(e) {
        l = e
    }
}, function(e) { // Function 1 only contains exports = require("bluebird")
    e.exports = require("bluebird")
}, function(e) { // Function 2 Fill constant with NEEO environment variables
    "use strict";
    
    (function(t) {//AllFunctions(0)("Function 2").verbose("")
        const r = "127.0.0.1",
            n = process.env.IP || "0.0.0.0",
            o = process.env.PORT || 3001,
            i = "http://" + r + ":" + o,
            s = process.env.NEEO_NGINX_PORT || 3e3,
            a = process.env.DEVICE_ADAPTERBACKEND_URL || "http://" + r + ":3002",
            c = process.env.DIRECTORY_ADAPTERBACKEND_URL || "http://" + r + ":3003",
            u = process.env.FLUSH_BRAINSTATS_S || 14400,
            d = process.env.INTERNET_NETWORKREQUEST_TIMEOUT_MS || 16e3;
        e.exports = {
            env: "production",
            console: true,
            port: o,
            cp6RouteTimeoutMs: process.env.CP6_ROUTE_TIMEOUT || 125e3,
            ip: n,
            address: i,
            localhost: r,
            fileRepoPath: process.env.FILE_REPO_PATH || t + "/../filerepo",
            socket: {
                pingTimeout: process.env.SOCKET_TIMEOUT || 1e4,
                pingInterval: process.env.SOCKET_INTERVAL || 2e4,
                cookie: !1
            },
            project: {
                defaultRooms: [{
                    name: "Living Room",
                    icon: "living-room"
                }, {
                    name: "Bedroom",
                    icon: "bedroom"
                }, {
                    name: "Kitchen",
                    icon: "kitchen"
                }, {
                    name: "Kid's Bedroom",
                    icon: "kids-bedroom"
                }, {
                    name: "Basement",
                    icon: "basement"
                }, {
                    name: "Family Room",
                    icon: "family-room"
                }, {
                    name: "Bonus Room",
                    icon: "bonus-room"
                }, {
                    name: "Great Room",
                    icon: "office"
                }, {
                    name: "Bathroom",
                    icon: "bathroom"
                }],
                lazyActivationDebounceMs: process.env.PROJECT_ACTIVATION_DEBOUNCE_TIME_MS || 9e4,
                maximalShortcutsPerDevice: 64,
                maximalFavoritesPerDevice: 96,
                maximalRooms: 16
            },
            log: {
                level: process.env.LOG_LEVEL || "info",
                console: process.env.LOG_CONSOLE || !0,
                network: process.env.LOG_NETWORK || !1,
                token: process.env.LOG_TOKEN || "b8f841c9-9962-4462-9b16-5b513ae48ac0",
                subdomain: process.env.LOG_SUBDOMAIN || "neeo",
                tag: process.env.LOG_TAG || "CP6",
                version: process.env.NEEO_RELEASE || "DEV",
                eventsBufferSize: process.env.LOG_EVENT_BUFFER_SIZE || 64,
                maximalUpstreamLogMessagePerHour: 400
            },
            tr2: {
                listPageSize: process.env.TR2_LIST_PAGE_SIZE || 64,
                maxPayloadSize: process.env.TR2_MAX_PAYLOAD_SIZE || 980,
                coapPort: process.env.TR2_PUSH_UPDATE_COAP_SERVER_PORT || 5683,
                routingTableRefreshTimeMs: process.env.TR2_ROUTING_TABLE_REFRESH_INTERVAL_MS || 3e5
            },
            tr2coapserver: {
                listeningPort: process.env.TR2_COAPSERVER_PORT || 3901,
                listeningHost: process.env.TR2_COAPSERVER_LISTENING_ADDR || "::",
                forwardingHosts: {
                    defaultHost: process.env.TR2_COAPSERVER_FORWARDING_DEFAULT_HOST || i,
                    tr2firmware: process.env.TR2_COAPSERVER_FORWARDING_NGINX_HOST || "http://" + r + ":" + s
                },
                coapAckTimeoutSec: process.env.COAP_ACK_TIMEOUT_S || 2,
                coapMaxLatencySec: process.env.COAP_MAX_LATENCY_S || 8,
                coapPiggybackReplyMs: process.env.COAP_PIGGYBACK_REPLY_MS || 250,
                coapRandomFactor: process.env.COAP_RANDOM_FACTOR || 1.3,
                coapMaxRetransmit: process.env.COAP_MAX_RETRANSMIT || 3,
                coapSendAcksForNonConfirmablePackets: process.env.COAP_SEND_ACKS_FOR_NONCONFIRM_MESSAGES || !0
            },
            tr2udpserver: {
                listeningPort: process.env.TR2_UDPSERVER_PORT || 3201,
                listeningHost: process.env.TR2_UDPSERVER_HOST || "0.0.0.0"
            },
            resourceprefetcher: {
                favoriteImage: {
                    width: 100,
                    height: 80
                },
                albumartImage: {
                    width: 480,
                    height: 480
                },
                listImage: {
                    width: 100,
                    height: 100
                }
            },
            backup: {
                checkIntervalSeconds: process.env.BACKUP_SYNCHRONIZE_INTERVAL_S || 3600
            },
            statistics: {
                flushIntervalSeconds: u,
                errorEntriesToTrack: process.env.STATISTICS_NUMBER_OF_ERRORS_TO_TRACK || 32
            },
            deviceadapter: {
                baseUrl: a,
                timeout: process.env.DEVICEADAPTER_REQUEST_TIMEOUT || 8e3,
                maximalSdkAdapterCount: process.env.DEVICEADAPTER_MAXIMAL_SDK_ADAPTER_COUNT || 10,
                sdkRoutePath: a + "/neeodeviceadapter",
                internalSdkAdaptername: "neeo-deviceadapter"
            },
            directoryadapter: {
                baseUrl: c
            },
            store: {
                dataRoot: process.env.STORE_DATAROOT || "./data",
                cacheSize: process.env.STORE_CACHESIZE || 10
            },
            actionexecutor: {
                maxJobCount: process.env.ACTIONEXECUTOR_MAX_JOB_COUNT || 16,
                highActiveQueuesWarning: 20
            },
            gpio: {
                touchbuttonPin: process.env.NEEO_GPIO_TOUCHBUTTON_VALUE || 239,
                regionId0Pin: process.env.NEEO_GPIO_REGION_ID0 || 264,
                regionId1Pin: process.env.NEEO_GPIO_REGION_ID1 || 265,
                hardwareRevision0Pin: process.env.NEEO_GPIO_HWREV_0 || 192,
                hardwareRevision1Pin: process.env.NEEO_GPIO_HWREV_1 || 193,
                hardwareRevision2Pin: process.env.NEEO_GPIO_HWREV_2 || 194,
                hardwareRevision3Pin: process.env.NEEO_GPIO_HWREV_3 || 195,
                hardwareRevision4Pin: process.env.NEEO_GPIO_HWREV_4 || 196,
                touchDurationMs: process.env.GPIO_TOUCH_DURATION_MS || 3e4
            },
            devicespecs: {
                adapterBackendUrl: a,
                searchConfig: {
                    maxSpecificResults: process.env.MAX_CONCRETE_RESULTS || 10,
                    maxGenericResults: process.env.MAX_GENERIC_RESULTS || 2
                }
            },
            deviceupdater: {
                updateCheckIntervalMs: process.env.DEVICE_UPDATE_CHECK_INTERVAL_MS || 432e5,
                adapterUpdaterMaxAttempts: 3,
                adapterUpdaterTimeoutMs: 8e3
            },
            systeminfo: {
                nginxPort: s,
                ifaceNameLan: process.env.NEEO_LAN_INTERFACE || "en0",
                ifaceNameWlan: process.env.NEEO_WLAN_INTERFACE || "lo0",
                wifiRegionFile: process.env.NEEO_FILE_WLAN_REGION || t + "/../../test/fixtures/wifiregion",
                wifiInfoFile: process.env.NEEO_FILE_WLAN_INFO || t + "/../../test/fixtures/wifiquality",
                tr2VersionFile: process.env.NEEO_FILE_TR2_VERSION || t + "/../../test/fixtures/tr2version.xml",
                pm2LogIntervalMS: process.env.BRAIN_STATS_PM2_LOG_INTERVAL_TIME_MS || 144e5,
                diskLogIntervalMS: process.env.BRAIN_STATS_DISK_LOG_INTERVAL_TIME_MS || 864e5,
                flushIntervalSeconds: u,
                networkTimeoutMs: d,
                temperatureFile: process.env.NEEO_FILE_TEMPERATURE || t + "/../../test/fixtures/temperature.sh",
                temperatureMeasureIntervalMs: 3e5,
                cloudStatusRequestTimeoutMs: process.env.CLOUD_STATUS_REQUEST_TIMEOUT_MS || 5e3
            },
            finalsystemtest: {
                productionSOMEepromScript: process.env.NEEO_FILE_PROD_SOM_EEPROM_CONTENT_SCRIPT || t + "/../../test/fixtures/som-eeprom-content.sh",
                productionSOMFlashStationData: process.env.NEEO_FILE_PROD_SOM || t + "/../../test/fixtures/flasher.dat",
                productionBLTStationData: process.env.NEEO_FILE_PROD_BLT || t + "/../../test/fixtures/blt.json",
                productionFSTStationData: process.env.NEEO_FILE_PROD_FST || t + "/../../test/fixtures/fst.json",
                productionWifiResetScript: process.env.NEEO_FILE_RESETWIFI_FST || t + "/../../test/fixtures/wifi-fst-reset.sh"
            },
            firmware: {
                versionFile: process.env.FW_VERSION_FILE || "/tmp/cp6-fw.version",
                newVersionFile: process.env.FW_NEW_VERSION_FILE || "/tmp/cp6-fw.version.new",
                downloadDir: process.env.FW_DOWNLOAD_DIR || "/tmp",
                checkIntervalMs: process.env.FW_CHECK_INTERVAL_MS || 144e5,
                downloadTimeoutMs: process.env.FW_TIMEOUT_MS || 36e5,
                updateScriptPath: process.env.FW_UPDATESCRIPT_PATH || t + "/../../test/fixtures/fwupdate.sh",
                resetScriptPath: process.env.FW_RESETSCRIPT_PATH || t + "/../../test/fixtures/fwreset.sh"
            },
            devicefilemanager: {
                downloadDir: process.env.DFM_DOWNLOAD_DIR || "/tmp",
                fileDirectory: process.env.DFM_FILE_DIR || "./data",
                syncExpiresInMs: process.env.DEVICE_FILE_SYNC_EXPIRES_IN_MS ||  144e5
            },
            avahi: {
                port: process.env.AVAHI_PORT || 3e3,
                configPath: process.env.AVAHI_CONFIG_PATH || "/tmp/avahi.xml",
                restartcmd: process.env.AVAHI_RESTART_CMD || "echo",
                restartparam: process.env.AVAHI_RESTART_PARAM || "reload avahi-daemon"
            },
            account: {
                duiroFormatVersion: "V1"
            },
            discovery: {
                checkIntervalMs: process.env.DISCOVERY_INTERVAL_MS || 864e5,
                networkTimeoutMs: d
            },
            wifi: {
                connectScriptPath: process.env.WIFI_CONNECT_PATH || t + "/../../test/fixtures/wificonnect.sh"
            },
            mailgun: {
                domain: process.env.MAILGUN_DOMAIN || "postman.neeo.com",
                apikey: process.env.MAILGUN_APPKEY || "key-5d2fec373ca8a0caa120a169a2a7a59f",
                from: process.env.MAILGUN_FROM || "NEEO Brain <rule@brain.neeo.com>",
                subject: process.env.MAILGUN_SUBJECT || "NEEO Brain Mail: "
            },
            irblaster: {
                repeatTimeout: process.env.IRBLASTER_REPEAT_TIMEOUT || 300,
                enableInternalIrBlasterScript: process.env.NEEO_FILE_ENABLEIRBLASTER || process.env.NEEO_FILE_ENABLEDIRBLASTER || t + "/../../test/fixtures/irblasterEnable.sh",
                disableInternalIrBlasterScript: process.env.NEEO_FILE_DISABLEIRBLASTER || t + "/../../test/fixtures/irblasterDisable.sh"
            },
            jn5168: {
                jn5168RestIpv6File: process.env.NEEO_NBR_FILE_REST_JN5168_IPV6 || "./nbr-rest.json",
                jn5168RestIpv6FilePollingTimeMs: process.env.NEEO_NBR_FILE_REST_POLLING_TIME_MS || 6e4,
                jn5168Port: process.env.NEEO_REST_JN5168_PORT || 8080,
                irMaxRetries: process.env.JN5168_IR_MAX_RETRIES || 16,
                irRetryDelay: process.env.JN5168_IR_RETRY_DELAY_MS || 64,
                nbrStatisticsIntervalInMs: process.env.JN5168_NBR_REFRESH_STATISTICS_MS || 36e5,
                jn5168restartNbrAfterMaxErrorCount: process.env.JN5168_NBR_RESTART_MAX_ERROR_COUNT || 5,
                jn5168WatchdogCommand: process.env.JN5168_NBR_RESTART_COMMAND || "/usr/bin/systemctl",
                jn5168WatchdogCommandArg: process.env.JN5168_NBR_RESTART_COMMANDARG || "restart neeo-sixlowpanrouter"
            },
            urlshortener: {
                baseUrl: process.env.URL_SHORTENER_BASEURL || i
            },
            sensorvalue: {
                baseUrl: i + "/projects/home/sensorvalue"
            },
            homekit: {
                dataUrl: process.env.HOMEKIT_DATA_URL || "http://" + r + ":3005/braininterface",
                powerstateUrl: process.env.HOMEKIT_POWERSTATE_URL || "http://" + r + ":3005/braininterface/powerstate",
                resetPairingUrl: process.env.HOMEKIT_RESETPAIRING_URL || "http://" + r + ":3005/braininterface/resetpairing",
                timeoutMs: process.env.HOMEKIT_TIMEOUT_MS || 4e3
            },
            openaccesspoint: {
                systemctl: process.env.OPENAP_SYSTEMCTL || "echo",
                parameterStart: process.env.OPENAP_SYSTEMCTL_PARAM_START || ["start", "hostapd"],
                parameterStop: process.env.OPENAP_SYSTEMCTL_PARAM_STOP || ["stop", "hostapd"],
                disableAccessPointModeAfterMs: process.env.OPENAP_SYSTEMCTL_DISABLE_AP_MODE_MS || 27e5
            },
            zWaveDeviceSync: {
                discoverNewDevicesDelayMs: process.env.DEVICEADAPTER_DISCOVER_NEW_DEVICES_DELAY_MS || 12e4
            },
            devicesmartener: {
                learnModeDurationMs: process.env.DEVICESMARTENER_LEARN_MODE_DURATION_MS || 6e4
            },
            pro: {
                restoreBackupCheckIntervalMs: 9e5,
                brainInformationUpdateIntervalMs: 3e4
            },
            cloud: {
                pro: {
                    appId: "6ae3301ddbe254976ec7145f9ce435bd",
                    parseUrl: "https://pro.neeo.io/parse",
                    discoverUrl: "https://pro.neeo.io/api/Brain",
                    isPro: !0
                },
                consumer: {
                    appId: "fbc28467c8ef9b079305b54f8dd82719",
                    parseUrl: "https://brain.neeo.io/parse",
                    discoverUrl: "https://brain.neeo.io/api/Brain",
                    isPro: !1
                }
            }
        }
    }).call(this, "/")
}, function(e, t, r) { // Function 3 looks like main watchdog, based on statistics
    "use strict";
    AllFunctions(0)("Function 3").verbose("")
    const n = r(2).statistics,
        o = r(190),
        i = new o(n),
        s = new o(n),
        a = r(6)("cp6:lib:statistics:index"),
        c = r(0),
        u = r(191),
        d = r(0)("Statistics"),
        l = r(192);
    e.exports = i, e.exports.tr2 = s, e.exports.startTask = function() {
        return c.registerErrorCallback(e => {
            i.increaseCounter("errors-occured"), i.addErrorMessage(e)
        }), a("startTask, interval", n.flushIntervalSeconds), setInterval(() => {
            a("statistics.logAndFlushStatistics"), d.info("STATISTICS_KPI_CP6_APP", i.getStatistic()), d.info("STATISTICS_KPI_TR2", s.getStatistic()), i.clearStatistics(), s.clearStatistics()
        }, 1e3 * n.flushIntervalSeconds)
    }, e.exports.buildRequestTracker = (() => u.build()), l(e => {
        a("WARNING_EVENT_LOOP_BLOCKED", e), i.increaseCounter("eventLoopBlockedTimeMs", e)
    }, {
        threshold: 100
    })
}, function(e, t, r) {// Function 4 Parse/render TR2
    "use strict";
    AllFunctions(0)("Function 4").verbose("Parse/render TR2")

    function n(e) {
        return o.parse(e), t => o.render(e, t)
    }
    const o = r(164),
        i = r(37).loadTr2File;
    e.exports = function(e) {
        return n(i(e))
    }, e.exports.compileRawTemplate = n
}, function(e) {// Function 5 exports = require("express")
    e.exports = require("express")
}, function(e) {// Function 6 exports = require("debug")
    e.exports = require("debug")
}, function(e, t, r) {// Function 7 set various defaults
    "use strict";AllFunctions(0)("Function 7").verbose("")
    const n = r(35);
    e.exports = {
        screen: {
            width: 480,
            height: 800
        },
        fastListScreen: {
            width: 480,
            height: 670,
            textColor: "#FF404040",
            backgroundColor: "#FFFFFFFF",
            buttonActiveBackgroundColor: "#33000000",
            headerHeight: 100,
            headerBackgroundColor: "#FFFFFFFF",
            headerBackIcon: n("BackBoldDark").toString(),
            headerTitleWidth: 280,
            headerTitleHeight: 100,
            splitLineColor: "#FFEDEDED",
            overscrollIcon: n("Reload").chr,
            overscrollIconColor: "0xFFDBDBDB",
            overscrollHeight: 100
        },
        fullScreenDarkPopup: {
            backgroundColor: "#FF000000",
            textColor: "#FFFFFFFF",
            textHeight: "25",
            buttonColor: "#FF00B4FF",
            activeBackgroundColor: "#FF1983B0",
            btnWidth: "330",
            btnHeight: "70"
        },
        activenow: {
            height: 80,
            lefticonwidth: 130,
            textwidth: 220,
            rightpowerofficon: 130
        },
        content: {
            top: 350,
            width: 480,
            height: 350,
            element: {
                width: 140,
                height: 100,
                margin: 10,
                marginTop: 25,
                marginBottom: 25
            },
            header: {
                top: 300,
                height: 40
            }
        },
        homeStyle: {
            entriesPerPage: 6
        },
        recipeStyle: {
            entriesPerPage: 6
        },
        shortcutStyle: {
            elementHeight: 150,
            paddingSides: 13,
            paddingBottom: 0,
            paddingTop: 30,
            slider: {
                width: 400,
                labelHeight: 21,
                labelMarginTop: 18,
                deviceNameLabelMarginTop: 0
            },
            switch: {
                width: 134,
                marginTop: 27,
                imageWidth: 71,
                imageHeight: 45,
                labelHeight: 21,
                labelMarginTop: 18,
                deviceNameLabelMarginTop: 0
            },
            button: {
                width: 134
            },
            gap: {
                width: 134
            },
            textlabel: {
                width: 454
            },
            imageurl: {
                small: {
                    width: 100,
                    height: 100,
                    marginLeft: 30,
                    marginRight: 30,
                    marginBottom: 5
                },
                large: {
                    width: 454,
                    height: 454
                }
            }
        },
        lightStyle: {
            elementHeight: 150,
            elementWidth: 420,
            switch: {
                height: 40,
                width: 160,
                widthWithDimmer: 100,
                marginTop: 14,
                imageWidth: 71,
                imageHeight: 45,
                labelHeight: 21,
                labelMarginTop: 18,
                deviceNameLabelMarginTop: 0
            },
            slider: {
                height: 4
            },
            label: {
                width: 320
            }
        },
        powerOffStyle: {
            width: 195,
            height: 180
        },
        musicCoverImage: {
            width: 480,
            height: 480,
            imageFormat: "lz4-black"
        },
        musicCoverImageSmall: {
            width: 80,
            height: 80,
            imageFormat: "lz4-black"
        },
        fontsize: {
            largelight: 35
        },
        buttons: {
            horizontalPadding: 20,
            radius: 8,
            height: 110
        },
        home: "0",
        visibleRootScreenId: "0",
        navBackIcon: n("BackBold").toString(),
        touchActiveColor: n.touchActiveColor,
        touchStaticColor: "#FFFFFFFF",
        touchActiveBackgroundColor: "#33999999",
        touchBackgroundColor: "#33ffffff",
        listPanelBackgroundColor: "#FFFFFFFF",
        listPanelActiveBackgroundColor: "#80C0C0C0",
        defaultFrameColor: "#00000000",
        topGrayStatusBar: 30,
        bottomSliderDots: 30,
        header: {
            height: 70,
            button: {
                width: 100
            }
        },
        icon: () => (function(e, t) {
            return t(n(e).toString())
        }),
        badgeColorImportant: "#FFFF0000",
        assumptionStyle: {
            lineColor: "#F2BBBBBB",
            textColor: "#FF000000",
            backgroundColor: "#F2FFFFFF"
        },
        popupStyle: {
            doneButton: {
                textColor: "#FF00A2E6",
                backgroundColor: "#F2FFFFFF",
                activeBackgroundColor: "#F2EEEEEE"
            },
            volumePopup: {
                x: 20,
                y: 250,
                height: 200,
                width: 440,
                edgeRadius: 15,
                backgroundColor: "#FFFFFFFF",
                progressBarColor: "#FF1983B0",
                progressBarBackgroundColor: "#FFD0D0D0"
            }
        }
    }
}, function(e) {// Function 8 Define all GUI-objects by name
    "use strict";
    e.exports.COMPONENT_SWITCH_TYPE_NAME = "switch", e.exports.COMPONENT_SLIDER_TYPE_NAME = "slider", e.exports.COMPONENT_MACRO_TYPE_NAME = "button", e.exports.COMPONENT_TEXTLABEL_TYPE_NAME = "textlabel", e.exports.COMPONENT_IMAGEURL_TYPE_NAME = "imageurl", e.exports.COMPONENT_DIRECTORY_TYPE_NAME = "directory", e.exports.COMPONENT_SENSOR_TYPE_NAME = "sensor", e.exports.COMPONENT_WIDGET_TYPE_NAME = "widget", e.exports.COMPONENT_PROCEDURE_TYPE_NAME = "procedure", e.exports.COMPONENT_GAP_TYPE_NAME = "Spacer"
}, function(e, t, r) {// Function 9 Array with error-messages
    "use strict";
    AllFunctions(0)("Function 9").verbose("")
    const n = r(2),
        o = r(11),
        i = {
            unhandled: "Oops. an error occured, please try again later",
            parameter_missing: "Missing parameters: `%s`",
            invalid_object: "Invalid Object: %s",
            validation: "Validation failed: `%s`",
            notfound: "No such %s: %s",
            project_save: "Could not save project.",
            project_activate: "Could not activate project.",
            project_reset: "Could not reset project.",
            command_trigger: "Could not trigger command: %s",
            action_trigger: "Could not trigger action: %s",
            wifi_connect: "Connection failed",
            wifi_password: "Wrong password",
            slider_sensor: "Could not %s slider sensor values",
            slider_switch: "Could not switch slider to %s",
            slider_value: "Could not set slider value",
            switch: "Could not switch to %s",
            switch_sensor: "Could not read sensor value of switch",
            account_login: "Could not login user",
            account_signup: "Could not signup user",
            account_logout: "Could not logout user",
            account_user: "No user is logged in",
            account_pairing: "Pairing failed: %s",
            account_backups: "Could not list project backups",
            account_restore: "Could not restore project backup",
            shortcut_add: "Could not add shortcut",
            shortcut_del: "Could not delete shortcut",
            notification_send: "Could not send notification %s",
            devicespec_search: "Could not find any devicespecs for query: %s",
            devicespec_sync: "Synchronising devicelist failed.",
            devicespec_get: "Could not get full spec for id: %s",
            device_add: "Could not add device",
            device_rename: "New devicename already exists",
            device_reset_wiring: "Could not reset wiring for device: %s",
            device_move: "Could not move room for device: %s",
            device_powermode: "Could not save power mode device: %s",
            device_smartener: "Could not smartify device: %s",
            sensor: "Could not read sensor value",
            sensor_eventkey: "Could not find sensor with event key: %s",
            deviceadapter_cancelrequest: "Could not cancel pending request",
            deviceadapter_registered: "Could not check registered state",
            deviceadapter_discover: "Could not discover device",
            deviceadapter_replace: "Could not replace device",
            deviceadapter_getcontrollerrole: "Could not get Z-Wave controller role",
            deviceadapter_replicatezwavenetwork: "Could not replicate Z-Wave network",
            deviceadapter_rpc: "Could not call RPC method %s: %s",
            directoryadapter_browse: "Failed to browse Directoryadapter",
            directoryadapter_action: "Failed to call action on Directoryadapter",
            directoryadapter_isenabled: "Failed to check if Directoryadapter is enabled: %s",
            directoryadapter_getenableddirectory: "Failed to browse rootitems of Directoryadapter",
            directoryadapter_spotifyuserdata: "Failed to get Spotify user data from Directoryadapter: %s",
            directoryadapter_spotifyauthparam: "Failed to get Spotify authorization params from Directoryadapter: %s",
            directoryadapter_spotifycreatetoken: "Failed to create Spotify access token: %s",
            room_delete: "Could not delete room: `%s`"
        };
    e.exports = function(e, t) {
        const r = Array.prototype.slice.call(arguments, 2);
        return r.unshift(i[t]), {
            message: o.format.apply(o, r),
            error: "development" === n.env ? e : {}
        }
    }
}, function(e, t, r) {// Function 10 notificationfacade
    "use strict";
    AllFunctions(0)("Function 10").verbose("")
    const n = r(6)("cp6:lib:notificationfacade"),
        o = r(69),
        i = r(187),
        s = r(188),
        a = r(189),
        c = r(193),
        u = r(25),
        d = r(3),
        l = 1e3 * r(2).systeminfo.flushIntervalSeconds,
        p = r(0)("Notification");
    const h = new class extends o.EventEmitter {
        constructor() {
            super(), this.notificationSender = new c, this.zwaveEventLog = new i, this.powerSensorListener = new s(this), this.sensorListener = new a(this), this.setMaxListeners(40), this.on(u.NOTIFICATION_PROJECT_CHANGED, () => {
                this.powerSensorListener.activatePowerStateSensors()
            }), setInterval(() => {AllFunctions(0)("Function 10").verbose("Timer expired")
                const e = this.eventNames().reduce((e, t) => e + this.listenerCount(t), 0);
                d.setValue("notification-listener", e)
            }, l)
        }
        initialiseWithProject(e) {
            n("initialiseWithProject");
            try {
                this.zwaveEventLog.project = e, this.powerSensorListener.project = e, this.powerSensorListener.activatePowerStateSensors(), this.sensorListener.initializeListeners(e)
            } catch (e) {
                p.error("INIT_FAILED", e.message)
            }
        }
        socketioinit(e) {AllFunctions(0)("Function 10").verbose("socketioinit");
            this.notificationSender.socketioinit(e)
        }
        registerIfNotYetRegistered(e, t) {
            0 === this.listeners(e).length ? (this.on(e, t), n("registered new listener", e)) : !this.listeners(e).includes(t) && (this.on(e, t), n("registered additional listener", e))
        }
        isInternalNotification(e) {
            return e.type.startsWith(u.NOTIFICATION_CEC_POWERSTATE)
        }
        handleInternalNotification(e) {
            return n("INTERNAL_CEC_NOTIFICATION"), this.emit(u.NOTIFICATION_CEC_POWERSTATE, e), !0
        }
        needsLegacyNotification(e) {
            return e.data && e.type === u.NOTIFICATION_DEVICE_SENSOR_UPDATE
        }
        sendLegacySensorNotification(e) {
            const t = e.data;
            return p.debug("sendLegacySensorNotification", t.sensorEventKey), this.emit(t.sensorEventKey, t.sensorValue), this.notificationSender.send({
                type: t.sensorEventKey,
                data: t.sensorValue
            })
        }
        send(e) {AllFunctions(0)("Function 10").verbose("send"+e.type+" "+e.data);
            return !(!e || !e.type) && (this.isInternalNotification(e) ? this.handleInternalNotification(e) : (this.zwaveEventLog.logZWaveEvents(e), this.emit(e.type, e.data), this.needsLegacyNotification(e) ? this.sendLegacySensorNotification(e) : this.notificationSender.send(e)))
        }
        resendAll() {
            this.notificationSender.resendAll()
        }
    };
    e.exports = h
}, function(e) {// Function 11 exports = require("util")
    AllFunctions(0)("Function 11").verbose("")
    e.exports = require("util")
}, function(e, t, r) {// Function 12 start systeminfo statistics using r(286))
    "use strict";
    AllFunctions(0)("Function 12").verbose("socketstart systeminfo statistics using r(286))ioinit");
    const n = r(2).systeminfo,
        o = new(r(286))(n),
        i = r(6)("cp6:lib:systeminfo:index");
    e.exports = o, e.exports.startTask = function() {
        AllFunctions(0)("Function 12").verbose("perform exported functions");
        return i("start systeminfo staticstics, intervalS", n.flushIntervalSeconds), setInterval(() => {
            i("systemInfo.logAndFlushStatistics"), o.logAndFlushStatistics()
        }, 1e3 * n.flushIntervalSeconds)
    }
}, function(e, t, r) {// Function 13 Define projects/home directories for various actions/objects
    "use strict";
    AllFunctions(0)("Function 13").verbose("")

    function n(e) {
        const t = e.getRoom();
        return i + "/rooms/" + t.getKey()
    }

    function o(e) {
        return i + "/rooms/" + e
    }
    const i = "/projects/home",
        s = r(0)("URLFACTORY");
    e.exports.getActionUrl = function(e, t) {
        const r = t.getDevice();
        return n(e) + "/scenarios/" + e.getKey() + "/trigger?name=" + t.getName() + "&deviceKey=" + r.getKey()
    }, e.exports.getActionKeyUrl = function(e, t) {
        const r = t.getDevice();
        return n(e) + "/scenarios/" + e.getKey() + "/triggerByKey?componentKey=" + t.getKey() + "&deviceKey=" + r.getKey()
    };
    const a = e.exports.getActionPath = function(e, t) {
        return n(e) + "/scenarios/" + e.getKey() + "/trigger?name=" + t
    };
    e.exports.getShortcutTriggerUrl = function(e) {
        const t = e.roomKey,
            r = e.deviceKey;
        if (t && r) return o(t) + "/devices/" + r + "/macros/" + e.key + "/trigger"
    }, e.exports.getMacroTriggerUrl = function(e) {
        if (!e) return s.warn("TR2_INVALID_MACRO_TO_BUILD_TRIGGER_URL"), "";
        const t = e.roomKey,
            r = e.deviceKey,
            n = e.key;
        return o(t) + "/devices/" + r + "/macros/" + n + "/trigger"
    }, e.exports.getShortcutActionPath = function(e, t, r) {
        if (r && r.roomKey && r.key) return o(r.roomKey) + "/devices/" + r.key + "/trigger?name=" + t
    }, e.exports.getDeviceActionPath = function(e, t) {
        const r = e.key;
        return o(e.roomKey) + "/devices/" + r + "/trigger?name=" + t
    }, e.exports.getShortcutUrl = function(e, t) {
        return a(e, t)
    }, e.exports.getSliderUrl = function(e, t, r) {
        return t ? r ? n(e) + "/devices/" + t.getKey() + "/sliders/" + r.getKey() : void s.warn("INVALID_SLIDER_PARAMETER") : void s.warn("INVALID_DEVICE_PARAMETER")
    }, e.exports.getSliderUrlRoomKey = function(e, t) {
        return o(e.getRoomKey()) + "/devices/" + e.getKey() + "/sliders/" + t.getKey()
    }, e.exports.getSwitchUrl = function(e, t, r) {
        return n(e) + "/devices/" + t.getKey() + "/switches/" + r.getKey()
    }, e.exports.getSwitchUrlRoomKey = function(e, t) {
        return o(e.getRoomKey()) + "/devices/" + e.getKey() + "/switches/" + t.getKey()
    }, e.exports.getFavoriteUrl = function(e, t, r) {
        return n(e) + "/devices/" + t.getKey() + "/favorites/" + r + "/trigger"
    }, e.exports.getDeviceRootItemsUrl = function(e) {
        return i + "/tr2/device/" + e + "/rootitems"
    }, e.exports.getDirectoryBrowseUrl = function(e) {
//debugger;
        return i + "/tr2/directory/" + e + "/browse"
    }, e.exports.getDirectoryActionUrl = function(e) {
        return i + "/tr2/directory/" + e + "/action"
    }, e.exports.getRecipeTypeExecuteUrl = function(e, t) {
        const r = e.getRecipe(t);
        return n(e) + "/recipes/" + r.getKey() + "/execute"
    }, e.exports.getRecipeExecuteUrl = function(e) {
        return o(e.getRoomKey()) + "/recipes/" + e.getKey() + "/execute"
    }, e.exports.getTr2TriggerActionCommand = function(e) {
        return "TriggerAction('" + e + "')"
    }, e.exports.getActivateScenarioWithAnswer = function(e, t, r, n) {
        return `ActivateScenario('${e}','${t}?a','${r}','${n}')`
    }
}, function(e, t, r) {// Function 14 validation routine (single, integer,array,string,lessthanorequal)
    "use strict";
    AllFunctions(0)("Function 14").verbose("")
    const n = r(111),
        o = e.exports = function() {
            AllFunctions(0)("Function 14").verbose("export")
//            console.log(arguments);
            const e = n.apply(this, arguments);
            if (e) throw new Error("Validation failed: " + JSON.stringify(e))
        };
    o.single = function() {
        AllFunctions(0)("Function 14").verbose("isSingle")
        const e = n.single.apply(this, arguments);
        if (e) throw new Error("Validation failed: " + JSON.stringify(e))
    }, o.isInteger = function() {
        AllFunctions(0)("Function 14").verbose("isIntegr")
        if (!n.isInteger.apply(this, arguments)) throw new Error("Validation failed: no integer")
    }, o.isArray = function() {
        AllFunctions(0)("Function 14").verbose("isArray")
        if (!n.isArray.apply(this, arguments)) throw new Error("Validation failed: no array")
    }, o.isString = function() {
        AllFunctions(0)("Function 14").verbose("isString")
        if (!n.isString.apply(this, arguments)) throw new Error("Validation failed: no string")
    }, o.lessThanOrEqualTo = function(e, t) {
        AllFunctions(0)("Function 14").verbose("isLTOE")
        if (n({
                value: e
            }, {
                value: {
                    numericality: {
                        lessThanOrEqualTo: t
                    }
                }
            })) throw new Error(`Validation failed: not smaller than or equal to ${t}`)
    }
}, function(e, t, r) {// Function 15 get boolean and integer parm
    "use strict";
    AllFunctions(0)("Function 15").verbose("");

    function n(e, t, r, n) {
        let i = o(e, t);
        if (i || void 0 === n || (i = n), void 0 === r) throw new Error("need a validation object to work correctly");
        if (void 0 !== i) {
            const e = {};
            e[t] = i;
            const n = {};
            n[t] = r, s(e, n)
        }
        if (void 0 === i) throw new Error("parameter is missing: " + t);
        return i
    }

    function o(e, t) {
        return t in e.params ? e.params[t] : e.body && t in e.body ? e.body[t] : e.query ? e.query[t] : void 0
    }
    const i = r(459),
        s = r(14),
        a = {
            presence: !0,
            numericality: {
                onlyInteger: !0,
                greaterThanOrEqualTo: 0
            }
        };
    e.exports = {
        parseEncodedListParameter: i.parseEncodedListParameter,
        getRequestParameter: n,
        getBooleanParam: function(e, t, r) {
            const n = o(e, t);
            if (n) return /true/.test(n);
            if (r) throw new Error("parameter is missing: " + t)
        },
        getIntParam: function(e, t, r) {
            const o = n(e, t, a),
                i = parseInt(o, 10);
            if (i >= r) throw new Error(`Invalid value for ${t}`);
            return i
        }
    }
}, function(e) {// Function 16 exports = require("lodash")
    e.exports = require("lodash")
}, function(e) {// Function 17 exports = require("request-promise")
    e.exports = require("request-promise") 
}, function(e, t) {// Function 18 Define various fields for adapters
    "use strict";
    t.SOURCE_DUIRO = "duiro", t.SOURCE_ADAPTER = "adapter", t.SOURCE_SDK = "sdk", t.SOURCES = [t.SOURCE_DUIRO, t.SOURCE_ADAPTER, t.SOURCE_SDK], t.ILLEGAL_SDK_ADAPTERNAMES = ["sonos", "zwave", "hue", "cec"].concat(t.SOURCES), t.HDMI_CONNECTIONS = ["HDMI", "HDMI 1 Arc", "HDMI 2 Arc", "HDMI 3 Arc", "HDMI 4 Arc"], t.PLAYER_SENSORS = ["PLAYING_SENSOR", "REPEAT_SENSOR", "SHUFFLE_SENSOR", "MUTE_SENSOR", "VOLUME_SENSOR", "COVER_ART_SENSOR", "TITLE_SENSOR", "DESCRIPTION_SENSOR"]
}, function(e, t) {// Function 19 define types of devices
    "use strict";
    t.TYPE_TV = "TV", t.TYPE_DVD = "DVD", t.TYPE_VOD = "VOD", t.TYPE_ACCESSOIRE = "ACCESSOIRE", t.TYPE_PROJECTOR = "PROJECTOR", t.TYPE_DVB = "DVB", t.TYPE_SONOS = "SONOS", t.TYPE_AVRECEIVER = "AVRECEIVER", t.TYPE_AUDIO = "AUDIO", t.TYPE_HDMISWITCH = "HDMISWITCH", t.TYPE_GAMECONSOLE = "GAMECONSOLE", t.TYPE_MEDIAPLAYER = "MEDIAPLAYER", t.TYPE_MUSICPLAYER = "MUSICPLAYER", t.TYPE_SOUNDBAR = "SOUNDBAR", t.TYPE_TUNER = "TUNER", t.TYPE_LIGHT = "LIGHT", t.TYPE_THERMOSTAT = "THERMOSTAT", t.TYPE_HVAC = "CLIMA", t.TYPE_UNKNOWN = "UNKNOWN", t.TYPES = [t.TYPE_TV, t.TYPE_DVD, t.TYPE_VOD, t.TYPE_ACCESSOIRE, t.TYPE_PROJECTOR, t.TYPE_DVB, t.TYPE_SONOS, t.TYPE_AVRECEIVER, t.TYPE_AUDIO, t.TYPE_GAMECONSOLE, t.TYPE_MEDIAPLAYER, t.TYPE_MUSICPLAYER, t.TYPE_SOUNDBAR, t.TYPE_TUNER, t.TYPE_LIGHT, t.TYPE_THERMOSTAT, t.TYPE_HDMISWITCH, t.TYPE_HVAC, t.TYPE_UNKNOWN], t.VOLUME_DEVICE_TYPE_PRIORITY = [t.TYPE_HDMISWITCH, t.TYPE_AVRECEIVER, t.TYPE_SOUNDBAR]
}, function(e, t, r) {// Function 20 interface towards zwave (and rpc)
    "use strict";
    AllFunctions(0)("Function 20").verbose("");
    const n = r(6)("cp6:lib:adapter:index"),
        o = r(2),
        i = r(214),
        s = r(215),
        a = r(220),
        c = r(118),
        u = new i(o.directoryadapter),
        d = new s(o.deviceadapter);
    let l;
    e.exports = {
        directoryAdapter: u,
        deviceAdapter: d,
        spotifyUsernameService: c,
        zWaveDeviceSync: l,
        initialise: function(e) {
            c.initialize(u), l = new a(d, e)
        },
        requestZWaveSync: function() {
            const e = o.zWaveDeviceSync.discoverNewDevicesDelayMs;
            return setTimeout(() => {
                n("zWaveDeviceSync.syncWithRemoving"), l.syncWithRemoving()
            }, e)
        },
        resetZWave: function() {
            return d.resetZWave().then(() => l.syncWithRemoving())
        },
        rpcCall: function(e, t, r) {
            let o;
            return d.getZWaveControllerRole().then(n => (o = n, d.rpc(e, t, r))).then(r => (n("RPC_CALL_DONE", e, t), l.handleRpcResult(e, t, o), r))
        }
    }
}, function(e, t, r) {// Function 21 DeviceCapability
    "use strict";
    AllFunctions(0)("Function 21").verbose("e",e)
    AllFunctions(0)("Function 21").verbose("t",t)

    function n(e) {
        this.name = e.name, this.check = e.check, this.options = e.options || {}
    }
    const o = r(0)("DeviceCapability"),
        i = r(30),
        s = r(19),
        a = r(18),
        c = r(36),
        u = r(59).ConditionChecker,
        d = {};
    n.prototype.register = function() {
        if (d[this.name]) throw new Error("Duplicated capability: " + this.name);
        return d[this.name] = this, this
    }, n.prototype.getName = function() {
        return this.name
    }, n.prototype.getSuperset = function() {
        return this.options.superset
    }, n.prototype.supportedBy = function(e) {
        try {
            return this.check(e)
        } catch (t) {
            return o.error("DEVICECAPABILITY_CHECK_FAILED", {
                name: this.name,
                deviceKey: e.key,
                msg: t.message
            }), !1
        }
    }, t.SOURCE_DUIRO = new n({
        name: "neeo.device.details.source-duiro",
        check: u.TYPE.EQUAL({
            in: ["details.sourceName"],
            value: a.SOURCE_DUIRO
        })
    }).register().getName(), t.SOURCE_SDK_ADAPTER = new n({
        name: "neeo.device.details.source-sdk-adapter",
        check: u.TYPE.MATCH({
            in: ["details.sourceName"],
            count: 1,
            pattern: /^(src-|neeo-deviceadapter)/
        })
    }).register().getName(), t.NEEO_DEVICE_PHANTOM = new n({
        name: "neeo.device.phantom",
        check: u.and(u.TYPE.EQUAL({
            in: ["details.name"],
            value: "Phantom"
        }), u.TYPE.EQUAL({
            in: ["details.manufacturer"],
            value: "NEEO"
        }))
    }).register().getName(), t.NEEO_COMPATIBILITY_ALWAYS_ON = new n({
        name: "neeo.compatibility.always-on",
        check: u.TYPE.MATCH({
            in: ["details.deviceCapabilities"],
            pattern: /^alwaysOn$/
        })
    }).register().getName(), t.NEEO_COMPATIBILITY_CHANNELSAVE = new n({
        name: "neeo.custom.channelsave",
        check: u.TYPE.MATCH({
            in: ["details.deviceCapabilities"],
            pattern: /^channelSave$/
        })
    }).register().getName(), t.NEEO_COMPATIBILITY_NO_INPUT_COMMANDS_NEEDED = new n({
        name: "neeo.compatibility.no-input-commands-needed",
        check: u.TYPE.MATCH({
            in: ["details.deviceCapabilities"],
            pattern: /^noInputCommandsNeeded$/
        })
    }).register().getName(), t.NEEO_COMPATIBILITY_NEEDS_CURSOR_INPUT = new n({
        name: "neeo.compatibility.needs-cursor-input",
        check: u.TYPE.MATCH({
            in: ["details.deviceCapabilities"],
            pattern: /^needsCursorInput$/
        })
    }).register().getName(), t.NEEO_DEVICE_NO_WIRING_INPUTS = new n({
        name: "neeo.device.no-wiring-inputs",
        check: u.and(u.TYPE.MATCH({
            in: ["macroNames"],
            pattern: /^INPUT\s(?!HDMI SCROLL|SCROLL|TUNER \d|NEXT|NEXT 2|PREVIOUS|UP|DOWN|TOGGLE|SELECT|HDMI NEXT|HDMI PREVIOUS|MODE AUTO)/,
            max: 0
        }), u.TYPE.MATCH({
            in: ["genericMacroNames"],
            pattern: /^INPUT\s/,
            count: 0
        }), u.TYPE.LIST({
            find: [
                [...i.ROLE_HUB_DEVICE_TYPES, ...i.ROLE_DESTINATION_DEVICE_TYPES]
            ],
            in: ["details.type"]
        }))
    }).register().getName(), t.NEEO_DEVICE_SMARTIFIED_POWER_MODE = new n({
        name: "neeo.device.smartified-power-mode",
        check: u.TYPE.LIST({
            find: [c.VIRTUAL_POWER_MODES],
            in: ["powerMode"]
        })
    }).register().getName(), t.INPUT_COMMANDS_NOT_WORKING = new n({
        name: "input-commands-not-working",
        check: u.and(u.TYPE.EQUAL({
            in: ["details.capabilities"],
            value: "input-commands-not-working"
        }), u.TYPE.LIST({
            find: [i.STUPID_DEVICE_TYPES],
            in: ["details.type"]
        }))
    }).register().getName(), t.MACRO_ONOFF_MISSING = new n({
        name: "macro-onoff-missing",
        check: u.and(u.TYPE.MATCH({
            in: ["macroNames"],
            pattern: /^POWER (ON|OFF)$/,
            max: 1
        }), u.not(d[t.NEEO_COMPATIBILITY_ALWAYS_ON].check), u.TYPE.LIST({
            find: [i.STUPID_DEVICE_TYPES],
            in: ["details.type"]
        })),
        options: {
            superset: t.NEEO_DEVICE_PHANTOM
        }
    }).register().getName(), t.NEEO_DEVICE_SUPPORTS_SMARTENER = new n({ 
        name: "neeo.device.supports-smartener",
        check: u.and(d[t.SOURCE_DUIRO].check, u.TYPE.LIST({
            find: [i.STUPID_DEVICE_TYPES],
            in: ["details.type"]
        }), u.or(u.TYPE.LIST({
            find: [a.HDMI_CONNECTIONS],
            in: ["details.connections.outputs"]
        }), u.TYPE.LIST({
            find: [a.HDMI_CONNECTIONS],
            in: ["details.connections.inputs"]
        })))
    }).register().getName(), t.NEEO_DEVICE_NEEDS_SPEC_UPDATE = new n({
        name: "neeo.device.needs-spec-update",
        check: u.and(d[t.SOURCE_DUIRO].check, u.TYPE.LIST({
            find: [i.STUPID_DEVICE_TYPES],
            in: ["details.type"]
        }), u.TYPE.UNDEFINED({
            in: ["details.connections"],
            value: []
        }))
    }).register().getName(), t.NO_COMMANDSET_AVAILABLE = new n({
        name: "no-commandsets-available",
        check: u.and(u.TYPE.EQUAL({
            in: ["details.commandSets.length"],
            value: 0
        }), d[t.SOURCE_DUIRO].check),
        options: {
            superset: t.NEEO_DEVICE_PHANTOM
        }
    }).register().getName();
    const l = e => u.TYPE.EQUAL({
        in: ["details.type"],
        value: s[e]
    });
    t.NEEO_DEVICE_TYPE_TV = new n({
        name: "neeo.device.type.tv",
        check: l("TYPE_TV")
    }).register().getName(), t.NEEO_DEVICE_TYPE_DVD = new n({
        name: "neeo.device.type.dvd",
        check: l("TYPE_DVD")
    }).register().getName(), t.NEEO_DEVICE_TYPE_VOD = new n({
        name: "neeo.device.type.vod",
        check: l("TYPE_VOD")
    }).register().getName(), t.NEEO_DEVICE_TYPE_ACCESSOIRE = new n({
        name: "neeo.device.type.accessoire",
        check: l("TYPE_ACCESSOIRE")
    }).register().getName(), t.NEEO_DEVICE_TYPE_PROJECTOR = new n({
        name: "neeo.device.type.projector",
        check: l("TYPE_PROJECTOR")
    }).register().getName(), t.NEEO_DEVICE_TYPE_DVB = new n({
        name: "neeo.device.type.dvb",
        check: l("TYPE_DVB")
    }).register().getName(), t.NEEO_DEVICE_TYPE_SONOS = new n({
        name: "neeo.device.type.sonos",
        check: l("TYPE_SONOS")
    }).register().getName(), t.NEEO_DEVICE_TYPE_AVRECEIVER = new n({
        name: "neeo.device.type.avreceiver",
        check: l("TYPE_AVRECEIVER")
    }).register().getName(), t.NEEO_DEVICE_TYPE_AUDIO = new n({
        name: "neeo.device.type.audio",
        check: l("TYPE_AUDIO")
    }).register().getName(), t.NEEO_DEVICE_TYPE_HDMISWITCH = new n({
        name: "neeo.device.type.hdmiswitch",
        check: l("TYPE_HDMISWITCH")
    }).register().getName(), t.NEEO_DEVICE_TYPE_GAMECONSOLE = new n({
        name: "neeo.device.type.gameconsole",
        check: l("TYPE_GAMECONSOLE")
    }).register().getName(), t.NEEO_DEVICE_TYPE_MEDIAPLAYER = new n({
        name: "neeo.device.type.mediaplayer",
        check: l("TYPE_MEDIAPLAYER")
    }).register().getName(), t.NEEO_DEVICE_TYPE_MUSICPLAYER = new n({
        name: "neeo.device.type.musicplayer",
        check: l("TYPE_MUSICPLAYER")
    }).register().getName(), t.NEEO_DEVICE_TYPE_SOUNDBAR = new n({
        name: "neeo.device.type.soundbar",
        check: l("TYPE_SOUNDBAR")
    }).register().getName(), t.NEEO_DEVICE_TYPE_TUNER = new n({
        name: "neeo.device.type.tuner",
        check: l("TYPE_TUNER")
    }).register().getName(), t.NEEO_DEVICE_TYPE_LIGHT = new n({
        name: "neeo.device.type.light",
        check: l("TYPE_LIGHT")
    }).register().getName(), t.NEEO_DEVICE_TYPE_THERMOSTAT = new n({
        name: "neeo.device.type.thermostat",
        check: l("TYPE_THERMOSTAT")
    }).register().getName(), t.NEEO_DEVICE_TYPE_HVAC = new n({
        name: "neeo.device.type.hvac",
        check: l("TYPE_HVAC")
    }).register().getName(), t.NEEO_VENDOR_TYPE_SKY = new n({
        name: "neeo.vendor.sky",
        check: u.and(d[t.SOURCE_DUIRO].check, u.TYPE.EQUAL({
            in: ["details.manufacturer"],
            value: "Sky"
        }))
    }).register().getName(), t.VOLUME_STEP = new n({
        name: "volume-step",
        check: u.TYPE.LIST({
            find: ["VOLUME UP", "VOLUME DOWN", "^MUTE TOGGLE"],
            in: ["macroNames"]
        })
    }).register().getName(), t.IR_BUTTON_GUIDE = new n({
        name: "ir-button-guide",
        check: u.TYPE.LIST({
            find: ["GUIDE"],
            in: ["macroNames"]
        })
    }).register().getName(), t.NEEO_FEATURE_PLAYER = new n({
        name: "neeo.feature.player",
        check: u.and(u.or(d[t.NEEO_DEVICE_TYPE_MUSICPLAYER].check, d[t.NEEO_DEVICE_TYPE_MEDIAPLAYER].check, d[t.NEEO_DEVICE_TYPE_VOD].check), u.TYPE.LIST({
            find: [a.PLAYER_SENSORS],
            in: ["sensorNames"]
        }))
    }).register().getName(), t.NEEO_FEATURE_PLAYER_FULLSCREEN = new n({
        name: "neeo.feature.player-fullscreen",
        check: u.and(d[t.NEEO_FEATURE_PLAYER].check)
    }).register().getName(), t.NEEO_FEATURE_BRIDGE_DEVICE = new n({
        name: "neeo.feature.bridge-device",
        check: u.or(u.TYPE.MATCH({
            in: ["details.deviceCapabilities"],
            pattern: /^bridgeDevice$/
        }), u.and(u.TYPE.EQUAL({
            in: ["details.sourceName"],
            value: "adapter"
        }), u.TYPE.EQUAL({
            in: ["details.adapterName"],
            value: "hue"
        }), u.TYPE.EQUAL({
            in: ["details.manufacturer"],
            value: "Philips"
        })))
    }).register().getName(), t.NEEO_FEATURE_QUEUEDIRECTORY_SUPPORT = new n({
        name: "neeo.feature.queuedirectory-support",
        check: u.TYPE.LIST({
            in: ["directoryRoles"],
            find: ["QUEUE"]
        })
    }).register().getName(), t.NEEO_FEATURE_ADD_ANOTHER_DEVICE = new n({
        name: "neeo.feature.add-another-device",
        check: u.TYPE.MATCH({
            in: ["details.deviceCapabilities"],
            pattern: /^addAnotherDevice$/
        })
    }).register().getName(), t.NEEO_FEATURE_GROUP_VOLUME = new n({
        name: "neeo.feature.group-volume",
        check: u.TYPE.MATCH({
            in: ["details.deviceCapabilities"],
            pattern: /^groupVolume$/
        })
    }).register().getName(), t.NEEO_FEATURE_WIRING_RESETTABLE = new n({
        name: "neeo.feature.wiring-resettable",
        check: u.TYPE.LIST({
            find: [i.RESETTABLE_DEVICES],
            in: ["details.type"]
        })
    }).register().getName(), t.NEEO_FEATURE_RECIPE_HIDDEN = new n({
        name: "neeo.feature.recipe-hidden",
        check: u.or(u.TYPE.LIST({
            find: [i.RECIPE_HIDDEN_DEVICE_TYPES],
            in: ["details.type"]
        }), d[t.NEEO_DEVICE_PHANTOM].check)
    }).register().getName(), t.NEEO_FEATURE_GROUPED_DEVICE = new n({
        name: "neeo.feature.grouped-device",
        check: u.TYPE.LIST({
            find: [i.RECIPE_GROUPED_DEVICE_TYPES],
            in: ["details.type"]
        })
    }).register().getName(), t.NEEO_FEATURE_SHORTCUTS = new n({
        name: "neeo.feature.shortcuts",
        check: u.not(u.TYPE.LIST({
            find: [i.DEVICETYPES_WITHOUT_SHORTCUTS],
            in: ["details.type"]
        }))
    }).register().getName(), t.NEEO_FEATURE_FAVORITES = new n({
        name: "neeo.feature.favorites",
        check: u.and(u.TYPE.LIST({
            find: [i.DEVICETYPES_WITH_FAVORITES],
            in: ["details.type"]
        }), u.or(u.TYPE.EQUAL({
            in: ["details.useTuner"],
            value: !0
        }), u.TYPE.UNDEFINED({
            in: ["details.useTuner"]
        })))
    }).register().getName(), t.NEEO_FEATURE_POWER_STATE_SUPPORTED = new n({
        name: "neeo.feature.power-state-supported",
        check: u.and(u.not(d[t.NEEO_COMPATIBILITY_ALWAYS_ON].check), u.not(d[t.MACRO_ONOFF_MISSING].check))
    }).register().getName(), t.NEEO_FEATURE_FAVORITES_CUSTOM_HANDLER = new n({
        name: "neeo.feature.favorites-custom-handler",
        check: u.and(d[t.NEEO_FEATURE_FAVORITES].check, u.TYPE.MATCH({
            in: ["details.deviceCapabilities"],
            pattern: /^customFavoriteHandler$/
        }))
    }).register().getName(), t.extractAll = function(e) {

        const t = [];
        if (!e) return t;
        for (const r in d) {
            d[r].supportedBy(e) && t.push(r)
        }
        return t.filter(e => -1 === t.indexOf(d[e].getSuperset()))
    }, t.check = function(e, t) {
        return !!d[e] && d[e].supportedBy(t)
    }
}, function(e, t, r) {// Function 22 key handler
    "use strict";
    AllFunctions(0)("Function 22").verbose("");
    const n = r(260);
    let o = n;
    const i = e.exports = function(e, t) {
        if (this.key = e, this.key) {
            if (!i.isValidKey(this.key)) throw new Error("Invalid key provided! (" + this.key + ")")
        } else this.key = o();
        if (!this.key) throw new Error("Could not generate an item key!");
        this.weight = Number.isFinite(t) ? t : parseInt(this.key, 10)
    };
    i.compareByWeight = function(e, t) {
        return e.weight - t.weight
    }, i.reorder = function(e, t, r) {
        const n = e.sort(i.compareByWeight),
            o = n[t],
            s = n.filter((e, r) => r !== t);
        return [...s.slice(0, r), o, ...s.slice(r, s.length)].map((e, t) => (e.weight = t, e)).sort(i.compareByWeight)
    }, i.resetIdGenerator = function() {
        o = n
    }, i.setIdGenerator = function(e) {
        e && (o = e)
    }, i.isValidKey = function(e) {
        return "string" == typeof e && !isNaN(parseInt(e), 10)
    }, i.prototype.getKey = function() {
        return this.key 
    }, i.prototype.getName = function() {
        return this.name 
    }, i.prototype.setKey = function(e) {
        this.key = e
    }
}, function(e, t, r) {// Function 23 fill local variables based on params
    "use strict";
    AllFunctions(0)("Function 23").verbose("");
    const n = r(11),
        o = r(22),
        i = e.exports = function(e) {
            this.name = e.name, this.medium = e.medium, this.payload = e.payload, o.call(this, e.key)
        };
    n.inherits(i, o), i.build = function(e) {
        return new i(e)
    }, i.prototype.getName = function() {
        return this.name
    }, i.prototype.getPayload = function() {
        return this.payload
    }, i.prototype.toSafeJSON = function() {}, i.prototype.getMedium = function() {
        return this.medium
    }
}, function(e, t, r) {// Function 24 new r(186))(r(2).account)
    //"use strict";
    AllFunctions(0)("Function 24").verbose("");
    const n = r(2).account,   //account: {duiroFormatVersion: "V1"},
        o = new(r(186))(n);   //new(entire Cloud-handler)(){duiroFormatVersion: "V1"})
    e.exports = o
}, function(e, t) {// Function 25 set (init?) various notificatio fields 
    //"use strict";
    //AllFunctions(0)("Function 25").verbose("");
    t.NOTIFICATION_ACTIVE_NOW_CHANGED = "active-now-changed", t.NOTIFICATION_ACTIVE_SCENARIOS_CHANGED = "active-scenarios", t.NOTIFICATION_PUSH_ACTION = "push-action", t.NOTIFICATION_PROJECT_CHANGED = "projectchanged", t.NOTIFICATION_DEVICE_SENSOR_UPDATE = "DEVICE_SENSOR_UPDATE", t.NOTIFICATION_CEC_POWERSTATE = "NEEO_CEC_POWERSTATE", t.PROJECT_NAME = "home", t.PROJECT_VERSION = "1.0.10"
}, function(e) {// Function 26 exports = require("fs")
    e.exports = require("fs")
}, function(e, t, r) {// Function 27 Looks like HUGE!!! general "activation / setup" routines.
    "use strict";
    AllFunctions(0)("Function 27").verbose("");

    function n(e) {
        return p.resolve(U.build(e.project)).then(e => (e.setActive(), e.activate()))
    }
    const o = r(130),
        i = r(88),
        s = r(29),
        a = r(70),
        c = r(86),
        u = r(126),
        d = r(278),
        l = r(279),
        p = r(1),
        h = r(11),
        g = r(41),
        m = r(9),
        f = r(51),
        E = r(149),
        y = r(333),
        _ = r(0)("project"),
        v = r(2).project,
        T = r(22),
        I = r(82),
        A = r(155),
        S = r(83),
        N = r(25),
        R = r(156),
        O = r(3),
        C = r(58).iconify,
        w = N.PROJECT_VERSION,
        D = N.PROJECT_NAME;
    let b, P = null,
        L = null;
    const U = e.exports = function(e) {
        e = a(e || {}, {
            name: D,
            version: w,
            configured: !1,
            airkey: g.randomBytes(16).toString("hex")
        }), this.name = e.name, this.version = e.version, this.label = e.label || "Welcome to NEEO", this.configured = e.configured, this.gdprAccepted = e.gdprAccepted, this.airkey = e.airkey, this.rooms = new I({
            name: "Rooms",
            keyProperty: "name",
            silentReplace: !1,
            caseSensitive: !1
        }), this.lastchange = 0, T.call(this, e.key), S.registerNotificationCallback(this.sendChangeNotification.bind(this)), this.saveDebounced = l(() => {
            _.debug("SAVE_PROJECT_DEBOUNCED"), this.save().catch(e => {
                _.error("PROJECT_SAVE_DEBOUNCE", {
                    error: e.message
                })
            })
        }, 2e3)
    };
    h.inherits(U, T), U.build = function(e) {
        const t = new U({
            name: e.name,
            label: e.label,
            version: e.version,
            configured: e.configured,
            gdprAccepted: e.gdprAccepted,
            key: e.key,
            airkey: e.airkey
        });
        return s(e.rooms).forEach(e => {
            t.addRoom(E.build(e))
        }), y.validateAndClean(t), O.increaseCounter("project-build"), t
    }, U.load = function() {
        AllFunctions(0)("Function 27").verbose("Load project",{} );
        return A.loadLatestProject().then(e => U.build(e.project))
    }, U.createDefault = function(e) {
        const t = new U({
            name: e
        });
        return v.defaultRooms.forEach(e => {
            t.addRoom(new E({
                name: e.name,
                icon: "neeo.icon.room." + e.icon
            }))
        }), t
    }, U.get = function(e) {
        if (e = D, P && P.getName() === e) return p.resolve(P);
        if (L) return _.debug("Project get already in progress"), L;
        let t;
        return L = U.load(e).then(e => (t = e, t)).catch(r => (_.warn("LOAD_PROJECT_FAILED_CREATING_DEFAULT", {
            name: e,
            err: r.message,
            stack: r.stack
        }), t = U.createDefault(), t)).finally(() => {
            t.setActive(), L = null
        })
    }, U.activeProject = function() {
        return P ? p.resolve(P) : U.get()
    }, U.restore = function(e) {
        return A.restoreProject(e).then(n).catch(t => {
            throw _.error("RESTORE_PROJECT", {
                version: e,
                error: t.message
            }), t
        })
    }, U.restoreFromBackup = function(e) {
        return A.restoreCloudBackup(e).then(n).catch(e => {
            throw _.error("RESTORE_BACKUP", {
                error: e.message
            }), e
        })
    }, U.checkAirkey = function(e) {
        return U.activeProject().then(t => A.checkAirkey(t, e))
    }, U.prototype.activeNowChanged = function() {
        const e = this.getActiveScenarioKeys();
        S.activeNowChanged(e)
    }, U.prototype.flagTr2ToReloadGuiXml = function() {
        this.lastchange = Date.now()
    }, U.prototype.sendChangeNotification = function() {
        const e = this.getControllerRoom(),
            t = !!e && e.getName();
        return this.flagTr2ToReloadGuiXml(), S.projectChanged(this.lastchange, t), null
    }, U.prototype.setActive = function() {
        P = this
    }, U.prototype.acceptGDPR = function() {
        return this.gdprAccepted = !0, this.saveWithoutChangeNotifications().catch(e => {
            throw _.error("GDPR_ACCEPT_FAILED", {
                name: this.name,
                error: e.message
            }), e
        })
    }, U.prototype.activate = function() {
        return O.increaseCounter("project-activated"), _.debug("activate project"), b && (clearTimeout(b), b = !1), this.buildScenarios(), this.buildRecipes(), this.reloadScheduler(), this.save().catch(e => {
            throw _.error("ACTIVATE_PROJECT", {
                name: this.name,
                error: e.message
            }), e
        }).then(() => this)
    }, U.prototype.scheduleActivation = function() {
        b && clearTimeout(b), b = setTimeout(() => {
            b = !1, this.activate()
        }, v.lazyActivationDebounceMs)
    }, U.prototype.getName = function() {
        return this.name
    }, U.prototype.getLabel = function() {
        return this.label
    }, U.prototype.setLabel = function(e) {
        this.label = e
    }, U.prototype.isConfigured = function() {
        return this.configured
    }, U.prototype.getLastChangeTs = function() {
        return this.lastchange
    }, U.prototype.setConfigured = function(e) {
        c(e) && (this.configured = e)
    }, U.prototype.versions = function() {
        return A.listVersions()
    }, U.prototype.restoreLastVersion = function() {
        return this.versions().then(e => {
            const t = e[e.length - 1];
            return U.restore(t)
        })
    }, U.prototype.addDeviceToFirstRoom = function(e, t, r, n) {
        const o = this.getRooms();
        if (!o || 0 === o.length) return p.reject(new Error("No rooms configured!"));
        const i = o[0];
        return this.addDeviceToRoom(i, e, t, r, n)
    }, U.prototype.addDeviceToRoom = function(e, t, r, n, o) {
        return O.increaseCounter("project-device-add"), R.addDeviceToRoom(e, t, r, n, o)
    }, U.prototype.replaceDevice = function(e, t) {
        const r = e.id,
            n = this.getDevices(e => e.adapterDeviceId === r)[0],
            o = this.getRoomByKey(n.getRoomKey()),
            i = e.device.name,
            s = "adapter" + e.device.dbId;
        return this.deleteDevice(n).then(() => this.addDeviceToRoom(o, i, s, r, t)).then(e => (this.scheduleActivation(), e))
    }, U.prototype.getConfig = function() {
        const e = ["lastchange"];
        return new p(t => {
            const r = Object.assign({}, this);
            e.forEach(e => {
                r[e] = void 0
            }), t(r)
        })
    }, U.prototype.saveWithoutChangeNotifications = function() {
        return A.saveProject(this) //$$$
    }, U.prototype.save = function() {  // save project
        return _.debug("save NOW"), this.saveWithoutChangeNotifications().then(e => e ? this.sendChangeNotification() : null).catch(e => {
            throw _.error("SAVE_PROJECT", e.message), e
        })
    }, U.prototype.buildScenarios = function() {
        this.rooms.forEach(e => {
            e.buildScenarios()
        })
    }, U.prototype.buildRecipes = function() {
        this.rooms.forEach(e => {
            e.rebuildScenarioRecipes()
        })
    }, U.prototype.deleteDevice = function(e) {
        const t = this.rooms.map(t => t.deleteDeviceHelper(e));
        return p.all(t)
    }, U.prototype.deleteAllDevicesInRoom = function(e) {
        const t = e.getDevices().map(e => this.deleteDevice(e));
        return p.all(t)
    }, U.prototype.getRoomByName = function(e) {
        return this.rooms.get(e)
    }, U.prototype.getRoomByKey = function(e) {
        return this.rooms.getByKey(e)
    }, U.prototype.getRoomNames = function() {
        return this.rooms.map(e => e.getName())
    }, U.prototype.getRooms = function(e) {
        return this.rooms.filter(e)
    }, U.prototype.addRoom = function(e) {
        O.increaseCounter("project-room-add"), this.rooms.put(e)
    }, U.prototype.renameRoom = function(e, t) {
        const r = this.getRoomByName(t);
        if (r && r.key !== e.key) throw new Error("Failed to rename room, room with the new-name already exists");
        e.setName(t)
    }, U.prototype.getScenarios = function(e) {
        return u(this.rooms.map(t => t.getScenarios(e)))
    }, U.prototype.getRecipes = function(e) {
        return u(this.rooms.map(t => t.getRecipes(e)))
    }, U.prototype.getControllerRoom = function() {
        return this.rooms.find(e => e.hasController)
    }, U.prototype.removeRoom = function(e) {
        if (e.hasController) throw new Error(m(null, "room_delete", "has_controller").message);
        return 0 < e.getNumberOfDevices() ? this.deleteAllDevicesInRoom(e).catch(() => p.reject(new Error(m(null, "room_delete", "remove_devices_failed").message))).then(() => this.rooms.remove(e)) : (this.rooms.remove(e), p.resolve())
    }, U.prototype.reloadScheduler = function() {
        O.increaseCounter("project-reload-scheduler"), f.reloadSchedulerService((() => {
            return this.getRecipes(e => e.hasActivity()).map(e => e.getActivity())
        })())
    }, U.prototype.getActiveScenarios = function() {
        return this.getScenarios(e => e.isActive())
    }, U.prototype.getActiveScenarioKeys = function() {
        return this.getActiveScenarios().map(e => e.getKey())
    }, U.prototype.getDevices = function(e) {
        let t = [];
        return e = e || (() => !0), this.rooms.forEach(r => {
            const n = r.getDevices(),
                o = d(n, e);
            t = t.concat(o)
        }), t
    }, U.prototype.getDevicesWithCapability = function(e) {
        return this.getDevices(t => t.hasCapability(e))
    }, U.prototype.getDeviceByKey = function(e) {
        return this.getDevices().find(t => t.getKey() === e)
    }, U.prototype.getDeviceByName = function(e) {
        return AllFunctions(0)("27").verbose("in getbyname"),this.getDevices().find(t =>t.getName() === e)
    }, U.prototype.getDeviceByadapterDeviceId = function(e) {
        return AllFunctions(0)("27").verbose("in getDeviceByadapterDeviceId"),this.getDevices().find(t => t.adapterDeviceId.trim() === e.trim() )
    }, U.prototype.getSensors = function(e) {
        return u(this.getDevices().map(t => t.getSensors(e)))
    }, U.prototype.getSensorByEventKey = function(e) {
        return this.getSensors().find(t => t.eventKey === e)
    }, U.prototype.getSwitches = function() {
        return u(this.getDevices().map(e => e.getSwitches()))
    }, U.prototype.getSliders = function() {
        return u(this.getDevices().map(e => e.getSliders()))
    }, U.prototype.getAllFavorites = function() {
        return u(this.getDevices().map(e => e.getFavorites()))
    }, U.prototype.getDirectories = function() {
        return u(this.getDevices().map(e => e.getDirectories()))
    }, U.prototype.getDirectoryByKey = function(e) {
        return this.getDirectories().find(t => t.getKey() === e)
    }, U.prototype.scenarioKeyToMaindeviceIcon = function(e) {
        const t = {},
            r = e => {
                const t = this.getScenarios(t => t.getKey() === e);
                if (t[0] && t[0].getIcon()) {
                    return C(t[0].getIcon())
                }
                return ""
            };
        return e.map(e => {
            t[e] = r(e)
        }), t
    }, U.prototype.activateScenarioExclusively = function(e) {
        this.getScenarios().forEach(t => {
            e.getKey() !== t.getKey() && e.hasSameTargetDevice(t) && (t.active = !1)
        }), e.activate()
    }, U.prototype.getActiveDevicesUsingTargetDevice = function(e) {
        const t = e.getDevices().map(e => e.getKey()),
            r = e => !e.isMarkedAsOff() && -1 === t.indexOf(e.getKey()),
            n = o(this.getScenarios(t => e.getKey() !== t.getKey() && e.hasSameTargetDevice(t)), e => e.getDevices(r));
        return i(n, e => e.getKey())
    }, U.prototype.toSafeJSON = function() {
        const e = Object.assign({}, this);
        return e.airkey = void 0, e
    }, U.prototype.isAllowedToAddRoom = function() {
        return this.rooms.length < v.maximalRooms
    }
}, function(e, t, r) {// Function 28 Get various layout settings
    "use strict";
    AllFunctions(0)("Function 29").verbose("");

    function n() {
        return o.useProUI()
    }
    const o = r(12),
        i = r(7),
        s = 670;
    e.exports = {
        useProUI: n,
        screenHeightWithoutStatusBar: s,
        getContentLayout: function() {
            return {
                top: i.content.top,
                width: i.content.width,
                height: i.content.height,
                margin: 0,
                padding: 0,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                flexDirection: "row",
                flexWrap: "wrap"
            }
        },
        getScenarioLayout: function() {
            return {
                top: 0,
                width: i.screen.width,
                height: s,
                margin: 0,
                padding: 0,
                paddingTop: 30,
                justifyContent: "flex-start",
                alignContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "row",
                flexWrap: "wrap"
            }
        },
        getShortcutLayout: function() {
            return {
                top: 0,
                width: i.screen.width,
                height: s,
                margin: 0,
                paddingBottom: i.shortcutStyle.paddingBottom,
                paddingLeft: i.shortcutStyle.paddingSides,
                paddingRight: i.shortcutStyle.paddingSides,
                paddingTop: i.shortcutStyle.paddingTop,
                justifyContent: "space-around",
                alignContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "row",
                flexWrap: "wrap"
            }
        },
        getInputLayout: function() {
            return {
                top: 0,
                width: i.screen.width,
                height: s,
                margin: 0,
                padding: 0,
                paddingTop: 10,
                justifyContent: "space-around",
                alignContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "row",
                flexWrap: "wrap",
                element: {
                    width: 200,
                    height: 105
                }
            }
        },
        getLightLayout: function() {
            return {
                top: 0,
                width: i.screen.width,
                height: s,
                margin: 0,
                padding: 0,
                paddingTop: 0,
                alignItems: "center",
                flexWrap: "column"
            }
        },
        getFavoriteStyle: function() {
            const e = {
                entriesPerPage: 12,
                imageWidth: 100,
                imageHeight: 80,
                imageContainerHeight: 120
            };
            return n() ? Object.assign(e, {
                backgroundColor: "#FF000000",
                buttonBackgroundColor: "#FF1F1F1F",
                activeButtonBackgroundColor: "#FF2F2F2F",
                buttonPlaceholderTextColor: "#FFFFFFFF",
                elementWidth: 155,
                elementHeight: 155,
                verticalOffset: 4
            }) : Object.assign(e, {
                backgroundColor: "#66FFFFFF",
                buttonPlaceholderTextColor: "#FF000000",
                buttonBackgroundColor: "#66FFFFFF",
                activeButtonBackgroundColor: "#FFD3D3D3",
                elementWidth: 150,
                elementHeight: 140,
                verticalOffset: 20
            })
        },
        getManualPowerOffLayout: function() {
            return {
                top: 0,
                width: i.screen.width,
                maxWidth: i.screen.width,
                height: s,
                margin: 0,
                padding: 0,
                paddingTop: 270,
                justifyContent: "space-around",
                alignContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "row",
                flexWrap: "wrap"
            }
        },
        getActiveNowLayout: function(e, t) {
            return {
                style: {
                    top: 5,
                    width: e,
                    height: 3 * t,
                    margin: 0,
                    padding: 0,
                    flexDirection: "column"
                }
            }
        },
        getBackgroundImageStyle: function() {
            return n() ? {
                backgroundGradientColorTop: "#FF1d1d1d",
                backgroundGradientColorBottom: "#FF000000",
                headerBackgroundColor: "#FF000000"
            } : {
                headerBackgroundColor: "#A0707070"
            }
        },
        getAssumptionButtonLayout: function() {
            return {
                device: {
                    height: 100,
                    text: {
                        initialVerticalPosition: 173
                    },
                    button: {
                        initialVerticalPosition: 150
                    },
                    lineOffset: -15
                },
                minHeight: 267,
                doneButtonOffset: -85,
                horizontalSeparatorOffset: -1
            }
        }
    }
}, function(e) {// Function 29 exports = require("lodash/values")
    e.exports = require("lodash/values")
}, function(e, t, r) {// Function 30 roles?
    "use strict";
    AllFunctions(0)("Function 30").verbose("");
    const n = r(125),
        o = r(229),
        i = r(19);
    t.ROLE_SOURCE = "SOURCE", t.ROLE_DESTINATION = "DESTINATION", t.ROLE_HUB = "HUB", t.ROLES = [t.ROLE_SOURCE, t.ROLE_DESTINATION, t.ROLE_HUB], t.ROLE_SOURCE_DEVICE_TYPES = [i.TYPE_DVD, i.TYPE_VOD, i.TYPE_DVB, i.TYPE_GAMECONSOLE, i.TYPE_MEDIAPLAYER, i.TYPE_TUNER], t.ROLE_HUB_DEVICE_TYPES = [i.TYPE_AVRECEIVER, i.TYPE_HDMISWITCH, i.TYPE_SOUNDBAR], t.ROLE_DESTINATION_DEVICE_TYPES = [i.TYPE_TV, i.TYPE_PROJECTOR, i.TYPE_AUDIO], t.STUPID_DEVICE_TYPES = o(t.ROLE_DESTINATION_DEVICE_TYPES, t.ROLE_HUB_DEVICE_TYPES, t.ROLE_SOURCE_DEVICE_TYPES), t.RESETTABLE_DEVICES = o(t.ROLE_SOURCE_DEVICE_TYPES, t.ROLE_HUB_DEVICE_TYPES), t.RECIPE_GROUPED_DEVICE_TYPES = [i.TYPE_LIGHT, i.TYPE_THERMOSTAT], t.NORECIPE_BUILD_DEVICE_TYPES = [i.TYPE_ACCESSOIRE, i.TYPE_UNKNOWN], t.RECIPE_HIDDEN_DEVICE_TYPES = [i.TYPE_AVRECEIVER, i.TYPE_HDMISWITCH, i.TYPE_SOUNDBAR, i.TYPE_PROJECTOR, i.TYPE_AUDIO], t.DEVICETYPES_WITH_FAVORITES = [i.TYPE_TV, i.TYPE_DVB, i.TYPE_TUNER], t.DEVICETYPES_WITHOUT_SHORTCUTS = [i.TYPE_SONOS, i.TYPE_ACCESSOIRE], t.rolesByDeviceType = function(e, r) {
        return n(t.ROLE_SOURCE_DEVICE_TYPES, e) ? [t.ROLE_SOURCE] : n(t.ROLE_DESTINATION_DEVICE_TYPES, e) ? e === i.TYPE_TV && r ? [t.ROLE_DESTINATION, t.ROLE_SOURCE] : [t.ROLE_DESTINATION] : n(t.ROLE_HUB_DEVICE_TYPES, e) ? [t.ROLE_HUB] : []
    }, t.sortDevicesBy = function(e) {
        return function(t, r) {
            return t.hasRole(e) ? -1 : r.hasRole(e) ? 1 : 0
        }
    }
}, function(e, t, r) {// Function 31 JN5168 Bootstrap
    "use strict";
    AllFunctions(0)("Function 31").verbose("JN5168 Bootstrap");

    function n(e) {
        return function(e) {
            AllFunctions(0)("Function 31").verbose("function n "+  c.port + " "+ c.jn5168Port,e);

            return e ? o.resolve("http://" + e.nbr_web_server + ":" + c.jn5168Port) : o.reject(new Error("INVALID_NBR_FILE_DETECTED"))
        }(e).then(e => (d.baseUrl = e, a.debug("NBR_IPV6_ADDR_FOUND", d.baseUrl), d.sendAirkey())).then(() => {
            m = !0
        })
    }
    const o = r(1),
        i = r(26),
        s = o.promisify(i.readFile),
        a = r(0)("JN5168 Bootstrap"),
        c = r(2).jn5168,
        u = r(288),
        d = e.exports = new u(c),
        l = r(290),
        p = new l({
            watchdogAction: l.nbrRestartAction,
            restartNbrAfterMaxErrorCount: c.jn5168restartNbrAfterMaxErrorCount,
            timeWindowMs: c.jn5168restartNbrAfterMaxErrorCount * c.jn5168RestIpv6FilePollingTimeMs
        });
    let h, g, m = !1;
    e.exports.bootstrapJn5168 = function() {
        function e() {
            return a.debug("try to read (updated) NBR file"), (e = t, s(e, "UTF8").then(e => JSON.parse(e)).catch(t => (a.debug(e, " not found, no ipv6 addr found yet", {
                error: t.message
            }), o.reject(new Error("NBR_FILE_NOT_FOUND_OR_VALID"))))).then(e => {
                return function(e) {
                    return !e || !(d.baseUrl === "http://" + e.nbr_web_server + ":" + c.jn5168Port && e && e.nbr_web_server)
                }(e) || !m ? n(e).catch(e => (p.increaseError(), m = !1, a.info("NBR_ENABLE_DISCOVERY_FAILED", {
                    error: e.message
                }), o.reject(new Error("NBR_ENABLE_DISCOVERY_FAILED")))) : void 0
            });
            var e
        }
        a.debug("BOOTSTRAP_JN5168");
        //AllFunctions(0)("Function 31").verbose("bootstrapJn5168 II");
        AllFunctions(0)("Function 31 (Outdated)").verbose("bootstrapJn5168 e:",e);
        return o.resolve();
/*    const t = c.jn5168RestIpv6File;
        return h = setInterval(() => {
            e().catch(() => {})
        }, c.jn5168RestIpv6FilePollingTimeMs), g = setInterval(() => {
            d.updateStatistics()
        }, c.nbrStatisticsIntervalInMs), e()*/
    }, e.exports.stopPolling = function() {
        h && clearInterval(h), g && clearInterval(g)
    }
}, function(e, t, r) {// Function 32 Analyse json structure for returncode
    "use strict";
    AllFunctions(0)("Function 32").verbose("");
    const n = r(1),
        o = r(117),
        i = /application\/json;/;
    e.exports = {
        extractInfo: function(e, t = 256) {
            const r = e.response && e.response.body;
            if (r && r.message) return r.statusCode = e.response.statusCode, r;
            if (r && r.error) {
                const n = "string" == typeof r.error ? r.error : JSON.stringify(r.error);
                return {
                    statusCode: e.response.statusCode,
                    message: n.substr(0, t)
                }
            }
            return e.statusCode && e.error ? {
                statusCode: e.statusCode,
                message: JSON.stringify(e.error).substr(0, t)
            } : {
                message: e.message.substr(0, t),
                statusCode: e.statusCode
            }
        },
        parseJSONError: function(e, t = !1) {
            const r = e.response,
                s = r && r.headers && i.test(r.headers["content-type"]);
            let a = !1;
            r && o(r.body) ? a = r.body : s && (a = JSON.parse(r.body));
            const c = a && a.message;
            return c && (e.message = c, e.status = r.statusCode), t && (e.message = t + e.message), n.reject(e)
        }
    }
}, function(e, t) {// Function 33 Set (init) various power-fields
    "use strict";
    AllFunctions(0)("Function 33").verbose("");
    t.MACRO_POWER_ON = "POWER ON", t.MACRO_POWER_OFF = "POWER OFF", t.MACRO_POWER_TOGGLE = "POWER TOGGLE", t.MACRO_POWER_TOGGLE_ON = "POWER TOGGLE ON", t.MACRO_POWER_TOGGLE_OFF = "POWER TOGGLE OFF", t.MACRO_VOLUME_UP = "VOLUME UP", t.MACRO_VOLUME_DOWN = "VOLUME DOWN", t.MACRO_MUTE_OFF = "MUTE OFF", t.MACRO_MUTE_ON = "MUTE ON", t.MACRO_MUTE_TOGGLE = "MUTE TOGGLE", t.MACRO_INPUT_TV = "INPUT TUNER 1", t.DISCRETE_POWER_ON_MACROS = [t.MACRO_POWER_ON, t.MACRO_POWER_TOGGLE_ON], t.DISCRETE_POWER_OFF_MACROS = [t.MACRO_POWER_OFF, t.MACRO_POWER_TOGGLE_OFF], t.DISCRETE_POWER_MACROS = [...t.DISCRETE_POWER_ON_MACROS, ...t.DISCRETE_POWER_OFF_MACROS], t.TEST_IS_POWER_ON = /POWER ON/, t.TEST_IS_POWER_OFF = /POWER OFF/, t.TEST_IS_POWER_TOGGLE = /POWER TOGGLE/, t.TEST_IS_SOURCE_SWITCH = /INPUT .+/, t.TEST_IS_VOLUME = /^(VOLUME|MUTE)/, t.isVolume = function(e) {
        return t.TEST_IS_VOLUME.test(e)
    }
}, function(e, t, r) {// Function 34 execute ... generic function to execute (scropts in a?) file
    "use strict";
    AllFunctions(0)("Function 34").verbose("");
    const n = r(1),
        o = r(138).execFile,
        i = r(0)("execute");
    e.exports = {    

        execFile: function(e, t, r) {
            const s = {};
            AllFunctions(0)("Function 34").verbose("Exec",e,t);
            return e ? t && !Array.isArray(t) ? n.reject(new Error("Args parameter must be an array")) : (r && (s.timeout = r), t && !t.every(e => {
                const t = typeof e;
                return "boolean" == t || "string" == t || "number" == t
            }) ? n.reject(new Error("All arguments must be a boolean, string or number")) : (i.debug("34 Run", e, " with arguments:", t), new n((r, n) => {
                let a = "";
                try {
                    const c = o(e, t, s, e => {
                        null === e ? r(a) : n(e)
                    });
                    c.on("exit", t => {
                        i.debug("exit signal", t), 0 !== t && n(new Error(e + " exited with code " + t))
                    }), c.stdout && c.stdout.on("data", e => {
                        a += e.toString()
                    })
                } catch (r) {
                    return i.error("EXEC_FAILED", {
                        path: e,
                        args: t,
                        error: r.message
                    }), n(r)
                }
            }))) : n.reject(new Error("No path specified"))
        }
    }
}, function(e) {// Function 35 default settings for a room.. .and much more.....
    "use strict";
    AllFunctions(0)("Function 35").verbose("");

    function t(e) {
        if (this.chr = e.chr, this.font = e.font || i, this.color = e.color || s, this.activeColor = e.activeColor || a, !this.chr) throw new Error("icon char is required!")
    }

    function r(e, r) {
        let i = o[e];
        return !i && r && (i = o[r]), new t(i ? "string" == typeof i ? {
            chr: i
        } : i : {
            chr: o[n]
        })
    }
    const n = "Generic Room",
        o = {
            "Generic Room": "#e057",
            "Generic Scenario": "#e01d",
            PowerOffDark: {
                chr: "#e028",
                font: "symbol",
                color: "#FF000000",
                activeColor: "#FF00A2E6"
            },
            SourceSwitchDark: {
                chr: "#e084",
                font: "symbol",
                color: "#FF000000",
                activeColor: "#FF00A2E6"
            },
            Back: {
                chr: "#e01b",
                font: "smallsymbol"
            },
            BackBold: {
                chr: "#e034",
                font: "smallsymbol"
            },
            BackBoldDark: {
                chr: "#e034",
                font: "smallsymbol",
                color: "#FF404040",
                activeIcoColor: "#FFCCCCCC"
            },
            Forward: {
                chr: "#e018",
                font: "smallsymbol"
            },
            ForwardBold: {
                chr: "#e033",
                font: "smallsymbol"
            },
            Menu: {
                chr: "#e06d",
                font: "smallsymbol"
            },
            PowerOff: {
                chr: "#e028",
                font: "symbol"
            },
            PowerOffWhite: {
                chr: "#e028",
                font: "symbol",
                activeColor: "#FFFFFFFF"
            },
            "neeo.icon.room.default": "#e057",
            "neeo.icon.room.living-room": "#e014",
            "neeo.icon.room.bedroom": "#e016",
            "neeo.icon.room.kitchen": "#e059",
            "neeo.icon.room.kids-bedroom": "#e048",
            "neeo.icon.room.office": "#e073",
            "neeo.icon.room.basement": "#e00b",
            "neeo.icon.room.garden": "#e05e",
            "neeo.icon.room.garage": "#e04f",
            "neeo.icon.room.cinema": "#e047",
            "neeo.icon.room.library": "#e04d",
            "neeo.icon.room.family-room": "#e05d",
            "neeo.icon.room.bonus-room": "#e04e",
            "neeo.icon.room.bathroom": "#e046",
            "neeo.icon.room.house": "#e088",
            Devices: "#e011",
            Macros: "#e00a",
            Recipes: "#e096",
            Account: "#e003",
            About: "#e03f",
            Reload: "#e069",
            Upgrade: "#e099",
            TV: "#e00d",
            tv: {
                chr: "#e00d",
                font: "smallsymbol"
            },
            DVD: "#e027",
            dvd: {
                chr: "#e027",
                font: "smallsymbol"
            },
            SONOS: "#e092",
            sonos: {
                chr: "#e092",
                font: "smallsymbol"
            },
            APPLETV: "#e091",
            appletv: {
                chr: "#e091",
                font: "smallsymbol"
            },
            "NEEO-BRAIN": "#e065;",
            "neeo-brain": {
                chr: "#e065",
                font: "smallsymbol"
            },
            LIGHT: "#e071",
            light: {
                chr: "#e071",
                font: "smallsymbol"
            },
            GAMECONSOLE: "#e043",
            gameconsole: {
                chr: "#e043",
                font: "smallsymbol"
            },
            MEDIAPLAYER: "#e07a",
            mediaplayer: {
                chr: "#e07a",
                font: "smallsymbol"
            },
            MUSICPLAYER: "#e005",
            musicplayer: {
                chr: "#e005",
                font: "smallsymbol"
            },
            PROJECTOR: "#e010",
            projector: {
                chr: "#e010",
                font: "smallsymbol"
            },
            THERMOSTAT: "#e032",
            thermostat: {
                chr: "#e032",
                font: "smallsymbol"
            },
            TUNER: "#e012",
            tuner: {
                chr: "#e012",
                font: "smallsymbol"
            },
            VOD: "#e07a",
            vod: {
                chr: "#e07a",
                font: "smallsymbol"
            },
            DVB: "#e012",
            dvb: {
                chr: "#e012",
                font: "smallsymbol"
            },
            AVRECEIVER: "#e011",
            avreceiver: {
                chr: "#e011",
                font: "smallsymbol"
            },
            HDMISWITCH: "#e011",
            hdmiswitch: {
                chr: "#e011",
                font: "smallsymbol"
            },
            AUDIO: "#e005",
            audio: {
                chr: "#e005",
                font: "smallsymbol"
            },
            SOUNDBAR: "#e005",
            soundbar: {
                chr: "#e005",
                font: "smallsymbol"
            },
            CLIMA: "#e032",
            clima: {
                chr: "#e032",
                font: "smallsymbol"
            },
            SNAKE: "#e08e",
            snake: {
                chr: "#e08e",
                font: "smallsymbol"
            },
            RECIPE: "#e096",
            "neeo.icon.recipe.macros": "#e00a",
            "neeo.icon.recipe.tv": "#e00d",
            "neeo.icon.recipe.dvd": "#e027",
            "neeo.icon.recipe.light": "#e071",
            "neeo.icon.recipe.gameconsole": "#e043",
            "neeo.icon.recipe.projector": "#e010",
            "neeo.icon.recipe.thermostat": "#e032",
            "neeo.icon.recipe.tuner": "#e012",
            "neeo.icon.recipe.vod": "#e07a",
            "neeo.icon.recipe.avreceiver": "#e011",
            "neeo.icon.recipe.soundbar": "#e005",
            "neeo.icon.recipe.default": "#e096",
            "neeo.icon.recipe.sonos": "#e092",
            "neeo.icon.recipe.appletv": "#e091",
            shortcut: "#e093",
            "shortcut.dvd": "#e027",
            "shortcut.input": "#e084",
            "shortcut.back": "#e049",
            "shortcut.forward": "#e03a",
            "shortcut.power-on": "#e09a",
            "shortcut.power-off": "#e09a",
            "shortcut.power-toggle": "#e09a",
            "shortcut.menu": "#e06f",
            "shortcut.rec": "#e03c",
            "shortcut.my-recordings": "#e051",
            "shortcut.mute-toggle": "#e077",
            "shortcut.function-red": {
                chr: "#e05f",
                color: "#fff53d3d",
                activeColor: "#7ff53d3d",
                font: "symbol"
            },
            "shortcut.function-green": {
                chr: "#e05f",
                color: "#ff09aa09",
                activeColor: "#7f09aa09",
                font: "symbol"
            },
            "shortcut.function-blue": {
                chr: "#e05f",
                color: "#ff3d3df5",
                activeColor: "#7f3d3df5",
                font: "symbol"
            },
            "shortcut.function-yellow": {
                chr: "#e05f",
                color: "#fff5f53d",
                activeColor: "#7ff5f53d",
                font: "symbol"
            },
            "shortcut.backward": "#e03e",
            "shortcut.reverse": "#e03e",
            "shortcut.pause": "#e037",
            "shortcut.stop": "#e038",
            "shortcut.play": "#e036",
            "shortcut.repeat": "#e085",
            "shortcut.next": "#e039",
            "shortcut.previous": "#e03b",
            "shortcut.next-track": "#e039",
            "shortcut.previous-track": "#e03b",
            "shortcut.cursor-up": "#e01a",
            "shortcut.cursor-down": "#e019",
            "shortcut.cursor-left": "#e01b",
            "shortcut.cursor-right": "#e018",
            "shortcut.volume-up": "#e008",
            "shortcut.volume-down": "#e006",
            "shortcut.shuffle": "#e072",
            "shortcut.channel-up": "#e01a",
            "shortcut.channel-down": "#e019",
            "shortcut.previous-channel": "#e09b",
            "shortcut.skip-seconds-forward": "#e08d",
            "shortcut.skip-seconds-backward": "#e007",
            "Skip Backward": "#e03e",
            "Skip Forward": "#e03a",
            "Skip Seconds Backward": "#e007",
            "Skip Seconds Forward": "#e08d",
            "Previous Track": "#e03b",
            "Next Track": "#e039",
            TransportReverse: "#e03e",
            TransportForward: "#e03a",
            TransportSkipReverse: "#e03b",
            TransportSkipForward: "#e039",
            SourceSwitch: "#e084",
            SourceSwitchWhite: {
                chr: "#e084",
                font: "symbol",
                activeColor: "#FFFFFFFF"
            },
            Queue: {
                chr: "#e086",
                font: "smallsymbol"
            },
            Shuffle: {
                chr: "#e072",
                color: "#FFD9D9D9",
                activeColor: "#FF404040"
            },
            ShuffleAll: {
                chr: "#e072",
                color: "#FF404040",
                activeColor: "#FF404040"
            },
            Repeat: {
                chr: "#e085",
                color: "#FFD9D9D9",
                activeColor: "#FF404040"
            },
            PlayAll: {
                chr: "#e08b",
                color: "#FF404040",
                activeColor: "#FF404040"
            },
            Close: {
                chr: "#e08c",
                font: "smallsymbol"
            },
            degree: "#e040",
            "Arrow Up": "#e08a",
            "Arrow Down": "#e089",
            More: "#e06b",
            Information: "#e079",
            "List Arrow Right": {
                chr: "#e033",
                color: "#ffe4e4e4",
                activeColor: "#7fe4e4e4",
                font: "symbol"
            },
            "List Arrow Left": {
                chr: "#e034",
                color: "#ffe4e4e4",
                activeColor: "#7fe4e4e4",
                font: "symbol"
            },
            "Filled Dot R": {
                chr: "#e05f",
                color: "#fff53d3d",
                activeColor: "#7ff53d3d",
                font: "symbol"
            },
            "Filled Dot r": {
                chr: "#e05f",
                color: "#fff53d3d",
                activeColor: "#7ff53d3d",
                font: "smallsymbol"
            },
            "Filled Dot G": {
                chr: "#e05f",
                color: "#ff09aa09",
                activeColor: "#7f09aa09",
                font: "symbol"
            },
            "Filled Dot g": {
                chr: "#e05f",
                color: "#ff09aa09",
                activeColor: "#7f09aa09",
                font: "smallsymbol"
            },
            "Filled Dot B": {
                chr: "#e05f",
                color: "#ff3d3df5",
                activeColor: "#7f3d3df5",
                font: "symbol"
            },
            "Filled Dot b": {
                chr: "#e05f",
                color: "#ff3d3df5",
                activeColor: "#7f3d3df5",
                font: "smallsymbol"
            },
            "Filled Dot Y": {
                chr: "#e05f",
                color: "#fff5f53d",
                activeColor: "#7ff5f53d",
                font: "symbol"
            },
            "Filled Dot y": {
                chr: "#e05f",
                color: "#fff5f53d",
                activeColor: "#7ff5f53d",
                font: "smallsymbol"
            },
            "Filled Dot W": {
                chr: "#e05f",
                color: "#ffffffff",
                activeColor: "#7fffffff",
                font: "symbol"
            },
            "Filled Dot w": {
                chr: "#e05f",
                color: "#ffffffff",
                activeColor: "#7fffffff",
                font: "smallsymbol"
            },
            Volume: {
                chr: "#e076",
                color: "#FF808080"
            },
            Restart: "#e02b",
            Cancel: "#e02a",
            FCC: "#e064",
            CE: "#e074",
            WEE: "#e056",
            beer: "#e05b"
        },
        i = "symbol",
        s = "#FFFFFFFF",
        a = "#FF404040";
    t.prototype.toString = function() {
        return 'icoFont="' + this.font + '" icoChar="' + this.chr + '" icoColor="' + this.color + '" activeIcoColor="' + this.activeColor + '"'
    }, e.exports = r, e.exports.getWithoutActiveTouchColor = function(e) {
        let r = o[e];
        return r || (r = o[n]), "string" == typeof r && (r = {
            chr: r
        }), r.activeColor = r.color || s, new t(r)
    }, e.exports.all = function() {
        return Object.keys(o).map(e => r(e))
    }, e.exports.touchActiveColor = a
}, function(e) {// Function 36 some default settings... structure unknown
    "use strict";
    AllFunctions(0)("Function 36").verbose("");
    const t = "manual",
        r = "assumption",
        n = "smartener";
    e.exports = {
        DEFAULT: "default",
        MANUAL: t,
        ASSUMPTION: r,
        SMARTENER: n,
        STUPID_DEVICE_MODES: [t, r, n],
        VIRTUAL_POWER_MODES: [r, n]
    }
}, function(e, t, r) {// Function 37 sync-read various files 
    "use strict";
    AllFunctions(0)("Function 37").verbose("e",e);
    const n = r(26),
        o = r(2).fileRepoPath;
    t.loadNoCloudFile = function(e) {
        try {
        return n.readFileSync(e, {
            encoding: "utf-8"
        })}
        catch (err) {AllFunctions(0)("Function 37").verbose("Catch",err)}
},     t.loadTr2File = function(e) {
        return n.readFileSync(o + "/tr2/" + e, {
            encoding: "utf-8"
        })
    }, t.loadViewbuilderFile = function(e) {
        const t = n.readFileSync(o + "/viewbuilder/" + e, {
            encoding: "utf8"
        });
        return JSON.parse(t)
    }, t.loadAppVersionFile = function() {
        return n.readFileSync(o + "/../version.json", {
            encoding: "utf8"
        })
    }, t.loadCloudFile = function() {
        return n.readFileSync(o + "/../CloudReplacer.json", {
            encoding: "utf8"
        })
    }, t.getI18nDirectory = function() {
        return o + "/locales/"
    }
}, function(e) {// Function 38 safeDecodeName (decodeURIComponent)
    "use strict";
    AllFunctions(0)("Function 38").verbose("");
    e.exports = {
        safeDecodeName: function(e) {
            try {
                return decodeURIComponent(e)
            } catch (e) {
                return "unknown"
            }
        }
    }
}, function(e, t, r) {// Function 39  Router: routes.device
    "use strict";
    AllFunctions(0)("Function 39").verbose("");

    function n(e) {
        return {
            key: e.key,
            name: e.name,
            roomName: e.roomName,
            details: e.details,
            capabilities: e.capabilities
        }
    }

    function o(e) {
        return g.getWidgetsForDevice(e.device)
    }
    const i = r(5).Router(),
        s = r(85),
        a = r(15),
        c = r(9),
        u = r(156),
        d = r(472),
        l = r(20).deviceAdapter,
        p = r(161),
        h = r(91),
        g = r(59),
        m = r(473),
        f = r(0)("routes.device"),
        E = r(29),
        y = {
            presence: !0
        },
        _ = {
            success: !0
        };
    s.use("/:room_key/devices", i), i.param("device_key", function(e, t, r, n) {
        e.device = e.room.getDeviceByKey(n), e.device ? r() : r(new Error(c(null, "notfound", "device", n).message))
    }), i.get("/", function(e, t) {
        /true/.test(e.query.nocomponents) ? t.json(e.room.getDevices().map(n)) : t.json(e.room.getDevices())
    }), i.get("/:device_key/subscribe", function(e, t, r) {
        AllFunctions(0)("Function 39").verbose("Router: route devices -subscribe");
        l.subscribe(e.device).then(() => {
            t.json(_)
        }).catch(r)
    }), i.get("/:device_key/unsubscribe", function(e, t, r) {
        l.unsubscribe(e.device).then(() => {
            t.json(_)
        }).catch(r)
    }), i.get("/:device_key/getdirectoryrootitems", function(e, t) {
        AllFunctions(0)("Function 39").verbose("Router: routes.device - getdirectoryrootitems");
        e.device.getDirectoryRootItems().then(e => {
            t.json(e)
        })
    }), i.get("/:device_key/widgets", function(e, t) {
        t.json(o(e))
    }), i.get("/:device_key/widgetsAsShortcuts", function(e, t) {
        const r = "name",
            n = E(o(e)).filter(e => !e.options.ignoreAsShortcut).map(e => ({
                key: e.key,
                name: e.name,
                label: e.label,
                componentType: "widget"
            })).sort((e, t) => e[r] < t[r] ? -1 : e[r] > t[r] ? 1 : 0);
        t.json(n)
    }), i.get("/:device_key/trigger", function(e, t) {
        const r = e.query.name,
            n = {
                repeat: /true/.test(e.query.repeat),
                generic: /true/.test(e.query.generic)
            },
            o = e.device.triggerActionByName(r, n);
        if (!o) throw new Error("no job to send!");
        t.json(o)
    }), i.get("/:device_key", function(e, t) {
        /true/.test(e.query.nocomponents) ? t.json(n(e.device)) : t.json(e.device)
    }), i.put("/:device_key", function(e, t) {
        const r = e.device,
            n = e.body;
        "TV" === r.getType() && void 0 !== n.useTuner && (f.debug("setting useTuner to:", n.useTuner), r.setUseTuner(n.useTuner)), t.json(r)
    }), i.get("/:device_key/move/:newRoomKey", function(e, t, r) {
        const n = e.project,
            o = e.device,
            i = e.params.newRoomKey,
            s = n.getRoomByKey(i);
        d.moveToOtherRoom(n, o, s).then(e => {
            t.json(e)
        }).catch(() => e.project.restoreLastVersion().then(() => {
            r(new Error(c(null, "device_move", o.getName()).message))
        }))
    }), i.delete("/:device_key", function(e, t) {
        const r = a.getRequestParameter(e, "zwave_id", y, !1),
            n = e.project;
        let o = e.device;
        if (r) {
            const e = n.getDevices(e => r === e.getAdapterId());
            if (1 !== e.length) return f.warn("INVALID_ZWAVE_DELETE_REQUEST"), t.json(_);
            o = e[0]
        }
        f.debug("deleting device:", {
            name: o.name,
            room: o.roomName
        }), n.deleteDevice(o).then(() => m(l, o)).then(() => n.save()).then(() => t.json(_))
    }), i.post("/", function(e, t, r) {
        const n = a.getRequestParameter(e, "name", y),
            o = a.getRequestParameter(e, "specId", y),
            i = e.body.fallbackAdapterName,
            s = e.body.adapterDeviceId,
            c = e.body.device;
        return c ? (f.debug("Adding device with included devicespec", {
            name: n,
            specId: o,
            adapterDeviceId: s,
            deviceSpec: c
        }), u.addDeviceToRoomWithSpecdata(e.room, n, s, c).then(e => {
            t.json(e)
        }).catch(r)) : (f.debug("Adding device without included devicespec", {
            name: n,
            specId: o,
            adapterDeviceId: s
        }), void u.addDeviceToRoom(e.room, n, o, s, i).then(e => {
            t.json(e)
        }).catch(r))
    }), i.post("/:device_key/updateCommandSets", function(e, t, r) {
        h.checkForAndUpdateDevice(e.device).then(r => {
            r && e.project.saveWithoutChangeNotifications(), t.json({
                updated: r
            })
        }).catch(r)
    }), i.post("/:device_key/rename", function(e, t, r) {
        const n = a.getRequestParameter(e, "name", y);
        f.info("RENAME_DEVICE", {
            device: e.device.getName(),
            newname: n
        }), e.room.renameDevice(e.device.getKey(), n), e.project.save().then(() => {
            t.json(e.device)
        }).catch(t => {
            f.error("RENAME_DEVICE_FAILED", {
                url: e.url,
                method: e.method,
                error: t.message
            }), r(new Error(c(null, "validation", "name").message))
        })
    }), i.post("/:device_key/resetWiring", function(e, t, r) {
        f.info("DEVICE_RESET_WIRING", {
            device: e.device.getName()
        }), e.room.resetWiring(e.device).then(() => e.project.save()).then(() => {
            t.json(_)
        }).catch(t => {
            f.error("DEVICE_RESET_WIRING_FAILED", {
                url: e.url,
                method: e.method,
                error: t.message
            }), r(new Error(c(null, "device_reset_wiring", e.device.getName()).message))
        })
    }), i.post("/:device_key/setPowerMode", function(e, t, r) {
        e.device.setPowerMode(e.body.powerMode).then(() => e.room.markDeviceRecipesClean(e.device)).then(() => e.room.rebuildScenarioRecipes()).then(() => e.project.save()).then(() => {
            f.event(`${e.device.name} set to ${e.body.powerMode} power mode.`), t.json(_)
        }).catch(t => {
            f.error("DEVICE_SET_POWERMODE_FAILED", {
                url: e.url,
                method: e.method,
                error: t.message
            }), r(new Error(c(null, "device_powermode", e.device.getName()).message))
        })
    }), i.post("/:device_key/startSmartener", function(e, t, r) {
        p.startSmartenerLearnMode(e.device.key).then(() => t.json(_)).catch(t => {
            f.error("DEVICE_START_SMARTENER_LEARN_FAILED", {
                url: e.url,
                method: e.method,
                error: t.message
            }), r(new Error(c(null, "device_smartener", e.device.getName()).message))
        })
    }), i.post("/:device_key/stopSmartener", function(e, t) {
        p.stopSmartenerLearnMode(e.device.key), t.json(_)
    }), e.exports = i
}, function(e) {// Function 40 exports = require("http")
    e.exports = require("http")
}, function(e) {// Function 41 exports = require("crypto")
    e.exports = require("crypto")
}, function(e, t, r) {// Function 42 SETTINGSREPO; check various errors from e.message
    "use strict";
    AllFunctions(0)("Function 42").verbose("");

    function n(e, t) {
        return u.load(l).then(r => {
            const n = r || {};
            return n[e] = t, u.save(l, n)
        }).catch(() => {
            const r = {};
            return r[e] = t, u.save(l, r)
        })
    }

    function o(e) {
        return u.load(l).then(s).then(t => t && t[e] ? t[e] : {})
    }

    function i(e) {
        return d.debug("save settings", e), n(h, e).catch(e => {
            d.error("FAILED_TO_SAVE_TR2COMM_SETTINGS", e.message)
        })
    }

    function s(e) {
        const t = e.version || E;
        let r = !1;
        try {
            r = c.lt(t, y)
        } catch (t) {
            return d.debug("SETTINGS_STORE_FAILED_TO_GET_VALID_SEMVER_FROM"), a.resolve(e)
        }
        return r ? function(e, t) {
            const r = [];
            switch (e) {
                case E:
                    const t = i({
                        neeolinkenabled: !1
                    });
                    r.push(t)
            }
            return a.all(r).then(() => n(m, y)).catch(t => {
                d.error("SETTINGS_STORE_FAILED_TO_MIGRATE", {
                    err: t,
                    from: e,
                    to: y
                })
            }).finally(() => t)
        }(t, e) : (d.debug("SETTINGS_STORE_MIGRATION_NOT_NEEDED"), a.resolve(e))
    }
    const a = r(1),
        c = r(139),
        u = r(57),
        d = r(0)("SETTINGSREPO"),
        l = "settings",
        p = "forwardactions",
        h = "tr2communication",
        g = "uisettings",
        m = "version",
        f = "automaticfirmwareupdate",
        E = "0.0.0",
        y = "0.49.2";
    e.exports = {
        loadForwardactionSettings: function() {
            return o(p).catch(e => {
                d.debug("FAILED_TO_LOAD_FORWARDACTION_SETTINGS", e.message)
            })
        },
        saveForwardactionSettings: function(e) {
            return d.debug("save settings", e), n(p, e).catch(e => {
                d.error("FAILED_TO_SAVE_FORWARDACTION_SETTINGS", e.message)
            })
        },
        clearForwardactionSettings: function() {
            return n(p, {}).catch(e => {
                d.warn("FAILED_TO_CLEAR_FORWARDACTION_SETTINGS", e.message)
            })
        },
        loadTR2CommunicationVia6lowpan: function() {
            return o(h).catch(e => {
                d.debug("FAILED_TO_LOAD_TR2COMM_SETTINGS", e.message)
            })
        },
        saveTR2CommunicationVia6lowpan: i,
        loadUISettings: function() {
            return o(g).catch(e => {
                d.debug("FAILED_TO_LOAD_UI_SETTINGS", e.message)
            })
        },
        saveUISettings: function(e) {
            return d.debug("save settings", e), n(g, e).catch(e => {
                d.error("FAILED_TO_SAVE_UI_SETTINGS", e.message)
            })
        },
        loadFirmwareSettings: function() {
            return o(f)
        },
        saveFirmwareSettings: function(e) {
            return d.debug("save settings", e), n(f, e).catch(e => {
                d.error("FAILED_TO_SAVE_FIRMWARE_SETTINGS", e.message)
            })
        }
    }
}, function(e, t, r) {// Function 43 retrieve various localc stored variables (this.)
    "use strict";
    AllFunctions(0)("Function 43").verbose("");
    const n = r(77),
        o = r(33),
        i = e.exports = function(e, t) {
            this.name = e, t.actions ? (this.actions = t.actions, this.component = null, 1 === t.actions.length && t.actions[0].label && (this.label = t.actions[0].label)) : (this.component = t.component, this.actions = null), this.execArg = t.execArg, this.delay = t.delay || 0, this.smartAction = "boolean" != typeof t.smartAction || t.smartAction
        };
    i.buildActionOfActions = function(e, t) {
        AllFunctions(0)("Function 43").verbose("buildActionOfActions");
        return new i(e, {
            actions: t
        })
    }, i.buildActionOfComponent = function(e, t, r, s) {
        const a = t && t.getDevice();
        if (n(s) && a) {
            const e = t.getName();
            AllFunctions(0)("Function 43").verbose("buildActionOfComponent component",e);
            AllFunctions(0)("Function 43").verbose("buildActionOfComponent action",t);
            o.TEST_IS_POWER_ON.test(e) ? s = a.getStandbyCommandDelay() : o.TEST_IS_POWER_OFF.test(e) ? s = a.getShutdownDelay() : o.TEST_IS_POWER_TOGGLE.test(e) ? s = Math.max(a.getStandbyCommandDelay(), a.getShutdownDelay()) : o.TEST_IS_SOURCE_SWITCH.test(e) && (s = a.getSourceSwitchDelay())
        }
            AllFunctions(0)("Function 43").verbose("buildActionOfComponent 2 device",a.name);
            AllFunctions(0)("Function 43").verbose("buildActionOfComponent 2 action",e);
        return new i(e, {
//            device: e.device.key,
            component: t,
            execArg: r,
            delay: s
        })
    }, i.buildFavoriteAction = function(e, t, r) {
        AllFunctions(0)("Function 43").verbose("buildFavoriteAction");
        return new i(e, {
            component: t,
            delay: r,
            smartAction: !1
        })
    };
    i.buildDelayOnlyAction = function(e) {
        let t = "Wait ";
        return new i(t += e < 1e3 ? e + "ms" : e / 1e3 + "s", {
            delay: e
        })
    }, i.buildDummyAction = function(e) {
        return new i(e, {})
    }, i.prototype.getActions = function() {
        return this.actions
    }, i.prototype.hasActions = function() {
        return Array.isArray(this.actions) && 0 < this.actions.length
    }, i.prototype.isWaitAction = function() {
        return 0 === this.name.lastIndexOf("Wait ", 0)
    }, i.prototype.isEmpty = function() {
        const e = !this.component && !this.isWaitAction();
        return (!Array.isArray(this.actions) || Array.isArray(this.actions) && 0 === this.actions.length) && e
    }, i.prototype.getComponent = function() {
        return this.component
    }, i.prototype.getExecArg = function() {
        return this.execArg
    }, i.prototype.getDelay = function() {
        return this.delay
    }, i.prototype.setDelay = function(e) {
        return this.delay = e, this
    }, i.prototype.getName = function() {
        return this.label || this.name
    }, i.prototype.eachLeafAction = function(e) {
        this.hasActions() ? this.actions.forEach(t => {
            t.eachLeafAction(e)
        }) : e(this)
    }
}, function(e, t, r) {// Function 44 startNotificationListener (various), initialise pm2 statistics, reloadAvahi, disableAccesspointMode, UserBlink 
    "use strict";
    AllFunctions(0)("Function 44").verbose("");
    const n = r(2),
        o = r(347),
        i = r(348),
        s = r(353),
        a = r(355),
        c = r(356),
        u = r(10),
        d = r(25),
        l = r(6)("cp6:lib:ospackage:index"),
        p = r(140),
        h = new o(n.avahi),
        g = new i(n.wifi, n.systeminfo.ifaceNameWlan),
        m = new a(n.openaccesspoint);
    e.exports = {
        wifi: g,
        finalsystemtest: c,
        startNotificationListener: function(e) {
            AllFunctions(0)("Function 44").verbose("StartNotificationListeners");
            l("startNotificationListener", d.NOTIFICATION_PROJECT_CHANGED), u.on(d.NOTIFICATION_PROJECT_CHANGED, () => {
                l("avahi notification"), h.notificationProjectReload({
                    projectLabel: e.label,
                    controllerRoom: e.getControllerRoom()
                })
            }), l("startNotificationListener", p.NOTIFICATION_TOUCHBUTTONPRESSED), u.on(p.NOTIFICATION_TOUCHBUTTONPRESSED, () => {
                l("short touchpress detected"), m.shortpressHandler()
            }), l("startNotificationListener", p.NOTIFICATION_LONG_TOUCHBUTTONPRESSED), u.on(p.NOTIFICATION_LONG_TOUCHBUTTONPRESSED, () => {
                l("long touchpress detected"), m.longpressHandler()
            })
        },
        initialise: function() {
            return l("start pm2 statistics"), s.startBrainStats(), l("warm up the wifi scanner"), g.scan(), g.loadCredentials()
        },
        reloadAvahi: function() {
            AllFunctions(0)("Function 44").verbose("ReloadAvahi skipping for now"); ///#####
            return;
            return h.reloadAvahi()
        },
        disableAccesspointMode: function() {
            return m.disableAccesspointMode()
        },
        userBlink: function() {
            return m.userBlink()
        }
    }
}, function(e, t, r) {// Function 45 startNotificationListener
    "use strict";
    AllFunctions(0)("Function 45").verbose("");
    const n = r(6)("cp6:lib:devicespecs:index"),
        o = r(56),
        i = r(2).devicespecs,
        s = r(221),
        a = r(10),
        c = new s(i);
    e.exports = c, e.exports.startNotificationListener = function() {
        n("startNotificationListener", o.NOTIFICATION_SYNCED), a.on(o.NOTIFICATION_SYNCED, () => {
            n("deviceSpecs notification"), c.reloadDuiroData()
        })
    }
}, function(e, t, r) {// Function 46 neeo:viewbuilder / setCustomLogger
    AllFunctions(0)("Function 46").verbose("");


    "use strict";

    function n(e) {
        const t = e,
            r = c;
        let n = o(t);
        const i = (e, i) => {
            r !== c && (n = o(t)), n[e](...i)
        };
        return {
            debug: (...e) => i("debug", e),
            info: (...e) => i("info", e),
            warn: (...e) => i("warn", e),
            error: (...e) => i("error", e)
        }
    }

    function o(e) {
        if (c) {
            const t = c(e);
            return function(e) {
                s.forEach(t => {
                    if ("function" != typeof e[t]) throw new Error(`Logger instances must implement the ${t} function`)
                })
            }(t), t
        }
        return function(e) {
            const t = i(`${a}:${e}`);
            return {
                debug: ([e, ...r]) => t(e, r),
                info: ([e, ...r]) => t(e, r),
                warn: ([e, ...r]) => t(e, r),
                error: ([e, ...r]) => t(e, r)
            }
        }(e)
    }
    const i = r(6),
        s = ["debug", "info", "warn", "error"],
        a = "neeo:viewbuilder";
    let c;
    n.setCustomLogger = function(e) {
        c = e
    }, e.exports = n
}, function(e) {// Function 47 exports = require("lodash/get")
    e.exports = require("lodash/get")
}, function(e) {// Function 48 exports = require("lodash/merge")
    e.exports = require("lodash/merge")
}, function(e, t, r) {// Function 49 Macro interfaces
    "use strict";
    AllFunctions(0)("Function 49").verbose("");
    const n = r(11),
        o = r(0)("Macro"),
        i = r(23),
        s = r(50),
        a = r(33),
        c = r(8),
        u = e.exports = function(e) {
            this.name = e.name, this.label = e.label || this.name, this.command = e.command, this.commandAlt = e.commandAlt, this.useAlt = !1, s.call(this, e.device, c.COMPONENT_MACRO_TYPE_NAME, e.key)
        };
    n.inherits(u, s), u.build = function(e, t) {
        if (!e || !e.command) throw o.error("MACRO_PARAMETER_OBJECT_INVALID", {
            object: e
        }), new Error("MACRO_PARAMETER_OBJECT_INVALID");
        if (!t || "function" != typeof t.markAsTransitioning || "function" != typeof t.markAsOn || "function" != typeof t.markAsOff || "function" != typeof t.getName || "function" != typeof t.getRoomName) throw o.error("MACRO_PARAMETER_DEVICE_INVALID", {
            device: t
        }), new Error("MACRO_PARAMETER_DEVICE_INVALID");
        const r = i.build(e.command);
        let n;
        return e.commandAlt && (n = i.build(e.commandAlt)), new u({
            key: e.key,
            name: e.name,
            label: e.label,
            device: t,
            command: r,
            commandAlt: n
        })
    }, u.prototype.toJSON = function() {
        return {
            key: this.key,
            componentType: this.componentType,
            name: this.name,
            label: this.label,
            command: this.command,
            commandAlt: this.commandAlt,
            deviceName: this.device.getName(),
            deviceKey: this.device.key,
            roomName: this.device.roomName,
            roomKey: this.device.roomKey
        }
    }, u.prototype.isPowerStateCorrect = function() {
        return a.DISCRETE_POWER_OFF_MACROS.includes(this.name) && this.device.isMarkedAsOff() || a.DISCRETE_POWER_ON_MACROS.includes(this.name) && this.device.isMarkedAsOn()
    }, u.prototype.triggering = function() {
        a.DISCRETE_POWER_MACROS.includes(this.name) && this.device.markAsTransitioning()
    }, u.prototype.triggered = function() {
        a.DISCRETE_POWER_OFF_MACROS.includes(this.name) ? this.device.markAsOff() : a.DISCRETE_POWER_ON_MACROS.includes(this.name) ? this.device.markAsOn() : this.name === a.MACRO_MUTE_TOGGLE && this.commandAlt && (this.useAlt = !this.useAlt)
    }, u.prototype.getName = function() {
        return this.name
    }, u.prototype.getCommand = function() {
        return this.useAlt ? this.commandAlt : this.command
    }, u.prototype.getCommands = function() {
        const e = [this.command];
        return this.commandAlt && e.push(this.commandAlt), e
    }
}, function(e, t, r) {// Function 50 implementation of getDevice, getComponentType, triggered
    "use strict";
    AllFunctions(0)("Function 50").verbose("");
    const n = r(11),
        o = r(22),
        i = r(3),
        s = e.exports = function(e, t, r) {
            if (!t) throw new Error("Subclass must set the componentType!");
            if (!e) throw new Error("Component must have a device!");
            this.device = e, this.componentType = t, i.increaseCounter("component-build"), o.call(this, r)
        };
    n.inherits(s, o), s.prototype.getDevice = function() {
        return this.device
    }, s.prototype.getComponentType = function() {
        return this.componentType
    }, s.prototype.triggered = function() {}, s.prototype.triggering = function() {}, s.prototype.isPowerStateCorrect = function() {
        return !1
    }
}, function(e, t, r) {// Function 51 implementation of reloadSchedulerService, buildRecipe, getRecipeCookBook
    "use strict";
    AllFunctions(0)("Function 51").verbose("");
    const n = r(280),
        o = r(79),
        i = r(146),
        s = r(81),
        a = r(22),
        c = r(327);
    e.exports.reloadSchedulerService = function(e) {
        n.reload(e)
    }, e.exports.buildRecipe = function(e, t) {
        e.room = t, e.scenario = t.getScenarioByKey(e.scenarioKey), e.steps = e.steps.map(o);
        const r = new s(e);
        return r.setTrigger(e.trigger), r
    }, e.exports.buildNewRecipe = function(e) {
        return new s(e)
    }, e.exports.getRecipeCookBook = function() {
        return c
    }, e.exports.reorder = a.reorder, e.exports.isIconRecipe = function(e) {
        return !(!e || !e.trigger) && e.trigger.type === i.TYPE_ICON
    }, e.exports.TYPE_LAUNCH = s.TYPE_LAUNCH, e.exports.TYPE_POWEROFF = s.TYPE_POWEROFF, e.exports.STEP_TYPE_CONTROLS = o.TYPE_CONTROLS, e.exports.STEP_TYPE_ACTION = s.STEP_TYPE_ACTION
}, function(e, t, r) {// Function 52 o = new(r(305))(r(2).actionexecutor);
    "use strict";
    AllFunctions(0)("Function 52").verbose("");
    const n = r(2).actionexecutor,
        o = new(r(305))(n);
    e.exports = o
}, function(e) {// Function 53 exports = require("css-layout")
    e.exports = require("css-layout")
}, function(e) {// Function 54 exports = require("parse/node")
    e.exports = require("parse/node")
}, function(e) {// Function 55 various "TYPE" definitions
    "use strict";
    //AllFunctions(0)("Function 53").verbose("");
    e.exports.TYPE_ARRAY = "array", e.exports.TYPE_RANGE = "range", e.exports.TYPE_BINARY = "binary", e.exports.TYPE_KEYPAD = "keypad", e.exports.TYPE_STRING = "string", e.exports.TYPE_CUSTOM = "custom", e.exports.TYPE_POWERSTATE = "power", e.exports.RECIPE_SUPPORTED_TYPES = [e.exports.TYPE_RANGE, e.exports.TYPE_BINARY, e.exports.TYPE_POWERSTATE], e.exports.TYPE_BINARY_TRUE = !0, e.exports.TYPE_BINARY_FALSE = !1, e.exports.SENSOR_BINARY_VALID_VALUES = [e.exports.TYPE_BINARY_TRUE, e.exports.TYPE_BINARY_FALSE]
}, function(e, t) {// Function 56 DeviceFileManager ;set payhs for sync and synced
    "use strict";
    AllFunctions(0)("Function 56").verbose("");
    const r = t.FILE_DEVICES = "devices.json",
        n = t.FILE_CHANNELS = "channels.json";
    t.FILE_LIST = [r, n];
    const o = "System:DeviceFileManager:";
    t.NOTIFICATION_SYNC = o + "sync", t.NOTIFICATION_SYNCED = o + "synced"
}, function(e, t, r) {// Function 57 r(196))(r(2).store)
    "use strict";
    AllFunctions(0)("Function 57").verbose("");
    const n = r(2),
        o = new(r(196))(n.store);
    e.exports = o
}, function(e) {// Function 58 iconify function.
    "use strict";
    AllFunctions(0)("Function 58").verbose("");
    e.exports = {
        iconify: function(e) {
            return void 0 === e || "string" != typeof e ? void 0 : e.toLowerCase()
        }
    }
}, function(e, t, r) {// Function 59 loadViewbuilderFile, viewbuilder
    "use strict";
    AllFunctions(0)("Function 59").verbose("");

    function n(e) {
        return s.loadViewbuilderFile(`definitions/${e}.json`)
    }
    const o = r(0),
        i = r(3),
        s = r(37),
        a = r(230),
        c = r(92),
        u = r(129),
        d = r(245),
        l = r(246),
        p = r(247),
        h = r(248),
        g = r(250),
        m = r(252),
        f = r(253),
        E = r(254),
        y = r(255),
        _ = o("viewbuilder");
    (function() {
        const e = n("widgets"),
            t = n("slidepresets"),
            r = n("keylayouts"),
            s = n("keymappings"),
            v = u.getAdditionalInfo;
        try {
            c.initialize({
                widgetDefinitions: e,
                widgetDataHandlers: [f, l, p, h, g, m, u, d, E, y],
                slidePresetDefinitions: t,
                keyDefinitions: a,
                keyLayoutDefinitions: r,
                keyMappingDefinitions: s,
                getDeviceNonAutomatableInfo: v,
                logger: o,
                statistics: i
            }), _.debug("VIEWBUILDER_INIT_COMPLETE")
        } catch (e) {
            _.error("VIEWBUILDER_INIT", {
                msg: e.message
            })
        }
    })(), e.exports = {
        ConditionChecker: c.ConditionChecker,
        getWidgetsForDevice: c.getWidgetsForDevice,
        getScenarioViewStructure: c.getScenarioViewStructure,
        generateDeviceViewStructure: c.generateDeviceViewStructure,
        getScenarioSlides: c.getScenarioSlides
    }
}, function(e) {// Function 60 implementation of getMacrosByNames, getMacrosByRegex, getGenericMacrosByRegex
    "use strict";

    AllFunctions(0)("Function 60").verbose("");
    function t(e, t) {
        return e[t.name] = t, e
    }

    function r(e, r, n = 256) {
        return r.map(t => {
            const r = t.toJSON();
            r.deviceKey = e.key, r.roomKey = e.roomKey;
            const n = i[r.name];
            return n && (r.label = n), r
        }).slice(0, n).reduce(t, {})
    }

    function n(e) {
        return e.replace(o, "")
    }
    const o = /^\^/,
        i = {
            AMAZON: "AMAZON PRIME",
            "INPUT SPOTIFY": "SPOTIFY",
            "YOU TUBE": "YOUTUBE"
        };
    e.exports = {
        getMacrosByNames: function(e, t, o) {
            const i = t.map(n).map(t => e.getMacroByName(t, !1)).filter(e => e);
            return r(e, i, o)
        },
        getMacrosByRegex: function(e, t, n) {
            const o = e.macros.filter(e => t.test(e.name));
            return r(e, o, n)
        },
        getGenericMacrosByRegex: function(e, t, n) {
            const o = e.genericMacros.filter(e => t.test(e.name));
            return r(e, o, n)
        }
    }
}, function(e, t, r) {// Function 61 class extension for slider
    "use strict";
    const n = r(50),
        o = r(96),
        i = r(23),
        s = r(8);
    class a extends n {
        constructor(e) {
            super(e.device, s.COMPONENT_SLIDER_TYPE_NAME, e.key), this.name = e.name || "", this.label = e.label || this.name, this.range = e.range || [0, 100], this.unit = e.unit || "%", this.value = e.value, this.onoff = e.onoff, this.sensor = e.sensor
        }
        static build(e, t) {
            if (!e || !e.value) throw new Error("Slider parameter object invalid!");
            if (!t || "function" != typeof t.getName || "function" != typeof t.getRoomName) throw new Error("Slider parameter device invalid!");
            const r = {
                name: e.name,
                label: e.label,
                medium: e.medium,
                range: e.range,
                unit: e.unit,
                value: i.build(e.value, t),
                key: e.key,
                device: t
            };
            return e.sensor && (r.sensor = t.getSensorByKey(e.sensor.key)), e.onoff && (r.onoff = o.build(e.onoff, t)), new a(r)
        }
        getName() {
            return this.name
        }
        getRange() {
            return this.range
        }
        getMinValue() {
            return this.range[0]
        }
        getMaxValue() {
            return this.range[1]
        }
        getSwitch() {
            return this.onoff
        }
        getValueCommand() {
            return this.value
        }
        toJSON() {
            return {
                key: this.key,
                name: this.name,
                label: this.label,
                range: this.range,
                unit: this.unit,
                componentId: this.componentId,
                componentType: this.componentType,
                value: this.value,
                onoff: this.onoff,
                sensor: this.sensor,
                deviceName: this.device.getName(),
                deviceKey: this.device.key,
                roomName: this.device.roomName,
                roomKey: this.device.roomKey
            }
        }
    }
    e.exports = a
}, function(e, t, r) {// Function 62 handler for sensors
    "use strict";
    AllFunctions(0)("Function 62").verbose("");
    const n = r(1),
        o = r(11),
        i = r(0)("Sensor"),
        s = r(22),
        a = r(23),
        c = r(20).deviceAdapter,
        u = e.exports = function(e) {
            if (this.name = e.name, this.type = e.type, !e.device) throw new Error("The sensor device is missing!");
            this.device = e.device, this.label = e.label || this.name + " (" + this.getDeviceName() + ")", this.eventKey = this.device.getKey() + ":" + this.name, this.command = e.command, this.range = e.range, this.unit = e.unit, s.call(this, e.key)
        };
    o.inherits(u, s), u.build = function(e, t) {
        if (!e || !e.command) throw new Error("The sensor command is missing!");
        return e.command = a.build(e.command), e.device = t, new u(e)
    }, u.prototype.getCommand = function() {
        return this.command
    }, u.prototype.getName = function() {
        return this.name
    }, u.prototype.getDevice = function() {
        return this.device
    }, u.prototype.getDeviceName = function() {
        return this.device ? this.device.getName() : void 0
    }, u.prototype.getDeviceKey = function() {
        return this.device ? this.device.getKey() : void 0
    }, u.prototype.getDeviceIcon = function() {
        return this.device ? this.device.getIconName().toLowerCase() : void 0
    }, u.prototype.setCachedValue = function(e) {
        AllFunctions(0)("Function 62").verbose("SetCachedValue ")
        this._valueExpiration = void 0, i.debug("SENSOR_CACHED_VALUE_UPDATED", {
            name: this.name
        }), this._valuePromise = n.resolve(e)
    }, u.prototype.getCachedValue = function() {
        AllFunctions(0)("Function 62").debug("GetCachedValue")
        return (this._valueExpiration == undefined || this._valueExpiration < Date.now()) && (i.debug("SENSOR_CACHED_EXPIRED"), this._valuePromise = void 0, this._valueExpiration = void 0), this._valuePromise ? this._valuePromise : (i.debug("SENSOR_CACHED_VALUE_NOT_SET", {
            name: this.name
        }),  this.getValue())
    }, u.prototype.getValue = function() {
        AllFunctions(0)("Function 62").debug("getValue; now calling deviceadapter to get this value", this.name)
        return this._valuePromise = c.getValue(this), i.debug("SENSOR_CACHED_VALUE_USING_NEXT_GET_VALUE", { // ###
            name: this.name
        }), this._valuePromise.catch(() => {AllFunctions(0)("Function 62").verbose("Err.catch valuepromise");
            this._valueExpiration = Date.now() + 6e4
        }),  this._valuePromise
    }, u.prototype.toJSON = function() {
        return {
            key: this.key,
            name: this.name,
            label: this.label,
            type: this.type,
            command: this.command,
            range: this.range,
            unit: this.unit,
            eventKey: this.eventKey,
            deviceName: this.getDeviceName(),
            deviceKey: this.getDeviceKey(),
            deviceIcon: this.getDeviceIcon(),
            roomName: this.device ? this.device.getRoomName() : void 0,
            roomKey: this.device ? this.device.getRoomKey() : void 0
        }
    }
}, function(e, t, r) {// Function 63 interval defaults
    "use strict";
    AllFunctions(0)("Function 63").verbose("");
    const n = r(55);
    e.exports.VALID_INTERVAL_UNITS = {
        second: 1
    }, e.exports.MAXIMAL_INTERVAL_TIME_S = 2147482, e.exports.MINIMAL_INTERVAL_TIME_S = 60, e.exports.MAXIMAL_INTERVAL_TIME_MS = 2147483647, e.exports.MINIMAL_INTERVAL_TIME_MS = 6e4, e.exports.VALID_CONDITION_SENSOR_TYPES = [n.TYPE_POWERSTATE, n.TYPE_BINARY, n.TYPE_RANGE, n.TYPE_KEYPAD], e.exports.BINARY_SENSOR_TYPES = [n.TYPE_POWERSTATE, n.TYPE_BINARY], e.exports.CONDITION_COMPARISON_LT = "lt", e.exports.CONDITION_COMPARISON_GT = "gt", e.exports.CONDITION_COMPARISON_EQ = "equal", e.exports.CONDITION_SENSOR_COMPARISONS = [e.exports.CONDITION_COMPARISON_LT, e.exports.CONDITION_COMPARISON_GT, e.exports.CONDITION_COMPARISON_EQ], e.exports.VALID_BINARY_SENSOR_COMPARISONS = [e.exports.CONDITION_COMPARISON_EQ], e.exports.VALID_KEYPAD_SENSOR_COMPARISONS = [e.exports.CONDITION_COMPARISON_EQ], e.exports.CONDITION_TIME_COMPARISONS = [e.exports.CONDITION_COMPARISON_LT, e.exports.CONDITION_COMPARISON_GT], e.exports.CONDITION_TYPE_ICON = "icon", e.exports.CONDITION_TYPE_TIME = "time", e.exports.CONDITION_TYPE_INTERVAL = "interval", e.exports.CONDITION_TYPE_SENSOR = "sensor", e.exports.TRIGGER_CONDITION_TYPES = [e.exports.CONDITION_TYPE_ICON, e.exports.CONDITION_TYPE_TIME, e.exports.CONDITION_TYPE_INTERVAL, e.exports.CONDITION_TYPE_SENSOR], e.exports.OPTIONAL_CONDITION_TYPES = [e.exports.CONDITION_TYPE_TIME, e.exports.CONDITION_TYPE_SENSOR]
}, function(e, t, r) {// Function 64 convert TR2-messages to/from coap communication ( called from (84)
    "use strict";
    AllFunctions(0)("Function 64").verbose("");
    const n = r(0)("TR2_COAP_TRANSFORM"),
        o = r(380),
        i = r(163),
        s = r(114);
    e.exports = {
        answerForTr2: function(e, t) {
            AllFunctions(0)("Function 64").verbose("TR2 answerForTr2")

            if (t && t.body && e) {
                if (c(t)) {
                    AllFunctions(0)("Function 64").verbose("TR2 already xml",t.body)

                    return n.debug("response is already xml, try to remove newlines and whitespaces between tags"), t.body.replace(/\>\s+</g, "><").replace(/\n/g, "")
                }
                return u(t) ? function(e) {
                    return /projects\/home\/rooms\/\d+\/recipes\/\d+\/execute/.test(e) || /projects\/home\/rooms\/\d+\/devices\/\d+\/switches/.test(e) || /projects\/home\/rooms\/\d+\/devices\/\d+\/sliders/.test(e) || /projects\/home\/rooms\/\d+\/scenarios\/\d+\/trigger/.test(e)
                }(e) ? function(e) {
                    return i(e)
                }(function(e) {
                    const t = JSON.parse(function(e) {
                        return e.replace(/"error":/g, '"f":').replace(/"steps":/g, '"s":').replace(/"duration":/g, '"d":').replace(/"text":/g, '"t":')
                    }(e));
                    return t.s && t.s.forEach(e => {
                        delete e.name, delete e.type
                    }), delete t.startTime, delete t.estimatedDuration, t
                }(t.body)) : t.body : (n.debug("unknown response content-type, return"), t.body)
            }
            n.debug("no payload / payload.body / requestUrl")
        },
        transliterationToAscii: function(e) {
            AllFunctions(0)("Function 64").debug("transliterationToAscii")

            return e ? function(e) {
                return e.split("").map(e => {
                    const t = o(e);
                    return e === t ? e : t.split("").some(e => -1 < a.indexOf(e)) ? "" : t
                }).join("")
            }(e) : void 0
        },
        compress: function(e) {
            AllFunctions(0)("Function 64-TR2").verbose("deflatesync",e)

            return s.deflateSync(e)
        }
    };
    const a = ["&", "'", '"', "<", ">"],
        c = function(e) {
            return !(!e.headers || !e.headers["content-type"]) && -1 < e.headers["content-type"].indexOf("xml")
        },
        u = function(e) {
            return !(!e.headers || !e.headers["content-type"]) && -1 < e.headers["content-type"].indexOf("json")
        }
}, function(e, t, r) {// Function 65 class extension implementation a stack
    "use strict";
    const n = r(16);
    e.exports = class {
        constructor(e = []) {
            this.stack = e
        }
        addTemplate(e, t) {
            this.stack.push({
                template: e,
                viewdata: t
            })
        }
        getStack() {
            return this.stack
        }
        render(e = {}) {
            return this.stack.reduce((t, r) => {
                const o = n.assign({}, e, r.viewdata);
                return t + (n.isFunction(r.template) ? r.template(o) : r.template)
            }, "")
        }
    }
}, function(e, t, r) {// Function 66 TR2 get functions getTr2FunctionText, getTr2VisibleText, getTr2VisibleTextFromFunctionEncoded
    "use strict";
    AllFunctions(0)("Function 66").verbose("");
    const n = r(406);
    e.exports = {
        getTr2FunctionText: function(e) {
            const t = e.replace(/\\/g, "\\\\");
            return n(t).replace(/&#39;/g, "\\&#39;")
        },
        getTr2VisibleText: function(e) {
            const t = e.replace(/\\/g, "\\\\");
            return n(t)
        },
        getTr2VisibleTextFromFunctionEncoded: function(e) {
            return e.replace(/\\&#39;/g, "&#39;")
        }
    }
}, function(e, t, r) {// Function 67 tr2-getsensorvalue 
    "use strict";
    AllFunctions(0)("Function 67").verbose("");
    const n = r(0)("tr2-guidata-sensor");
    e.exports = {
        getSensorValue: function(e) {
            if (!e || !e.sensor) return {
                component: e,
                value: ""
            };
            const t = e.sensor;
            AllFunctions(0)("Function 67").debug("calling t.getCachedValue() ( = F 62)");
            return t.getCachedValue().then(t => ({
                component: e,
                value: t
            })).catch(r => (n.debug("TR2_SENSOR_GETVALUE_FAILED", {
                sensor: t.getName(),
                error: r.message
            }), {
                component: e,
                // $$value: ""
                value: "leeg"
            }))
        }
    }
}, function(e, t, r) {// Function 68 export new(r(437))
    "use strict";
    AllFunctions(0)("Function 68").verbose("")
    const n = new(r(437));
    e.exports = n
}, function(e) {// Function 69 exports = require("events")
    e.exports = require("events")
}, function(e) {// Function 70 exports = require("lodash/defaults") 
    e.exports = require("lodash/defaults")
}, function(e, t, r) {// Function 71 key handler for NEEO.com
    "use strict";
    AllFunctions(0)("Function 71").verbose("")
    const n = r(216),
        o = r(41),
        i = r(1),
        s = r(0)("Crypto"),
        a = "x-neeo-secure",
        c = {
            name: "NEEO",
            email: "foo.bar@neeo.com"
        };
    let u, d, l;
    e.exports = { 
        generateKey: function() {
            n.config.show_version = !1, n.config.show_comment = !1;
            const e = Date.now(),
                t = o.randomBytes(64);
            return s.debug("START_KEY_GEN"), n.generateKey({
                userIds: [c],
                numBits: 768,
                passphrase: t
            }).then(r => (l = r.publicKeyArmored, d = n.key.readArmored(r.publicKeyArmored).keys, u = n.key.readArmored(r.privateKeyArmored).keys[0], u.decrypt(t) ? void s.debug("KEY_GEN_DONE", {
                durationMs: Date.now() - e
            }) : (s.error("GENERATE_KEY_FAILED", {
                durationMs: Date.now() - e
            }), i.reject(new Error("Wrong passphrase! Could not decrypt the private key!")))))
        },
        getPublicKey: function() {
            return l
        },
        decrypt: function(e) {
            if (function(e) {
                    return !e || 0 === Object.keys(e).length
                }(e)) return i.reject(new Error("EMPTY_CIPHER"));
            if (!u) return i.reject(new Error("NO_KEYS"));
            let t;
            try {
                t = n.message.readArmored(e)
            } catch (e) {
                return s.debug("READ_ARMORED_FAILED", e.message), i.reject(e)
            }
            return n.decrypt({
                privateKey: u,
                message: t
            }).then(e => e.data)
        },
        encrypt: function(e, t) {
            if (!e) return i.reject(new Error("EMPTY_PLAINTEXT"));
            const r = t ? n.key.readArmored(t).keys : d;
            return n.encrypt({
                data: e,
                publicKeys: r
            }).then(e => e.data)
        },
        generateDecryptMiddleware: function(e) {
            return (t, r, n) => ! function(e) {
                return "POST" !== e.method || !e.body || !e.body.data || !e.headers || "true" !== e.headers[a]
            }(t) ? void e(t.body.data).then(e => {
                s.debug("decrypted secure request"), t.body = JSON.parse(e), n()
            }).catch(e => {
                s.warn("DECRYPT_FAILED", e.message);
                const t = new Error("Decryption Failed");
                t.status = 401, n(t)
            }) : void n()
        }
    }
}, function(e, t, r) {// Function 72 startNotificationListener for DeviceFileManager
    "use strict";
    AllFunctions(0)("Function 72").verbose("");
    const n = r(2).devicefilemanager,
        o = r(225),
        i = r(56),
        s = r(10),
        a = r(0)("DeviceFileManager"),
        c = new o(n, s);
    e.exports = c, e.exports.startNotificationListener = function() {
        a.debug("startNotificationListener", i.NOTIFICATION_SYNC), 
        s.on(i.NOTIFICATION_SYNC, () => {a.debug("deviceFileManager notification"), 
                                        c._syncFileList().catch(e => {a.error("SYNC_FAILED", e.message)})
        })
    }
}, function(e, t, r) {// Function 73 generic comparison funcit0ns (not, or, and)
    "use strict";
    AllFunctions(0)("Function 73").verbose("");

    function n(e) {
        return t => t instanceof Array ? !!t.length && t.some(e) : e(t)
    }
    var o = Number.isFinite;
    const i = r(126),
        s = r(47),
        a = r(74);
    e.exports = {
        not: function(e) {
            return (...t) => !e(...t)
        },
        or: function(...e) {
            return (...t) => e.some(e => e(...t))
        },
        and: function(...e) {
            return (...t) => e.every(e => e(...t))
        },
        nested: n,
        TYPE: {
            LIST: function(e) {
                const t = e.find || [],
                    r = e.in || [];
                return e => {
                    const o = c(e, r);
                    if (!o) throw new Error("Failed to check in lists: no check subjects provided");
                    return t.every(n(u(o)))
                }
            },
            MATCH: function(e) {
                const t = e.in || [],
                    r = e.min,
                    n = e.max,
                    i = e.count,
                    s = "string" == typeof e.pattern ? new RegExp(e.pattern) : e.pattern;
                return e => {
                    const a = c(e, t);
                    if (!a) throw new Error("Failed to check matches: no check subjects provided");
                    const u = a.filter(e => s.test(e));
                    return !(o(r) && u.length < r || o(n) && u.length > n || o(i) && u.length !== i || void 0 === i && void 0 === r && void 0 === n && void 0 !== s && 0 === u.length)
                }
            },
            EQUAL: function(e) {
                const t = e.in || [],
                    r = e.value;
                return e => {
                    const o = t.length ? t.map(t => s(e, t, [])) : e instanceof Array ? e : [e];
                    if (!o) throw new Error("Failed to check value: no check subject provided");
                    return o.every(n(d(r)))
                }
            },
            UNDEFINED: function(e) {
                const t = e.in || [];
                return e => {
                    const r = t.length ? t.map(t => s(e, t)) : e instanceof Array ? e : [e];
                    if (!r) throw new Error("Failed to check value: no check subject provided");
                    return r.every(n(e => void 0 === e))
                }
            }
        }
    };
    const c = (e, t) => {
            return e && t.length ? i(t.map(t => s(e, t, []))) : e instanceof Array ? e : void 0
        },
        u = e => t => {
            return "^" === t[0] || ("!" === t[0] ? -1 === e.indexOf(t.slice(1)) : -1 !== e.indexOf(t))
        },
        d = e => t => "!" === t[0] ? !a(e.elem.slice(1), e) : a(t, e)
}, function(e) {// Function 74 exports = require("lodash/isEqual")
    e.exports = require("lodash/isEqual")
}, function(e) {// Function 75 exports = require("lodash/difference")
    e.exports = require("lodash/difference")
}, function(e, t, r) {// Function 76 exports r(287))(r(2).firmware);
    "use strict";
    AllFunctions(0)("Function 76").verbose("");
    const n = r(2).firmware,
        o = new(r(287))(n);
    e.exports = o
}, function(e) {// Function 77 exports = require("lodash/isUndefined")
    e.exports = require("lodash/isUndefined")
}, function(e) {// Function 78 exports = require("fast-url-parser")
    e.exports = require("fast-url-parser")
}, function(e, t, r) {// Function 79 various functions for implementing recipestep
    "use strict";
    AllFunctions(0)("Function 79").verbose("");

    function n(e) {
        this.label = e.label, this.validate()
    }

    function o(e) {
        this.type = o.TYPE, this.label = e.label, this.address = e.address, this.text = e.text, n.call(this, e)
    }

    function i(e) {
        this.type = i.TYPE, this.deviceKey = e.deviceKey, this.deviceName = e.deviceName, this.componentName = e.componentName, this.execArg = e.execArg, n.call(this, e)
    }

    function s(e) {
        this.type = s.TYPE, this.delay = parseInt(e.delay, 10), this.smart = e.smart, n.call(this, e)
    }

    function a(e) {
        this.type = a.TYPE, this.deviceKey = e.deviceKey, this.deviceName = e.deviceName, n.call(this, e)
    }

    function c(e) {
        this.type = c.TYPE, this.scenarioKey = e.scenarioKey, this.scenarioName = e.scenarioName, this.client = !0, n.call(this, e)
    }
    const u = r(16),
        d = r(11),
        l = r(0)("recipestep"),
        p = r(136),
        h = r(43);
    n.prototype.validate = function() {
        if (!this.type) throw new Error("validation failed: no recipe type");
        if (this._validateIngredients(), !this.getLabel()) throw new Error("validation failed: no recipe label")
    }, n.prototype.toJSON = function() {
        const e = {
            type: this.type,
            label: this.getLabel()
        };
        return u.merge(e, this.getIngredients())
    }, n.prototype.getType = function() {
        return this.type
    }, n.prototype.getLabel = function() {
        throw new Error("to be implemented")
    }, n.prototype._validateIngredients = function() {
        throw new Error("to be implemented")
    }, n.prototype.getIngredients = function() {
        throw new Error("to be implemented")
    }, n.prototype.execute = function() {
        throw new Error("to be implemented (returns an action)")
    }, n.prototype.update = function() {
        throw new Error("to be implemented (returns an action)")
    }, o.TYPE = "email", d.inherits(o, n), o.prototype.getLabel = function() {
        return this.label
    }, o.prototype.getIngredients = function() {
        return {
            label: this.label,
            address: this.address,
            text: this.text
        }
    }, o.prototype._validateIngredients = function() {
        if (!this.label) throw new Error("validation failed: `label` is missing");
        if (!this.address) throw new Error("validation failed: `address` is missing");
        if (!this.text) throw new Error("validation failed: `text` is missing")
    }, o.prototype.execute = function() {
        AllFunctions(0)("Function 79").verbose("getAction");
        return p({
            getAction: () => ({
                email: this.address,
                message: this.text
            }),
            getName: () => this.label
        }), h.buildDummyAction(this.getLabel())
    }, o.prototype.update = function() {
        l.debug("update not implemented for EmailStep")
    }, i.TYPE = "action", d.inherits(i, n), i.prototype.getLabel = function() {
        return 'Send "' + this.componentName + '" to "' + this.deviceName + '"'
    }, i.prototype.getIngredients = function() {
        return {
            deviceKey: this.deviceKey,
            deviceName: this.deviceName,
            componentName: this.componentName,
            execArg: this.execArg
        }
    }, i.prototype._validateIngredients = function() {
        if (!this.deviceKey) throw new Error("validation failed: `deviceKey` is missing");
        if (!this.deviceName) throw new Error("validation failed: `deviceName` is missing");
        if (!this.componentName) throw new Error("validation failed: `componentName` is missing")
    }, i.prototype.getDevice = function(e) {
        const t = e.getDeviceByKey(this.deviceKey);
        if (!t) throw new Error("Could not execute `ActionStep`: device " + this.deviceKey + " not found");
        return t
    }, i.prototype.execute = function(e, t) {
        AllFunctions(0)("Function 79").verbose("execute");
        const r = this.getDevice(t).getComponentByName(this.componentName, !0);
        if (!r) throw new Error("Could not execute `ActionStep`: component " + this.componentName + " not found");
        const n = this.execArg || r.execArg || null;
        return h.buildActionOfComponent(r.getName(), r, n, 0)
    }, i.prototype.update = function(e) {
        const t = e.getDeviceByKey(this.deviceKey);
        this.deviceName = t.name
    }, s.TYPE = "delay", d.inherits(s, n), s.prototype.getLabel = function() {
        const e = Math.round(this.delay / 100) / 10,
            t = 1 <= e || 0 === e ? e.toFixed(0) : e.toFixed(1);
        return "Wait for " + t + ("1" === t ? " second" : " seconds")
    }, s.prototype.getIngredients = function() {
        return {
            delay: this.delay,
            smart: this.smart
        }
    }, s.prototype._validateIngredients = function() {
        if (!Number.isInteger(this.delay)) throw new Error("validation failed: `delay` must be a integer")
    }, s.prototype.execute = function(e, t) {
        if (!this.smart) return h.buildDelayOnlyAction(this.delay);
        const r = e.getStepsByType(i.TYPE).map(e => e.getDevice(t)).filter(e => e.isMarkedAsOff()).reduce((e, t) => Math.max(e, t.getStandbyCommandDelay()), 0),
            n = Math.min(r, this.delay);
        return h.buildDelayOnlyAction(n)
    }, s.prototype.update = function() {
        l.debug("update not implemented for DelayStep")
    }, a.TYPE = "volume", d.inherits(a, n), a.prototype.getLabel = function() {
        return 'Use "' + this.deviceName + '" Volume'
    }, a.prototype.getIngredients = function() {
        return {
            deviceKey: this.deviceKey,
            deviceName: this.deviceName
        }
    }, a.prototype._validateIngredients = function() {
        if (!this.deviceKey) throw new Error("validation failed: `deviceKey` is missing");
        if (!this.deviceName) throw new Error("validation failed: `deviceName` is missing")
    }, a.prototype.execute = function(e) {
        const t = e.getScenario();
        return t ? t.setVolumeDeviceKey(this.deviceKey) : l.warn("MODIFIED_AUDIO_CONTROL_OF_CUSTOM_RECIPE"), l.debug("Setting volume device to " + this.deviceName + " (" + this.deviceKey + ")"), h.buildDummyAction(this.getLabel())
    }, a.prototype.update = function(e) {
        const t = e.getDeviceByKey(this.deviceKey);
        this.deviceName = t.name
    }, c.TYPE = "controls", d.inherits(c, n), c.prototype.getLabel = function() {
        return 'Show "' + this.scenarioName + '" Controls'
    }, c.prototype.getIngredients = function() {
        return {
            scenarioKey: this.scenarioKey,
            scenarioName: this.scenarioName,
            client: !0
        }
    }, c.prototype._validateIngredients = function() {
        if (!this.scenarioKey) throw new Error("validation failed: `scenarioKey` is missing");
        if (!this.scenarioName) throw new Error("validation failed: `scenarioName` is missing")
    }, c.prototype.execute = function() {
        return h.buildDummyAction(this.getLabel())
    }, c.prototype.update = function(e) {
        const t = e.getScenarioByKey(this.scenarioKey);
        this.scenarioName = t.name
    };
    const g = {};
    g[i.TYPE] = i, g[o.TYPE] = o, g[s.TYPE] = s, g[a.TYPE] = a, g[c.TYPE] = c, e.exports = function(e) {
        const t = e.type;
        if (!t) throw new Error("No recipe step type given");
        const r = g[t];
        if (!r) throw new Error("No such recipe step type: " + t);
        return new r(e)
    }, e.exports.TYPE_ACTION = i.TYPE, e.exports.TYPE_EMAIL = o.TYPE, e.exports.TYPE_DELAY = s.TYPE, e.exports.TYPE_VOLUME = a.TYPE, e.exports.TYPE_CONTROLS = c.TYPE
}, function(e, t, r) {// Function 80 BaseTrigger
    "use strict";
    AllFunctions(0)("Function 80").verbose("");
    const n = r(16),
        o = r(147);
    class i {
        constructor(e) {
            if (this.constructor === i) throw new Error("Cannot instantiate abstract class BaseTrigger");
            if (!this.getLabel) throw new Error('Subclasses of BaseTrigger must implement "getLabel" method');
            if (!this.getIngredients) throw new Error('Subclasses of BaseTrigger must implement "getIngredients" method');
            if (!this.getActivity) throw new Error('Subclasses of BaseTrigger must implement "getActivity" method');
            this.type = e.type, this.label = e.label
        }
        getType() {
            return this.type
        }
        validate() {
            if (!this.type) throw new Error("validation failed: no recipe type");
            if (!this.getLabel()) throw new Error("validation failed: no recipe label");
            this._validateIngredients()
        }
        _validateIngredients() {
            o.validateCondition(this.getActivity().condition)
        }
        toJSON() {
            const e = {
                type: this.type,
                label: this.getLabel()
            };
            return n.merge(e, this.getIngredients())
        }
    }
    e.exports = i
}, function(e, t, r) {// Function 81 various functions for implementing recipe
    "use strict";
    AllFunctions(0)("Function 81").verbose("");
    const n = r(16),
        o = r(11),
        i = r(0)("recipe"),
        s = r(79),
        a = r(322),
        c = r(146),
        u = r(21),
        d = r(33),
        l = r(43),
        p = r(52),
        h = r(22),
        g = e.exports = function(e) {
            this.name = e.name, this.type = e.type, this.icon = e.icon || "default", this.steps = e.steps || [], this.conditions = (e.conditions || []).map(a), this.trigger = e.trigger || c({
                type: g.TRIGGER_TYPE_ICON,
                recipe: this
            }), this.dirty = e.dirty, this.room = e.room, this.scenario = e.scenario, this.scenarioKey = this.getScenarioKey(), this.isHiddenRecipe = function(e, t) {
                return e && t ? t.getDeviceByKey(e.mainDeviceKey).capabilities.includes(u.NEEO_FEATURE_RECIPE_HIDDEN) : (i.debug("isHiddenRecipe: no scenario or room assigned -> not a hidden recipe"), !1)
            }(this.scenario, this.room), this.enabled = !!n.isUndefined(e.enabled) || e.enabled, this.isCustom = e.isCustom || !1, h.call(this, e.key, e.weight)
        };
    o.inherits(g, h), g.TYPE_LAUNCH = "launch", g.TYPE_POWEROFF = "poweroff", g.STEP_TYPE_ACTION = s.TYPE_ACTION, g.STEP_TYPE_EMAIL = s.TYPE_EMAIL, g.STEP_TYPE_DELAY = s.TYPE_DELAY, g.STEP_TYPE_VOLUME = s.TYPE_VOLUME, g.STEP_TYPE_CONTROLS = s.TYPE_CONTROLS, g.TRIGGER_TYPE_ICON = c.TYPE_ICON, g.TRIGGER_TYPE_SENSOR = c.TYPE_SENSOR, g.TRIGGER_TYPE_TIME = c.TYPE_TIME, g.TRIGGER_TYPE_INTERVAL = c.TYPE_INTERVAL, g.prototype._validateStep = function(e, t) {
        if (!e) throw new Error("empty recipe step!");
        if (t) {
            if (e.type === s.TYPE_VOLUME) {
                if (!this.steps.every(e => e.type !== s.TYPE_VOLUME)) throw new Error("only one volume step per recipe allowed!")
            }
            if (e.type === s.TYPE_CONTROLS) {
                if (!this.steps.every(e => e.type !== s.TYPE_CONTROLS)) throw new Error("only one control step per recipe allowed!")
            }
        }
        return "function" == typeof e.getLabel ? e : s(e)
    }, g.prototype._validateTrigger = function(e) {
        if (!e) throw new Error("empty recipe trigger!");
        return "function" == typeof e.getLabel ? e : (e.recipe = this, c(e))
    }, g.prototype._validateCondition = function(e, t) {
        if (!e) throw new Error("empty recipe condition!");
        let r;
        "function" == typeof e.getLabel && (r = e), r = a(e);
        const n = this.getConditions();
        return 0 <= t && t < n.length && n.splice(t, 1), r.checkForConflicts(n), r
    }, g.prototype.getCondition = function(e) {
        if (isNaN(e) || 0 > e || e >= this.conditions.length) throw new Error("Recipe condition index out of range!");
        return this.conditions[e]
    }, g.prototype.getConditions = function() {
        return this.conditions
    }, g.prototype.addCondition = function(e) {
        return e = this._validateCondition(e), this.conditions.push(e), this.markAsDirty(), e
    }, g.prototype.setCondition = function(e, t) {
        return this.getCondition(e), this.conditions[e] = this._validateCondition(t, e), this.markAsDirty(), this.conditions[e]
    }, g.prototype.removeCondition = function(e) {
        const t = this.getCondition(e);
        return this.conditions.splice(e, 1), this.markAsDirty(), t
    }, g.prototype.addStep = function(e) {
        return e = this._validateStep(e, !0), this.steps.push(e), this.markAsDirty(), e
    }, g.prototype.setStep = function(e, t) {
        return this.getStep(e), this.steps[e] = this._validateStep(t, !1), this.markAsDirty(), this.steps[e]
    }, g.prototype.reorderStep = function(e, t) {
        this.getStep(t), this.getStep(e), i.debug("reorder step", {
            fromIdx: e,
            toIdx: t,
            name: this.getName()
        });
        const r = this.steps.splice(e, 1)[0];
        this.steps.splice(t, 0, r), this.markAsDirty()
    }, g.prototype.removeStep = function(e) {
        const t = this.getStep(e);
        return this.steps.splice(e, 1), this.markAsDirty(), t
    }, g.prototype.hasSteps = function() {
        return 0 < this.steps.length
    }, g.prototype.getLabel = function() {
        return this.name
    }, g.prototype.getName = function() {
        return this.name
    }, g.prototype.setName = function(e) {
        this.name = e, this.markAsDirty()
    }, g.prototype.setIcon = function(e) {
        this.icon = e || "default"
    }, g.prototype.getIcon = function() {
        return this.icon
    }, g.prototype.getType = function() {
        return this.type
    }, g.prototype.isLaunchRecipe = function() {
        return this.type === g.TYPE_LAUNCH
    }, g.prototype.getRoomName = function() {
        return this.room ? this.room.getName() : void 0
    }, g.prototype.getRoomKey = function() {
        return this.room ? this.room.getKey() : void 0
    }, g.prototype.getScenario = function() {
        return this.scenario
    }, g.prototype.getScenarioKey = function() {
        return this.scenario ? this.scenario.getKey() : void 0
    }, g.prototype.getScenarioName = function() {
        return this.scenario ? this.scenario.getName() : void 0
    }, g.prototype.getSteps = function() {
        return this.steps
    }, g.prototype.getStepsByType = function(e) {
        return this.steps.filter(t => t.getType() === e)
    }, g.prototype.getStep = function(e) {
        if (isNaN(e) || 0 > e || e >= this.steps.length) throw new Error("Recipe step index out of range!");
        return this.steps[e]
    }, g.prototype.isEnabled = function() {
        return this.enabled
    }, g.prototype.setEnabled = function(e) {
        this.enabled = /true/.test(e), this.markAsDirty()
    }, g.prototype.isDirty = function() {
        return this.dirty
    }, g.prototype.markAsDirty = function() {
        this.dirty = !0
    }, g.prototype.markAsClean = function() {
        this.dirty = !1
    }, g.prototype.executeStep = function(e, t) {
        const r = this.getStep(e).execute(this, t);
        if (!r) throw new Error("A recipe step must return an action when executed!");
        return p.trigger(r)
    }, g.prototype._updateIconScenarioPowerState = function(e) {
        return this.scenario ? void(this.type === g.TYPE_LAUNCH ? (i.debug("activateExclusively", this.scenario.name), e.activateScenarioExclusively(this.scenario)) : (i.debug("poweroff", this.scenario.name), this.scenario.active = !1)) : void i.debug("no scenario defined, bail out")
    }, g.prototype.execute = function(e) {
        if (!e) throw new Error("No project defined!");
        i.event(`${n.capitalize(this.type)} recipe “${this.name}”`);
        const t = this._getPowerOffStepsOfActiveDevicesWithSameTarget(e).concat(this.getSteps()).map(t => t.execute(this, e)).filter(e => !!e),
            r = l.buildActionOfActions(this.getLabel(), t),
            o = p.trigger(r, {
                recipeType: this.type
            }),
            s = this.trigger.getType() === g.TRIGGER_TYPE_ICON;
        return o && s && o.promise.then(() => (this._updateIconScenarioPowerState(e), e.activeNowChanged(), null)).catch(() => {}), o
    }, g.prototype._getPowerOffStepsOfActiveDevicesWithSameTarget = function(e) {
        return this.scenario && this.type === g.TYPE_POWEROFF ? e.getActiveDevicesUsingTargetDevice(this.scenario).map(e => e.capabilities.includes(u.NEEO_DEVICE_SMARTIFIED_POWER_MODE) ? e.getMacroByName(d.MACRO_POWER_TOGGLE_OFF) : e.getMacroByName(d.MACRO_POWER_OFF)).filter(n.isObject).map(e => s({
            type: g.STEP_TYPE_ACTION,
            deviceKey: e.getDevice().getKey(),
            deviceName: e.getDevice().getName(),
            componentName: e.getName()
        })) : []
    }, g.prototype.update = function() {
        this.steps.forEach(e => {
            e.update(this.room)
        })
    }, g.prototype.setTrigger = function(e) {
        return e = this._validateTrigger(e), this.trigger = e, e
    }, g.prototype.isVisibleInGui = function(e) {
        return !(!this.trigger || !this.isEnabled()) && !(!e && this.type !== g.TYPE_LAUNCH) && !(this.trigger.getType() !== g.TRIGGER_TYPE_ICON) && (!this.scenario || this.scenario.isConfigured())
    }, g.prototype.isVisibleInGuiAsUnconfigured = function() {
        return this.isEnabled() && !this.isCustom && this.isLaunchRecipe() && this.trigger && this.trigger.getType() === g.TRIGGER_TYPE_ICON && this.scenario && !this.scenario.isConfigured()
    }, g.prototype.hasActivity = function() {
        return !(!this.trigger || !this.isEnabled()) && this.trigger.getType() !== g.TRIGGER_TYPE_ICON
    }, g.prototype.getActivity = function() {
        return this.hasActivity() ? this.trigger.getActivity(this) : null
    }, g.prototype.removeDevice = function(e, t) {
        this._removeStepsUsing(e, t), this._removeConditionsUsing(e)
    }, g.prototype._removeStepsUsing = function(e, t) {
        const r = !!t && t.key,
            n = !!t && t.isGroupedScenario;
        this.steps = this.steps.filter(t => {
            const o = t.deviceKey === e.key,
                i = t.scenarioKey === r,
                s = t.type === g.STEP_TYPE_CONTROLS;
            return !o && (!i || n && s)
        })
    }, g.prototype._removeConditionsUsing = function(e) {
        this.conditions = this.conditions.filter(t => {
            return !t.sensorEventKey || 0 !== t.sensorEventKey.indexOf(e.key)
        })
    }, g.prototype.toJSON = function() {
        const e = this.scenario ? this.scenario.getType() : void 0;
        return {
            key: this.key,
            type: this.type,
            name: this.name,
            icon: this.icon,
            enabled: this.enabled,
            dirty: this.dirty,
            steps: this.steps,
            conditions: this.conditions,
            trigger: this.trigger,
            roomKey: this.getRoomKey(),
            roomName: this.getRoomName(),
            scenarioKey: this.getScenarioKey(),
            mainDeviceType: e,
            isHiddenRecipe: this.isHiddenRecipe,
            isCustom: this.isCustom,
            weight: this.weight
        }
    }
}, function(e, t, r) {// Function 82 various functions for implementing ItemStore
    "use strict";
    AllFunctions(0)("Function 82").verbose("");
    const n = r(16),
        o = r(22),
        i = e.exports = function(e) {
            if (!(e = e || {}).name) throw new Error("Missing parameter name for ItemStore");
            this.name = e.name, this.keyProperty = e.keyProperty, this.silentReplace = !n.isBoolean(e.silentReplace) || e.silentReplace, this.caseSensitive = !n.isBoolean(e.caseSensitive) || e.caseSensitive, this.clear()
        };
    i.prototype._updateLength = function() {
        this.length = Object.keys(this.store).length
    }, i.prototype._keyValueInternal = function(e, t) {
        t = t || this.keyProperty;
        const r = "object" == typeof e ? e[t] : e,
            n = typeof r;
        if ("object" == n || "function" == n) throw new Error("Invalid keyValue (keyValues can only be primitve types)!");
        return this.caseSensitive ? r : function(e) {
            return "string" == typeof e ? e.toLowerCase() : e
        }(r)
    }, i.prototype.clear = function() {
        this.store = {}, this._updateLength()
    }, i.prototype.put = function(e) {
        if (!(e && e instanceof o)) throw new Error("INVALID_ITEM_OR_ITEMTYPE type:" + typeof e);
        const t = e.getKey();
        if (this.keyProperty) {
            this._keyValueInternal(e);
            const t = this.get(e[this.keyProperty]);
            if (t) {
                if (!this.silentReplace) throw new Error("Element with this keyValue already exists (" + e[this.keyProperty] + ")");
                delete this.store[t.getKey()]
            }
        }
        return this.store[t] = e, this._updateLength(), this
    }, i.prototype.getByKey = function(e) {
        return this.store[e]
    }, i.prototype.getAll = function() {
        return n.values(this.store)
    }, i.prototype.get = function(e, t, r) {
        if (!(t = t || this.keyProperty)) throw new Error("Invalid store access! No keyProperty is defined!");
        return e = this._keyValueInternal(e, t), n[r ? "filter" : "find"](this.store, r => e === this._keyValueInternal(r, t))
    }, i.prototype.remove = function(e) {
        if (!e) throw new Error("Invalid argument!");
        const t = e.getKey();
        return delete this.store[t], this._updateLength(), e
    }, i.prototype.forEach = function(e) {
        n.forEach(this.store, e)
    }, i.prototype.map = function(e) {
        return n.map(this.store, e)
    }, i.prototype.filter = function(e) {
        return n.filter(this.store, e)
    }, i.prototype.find = function(e) {
        return n.find(this.store, e)
    }, i.prototype.toJSON = function() {
        if (!this.keyProperty) return this.store;
        const e = {};
        return this.getAll().forEach(t => {
            e[t[this.keyProperty]] = t
        }), e
    }
}, function(e, t, r) {// Function 83 projectnotification
    "use strict";
    AllFunctions(0)("Function 83").verbose("");
    const n = r(10),
        o = r(25),
        i = r(6)("cp6:lib:projectnotification"),
        s = r(3);
    let a;
    e.exports = {
        refreshClients: function() {
            return s.increaseCounter("projectnotification-refresh-clients"), a ? (i("client refresh"), void a()) : (i("no refresh callback registered"), !1)
        },
        registerNotificationCallback: function(e) {
            i("registered callback"), a = e
        },
        activeNowChanged: function(e) {
            s.increaseCounter("projectnotification-active-now-changed"), n.send({
                type: o.NOTIFICATION_ACTIVE_NOW_CHANGED,
                data: Date.now()
            }), n.send({
                type: o.NOTIFICATION_ACTIVE_SCENARIOS_CHANGED,
                data: {
                    activeScenarioKeys: e
                }
            })
        },
        projectChanged: function(e, t) {
            s.increaseCounter("projectnotification-project-changed"), n.send({
                type: o.NOTIFICATION_PROJECT_CHANGED,
                data: {
                    date: e,
                    controllerRoom: t
                }
            })
        }
    }
}, function(e, t, r) {// Function 84 tr2coapserver (84)
    "use strict";
    AllFunctions(0)("Function 84").verbose("tr2coapserver");

    function n(e) {
        AllFunctions(0)("Function 84").verbose("handleWifiRequest=>443");

        return d.handleWifiRequest(e).catch(() => {})
    }
    const o = r(2),
        i = r(0)("TR2SERVER"),
        s = r(10),
        a = r(25),
        c = r(377),
        u = r(64),
        d = r(443),
        l = r(449),
        p = r(450),
        h = r(171),
        g = r(453),
        m = r(15),
        f = new c(o.tr2),
        E = new l(o.tr2coapserver, d);
    d.setForwardingHosts(o.tr2coapserver.forwardingHosts), e.exports = {
        parseEncodedListParameter: m.parseEncodedListParameter,
        tr2interface: f,
        tr2Transform: u,
        tr2CoapServer: E,
        projectRepo: h,
        handleTr2WifiRequest: n,
        startNotificationListener: function() {
            i.debug("startNotificationListener", a.NOTIFICATION_PROJECT_CHANGED), s.on(a.NOTIFICATION_PROJECT_CHANGED, e => {
                i.debug("tr2 notification"), f._notifyProjectChanged(e)
            })
        },
        startTask: function() {
            AllFunctions(0)("Function 84").verbose("START_TR2_SERVER");
        
            i.debug("START_TR2_SERVER"), p.bind(), E.bind(), f.startNbrSync()
        },
        stopTask: function() {
            E.close(), p.close()
        },
        directoryAction: g.callAction,
        directoryBrowse: g.browseDirectory,
        directoryGetRootItems: g.getDeviceRootItems
    }, E.on("ipv6coapaddress", e => {
        f.registerIpv6Address(e)
    }), E.on("serverstarted", () => {
        AllFunctions(0)("Function 84").verbose("TR2_COAPSERVER_STARTED");

        i.debug("TR2_COAPSERVER_STARTED")
    }), E.on("error", e => {
        i.error("TR2_COAPSERVER_ERROR", e.message)
    }), E.on("invalidsender", e => {
        i.warn("COAP_INVALID_SENDER", e)
    }), E.on("invalidrequest", e => {
        i.warn("COAP_INVALID_PARAMETER", e)
    }), p.on("udprequest", (e, t) => {
        AllFunctions(0)("Function 84").verbose("TR2 Send UDP-request, payload",e.toString("utf8"),"from IP@",t.address + ":" + t.port)
        i.debug("udp request from", t.address + ":" + t.port), n(e.toString("utf8"))
    }), p.on("serverstarted", e => {
        i.debug("TR2_UDPSERVER_STARTED", e)
    }), p.on("error", e => {
        i.error("UDP_SERVER_ERROR", e.message)
    })
}, function(e, t, r) {// Function 85  Router: routes.room 
    "use strict";
    AllFunctions(0)("Function 85").verbose("");
    const n = r(5),
        o = r(14),
        i = n.Router(),
        s = r(15),
        a = r(108),
        c = r(149),
        u = r(0)("routes.room");
    a.use("/:project_key/rooms", i), i.param("room_key", function(e, t, r, n) {
        e.room = e.project.getRoomByKey(n), e.room ? r() : r(new Error("no such room"))
    }), i.get("/", function(e, t) {
        let r = e.project.getRooms();
        !1 === s.getBooleanParam(e, "details") && (r = r.map(e => e.getSummary())), t.json(r)
    }), i.get("/reorder", function(e, t, r) {
        const n = e.project.getRooms(),
            o = s.getIntParam(e, "from", n.length),
            i = s.getIntParam(e, "to", n.length);
        c.reorder(n, o, i), e.project.save().then(() => t.json(n)).catch(r)
    }), i.get("/:room_key", function(e, t) {
        let r = e.room;
        !1 === s.getBooleanParam(e, "details") && (r = r.getSummary()), t.json(r)
    }), i.delete("/:room_key", function(e, t) {
        e.project.removeRoom(e.room), e.project.save(), t.json({
            success: !0
        })
    }), i.post("/", function(e, t, r) {
        o(e.body, {
            name: {
                presence: !0
            }
        });
        let n = e.project.getRoomByName(e.body.name);
        if (!n) {
            if (!e.project.isAllowedToAddRoom()) {
                u.warn("MAXIMAL_ROOM_ENTRIES_EXCEEDED");
                const e = new Error("MAXIMAL_ROOM_ENTRIES_EXCEEDED");
                return e.alreadyLogged = !0, r(e)
            }
            n = new c({
                name: e.body.name,
                icon: e.body.icon
            }), e.project.addRoom(n)
        }
        t.json(n)
    }), i.put("/:room_key", function(e, t) {
        const r = e.room,
            n = e.body;
        o(n, {
            name: {
                presence: !0
            },
            hasController: {
                presence: !0
            }
        }), r.name = n.name, n.hasController && (e.project.getRooms().forEach(e => {
            e.hasController = !1
        }), r.hasController = !0), t.json(r)
    }), i.post("/:room_key", function(e, t) {
        const r = s.getRequestParameter(e, "name", {
                presence: !0
            }),
            n = e.body.icon;
        e.room.getIcon() !== n && (u.debug("SET_ICON_ROOM", {
            room: e.room.getName(),
            icon: n
        }), e.room.setIcon(n)), e.room.getName() !== r && (u.debug("RENAME_ROOM", {
            room: e.room.getName(),
            newname: r
        }), e.project.renameRoom(e.room, r)), e.project.save(), t.json(e.room)
    }), i.get("/:room_key", function(e, t) {
        t.json(e.room)
    }), e.exports = i
}, function(e) {// Function 86 exports = require("lodash/isBoolean")
    e.exports = require("lodash/isBoolean")
}, function(e, t) {// Function 87 generic put/set/clear&getall functions
    "use strict";
    AllFunctions(0)("Function 87").verbose("");
    const r = new Map,
        n = ".";
    t.put = function(e, t, o) {
        r.set(e + n + t, o)
    }, t.get = function(e, t) {
        return r.get(e + n + t)
    }, t.getAll = function(e) {
        const t = Array.from(r.keys()),
            o = {};
        return t.forEach(t => {
            t.startsWith(e + n) && (t = t.replace(e + n, ""), o[t] = r.get(e + n + t))
        }), o
    }, t.clear = function() {
        r.delete()
    }
}, function(e) {// Function 88 exports = require("lodash/uniqBy")
    e.exports = require("lodash/uniqBy")
}, function(e, t, r) {// Function 89 deviceparser
    "use strict";
    AllFunctions(0)("Function 89").verbose("");
    const n = r(18),
        o = r(14),
        i = r(218), 
        s = r(219),
        a = r(0)("deviceparser"),
        c = "Z-Wave Device",
        u = "Unknown",
        d = {
            presence: !0
        },
        l = e.exports = function(e) {
            if (!e.sourceName) throw new Error("DeviceSpec: missing source-name!");
            if (this.sourceName = e.sourceName, this.score = e.score, !e.sourceData && !e.data) throw new Error("DeviceSpec: missing data!");
            this.data = e.sourceData ? this._parseData(e.sourceData, this.sourceName, e.fallbackAdapterName) : e.data, this._validate()
        };
    l.prototype._parseData = function(e, t, r) {
        AllFunctions(0)("Function 89").verbose(" _parseData");

        const o = t === n.SOURCE_DUIRO ? s(e) : i(e),
            a = this._handleUnknownDevices(o, r);
        return a.sourceName = t, a
    }, l.prototype._handleUnknownDevices = function(e = {}, t) {
        const r = "zwave" === t;
        return e.manufacturer || (e.manufacturer = "Unknown", e.name = r ? c : u, e.id = r ? c : u, e.isTested = !1, e.adapterName = t), e
    }, l.validateData = function(e) {
        o(e, {
            id: d,
            manufacturer: d,
            name: d,
            type: d,
            isTested: d,
            adapterName: d
        })
    }, l.prototype._validate = function() {
        try {
            o(this, {
                adapterType: {
                    inclusion: n.SOURCES
                }
            }), l.validateData(this.data)
        } catch (e) {
            throw a.error("DEVICEPARSER_VALIDATION_FAILED", {
                sourcename: this.getSourceName(),
                msg: e.message
            }), new Error("DEVICEPARSER_VALIDATION_FAILED")
        }
    }, l.prototype.getSourceName = function() {
        return this.sourceName
    }, l.prototype.getId = function() {
        return this.sourceName + this.data.id
    }, l.prototype.getName = function() {
        return this.data.name
    }, l.prototype.getData = function() {
        return this.data
    }, l.prototype.getScore = function() {
        return this.score
    }, l.prototype.toJSON = function() {
        return {
            id: this.getId(),
            data: this.data
        }
    }
}, function(e, t, r) {// Function 90 API: getAllRegisteredSdkAdapters
    "use strict";
    AllFunctions(0)("Function 90").verbose("");

    function n() {
        const e = E.getRegisteredAdapters();
        return l.debug("SAVE_SDK_ADAPTER", {
            entries: e.length
        }), y.save(e).catch(e => {
            l.error("SAVE_SDK_ADAPTER", {
                error: e.message
            })
        })
    }

    function o() {
        return l.debug("cleanup sdk adapter"), f.getReferencedAdapters().then(e => {
            const t = E.findUnreferencedAdapters(e).filter(c).map(e => (l.info("DELETE_UNUSED_SDK_ADAPTER", e), s(e)));
            return u.all(t)
        })
    }

    function i(e) {
        return new u((t, r) => {
            if (E.register(e)) {
                c(e) && l.event(`Registered SDK Adapter ${e.name}`);
                const r = E.getRegisteredAdapters();
                h.updateSearchSources(r), l.debug("rebuild guidata.xml to refresh new devicedata"), u.delay(v).then(() => d({
                        method: "GET",
                        uri: m.address + "/projects/home/tr2/guidata_xml"
                    })).catch(e => {
                        const t = p.extractInfo(e);
                        l.warn("GUIDATA_FETCH_FAILED", t.message)
                    }),
                    function(e) {
                        f.getAdapterDevicesBySource(e).then(t => u.mapSeries(t, t => (function(e, t) {
                            return g.checkForAndUpdateDevice(e).catch(r => {
                                l.event(`Failed to update device ${e.name} (${e.roomName})`), l.error("UPDATE_ADAPTER_DEVICE_FAILED", {
                                    msg: r.message,
                                    sourceName: t
                                })
                            })
                        })(t, e))).then(() => {
                            f.saveProject()
                        })
                    }(e.name), n().then(t)
            } else {
                const e = new Error("UNABLE_TO_ADD_SDK_ADAPTER");
                e.alreadyLogged = !0, r(e)
            }
        })
    }

    function s(e) {
        return new u(t => {
            if (E.unregister(e)) {
                l.event(`Unregistered SDK Adapter ${e.name}`);
                const r = E.getRegisteredAdapters();
                h.updateSearchSources(r), n().then(t)
            } else t()
        })
    }

    function a(e) {
        return e.name === m.deviceadapter.internalSdkAdaptername
    }

    function c(e) {
        return !a(e)
    }
    const u = r(1),
        d = r(17),
        l = r(0)("api"),
        p = r(32),
        h = r(45),
        g = r(91),
        m = r(2),
        f = r(276),
        E = r(119),
        y = r(339),
        {
            URL: _
        } = r(341),
        v = 1e3;
    e.exports = {
        initialise: function() {
            return l.debug("initialise"), E.on("SDK_ADAPTER_CLEAN_REQUESTED", o), y.load().then(e => {
                if (l.debug("registered sdk adapters:", e.length), E.registerAll(e), !e.find(a)) return l.debug("add internal deviceadapter"), i({
                    baseUrl: m.deviceadapter.sdkRoutePath,
                    name: m.deviceadapter.internalSdkAdaptername,
                    protected: !0
                })
            }).then(() => {
                const e = E.getRegisteredAdapters();
                l.debug("allSdkAdapters", e), h.updateSearchSources(e)
            })
        },
        registerSdkDeviceAdapter: i,
        unregisterSdkDeviceAdapter: s,
        getAllRegisteredSdkAdapters: function() {
            return E.getRegisteredAdapters().filter(c).map(e => {
                const t = new _(e.baseUrl);
                return {
                    name: e.name,
                    host: t.hostname,
                    port: t.port
                }
            })
        },
        sdkAdapterCleanup: o,
        getAllRecipes: f.getAllRecipes,
        getActiveRecipesKeys: f.getActiveRecipesKeys,
        getNotificationKeys: f.getNotificationKeys,
        getAdapterSubscriptions: f.getAdapterSubscriptions
    }
}, function(e, t, r) {// Function 91 deviceUpdate
    "use strict";
    AllFunctions(0)("Function 91").verbose("");
    const n = r(21),
        o = r(256),
        i = r(264),
        s = r(0)("deviceUpdate"),
        a = r(2).deviceupdater;
    let c;
    e.exports = {
        startTask: function(e) {
            c || (c = setInterval(() => (function(e) {
                return o.checkDevicesForUpdate(e).then(e => (s.debug("AUTO_UPDATE_DEVICES_AVAILABLE", e.length), o.bulkUpdateDevices(e))).then(t => {
                    if (0 < t) return s.debug("AUTO_UPDATE_SUCCESSFUL", {
                        updatedDeviceCount: t
                    }), e.save()
                }).catch(e => {
                    s.error("AUTO_UPDATE_ERROR", {
                        msg: e.message
                    })
                }), null
            })(e), a.updateCheckIntervalMs))
        },
        stopTask: function() {
            clearInterval(c), c = void 0
        },
        checkForAndUpdateDevice: function(e) {
            AllFunctions(0)("Function 91").verbose("checkForAndUpdateDevice");
            return e.hasCapability(n.SOURCE_DUIRO) ? o.checkForAndUpdateDevice(e) : e.hasCapability(n.SOURCE_SDK_ADAPTER) ? i.checkForAndUpdateDevice(e) : Promise.reject(new Error("DEVICE_UPDATE_FAILED"))
        }
    }
}, function(e, t, r) {// Function 92 API: getScenarioViewStructure, generateDeviceViewStructure, getScenarioSlides
    "use strict";
    AllFunctions(0)("Function 92").verbose("");

    function n(e) {
        return e.getDevices().reduce((e, t) => (e[t.key] = d.getWidgetsForDevice(t), e), {})
    }

    function o(e) {
        return e.reduce((e, t) => {
            const r = t.find(e => e.options.isFooter);
            return r ? !e.footer && (e.footer = r) : e.slidesWithoutFooter.push(t), e
        }, {
            footer: !1,
            slidesWithoutFooter: []
        })
    }
    const i = r(29),
        s = r(93),
        a = r(233),
        c = r(234),
        u = r(73),
        d = r(238),
        l = r(240),
        p = r(243),
        h = r(46),
        g = r(128);
    e.exports = {
        initialize: function(e) {
            (function(e) {
                if (!e) throw new Error("Initialize options are required");
                if (!e.widgetDefinitions) throw new Error("Missing widgetDefinitions from initialize options");
                if (!e.slidePresetDefinitions) throw new Error("Missing slidePresetDefinitions from initialize options");
                if (!e.keyDefinitions) throw new Error("Missing keyDefinitions from initialize options");
                if (!e.keyLayoutDefinitions) throw new Error("Missing keyLayoutDefinitions from initialize options");
                if (!e.keyMappingDefinitions) throw new Error("Missing keyMappingDefinitions from initialize options");
                if (!e.widgetDataHandlers) throw new Error("Missing widgetDataHandlers from initialize options")
            })(e), g.setStatisticsModule(e.statistics), d.loadWidgets(e.widgetDefinitions), c.loadSlidesFromDefinition(e.slidePresetDefinitions), s.loadDefinitions(e.keyDefinitions, e.keyLayoutDefinitions, e.keyMappingDefinitions), p.registerWidgetHandlers(e.widgetDataHandlers), p.setNonAutomatableInfoGetter(e.getDeviceNonAutomatableInfo)
        },
        ConditionChecker: u,
        getWidgetsForDevice: d.getWidgetsForDevice,
        getWidgetByName: d.getWidgetByName,
        getScenarioViewStructure: function(e, t) {
            AllFunctions(0)("Function 92").verbose("getScenarioViewStructure");
            const r = n(e),
                i = c.getSlides(e, r, e.mainDeviceKey),
                {
                    footer: u,
                    slidesWithoutFooter: d
                } = o(i),
                h = e.getMainDevice(),
                g = s.getKeymappingForDevice(h),
                m = a.getViewStructureForScenario(e, d, u, g),
                f = p.addScenarioData(m, t, e);
            return f.slides = l.process(f.slides), f
        },
        generateDeviceViewStructure: function(e) {
            AllFunctions(0)("Function 92").verbose("generateDeviceViewStructure");

            const t = i(d.getWidgetsForDevice(e)).reduce((e, t) => (e[t.name] = t, e), {}),
                r = {
                    [e.key]: t
                },
                n = c.getSlides({
                    getDeviceByKey: () => e
                }, r, e.key),
                {
                    footer: s,
                    slidesWithoutFooter: u
                } = o(n);
            return a.getDuiStructure(u, s)
        },
        getScenarioSlides: function(e) {
            AllFunctions(0)("Function 92").verbose("getScenarioSlides");

            AllFunctions(0)("Function 92").verbose("getScenarioSlides");
            const t = n(e);
            AllFunctions(0)("Function 92").verbose("getScenarioSlides",t);
            return c.getSlideDescriptions(e, t, e.mainDeviceKey).map(t => Object.assign({}, t, e.slides[t.id]))
        }
    }
}, function(e, t, r) {// Function 93 API: getKeymappingForDevice, loadDefinitions
    "use strict";
    AllFunctions(0)("Function 93").verbose("");
    const n = r(231),
        o = r(232);
    e.exports = {
        getKeymappingForDevice: function(e) {
            if (!e.key) throw new Error("device is missing key attribute");
            const t = n.getKeymappingDefinitionNamesForDevice(e);
            return {
                mappings: o.getMergedKeylayout(t)
            }
        },
        loadDefinitions: function(e, t, r) {
            n.loadLayoutsFrom(t), o.loadMappingsFrom(e, r)
        }
    }
}, function(e) {// Function 94 exports = require("lodash/flattenDeep")
    e.exports = require("lodash/flattenDeep")
}, function(e) {// Function 95 exports = require("lodash/intersection")
    e.exports = require("lodash/intersection")
}, function(e, t, r) {// Function 96 class extenskons for switch
    "use strict";
    const n = r(50),
        o = r(23),
        i = r(8);
    class s extends n {
        constructor(e) {
            super(e.device, i.COMPONENT_SWITCH_TYPE_NAME, e.key), this.name = e.name || "", this.label = e.label || this.name, this.command = e.command, this.sensor = e.sensor || null
        }
        static build(e, t) {
            if (!e || !e.command) throw new Error("Switch parameter object invalid!");
            if (!t || "function" != typeof t.getRoomName || "function" != typeof t.getName) throw new Error("Switch parameter device invalid!");
            const r = {
                name: e.name,
                label: e.label,
                command: o.build(e.command, t),
                key: e.key,
                device: t
            };
            return e.sensor && (r.sensor = t.getSensorByKey(e.sensor.key)), new s(r)
        }
        getCommand() {
            return this.command
        }
        hasSensor() {
            return null !== this.sensor
        }
        getName() {
            return this.name
        }
        toJSON() {
            return {
                name: this.name,
                label: this.label,
                key: this.key,
                componentType: this.componentType,
                command: this.command,
                sensor: this.sensor,
                deviceName: this.device.getName(),
                deviceKey: this.device.key,
                roomName: this.device.roomName,
                roomKey: this.device.roomKey
            }
        }
    }
    e.exports = s
}, function(e, t, r) {// Function 97 class extenskons for Procedure
    "use strict";
    const n = r(8),
        o = r(50),
        i = r(267);
    class s extends o {
        constructor(e) {
            super(e.device, n.COMPONENT_PROCEDURE_TYPE_NAME, e.key), this.name = e.name, this.label = e.label || this.name, this.path = e.path, this.adapterName = e.adapterName, this.adapterDeviceId = e.device.getAdapterDeviceId(), i.validateParamDefinition(e.params), this.params = e.params || {}
        }
        static get ADAPTER_DEVICE() {
            return "device"
        }
        static get ADAPTER_DIRECTORY() {
            return "directory"
        }
        static build(e, t) {
            if (!e) throw new Error("Procedure parameter object invalid!");
            if (!t || "function" != typeof t.getAdapterDeviceId || "function" != typeof t.getName || "function" != typeof t.getRoomName) throw new Error("Procedure parameter device invalid!");
            return new s({
                key: e.key,
                name: e.name,
                label: e.label,
                path: e.path,
                adapterName: e.adapterName,
                params: e.params,
                device: t
            })
        }
        getName() {
            return this.name
        }
        getAdapterName() {
            return this.adapterName
        }
        getAdapterDeviceId() {
            return this.adapterDeviceId || ""
        }
        getPath() {
            return this.path
        }
        getParams() {
            return this.params
        }
        validateParamData(e) {
            i.validateParamData(this.params, e)
        }
        toJSON() {
            return {
                key: this.key,
                name: this.name,
                label: this.label,
                componentType: this.componentType,
                path: this.path,
                params: this.params,
                deviceName: this.device.getName(),
                deviceKey: this.device.key,
                roomName: this.device.roomName,
                roomKey: this.device.roomKey
            }
        }
    }
    e.exports = s
}, function(e, t, r) {// Function 98 device directory
    "use strict";
    AllFunctions(0)("Function 98").verbose("");
    const n = r(11),
        o = r(22),
        i = r(20).directoryAdapter,
        s = e.exports = function(e) {
            this.device = e.device, this.name = e.name, this.label = e.label || this.name, this.path = e.path, this.directoryId = e.directoryId, this.thumbnail = e.thumbnail, this.role = e.role, this.identifier = e.identifier, this.directoryType = e.directoryType, this.adapterName = e.adapterName, this.componentType = "directory", e.device && (this.adapterDeviceId = e.device.getAdapterDeviceId()), o.call(this, e.key)
        };
    s.ADAPTER_DEVICE = "device", s.ADAPTER_DIRECTORY = "directory", n.inherits(s, o), s.build = function(e, t) {
        return new s({
            key: e.key,
            name: e.name,
            label: e.label,
            path: e.path,
            directoryId: e.directoryId,
            thumbnail: e.thumbnail,
            adapterName: e.adapterName,
            componentType: e.componentType,
            directoryType: e.directoryType,
            identifier: e.identifier,
            role: e.role,
            device: t
        })
    }, s.prototype.toSafeJSON = function() {
        return {
            key: this.key,
            name: this.name,
            label: this.label,
            path: this.path,
            directoryId: this.directoryId,
            thumbnail: this.thumbnail,
            adapterName: this.adapterName,
            componentType: this.componentType,
            directoryType: this.directoryType,
            identifier: this.identifier,
            role: this.role
        }
    }, s.prototype.toJSON = function() {
        const e = this.toSafeJSON();
        return Object.assign(e, {
            deviceName: this.device.getName(),
            deviceKey: this.device.key,
            roomName: this.device.roomName,
            roomKey: this.device.roomKey
        })
    }, s.getNEEOServicesInfoItem = function() {
        return {
            title: "Other Services",
            label: null,
            thumbnailUri: null,
            isActionNode: !1,
            isQueueable: !1,
            isInfoItem: !0,
            itemInfo: "Tip: For fast access to all your music add it to your favorites in the SONOS app. This works independently of the music service you use.",
            data: {
                directoryKey: null,
                directoryId: null,
                browseUri: null,
                actionUri: null
            }
        }
    }, s.prototype.getName = function() {
        return this.name
    }, s.prototype.getLabel = function() {
        return this.label
    }, s.prototype.getAdapterName = function() {
        return this.adapterName
    }, s.prototype.getAdapterDeviceId = function() {
        return this.adapterDeviceId
    }, s.prototype.getPath = function() {
        return this.path
    }, s.prototype.getDirectoryType = function() {
        return this.directoryType
    }, s.prototype.getDirectoryItem = function() {
        return {
            isElement: !0,
            title: this.label || this.name,
            label: null,
            thumbnailUri: this.thumbnail,
            isActionNode: !1,
            isQueueable: !1,
            data: {
                directoryKey: this.key,
                directoryId: this.directoryId,
                browseUri: "",
                actionUri: null
            }
        }
    }, s.prototype.getInfoItem = function() {
        const e = this.label || this.name;
        return {
            title: e,
            label: null,
            thumbnailUri: this.thumbnail,
            isActionNode: !1,
            isQueueable: !1,
            isInfoItem: !0,
            itemInfo: `You don't have an account configured yet for ${e}. Do you want to add a ${e} account now?`,
            itemInfoType: "confirm",
            iuiEndpoint: "accounts",
            data: {
                directoryKey: this.key,
                directoryId: this.directoryId,
                browseUri: null,
                actionUri: null
            }
        }
    }, s.prototype.isEnabled = function() {
        return i.isEnabled(this.directoryId).then(e => !0 === e.success)
    }
}, function(e, t, r) {// Function 99 exports = new r(289)r(57)
    "use strict";
    AllFunctions(0)("Function 99").verbose("");
    const n = r(57),
        o = r(289);
    e.exports = new o(n)
}, function(e) {// Function 100 some generic IR-definitions
    "use strict";
    AllFunctions(0)("Function 100").verbose("");
    e.exports.IR_PAYLOAD_TYPE_NOP = 0, e.exports.IR_PAYLOAD_TYPE_SIMPLE = 1, e.exports.IR_PAYLOAD_TYPE_OFFSET = 2, e.exports.IR_PAYLOAD_TYPE_TOGGLE = 3, e.exports.MAX_IRREPEAT = 31, e.exports.IR_MAX_FREQ = 5e5, e.exports.IR_MIN_FREQ = 2e4, e.exports.MAX_SEQUENCE_ENTRIES = 500, e.exports.MAX_DURATION_MS = 8e3
}, function(e, t, r) {// Function 101 functions for implemene=ting forward host
    "use strict";
    AllFunctions(0)("Function 101").verbose("");
    const n = new(r(315)),
        o = r(42);
    e.exports.clear = function() {
        return o.clearForwardactionSettings().then(() => {
            n.clearRemoteHost()
        })
    }, e.exports.setRemotehost = function(e) {
        return o.saveForwardactionSettings({
            forwarding: e
        }).then(() => n.setRemotehost(e.host, e.port, e.path))
    }, e.exports.load = function() {
        return o.loadForwardactionSettings()
    }, e.exports.initialise = function() {
        return o.loadForwardactionSettings().then(e => {
            if (e && e.forwarding) return n.setRemotehost(e.forwarding.host, e.forwarding.port, e.forwarding.path)
        }).catch(() => {})
    }, e.exports.relayActionJob = function(e) {
        return n.relayActionJob(e)
    }
}, function(e, t, r) {// Function 102 getters for conditions and actions
    "use strict";
    AllFunctions(0)("Function 102").verbose("");
    const n = r(16),
        o = r(9),
        i = r(147),
        s = function(e) {
            if (this.name = e.name, n.isUndefined(e.condition) || !i.validateCondition(e.condition)) throw new Error(o(null, "validation", "condition").message);
            if (this.condition = e.condition, n.isUndefined(e.action) || !i.validateAction(e.action)) throw new Error(o(null, "validation", "action").message);
            this.optionalConditions = e.optionalConditions || [], this.action = e.action
        };
    e.exports = s, s.CONDITION_INTERVAL = "interval", s.CONDITION_TIME = "time", s.CONDITION_SENSOR = "sensor", s.prototype.getName = function() {
        return this.name
    }, s.prototype.getCondition = function() {
        return this.condition
    }, s.prototype.getOptionalConditions = function() {
        return this.optionalConditions
    }, s.prototype.getConditionType = function() {
        return this.condition.type
    }, s.prototype.getAction = function() {
        return this.action
    }, s.prototype.getActionType = function() {
        return this.action.type
    }
}, function(e, t, r) {// Function 103 exports r(331)
    "use strict";
    AllFunctions(0)("Function 103").verbose("");
    const n = r(331);
    e.exports = n
}, function(e, t, r) {// Function 104 ResourceprefetcherFacade: startNotificationListener "project change notify" fetch tr2 xml files
    "use strict";
    AllFunctions(0)("Function 104").verbose("");
    const n = r(17),
        o = r(2),
        i = r(371),
        s = r(373),
        a = r(10),
        c = r(25),
        u = r(27),
        d = r(0)("ResourceprefetcherFacade"),
        l = r(32),
        p = new i(o.resourceprefetcher);
    e.exports = p, e.exports.startNotificationListener = function() {
        d.debug("startNotificationListener", c.NOTIFICATION_PROJECT_CHANGED), a.on(c.NOTIFICATION_PROJECT_CHANGED, () => {
            d.debug("project changed notification"), p._precacheFavoritesImages(u.get()), s.registerSonosEvents(u.get(), p)
        })
    }, e.exports.fetchTr2XmlFiles = function() {
        d.debug("fetch tr2 xml files");
        const e = o.address + "/projects/home/tr2";
        return Promise.all([n(e + "/gui_xml"), n(e + "/guidata_xml")]).catch(e => {
            const t = l.extractInfo(e);
            d.warn("TR2_XML_FETCH_FAILED", t.message)
        })
    }
}, function(e, t, r) {// Function 105 shortenUrls
    "use strict";
    AllFunctions(0)("Function 105").verbose("");
    const n = r(2),
        o = new(r(384))(n.urlshortener);
    e.exports = o;
    const i = r(385);
    e.exports.shortenUrls = function(e) {
        return i.shortenUrls(o, e)
    }
}, function(e, t, r) {// Function 106 tr2-keyboardMappings
    "use strict";
    AllFunctions(0)("Function 106").verbose("");

    function n(e) {
        let t = "";
        return "string" == typeof e ? e : (t = e.repeat ? `{{#triggerActionRepeat}}${e.command}{{/triggerActionRepeat}}` : `{{#triggerAction}}${e.command}{{/triggerAction}}`, e.additionalCommands && 0 < e.additionalCommands.length && (t = e.additionalCommands.reduce((e, t) => (e += `;${t}`, e), t)), t)
    }
    const o = r(0)("tr2-keyboardMappings"),
        i = r(4);
    t.getTemplate = function(e) {
        if (e && e.mappings && e.mappings.length) {
            const t = e.mappings.map(e => (function(e) {
                if (!e || !e.key) return "";
                let t = "";
                e.onPress && (t += ` onPress="${n(e.onPress)}"`);
                e.onRelease && (t += ` onRelease="${n(e.onRelease)}"`);
                e.onLongPress && (t += ` onLongPress="${n(e.onLongPress)}"`);
                e.onLongPressRepeat && (t += ` onLongPressRepeat="${n(e.onLongPressRepeat)}"`);
                return `<key id="${e.key}"` + t + " />"
            })(e)).join("\n");
            return t ? i.compileRawTemplate(t) : void o.debug("Empty keyboard mapping for device: ", e.deviceKey)
        }
    }
}, function(e, t, r) {// Function 107 tr2-DynamicSlideFactory"
    "use strict";
    AllFunctions(0)("Function 107").verbose("");
    const n = r(0)("tr2-DynamicSlideFactory"),
        o = r(412),
        i = r(7),
        s = i.screen.height - i.header.height - i.topGrayStatusBar - i.bottomSliderDots,
        a = i.screen.width,
        c = function() {
            this.screenStack = [], this._startNewScreen(0, 0)
        };
    c.prototype.addWidget = function(e, t, r = a, o = {}) {
        if (!e) throw new Error("DynamicSlideFactory: missing widgetTemplate");
        if (!t) throw new Error("DynamicSlideFactory: missing height");
        t > s && n.warn("Widget exceeding content height:", t);
        const i = {
            template: e,
            width: r,
            height: t,
            viewdata: o
        };
        let c = 0,
            u = this.currentHeight;
        const d = this._widgetFitsHorizontally(r) && this._widgetFitsVertically(t),
            l = this._widgetFitsVertically(t + this.currentRowHeight);
        d ? (c = this.currentWidth, this.currentRowHeight = Math.max(this.currentRowHeight, t), this.currentWidth += r) : l ? (u += this.currentRowHeight, this._startNewRow(r, t)) : (u = 0, this._startNewScreen(r, t)), i.startX = c, i.startY = u, this.widgetStack.push(i)
    }, c.prototype.addWidgets = function(e) {
        if (!e) throw new Error("missing widgetArray");
        e.forEach(e => {
            this.addWidget(e.template, e.height, e.width, e.viewdata)
        })
    }, c.prototype.build = function() {
        return 1 < this.screenStack.length && 0 === this.widgetStack.length && this.screenStack.pop(), this.screenStack.map(e => new o(e))
    }, c.prototype.renderScreens = function(e) {
        return this.build().map(t => ({
            template: t.render(e)
        }))
    }, c.prototype.containsWidgets = function() {
        return 0 !== this.widgetStack.length || 1 < this.screenStack.length
    }, c.prototype._widgetFitsHorizontally = function(e) {
        return this.currentWidth + e <= a
    }, c.prototype._widgetFitsVertically = function(e) {
        return this.currentHeight + e <= s
    }, c.prototype._startNewScreen = function(e, t) {
        this.currentRowHeight = 0, this.currentHeight = t, this.currentWidth = e, this.widgetStack = [], this.screenStack.push(this.widgetStack)
    }, c.prototype._startNewRow = function(e, t) {
        this.currentHeight += this.currentRowHeight, this.currentRowHeight = t, this.currentWidth = e
    }, t.buildNewWidgetStack = function(e) {
        return new c(e)
    }, t.renderScreenWith = function(e, t, r = {}) {
        const n = new c;
        return n.addWidget(e, t), n.renderScreens(r)[0]
    }
}, function(e, t, r) {// Function 108  Router: allow external access to project-fields
    "use strict";
    AllFunctions(0)("Function 108").verbose("");
    const n = r(127),
        o = r(5),
        i = r(0)("routes.project"),
        s = r(9),
        a = r(27),
        c = r(20).deviceAdapter,
        u = r(3),
        d = r(55),
        l = o.Router();
    l.param("project_key", function(e, t, r, n) {
        AllFunctions(0)("Function 108").verbose("l.param('project_key')");

        a.get(n).then(t => {
            e.project = t, r()
        }, t => {
            i.error("PROJECT_READ_FAILED", {
                url: e.url,
                method: e.method,
                error: t.message
            }), r(t)
        })
    }), l.get("/", function(e, t, r) {
        AllFunctions(0)("Function 108").verbose(" get / not implemented");
        r(new Error("not implemented"))
    }), l.get("/checkAirkey", function(e, t) {
        AllFunctions(0)("Function 108").verbose("get checkAirKey");
        const r = e.query.airkey;
        a.checkAirkey(r).then(() => {AllFunctions(0)("Function 108").verbose("airkey ok"),
            t.status(200).send("OK")
        }).catch(() => { 
            //t.status(200).send("NOT_THE_BRAIN_YOU_ARE_LOOKING_FOR")
            t.status(200).send("OK")
        })
    }), l.get("/:project_key/gdpr", function(e, t) {
        AllFunctions(0)("Function 108").verbose("get project gdpr");

        const r = e.project.gdprAccepted;
        return t.status(200).json({
            accepted: r
        })
    }), l.post("/:project_key/gdpr", function(e, t) {
        AllFunctions(0)("Function 108").verbose("post gdpr");

        e.project.acceptGDPR().then(() => {
            i.info("GDPR_ACCEPTED"), t.json({
                accepted: !0
            })
        }, r => {
            i.error("GDPR_ACCEPT_FAILED", {
                url: e.url,
                method: e.method,
                error: r.message
            }), t.status(500).json({
                accepted: !1
            })
        })
    }), l.get("/:project_key/configured", function(e, t) {
        AllFunctions(0)("Function 108").verbose("get project_key configured");

        t.json({
            configured: e.project.isConfigured()
        })
    }), l.get("/:project_key/activate", function(e, t) {
        AllFunctions(0)("Function 108").verbose("get project_key activate");

        e.project.activate().then(() => {
            i.debug("PROJECT_ACTIVATED"), t.json({
                success: !0
            })
        }, r => {
            i.error("PROJECT_ACTIVATE_FAILED", {
                url: e.url,
                method: e.method,
                error: r.message
            }), t.status(500).json(s(r, "project_activate"))
        })
    }), l.get("/:project_key/scheduleactivation", function(e, t) {
        AllFunctions(0)("Function 108").verbose("get project_key schedule activateion");

        e.project.scheduleActivation(), t.json({})
    }), l.get("/:project_key/devices", function(e, t) {
        AllFunctions(0)("Function 108").verbose("get project_key devices");

        const r = e.query.capability,
            n = e.query.roomKey;
        let o = e.project;
        return n && (o = e.project.getRoomByKey(n)), r ? t.json(o.getDevicesWithCapability(r)) : t.json(o.getDevices())
    }), l.get("/:project_key/discoverNewDevices/:sourceName/:adapterName/", function(e, t) {
        AllFunctions(0)("Function 108").verbose("get project_key discovernewdevices");
        const r = e.params.sourceName,
            n = e.params.adapterName,
            o = e.project.getDevices();
        c.discoverNewDevices(n, r, o).then(e => {
            t.json(e)
        }).catch(r => {
            i.error("DEVICEADAPTER_DISCOVER_NEW_FAILED", {
                url: e.url,
                method: e.method,
                error: r.message
            }), t.json([])
        })
    }), l.get("/:project_key/discoverUnavailableZWaveDevices/:sourceName/:adapterName/", function(e, t) {
        const r = e.params.sourceName,
            n = e.params.adapterName,
            o = e.project.getDevices();
        c.discoverUnavailableZWaveDevices(n, r, o).then(e => {
            t.json(e)
        }).catch(r => {
            i.error("DEVICEADAPTER_DISCOVER_UNAVAILABLE_FAILED", {
                url: e.url,
                method: e.method,
                error: r.message
            }), t.json([])
        })
    }), l.get("/:project_key/getZWaveDebugInfo", function(e, t) {
        c.getZWaveDebugInfo().then(e => {
            t.json(e)
        }).catch(r => {
            i.error("DEVICEADAPTER_GET_ZWAVE_DEBUG_FAILED", {
                url: e.url,
                method: e.method,
                error: r.message
            }), t.json({})
        })
    }), l.get("/:project_key/directories", function(e, t) {
        t.json(e.project.getDirectories())
    }), l.get("/:project_key/sensors", function(e, t) {
        AllFunctions(0)("Function 108").verbose("get project_key getsensors");

        t.json(e.project.getSensors(e => d.RECIPE_SUPPORTED_TYPES.includes(e.type)))
    }), l.get("/:project_key/sensorvalue/:eventKey", function(e, t) {
        AllFunctions(0)("Function 108").verbose("get project_key getsensor value");
        const r = e.params.eventKey,
            n = e.project.getSensors(e => e.eventKey === r)[0];
        n || t.status(500).json(s(r, "sensor_eventkey"));
        const o = n.device && n.device.details && "zwave" === n.device.details.adapterName;
        n.getValue().then(e => {
            AllFunctions(0)("Function 108").verbose("get project_key getsensor value ",e);

            t.json({
                value: e
            })
        }).catch(e => {
            o ? u.increaseCounter(`ZWAVE-ERROR-${e.message}`) : i.error("PROJECT_GET_SENSORVALUE_FAILED", e.message), t.status(500).json(s(e, "sensor"))
        })
    }), l.get("/:project_key/recipes/:type?", function(e, t) {
        const r = e.params.type;
        let n = [];
        n = r ? e.project.getRecipes(e => e.getType() === r) : e.project.getRecipes(), t.json(n)
    }), l.get("/:project_key/activescenariokeys", function(e, t) {
        t.json(e.project.getActiveScenarioKeys())
    }), l.get("/:project_key/lastchange", function(e, t) {
        t.json(e.project.getLastChangeTs())
    }), l.get("/:project_key", function(e, t) {
        t.json(e.project)
    }), l.post("/:project_key/getdeviceicon", function(e, t) {
        const r = e.body.scenariokeys;
        r ? t.json(e.project.scenarioKeyToMaindeviceIcon(r.split(","))) : t.json({})
    }), l.put("/:project_key", function(e, t) {
        e.body ? (e.body.label && (e.project.label = e.body.label), e.project.setConfigured(e.body.configured), e.project.save().then(() => {
            t.json(e.project)
        }).catch(r => {
            i.error("PROJECT_SAVE_FAILED", {
                url: e.url,
                method: e.method,
                error: r.message
            }), t.status(500).json(s(r, "project_save"))
        })) : t.json(e.project)
    }), l.get("/:project_key/label", function(e, t) {
        t.json({
            label: e.project.label
        })
    }), l.get("/:project_key/controllerRoomName", function(e, t) {
        const r = n(e.project.getRooms(), e => e.hasController);
        return r ? void t.json({
            controllerRoomName: r.getName()
        }) : t.json({})
    }), e.exports = l
}, function(e, t, r) {// Function 109 addevent, clear and getallevents
    "use strict";
    //AllFunctions(0)("Function 109").verbose("");
    const n = new(r(183))(r(2).log.eventsBufferSize || 64);
    e.exports.addEvent = function(e) {
        n.addEntry(e)
    }, e.exports.clear = function() {
        return n.clear()
    }, e.exports.getAllEvents = function() {
        return n.getAll()
    }
}, function(e) {// Function 110 exports = require("os")
    e.exports = require("os")
}, function(e) {// Function 111 exports = require("validate.js")
    e.exports = require("validate.js")
}, function(e) {// Function 112 exports = require("glob")
    e.exports = require("glob")
}, function(e, t, r) {// Function 113 readAsync from MAC address
    "use strict";
    //AllFunctions(0)("Function 113").verbose("");
    const n = r(208).getMac,
        o = r(0)("SystemInfoMac"),
        i = r(1);
    e.exports.readAsync = function() {
        return new i(e => {
            n((t, r) => {
                t && (o.error("MAC_ADDRESS_READ", t.message), e("de:ad:be:ef:ba:be")), e(r)
            })
        })
    }
}, function(e) {// Function 114 exports = require("zlib")
    e.exports = require("zlib")
}, function(e, t, r) {// Function 115 Session-info
    "use strict";
    //AllFunctions(0)("Function 115").verbose("");

    function n() {
        p = void 0, h = void 0, g = void 0
    }

    function o() {
        return new i.Query(u).first({
            sessionToken: h.token
        }).then(e => {
            return e && e.createdAt && 4 < JSON.stringify(e.createdAt).length
        }).catch(e => (c.error("CLOUD_IS_LOGGED_IN_FAILED", e ? e.message : ""), !1))
    }
    const i = r(54),
        s = r(1),
        a = r(211),
        c = r(0)("SessionObject"),
        u = i.Object.extend("_Session"),
        d = i.Error.INVALID_SESSION_TOKEN,
        l = new a(6e4);
    let p, h, g;
    n(), t.setParseUser = function(e, t) {
        if (!e || !t) throw Error("missing user or password data");
        p = e, g = t, h = {
            group: e.get("group"),
            token: e.getSessionToken(),
            user: e.getUsername(),
            parseuser: e,
            errorHandler: function(e) {
                e && e.code === d && n()
            }
        }
    }, t.clear = n, t.getSessionObject = function() {
        return p && h ? h : void 0
    }, t.getUsername = function() {
        return h ? h.user : void 0
    }, t.getPassword = function() {
        return g
    }, t.getSecret = function() {
        return p ? p.get("secret") : void 0
    }, t.isLoggedIn = function() {
        return p && h ? l.getValue(o) : s.resolve(!1)
    }
}, function(e, t, r) {// Function 116 validateBrowseResult 
    "use strict";
    //AllFunctions(0)("Function 116").verbose("");
    const n = r(2),
        o = r(14),
        i = n.tr2.listPageSize;
    t.validateBrowseResult = function(e) {
        return e && e._meta && Number.isFinite(e._meta.totalMatchingItems) ? void["current", "previous", "next"].forEach(t => {
            e._meta[t] && o.lessThanOrEqualTo(e._meta[t].limit, i)
        }) : (o(e, {
            _meta: {
                presence: !0
            },
            total: {
                presence: !0
            }
        }), o(e._meta, {
            current: {
                presence: !0
            }
        }), ["current", "previous", "next"].forEach(t => {
            e._meta[t] && (o.isString(e._meta[t].browseUri), o.isInteger(e._meta[t].offset), o.isInteger(e._meta[t].limit))
        }), o.isInteger(e.total), o.isArray(e.items), void e.items.forEach(e => e.isHeader ? void o(e, {
            label: {
                presence: !0
            }
        }) : (o(e, {
            isActionNode: {
                presence: !0
            },
            isQueueable: {
                presence: !0
            },
            data: {
                presence: !0
            }
        }), e.title && o.isString(e.title), e.label && o.isString(e.label), e.thumbnailUri && o.isString(e.thumbnailUri), e.data.browseUri && o.isString(e.data.browseUri), e.data.actionUri && o.isString(e.data.actionUri), void(e.data.metaData && o.isString(e.data.metaData)))))
    }
}, function(e) {// Function 117 exports = require("lodash/isObject")
    e.exports = require("lodash/isObject")
}, function(e, t, r) {// Function 118 getSpotifyInfoForSonosProcedureIfNecessary
    "use strict";
    //AllFunctions(0)("Function 118").verbose("");

    function n() {
        return u ? u.getUserData("spotify").then(e => (d = e.username, d)).catch(() => {
            i("DIRECTORYADAPTER_GETUSERDATA_FAILED")
        }) : (a.increaseCounter("spotify-username-get-no-directory-adapter"), s.resolve())
    }

    function o() {
        d = void 0, n()
    }
    const i = r(6)("cp6:lib:adapter:spotifyUsernameService"),
        s = r(1),
        a = r(3),
        c = ["SEEK_QUEUE_PROCEDURE", "ADD_TO_QUEUE_PROCEDURE", "PLAYNOW", "PLAYSHUFFLE", "SEEK"];
    let u, d;
    e.exports = {
        initialize: function(e) {
            u = e, o()
        },
        getSpotifyInfoForSonosProcedureIfNecessary: function(e) {
            return c.includes(e) ? d ? s.resolve(d) : n() : s.resolve()
        },
        forceUpdate: o
    }
}, function(e, t, r) {// Function 119 API Adapter Store"
    "use strict";
    //AllFunctions(0)("Function 119").verbose("");
    const n = r(69),
        o = r(0)("API Adapter Store"),
        i = r(3),
        s = r(2),
        a = r(18),
        c = s.deviceadapter.maximalSdkAdapterCount;
    e.exports = new class extends n {
        constructor() {
            super(), this.sdkAdapters = new Map
        }
        _adapterNameContainsInvalidName(e) {
            const t = e.name.toLowerCase();
            if (a.ILLEGAL_SDK_ADAPTERNAMES.includes(t)) return i.increaseCounter("sdkadapter-invalid-name"), !0;
            const r = this.sdkAdapters.get(e.name);
            return r && r.protected && r.baseUrl !== e.baseUrl ? (i.increaseCounter("sdkadapter-invalid-overwrite"), !0) : void 0
        }
        register(e) {
            o.debug("Request to register SDK_ADAPTER", e )
            if (!e || !e.name || !e.baseUrl) return i.increaseCounter("sdkadapter-register-invalid-empty"), !1;
            if (this.sdkAdapters.size >= c) return o.debug("MAXIMAL_SDK_ADAPTER_COUNT_EXCEEDED", {
                count: this.sdkAdapters.size
            }), i.increaseCounter("sdkadapter-register-max-count-exceeded"), i.setValue("sdkadapter-register-max-count-exceeded-size", this.sdkAdapters.size), o.event(`Max SDK drivers reached (${c-1})`), this.emit("SDK_ADAPTER_CLEAN_REQUESTED"), !1;
            if (this._adapterNameContainsInvalidName(e)) return !1;
            o.debug("REGISTERED_SDK_ADAPTER_COUNT", {
                count: this.sdkAdapters.size
            }), i.increaseCounter("sdkadapter-added");
            const t = {
                name: e.name,
                baseUrl: e.baseUrl
            };
            if (CloudReplacementUrl  =='' &&  e.baseUrl.substring(0,16) != "http://127.0.0.1" )
                {var urlComponents = e.baseUrl.split(':')
                CloudReplacement = urlComponents[0]+":"+urlComponents[1];
                CloudReplacementUrl = CloudReplacement+":6468/download"
                AllFunctions(0)("Function 119").always("We've assigned ",urlComponents[0]+":"+urlComponents[1],"as the source to replace NEEO cloud")
                }

            return !0 === e.protected && (t.protected = !0), this.sdkAdapters.set(e.name, t), !0
        }
        registerAll(e) {
            return !!Array.isArray(e) && void e.forEach(e => {
                this.register(e)
            })
        }
        unregister(e) {
            return e && e.name ? !!this.sdkAdapters.has(e.name) && (i.increaseCounter("sdkadapter-removed"), this.sdkAdapters.delete(e.name)) : (i.increaseCounter("sdkadapter-unregister-invalid-empty"), !1)
        }
        knowsAdapterName(e) {
            return this.sdkAdapters.has(e)
        }
        getBaseUrl(e) {
            if (!this.knowsAdapterName(e)) return void i.increaseCounter("sdkadapter-getBaseUrl-failed-" + e);
            return this.sdkAdapters.get(e).baseUrl
        }
        getRegisteredAdapters() {
            return Array.from(this.sdkAdapters.values())
        }
        findUnreferencedAdapters(e) {
            return Array.isArray(e) ? this.getRegisteredAdapters().filter(t => !e.includes(t.name)) : (o.debug("invalid input ignored"), [])
        }
    }
}, function(e, t, r) {// Function 120 constant containing ALLOWED_ICON_NAMES
    "use strict";
    //AllFunctions(0)("Function 120").verbose("");
    const n = r(19);
    t.ALLOWED_ICON_NAMES = [...n.TYPES.map(e => e.toLowerCase()), "appletv", "sonos", "neeo-brain"]
}, function(e) {// Function 121 exports = require("tokensearch.js")
    e.exports = require("tokensearch.js")
}, function(e, t, r) {// Function 122 DeviceSpecsSource
    "use strict";
    //AllFunctions(0)("Function 122").verbose("");
    const n = r(1),
        o = r(89),
        i = r(0)("DeviceSpecsSource"),
        s = e.exports = function(e) {
            i.debug("init:", e), this.id = e.id, this.name = e.name, this.type = e.type
        };
    s.parseId = function(e) {
        AllFunctions(0)("Function 122").verbose("parseId");
        return {
            sourceIdx: parseInt(e[0], 10),
            specId: e.slice(1)
        }
    }, s.prototype.getName = function() {
        //AllFunctions(0)("Function 122").verbose("getName");
        return this.name
    }, s.prototype._generateId = function(e) {
        AllFunctions(0)("Function 122").verbose("generateId");
        return this.id + e
    }, s.prototype.search = function(e) {
        AllFunctions(0)("Function 122").verbose("search");
        return this._search(e).then(e => (e = e || [], e.map(e => new o({
            sourceData: e.item,
            sourceName: this.getName(),
            score: {
                score: e.score,
                maxScore: e.maxScore
            }
        }))))
    }, s.prototype.getFullSpec = function(e, t) {
        AllFunctions(0)("Function 122").verbose("getFullSpec e",e);
        AllFunctions(0)("Function 122").verbose("getFullSpec t",t);
        return e && "undefined" !== e ? 
        (AllFunctions(0)("Function 122").verbose("getFullSpec calling  _getFullSpec(e)"),
            this._getFullSpec(e).then(t => {
                if (!t) throw new Error("full spec not found: " + e);
                return this.createNewDeviceSpec(t)
            })) 
            : n.resolve(this.createNewDeviceSpec({}, t))
    }, s.prototype.createNewDeviceSpec = function(e, t) {
        AllFunctions(0)("Function 122").verbose("createNewDeviceSpec");
        return new o({
            sourceData: e,
            sourceName: this.getName(),
            fallbackAdapterName: t
        })
    }, s.prototype.getSpec = function(e) {
        AllFunctions(0)("Function 122").verbose("getSpec");
        return this._getSpec(e).then(t => {
            if (!t) throw new Error("spec not found: " + e);
            return new o({
                sourceData: t,
                sourceName: this.getName()
            })
        })
    }, s.prototype.getCapabilities = function(e, t) {
        return this._getCapabilities(e, t).then(r => {
            if (t && !r) throw new Error("Capabilities not found: " + e + ", id: " + t);
            return r
        })
    }, s.prototype._search = function() {
        throw new Error("to be implemented")
    }, s.prototype._getFullSpec = function() {
        AllFunctions(0)("Function 122").verbose("_getFullSpec");
        throw new Error("to be implemented")
    }, s.prototype._getSpec = function() {
        AllFunctions(0)("Function 122").verbose("_getSpec");
        throw new Error("to be implemented")
    }, s.prototype._getCapabilities = function() {
        throw new Error("to be implemented")
    }
}, function(e) {// Function 123 exports = require("request")
    e.exports = require("request")
}, function(e) {// Function 124 exports = require("lodash/forEach")
    e.exports = require("lodash/forEach")
}, function(e) {// Function 125 exports = require("lodash/includes")
    e.exports = require("lodash/includes")
}, function(e) {// Function 126 exports = require("lodash/flatten")
    e.exports = require("lodash/flatten")
}, function(e) {// Function 127 exports = require("lodash/find")
    e.exports = require("lodash/find")
}, function(e) {// Function 128 functions increaseCounter and  setStatisticsModule
    "use strict";
    AllFunctions(0)("Function 128").verbose("")
    let t;
    e.exports = {
        increaseCounter: function(e) {
            if (t) return t.increaseCounter(e)
        },
        setStatisticsModule: function(e) {
            t = e
        }
    }
}, function(e) {// Function 129 addDataToWidget, match and getAdditionalInfo
    "use strict";
    AllFunctions(0)("Function 129").verbose("");

    function t(e, t, s) {
        const a = r(s),
            c = n(s, t),
            u = o(s),
            d = "TV" === e.getDeviceByKey(t.mainDeviceKey).getType(),
            l = {};
        return l.deviceName = s.name, a && (l.powerToggle = i(a)), c && (l.inputSwitch = i(c)), d && u && (l.inputSwitch = i(u)), l
    }

    function r(e) {
        return e.getMacroByName(s, u)
    }

    function n(e, t) {
        const r = t.getDeviceInputMacro(e);
        return r || e.getMacroByName(a, u)
    }

    function o(e) {
        return e.getMacroByName(c, u)
    }

    function i(e) {
        return {
            label: e.label,
            name: e.name,
            key: e.key,
            roomKey: e.device.roomKey,
            deviceName: e.device.name,
            deviceKey: e.device.key
        }
    }
    const s = "POWER TOGGLE",
        a = "INPUT SCROLL",
        c = "INPUT TUNER 1",
        u = !0,
        d = ["neeo.compatibility.nonautomatable-device", "neeo.compatibility.nonautomatable-device-input"];
    e.exports = {
        addDataToWidget: function(e, r, n) {
            const o = e.data.widget,
                i = r.getDeviceByKey(o.deviceKey),
                s = t(r, n, i);
            return o.deviceName = s.deviceName, o.powerToggle = s.powerToggle, o.inputSwitch = s.inputSwitch, e
        },
        match: function(e) {
            return d.includes(e)
        },
        getAdditionalInfo: t
    }
}, function(e) {// Function 130 exports = require("lodash/flatMap")
    e.exports = require("lodash/flatMap")
}, function(e, t, r) {// Function 131 verify sourcename = SOURCE_DUIRO
    "use strict";
    //AllFunctions(0)("Function 131").verbose("");

    function n(e, t) {
        function r(e, r) {
            const o = r && !c;
            return o && n[e.getName()] ? void u.debug("GENERIC_MACRO_SKIPPED", {
                macroname: e.getName(),
                device: t.getName()
            }) : void(n[e.getName()] = {
                macro: e,
                isGeneric: o
            })
        }
        const n = {},
            s = e.commandSets || [],
            c = e && e.isGeneric;
        return s.forEach(e => o(e, t, r)),
            function(e) {
                const t = e[g.MACRO_MUTE_TOGGLE],
                    r = e[g.MACRO_MUTE_ON],
                    n = e[g.MACRO_MUTE_OFF];
                return (!t || t.isGeneric) && r && n
            }(n) && r(new l({
                device: t,
                name: g.MACRO_MUTE_TOGGLE,
                command: n[g.MACRO_MUTE_ON].macro.getCommand(),
                commandAlt: n[g.MACRO_MUTE_OFF].macro.getCommand()
            }), !1), i(n, t) && (r(new l({
                device: t,
                name: g.MACRO_POWER_TOGGLE_ON,
                command: n[g.MACRO_POWER_TOGGLE].macro.getCommand()
            }), !1), r(new l({
                device: t,
                name: g.MACRO_POWER_TOGGLE_OFF,
                command: n[g.MACRO_POWER_TOGGLE].macro.getCommand()
            }), !1)), a(n)
    }

    function o(e, t, r) {
        const n = e.medium.toLowerCase(),
            o = e.isGeneric,
            i = {},
            a = [];
        e.commands.forEach(c => {
            if (p.hasValidPayloads(c)) {
                const e = new d({
                    name: c.name,
                    medium: n,
                    payload: [{
                        name: c.name,
                        payloads: c.payloads
                    }]
                });
                i[c.name] = e, r(new l({
                    name: c.name,
                    device: t,
                    command: e
                }), o)
            } else c.makro ? a.push(c) : "NOP" === s(c, "payloads[0]") ? u.debug("NOP_COMMAND_SKIPPED", {
                commandset: e.name,
                name: c.name,
                payload: c.payloads
            }) : u.warn("INVALID_COMMAND_SKIPPED", {
                commandset: e.name,
                name: c.name,
                payload: c.payloads
            })
        }), c(a, s => {
            const a = [];
            s.makro.forEach(t => {
                for (let r = 0; r < t.repeat; r++) {
                    const r = i[t.command];
                    r ? (a.push(r.getPayload()[0]), a.push({
                        milliseconds: parseInt(t.delay, 10)
                    })) : u.warn("INVALID_MAKRO_SKIPPED", {
                        commandset: e.name,
                        name: t.command
                    })
                }
            });
            const c = new d({
                name: s.name,
                medium: n,
                payload: a
            });
            r(new l({
                name: s.name,
                device: t,
                command: c
            }), o)
        })
    }

    function i(e, t) {
        const r = e[g.MACRO_POWER_TOGGLE],
            n = function(e, t) {
                const r = e[g.MACRO_POWER_ON],
                    n = e[g.MACRO_POWER_OFF],
                    o = h.check(h.NEEO_COMPATIBILITY_ALWAYS_ON, t);
                return (!r || !n) && !o && f.STUPID_DEVICE_TYPES.includes(t.details.type)
            }(e, t);
        return r && n
    }
    const s = r(47),
        a = r(29),
        c = r(124),
        u = r(0)("Macro"),
        d = r(23),
        l = r(49),
        p = r(263),
        h = r(21),
        g = r(33),
        m = r(18),
        f = r(30);
    e.exports = {
        parse: function(e, t) {
            const r = e.getSourceName();
            switch (r) {
                case m.SOURCE_DUIRO:
                    return n(e.getData(), t);
                default:
                    throw new Error("invalid device source: " + r)
            }
        },
        parseDuiroSource: n
    }
}, function(e) {// Function 132 getConnections, getPresetSettings, getHDMIVersion, getCommandSetInfos
    "use strict";
    AllFunctions(0)("Function 132").verbose("")

    function t(e) {
        return e.map(e => e.type.replace(r, ""))
    }
    const r = /\s?\([^)]+\)/,
        n = {
            input: [],
            output: []
        },
        o = {
            input: "inputs",
            output: "outputs"
        },
        i = ["input", "output"];
    e.exports = {
        getConnections: function(e) {AllFunctions(0)("Function 132").verbose("getconnections");
            const r = Object.assign({}, n, e.connections);
            return i.reduce((e, n) => (e[o[n]] = t(r[n]), e), {})
        },
        getPresetSettings: function(e) {AllFunctions(0)("Function 132").verbose("getPresetSettingd");
            const t = e.type.toLowerCase(),
                r = e[t];
            return r ? r.presetSettings : void 0
        },
        getHDMIVersion: function(e) {AllFunctions(0)("Function 132").verbose("getHDMI Version");
            const t = e.type.toLowerCase(),
                r = e[t];
            return r ? r.hdmiVersion : void 0
        },
        getCommandSetInfos: function(e) {AllFunctions(0)("Function 132").verbose("getCommnandSetInfo");
            return (e.commandSets || []).map(e => {
                return {
                    name: e.name,
                    medium: e.medium.toLowerCase(),
                    isGeneric: e.isGeneric,
                    version: e.version
                }
            })
        }
    }
}, function(e, t, r) {// Function 133 ComponentFactory: parser for various component-types
    "use strict";
    //AllFunctions(0)("Function 133").verbose("");

    function n(e) {
        return {
            name: decodeURIComponent(e.name),
            label: e.label ? decodeURIComponent(e.label) : void 0
        }
    }

    function o(e) {
        try {
            return decodeURIComponent(e)
        } catch (t) {
            return e
        }
    }
    const i = r(0)("ComponentFactory"),
        s = r(8),
        a = r(96),
        c = r(61),
        u = r(134),
        d = r(135),
        l = r(62),
        p = r(97),
        h = r(98),
        g = r(23),
        m = r(49);
    e.exports = {
        parseDeviceComponent: function(e, t) {
            const r = e.type || s.COMPONENT_MACRO_TYPE_NAME;
            r === s.COMPONENT_MACRO_TYPE_NAME ? t.macros.put(function(e, t) {
                if (!e.name) throw i.error("INVALID_MACRO_COMPONENT", {
                    component: e
                }), new Error("INVALID_MACRO_COMPONENT");
                const r = n(e),
                    o = new g({
                        name: r.name,
                        payload: {
                            path: e.path
                        }
                    });
                return new m({
                    device: t,
                    name: r.name,
                    label: r.label,
                    command: o
                })
            }(e, t)) : r === s.COMPONENT_SLIDER_TYPE_NAME ? t.sliders.put(function(e, t) {
                const r = n(e);
                i.debug("parse slider component", {
                    name: r.name,
                    device: t.getName()
                });
                const s = e.slider,
                    a = t.getSensorByName(s.sensor),
                    u = new g({
                        name: r.name,
                        payload: {
                            path: e.path,
                            method: "GET"
                        }
                    });
                return new c({
                    device: t,
                    name: r.name,
                    label: r.label,
                    type: s.type,
                    range: s.range,
                    unit: o(s.unit),
                    sensor: a,
                    value: u,
                    onoff: s.switch ? t.getSwitchByName(s.switch) : void 0
                })
            }(e, t)) : r === s.COMPONENT_SWITCH_TYPE_NAME ? t.switches.put(function(e, t) {
                const r = n(e);
                i.debug("parse switch component", {
                    name: r.name,
                    device: t.getName()
                });
                const o = t.getSensorByName(e.sensor),
                    s = new g({
                        name: "On/Off",
                        payload: {
                            path: e.path,
                            method: "GET"
                        }
                    });
                return new a({
                    device: t,
                    name: r.name,
                    label: r.label,
                    sensor: o,
                    command: s
                })
            }(e, t)) : r === s.COMPONENT_TEXTLABEL_TYPE_NAME ? t.textlabels.put(function(e, t) {
                const r = n(e);
                i.debug("parse textlabel component", {
                    name: r.name,
                    device: t.getName()
                });
                const o = t.getSensorByName(e.sensor),
                    s = new g({
                        name: r.name,
                        payload: {
                            path: e.path,
                            method: "GET"
                        }
                    });
                return new u({
                    device: t,
                    name: r.name,
                    label: r.label,
                    sensor: o,
                    command: s,
                    isLabelVisible: e.isLabelVisible
                })
            }(e, t)) : r === s.COMPONENT_IMAGEURL_TYPE_NAME ? t.imageurls.put(function(e, t) {
                const r = n(e);
                i.debug("parse image component", {
                    name: r.name,
                    device: t.getName()
                });
                const o = t.getSensorByName(e.sensor),
                    s = new g({
                        name: r.name,
                        payload: {
                            path: e.path,
                            method: "GET"
                        }
                    });
                return new d({
                    device: t,
                    name: r.name,
                    label: r.label,
                    imageUri: e.imageUri,
                    size: e.size,
                    sensor: o,
                    command: s
                })
            }(e, t)) : r === s.COMPONENT_PROCEDURE_TYPE_NAME ? t.procedures.put(function(e, t) {
                const r = n(e);
                return i.debug("parse procedure component", {
                    name: r.name,
                    device: t.getName()
                }), new p({
                    device: t,
                    name: r.name,
                    label: r.label,
                    path: e.path,
                    adapterName: e.adapterName,
                    params: e.params
                })
            }(e, t)) : r === s.COMPONENT_DIRECTORY_TYPE_NAME ? t.directories.put(function(e, t) {
                const r = n(e);
                return new h({
                    name: r.name,
                    label: r.label,
                    path: e.path,
                    directoryId: e.directoryId,
                    thumbnail: e.thumbnail,
                    adapterName: e.adapterName,
                    directoryType: e.directoryType,
                    identifier: e.identifier,
                    role: e.role,
                    device: t
                })
            }(e, t)) : r === s.COMPONENT_SENSOR_TYPE_NAME ? t.sensors.put(function(e, t) {
                const r = n(e);
                i.debug("parse sensor component", {
                    name: r.name,
                    device: t.getName()
                });
                const a = e.sensor,
                    c = new g({
                        name: s.COMPONENT_SENSOR_TYPE_NAME,
                        payload: {
                            path: e.path,
                            method: "GET"
                        }
                    });
                return new l({
                    name: r.name,
                    label: r.label,
                    className: a.className,
                    device: t,
                    type: a.type,
                    range: a.range,
                    unit: a.unit ? o(a.unit) : "",
                    command: c
                })
            }(e, t)) : i.warn("UNKNOWN_COMPONENT_IGNORED", r)
        }
    }
}, function(e, t, r) {// Function 134 class extending for TEXTLABEL
    "use strict";
    const n = r(50),
        o = r(23),
        i = r(8);
    class s extends n {
        constructor(e) {
            super(e.device, i.COMPONENT_TEXTLABEL_TYPE_NAME, e.key), this.name = e.name || "", this.label = e.label || this.name, this.isLabelVisible = !(void 0 !== e.isLabelVisible) || e.isLabelVisible, this.command = e.command, this.sensor = e.sensor || null
        }
        static build(e, t) {
            if (!e) throw new Error("Textlabel parameter object invalid!");
            if (!t || "function" != typeof t.getName || "function" != typeof t.getRoomName) throw new Error("Textlabel parameter device invalid!");
            const r = {
                name: e.name,
                label: e.label,
                isLabelVisible: e.isLabelVisible,
                command: o.build(e.command, t),
                key: e.key,
                device: t
            };
            return e.sensor && (r.sensor = t.getSensorByKey(e.sensor.key)), new s(r)
        }
        getName() {
            return this.name
        }
        getLabel() {
            return this.label
        }
        getCommand() {
            return this.command
        }
        toJSON() {
            return {
                key: this.key,
                name: this.name,
                label: this.label,
                isLabelVisible: this.isLabelVisible,
                command: this.command,
                componentType: this.componentType,
                sensor: this.sensor,
                deviceName: this.device.getName(),
                deviceKey: this.device.key,
                roomName: this.device.roomName,
                roomKey: this.device.roomKey
            }
        }
    }
    e.exports = s
}, function(e, t, r) {// Function 135 class extending for IMAGEURL
    "use strict";
    const n = r(50),
        o = r(23),
        i = r(8),
        s = ["small", "large"];
    class a extends n {
        constructor(e) {
            super(e.device, i.COMPONENT_IMAGEURL_TYPE_NAME, e.key), this.name = e.name || "", this.label = e.label || this.name, this.imageUri = e.imageUri || null, this.size = e.size || "large", this.command = e.command, this.sensor = e.sensor || null, this.validateImageSize()
        }
        static build(e, t) {
            if (!e) throw new Error("ImageUrl parameter object invalid!");
            if (!t || "function" != typeof t.getName || "function" != typeof t.getRoomName) throw new Error("ImageUrl parameter device invalid!");
            const r = {
                name: e.name,
                label: e.label,
                imageUri: e.imageUri,
                size: e.size,
                command: o.build(e.command, t),
                key: e.key,
                device: t
            };
            return e.sensor && (r.sensor = t.getSensorByKey(e.sensor.key)), new a(r)
        }
        validateImageSize() {
            if (!s.includes(this.size)) throw new Error("ImageUrl parameter size invalid")
        }
        getName() {
            return this.name
        }
        getLabel() {
            return this.label
        }
        getCommand() {
            return this.command
        }
        toJSON() {
            return {
                key: this.key,
                name: this.name,
                label: this.label,
                imageUri: this.imageUri,
                size: this.size,
                command: this.command,
                componentType: this.componentType,
                sensor: this.sensor,
                deviceName: this.device.getName(),
                deviceKey: this.device.key,
                roomName: this.device.roomName,
                roomKey: this.device.roomKey
            }
        }
    }
    e.exports = a
}, function(e, t, r) {// Function 136 Send email from recipe
    "use strict";
    const n = r(0)("Schedulerstep: email"),
        o = r(12),
        i = r(301),
        s = o.hostname(),
        a = o.firmwareVersion();
    e.exports = function(e) {
        AllFunctions(0)("Function 136").verbose("Send email from recipe")
        const t = e.getAction(),
            r = t.message.replace("%NEEO_HOSTNAME%", s).replace("%NEEO_FIRMWARE%", a),
            o = e.getName();
        return n.debug("SEND_EMAIL", o), i.sendmail({
            to: t.email,
            text: r,
            subject: o
        }).then(e => {
            n.info("RECIPE_STEP_EMAIL_SUCCEEDED", e)
        }).catch(e => {
            n.error("RECIPE_STEP_EMAIL_FAILED", e.message)
        })
    }
}, function(e) {// Function 137 exports = require("lodash/isEmpty")
    e.exports = require("lodash/isEmpty")
}, function(e) {// Function 138 exports = require("child_process")
    e.exports = require("child_process")
}, function(e) {// Function 139 exports = require("semver")
    e.exports = require("semver")
}, function(e) {// Function 140 fill some TOUCHBUTTON fields
    "use strict";
    AllFunctions(0)("Function 140").verbose("");
    e.exports.NOTIFICATION_TOUCHBUTTONPRESSED = "touchbuttonpressed", e.exports.NOTIFICATION_LONG_TOUCHBUTTONPRESSED = "longtouchbuttonpressed"
}, function(e) {// Function 141 exports = require("ip-address")
    e.exports = require("ip-address")
}, function(e, t, r) {// Function 142 getI18nDirectory and r(308)
    "use strict";
    AllFunctions(0)("Function 142").verbose("");
    const n = r(37).getI18nDirectory(),
        o = r(308);
    o.configure({
        locales: ["en"],
        defaultLocale: "en",
        directory: n
    }), e.exports = o
}, function(e, t, r) {// Function 143 create structure for using irblaster
    "use strict";
    AllFunctions(0)("Function 143").verbose("");
    const n = r(144),
        o = r(20).deviceAdapter,
        i = new(r(312))({
            deviceAdapter: o,
            irBlaster: n
        });
    e.exports = i
}, function(e, t, r) {// Function 144 functions for communicating irblaster
    "use strict";
    AllFunctions(0)("Function 144").verbose("");
    const n = r(2).irblaster,
        o = r(309),
        i = r(310),
        s = r(34),
        a = new o,
        c = new i(a, n);
    e.exports = {
        trigger: function(e, t) {
            metaLog({type:LOG_TYPE.VERBOSE,content:"Trigger IR "+e.name});
            return c.trigger(e, t)
        },
        sendSingleCommand: function(e) {
            return c.sendSingleCommand(e)
        },
        startIrLearn: function() {
            return a.startIrLearn()
        },
        stopIrLearn: function() {
            return a.stopIrLearn()
        },
        enableInternalIrBlaster: function() {
            return s.execFile(n.enableInternalIrBlasterScript)
        },
        disableInternalIrBlaster: function() {
            return s.execFile(n.disableInternalIrBlasterScript)
        }
    }
}, function(e, t, r) {// Function 145 Global Cache getter/putter variables 
    "use strict";
    AllFunctions(0)("Function 145").verbose("global cache");

    function n(e) {
        return e > i.MAX_IRREPEAT ? i.MAX_IRREPEAT : e
    }

    function o(e) {
        return parseInt(1 + e / 1e3, 10)
    }
    const i = r(100),
        s = function(e) {
            this._globalCacheHeader = e.globalCacheHeader || [], this._frequency = e.frequency, this._repeat = n(e.repeat), this._offset = e.offset, this._sequence = e.sequence || [], this._duration = function(e, t, r, n) {
                const i = 1e6 / e,
                    s = 0 < t ? t : 1;
                if (1 === r) return o(n.reduce((e, t) => e + t * (i * s), 0));
                let a = 0;
                for (let e = 0; e < r - 1; e++) a += n[e] * i;
                let c = 0;
                for (let e = r - 1; e < n.length; e++) c += n[e] * i;
                return o(a = c * s + a)
            }(this._frequency, this._repeat, this._offset, this._sequence), this._isValid = !(this._frequency < i.IR_MIN_FREQ || this._frequency > i.IR_MAX_FREQ || this._sequence.length > i.MAX_SEQUENCE_ENTRIES || this._duration > i.MAX_DURATION_MS)
        };
    s.create = function(e) {
        const t = e.split(",");
        return new s({
            globalCacheHeader: t.splice(0, 3),
            frequency: ~~t[0],
            repeat: ~~t[1],
            offset: ~~t[2],
            sequence: t.slice(3)
        })
    }, s.STOP_REPEAT = new s({
        sequence: [],
        repeat: -1
    }), s.prototype.getRepeat = function() {
        return this._repeat
    }, s.prototype.setRepeat = function(e) {
        this._repeat = n(e)
    }, s.prototype.getFrequency = function() {
        return this._frequency
    }, s.prototype.getOffset = function() {
        return this._offset
    }, s.prototype.getValues = function() {
        return this._sequence
    }, s.prototype.getSequence = function() {
        return this._sequence
    }, s.prototype.isValid = function() {
        return this._isValid
    }, s.prototype.toString = function() {
        return this._globalCacheHeader.concat([this.getFrequency(), this.getRepeat(), this.getOffset()]).concat(this.getValues()).join(",")
    }, s.prototype.durationMs = function() {
        return this._duration
    }, e.exports = s
}, function(e, t, r) {// Function 146 recipe trigger
    "use strict";
    AllFunctions(0)("Function 146").verbose("")
    const n = r(318),
        o = r(319),
        i = r(320),
        s = r(321),
        a = {};
    a[n.TYPE] = n, a[o.TYPE] = o, a[i.TYPE] = i, a[s.TYPE] = s, e.exports = function(e) {
        const t = e.type,
            r = e.recipe;
        if (!t) throw new Error("No recipe trigger type given");
        if (!r) throw new Error("No recipe given");
        const n = a[t];
        if (!n) throw new Error("No such recipe trigger type: " + t);
        return new n(e)
    }, e.exports.TYPE_ICON = n.TYPE, e.exports.TYPE_SENSOR = o.TYPE, e.exports.TYPE_TIME = i.TYPE, e.exports.TYPE_INTERVAL = s.TYPE
}, function(e, t, r) {// Function 147 recipeconditionvalidator
    "use strict";
    AllFunctions(0)("Function 147").verbose("");
    const n = r(16),
        o = r(0)("recipeconditionvalidator"),
        i = r(14),
        s = r(63),
        a = r(8),
        c = {};
    c.validateCondition = function(e) {
        AllFunctions(0)("Function 147").verbose("validateCondition");
        if (!n.isObject(e) || !n.isString(e.type)) return !1;
        switch (e.type) {
            case "interval":
                return function(e) {
                    const t = parseInt(e.interval, 10);
                    if (isNaN(t) || !n.isNumber(t) || !n.isString(e.unit) || n.isUndefined(s.VALID_INTERVAL_UNITS[e.unit])) return !1;
                    const r = s.VALID_INTERVAL_UNITS[e.unit] * t;
                    return r >= s.MINIMAL_INTERVAL_TIME_S && r <= s.MAXIMAL_INTERVAL_TIME_S
                }(e);
            case "time":
                if (!n.isObject(e.time) || !n.isNumber(e.time.hour) || 0 > e.time.hour || 23 < e.time.hour || !n.isNumber(e.time.minute) || 0 > e.time.minute || 59 < e.time.minute || !n.isArray(e.repeat) || !n.every(e.repeat, function(e) {
                        return 0 <= e && 7 > e
                    }) || 7 < e.repeat.length) return !1;
                break;
            case "sensor":
                return function(e) {
                    return i(e, {
                        comparison: {
                            inclusion: s.CONDITION_SENSOR_COMPARISONS
                        },
                        value: {
                            presence: !0
                        },
                        sensor: {
                            presence: !0
                        }
                    }), i(e.sensor, {
                        eventKey: {
                            presence: !0
                        },
                        type: {
                            inclusion: s.CONDITION_VALID_SENSOR_TYPES
                        }
                    }), delete e.sensor.command, !0
                }(e);
            default:
                return !1
        }
        return !0
    }, c.validateAction = function(e) { AllFunctions(0)("Function 147").verbose("validateAction:")
        if (!n.isObject(e) || !n.isString(e.type)) return !1;
        const t = e.type;
        switch (t) {
            case "command":
                if (!n.isString(e.deviceKey) || !n.isString(e.componentName || !n.isString(e.componentType))) return !1;
                if (e.componentType === a.COMPONENT_SLIDER_TYPE_NAME || e.componentType === a.COMPONENT_SWITCH_TYPE_NAME) {
                    if (n.isUndefined(e.componentValue)) return !1;
                    if (e.componentType === a.COMPONENT_SWITCH_TYPE_NAME && !n.isBoolean(e.componentValue)) return !1
                }
                break;
            case "push":
                if (e.message && !n.isString(e.message)) return !1;
                break;
            case "email":
                if (!n.isString(e.email)) return !1;
                if (e.message && !n.isString(e.message)) return !1;
                break;
            case "recipe":
                if (e.recipe && "function" != typeof e.recipe.execute) return !1;
                break;
            default:
                return o.warn("INVALID_RECIPECONDITION_ACTIONTYPE", t), !1
        }
        return !0
    }, e.exports = c
}, function(e) {// Function 148 class BaseCondition
    "use strict";
    AllFunctions(0)("Function 148").verbose("")
    class t {
        constructor(e) {
            if (this.constructor === t) throw new Error("Cannot instantiate abstract class BaseCondition");
            if (!this.getLabel) throw new Error('Subclasses of BaseCondition must implement "getLabel" method');
            if (!this.check) throw new Error('Subclasses of BaseCondition must implement "check" method');
            if (!this.checkForConflicts) throw new Error('Subclasses of BaseCondition must implement "checkForConflicts" method');
            if (this.type = e.type, this.label = e.label, !this.type) throw new Error("validation failed: no condition type")
        }
        getType() {
            return this.type
        }
        validate() {
            if (!this.getLabel()) throw new Error("validation failed: no condition label")
        }
        toJSON() {
            return {
                type: this.type,
                label: this.getLabel()
            }
        }
    }
    e.exports = t
}, function(e, t, r) {// Function 149 various functions for scenario and recipe
    "use strict";
    AllFunctions(0)("Function 149").verbose("")
    const n = r(29),
        o = r(77),
        i = r(150),
        s = r(1),
        a = r(6)("cp6:lib:project:room"),
        c = r(9),
        u = r(11),
        d = r(22),
        l = r(151),
        p = r(153),
        h = r(332),
        g = r(82),
        m = r(3),
        f = r(30),
        E = r(51),
        y = e.exports = function(e) {
            this.name = e.name, this.icon = e.icon, this.hasController = !o(e.hasController) && e.hasController, this.devices = new g({
                name: "Devices",
                keyProperty: "name",
                silentReplace: !1,
                caseSensitive: !1
            }), this.scenarios = new g({
                name: "Scenarios",
                keyProperty: "name",
                silentReplace: !1,
                caseSensitive: !1
            }), this.recipes = new g({
                name: "Recipes"
            }), d.call(this, e.key, e.weight)
        };
    u.inherits(y, d), y.reorder = d.reorder, y.build = function(e) {
        const t = new y({
            name: e.name,
            icon: e.icon,
            hasController: e.hasController,
            key: e.key,
            weight: e.weight
        });
        return n(e.devices).forEach(e => {
            t.addDevice(l.build(e, t))
        }), n(e.scenarios).forEach(e => {
            t.addScenario(p.build(e, t))
        }), n(e.recipes).forEach(e => {
            t.addRecipe(E.buildRecipe(e, t))
        }), t
    }, y.prototype.buildScenarios = function() {
        h.buildAll({
            deviceStore: this.devices,
            scenarioStore: this.scenarios,
            room: this
        })
    }, y.prototype.getName = function() {
        return this.name
    }, y.prototype.setName = function(e) {
        this.name = e, this.getDevices().forEach(e => e.setRoom(this))
    }, y.prototype.getIcon = function() {
        return this.icon
    }, y.prototype.setIcon = function(e) {
        this.icon = e
    }, y.prototype.addDevice = function(e, t) {
        if (m.increaseCounter("room-device-add"), t) {
            const t = e.getName();
            for (let r = 2; r < 100 && this.getDeviceByName(e.getName());) e.setName(t + " (" + r++ + ")")
        }
        this.devices.put(e), e.setRoom(this)
    }, y.prototype.getDeviceByName = function(e) {
        return this.devices.get(e)
    }, y.prototype.getDeviceByKey = function(e) {
        return this.devices.getByKey(e)
    }, y.prototype.getDeviceNames = function() {
        return this.devices.map(e => e.getName())
    }, y.prototype.getDevices = function(e) {
        return this.devices.filter(e)
    }, y.prototype.getDevicesWithCapability = function(e) {
        return this.getDevices(t => t.hasCapability(e))
    }, y.prototype.getNumberOfDevices = function() {
        return this.devices.length
    }, y.prototype.addScenario = function(e, t) {
        if (m.increaseCounter("room-scenario-add"), t) {
            const t = e.getName();
            for (let r = 2; r < 100 && this.getScenarioByName(e.getName());) e.setName(t + " (" + r++ + ")")
        }
        return this.scenarios.put(e), e
    }, y.prototype.getScenarioByName = function(e) {
        return this.scenarios.get(e)
    }, y.prototype.getScenarioByKey = function(e) {
        return this.scenarios.getByKey(e)
    }, y.prototype.getScenariosByMainDeviceKey = function(e) {
        return this.scenarios.get(e, "mainDeviceKey", !0)
    }, y.prototype.getScenarios = function(e) {
        return this.scenarios.filter(e)
    }, y.prototype.removeScenario = function(e) {
        m.increaseCounter("room-scenario-delete"), this.scenarios.remove(e), this.getRecipesForScenario(e).forEach(e => this.removeRecipe(e))
    }, y.prototype.removeDevice = function(e) {
        this.devices.remove(e)
    }, y.prototype.renameDevice = function(e, t) {
        if (!t) throw new Error(c(null, "parameter_missing", "newDeviceName").message);
        const r = this.getDeviceByKey(e);
        if (!r) throw new Error(c(null, "parameter_missing", "device").message);
        if (this.getScenarioByName(t) || this.getDeviceByName(t)) throw new Error(c(null, "device_rename").message);
        if (a("rename device"), r.setName(t), r.isGroupedDevice()) a("GROUPED_DEVICE_DETECTED_DO_NOT_RENAME_SCENARIO");
        else {
            const r = this.getScenarios(t => t.mainDeviceKey === e)[0];
            r && (a("rename scenario"), r.setName(t))
        }
        a("rename recipes"), this.getRecipes(t => {
            return (!!t.scenario && t.scenario.mainDeviceKey) === e
        }).forEach(e => {
            a("update recipe %o", {
                name: e.name,
                type: e.type
            }), e.name = t, e.update()
        }), this.rebuildScenarioRecipes()
    }, y.prototype.resetWiring = function(e) {
        if (this._isInvalid(e)) return s.reject(new Error(c(null, "parameter_missing", "device").message));
        const t = -1 !== e.details.roles.indexOf("HUB") ? t => void 0 !== t.getDeviceByKey(e.getKey()) : t => t.mainDeviceKey === e.getKey();
        return this._forScenarios(t, e => {
            a("reset scenario ", e.getName()), e.resetWiring()
        }), this.rebuildScenarioRecipes(), s.resolve()
    }, y.prototype.deleteDeviceHelper = function(e) {
        return new s((t, r) => {
            if (this._isInvalid(e)) return r(new Error(c(null, "parameter_missing", "device").message));
            const n = this.getScenarios(t => t.mainDeviceKey === e.key),
                o = !!(0 < n.length) && n[0];
            this._deleteMainScenariosFor(e), this._resetScenariosUsing(e), this._deleteEmptyScenarios(), this.rebuildScenarioRecipes(), this._deleteRecipesTriggeredBy(e), this._cleanRecipesUsing(e, o), this.deleteEmptyCustomRecipes(), this.devices.remove(e), t()
        })
    }, y.prototype._deleteMainScenariosFor = function(e) {
        const t = t => t.getMainDevice().getKey() === e.getKey();
        this._forScenarios(e => t(e) && (e => !f.RECIPE_GROUPED_DEVICE_TYPES.includes(e.getMainDevice().getType()))(e), e => {
            a("remove main scenario", e.name), this.resetWiring(e.getMainDevice()), this.removeScenario(e)
        })
    }, y.prototype._resetScenariosUsing = function(e) {
        this._forScenarios(t => t.usesDevice(e), t => {
            t.resetForDevice(e)
        })
    }, y.prototype._deleteEmptyScenarios = function() {
        this._forScenarios(e => e.isEmpty(), e => {
            a("remove empty scenario", e.name), this.removeScenario(e)
        })
    }, y.prototype._deleteRecipesTriggeredBy = function(e) {
        this._forRecipes(t => {
            const r = t.trigger;
            return r.hasOwnProperty("sensorEventKey") && r.sensorEventKey.split(":")[0] === e.getKey()
        }, e => this.removeRecipe(e))
    }, y.prototype._cleanRecipesUsing = function(e, t) {
        this.recipes.forEach(r => r.removeDevice(e, t))
    }, y.prototype.deleteEmptyCustomRecipes = function() {
        this._forRecipes(e => e.isCustom && 0 === e.getSteps().length, e => {
            a("remove empty custom recipe", e.name), this.removeRecipe(e)
        })
    }, y.prototype.getRecipeForScenario = function(e, t) {
        return this.getRecipesForScenario(t).find(t => t.getType() === e)
    }, y.prototype.getRecipesForScenario = function(e) {
        return this.recipes.get(e.getKey(), "scenarioKey", !0)
    }, y.prototype.addRecipe = function(e, t) {
        if (m.increaseCounter("room-recipe-add"), t) {
            const t = e.getName();
            for (let r = 2; r < 100 && this.getRecipeByName(e.getName());) e.setName(t + " (" + r++ + ")")
        }
        return this.recipes.put(e), e
    }, y.prototype.getRecipeByName = function(e, t) {
        return this.getRecipesByName(t).filter(t => t.getType() === e)[0]
    }, y.prototype.getRecipesByName = function(e) {
        return this.recipes.get(e, "name", !0)
    }, y.prototype.getRecipeByKey = function(e) {
        return this.recipes.getByKey(e)
    }, y.prototype.getRecipes = function(e) {
        return this.recipes.filter(e)
    }, y.prototype.removeRecipe = function(e) {
        return m.increaseCounter("room-recipe-delete"), this.recipes.remove(e), e
    }, y.prototype.markDeviceRecipesClean = function(e) {
        const t = this.getScenarios(t => {
            return t.getDevices().find(t => t.key === e.key)
        });
        if (0 !== t.length) {
            t.reduce((e, t) => {
                const r = this.getRecipesForScenario(t);
                return e = e.concat(r)
            }, []).filter(e => e.isDirty).map(e => e.markAsClean())
        }
    }, y.prototype.rebuildScenarioRecipes = function() {
        const e = E.getRecipeCookBook(),
            t = e => {
                const t = e.getSteps().findIndex(e => e.type === E.STEP_TYPE_CONTROLS);
                if (-1 === t) return !1;
                const r = e.getStep(t);
                return !!!this.getScenarioByKey(r.scenarioKey) && t
            },
            r = (r, n) => {
                const o = this.getRecipeForScenario(r, n),
                    i = e.getRecipeForScenario(r, n, o);
                this.addRecipe(i, !0);
                const s = t(i);
                Number.isInteger(s) && ((e, t, r) => {
                    e.setStep(t, {
                        type: E.STEP_TYPE_CONTROLS,
                        scenarioKey: r.key,
                        scenarioName: r.name
                    })
                })(i, s, n)
            };
        this.getScenarios().forEach(e => {
            r(E.TYPE_LAUNCH, e), r(E.TYPE_POWEROFF, e)
        })
    }, y.prototype.getSummary = function() {
        return {
            name: this.getName(),
            icon: this.getIcon(),
            key: this.getKey(),
            weight: this.weight,
            hasController: this.hasController,
            nrDevices: this.getDevices().length
        }
    }, y.prototype._isInvalid = function(e) {
        return o(e) || !i(e.getKey)
    }, y.prototype._forScenarios = function(e, t) {
        this.getScenarios(e).forEach(t)
    }, y.prototype._forRecipes = function(e, t) {
        this.getRecipes(e).forEach(t)
    }
}, function(e) {// Function 150 exports = require("lodash/isFunction")
    e.exports = require("lodash/isFunction")
}, function(e, t, r) {// Function 151 various functions for room
    "use strict";
    AllFunctions(0)("Function 151").verbose("")

    function n(e, t, r, n) {
        s(n[t]).forEach(n => {
            try {
                e[t].put(r.build(n, e))
            } catch (e) {
                C.error(`DEVICE_${t.toUpperCase()}_BUILD_FAILED`, {
                    msg: e.message
                })
            }
        })
    }

    function o(e) {
        return C.error("GET_ROOT_ITEMS_FAILED", {
            error: e.message
        }), {
            items: [],
            total: 0
        }
    }
    const i = r(16),
        s = r(29),
        a = r(125),
        c = r(330),
        u = r(77),
        d = r(1),
        l = r(11),
        p = r(19),
        h = r(36),
        g = r(21),
        m = r(30),
        f = r(8),
        E = r(120),
        y = r(132),
        _ = r(62),
        v = r(96),
        T = r(134),
        I = r(135),
        A = r(61),
        S = r(49),
        N = r(97),
        R = r(152),
        O = r(14),
        C = r(0)("device"),
        w = r(22),
        D = r(82),
        b = r(98),
        P = r(103),
        L = r(43),
        U = r(52),
        k = r(58).iconify,
        M = g.INPUT_COMMANDS_NOT_WORKING,
        x = {
            presence: !0
        },
        F = e.exports = function(e) {
            this.name = e.name, this.roomName = e.roomName || "", this.roomKey = e.roomKey || "", this.adapterDeviceId = e.adapterDeviceId, this.details = e.details || {}, this.powerMode = e.powerMode, e.spec && this.setSpec(e.spec), O(this.details, {
                icon: {
                    inclusion: E.ALLOWED_ICON_NAMES
                }
            }), this.details.capabilities = this.details.capabilities || [], this.macros = new D({
                name: "Macros",
                keyProperty: "name",
                silentReplace: !1
            }), this.genericMacros = new D({
                name: "Macros (Generic)",
                keyProperty: "name",
                silentReplace: !1
            }), this.switches = new D({
                name: "Switches",
                keyProperty: "name"
            }), this.sensors = new D({
                name: "Sensors",
                keyProperty: "name"
            }), this.sliders = new D({
                name: "Sliders",
                keyProperty: "name"
            }), this.textlabels = new D({
                name: "Textlabels",
                keyProperty: "name"
            }), this.imageurls = new D({
                name: "ImageUrls",
                keyProperty: "name"
            }), this.procedures = new D({
                name: "Procedures",
                keyProperty: "name",
                silentReplace: !1
            }), this.directories = new D({
                name: "Directories",
                keyProperty: "name",
                silentReplace: !1
            }), this.hypotheticalPowerState = F.POWERSTATE_OFF, this.favorites = [], this.capabilities = [], this._favoritesComponent = function(e) {
                const t = e.details.deviceCapabilities && e.details.deviceCapabilities.includes("customFavoriteHandler"),
                    r = e.details.adapterName;
                if (t) return N.build({
                    name: "favoriteHandler",
                    path: `/device/${r}/favoritehandler`
                }, e)
            }(this), w.call(this, e.key)
        };
    l.inherits(F, w), F.POWERSTATE_ON = "on", F.POWERSTATE_OFF = "off", F.POWERSTATE_ON_OFF = "transitioning-on-off", F.POWERSTATE_OFF_ON = "transitioning-off-on", F.build = function(e, t) {
        const r = new F({
            name: e.name,
            key: e.key,
            adapterDeviceId: e.adapterDeviceId,
            roomName: t.getName(),
            roomKey: t.getKey(),
            details: e.details,
            powerMode: e.powerMode
        });
        return r.details && !r.details.icon && (r.details.icon = k(r.details.type)), n(r, "sensors", _, e), n(r, "macros", S, e), n(r, "genericMacros", S, e), n(r, "switches", v, e), n(r, "sliders", A, e), n(r, "textlabels", T, e), n(r, "imageurls", I, e), n(r, "directories", b, e), n(r, "procedures", N, e), s(e.favorites).forEach(e => {
            try {
                r.favorites.push(R.build(e))
            } catch (e) {
                C.error("DEVICE_FAVORITES_BUILD_FAILED", e.message)
            }
        }), r.reloadPowerMode(), r.reloadCapabilities(), r
    }, F.prototype.setName = function(e) {
        this.name = e
    }, F.prototype.getName = function() {
        return this.name
    }, F.prototype.getSourceName = function() {
        return this.details.sourceName
    }, F.prototype.getType = function() {
        return this.details.type
    }, F.prototype.getIconName = function() {
        return this.details.icon && this.details.icon.toUpperCase()
    }, F.prototype.getHdmiCecAddress = function() {
        return this.details.hdmiCecAddress
    }, F.prototype.setHdmiCecAddress = function(e) {
        this.details.hdmiCecAddress = e
    }, F.prototype.getRoomName = function() {
        return this.roomName
    }, F.prototype.getRoomKey = function() {
        if (!this.roomKey) throw Error("getRoomKey: device invalid");
        return this.roomKey
    }, F.prototype.setRoom = function(e) {
        this.roomName = e.getName(), this.roomKey = e.getKey()
    }, F.prototype.setInputsNotWorkingCapability = function() {
        this.details.capabilities.includes(M) || (this.details.capabilities.push(M), C.info("DEVICE_MISSING_INPUT_CAPABILITY", {
            name: this.details.name,
            type: this.details.type,
            manufacturer: this.details.manufacturer
        }), this.reloadCapabilities())
    }, F.prototype.clearInputsNotWorkingCapability = function() {
        this.details.capabilities = this.details.capabilities.filter(e => e !== M), this.reloadCapabilities()
    }, F.prototype.getQuery = function() {
        return this.details.manufacturer + " " + this.details.name
    }, F.prototype.getMacroByName = function(e, t) {
        let r = this.macros.get(e);
        return !r && t && (r = this.genericMacros.get(e)), r || void C.debug("MACRO_DOES_NOT_EXIST", {
            macro: e,
            device: {
                name: this.details.name,
                type: this.details.type,
                manufacturer: this.details.manufacturer
            }
        })
    }, F.prototype.getMacroByKey = function(e) {
        const t = this.macros.getByKey(e);
        return t || this.genericMacros.getByKey(e)
    }, Object.defineProperty(F.prototype, "macroNames", {
        get: function() {
            return this.getMacros().map(e => e.name)
        }
    }), Object.defineProperty(F.prototype, "genericMacroNames", {
        get: function() {
            return this.genericMacros.filter().map(e => e.name)
        }
    }), Object.defineProperty(F.prototype, "sensorNames", {
        get: function() {
            return this.getSensors().map(e => e.name)
        }
    }), Object.defineProperty(F.prototype, "directoryRoles", {
        get: function() {
            return this.getDirectories().map(e => e.role)
        }
    }), F.prototype.getMacros = function(e) {
        return this.macros.filter(e)
    }, F.prototype.getSwitchByName = function(e) {
        return this.switches.get(e)
    }, F.prototype.getSwitchByKey = function(e) {
        return this.switches.getByKey(e)
    }, F.prototype.getSwitches = function(e) {
        return this.switches.filter(e)
    }, F.prototype.getSensorByName = function(e) {
        return this.sensors.get(e)
    }, F.prototype.getSensorByKey = function(e) {
        return this.sensors.getByKey(e)
    }, F.prototype.getSensors = function(e) {
        return this.sensors.filter(e)
    }, F.prototype.getSliderByName = function(e) {
        return this.sliders.get(e)
    }, F.prototype.getSliderByKey = function(e) {
        return this.sliders.getByKey(e)
    }, F.prototype.getSliders = function(e) {
        return this.sliders.filter(e)
    }, F.prototype.getTextlabelByName = function(e) {
        return this.textlabels.get(e)
    }, F.prototype.getTextlabelByKey = function(e) {
        return this.textlabels.getByKey(e)
    }, F.prototype.getTextlabels = function(e) {
        return this.textlabels.filter(e)
    }, F.prototype.getImageUrlByName = function(e) {
        return this.imageurls.get(e)
    }, F.prototype.getImageUrlByKey = function(e) {
        return this.imageurls.getByKey(e)
    }, F.prototype.getImageurls = function(e) {
        return this.imageurls.filter(e)
    }, F.prototype.getProcedures = function(e) {
        return this.procedures.filter(e)
    }, F.prototype.getProcedureByKey = function(e) {
        return this.procedures.getByKey(e)
    }, F.prototype.getProcedureByName = function(e) {
        return this.procedures.get(e)
    }, F.prototype.getFavoriteComponent = function() {
        return this._favoritesComponent
    }, F.prototype.hasComponents = function() {
        return [this.sliders.length, this.switches.length, this.macros.length, this.textlabels.length, this.imageurls.length, this.procedures.length].some(e => 0 < e)
    }, F.prototype.getComponent = function(e, t) {
        switch (t) {
            case f.COMPONENT_MACRO_TYPE_NAME:
                return this.getMacroByName(e);
            case f.COMPONENT_SWITCH_TYPE_NAME:
                return this.getSwitchByName(e);
            case f.COMPONENT_SLIDER_TYPE_NAME:
                return this.getSliderByName(e);
            case f.COMPONENT_PROCEDURE_TYPE_NAME:
                return this.getProcedureByName(e);
            case f.COMPONENT_TEXTLABEL_TYPE_NAME:
                return this.getTextlabelByName(e);
            case f.COMPONENT_IMAGEURL_TYPE_NAME:
                return this.getImageUrlByName(e)
        }
        throw new Error("Illegal component type!")
    }, F.prototype.getComponentByKey = function(e) {
        let t = this.getMacroByKey(e);
        return t || ((t = this.getSwitchByKey(e)) || ((t = this.getSliderByKey(e)) || ((t = this.getTextlabelByKey(e)) || ((t = this.getImageUrlByKey(e)) || ((t = this.getDirectoryByKey(e)) || this.getProcedureByKey(e))))))
    }, F.prototype.getComponentByName = function(e, t) {
        let r = this.getMacroByName(e, t);
        return r || ((r = this.getSwitchByName(e)) || ((r = this.getSliderByName(e)) || ((r = this.getTextlabelByName(e)) || ((r = this.getImageUrlByName(e)) || this.getProcedureByName(e)))))
    }, F.prototype.getSourceSwitchDelay = function() {
        const e = this.details.timing;
        return e ? e.sourceSwitchDelay : 0
    }, F.prototype.getStandbyCommandDelay = function() {
        const e = this.details.timing;
        return e ? e.standbyCommandDelay : 0
    }, F.prototype.getShutdownDelay = function() {
        const e = this.details.timing;
        return e ? e.shutdownDelay : 0
    }, F.prototype.hasMultipleRoles = function() {
        return 1 < this.getRoles().length
    }, F.prototype.hasRole = function(e) {
        return a(this.getRoles(), e)
    }, F.prototype.getRoles = function() {
        return this.details.roles
    }, F.prototype.updateRoles = function() {
        this.details.roles = m.rolesByDeviceType(this.getType(), this.useTuner())
    }, F.prototype.isGroupedDevice = function() {
        return m.RECIPE_GROUPED_DEVICE_TYPES.includes(this.getType())
    }, F.prototype.isNoRecipeBuildDevice = function() {
        return !m.NORECIPE_BUILD_DEVICE_TYPES.includes(this.getType())
    }, F.prototype._setPowerState = function(e) {
        C.debug("update hypotheticalPowerState", {
            name: this.name,
            state: e
        }), this.hypotheticalPowerState = e
    }, F.prototype.markAsOn = function() {
        this._setPowerState(F.POWERSTATE_ON)
    }, F.prototype.markAsTransitioning = function() {
        this.isMarkedAsOn() ? this._setPowerState(F.POWERSTATE_ON_OFF) : this._setPowerState(F.POWERSTATE_OFF_ON)
    }, F.prototype.isTransitioningToOff = function() {
        return this.hypotheticalPowerState === F.POWERSTATE_ON_OFF
    }, F.prototype.isTransitioningToOn = function() {
        return this.hypotheticalPowerState === F.POWERSTATE_OFF_ON
    }, F.prototype.isMarkedAsOn = function() {
        return this.hypotheticalPowerState === F.POWERSTATE_ON
    }, F.prototype.markAsOff = function() {
        this._setPowerState(F.POWERSTATE_OFF)
    }, F.prototype.isMarkedAsOff = function() {
        return this.hypotheticalPowerState === F.POWERSTATE_OFF
    }, F.prototype.getPresetSettings = function() {
        return this.details.presetSettings
    }, F.prototype.getFavorites = function() {
        return this.favorites
    }, F.prototype.getAdapterDeviceId = function() {
        return this.adapterDeviceId
    }, F.prototype.getAdapterName = function() {
        return this.details.adapterName
    }, F.prototype.useTuner = function() {
        return p.TYPE_TV !== this.getType() || !!u(this.details.useTuner) || this.details.useTuner
    }, F.prototype.setUseTuner = function(e) {
        p.TYPE_TV !== this.getType() || (this.details.useTuner = !0 === e, this.updateRoles(), this.reloadCapabilities())
    }, F.prototype.setSpec = function(e) {
        const t = e.getData();
        O(t, {
            type: {
                inclusion: p.TYPES
            },
            name: x,
            adapterName: x,
            manufacturer: x
        }), this.details = {
            sourceName: e.getSourceName(),
            adapterName: t.adapterName,
            type: t.type,
            manufacturer: t.manufacturer,
            driverVersion: t.driverVersion,
            icon: k(t.icon || t.type),
            name: t.name,
            timing: t.timing,
            connections: y.getConnections(t),
            hdmiVersion: y.getHDMIVersion(t),
            presetSettings: y.getPresetSettings(t),
            info: t.info,
            deviceversion: t.version,
            commandSets: y.getCommandSetInfos(t),
            deviceCapabilities: t.deviceCapabilities || []
        }, this.updateRoles()
    }, F.prototype.getDetails = function() {
        return this.details
    }, F.prototype.getManufacturer = function() {
        return this.details.manufacturer
    }, F.prototype.hasDirectories = function() {
        return 0 < this.directories.length
    }, F.prototype.getDirectories = function() {
        return this.directories.getAll()
    }, F.prototype.getDirectoryByKey = function(e) {
        return this.directories.getByKey(e)
    }, F.prototype.getDirectoryByRole = function(e) {
        return this.getDirectories().find(t => t.role === e)
    }, F.prototype.getDirectoryRootItems = function() {
        if (!this.hasDirectories()) return d.resolve({
            items: [],
            total: 0
        });
        const e = this.getDirectories().find(e => "ROOT" === e.role);
        return e ? this._getSDKDirectoryRootItems(e) : this._getLegacySonosDirectoryRootItems()
    }, F.prototype._getSDKDirectoryRootItems = function(e) {
        return P.browse(e, {}).then(e => {
            const t = (e.items ? e.items : e).reduce((e, t) => e.concat(t), []);
            return {
                items: t,
                total: t.length,
                sdkDevice: !0,
                title: e.title
            }
        }).catch(o)
    }, F.prototype._getLegacySonosDirectoryRootItems = function() {
        const e = this.getDirectories(),
            t = i(e).filter({
                directoryType: "browse"
            }).sortBy(["adapterName", "label"]).value(),
            r = c(t, {
                adapterName: "directory"
            }),
            n = t.slice(0, r),
            s = t.slice(r),
            a = s.map(e => e.isEnabled().catch(() => (C.debug("Failed to query directoryadapter"), !1)));
        return d.all(a).then(e => {
            const t = s.map((t, r) => e[r] ? d.resolve({
                    items: [t.getDirectoryItem()]
                }) : d.resolve({
                    items: [t.getInfoItem()]
                })),
                r = n.map(e => P.browse(e, {})).concat(t);
            return d.all(r)
        }).then(e => {
            const t = e.reduce((e, t) => e.concat(t.items), []).concat(b.getNEEOServicesInfoItem());
            return {
                items: t,
                total: t.length
            }
        }).catch(o)
    }, F.prototype.triggerActionByKey = function(e, t) {
        if (!e) throw new Error('missing argument to trigger action: "componentKey"');
        const r = this.getComponentByKey(e);
        return this.triggerAction(r, t)
    }, F.prototype.triggerActionByName = function(e, t) {
        if (!e) throw new Error('missing argument to trigger action: "componentName"');
        return this.triggerAction(this.getComponentByName(e, t.generic), t)
    }, F.prototype.triggerAction = function(e, t) {
        if (!e) throw new Error("could not find component to trigger");
        t = t || {};
        const r = L.buildActionOfComponent(e.getName(), e, t.value);
        return U.trigger(r, t)
    }, F.prototype.reloadPowerMode = function() {
        !g.check(g.MACRO_ONOFF_MISSING, this) ? this.powerMode = h.DEFAULT : !this.powerMode && (this.powerMode = h.MANUAL)
    }, F.prototype.setPowerMode = function(e) {
        return new d((t, r) => h.STUPID_DEVICE_MODES.includes(e) ? (this.powerMode = e, this.reloadCapabilities(), void t()) : r(new Error("Invalid powerMode")))
    }, F.prototype.reloadCapabilities = function() {
        this.capabilities = g.extractAll(this)
    }, F.prototype.hasCapability = function(e) {
        return this.capabilities.includes(e)
    }, F.prototype.toSafeJSON = function() {
        const e = Object.assign({}, this);
        return e.hasOwnProperty("details") && (e.details = Object.assign({}, e.details), e.details.connections = void 0, e.details.presetSettings = void 0, e.details.hdmiVersion = void 0), e
    }
}, function(e, t, r) {// Function 152 getters for Channel-data
    "use strict";
    AllFunctions(0)("Function 152").verbose("")
    const n = r(16),
        o = /\d+(\D\d+)?/,
        i = function(e) {
            (function(e) {
                if (!e) throw new Error("channel is undefined!");
                if (!e.channel || "object" != typeof e.channel || !e.channel.name || !n.isString(e.channel.name)) throw new Error("channel is invalid!");
                if (!o.test(e.channelNr)) throw new Error("channelNr is invalid!")
            })(e), this.channel = e.channel, this.channelNr = e.channelNr, e.custom && (this.custom = !0)
        };
    e.exports = i, i.build = function(e) {
        return new i(e)
    }, i.prototype.getChannelName = function() {
        return this.channel.name
    }, i.prototype.getChannelNr = function() {
        return this.channelNr
    }, i.prototype.getLogoURL = function() {
        AllFunctions(0)("Function 151").verbose("getLogoURL:",this.channel)
        //"logoURL":"https://neeo-channel-icons.s3.amazonaws.com/e9364489-00e7-4a28-a127-f010df459eca.png"}
        
        var normalizedChannel = this.channel.name.split(' ')
        AllFunctions(0)("Function 151").verbose("getLogoURL:",normalizedChannel)
        normalizedChannel = normalizedChannel.join('_')
        var logoType = this.channel.logoUrl.split("/")
        var myname = logoType[3]
//        AllFunctions(0)("Function 152").verbose("Logotype:",myname)
        var extensionPos = myname.indexOf(".") 
        var theReturn = CloudReplacementUrl  +"?type=images&name="+normalizedChannel+myname.substring(extensionPos,99)
        return theReturn 
        //return this.channel.logoUrl
    }
}, function(e, t, r) {// Function 153 scenario-build
    "use strict";
    AllFunctions(0)("Function 153").verbose("")

    function n(e) {
        const t = e.details.type;
        return m.VOLUME_DEVICE_TYPE_PRIORITY.indexOf(t)
    }
    const o = r(11),
        i = r(0)("scenario"),
        s = r(1),
        a = r(154),
        c = r(22),
        u = r(82),
        d = r(51),
        l = r(3),
        p = r(21),
        h = r(2).project,
        g = r(30),
        m = r(19),
        f = r(33),
        E = e.exports = function(e) {
            this.name = e.name, this.mainDeviceKey = e.mainDeviceKey, this.deviceInputMacroNames = e.deviceInputMacroNames || {}, this.active = !1, this.room = e.room, this.volumeDeviceKey = e.volumeDeviceKey, this.slides = e.slides || {}, this.shortcuts = new u({
                name: "ShortcutsInScenario",
                keyProperty: "key",
                silentReplace: !1,
                caseSensitive: !1
            }), e.shortcuts && e.shortcuts.forEach(e => {
                l.increaseCounter("scenario-shortcut-add"), this.shortcuts.put(e)
            }), this.devices = new u({
                name: "DevicesInScenario",
                keyProperty: "name",
                silentReplace: !0,
                caseSensitive: !1
            }), e.devices && e.devices.forEach(e => {
                l.increaseCounter("scenario-device-add"), this.devices.put(e)
            }), void 0 === e.configured ? this.resetConfigured() : this.configured = e.configured, c.call(this, e.key)
        };
    o.inherits(E, c), E.build = function(e, t) {
        l.increaseCounter("scenario-build");
        const r = e.devices,
            n = e.shortcuts;
        delete e.devices, delete e.shortcuts, e.room = t;
        const o = new E(e);
        for (const e in n) o.addShortcut(a.build(n[e]));
        return r.forEach(e => {
            o.addDevice(t.getDeviceByKey(e))
        }), o._reloadScenarioCapabilities(), o
    }, E.needsConfiguration = function(e) {
        return !!e && e.hasRole(g.ROLE_SOURCE)
    }, E.prototype.getName = function() {
        return this.name
    }, E.prototype.getRoom = function() {
        return this.room
    }, E.prototype.getRoomName = function() {
        return this.room ? this.room.getName() : void 0
    }, E.prototype.getRoomKey = function() {
        return this.room ? this.room.getKey() : void 0
    }, E.prototype.getType = function() {
        return this.getMainDevice().getType()
    }, E.prototype.getIcon = function() {
        const e = this.getMainDevice();
        return e ? e.capabilities && e.capabilities.includes(p.NEEO_DEVICE_TYPE_LIGHT) ? "LIGHT" : this.getMainDevice().getIconName() : ""
    }, E.prototype.resetWiring = function() {
        this.configured = -1 !== this.getMainDevice().details.roles.indexOf("HUB"), this.deviceInputMacroNames = {}, this.slides = {}, this.resetDevices()
    }, E.prototype.isConfigured = function() {
        return this.configured
    }, E.prototype.markConfigured = function() {
        this.configured = !0
    }, E.prototype.needsConfiguration = function() {
        const e = this.getMainDevice();
        return E.needsConfiguration(e)
    }, E.prototype.resetConfigured = function() {
        this.configured = !this.needsConfiguration()
    }, E.prototype.resetForDevice = function(e) {
        const t = this.getMainDevice().hasCapability(p.NEEO_FEATURE_WIRING_RESETTABLE),
            r = e.getKey();
        let n = !1;
        if (this.getDeviceByKey(r) && (this.removeDevice(e), n = !0), this.mainDeviceKey === r && !this.isEmpty()) {
            i.warn("SELECT_NEW_MAINDEVICEKEY");
            const e = this.getDevices()[0].getKey();
            this.setMainDeviceKey(e)
        }
        this.deviceInputMacroNames.hasOwnProperty(r) && (delete this.deviceInputMacroNames[r], n = !0), this.volumeDeviceKey === r && (delete this.volumeDeviceKey, n = !0), this.getShortcuts(e => e.deviceKey === r).forEach(e => this.removeShortcut(e)), n && t && this.resetConfigured()
    }, E.prototype._executeRecipe = function(e, t) {
        const r = this.getRecipe(e);
        if (!r) throw new Error("scenario " + this.getName() + "has no recipe type " + e);
        return r.execute(t)
    }, E.prototype.getRecipe = function(e) {
        const t = this.getRoom();
        if (!t) throw new Error("scenario " + this.getName() + " has no room defined!");
        return t.getRecipeForScenario(e, this)
    }, E.prototype.launch = function(e) {
        return this._executeRecipe(d.TYPE_LAUNCH, e)
    }, E.prototype.powerOff = function(e) {
        return this._executeRecipe(d.TYPE_POWEROFF, e)
    }, E.prototype.getRecipeControlStep = function() {
        const e = this.getRecipe(d.TYPE_LAUNCH);
        if (!e) return this.key;
        const t = e.getStepsByType(d.STEP_TYPE_CONTROLS);
        return 0 < t.length ? t[0].scenarioKey : this.key
    }, E.prototype.isActive = function() {
        if (this.scenarioSupportsPowerState) {
            const e = this.getMainDevice();
            return this.active && e && e.isMarkedAsOn()
        }
        return this.active
    }, E.prototype.activate = function() {
        this.isGroupedScenario || (this.active = !0)
    }, E.prototype.isEmpty = function() {
        return 0 >= this.devices.length
    }, E.prototype.hasSameTargetDevice = function(e) {
        const t = this.getTargetDevice(),
            r = e.getTargetDevice();
        return t && r && t.getKey() === r.getKey()
    }, E.prototype.usesDevice = function(e) {
        const t = 0 < this.getDevices(t => t.getKey() === e.getKey()).length,
            r = 0 < this.getShortcuts(t => t.deviceKey === e.getKey()).length;
        return t || r
    }, E.prototype.setName = function(e) {
        this.name = e
    }, E.prototype.toJSON = function() {
        return {
            name: this.name,
            mainDeviceKey: this.mainDeviceKey,
            volumeDeviceKey: this.volumeDeviceKey,
            shortcuts: this.shortcuts,
            key: this.key,
            deviceInputMacroNames: this.deviceInputMacroNames,
            configured: this.configured,
            roomName: this.getRoomName(),
            roomKey: this.getRoomKey(),
            devices: this.devices.map(e => e.getKey()),
            capabilities: this.getCapabilities(),
            slides: this.slides,
            icon: this.getIcon()
        }
    }, E.prototype.defineDeviceInput = function(e, t) {
        if (!e) throw new Error("scenario device not specified!");
        if (!this.getDeviceByKey(e.getKey())) throw new Error("device " + e.getName() + " is not in scenario " + this.getName());
        if (!t) throw new Error("device " + e.getName() + " input macro not specified for scenario " + this.getName());
        this.deviceInputMacroNames[e.getKey()] = t
    }, E.prototype.getDeviceInputMacro = function(e) {
        return e.getMacroByName(this.deviceInputMacroNames[e.getKey()], !0)
    }, E.prototype.getDeviceInputMacroName = function(e) {
        return this.deviceInputMacroNames[e.getKey()]
    }, E.prototype.setVolumeDeviceKey = function(e) {
        const t = this.volumeDeviceKey;
        if (e === t) return;
        const r = e => {
            const t = this.mainDeviceKey !== e,
                r = 0 === this.getShortcuts(t => t.deviceKey === e).length,
                n = -1 === Object.keys(this.deviceInputMacroNames).indexOf(e);
            return t && r && n
        };
        this.volumeDeviceKey = e, (e => {
            r(e) && this.getDeviceByKey(e) && this.removeDevice(this.getDeviceByKey(e))
        })(t), (e => {
            if (!this.getDeviceByKey(e)) {
                const t = this.room.getDeviceByKey(e);
                this.addDevice(t)
            }
        })(e)
    }, E.prototype.getVolumeDevice = function() {
        const e = this.room.getDeviceByKey(this.volumeDeviceKey);
        if (e) return e;
        const t = this._getHubWithVolume();
        if (t) return t;
        const r = this.getTargetDevice();
        return r || this.getMainDevice()
    }, E.prototype._getHubWithVolume = function() {
        return this.devices.filter(e => e.hasRole(g.ROLE_HUB) && e.hasCapability(p.VOLUME_STEP)).sort((e, t) => n(t) - n(e))[0]
    }, E.prototype.addShortcut = function(e) {
        l.increaseCounter("scenario-shortcut-add"), this.shortcuts.put(e)
    }, E.prototype.getShortcut = function(e) {
        return this.getShortcuts({
            name: e
        })[0]
    }, E.prototype.getShortcutByKey = function(e) {
        return this.shortcuts.getByKey(e)
    }, E.prototype.getShortcuts = function(e) {
        return this.shortcuts.filter(e).sort(c.compareByWeight)
    }, E.prototype.removeShortcut = function(e) {
        l.increaseCounter("scenario-shortcut-delete"), this.shortcuts.remove(e)
    }, E.prototype.removeAllShortcuts = function() {
        this.shortcuts.clear()
    }, E.prototype._reloadScenarioCapabilities = function() {
        const e = this.getMainDevice(),
            t = void 0 !== e;
        this.scenarioSupportsPowerState = t && e.hasCapability(p.NEEO_FEATURE_POWER_STATE_SUPPORTED), this.isGroupedScenario = t && e.hasCapability(p.NEEO_FEATURE_GROUPED_DEVICE), i.debug("ScenarioPowerCapabilities", {
            name: this.name,
            supportsPowerState: this.scenarioSupportsPowerState,
            isGrouped: this.isGroupedScenario
        })
    }, E.prototype.addDevice = function(e) {
        return e ? (l.increaseCounter("scenario-device-add"), void this.devices.put(e)) : void i.error("ADD_DEVICE_GUARD_DETECTED_UNDEFINED_DEVICE", (new Error).stack)
    }, E.prototype.removeDevice = function(e) {
        l.increaseCounter("scenario-device-delete"), this.devices.remove(e), this._reloadScenarioCapabilities()
    }, E.prototype.getDeviceByName = function(e) { 
        return this.devices.get(e)
    }, E.prototype.getDeviceByKey = function(e) {
        return this.devices.getByKey(e)
    }, E.prototype.getDevices = function(e) {
        return this.devices.filter(e)
    }, E.prototype.getMainDevice = function() {
        return this.getDeviceByKey(this.mainDeviceKey)
    }, E.prototype.getTargetDevice = function() {
        return this.getDevices(e => e.hasRole(g.ROLE_DESTINATION))[0]
    }, E.prototype.setMainDeviceKey = function(e) {
        this.mainDeviceKey = e, this._reloadScenarioCapabilities()
    }, E.prototype.triggerAction = function(e, t) {
        let r;
        if (t.deviceKey ? (r = this.getDeviceByKey(t.deviceKey), delete t.deviceKey) : r = f.isVolume(e) ? this.getVolumeDevice() : this.getMainDevice(), !r) throw new Error("Could not determine device to trigger the action on");
        return r.triggerActionByName(e, t)
    }, E.prototype.triggerActionByKey = function(e, t) {
        const r = this.getDeviceByKey(t.deviceKey);
        if (delete t.deviceKey, !r) throw new Error("Could not determine device to trigger the action on");
        return r.triggerActionByKey(e, t)
    }, E.prototype.resetDevices = function() {
        delete this.volumeDeviceKey;
        const e = this.mainDeviceKey;
        this.getDevices().forEach(t => {
            t.clearInputsNotWorkingCapability(), e !== t.key && this.removeDevice(t)
        })
    }, E.prototype.getCapabilities = function() {
        const e = {};
        return this.getDevices().forEach(t => {
            const r = t.capabilities || [];
            e[t.key] = r
        }), e
    }, E.prototype.setSlidePreferences = function(e) {
        return new s(t => {
            this.slides = e.reduce((e, t) => (e[t.id] = {
                hidden: t.hidden,
                weight: t.weight
            }, e), {}), i.event(`Slides updated for ${this.name}`), t()
        })
    }, E.prototype.isAllowedToAddShortcut = function() {
        return this.shortcuts.length < h.maximalShortcutsPerDevice
    }
}, function(e, t, r) {// Function 154 fields for shortcut.dvd"
    "use strict";
    AllFunctions(0)("Function 154").verbose("")
    const n = r(11),
        o = r(22),
        i = r(8),
        s = [{
            key: "shortcut.dvd",
            pattern: /^INPUT (CD|DVD|DISC|BLURAY)/
        }, {
            key: "shortcut.input",
            pattern: /^INPUT/
        }, {
            key: "shortcut.back",
            pattern: /^BACK/
        }, {
            key: "shortcut.forward",
            pattern: /^FORWARD/
        }, {
            key: "shortcut.power-on",
            pattern: /^POWER ON/
        }, {
            key: "shortcut.power-off",
            pattern: /^POWER OFF/
        }, {
            key: "shortcut.power-toggle",
            pattern: /^POWER TOGGLE/
        }, {
            key: "shortcut.menu",
            pattern: /^MENU/
        }, {
            key: "shortcut.back",
            pattern: /^BACK/
        }, {
            key: "shortcut.rec",
            pattern: /^REC/
        }, {
            key: "shortcut.my-recordings",
            pattern: /^MY RECORD/
        }, {
            key: "shortcut.mute-toggle",
            pattern: /^MUTE TOGGLE/
        }, {
            key: "shortcut.function-red",
            pattern: /^FUNCTION RED/
        }, {
            key: "shortcut.function-blue",
            pattern: /^FUNCTION BLUE/
        }, {
            key: "shortcut.function-yellow",
            pattern: /^FUNCTION YELLOW/
        }, {
            key: "shortcut.function-green",
            pattern: /^FUNCTION GREEN/
        }, {
            key: "shortcut.backward",
            pattern: /^BACKWARD/
        }, {
            key: "shortcut.reverse",
            pattern: /^REVERSE/
        }, {
            key: "shortcut.pause",
            pattern: /^PAUSE/
        }, {
            key: "shortcut.stop",
            pattern: /^STOP/
        }, {
            key: "shortcut.play",
            pattern: /^PLAY/
        }, {
            key: "shortcut.repeat",
            pattern: /^REPEAT/
        }, {
            key: "shortcut.next-track",
            pattern: /^NEXT TRACK/
        }, {
            key: "shortcut.next",
            pattern: /^NEXT/
        }, {
            key: "shortcut.previous-track",
            pattern: /^PREVIOUS TRACK/
        }, {
            key: "shortcut.previous-channel",
            pattern: /^PREVIOUS CHANNEL/
        }, {
            key: "shortcut.previous",
            pattern: /^PREVIOUS/
        }, {
            key: "shortcut.cursor-up",
            pattern: /^CURSOR UP/
        }, {
            key: "shortcut.cursor-down",
            pattern: /^CURSOR DOWN/
        }, {
            key: "shortcut.cursor-left",
            pattern: /^CURSOR LEFT/
        }, {
            key: "shortcut.cursor-right",
            pattern: /^CURSOR RIGHT/
        }, {
            key: "shortcut.volume-up",
            pattern: /^VOLUME UP/
        }, {
            key: "shortcut.volume-down",
            pattern: /^VOLUME DOWN/
        }, {
            key: "shortcut.shuffle",
            pattern: /^SHUFFLE TOGGLE/
        }, {
            key: "shortcut.channel-up",
            pattern: /^CHANNEL UP/
        }, {
            key: "shortcut.channel-down",
            pattern: /^CHANNEL DOWN/
        }, {
            key: "shortcut.skip-seconds-forward",
            pattern: /^SKIP SECONDS FORWARD/
        }, {
            key: "shortcut.skip-seconds-backward",
            pattern: /^SKIP SECONDS BACKWARD/
        }],
        a = function(e) {
            this.deviceName = e.deviceName, this.deviceRoomName = e.deviceRoomName, this.deviceRoomKey = e.deviceRoomKey, this.deviceKey = e.deviceKey, this.componentName = e.componentName, this.componentType = e.componentType, this.componentKey = e.componentKey, this.componentLabel = e.componentLabel, this.actionName = e.actionName, this.name = this.getLabel(), this.customName = e.customName, this.icon = a.getIconKeyFromName(this.name), o.call(this, e.key, e.weight)
        };
    n.inherits(a, o), a.reorder = o.reorder, a.TYPE_GAP = i.COMPONENT_GAP_TYPE_NAME, a.TYPE_BUTTON = i.COMPONENT_MACRO_TYPE_NAME, a.TYPE_SLIDER = i.COMPONENT_SLIDER_TYPE_NAME, a.TYPE_SWITCH = i.COMPONENT_SWITCH_TYPE_NAME, a.TYPE_WIDGET = i.COMPONENT_WIDGET_TYPE_NAME, a.TYPE_TEXTLABEL = i.COMPONENT_TEXTLABEL_TYPE_NAME, a.TYPE_IMAGEURL = i.COMPONENT_IMAGEURL_TYPE_NAME, a.prototype.getLabel = function() {
        return this.componentLabel ? this.componentLabel : this.componentName ? this.componentName : this.actionName
    }, a.prototype.getName = a.prototype.getLabel, a.prototype.getType = function() {
        return this.componentType
    }, a.prototype.getDeviceKey = function() {
        return this.deviceKey
    }, a.prototype.getDeviceRoomKey = function() {
        return this.deviceRoomKey
    }, a.prototype.getDeviceRoomName = function() {
        return this.deviceRoomName
    }, a.prototype.getComponentKey = function() {
        return this.componentKey
    }, a.prototype.setCustomName = function(e) {
        this.customName = e || void 0
    }, a.build = function(e) {
        return new a(e)
    }, a.getIconKeyFromName = function(e = "") {
        const t = e.replace(/\s\(.+\)/, ""),
            r = s.find(e => e.pattern.test(t));
        return r ? r.key : "shortcut"
    }, e.exports = a
}, function(e, t, r) {// Function 155 loadLatestProject, restoreProject, restoreCloudBackup, saveProject, getProjectVersions
    "use strict";
    AllFunctions(0)("Function 155").verbose("")

    function n(e) {
        return i(e).then(e => {
            const t = [];
            return e.deviceadapter && t.push(p.setConfig(e.deviceadapter)), e.directoryadapter && t.push(h.setConfig(e.directoryadapter)), a.all(t).then(() => e)
        }).then(e => a.resolve(l.requestZWaveSync()).then(() => e))
    }

    function o(e) {
        return s.createHash("sha1").update(e).digest("hex")
    }

    function i(e) {
        return !e.project ? (u.info("LEGACY_PROJECT_CONVERTED"), a.resolve({
            project: e
        })) : a.resolve(e)
    }
    const s = r(41),
        a = r(1),
        c = r(337),
        u = r(0)("projectPersistence"),
        d = r(99),
        l = r(20),
        p = l.deviceAdapter,
        h = l.directoryAdapter;
    let g = !1;
    e.exports = {
        loadLatestProject: function() {
            return d.loadLatest().then(i)
        },
        restoreProject: function(e) {
            return d.load(!0, e).then(n).catch(e => {
                throw u.error("RESTORE_PROJECT", {
                    error: e.message
                }), e
            })
        },
        restoreCloudBackup: function(e) {
            return n(e).catch(e => {
                throw u.error("RESTORE_CLOUD_BACKUP", {
                    error: e.message
                }), e
            })
        },
        saveProject: function(e) {
            AllFunctions(0)("Function 155").verbose("saveProject")
            const t = [e.getConfig(), p.getConfig(), h.getConfig(), 
                g ? (u.debug("SAVED_HASH_USING_CACHE", g), g) : (u.debug("SAVED_HASH_NOT_YET_LOADED"), g = d.loadLatest().catch(() => ({})).then(e => {
                const t = o(JSON.stringify(e));
                return u.debug("SAVED_HASH_LOADED_FROM_REPO", {
                    hash: t
                }), t
            }))];
            return a.all(t).then(e => {
                const t = {
                        project: e[0],
                        deviceadapter: e[1],
                        directoryadapter: e[2]
                    },
                    r = JSON.stringify(t),
                    n = o(r),
                    i = e[3],
                    s = n !== i;
                return s ? d.save(t, !0, r).then(() => (function(e) {
                    u.debug("SAVED_HASH_UPDATING", {
                        hash: e
                    }), g = a.resolve(e)
                })(n)).then(() => !0) : (u.debug("SAVE_PROJECT_SKIPPED", {
                    projectHash: n,
                    lastSavedProjectHash: i,
                    projectChangedSinceLastSave: s
                }), !1)
            })
        },
        getProjectVersions: function() {
            return d.listVersions()
        },
        checkAirkey: function(e, t) {
            const r = e.airkey;
//            console.log(e)
            AllFunctions(0)("Function 155").verbose("checkAirKey",c.h64(r, 42).toString(16));
            AllFunctions(0)("Function 155").verbose("Result",{"TR2 uses brain airkey":t,"Brain uses airkey":c.h64(r, 42).toString(16),baseId:r})           
            return t === c.h64(r, 42).toString(16) ? a.resolve() : a.reject(new Error("AIRKEY_NOT_MATCH"))
        }
    }
}, function(e, t, r) {// Function 156 deviceAddToRoomBySpec
    "use strict";
    AllFunctions(0)("Function 156").verbose("")
    const n = r(0)("deviceAddToRoomBySpec"),
        o = r(45),
        i = r(89),
        s = r(20).deviceAdapter,
        a = r(338);
    e.exports = {
        addDeviceToRoom: function(e, t, r, n, i) {
            return o.getFullSpec(r, i).then(e => c(e, t, r, n)).then(t => u(t, e)).then(e => d(e, n))
        },
        addDeviceToRoomWithSpecdata: function(e, t, r, n) {
            const o = Object.assign({
                    id: r,
                    name: t
                }, n),
                s = new i({
                    sourceName: n.sourceName,
                    sourceData: o
                }),
                c = a.build(s, t, r);
            return Promise.resolve().then(() => u(c, e)).then(e => d(e, r))
        }
    };
    const c = (e, t, r, i) => ! function(e) {
            const t = e.getData().capabilities || [];
            return n.debug("capabilities:", t), 0 < t.length
        }(e) ? (n.debug("FETCH_CAPABILITIES", {
            adapter: e.data.adapterName,
            id: i
        }), o.getCapabilities(r, e.data.adapterName, i).then(r => (n.debug("CAPABILITIES_FETCHED", r), a.build(e, t, i, r)))) : (n.debug("no need to fetch capabilities for", e.data.adapterName), a.build(e, t, i)),
        u = (e, t) => (t.addDevice(e, !0), e),
        d = (e, t) => {
            return "duiro" === e.getSourceName() || !t ? e : s.subscribe(e).catch(r => (n.event("Please update driver for device " + e.name), n.warn("SUBSCRIPTION_FUNCTION_MISSING", {
                adapterDeviceId: t,
                error: r ? r.message : "unknown"
            }), e))
        }
}, function(e, t, r) {// Function 157 schedule periodical backup.synchronizeLocalAndRemoteBackup ######
    "use strict";
    AllFunctions(0)("Function 157").verbose("backup/synchronizelocalandremotebackup")
    const n = r(2).backup,
        o = r(342),
        i = r(6)("cp6:lib:backup:index"),
        s = new o(n);
    e.exports = s, e.exports.startTask = function() { 
        return Promise.resolve(); // removed cloud based backup strategy as cloud is gone
        return i("startTask, intervall", n.checkIntervalSeconds), setInterval(() => {
            i("backup.synchronizeLocalAndRemoteBackup"), s.synchronizeLocalAndRemoteBackup().catch(() => {})
        }, 1e3 * n.checkIntervalSeconds)
    }
}, function(e, t, r) {// Function 158 startNotificationListener channel notification 
    "use strict";
    AllFunctions(0)("Function 158").verbose("startNotificationListener")
    const n = r(343),
        o = r(10),
        i = r(56),
        s = r(6)("cp6:lib:channels:index"),
        a = new n;
    e.exports = a, e.exports.startNotificationListener = function() {
        s("startNotificationListener", i.NOTIFICATION_SYNCED), o.on(i.NOTIFICATION_SYNCED, () => {
            s("channel notification"), a.reloadChannelFile()
        })
    }
}, function(e, t, r) {// Function 159 homekit resetPairingData and startNotificationListener update project data
    "use strict";
    AllFunctions(0)("Function 159").verbose("homekit resetPairingData")

    function n() {
        o("refresh data for homekit"), u.getAllRecipes().then(e => {
            try {
                s.sendData(e).then(() => {
                    o("UPDATED_HOMEKIT_DATA"), c.reloadAvahi()
                })
            } catch (e) {
                o("HOMEKIT_PUSH_FAILED", e.message)
            }
        })
    }
    const o = r(6)("cp6:lib:homekit:index"),
        i = r(25),
        s = r(346),
        a = r(10),
        c = r(44),
        u = r(90);
    e.exports.resetPairingData = function() {
        s.resetPairing().then(() => {
            setTimeout(() => {
                o("send data to homekit after reset"), s.clearCache(), n()
            }, 1e4)
        })
    }, e.exports.startNotificationListener = function() {
        o("startNotificationListener", i.NOTIFICATION_PROJECT_CHANGED), a.on(i.NOTIFICATION_PROJECT_CHANGED, () => {
            o("update project data"), n()
        }), o("startNotificationListener", i.NOTIFICATION_ACTIVE_NOW_CHANGED), a.on(i.NOTIFICATION_ACTIVE_NOW_CHANGED, () => {
            o("update project power state"), o("refresh power state for homekit"), u.getActiveRecipesKeys().then(e => s.sendPowerState(e)).then(() => {
                o("UPDATED_HOMEKIT_POWERSTATE")
            })
        })
    }
}, function(e, t, r) {// Function 160 getUrlPath getLazyUrlPath
    "use strict";
    AllFunctions(0)("Function 160").verbose("getURLPath, getLazyURLPath")

    function n(e) {

        const t = o(e || {}, {
            resize: !1
        });
        if (t.imageFormat && -1 === i.indexOf(t.imageFormat)) throw new Error("Invalid image format! only jpg, lz4, lz4-black or png are supported");
        return t
    }
    const o = r(70),
        SysInfo = r(12),
        i = ["jpg", "lz4", "lz4-black", "png"];
    t.getUrlPath = function(e, t) { 
        AllFunctions(0)("Function 160").verbose("getURLPath",e)
        if (!e) return "";
        const r = n(t),
            o = r.imageFormat ? "format/" + r.imageFormat + "/" : "";
        if (r.resize) {
            if (!r.width || !r.height) throw new Error('either "width" and/or "height" is missing');
            return "v1/imagecache/getresized/" + o + r.width + "/" + r.height + "/" + encodeURIComponent(e)
            //"http://192.168.73.15:3000/v1/imagecache/getresized/100/80/http%3A%2F%2F192.168.73.195%3A6468%2Fdownload%3Ftype%3Dimages%26name%3DNPO2.png.thumb.png"
        }

        return "v1/imagecache/get/" + o + encodeURIComponent(e)
    }, t.getLazyUrlPath = function(e, t) { 
        AllFunctions(0)("Function 160").debug("getLazyURLPath")

        if (!e) return "";
        const r = n(t),
            o = r.imageFormat ? r.imageFormat + "/" : "";
        if (r.resize) {
            if (!r.width || !r.height) throw new Error('either "width" and/or "height" is missing');          
            return "v1/imagecache/getlazyresized/" + o + r.width + "/" + r.height + "/" + encodeURIComponent(e)
        }

        return "v1/imagecache/get/" + o + encodeURIComponent(e)
    }
}, function(e, t, r) {// Function 161 devicesmartener deviceAdapter
    "use strict";
    AllFunctions(0)("Function 161").verbose("deviceSmartener")

    function n(e) {
        return a("SMARTENER_DETECTED_SMTHING %o", e), e.state === d.STATE_FIRST_TOGGLE_DETECTED ? (a("DEVICE_TOGGLE_DETECTED"), void s(f)) : e.state === d.STATE_DEVICE_SMARTENED ? (a("DEVICE_SMARTENED"), i(), void l.smartifyStupidDevice({
            deviceKey: e.deviceKey,
            cecAddress: e.cecAddress,
            hypotheticalPowerState: e.powerState
        }).then(e => {
            c.event("Device smartener enabled for " + e.name), s(E)
        }).catch(e => {
            c.error("SMARTIFY_FAILED", {
                error: e.message
            }), s(y)
        })) : void c.warn("INVALID_SMARTENER_NOTIFICATION", {
            smartenerNotification: e
        })
    }

    function o() {
        c.warn("SMARTENER_FAILED"), c.event("Device smartener failed to detect a device."), i(), s(y)
    }

    function i() {
        a("stopSmartenerLearnMode"), d.stopInstance()
    }

    function s(e) {
        u.send({
            type: m,
            data: e
        })
    }
    const a = r(6)("cp6:lib:smartener:facade"),
        c = r(0)("DeviceSmartenerFacade"),
        u = r(10),
        d = r(374),
        l = r(376),
        p = r(20).deviceAdapter,
        h = r(2).devicesmartener,
        g = "NEEO_CEC_POWERSTATE",
        m = "neeo:smartener",
        f = "devicetoggledetected",
        E = "devicesmartified",
        y = "deviceerror";
    e.exports = {
        startNotificationListener: function() {
            a("startNotificationListener", g), u.on(g, e => (function(e) {
                if (!e) return !1;
                try {
                    d.processCecPowerNotification(e)
                } catch (e) {
                    i(), c.error("SMARTENER_FAILED_PROCESS_MESSAGE", {
                        error: e.message
                    })
                }
                const t = e.uniqueDeviceId,
                    r = e.value;
                return l.getDeviceByCecAddress(t).then(e => e ? (a("update device %s, new power state %s", e.name, r), void(!0 === r ? (c.event("Smartener detected power on for " + e.name), e.markAsOn()) : (c.event("Smartener detected power off for " + e.name), e.markAsOff()))) : void a("NO_CEC_DEVICE_WITH_ENABLED_SMARTENER_MODE_FOUND", t))
            })(e))
        },
        startSmartenerLearnMode: function(e) {
            return i(), a("startSmartenerLearnMode:", e), l.getDeviceByKey(e).then(e => {
                if (!e) throw new Error("DEVICE_NOT_FOUND");
                return d.buildNewInstance(e, o, n), a("TRIGGER_POWER_SCAN", h.learnModeDurationMs), p.rpc("cec", "powerscan", h.learnModeDurationMs)
            }).catch(e => {
                s(y), c.error("START_SMARTENER_MODE_FAILED", {
                    error: e.message
                })
            })
        },
        stopSmartenerLearnMode: i
    }
}, function(e) {// Function 162 exports = require("coap")
    e.exports = require("coap")
}, function(e) {// Function 163 exports = require("jsontoxml")
    e.exports = require("jsontoxml")
}, function(e) {// Function 164 exports = require("mustache")
    e.exports = require("mustache")
}, function(e, t, r) {// Function 165 class extending for slidescreen
    "use strict";
    const n = r(16),
        o = r(65);
    class i extends o {
        constructor(e = []) {
            super(e)
        }
        static build(e) {
            return new i(e)
        }
        addTemplate(e, t) {
            if (n.isUndefined(t.screenId)) throw new Error("Missing required property screenId for SlideScreen");
            if (!n.isFunction(e)) throw new Error("SlideScreen templates must be functions");
            return super.addTemplate(e, t), this
        }
        render(e = {}) {
            return this.stack.forEach((e, t) => this._addNavigationViewData(e.viewdata, t)), super.render(e)
        }
        _addNavigationViewData(e, t) {
            e.isFirst = 0 === t, e.collection = t + 1 + "/" + this.stack.length, e.prevScreenId = this._screenBefore(t).viewdata.screenId, e.nextScreenId = this._screenAfter(t).viewdata.screenId
        }
        _screenAfter(e) {
            return this.stack[(e + 1) % this.stack.length]
        }
        _screenBefore(e) {
            return this.stack[0 > e - 1 ? this.stack.length - 1 : e - 1]
        }
    }
    e.exports = i
}, function(e, t, r) {// Function 166 getContentLayout
    "use strict";
    AllFunctions(0)("Function 166").verbose("")
    const n = r(16),
        o = r(53),
        i = r(28),
        s = r(7);
    e.exports = function(e, t) {
        const r = {
            style: i.getContentLayout(),
            children: t.map(e => (e.style = n.clone(s.content.element), e))
        };
        return o(r), {
            [e]: r.children,
            layout: r.layout
        }
    }
}, function(e, t, r) {// Function 167 functions addScreen, addScreens, build, getStack, setKeyboardMapping, overridePowerKeyboardMapping, buildNewNavigationStack
    "use strict";
    AllFunctions(0)("Function 167").verbose("addScreen, build, getStack,setKeyboardMapping,overridePowerkeyboardMapping, buildNavigationStack")
    const n = r(411),
        o = r(106),
        i = function(e) {
            if (!e) throw new Error("missing id");
            this.stack = [], this.id = e, this.subpageId = 100, this.keyboardMapping = void 0, this.customPowerMapping = void 0
        };
    i.prototype.addScreen = function(e, t) {
        if (!e) throw new Error("DynamicScreensFactory: missing template");
        let r = this.id;
        0 < this.stack.length && (r = r + "-" + this.subpageId++);
        const n = "ChangeScreen('" + r + "',-1)";
        t ? this.stack.push({
            id: r,
            template: e,
            action: n,
            viewdata: t
        }) : this.stack.push({
            id: r,
            template: e,
            action: n
        })
    }, i.prototype.addScreens = function(e) {
        if (!Array.isArray(e)) throw new Error("missing viewArray");
        e.forEach(e => {
            this.addScreen(e.template, e.viewdata)
        })
    }, i.prototype.build = function() {
        return new n(this.stack, this.keyboardMapping, this.customPowerMapping)
    }, i.prototype.getStack = function() {
        return this.stack
    }, i.prototype.setKeyboardMapping = function(e) {
        this.keyboardMapping = o.getTemplate(e)
    }, i.prototype.overridePowerKeyboardMapping = function(e) {
        e && (this.customPowerMapping = e)
    }, t.buildNewNavigationStack = function(e) {
        return new i(e)
    }
}, function(e, t, r) {// Function 168 buildNewWidgetStack
    "use strict";
    AllFunctions(0)("Function 168").verbose("")

    function n(e, t) {
        try {
            return a.render(e, t)
        } catch (r) {
            i.error("TR2_GUI_WIDGET_RENDERING_FAILED", {
                widget: e.name,
                message: r.message,
                type: t.type,
                error: r.stack
            })
        }
    }
    const o = r(16),
        i = r(0)("tr2-slide"),
        s = r(107),
        a = r(169);
    e.exports = function(e, t) {
        if (!Array.isArray(e)) throw new Error("SLIDE_IS_NOT_ARRAY");
        const r = s.buildNewWidgetStack(),
            i = [];
        return e.map(e => n(e, t)).filter(o.isObjectLike).forEach(e => {
            return o.isArray(e.slides) ? void i.push(e.slides) : void r.addWidget(e.template, e.height, e.width, e.viewdata)
        }), r.containsWidgets() && i.push(r.renderScreens(t)), o.flatten(i)
    }
}, function(e, t, r) {// Function 169 isWidgetSupportedAndNotKeymapped
    "use strict";
    AllFunctions(0)("Function 169").verbose("")

    function n(e, t) {
        const r = function(e) {
            const t = Object.assign({}, e);
            return t.name = void 0, t
        }(t);
        return {
            template: e.template,
            height: e.height,
            viewdata: r
        }
    }

    function o(e, t) {
        const r = v[e.name];
        if (a(r)) throw new Error("tr2-widgets: Unknown widget:" + e.name);
        const o = _.buildWidgetData(e, t.projectRepo),
            i = s(t, o);
        return r.isDynamic ? r.renderFunction(e, i) : r.isMultiSlide ? {
            slides: r.renderFunction(i, e, r)
        } : n(r, _.convertWidgetData(e))
    }

    function i(e) {
        return c(v[e.name])
    }
    const s = r(48),
        a = r(77),
        c = r(117),
        u = r(47),
        d = r(4),
        l = r(28),
        p = r(415),
        h = r(416),
        g = r(417),
        m = r(418),
        f = r(421),
        E = r(170),
        y = r(423),
        _ = r(424),
        v = {
            "neeo.compatibility.nonautomatable-device": {
                template: d("gui/scenario/widgets/compatibility/nonautomatable-device.xml"),
                height: 670
            },
            "neeo.compatibility.nonautomatable-device-input": {
                template: d("gui/scenario/widgets/compatibility/nonautomatable-device-input.xml"),
                height: 670
            },
            "neeo.compatibility.no-commandsets-available": {
                template: d("gui/scenario/widgets/compatibility/no-commandsets-available.xml"),
                height: 670
            },
            "neeo.compatibility.manual-power-off": {
                renderFunction: p.renderPowerOff,
                isDynamic: !0
            },
            "neeo.default.button-set.numpad": {
                template: d("gui/scenario/widgets/default/button-set.numpad.xml"),
                height: 400
            },
            "neeo.default.button-set.colors": {
                template: d("gui/scenario/widgets/default/button-set.colors.xml"),
                height: 130
            },
            "neeo.default.button-set.transport": {
                template: d("gui/scenario/widgets/default/button-set.transport.xml"),
                height: 130
            },
            "neeo.default.button-set.transport-toggle": {
                template: d("gui/scenario/widgets/default/button-set.transport-toggle.xml"),
                height: 130
            },
            "neeo.default.button-set.transport-no-stop": {
                template: d("gui/scenario/widgets/default/button-set.transport-no-stop.xml"),
                height: 130
            },
            "neeo.default.button-set.transport-scan": {
                template: d("gui/scenario/widgets/default/button-set.transport-scan.xml"),
                height: 130
            },
            "neeo.default.button-set.transport-scan-legacy": {
                template: d("gui/scenario/widgets/default/button-set.transport-scan-legacy.xml"),
                height: 130
            },
            "neeo.default.button-set.transport-search": {
                template: d("gui/scenario/widgets/default/button-set.transport-search.xml"),
                height: 130
            },
            "neeo.default.button-set.transport-skip": {
                template: d("gui/scenario/widgets/default/button-set.transport-skip.xml"),
                height: 150
            },
            "neeo.default.button-set.record": {
                template: d("gui/scenario/widgets/default/button-set.record.xml"),
                height: 130
            },
            "neeo.default.button-set.sky": {
                template: d("gui/scenario/widgets/default/button-set.sky.xml"),
                height: 300
            },
            "neeo.default.button-set.guide-info": {
                template: d("gui/scenario/widgets/default/button-set.guide-info.xml"),
                height: 130
            },
            "neeo.default.button-set.language": {
                template: d("gui/scenario/widgets/default/button-set.language.xml"),
                height: 130
            },
            "neeo.default.button-set.hvac.mode": {
                template: d("gui/scenario/widgets/default/button-set.hvac.mode.xml"),
                height: 130
            },
            "neeo.default.button-set.hvac.control": {
                template: d("gui/scenario/widgets/default/button-set.hvac.control.xml"),
                height: 130
            },
            "neeo.default.button-set.hvac.fan-speed-step": {
                template: d("gui/scenario/widgets/default/button-set.zapper-hvac-fan-speed-step.xml"),
                height: 130
            },
            "neeo.default.button-set.hvac.temp": {
                template: d("gui/scenario/widgets/default/button-set.zapper-hvac-temp.xml"),
                height: 130
            },
            "neeo.default.button-set.zapper": {
                template: d("gui/scenario/widgets/default/button-set.zapper.xml"),
                height: 130
            },
            "neeo.default.button-set.zapper-presets": {
                template: d("gui/scenario/widgets/default/button-set.zapper-presets.xml"),
                height: 130
            },
            "neeo.default.button-set.zapper-tuning": {
                template: d("gui/scenario/widgets/default/button-set.zapper-tuning.xml"),
                height: 130
            },
            "neeo.default.button-set.menu": {
                template: d("gui/scenario/widgets/default/button-set.menu.xml"),
                height: 130
            },
            "neeo.default.button-set.menu-and-back": {
                template: d("gui/scenario/widgets/default/button-set.menu-and-back.xml"),
                height: 130
            },
            "neeo.default.button-set.menu-disc-and-back": {
                template: d("gui/scenario/widgets/default/button-set.menu-disc-and-back.xml"),
                height: 130
            },
            "neeo.default.button-set.controlpad": {
                template: d("gui/scenario/widgets/default/button-set.controlpad.xml"),
                height: 480
            },
            "neeo.default.button-set.controlpad-legacy": {
                template: d("gui/scenario/widgets/default/button-set.controlpad-legacy.xml"),
                height: 480
            },
            "neeo.default.button-set.eject": {
                template: d("gui/scenario/widgets/default/button-set.eject.xml"),
                height: 130
            },
            "neeo.default.button-set.open-close": {
                template: d("gui/scenario/widgets/default/button-set.open-close.xml"),
                height: 130
            },
            "neeo.default.inputs": {
                renderFunction: g.renderInputs,
                isMultiSlide: !0,
                style: l.getInputLayout()
            },
            "neeo.default.inputs-generic": {
                renderFunction: g.renderInputs,
                isMultiSlide: !0,
                style: l.getInputLayout()
            },
            "neeo.default.inputs-hdmiswitch": {
                renderFunction: g.renderInputs,
                isMultiSlide: !0,
                style: l.getInputLayout()
            },
            "neeo.default.lights-slider": {
                renderFunction: E.renderLight,
                height: 150,
                isDynamic: !0
            },
            "neeo.default.favorites": {
                renderFunction: h.renderFavorites,
                isMultiSlide: !0
            },
            "neeo.default.shortcuts": {
                renderFunction: m.renderShortcuts,
                isMultiSlide: !0
            },
            "neeo.default.lights": {
                renderFunction: f.renderLights,
                isMultiSlide: !0
            },
            "neeo.default.button-set.grid.apps": {
                renderFunction: y.render,
                isDynamic: !0
            }
        };
    e.exports.render = o, e.exports.isWidgetSupported = i, e.exports.isWidgetSupportedAndNotKeymapped = function(e) {
        if (!i(e)) return !1;
        return !0 !== u(e, "data.widget.options.skipSlideIfHardwareKeypad")
    }, m.setWidgetRender(o), m.setWidgetFilter(i), m.setWidgetGetter(function(e) {
        return v[e]
    })
}, function(e, t, r) {// Function 170 gui/scenario/widgets/default/light.xml
    "use strict";
    AllFunctions(0)("Function 170").verbose("gui/scenario/widgets_default/light.xml")

    function n(e) {
        const t = e && e.name && e.name.toLowerCase();
        return u.some(e => e.test(t))
    }
    const o = r(422),
        i = r(53),
        s = r(28),
        a = r(13),
        c = r(4)("gui/scenario/widgets/default/light.xml"),
        u = [/^brightness/, /^set_multilevelswitch/];
    e.exports = {
        getLightViewData: function(e, t, r, n, o) {
            const i = {
                deviceId: e.getKey(),
                label: {
                    name: "",
                    style: {
                        width: n.screen.width,
                        height: n.lightStyle.switch.labelHeight,
                        marginTop: n.lightStyle.switch.labelMarginTop
                    }
                },
                deviceNameLabel: {
                    name: e.getName().toUpperCase(),
                    style: {
                        width: n.screen.width,
                        height: n.lightStyle.switch.labelHeight,
                        marginTop: n.lightStyle.switch.deviceNameLabelMarginTop
                    }
                },
                style: {
                    padding: 0,
                    margin: 0,
                    width: n.screen.width,
                    heigth: n.lightStyle.elementHeight,
                    justifyContent: "center",
                    alignContent: "flex-start",
                    alignItems: "flex-start",
                    flexDirection: "row",
                    flexWrap: "wrap"
                },
                children: []
            };
            return t && (i.onOff = {
                id: t.sensor.getKey(),
                actionUrl: a.getSwitchUrlRoomKey(e, t),
                style: Object.assign({}, n.lightStyle.switch, {
                    alignItems: "center",
                    justifyContent: "center",
                    height: n.lightStyle.switch.imageHeight,
                    width: r ? n.lightStyle.switch.widthWithDimmer : n.lightStyle.switch.imageWidth,
                    marginTop: r ? 0 : n.lightStyle.switch.marginTop
                })
            }, i.label.name = o ? o.toUpperCase() : t.label.toUpperCase(), i.children = [...i.children, i.onOff]), r && (i.slider = {
                id: r.sensor.getKey(),
                actionUrl: a.getSliderUrlRoomKey(e, r),
                min: r.getMinValue(),
                max: r.getMaxValue(),
                value: r.getMinValue(),
                style: {
                    width: n.lightStyle.elementWidth - (t ? n.lightStyle.switch.imageWidth : 0),
                    height: n.lightStyle.slider.height,
                    marginTop: 20 - n.lightStyle.slider.height,
                    marginBottom: 10
                }
            }, i.label.name = o ? o.toUpperCase() : r.label.toUpperCase(), i.children = [...i.children, i.slider]), i.children = [...i.children, i.label, i.deviceNameLabel], i
        },
        styleWithFlexbox: function(e) {
            const t = {
                style: s.getLightLayout(),
                children: [e]
            };
            return i(t), delete t.children[0].children, t.children[0]
        },
        renderLight: function(t, r) {
            if (!r) throw new Error("inputs: missing globals");
            const i = r.getDevice(t.deviceKey),
                s = {
                    onOff: o(i.getSwitches()),
                    slider: i.getSliders().find(n)
                },
                a = e.exports.getLightViewData(i, s.onOff, s.slider, r, t.label),
                u = e.exports.styleWithFlexbox(a);
            return {
                template: c,
                height: r.lightStyle.elementHeight,
                viewdata: u
            }
        },
        isBrightnessSlider: n
    }
}, function(e, t, r) {// Function 171 a lot of get-functions, pulling the data from subordinate fiunctions
    "use strict";
    AllFunctions(0)("Function 171").verbose("")

    function n(e) {
        const t = {};
        return e.getMacros().forEach(e => {
            t[e.name] = !0
        }), t
    }
    const o = r(51),
        i = r(25),
        s = r(68),
        a = r(12),
        c = r(76),
        u = r(59),
        d = r(42),
        l = r(22).compareByWeight,
        p = r(8),
        h = r(36),
        g = r(21),
        m = r(0)("Tr2Repo"),
        f = r(172);
    let E = !1,
        y = !1;
    e.exports.convert = function(e) {
        AllFunctions(0)("Function 171").verbose("Convert")
        return {
            getImageUrlPath: function(e, t) {
                if (!t || !t.width || !t.height) throw Error("getImageUrlPath: options invalid");
                return s.getUrlPath(e, {
                    resize: !0,
                    width: t.width,
                    height: t.height
                })
            },
            getLazyCoverImageUrlPath: function(e, t) {
                if (!t || !t.width || !t.height) throw Error("getLazyCoverImageUrlPath: options invalid");
                return s.getLazyUrlPath(e, {
                    resize: !0,
                    width: t.width,
                    height: t.height,
                    imageFormat: t.imageFormat ? t.imageFormat : "lz4"
                })
            },
            getSystemInformation: function() {
                return {
                    licenseDescriptionRemote: a.getRemoteLicense().toUpperCase(),
                    cp6Firmware: a.version(),
                    wifiregion: a.getWifiRegulationContinent(),
                    brainVersion: a.version().version,
                    brainHostname: a.hostname(),
                    brainLanIp: a.getLanAddress(),
                    brainWlanIp: a.getWlanAddress()
                }
            },
            getVersion: function() {
                return {
                    tr2version: a.getTr2Version(),
                    projectId: e.getLastChangeTs()
                }
            },
            isFirmwareUpdateAvailable: function() {
                return c.updateAvailable()
            },
            getFirmwareVersions: function() {
                return {
                    currentVersion: c.version,
                    newVersion: c.newVersion
                }
            },
            isNeeoLinkEnabled: function() {
                return d.loadTR2CommunicationVia6lowpan().then(e => !!e && !0 === e.neeolinkenabled)
            },
            getVisibleRooms: function() {
                return e.getRooms(e => 0 < this.getVisibleRoomRecipes(e).length).sort((e, t) => e.name.localeCompare(t.name))
            },
            getVisibleRoomRecipes: function(e) {
                return e.getRecipes(e => e.isVisibleInGui() || e.isVisibleInGuiAsUnconfigured())
            },
            getVisibleRootScreenIdDependingOnRooms: function(e) {
                const t = this.getVisibleRooms();
                return 1 === t.length ? t[0].key : e
            },
            getScenarioByKey: function(t) {
                return e.getScenarios(function(e) {
                    return e.key === t
                })[0]
            },
            getScenarioKeyOfRecipeControlstep: function(e) {
                if (!e) throw new Error("getScenarioKeyOfRecipeControlstep: recipe undefined");
                if (!e.isLaunchRecipe()) throw new Error("getScenarioKeyOfRecipeControlstep: only launch recipes are supported");
                const t = e.getStepsByType(o.STEP_TYPE_CONTROLS);
                if (t && 0 < t.length) return t[0].scenarioKey
            },
            getPowerOffRecipeFromScenario: function(e) {
                if (!e) throw Error("getPowerOffRecipeFromScenario: scenario undefined");
                return e.getRecipe(o.TYPE_POWEROFF)
            },
            getLaunchRecipeFromScenario: function(e) {
                if (!e) throw Error("getLaunchRecipeFromScenario: scenario undefined");
                return e.getRecipe(o.TYPE_LAUNCH)
            },
            getViewbuilderStructureFromScenario: function(t) {
                if (!t) throw Error("getViewbuilderStructureFromScenario: scenario undefined");
                const r = f.convert(e);
                return u.getScenarioViewStructure(t, r)
            },
            getVisibleScenarios: function() {
                const t = e.getRecipes().reduce((e, t) => {
                    if (!t.enabled) return e;
                    const r = t.steps.find(e => e.type === o.STEP_TYPE_CONTROLS);
                    return r && e.push(r.scenarioKey), e
                }, []);
                return e.getScenarios(e => {
                    const r = e.getRecipe(o.TYPE_LAUNCH),
                        n = t.includes(e.key);
                    return r && n
                })
            },
            getActiveScenarios: function() {
                return e.getActiveScenarios()
            },
            getScenarioByDeviceKey: function(t) {
                return e.getScenarios().find(e => e.mainDeviceKey === t)
            },
            getScenarioByDirectoryKey: function(t) {
                return e.getScenarios().find(e => e.getMainDevice().getDirectoryByKey(t))
            },
            getDeviceByKey: function(t) {
                //AllFunctions(0)("Function 171").verbose("getDeviceByKey",t)
                return e.getDeviceByKey(t)
            },
            getDevicesByAdapterDeviceIds: function(t) {
                return e.getDevices(e => t.includes(e.adapterDeviceId))
            },
            getDirectoryByKey: function(t) {
                return e.getDirectoryByKey(t)
            },
            getAllDirectories: function() {
                return e.getDirectories()
            },
            getListOfMaindeviceMacroNames: function(e) {
                if (!e) throw Error("getListOfMaindeviceMacroNames: scenario undefined");
                return n(e.getMainDevice())
            },
            getListOfDeviceMacroNames: function(t) {
                if (!t) throw Error("getListOfDeviceMacroNames: deviceKey undefined");
                return n(e.getDeviceByKey(t))
            },
            getInputViewData: function(e) {
                AllFunctions(0)("Function 171").verbose("getInputViewData")
                if (!e) throw Error("getInputViewData: scenario undefined");
                return e.getMainDevice().getMacros().map(e => ({
                    name: e.name,
                    componentType: e.componentType
                }))
            },
            getManualPowerOffDevices: function(e) {
                const t = e.getDevices(e => {
                    const t = e.hasCapability(g.MACRO_ONOFF_MISSING),
                        r = e.getMacroByName("POWER TOGGLE"),
                        n = !e.hasCapability(g.NEEO_DEVICE_SMARTIFIED_POWER_MODE);
                    return t && r && n
                });
                return t.length > 6 ? (m.warn("MAX_MANUAL_POWEROFF_REACHED", {
                    stupidDeviceCount: t.length
                }), t.slice(0, 6)) : t
            },
            hasPowerInfoDevices: function(e) {
                const t = this.getPowerInfoDevices(e);
                return t && 0 < t.length
            },
            getPowerInfoDevices: function(e) {
                return e.getDevices(e => h.VIRTUAL_POWER_MODES.includes(e.powerMode))
            },
            triggerAction: function(t, r, n, o) {
                return e.getRoomByKey(t).getScenarioByKey(r).triggerAction(n, o)
            },
            getTr2LogSettings: function() {
                return {
                    uartLog: E,
                    userActionLog: y
                }
            },
            disableTr2Log: function() {
                E = !1, y = !1
            },
            enableTr2UartLog: function() {
                E = !0
            },
            enableTr2UserActionLog: function() {
                y = !0
            },
            compareByWeight: l,
            RECIPE_TYPE_LAUNCH: o.TYPE_LAUNCH,
            RECIPE_TYPE_POWEROFF: o.TYPE_POWEROFF,
            NOTIFICATION_ACTIVE_NOW_CHANGED: i.NOTIFICATION_ACTIVE_NOW_CHANGED,
            NOTIFICATION_PUSH_ACTION: i.NOTIFICATION_PUSH_ACTION,
            SHORTCUT_TYPE_GAP: p.COMPONENT_GAP_TYPE_NAME,
            SHORTCUT_TYPE_BUTTON: p.COMPONENT_MACRO_TYPE_NAME,
            SHORTCUT_TYPE_SLIDER: p.COMPONENT_SLIDER_TYPE_NAME,
            SHORTCUT_TYPE_SWITCH: p.COMPONENT_SWITCH_TYPE_NAME,
            SHORTCUT_TYPE_WIDGET: p.COMPONENT_WIDGET_TYPE_NAME,
            SHORTCUT_TYPE_TEXTLABEL: p.COMPONENT_TEXTLABEL_TYPE_NAME,
            SHORTCUT_TYPE_IMAGEURL: p.COMPONENT_IMAGEURL_TYPE_NAME,
            SHORTCUT_TYPE_DIRECTORY: p.COMPONENT_DIRECTORY_TYPE_NAME
        }
    }
}, function(e, t, r) {// Function 172 some get-functions, pulling the data from subordinate functions
    "use strict";
    AllFunctions(0)("Function 172").verbose("getDeviceByKey,getScenarioByDeviceKey,getPowerInfoDevices")
    const n = r(6)("cp6:lib:project:repo"),
        o = r(36);
    e.exports.convert = (e => {
        if (!e) throw new Error("Cannot create repo from invalid project");
        return {
            getDeviceByKey: t => {
                const r = e.getDeviceByKey(t);
                if (!r) throw n("DEVICE_NOT_FOUND", {
                    deviceKey: t
                }), new Error("DEVICE_NOT_FOUND", {
                    deviceKey: t
                });
                return r
            },
            getScenarioByKey: t => e.getScenarios().find(e => e.key === t),
            getScenarioByDeviceKey: t => e.getScenarios().find(e => e.mainDeviceKey === t),
            getPowerInfoDevices: e => e.getDevices(e => o.VIRTUAL_POWER_MODES.includes(e.powerMode))
        }
    })
}, function(e, t, r) {// Function 173 tr2:xmlgenerate
    "use strict";
    AllFunctions(0)("Function 173").verbose("tr2:xmlgenerate")

    function n(e, t) {

        const r = c.prepareViewData(e, t),
            n = Object.assign(s, r),
            u = a(n),
            d = i.transliterationToAscii(u);
        return o("TR2_LIST_XML_SIZE", d.length), d
    }
    const o = r(6)("cp6:lib:tr2:xmlgenerate:list"),
        i = r(64),
        s = r(7),
        a = r(4)("list.tpl.xml"),
        c = r(454);
    e.exports = {
        render: n,
        renderError: function(e) {
            return n(c.prepareViewData({
                items: [{
                    title: e,
                    isHeader: !0
                }],
                totalMatchingItems: 1
            }))
        },
        renderErrorWithReload: function(e, t = "", r = {}) {
            const o = Object.assign(r, {
                    items: [{
                        title: e,
                        isHeader: !0
                    }, {
                        title: "Press here to retry",
                        label: t,
                        icon: "Reload",
                        action: "ReloadList()"
                    }],
                    totalMatchingItems: 2
                }),
                i = {
                    key: r.directoryKey
                };
            return n(c.prepareViewData(o, i), i)
        }
    }
}, function(e, t, r) {// Function 174 TR2 directory-related functions
    "use strict";
    AllFunctions(0)("Function 174").verbose("TR2 directory-relted functiuons")

    function n(e, t) {
AllFunctions(0)("Function 174").verbose("checking uiAction e.uiAction",e);
        switch (e.uiAction) {
            case l:
                return ";ReloadList(0)";
            case p:
                return `;${o({directoryUrl:`${d}/${t}/browse`,title:"",history:[],offset:0,limit:64})}`;
            case h:
                return ";ListBack('0',-1)";
            case g:
                return ";PreviousScreen(-1)";
            default:
                return ""
        }
    }

    function o(e) {
        const t = i(e);
        return `BrowseDirectory('${e.directoryUrl}', '${t}')`
    }

    function i(e) {
        return Buffer.from(JSON.stringify(e)).toString("base64")
    }
    const s = r(175),
        a = r(13),
        c = r(68),
        u = /^LOCAL\:([A-Za-z\-\_]+)$/,
        d = "/projects/home/tr2/directory",
        l = "reload",
        p = "goToRoot",
        h = "goBack",
        g = "close";
    e.exports = {
        jsonToBase64: i,
        getTriggerAction: function(e, t = {}, r = "actionIdentifier") {
            AllFunctions(0)("Function 174").verbose("getTriggerAction e=",e);
            let o = "";
            AllFunctions(0)("Function 174").verbose("getTriggerAction test I = if (e && e[r])",(e && e[r]));
            if (e && e[r] ? o = e[r] : Array.isArray(e) && 0 < e.length && e[0] && e[0][r] && (o = e[0][r]), !o) return "";
            AllFunctions(0)("Function 174").verbose("getTriggerAction exec I n(e,t.directoryKey)",n(e,t.directoryKey)) 
            const i = encodeURIComponent(o);
            return `TriggerAction('${`${a.getDirectoryActionUrl(t.directoryKey)}/?actionIdentifier=${i}`}')${n(e,t.directoryKey)}`
        },
        getImage: function(e, t = 80) {
            AllFunctions(0)("Function 174").verbose("getImage");
            const r = s.isWebUri(e.thumbnailUri) || u.test(e.thumbnailUri);
            if (!e.thumbnailUri || !r) return "";
            const n = c.getLazyUrlPath(e.thumbnailUri, {
                width: t,
                height: t,
                resize: !0,
                imageFormat: "lz4"
            });
            return c.hasImageContent(n) ? n : ""
        },
        getBrowseAction: function(e, t = {}) {
            AllFunctions(0)("Function 174").verbose("getBrowseAction: function(e, t = {}");
            if (!e) return "";
            const r = a.getDirectoryBrowseUrl(t.directoryKey);
            return o({
                directoryUrl: r,
                browseIdentifier: encodeURIComponent(e.browseIdentifier || ""),
                title: encodeURIComponent(e.title || ""),
                history: (t.history || []).concat({
                    directoryUrl: r,
                    title: t.title || "",
                    browseIdentifier: t.browseIdentifier || ""
                })
            })
        },
        getParentBrowseAction: function(e = {}) {
            AllFunctions(0)("Function 174").verbose("getParentBrowseAction: function(e, {}");
            const t = e.history || [];
            if (!t.length) return "";
            const r = t[t.length - 1],
                n = t.slice(0, t.length - 1);
            return o({
                directoryUrl: r.directoryUrl,
                browseIdentifier: r.browseIdentifier || "",
                title: r.title || "",
                history: n
            })
        },
        getPaginationAction: function(e, t = {}) {
            AllFunctions(0)("Function 174").verbose("getPaginationAction:")
            const r = t.history || [];
            return o({
                directoryUrl: a.getDirectoryBrowseUrl(t.directoryKey),
                browseIdentifier: t.browseIdentifier,
                title: t.title,
                history: r,
                offset: e.offset,
                limit: e.limit
            })
        }
    }
}, function(e) {// Function 175 exports = require("valid-url")
    e.exports = require("valid-url")
}, function(e, t, r) {// Function 176 directory-related functions
    "use strict";
    AllFunctions(0)("CPCC Function 176").verbose("")
    function n(e) {
        const t = o(e);
        return `BrowseDirectory('${e.directoryUrl}', '${t}')`
    }

    function o(e) {
        return Buffer.from(JSON.stringify(e)).toString("base64")
    }
    const i = r(175),
        s = r(13),
        a = r(66),
        c = r(68),
        u = /^LOCAL\:([A-Za-z\-\_]+)$/;
    e.exports = {
        jsonToBase64: o,
        getTriggerAction: function(e, t = "actionUri") {
            let r = "";
            return e.data && e.data[t] ? r = e.data[t] : Array.isArray(e) && 0 < e.length && e[0].data && e[0].data[t] && (r = e[0].data[t]), `TriggerAction('${r}')`
        },
        getImage: function(e, t = 80) {
            AllFunctions(0)("Function 176").verbose("Getimage for directory",e.thumbnailUri)
            const r = i.isWebUri(e.thumbnailUri) || u.test(e.thumbnailUri);
            if (!e.thumbnailUri || !r) return "";
            const n = c.getLazyUrlPath(e.thumbnailUri, {
                width: t,
                height: t,
                resize: !0,
                imageFormat: "lz4"
            });
            return c.hasImageContent(n) ? n : ""
        },
        getInfoAction: function(e) {
            const t = e.itemInfo || "";
            AllFunctions(0)("Function 176").verbose("Popup info item",t)
            return `ShowPopup('message','${a.getTr2FunctionText(t)}')`
        },
        getBrowseAction: function(e, t) {
            if (!e.data) return "";
            const r = e.data.directoryKey;
            return n({
                directoryUrl: s.getDirectoryBrowseUrl(r),
                browseUri: encodeURIComponent(e.data.browseUri || ""),
                title: encodeURIComponent(e.title || ""),
                history: (t.history || []).concat({
                    directoryUrl: t.directoryUrl,
                    title: t.title || "",
                    browseUri: t.browseUri || ""
                })
            })
        },
        getParentBrowseAction: function(e = {}) {
            const t = e.history || [];
            if (!t.length) return "";
            const r = t[t.length - 1],
                o = t.slice(0, t.length - 1);
            return n({
                directoryUrl: r.directoryUrl,
                browseUri: r.browseUri || "",
                title: r.title || "",
                history: o
            })
        },
        getPaginationAction: function(e, t) {
            AllFunctions(0)("Function 176").verbose("getPaginationAction")

            const r = t.history || [];
            return n({
                directoryUrl: t.directoryUrl,
                browseUri: t.browseUri,
                title: t.title,
                history: r,
                offset: e.offset,
                limit: e.limit
            })
        }
    }
}, function(e) {// Function 177 exports = require("body-parser")
    e.exports = require("body-parser")
}, function(e, t, r) {// Function 178 accountMiddleware
    "use strict";
    AllFunctions(0)("Function 174").verbose("getPaginationAction")
    const n = r(24),
        o = r(0)("accountMiddleware");
    e.exports.requireLoggedInAccountMiddleWare = ((e, t, r) => {
        n.isLoggedIn().then(e => e ? (r(), null) : (o.debug("account is not logged in => status 403."), t.status(403).send())).catch(r)
    })
}, function(e, t, r) {// Function 179  Router: routes.scenario
    "use strict";

    function n(e, t) {
        if (!e.job) throw new Error("no job to send!");
        t.json(e.job)
    }
    const o = r(5).Router(),
        i = r(85),
        s = r(9),
        a = r(15),
        c = r(59),
        u = r(477),
        d = r(172),
        l = r(0)("routes.scenario");
    i.use("/:room_key/scenarios", o), o.param("scenario_key", function(e, t, r, n) {
        e.scenario = e.room.getScenarioByKey(n), e.scenario ? r() : (l.error("SCENARIO_BY_KEY_NOT_FOUND", n), r(new Error(s(null, "notfound", "scenario", n).message)))
    }), o.param("device_key", function(e, t, r, n) {
        e.device = e.scenario.getDeviceByKey(n), e.device ? r() : (l.error("DEVICE_BY_KEY_NOT_FOUND", n), r(new Error(s(null, "notfound", "device", n).message)))
    }), o.get("/", function(e, t) {
        t.json(e.room.getScenarios())
    }), o.get("/:scenario_key", function(e, t) {
        t.json(e.scenario)
    }), o.get("/:scenario_key/viewstructure", function(e, t) {
        const r = d.convert(e.project),
            n = c.getScenarioViewStructure(e.scenario, r);
        t.json(n)
    }), o.get("/:scenario_key/slides", function(e, t) {
        const r = c.getScenarioSlides(e.scenario, e.project);
        t.json(r)
    }), o.post("/:scenario_key/slides", function(e, t, r) {
        const n = e.body;
        e.scenario.setSlidePreferences(n).then(() => e.project.save()).then(() => t.json({
            success: !0
        })).catch(r)
    }), o.get("/:scenario_key/launch", function(e, t, r) {
        e.job = e.scenario.launch(e.project), r()
    }, n), o.get("/:scenario_key/poweroff", function(e, t, r) {
        e.job = e.scenario.powerOff(e.project), r()
    }, n), o.get("/:scenario_key/recipecontrolstep", function(e, t, r) {
        e.job = e.scenario.getRecipeControlStep(e.project), r()
    }, n), o.get("/:scenario_key/trigger", function(e, t, r) {
        const n = a.getRequestParameter(e, "name", {
                presence: !0
            }),
            o = {
                repeat: /true/.test(e.query.repeat),
                value: e.query.value,
                deviceKey: e.query.deviceKey,
                generic: /true/.test(e.query.generic)
            };
        e.job = e.scenario.triggerAction(n, o), r()
    }, n), o.get("/:scenario_key/triggerByKey", function(e, t, r) {
        const n = a.getRequestParameter(e, "componentKey", {
                presence: !0
            }),
            o = {
                repeat: /true/.test(e.query.repeat),
                value: e.query.value,
                deviceKey: e.query.deviceKey,
                generic: /true/.test(e.query.generic)
            };
        e.job = e.scenario.triggerActionByKey(n, o), r()
    }, n), o.get("/:scenario_key/reset-devices", function(e, t) {
        e.scenario.resetDevices(), t.json({
            success: !0
        })
    }), o.put("/:scenario_key/markconfigured", function(e, t) {
        e.scenario.markConfigured(), t.json({
            success: !0
        })
    }), o.put("/:scenario_key/autoconfigure", function(e, t, r) {
        try {
            const r = u.tryAutomaticWiring(e.scenario);
            t.json({
                manualWiringSteps: r
            })
        } catch (e) {
            r(e.message)
        }
    }), o.put("/:scenario_key/unconfiguredsteps", function(e, t, r) {
        try {
            const r = u.getUnconfiguredSteps(e.scenario);
            t.json({
                manualWiringSteps: r
            })
        } catch (e) {
            r(e.message)
        }
    }), o.put("/:scenario_key/add-device", function(e, t, r) {
        const n = a.getRequestParameter(e, "deviceKey", {
                presence: !0
            }),
            o = e.room.getDeviceByKey(n);
        return o ? (e.scenario.addDevice(o), e.room.rebuildScenarioRecipes(), void t.json({
            success: !0
        })) : r(new Error(s(null, "notfound", "device", n).message))
    }), o.put("/:scenario_key/:device_key/inputmacro", function(e, t, r) {
        const n = a.getRequestParameter(e, "macroKey", {
                presence: !0
            }),
            o = e.device.getMacroByKey(n);
        return o ? (e.scenario.defineDeviceInput(e.device, o.getName()), void t.json({
            success: !0
        })) : r(new Error(s(null, "notfound", "macro", n).message))
    }), o.put("/:scenario_key/:device_key/inputsnotworking", function(e, t) {
        e.device.setInputsNotWorkingCapability(), t.json({
            success: !0
        })
    }), e.exports = o
}, function(e, t, r) {// Function 180 log to mobile or tr2
    "use strict";
    const n = r(3),
        o = r(0)("GUI_LOG"),
        i = r(491),
        s = r(492);
    e.exports = {
        log: function(e) {
            o.error("MOBILE_ERROR", e)
        },
        tr2: {
            info: function(e = "") {
                const t = i.transformLogMessages(e);
                if (t) {
                    t.statistics && 0 < t.statistics.length && (o.debug("TR2_STATISTICS", {
                        statistics: t.statistics
                    }), t.statistics.forEach(([e, t]) => {
                        1 > t || n.tr2.increaseCounter(e, t)
                    }));
                    const e = t.messages;
                    e && o.info("TR2_INFO", {
                        tr2Serial: t.tr2Serial,
                        messages: e
                    })
                }
            },
            error: function(e = "") {
                const t = i.transformLogMessages(e);
                t && o.error("TR2_ERROR", {
                    tr2Serial: t.tr2Serial,
                    messages: t.messages
                })
            },
            exception: function(e = "") {
                const t = i.transformExceptionLogMessages(e);
                t && o.error("TR2_EXCEPTION", {
                    tr2Serial: t.tr2Serial,
                    messages: t.messages
                })
            },
            logTr2UsageToStatistics: function(e) {
                s.log(e)
            }
        }
    }
}, function(e, t, r) {// Function 181 Server (express route); exceptionhandler
    "use strict";
    AllFunctions(0)("Function 181").verbose("")
    const n = process.uptime(),
        o = r(0)("server"),
        i = r(40),
        s = r(2),
        a = r(184),
        c = r(185),
        u = r(460),
        d = r(3),
        l = r(10),
        p = r(31),
        h = r(84),
        g = r(104);
    let m;
    c.initializeServices().then(function() {
        AllFunctions(0)("Function 181").verbose("initializeServices")
        return new Promise(e => {
            o.debug("INITIALIZING SERVER"), m = i.createServer(u);
            const t = a(m, s.socket);
            t.on("connection", e => {
                o.debug("socket.io connected"), d.increaseCounter("socketio-connect"), e.on("disconnect", () => {
                    d.increaseCounter("socketio-disconnect"), o.debug("socket.io disconnect")
                })
            }), l.socketioinit(t), m.setTimeout(s.cp6RouteTimeoutMs), m.listen(s.port, s.ip, () => {
                h.startTask(), o.debug("CP6_PROJECT_STARTED", {
                    hostIp: s.ip,
                    hostPort: s.port
                });
                const t = Math.floor(1e3 * (process.uptime() - n));
                o.info("STARTUP_COMPLETE", {
                    durationMs: t,
                    date: (new Date).toISOString()
                }), o.event("Brain started"), setTimeout(() => {
                    p._ledOn()
                }, 3e4), e()
            })
        })
    }).then(g.fetchTr2XmlFiles).catch(e => {
        o.error("FATAL_BOOTSTRAP_FAILED", {
            error: e.message
        }), process.exit(1)
    }), process.on("SIGTERM", () => {
        c.shutdownServices(), h.stopTask(), o.info("TERMINATE_EXPRESS_SERVER"), m && m.close(e => {
            o.debug("failed to terminate express server:", JSON.stringify(e))
        })
    }), process.on("SIGHUP", () => {
        o.info("SIGHUP_SIGNALED")
    }), process.once("SIGUSR2", () => {
        o.info("SIGHUP_SIGUSR2"), process.exit(1)
    }), process.on("uncaughtException", e => {console.log("Uncaught exception!!"),
        console.log(e),
        o.error("UNCAUGHT_EXCEPTION", {
            error: e.message,
            stack: void 0
        }), process.exit(1)
    }), process.on("unhandledRejection", e => {
        console.log("Unhandled rejection");
        console.log(e);
        o.error("UNHANDLED_REJECTION", {
            msg: e.message,
            stack: void 0
        })
    })
}, function(e) {// Function 182 exports = require("loggly")
    e.exports = require("loggly")
}, function(e) {// Function 183 Looks like store
    "use strict";
    e.exports = class {
        constructor(e) {
            this.entriesToStore = e, this.elements = [], this.position = 0
        }
        addEntry(e) {AllFunctions(0)("Function 183").verbose("addentry",e)
            this.elements[this.position++] = {
                timestamp: Date.now(),
                value: e
            }, this.position %= this.entriesToStore
        }
        clear() {AllFunctions(0)("Function 183").verbose("clear")
            this.elements = [], this.position = 0
        }
        getAll() {AllFunctions(0)("Function 183").verbose("getall")
            return this.elements.sort(function(e, t) {
                return e.timestamp > t.timestamp ? -1 : e.timestamp < t.timestamp ? 1 : 0
            })
        }
    }
}, function(e) {// Function 184 exports = require("socket.io")
    e.exports = require("socket.io")
}, function(e, t, r) {// Function 185 bootstrap start and stop functions (amongst others:for Jn5168)
    "use strict";

    function n() {
        let e;
        return I.debug("ACTIVATE_PROJECT"), R.get().then(t => {
            e = t;
            const r = O.migrate(e);
            return r && (I.debug("PROJECT_MIGRATED"), e = r), e.activate()
        }).then(() => {
            d.initialise(e), A.initialiseWithProject(e), _.startNotificationListener(e)
        }).catch(e => {
            I.warn("ERROR_ACTIVATE_PROJECT", e.message)
        })
    }

    function o() {
        AllFunctions(0)("Function 185").verbose("Init functions (Setfirmwareversion)")
        
        return u.setFirmwareVersion(_.version), I.debug("INIT_ACCOUNT"), u.selectNeeoCloudReplacementUrl  ().then(({
            discoverUrl: e,
            isPro: t
        }) => (AllFunctions(0)("Function 185").verbose("Init functions "),P.setCloudStatusUrl(e), P.updateLicense(t), u.autologin().catch(() => {}).finally(() => {
            k = setTimeout(() => (function(e) {
                I.debug("START_ACCOUNT_RELATED_SERVICES"), _.startChecker().catch(e => I.debug("ERROR_FIRMWARE_CHECK:", e.message)), y.startRegistration(e), p.startTask(), N.startTasks(), R.get().then(e => m.startTask(e)).catch(e => {
                    I.warn("AUTOUPDATE_INIT_FAILED", e.message)
                })
            })(e), U)
        }), null))
    }

    function i() {
        AllFunctions(0)("Function 185").verbose("bootstrap successful, now start notificatiopnlistener (f,h,S,w,E,v,L and D)")
        return I.debug("INIT_LISTENERS"), c.all([f.startNotificationListener(), h.startNotificationListener(), R.get().then(e => S.startNotificationListener(e)), w.startNotificationListener(), E.startNotificationListener(), v.startNotificationListener(), L.startNotificationListener(), D.startNotificationListener()]).catch(e => {
            I.warn("ERROR_INIT_LISTENERS", e.message)
        })
    }

    function s() {
        return I.debug("INIT_SERVICES"), c.all([S.initialise(), C.initialise(), l.initialise(), b.startTask(), P.initialise(), P.startTask()])
    }

    function a() {
        g.generateKey().catch(e => {
            I.debug("ERROR_GENERATE_KEY:", e.message)
        })
    }
    const c = r(1),
        u = r(24),
        d = r(20),
        l = r(90),
        p = r(157),
        h = r(158),
        g = r(71),
        m = r(91),
        f = r(72),
        E = r(45),
        y = r(344),
        _ = r(76),
        v = r(159),
        T = r(31),
        I = r(0)("bootstrap"),
        A = r(10),
        S = r(44),
        N = r(357),
        R = r(27),
        O = r(360),
        C = r(101),
        w = r(104),
        D = r(161),
        b = r(3),
        P = r(12),
        L = r(84),
        U = 3e4;
    let k;
    e.exports = {
        initializeServices: function() {
            AllFunctions(0)("Function 185").verbose("initializeServices")            
            return I.debug("BOOTSTRAP_START"), T.bootstrapJn5168().catch(e => {
                I.debug("JN_BOOTSTRAP_ERROR", e.message)
            }).then(i).then(n).then(s).then(o).then(a)
        },
        shutdownServices: function() {
            I.debug("TERMINATE_SERVICES"), clearTimeout(k), T.stopPolling()
        }
    }
}, function(e, t, r) {// Function 186 Higher level functions for account and brain itself 
    "use strict";
    AllFunctions(0)("Function 186").verbose("")

    function n() {
        return i.cloud.consumer
    }

    function o(e) {
        return h.save(e)
    }
    const i = r(2),
        s = r(54),
        a = r(1),
        c = r(0)("Account"),
        u = r(14),
        d = r(10),
        l = r(3),
        p = r(56),
        h = r(195),
        g = r(87),
        m = r(113),
        f = r(209),
        E = r(212),
        y = r(213),
        _ = r(115),
        noCloud = r(505),
        NoCloudc = r(227),
        NoCloudo = r(26),
        NoCloudi = r(123),
        NoClouds = r(226),
        NoClouda = r(41),
        NoCloudoo = r(1),  
        NoCloudsf = r(37),      
        NoCloudchksum = r(225),
        v = [/^no stored account data found$/, /^ENOENT:/],
        T = {
            errorHandler: () => {}
        },
        I = e.exports = function(e) {
            u(e, {
                duiroFormatVersion: {
                    presence: !0
                }
            }), c.debug("init", e), this.parseUser = null, this.duiroFormatVersion = e.duiroFormatVersion, this.firmwareVersion = "unknown", m.readAsync().then(e => this.macAddress = e)
        };
    I.prototype.isLoggedIn = function() {
        AllFunctions(0)("Function 186").verbose("isLoggedIn")
        return this.autologin().then(() => {AllFunctions(0)("Function 186").verbose("returning isLoggedIn"), !0}).catch(() => {AllFunctions(0)("Function 186").verbose("not isLoggedIn");!!g.get("account", "userEmail")})
    }, I.prototype.getAccountname = function() {
        const e = _.getSessionObject();
        return !e && g.get("account", "userEmail") ? {
            email: g.get("account", "userEmail")
        } : {
            email: e && e.user
        }
    }, I.prototype._login = function(e, t) {
        return l.increaseCounter("parse-account-login-started"), y.login(e, t, this.macAddress, this.firmwareVersion).then(r => {
            _.setParseUser(r, t), g.put("account", "userEmail", e)
        }).then(() => {
            c.debug("ACCOUNT_LOGIN", e)
        }).catch(t => (c.error("ACCOUNT_LOGIN", {
            user: e,
            error: t.message
        }), l.increaseCounter("parse-account-login-failed-with-error-" + t.code), _.clear(), 101 === t.code && this.logout(), a.reject(new Error(t.message))))
    }, I.prototype.signup = function(e, t) {
        return y.signup(e, t, this.macAddress).then(r => (_.setParseUser(r, t), g.put("account", "userEmail", e), a.resolve(this.save()))).then(() => {
            c.info("ACCOUNT_SIGNUP", e), d.send({
                type: p.NOTIFICATION_SYNC,
                data: Date.now()
            })
        }).catch(t => (c.error("ACCOUNT_SIGNUP", {
            user: e,
            error: t.message
        }), _.clear(), a.reject(new Error(t.message))))
    }, I.prototype.login = function(e, t) {
        return this._login(e, t).then(() => a.resolve(this.save())).then(() => this.autologin())
    }, I.prototype.autologin = function() {
        return a.resolve(true);
    }, I.prototype._authenticateUser = function() {
        return h.load().then(e => e.username && e.password ? (g.put("account", "userEmail", e.username), this._login(e.username, e.password)) : a.reject(Error("no stored account data found"))).then(() => (c.debug("autologin successful, user", _.getUsername()), d.send({
            type: p.NOTIFICATION_SYNC,
            data: Date.now()
        }), null))
    }, I.prototype.save = function() {
        return o({
            username: _.getUsername(),
            password: _.getPassword()
        })
    }, I.prototype.logout = function() {
        return l.increaseCounter("parse-account-logout-started"), h.deleteFile().catch(e => c.error("LOGOUT_FAILED", {
            error: e.message
        })).finally(() => {
            c.info("ACCOUNT_LOGOUT"), g.put("account", "userEmail", ""), _.clear()
        })
    }, I.prototype.resetPassword = function(e) {
        return y.resetPassword(e)
    }, I.prototype.getFirmware = function(e) {
        const t = "getFirmware" + this.duiroFormatVersion;
        return this.autologin().catch(() => T).then(r => E.runCloudFunction(r, t, {
            currentVersion: e
        }))
    }, I.prototype.getTestCommands = function(e) {
        return this._runCloudFunction("getLiveIRTest", {
            testId: e
        })
    }, I.prototype.listBackups = function() {
        const e = "listBackup" + this.duiroFormatVersion;
        return this._runCloudFunction(e)
    }, I.prototype.saveBackup = function(e, t) {
        return l.increaseCounter("parse-save-backup-started"), this.autologin().then(r => f.saveBackup(r, e, t))
    }, I.prototype.getBackup = function(e) {
        return l.increaseCounter("parse-get-backup-started"), this.autologin().then(t => f.getBackup(t, e))
    }, I.prototype.getBackupById = function(e) {
        return l.increaseCounter("parse-get-backup-started"), this.autologin().then(t => f.getBackupById(t, e))
    }, I.prototype.getDeviceFileList = function() {
        AllFunctions(0)("186").verbose("getDeviceFilelist");
        const e = "getDeviceFileList" + this.duiroFormatVersion;
        return this._runCloudFunction(e).timeout(12e5)
    }, I.prototype.initializeParse = function(e) {
        AllFunctions(0)("Function 186").verbose("initializeParse")
        return new a(t => {
            u(e, {
                appId: {
                    presence: !0
                },
                parseUrl: {
                    presence: !0
                }
            }), s.initialize(e.appId), s.serverURL = e.parseUrl, t(e)
        })
    }, I.prototype.getPersistedCloudInstanceConfig = function() {
        AllFunctions(0)("Function 186").verbose("getPersistedCloudInstanceConfig")
        return h.load().then(e => e.cloudInstanceConfig)
    }, I.prototype.getFullDeviceSpec = function(e) {
        AllFunctions(0)("Function 186").verbose("getFullDeviceSpec",e)
        l.increaseCounter("parse-run-cloudfunction");
        const t = "getFullDeviceSpec" + i.account.duiroFormatVersion;
        const MyDevice = e.type+"_"+e.manufacturer+"_"+e.name+".json"
        AllFunctions(0)("Function 186").verbose("getFullDeviceSpec, looking for",MyDevice)
        
        //return this._download({name:MyDevice,url:"http://192.168.73.110:8000/Cloud/IRDrivers/"+MyDevice,_downloadDir : "/tmp"})
        return this._download({name:MyDevice,targetDir:"/tmp",type:"irdevices",url:CloudReplacementUrl  +"?type=irdevices&name="+MyDevice,_downloadDir : "/tmp"})
        .then(myjson => (myjson.result))

        //return this._runCloudFunction(t, e)
    }, I.prototype.setFirmwareVersion = function(e) {
        this.firmwareVersion = e
    }, I.prototype._copy = function(e, t) {
        AllFunctions(0)("Function 186").verbose("_copy",e,"to",t)
          if (/*l.debug("Copying", {
                fromFilePath: e,
                toFilePath: t
            }),*/ e === t) return u.resolve();
        const r = NoCloudo.createReadStream(e),
            n = NoCloudo.createWriteStream(t);
        return NoClouds(r, n)        
    }, I.prototype._getLocalFilePath = function(e) {
        return   "/tmp/" + e
    },
    I.prototype._checkSum = function(e) {
    AllFunctions(0)("Function 186").verbose("_checkSum e",e)
    return new u(t => {
        const r = a.createHash("sha1"),
            n = o.createReadStream(e);
        l.debug("Calculating sha1sum of", e), n.on("data", e => {
            r.update(e)
        }), n.on("end", () => {
            const n = r.digest("hex");
            l.debug("sha1 sum", {
                filePath: e,
                digest: n
            }), t(n)
        }), n.on("error", e => {
            l.warn("CHECKSUM_CALC_FAILED", e), t()
        })
    })
    },
    I.prototype._xcheckSum = function(e) {
        AllFunctions(0)("Function 186").verbose("Checksum e",e)
        return new u(t => {                         // r(14)
            const r = NoClouda.createHash("sha1"),  // r(41)
                n = NoCloudo.createReadStream(e);   // r(26)
                AllFunctions(0)("Function 186").verbose("e",e)
                AllFunctions(0)("Function 186").verbose("n",n)
            n.on("data", e => {
                AllFunctions(0)("Function 186").verbose("checksum data e:", e)
                r.update(e)
            }), n.on("end", () => {
                const n = r.digest("hex");
                AllFunctions(0)("Function 186").verbose("checksum end")
                t(n)
            }), n.on("error", e => {
                AllFunctions(0)("Function 186").verbose("checksum error t:", t), t()
            })
        })
    }, I.prototype._download = function(e) {
        AllFunctions(0)("Function 186").verbose("_download",e)
        var fullFileName = e.targetDir+"/"+e.name;
        var myContent;
        return  noCloud.downloadContent(e).then(content => 
            (myContent = content,
            this._checkSum(fullFileName))).then(r => 
                {AllFunctions(0)("Function 186").verbose("We have this checksum",r,"for",fullFileName);
                n(fullFileName, r.shaSum);
                if (typeof myContent == "string")
                    return myContent = JSON.parse(myContent)
                else 
                    return myContent})
}, I.prototype.selectNeeoCloudReplacementUrl   = function() {
    AllFunctions(0)("Function 186").verbose("selectNeeoCloudReplacementUrl  ")
        return this.getCloudConfigFor().then(e => this.initializeParse(e)).then(e => o({
            cloudInstanceConfig: e
        }).then(() => e)).catch(e => {
            c.warn("CLOUDSWITCH_FAILED", e.message);
            const t = n();
            return this.getPersistedCloudInstanceConfig().then(e => e || t).then(e => this.initializeParse(e))
        })
    }, I.prototype.getCloudConfigFor = function() {
        const e = n();
        AllFunctions(0)("Function 186").verbose("selectNeeoCloudReplacementUrl   getCloudConfigFor")
        return this.initializeParse(e).then(() => e)
    }, I.prototype.checkDevicesForUpdates = function(e) {
        return this._runCloudFunction("getDevicesWithUpdates", {
            devices: e
        })
    }, I.prototype.updateBrainInformation = function(e) {
        return _.isLoggedIn().then(t => t ? this._runCloudFunction("updateBrainInformation", {
            information: e
        }) : void 0)
    }, I.prototype.getBackupRestoreId = function() {
        return this._runCloudFunction("getBackupRestoreId")
    }, I.prototype.setBackupRestoreComplete = function(e) {
        return this._runCloudFunction("setBackupRestoreComplete", {
            backupId: e
        })
    }, I.prototype._runCloudFunction = function(e, t = {}) {
       AllFunctions(0)("Function 186").verbose("runcloudfunction e",e);AllFunctions(0)("Function 186").verbose("runcloudfunction t",t)
        return this.autologin().then(r => E.runCloudFunction(r, e, t))
    }, I.prototype.pairToBrain = function(e, t) {
        return a.resolve(this.login(e.email, e.password)).then(e => E.runCloudFunction(e, "pairIntegratorToBrain", {
            hostname: t
        })).then(e => this._login(e.username, e.password).then(() => this.save()).then(() => e)).catch(t => {
            throw c.warn("BRAIN_PAIRING_FAILED_LOGGING_OUT_INTEGRATOR", {
                integrator: e.email
            }), this.logout(), t
        })
    }
}, function(e, t, r) {// Function 187 Looks like zwave alarm handler
    "use strict";
    AllFunctions(0)("Function 187").verbose("zwave alarm handler")
    const n = r(0)("EventLog"),
        o = [{
            name: "SENSOR_ALARM+Alarm",
            text: "General Alarm went off!"
        }, {
            name: "SENSOR_ALARMBURGLAR+Alarm",
            text: "Burgler Alarm went off!"
        }, {
            name: "SENSOR_ALARMHEAT+Alarm",
            text: "Heat Alarm went off!"
        }, {
            name: "SENSOR_ALARMSMOKE+Alarm",
            text: "Smoke Alarm went off!"
        }, {
            name: "SENSOR_BATTERY",
            data: "lowBattery",
            text: "Low Battery detected"
        }];
    e.exports = class {
        constructor() {
            this.project = void 0
        }
        logZWaveEvents(e) {
            return o.filter(t => {
                if ("string" != typeof e.type || -1 === e.type.indexOf(t.name)) return !1;
                if (t.data && -1 === e.data.indexOf(t.data)) return !1;
                const r = this.getZWaveEventMessage(e.type, t.text);
                return n.event(r), !0
            })
        }
        getZWaveEventMessage(e, t) {
            const r = function(e) {
                return e.split(":")[0]
            }(e);
            if (!r) return t;
            if (this.project && -1 < e.indexOf("SENSOR_")) {
                const e = this.project.getDevices(e => e.key === r)[0];
                if (e) return e.name + ": " + t
            }
            return t
        }
    }
}, function(e, t, r) {// Function 188 notification:powersensorlistener
    "use strict";
    AllFunctions(0)("Function 188").verbose("powersensorlistener")
    const n = r(6)("cp6:app:lib:notification:powersensorlistener"),
        o = r(55);
    e.exports = class {
        constructor(e) {
            this.project = void 0, this.notification = e, n("init")
        }
        _markScenarioOfDeviceActive(e) {
            this.project.getScenarios(t => t.mainDeviceKey === e.key).forEach(e => {
                n("activate scenario", e.name), e.activate()
            })
        }
        _registerCallback(e, t) {
            n("register power callback", e.eventKey), this.notification.registerIfNotYetRegistered(e.eventKey, r => {
                n("POWERSTATE_CALLBACK %o", {
                    name: t.name,
                    key: e.eventKey,
                    powerstate: r
                }), r ? (t.markAsOn(), this._markScenarioOfDeviceActive(t)) : t.markAsOff(), this.project.activeNowChanged()
            })
        }
        activatePowerStateSensors() {
            this.project ? this.project.getDevices(e => {
                if (0 === e.sensors.length) return !1;
                return e.sensors.find(e => e.type === o.TYPE_POWERSTATE)
            }).forEach(e => {
                const t = e.sensors.find(e => e.type === o.TYPE_POWERSTATE);
                this._registerCallback(t, e)
            }) : n("PROJECT NOT SET")
        }
    }
}, function(e, t, r) {// Function 189 notificationSensorlistener
    "use strict";
    AllFunctions(0)("Function 189").verbose("sensorlistener:")
    const n = r(0)("notificationSensorlistener"),
        o = r(3),
        i = r(25);
    e.exports = class {
        constructor(e) {
            this.project = void 0, this.notification = e, n.debug("init")
        }
        initializeListeners(e) {
            if (!e) throw new Error("Project cannot be undefined");
            this.project = e, this.notification.on(i.NOTIFICATION_DEVICE_SENSOR_UPDATE, e => this._handleSensorUpdate(e))
        }
        _handleSensorUpdate(e) {
            const {
                sensorValue: t,
                sensorEventKey: r
            } = e, i = this.project.getSensorByEventKey(r);
//            AllFunctions(0)("Function 189").verbose("_handleSensorUpdate:",r,"becomes",t)
            return i ? void i.setCachedValue(t) : (n.debug("UNDEFINED_SENSOR_EVENTKEY", {
                sensorEventKey: r,
                sensorValue: t
            }), o.increaseCounter("UNDEFINED_SENSOR_EVENTKEY"))
        }
    }
}, function(e) {// Function 190 exports = require("simple-event-statistics")
    e.exports = require("simple-event-statistics")
}, function(e) {// Function 191 class for requestqueue
    "use strict";
    e.exports = class e {
        constructor() {
            this.requestCount = 0, this.failedCount = 0, this.requestLog = []
        }
        static build() {
            return new e
        }
        startRequest(e) {
            return this.requestCount++, Object.assign({
                startTimeMs: Date.now()
            }, e)
        }
        endRequest(e) {
            e.timeMs = Date.now() - e.startTimeMs, e.startTimeMs = void 0, e.failed && this.failedCount++, this.requestLog = [e, ...this.requestLog.slice(0, 49)]
        }
        failRequest(e) {
            e.failed = !0, this.endRequest(e)
        }
        getStats() {
            return {
                requests: this.requestCount,
                failed: this.failedCount,
                requestLog: this.requestLog
            }
        }
    }
}, function(e) {// Function 192 exports = require("blocked")
    e.exports = require("blocked")
}, function(e, t, r) {// Function 193 notificationsender; contains socketio-functions
    "use strict";
    AllFunctions(0)("Function 193").verbose("notificationsender (socketio)")
    const n = r(6)("cp6:lib:notificationsender"),
        o = r(3),
        i = r(194),
        s = ["projectchanged"],
        a = e.exports = function() {
            n("init"), this.cache = i.buildWithSizeOf(64)
        };
    a.prototype.socketioinit = function(e) {
        this.io = e
    }, a.prototype._socketio = function(e) {
        AllFunctions(0)("Function 193").verbose("update all but TR2 - _sockeio",e.type,"(e.data)",e.data,e)

        return this.io ? (this.io.sockets.emit(e.type, e.data), !0) : (n("cannot send notification via socket.io"), !1)
    }, a.prototype._cacheNotification = function(e) {
        AllFunctions(0)("Function 193").verbose("cache notification (e.type)",e.type,"(e.data)",e.data)
        s.includes(e.type) || this.cache.put(e.type, e.data)
    }, a.prototype.send = function(e) {
        AllFunctions(0)("Function 193").verbose("sending notification (socketio:e)",e)
        //if (e.data != "" && e.data.substring(0,4) == "Play") {
            //e.data = "Playing \n\r this medium"
        //}
        return !(!e || !e.type) && (n("sending notification:", e.type), this._cacheNotification(e), o.increaseCounter("notification-sent"), this._socketio(e))
    }, a.prototype.resendAll = function() {
        AllFunctions(0)("Function 193").verbose("resending all cached notifications")
        n("sending re-sending all cached notifications."), this.cache.forEach((e, t) => {
            AllFunctions(0)("Function 193").verbose("resending this cached notification",t,e)
            this._socketio({
                type: t,
                data: e
            })
        })
    }
}, function(e, t) {// Function 194 store class
    "use strict";
    class r {
        constructor(e) {
            this._maxSize = e, this._store = new Map
        }
        has(e) {
            return this._store.has(e)
        }
        get(e) {
            return this._store.get(e)
        }
        clear() {
            this._store.clear()
        }
        put(e, t) {
            this._hasNoSpaceLeft() && this._prune(1), this._store.set(e, t)
        }
        forEach(e) {
            this._store.forEach(e)
        }
        _hasNoSpaceLeft() {
            return this._store.size >= this._maxSize
        }
        _prune(e) {
            const t = this._store.keys();
            for (let r = 0; r < e; r++) {
                const e = t.next().value;
                this._store.delete(e)
            }
        }
    }
    t.buildWithSizeOf = function(e) {
        return new r(e)
    }
}, function(e, t, r) {// Function 195 load/save/delete account file
    "use strict";
    AllFunctions(0)("Function 195").verbose("oad/save/delete account file")

    function n() {
        return o.load(i)
    }
    const o = r(57),
        i = "account";
    e.exports = {
        load: n,
        save: function(e) {
            return o.exists(i) ? n().then(t => o.save(i, Object.assign(t, e))) : o.save(i, e)
        },
        deleteFile: function() {
            return o.deleteFile(i)
        }
    }
}, function(e, t, r) {// Function 196 store functions
    "use strict";
    AllFunctions(0)("Function 196").verbose("store functions")
    const n = r(26),
        o = r(112),
        i = r(1),
        s = r(197),
        a = r(70),
        c = r(86),
        u = r(198),
        d = r(0)("Store"),
        l = r(199),
        {
            getObsoleteVersions: p
        } = r(200),
        h = ".json",
        g = e.exports = function(e) {
            this.options = a(e || {}, {
                encoding: "utf8",
                cacheSize: 10,
                dataRoot: "/tmp"
            }), this.cache = {}, this.cacheKeys = [], d.debug("init", this.options), n.existsSync(this.options.dataRoot) || (d.debug("create missing directory"), n.mkdirSync(this.options.dataRoot))
        };
    g.prototype.absolutePath = function(e, t = !1) {
        if (!1 === t) return this.options.dataRoot + "/" + e + h;
        const r = c(t) ? Date.now() : t;
        return this.options.dataRoot + "/" + e + "." + r + h
    }, g.prototype._cache = function(e, t) {
        this.cache[e] || this.cacheKeys.push(e), this.cache[e] = t, this._recycle()
    }, g.prototype._recycle = function() {
        if (this.cacheKeys.length > this.options.cacheSize) {
            const e = this.cacheKeys.shift();
            delete this.cache[e]
        }
    }, g.prototype.save = function(e, t, r, n = !1) {
        n || (n = JSON.stringify(t));
        const o = this.absolutePath(e, r);
        return d.debug("writing", o), i.promisify(u)(o, n, {
            encoding: this.options.encoding
        }).then(n => {
            if (n) throw d.debug("SAVE_FAILED", {
                key: e,
                file: o,
                error: n.message
            }), n;
            return this._cache(e, t), r ? this.listVersions(e).then(t => {
                const r = t => () => this.deleteFile(e, t);
                return p(t).reduce((e, t) => e.then(r(t)), i.resolve())
            }) : void 0
        })
    }, g.prototype.readFile = function(e, t) {
        const r = this.absolutePath(e, t);
        return i.promisify(n.readFile)(r, {
            encoding: this.options.encoding
        })
    }, g.prototype.load = function(e, t, r) {
        AllFunctions(0)("Function 196").verbose("store functions - load e",e)
        AllFunctions(0)("Function 196").verbose("store functions - load t",t)
        return s(r) || !this.cache[e] || t ? (d.debug("loading", {
            key: e,
            timeStamp: r
        }), this.readFile(e, r).then(t => {
            const r = l.parseFile(t);
            if (!r) throw new Error("EMPTY_JSON_FILE");
            return this._cache(e, r), r
        })) : (d.debug("loading from cache", e), i.resolve(this.cache[e]))
    }, g.prototype.loadLatest = function(e) {
        AllFunctions(0)("Function 196").verbose("store functions - loadLatest e",e)
        return this.listVersions(e).then(t => t.length ? this.loadLatestVersion(e, t, 0) : this.load(e, !0))
    }, g.prototype.loadLatestVersion = function(e, t, r) {
        AllFunctions(0)("Function 196").verbose("store functions - loadLatestVersion e",e)
        return this.load(e, !0, t[r]).catch(n => {
            if (d.warn("INVALID_STOREFILE_DETECTED", {
                    file: t[r],
                    msg: n.message
                }), t.length > r + 1) return this.loadLatestVersion(e, t, r + 1);
            throw n
        })
    }, g.prototype.resetCacheKey = function(e) {
        delete this.cache[e]
    }, g.prototype.deleteFile = function(e, t) {
        const r = this.absolutePath(e, t);
        return d.debug("DELETE file", r), this.resetCacheKey(e), i.promisify(n.unlink)(r).catch(t => {
            d.error("DELETE_STORE_FILE", {
                key: e,
                file: r,
                error: t.message
            })
        })
    }, g.prototype.listVersions = function(e) {
        const t = this.absolutePath(e, "*");
        return i.promisify(o)(t).then(e => e.map(e => parseInt(e.match(/.*\.(\d+)\.json/)[1], 10)).sort((e, t) => t < e ? -1 : e === t ? 0 : 1))
    }, g.prototype.exists = function(e) {
        return n.existsSync(this.absolutePath(e))
    }
}, function(e) {// Function 197 exports = require("lodash/isNumber")
    e.exports = require("lodash/isNumber")
}, function(e) {// Function 198 exports = require("write-file-atomic")
    e.exports = require("write-file-atomic")
}, function(e, t, r) {// Function 199 Storechecker
    "use strict";
    AllFunctions(0)("Function 199").verbose("Storechecker")
    const n = r(0)("Storechecker");
    e.exports.parseFile = function(e) {
        try {
            const t = JSON.parse(e);
            if (t && "object" == typeof t) return t
        } catch (e) {
            n.error("STORECHECKER_FAILED", e.message)
        }
        return !1
    }
}, function(e, t, r) {// Function 200 getObsoleteVersions
    "use strict";
    AllFunctions(0)("Function 200").verbose("getObsoleteVersions:")

    function n({
        versions: e,
        amountToKeep: t
    }) {
        return e.length <= t ? [] : e.slice(t)
    }
    const o = r(201),
        i = r(202),
        s = r(203),
        a = r(204),
        c = r(205),
        u = r(206),
        d = r(207);
    e.exports = {
        getObsoleteVersions: function(e) {
            const t = function() {
                const e = new Date,
                    t = d(0),
                    r = d(Number.MAX_VALUE),
                    n = i(e, 1),
                    u = s(e, 1),
                    l = a(e, 1),
                    p = c(e, 1);
                return {
                    inTheFuture: {
                        start: o(e, 1),
                        end: r,
                        amountToKeep: 0
                    },
                    lastHour: {
                        start: n,
                        end: e,
                        amountToKeep: 1
                    },
                    lastDay: {
                        start: u,
                        end: n,
                        amountToKeep: 1
                    },
                    lastWeek: {
                        start: l,
                        end: u,
                        amountToKeep: 1
                    },
                    lastMonth: {
                        start: p,
                        end: l,
                        amountToKeep: 1
                    },
                    inThePast: {
                        start: t,
                        end: p,
                        amountToKeep: 1
                    }
                }
            }();
            return Object.keys(t).reduce((r, o) => {
                const {
                    start: i,
                    end: s,
                    amountToKeep: a
                } = t[o];
                return [...r, ...n({
                    versions: function({
                        versions: e,
                        start: t,
                        end: r
                    }) {
                        return e.map(e => d(e)).filter(e => u(e, t, r)).map(e => e.getTime())
                    }({
                        versions: e,
                        start: i,
                        end: s
                    }),
                    amountToKeep: a
                })]
            }, [])
        }
    }
}, function(e) {// Function 201 exports = require("date-fns/add_milliseconds")
    e.exports = require("date-fns/add_milliseconds")
}, function(e) {// Function 202 exports = require("date-fns/sub_hours")
    e.exports = require("date-fns/sub_hours")
}, function(e) {// Function 203 exports = require("date-fns/sub_days")
    e.exports = require("date-fns/sub_days")
}, function(e) {// Function 204 exports = require("date-fns/sub_weeks")
    e.exports = require("date-fns/sub_weeks")
}, function(e) {// Function 205 exports = require("date-fns/sub_months")
    e.exports = require("date-fns/sub_months")
}, function(e) {// Function 206 exports = require("date-fns/is_within_range")
    e.exports = require("date-fns/is_within_range")
}, function(e) {// Function 207 exports = require("date-fns/parse")
    e.exports = require("date-fns/parse")
}, function(e) {// Function 208 exports = require("getmac")
    e.exports = require("getmac")
}, function(e, t, r) {// Function 209 functiopns for savebackup
    "use strict";
    AllFunctions(0)("Function 209").verbose("Functions for save backup:")

    function n(e) {
        return l.encrypt(p.getSecret(), e)
    }

    function o(e) {
        if (!e) return a.reject(new Error("Backup not found"));
        const t = e.get("file").url();
        return c({
            url: t,
            timeout: g,
            encoding: null
        })
    }

    function i(e) {
        const t = l.decrypt(p.getSecret(), e);
        return f(t).then(e => e.toString())
    }
    const s = r(54),
        a = r(1),
        c = r(17),
        u = r(0)("ParseBackup"),
        d = r(114),
        l = r(210),
        p = r(115),
        h = s.Object.extend("ConfBackup"),
        g = 3e4,
        m = a.promisify(d.gzip),
        f = a.promisify(d.gunzip);
    e.exports = {
        saveBackup: function(e, t, r) {
            u.debug("save new backup", t);
            const o = e.token;
            return function(e) {
                const t = Buffer.from(e);
                return m(t)
            }(r).then(n).then(e => (function(e, t) {
                const r = Array.prototype.slice.call(e, 0);
                return new s.File("backup", r, null).save({
                    sessionToken: t
                })
            })(e, o)).then(r => (function(e, t, r) {
                const n = new h;
                n.set("user", t.parseuser), n.set("file", e), n.set("timeStamp", r);
                const o = new s.ACL(t.parseuser);
                return n.setACL(o), n.save({
                    sessionToken: t.token
                })
            })(r, e, t))
        },
        getBackup: function(e, t) {
            return function(e, t) {
                const r = new s.Query(h);
                return r.equalTo("user", e.parseuser), r.equalTo("timeStamp", t), a.resolve(r.first({
                    sessionToken: e.token
                }))
            }(e, t).then(o).then(i)
        },
        getBackupById: function(e, t) {
            return function(e, t) {
                const r = new s.Query(h);
                r.equalTo("user", e.parseuser), r.equalTo("objectId", t);
                const n = r.first({
                    sessionToken: e.token
                });
                return a.resolve(n)
            }(e, t).then(o).then(i)
        }
    }
}, function(e, t, r) {// Function 210 encrypt/decrypt
    "use strict";
    AllFunctions(0)("Function 210").verbose("encrypt/decrypt")
    const n = r(41),
        o = "aes-256-ctr",
        i = t.encrypt = function(e, t) {
            if (!e || !Buffer.isBuffer(t)) throw new Error("Encrypt: Invalid parameters");
            const r = n.createCipher(o, e);
            return Buffer.concat([r.update(t), r.final()])
        },
        s = t.decrypt = function(e, t) {
            if (!e || !Buffer.isBuffer(t)) throw new Error("Decrypt: Invalid parameters");
            const r = n.createDecipher(o, e);
            return Buffer.concat([r.update(t), r.final()])
        };
    t.encryptJson = function(e, t) {
        const r = new Buffer(JSON.stringify(t));
        return i(e, r)
    }, t.decryptDataToJson = function(e, t) {
        const r = s(e, t);
        return JSON.parse(r)
    }
}, function(e, t, r) {// Function 211 PromiseCache
    "use strict";
    AllFunctions(0)("Function 211").verbose("PromiseCache")
    const n = r(0)("PromiseCache");
    (e.exports = function(e) {
        this.fetchPromise = void 0, this.cacheDurationMs = e || 1e4, this.cacheExpire = Date.now(), this.id = this.cacheExpire
    }).prototype.getValue = function(e) {
        const t = Date.now();
        return this.fetchPromise && t < this.cacheExpire ? (n.debug("use cache", this.id), this.fetchPromise) : e ? (n.debug("request new data", this.id), this.fetchPromise = e(), this.cacheExpire = t + this.cacheDurationMs, this.fetchPromise) : void n.warn("NO_CALLBACK_FUNCTION")
    }
}, function(e, t, r) {// Function 212 ParseCloudfunction
    "use strict";
    AllFunctions(0)("Function 212").verbose("ParseCloudFunction")

    function n(e) {
        const t = e.message && e.message.message ? e.message : e,
            r = t.message,
            n = t.code,
            i = new Error(r);
        return i.code = n, o.reject(i)
    }
    const o = r(1),
        i = r(54),
        s = r(3),
        a = r(0)("ParseCloudfunction"),
        c = ["lookupHostnameSwitch", "updateBrainInformation", "pairIntegratorToBrain"];
    e.exports = {
        runCloudFunction: function(e, t, r) {
            AllFunctions(0)("Function 212").verbose("runCloudFunction: e",e)
            AllFunctions(0)("Function 212").verbose("runCloudFunction: t",t)
            AllFunctions(0)("Function 212").verbose("runCloudFunction: r",r)
            return Promise.resolve(); // No more cloud, so function isn't applicable anymore. 
            return s.increaseCounter("parse-run-cloudfunction"), a.debug("Calling function:", t, r), i.Cloud.run(t, r, {
                sessionToken: e.token
            }).catch(r => {
                return !c.includes(t) && a.warn("CLOUD_FUNCTION_FAILED", {
                    error: r.message,
                    function: t
                }), e.errorHandler(r), n(r)
            })
        }
    }
}, function(e, t, r) {// Function 213 ParseAccount
    "use strict";
    AllFunctions(0)("Function 213").verbose("ParseAccount:")
    const n = r(54),
        o = r(1),
        i = r(0)("ParseAccount");
    t.signup = function(e, t, r) {
        const o = new n.User;
        return o.set("username", e), o.set("password", t), o.set("email", e), o.set("macAddress", r), o.set("logincount", 1), o.signUp(null)
    }, t.login = function(e, t, r, o) {
        return n.User.logIn(e, t).then(t => {
            const n = 1 + (t.get("logincount") || 0);
            return t.set("email", e), t.set("macAddress", r), t.set("logincount", n), t.set("firmware", o), t.save({}, {
                sessionToken: t.get("sessionToken")
            })
        })
    }, t.resetPassword = function(e) {
        return n.User.requestPasswordReset(e).then(() => {
            i.info("ACCOUNT_PW_RESET", e)
        }).catch(t => (i.error("ACCOUNT_PW_RESET", {
            email: e,
            error: t.message
        }), o.reject(new Error(t.message))))
    }
}, function(e, t, r) {// Function 214 DirectoryAdapter
    "use strict";
    AllFunctions(0)("Function 214").verbose("DirectoryAdapter:")
    const n = r(0)("DirectoryAdapter"),
        o = r(17),
        i = new(r(40).Agent)({
            keepAlive: !0,
            keepAliveMsecs: 8e3
        }),
        s = r(116),
        a = r(3),
        c = 4e3,
        u = e.exports = function(e) {
            n.debug("init", e), this.baseUrl = e.baseUrl
        };
    u.prototype.getConfig = function() {
        return a.increaseCounter("directoryadapter-get-config"), o({
            method: "GET",
            json: !0,
            uri: this.baseUrl + "/config",
            timeout: c,
            agent: i
        }).catch(e => {AllFunctions(0)("Function 214").error("get-config failed",uri)
            n.error("DIRECTORYADAPTER_GET_CONFIG_FAILED", {
                error: e.message
            });
        })
    }, u.prototype.setConfig = function(e) {
        return a.increaseCounter("directoryadapter-get-config"), o({
            method: "POST",
            json: !0,
            body: e,
            uri: this.baseUrl + "/config",
            timeout: c,
            agent: i
        }).catch(e => {
            n.error("DIRECTORYADAPTER_SET_CONFIG_FAILED", {
                error: e.message
            })
        })
    }, u.prototype.createAccessToken = function(e, t) {
        return n.debug("createAccessToken directory", e), o({
            method: "POST",
            json: !0,
            uri: this.baseUrl + "/" + e + "/createaccesstoken/",
            body: {
                code: t
            },
            timeout: c
        }).then(e => ({
            success: e.success
        }))
    }, u.prototype.getAuthorizeParams = function(e) {
        return n.debug("getAuthorizeParams directory", e), o({
            method: "GET",
            json: !0,
            uri: this.baseUrl + "/" + e + "/getauthorizeparams",
            timeout: c,
            agent: i
        })
    }, u.prototype.getUserData = function(e) {
        return n.debug("getUserData directory", e), o({
            method: "GET",
            json: !0,
            uri: this.baseUrl + "/" + e + "/getuserdata",
            timeout: c,
            agent: i
        })
    }, u.prototype.isEnabled = function(e) {
        return n.debug("check if directory is enabled", e), o({
            method: "GET",
            json: !0,
            uri: this.baseUrl + "/" + e + "/isEnabled",
            timeout: c,
            agent: i
        }).then(e => (n.debug("isEnabled", e), {
            success: e.success
        })).catch(e => {
            throw n.error("IS_DIRECTORY_ENABLED", e.message), e
        })
    }, u.prototype.browse = function(e, t, r) {
        a.increaseCounter("directoryadapter-send-browse");
        const c = this.baseUrl + e.getPath() + "/";
        return n.debug(`browse directory ${c}, params:`, r), o({
            method: "POST",
            json: !0,
            uri: c,
            body: r,
            timeout: 8e3,
            agent: i
        }).then(e => (n.debug("browse answer"), s.validateBrowseResult(e), e)).catch(e => {
            throw n.error("INVALID_BROWSE_RESULT", e.message), e
        })
    }
}, function(e, t, r) {// Function 215 DeviceAdapter //##
    "use strict";
    AllFunctions(0)("Function 215").verbose("DeviceAdapter")

    function n(e) {
        return l.parseJSONError(e, v)
    }

    function o(e, t, r = "") {
        AllFunctions(0)("Function 215").verbose("function o")
        return e + t.getPath() + "/" + encodeURIComponent(t.getAdapterDeviceId()) + r
    }
    const i = r(1),
        s = r(17),
        a = r(88),
        c = new(r(40).Agent)({
            keepAlive: !0,
            keepAliveMsecs: 8e3
        }),
        u = r(0)("DeviceAdapter"),
        d = r(8),
        l = r(32),
        p = r(71),
        h = r(3),
        g = r(118),
        m = r(116),
        f = r(217),
        E = r(89),
        y = 12e3,
        _ = 12e4,
        v = "AdapterError: ",
        T = e.exports = function(e) {
            u.debug("init", e), this.baseUrlDeviceadapter = e.baseUrl, this.timeout = e.timeout, this.urlfactory = new f(e.baseUrl)
        };
    T.prototype._get = function(e) {
        const {
            uri: t,
            agent: r,
            timeout: n
        } = e;
        return s({
            method: "GET",
            json: !0,
            uri: t,
            timeout: n || this.timeout,
            agent: r
        })
    }, T.prototype._post = function(e) {
        const {
            uri: t,
            body: r,
            timeout: n,
            agent: o
        } = e;
        return s({
            method: "POST",
            json: !0,
            uri: t,
            body: r,
            timeout: n || this.timeout,
            agent: o
        })
    }, T.prototype._encryptedPost = function(e) {
        const {
            uri: t,
            body: r,
            timeout: n,
            sourceName: o
        } = e, i = JSON.stringify(r);
        return u.debug("encrypting adapter post request", t), this._getPubKeyFromSdkDevice(o).then(e => p.encrypt(i, e).then(e => s({
            method: "POST",
            json: !0,
            uri: t,
            body: {
                data: e
            },
            timeout: n || this.timeout,
            headers: {
                "X-NEEO-Secure": "true"
            }
        })))
    }, T.prototype._getPubKeyFromSdkDevice = function(e) {
        return this._getBaseUrl(e).then(e => e + "/secure/pubkey").then(e => this._get({
            uri: e,
            timeout: _
        })).then(e => e.publickey)
    }, T.prototype.registered = function(e, t) {
        return h.increaseCounter("deviceadapter-send-registered"), this.urlfactory.buildDeviceUrl(t, e, "/registered").then(e => this._get({
            uri: e,
            timeout: y
        }))
    }, T.prototype.register = function(e, t, r) {
        return h.increaseCounter("deviceadapter-send-register"), this.urlfactory.buildDeviceUrl(t, e, "/register").then(n => this.urlfactory.isExternalSDKAdapter(e, t) ? this._encryptedPost({
            sourceName: t,
            uri: n,
            body: r,
            timeout: y
        }) : this._post({
            uri: n,
            body: r,
            timeout: _
        })).catch(n)
    }, T.prototype.unregister = function(e) {
        return h.increaseCounter("deviceadapter-send-unregister"), this._getBaseUrl(e).then(t => this._get({
            uri: t + "/" + e + "/unregister",
            timeout: _
        }))
    }, T.prototype.cancel = function(e) {
        return h.increaseCounter("deviceadapter-send-register"), this._getBaseUrl(e).then(t => this._get({
            uri: t + "/" + e + "/cancel",
            timeout: y
        }))
    }, T.prototype.discover = function(e, t) {
        return h.increaseCounter("deviceadapter-send-discover"), u.debug("DISCOVER_DEVICE", {
            adapterName: e,
            sourceName: t
        }), this.urlfactory.buildDeviceUrl(t, e, "/discover").then(r => this._get({
            uri: r,
            timeout: 3e4
        }).then(r => (this.validateDiscoveredDevices(r), r.map(r => {
            return r.device && "zwave" !== e ? function(e, t) {
                const r = Object.assign({
                        id: e.id,
                        name: e.name
                    }, e.device),
                    n = new E({
                        sourceName: t,
                        sourceData: r
                    }).data;
                return Object.assign({}, e, {
                    device: n
                })
            }(r, t) : r
        }))))
    }, T.prototype.validateDiscoveredDevices = function(e) {
        if (a(e, "id").length !== e.length) throw u.debug("DISCOVER_DEVICES_DUPLICATE_UNIQUE_IDS"), new Error("DISCOVER_DEVICES_DUPLICATE_UNIQUE_IDS")
    }, T.prototype.discoverNewDevices = function(e, t, r) {
        return this.discover(e, t).then(e => {
            const t = function(e, t) {
                if (!e || !t) return [];
                const r = e.map(e => e.adapterDeviceId);
                return t.filter(e => !r.includes(e.id) && e.reachable)
            }(r, e);
            return 0 < t.length && u.event(`${t.length} new Z-Wave devices discovered`), t
        }).catch(e => (u.error("DISCOVER_NEW_DEVICES", {
            name: this.name,
            error: e.message
        }), []))
    }, T.prototype.discoverUnavailableZWaveDevices = function(e, t, r) {
        return this.discover(e, t).then(e => {
            return e.filter(e => !e.reachable).map(e => {
                const t = r.find(t => t.adapterDeviceId === e.id);
                return t ? (t.status = e.status, t) : {
                    name: e.device.name,
                    adapterDeviceId: e.id,
                    status: e.status
                }
            })
        }).catch(e => (u.error("DISCOVER_OFFLINE_DEVICES_FAILED", {
            name: this.name,
            error: e.message
        }), []))
    }, T.prototype.replace = function(e, t) {
        return this.rpc(e, "replacefailednode", t)
    }, T.prototype.getZWaveControllerRole = function() {
        return h.increaseCounter("deviceadapter-get-controller-mode"), this.rpc("zwave", "getControllerRole")
    }, T.prototype.replicateZWaveNetworkInformation = function() {
        return h.increaseCounter("deviceadapter-replicate-zwave-network"), this.rpc("zwave", "replicateZWaveNetworkInformation")
    }, T.prototype.getZWaveDebugInfo = function() {
        h.increaseCounter("deviceadapter-get-zwave-debug-info");
        const e = "zwave";
        return this._getBaseUrl(e).then(t => this._get({
            uri: t + "/" + e + "/getZWaveDebugInfo",
            timeout: _
        }))
    }, T.prototype.getZWaveParameter = function(e, t) {
        h.increaseCounter("deviceadapter-get-zwave-parameter");
        const r = "zwave";
        return this._getBaseUrl(r).then(n => this._get({
            uri: n + "/" + r + "/getZWaveParameter/" + e + "/" + t,
            timeout: y
        }))
    }, T.prototype.setZWaveParameter = function(e, t) {
        h.increaseCounter("deviceadapter-set-zwave-parameter");
        const r = "zwave";
        return this._getBaseUrl(r).then(n => this._post({
            body: t,
            uri: n + "/" + r + "/setZWaveParameter/" + e,
            timeout: y
        }))
    }, T.prototype.rpc = function(e, t, r) {
        return h.increaseCounter("deviceadapter-send-rpc"), this._getBaseUrl(e).then(n => {
            u.debug("rpc call", {
                adapterName: e,
                functionName: t,
                param: r
            });
            let o = n + "/" + e + "/" + t;
            return r && (o += "/" + r), this._get({
                uri: o,
                timeout: _
            })
        })
    }, T.prototype.reset = function() {
        return h.increaseCounter("deviceadapter-send-reset"), this._post({
            uri: this.baseUrlDeviceadapter + "/reset",
            timeout: _
        }).catch(e => {
            u.error("RESET_DEVICEADAPTER", {
                error: e.message
            })
        })
    }, T.prototype.resetZWave = function() {
        return h.increaseCounter("deviceadapter-send-reset-zwave"), this._post({
            uri: this.baseUrlDeviceadapter + "/zwave/reset",
            timeout: _
        })
    }, T.prototype.getConfig = function() {
        return h.increaseCounter("deviceadapter-get-config"), this._get({
            uri: this.baseUrlDeviceadapter + "/config",
            timeout: y
        }).catch(e => {
            u.error("DEVICEADAPTER_GET_CONFIG_FAILED", {
                error: e.message
            })
        })
    }, T.prototype.setConfig = function(e) {
        return h.increaseCounter("deviceadapter-set-config"), this._post({
            body: e,
            uri: this.baseUrlDeviceadapter + "/config",
            timeout: y
        }).catch(e => {
            u.error("DEVICEADAPTER_SET_CONFIG_FAILED", {
                error: e.message
            })
        })
    }, T.prototype.subscribe = function(e) {
        h.increaseCounter("deviceadapter-send-subscribe");
        const t = e.getKey(),
            r = e.getAdapterDeviceId(),
            o = e.getAdapterName(),
            i = "/subscribe/" + encodeURIComponent(r) + "/" + t;
        return u.debug("subscribe device", {
            deviceKey: t,
            adapterDeviceId: r
        }), this.urlfactory.buildDeviceUrlByDevice(e, o, i).then(e => this._get({
            uri: e,         // uri = http://127.0.0.1:3002/sonos/subscribe/Hobbyruimte/7284515998093279232
            timeout: y
        })).then(() => e).catch(n)
    }, T.prototype.unsubscribe = function(e) {
        h.increaseCounter("deviceadapter-send-unsubscribe");
        const t = e.getKey(),
            r = e.getAdapterDeviceId(),
            o = e.getAdapterName(),
            i = "/unsubscribe/" + encodeURIComponent(r);
        return u.debug("unsubscribe device:", {
            deviceKey: t,
            adapterDeviceId: r
        }), this.urlfactory.buildDeviceUrlByDevice(e, o, i).then(e => this._get({
            uri: e, 
            timeout: y
        })).then(() => e).catch(n)
    }, T.prototype.findAdapterWithCapability = function(e) {
        return h.increaseCounter("deviceadapter-find-capability"), u.debug("findAdapterWithCapability", {
            baseUrl: this.baseUrlDeviceadapter,
            capability: e
        }), this._get({
            uri: this.baseUrlDeviceadapter + "/capability/" + e
        })
    }, T.prototype._getTriggerOptions = function(e, t, r) {
        return new i((n, o) => {
            const i = e.getComponentType(),
                s = e.getDevice(),
                a = s.getAdapterDeviceId() ? "/" + encodeURIComponent(s.getAdapterDeviceId()) : "";
            u.debug("triggering component", {
                type: i,
                adapterDeviceId: s.getAdapterDeviceId()
            });
            const l = {
                method: "GET",
                agent: c,
                timeout: this.timeout
            };
            let p;
            switch (i) {
                case d.COMPONENT_MACRO_TYPE_NAME:
                case d.COMPONENT_TEXTLABEL_TYPE_NAME:
                case d.COMPONENT_IMAGEURL_TYPE_NAME:
                    p = e.getCommand().getPayload(), l.uri = r + p.path + a;
                    break;
                case d.COMPONENT_SWITCH_TYPE_NAME:
                    p = e.getCommand().getPayload(), l.uri = r + p.path + a + "/" + encodeURIComponent(t);
                    break;
                case d.COMPONENT_SLIDER_TYPE_NAME:
                    p = e.getValueCommand().getPayload(), l.uri = r + p.path + a, l.uri += t && t.spotifyUsername ? "/" + encodeURIComponent(t.initialTr2Arg) + "/" + t.spotifyUsername : "/" + encodeURIComponent(t);
                    break;
                case d.COMPONENT_PROCEDURE_TYPE_NAME:
                    l.uri = r + e.getPath() + a, l.method = "POST", t && (l.body = t), l.json = !0;
                    break;
                default:
                    return o(new Error("invalid component type: " + i))
            }
            n(l)
        })
    }, T.prototype.trigger = function(e, t) {
        return h.increaseCounter("deviceadapter-send-trigger"), g.getSpotifyInfoForSonosProcedureIfNecessary(e.name).then(r => (r && (t && "object" == typeof t && !Array.isArray(t) ? t.spotifyUsername = r : t = {
            initialTr2Arg: t,
            spotifyUsername: r
        }), this._getBaseUrlFromDevice(e.getDevice()))).then(r => this._getTriggerOptions(e, t, r)).then(e => (e.agent = c, s(e).catch(n)))
    }, T.prototype.getValue = function(e) {
        AllFunctions(0)("Function 215").debug("getValue (from deviceadapter)" );
        h.increaseCounter("deviceadapter-send-getvalue");
        const t = e.getDevice();
        return u.debug("get value of sensor", {
            sensor: e.name,
            device: t.name
        }), this._getBaseUrlFromDevice(t).then(r => {
            const o = e.getCommand().getPayload();
            return this._get({
                uri: r + o.path + "/" + encodeURIComponent(t.getAdapterDeviceId()),
                agent: c
            }).then(Sensor => {/*AllFunctions(0)("Function 215").debug("deviceadapter returned",Sensor,"for",e.name );*/ return Sensor.value})
            .catch(n => {AllFunctions(0)("Function 215").warning("getValue ERROR (from deviceadapter)",e.name)})
        }).catch(err => AllFunctions(0)("Function 215").warning(" ERROR getValue getDevice:",err ))
    }, T.prototype.browse = function(e, t, r) {
        return h.increaseCounter("deviceadapter-send-browse"), this._getBaseUrl(t).then(t => o(t, e)).then(t => (u.debug("browse directory", {
            uri: t,
            params: r,
            path: e.getPath()
        }), this._post({
            uri: t,
            body: r,
            agent: c
        }))).then(e => (u.debug("browse answer"), m.validateBrowseResult(e), e)).catch(e => {
            const t = l.extractInfo(e);
            throw u.debug("INVALID_BROWSE_RESULT", t), e.alreadyLogged = !0, e
        })
    }, T.prototype.callDirectoryAction = function(e, t, r) {
        AllFunctions(0)("Function 215").verbose("/:directory_key/action : translates directorykeypress into action")
        return h.increaseCounter("deviceadapter-send-action"), this._getBaseUrl(t).then(t => o(t, e, "/action")).then(t => (u.debug("call action on directory", {
            uri: t,
            params: r,
            path: e.getPath()
        }), this._post({
            uri: t,
            body: r,
            agent: c
        }))).catch(e => {
            const t = l.extractInfo(e);
            throw u.error("FAILED_DIRECTORY_ACTION_CALL", t), e
        })
    }, T.prototype._getBaseUrlFromDevice = function(e) {
        return this.urlfactory._getBaseUrlFromDevice(e)
    }, T.prototype._getBaseUrl = function(e, t) {
        return this.urlfactory._getBaseUrl(e, t)
    }
}, function(e) {// Function 216 exports = require("openpgp")
    e.exports = require("openpgp")
}, function(e, t, r) {// Function 217 "neeo-deviceadapter", "cec", "sonos", "zwave", "hue"
    "use strict";
    AllFunctions(0)("Function 217").verbose("Determine baseurl for internal and SDK-adapters (getBaseUrl), builddevices")
    const n = r(1),
        o = r(18),
        i = r(119),
        s = ["neeo-deviceadapter", "cec", "sonos", "zwave", "hue"];
    e.exports = class {
        constructor(e) {
            this.baseUrlDeviceadapter = e
        }
        buildDeviceUrl(e, t, r) {
            return this._getBaseUrl(t, e).then(e => this._formatAdapterURI(e, t, r))
        }
        buildDeviceUrlByDevice(e, t, r) {
            return this._getBaseUrlFromDevice(e).then(e => this._formatAdapterURI(e, t, r))
        }
        _getBaseUrlFromDevice(e) {
            return this._getBaseUrl(e.getSourceName())
        }
        _getBaseUrl(e, t) {
            return new n((r, n) => {
                if (this.isDeviceAdapterInternal(e, t)) return r(this.baseUrlDeviceadapter);
                const o = i.getBaseUrl(t || e);
                AllFunctions(0)("Function 217").debug("_getBaseUrl",o)
                o ? r(o) : n(new Error("Could not find SDK instance " + e))
            })
        }
        _formatAdapterURI(e, t, r) {
            return this.isDeviceAdapterInternal(t) ? e + "/" + t + r : e + "/device/" + t + r
        }
        isDeviceAdapterInternal(e, t) {
            const r = e === o.SOURCE_ADAPTER || s.includes(e),
                n = t === o.SOURCE_ADAPTER || s.includes(t);
            return r || n
        }
        isExternalSDKAdapter(e, t) {
            return !this.isDeviceAdapterInternal(e, t)
        }
    }
}, function(e, t, r) {// Function 218 adapterparser
    "use strict";
    AllFunctions(0)("Function 218").verbose("adapterparser")

    function n(e) {
        return function(e) {
            return 0 <= s.TYPES.indexOf(e)
        }(e) ? e : d[e]
    }

    function o(e) {
        return e ? e.substring(0, u) : void 0
    }
    const i = r(0)("adapterparser"),
        s = r(19),
        a = r(120),
        c = r(58).iconify,
        u = 48,
        d = {
            sonos: s.TYPE_SONOS,
            light: s.TYPE_LIGHT,
            thermostat: s.TYPE_THERMOSTAT,
            accessoire: s.TYPE_ACCESSOIRE,
            undefined: s.TYPE_UNKNOWN
        },
        l = function(e) {
            const t = n(e);
            if (!t) throw i.warn("DEVICEADAPTER_UNSUPPORTED_DEVICECLASS", {
                deviceclass: e
            }), new Error("DEVICEADAPTER_UNSUPPORTED_DEVICECLASS");
            return t
        };
    e.exports = function(e) {
        const t = l(e.type),
            r = e.capabilities || [].forEach(e => {
                e.name = o(e.name), e.label = o(e.label), e.adapterName = o(e.adapterName)
            }),
            n = function(e, t) {
                return e && a.ALLOWED_ICON_NAMES.includes(e.toLowerCase()) ? c(e) : c(t)
            }(e.icon, t),
            i = {
                manufacturer: o(e.manufacturer),
                name: o(e.name),
                type: t,
                driverVersion: e.driverVersion,
                icon: n,
                adapterName: o(e.adapterName),
                id: e.id,
                timing: e.timing || {},
                isTested: !0,
                setup: e.setup || {},
                capabilities: r,
                deviceCapabilities: e.deviceCapabilities || []
            };
        return e.device && e.device.specificname && (i.specificname = o(e.device.specificname)), i
    }
}, function(e, t, r) {// Function 219 iconify
    "use strict";
    AllFunctions(0)("Function 219").verbose("iconify:")
    const n = r(58).iconify;
    e.exports = function(e) {
        return e.adapterName = e.type.toLowerCase(), e.icon = n(e.type), e
    }
}, function(e, t, r) {// Function 220 zwavedevicesync
    "use strict";
    AllFunctions(0)("Function 220").verbose("zwavedevcesync:")
    const n = r(0)("zwavedevicesync"),
        o = "zwave",
        i = "controllerlearn",
        s = {
            [i]: "Learn Mode"
        };
    class a {
        constructor(e, t) {
            this.deviceAdapter = e, this._project = t, this.running = !1, this.pendingDevicesNodeIds = []
        }
        static filterPairedNonConfiguredDevices(e, t) {
            return t.filter(t => {
                return !e.map(e => e.adapterDeviceId).includes(t.id)
            })
        }
        static filterConfiguredNonPairedDevices(e, t) {
            return e.filter(e => {
                return !t.map(e => e.id).includes(e.adapterDeviceId)
            })
        }
        getDevicesDiff() {
            return Promise.all([this.getAllZwaveDevicesFromProject(), this.getAllPairedDevices()]).then(([e, t]) => {
                return [a.filterPairedNonConfiguredDevices(e, t), a.filterConfiguredNonPairedDevices(e, t)]
            })
        }
        getAllZwaveDevicesFromProject() {
            return this._project.getDevices(e => e.details.adapterName === o)
        }
        getAllPairedDevices() {
            return this.deviceAdapter.discover(o, "adapter").then(e => {
                return e.filter(e => !this.pendingDevicesNodeIds.includes(e.id))
            })
        }
        syncWithRemoving() {
            return this.running ? Promise.reject(new Error("ALREADY_SYNCING")) : (n.debug("Syncing Z-Wave with removing"), this.running = !0, this.getDevicesDiff().then(([e, t]) => Promise.all([this.addPairedNotConfiguredDevices(e), this.removeConfiguredNonPairedDevices(t)])).then(() => {
                this.running = !1
            }).catch(e => {
                n.error("ZWAVE_SYNC_WITHREMOVE_FAILED", {
                    message: e.message
                }), this.running = !1
            }))
        }
        syncWithoutRemoving() {
            return this.running ? Promise.reject(new Error("ALREADY_SYNCING")) : (n.debug("Syncing Z-Wave without removing"), this.running = !0, this.getDevicesDiff().then(([e, t]) => Promise.all([this.addPairedNotConfiguredDevices(e), this.logConfiguredNotPairedDevices(t)])).then(() => {
                this.running = !1
            }).catch(e => {
                n.error("ZWAVE_SYNC_WITHOUTREMOVE_FAILED", {
                    message: e.message
                }), this.running = !1
            }))
        }
        addPairedNotConfiguredDevices(e) {
            if (0 === e.length) return Promise.resolve([]);
            const t = e.map(e => {
                const t = e.device.name,
                    r = "adapter" + e.device.dbId,
                    i = e.id;
                return n.debug("add device", t), this._project.addDeviceToFirstRoom(t, r, i, o).then(() => {
                    n.event("Automatically added Z-Wave device " + t)
                })
            });
            return Promise.all(t).then(e => (n.debug("activate project"), this._project.activate(), e))
        }
        logConfiguredNotPairedDevices(e) {
            for (const t of e) n.warn("DEVICE_NOT_IN_NETWORK_ANYMORE", t.key, t.adapterDeviceId);
            return Promise.resolve(e)
        }
        removeConfiguredNonPairedDevices(e) {
            if (0 === e.length) return Promise.resolve([]);
            const t = e.map(e => (n.event("Automatically removed Z-Wave device " + e.name), this._project.deleteDevice(e)));
            return Promise.all(t).then(e => (n.debug("activate project"), this._project.activate(), e)).catch(e => {
                n.warn("REMOVE_CONFIGURED_NONPAIRED_DEVICES_FAILED", {
                    error: e.message
                })
            })
        }
        handleRpcResult(e, t, r) {
            if (e === o) {
                if (!(t === i && r.isOnOtherNetwork)) return void n.debug("SYNC_SKIPPED_INCLUDING_IN_OTHER_NETWORK");
                const e = s[t] || t;
                n.event(`Executed Z-Wave function ${e}`), setTimeout(() => {
                    this.syncWithRemoving()
                }, 5e3)
            }
        }
    }
    e.exports = a
}, function(e, t, r) {// Function 221 devicespecs
    "use strict";
    AllFunctions(0)("Function 221").verbose("devicespecs")

    function n(e, t) {
        if (e.data.generic !== t.data.generic) {
            if (!0 === e.data.generic) return 1;
            if (!0 === t.data.generic) return -1
        }
        if (e.getScore() && t.getScore()) {
            if (e.getScore().score !== t.getScore().score) return e.getScore().score - t.getScore().score;
            if (e.getScore().maxScore !== t.getScore().maxScore) return t.getScore().maxScore - e.getScore().maxScore
        }
        return e.data && t.data ? e.data.name.localeCompare(t.data.name) : 0
    }

    function o(e) {
        return e
    }
    const i = r(222),
        s = r(29),
        a = r(1),
        c = r(18),
        u = r(223),
        d = r(228),
        l = r(0)("devicespecs"),
        p = e.exports = function(e) {
            this.maxSearchResults = e.searchConfig.maxSpecificResults + e.searchConfig.maxGenericResults, this.searchConfig = e.searchConfig, this.adapterBackendUrl = e.adapterBackendUrl, this.sources = {}, this.sources[c.SOURCE_DUIRO] = new u({
                name: c.SOURCE_DUIRO,
                type: c.SOURCE_DUIRO,
                searchConfig: this.searchConfig
            }), this.sources[c.SOURCE_ADAPTER] = new d({
                name: c.SOURCE_ADAPTER,
                type: c.SOURCE_ADAPTER,
                baseUrl: this.adapterBackendUrl
            })
        };
    p.prototype.reloadDuiroData = function() {
        AllFunctions(0)("Function 221").verbose("devicespecs reloadDuiroData")
        return this.sources[c.SOURCE_DUIRO].reloadIndexFile()
    }, p.prototype.search = function(e) {
        AllFunctions(0)("Function 221").verbose("devicespecs reloadDuiroData")
        const t = s(this.sources);
        return a.all(t.map(t => t.search(e).catch(e => (l.debug("DEVICESPEC_IGNORED_SOURCE", {
            source: t.name,
            type: t.type,
            url: t.baseUrl,
            error: e.message
        }), [])))).then(e => {
            return e.reduce((e, t) => t ? e.concat(t) : e, []).filter(o).sort(n).slice(0, this.maxSearchResults).map(e => (e.data.manufacturer = e.data.manufacturer, e.data.name = e.data.name, e.data.type = e.data.type, e.data.adapterName = e.data.adapterName, e.data.id = e.data.id, e.data.isTested = e.data.isTested, e)) || []
        })
    }, p.prototype.splitId = function(e) {
        AllFunctions(0)("Function 221").verbose("devicespecs splitId")
        const t = i(this.sources, e => ({
            type: e.type,
            name: e.name
        })).find(t => 0 === e.indexOf(t.name) || 0 === e.indexOf(t.type));
        if (t) {
            const r = e.substring(t.name.length);
            if (1 > r.length) throw l.error("FAILED_TO_PARSE_ID", {
                id: e
            }), new Error("INVALID_PARAMETER_ID");
            return {
                sourceName: t.name,
                id: r
            }
        }
        throw new Error("DeviceSpec: Failed to parse ID " + e)
    }, p.prototype.getFullSpec = function(e, t) {
        AllFunctions(0)("Function 221 ").verbose("devicespecs getFullSpec e:",e)
        l.debug("getFullSpec", e);
        const r = this.splitId(e);
        AllFunctions(0)("Function 221").verbose("devicespecs after splitId e:",r,t)
        return this.sources[r.sourceName].getFullSpec(r.id, t)
    }, p.prototype.getSpec = function(e) {
        AllFunctions(0)("Function 221").verbose(" devicespecs getSpec")
        l.debug("getSpec", e);
        const t = this.splitId(e);
        return this.sources[t.sourceName].getSpec(t.id)
    }, p.prototype.getCapabilities = function(e, t, r) {
        AllFunctions(0)("Function 221").verbose("devicespecs getCapabilities")
        const n = this.splitId(e);
        return this.sources[n.sourceName].getCapabilities(t, r)
    }, p.prototype.getSourceByName = function(e) {
        AllFunctions(0)("Function 221").verbose("devicespecs getSourceByName")
        return this.sources[e]
    }, p.prototype.updateSearchSources = function(e) {
        AllFunctions(0)("Function 221").verbose("devicespecs updateSearchSources")
        if (!Array.isArray(e)) return void l.debug("INVALID_SEARCH_SOURCE_DATA");
        l.debug("UPDATE SEARCH SOURCES");
        const t = {};
        t[c.SOURCE_DUIRO] = this.sources[c.SOURCE_DUIRO], t[c.SOURCE_ADAPTER] = this.sources[c.SOURCE_ADAPTER], e.forEach(e => {
            l.debug("-> add", e.name); t[e.name] = new d({
                name: e.name,
                type: c.SOURCE_SDK,
                baseUrl: e.baseUrl
            });
        }), this.sources = t
    }
}, function(e) {// Function 222 only contains exports = require("lodash/map")
    e.exports = require("lodash/map")
}, function(e, t, r) {// Function 223 DuiroSpecsSource
    "use strict";
    AllFunctions(0)("Function 223").verbose("DuiroSpecsSource:")

    function n(e) {
        return 500 * Math.ceil(e / 500)
    }
    const o = r(1),
        i = r(11),
        s = r(121),
        a = r(0)("DuiroSpecsSource"),
        c = r(122),
        u = r(224),
        d = r(24),
        l = r(72),
        p = e.exports = function(e) {
            this.deviceFileManager = l, this.maxSpecificResults = e.searchConfig.maxSpecificResults, this.maxGenericResults = e.searchConfig.maxGenericResults, c.call(this, e), this.devices = [], this.devicesIndex = null
        };
    i.inherits(p, c), p.prototype._init = function(e) {
        a.debug("init, map devices"), this.devices = e, this.devices.forEach((e, t) => {
            e.id = t
        }), a.debug("tokensearch"), this.devicesIndex = new s(this.devices, {
            collectionKeys: ["type", "manufacturer", "name"],
            delimiter: /[\s:_\-\/]+/,
            maxFilterTokenEntries: 6,
            threshold: .5
        }), a.debug("device search initialized. device count", e.length)
    }, p.prototype.reloadIndexFile = function() {
        AllFunctions(0)("Function 223").verbose("DuiroSpecsSource: reloadIndexFile")

        return a.debug("RELOAD_INDEX_FILE"), this.deviceFileManager.getDeviceFileContent().then(e => {
            this._init(JSON.parse(e))
        }).catch(e => {
            a.error("DUIROSPEC_LOAD_INDEX", e.message)
        })
    }, p.prototype.getFullSpecById = function(e) {
        AllFunctions(0)("Function 223").verbose("DuiroSpecsSource: getFullSpecById",e)
        return o.resolve(d.getFullDeviceSpec(e)).timeout(32e3).then(e => this._stripGenericCommandsets(e)).then(e => this._roundTimingValueBy500Ms(e))
    }, p.prototype.getDevicesWithUpdates = function(e) {
        return 0 === e.length ? o.resolve([]) : d.checkDevicesForUpdates(e)
    }, p.prototype._search = function(e) {
        function t(e) {
            return !e.generic
        }
        if (!this.devicesIndex) return a.error("NO_DEVICE_INDEX"), o.reject(new Error("NO_DEVICE_INDEX"));
        let r = this.devicesIndex.search(e, {
            preprocessCheck: t
        });
        if (!r || 0 === r.length) {
            const n = e.replace(/(\d+)/, " $1");
            r = this.devicesIndex.search(n, {
                preprocessCheck: t
            })
        }
        let n = [];
        const i = u.updateQueryWithGenericSearchTokens(e);
        0 < i.length && (n = this.devicesIndex.search(i, {
            preprocessCheck: function(e) {
                return !0 === e.generic
            },
            customThreshold: .3
        }));
        const s = r.slice(0, this.maxSpecificResults) || [],
            c = n.slice(0, this.maxGenericResults) || [],
            d = s.concat(c);
        return a.debug("search result:", d.length), o.resolve(d)
    }, p.prototype._getSpec = function(e) {
        AllFunctions(0)("Function 223").verbose("DuiroSpecsSource: _getSpec",e)
        const t = this.devices[e];
        AllFunctions(0)("Function 223").verbose("DuiroSpecsSource: _getSpec done t",t)

        return t || o.reject(new Error("no such devicespec: " + e)), o.resolve(t)
    }, p.prototype._stripGenericCommandsets = function(e) {

        if (!e.commandSets) return e;
        if (e.isGeneric) {
            const t = [],
                r = [];
            return e.commandSets.forEach(e => {
                const n = function(e) {
                    let t, r, n, o = 0;
                    if (0 === e.length) return o;
                    for (t = 0, n = e.length; t < n; t++) o = (o << 5) - o + (r = e.charCodeAt(t)), o |= 0;
                    return o
                }(JSON.stringify(e)); - 1 === t.indexOf(n) && (t.push(n), r.push(e))
            }), e.commandSets = r, e
        }
        return e.commandSets.forEach(e => {
            e.isGeneric && (e.commands = e.commands.filter(e => /^INPUT\s\d*$/.test(e.name)))
        }), e
    }, p.prototype._roundTimingValueBy500Ms = function(e) {
        return e.timing ? (e.timing.standbySourceCommandDelay && (e.timing.standbySourceCommandDelay = n(e.timing.standbySourceCommandDelay)), e.timing.standbyCommandDelay && (e.timing.standbyCommandDelay = n(e.timing.standbyCommandDelay)), e.timing.sourceSwitchDelay && (e.timing.sourceSwitchDelay = n(e.timing.sourceSwitchDelay)), e.timing.shutdownDelay && (e.timing.shutdownDelay = n(e.timing.shutdownDelay)), e) : e
    }, p.prototype._getFullSpec = function(e) {
        AllFunctions(0)("Function 223").verbose("DuiroSpecsSource: _getFullSpec")
        return this._getSpec(e).then(e => this.getFullSpecById({
            type: e.type,
            manufacturer: e.manufacturer,
            name: e.name
        })).then(t => (t.id = e, t))
    }, p.prototype.getCapabilities = function() {
        return o.resolve()
    }
}, function(e, t, r) {// Function 224 GenericDeviceSearch
    "use strict";
    AllFunctions(0)("Function 224").verbose("GenericdeviceSearch:")
    const n = r(0)("GenericDeviceSearch"),
        o = [{
            addTextIfFound: "sony tv",
            searchTokens: ["kdl", "xbr"]
        }, {
            addTextIfFound: "sharp tv",
            searchTokens: ["lc"]
        }, {
            addTextIfFound: "acer tv",
            searchTokens: ["at"]
        }, {
            addTextIfFound: "medion tv",
            searchTokens: ["life", "md", "p1", "s1", "x1"]
        }, {
            addTextIfFound: "panasonic tv",
            searchTokens: ["pt", "tc", "th", "tx"]
        }, {
            addTextIfFound: "philips tv",
            searchTokens: ["pdl", "pfl", "pfs", "pft", "pus", "pfk"]
        }, {
            addTextIfFound: "samsung tv",
            searchTokens: ["fpt", "hg", "hl", "hpt", "kn", "ln", "pn", "ps", "s9", "txt", "ua", "ue", "un"]
        }, {
            addTextIfFound: "grundig tv",
            searchTokens: ["rom"]
        }, {
            addTextIfFound: "loewe tv",
            searchTokens: ["art", "concept", "connect", "individual", "mimo", "reference", "xelos"]
        }, {
            addTextIfFound: "bang & olufsen tv",
            searchTokens: ["beop"]
        }, {
            addTextIfFound: "toshiba tv",
            searchTokens: ["cv", "sl", "tl", "uv", "ux", "vx", "zx"]
        }, {
            addTextIfFound: "vizio tv",
            searchTokens: ["e1", "e2", "e3", "e4", "e5", "e6", "e7", "m3", "m4", "m5", "m6", "m7", "m8", "p5", "p6", "p7", "vx", "xvt"]
        }, {
            addTextIfFound: "lg tv",
            searchTokens: ["ce", "cl", "cm", "cs", "ea", "eb", "ec", "fb", "fc", "fs", "fu", "g2", "ga", "la", "lb", "lc", "ld", "le", "lf", "lg", "lh", "lk", "lm", "ln", "ls", "lt", "lu", "lv", "lw", "lx", "ly", "lz", "pa", "pb", "pc", "pdp", "pg", "ph", "pj", "pk", "pm", "pn", "ps", "pt", "pv", "pw", "px", "py", "pz", "rg", "rt", "rz", "sl", "ub", "z3", "z5"]
        }, {
            addTextIfFound: "avanit dvb",
            searchTokens: ["shd"]
        }];
    e.exports.updateQueryWithGenericSearchTokens = function(e) {
        if (!e) return "";
        const t = e.toLowerCase();
        let r = t.trim(),
            i = !1;
        return !t.includes("generic") && r.length > 4 && o.forEach(e => {
            e.searchTokens.forEach(n => {
                !i && -1 < t.indexOf(n) && (r += " " + e.addTextIfFound, i = !0)
            })
        }), i && n.info("FOUND_GENERIC_SEARCH_INDEX", {
            queryIn: e,
            queryOut: r
        }), r.trim()
    }
}, function(e, t, r) {// Function 225 DeviceFileManager
    "use strict";
    AllFunctions(0)("Function 225").verbose("DeviceFileManager:")

    function n(e, t) {
        h.put("devicefilemanager", e, t.substr(0, 7))
    }
    const o = r(26),
        i = r(123),
        s = r(226),
        a = r(41),
        c = r(227),
        u = r(1),
        d = r(124),
        l = r(0)("DeviceFileManager"),
        p = r(56),
        h = r(87),
        g = r(3),
        f =r(217), 
        SysInfo = r(12),
        m = e.exports = function(e, t) {
            l.debug("init", e), this.account = r(24), this._downloadDir = e.downloadDir, this._fileDir = e.fileDirectory, this._syncExpiresInMs = e.syncExpiresInMs, this._busy = !1, this._notification = t
        };
    m.prototype._checkSum = function(e) {
        AllFunctions(0)("Function 225").verbose("_checkSum e",e)
        return new u(t => {
            const r = a.createHash("sha1"),
                n = o.createReadStream(e);
            l.debug("Calculating sha1sum of", e), n.on("data", e => {
                r.update(e)
            }), n.on("end", () => {
                const n = r.digest("hex");
                l.debug("sha1 sum", {
                    filePath: e,
                    digest: n
                }), t(n)
            }), n.on("error", e => {
                l.warn("CHECKSUM_CALC_FAILED", e), t()
            })
        })
    }, m.prototype._getLocalFilePath = function(e) {
        return this._fileDir + "/" + e
    }, m.prototype._copy = function(e, t) {
        if (l.debug("Copying", {
                fromFilePath: e.name,
                toFilePath: t
            }), e === t) return u.resolve();
        const r = o.createReadStream(e),
            n = o.createWriteStream(t);
        return s(r, n)
    }, m.prototype._download = function(e,t,r) {
        AllFunctions(0)("Function 225").verbose(" _download e",e)
        AllFunctions(0)("Function 225").verbose(" _download t",t)
        AllFunctions(0)("Function 225").verbose(" _download r",r)
        return n(e, r), this._copy(e, t)
    }, m.prototype._tmpdownload = function(e) {
        try {
        if (e.targetDir == undefined)
            {e.targetDir=this._downloadDir;
            e.type="devices";
            }
            AllFunctions(0)("Function 225").verbose(" new download",e)
        return  r(505).tmpdownload(e).then(tmp  => 
            (AllFunctions(0)("Function 225").verbose("returned tmpdownload in 225 with file",tmp),
            this._checkSum(tmp.name)).then(r => 
                {AllFunctions(0)("Function 225").verbose("We have this checksum",r,"for",tmp.name);
                return tmp.name;
                }))
            }
        catch (err) {AllFunctions(0)(err)}

    },  m.prototype._syncPromise = function(e) {
        AllFunctions(0)("Function 225 ").verbose("_syncPromise, item: ",e)        
        const t = this._getLocalFilePath(e.name);
        return this._tmpdownload(e).then(newf =>  this._checkSum(newf).then(r => (AllFunctions(0)("Function 225").verbose("sha compare",r,e.shaSum),r && r === e.shaSum ? (l.debug("Local file matches shaSum. No need to update", e.name), e.filePath = t, n(e.name, e.shaSum), u.resolve(e)) : (l.debug("Local file does not match shaSum! Downloading", e.name), this._download(newf,t,r)))))
    }, m.prototype._syncFileList = function() {
        AllFunctions(0)("Function 225").verbose("_syncFileList",e)
    const n = r(24);

    return (n.isLoggedIn().then( () => {
       const e = ['devices.json','channels.json']
       AllFunctions(0)("Function 225").verbose("_syncFileList; we are loggedIn; devices:",e)
       //            if (!e) return u.reject(Error("empty reply from server"));

       const t = [];
       d(e, (e,r) => {
          var devicefilename = p.FILE_LIST[r];
          var filepath = this._getLocalFilePath(devicefilename);
          AllFunctions(0)("Function 225").verbose("_syncFileList III, item: ",filepath);
          //var sha  = r;
          this._checkSum(filepath).then(sha =>
              t.push(this._syncPromise({
                  name: devicefilename,
                  //url: "http://"+SysInfo.primaryInterfaceAddress()+":8000/"+devicefilename,
                  url: CloudReplacementUrl  +"?type=devices&name="+devicefilename,
                  shaSum : sha
                  //shaSum: 0
              })) )
          });

            return u.all(t);
        }).then(() => (AllFunctions(0)("Function 225").verbose("Updated list of compatible devices; send 'NOTIFICATION_SYNCED'"),l.event("Updated list of compatible devices"), this._busy = !1, this._lastSync = Date.now(), this._notification.send({
            type: p.NOTIFICATION_SYNCED,
            data: this._lastSync
        }))).catch(e => (l.error("SYNC_FAILED", {
            error: e.message
        }), g.increaseCounter("devicefilelist-synchronize-failed"), this._busy = !1, this._lastSync = !1, u.reject(e)))).catch( err  => {AllFunctions(0)("Function 225").error("Error in getdevicefilelist",err)})
    }, m.prototype.refreshFileList = function() {
        AllFunctions(0)("Function 225").verbose("devicefilemanager: e")
return this._syncFileList();

        const e = Date.now() - this._lastSync;
        return !this._lastSync || e > this._syncExpiresInMs ? (l.debug("refresh file list"), this._syncFileList()) : (l.debug("use cached file list, sync expires:", this._syncExpiresInMs - e), u.resolve())
    }, m.prototype.getFileContent = function(e) {
        AllFunctions(0)("Function 225").verbose("getFileContent: e",e)
        if (0 > p.FILE_LIST.indexOf(e)) return u.reject(new Error("unknown file name " + e));
        if (this._busy) return u.reject(new Error("device file manager is syncing"));
        return u.promisify(o.readFile)(this._getLocalFilePath(e)).catch(t => "ENOENT" === t.code ? u.reject(new Error("no such file " + e)) : u.reject(new Error("unexpected error trying to get file content of " + e)))
    }, m.prototype.getChannelFileContent = function() {
        AllFunctions(0)("Function 225").verbose("getChannelFileContent")
        return this.getFileContent(p.FILE_CHANNELS)
    }, m.prototype.getDeviceFileContent = function() {
        AllFunctions(0)("Function 225").verbose("getDeviceFileContent")
        return this.getFileContent(p.FILE_DEVICES)
    }
}, function(e) {// Function 226 contains only exports = require("promisepipe")
    e.exports = require("promisepipe")
}, function(e) {// Function 227 contains only exports = require("tmp")
    e.exports = require("tmp")
}, function(e, t, r) {// Function 228 AdapterSpecsSource
    "use strict";

    function n(e, t = c) {
        return o.get(e, {
            timeout: t
        }).then(e => JSON.parse(e))
    }
    const o = r(17),
        i = r(11),
        s = r(0)("AdapterSpecsSource"),
        a = r(122),
        c = 4e3,
        u = e.exports = function(e) {
            s.debug("init", e), this.baseUrl = e.baseUrl, a.call(this, e)
        };
    i.inherits(u, a), u.prototype._search = function(e) {
        const t = this.baseUrl + "/db/search?q=" + e;
        return s.debug("search adapter:", t), n(t)
    }, u.prototype._getFullSpec = function(e) {
        AllFunctions(0)("CP6 228").verbose("AdapterSpecsSource: getfullspec . E:",e)
        
        return n(this.baseUrl + "/db/" + e)
    }, u.prototype._getAdapterSpec = function(e, t) {
        return n(this.baseUrl + "/db/adapterdefinition/" + e, t)
    }, u.prototype._getCapabilities = function(e, t) {
        return n(this.baseUrl + "/" + e + "/capabilities/" + t)
    }, u.prototype._getSpec = u.prototype._getFullSpec
}, function(e) {// Function 229 contains only exports = require("lodash/union")
    e.exports = require("lodash/union")
}, function(e, t) {// Function 230 ALL_TR2_KEYDEFINITIONS (Names all keys)
    "use strict";
    t.MUTE = "MUTE", t.HOME = "HOME", t.POWER = "POWER", t.VOLUME_UP = "VOLUP", t.VOLUME_DOWN = "VOLDOWN", t.CHANNEL_UP = "CHUP", t.CHANNEL_DOWN = "CHDOWN", t.LEFT = "LEFT", t.RIGHT = "RIGHT", t.UP = "UP", t.DOWN = "DOWN", t.BACK = "BACK", t.OK = "OK", t.MENU = "MENU", t.ALL_TR2_KEYDEFINITIONS = [t.MUTE, t.HOME, t.POWER, t.VOLUME_UP, t.VOLUME_DOWN, t.CHANNEL_UP, t.CHANNEL_DOWN, t.LEFT, t.RIGHT, t.UP, t.DOWN, t.BACK, t.OK, t.MENU]
}, function(e, t, r) {// Function 231 Create keylayout
    "use strict";

    function n(e, t) {
        if (!e) throw new Error("Failed to create keylayout definition: no name given");
        if (!t) throw new Error(`Failed to create keylayout definition "${e}": no params given`);
        this.name = e, this.conditions = t.conditions || [], this.conditions.forEach(t => {
            if (!u.TYPE[t.type]) throw new Error(`Failed to create keylayout definition "${e}": invalid condition type "${t.type}"`)
        }), this.keymappings = t.keymappings || [], 0 === this.keymappings.length && c.debug(`Keylayout definition ${e} has no keymappings defined; will be ignored on resolve`), this.options = t.options || {}
    }

    function o() {
        return Object.keys(d).map(e => d[e].clone()).reduce((e, t) => (e[t.name] = t, e), {})
    }

    function i() {
        d = {}
    }

    function s(e, t) {
        return (e.options.mergePriority || 0) - (t.options.mergePriority || 0)
    }

    function a(e, t) {
        return e.concat(t.keymappings)
    }
    const c = r(46)("KeylayoutDefinition"),
        u = r(73);
    let d = {};
    n.prototype.clone = function() {
        return new n(this.name, {
            conditions: this.conditions,
            keymappings: this.keymappings,
            options: this.options
        })
    }, n.prototype.register = function() {
        return d[this.name] = this, this
    }, n.prototype.check = function(e) {
        return this.conditions.map(e => u.TYPE[e.type](e)).every(t => u.nested(t => t(e))(t))
    }, e.exports = n, e.exports.getKeylayoutDefinitions = o, e.exports.clearKeylayoutDefinitions = i, e.exports.getKeylayoutDefinitionByName = function(e) {
        const t = d[e];
        if (!t) throw new Error(`No keylayout definition with name "${e}" found`);
        return t
    }, e.exports.getKeymappingDefinitionNamesForDevice = function(e) {
        return Object.keys(d).map(e => d[e]).filter(t => t.check(e)).sort(s).reduce(a, [])
    }, e.exports.getKeylayoutDefinitions = o, e.exports.loadLayoutsFrom = function(e) {
        for (const t in i(), e.keylayouts) try {
            new n(t, e.keylayouts[t]).register(), c.debug(`Registered keylayout definition "${t}"`)
        } catch (e) {
            c.error("KEYLAYOUT_DEFINITION_REGISTER_FAILED", {
                name: t,
                msg: e.message
            })
        }
    }
}, function(e, t, r) {// Function 232 KeymappingDefinition
    "use strict";
    const n = r(46)("KeymappingDefinition");
    let o = {},
        i = {};
    class s {
        constructor(e, t) {
            if (!e) throw new Error("Failed to create keymapping definition: no name given");
            if (!t) throw new Error(`Failed to create keymapping definition ${e}: no params given`);
            if (!o.ALL_TR2_KEYDEFINITIONS.includes(t.key)) throw new Error(`Failed to create keymapping definition ${e}: invalid mapping key ${t.key}`);
            this.name = e, this.params = t
        }
        register() {
            return i[this.name] = this, this
        }
        clone() {
            return new s(this.name, this.params)
        }
        applyToKeylayout(e) {
            const t = this.params.key,
                r = this.params.options || {};
            if (!0 === r.remove) return delete e[t], e;
            !0 === r.replace && (e[t] = {
                key: t
            });
            const n = this.params.events || {},
                o = e[t] || {
                    key: t
                };
            return void 0 !== n.onPress && (o.onPress = n.onPress), void 0 !== n.onRelease && (o.onRelease = n.onRelease), void 0 !== n.onLongPress && (o.onLongPress = n.onLongPress), void 0 !== n.onLongPressRepeat && (o.onLongPressRepeat = n.onLongPressRepeat), e[t] = o, e
        }
    }
    e.exports = s, e.exports.loadMappingsFrom = function(e, t) {
        for (const r in o = e, t.keymappings) try {
            new s(r, t.keymappings[r]).register() /*, n.debug(`Registered keymapping definition ${r}`)*/
        } catch (e) {
            n.error("KEYMAPPING_DEFINITION_REGISTER_FAILED", {
                name: r,
                msg: e.message
            })
        }
    }, e.exports.getKeymapingDefinitions = function() {
        return Object.keys(i).map(e => i[e].clone()).reduce((e, t) => (e[t.name] = t, e), {})
    }, e.exports.getKeymappingDefinitionByName = function(e) {
        const t = i[e];
        if (!t) throw new Error(`No keymapping definition with name "${e}" found`);
        return t
    }, e.exports.getMergedKeylayout = function(e) {
        const t = e.map(e => {
            const t = i[e];
            return t || n.error("UNKNOWN_KEYMAPPING_DEFINITION", {
                definitionName: e
            }), t
        }).filter(e => e).reduce((e, t) => t.applyToKeylayout(e), {});
        return Object.keys(t).map(e => t[e])
    }, e.exports.clearKeymappingDefinitions = function() {
        i = {}
    }
}, function(e) {// Function 233 looks like init ViewStructureForScenario and DuiStructure
    "use strict";

    function t(e, t) {
        const r = e.room.getScenarios(e => e.mainDeviceKey === t.deviceKey)[0];
        return {
            name: t.name,
            data: {
                scenarioKey: r.key,
                widget: t
            }
        }
    }

    function r(e, r) {
        return r.map(r => t(e, r))
    }

    function n(e) {
        return e.reduce((e, t) => {
            return t.options && t.options.powerOffSlide ? e.powerOffSlide.push(t) : e.regularSlide.push(t), e
        }, {
            regularSlide: [],
            powerOffSlide: []
        })
    }
    e.exports = {
        getViewStructureForScenario: function(e, o, i, s) {
            const a = {
                slides: [],
                powerOffSlides: [],
                keymapping: s
            };
            return o.reduce((t, o) => {
                const {
                    regularSlide: i,
                    powerOffSlide: s
                } = n(o);
                return i.length && t.slides.push(r(e, i)), s.length && t.powerOffSlides.push(r(e, s)), t
            }, a), i && (a.footer = t(e, i)), a
        },
        getDuiStructure: function(e, t) {
            const r = {
                    slides: [],
                    powerOffSlides: []
                },
                o = e => ({
                    name: e.name,
                    data: {
                        widget: e
                    }
                });
            return e.reduce((e, t) => {
                const {
                    regularSlide: r,
                    powerOffSlide: i
                } = n(t);
                return r.length && e.slides.push(r.map(o)), i.length && e.powerOffSlides.push(i.map(o)), e
            }, r), t && (r.footer = o(t)), r
        }
    }
}, function(e, t, r) {// Function 234 looks like higher level screen layout
    "use strict";

    function n(e, t) {
        try {
            const r = new m(e, t);
            t.description || g.warn("SLIDE_MISSING_DESCRIPTIVE_NAME", {
                name: e
            }), E[e] = r, g.debug(`Registered slide preset "${r.name}".`)
        } catch (t) {
            g.error("SLIDEPRESET_REGISTER_FAILED", {
                name: e,
                msg: t.message
            })
        }
    }

    function o(e, t) {
        const r = u(e.weight),
            n = u(t.weight);
        return r && n ? e.weight - t.weight : r && !n ? -1 : !r && n ? 1 : (t.options.viewOrderPriority || 0) - (e.options.viewOrderPriority || 0)
    }

    function i(e, t) {
        return (t.options.resolvePriority || 0) - (e.options.resolvePriority || 0)
    }

    function s(e, t, r) {
        const n = Object.keys(t).reduce((n, o) => {
            const i = e.getDeviceByKey(o),
                s = Object.keys(t[o]),
                a = function(e, t) {
                    return d(E).filter(r => r.check(e, t))
                }(i, s),
                c = a.filter(e => (function(e, t, r) {
                    const n = t || !0 === e.options.isScenarioControl,
                        o = !r.find(t => t.name === e.options.superset);
                    return n && o
                })(e, r === o, a)).map(r => {
                    const n = r.clone();
                    return n.widgets = n.getWidgets(s).map(e => t[o][e]), n.description = function(e, t) {
                        if (f.test(e.description) && 0 < e.widgets.length) {
                            const r = t.getDeviceByKey(e.widgets[0].deviceKey);
                            return e.description.replace(f, r.name)
                        }
                        return e.description
                    }(n, e), n
                });
            return n.concat(c)
        }, []);
        return p(n, (e, t) => {
            return !0 === e.options.isUnique && e.name === t.name
        })
    }

    function a(e) {
        let t = !1;
        return e.sort(i).filter(e => {
            const r = t;
            return t = r || !!e.options.clearBeforeInsert, !r
        })
    }

    function c(e) {
        return e.sort(o).map(e => e.widgets)
    }
    var u = Number.isFinite;
    const d = r(29),
        l = r(127),
        p = r(235),
        h = r(236),
        g = r(46)("SlidePresets"),
        m = r(237),
        f = /{{device}}/;
    let E = {};
    e.exports = {
        getSlides: function(e, t, r) {
            AllFunctions(0)("Function 234").verbose("getSlides");
            return c(a(function(e, t) {
                AllFunctions(0)("Function 234").verbose("getSlides after c:",e.name,e.slides);
                return e.slides && 0 < Object.keys(e.slides).length ? t.reduce((t, r) => {
                    const n = Object.assign({}, r),
                        o = e.slides[r.name];
                    return o && o.hidden ? t : (o && u(o.weight) && (n.weight = o.weight), t.push(n), t)
                }, []) : t
            }(e, s(e, t, r))))
        },
        getSlideDescriptions: function(e, t, r) {
            return a(s(e, t, r)).filter(e => !e.widgets.some(e => e.options.isFooter || e.options.powerOffSlide)).sort(o).map(e => {
                const t = function(e) {
                    return e.widgets.some(e => e.options.skipSlideIfHardwareKeypad)
                }(e);
                return {
                    id: e.name,
                    name: e.description,
                    mobileAppOnly: t
                }
            })
        },
        getPresetByName: function(e) {
            const t = l(E, t => t.name === e);
            if (!t) throw new Error(`No slide preset with name "${e}" found.`);
            return t
        },
        clearPresets: function() {
            E = {}
        },
        loadSlidesFromDefinition: function(e) {
            for (const t in e.presets) n(t, e.presets[t])
        },
        getAllReferencesWidgetNames: function() {
            const e = Object.keys(E).map(e => [].concat.apply([], E[e].widgets));
            return h([].concat.apply([], e).map(e => e.replace(/\^|!/, "")))
        },
        registerSlide: n
    }
}, function(e) {// Function 235 only contains exports = require("lodash/uniqWith")
    e.exports = require("lodash/uniqWith")
}, function(e) {// Function 236 only contains exports = require("lodash/uniq")
    e.exports = require("lodash/uniq")
}, function(e, t, r) {// Function 237 Create slide presets
    "use strict";

    function n(e, t) {
        if (!t) throw new Error(`Failed to create slide preset "${e}": no params given`);
        if (this.name = e, this.description = t.description || e, this.conditions = t.conditions || [], this.conditions.forEach(t => {
                if (!o.TYPE[t.type]) throw new Error(`Failed to create slide preset "${e}": invalid condition type "${t.type}"`)
            }), this.widgets = t.widgets || [], !(this.widgets instanceof Array)) throw new Error(`Failed to create slide preset "${e}": widgets is not undefined or Array`);
        this.options = t.options || {}
    }
    const o = r(73);
    e.exports = n, n.prototype.clone = function() {
        const e = new n(this.name, {
            conditions: this.conditions,
            widgets: this.widgets,
            options: this.options,
            description: this.description
        });
        return delete e.register, e
    }, n.prototype.check = function(e, t) {
        const r = this.conditions.map(e => o.TYPE[e.type](e)),
            n = o.TYPE.LIST({
                find: this.widgets
            });
        return (t => 0 === t.length || o.nested(t => t(e))(t))(r) && n(t)
    }, n.prototype.getWidgets = function(e) {
        const t = r => r.map(r => r instanceof Array ? t(r)[0] : "^" === r[0] && -1 !== e.indexOf(r.slice(1)) ? r.slice(1) : -1 === e.indexOf(r) ? null : r).filter(e => !!e);
        return t(this.widgets)
    }
}, function(e, t, r) {// Function 238 Routines for load/get/lookup widgets
    "use strict";

    function n(e, t) {
        const r = new a(e, t);
        c[r.name] = r, i.debug(`Registered widget ${e}`)
    }
    const o = r(29),
        i = r(46)("Widgets"),
        s = r(128),
        a = r(239);
    let c = {};
    e.exports = {
        loadWidgets: function(e) {
            AllFunctions(0)("Function 238").debug("loadWidgets");
            c = {};
            const t = new Set;
            for (const r in e.widgets) {
                const o = e.widgets[r];
                try {
                    n(r, o)
                } catch (e) {
                    i.error("WIDGET_REGISTER_FAILED", {
                        name: r,
                        msg: e.message
                    })
                }
                if (t.has(o.key)) throw new Error("Duplicate widget id found: " + o.key);
                t.add(o.key)
            }
        },
        getWidgets: function() {
            AllFunctions(0)("Function 238").debug("getWidgets");

            return Object.keys(c).reduce((e, t) => {
                const r = c[t].clone();
                return e[r.name] = r, e
            }, {})
        },
        getWidgetByName: function(e) {
            AllFunctions(0)("Function 238").debug("getWidgetByName",e);
            const t = c[e];
            if (!t) throw s.increaseCounter("widget-invalid-name"), new Error(`No widget with name "${e}" found`);
            return s.increaseCounter("widget-requests"), t
        },
        getWidgetsForDevice: function(e) {
            AllFunctions(0)("Function 238").debug("getWidgetsForDevice",e.name);
            if (!e.key) throw s.increaseCounter("widget-invalid-devicekey"), new Error("device is missing key attribute");
            return o(c).filter(t => t.check(e)).reduce((t, r) => {
                const n = r.clone();
                return n.deviceKey = e.key, t[r.name] = n, t
            }, {})
        }
    }
}, function(e, t, r) {// Function 239 Routines for creating widget
    "use strict";
    const n = r(73),
        o = function(e, t) {
            if (!e) throw new Error("Failed to create widget: no name given");
            if (!t) throw new Error(`Failed to create widget "${e}": no params given`);
            if (!t.label) throw new Error("Failed to create widget: no label given");
            if (!t.key) throw new Error("Failed to create widget: no key given");
            this.name = e, this.label = t.label, this.conditions = t.conditions || [], this.conditions.forEach(t => {
                if (!n.TYPE[t.type]) throw new Error(`Failed to create slide preset "${e}": invalid condition type "${t.type}"`)
            }), this.options = t.options || {}, this.layoutDefinitions = t.layoutDefinitions || {}, this.key = t.key, this.weight = parseInt(this.key, 10)
        };
    o.prototype.clone = function() {
        return new o(this.name, {
            label: this.label,
            conditions: this.conditions,
            options: this.options,
            layoutDefinitions: this.layoutDefinitions,
            weight: this.weight,
            key: this.key
        })
    }, o.prototype.check = function(e) {
        return this.conditions.map(e => n.TYPE[e.type](e)).every(t => n.nested(t => t(e))(t))
    }, e.exports = o
}, function(e, t, r) {// Function 240 Get data for creating widget
    "use strict";

    function n(e, t) {
        const r = [],
            n = o(e);
        n.data.widget[t] = [];
        const i = e.data.widget[t];
        let a = o(n),
            c = new s;
        if (i.forEach(e => {
                if (!c.hasSpaceInGrid(e)) {
                    const e = o(a);
                    r.push([e]), a = o(n), c = new s
                }
                c.updateGrid(e), a.data.widget[t].push(e)
            }), 0 < a.data.widget[t].length) {
            const e = o(a);
            r.push([e])
        }
        return r
    }
    const o = r(241),
        i = r(47),
        s = r(242),
        a = "shortcuts",
        c = "lights";
    e.exports = {
        process: function(e) {
            let t = [];
            return e.forEach(e => {
                const r = function(e) {
                    const t = e[0],
                        r = i(t, "data.widget.options.isMultiSlide", !1),
                        o = i(t, "data.widget.shortcuts.length", !1),
                        s = i(t, "data.widget.lights.length", !1);
                    return r && o ? n(t, a) : r && s ? n(t, c) : [e]
                }(e);
                t = t.concat(r)
            }), t
        }
    }
}, function(e) {// Function 241 only contains exports = require("lodash/cloneDeep")
    e.exports = require("lodash/cloneDeep")
}, function(e) {// Function 242 unclear, checks for hassspaceingrid, multirow,snglerow and update for them
    "use strict";

    function t(e, t) {
        return void 0 !== t && void 0 !== e && t <= n && e <= r
    }
    const r = 4,
        n = 3;
    e.exports = class {
        constructor() {
            this.grid = [...[, , , , ]].map(() => [, , , ].fill(!1))
        }
        hasSpaceInGrid(e) {
            const r = e.data.widget.layoutDefinitions,
                n = r.rows,
                o = r.columns;
            return !!t(n, o) && (1 === n ? this.checkSingleRow(o) : this.checkMultiRow(n))
        }
        checkMultiRow(e) {
            return this.getEmptyRowsCount() >= e
        }
        checkSingleRow(e) {
            let t = e;
            for (let e = n - 1; 0 <= e; e--)
                if (0 < t) {
                    this.grid[r - 1][e] || t--
                } return 0 === t
        }
        getEmptyRowsCount() {
            let e = 0;
            for (let t, o = 0; o < r; o++) {
                t = !0;
                for (let e = 0; e < n; e++) !0 === this.grid[o][e] && (t = !1);
                t && e++
            }
            return e
        }
        updateGrid(e) {
            const t = e.data.widget.layoutDefinitions;
            return 1 === t.rows ? this.updateSingleRow(t) : this.updateMultiRow(t)
        }
        updateMultiRow(e) {
            const t = e.rows;
            let o = -1;
            for (let e = 0; e < r; e++)
                if (!1 === this.grid[e][0]) {
                    o = e;
                    break
                } if (-1 < o && o + t <= r)
                for (let e = o; e < o + t; e++)
                    for (let t = 0; t < n; t++) this.grid[e][t] = !0
        }
        updateSingleRow(e) {
            let t = e.columns;
            for (let o = 0; o < r; o++) {
                const r = [];
                for (let e = 0; e < n; e++)
                    if (0 < t) {
                        const n = o + 1,
                            i = !this.grid[n] || !1 === this.grid[n][e];
                        !this.grid[o][e] && i && (t--, r.push(e))
                    } if (0 < r.length && r.length === e.columns) return void r.forEach(e => {
                    this.grid[o][e] = !0
                });
                t = e.columns
            }
        }
    }
}, function(e, t, r) {// Function 243 unclear, addScenarioData, registerWidgetHandlers, setNonAutomatableInfoGetter
    "use strict";

    function n(e) {
        return e
    }

    function o(e, t, r) {
        return e ? e.map(e => (function(e, t, r) {
            return e.map(e => s.addDataTo(e, t, r)).filter(n)
        })(e, t, r)).filter(e => 0 < e.length) : void 0
    }

    function i(e, t, r) {
        if (e) return s.addDataTo(e, t, r)
    }
    const s = r(244),
        a = () => !1;
    let c = a;
    e.exports = {
        addScenarioData: function(e, t, r) {
            const n = function(e, t) {
                return e.getPowerInfoDevices(t).reduce((r, n) => {
                    const o = c(e, t, n);
                    return o && o.powerToggle && (r[n.key] = r[n.key] || {}, r[n.key].powerToggle = o.powerToggle), o && o.inputSwitch && (r[n.key] = r[n.key] || {}, r[n.key].inputSwitch = o.inputSwitch), r
                }, {})
            }(t, r);
            return {
                slides: o(e.slides, t, r),
                powerOffSlides: o(e.powerOffSlides, t, r),
                keymapping: e.keymapping,
                footer: i(e.footer, t, r),
                powerModeInfo: n
            }
        },
        registerWidgetHandlers: function(e) {
            s.registerWidgetHandlers(e)
        },
        setNonAutomatableInfoGetter: function(e) {
            metaLog({type:LOG_TYPE.DEBUG,content:"setNonAutomatableInfoGetter "+e});
            //console.log("243, e=",e);
            return "function" == typeof e ? void(c = e) : void(c = a)
        }
    }
}, function(e, t, r) {// Function 244 WidgetViewDataFetcher
    "use strict";
    r(46)("WidgetViewDataFetcher");
    const n = 1;
    let o = [];
    e.exports = {
        addDataTo: function e(t, r, i, s = 0) {
            const a = o.find(e => {
                if (e.match(t.name)) return e
            });
            if (a) try {
                a.addDataToWidget(t, r, i);
                const o = a.getChildren && s < n;
                return o && a.getChildren(t).forEach(t => e(t, r, i, s + 1)), t
            } catch (r) {
                return void o.error("ADD_DATA_TO_WIDGET_FAILED", {
                    widgetName: t.name,
                    msg: r.message
                })
            }
            return t
        },
        registerWidgetHandlers: function(e) {
            if (!Array.isArray(e)) throw new Error("Invalid handlers, must be an array:" + e);
            o = e
        }
    }
}, function(e) {// Function 245 addDataToWidget, match e returning true/false
    "use strict";
    e.exports = {
        addDataToWidget: function(e, t) {
            const r = e.data.widget,
                n = t.getDeviceByKey(r.deviceKey);
            return r.deviceName = n.name, e
        },
        match: function(e) {
            return t.includes(e)
        }
    };
    const t = ["neeo.compatibility.no-commandsets-available"]
}, function(e) {// Function 246 addDataToWidget, match e returning "neeo.default.favorites" if not
    "use strict";
    e.exports = {
        addDataToWidget: function(e, t) {
            const r = e.data.widget,
                n = t.getDeviceByKey(r.deviceKey),
                o = n.getRoomKey();
            r.roomKey = o, r.isTuner = n.hasCapability("neeo.device.type.tuner");
            const i = r.deviceKey;
            return r.favorites = n.getFavorites().map((e, t) => Object.assign({
                roomKey: o,
                deviceKey: i,
                idx: t
            }, e)), e
        },
        match: function(e) {
            return "neeo.default.favorites" === e
        }
    }
}, function(e, t, r) {// Function 247 addDataToWidget, match e returning "neeo.default.footer.volume" if not
    "use strict";
    const n = r(60);
    e.exports = {
        addDataToWidget: function(e, t, r) {
            const o = e.data.widget,
                i = r.getVolumeDevice(),
                s = n.getMacrosByNames(i, ["VOLUME UP", "MUTE TOGGLE", "VOLUME DOWN"]);
            return o.macros = s, e
        },
        match: function(e) {
            return "neeo.default.footer.volume" === e
        }
    }
}, function(e, t, r) {// Function 248 addDataToWidget, match e returning "neeo.default.shortcuts" if not
    "use strict";
    const n = r(249);
    e.exports = {
        addDataToWidget: function(e, t, r) {
            return e.data.widget.shortcuts = n.getShortcutWidgets(t, r), e
        },
        match: function(e) {
            return "neeo.default.shortcuts" === e
        },
        getChildren: function(e) {
            return e.data.widget.shortcuts || []
        }
    }
}, function(e, t, r) {// Function 249 shortcutWidgetResolver
    "use strict";

    function n(e, t) {
        switch (t.componentType) {
            case a.COMPONENT_GAP_TYPE_NAME:
                return o(e, t, d);
            case a.COMPONENT_MACRO_TYPE_NAME:
                return o(e, t, "neeo.default.component.button");
            case a.COMPONENT_SWITCH_TYPE_NAME:
                return o(e, t, "neeo.default.component.switch");
            case a.COMPONENT_SLIDER_TYPE_NAME:
                return o(e, t, "neeo.default.component.slider");
            case a.COMPONENT_TEXTLABEL_TYPE_NAME:
                return o(e, t, "neeo.default.component.textlabel");
            case a.COMPONENT_IMAGEURL_TYPE_NAME:
                return o(e, t, "neeo.default.component.imageurl");
            case a.COMPONENT_DIRECTORY_TYPE_NAME:
                return o(e, t, "neeo.default.component.directory");
            case a.COMPONENT_WIDGET_TYPE_NAME:
                return function(e, t, r) {
                    const n = i(e, t, r);
                    return c.increaseCounter("shortcut-build"), n
                }(e, t, t.componentName);
            default:
                s.error("SHORTCUT_TO_WIDGET_RESOLVE_FAILED_" + t.componentType)
        }
    }

    function o(e, t, r) {
        const n = i(e, t, r);
        if (n.name === d) return c.increaseCounter("shortcut-gap-build"), n;
        const o = e.getDeviceByKey(t.deviceKey).getComponentByKey(t.componentKey);
        if (!o) return c.increaseCounter("shortcut-invalid-component"), void s.error("INVALID_SHORTCUT", {
            device: t.deviceKey,
            component: t.componentKey,
            widgetName: r
        });
        const a = n.data.component = o.toJSON();
        return a.icon = t.icon,
            function(e, t) {
                return e.customName && !l.includes(t.componentType)
            }(t, a) && (a.label = t.customName, a.deviceName = " "), c.increaseCounter("shortcut-build"), n
    }

    function i(e, t, r) {
        const n = e.getScenarioByDeviceKey(t.deviceKey),
            o = function(e) {
                try {
                    return u.getWidgetByName(e).clone()
                } catch (t) {
                    s.debug("IGNORING_UNKNOWN_WIDGET", {
                        name: e
                    })
                }
            }(r);
        return o ? (o.deviceKey = t.deviceKey, {
            key: t.key,
            name: r,
            data: {
                scenarioKey: n ? n.key : void 0,
                widget: o,
                customLabel: t.customName
            }
        }) : (c.increaseCounter("shortcut-invalid-widget"), void s.error("MISSING_DEVICE_OR_INVALID_WIDGET", {
            device: t.deviceName,
            component: t.componentName,
            widgetName: r
        }))
    }
    const s = r(0)("shortcutWidgetResolver"),
        a = r(8),
        c = r(3),
        u = r(92),
        d = "neeo.default.component.gap",
        l = ["textlabel"];
    e.exports = {
        getShortcutWidgets: function(e, t) {
            return t.getShortcuts().map(t => n(e, t)).filter(e => e)
        }
    }
}, function(e, t, r) {// Function 250 addDataToWidget, match e returning "neeo.default.lights" if not
    "use strict";
    const n = r(251);
    e.exports = {
        addDataToWidget: function(e, t, r) {
            return e.data.widget.lights = n.getLightsWidgets(r), e
        },
        match: function(e) {
            return "neeo.default.lights" === e
        },
        getChildren: function(e) {
            return e.data.widget.lights || []
        }
    }
}, function(e, t, r) {// Function 251 shortcutWidgetResolver getLightsWidgets
    "use strict";

    function n(e) {
        const t = e.getSliders().filter(i),
            r = o(e.getSwitches(), e.key, "neeo.default.component.switch"),
            n = o(t, e.key, "neeo.default.component.slider"),
            s = n.map((e, t) => {
                const n = Object.assign({}, e);
                return r && r[t] && (n.data.widget.attachedSwitchComponentName = r[t].data.widget.componentName), n
            }),
            a = n.length;
        return [...s, ...r.slice(a)]
    }

    function o(e, t, r) {
        return s(e, e => {
            return function(e, t, r) {
                const n = function(e) {
                    try {
                        return u.getWidgetByName(e).clone()
                    } catch (t) {
                        a.debug("IGNORING_UNKNOWN_WIDGET", {
                            name: e
                        })
                    }
                }(r);
                return n ? (n.deviceKey = t, n.componentName = e.name, {
                    key: e.key,
                    name: r,
                    data: {
                        widget: n
                    }
                }) : void c.increaseCounter(`lights-invalid-widget-${r}`)
            }(e, t, r)
        })
    }

    function i(e) {
        const t = e && e.name && e.name.toLowerCase();
        return d.some(e => e.test(t))
    }
    const s = r(130),
        a = r(0)("shortcutWidgetResolver"),
        c = r(3),
        u = r(92);
    e.exports = {
        getLightsWidgets: function(e) {
            const t = e.getDevices(e => "LIGHT" === e.details.type);
            return s(t, n).filter(e => e)
        }
    };
    const d = [/^brightness/, /^set_multilevelswitch/]
}, function(e, t, r) {// Function 252 addDataToWidget, match e returning "sonos.controls" if not
    "use strict";
    const n = r(19),
        o = r(60);
    e.exports = {
        addDataToWidget: function(e, t, r) {
            const i = e.data.widget,
                s = r.getMainDevice(),
                a = r.getVolumeDevice();
            if (a.key !== s.key && a.getType() !== n.TYPE_SONOS) {
                const e = o.getMacrosByNames(a, ["VOLUME UP", "MUTE TOGGLE", "VOLUME DOWN"]);
                i.useIRVolumeDeviceForFooter = !0, i.volumeMacros = e
            }
            return e
        },
        match: function(e) {
            return "sonos.controls" === e
        }
    }
}, function(e, t, r) {// Function 253 addDataToWidget, match e result, ["neeo.default.button-set.transport-timeshift"]
    "use strict";

    function n(e) {
        return e.in && Array.isArray(e.in) && e.in.includes("macroNames")
    }
    const o = r(94),
        i = r(60);
    e.exports = {
        addDataToWidget: function(e, t) {
            const r = e.data.widget,
                s = t.getDeviceByKey(r.deviceKey),
                a = r.conditions.filter(n).map(e => o(e.find)),
                c = i.getMacrosByNames(s, o(a));
            return r.macros = c, e
        },
        match: function(e) {
            return s.test(e) && !a.includes(e)
        }
    };
    const s = /^neeo\.default\.button-set\./,
        a = ["neeo.default.button-set.transport-timeshift"]
}, function(e, t, r) {// Function 254 addDataToWidget, match e returning, ["neeo.default.inputs", "neeo.default.inputs-hdmiswitch", "neeo.default.inputs-generic"
    "use strict";

    function n(e, t) {
        return "neeo.default.inputs" === t ? o.getMacrosByRegex(e, /^INPUT /) : "neeo.default.inputs-hdmiswitch" === t ? o.getMacrosByRegex(e, /^INPUT HDMI/) : "neeo.default.inputs-generic" === t ? o.getGenericMacrosByRegex(e, /^INPUT /) : void 0
    }
    const o = r(60),
        i = ["neeo.default.inputs", "neeo.default.inputs-hdmiswitch", "neeo.default.inputs-generic"];
    e.exports = {
        addDataToWidget: function(e, t) {
            const r = e.data.widget,
                o = t.getDeviceByKey(r.deviceKey);
            return r.macros = n(o, r.name), r.maxInputsPerSlide = 12, e
        },
        match: function(e) {
            return i.includes(e)
        }
    }
}, function(e, t, r) {// Function 255 addDataToWidget, match e returning "neeo.player.controls" if not
    "use strict";

    function n(e, t) {
        e.externalVolumeDeviceMacros = o.getMacrosByNames(t, ["VOLUME UP", "MUTE TOGGLE", "VOLUME DOWN"])
    }
    const o = r(60);
    e.exports = {
        addDataToWidget: function(e, t, r) {
            const o = e.data.widget,
                i = r.getMainDevice();
            ! function(e, t) {
                e.directories = {
                    queue: t.getDirectoryByRole("QUEUE"),
                    root: t.getDirectoryByRole("ROOT")
                }, e.sliders = {
                    volume: t.getSliderByName("VOLUME")
                }, e.switches = {
                    play: t.getSwitchByName("PLAYING"),
                    mute: t.getSwitchByName("MUTE")
                }, e.macros = {
                    nextTrack: t.getMacroByName("NEXT TRACK"),
                    previousTrack: t.getMacroByName("PREVIOUS TRACK"),
                    shuffle: t.getMacroByName("SHUFFLE TOGGLE"),
                    repeat: t.getMacroByName("REPEAT TOGGLE"),
                    clearQueue: t.getMacroByName("CLEAR QUEUE")
                }, e.sensors = {
                    shuffle: t.getSensorByName("SHUFFLE_SENSOR"),
                    repeat: t.getSensorByName("REPEAT_SENSOR"),
                    coverArt: t.getSensorByName("COVER_ART_SENSOR"),
                    description: t.getSensorByName("DESCRIPTION_SENSOR"),
                    title: t.getSensorByName("TITLE_SENSOR")
                }
            }(o, i);
            const s = r.getVolumeDevice();
            return s.key !== i.key && n(o, s), e
        },
        match: function(e) {
            return "neeo.player.controls" === e
        }
    }
}, function(e, t, r) {// Function 256 DuiroDeviceUpdater
    "use strict";

    function n(e) {
        AllFunctions(0)("Function 256").verbose("DuiroDeviceUpdater");
        return e.hasCapability(g.SOURCE_DUIRO) ? function(e) {
            const t = a(e.details);
            return f.getFullSpecById(t)
        }(e).then(t => (function(e, t) {
            return [o(e, t), E(e, t)].filter(e => e).reduce((e, t) => t ? c(e || {}, t) : t, !1)
        })(e, t)).then(t => (function(e, t) {
            return t && (p.event(`Updated ${e.details.manufacturer} ${e.details.name}`), e.reloadCapabilities()), t
        })(e, t)) : l.resolve(!1)
    }

    function o(e, t) {
        const r = u(e, "details", {
                deviceversion: 0
            }),
            n = r.deviceversion,
            o = ! function(e, t) {
                const r = e.deviceversion,
                    n = t.version,
                    o = _.some(r => {
                        const n = !!t[r],
                            o = !v[r](e, t);
                        return n && o
                    });
                return n && r < n || o
            }(r, t),
            i = r.type.toLowerCase(),
            s = u(t, `${i}.presetSettings`);
        return !o && (r.timing = t.timing || r.timing, r.presetSettings = s || r.presetSettings, r.deviceversion = t.version, r.deviceCapabilities = t.deviceCapabilities, r.connections = y.getConnections(t), r.hdmiVersion = y.getHDMIVersion(t), e.details = r, p.info("DEVICE_UPDATED", {
            deviceUniqueName: a(r),
            from: n,
            to: r.deviceversion
        }), {})
    }

    function i(e) {
        return "duiro" === e.details.sourceName
    }

    function s(e) {
        return {
            name: e.details.name,
            type: e.details.type,
            manufacturer: e.details.manufacturer,
            deviceversion: e.details.deviceversion,
            commandSets: e.details.commandSets.map(e => ({
                name: e.name,
                isGeneric: e.isGeneric,
                version: e.version
            }))
        }
    }

    function a(e) {
        return {
            name: e.name,
            type: e.type,
            manufacturer: e.manufacturer
        }
    }
    const c = r(48),
        u = r(47),
        d = r(74),
        l = r(1),
        p = r(0)("DuiroDeviceUpdater"),
        h = r(3),
        g = r(21),
        m = r(18),
        f = r(45).sources[m.SOURCE_DUIRO],
        E = r(257),
        y = r(132),
        _ = ["deviceCapabilities", "connections"],
        v = {
            deviceCapabilities: (e, t) => d(e.deviceCapabilities, t.deviceCapabilities),
            connections: (e, t) => {
                const r = y.getConnections(t);
                return d(e.connections, r)
            }
        };
    e.exports = {
        checkDevicesForUpdate: function(e) {
            p.debug("AUTO_UPDATE_CHECK_STARTING");
            const t = e.getDevices().filter(i).map(s);
            return f.getDevicesWithUpdates(t).then(t => (function(e, t) {
                return e.getDevices().filter(function(e) {
                    return t.some(t => t.name === e.details.name && t.type === e.details.type && t.manufacturer === e.details.manufacturer)
                })
            })(e, t))
        },
        bulkUpdateDevices: function(e) {
            AllFunctions(0)("Function 256").verbose("bulkUpdateDevices");
            return l.resolve(e).mapSeries(e => n(e).then(e => (h.increaseCounter("duiro-device-auto-update-count"), e)).catch(t => {
                h.increaseCounter("duiro-device-auto-update-failed-count");
                const r = a(e.details);
                return p.debug("BULK_UPDATE_DEVICE_FAILED", {
                    deviceId: r,
                    msg: t.message
                }), !1
            })).then(e => e.reduce((e, t) => t ? e + 1 : e, 0))
        },
        checkForAndUpdateDevice: n
    }
}, function(e, t, r) {// Function 257 CommandSetUpdater
    "use strict";

    function n(e, t) {
        const r = l(e, "command.payload"),
            n = l(t, "command.payload");
        return !a(r, n)
    }

    function o(e) {
        return {
            type: e.details.type,
            manufacturer: e.details.manufacturer,
            name: e.details.name
        }
    }

    function i(e, t, r) {
        const i = o(e),
            s = t.isGeneric,
            a = s ? "genericMacros" : "macros",
            d = s ? "genericMacroNames" : "macroNames",
            m = r[a];
        let f = 0,
            E = 0;
        const y = c(Object.keys(m), e[d]),
            _ = u(Object.keys(m), e[d]).filter(t => n(e[a].get(t), m[t]));
        _.forEach(t => {
            try {
                const r = e[a].get(t),
                    n = g.build(m[t], e);
                n.key = r.key, e[a].remove(r), e[a].put(n), E++
            } catch (e) {
                h.error(`DEVICE_${s?"GENERICMACRO":"MACRO"}_UPDATE_FAILED`, e.message)
            }
        }), y.forEach(t => {
            try {
                const r = g.build(m[t], e);
                e[a].put(r), f++
            } catch (e) {
                h.error(`DEVICE_${s?"GENERICMACRO":"MACRO"}_BUILD_FAILED`, e.message)
            }
        });
        const v = function(e, t) {
                return e.details.commandSets.find(e => e.name === t)
            }(e, t.name),
            T = function(e) {
                return e.details.commandSets.find(e => !1 === e.isGeneric)
            }(e);
        return h.debug("SPECIFIC_COMMAND_SET", T), v ? (h.info("DEVICE_COMMANDSET_UPDATED", {
            deviceKey: i,
            name: v.name,
            version: v.version,
            newVersion: t.version
        }), p(v, "version", t.version)) : !s && T ? (h.info("DEVICE_COMMANDSET_RENAMED", {
            deviceKey: i,
            name: l(T, "name"),
            newName: t.name,
            version: T.version,
            newVersion: t.version
        }), p(T, "version", t.version), p(T, "name", t.name)) : s || T ? h.warn("DEVICE_COMMANDSET_UNSUPPORTED", {
            deviceKey: i,
            generic: s,
            newName: t.name,
            newVersion: t.version
        }) : (h.info("DEVICE_COMMANDSET_ADDED_SPECIFIC", {
            deviceKey: i,
            newName: t.name,
            newVersion: t.version
        }), e.details.commandSets.splice(0, 0, function(e) {
            return {
                name: e.name,
                medium: e.medium.toLowerCase(),
                isGeneric: e.isGeneric,
                version: e.version
            }
        }(t))), {
            newCommands: y.length,
            addedCommands: f,
            changedCommands: _.length,
            updatedCommands: E
        }
    }

    function s(e, t) {
        const r = m.parseDuiroSource(t, e).reduce((e, t) => {
            return e[t.isGeneric ? "genericMacros" : "macros"][t.macro.name] = t.macro, e
        }, {
            macros: {},
            genericMacros: {}
        });
        return (t.commandSets || []).filter(t => (function(e, t) {
            const r = e.details.commandSets,
                n = !1 === t.isGeneric && r.every(e => e.name !== t.name),
                o = r.some(e => {
                    const r = d(e.version, 0);
                    return e.name === t.name && r < t.version
                });
            return n || o
        })(e, t)).map(t => i(e, t, r)).reduce((e, t) => e ? (e.newCommands += t.newCommands, e.addedCommands += t.addedCommands, e.changedCommands += t.changedCommands, e.updatedCommands += t.updatedCommands, e) : t, !1)
    }
    const a = r(74),
        c = r(75),
        u = r(95),
        d = r(258),
        l = r(47),
        p = r(259),
        h = r(0)("CommandSetUpdater"),
        g = r(49),
        m = r(131);
    e.exports = function(e, t) {
        const r = o(e),
            n = s(e, t);
        return !1 === n ? (h.debug("DEVICE_COMMANDSETS_NO_UPDATE_AVAILABLE", r), !1) : (h.info("DEVICE_COMMANDSETS_UPDATED", {
            deviceKey: r,
            updateStats: n
        }), {
            addedCommands: n.addedCommands,
            updatedCommands: n.updatedCommands
        })
    }
}, function(e) {// Function 258 only contains exports = require("lodash/defaultTo")
    e.exports = require("lodash/defaultTo")
}, function(e) {// Function 259 only contains exports = require("lodash/set")
    e.exports = require("lodash/set")
}, function(e, t, r) {// Function 260 simple function
    "use strict";
    const n = r(261),
        o = new(r(262));
    e.exports = function() {
        const e = o.next();
        return n(e, "dec")
    }
}, function(e) {// Function 261 only contains exports = require("biguint-format")
    e.exports = require("biguint-format")
}, function(e) {// Function 262 only contains exports = require("flake-idgen")
    e.exports = require("flake-idgen")
}, function(e, t) {// Function 263 check if command contains sendir
    "use strict";

    function r(e) {
        if (!e) return !1;
        const t = e.split(",");
        return 0 === e.indexOf("sendir") && function(e) {
            return 0 == e.slice(o).length % 2
        }(t) && function(e) {
            const t = parseInt(e[n], 10),
                r = e.length - o;
            return !(!t || 0 == t % 2 || 0 > t || t >= r)
        }(t)
    }
    const n = 5,
        o = 6;
    t.hasValidPayloads = function(e) {
        return !!e && Array.isArray(e.payloads) && 0 < e.payloads.length && e.payloads.every(r)
    }
}, function(e, t, r) {// Function 264 adapterDeviceUpdater
    "use strict";

    function n(e) {
        if (!e || !e.details) return Promise.reject(new Error("ADAPTER_DEVICE_UPDATE_INVALID_DEVICE"));
        const {
            sourceName: t,
            adapterName: r
        } = e.details, n = c.getSourceByName(t);
        return n ? function e(t, r, n = 1) {
            return t._getAdapterSpec(r, l).catch(s => (i.debug("ADAPTER_DEVICE_UPDATER_GET_SPEC_FAILED", {
                msg: s.message,
                adapterName: r
            }), n >= d ? (i.error("ADAPTER_DEVICE_UPDATER_EXCEEDED_MAX_ATTEMPTS", {
                msg: s.message,
                adapterName: r
            }), o.reject(new Error("BRAIN_NOT_REACHABLE"))) : e(t, r, n + 1)))
        }(n, r) : Promise.reject(new Error("ADAPTER_DEVICE_UPDATE_INVALID_SPEC_SOURCE"))
    }
    const o = r(1),
        i = r(0)("adapterDeviceUpdater"),
        s = r(2).deviceupdater,
        a = r(21),
        c = r(45),
        u = r(265),
        d = s.adapterUpdaterMaxAttempts,
        l = s.adapterUpdaterTimeoutMs;
    e.exports = {
        checkForAndUpdateDevice: function(e) {
            AllFunctions(0)("Function 264").verbose("checkForAndUpdateDevice");
            return e.hasCapability(a.SOURCE_SDK_ADAPTER) ? n(e).then(t => (function(e, t) {
                return !! function(e, t) {
                    const r = e.details;
                    if (!r || "object" != typeof r) return !1;
                    const n = r.driverVersion,
                        o = t.driverVersion;
                    return !!o && (!n && 0 < o || n < o)
                }(e, t) && u.tryAdapterDeviceUpdate(e, t)
            })(e, t)) : o.resolve(!1)
        }
    }
}, function(e, t, r) {// Function 265 tryAdapterDeviceUpdate
    "use strict";

    function n(e, t) {
        const r = c(e, t);
        return {
            existing: r,
            added: a(t, r)
        }
    }

    function o(e, t) {
        const r = t.capabilities || [];
        r.forEach(e => {
            e.name = p.safeDecodeName(e.name)
        });
        const o = s(r, "name"),
            i = r.map(e => e.name),
            a = function(e) {
                const t = [e.sensors.getAll(), e.macros.getAll(), e.switches.getAll(), e.sliders.getAll(), e.textlabels.getAll(), e.imageurls.getAll(), e.directories.getAll()];
                return Array.prototype.concat.apply([], t)
            }(e),
            c = s(a, "name"),
            l = a.map(e => e.name),
            {
                existing: g,
                added: m
            } = n(l, i);
        m.map(e => o[e]).forEach(t => {
            d.parseDeviceComponent(t, e)
        });
        const f = g.filter(t => {
                const r = c[t],
                    n = o[t];
                return h.updateComponent(r, n, e)
            }),
            E = 0 < f.length,
            y = 0 < m.length;
        return u.debug("components changed:", {
            added: m,
            updated: f
        }), y || E
    }
    const i = r(74),
        s = r(266),
        a = r(75),
        c = r(95),
        u = r(0)("tryAdapterDeviceUpdate"),
        d = r(133),
        l = r(58).iconify,
        p = r(38),
        h = r(268);
    e.exports = {
        tryAdapterDeviceUpdate: function(e, t) {
            const r = o(e, t),
                n = function(e, t) {
                    const r = e.details;
                    if (r && t) {
                        const n = Object.assign({}, e.details);
                        return r.setup = t.setup || {}, r.timing = t.timing || {}, r.icon = l(t.icon || t.type), r.driverVersion = t.driverVersion, r.deviceCapabilities = t.deviceCapabilities || [], e.reloadCapabilities(), !i(n, r)
                    }
                }(e, t),
                s = r || n;
            if (s) {
                const r = `Updated device ${e.name} to version ${t.driverVersion} (${e.roomName})`;
                u.event(r), u.debug(r)
            }
            return s
        }
    }
}, function(e) {// Function 266 only contains exports = require("lodash/keyBy")
    e.exports = require("lodash/keyBy")
}, function(e, t, r) {// Function 267 validity checking undefined, ["string", "boolean", "number", "integer"]
    "use strict";
    const n = r(111);
    n.validators.boolean = function(e) {
        return -1 === ["undefined", "boolean"].indexOf(typeof e) ? "must be of type boolean" : null
    }, n.validators.string = function(e) {
        return -1 === ["undefined", "string"].indexOf(typeof e) ? "must be of type string" : null
    };
    const o = {
        number: {
            numericality: !0
        },
        integer: {
            numericality: {
                onlyInteger: !0
            }
        },
        boolean: {
            boolean: !0
        },
        string: {
            string: !0
        }
    };
    t.validateParamData = function(e, t) {
        for (const r in e) {
            const i = e[r],
                s = Object.assign({}, o[i.type]);
            i.optional || (s.presence = !0);
            const a = n.single(t[r], s);
            if (a) throw new Error(`${r} ${a}`)
        }
    };
    const i = ["string", "boolean", "number", "integer"];
    t.validateParamDefinition = function(e) {
        for (const t in e) {
            const r = e[t];
            if (!r.type) throw new Error(`Parameter "${t}" must have a type property!`);
            if (-1 === i.indexOf(r.type)) throw new Error(`Parameter "${t}" has invalid type "${r.type}"!`)
        }
    }
}, function(e, t, r) {// Function 268 create structure containing sensor, button, switch, slider, textlabel, imageurl &directory
    "use strict";
    const n = r(269),
        o = r(270),
        i = r(271),
        s = r(272),
        a = r(273),
        c = r(274),
        u = r(275);
    e.exports = {
        updateComponent: function(e, t, r) {
            const n = d[t.type];
            if (!n) throw new Error(`COMPONENT_UPDATER_INVALID_COMPONENT_TYPE_${t.type}`);
            return n.update(e, t, r)
        }
    };
    const d = {
        sensor: n,
        button: o,
        switch: i,
        slider: s,
        textlabel: a,
        imageurl: c,
        directory: u
    }
}, function(e, t, r) {// Function 269 update; safeDecodeName(t.label), safeDecodeName(t.sensor.unit)
    "use strict";
    const n = r(75),
        o = r(38);
    e.exports = {
        update: function(e, t) {
            let r = !1;
            const i = o.safeDecodeName(t.label);
            e.label !== i && (e.label = i, r = !0), e.type !== t.sensor.type && (e.type = t.sensor.type, r = !0);
            const s = t.sensor && t.sensor.unit ? o.safeDecodeName(t.sensor.unit) : void 0;
            return e.unit !== s && (e.unit = s, r = !0), 0 < n(e.range, t.sensor.range).length && (e.range = t.sensor.range, r = !0), r
        }
    }
}, function(e, t, r) {// Function 270 update; safeDecodeName(t.label) 
    "use strict";
    const n = r(38);
    e.exports = {
        update: function(e, t) {
            const r = n.safeDecodeName(t.label);
            return e.label !== r && (e.label = r, !0)
        }
    }
}, function(e, t, r) {// Function 271 update; safeDecodeName(t.label) 
    "use strict";
    const n = r(38);
    e.exports = {
        update: function(e, t) {
            const r = n.safeDecodeName(t.label);
            return e.label !== r && (e.label = r, !0)
        }
    }
}, function(e, t, r) {// Function 272 update; safeDecodeName(t.label) ;  o.safeDecodeName(t.slider.unit)
    "use strict";
    const n = r(75),
        o = r(38);
    e.exports = {
        update: function(e, t) {
            let r = !1;
            const i = o.safeDecodeName(t.label);
            e.label !== i && (e.label = i, r = !0), t.slider && e.type !== t.slider.type && (e.type = t.slider.type, r = !0);
            const s = t.slider && t.slider.unit ? o.safeDecodeName(t.slider.unit) : void 0;
            return e.unit !== s && (e.unit = s, r = !0), t.slider && 0 < n(e.range, t.slider.range).length && (e.range = t.slider.range, r = !0), r
        }
    }
}, function(e, t, r) {// Function 273 update: safeDecodeName(t.label)
    "use strict";
    const n = r(38);
    e.exports = {
        update: function(e, t) {
            let r = !1;
            const o = n.safeDecodeName(t.label);
            return e.label !== o && (e.label = o, r = !0), e.isLabelVisible !== t.isLabelVisible && (e.isLabelVisible = t.isLabelVisible, r = !0), r
        }
    }
}, function(e, t, r) {// Function 274 update; safeDecodeName(t.label)
    "use strict";
    const n = r(38);
    e.exports = {
        update: function(e, t) {
            let r = !1;
            const o = n.safeDecodeName(t.label);
            return e.label !== o && (e.label = o, r = !0), e.imageUri !== t.imageUri && (e.imageUri = t.imageUri, r = !0), e.size !== t.size && (e.size = t.size, r = !0), r
        }
    }
}, function(e, t, r) {// Function 275 update;
    "use strict";
    const n = r(38);
    e.exports = {
        update: function(e, t) {
            let r = !1;
            const o = n.safeDecodeName(t.label);
            return e.label !== o && (e.label = o, r = !0), e.identifier !== t.identifier && (e.identifier = t.identifier, r = !0), e.role !== t.role && (e.role = t.role, r = !0), r
        }
    }
}, function(e, t, r) {// Function 276 API Datasource; create projecturl, add custom&device recipe, getrecipes, getNotificationKeys, getAdapterSubscriptions, getAllRecipes, getActiveRecipesKeys, getReferencedAdapters, getAdapterDevicesBySource, saveproject
    "use strict";

    function n(e, t) {
        function r(r) {
            const o = t + "v1/projects/home/rooms/" + r.roomKey + "/recipes/",
                i = {
                    type: r.recipeType,
                    detail: {
                        devicename: encodeURIComponent(r.recipeName),
                        roomname: encodeURIComponent(r.roomName)
                    },
                    url: {
                        identify: n
                    },
                    isCustom: r.isCustomRecipe
                };
            if (r.isCustomRecipe) return c.debug("add custom recipe", r.recipeName), s(i, {
                detail: {
                    model: encodeURIComponent("Custom Recipe"),
                    manufacturer: "NEEO",
                    devicetype: "CUSTOM"
                },
                url: {
                    setPowerOn: o + r.recipeKey + "/execute",
                    getPowerState: o + r.recipeKey + "/isactive"
                },
                isPoweredOn: !1,
                uid: r.recipeKey
            });
            const a = e.getDeviceByKey(r.mainDeviceKey);
            return c.debug("add device recipe", a.name), s(i, {
                detail: {
                    model: encodeURIComponent(a.details.name),
                    manufacturer: encodeURIComponent(a.details.manufacturer),
                    devicetype: a.details.type
                },
                url: {
                    setPowerOn: o + r.powerOnRecipeKey + "/execute",
                    setPowerOff: o + r.powerOffRecipeKey + "/execute",
                    getPowerState: o + r.powerOnRecipeKey + "/isactive"
                },
                isPoweredOn: "on" === a.hypotheticalPowerState,
                uid: r.mainDeviceKey,
                powerKey: r.scenarioKey
            })
        }
        const n = t + "v1/systeminfo/identbrain";
        return function(e) {
            const t = function(e) {
                return e.getRecipes(e => e.isVisibleInGui(!0))
            }(e);
            return u.buildRecipesToExport(t)
        }(e).map(e => r(e))
    }

    function o(e, t) {
        if (!e || !t) throw c.warn("TRANSFORM_INVALID_PARAMETER", t), new Error("INVALID_PARAMETER");
        return n(e, t)
    }

    function i(e) {
        return {
            name: e.name,
            type: e.componentType,
            label: e.label,
            eventKey: e.sensor ? e.sensor.eventKey : e.eventKey
        }
    }
    const s = r(48),
        a = r(94),
        c = r(0)("API Datasource"),
        u = r(277),
        d = r(27),
        l = r(2).address + "/";
    e.exports = {
        getNotificationKeys: function(e, t, r) {
            return d.get().then(n => {
                const o = n.getDevices(n => n.adapterDeviceId === r && n.details.sourceName === e && n.details.adapterName === t);
                if (!Array.isArray(o) || 1 > o.length) return c.debug("NO_EVENTKEY_FOUND"), [];
                const s = o.map(e => [e.getSliders().map(i), e.getSwitches().map(i), e.getTextlabels().map(i), e.getImageurls().map(i), e.getSensors().map(i)]);
                return a(s).filter(e => e && e.eventKey)
            })
        },
        getAdapterSubscriptions: function(e, t) {
            return d.get().then(r => r.getDevices().filter(r => r.details.sourceName === e && r.details.adapterName === t).map(e => e.adapterDeviceId))
        },
        getAllRecipes: function(e) {
            return d.get().then(t => o(t, e || l))
        },
        getActiveRecipesKeys: function() {
            return d.get().then(e => e.getActiveScenarioKeys())
        },
        getReferencedAdapters: function() {
            return d.get().then(e => {
                const t = e.getDevices().map(e => e.details.sourceName).filter(e => e.startsWith("src"));
                return [...new Set(t)]
            })
        },
        getAdapterDevicesBySource: function(e) {
            return d.get().then(t => {
                return t.getDevices().filter(t => t.details && t.details.sourceName === e)
            })
        },
        saveProject: function() {
            return d.get().then(e => e.save())
        },
        transform: o
    }
}, function(e, t, r) {// Function 277 API Recipefactory
    "use strict";

    function n(e, t) {
        const r = [];
        return o.forEach(e, e => {
            const n = t.get(e + "launch"),
                o = t.get(e + "poweroff");
            n && o ? r.push(function(e, t) {
                return {
                    isCustomRecipe: !1,
                    recipeType: e.type,
                    powerOnRecipeKey: e.key,
                    powerOffRecipeKey: t.key,
                    recipeName: e.name,
                    roomKey: e.room.key,
                    roomName: e.room.name,
                    mainDeviceKey: e.scenario.mainDeviceKey,
                    scenarioKey: e.scenarioKey
                }
            }(n, o)) : i.debug("IGNORE_INCOMPLETE_DEFAULT_RECIPE", {
                scenarioKey: e
            })
        }), o.uniqBy(r, JSON.stringify)
    }
    const o = r(16),
        i = r(0)("API Recipefactory");
    e.exports.buildRecipesToExport = function(e) {
        const t = new Map,
            r = [],
            i = [];
        return o.forEach(e, e => {
            if (e.isCustom) i.push(function(e) {
                return {
                    isCustomRecipe: !0,
                    recipeType: e.type,
                    recipeKey: e.key,
                    recipeName: e.name,
                    roomKey: e.room.key,
                    roomName: e.room.name
                }
            }(e));
            else {
                r.push(e.scenarioKey);
                const n = e.scenarioKey + e.type;
                t.set(n, e)
            }
        }), n(r, t).concat(i)
    }
}, function(e) {// Function 278 only contgains exports = require("lodash/filter")
    e.exports = require("lodash/filter") 
}, function(e) {// Function 279 only contains exports = require("lodash/debounce")
    e.exports = require("lodash/debounce")
}, function(e, t, r) {// Function 280 only contains new(r(281))(n);
    "use strict";
    const n = r(3),
        o = new(r(281))(n);
    e.exports = o
}, function(e, t, r) {// Function 281 Scheduler (execute, reload, clear)
    "use strict";
    const n = r(1),
        o = r(0)("Scheduler"),
        i = e.exports = function(e) {
            o.debug("init"), this.statistics = e, this.trigger = {
                interval: r(282),
                time: r(283),
                sensor: r(285)
            }, this.steps = {
                email: r(136),
                command: r(304),
                recipe: r(317)
            }
        };
    i.NOTIFICATION_RELOAD = "rules:reload", i.prototype._load = function(e) {
        this.statistics.increaseCounter("scheduler-load"), this.trigger[e.getConditionType()](e, this)
    }, i.prototype._execute = function(e) {
        this.statistics.increaseCounter("scheduler-execute");
        const t = e.getOptionalConditions().map(e => e.check());
        return n.all(t).then(t => {
            t.every(e => e) && this.steps[e.getActionType()](e)
        })
    }, i.prototype.reload = function(e) {
        this.statistics.increaseCounter("scheduler-reload"), o.debug("start reloading scheduler"), this.clear(), e.forEach(e => this._load(e)), o.debug("finished reloading scheduler")
    }, i.prototype.clear = function() {
        this.trigger.interval.clear(), this.trigger.time.clear(), this.trigger.sensor.clear()
    }
}, function(e, t, r) {// Function 282 recipe-interval-trigger
    "use strict";
    const n = r(0)("recipe-interval-trigger"),
        o = r(63),
        i = [];
    e.exports = function(e, t) {
        const r = e.getCondition();
        if (!r) return void n.warn("INTERVAL_MISSING_CONDITION");
        let s = o.VALID_INTERVAL_UNITS[r.unit] * r.interval * 1e3;
        return isNaN(s) && (n.warn("TRIGGER_INTERVAL_VALUE_INVALID", s), s = o.MAXIMAL_INTERVAL_TIME_MS), s > o.MAXIMAL_INTERVAL_TIME_MS && (n.warn("TRIGGER_INTERVAL_VALUE_TOO_LARGE", s), s = o.MAXIMAL_INTERVAL_TIME_MS), s < o.MINIMAL_INTERVAL_TIME_MS && (n.warn("TRIGGER_INTERVAL_VALUE_TOO_SMALL", s), s = o.MINIMAL_INTERVAL_TIME_MS), i.push(setInterval(() => {
            t._execute(e)
        }, s)), s
    }, e.exports.clear = function() {
        i.forEach(clearInterval), i.length = 0
    }
}, function(e, t, r) {// Function 283 push to CronJob
    "use strict";
    const n = r(284),
        o = [];
    e.exports = function(e, t) {
        const r = e.getCondition(),
            i = r.time,
            s = "00 " + i.minute + " " + i.hour + " * * " + r.repeat.join(",");
        o.push(new n.CronJob(s, () => {
            t._execute(e)
        }, null, !0))
    }, e.exports.clear = function() {
        o.forEach(e => {
            e.stop()
        }), o.length = 0
    }
}, function(e) {// Function 284 only contains exports = require("cron")
    e.exports = require("cron")
}, function(e, t, r) {// Function 285 SensorScheduler
    "use strict";

    function n(e, t) {
        if ("function" != typeof t) return void a.error("SENSOR_CALLBACK_IS_NOT_A_FUNCTION", e);
        const r = {
            eventKey: e,
            callback: t
        };
        a.debug("register sensor callback", e), o.on(e, r.callback), c.push(r)
    }
    const o = r(10),
        i = r(63),
        s = r(55),
        a = r(0)("SensorScheduler"),
        c = [];
    e.exports = function(e, t) {
        const r = e.getCondition().sensor;
        switch (r.type) {
            case s.TYPE_BINARY:
            case s.TYPE_POWERSTATE:
                n(r.eventKey, function(e, t) {
                    const r = e.getCondition();
                    return n => {
                        r.value === s.TYPE_BINARY_TRUE && n ? t._execute(e) : r.value === s.TYPE_BINARY_FALSE && !n && t._execute(e)
                    }
                }(e, t));
                break;
            case s.TYPE_RANGE:
                n(r.eventKey, function(e, t) {
                    const r = e.getCondition();
                    return n => {
                        a.debug("handleRangeSensor", n), r.comparison === i.CONDITION_COMPARISON_LT && n < r.value ? t._execute(e) : r.comparison === i.CONDITION_COMPARISON_GT && n > r.value ? t._execute(e) : r.comparison === i.CONDITION_COMPARISON_EQ && n === r.value && t._execute(e)
                    }
                }(e, t));
                break;
            case s.TYPE_KEYPAD:
                n(r.eventKey, function(e, t) {
                    const r = e.getCondition();
                    return n => {
                        r.value.KeyCode === n.KeyCode && r.value.EventType === n.EventType && t._execute(e)
                    }
                }(e, t));
                break;
            default:
                a.error("UNSUPPORTED_SENSOR_TRIGGER_TYPE", {
                    type: r.type
                })
        }
    }, e.exports.clear = function() {
        c.forEach(e => {
            a.debug("removelistener", e.eventKey), o.removeListener(e.eventKey, e.callback)
        }), c.length = 0
    }
}, function(e, t, r) {// Function 286 Looks like build of main debug  screen
    "use strict";
    const n = r(26),
        o = r(110),
        i = r(17),
        s = r(113),
        a = r(0)("SystemInfo"),
        c = r(76),
        u = r(42),
        d = r(295),
        l = r(87),
        p = r(299),
        h = r(141).Address6,
        g = r(300),
        m = "ENOENT",
        f = "IPv4",
        E = "IPv6",
        y = "NEEO",
        _ = "NEEO PRO",
        v = e.exports = function(e) {
            a.debug("init", e);
            const t = this.isProHardware();
            this.nginxPort = e.nginxPort, this._ifaceNameLan = e.ifaceNameLan, this._ifaceNameWlan = e.ifaceNameWlan, this._wifiRegionFile = e.wifiRegionFile, this._wifiInfoFile = e.wifiInfoFile, this._tr2VersionFile = e.tr2VersionFile, this._isProLicense = t, this._useProUI = !0, this.networkTimeoutMs = e.networkTimeoutMs, this.cloudStatusRequestTimeoutMs = e.cloudStatusRequestTimeoutMs, this._readVersion(),  this._readMac(), this._readTr2Version(), g.startMeasuringTask()
        };
    v.prototype.initialise = function() {
        return u.loadUISettings().then(e => {
            a.debug("INITIALIZING_UI_SETTINGS", e), this._useProUI = !e || !e.useClassicUI
        })
    }, v.prototype.setCloudStatusUrl = function(e) {
        this._cloudStatusUrl = e
    }, v.prototype.setClassicUI = function(e) {
        return this._useProUI = !e, u.saveUISettings({
            useClassicUI: e
        })
    }, v.prototype._readVersion = function() {
        this._version = {
            date: Date(),
            version: "unknown"
        };
        try {
            const e = r(37).loadAppVersionFile();
            this._version = JSON.parse(e)
        } catch (e) {
            a.warn("VERSION_JSON_NOT_READABLE", e)
        }
    }, v.prototype._readMac = function() {
        this._macAddress = "de:ad:be:ef:ba:be", s.readAsync().then(e => {
            this._macAddress = e
        }).catch(() => {})
    }, v.prototype.version = function() {
        return this._version
    }, v.prototype.CloudReplacementUrl   = function() {
        return CloudReplacementUrl  
    }, v.prototype._getAddress = function(e, t = f) {
        if (Array.isArray(e)) {
            const r = e.filter(e => {
                return e.family !== E || !new h(e.address).isLinkLocal()
            }).find(e => e.family === t);
            return r ? r.address : void 0
        }
    }, v.prototype.primaryInterfaceAddress = function() {
        return this.getLanAddressIPv4() || this.getWlanAddressIPv4()
    }, v.prototype.firmwareVersion = function() {
        return c.version
    }, v.prototype.updateAvailable = function() {
        return c.updateAvailable()
    }, v.prototype.macAddress = function() {
        return this._macAddress
    }, v.prototype._getNetworkStatistics = function() {
        try {
            const e = p.raw();
            return {
                eth0: e.eth0,
                wlan0: e.wlan0,
                tun0: e.tun0
            }
        } catch (e) {
            return []
        }
    }, v.prototype._getOpenHandles = function() {
        const e = process._getActiveHandles(),
            t = {};
        return e.forEach(e => {
            void 0 === t[e.constructor.name] ? t[e.constructor.name] = 1 : ++t[e.constructor.name]
        }), {
            activeHandlesCount: e.length,
            activeHandles: t
        }
    }, v.prototype.summary = function() {
        const e = l.get("account", "userEmail") || "",
            t = o.loadavg();
        AllFunctions(0)("Function 286").verbose("summary");
        return {
            hardwareRegion: this.getRegionCode(),
            touchButtonPressed: this.isTouchbuttonPressed(),
            hardwareRevision: this.getHardwareRevision(),
            hardwareType: this.isProHardware() ? _ : y,
            isProLicensed: this.isProLicensed(),
            licenseDescriptionRemote: this.getRemoteLicense(),
            user: e,
            version: this.version().version,
            tr2version: this.getTr2Version(),
            firmwareVersion: this.firmwareVersion(),
            hostname: this.hostname(),
            totalmem: this.totalmem(),
            freemem: this.freemem(),
            ip: this.primaryInterfaceAddress(),
            lanip: this.getLanAddress(),
            wlanip: this.getWlanAddress(),
            wlanregion: this.getWifiRegulationContinent(),
            wlancountry: this.getWifiRegulationCountry(),
            wlaninfo: this.getWifiInfo(),
            uptime: o.uptime(),
            loadavgShort: t[0],
            loadavgMid: t[1],
            loadavgLong: t[2],
            network: this._getNetworkStatistics(),
            duidata: l.getAll("devicefilemanager"),
            systemtime: (new Date).toISOString(),
            activeHandles: this._getOpenHandles(),
            temperature: g.getTemperature()
        }
    }, v.prototype.getBaseUrl = function() {
        return "http://" + this.primaryInterfaceAddress() + ":" + this.nginxPort + "/"
    }, v.prototype.hostname = function() {
        return o.hostname()
    }, v.prototype.mdnsHostname = function() {
        return o.hostname() + ".local."
    }, v.prototype.totalmem = function() {
        return o.totalmem()
    }, v.prototype.freemem = function() {
        return o.freemem()
    }, v.prototype.cpus = function() {
        return o.cpus()
    }, v.prototype.arch = function() {
        return o.arch()
    }, v.prototype._getInterfaces = function() {
        return o.networkInterfaces() || {}
    }, v.prototype.getLanInterface = function() {
        return this._getInterfaces()[this._ifaceNameLan]
    }, v.prototype.getLanAddressIPv4 = function() {
        return this._getAddress(this.getLanInterface(), f)
    }, v.prototype.getLanAddressIPv6 = function() {
        return this._getAddress(this.getLanInterface(), E)
    }, v.prototype.getLanAddress = function() {
        return this.getLanAddressIPv4() || this.getLanAddressIPv6()
    }, v.prototype.getWlanInterface = function() {
        return this._getInterfaces()[this._ifaceNameWlan]
    }, v.prototype.getWlanAddressIPv4 = function() {
        return this._getAddress(this.getWlanInterface(), f)
    }, v.prototype.getWlanAddressIPv6 = function() {
        return this._getAddress(this.getWlanInterface(), E)
    }, v.prototype.getWlanAddress = function() {
        return this.getWlanAddressIPv4() || this.getWlanAddressIPv6()
    }, v.prototype.isTouchbuttonPressed = function() {
        return d.isTouchbuttonPressed()
    }, v.prototype.getRegionCode = function() {
        return d.getRegionCode()
    }, v.prototype.getHardwareRevision = function() {
        return d.getHardwareRevision()
    }, v.prototype._readTr2Version = function() {
        try {
            const e = n.readFileSync(this._tr2VersionFile, "utf8");
            this.tr2Version = e.match(/<v>(.+?)<\/v>/g)[0].replace("<v>", "").replace("</v>", "")
        } catch (e) {
            a.error("TR2_VERSION_FILE_NOT_PARSEABLE", e.message), this.tr2Version = "unknown"
        }
    }, v.prototype.getTr2Version = function() {
        return this.tr2Version
    }, v.prototype._readWifiRegion = function() {
        return n.readFileSync(this._wifiRegionFile, "utf8").trim().split(":")
    }, v.prototype.getWifiRegulationCountry = function() {
        try {
            return this._readWifiRegion()[0] || "US"
        } catch (e) {
            return e.code !== m && a.error("GET_WIFI_REGULATION_COUNTRY", e.message), "US"
        }
    }, v.prototype.getWifiRegulationContinent = function() {
        try {
            return this._readWifiRegion()[1] || "US"
        } catch (e) {
            return e.code !== m && a.error("GET_WIFI_REGULATION_CONTINENT", e.message), "US"
        }
    }, v.prototype._readWifiInfoFile = function() {
        return n.readFileSync(this._wifiInfoFile, "utf8").trim().split(" ")
    }, v.prototype.getWifiInfo = function() {
        try {
            return this._readWifiInfoFile()
        } catch (e) {
            return e.code !== m && a.error("GET_WIFI_INFO", e.message), []
        }
    }, v.prototype.logAndFlushStatistics = function() {
        a.info("STATISTICS_KPI_CP6_SYSTEM", this.summary())
    }, v.prototype.cloudInfo = function() {
        AllFunctions(0)("Function 286").verbose("getting cloudinfo:",CloudReplacementUrl  +"?type=firmware&name=index.html")
        return i.get({
            //uri: this._cloudStatusUrl,
            uri: CloudReplacementUrl  +"?type=firmware&name=index.html", // "http://192.168.73.110:3200/iui/index.html",
            timeout: this.cloudStatusRequestTimeoutMs
        }).then(() => ({
            status: "reachable"
        })).catch(e => (a.error("GET_NEEO_CLOUD_STATUS", {
            msg: e.message,
            uri: this._cloudStatusUrl
        }), {
            status: "unreachable"
        }))
    }, v.prototype.getTemperature = function() {
        return g.getTemperature()
    }, v.prototype.isProHardware = function() {
        return !0 === d.isProHardware()
    }, v.prototype.isProLicensed = function() {
        return this._isProLicense
    }, v.prototype.updateLicense = function(e = !1) {
        this._isProLicense = e
    }, v.prototype.getBrainLicense = function() {
        return `${this._isProLicense?_:y} Brain`
    }, v.prototype.getRemoteLicense = function() {
        return `${this._isProLicense?_:y} Remote`
    }, v.prototype.useProUI = function() {
        return a.debug("USE_PRO_UI", this._useProUI), this._useProUI
    }
}, function(e, t, r) {// Function 287 Firmware
    "use strict";
    AllFunctions(0)("Function 287").verbose("Firmware init",e)
    const n = r(26),
        o = r(1),
        i = r(137),
        s = r(0)("Firmware"),
        a = r(34).execFile,
        c = r(31),
        u = r(10),
        d = r(3),
        l = r(20).deviceAdapter,
        p = r(24),
        h = r(291),
        g = r(292),
        m = r(293),
        f = r(42),
        noCloud = r(505),
        E = o.promisify(n.writeFile),
        y = "fw:availabilitychanged",
        _ = "fw:updateRequested",
        v = e.exports = function(e) {
            s.debug("init", e), this._updateScriptPath = e.updateScriptPath, this._resetScriptPath = e.resetScriptPath, this._versionFile = e.versionFile, this._newVersionFile = e.newVersionFile, this._downloadDir = e.downloadDir, this._checkInterval = e.checkIntervalMs, this._downloadTimeoutMs = e.downloadTimeoutMs, this._checkIntervalId = null, this._updateInProgress = !1, this._firmwareCheckInProgress = !1, this.version = m.readFromWithFallback(this._versionFile), this.newVersion = m.readFrom(this._newVersionFile), this.updateFailed = !1
        };
    v.prototype._getFirmwarePathByVersion = function(e) {
        AllFunctions(0)("Function 287").verbose("_getFirmwarePathByVersion")
        return this._downloadDir + "/cp6-fw-" + e + ".tgz"
    }, v.prototype._getAvailableFirmware = function() {
        AllFunctions(0)("Function 287").verbose("_getNoCloudAvailableFirmware CloudReplacementUrl  :",CloudReplacementUrl  )
        return r(505).downloadJSONContent({name: "latest_firmware_info_NoCloud.txt", type:"firmware", targetDir : "/steady/neeo/update"}).then(x =>  x)


    }, v.prototype._downloadRequired = function(e) {
        AllFunctions(0)("Function 287").verbose("_downloadRequired e",e)
        AllFunctions(0)("Function 287").verbose("_downloadRequired ev",e.version)
        AllFunctions(0)("Function 287").verbose("_downloadRequired tv",this.version)
        AllFunctions(0)("Function 287").verbose("_downloadRequired tnv",this.newVersion)
        this.newVersion = e.version

        return e && e.version ? (s.debug("FIRMWARE_VERSION_COMPARE", {
            currentVersion: this.version,
            newVersion: this.newVersion,
            parseVersion: e.version
        }), e.version !== this.version && e.version !== this.newVersion) : (s.warn("FIRMWARE_VERSION_COMPARE", {
            msg: "Invalid parse firmware Object"
        }), !1)
    }, v.prototype._sendNotification = function(e) {
        u.send({
            type: e,
            data: Date.now()
        })
    }, v.prototype._updateNewVersionFile = function(e) {
        AllFunctions(0)("Function 287").verbose("_updateNewVersionFile e:",this._newVersionFile,e)
        return 99
    }, v.prototype._cleanup = function() {
        s.debug("FIRMWARE_CLEANUP_START"), this.newVersion = m.UNKNOWN;
        const e = this._getFirmwarePathByVersion("*");
        AllFunctions(0)("Function 287").verbose("We could set this._newVersionFile here to our version-file....")
        return g.deleteDownloadedFiles(e, this._newVersionFile).then(() => {
            this._sendNotification(y), s.debug("FIRMWARE_CLEANUP_DONE")
        })
    }, v.prototype.acceptNewFirmware = function(e) {
        AllFunctions(0)("Function 287").verbose("acceptNewFirmware e:",e,t);
        return e
        //noCloud.moveTempFileToDest(e,t);
    }, v.prototype._downloadFirmwareIfNeeded = function(e) {
        AllFunctions(0)("Function 287").verbose("_downloadNoCloudFirmwareIfNeeded e:",e)
        return this._downloadRequired(e) ? 
        (s.debug("DOWNLOAD_REQUIRED", e.version), o.resolve())
        (s.event("Start download new Firmware"), this._cleanup().then(() => this.acceptNewFirmware(e)).then(e => h.validateChecksum(e)).then(e => this._updateNewVersionFile(e)).then(() => {
            s.event("Downloading Firmware succeeded"), s.info("FIRMWARE_DOWNLOAD_READY", {
                firmwareVersion: e.version
            }), this._sendNotification(y)
        }).catch(t => (s.event("Failed to download Firmware!"), s.error("FIRMWARE_DOWNLOAD", {
            firmwareVersion: e.version,
            url: e.url,
            msg: t.message
        }), this._cleanup()))) : (s.debug("DOWNLOAD_NOT_REQUIRED", e.version), o.resolve())
    }, v.prototype.startNotificationListener = function(e) {
        this.firmwareUpdateListenersRegistered || (u.on(y, () => {
            e.flagTr2ToReloadGuiXml()
        }), u.on(_, () => {
            i(e.getActiveScenarios()) && this.update()
        }), this.firmwareUpdateListenersRegistered = !0)
    }, v.prototype.checkIfNewFirmwareIsAvailable = function() {
        AllFunctions(0)("Function 287").verbose("checkNoCloudIfNewFirmwareIsAvailable CloudReplacementUrl  :",CloudReplacementUrl  )
        s.debug("start check");
        const e = this.lastChecked ? Date.now() - this.lastChecked : -1;
        return d.setValue("firmware-time-since-last-check", e), this._firmwareCheckInProgress ? (s.debug("check aborted, busy"), o.reject(new Error("FW_CHECK_BUSY"))) : (this._firmwareCheckInProgress = !0, this.lastChecked = Date.now(), this._getAvailableFirmware()
                        .then(e => (AllFunctions(0)("Function 287").verbose("firmware e=",e),this._downloadFirmwareIfNeeded(e))).then(content  => content)
                           .then(() => f.loadFirmwareSettings())
                            .then(e => (e.automaticUpdate && this._sendNotification(_), null)).timeout(36e5, "New firmware check timeout")
                            .catch(e => {"ENOENT" !== e.code && s.error("GET_FIRMWARE", {
                                            msg: e.message
                                        })
                                }).finally(() => {
                                        this._firmwareCheckInProgress = !1
                                        }))
                                            
    }, v.prototype.updateAvailable = function() {
        return n.existsSync(this._newVersionFile) && this.version !== this.newVersion
    }, v.prototype.stopChecker = function() {
        this._checkIntervalId && (clearInterval(this._checkIntervalId), this._checkIntervalId = null)
    }, v.prototype.startChecker = function() {
        return this._checkIntervalId ? (s.debug("FW_CHECKER_ALEADY_RUNNING"), o.reject(new Error("ALREADY_RUNNING"))) : (this._checkIntervalId = setInterval(() => {
            this.checkIfNewFirmwareIsAvailable().catch(e => {
                s.debug("FW_INTERVAL_CHECK_FAILED", e)
            })
        }, this._checkInterval), this.checkIfNewFirmwareIsAvailable())
    }, v.prototype.update = function() {
        if (!this.updateAvailable()) return s.debug("FIRMWARE_UPDATE_FAILED_NO_UPDATE_AVAILABLE"), o.resolve();
        if (this._updateInProgress) return s.debug("FWUPDATE_BUSY"), o.resolve();
        s.debug("UPDATE_FIRMWARE", {
            from: this.version,
            to: this.newVersion
        }), this._updateInProgress = !0, this.updateFailed = !1, c.ledFirmwareUpdate(), this._sendNotification("fw:updating");
        const e = this._getFirmwarePathByVersion(this.newVersion);
        return a(this._updateScriptPath, [this.newVersion, e]).catch(e => {
            c.ledIdentBrain(), this.updateFailed = !0, s.error("FIRMWARE_UPDATE_FAILED", {
                msg: e.message
            }), this._sendNotification("fw:updateFailed")
        }).then(() => {
            this._updateInProgress = !1
        })
    }, v.prototype.toJson = function() {
        return this._updateInProgress ? o.reject(new Error("FIRMWARE_STATUS_UNAVAILABLE")) : o.resolve({
            updateAvailable: this.updateAvailable(),
            version: this.version,
            newVersion: this.newVersion,
            lastUpdateCheckUTC: this.lastChecked ? Date.now() - this.lastChecked : "",
            updateFailed: this.updateFailed
        })
    }, v.prototype.reset = function() {
        return l.reset().catch(e => {
            s.warn("DEVICEADAPTER_RESET_FAILED", {
                msg: e.message
            })
        }).then(() => a(this._resetScriptPath))
    }
}, function(e, t, r) {// Function 288 Definitions for JN5168 //$$$
    "use strict";
    const n = r(17),
        o = r(40),
        i = r(1),
        s = r(70),
        a = r(0)("JN5168"),
        c = r(32),
        u = r(99),
        d = r(3),
        l = {
            maxRetries: 10,
            retryDelay: 500
        },
        p = e.exports = function(e) {
            a.debug("init", e), this.irMaxRetries = e.irMaxRetries, this.irRetryDelay = e.irRetryDelay, this.baseUrl = "", this.queuePromise = i.resolve(), this.LED_IDENT_TIME = 1600, this._httpAgent = new o.Agent({
                maxSockets: 1
            }), a.debug("MAXIMAL_JN_SEND_DURATION_MS", this.irMaxRetries * this.irRetryDelay)
        };
    p.prototype._retryPostAfterDelay = function(e, t, r) {
        return d.increaseCounter("jn5168-call-busy"), i.delay(r.retryDelay).then(() => this._postRequestHelper(e, t, r))
    }, p.prototype._postRequest = function(e, t, r) {
        // Okay, we've changed functionality of this function to comply with running CP6 as docker container.
        // that means we do not have a JN5168-chip. This chip is used by mens of it;s GPIO for IR, blink and for 6LowPan (wit remote).
        // For now, we're just signaling what needs to happen here, then return.
        // First / next step will be to send IR over a broadlink device.   
        AllFunctions(0)("Function 288").verbose("_postrequest");
        if (BrainBroadLink.broadlinkIp == undefined) 
            {AllFunctions(0)("Function 288").verbose("We need to post a request to Brain's Broadlink, but no BrainBroadLink.js found");
            return  i.reject();
            }
        if (e == "/sendir")
            {} // we'll handle IR-send later in this function
        else
        if (e == "/blink")
            {AllFunctions(0)("Function 288").verbose("Request to blink... if it was an IR-request, Broadlink will blink, otherwise: no blinky-blink for now")
            return  i.resolve();
            }
        else            
        if (e == "/discovery")
            {AllFunctions(0)("Function 288").verbose("Short touchbutton press detected, discovery started via JN5168")
            return  i.resolve();
            }
        else
            AllFunctions(0)("Function 288").verbose("Unknown request")
            //}
        //if (!this.baseUrl) return d.increaseCounter("jn5168-missing-baseurl"), i.reject(new Error("JN5168 baseUrl not set yet"));
        r = function(e, t) {
            return s(e || {}, {
                maxRetries: 0,
                retryCount: 0,
                retryDelay: t,
                retryStatusCode: 503,
                payloadDurationMs: 0
            })
        }(r, this.irRetryDelay);
        const nx = this.queuePromise.then(() => this._postRequestHelper(e, t, r));
        return this.queuePromise = nx.catch(() => {}), nx
    }, p.prototype._postRequestHelper = function(e, t, r) {
        a.debug("send Payload to NBR (Now broadlink)", {
            path: e
        });
        {AllFunctions(0)("Function 288").verbose("Need to send IR-data via Brain; kicking of a broadlink device in-stead")
        // For example NEEO-IR (power on in driver): "sendir,1:1,1,38000,4,1,343,172,21,21,21,21,21,64,21,21,21,21,21,21,21,21,21,21,21,64,21,64,21,21,21,64,21,64,21,64,21,64,21,64,21,21,21,21,
        // var t contains: i=0&f=38000&c=4&o=1&s=343.172.21.21.21.21.21.64.21.21.21.21.21.21.21.21.21.21.21.64.21.64.21.21.2
        // Broadlink payload (gc): "sendir,1:1,1,38000,4,1,343,172,21,21,21,21,21,64,21,21,21,21,21,21,21,21,21,21,21,64,21,64,21,21,21,64,21,64,21,64,21,64,21,64,21,21,21,21,>
        // http://127.0.0.1:5384/xmitGC?host=<ip<broadlink-type>&mac=<Broadlink-mac>&stream=sendir,1:1,1,<f><c><o><s>
        let IRf,IRc,IRo,IRs;
        let params=t.split("&")
        if (params.length!=5)
            {AllFunctions(0)("Function 288").verbose("Incorrect number of IR-arguments",params)
            return i.reject(new Error("BrainBroadLink incorrect number of IR-arguments"))
            }

        // create Uri to call Broadlink-device. Address is obrtained from BrainBroadLink.json file, content is delivered by driver.
        // get Url and Bradlink-type (+mac) from json file first
        var BrainBroadLinkUri=CloudReplacement+":5384/xmitGC?host="+BrainBroadLink.broadlinkIp+"&&type="+BrainBroadLink.broadlinktype+"&&mac="+BrainBroadLink.broadlinkMac+"&stream=sendir,1:1,1,"
        // Driver-part
        params.forEach((element) => 
            {let theVar=element.split("=")
            switch(theVar[0]) {
                case 'f': IRf=theVar[1];break;
                case 'c': IRc=theVar[1];break;
                case 'o': IRo=theVar[1];break;
                case 's': IRs=theVar[1];break;
                //default: return i.reject(new Error("BrainBroadLink invalid IR-argument"))
            }
            })
        BrainBroadLinkUri=BrainBroadLinkUri+IRf+","+IRc+","+IRo+","+IRs.replace(/["."]/g, ",") //         (".",",")
        AllFunctions(0)("Function 288").verbose("http-call to broadlink:",BrainBroadLinkUri)
        //return i.resolve();
        }
        const o = n({
            //uri: this.baseUrl + e,
            uri: BrainBroadLinkUri,
            method: "GET",
            pool: this._httpAgent,
            timeout: 4e3,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": t.length
            },
            body: t
        });
        return i.resolve(o).delay(r.payloadDurationMs).then(() => {
            d.increaseCounter("jn5168-call-succeeded"), a.debug("(Broadlink (JN5168)_CALL_SUCCEEDED", {
                retryCount: r.retryCount,
                path: e,
                promiseSleepMs: r.payloadDurationMs
            })
        }).catch(n => {
            const o = c.extractInfo(n);
            return o.statusCode === r.retryStatusCode ? r.retryCount < r.maxRetries ? (r.retryCount++, a.debug("Broadlink_BUSY, retry", {
                waitUntilResend: r.retryDelay,
                path: e
            }), this._retryPostAfterDelay(e, t, r)) : (d.increaseCounter("jn5168-call-failed"), a.error("Broadlink_CALL_FAILED", {
                retryCount: r.retryCount,
                path: e,
                err: o.message,
                payload: t
            }), i.reject(n)) : (d.increaseCounter("jn5168-error"), AllFunctions(0)("Function 288").error("Error executing Broadlink gcxmit:",o.message),a.error("Broadlink_UNEXPECTED_ANSWER", {
                statusCode: o.statusCode,
                path: e
            }), i.reject(n))
        })
    }, p.prototype._failsafePostRequest = function(e, t) {
        AllFunctions(0)("Function 288").verbose("_failsafePostRequest",e,t)
        return this._postRequest(e, t).catch(t => {
            const r = c.extractInfo(t);
            a.error("JN5168_FAILSAFE_CALL_FAILED", {
                path: e,
                err: r.message 
            })
        })
    }, p.prototype._nbrGetRequest = function(e) {
        AllFunctions(0)("Function 288").verbose("_nbrGetRequest",e)
        return i.resolve('')
/*        return this.baseUrl ? (this.queuePromise = this.queuePromise.then(() => n({
            method: "GET",
            pool: this._httpAgent,
            timeout: 4e3,
            uri: this.baseUrl + e
        })).then(e => (d.increaseCounter("jn5168-call-succeeded"), i.resolve(e))).catch(t => {
            const r = c.extractInfo(t);
            a.error("JN5168_NBR_GETREQUEST_FAILED", {
                path: e,
                err: r.message
            })
        }), this.queuePromise) : (d.increaseCounter("jn5168-missing-baseurl"), i.reject(new Error("JN5168 baseUrl not set yet")))*/
    }, p.prototype._ledOff = function() {
        return this._failsafePostRequest("/blink", "mode=off")
    }, p.prototype._ledOn = function() {
        return this._failsafePostRequest("/blink", "mode=white")
    }, p.prototype._ledRed = function() {
        return this._failsafePostRequest("/blink", "mode=red")
    }, p.prototype.ledIdentBrain = function() {
        return this._ledOff().then(() => this._failsafePostRequest("/blink", "mode=200")).delay(this.LED_IDENT_TIME).then(() => this._ledOn())
    }, p.prototype.ledWifiAPMode = function() { //$$$
        return this._ledOff().then(() => this._failsafePostRequest("/blink", "mode=1000"))
    }, p.prototype.ledFirmwareUpdate = function() {
        return this._ledOff().then(() => this._failsafePostRequest("/blink", "mode=red")).then(() => this._failsafePostRequest("/blink", "mode=500"))
    }, p.prototype.sendAirkey = function() {
        return u.getAirKey().then(e => this._postRequest("/encryption", "airkey=" + e, l)).then(() => {
            a.debug("JN5168_SETUPKEY_COMPLETE")
        }).catch(e => {
            const t = c.extractInfo(e);
            a.error("JN5168_SETUPKEY_FAILED", {
                message: t.message
            })
        })
    }, p.prototype.enableDiscoveryMode = function() { //$$$
        AllFunctions(0)("Function 288").verbose("JN5168 enableDiscoveryMode")
        return u.getAirKey().then(e => this._postRequest("/discovery", "enabled=true&airkey=" + e, l)).then(() => {
            a.info("JN5168_DISCOVERY_ENABLED")
        }).catch(() => {
            a.error("JN5168_DISCOVERY_FAILED")
        })
    }, p.prototype.startLearnir = function() {
        return this._postRequest("/learnir", "operation=start", l).then(() => {
            a.info("JN5168_IR_LEARN_MODE_ENABLED")
        })
    }, p.prototype.stopLearnir = function() {
        return this._postRequest("/learnir", "operation=stop", l).then(() => {
            a.info("JN5168_IR_LEARN_MODE_DISABLED")
        })
    }, p.prototype.fetchIrData = function() {
        return this._nbrGetRequest("/learnir")
    }, p.prototype.sendIr = function(e, t, r, n, o) {
        return -1 === t ? this.stopIr() : this._postRequest("/sendir", "i=0&f=" + e + "&c=" + t + "&o=" + r + "&s=" + n, {
            maxRetries: this.irMaxRetries,
            retryDelay: this.irRetryDelay,
            payloadDurationMs: o
        })
    }, p.prototype.stopIr = function() {
        return a.debug("IR REPEAT STOP"), d.increaseCounter("jn5168-infrared-repeat-stop"), this._postRequest("/stopir", "", {
            maxRetries: this.irMaxRetries,
            retryDelay: this.irRetryDelay
        })
    }, p.prototype.updateStatistics = function() {
        return a.debug("fetch NBR statistics"), this._nbrGetRequest("/stats").then(e => {
            try {
                const t = JSON.parse(e);
                d.setValue("nbr-statistics", t)
            } catch (t) {
                a.warn("NBR_INVALID_STATS_JSON", {
                    error: t.message
                }), d.setValue("nbr-statistics", e)
            }
        })
    }, p.prototype.getRoutingTable = function() {
        AllFunctions(0)("Function 288").verbose("getRoutingTable")
        return a.debug("fetch NBR neighbors"), this._nbrGetRequest("/neighbors").then(e => e ? (d.setValue("neighbors", e), e.split("\n").map(e => e.trim()).filter(e => e)) : [])
    }
}, function(e) {// Function 289 Some functons for handling project/home
    "use strict";
    const t = function(e) {
        return "project-" + (e = e || "home")
    };
    e.exports = class {
        constructor(e) {
            this.store = e
        }
        loadLatest() {
            AllFunctions(0)("Function 289").verbose("loadlatest store",t,e)
            return this.store.loadLatest(t())
        }
        load(e, r) {
            return this.store.load(t(), e, r)
        }
        save(e, r, n) {
            return this.store.save(t(), e, r, n)
        }
        listVersions() {
            return this.store.listVersions(t())
        }
        resetCacheKey() {
            return this.store.resetCacheKey(t())
        }
        readFile(e) {
            return this.store.readFile(t(), e)
        }
        deleteFile(e) {
            return this.store.deleteFile(t(), e)
        }
        getAirKey() {
            return this.loadLatest().then(e => {
                if (e.project && e.project.airkey) return e.project.airkey
            })
        }
    }
}, function(e, t, r) {// Function 290 JN5168_WATCHDOG
    "use strict";
    const n = r(0)("JN5168_WATCHDOG"),
        o = r(34).execFile,
        i = r(2).jn5168;
    e.exports = class {
        constructor(e) {
            if (!e) throw n.error("INVALID_PARAMETER", {
                name: "params"
            }), new Error("INVALID_PARAMETER");
            if (!e.restartNbrAfterMaxErrorCount || 1 > e.restartNbrAfterMaxErrorCount) throw n.error("INVALID_PARAMETER", {
                name: "restartNbrAfterMaxErrorCount",
                value: e.restartNbrAfterMaxErrorCount
            }), new Error("INVALID_PARAMETER");
            if (!e.timeWindowMs || 100 > e.timeWindowMs) throw n.error("INVALID_PARAMETER", {
                name: "timeWindowMs",
                value: e.timeWindowMs
            }), new Error("INVALID_PARAMETER");
            if (!e.watchdogAction || "function" != typeof e.watchdogAction) throw n.error("INVALID_PARAMETER", {
                name: "watchdogAction"
            }), new Error("INVALID_PARAMETER");
            this.commerror = [], this.watchdogAction = e.watchdogAction, this.restartNbrAfterMaxErrorCount = e.restartNbrAfterMaxErrorCount, this.timeWindowMs = e.timeWindowMs
        }
        increaseError() {
            const e = Date.now() - this.timeWindowMs;
            return 0 > e ? void n.debug("Date.now() is 0, bail out") : (this.commerror.push({
                date: Date.now()
            }), this.commerror = this.commerror.filter(t => t.date > e), void(this.commerror.length >= this.restartNbrAfterMaxErrorCount ? (n.warn("JN_WATCHDOG_FIRE", {
                errors: this.commerror.length
            }), this.watchdogAction().then(() => {
                n.debug("JN_WATCHDOG_CLEAR_ERROR"), this.commerror = []
            }).catch(e => {
                n.warn("JN_WATCHDOG_FUNCTION_FAILED", e)
            })) : n.debug("increased jn watchdog error counter", {
                current: this.commerror.length,
                max: this.restartNbrAfterMaxErrorCount
            })))
        }
    }, e.exports.nbrRestartAction = (() => (n.debug("run watchdog command", i.jn5168WatchdogCommand, i.jn5168WatchdogCommandArg), o(i.jn5168WatchdogCommand, i.jn5168WatchdogCommandArg.split(" "))))
}, function(e, t, r) {// Function 291 FirmwareDownloader
    "use strict";
    const n = r(1),
        o = r(26),
        i = r(41),
        s = r(123),
        a = r(0)("FirmwareDownloader"),
        c = r(3);
    e.exports = {
        downloadFirmware: function(e, t = 252e4) {
            return new n((r, n) => {
                function i() {
                    h || g || (a.info("FIRMWARE_DOWNLOAD_COMPLETE", {
                        firmwareVersion: e.version,
                        durationMs: Date.now() - d
                    }), clearTimeout(p), r(e))
                }

                function u() {
                    const t = Date.now() - d;
                    a.debug("FIRMWARE_DOWNLOAD_TIMEOUT", {
                        durationMs: t,
                        firmwareVersion: e.version
                    }), h = !0, c.increaseCounter("firmware-download-failed"), m.abort(), n(new Error(`Download timeout triggered after ${t}ms`))
                }
                const d = Date.now(),
                    l = o.createWriteStream(e.downloadPath);
                let p, h, g;
                a.debug("FIRMWARE_DOWNLOAD", {
                    url: e.url,
                    targetdir: e.downloadPath,
                    downloadTimeoutMs: t
                }), c.increaseCounter("firmware-download-started");
                const m = s(e.url);
                m.on("response", function(e) {
                    200 === e.statusCode ? (a.debug("FIRMWARE_DOWNLOAD_START"), p = setTimeout(u, t), e.on("end", i)) : (c.increaseCounter("firmware-download-failed"), n(new Error(`wrong status code: ${e.statusCode} ${e.statusMessage}`)))
                }).on("error", function(e) {
                    h || (g = !0, c.increaseCounter("firmware-download-failed"), clearTimeout(p), n(e))
                }).pipe(l)
            })
        },
        validateChecksum: function(e) {
            AllFunctions(0)("Function 291").verbose("validateChecksum e:",e); 
            try {
            return new n((t, r) => {
                const n = Date.now(),
                    s = i.createHash("sha1");
                a.debug("VERIFY_CHECKSUM", e.downloadPath), o.createReadStream(e.downloadPath).on("data", e => s.update(e)).on("end", () => {
                    const o = s.digest("hex");
                    o === e.sha1 ? (a.info("FIRMWARE_INSTALL_READY", {
                        firmwareVersion: e.version,
                        durationMs: Date.now() - n
                    }), t(e)) : (a.error("FIRMWARE_CHECKSUM_INVALID", {
                        expected: e.sha1,
                        calculated: o
                    }), r(new Error(`sha1 sum of ${e.downloadPath} is incorrect! got: ${o}, expected: ${e.sha1}`)))
                }).on("error", e => {
                    a.error("FIRMWARE_CHECKSUM_FAILED", {
                        msg: e.message
                    }), r(e)
                })
            })
            }
            catch (err) {AllFunctions(0)("Function 92").verbose("valchecks error:",err)}
        }
    }
}, function(e, t, r) {// Function 292 FirmwareCleanup
    "use strict";

    function n(e) {
        return d(e).then(e => (c.debug("FWIMAGES_TO_DELETE", e), a.all(e.map(e => o(e, "FWIMAGE")))))
    }

    function o(e, t) {
        return u(e).catch(e => {
            "ENOENT" !== e.code && c.warn(`FAILED_TO_DELETE_${t}`, {
                error: e.message
            })
        })
    }
    const i = r(112),
        s = r(26),
        a = r(1),
        c = r(0)("FirmwareCleanup"),
        u = a.promisify(s.unlink),
        d = a.promisify(i);
    e.exports = {
        deleteDownloadedFiles: function(e, t) {
            AllFunctions(0)("Function 292").verbose("deleteDownloadedFiles e:",e,t);            
            return a.all([n(e), o(t, "VERSIONFILE")])
        }
    }
}, function(e, t, r) {// Function 293 FirmwareVersion
    "use strict";

    function n(e) {
        try {
            return s.readFileSync(e, {
                encoding: "utf8"
            })
        } catch (e) {
            return "ENOENT" !== e.code && i.warn("FIRMWARE_VERSION_FILE_NOT_READABLE", e), a
        }
    }

    function o(e) {
        return !e || e !== e.trim()
    }
    const i = r(0)("FirmwareVersion"),
        s = r(26),
        a = "unknown";
    e.exports = {
        readFrom: n,
        readFromWithFallback: function(e) {
            return n(e)
        },
        validateParseFirmware: function(e) {
            return !(!e || o(e.version) || o(e.url) || o(e.sha1))
        },
        UNKNOWN: a
    }
}, function(e) {// Function 294 static definition of firmware
    e.exports = {
        name: "cp6",
        version: "0.53.8",
        description: "NEEO CP6 Backend",
        private: !0,
        dependencies: {
            "@sindresorhus/df": "^2.1.0",
            "biguint-format": "^1.0.0",
            blocked: "^1.2.1",
            bluebird: "^3.5.2",
            "body-parser": "^1.18.3",
            coap: "^0.22.0",
            cron: "neophob/node-cron#master",
            "css-layout": "~1.1.1",
            "date-fns": "^1.29.0",
            debug: "^4.1.0",
            express: "^4.16.3",
            "express-partial-response": "~0.3.4",
            "fast-url-parser": "^1.1.3",
            "flake-idgen": "^1.0.0",
            getmac: "^1.2.1",
            glob: "^7.1.2",
            i18n: "^0.8.3",
            "ip-address": "^5.8.8",
            jsontoxml: "0.1.0",
            lodash: "^4.17.11",
            loggly: "neophob/node-loggly#bumped-request-dep",
            "mailgun-es6": "^1.1.4",
            mustache: "^2.3.0",
            "net-stat": "^2.0.1",
            onoff: "3.2.1",
            openpgp: "^2.6.2",
            parse: "^1.11.1",
            promisepipe: "^1.0.1",
            request: "^2.85.0",
            "request-promise": "^4.1.1",
            semver: "^5.4.1",
            "simple-event-statistics": "^1.0.0",
            "socket.io": "^2.1.0",
            tmp: "0.0.31",
            "tokensearch.js": "^0.8.0",
            "unescape-js": "^1.0.8",
            unidecode: "^0.1.8",
            "valid-url": "^1.0.9",
            "validate.js": "^0.11.1",
            "write-file-atomic": "^1.2.0",
            xxhashjs: "^0.2.2"
        },
        devDependencies: {
            "babel-core": "^6.26.3",
            "babel-loader": "^7.1.5",
            "babel-minify-webpack-plugin": "^0.3.1",
            "babel-preset-env": "^1.7.0",
            chai: "^4.2.0",
            "chai-as-promised": "^7.1.1",
            eslint: "^5.6.0",
            madge: "^3.0.1",
            mocha: "^5.1.1",
            mockery: "^2.1.0",
            nock: "10.0.4",
            "npm-watch": "^0.4.0",
            nyc: "^13.0.1",
            "pretty-data": "^0.40.0",
            rimraf: "^2.5.1",
            rosie: "^2.0.1",
            sinon: "^7.1.1",
            "sinon-chai": "^3.2.0",
            supertest: "^3.3.0",
            webpack: "^4.20.0",
            "webpack-cli": "^3.1.1",
            "webpack-node-externals": "^1.7.2",
            xml2js: "^0.4.17"
        },
        engines: {
            node: ">=8.0.0"
        },
        scripts: {
            test: 'PROJECT_ACTIVATION_DEBOUNCE_TIME_MS=9999999 STORE_DATAROOT=$TMPDIR LOG_LEVEL=silent mocha --exit "test/**/*.js"',
            "test:dbg": 'PROJECT_ACTIVATION_DEBOUNCE_TIME_MS=9999999 STORE_DATAROOT=$TMPDIR LOG_LEVEL=debug mocha --exit "test/**/*.js"',
            "test:summaryonly": 'PROJECT_ACTIVATION_DEBOUNCE_TIME_MS=9999999 STORE_DATAROOT=$TMPDIR LOG_LEVEL=silent mocha --exit --reporter min "test/**/*.js"',
            "test:coverage": "nyc npm test",
            "test:updatexmlfixtures": "./scripts/updateguixmls.sh",
            "test:watch": "npm-watch test",
            "deploy:brain": "./scripts/buildAndUploadToBrain.sh",
            eslint: "node ./node_modules/eslint/bin/eslint.js app/ test/",
            xmllint: "npm run xmllint:filerepo && npm run xmllint:fixtures",
            "xmllint:filerepo": "node scripts/xmllint.js app/filerepo",
            "xmllint:fixtures": "node scripts/xmllint.js test/fixtures",
            clean: "rm -fr ./dist && rm -fr ./coverage",
            dist: "npm run eslint && npm run xmllint && npm run clean && npm run dist:mkdir && npm run dist:copy && npm run dist:jsonmin && npm run dist:xmlmin && npm run dist:version && npm run dist:webpack",
            "dist:tr2xmlonly": "npm run dist:mkdir && npm run dist:copy && npm run dist:xmlmin",
            "dist:webpack": "webpack --config ./webpack.config.js --progress --profile --colors",
            "dist:mkdir": "mkdir -p dist/filerepo",
            "dist:version": "node scripts/version.js > ./dist/version.json",
            "dist:copy": "cp -r ./app/filerepo/* ./dist/filerepo && cp package.json ./dist && rm ./dist/filerepo/viewbuilder/definitions/*.md",
            "dist:xmlmin": "echo 'Minify XML Files:' && node scripts/xmlmin.js ./dist/filerepo/tr2",
            "dist:jsonmin": "echo 'Minify JSON Files:' && node scripts/jsonmin.js ./dist/filerepo/viewbuilder",
            "start:nbrsim": "./../build/mocks/start-nbrsim.sh&",
            start: "npm run eslint && npm run start:nbrsim && NODE_ENV=development DEBUG='cp6*' LOG_LEVEL=debug node app/index.js",
            "start:dist": "pwd && FILE_REPO_PATH=./dist/filerepo/ LOG_LEVEL=debug STORE_DATAROOT=./data node ./dist/cp6.js",
            qs: "NODE_ENV=development LOG_LEVEL=debug DEBUG='cp6*' node app/index.js",
            "start:debug": "NODE_ENV=development LOG_LEVEL=debug node --inspect app/index.js",
            "dui:importallcommandsets": "echo IMPORT all dui commandsets && node dui/importduidata/main.js $1",
            "check:circular": "madge --circular app/index.js || true",
            "osx:installmockwpacli": "cp scripts/wpa_cli /usr/local/bin/ && chmod +x /usr/local/bin/wpa_cli"
        },
        nyc: {
            "check-coverage": !0,
            lines: 88,
            statements: 88,
            functions: 82,
            branches: 84,
            include: ["app/**/*.js"],
            all: !0,
            reporter: ["text", "lcov"]
        },
        watch: {
            test: "{app,test}/**/*.js"
        }
    }
}, function(e, t, r) {// Function 295 only contains call r(296))(n.gpio, n)
    "use strict";
    const n = r(2),
        o = r(10),
        i = new(r(296))(n.gpio, o);
    e.exports = i
}, function(e, t, r) {// Function 296 Generic functions: read GPIO(297&298), isTouchbuttonPressed, getRegionCode, getHardwareRevision, isProHardware
    "use strict";

    function n(e) {
        return new s(e, "in").readSync()
    }
    const o = r(297),
        i = r(0)("GPIO");
    let s;
    try {
        s = r(298).Gpio
    } catch (t) {
        i.warn("GPIO_INIT_FAILED")
    }
    const a = e.exports = function(e, t) {
        const r = e => {
            new s(e, "in", "both").unexport(), new s(e, "in", "both", {
                debounceTimeout: 20
            }).watch((e, t) => e ? void i.error("GPIO_WATCH", e.message) : void this.touchbutton.registerKeypress(1 === t))
        };
        if (i.debug("init", e), this.touchbutton = o.getInstance(t), this.touchDurationMS = e.touchDurationMs, this.regionCode = "UNKNOWN", s) {
        // next code commented out as we (most likely) do not have a lid to push 
            /*   try {
                r(e.touchbuttonPin)
            } catch (e) {AllFunctions(0)("Function 295").debug("GPIO touchbutton failed; e:",e); 
                i.error("GPIO_WATCHBUTTON_FAILED", e.message)
            }*/
            try {
                this.regionCode = function(e, t) {
                    const r = new s(e, "in").readSync(),
                        n = new s(t, "in").readSync();
                    return 1 === r && 1 === n ? "ANZ" : 0 === r && 1 === n ? "US" : 1 === r && 0 === n ? "EU" : "UNKNOWN"
                }(e.regionId0Pin, e.regionId1Pin), this.hardwareRevision = function(e) {
                    const t = n(e.hardwareRevision0Pin),
                        r = n(e.hardwareRevision1Pin),
                        o = n(e.hardwareRevision2Pin);
                    return n(e.hardwareRevision3Pin) << 3 | o << 2 | r << 1 | t
                }(e), this.hardwareProModel = function(e) {
                    return 1 === n(e.hardwareRevision4Pin)
                }(e), i.debug("GPIO_INIT", {
                    hwrev: this.hardwareRevision,
                    region: this.regionCode
                })
            } catch (e) {
                i.error("GPIO_READVERSION_FAILED", e.message)
            }
        }
    };
    a.prototype.isTouchbuttonPressed = function() {
        return this.touchbutton.isPressed(this.touchDurationMS)
    }, a.prototype.getRegionCode = function() {
        return this.regionCode
    }, a.prototype.getHardwareRevision = function() {
        return this.hardwareRevision
    }, a.prototype.isProHardware = function() {
        return this.hardwareProModel
    }
}, function(e, t, r) {// Function 297 cp6:lib:systeminfo:gpio:touchbutton"
    "use strict";
    const n = r(6)("cp6:lib:systeminfo:gpio:touchbutton"),
        o = r(140),
        i = -1;
    e.exports = {
        getInstance: function(e) {
            return new s(e)
        }
    };
    class s {
        constructor(e) {
            if (!e) throw new Error("NO_NOTIFICATION_SERVICE");
            this.notification = e, this.touchButtonPressedTimestamp = i, this.longPressTimer = null
        }
        _armLongPressAction() {
            this.longPressTimer = setTimeout(() => {
                n("long press detected"), this.notification.send({
                    type: o.NOTIFICATION_LONG_TOUCHBUTTONPRESSED,
                    date: new Date
                }), this.longPressTimer = null
            }, 6e3)
        }
        registerKeypress(e) {
            if (n("keypress registered", e), e) this.touchButtonPressedTimestamp = Date.now(), this._armLongPressAction();
            else {
                null !== this.longPressTimer && (clearTimeout(this.longPressTimer), this.longPressTimer = null, this.notification.send({
                    type: o.NOTIFICATION_TOUCHBUTTONPRESSED,
                    date: new Date
                }))
            }
        }
        isPressed(e) {
            if (!e || this.touchButtonPressedTimestamp === i) return !1;
            return Date.now() - this.touchButtonPressedTimestamp < e
        }
    }
}, function(e) {// Function 298 only contains exports = require("onoff")
    e.exports = require("onoff")
}, function(e) {// Function 299 only contains exports = require("net-stat")
    e.exports = require("net-stat")
}, function(e, t, r) {// Function 300 temperature
    "use strict";

    function n() {
        const {
            temperatureFile: e
        } = i.systeminfo;
        o.execFile(e).then(e => a = e).catch(e => {
            s.error("TEMPERATURE_MEASUREMENT", e.message)
        })
    }
    const o = r(34),
        i = r(2),
        s = r(0)("Temperature");
    let a;
    e.exports = {
        startMeasuringTask: function() {
            const {
                temperatureMeasureIntervalMs: e
            } = i.systeminfo;
            n(), setInterval(() => n(), e)
        },
        getTemperature: function() {
            return a
        }
    }
}, function(e, t, r) {// Function 301 Sendmail
    "use strict";
    const n = r(2),
        o = new(r(302))(n.mailgun);
    e.exports = o
}, function(e, t, r) {// Function 302 Sendmail low level
    "use strict";
    const n = r(0)("Mailgun"),
        o = r(1),
        i = r(303);
    (e.exports = function(e) {
        n.debug("init", e.domain), this.from = e.from, this.subjectprefix = e.subject, this.mailgun = new i({
            privateApi: e.apikey,
            domainName: e.domain
        })
    }).prototype.sendmail = function(e) {
        return e && e.to ? this.mailgun.sendEmail({
            to: e.to,
            from: this.from,
            subject: this.subjectprefix + e.subject,
            text: e.text
        }) : o.reject(new Error("missing parameter", e))
    }
}, function(e) {// Function 303 only contains exports = require("mailgun-es6")
    e.exports = require("mailgun-es6")
}, function(e, t, r) {// Function 304 exec recipe step 
    "use strict";
    AllFunctions(0)("Function 304").verbose("exec recipe step e:",e,t); 
    const n = r(0)("Schedulerstep: command"),
        o = r(43);
    e.exports = function(e) {
        const t = e.getAction(),
            i = r(52);
        r(27).get().then(e => {
            const r = e.getDeviceByKey(t.deviceKey);
            if (!r) throw new Error("no such device: " + t.deviceKey);
            const s = r.getComponent(t.componentName, t.componentType);
            if (!s) throw new Error("no such component: " + t.componentKey);
            const a = o.buildActionOfComponent(s.getName(), s, t.componentValue);
            i.trigger(a), n.debug("RECIPE_STEP_COMMAND_SUCCEEDED")
        }).catch(e => {
            n.error("RECIPE_STEP_COMMAND_FAILED", e.message)
        })
    }
}, function(e, t, r) {// Function 305 action executer
    "use strict";
    AllFunctions(0)("Function 305").verbose("action executer e:",e,t); 

    function n(e) {
        const t = e.action.component.getDevice();
        return p.test(t.details.sourceName)
    }
    const o = r(1),
        i = r(306),
        s = r(0)("ActionExecutor"),
        a = r(6)("neeo:actionExecutor"),
        c = r(143),
        u = r(314),
        d = r(3),
        l = r(101),
        p = /^src-/i,
        h = e.exports = function(e) {
            s.debug("init"), this.activeJobs = 0, this.maxJobCount = e.maxJobCount, this.highActiveQueuesWarning = e.highActiveQueuesWarning, this.deviceQueues = {}
        };
    h.prototype.trigger = function(e, t = {}) {
        const r = i.build(e, t);
        return r.promise.catch(e => {
            s.debug("JOB_FAILED", {
                error: e.message,
                name: r.name
            }), d.increaseCounter("actionexecutor-job-failed")
        }), t.repeat ? (c.dispatch(e, t).catch(e => {
            s.warn("DISPATCH_REPEAT_ERROR", {
                error: e.message
            }), d.increaseCounter("actionexecutor-dispatch-repeat-error")
        }).finally(() => r.markAsDone()), r) : (d.increaseCounter("actionexecutor-job-created"), l.relayActionJob(r), this._runJob(r, t), r)
    }, h.prototype._runJob = function(e, t) {
        if (this.activeJobs >= this.maxJobCount) return void this._jobSkipped(e);
        const r = e.getDevicesUsed().map(e => this._getDeviceQueueByDevice(e));
        let i = 0;
        this.activeJobs++, e.start(), a("JOB_SCHEDULING %s", e.name), e.steps.forEach((c, u) => {
            const l = c.action;
            if (!l) {
                if (0 === e.getDevicesUsedAfter(u).length) return a("JOB_INCREMENTING_TRAIL_DELAY %d", c.delay), void(i += c.delay);
                a("JOB_SCHEDULING_DELAY %d, queues: %d", c.delay, r.length);
                const t = o.all(r.map(e => e.promise.catch(() => {})));
                return void r.forEach(e => {
                    e.scheduleWaitFor(t, c.delay)
                })
            }
            const p = this._getDeviceQueueByAction(l);
            a("JOB_SCHEDULING_DISPATCH %s %s", e.name, l.name), p.scheduleDispatch(c, t).catch(t => {
                return e.error = t, n(c) ? (d.increaseCounter("actionexecutor-sdk-trigger-action-failed"), void s.debug("TRIGGER_ACTION_SDK", {
                    name: e.name,
                    error: t.message
                })) : (d.increaseCounter("actionexecutor-internalsdk-trigger-action-failed"), void s.debug("TRIGGER_ACTION", {
                    name: e.name,
                    error: t.message
                }))
            })
        });
        const c = o.all(r.map(e => e.promise));
        return 0 < i ? (a("JOB_TRAILING_DELAY %s %d", e.name, i), c.then(() => o.delay(i)).then(() => this._jobDone(e))) : c.then(() => this._jobDone(e))
    }, h.prototype._getDeviceQueueByAction = function(e) {
        const t = e.getComponent().getDevice();
        return this._getDeviceQueueByDevice(t)
    }, h.prototype._getDeviceQueueByDevice = function(e) {
        !this.deviceQueues[e.key] && (this.deviceQueues[e.key] = u.build(e));
        const t = Object.keys(this.deviceQueues).length;
        return t > this.highActiveQueuesWarning && s.warn("HIGH_JOB_DEVICE_QUEUES", {
            activeDeviceQueues: t
        }), this.deviceQueues[e.key]
    }, h.prototype._cleanEmptyDeviceQueues = function() {
        this.deviceQueues = Object.keys(this.deviceQueues).reduce((e, t) => {
            const r = this.deviceQueues[t];
            return r.isEmpty() ? (a("DELETING_EMPTY_DEVICE_QUEUE %s", r.device.name), e) : (e[t] = r, e)
        }, {})
    }, h.prototype._jobDone = function(e) {
        this.activeJobs--, e.markAsDone();
        const t = e.getDuration(),
            r = t > e.estimatedDuration,
            n = Object.keys(this.deviceQueues).length;
        a("JOB_DONE %o", {
            name: e.name,
            error: e.error ? e.error.message : void 0,
            duration: e.getDuration(),
            endTime: e.endTime
        }), r && s.warn("LONG_RUNNING_JOB", {
            name: e.name,
            duration: t,
            estimatedDuration: e.estimatedDuration,
            activeDeviceQueues: n
        }), this._cleanEmptyDeviceQueues(), d.increaseCounter("actionexecutor-job-done")
    }, h.prototype._jobSkipped = function(e) {
        s.debug("JOB_SKIPPED", {
            msg: "MAX_ACTIVE_JOBS_LIMIT_REACHED",
            name: e.name
        }), e.markAsDone(), d.increaseCounter("actionexecutor-job-skipped")
    }
}, function(e, t, r) {// Function 306 job  execute action defined; either from a set of commands (f.e. favorites) or single command
    "use strict";
    AllFunctions(0)("Function 306").verbose("job"); // note e changes format depending on type of originator for action

    function n(e) {
        if (!e) return [];
        const t = [],
            j = r,
            x = r(506);
        //AllFunctions(0)("Function 306").verbose("e:",e )
        //AllFunctions(0)("Function 306").verbose("t:",t )
        return e.eachLeafAction(r => {
            const n = r.getComponent(),
                o = r.getName();
            let i = parseInt(r.getDelay(), 10);
            return n ? function(e) {
                const t = e.getComponent();
                if (!t || !e.smartAction) return !1;
                const r = t.getDevice(),
                    n = t.isPowerStateCorrect(),
                    o = c.STUPID_DEVICE_TYPES.includes(r.details.type);
                    return n && o
            }(r) ? void d.debug("SKIP_ACTION", {
                name: o 
            }) : (i = function(e) {
                const t = e.getComponent();
                if (!t || !e.smartAction) return !1;
                
                const r = t.getDevice(),
                    n = !r.hasMultipleRoles() && r.hasRole(c.ROLE_SOURCE);
                return t.isPowerStateCorrect() || n
            }(r) ? 0 : i, r.getComponent().triggering(), d.debug("QUEUE_ACTION", {
                name: o,
                delay: i
            }), 
            (r.name.substring(0,7) == "CHANNEL")  ? AllFunctions(0)("Function 306").verbose("channelsave start;capabilities:",e.component.device.capabilities) : {},
            (e.component != undefined && e.component.key != undefined && e.component.device.capabilities.findIndex((theCapab) => {return theCapab == "neeo.custom.channelsave"}) >0) && ( r.name.substring(0,5) == "DIGIT")   ? (d.debug("Sending DIGIT", e.getName),x.putCurrDigit(e.name,e.component.device.key)) : {},
            (e.component != undefined && e.component.key != undefined && e.component.device.capabilities.findIndex((theCapab) => {return theCapab == "neeo.custom.channelsave"}) >0) && ( r.name.substring(0,7) == "CHANNEL") ? (d.debug("Sending CHANNEL", e.getName),x.putChannelUpDown(e.name,e.component.device.key,e,j))  : {},
            (void t.push({
                action: r,
                delay: i
            }))    ) : 0 === i ? void d.debug("SKIP_NON_ACTION_STEP", {
                name: o
            }) : (d.debug("QUEUE_DELAY_ACTION", {
                name: e.getName(),
                delay: i
            }), void t.push({
                action: null,
                delay: i
            }))
        }), t
    }
    function o(e) {
        return 0 | e
    }
    var i = Number.isInteger,
        s = Math.max;
    const a = r(307),
        c = r(30),
        u = r(142).__,
        d = r(0)("Job"),
        l = r(1),
        p = [a.ACTION_POWER_ON, a.ACTION_POWER_TOGGLE_ON],
        h = [a.ACTION_POWER_OFF, a.ACTION_POWER_TOGGLE_OFF],
        g = 2e3;
    let m = 0;
    const f = e.exports = function(e, t = {}) {
        this.id = m++, this.action = e, this.options = t, this.startTime = void 0, this.error = void 0, this.name = e ? e.name : void 0, this.type = t.recipeType, t.repeat ? (this.steps = [], this.estimatedDuration = -1) : (this.steps = n(e), this.estimatedDuration = o(function(e) {
            let t = 0;
            const r = {};
            (e = e || []).forEach(e => {
                if (!e.action) return void(t += e.delay);
                const n = e.action.getComponent().getDevice();
                n && (void 0 === r[n.key] && (r[n.key] = 0), r[n.key] += e.delay)
            });

            const n = Object.keys(r).reduce((e, t) => s(e, r[t]), 0);
            return t + n + g
        }(this.steps))), this.promise = new l((e, t) => {
            this._resolve = e, this._reject = t
        })
    };
    f.build = function(e, t) {
        try {
            AllFunctions(0)("Function 306").verbose("build");
            return new f(e, t)
        } catch (r) {AllFunctions(0)("Function 306").verbose("build FAILED",r);
            return d.error("JOB_BUILD_FAILED", {
                msg: r.message,
                action: e,
                options: t
            }), new f
        }
    }, f.prototype.start = function() {
console.log("prototype start")        
        this.startTime || (this.startTime = Date.now())
    }, f.prototype.markAsDone = function() {
        this.endTime = Date.now(), this.error ? this._reject(this.error) : this._resolve()
    }, f.prototype.getDuration = function() {
        return i(this.startTime) && i(this.endTime) ? this.endTime - this.startTime : -1
    }, f.prototype.getWaitTextFormat = function(e) {
        return p.includes(e) ? "Turn on {{deviceName}}" : h.includes(e) ? "Turn off {{deviceName}}" : /input/i.test(e) ? "Switch {{deviceName}} to {{actionName}}" : "Send {{actionName}} to {{deviceName}}"
    }, f.prototype.getDevicesUsed = function() {
        return this.steps.filter(e => e.action).reduce((e, t) => {
            const r = t.action.getComponent().getDevice();
            return e.includes(r) || e.push(r), e
        }, [])
    }, f.prototype.getDevicesUsedAfter = function(e) {
        return this.steps.slice(e + 1).filter(e => e.action).reduce((e, t) => {
            const r = t.action.getComponent().getDevice();
            return e.includes(r) || e.push(r), e
        }, [])
    }, f.prototype.getWaitSteps = function() {
        const e = (Array.isArray(this.steps) ? this.steps : []).filter(e => e.action).map(e => {
            const t = e.action,
                r = t.component.getDevice();
            return {
                duration: -1,
                text: u(this.getWaitTextFormat(t.getName()), {
                    deviceName: r.getName(),
                    actionName: t.getName()
                })
            }
        });
        if (0 === e.length) {
            return [{
                duration: 1e3,
                text: "poweroff" === this.type ? "Leaving Recipe" : "Activating Recipe"
            }]
        }
        const t = s(1e3, this.estimatedDuration / e.length);
        return e.map(e => (e.duration = o(t), e))
    }, f.prototype.toJSON = function() {
        return {
            estimatedDuration: this.estimatedDuration,
            startTime: this.startTime,
            error: this.error ? this.error.message : void 0,
            steps: this.getWaitSteps(),
            name: this.name,
            type: this.type
        }
    }
}, function(e) {// Function 307 definition of a number of actions (power xx, mute xx, volume xx)
    "use strict";
    e.exports.ACTION_POWER_OFF = "POWER OFF", e.exports.ACTION_POWER_ON = "POWER ON", e.exports.ACTION_POWER_TOGGLE_ON = "POWER TOGGLE ON", e.exports.ACTION_POWER_TOGGLE_OFF = "POWER TOGGLE OFF", e.exports.ACTION_VOLUME_UP = "VOLUME UP", e.exports.ACTION_VOLUME_DOWN = "VOLUME DOWN", e.exports.ACTION_MUTE_OFF = "MUTE OFF", e.exports.ACTION_MUTE_ON = "MUTE ON", e.exports.ACTION_MUTE_TOGGLE = "MUTE TOGGLE", e.exports.ACTIONS = [e.exports.ACTION_POWER_ON, e.exports.ACTION_POWER_OFF, e.exports.ACTION_VOLUME_UP, e.exports.ACTION_VOLUME_DOWN, e.exports.ACTION_MUTE_OFF, e.exports.ACTION_MUTE_ON, e.exports.ACTION_MUTE_TOGGLE]
}, function(e) {// Function 308 only contains exports = require("i18n")
    e.exports = require("i18n")
}, function(e, t, r) {// Function 309 irproxy
    "use strict";
    const n = r(1),
        o = r(0)("irproxy"),
        i = r(3),
        s = r(31),
        a = e.exports = function() {
            o.debug("init IrProxy"), this.queuePromise = n.resolve()
        };
    a.prototype._write = function(e) {
        i.setValue("irblaster-last-send-timestamp", Date.now());
        const t = e.getFrequency(),
            r = e.getRepeat(),
            a = e.getOffset(),
            c = e.getValues().join("."),
            u = e.durationMs();
        return e.isValid() ? s.sendIr(t, r, a, c, u) : (i.increaseCounter("irproxy-invalid-payload"), o.error("IR_PAYLOAD_INVALID", {
            duration: u,
            repeat: r,
            offset: a,
            freq: t
        }), n.resolve())
    }, a.prototype._enqueue = function(e) {
        const t = e(this.queuePromise);
        return this.queuePromise = t.catch(() => {}), t
    }, a.prototype.sendWithPriority = function(e) {
        return this._write(e)
    }, a.prototype.send = function(e) {
        return i.increaseCounter("irproxy-send-started"), this._enqueue(t => t.then(() => this._write(e)).catch(e => (i.increaseCounter("irproxy-send-failed"), o.warn("IR_SEND_FAILED", e.message || ""), n.reject(e))))
    }, a.prototype.startIrLearn = function() {
        return this._enqueue(e => e.then(() => s.startLearnir()))
    }, a.prototype.stopIrLearn = function() {
        return this._enqueue(e => e.then(() => s.stopLearnir()).then(() => s.fetchIrData()))
    }
}, function(e, t, r) {// Function 310 irblaster
    "use strict";
    const n = r(1),
        o = r(0)("irblaster"),
        i = r(3),
        s = r(311),
        a = r(145),
        c = r(100),
        u = e.exports = function(e, t) {
            this.irProxy = e, this.repeatTimeoutId = null, this.repeatCommandName = null, this.repeatTimeout = t.repeatTimeout, this.repeatCount = 0, o.debug("init", t)
        };
    u.prototype._sendCommand = function(e, t) {
        let r = n.resolve();
        return e.payload.forEach(e => {
            "payloads" in e ? r = r.then(() => {
                const r = new s(e);
                return r.getType() === c.IR_PAYLOAD_TYPE_NOP ? (o.debug("ignore NOP payloads"), n.resolve()) : this.irProxy.send(r.getIrMessage(t))
            }) : "milliseconds" in e ? r = r.then(() => (o.debug("wait for ms:", e.milliseconds), n.delay(e.milliseconds))) : (i.increaseCounter("irblaster-ignored-illegal-request"), o.warn("IRBLASTER_ILLEGAL_VALUE_TO_SEND", JSON.stringify(e)))
        }), r
    }, u.prototype._cancelRepeat = function(e) {
        return o.debug("CANCEL_REPEAT", {
            manualCancel: e
        }), this.irProxy.send(a.STOP_REPEAT).then(() => {
            i.increaseCounter("irblaster-irrepeat-cancel"), this.repeatCommandName = null
        })
    }, u.prototype._isIrRepeatRunning = function() {
        return this.repeatCommandName
    }, u.prototype.sendSingleCommand = function(e) {
        const t = new s({
            payloads: [e]
        });
        return t.getType() === c.IR_PAYLOAD_TYPE_NOP ? (o.debug("ignore NOP payloads"), n.resolve()) : this.irProxy.send(t.getIrMessage())
    }, u.prototype.trigger = function(e, t) {
        t = t || {};
        const r = this.repeatCommandName !== e.name;
        return this.repeatCommandName && r ? (i.increaseCounter("irblaster-ignored-irrepeat-request"), o.debug("IRBLASTER_IRREPEAT_IN_PROGRESS", this.repeatCommandName), n.resolve()) : t.repeat ? this.repeatCount >= 50 ? (i.increaseCounter("irblaster-irrepeat-limit-reached"), o.debug("IR_REPEAT_HARD_LIMIT_REACHED"), n.resolve()) : (this.repeatTimeoutId && clearTimeout(this.repeatTimeoutId), this.repeatTimeoutId = setTimeout(() => {
            this._cancelRepeat()
        }, this.repeatTimeout), this.repeatCommandName === e.name ? (i.increaseCounter("irblaster-irrepeat-refreshed"), this.repeatCount++, o.debug("IRBLASTER_IR_REPEAT_REFRESHED", e.name, this.repeatCount), n.resolve()) : (this.repeatCommandName = e.name, this._sendCommand(e, t), this.repeatCount = 0, n.resolve())) : (this.repeatCount = 0, this._isIrRepeatRunning() ? (o.debug("IR REPEAT STILL ACTIVE!"), this._cancelRepeat(!0).then(() => (clearTimeout(this.repeatTimeoutId), this._sendCommand(e, t)))) : this._sendCommand(e, t))
    }
}, function(e, t, r) {// Function 311 process ir-data
    "use strict";
    const n = r(100),
        o = r(145),
        i = e.exports = function(e) {
            this.payloads = e.payloads || [], this.commandName = e.name || "N/A", this.type = this._parseType()
        };
    i.DEFAULT_DELAY_FACTOR = 1, i.toggleFlip = 1, i.prototype._parseType = function() {
        if (1 < this.payloads.length) return n.IR_PAYLOAD_TYPE_TOGGLE;
        const e = this.payloads[0];
        return "NOP" === e || void 0 === e ? n.IR_PAYLOAD_TYPE_NOP : n.IR_PAYLOAD_TYPE_SIMPLE
    }, i.prototype.getType = function() {
        return this.type
    }, i.prototype._getRawData = function() {
        return this.type === n.IR_PAYLOAD_TYPE_TOGGLE ? (i.toggleFlip ^= 1, this.payloads[i.toggleFlip]) : this.payloads[0]
    }, i.prototype.getIrMessage = function(e) {
        e = e || {};
        const t = o.create(this._getRawData());
        return e.repeat && t.setRepeat(0), t
    }
}, function(e, t, r) {// Function 312 ActionDispatcher (IR-only?)
    "use strict";
    const n = r(1),
        o = r(0)("ActionDispatcher"),
        i = r(14),
        s = r(8),
        a = r(18),
        c = r(313),
        u = e.exports = function(e) {
            o.debug("init", e), i(e, {
                deviceAdapter: {
                    presence: !0
                },
                irBlaster: {
                    presence: !0
                }
            }), this.deviceAdapter = e.deviceAdapter, this.irBlaster = e.irBlaster
        };
    u.prototype._dispatchWithIrBlaster = function(e, t) {
        return o.debug("trigger ir blaster command"), this.irBlaster.trigger(e, t)
    }, u.prototype.dispatch = function(e, t) {
        const r = e.getComponent(),
            i = r.getDevice();
        return o.debug("dispatch action", e.getName()), i.getSourceName() === a.SOURCE_DUIRO ? function(e) {
            return e.getComponentType() === s.COMPONENT_MACRO_TYPE_NAME && e.getCommand().getMedium() === c.MEDIUM_INFRARED
        }(r) ? this._dispatchWithIrBlaster(r.getCommand(), t).then(() => r.triggered()) : (o.error("CANNOT_DISPATCH_NON_IR_DUIRO_DEVICE", {
            device: i
        }), n.reject(new Error("CANNOT_DISPATCH_NON_IR_DUIRO_DEVICE"))) : this.deviceAdapter.trigger(r, e.getExecArg()).then(() => r.triggered())
    }
}, function(e) {// Function 313 only exports.MEDIUM_INFRARED = "infrared", e.exports.MEDIA = [e.exports.MEDIUM_INFRARED]
    "use strict";
    e.exports.MEDIUM_INFRARED = "infrared", e.exports.MEDIA = [e.exports.MEDIUM_INFRARED]
}, function(e, t, r) {// Function 314 class to create DeviceQueueu
    "use strict";
    const n = r(1),
        o = r(0)("DeviceQueue"),
        i = r(6)("neeo:actionExecutor:deviceQueue"),
        s = r(143),
        a = () => {};
    e.exports = class e {
        constructor(e) {
            this.device = e, this.promise = n.resolve(), this.size = 0
        }
        static build(t) {
            if (!t) throw new Error("Cannot create DeviceQueue without device");
            return new e(t)
        }
        scheduleDispatch(e, t) {
            return new n((r, o) => {
                this._enqueue(() => (i("executing scheduled dispatch", e.action.name, e.delay), s.dispatch(e.action, t).then(() => n.delay(e.delay)))).then(r).catch(o)
            })
        }
        scheduleWaitFor(e, t = 0) {
            return new n((r, o) => {
                this._enqueue(() => (i("executing scheduled waitFor", this.device.name, t), e.catch(a).then(() => n.delay(t)))).then(r).catch(o)
            })
        }
        _enqueue(e) {
            this.size++, 20 === this.size && o.warn("LARGE_DEVICE_QUEUE", {
                name: this.device.getName(),
                manufacturer: this.device.getManufacturer(),
                type: this.device.getType()
            });
            const t = this.promise.then(e);
            return this.promise = t.catch(a).finally(() => {
                this.size--
            }), t
        }
        isEmpty() {
            return 0 === this.size
        }
    }
}, function(e, t, r) {// Function 315 relayjob (send messasge to remote host (BRAIN, I guess))
    "use strict";

    function n(e) {
        if (d(e, "device.roomName")) return e.device.roomName
    }

    function o(e) {
        if (d(e, "device.name")) return e.device.name
    }

    function i(e) {
        if (d(e, "action.component.device")) {
            return {
                action: e.action.component.name || e.action.name,
                device: o(e.action.component),
                room: n(e.action.component),
                actionparameter: d(e, "action.execArg") ? e.action.execArg : void 0
            }
        }
        const t = {
                action: e.action.name
            },
            r = function(e) {
                const t = e.action.actions;
                return Array.isArray(t) ? t.map(e => o(e.component)).find(e => e) : void 0
            }(e);
        r && (t.device = r);
        const i = function(e) {
            const t = e.action.actions;
            return Array.isArray(t) ? t.map(e => n(e.component)).find(e => e) : void 0
        }(e);
        return i && (t.room = i), t
    }
    const s = r(6)("cp6:lib:relayjob:relayjob"),
        a = r(78),
        c = r(17),
        u = r(40),
        d = r(316),
        l = r(32),
        p = e.exports = function() {
            s("init"), this._httpAgent = new u.Agent({
                maxSockets: 1,
                keepAlive: !0,
                keepAliveMsecs: 8e3
            })
        };
    p.prototype.setRemotehost = function(e, t, r) {
        if (e && t) {
            const n = r || "/neeo";
            return this.url = a.parse("http://" + e + ":" + t + n), s("set remote host %o", {
                host: e,
                port: t,
                path: n
            }), this.url
        }
    }, p.prototype.clearRemoteHost = function() {
        this.url = void 0
    }, p.prototype._sendMessage = function(e) {
        s("relay message"), c({
            uri: this.url,
            method: "POST",
            json: !0,
            body: e,
            timeout: 5e3,
            pool: this._httpAgent
        }).catch(e => {
            const t = l.extractInfo(e);
            s("relay job failed", t.message)
        })
    }, p.prototype.relayActionJob = function(e) {
        if (this.url && e && e.action && e.action.name) {
            const t = i(e);
            Array.isArray(e.steps) && e.type && (t.action = e.type, t.recipe = e.action.name), this._sendMessage(t)
        }
    }
}, function(e) {// Function 316 only contains exports = require("lodash/has")
    e.exports = require("lodash/has")
}, function(e, t, r) {// Function 317 Schedulerstep: recipe" (r(27).get)
    "use strict";
    const n = r(0)("Schedulerstep: recipe");
    e.exports = function(e) {
        const t = e.getAction().recipe;
        return r(27).get().then(e => {
            t.execute(e), n.debug("RECIPE_STEP_RECIPE_SUCCEEDED")
        }).catch(e => {
            n.error("RECIPE_STEP_RECIPE_FAILED", e.message)
        }), null
    }
}, function(e, t, r) {// Function 318 class extends r(80): type: icon
    "use strict";
    const n = r(80);
    e.exports = class extends n {
        static get TYPE() {
            return "icon"
        }
        constructor(e) {
            super(e), this.recipe = e.recipe, this.validate()
        }
        _validateIngredients() {
            if (!this.recipe) throw new Error("validation failed: `recipe` is missing");
            if ("function" != typeof this.recipe.getName) throw new Error("validation failed: `recipe.getName()` is not a function")
        }
        getIngredients() {
            return {}
        }
        getLabel() {
            return `When icon "${this.recipe.getName()}" is pressed`
        }
        getActivity() {
            return null
        }
    }
}, function(e, t, r) {// Function 319 class extends r(80): type: sensor
    "use strict";
    const n = r(86),
        o = r(80),
        i = r(102);
    class s extends o {
        static get TYPE() {
            return "sensor"
        }
        static get COMPARISONS() {
            return {
                lt: "lower than",
                gt: "greater than",
                equal: "equal to"
            }
        }
        constructor(e) {
            super(e), this.comparison = e.comparison, this.comparisonLabel = s.COMPARISONS[this.comparison], this.value = e.value, this.sensorType = e.sensorType, this.sensorName = e.sensorName, this.sensorEventKey = e.sensorEventKey, this.validate()
        }
        _validateIngredients() {
            if (super._validateIngredients(), !this.comparisonLabel) throw new Error("validation failed: `comparisonLabel` is missing");
            if (!this.sensorName) throw new Error("validation failed: `sensorName` is missing")
        }
        getIngredients() {
            return {
                comparison: this.comparison,
                value: this.value,
                sensorType: this.sensorType,
                sensorName: this.sensorName,
                sensorEventKey: this.sensorEventKey
            }
        }
        getLabel() {
            let e = "";
            return 'When sensor "' + this.sensorName + '" ' + (e = "keypad" === this.sensorType ? "is " + this.comparisonLabel + " Button " + this.value.KeyCode + " " + {
                "event.pressed": "pressed",
                "event.pressed.long": "long pressed",
                "event.released": "released",
                "event.pressed.double": "double pressed",
                "event.pressed.double.long": "long double pressed"
            } [this.value.EventType] : n(this.value) ? "turns " + (this.value ? "on" : "off") : "is " + this.comparisonLabel + " " + this.value)
        }
        getActivity(e) {
            return new i({
                name: this.getLabel(),
                condition: {
                    type: i.CONDITION_SENSOR,
                    comparison: this.comparison,
                    value: this.value,
                    sensor: {
                        type: this.sensorType,
                        eventKey: this.sensorEventKey
                    }
                },
                optionalConditions: e ? e.getConditions() : [],
                action: {
                    type: "recipe",
                    recipe: e
                }
            })
        }
    }
    e.exports = s
}, function(e, t, r) {// Function 320 class extends r(80): type: time
    "use strict";
    const n = r(80),
        o = r(102);
    e.exports = class extends n {
        static get TYPE() {
            return "time"
        }
        constructor(e) {
            super(e), this.time = e.time, this.repeat = e.repeat, this.validate()
        }
        getIngredients() {
            return {
                time: this.time,
                repeat: this.repeat
            }
        }
        getLabel() {
            const e = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let t = "on ",
                r = "";
            if (7 === this.repeat.length) t = "", r = "every day";
            else {
                const t = [];
                this.repeat.map(function(r) {
                    t.push(e[r])
                }), r = t.join(", ")
            }
            return t + r
        }
        getActivity(e) {
            return new o({
                name: this.getLabel(),
                condition: {
                    type: o.CONDITION_TIME,
                    time: this.time,
                    repeat: this.repeat
                },
                optionalConditions: e ? e.getConditions() : [],
                action: {
                    type: "recipe",
                    recipe: e
                }
            })
        }
    }
}, function(e, t, r) {// Function 321 class extends r(80): type: interval
    "use strict";
    const n = r(80),
        o = r(102);
    e.exports = class extends n {
        static get TYPE() {
            return "interval"
        }
        constructor(e) {
            super(e), this.interval = e.interval, this.validate()
        }
        getIngredients() {
            return {
                interval: this.interval
            }
        }
        getLabel() {
            return this.label
        }
        getActivity(e) {
            return new o({
                name: this.getLabel(),
                condition: {
                    type: o.CONDITION_INTERVAL,
                    unit: "second",
                    interval: this.interval
                },
                optionalConditions: e ? e.getConditions() : [],
                action: {
                    type: "recipe",
                    recipe: e
                }
            })
        }
    }
}, function(e, t, r) {// Function 322 return value based on type==TIME or SENSOR
    "use strict";
    const n = r(323),
        o = r(324),
        i = {};
    i[n.TYPE] = n, i[o.TYPE] = o, e.exports = function(e) {
        const t = e.type;
        if (!t) throw new Error("No recipe condition type given");
        const r = i[t];
        if (!r) throw new Error("No such recipe condition type: " + t);
        return new r(e)
    }, e.exports.TYPE_TIME = n.TYPE, e.exports.TYPE_SENSOR = o.TYPE
}, function(e, t, r) {// Function 323 class extends r(148): type: CONDITION_TYPE_TIME
    "use strict";
    const n = r(48),
        o = r(95),
        i = r(1),
        s = r(14),
        a = r(63),
        c = e => 3600 * e.hour + 60 * e.minute,
        u = r(148);
    class d extends u {
        static get TYPE() {
            return a.CONDITION_TYPE_TIME
        }
        constructor(e) {
            e.type = d.TYPE, super(e), this.time = e.time, this.repeat = e.repeat, this.comparison = e.comparison, this.validate()
        }
        getLabel() {
            return this.label
        }
        validate() {
            super.validate(), s(this, {
                comparison: {
                    presence: !0,
                    inclusion: a.CONDITION_TIME_COMPARISONS
                },
                time: {
                    presence: !0
                },
                repeat: {
                    presence: !0,
                    length: {
                        maximum: 7
                    }
                }
            }), s.isArray(this.repeat);
            const e = (e, t, r) => {
                s.single(e, {
                    presence: !0,
                    numericality: {
                        noStrings: !0,
                        greaterThanOrEqualTo: t,
                        lessThanOrEqualTo: r
                    }
                })
            };
            e(this.time.hour, 0, 23), e(this.time.minute, 0, 59), this.repeat.forEach(t => e(t, 0, 6))
        }
        checkForConflicts(e) {
            const t = e.filter(e => e.type === this.type);
            if (2 <= t.length) throw new Error("Conflict: Can't add more than two time conditions. They would always contradict eachother.");
            if (1 === t.length) {
                const e = this.comparison === a.CONDITION_COMPARISON_LT,
                    r = e ? "before" : "after",
                    n = e ? "after" : "before";
                if (t[0].comparison === this.comparison) throw new Error(`Conflict: Can't add two "${r}" time conditions. One would always be obsolete.`);
                if (0 === o(this.repeat, t[0].repeat).length) throw new Error("Conflict: Time conditions must share at least one weekday with other time conditions.");
                const i = e ? this.time : t[0].time,
                    s = e ? t[0].time : this.time,
                    u = c(i) - c(s);
                if (0 > u) throw new Error(`Conflict: Can't add second time condition where "${r}" time is ${r} the "${n}" time.`);
                if (0 == u) throw new Error("Conflict: Can't add second time condition with same time as an other one.")
            }
        }
        check() {
            const e = new Date,
                t = e.getUTCDay(),
                r = {
                    hour: e.getUTCHours(),
                    minute: e.getUTCMinutes()
                };
            if (-1 === this.repeat.indexOf(t)) return i.resolve(!1);
            switch (this.comparison) {
                case a.CONDITION_COMPARISON_GT:
                    return i.resolve(c(r) >= c(this.time));
                case a.CONDITION_COMPARISON_LT:
                    return i.resolve(c(r) <= c(this.time));
                default:
                    return i.resolve(!1)
            }
        }
        toJSON() {
            const e = super.toJSON();
            return n(e, {
                time: this.time,
                repeat: this.repeat,
                comparison: this.comparison
            })
        }
    }
    e.exports = d
}, function(e, t, r) {// Function 324 class extends r(148): type: CONDITION_TYPE_SENSOR
    "use strict";
    const n = r(48),
        o = r(0)("SensorCondition"),
        i = r(14),
        s = r(325),
        a = r(55),
        c = r(63),
        u = r(148);
    class d extends u {
        static get TYPE() {
            return c.CONDITION_TYPE_SENSOR
        }
        static get COMPARISONS() {
            return {
                lt: "lower than",
                gt: "greater than",
                equal: "equal to"
            }
        }
        constructor(e) {
            e.type = d.TYPE, super(e), this.comparison = e.comparison, this.comparisonLabel = d.COMPARISONS[this.comparison], this.value = e.value, this.sensorType = e.sensorType, this.sensorName = e.sensorName, this.sensorEventKey = e.sensorEventKey, this.validate()
        }
        validate() {
            super.validate(), i(this, {
                comparison: {
                    inclusion: c.CONDITION_SENSOR_COMPARISONS
                },
                value: {
                    presence: !0
                },
                sensorType: {
                    presence: !0,
                    inclusion: c.VALID_CONDITION_SENSOR_TYPES
                },
                sensorName: {
                    presence: !0
                },
                sensorEventKey: {
                    presence: !0
                }
            }), c.BINARY_SENSOR_TYPES.includes(this.sensorType) && i(this, {
                value: {
                    inclusion: a.SENSOR_BINARY_VALID_VALUES
                },
                comparison: {
                    inclusion: c.VALID_BINARY_SENSOR_COMPARISONS
                }
            }), this.sensorType === a.TYPE_RANGE && i(this, {
                value: {
                    numericality: {
                        noStrings: !0
                    }
                }
            }), this.sensorType === a.TYPE_KEYPAD && i(this, {
                comparison: {
                    inclusion: c.VALID_KEYPAD_SENSOR_COMPARISONS
                }
            })
        }
        getLabel() {
            let e = "";
            return 'If sensor "' + this.sensorName + '" ' + (e = "boolean" == typeof this.value ? "is " + (this.value ? "on" : "off") : "is " + this.comparisonLabel + " " + this.value)
        }
        _checkBinarySensor(e) {
            switch (this.value) {
                case a.TYPE_BINARY_TRUE:
                    return !0 === e;
                case a.TYPE_BINARY_FALSE:
                    return !1 === e;
                default:
                    return o.warn("UNKNOWN_BINARYSENSOR", this.value), !1
            }
        }
        _checkRangeSensor(e) {
            switch (this.comparison) {
                case c.CONDITION_COMPARISON_LT:
                    return e < this.value;
                case c.CONDITION_COMPARISON_GT:
                    return e > this.value;
                case c.CONDITION_COMPARISON_EQ:
                    return e === this.value;
                default:
                    return o.warn("UNKNOWN_SENSORRANGE", this.comparison), !1
            }
        }
        _checkKeypadSensor(e) {
            switch (this.comparison) {
                case c.CONDITION_COMPARISON_EQ:
                    const t = e.KeyCode === this.value.KeyCode,
                        r = e.EventType === this.value.EventType;
                    return t && r;
                default:
                    return !1
            }
        }
        _checkSensor(e) {
            switch (this.sensorType) {
                case a.TYPE_BINARY:
                case a.TYPE_POWERSTATE:
                    return this._checkBinarySensor(e);
                case a.TYPE_RANGE:
                    return this._checkRangeSensor(e);
                case a.TYPE_KEYPAD:
                    return this._checkKeypadSensor(e);
                default:
                    return o.warn("UNKNOWN_SENSORCHECK", this.sensorType), !1
            }
        }
        check() {
            return s.getValue(this.sensorEventKey).then(e => this._checkSensor(e.value)).catch(e => (o.error("RECIPE_CONDITION_CHECK_FAILED", e.message), !1))
        }
        checkForConflicts() {}
        toJSON() {
            const e = super.toJSON();
            return n(e, {
                comparison: this.comparison,
                value: this.value,
                sensorType: this.sensorType,
                sensorName: this.sensorName,
                sensorEventKey: this.sensorEventKey
            })
        }
    }
    e.exports = d
}, function(e, t, r) {// Function 325 Create class "Sensor Value" (326))
    "use strict";
    const n = r(2).sensorvalue,
        o = new(r(326))(n);
    e.exports = o
}, function(e, t, r) {// Function 326 Class definition "Sensor value"; contains getvalue
    "use strict";
    const n = r(0)("Sensor Value"),
        o = r(17);
    e.exports = class {
        constructor(e) {
            n.debug("init", e), this.baseUrl = e.baseUrl
        }
        getValue(e) {
            return n.debug("getValue", e), o({
                method: "GET",
                json: !0,
                uri: this.baseUrl + "/" + e,
                timeout: 12e3
            })
        }
    }
}, function(e, t, r) {// Function 327 getRecipeForScenario
    "use strict";
    const n = r(81),
        o = {
            [n.TYPE_LAUNCH]: r(328),
            [n.TYPE_POWEROFF]: r(329)
        };
    e.exports = {
        getRecipeForScenario: function(e, t, r) {
            if (!o[e]) throw new Error("no such recipe in cookbook: " + e);
            if (r && r.isDirty()) return r;
            const n = o[e](t);
            return r && (n.setKey(r.getKey()), n.weight = r.weight), n
        }
    }
}, function(e, t, r) {// Function 328 Recipe TYPE_LAUNCH
    "use strict";

    function n(e) {
        const t = e.getDevice();
        return s({
            type: i.STEP_TYPE_ACTION,
            deviceKey: t.getKey(),
            deviceName: t.getName(),
            componentName: e.getName()
        })
    }

    function o(e, t) {
        const r = t.getDevices();
        r.sort(c.sortDevicesBy(c.ROLE_DESTINATION)).forEach(t => {
            const r = function(e) {
                let t = p.MACRO_POWER_ON;
                return l.VIRTUAL_POWER_MODES.includes(e.powerMode) && (t = p.MACRO_POWER_TOGGLE_ON), e.getMacroByName(t)
            }(t);
            r && e.addStep(n(r))
        });
        const o = function(e) {
            return e.filter(e => e.hasRole(c.ROLE_HUB) || e.hasRole(c.ROLE_DESTINATION)).reduce((e, t) => Math.max(e, t.getStandbyCommandDelay()), 0)
        }(r);
        if (0 < o && e.hasSteps()) {
            const t = s({
                type: i.STEP_TYPE_DELAY,
                delay: o,
                smart: !0
            });
            e.addStep(t)
        }(function(e, t) {
            const r = [];
            return t.forEach(t => {
                const n = e.getDeviceInputMacroName(t);
                if (n) {
                    const e = t.getMacroByName(n, !0);
                    return e ? void r.push(e) : void a.warn("MISSING_INPUT_MACRO", {
                        macroname: n,
                        devicename: t.getName(),
                        key: t.getKey()
                    })
                }
            }), r
        })(t, r).forEach(t => {
                e.addStep(n(t))
            }),
            function(e, t) {
                const r = t.getVolumeDevice(),
                    n = s({
                        type: i.STEP_TYPE_VOLUME,
                        deviceKey: r.getKey(),
                        deviceName: r.getName()
                    });
                e.addStep(n)
            }(e, t)
    }
    const i = r(81),
        s = r(79),
        a = r(0)("recipe-launch"),
        c = r(30),
        u = r(19),
        d = r(21),
        l = r(36),
        p = r(33),
        h = c.RECIPE_GROUPED_DEVICE_TYPES;
    e.exports = function(e) {
        if ("object" != typeof e) throw new Error('scenario is required to write "launch" recipe');
        const t = !h.includes(e.getType()),
            r = new i({
                type: i.TYPE_LAUNCH,
                name: e.name,
                room: e.getRoom(),
                scenario: e,
                dirty: !1
            });
        return t && o(r, e),
            function(e, t) {
                const r = s({
                    type: i.STEP_TYPE_CONTROLS,
                    scenarioKey: t.getKey(),
                    scenarioName: t.getName()
                });
                e.addStep(r)
            }(r, e), r.setTrigger({
                type: i.TRIGGER_TYPE_ICON
            }), r.setEnabled(function(e) {
                const t = e.getMainDevice();
                return u.TYPE_TV === t.getType() ? t.useTuner() : !t.hasCapability(d.NEEO_FEATURE_RECIPE_HIDDEN)
            }(e)), r.markAsClean(), r
    }
}, function(e, t, r) {// Function 329 Recipe TYPE POWEROFF
    "use strict";

    function n(e, t) {
        t.getDevices().sort(s.sortDevicesBy(s.ROLE_DESTINATION)).forEach(t => {
            const r = function(e) {
                let t = c.MACRO_POWER_OFF;
                return a.VIRTUAL_POWER_MODES.includes(e.powerMode) && (t = c.MACRO_POWER_TOGGLE_OFF), e.getMacroByName(t)
            }(t);
            r && e.addStep(function(e) {
                const t = e.getDevice();
                return i({
                    type: o.STEP_TYPE_ACTION,
                    deviceKey: t.getKey(),
                    deviceName: t.getName(),
                    componentName: e.getName()
                })
            }(r))
        })
    }
    const o = r(81),
        i = r(79),
        s = r(30),
        a = r(36),
        c = r(33),
        u = s.RECIPE_GROUPED_DEVICE_TYPES;
    e.exports = function(e) {
        if ("object" != typeof e) throw new Error('scenario is required to write "poweroff" recipe');
        const t = !u.includes(e.getType()),
            r = new o({
                type: o.TYPE_POWEROFF,
                name: e.name,
                room: e.getRoom(),
                scenario: e
            });
        return t && n(r, e), r.markAsClean(), r
    }
}, function(e) {// Function 330 exports = require("lodash/findIndex")
    e.exports = require("lodash/findIndex")
}, function(e, t, r) {// Function 331 some browse / callaction based on detals.sourcename /^(src-|neeo-deviceadapter)/.
    "use strict";

    function n(e, t) {
        const r = {},
            n = function(e) {
                if (e && e.details && e.details.sourceName && /^(src-|neeo-deviceadapter)/.test(e.details.sourceName)) return e.details.sourceName
            }(t);
        if (n) return r.adapter = c, r.customSDKAdapterName = n, r;
        if (e === s.ADAPTER_DEVICE) return r.adapter = c, r.customAdapterName = "sonos", r;
        if (e === s.ADAPTER_DIRECTORY) return r.adapter = u, r.customAdapterName = "sonos", r;
        throw new Error(e + " is not supported")
    }

    function o(e, t) {
        if (e) {
            const r = {
                directoryKey: t.key,
                directoryId: t.directoryId
            };
            Object.assign(e, r)
        }
    }
    const i = r(2),
        s = r(98),
        a = r(20),
        c = a.deviceAdapter,
        u = a.directoryAdapter,
        d = i.tr2.listPageSize;
    e.exports = {
        browse: function(e, t = {}) {
            const r = n(e.adapterName, e.device),
                i = r.adapter,
                s = r.customSDKAdapterName || r.customAdapterName || e.adapterName;
            return void 0 === t.limit && (t.limit = d), i.browse(e, s, t).then(r => {
                if (r) return t.history && (r.history = t.history), r.items && r.items.length && r.items.forEach(t => o(t.data, e)), r.collectionItem && o(r.collectionItem.data, e), ["current", "next", "previous"].forEach(t => {
                    r._meta && r._meta[t] && o(r._meta[t], e)
                }), r
            })
        },
        callAction: function(e, t = {}) {
            const r = n(e.adapterName, e.device),
                o = r.adapter,
                i = r.customSDKAdapterName || r.customAdapterName || e.adapterName;
            return o.callDirectoryAction(e, i, t)
        }
    }
}, function(e, t, r) {// Function 332 Actual API actions
    "use strict";

    function n(e) {
        this.devices = e.deviceStore, this.scenarios = e.scenarioStore, this.room = e.room
    }
    const o = r(19),
        i = r(33),
        s = r(153),
        a = e => !e.isConfigured(),
        c = e => {
            const t = e.getMainDevice();
            return t && t.getType() === o.TYPE_TV && t.useTuner()
        };
    n.prototype.addScenario = function(e) {
        return this.scenarios.put(e), e
    }, n.prototype.getDevices = function() {
        return this.devices.filter(e => e.isNoRecipeBuildDevice())
    }, n.prototype.getRoom = function() {
        return this.room
    }, n.prototype.getScenarios = function(e) {
        return this.scenarios.filter(e)
    }, n.prototype.getScenarioByName = function(e) {
        return this.scenarios.get(e)
    }, n.prototype.grouped = function(e) {
        return e.isGroupedDevice()
    }, n.prototype.getName = function(e) {
        return this.grouped(e) ? e.getType() : e.getName()
    }, n.prototype.buildFromDevices = function() {
        this.getDevices().forEach(e => {
            const t = this.getName(e);
            let r = this.getScenarioByName(t);
            if (!r) {
                const n = this.getRoom(),
                    o = {
                        name: t,
                        mainDeviceKey: e.getKey(),
                        devices: [e.key]
                    };
                (r = s.build(o, n)).resetConfigured(), this.addScenario(r)
            }
            r.getDeviceByKey(e.getKey()) || r.addDevice(e)
        })
    }, n.prototype.configureScenarios = function() {
        const e = this.getScenarios(a);
        this._configureTVScenarios(e)
    }, n.prototype._configureTVScenarios = function(e) {
        e.filter(c).forEach(e => {
            const t = e.getMainDevice();
            e.defineDeviceInput(t, i.MACRO_INPUT_TV), e.markConfigured()
        })
    }, t.buildAll = function(e) {
        const t = new n(e);
        t.buildFromDevices(), t.configureScenarios()
    }
}, function(e, t, r) {// Function 333 projectValidator
    //AllFunctions(0)("Function 333").verbose("projectValidator e:",e )
    "use strict";
    const n = r(0)("projectValidator"),
        o = r(3),
        i = r(334);
    t.validateAndClean = function(e) {
        const t = new i(e);
        return t.validateAndClean(), 0 < t.totalChangesMade() && (o.increaseCounter("projectvalidator-found-issues"), n.warn("PROJECT_VALIDATOR_CLEANUP", t.stats)), t.stats
    }
}, function(e, t, r) {// Function 334 Actual clean project functions (separate class)
    "use strict";
    const n = r(335),
        o = r(336),
        i = r(51),
        s = r(8);
    e.exports = class {
        constructor(e) {
            this._rooms = e.getRooms(), this._checker = new o(e), this.stats = {
                invalidShortcuts: 0,
                invalidRecipeTriggers: 0,
                invalidRecipeConditions: 0,
                resetRecipeSteps: 0,
                invalidRecipeSteps: 0,
                emptyCustomRecipes: 0
            }
        }
        validateAndClean() {
            this._rooms.forEach(e => this._cleanRoom(e))
        }
        totalChangesMade() {
            return n(this.stats, (e, t) => e + t, 0)
        }
        _cleanRoom(e) {
            e.getScenarios().forEach(e => this._cleanScenarioShortcuts(e)), this._cleanRecipesWithInvalidTriggers(e), this._cleanScenarioRecipeControlSteps(e), e.getRecipes().forEach(e => {
                this._cleanRecipeSteps(e), this._cleanRecipeConditions(e)
            }), this._cleanEmptyRecipes(e)
        }
        _cleanScenarioShortcuts(e) {
            const t = e.getShortcuts(e => e.componentType !== s.COMPONENT_GAP_TYPE_NAME && this._checker.isInvalidDevice(e.deviceKey));
            t.forEach(t => e.removeShortcut(t)), this.stats.invalidShortcuts += t.length
        }
        _cleanRecipesWithInvalidTriggers(e) {
            const t = e.recipes.filter(e => {
                const t = e.trigger;
                if (!e.trigger.sensorEventKey) return !1;
                const r = t.sensorEventKey.split(":")[0];
                return this._checker.isInvalidDevice(r)
            });
            t.forEach(t => e.removeRecipe(t)), this.stats.invalidRecipeTriggers += t.length
        }
        _cleanScenarioRecipeControlSteps(e) {
            e.getScenarios().forEach(t => {
                const r = e.getRecipeForScenario(i.TYPE_LAUNCH, t);
                if (r) {
                    const e = this._findInvalidControlsStepIndex(r);
                    Number.isInteger(e) && (this.stats.resetRecipeSteps++, r.setStep(e, {
                        type: i.STEP_TYPE_CONTROLS,
                        scenarioKey: t.key,
                        scenarioName: t.name
                    }))
                }
            })
        }
        _findInvalidControlsStepIndex(e) {
            const t = e.getSteps().findIndex(e => e.type === i.STEP_TYPE_CONTROLS);
            if (-1 === t) return !1;
            const r = e.getStep(t);
            return !!this._checker.isInvalidRoomScenario(e.room.key, r.scenarioKey) && t
        }
        _cleanRecipeSteps(e) {
            e.steps = e.steps.filter(t => {
                const r = t.type === i.STEP_TYPE_ACTION && this._checker.isInvalidDevice(t.deviceKey),
                    n = t.type === i.STEP_TYPE_CONTROLS && this._checker.isInvalidRoomScenario(e.room.key, t.scenarioKey);
                return !(r || n) || (this.stats.invalidRecipeSteps++, !1)
            })
        }
        _cleanRecipeConditions(e) {
            e.conditions = e.conditions.filter(e => {
                if (!e.sensorEventKey) return !0;
                const t = e.sensorEventKey.split(":")[0];
                return !!!this._checker.isInvalidDevice(t) || (this.stats.invalidRecipeConditions++, !1)
            })
        }
        _cleanEmptyRecipes(e) {
            const t = e => e.isCustom,
                r = e.recipes.filter(t).length;
            e.deleteEmptyCustomRecipes();
            const n = e.recipes.filter(t).length;
            this.stats.emptyCustomRecipes += r - n
        }
    }
}, function(e) {// Function 335only contains exports = require("lodash/reduce")
    e.exports = require("lodash/reduce") 
}, function(e, t, r) {// Function 336 projectValidator class  projectKeyChecker
    "use strict";
    const n = r(0)("projectKeyChecker");
    e.exports = class {
        constructor(e) {
            this._rooms = e.getRooms(), this.validDeviceKeys = e.getDevices().map(e => e.key), this.validScenarioKeys = e.getScenarios().map(e => e.key)
        }
        isInvalidDevice(e) {
            return !this.validDeviceKeys.includes(e)
        }
        isInvalidScenario(e) {
            return !this.validScenarioKeys.includes(e)
        }
        isInvalidRoomScenario(e, t) {
            const r = this._rooms.find(t => t.key === e);
            return r ? !r.getScenarios().map(e => e.key).includes(t) : (n.warn("INVALID_ROOM_KEY", {
                roomKey: e,
                scenarioKey: t
            }), !0)
        }
    }
}, function(e) {// Function 337 only contains exports = require("xxhashjs")
    e.exports = require("xxhashjs")
}, function(e, t, r) {// Function 338 DeviceFactory
    "use strict";

    function n(e, t) {
        const r = [c.COMPONENT_SENSOR_TYPE_NAME, c.COMPONENT_SWITCH_TYPE_NAME, c.COMPONENT_SLIDER_TYPE_NAME, c.COMPONENT_MACRO_TYPE_NAME, c.COMPONENT_TEXTLABEL_TYPE_NAME, c.COMPONENT_IMAGEURL_TYPE_NAME, c.COMPONENT_PROCEDURE_TYPE_NAME, c.COMPONENT_DIRECTORY_TYPE_NAME, c.COMPONENT_WIDGET_TYPE_NAME],
            n = r.indexOf(e.type) - r.indexOf(t.type);
        return 0 !== n ? n : e.name.localeCompare(t.name)
    }

    function o(e, t) {
        h.parse(e, t).forEach(e => {
            e.isGeneric ? t.genericMacros.put(e.macro) : t.macros.put(e.macro)
        })
    }

    function i(e, t, r = []) {
        const o = e.getData(),
            i = o.capabilities && 0 < o.capabilities.length ? o.capabilities : r;
        try {
            i.sort(n).forEach(e => {
                l.parseDeviceComponent(e, t)
            })
        } catch (e) {
            throw s.error("COMPONENTS_FAILED_TO_PARSE", {
                components: i,
                msg: e.message
            }), new Error("failed to parse components " + e)
        }
    }
    const s = r(0)("DeviceFactory"),
        a = r(18),
        c = r(8),
        u = r(36),
        d = r(21),
        l = r(133),
        p = r(151),
        h = r(131);
    e.exports = {
        build: function(e, t, r, n) {
            if (!e) throw new Error("missing devicespec");
            const c = new p({
                name: t,
                spec: e,
                adapterDeviceId: r
            });
            return e.getSourceName() === a.SOURCE_DUIRO ? (s.debug("BUILD_DUIRO_DEVICE"), o(e, c)) : (s.debug("BUILD_ADAPTER_DEVICE"), i(e, c, n)), d.check(d.MACRO_ONOFF_MISSING, c) && (c.powerMode = u.ASSUMPTION), c.reloadPowerMode(), c.reloadCapabilities(), c
        }
    }
}, function(e, t, r) {// Function 339 sdkadapter save and load functions
    "use strict";
    const n = r(340),
        o = [];
    e.exports = {
        save: function(e) {
            return n.save(e)
        },
        load: function() {
            return n.load().catch(() => o)
        }
    }
}, function(e, t, r) {// Function 340 sdkadapter save, load & devicedelete functions
    "use strict";
    const n = r(57),
        o = "sdkadapter";
    t.load = function() {
        return n.load(o)
    }, t.save = function(e) {
        return n.save(o, e)
    }, t.deleteFile = function() {
        return n.deleteFile(o)
    }
}, function(e) {// Function 341 exports = require("url")
    e.exports = require("url")
}, function(e, t, r) {// Function 342 Backup: _uploadBackup,  _uploadFiles, synchronizeLocalAndRemoteBackup.  restoreCloudBackupId
    "use strict";
    const n = r(1),
        o = r(0)("Backup"),
        i = r(24),
        s = r(27),
        a = r(99),
        c = r(3),
        u = e.exports = function() {
            o.debug("init"), this._inProgress = !1
        };
    u.prototype._uploadBackup = function(e) {
        return a.readFile(e).then(t => i.saveBackup(e, t)).then(() => {
            c.increaseCounter("backup-uploaded-file"), o.debug("DONE_UPLOAD", {
                timeStamp: e
            })
        })
    }, u.prototype._uploadFiles = function(e, t) {
        const r = e.map(e => {
            if ((e => 0 > t.indexOf(e))(e)) return o.debug("START_UPLOAD", {
                timeStamp: e
            }), this._uploadBackup(e)
        }).filter(e => e);
        return 0 < r.length && o.info("UPLOAD_BACKUP", {
            nrOfBackupFiles: r.length
        }), n.all(r)
    }, u.prototype.synchronizeLocalAndRemoteBackup = function() {
        return 
        return this._inProgress ? (o.warn("BACKUP_SYNC_ALREADY_IN_PROGRESS"), n.reject(new Error("ALREADY_RUNNING"))) : (this._inProgress = !0, c.increaseCounter("backup-check-start"), n.all([a.listVersions(), i.listBackups()]).then(e => {
            const t = e[0];
            let r = [];
            return e[1] && (r = e[1].map(e => e.timeStamp)), this._uploadFiles(t, r)
        }).then(() => {
            this._inProgress = !1
        }).timeout(18e5).catch(e => (c.increaseCounter("backup-upload-failed"), o.error("UPLOAD_BACKUP", {
            error: e.message
        }), this._inProgress = !1, n.reject(e))))
    }, u.prototype.restoreCloudBackupId = function(e) {
        return i.getBackupById(e).then(e => {
            o.debug("BACKUP_DOWNLOAD_COMPLETE");
            const t = JSON.parse(e);
            return s.restoreFromBackup(t)
        })
    }
}, function(e, t, r) {// Function 343 ChannelService (reloadChannelFle, search and get)
    "use strict";
    const n = r(0)("ChannelService"),
        o = r(121),
        i = r(3),
        s = r(72),
        a = e.exports = function() {
            n.debug("init"), this.channels = [], this.channelIndex = null
        };
    a.prototype._init = function(e) {
        this.channels = e, this.channels.forEach((e, t) => {
        // Through this change, content of channels.json will be adapted to non-cloud  
        //"logoURL":"https://neeo-channel-icons.s3.amazonaws.com/c06e72ce-0fdd-4a6f-93fe-aa8c136139fe.png"}" becomes
        //"logoURL":"http://192.168.73.194:6468/download?type=images&name=1_Livex.png"
        // or whatever URL you specified in the variable CloudReplacementUrl   
        
            var normalizedChannel = e.name.split(' ')
            normalizedChannel = normalizedChannel.join('_')
            var logoType = e.logoURL.split("/")
            var myname = logoType[3]
            var extensionPos = myname.indexOf(".") 
            var theReturn = CloudReplacementUrl  +"?type=images&name="+normalizedChannel+myname.substring(extensionPos,99)
            e.logoURL = theReturn;

            e.id = t  // this used to be the only content of this function
        }), this.channelIndex = new o(this.channels, {
            collectionKeys: ["name"],
            threshold: .7
        }), n.debug("channel search initialized. channel count:", e.length)
    }, a.prototype.reloadChannelFile = function() {
        AllFunctions(0)("Function 343").verbose("ChannelService reloadChannelFile")
        return s.getChannelFileContent().then(e => {
            const t = JSON.parse(e);
            this._init(t)
        }).catch(e => {AllFunctions(0)("Function 343").verbose("Catch reloadchannelfile:",e);
            n.error("CHANNELS_LOAD_INDEX_FAILED", e.message)
        })
    }, a.prototype.search = function(e) {
        AllFunctions(0)("Function 343").verbose("ChannelService search ")
        if (this.channelIndex == undefined)
            {AllFunctions(0)("Function 343").verbose("Loading channels as this is not done yet")
            return this.reloadChannelFile().then( () => {return this.channelIndex.search(e).map(e => e.item)})
        }   
        else 
            { 
            if (n.debug("search", e), !this.channelIndex) throw n.error("NO_CHANNEL_INDEX"), i.increaseCounter("channel-search-failed"), new Error("NO_CHANNEL_INDEX");
            return i.increaseCounter("channel-search-succeeded"), this.channelIndex.search(e).map(e => e.item)
            }
    }, a.prototype.get = function(e) {
        const t = this.channels[e];
        return {
            name: t.name,
            id: t.id,
            language: t.language,
            logoURL: t.logoURL,
            country: t.country
        }
    }
}, function(e, t, r) {// Function 344 Obsolete - Make Brain discoverable via cloud (start and stop)
    "use strict";

    function n(e) {
        s.debug("registering Brain for discovery", e), d.increaseCounter("lookup-register-brain");
        r(0)("Function 344 Obsolete").verbose("Make Brain discoverable via cloud (start and stop)");
 /*
        return i.resolve(); 
        const t = {
            hostname: l.hostname(),
            lanip: l.getLanAddress(),
            wlanip: l.getWlanAddress(),
            uptime: a.uptime(),
            discoveryUrl: e,
            family: 6
        };
        return !t.wlanip && !t.lanip ? (s.warn("NO_VALID_IPADDRESS_FOUND", {
            lanip: t.lanip,
            wlanip: t.wlanip,
            uptime: t.uptime
        }), i.resolve()) : function e(t, r) {
            return c({
                method: "POST",
                uri: t.discoveryUrl,
                timeout: o.networkTimeoutMs,
                family: t.family,
                body: {
                    hostname: t.hostname,
                    lanip: t.lanip,
                    wlanip: t.wlanip,
                    uptime: t.uptime
                },
                json: !0
            }).catch(n => {
                const o = u.extractInfo(n, p);
                return o.message.includes("ENETUNREACH") && r ? (t.family = 4, e(t, !1)) : (Object.assign(o, {
                    lanip: t.lanip,
                    wlanip: t.wlanip,
                    uptime: t.uptime
                }), void s.error("DISCOVERY_REGISTRATION_FAILED", o))
            })
        }(t, !0)*/
    }
    const o = r(2).discovery,
        i = r(1),
        s = r(0)("Discovery"),
        a = r(345),
        c = r(17),
        u = r(32),
        d = r(3),
        l = r(12),
        p = 512;
    let h;
    e.exports.stopRegistration = function() {
        clearInterval(h), h = null
    }, e.exports.startRegistration = function(e) {
        return h ? (s.debug("Brain registration already running."), i.reject(new Error("ALREADY_RUNNING"))) : (h = setInterval(() => n(e), o.checkIntervalMs), n(e))
    }
}, function(e) {// Function 345 only contains exports = require("process")
    e.exports = require("process")
}, function(e, t, r) {// Function 346 Homekit datapusher
    "use strict";
    const n = r(0)("Homekit datapusher"),
        o = r(1),
        i = r(41),
        s = r(17),
        a = r(2).homekit,
        c = r(32);
    let u, d;
    e.exports.sendData = function(e) {
        return function(e) {
            const t = i.createHash("md5").update(JSON.stringify(e)).digest("hex");
            return n.debug("data", {
                hash: t,
                lastDataChecksum: u
            }), t !== u && (u = t, !0)
        }(e) ? (n.debug("send data to homekit service", a.dataUrl), s({
            method: "POST",
            json: !0,
            uri: a.dataUrl,
            body: e,
            timeout: a.timeoutMs
        }).catch(e => {
            const t = c.extractInfo(e);
            n.error("HOMEKIT_SEND_DATA", {
                error: t.message
            })
        })) : (n.debug("do not send data to homekit service"), o.resolve(!1))
    }, e.exports.resetPairing = function() {
        return n.debug("reset pairing", a.resetPairingUrl), s({
            method: "POST",
            json: !0,
            uri: a.resetPairingUrl,
            timeout: a.timeoutMs
        }).catch(e => {
            const t = c.extractInfo(e);
            n.error("HOMEKIT_SEND_POWERSTATE", {
                error: t.message
            })
        })
    }, e.exports.sendPowerState = function(e) {
        return function(e) {
            const t = i.createHash("md5").update(JSON.stringify(e)).digest("hex");
            return n.debug("powerState", {
                hash: t,
                lastPowerStateChecksum: d
            }), t !== d && (d = t, !0)
        }(e) ? (n.debug("send powerstate to homekit service", a.powerstateUrl), s({
            method: "POST",
            json: !0,
            uri: a.powerstateUrl,
            body: e,
            timeout: a.timeoutMs
        }).catch(e => {
            const t = c.extractInfo(e);
            n.error("HOMEKIT_SEND_POWERSTATE", {
                error: t.message
            })
        })) : (n.debug("do not send powerstate to homekit service"), o.resolve(!1))
    }, e.exports.clearCache = function() {
        u = null, d = null
    }
}, function(e, t, r) {// Function 347 AVAHI-interface
    "use strict";
    const n = r(26),
        o = r(1),
        i = r(0)("Avahi"),
        s = r(12),
        a = r(34).execFile,
        c = "Welcome to NEEO",
        u = o.promisify(n.writeFile),
        d = e.exports = function(e) {
            i.debug("init", e), this.configPath = e.configPath, this.cp6Port = e.port, this.restartcmd = e.restartcmd, this.restartparam = e.restartparam.split(" ")
        };
    d.prototype.notificationProjectReload = function(e) {
        let t = c;
        AllFunctions(0)("Function 347").verbose("Project (re)load");
        e.projectLabel && e.projectLabel !== c ? t = e.projectLabel : e.controllerRoom && (t = `NEEO ${e.controllerRoom.name}`), this.writeConfig(t).catch(e => {
            i.error("WRITE_AVAHI_CFG", e.message)
        })
    }, d.prototype.__generateXmlSettings = function(e, t, r, n) {
        const o = (new Date).toLocaleDateString();
        return '<?xml version="1.0" standalone="no"?><!DOCTYPE service-group SYSTEM "avahi-service.dtd"><service-group><name>' + e + "</name><service><type>_neeo._tcp</type><port>" + this.cp6Port + "</port><txt-record>upd=" + o + "</txt-record><txt-record>rel=" + t + "</txt-record><txt-record>reg=" + r + "</txt-record><txt-record>hon=" + n + "</txt-record></service></service-group>"
    }, d.prototype.writeConfig = function(e) {
        AllFunctions(0)("Function 347").verbose("check need for writeConfig")
        const t = s.firmwareVersion(),
            r = s.getRegionCode();
        if (this._region === r && this._firmwareVersion === t && this._projectLabel === e) return i.debug("omit avahi update, nothing changed"), o.resolve();
        this._region = r, this._firmwareVersion = t, this._projectLabel = e, i.debug("update avahi file, project label", e);
        const n = this.__generateXmlSettings(e, t, r, s.hostname());
        AllFunctions(0)("Function 347").verbose("writeConfig",n)
        AllFunctions(0)("Function 347").verbose("writeConfig",{cmd:this.restartcmd,param:this.restartparam})
        return u(this.configPath, n).then(() =>  (i.debug("restart avahi daemon now"), a(this.restartcmd, this.restartparam)))
    }, d.prototype.reloadAvahi = function() {
        return i.debug("restart avahi daemon now"), a(this.restartcmd, this.restartparam)
    }
}, function(e, t, r) {// Function 348 Wifi-handler
    "use strict";
    const n = r(1),
        o = r(0)("Wifi"),
        i = r(34).execFile,
        s = r(349),
        a = r(350),
        c = r(351),
        u = n.promisify(c.scan, {
            context: c
        }),
        d = n.promisify(c.scanResults, {
            context: c
        }),
        l = e.exports = function(e, t) {
            o.debug("init", e), this._connectScriptPath = e.connectScriptPath, this.timeoutWifiScan = e.timeoutWifiScan || 1e4, this.timeoutWifiConnect = e.timeoutWifiConnect || 12e3, this.credentials = {}, this.wifiInterfaceName = t
        };
    l.prototype.scanWifi = function() {
        return u(this.wifiInterfaceName).then(() => d(this.wifiInterfaceName)).catch(e => (o.error("WIFI_SCAN_FAILED", e.message), []))
    }, l.prototype.loadCredentials = function() {
        return s.load().then(e => {
            this.credentials = e
        }).catch(e => {
            o.debug("LOAD_CREDENTIALS_FAILED", {
                msg: e.message
            })
        })
    }, l.prototype.saveCredentials = function(e) {
        return o.debug("save wifi credentials", e.ssid), this.credentials = e, s.save(e)
    }, l.prototype.removeCredentials = function() {
        return o.debug("remove wifi credentials"), this.credentials = {}, s.deleteFile()
    }, l.prototype.scan = function() {
        return o.debug("wifi scan"), this.scanWifi().then(e => a.filterWifiResult(e, this.credentials.ssid))
    }, l.prototype.scanRaw = function() {
        return o.debug("wifi scan"), this.scanWifi()
    };
    const p = /^[\x20-\x7e]*$/;
    l.prototype._isPskValid = function(e) {
        return !(!e || e.length < 8 || e.length > 63 || !p.test(e))
    }, l.prototype.connect = function(e, t, r, s) {
        return "OPEN" === r || this._isPskValid(t) ? a.isSSIDValid(e) ? i(this._connectScriptPath, [e, r, t, s], this.timeoutWifiConnect).then(() => (o.info("WIFI_CONNECT_SUCCESSFUL"), this.saveCredentials({
            ssid: e,
            password: t,
            encryption: r
        }))) : n.reject(new Error("INVALID_SSID")) : n.reject(new Error("INVALID_PSK_PASSWORD"))
    }, l.prototype.getSsid = function() {
        return this.credentials.ssid
    }, l.prototype.getPassword = function() {
        return this.credentials.password
    }, l.prototype.getEncryption = function() {
        return this.credentials.encryption
    }
}, function(e, t, r) {// Function 349 wifi file-functions (load, save&deletefile)
    "use strict";
    const n = r(57),
        o = "wifi";
    t.load = function() {
        return n.load(o)
    }, t.save = function(e) {
        return n.save(o, e)
    }, t.deleteFile = function() {
        return n.deleteFile(o)
    }
}, function(e, t, r) {// Function 350 wifi filterWifiResult
    "use strict";

    function n(e) {
        return l.test(e) ? c : p.test(e) ? u : d.test(e) ? void 0 : a
    }

    function o(e) {
        if (!e) return !1;
        const t = Buffer.from(e, "utf8").toString("ascii").length;
        return !(t < g || t > m || f.test(e))
    }
    const i = r(88),
        s = r(12),
        a = "OPEN",
        c = "PSK 128 bit WEP",
        u = "PSK WPA/WPA2",
        d = /CCMP|TKIP|PSK/,
        l = /\[WEP\]/,
        p = /\[WPA/,
        h = /EAP/,
        g = 1,
        m = 32,
        f = /[\x00-\x1f]|(\\x00)/;
    e.exports.filterWifiResult = function(e, t) {
        const r = !!s.getWlanAddress(),
            a = e.filter(e => {
                const t = function(e) {
                    return !h.test(e)
                }(e.flags);
                return e && o(e.ssid) && t
            }).map(e => {
                const o = n(e.flags),
                    i = e.ssid === t && r;
                return {
                    ssid: e.ssid,
                    encryption: o,
                    unsupported: o === c,
                    connected: i,
                    signalLevel: e.signalLevel,
                    debug: e.flags
                }
            }).filter(e => e && e.encryption && e.ssid);
        return i(a, e => e.ssid + e.encryption)
    }, e.exports.isSSIDValid = o
}, function(e, t, r) {// Function 351 wifi scan
    "use strict";

    function n(e) {
        return {
            result: e.match(/^([^\s]+)/)[1]
        }
    }

    function o(e) {
        let t;
        const r = [];
        return e.split("\n").map(function(e) {
            return e + "\n"
        }).forEach(function(e) {
            const n = {};
            (t = e.match(/([A-Fa-f0-9:]{17})\t/)) && (n.bssid = t[1].toLowerCase()), (t = e.match(/\t([\d]+)\t+/)) && (n.frequency = parseInt(t[1], 10)), (t = e.match(/([-][0-9]+)\t/)) && (n.signalLevel = parseInt(t[1], 10)), (t = e.match(/\t(\[.+\])\t?/)) && (n.flags = t[1]), (t = e.match(/\t([^\t]{1,128}(?=\n))/)) && (n.ssid = function(e) {
                const t = i(e);
                return Buffer.from(t, "ascii").toString("utf8")
            }(t[1])), 0 === Object.keys(n).length && n.constructor === Object || r.push(n)
        }), r
    }
    const i = r(352),
        s = r(138),
        a = e.exports = {
            exec: s.exec,
            scan: function(e, t) {
                const r = ["wpa_cli -i", e, "scan"].join(" ");
                return a.exec(r, function(e) {
                    return function(t, r) {
                        if (t) e(t);
                        else {
                            const o = n(r.trim());
                            "FAIL" === o.result ? e(new Error(o.result)) : e(t, n(r.trim()))
                        }
                    }
                }(t))
            },
            scanResults: function(e, t) {
                const r = ["wpa_cli -i", e, "scan_results"].join(" ");
                return a.exec(r, function(e) {
                    return function(t, r) {
                        t ? e(t) : e(t, o(r))
                    }
                }(t))
            }
        }
}, function(e) {// Function 352 exports = require("unescape-js")
    e.exports = require("unescape-js")
}, function(e, t, r) {// Function 353 BrainStats
    "use strict";

    function n(e) {
        return e.reduce((e, t) => (e[t.name] = {
            restartTime: t.pm2_env.restart_time,
            uptimeMs: Date.now() - t.pm2_env.pm_uptime,
            memory: t.monit.memory,
            cpu: t.monit.cpu
        }, e), {})
    }

    function o() {
        return Promise.resolve()  // pm2 stats is probably only supported on older pm2; I really don't see the need for this, so removed.
        return s(l, p).then(JSON.parse).then(n).then(e => {
            c.info("PM2_STATS", e)
        }).catch(e => {
            c.error("PM2_DUMP_FAILED", {
                msg: e.message
            })
        })
    }

    function i() {
        return a().then(e => {
            const t = e.filter(e => -1 !== h.indexOf(e.mountpoint));
            c.info("DISK_STATS", function(e) {
                return e.reduce((e, t) => (e[t.mountpoint] = {
                    filesystem: t.filesystem,
                    size: t.size,
                    used: t.used,
                    available: t.available,
                    capacity: t.capacity
                }, e), {})
            }(t))
        }).catch(e => {
            c.error("DISK_STATS_FAILED", {
                msg: e.message
            })
        })
    }
    const s = r(34).execFile,
        a = r(354),
        c = r(0)("BrainStats"),
        u = r(2).systeminfo,
        d = r(1),
        l = "pm2",
        p = ["jlist"],
        h = ["/", "/tmp", "/boot", "/update", "/steady", "/var"];
    let g, m;
    e.exports.startBrainStats = function(e) {
        return g || m ? void c.debug("BRAIN_STATS_RUNNING_ALREADY") : (g = setInterval(o, u.pm2LogIntervalMS), m = setInterval(i, u.diskLogIntervalMS), e ? d.all([o(), i()]) : void 0)
    }, e.exports.stopBrainStats = function() {
        clearInterval(g), clearInterval(m), g = !1, m = !1
    }
}, function(e) {// Function 354 exports = require("@sindresorhus/df")
    e.exports = require("@sindresorhus/df")
}, function(e, t, r) {// Function 355 RadioAccessPoint (Enable/Disable NEEO Access Point using r(34)execfile)
    "use strict";
    const n = r(1),
        o = r(0)("RadioAccessPoint"),
        i = r(3),
        s = r(31),
        a = r(34).execFile,
        c = e.exports = function(e) {
            o.debug("init", e), this.timerId = void 0, this.wifiAPModeActive = !1, this.systemctl = e.systemctl, this.parameterStart = e.parameterStart, this.parameterStop = e.parameterStop, this.disableAccessPointModeAfterMs = e.disableAccessPointModeAfterMs
        };
    c.prototype.shortpressHandler = function() {
        AllFunctions(0)("Function 354").verbose("shortpressHandler") // $$$
        return o.debug("touchbutton pressed, enable jn discovery mode"), i.increaseCounter("touchbutton-pressed"), o.event("NEEO Pairing mode enabled"), s.enableDiscoveryMode()
    }, c.prototype.disableAccesspointMode = function() {
        AllFunctions(0)("Function 354").verbose("disableAccesspointMode") // $$$
        return a(this.systemctl, this.parameterStop).then(() => (this.wifiAPModeActive = !1, o.event("NEEO Access Point disabled"), s._ledOn())).catch(e => {
            o.error("AP_MODE_DISABLE", {
                msg: e.message
            })
        })
    }, c.prototype._enableAccesspointMode = function() {
        AllFunctions(0)("Function 355").verbose("_enableAccesspointMode",this.parameterStart) // $$$
        return a(this.systemctl, this.parameterStart).then(() => (this.wifiAPModeActive = !0, this.timerId = setTimeout(() => {
            o.debug("disable AP mode timer activated"), this.disableAccesspointMode()
        }, this.disableAccessPointModeAfterMs), o.event("NEEO Access Point enabled"), s.ledWifiAPMode())).catch(e => {
            o.error("AP_MODE_ENABLE", {
                msg: e.message
            })
        })
    }, c.prototype.longpressHandler = function() { // This functionality is not necessary anymore
        AllFunctions(0)("Function 354").verbose("longpressHandler") // $$$
        return o.debug("long touchbutton pressed, toggle wifi ap mode"), i.increaseCounter("long-touchbutton-pressed"), clearTimeout(this.timerId), this.wifiAPModeActive ? this.disableAccesspointMode() : this._enableAccesspointMode()
    }, c.prototype.userBlink = function() {
        return this.wifiAPModeActive ? n.resolve() : s.ledIdentBrain()
    }
}, function(e, t, r) {// Function 356 FST... Final systemtest
    "use strict";
    const n = r(26),
        o = r(1),
        i = r(0)("FST"),
        s = r(2).finalsystemtest,
        a = r(34),
        c = o.promisify(n.readFile),
        u = o.promisify(n.writeFile),
        d = o.promisify(n.stat),
        l = "utf8";
    e.exports.readBltProductionFile = function() {
        return c(s.productionBLTStationData, l).then(e => JSON.parse(e)).catch(e => (i.debug("BLT_PRODUCTION_FILE_NOT_PARSEABLE", e.message), {
            error: e.message
        }))
    }, e.exports.readFstProductionFile = function() {
        return c(s.productionFSTStationData, l).then(e => JSON.parse(e)).catch(e => (i.debug("FST_PRODUCTION_FILE_NOT_PARSEABLE", e.message), {
            error: e.message
        }))
    }, e.exports.writeFstProductionFile = function(e) {
        return function(e) {
            return d(e).then(e => e.isFile()).catch(() => !1)
        }(s.productionFSTStationData).then(t => {
            if (t) return void i.debug("do no overwrite data", s.productionFSTStationData);
            const r = JSON.stringify(e);
            return i.debug("write fst file", r), u(s.productionFSTStationData, r)
        }).catch(e => {
            i.debug("WRITE_FST_FAILED", e.message)
        })
    }, e.exports.readSomFlashStationFile = function() {
        return c(s.productionSOMFlashStationData, l).catch(e => (i.debug("SOM_FLASHER_PRODUCTION_FILE_NOT_PARSEABLE", e.message), {
            error: e.message
        }))
    }, e.exports.getSomEepromContent = function() {
        return a.execFile(s.productionSOMEepromScript).catch(e => (i.debug("SOM_EEPROM_READ_FAILED", e.message), {
            error: e.message
        }))
    }, e.exports.resetWpaSupplicantFile = function() {
        return a.execFile(s.productionWifiResetScript).catch(e => (i.debug("SOM_EEPROM_READ_FAILED", e.message), {
            error: e.message
        }))
    }
}, function(e, t, r) {// Function 357 Actions for Pro-license
    "use strict";
    const n = r(0)("pro"),
        o = r(12),
        i = r(358),
        s = r(359);
    e.exports = {
        startTasks: function() {
            return o.isProLicensed() ? (s.startTask(), i.startTask(), void n.debug("PRO_TASKS_STARTED")) : void n.debug("NOT_PRO_TASKS_START_SKIPPED")
        }
    }
}, function(e, t, r) {// Function 358 BackupRestore for Pro-license
    "use strict";

    function n() {
        a.debug("RUNNING_RESTORE_BACKUP_JOB"), i.getBackupRestoreId().then(e => e ? (a.info("RESTORE_CHECK_BACKUP_AVAILABLE", {
            backupId: e
        }), function(e) {
            return s.restoreCloudBackupId(e).then(() => i.setBackupRestoreComplete(e))
        }(e)) : void a.debug("RESTORE_CHECK_NO_BACKUP_AVAILABLE")).catch(e => {
            a.error("RESTORE_BACKUP_FAILED", e.message)
        })
    }
    const o = r(2).pro,
        i = r(24),
        s = r(157),
        a = r(0)("proBackupRestore");
    let c;
    e.exports = {
        startTask: function() {
            return c ? void a.debug("RESTORE_BACKUP_JOB_ALREADY_STARTED") : (a.debug("RESTORE_BACKUP_JOB_STARTING"), void(c = setInterval(n, o.restoreBackupCheckIntervalMs)))
        },
        stopTask: function() {
            a.debug("RESTORE_BACKUP_JOB_STOPPING"), clearInterval(c), c = void 0
        }
    }
}, function(e, t, r) {// Function 359 brainInformationUpdater: for Pro-license, send regular info
    "use strict";
    const n = r(24),
        o = r(2).pro,
        i = r(3),
        s = r(12),
        a = r(0)("brainInformationUpdater"),
        c = ["Invalid username/password.", "no stored account data found"];
    let u;
    e.exports = {
        startTask: function() {
            if (!s.isProLicensed()) return void a.debug("NOT_PRO_DISABLE_SENDINFOS");
            const e = o.brainInformationUpdateIntervalMs;
            u = setInterval(() => (function() {
                const e = Object.assign({}, s.summary(), i.getStatistic());
                n.updateBrainInformation(e).catch(e => {
                    c.includes(e.message) || a.error("UPDATE_BRAIN_STATS", e.message)
                })
            })(), e), a.debug("PRO_SENDINFOS_ENABLED")
        },
        stopTask: function() {
            u && (clearInterval(u), u = void 0)
        }
    }
}, function(e, t, r) {// Function 360 main migration handler
    "use strict";
    const n = r(139),
        o = r(0)("migration"),
        i = r(361),
        s = r(362),
        a = r(363),
        c = r(364),
        u = r(365),
        d = r(366),
        l = r(367),
        p = r(368),
        h = r(369),
        g = r(370),
        m = r(25),
        f = "1.0.0",
        E = m.PROJECT_VERSION;
    e.exports = {
        migrate: function(e) {
            if (!e) return void o.debug("MISSING_PARAMETER");
            const t = function(e) {
                    const t = e.version,
                        r = n.valid(t);
                    return r || ("1.0" !== t && o.error("INVALID_PROJECT_VERSION", t), f)
                }(e),
                r = function(e) {
                    return n.lt(e, E)
                }(t);
            if (!1 === r) return o.debug("NO_MIGRATION_NEEDED"), r;
            o.debug("MIGRATION_NEEDED", {
                from: t,
                to: E
            });
            try {
                let r = e;
                switch (t) {
                    case "1.0.0":
                        r = i.run(r);
                    case "1.0.1":
                        r = s.run(r);
                    case "1.0.2":
                        r = a.run(r);
                    case "1.0.3":
                        r = c.run(r);
                    case "1.0.4":
                        r = u.run(r);
                    case "1.0.5":
                        r = d.run(r);
                    case "1.0.6":
                        r = l.run(r);
                    case "1.0.7":
                        r = p.run(r);
                    case "1.0.8":
                        r = h.run(r);
                    case "1.0.9":
                        r = g.run(r)
                }
                return r.version = E, o.info("MIGRATION_SUCCESSFUL"), r
            } catch (t) {
                return o.error("MIGRATION_FAILED", t.message), e.version = E, e
            }
        }
    }
}, function(e, t, r) {// Function 361 migration-1.0.0-to-1.0.1
    "use strict";

    function n(e) {
        try {
            const t = function(e) {
                const t = d.build({
                    name: p,
                    payload: {
                        path: "/sonos/mute",
                        method: "GET"
                    }
                });
                return new u({
                    name: p,
                    command: t,
                    device: e
                })
            }(e);
            e.macros.put(t)
        } catch (e) {
            l.error("MIGRATION_FAILED_MUTE_TOGGLE_MACRO", e.message)
        }
    }

    function o(e) {
        try {
            const t = function(e) {
                const t = d.build({
                    name: h,
                    payload: {
                        path: "/sonos/playshuffle",
                        method: "GET"
                    }
                });
                return new c({
                    name: h,
                    value: t,
                    device: e
                })
            }(e);
            e.sliders.put(t)
        } catch (e) {
            l.error("MIGRATION_FAILED_PLAYSHUFFLE_SLIDER", e.message)
        }
    }

    function i(e) {
        if (!e || !e.details) return !1;
        const t = e.details;
        return "sonos" === t.adapterName && t.sourceName === s.SOURCE_ADAPTER && t.type === a.TYPE_SONOS
    }
    const s = r(18),
        a = r(19),
        c = r(61),
        u = r(49),
        d = r(23),
        l = r(0)("migration-1.0.0-to-1.0.1"),
        p = "MUTE TOGGLE",
        h = "PLAYSHUFFLE";
    e.exports = {
        run: function(e) {
            return l.debug("run migration"), e.getDevices(i).forEach(e => {
                n(e), o(e)
            }), e
        }
    }
}, function(e, t, r) {// Function 362 migration-1.0.1-to-1.0.2
    "use strict";

    function n(e) {
        try {
            const t = function(e) {
                const t = new c({
                    name: "sensor",
                    payload: {
                        path: "/sonos/playing",
                        method: "GET"
                    }
                });
                return a.build({
                    name: "POWERSTATE",
                    label: "Powerstate",
                    type: "power",
                    command: t
                }, e)
            }(e);
            e.sensors.put(t)
        } catch (e) {
            u.error("MIGRATION_FAILED_POWER_STATE_SENSOR", e.message)
        }
    }

    function o(e) {
        if (!e || !e.details) return !1;
        const t = e.details;
        return "sonos" === t.adapterName && t.sourceName === i.SOURCE_ADAPTER && t.type === s.TYPE_SONOS
    }
    const i = r(18),
        s = r(19),
        a = r(62),
        c = r(23),
        u = r(0)("migration-1.0.1-to-1.0.2");
    e.exports = {
        run: function(e) {
            return u.debug("run migration"), e.getDevices(o).forEach(e => {
                n(e)
            }), e
        }
    }
}, function(e, t, r) {// Function 363 migration-1.0.2-to-1.0.3
    "use strict";

    function n(e) {
        try {
            const t = function(e) {
                return a.build({
                    name: "ADD_TO_INSTANT_FAVORITES_PROCEDURE",
                    label: "Add Item To Instant Favorites",
                    path: "/sonos/addToInstantFavorites",
                    adapterName: "device"
                }, e)
            }(e);
            e.procedures.put(t)
        } catch (e) {
            c.error("MIGRATION_FAILED_INSTANT_FAVORITE_PROCEDURE", e.message)
        }
    }

    function o(e) {
        if (!e || !e.details) return !1;
        const t = e.details;
        return "sonos" === t.adapterName && t.sourceName === i.SOURCE_ADAPTER && t.type === s.TYPE_SONOS
    }
    const i = r(18),
        s = r(19),
        a = r(97),
        c = r(0)("migration-1.0.2-to-1.0.3");
    e.exports = {
        run: function(e) {
            return c.debug("run migration"), e.getDevices(o).forEach(e => {
                n(e)
            }), e
        }
    }
}, function(e, t, r) {// Function 364 migration-1.0.3-to-1.0.4
    "use strict";

    function n(e) {
        if (!e || !e.details) return !1;
        const t = a.check(a.MACRO_ONOFF_MISSING, e),
            r = void 0 !== e.getMacroByName(i.MACRO_POWER_TOGGLE),
            n = !e.getMacroByName(i.MACRO_POWER_TOGGLE_ON) && !e.getMacroByName(i.MACRO_POWER_TOGGLE_OFF);
        return t && r && n
    }
    const o = r(0)("migration-1.0.3-to-1.0.4"),
        i = r(33),
        s = r(49),
        a = r(21);
    e.exports = {
        run: function(e) {
            return o.debug("run migration"), e.getDevices(n).forEach(e => {
                try {
                    ! function(e) {
                        const t = e.getMacroByName(i.MACRO_POWER_TOGGLE);
                        [i.MACRO_POWER_TOGGLE_ON, i.MACRO_POWER_TOGGLE_OFF].forEach(r => {
                            const n = new s({
                                device: e,
                                name: r,
                                command: t.getCommand()
                            });
                            e.macros.put(n)
                        })
                    }(e)
                } catch (t) {
                    o.error("MIGRATION_FAILED_ADD_VIRTUAL_POWER_ONOFF", {
                        message: t.message,
                        device: {
                            name: e.details.name,
                            type: e.details.type,
                            manufacturer: e.details.manufacturer
                        }
                    })
                }
            }), e
        }
    }
}, function(e, t, r) {// Function 365 migration-1.0.4-to-1.0.5
    "use strict";

    function n(e) {
        return !(e && e.icon)
    }
    const o = r(0)("migration-1.0.4-to-1.0.5"),
        i = "neeo.icon.room.default",
        s = [{
            key: "neeo.icon.room.living-room",
            pattern: /living/i
        }, {
            key: "neeo.icon.room.kids-bedroom",
            pattern: /(kid|child)/i
        }, {
            key: "neeo.icon.room.bedroom",
            pattern: /bed/i
        }, {
            key: "neeo.icon.room.kitchen",
            pattern: /kitchen/i
        }, {
            key: "neeo.icon.room.office",
            pattern: /(office|study|great)/i
        }, {
            key: "neeo.icon.room.basement",
            pattern: /basement/i
        }, {
            key: "neeo.icon.room.garden",
            pattern: /(garden|yard|veranda)/i
        }, {
            key: "neeo.icon.room.garage",
            pattern: /garage/i
        }, {
            key: "neeo.icon.room.cinema",
            pattern: /(cinema|theat(er|re))/i
        }, {
            key: "neeo.icon.room.library",
            pattern: /library/i
        }, {
            key: "neeo.icon.room.family-room",
            pattern: /family/i
        }, {
            key: "neeo.icon.room.bonus-room",
            pattern: /bonus/i
        }, {
            key: "neeo.icon.room.bathroom",
            pattern: /bath/i
        }];
    e.exports = {
        run: function(e) {
            return o.debug("run migration"), e.getRooms(n).forEach(e => {
                e.icon = function(e) {
                    const t = s.find(t => t.pattern.test(e.name));
                    return t ? t.key : i
                }(e)
            }), e
        }
    }
}, function(e, t, r) {// Function 366 migration-1.0.5-to-1.0.6
    "use strict";
    const n = r(0)("migration-1.0.5-to-1.0.6");
    e.exports = {
        run: function(e) {
            return n.debug("run migration"), e.getDevices().filter(e => e.hasOwnProperty("favorites")).forEach(e => e.favorites.map(e => e.channel.logoUrl = function(e) {
                return o.forEach(t => {
                    e.startsWith(t) && (e = e.replace(t, i))
                }), e
            }(e.channel.logoUrl))), e
        }
    };
    const o = ["https://neeo-channel-icon.s3.amazonaws.com/", "https://channel-icons.s3.amazonaws.com/"],
        i = "https://neeo-channel-icons.s3.amazonaws.com/"
}, function(e, t, r) {// Function 367 migration-1.0.6-to-1.0.7
    "use strict";
    const n = r(0)("migration-1.0.6-to-1.0.7");
    e.exports = {
        run: function(e) {
            return n.debug("run migration"), e.getSensors().map(e => {
                ("undefined" === e.unit || void 0 === e.unit) && (e.unit = "")
            }), e
        }
    }
}, function(e, t, r) {// Function 368 migration-1.0.7-to-1.0.8
    "use strict";

    function n(e) {
        const t = new c({
            name: "sensor",
            payload: {
                path: "/hue/saturation",
                method: "GET"
            }
        });
        return u.build({
            name: "SATURATION_SENSOR",
            label: "Intensity",
            type: "range",
            range: [0, 255],
            command: t
        }, e)
    }

    function o(e) {
        const t = new c({
            name: "sensor",
            payload: {
                path: "/hue/color",
                method: "GET"
            }
        });
        return u.build({
            name: "HUE_SENSOR",
            label: "Hue",
            type: "range",
            range: [0, 65535],
            command: t
        }, e)
    }

    function i(e, t) {
        const r = new c({
            name: "sensor",
            payload: {
                path: "/hue/saturation",
                method: "GET"
            }
        });
        return d.build({
            name: "saturation",
            label: "Intensity",
            range: [0, 255],
            unit: "%",
            sensor: t,
            value: r
        }, e)
    }

    function s(e, t) {
        const r = new c({
            name: "sensor",
            payload: {
                path: "/hue/color",
                method: "GET"
            }
        });
        return d.build({
            name: "hue",
            label: "Hue",
            range: [0, 65535],
            unit: "%",
            sensor: t,
            value: r
        }, e)
    }
    const a = r(0)("migration-1.0.7-to-1.0.8"),
        c = r(23),
        u = r(62),
        d = r(61);
    e.exports = {
        run: function(e) {
            return a.debug("run migration"), e.getDevices().filter(e => "LIGHT" === e.details.type.toUpperCase() && "HUE" === e.details.adapterName.toUpperCase()).forEach(e => {
                const t = n(e),
                    r = o(e);
                e.sensors.put(t), e.sensors.put(r);
                const a = i(e, t),
                    c = s(e, r);
                e.sliders.put(a), e.sliders.put(c)
            }), e
        }
    }
}, function(e, t, r) {// Function 369 migration-1.0.8-to-1.0.9
    "use strict";
    const n = r(0)("migration-1.0.8-to-1.0.9");
    e.exports = {
        run: function(e) {
            n.debug("run migration");
            const t = e.getControllerRoom(),
                r = t ? `NEEO ${t.getName()}` : "Welcome to NEEO";
            return e.setLabel(r), e
        }
    }
}, function(e, t, r) {// Function 370 migration-1.0.9-to-1.0.10
    "use strict";
    const n = r(0)("migration-1.0.9-to-1.0.10"),
        o = r(23),
        i = r(62),
        s = r(61);
    e.exports = {
        run: function(e) {
            return n.debug("run migration"), e.getDevices().filter(e => "LIGHT" === e.details.type.toUpperCase() && "HUE" === e.details.adapterName.toUpperCase()).forEach(e => {
                const t = function(e) {
                    const t = new o({
                        name: "sensor",
                        payload: {
                            path: "/hue/color-temperature",
                            method: "GET"
                        }
                    });
                    return i.build({
                        name: "COLOR_TEMPERATURE_SENSOR",
                        label: "Color temperature",
                        type: "range",
                        range: [2e3, 6500],
                        unit: "K",
                        command: t
                    }, e)
                }(e);
                e.sensors.put(t);
                const r = function(e, t) {
                    const r = new o({
                        name: "sensor",
                        payload: {
                            path: "/hue/color-temperature",
                            method: "GET"
                        }
                    });
                    return s.build({
                        name: "colortemperature",
                        label: "Color temperature",
                        range: [2e3, 6500],
                        unit: "K",
                        sensor: t,
                        value: r
                    }, e)
                }(e, t);
                e.sliders.put(r)
            }), e
        }
    }
}, function(e, t, r) {// Function 371 Main Downloader for images, checking if cached already
    "use strict";
    const n = r(40),
        o = r(17),
        i = r(1),
        s = r(0)("Resourceprefetcher"),
        a = r(32),
        c = r(160),
        u = r(372),
        d = r(3),
        l = r(12),
        p = new n.Agent({
            keepAlive: !0,
            keepAliveMsecs: 8e3
        }),
        h = e.exports = function(e) {
            s.debug("init", e), this.favoriteImage = e.favoriteImage, this.promiseQueue = i.resolve(), this.FAVORITE_IMAGE_OPTIONS = {
                width: this.favoriteImage.width,
                height: this.favoriteImage.height
            }
        };
    h.prototype._downloadImages = function(url, width, height, compressiontype) {
        //AllFunctions(0)("Function 371").verbose("Downloading image,url,width,height,compressiontype",url,width,height,compressiontype)
        if (!url) return void s.debug("invalid url, ignored");
        const i = l.getBaseUrl(); 
        d.increaseCounter("image-prefetch-started"), this.promiseQueue = this.promiseQueue.then(() => {
            const a = i + c.getUrlPath(url), 
                u = function(url, width, height, compressiontype = "") {
                    try {        
                    return c.getUrlPath(url, {
                            resize: !0,
                            width: width,
                            height: height,
                            imageFormat: compressiontype})
                    } catch (url) {
                        s.warn("IMG_GET_RESIZED_URL", {
                            msg: url.message,
                            imageFormat: compressiontype
                        })
                    }
                }(url, width, height, compressiontype),
                d = u ? i + u : a;
            return s.debug("fetch image, url", d),  o({
                url: d,
                agent: p,
                encoding: null,
                timeout: 4e3
            })
        }).catch(url => {
            const width = a.extractInfo(url);
            s.debug("failed to prefetch image", width.message), d.increaseCounter("image-prefetch-error")
        })
    }, h.prototype._fetchFavoritesImages = function(e) {
        AllFunctions(0)("Function 371").verbose("getchfavoritesimages")
        e.getAllFavorites().forEach(e => {
            const t = e.getLogoURL(); /// 
            return u.isUrlCached(t, this.FAVORITE_IMAGE_OPTIONS) ? void s.debug("_fetchFavoritesImages: already cached url", t) : (u.addUrlToCache(t, this.FAVORITE_IMAGE_OPTIONS), void this._downloadImages(t, this.favoriteImage.width, this.favoriteImage.height))
        })
    }, h.prototype._precacheFavoritesImages = function(e) {
        return e.then(e => (s.debug("fetch favorites images"), this._fetchFavoritesImages(e))).catch(e => {
            s.error("PRECACHE_FAVORITE_IMAGE", {
                error: e.message
            })
        })
    }, h.prototype.prefetchImage = function(e, t) {
        return e && t && t.width && t.height ? u.isUrlCached(e, t) ? void s.debug("already cached url", e) : (u.addUrlToCache(e, t), void this._downloadImages(e, t.width, t.height, t.imageFormat)) : void s.debug("invalid parameters", {
            url: e
        })
    }, h.prototype.flushImageCache = function() {
        AllFunctions(0)("Function 371").verbose("flushImagecash... only calling clear")
        return u.clear()
    }
}, function(url, t, r) { // Function 372 Main imagecache (lookup) handler
    "use strict";

    function createCacheName(url, imageOptions) {
        return url + imageOptions.width + imageOptions.height
    }
    const o = r(6)("cp6:lib:resourceprefetcher:imagecache"),
        i = 32,
        imageCache = [];
    let CachePtr = 0;
    url.exports = {
        addUrlToCache: function(url, imageOptions) {
            return url && imageOptions ? (imageCache[CachePtr] = createCacheName(url, imageOptions), void(CachePtr = (CachePtr + 1) % i)) : void o("missing url or options")
        },
        isUrlCached: function(url, imageOptions) {
            if (!url || !imageOptions) {return !1;}
            const cacheName = createCacheName(url, imageOptions);
            return imageCache.includes(cacheName)
        },
        clear: function() {AllFunctions(0)("Function 372").verbose("Clearing image cache");
            imageCache.length = 0, CachePtr = 0
        }
    }
}, function(e, t, r) {// Function 373 Sonos prefetcher: listener for sonos devices
    "use strict";
    const n = r(6)("cp6:lib:resourceprefetcher:sonosprefetcher"),
        o = r(10),
        i = r(2).resourceprefetcher,
        s = "lz4-black";
    e.exports.registerSonosEvents = function(e, t) {
        return n("listening to sonos notifications"), e.then(e => {
            e.getDevices().filter(e => (function(e) {
                return e.details && "adapter" === e.details.sourceName && "sonos" === e.details.adapterName
            })(e)).map(e => (function(e) {
                return e.getSensorByName("PLAYERSTATE_SENSOR")
            })(e)).filter(e => e).forEach(e => {
                n("register sonos event", e.eventKey), o.registerIfNotYetRegistered(e.eventKey, e => {
                    ! function(e, t) {
                        if (!t) return void n("playerstate empty, ignore");
                        n("fetch sonos images");
                        const r = {
                                width: i.listImage.width,
                                height: i.listImage.height,
                                imageFormat: s
                            },
                            o = {
                                width: i.albumartImage.width,
                                height: i.albumartImage.height,
                                imageFormat: s
                            };
                        t.currentTrack && t.currentTrack.absoluteAlbumArtURI && (e.prefetchImage(t.currentTrack.absoluteAlbumArtURI, r), e.prefetchImage(t.currentTrack.absoluteAlbumArtURI, o)), t.nextTrack && t.nextTrack.absoluteAlbumArtURI && (e.prefetchImage(t.nextTrack.absoluteAlbumArtURI, r), e.prefetchImage(t.nextTrack.absoluteAlbumArtURI, o))
                    }(t, e)
                })
            })
        }).catch(e => {
            n("IMAGE_PREFETCH_FAILED", {
                error: e.message
            })
        })
    }
}, function(e, t, r) {// Function 374 DeviceSmartener: handler for CEC
    "use strict";
    const n = r(0)("DeviceSmartener"),
        o = r(375);
    let i;
    const s = 100,
        a = 101;
    e.exports = {
        buildNewInstance: function(e, t, r) {
            n.debug("build new instance"), i = new c(e, t, r)
        },
        stopInstance: function() {
            n.debug("stop instance"), i = void 0
        },
        processCecPowerNotification: function(e) {
            return !!i && (n.debug("processCecPowerNotification"), void i.processCecMessage(e))
        },
        STATE_FIRST_TOGGLE_DETECTED: s,
        STATE_DEVICE_SMARTENED: a
    };
    class c {
        constructor(e, t, r) {
            this.device = e, this.callbackOnSuccess = r, this.devicemap = new Map, this.timeoutCallback = setTimeout(() => {
                n.debug("SMART_DEVICE_TIMEOUT"), t()
            }, 6e4)
        }
        deviceDetected(e) {
            n.debug("SMART_DEVICE_FOUND", e), clearTimeout(this.timeoutCallback);
            const t = {
                deviceKey: this.device.key,
                cecAddress: e.uniqueDeviceId,
                state: a,
                powerState: e.value
            };
            this.callbackOnSuccess(t)
        }
        _getInitialPowerState(e) {
            const t = this.devicemap.get(e);
            return void 0 !== t && t
        }
        _doesDevicetypeAndPowerstateMatch(e) {
            const t = this.device.getType(),
                r = e.uniqueDeviceId.split(":")[1];
            return o.matchCecLogicalAddress(r, t)
        }
        processCecMessage(e) {
            if (!e || "string" != typeof e.uniqueDeviceId || !e.uniqueDeviceId.includes(":")) return void n.debug("INVALID_POWERSTATE", e);
            const t = e.uniqueDeviceId;
            if (n.debug("newPowerState", e), !this._doesDevicetypeAndPowerstateMatch(e)) {
                const t = this.device.getType();
                return void n.warn("POWERSTATE_DOES_NOT_MATCH_DEVICETYPE", {
                    devicetype: t,
                    newPowerState: e
                })
            }
            const r = this._getInitialPowerState(t);
            if (r) return 0 == (r.value !== e.value) ? void n.debug("powerStateChanged not changed") : void this.deviceDetected(e); {
                n.debug("ADD_NEW_POWERSTATE", t), this.devicemap.set(t, e);
                const o = {
                    deviceKey: this.device.key,
                    cecAddress: r.uniqueDeviceId,
                    state: s
                };
                this.callbackOnSuccess(o)
            }
        }
    }
}, function(e, t, r) {// Function 375 NeeoDeviceMapper: match CEC device-type to NEEO-type
    "use strict";
    const n = r(0)("NeeoDeviceMapper"),
        o = r(19);
    e.exports = {
        matchCecLogicalAddress: function(e, t) {
            switch (e) {
                case "0":
                    return [o.TYPE_TV, o.TYPE_PROJECTOR].includes(t);
                case "5":
                    return [o.TYPE_AVRECEIVER, o.TYPE_HDMISWITCH].includes(t);
                case "1":
                case "2":
                case "3":
                case "4":
                case "6":
                case "7":
                case "8":
                case "9":
                case "10":
                case "11":
                case "14":
                    return [o.TYPE_DVD, o.TYPE_VOD, o.TYPE_GAMECONSOLE, o.TYPE_TUNER, o.TYPE_DVB, o.TYPE_AUDIO, o.TYPE_MEDIAPLAYER, o.TYPE_SOUNDBAR].includes(t);
                default:
                    n.warn("INVALID_LOGICAL_ADDRESS", t)
            }
            return !1
        }
    }
}, function(e, t, r) {// Function 376 DeviceSmartener:projectrepo, getDevice in current project
    "use strict";
    const n = r(6)("cp6:lib:smartener:projectrepo"),
        o = r(27),
        i = r(36),
        s = r(18);
    e.exports = {
        getDeviceByKey: function(e) {
            return n("FIND_DEVICE_BY_KEY", e), o.activeProject().then(t => t.getDeviceByKey(e))
        },
        getDeviceByadapterDeviceId: function(e) {
            return n("FIND_DEVICE_BY_NAME", e), o.activeProject()
                                                    .then(t => t.getDeviceByadapterDeviceId(e))
//                                                    .then(xx => {AllFunctions(0)("Function 376").verbose("getdevicebyadapterdeviceid:",xx);return xx})
        },
        getDevices: function(e) {
            return n("GET_DEVICES", e), o.activeProject().then(t => t.getDevices())
        },
        getDeviceByCecAddress: function(e) {
            n("FIND_DEVICE_BY_CECADDRESS", e);
            const t = t => {
                return t.powerMode === i.SMARTENER && (t.getHdmiCecAddress() === e && t.getSourceName() === s.SOURCE_DUIRO)
            };
            return o.activeProject().then(e => e.getDevices(t)).then(e => {
                if (e) return e[0]
            })
        },
        smartifyStupidDevice: function(e) {
            const t = e.cecAddress,
                r = e.deviceKey,
                s = e.hypotheticalPowerState;
            let a, c;
            return n("ADD_CECADDRESS_TO_DEVICE", t), o.activeProject().then(e => (a = e, a.getDeviceByKey(r))).then(e => {
                if (!e) throw new Error("DEVICE_NOT_FOUND", r);
                return (c = e).setHdmiCecAddress(t), s && c.markAsOn(), c.setPowerMode(i.SMARTENER)
            }).then(() => {
                const e = a.getRoomByKey(c.getRoomKey());
                return e.markDeviceRecipesClean(c), e.rebuildScenarioRecipes(), a.save()
            }).then(() => c)
        }
    }
}, function(e, t, r) {// Function 377 TR2 Service, Startsysnc function
    "use strict";
    AllFunctions(0)("Function 377").verbose("")

    function n(e) {
        o.debug("init", e), this.routingTableRefreshTimeMs = e.routingTableRefreshTimeMs, this.buildZeroConf = r(387), this.buildGui = r(389), this.buildGuiData = r(430), this.watchGuiData = this.buildGuiData.watch, this.listeners = [], this.pushActions = u.build(d), this.tempBrainHostOverride = void 0
    }
    const o = r(0)("TR2 Service"),
        i = r(3),
        s = r(12), 
        a = r(44).wifi,
        c = r(378),
        u = r(383),
        d = r(10),
        l = r(25),
        p = r(105).shortenUrls,
        h = r(386);
    e.exports = n, n.prototype.startNbrSync = function() {
        c.startSync(this.routingTableRefreshTimeMs)
    }, n.prototype._clearListeners = function() {
        o.debug("clear listeners"), this.listeners.forEach(e => {
            e.eventKey !== l.NOTIFICATION_PROJECT_CHANGED && d.removeListener(e.eventKey, e.callback)
        }), this.listeners = this.listeners.filter(e => e.eventKey === l.NOTIFICATION_PROJECT_CHANGED)
    }, n.prototype._containsEventKey = function(e) {
        return this.listeners.find(t => t && t.eventKey === e)
    }, n.prototype._on = function(e, t) {
        if (o.debug("listen on key:", e), this._containsEventKey(e)) o.debug("already listening to key", e);
        else {
            const r = {
                eventKey: e,
                callback: t
            };
            d.on(e, r.callback), this.listeners.push(r), o.debug("listeners size:", this.listeners.length)
        }
    }, n.prototype._notifyProjectChanged = function() {
        return i.increaseCounter("tr2-notify-projectchanged"), c.sendPushMessage(h.TR2_PUSH_MESSAGE_PROJECT_RELOAD)
    }, n.prototype.sendPushUpdate = function(e, t) {
        return o.debug(e, "PUSH TO TR2: gui data changed:", t), t = "<update>" + t + "</update>", i.increaseCounter("tr2-push-update"), c.sendPushMessage(t)
    }, n.prototype.isTr2Registered = function() {
        return c.isTr2Registered()
    }, n.prototype.updateTr2Addresses = function(e) {
        c.updateTr2Addresses(e)
    }, n.prototype.registerIpv6Address = function(e) {
        c.addSingleAddress(e)
    }, n.prototype.startGuiDataWatch = function(e) {
        o.debug("start watching for gui data changes"), this._clearListeners(), this.watchGuiData(e, this)
    }, n.prototype.guiDataXml = function(e) {
        return this.buildGuiData(e, this.pushActions).then(p)
    }, n.prototype.guiXml = function(e) {
        return this.startGuiDataWatch(e), this.buildGui(e).then(p)
    }, n.prototype.overrideBrainHost = function(e) {
        this.tempBrainHostOverride = e
    }, n.prototype.zeroConfXml = function() {
        const e = this.tempBrainHostOverride ? this.tempBrainHostOverride : s.primaryInterfaceAddress(),
            t = {
                ssid: a.getSsid(),
                password: a.getPassword(),
                brainIp: e,
                wifiregion: s.getWifiRegulationContinent()
            };
        return this.buildZeroConf(t)
    }
}, function(e, t, r) {// Function 378 TR2_PUSHUPDATE, main handler for sync/pushing an update to TR2
    "use strict";
    AllFunctions(0)("Function 378").verbose("")

    function n(e) {
        u.updateTr2Addresses(e)
    }

    function o() {
        return c.getRoutingTable().then(e => {
            i.debug("refresh tr2 entries", e), n(e)
        }).catch(e => {
            i.error("ROUTING_TABLE_SYNC_FAILED", {
                error: e.message
            })
        })
    }
    const i = r(0)("TR2_PUSHUPDATE"),
        s = r(2).tr2,
        a = r(379),
        c = r(31),
        u = new(r(381));
    let d, l = "";
    e.exports = {
        isTr2Registered: function() {
             AllFunctions(0)("Function 378").verbose("isTr2Registered");
            return u.isTr2Registered()
        },
        updateTr2Addresses: n,
        addSingleAddress: function(e) {
             AllFunctions(0)("Function 378").verbose("addSingleAddress");
            u.addSingleAddress(e)
        },
        startSync: function(e) {
             AllFunctions(0)("Function 378").verbose("startSync");
            return d ? void i.warn("INTERVAL_ALREADY_RUNNING") : !e || 5e3 > e ? void i.warn("INVALID_INTERVAL_TIME", e) : (i.debug("Start routing table sync, intervalMs", e), d = setInterval(o, e), void o())
        },
        stopSync: function() {
             AllFunctions(0)("Function 378").verbose("stopSync");
            clearInterval(d), d = void 0
        },
        sendPushMessage: function(e) {
             AllFunctions(0)("Function 378").verbose("sendPushMessage");
            if (!u.isTr2Registered())
                 AllFunctions(0)("Function 378").verbose("Push update to TR2, but no TR2 connected");

            if (!u.isTr2Registered()) return 60 > parseInt(process.uptime()) && o(), i.debug("TR2_NO_REGISTERED_DEVICES_FOUND"), !1;
            if (!e) return i.warn("TR2_NO_PAYLOAD_DEFINED"), !1;
            if (l === e) return i.debug("DUPLICATE_PUSHMSG_DETECTED"), !1;
            l = e, i.debug("send pushmsg", e.length);
            const t = u.getAllActiveIPV6AdressesAsArray();
            AllFunctions(0)("Function 378").verbose("Push update to these IPV6-addresses:",t)
            a.pushUpdateToTr2(e, t, s.coapPort, s.maxPayloadSize).catch(e => {
                i.warn("FAILED_DELIVER_ALL_TR2_PUSH_MESSAGES", e.message || "")
            })
        }
    }
}, function(e, t, r) {// Function 379 TR2_COAP_PUSHUPDATE PUSH to tr2 a POST /update 
    "use strict";
    AllFunctions(0)("Function 379").verbose("")
    const n = r(0)("TR2_COAP_PUSHUPDATE"),
        o = r(162),
        i = r(1),
        s = r(64);
    t.pushUpdateToTr2 = function(e, t, r, a) {
        if (!Array.isArray(t) || 0 === t.length) return n.debug("no registered tr2 found"), i.resolve();
        const c = e.length;
        return e = s.transliterationToAscii(e), (e = s.compress(e)).length > a ? (n.warn("COAP_PUSHUPDATE_MAXIMAL_SIZE_EXCEEDED", {
            size: e.length
        }), i.reject(new Error("TR2 max payload size exceeded. max: " + a + ", payload size:", e.length))) : (t.forEach(t => {
            n.debug("PUSH_TO_TR2", {
                coapLength: e.length,
                origLength: c,
                ipv6Addr: t,
                port: r
            });
            const i = o.request({
                host: t,
                port: r,
                method: "POST",
                pathname: "/update",
                confirmable: !1,
                retrySend: 1
            });
            i.on("error", e => {
                n.debug("TR2_PUSH_NOTIFICATION_FAILED", e.message)
            }), i.on("response", e => {
                n.debug("TR2_PUSH_RESPONSE"), e && e.payload && e.payload.data && n.debug("response:", new Buffer(e.payload.data))
            }), i.end(e)
        }), i.resolve())
    }
}, function(e) {// Function 380 only contains require("unidecode"
    e.exports = require("unidecode")
}, function(e, t, r) {// Function 381 TR2 Tracker; manage (plus register) TR2-addresses
    "use strict";
    AllFunctions(0)("Function 381").verbose("")
    const n = r(382),
        o = r(0)("TR2 Tracker"),
        i = r(141).Address6;
    e.exports = class {
        constructor() {
            this.knownTr2 = []
        }
        getAllActiveIPV6AdressesAsArray() {
            return this.knownTr2
        }
        getRegisteredTr2Count() {
            return this.knownTr2.length
        }
        isTr2Registered() {
            return 0 < this.getRegisteredTr2Count()
        }
        addSingleAddress(e) {
            const t = new i(e);
            if (!t.isValid()) return;
            const r = t.parsedAddress.join(":");
            this.knownTr2.find(e => {
                return new i(e).parsedAddress.join(":") === r
            }) || this.knownTr2.push(e)
        }
        updateTr2Addresses(e) {
            Array.isArray(e) ? (this.knownTr2 = e.filter(n.isIPv6), o.debug("refreshed tr2 list, entries:", e.length)) : o.warn("INVALID_TR2_ADDRESS_PUSHED", {
                data: e
            })
        }
    }
}, function(e) {// Function 382 only contains require("net")
    e.exports = require("net")
}, function(e, t, r) {// Function 383 TR2:pushactionhandler /ChangeScreen; handleActivescenario, addPushaction, changescreen
    "use strict";
    AllFunctions(0)("Function 383").verbose("")
    const n = r(0)("TR2:pushactionhandler"),
        o = [/ChangeScreen\('\d+-?\d*',-?1\)/];
    e.exports = class e {
        constructor(e) {
            this.notification = e, this.callback = !1, this.actionId = !1
        }
        static build(t) {
            return new e(t)
        }
        _handleActiveScenarios(e) {
            n.debug("active screen changed to:", e), 1 === e.length ? (n.debug("Generating active scenario push action", e), this.addChangeScreen(e[0])) : 0 === e.length && (n.debug("Generating home screen push action"), this.addChangeScreen("0"))
        }
        addPushAction(e) {
            return function(e) {
                return !o.some(t => t.test(e))
            }(e) ? void n.debug("INVALID_ACTION_CALLBACK", {
                actionCallback: e
            }) : (this.callback = e, this.actionId = Date.now(), n.debug("UPDATING_PUSH_ACTION", {
                callback: e,
                actionId: this.actionId
            }), void this.notification.emit("PUSH_ACTION_ADDED", this.getCurrentPushAction()))
        }
        addChangeScreen(e) {
            this.addPushAction(`ChangeScreen('${e}',1)`)
        }
        getCurrentPushAction() {
            return !!(this.callback && this.actionId) && {
                callback: this.callback,
                actionId: this.actionId
            }
        }
    }
}, function(e, t, r) {// Function 384 URL Shortener
    "use strict";
    const n = r(78),
        o = r(0)("URL Shortener Service"),
        i = "0123456789abcdefghijklmnopqrstuvwxyz-_.~",
        s = e.exports = function(e) {
            o.debug("init. base: " + i.length, e), this.baseUrl = e.baseUrl, this.id = 0, this.urlToIndex = {}, this.indexToUrl = {}
        };
    s.prototype.toBase36 = function(e) {
        return e >= i.length ? this.toBase36(Math.floor(e / i.length)) + i[e % i.length] : i[e]
    }, s.prototype._getIndex = function(e) {
        const t = this.urlToIndex[e];
        if (t) return t;
        const r = this.toBase36(this.id);
        return this.urlToIndex[e] = r, this.indexToUrl[r] = e, this.id++, r
    }, s.prototype.shortUrl = function(e) {
        return e ? this._getIndex(n.resolve(this.baseUrl, e)) : void o.debug("invalid url parameter to shortUrlPath")
    }, s.prototype.longUrl = function(e) {
        const t = this.indexToUrl[e];
        return t || void o.debug("long url not found for", e)
    }, s.prototype.size = function() {
        return this.id
    }
}, function(e, t, r) {// Function 385 urlshortener:searchurl
    "use strict";
    const n = r(6)("cp6:lib:tr2:urlshortener:searchurl"),
        o = /(\s|;|\")TriggerAction\(\'([^']+)\'\)/g,
        i = /(\s|;|\")ActivateScenario\(\'([^']+)\',\s*\'([^']+)\',\s*\'([^']+)\',\s*\'([^']+)\'\)\"/g;
    t.shortenUrls = function(e, t) {
        if (!t) return;
        const r = Date.now();
        let s = t.replace(o, function(t, r, n) {
            return `${r}TriggerAction('${e.shortUrl(n)}')`
        });
        return s = s.replace(i, function(t, r, n, o, i, s) {
            return `${r}ActivateScenario('${n}','${e.shortUrl(o)}','${i}','${s}')"`
        }), n("Search URL time in ms:", Date.now() - r), s
    }
}, function(e) {// Function 386 only contains exports.TR2_PUSH_MESSAGE_PROJECT_RELOAD = "<updateGui/>"
    "use strict";
    e.exports.TR2_PUSH_MESSAGE_PROJECT_RELOAD = "<updateGui/>"
}, function(e, t, r) {// Function 387 zeroconf.tpl.xml; wifi handler
    "use strict";
    const n = r(4)("zeroconf.tpl.xml"),
        o = r(388),
        i = "projects/home/tr2/";
    e.exports = function(e) {
        if (!e) throw new Error("zeroconf.xml missing data");
        const t = {
            wifi: {
                ssid: o(e.ssid),
                password: e.password
            },
            guiLoc: i + "gui_xml",
            guiDataLoc: i + "guidata_xml",
            brainIp: e.brainIp,
            wifiregion: e.wifiregion
        };
        return n(t)
    }
}, function(e, t, r) {// Function 388 small buffer conversion to Uint8array
    "use strict";
    const n = r(163);
    e.exports = function(e) {
        if (!e) return "";
        const t = Buffer.from(e, "utf8");
        return new Uint8Array(t).reduce((e, t) => 128 & t ? e + "&#" + t.toString(10) + ";" : e + n.escape(String.fromCharCode(t)), "")
    }
}, function(e, t, r) {// Function 389 TR2-GUI; mostly validity-checking 
    "use strict";
    const n = r(1),
        o = r(0)("TR2-GUI"),
        i = r(4)("gui.tpl.xml"),
        s = r(390),
        a = r(391),
        c = r(392),
        u = r(393),
        d = r(394),
        l = r(397),
        p = r(398),
        h = r(399),
        g = r(402),
        m = r(407),
        f = r(428);
    e.exports = function(e) {
        if (!e || "function" != typeof e.getVisibleScenarios) return o.warn("TR2_GUIXML_INVALID_PROJECT"), n.reject(new Error("TR2_GUIXML_INVALID_PROJECT"));
        const t = [c(e), m(e)];
        return n.all(t).then(([t, r]) => {
            const n = {
                keypad: a(),
                header: s(e),
                config: t,
                fonts: u(),
                popups: d(e),
                loading: l(),
                home: p(e),
                settings: h(e),
                rooms: g(e),
                scenarios: r,
                devices: f(e)
            };
            return i(n)
        })
    }
}, function(e, t, r) {// Function 390 performs getBackgroundImageStyle
    "use strict";
    const n = r(28),
        o = r(4)("gui/header.tpl.xml");
    e.exports = function() {
        const e = n.getBackgroundImageStyle().headerBackgroundColor;
        return o({
            headerBackground: e
        })
    }
}, function(e, t, r) {// Function 391 exports simple function r(4)("gui/keypad.tpl.xml")()
    "use strict";
    const n = r(4)("gui/keypad.tpl.xml")();
    e.exports = function() {
        return n
    }
}, function(e, t, r) {// Function 392 looks like main function to determine TR2-screen characteristics
    "use strict";
    const n = r(28),
        o = r(7),
        i = r(4)("gui/config.tpl.xml");
    e.exports = function(e) {
        const t = e.getVersion(),
            r = e.getTr2LogSettings(),
            s = r.userActionLog,
            a = r.uartLog,
            c = e.getVisibleRootScreenIdDependingOnRooms(o.home),
            u = n.getBackgroundImageStyle(),
            d = {
                startScreenId: c
            };
        return n.useProUI() && (d.backgroundGradientColorTop = u.backgroundGradientColorTop, d.backgroundGradientColorBottom = u.backgroundGradientColorBottom), e.isNeeoLinkEnabled().then(e => (Object.assign(d, {
            projectId: t.projectId,
            neeolinkenabled: e,
            logToUart: a,
            logUserAction: s
        }), i(d)))
    }
}, function(e, t, r) {// Function 393 simply returns r(4)("gui/fonts.tpl.xml")();
    "use strict";
    const n = r(4)("gui/fonts.tpl.xml")();
    e.exports = function() {
        return n
    }
}, function(e, t, r) {// Function 394 Probably main TR2-popup-handler.
    "use strict";
    const n = r(7),
        o = r(4),
        i = r(395),
        s = r(396),
        a = o("gui/popups/message.tpl.xml")(n),
        c = o("gui/popups/blocking.tpl.xml")(n),
        u = o("gui/popups/power.tpl.xml")(n),
        d = o("gui/popups/upgradeconfirm.tpl.xml")(n),
        l = o("gui/popups/upgrade_brain_running.tpl.xml")(n),
        p = o("gui/popups/upgrade_brain_failed.tpl.xml")(n),
        h = o("gui/popups/charging.tpl.xml")(n),
        g = o("gui/popups/message_reboot.tpl.xml")(n);
    e.exports = function(e) {
        return s.renderUpgradeVersionCheckTemplate(e) + s.renderUpgradeConfirmTemplate() + (l + p + d + a + c + u + h + g) + function(e) {
            return e.getVisibleScenarios().reduce((t, r) => t + i.getPopupForAssumptionMode(e, r), "")
        }(e)
    }
}, function(e, t, r) {// Function 395 Looks like providing details (handling?) on getPopupForAssumptionMode
    "use strict";

    function n(e, t) {
        return function() {
            return (r, n) => {
                e.deviceKey = t;
                const o = a.getMacroTriggerUrl(e);
                return n(a.getTr2TriggerActionCommand(o))
            }
        }
    }

    function o(e, t, r) {
        const o = d.device,
            i = Math.min(r.length, l);
        return r.map((r, a) => {
            const c = s.getAdditionalInfo(e, t, r),
                u = o.button.initialVerticalPosition + a * o.height;
            return {
                name: r.name,
                powerModeInfo: c,
                powerMacroTrigger: n(c.powerToggle, r.key),
                inputMacroTrigger: n(c.inputSwitch, r.key),
                textPositionY: o.text.initialVerticalPosition + a * o.height,
                buttonPositionY: u,
                isNotLast: a + 1 < i,
                linePositionY: u + o.height + o.lineOffset
            }
        })
    }
    const i = r(7),
        s = r(129),
        a = r(13),
        c = r(28),
        u = r(4)("gui/popups/assumption_mode.tpl.xml"),
        d = c.getAssumptionButtonLayout(),
        l = 4;
    e.exports = {
        getPopupForAssumptionMode: function(e, t) {
            const r = e.getPowerInfoDevices(t);
            if (0 === r.length) return "";
            const n = function(e, t) {
                const r = t.slice(0, l),
                    n = function(e) {
                        return e.reduce((e, t) => (e.hasPowerToggle = e.hasPowerToggle || !!t.powerModeInfo.powerToggle, e.hasInputSwitch = e.hasInputSwitch || !!t.powerModeInfo.inputSwitch, e), {
                            hasPowerToggle: !1,
                            hasInputSwitch: !1
                        })
                    }(r),
                    o = r.length * d.device.height + d.minHeight,
                    s = o + d.doneButtonOffset,
                    a = {
                        devices: r,
                        controlInfo: n,
                        popupHeight: o,
                        donePositionY: s,
                        horizontalLinePositionY: s + d.horizontalSeparatorOffset,
                        scenarioKey: e.key
                    };
                return Object.assign({}, i, a)
            }(t, o(e, t, r));
            return u(n)
        }
    }
}, function(e, t, r) {// Function 396 Looks like providing details (handling?) on UpgradeVersionCheck/confirm
    "use strict";

    function n() {
        return function(e, t) {
            return t(s.getTr2TriggerActionCommand(e))
        }
    }
    const o = r(7),
        i = r(4),
        s = r(13),
        a = i("gui/popups/upgrade_brain_versioncheck.tpl.xml"),
        c = i("gui/popups/upgrade_brain_confirm.tpl.xml");
    e.exports = {
        renderUpgradeConfirmTemplate: function() {
            const e = Object.assign({}, o, {
                triggerRawUri: n
            });
            return c(e)
        },
        renderUpgradeVersionCheckTemplate: function(e) {
            const t = e.getFirmwareVersions(),
                r = Object.assign({}, o, {
                    currentFirmwareVersion: t.currentVersion,
                    newFirmwareVersion: t.newVersion
                });
            return a(r)
        }
    }
}, function(e, t, r) {// Function 397 simply returns r(4)("gui/loading.tpl.xml")();
    "use strict";
    const n = r(4)("gui/loading.tpl.xml")();
    e.exports = function() {
        return n
    }
}, function(e, t, r) {// Function 398 Build/render rooms-screen
    "use strict";

    function n(e) {
        return {
            name: e.getName().toUpperCase(),
            key: e.getKey(),
            icon: p(e.icon || g)
        }
    }

    function o(e) {
        const t = s.merge({
            header: h.header,
            icon: h.icon,
            home: h.home,
            touchActiveColor: h.touchActiveColor,
            optionalBadgeFirmwareUpdateAvailable: e.optionalBadgeFirmwareUpdateAvailable,
            defaultFrameColor: h.defaultFrameColor
        }, l("rooms", e.rooms));
        return c(t)
    }

    function i(e) {
        return s.chunk(e.rooms, h.homeStyle.entriesPerPage).reduce((e, t, r) => {
            const n = l("rooms", t);
            return n.screenId = function(e, t) {
                return e + (0 < t ? "-" + t : "")
            }(h.home, r), e.addTemplate(u, n)
        }, d.build()).render({
            header: h.header,
            icon: h.icon,
            touchActiveColor: h.touchActiveColor,
            optionalBadgeFirmwareUpdateAvailable: e.optionalBadgeFirmwareUpdateAvailable
        })
    }
    const s = r(16),
        a = r(4),
        c = a("gui/home-single-screen.tpl.xml"),
        u = a("gui/home-multi-screen.tpl.xml"),
        d = r(165),
        l = r(166),
        p = r(35),
        h = r(7),
        g = "neeo.icon.room.default";
    e.exports = function(e) {
        const t = e.getVisibleRooms().sort(e.compareByWeight).map(n),
            r = {
                rooms: t,
                optionalBadgeFirmwareUpdateAvailable: e.isFirmwareUpdateAvailable() ? `badgeColor="${h.badgeColorImportant}" badgeRadius="14"` : ""
            };
        return t.length <= h.homeStyle.entriesPerPage ? o(r) : i(r)
    }
}, function(e, t, r) {// Function 399 Indicator isFirmwareUpdateAvailable
    "use strict";
    const n = r(4)("gui/settings.tpl.xml"),
        o = r(400),
        i = r(401),
        s = r(7);
    e.exports = function(e) {
        return function(e) {
            const t = e.isFirmwareUpdateAvailable(),
                r = Object.assign({}, s, {
                    firmwareUpdateAvailable: t
                }),
                o = e.getVisibleRooms();
            return 1 === o.length && (r.visibleRootScreenId = o[0].key), n(r)
        }(e) + o(s, e) + i(s, e)
    }
}, function(e, t, r) {// Function 400 getSysteminformation gui/systeminfo.tpl.xml
    "use strict";
    const n = r(4)("gui/systeminfo.tpl.xml"),
        o = r(13);
    e.exports = function(e, t) {
        const r = t.getSystemInformation();
        return r.header = e.header, r.navBackIcon = e.navBackIcon, r.touchActiveColor = e.touchActiveColor, r.touchStaticColor = e.touchStaticColor, r.touchActiveBackgroundColor = e.touchActiveBackgroundColor, r.visibleRootScreenId = t.getVisibleRootScreenIdDependingOnRooms(e.home), r.triggerRawUri = function() {
            return function(e, t) {
                return t(o.getTr2TriggerActionCommand(e))
            }
        }, n(r)
    }
}, function(e, t, r) {// Function 401 getVisibleRootScreenIdDependingOnRooms
    "use strict";
    const n = r(4)("gui/regulatory.tpl.xml");
    e.exports = function(e, t) {
        const r = Object.assign({}, e);
        return r.visibleRootScreenId = t.getVisibleRootScreenIdDependingOnRooms(e.home), n(r)
    }
}, function(e, t, r) {// Function 402 some screenbuilder, looks for recipies
    "use strict";

    function n(e, t = 0) {
        return e.getKey() + (0 < t ? "-" + t : "")
    }

    function o(e) {
        return e.recipes.length <= g.recipeStyle.entriesPerPage ? function(e) {
            const t = {
                    key: n(e.room),
                    name: e.room.getName()
                },
                r = i(t, h("recipes", e.recipes), m, {
                    optionalBadgeFirmwareUpdateAvailable: e.optionalBadgeFirmwareUpdateAvailable
                });
            return e.isOnlyRoom && (r.visibleRootScreenId = t.key), u(r)
        }(e) : function(e) {
            return s(e.recipes, g.recipeStyle.entriesPerPage).reduce((t, r, o) => {
                const i = a({
                    screenId: n(e.room, o),
                    name: e.room.getName(),
                    optionalBadgeFirmwareUpdateAvailable: e.optionalBadgeFirmwareUpdateAvailable
                }, h("recipes", r));
                return e.isOnlyRoom && (i.visibleRootScreenId = n(e.room, 0)), t.addTemplate(d, i)
            }, p.build()).render(m)
        }(e)
    }
    const i = r(403),
        s = r(404),
        a = r(48),
        c = r(4),
        u = c("gui/room-single-screen.tpl.xml"),
        d = c("gui/room-multi-screen.tpl.xml"),
        l = r(405),
        p = r(165),
        h = r(166),
        g = r(7),
        m = {
            navBackIcon: g.navBackIcon,
            touchActiveColor: g.touchActiveColor,
            defaultFrameColor: g.defaultFrameColor,
            header: g.header,
            content: g.content,
            icon: g.icon,
            home: g.home,
            visibleRootScreenId: g.visibleRootScreenId
        };
    e.exports = function(e) {
        AllFunctions(0)("Function 402").verbose("Screenbuilder TR2, checking isFirmwareUpdateAvailable")
        const t = e.isFirmwareUpdateAvailable() ? `badgeColor="${g.badgeColorImportant}" badgeRadius="14"` : "",
        // optional flash exclamation: const t  = `badgeColor="${g.badgeColorImportant}" badgeRadius="14"`,
            r = e.getVisibleRooms(),
            n = r.length;
        return r.reduce((r, i) => {
            const s = function(e, t) {
                return t.getVisibleRoomRecipes(e).sort(t.compareByWeight).map(e => l.getRecipeModel(e, t))
            }(i, e);
            return r + o({
                room: i,
                recipes: s,
                optionalBadgeFirmwareUpdateAvailable: t,
                isOnlyRoom: 1 === n
            })
        }, "")
    }
}, function(e) {// Function 403 only contains require("lodash/assign")
    e.exports = require("lodash/assign")
}, function(e) {// Function 404 only contains require("lodash/chunk")
    e.exports = require("lodash/chunk")
}, function(e, t, r) {// Function 405 executing a recipe; check if configured already, else popup. Easter egg: Playsnake
    "use strict";

    function n(e) {
        const t = e.getScenario(),
            r = e.getRoomName();
        let n = d;
        return n = t ? t.getIcon() : o(e) ? l : e.getIcon() || d, s(n, r)
    }

    function o(e) {
        return e.isCustom && p.test(e.name)
    }
    const i = r(66),
        s = r(35),
        a = r(13),
        c = "There is one more thing needed: open this recipe in the NEEO mobile app to get it ready.",
        u = "start",
        d = "RECIPE",
        l = "SNAKE",
        p = /^snake$/i;
    e.exports.getRecipeModel = function(e, t) {
        const r = e.getName(),
            s = function(e, t) {
                //AllFunctions(0)("Function 405").verbose("isvisibleinguiasunconfigured",e.isVisibleInGuiAsUnconfigured())
                if (e.isVisibleInGuiAsUnconfigured()) return `ShowPopup('message','${c}')`;
                if (o(e)) return "PlaySnake()";
                const r = a.getRecipeExecuteUrl(e),
                    n = function(e, t) {
                        const r = t.getScenarioKeyOfRecipeControlstep(e);
                        return r || e.getRoomKey()
                    }(e, t),
                    s = i.getTr2FunctionText(e.getName().toUpperCase());
                return a.getActivateScenarioWithAnswer(n, r, s, u)
            }(e, t);
        return {
            optionalUnconfiguredDeviceBadge: e.isVisibleInGuiAsUnconfigured() ? 'badgeColor="#FFFF0000"' : "",
            name: r.toUpperCase(),
            icon: n(e),
            onClick: s
        }
    }
}, function(e) {// Function 406 only contains require("lodash/escape")
    e.exports = require("lodash/escape")
}, function(e, t, r) {// Function 407 TR2_GUI_SCENARIO builder/render
    "use strict";

    function n(e, t) {
        return new o(r => {
            const n = d.buildScenarioData(e, t),
                o = l.find(e => e.match(n));
//console.log("Function 406; render o",n,o)
            if (o) return r(o.render(n));
            const s = function(e, t) {
                const r = t.getViewbuilderStructureFromScenario(e);
                return u.removeSlidesDuplicatingHardwareButtons(r)
            }(e, t);
            i.debug("removed slides from scenario", s.removedSlides), r(c.render(s, n))
        })
    }
    const o = r(1),
        i = r(0)("tr2-xml"),
        s = r(408),
        a = r(409),
        c = r(410),
        u = r(426),
        d = r(427),
        l = [s, a];
    e.exports = function(e) {
        const t = e.getVisibleScenarios().map(t => n(t, e).catch(e => (i.error("TR2_GUI_SCENARIO_GENERATION_FAILED", {
            message: e.message,
            error: e.stack
        }), "")));
        return o.all(t).then(e => e.join(""))
    }
}, function(e, t, r) {// Function 408 dedicated Sonos scenario builder/renderer
    "use strict";

    function n(e) {
        return new Buffer(JSON.stringify(e)).toString("base64")
    }
    const o = r(1),
        i = r(13),
        s = r(7),
        a = r(4)("gui/scenario/sonos.tpl.xml"),
        c = r(106),
        u = r(93),
        d = "";
    e.exports = {
        name: "sonosRenderer",
        render: function(e) {
            return new o(t => {
                const r = Object.assign({}, s, e),
                    o = u.getKeymappingForDevice(e.mainDevice),
                    l = c.getTemplate(o);
                r.listBackParent = e.roomKey || "0", r.keys = l(e);
                const p = "SONOS",
                    h = e.mainDevice.getKey(),
                    g = i.getDeviceRootItemsUrl(h) || d;
                r.browseUri = g, r.browseUriData = n({
                    directoryUrl: g,
                    browseUri: "",
                    title: p,
                    history: []
                });
                const m = function(e) {
                    if (!e) return d;
                    const t = e.getDirectories().find(e => "SONOS_QUEUE_DIRECTORY" === e.name);
                    return t ? i.getDirectoryBrowseUrl(t.getKey()) : d
                }(e.mainDevice) || d;
                r.queueUri = m, r.queueUriData = n({
                    directoryUrl: m,
                    browseUri: "",
                    title: p,
                    history: []
                }), t(a(r))
            })
        },
        match: function(e) {
            return "SONOS" === e.type
        }
    }
}, function(e, t, r) {// Function 409 Player handler?
    "use strict";

    function n(e) {
        return s.resolve(p).then(t => Object.assign({}, c, e, function(e) {
            const t = t => {
                const r = e.mainDevice.getSensorByName(t);
                if (r) return r.key;
                throw new Error("PLAYERSTATE_SENSOR_NOT_FOUND_" + t)
            };
            return {
                titleKey: t("TITLE_SENSOR"),
                artistKey: t("DESCRIPTION_SENSOR"),
                coverArtKey: t("COVER_ART_SENSOR"),
                coverArtSmallKey: t("COVER_ART_SENSOR") + "_small",
                volumeKey: t("VOLUME_SENSOR"),
                isPlayingKey: t("PLAYING_SENSOR")
            }
        }(e), function(e) {
            const t = e.mainDevice.getKey(),
                r = a.getDeviceRootItemsUrl(t) || "",
                n = e.mainDevice.getName();
            return {
                browseUri: r,
                browseUriData: o({
                    directoryUrl: r,
                    browseUri: "",
                    title: n,
                    history: []
                }),
                queueDirectoryKey: i(e.mainDevice)
            }
        }(e), function(e) {
            const t = l.getKeymappingForDevice(e.mainDevice);
            return {
                keys: d.getTemplate(t)(e),
                listBackParent: e.roomKey || g
            }
        }(e), t))
    }

    function o(e) {
        return new Buffer(JSON.stringify(e)).toString("base64")
    }

    function i(e) {
        return !(!e || ! function(e) {
            return e.hasCapability(h)
        }(e)) && e.getDirectoryByRole("QUEUE").getKey()
    }
    const s = r(1),
        a = r(13),
        c = r(7),
        u = r(4)("gui/scenario/fullscreenplayer.tpl.xml"),
        d = r(106),
        l = r(93),
        p = {
            renderGroupVolumeUI: !1
        },
        h = "neeo.feature.queuedirectory-support",
        g = "0";
    e.exports = {
        render: function(e) {
            return n(e).then(e => u(e))
        },
        match: function(e) {
            return e.mainDevice.hasCapability("neeo.feature.player-fullscreen")
        }
    }
}, function(e, t, r) {// Function 410 if optionalscreens and render dynamicscenario
    "use strict";

    function n(e, t, r) {
        const n = s.buildOptionalScreens(t, r);
        if (n) {
            const t = s.getUpdatedPowerKeyMapping(r);
            e.overridePowerKeyboardMapping(t)
        }
        return n
    }
    const o = r(167),
        i = r(168),
        s = r(425);
    e.exports = {
        render: function(e, t, r) {
            if (!e || !e.slides) return;
            if (!t) throw new Error("dynamicScenario: missing scenarioData");
            if (!t.scenarioKey) throw new Error("dynamicScenario: missing id (scenarioKey)");
            const s = o.buildNewNavigationStack(t.scenarioKey);
            e.slides.forEach(e => {
                s.addScreens(i(e, t))
            }), s.setKeyboardMapping(e.keymapping);
            const a = n(s, e, t);
            if (r) return s.getStack();
            const c = s.build().render(t);
            return "\n\x3c!-- RECIPE " + t.type + " --\x3e\n" + c + a
        }
    }
}, function(e, t, r) {// Function 411 navigation-handler; manages screens through navigation-stack; _renderNextScreen
    "use strict";
    const n = r(164),
        o = r(16),
        i = e.exports = function(e, t, r) {
            this.navigationStack = e, this.currentPage = 0, this.keyboardRendered = !1, t && (this.keyboardMappingTemplate = t), r && (this.customPowerKeyboardMapping = r)
        };
    i.prototype._nextScreen = function() {
        this.currentPage++, this.currentPage >= this.navigationStack.length && (this.currentPage = 0)
    }, i.prototype._getPreviousEntry = function() {
        let e;
        return e = 1 > this.currentPage ? this.navigationStack.length - 1 : this.currentPage - 1, this.navigationStack[e]
    }, i.prototype._getNextEntry = function() {
        const e = (this.currentPage + 1) % this.navigationStack.length;
        return this.navigationStack[e]
    }, i.prototype._getCurrentEntry = function() {
        return this.navigationStack[this.currentPage]
    }, i.prototype.getNavigation = function() {
        const e = 1 + this.currentPage,
            t = this._getCurrentEntry().id;
        if (2 > this.navigationStack.length) return {
            currentPage: e,
            id: t,
            collection: "",
            onSlideLeft: "",
            onSlideRight: ""
        };
        const r = {
                currentPage: e,
                id: t,
                collection: e + "/" + this.navigationStack.length,
                onSlideLeft: this._getPreviousEntry().action,
                onSlideRight: this._getNextEntry().action.replace(",-1", ",1")
            },
            n = this.navigationStack.length;
        for (let e = 0; e < n; e++) r["pageReference" + e] = this.navigationStack[e].action.replace(",-1", ",0");
        return r
    };
    const s = /<key id="POWER" onRelease=".+?\/>/;
    i.prototype._renderKeyboardMapping = function(e) {
        const t = this.keyboardMappingTemplate(e);
        return this.customPowerKeyboardMapping ? t.replace(s, this.customPowerKeyboardMapping) : t
    }, i.prototype._renderNextScreen = function(e) {
        const t = this._getCurrentEntry();
        let r = o.clone(e);
        let i;
        return t.viewdata && (r = o.assign(r, t.viewdata)), r.navigation = this.getNavigation(), this.keyboardMappingTemplate && !this.keyboardRendered && (r.keys = this._renderKeyboardMapping(e)), i = o.isFunction(t.template) ? t.template(r) : n.render(t.template, r), this._nextScreen(), i
    }, i.prototype.render = function(e) {
        if (!e) throw new Error("DynamicScreens: missing globals");
        return this.navigationStack.reduce(t => t + this._renderNextScreen(e), "")
    }
}, function(e, t, r) {// Function 412 widget position 
    "use strict";
    const n = r(413),
        o = r(414),
        i = r(65),
        s = r(7),
        a = r(37).loadTr2File("gui/scenario/slide/slide-prefix.tpl.xml"),
        c = r(37).loadTr2File("gui/scenario/slide/slide-postfix.tpl.xml"),
        u = s.screen.height - s.header.height - s.topGrayStatusBar - s.bottomSliderDots,
        d = e.exports = function(e) {
            this.widgetStack = e, this._verticalCenteringOffset = this._getYOffset()
        };
    d.prototype._getYOffset = function() {
        if (0 === this.widgetStack.length) return 0;
        const e = n(this.widgetStack),
            t = Math.round((u - (e.startY + e.height)) / 2);
        return Math.max(t, 0)
    }, d.prototype._getWidgetPosition = function(e) {
        return {
            startX: e.startX,
            startY: e.startY + this._verticalCenteringOffset,
            width: e.width,
            height: e.height
        }
    }, d.prototype._convertToStackItem = function(e) {
        const t = o({}, e.viewdata);
        return t.widget = this._getWidgetPosition(e), {
            template: e.template,
            viewdata: t
        }
    }, d.prototype.render = function(e) {
        if (!e) throw new Error("DynamicSlide: missing globals");
        const t = this.widgetStack.map(e => this._convertToStackItem(e)),
            r = new i(t).render(e);
        return a + r + c
    }
}, function(e) {// Function 413 only contains  require("lodash/last")
    e.exports = require("lodash/last")
}, function(e) {// Function 414 only contains require("lodash/extend")
    e.exports = require("lodash/extend")
}, function(e, t, r) {// Function 415  renderPowerOff
    "use strict";

    function n(e) {
        return () => (t, r) => {
            const n = d.getDeviceActionPath(e, t);
            return r(d.getTr2TriggerActionCommand(n))
        }
    }

    function o(e, t) {
        return e.map(e => ({
            name: e.name,
            triggerDeviceAction: n(e),
            style: {
                width: t.width,
                height: t.height
            }
        }))
    }

    function i(e) {
        const t = {
            style: c.getManualPowerOffLayout(),
            children: e
        };
        return a(t), {
            hasMultipleButtons: 1 < e.length,
            deviceNames: s(e),
            powerOffButtons: t.children
        }
    }

    function s(e) {
        return e.reduce((t, r, n) => {
            const o = r.name;
            let i = "";
            return 1 < e.length && n === e.length - 1 ? i = " and " : 0 < n && (i = ", "), t + i + o
        }, "")
    }
    const a = r(53),
        c = r(28),
        u = r(4),
        d = r(13),
        l = u("gui/scenario/widgets/compatibility/manual-power-off.xml");
    t.renderPowerOff = function(e, t) {
        if (!e) throw new Error("manualPowerOff: missing widgetData");
        if (!t) throw new Error("manualPowerOff: missing scenarioData");
        const r = i(o(t.getManualPowerOffDevices(), t.powerOffStyle));
        return {
            template: l,
            height: c.screenHeightWithoutStatusBar,
            viewdata: r
        }
    }
}, function(e, t, r) {// Function 416 Render scenario and favorites
    "use strict";
    const n = r(65),
        o = r(4),
        i = r(28),
        s = o("gui/scenario/widgets/default/multislide-favorites.tpl.xml"),
        a = o("gui/scenario/widgets/default/favorite-empty.tpl.xml");
    t.renderFavorites = function(e) {
        if (!e) throw new Error("favorites: missing scenarioData");
        if (!e.favorites || !Array.isArray(e.favorites)) throw new Error("favorites: missing or invalid scenarioData.favorites");
        const t = e.favoriteStyle;
        if (!t) throw new Error("favorites: missing favoriteStyle");
        if (!t.entriesPerPage) throw new Error("favorites: missing favoriteStyle.entriesPerPage");
        const r = new n,
            o = e.favorites;
        if (0 === o.length) return r.addTemplate(a), r.getStack();
        const c = i.useProUI(),
            u = t.entriesPerPage,
            d = o.length;
        let l = u - d % u;
        l === u && (l = 0);
        const p = d + l;
        0 != d % 3 && (o[d - 1].rowCloseTag = !1);
        for (let e = 0; e < l; e++) o.push({
            rowOpenTag: 0 == (d + e) % 3,
            rowCloseTag: 2 == (d + e) % 3 || e === p - 1,
            name: "",
            image: "",
            triggerUri: "",
            isCustom: !1,
            isPadding: !0
        });
        for (let e = function(e, t) {
                return 0 === e.length ? 1 : Math.ceil(e.length / t)
            }(o, u); 0 < e;) {
            const n = Object.assign({}, t);
            Object.assign(n, {
                useProUI: c,
                favoritesPerPage: o.splice(0, u)
            }), r.addTemplate(s, n), e--
        }
        return r.getStack()
    }
}, function(e, t, r) {// Function 417 Render Inputs
    "use strict";

    function n() {
        return function() {
            return (e, t) => {
                const r = u.getMacroTriggerUrl(this);
                return t(u.getTr2TriggerActionCommand(r))
            }
        }
    }

    function o(e, t) {
        const r = e.map(e => (e.style = t.element, e)),
            n = {
                style: t,
                children: r
            };
        return s(n), n.children
    }
    const i = r(29),
        s = r(53),
        a = r(65),
        c = r(4),
        u = r(13),
        d = r(4)("gui/scenario/widgets/default/multislide-inputs.tpl.xml"),
        l = c("gui/scenario/widgets/default/inputs-empty.tpl.xml");
    t.renderInputs = function(e, t, r) {
        if (!e) throw new Error("inputs: missing globals");
        if (!e.macros || !Array.isArray(e.macros)) throw new Error("inputs: missing or invalid globals.inputs");
        const s = new a;
        let c = i(t.data.widget.macros);
        if (0 === c.length) return s.addTemplate(l), s.getStack();
        c = c.map(e => (e.triggerMacroAction = n(), e));
        const u = t.data.widget.maxInputsPerSlide;
        for (let e = function(e, t) {
                return 0 === e.length ? 1 : Math.ceil(e.length / t)
            }(c, u); 0 < e;) {
            const t = o(c.splice(0, u), r.style);
            s.addTemplate(d, {
                macrosArray: t
            }), e--
        }
        return s.getStack()
    }
}, function(e, t, r) {// Function 418 Render Widgets
    "use strict";

    function n(e, t) {
        const r = u.buildNewWidgetStack(),
            n = t.data.widget.shortcuts;
        return function(e) {
            const t = {
                style: l.getShortcutLayout(),
                children: e
            };
            return a(t), t.children
        }(s(e.projectRepo, n)).forEach(t => {
            if (t.isWidget) try {
                const n = function(e, t) {
                    t.macroExist = t.projectRepo.getListOfDeviceMacroNames(e.deviceKey);
                    const r = v(e, t);
                    if (r.slides) throw new Error("shortcuts: multislide shortcuts not supported");
                    return r.width = e.style.width, r
                }(t, e);
                r.addWidget(n.template, t.layout, n.viewdata)
            } catch (r) {
                m.error("TR2_GUI_SHORTCUT_WIDGET_RENDERING_FAILED", {
                    widget: t.componentName,
                    message: r.message,
                    type: e.type,
                    error: r.stack
                })
            } else r.addWidget(E, t.layout, t)
        }), r.renderScreens(e)
    }

    function o(e) {
        const t = e.data.component,
            r = t && t.label,
            n = t && t.name,
            o = e.data.widget && e.data.widget.label,
            i = t ? t.deviceName : "";
        return {
            shortcutName: (r || n || o).toUpperCase(),
            deviceName: i && i.toUpperCase(),
            shortcutIcon: t ? h(t.icon, "shortcut") : ""
        }
    }

    function i(e, t, r) {
        if ("neeo.default.shortcuts" === e.name) throw new Error("shortcuts: shortcuts cannot be nested as shortcuts.");
        let n;
        const i = I(e.name);
        i && i.height && (n = i.height);
        const s = o(e);
        if (s.isWidget = !0, s.name = e.name, s.style = {
                width: t,
                height: n
            }, e.name === y) return s;
        s.deviceKey = r.key, s.label = e.data.customLabel || e.data.widget.label;
        return s.triggerAction = (() => (t, n) => {
            const o = d.getShortcutActionPath(e, t, r);
            return n(d.getTr2TriggerActionCommand(o))
        }), s
    }

    function s(e, t) {
        if (!p.shortcutStyle.button) throw new Error("shortcuts: missing globals.shortcutStyle.button");
        if (!p.shortcutStyle.slider) throw new Error("shortcuts: missing globals.shortcutStyle.slider");
        if (!p.shortcutStyle.switch) throw new Error("shortcuts: missing globals.shortcutStyle.switch");
        const r = p.shortcutStyle,
            n = p.screen.width;
        return t.map(t => {
            const s = t.data.component;
            let a = s ? s.componentType : "widget";
            t.name === y && (a = e.SHORTCUT_TYPE_GAP);
            const c = s ? s.deviceKey : t.data.widget.deviceKey,
                u = e.getDeviceByKey(c);
            return a === e.SHORTCUT_TYPE_WIDGET ? i(t, n, u) : a === e.SHORTCUT_TYPE_GAP ? function(e, t) {
                const r = o(e);
                return r.isGap = !0, r.style = {
                    width: t.gap.width,
                    height: t.elementHeight
                }, r
            }(t, r) : a === e.SHORTCUT_TYPE_BUTTON ? function(e, t) {
                const r = e.data.component,
                    n = o(e);
                return n.isButton = !0, n.style = {
                    width: t.button.width,
                    height: t.elementHeight
                }, n.triggerUri = d.getShortcutTriggerUrl(r), n
            }(t, r) : a === e.SHORTCUT_TYPE_SWITCH ? function(e, t, r) {
                const n = o(e);
                if (n.isSwitch = !0, n.style = {
                        width: t.switch.width,
                        height: t.elementHeight,
                        alignItems: "center"
                    }, n.onOff = {
                        style: {
                            width: t.switch.imageWidth,
                            height: t.switch.imageHeight,
                            marginTop: t.switch.marginTop,
                            alignItems: "center"
                        }
                    }, n.label = {
                        style: {
                            width: t.switch.width,
                            height: t.switch.labelHeight,
                            marginTop: t.switch.labelMarginTop
                        }
                    }, n.deviceNameLabel = {
                        style: {
                            width: t.switch.width,
                            height: t.switch.labelHeight,
                            marginTop: t.switch.deviceNameLabelMarginTop
                        }
                    }, n.children = [n.onOff, n.label, n.deviceNameLabel], r && r.getSwitches() && 0 < r.getSwitches().length) {
                    const e = r.getSwitches()[0];
                    n.actionUrl = d.getSwitchUrlRoomKey(r, e), n.id = e.sensor.getKey()
                }
                return n
            }(t, r, u) : a === e.SHORTCUT_TYPE_SLIDER ? function(e, t, r, n) {
                const i = o(e);
                if (i.isSlider = !0, i.style = {
                        width: n,
                        height: t.elementHeight,
                        alignItems: "center",
                        flexDirection: "column"
                    }, i.scrollbar = {
                        style: {
                            width: t.slider.width,
                            height: 4,
                            marginTop: 20
                        }
                    }, i.label = {
                        style: {
                            width: t.slider.width,
                            height: t.slider.labelHeight,
                            marginTop: t.slider.labelMarginTop
                        }
                    }, i.deviceNameLabel = {
                        style: {
                            width: t.slider.width,
                            height: t.slider.labelHeight,
                            marginTop: t.slider.deviceNameLabelMarginTop
                        }
                    }, i.children = [i.scrollbar, i.label, i.deviceNameLabel], r && r.getSliders() && 0 < r.getSliders().length) {
                    const t = e.data.component,
                        n = r.getSliders().find(e => e.key === t.key);
                    i.actionUrl = d.getSliderUrlRoomKey(r, n), i.id = n.sensor.getKey(), i.min = n.getMinValue(), i.max = n.getMaxValue()
                }
                return i
            }(t, r, u, n) : a === e.SHORTCUT_TYPE_TEXTLABEL ? function(e, t) {
                const r = e.data.component,
                    n = o(e);
                return n.isTextlabel = !0, n.style = {
                    width: t.textlabel.width,
                    height: t.elementHeight
                }, n.id = r.key, n
            }(t, r) : a === e.SHORTCUT_TYPE_IMAGEURL ? function(e, t, r) {
                const n = o(e);
                n.isImageurl = !0;
                const i = e.data.component,
                    s = r.getComponentByKey(i.key),
                    a = s && s.size ? s.size : "large",
                    c = t.imageurl[a];
                return n.style = c, n.id = i.key, n
            }(t, r, u) : a === e.SHORTCUT_TYPE_DIRECTORY ? function(e, t) {
                const r = e.data.component,
                    n = o(e);
                return n.isDirectory = !0, n.style = {
                    width: t.button.width,
                    height: t.elementHeight
                }, n.screenId = r.key, n
            }(t, r) : o(t)
        }).filter(T)
    }
    const a = r(53),
        c = r(107),
        u = r(419),
        d = r(13),
        l = r(28),
        p = r(7),
        h = r(35),
        g = r(4),
        m = r(0)("tr2-shortcuts"),
        f = g("gui/scenario/widgets/default/shortcut-empty.tpl.xml"),
        E = g("gui/scenario/widgets/default/shortcut-basic.tpl.xml"),
        y = "neeo.default.component.gap",
        _ = 650;
    let v, T, I;
    e.exports = {
        getShortcutView: s,
        setWidgetFilter: function(e) {
            T = (t => !t.isWidget || e(t))
        },
        setWidgetGetter: function(e) {
            I = e
        },
        setWidgetRender: function(e) {
            v = e
        },
        renderShortcuts: function(e, t) {
            if (!t) throw new Error("shortcuts: missing widget");
            if (!e.shortcutStyle) throw new Error("shortcuts: missing scenarioData.shortcutStyle");
            return t.data && t.data.widget && t.data.widget.shortcuts && 0 < t.data.widget.shortcuts.length ? n(e, t) : function(e) {
                const t = c.buildNewWidgetStack();
                return t.addWidget(f, _), t.renderScreens(e)
            }(e)
        }
    }
}, function(e, t, r) {// Function 419 tr2-DynamicSlideFactory"
    "use strict";
    const n = r(0)("tr2-DynamicSlideFactory"),
        o = r(7),
        i = o.screen.height - o.header.height - o.topGrayStatusBar - o.bottomSliderDots,
        s = r(420);
    class a {
        constructor() {
            this.slideStack = [], this.startNewSlide()
        }
        _build() {
            return this.slideStack.filter(e => 0 < e.length).map(e => new s(e))
        }
        renderScreens(e) {
            return this._build().map(t => ({
                template: t.render(e)
            }))
        }
        startNewSlide() {
            this.slideStack.push([])
        }
        _addWidget(e) {
            this.slideStack[this.slideStack.length - 1].push(e)
        }
        addWidget(e, t, r = {}) {
            if (!e) throw new Error("ManualSlideFactory: missing widgetTemplate");
            if (!t) throw new Error("ManualSlideFactory: missing layout");
            t.height > i && n.warn("Widget exceeding content height:", t.height), this._addWidget({
                template: e,
                layout: t,
                viewdata: r
            })
        }
    }
    e.exports = a, e.exports.buildNewWidgetStack = function() {
        return new a
    }
}, function(e, t, r) {// Function 420 Render Manualslide
    "use strict";
    const n = r(65),
        o = r(37).loadTr2File("gui/scenario/slide/slide-prefix.tpl.xml"),
        i = r(37).loadTr2File("gui/scenario/slide/slide-postfix.tpl.xml");
    e.exports = class {
        constructor(e) {
            this.widgetStack = e
        }
        _getWidgetPosition(e) {
            return {
                startX: e.layout.left,
                startY: e.layout.top,
                width: e.layout.width,
                height: e.layout.height
            }
        }
        _convertToStackItem(e) {
            const t = Object.assign({}, e.viewdata);
            return t.widget = this._getWidgetPosition(e), {
                template: e.template,
                viewdata: t
            }
        }
        render(e) {
            if (!e) throw new Error("ManualSlide: missing globals");
            const t = this.widgetStack.map(e => this._convertToStackItem(e)),
                r = new n(t).render(e);
            return o + r + i
        }
    }
}, function(e, t, r) {// Function 421 Render slider and switch?
    "use strict";

    function n(e, t) {
        const r = e.getDevice(t.data.widget.deviceKey),
            n = {
                device: r
            };
        return t.data.widget.name === a ? (n.slider = r.getSliderByName(t.data.widget.componentName), n.onOff = r.getSwitchByName(t.data.widget.attachedSwitchComponentName), n) : (t.data.widget.name === c && (n.onOff = r.getSwitchByName(t.data.widget.componentName)), n)
    }
    const o = r(170),
        i = r(107),
        s = r(4)("gui/scenario/widgets/default/light.xml"),
        a = "neeo.default.component.slider",
        c = "neeo.default.component.switch";
    e.exports = {
        renderLights: function(e, t) {
            if (!e) throw new Error("lights: missing globals");
            if (!t) throw new Error("lights: missing widgetData");
            const r = i.buildNewWidgetStack();
            return (t.data && t.data.widget && t.data.widget.lights || []).map(t => n(e, t)).forEach(t => {
                const n = o.getLightViewData(t.device, t.onOff, t.slider, e),
                    i = o.styleWithFlexbox(n);
                r.addWidget(s, e.lightStyle.elementHeight, void 0, i)
            }), r.renderScreens(e)
        }
    }
}, function(e) {// Function 422contains only require("lodash/first")
    e.exports = require("lodash/first")
}, function(e, t, r) {// Function 423 Render widgets/macros
    "use strict";
    const n = r(4),
        o = r(7),
        i = n("gui/scenario/widgets/default/button-grid.xml"),
        s = o.screen.width,
        a = 195;
    e.exports = {
        render: function(e) {
            if (!e || !e.data || !e.data.widget) throw new Error("button-grid: invalid widget data");
            const t = function(e, t) {
                return Object.values(e).reduce((e, r) => {
                    const n = e[e.length - 1];
                    return n.length < t ? n.push(r) : e.push([r]), e
                }, [
                    []
                ]).filter(e => 0 < e.length)
            }(e.data.widget.macros || {}, 2).map((e, t) => {
                const r = function(e) {
                    return Math.floor((s - e * a) / 2)
                }(e.length);
                return {
                    rowHeight: 130 * t,
                    macros: e.map((e, t) => ({
                        x: r + t * a,
                        macroname: e.name,
                        label: e.label
                    }))
                }
            });
            return {
                template: i,
                height: 130 * t.length,
                viewdata: {
                    rows: t
                }
            }
        }
    }
}, function(e, t, r) {// Function 424 Build&convert WidgetData
    "use strict";

    function n(e, t) {
        return function() {
            return (r, n) => {
                const o = i.getActionPath(e, r) + (t ? "&repeat=true" : "");
                return n(i.getTr2TriggerActionCommand(o))
            }
        }
    }
    const o = r(6)("cp6:lib:tr2:xmlgenerate:gui:scenarios:widgets:widgetData"),
        i = r(13),
        s = r(35);
    t.buildWidgetData = function(e, t) {
        if (!e || !e.data) return void o("no widget data found");
        const r = e.data.scenarioKey,
            i = t.getScenarioByKey(r),
            a = i ? i.getType() : "Generic Scenario";
        return {
            widgetScenarioIcon: s.getWithoutActiveTouchColor(a),
            triggerWidgetActionRepeat: n(i, !0),
            triggerWidgetAction: n(i, !1)
        }
    };
    t.convertWidgetData = function(e) {
        if (!e || !e.data || !e.data.widget) return o("no widget data found"), e;
        const t = e.data.widget.deviceName;
        return t && t.length > 10 ? (o("shorten devicename"), e.data.widget.shortDeviceName = t.slice(0, 8) + "...") : e.data.widget.shortDeviceName = t, e
    }
}, function(e, t, r) {// Function 425 Build Poweroff slide
    "use strict";

    function n(e) {
        return e.scenarioKey + "-PWROFF"
    }
    const o = r(167),
        i = r(168);
    t.buildOptionalScreens = function(e, t) {
        const r = ! function(e) {
            return e && e.powerOffSlides && 0 < e.powerOffSlides.length
        }(e);
        if (!t || r) return "";
        const s = n(t),
            a = o.buildNewNavigationStack(s);
        return e.powerOffSlides.forEach(e => {
            a.addScreens(i(e, t))
        }), a.build().render(t)
    }, t.getUpdatedPowerKeyMapping = function(e) {
        if (!e) return "";
        return '<key id="POWER" onRelease="ChangeScreen(\'' + n(e) + "',1)\" onLongPress=\"ShowPopup('PowerOffConfirm')\"/>"
    }
}, function(e, t, r) {// Function 426 removeSlidesDuplicatingHardwareButtons
    "use strict";
    const n = r(169);
    e.exports = {
        removeSlidesDuplicatingHardwareButtons: function(e) {
            if (e && e.slides) {
                const t = function(e) {
                        return e.filter(e => e.every(n.isWidgetSupportedAndNotKeymapped))
                    }(e.slides).map(e => (function(e) {
                        return e.filter(n.isWidgetSupported)
                    })(e)).filter(e => 0 < e.length),
                    r = e.slides.length - t.length;
                return {
                    slides: t,
                    powerOffSlides: e.powerOffSlides,
                    keymapping: e.keymapping,
                    footer: e.footer,
                    removedSlides: r
                }
            }
        }
    }
}, function(e, t, r) {// Function 427 getFavorites
    "use strict";

    function n(e, t) {
        return function() {
            return function(r, n) {
                const o = c.getActionPath(e, r) + (t ? "&repeat=true" : "");
                return n(c.getTr2TriggerActionCommand(o))
            }
        }
    }

    function o(e, t, r) {
        const n = {
                height: r.imageHeight,
                width: r.imageWidth
            },
            o = t.getMainDevice();
        return o.getFavorites().map((r, i, s) => ({
            rowOpenTag: 0 == i % 3,
            rowCloseTag: 2 == i % 3 || i === s.length - 1,
            name: r.getChannelName(),
            isCustom: !0 === r.channel.custom,
            image: e.getImageUrlPath(r.getLogoURL(), n),
            triggerUri: c.getFavoriteUrl(t, o, i)
        }))
    }
    const i = r(28),
        s = r(7),
        a = r(35),
        c = r(13),
        u = r(66);
    t.buildScenarioData = function(e, t) {
        const r = i.getFavoriteStyle();
        return {
            header: s.header,
            screen: s.screen,
            navBackIcon: s.navBackIcon,
            touchActiveColor: s.touchActiveColor,
            touchStaticColor: s.touchStaticColor,
            touchActiveBackgroundColor: s.touchActiveBackgroundColor,
            touchBackgroundColor: s.touchBackgroundColor,
            defaultFrameColor: s.defaultFrameColor,
            icon: s.icon,
            favoriteStyle: r,
            lightStyle: s.lightStyle,
            shortcutStyle: s.shortcutStyle,
            powerOffStyle: s.powerOffStyle,
            assumptionStyle: s.assumptionStyle,
            popupStyle: s.popupStyle,
            fontsize: s.fontsize,
            mainDevice: e.getMainDevice(),
            type: e.getType(),
            scenarioKey: e.getKey(),
            scenarioIcon: a(e ? e.getIcon() : "Generic Scenario"),
            name: e.getName().toUpperCase(),
            neeoEncodedScenarioName: u.getTr2FunctionText(e.getName().toUpperCase()),
            roomName: e.getRoomName(),
            roomKey: e.getRoomKey(),
            favorites: o(t, e, r),
            macros: t.getInputViewData(e),
            macroExist: t.getListOfMaindeviceMacroNames(e),
            launchRecipeUrl: c.getRecipeTypeExecuteUrl(e, t.RECIPE_TYPE_LAUNCH),
            poweroffRecipeUrl: c.getRecipeTypeExecuteUrl(e, t.RECIPE_TYPE_POWEROFF),
            triggerActionRepeat: n(e, !0),
            triggerAction: n(e, !1),
            getDevice: e => t.getDeviceByKey(e),
            buildShortcutUrl: t => c.getShortcutUrl(e, t),
            buildActionUrl: t => c.getActionKeyUrl(e, t),
            buildActionUrlByName: t => c.getActionUrl(e, t),
            getManualPowerOffDevices: () => t.getManualPowerOffDevices(e),
            hasPowerInfoDevices: t.hasPowerInfoDevices(e),
            assumptionModePopupKey: "assumption_mode_" + e.getKey(),
            projectRepo: t
        }
    }
}, function(e, t, r) {// Function 428 get and render Directories (getAllDirectories)
    "use strict";
    AllFunctions(0)("Function 428").verbose(" get and render Directories")

    const n = r(429);
    e.exports = function(e) {
        return e.getAllDirectories().reduce((e, t) => e + function(e) {
            return n.render(e)
        }(t), "")
    }
}, function(e, t, r) {// Function 429 Render directoryscreen
    "use strict";
    AllFunctions(0)("Function 429").verbose("Render directoryscreen")

    function n(e) {
        return new Buffer(JSON.stringify(e)).toString("base64")
    }
    const o = r(13),
        i = r(7),
        s = r(4)("gui/devices/directory-screen.tpl.xml");
    e.exports = {
        render: function(e) {
            const t = {
                key: e.key,
                label: e.label,
                loadUri: o.getDirectoryBrowseUrl(e.key),
                roomKey: e.device.roomKey,
                styling: i.fastListScreen,
                directoryData: n({
                    browseIdentifier: ""
                })
            };
            return s(t)
        }
    }
}, function(e, t, r) {// Function 430 TR2-GUIDATA; 
    "use strict";
    AllFunctions(0)("Function 430").verbose("TR2-GUIDATA")
    const n = r(1),
        o = r(0)("TR2-GUIDATA"),
        i = r(4)("gui.tpl.data.xml"),
        s = r(7),
        a = r(431),
        c = r(440),
        u = r(441),
        d = r(442);
    e.exports = function(e, t) {
        return e && "function" == typeof e.getVisibleScenarios ? a.getRenderedData(s, e).then(r => {
            const n = {
                scenarios: r,
                home: c(e),
                pushAction: u.render(t),
                version: d(e)
            };
            return i(n)
        }) : (o.warn("TR2_GUIDATA_INVALID_PROJECT"), n.reject(new Error("TR2_GUIDATA_INVALID_PROJECT")))
    }, e.exports.watch = function(e, t) {
        return e && "function" == typeof e.getVisibleScenarios ? (a.watch(s, e, t), c.watch(e, t), void u.watch(e, t)) : void o.warn("TR2_GUIDATA_INVALID_PROJECT")
    }
}, function(e, t, r) {// Function 431 TR2-GUIDATA; getRenderedData and watch
    "use strict";
    AllFunctions(0)("Function 431").verbose("TR2-GUIDATA; getRenderedData and watch")

    function n(e, t, r) {
        const n = f[e.getType()];
        return n ? n(t, e, r).catch(t => {
            const r = "TR2_XMLDATA_GENERATION_FAILED_" + e.getType();
            u.increaseCounter(r),
                function(e) {
                    return e && e.message && y.some(t => e.message.includes(t))
                }(t) ? c.debug(r, t.message) : c.error(r, t.message)
        }) : void 0
    }

    function o(e, t) {
        return s.resolve(e).timeout(m).catch(e => {
            if (e && e.message === _) {
                const e = "tr2-guidataxml-timeout_" + t.getType();
                u.increaseCounter(e)
            } else e ? c.error("GUI_DATA_FETCH_FAILED", {
                msg: e.message,
                scenario: t.getType()
            }) : u.increaseCounter("tr2-guidataxml-unknown-error")
        })
    }

    function i(e) {
        return e.filter(e => e)
    }
    const s = r(1),
        a = r(94),
        c = r(0)("tr2-guidata"),
        u = r(3),
        d = r(432),
        l = r(433),
        p = r(434),
        h = r(435),
        g = r(436),
        m = 8e3,
        f = {
            SONOS: r(438),
            LIGHT: r(439)
        },
        E = [d, l, g, p, h],
        y = ["500", "ESOCKETTIMEDOUT"],
        _ = "operation timed out";
    e.exports = {
        getRenderedData: function(e, t) {
            const r = t.getVisibleScenarios().reduce((r, i) => {
                const s = n(i, e, t);
                s && r.push(o(s, i));
                const a = function(e, t, r) {
                    return E.map(n => n.getRenderedData(t, e, r))
                }(i, e, t);
                return a && a.forEach(e => {
                    r.push(o(e, i))
                }), r
            }, []);
            return s.all(r).then(i).then(e => a(e).join(""))
        },
        watch: function(e, t, r) {
            t.getVisibleScenarios().forEach(n => {
                try {
                    (function(e, t, r, n) {
                        E.forEach(o => {
                            o.watch(r, t, e, n)
                        })
                    })(r, n, e, t),
                    function(e, t, r, n) {
                        const o = f[t.getType()];
                        o && o.watch(r, t, e, n)
                    }(r, n, e, t)
                } catch (e) {
                    c.error("TR2_XMLDATA_WATCH", e.message)
                }
            })
        }
    }
}, function(e, t, r) {// Function 432 gui_data/textlabel.tpl.data.xml
    "use strict";

    function n(e) {
        return !0 === e.isLabelVisible || void 0 === e.isLabelVisible
    }

    function o(e, t) {
        return t.getShortcuts(i).map(t => (function(e, t) {
            const r = t.getDeviceByKey(e.deviceKey);
            if (r) {
                const t = r.getTextlabelByKey(e.componentKey);
                return t ? {
                    componentKey: t.getKey(),
                    eventKey: t.sensor.eventKey,
                    sensor: t.sensor,
                    isLabelVisible: t.isLabelVisible
                } : void 0
            }
        })(t, e)).filter(e => e)
    }

    function i(e) {
        return e.componentType === u.COMPONENT_TEXTLABEL_TYPE_NAME
    }

    function s(e, t, r) {
        return d({
            textlabels: {
                deviceid: t,
                value: r
            }
        })
    }

    function a(e, t) {
        return (t ? `${e.component.sensor.label}: ${e.value}` : `${e.value}`).toUpperCase()
    }
    const c = r(1),
        u = r(8),
        d = r(4)("gui_data/textlabel.tpl.data.xml"),
        l = r(67);
    e.exports = {
        getRenderedData: function(e, t, r) {
            const i = o(r, t);
            return i && 0 !== i.length ? c.all(i.map(e => l.getSensorValue(e).then(t => {
                const r = a(t, n(e));
                return s(0, t.component.componentKey, r)
            }))) : c.resolve()
        },
        watch: function(e, t, r, i) {
            o(i, t).forEach(e => {
                r._on(e.eventKey, t => {
                    const o = n(e),
                        i = a({
                            component: e,
                            value: t
                        }, o);
                    r.sendPushUpdate(e.eventKey, s(0, e.componentKey, i))
                })
            })
        }
    }
}, function(e, t, r) {// Function 433 gui_data/imageurl.tpl.data.xml
    "use strict";

    function n(e) {
        return e.componentType === a.COMPONENT_IMAGEURL_TYPE_NAME
    }

    function o(e, t) {
        return t.getShortcuts(n).map(t => {
            const r = e.getDeviceByKey(t.deviceKey);
            if (r) {
                const e = r.getImageUrlByKey(t.componentKey);
                if (e) {
                    const t = e.sensor.eventKey,
                        r = e.size;
                    return {
                        componentKey: e.getKey(),
                        eventKey: t,
                        size: r,
                        sensor: e.sensor
                    }
                }
            }
        }).filter(e => e)
    }

    function i(e, t, r, n, o) {
        const i = t.shortcutStyle.imageurl[n],
            s = {
                width: i.width,
                height: i.height
            },
            a = e.getLazyCoverImageUrlPath(o, s);
        return c({
            imageurls: {
                deviceid: r,
                value: a
            }
        })
    }
    const s = r(1),
        a = r(8),
        c = r(4)("gui_data/imageurl.tpl.data.xml"),
        u = r(67);
    e.exports = {
        getRenderedData: function(e, t, r) {
            const n = o(r, t);
            return n && 0 !== n.length ? s.all(n.map(u.getSensorValue)).then(t => t.map(t => i(r, e, t.component.componentKey, t.component.size, t.value))) : s.resolve()
        },
        watch: function(e, t, r, n) {
            o(n, t).forEach(t => {
                r._on(t.eventKey, o => {
                    r.sendPushUpdate(t.eventKey, i(n, e, t.componentKey, t.size, o))
                })
            })
        }
    }
}, function(e, t, r) {// Function 434 gui_data/slider.tpl.data.xml
    "use strict";

    function n(e, t) {
        return t.getShortcuts(t => (function(e, t) {
            const r = t.getDeviceByKey(e.deviceKey),
                n = r && r.details && r.details.type;
            return e.componentType === s.COMPONENT_SLIDER_TYPE_NAME && "LIGHT" !== n
        })(t, e)).map(t => (function(e, t) {
            const r = t.getDeviceByKey(e.deviceKey);
            if (r) {
                const t = r.getSliderByKey(e.componentKey);
                return t ? {
                    eventKey: t.sensor.eventKey,
                    sensor: t.sensor
                } : void 0
            }
        })(t, e)).filter(e => e)
    }

    function o(e, t) {
        return a({
            sliders: {
                sensorKey: e,
                value: t
            }
        })
    }
    const i = r(1),
        s = r(8),
        a = r(4)("gui_data/slider.tpl.data.xml"),
        c = r(67);
    e.exports = {
        getRenderedData: function(e, t, r) {
            const s = n(r, t);
            return s && 0 !== s.length ? i.all(s.map(e => c.getSensorValue(e).then(t => {
                if (void 0 !== t.value) {
                    return o(e.sensor.key, t.value)
                }
            }))) : i.resolve()
        },
        watch: function(e, t, r, i) {
            n(i, t).forEach(e => {
                r._on(e.eventKey, t => {
                    const n = e.sensor.key;
                    r.sendPushUpdate(e.eventKey, o(n, t))
                })
            })
        }
    }
}, function(e, t, r) {// Function 435 gui_data/switch.tpl.data.xml
    "use strict";

    function n(e, t) {
        return t.getShortcuts(t => (function(e, t) {
            const r = t.getDeviceByKey(e.deviceKey),
                n = r && r.details && r.details.type;
            return e.componentType === s.COMPONENT_SWITCH_TYPE_NAME && "LIGHT" !== n
        })(t, e)).map(t => (function(e, t) {
            const r = t.getDeviceByKey(e.deviceKey);
            if (r) {
                const t = r.getSwitchByKey(e.componentKey);
                return t ? {
                    eventKey: t.sensor.eventKey,
                    sensor: t.sensor
                } : void 0
            }
        })(t, e)).filter(e => e)
    }

    function o(e, t) {
        return a({
            switches: {
                sensorKey: e,
                value: t
            }
        })
    }
    const i = r(1),
        s = r(8),
        a = r(4)("gui_data/switch.tpl.data.xml"),
        c = r(67);
    e.exports = {
        getRenderedData: function(e, t, r) {
            const s = n(r, t);
            return s && 0 !== s.length ? i.all(s.map(e => c.getSensorValue(e).then(t => {
                if (void 0 !== t.value) {
                    return o(e.sensor.key, t.value)
                }
            }))) : i.resolve()
        },
        watch: function(e, t, r, i) {
            n(i, t).forEach(e => {
                r._on(e.eventKey, t => {
                    const n = e.sensor.key;
                    r.sendPushUpdate(e.eventKey, o(n, t))
                })
            })
        }
    }
}, function(e, t, r) {// Function 436 gui_data/fullscreenplayer.tpl.data.xml
    "use strict";

    function n(e) {
        const t = e.getMainDevice(),
            r = e => t.getSensorByName(e),
            n = {
                title: "TITLE_SENSOR",
                description: "DESCRIPTION_SENSOR",
                coverArt: "COVER_ART_SENSOR",
                isPlaying: "PLAYING_SENSOR",
                volume: "VOLUME_SENSOR",
                groupVolume: "GROUP_VOLUME_SENSOR"
            };
        return Object.keys(n).reduce((e, t) => {
            const o = r(n[t]);
            return o && (e[t] = o), e
        }, {})
    }

    function o(e, t, r) {
        const {
            title: n,
            description: o,
            coverArt: i,
            isPlaying: s,
            volume: a,
            groupVolume: c
        } = t, d = function(e, t) {
            if (!e.title.value.toLowerCase().includes("sexy and i know it")) return e;
            const r = Object.assign({}, e);
            return r.title.value = "Sandro from NEEO", r.coverArtURI.value = p.getUrlPath("LOCAL:neeo-guy", {
                resize: !0,
                width: t.musicCoverImage.width,
                height: t.musicCoverImage.height,
                imageFormat: "lz4-black"
            }), r.coverArtURISmall.value = p.getUrlPath("LOCAL:neeo-guy", {
                resize: !0,
                width: t.musicCoverImageSmall.width,
                height: t.musicCoverImageSmall.height,
                imageFormat: "lz4-black"
            }), r
        }({
            title: n,
            description: o,
            coverArtURI: {
                key: i.key,
                value: r.getLazyCoverImageUrlPath(i.value, e.musicCoverImage)
            },
            coverArtURISmall: {
                key: i.key + "_small",
                value: r.getLazyCoverImageUrlPath(i.value, e.musicCoverImageSmall)
            },
            volume: a,
            groupVolume: c,
            isPlaying: s
        }, e);
        return u(d)
    }

    function i(e) {
        const t = n(e),
            r = Object.keys(t).map(e => {
                const r = t[e];
                return r.getCachedValue().then(t => ({
                    sensorKey: e,
                    key: r.key,
                    value: t
                }))
            });
        return c.all(r).then(e => e.reduce((e, t) => (e[t.sensorKey] = {
            key: t.key,
            value: t.value
        }, e), {}))
    }

    function s(e) {
        const t = e.getMainDevice();
        return t && t.hasCapability(h)
    }

    function a(e, t, r, n, s) {
        r._on(e.eventKey, () => {
            i(t).then(t => {
                r.sendPushUpdate(e.eventKey, o(s, t, n))
            })
        })
    }
    const c = r(1),
        u = r(4)("gui_data/fullscreenplayer.tpl.data.xml"),
        d = r(0)("tr2-guidata-fullscreenplayer"),
        l = r(3),
        p = r(68),
        h = "neeo.feature.player-fullscreen";
    e.exports = {
        getRenderedData: function(e, t, r) {
            return s(t) ? i(t).then(t => o(e, t, r)).catch(e => (d.debug("FAILED_TO_GET_FULLSCREENPLAYER_SENSORS", e.message), l.increaseCounter("FAILED_TO_GET_FULLSCREENPLAYER_SENSORS"), "")) : c.resolve("")
        },
        watch: function(e, t, r, o) {
            try {
                if (!s(t)) return;
                const i = n(t);
                Object.keys(i).forEach(n => {
                    a(i[n], t, r, o, e)
                })
            } catch (e) {
                d.error("FAILED_TO_WATCH_FULLSCREENPLAYER_SENSORS", e.message)
            }
        }
    }
}, function(e, t, r) {// Function 437 imagecache
    "use strict";
    const n = r(0)("imagecache",e,t),
        o = r(160),
        i = e.exports = function() {
            n.debug("init"), this.systeminfo = r(12), this.resourceprefetcher = r(104)
        };
    i.IMAGEFORMAT_PNG = "png", i.IMAGEFORMAT_JPG = "jpg", i.IMAGEFORMAT_LZ4 = "lz4", i.IMAGEFORMAT_LZ4_BLACK = "lz4-black", i.prototype.getUrl = function(e, t) {
        return this.systeminfo.getBaseUrl() + this.getUrlPath(e, t)
    }, i.prototype.getUrlPath = function(e, t) {
        return process.nextTick(() => {
            this.resourceprefetcher.prefetchImage(e, t)
        }), o.getUrlPath(e, t)
    }, i.prototype.getLazyUrlPath = function(e, t) {
        return process.nextTick(() => {
            this.resourceprefetcher.prefetchImage(e, t)
        }), o.getLazyUrlPath(e, t)
    }, i.prototype.hasImageContent = function(e) {
        return !(!e || !e.length || /%2F$/.test(e))
    }, i.prototype.flushImageCache = function(e) {
        AllFunctions(0)("Function 437").verbose("flushImageCache, calling r(372).clear") 
            r(372).clear();
    }    
}, function(e, t, r) {// Function 438 Route: gui_data/sonos.tpl.data.xml
    "use strict";

    function n(e) {
        return new s((t, r) => {
            const n = e.getMainDevice();
            if (!n) return r(new Error("SONOS_DEVICE_NOT_FOUND"));
            const o = n.getSensorByName("PLAYERSTATE_SENSOR");
            return o ? void t(o) : r(new Error("SONOS_PLAYERSTATE_SENSOR_NOT_FOUND"))
        })
    }

    function o(e) {
        c.debug("FAILED_TO_GET_PLAYERSTATE_SENSOR", e.message), u.increaseCounter("FAILED_TO_GET_PLAYERSTATE_SENSOR")
    }

    function i(e, t, r, n) {
        const o = r.currentTrack || {},
            i = r.nextTrack || {},
            s = {
                scenarioKey: t,
                title: o.title,
                artist: "radio" === o.type ? o.streamInfo : o.artist,
                albumArtURI: n.getLazyCoverImageUrlPath(o.absoluteAlbumArtURI, e.musicCoverImage),
                albumArtURISmall: n.getLazyCoverImageUrlPath(o.absoluteAlbumArtURI, e.musicCoverImageSmall),
                nextAlbumArtURI: n.getLazyCoverImageUrlPath(i.absoluteAlbumArtURI, e.musicCoverImage),
                volume: r.volume || 10,
                isPlaying: "PLAYING" === r.playerState
            };
        return function(e, t) {
            e.title.toLowerCase().includes("sexy and i know it") && (e.artist = "Sandro from NEEO", e.albumArtURI = d.getUrlPath("LOCAL:neeo-guy", {
                resize: !0,
                width: t.musicCoverImage.width,
                height: t.musicCoverImage.height,
                imageFormat: "lz4-black"
            }))
        }(s, e), a(s)
    }
    const s = r(1),
        a = r(4)("gui_data/sonos.tpl.data.xml"),
        c = r(0)("tr2-guidata-sonos"),
        u = r(3),
        d = r(68);
    e.exports = function(e, t, r) {
        return n(t).then(e => e.getCachedValue()).then(n => {
            const o = t.getKey();
            return i(e, o, n, r)
        }).catch(e => (o(e), ""))
    }, e.exports.watch = function(e, t, r, s) {
        return n(t).then(n => {
            const o = t.getKey();
            r._on(n.eventKey, t => {
                c.debug("GUIDATA_WATCH_UPDATE_SONOS"), r.sendPushUpdate(n.eventKey, i(e, o, t, s))
            })
        }).catch(o)
    }
}, function(e, t, r) {// Function 439 Route: gui_data/light.tpl.data.xml
    "use strict";

    function n(e) {
        return e.getDevices().reduce((e, t) => (t.getSwitches().map(e => e.sensor).filter(e => e).forEach(t => e.push({
            deviceid: t.getKey(),
            onOff: !0,
            sensor: t
        })), t.getSliders().map(e => e.sensor).filter(e => e).forEach(t => e.push({
            deviceid: t.getKey(),
            dimmer: !0,
            sensor: t
        })), e), [])
    }

    function o(e, t) {
        return a({
            lights: t
        })
    }
    const i = r(1),
        s = r(0)("tr2-guidata-light"),
        a = r(4)("gui_data/light.tpl.data.xml"),
        c = r(67);
    e.exports = function(e, t) {
        return new i(e => {
            e(n(t))
        }).then(e => (function(e) {
            return i.all(e.map(c.getSensorValue)).then(t => {
                if (t.length === e.length) {
                    let r = 0;
                    e.forEach(e => {
                        e.value = t[r++].value
                    })
                } else s.warn("TR2_LIGHTDATA_GEN_INCONSISTENT_VALUES", {
                    value: t.length,
                    sensor: e.length
                });
                return e
            }).then(e => e.filter(e => e.value || !1 === e.value))
        })(e)).then(e => o(0, e))
    }, e.exports.watch = function(e, t, r) {
        n(t).forEach(e => {
            r._on(e.sensor.eventKey, t => {
                e.value = t, r.sendPushUpdate(e.sensor.eventKey, o(0, [e]))
            })
        })
    }
}, function(e, t, r) {// Function 440 gui_data/home.tpl.data.xml
    "use strict";

    function n(e, t) {
        if (e) {
            const r = d.activenow.height,
                n = d.screen.width,
                o = function(e, t) {
                    const r = e.getLaunchRecipeFromScenario(t);
                    return r ? e.getScenarioKeyOfRecipeControlstep(r) : t.key
                }(t, e),
                i = function(e, t) {
                    if (0 < e.getManualPowerOffDevices(t).length) return `ChangeScreen('${t.key+l}',1)`;
                    const r = e.getPowerOffRecipeFromScenario(t),
                        n = a.getRecipeExecuteUrl(r);
                    return a.getTr2TriggerActionCommand(n)
                }(t, e),
                c = {
                    id: o,
                    style: {
                        width: n,
                        height: r,
                        flexWrap: "wrap",
                        marginBottom: 2
                    },
                    touchActiveColor: d.touchActiveColor,
                    left: {
                        icon: s(e.getIcon().toLowerCase(), "Generic Scenario"),
                        style: {
                            width: d.activenow.lefticonwidth,
                            height: r
                        }
                    },
                    center: {
                        label: e.name,
                        style: {
                            width: d.activenow.textwidth,
                            height: r
                        }
                    },
                    right: {
                        icon: s("PowerOff"),
                        style: {
                            width: d.activenow.rightpowerofficon,
                            height: r
                        },
                        activateScenario: i
                    }
                };
            return c.children = [c.left, c.center, c.right], c
        }
    }

    function o(e) {
        const t = function(e) {
            const t = d.activenow.height,
                r = d.screen.width,
                o = c.getActiveNowLayout(r, t);
            return o.scenarios = o.children = e.getActiveScenarios().splice(0, 3).map(t => n(t, e)), i(o), o
        }(e);
        return u(t)
    }
    const i = r(53),
        s = r(35),
        a = r(13),
        c = r(28),
        u = r(4)("gui_data/home.tpl.data.xml"),
        d = r(7),
        l = "-PWROFF";
    e.exports = o, e.exports.watch = function(e, t) {
        t._on(e.NOTIFICATION_ACTIVE_NOW_CHANGED, () => {
            t.sendPushUpdate(e.NOTIFICATION_ACTIVE_NOW_CHANGED, o(e))
        })
    }
}, function(e, t, r) {// Function 441 TR2-GUIDATA-PUSHACTION
    "use strict";
    AllFunctions(0)("Function 441").verbose("TR2-GUIDATA-PUSHACTION")

    function n(e) {
        return i({
            actionId: e.actionId,
            callback: e.callback
        })
    }
    const o = r(0)("TR2-GUIDATA-PUSHACTION"),
        i = r(4)("pushaction.tpl.xml");
    e.exports = {
        render: function(e) {
            const t = e.getCurrentPushAction();
            if (t) return n(t)
        },
        watch: function(e, t) {
            t._on("PUSH_ACTION_ADDED", r => {
                o.debug("SENDING_PUSH_ACTION", r), t.sendPushUpdate(e.NOTIFICATION_ACTIVE_NOW_CHANGED, n(r))
            })
        }
    }
}, function(e, t, r) {// Function 442 version.tpl.xml
    "use strict";
    const n = r(4)("version.tpl.xml");
    e.exports = function(e) {
        const t = e.getVersion(),
            r = e.getSystemInformation().brainHostname.toLowerCase(),
            o = {
                expectedTrVersion: t.tr2version,
                projectId: t.projectId,
                brainHostname: r
            };
        return n(o)
    }
}, function(e, t, r) {// Function 443 TR2_REQUESTHANDLER; setForwardingHosts, handleCoAPRequest, handleWifiRequest
    "use strict";
    AllFunctions(0)("Function 443").verbose("TR2_REQUESTHANDLER; setForwardingHosts, handleCoAPRequest, handleWifiRequest")

    function n(e, t, r, n) {
        const o = d.resolve(e, t),
            i = m.urlMatchInfraredTrigger(o, r);
        return i ? function(e, t, r) {
            AllFunctions(0)("Function 443").verbose("TR2_REQUESTHANDLER; simple infraredgtrigger deteced");
            s.debug("simple trigger detected", {
                query: r
            });
            const [, n, o] = e, i = r.name, a = {
                repeat: /true/.test(r.repeat),
                generic: /true/.test(r.generic)
            };
            return f.getRepository().then(e => {
                AllFunctions(0)("Function 443").verbose("TR2_REQUESTHANDLER; triggerAction");
//                AllFunctions(0)("Function 443 TR2_REQUESTHANDLER; e",e);
                AllFunctions(0)("Function 443").verbose(" TR2_REQUESTHANDLER; n",n);
                AllFunctions(0)("Function 443").verbose(" TR2_REQUESTHANDLER; o",o);
                AllFunctions(0)("Function 443").verbose(" TR2_REQUESTHANDLER; i",i);
                AllFunctions(0)("Function 443").verbose(" TR2_REQUESTHANDLER; a",a);

                e.triggerAction(n, o, i, a)
            })
        }(i, 0, r) : (s.debug("request", {
            uri: o,
            query: r,
            sendNoResponse: n,
            pool: E
        }), a({
            uri: o,
            resolveWithFullResponse: !0,
            qs: r,
            timeout: y
        }).then(e => {
            if (!e || n) return;
            let t = p.answerForTr2(o, e);
            return t = p.transliterationToAscii(t), s.debug("payload response:", t), t
        }));AllFunctions(0)("Function 443").verbose("TR2_REQUESTHANDLER; request ");
    }

    function o(e) {
        if (!e) throw new Error("INVALID_LONG_URL");
        const t = e.split("/")[1];
        return t in _ ? _[t] : _.defaultHost
    }

    function i(e, t, r) {
        h.updateRecievedData(!1), s.error(e, t), r(new Error(e))
    }
    const s = r(0)("TR2_REQUESTHANDLER"),
        a = r(17),
        c = r(1),
        u = r(40),
        d = r(78),
        l = r(32),
        p = r(64),
        h = r(444),
        g = r(445),
        m = r(447),
        f = r(448),
        E = new u.Agent({
            maxSockets: 1,
            keepAlive: !0,
            keepAliveMsecs: 8e3
        }),
        y = 8e3;
    let _ = {
            defaultHost: ""
        },
        v = "";
    e.exports = {
        setForwardingHosts: function(e) {
            if (!e || !e.defaultHost || !e.tr2firmware) throw new Error("requesthandler.setForwardingHosts - missing parameter");
            _ = e
        },
        handleCoAPRequest: function(e, t) {
            AllFunctions(0)("Function 443").verbose("handleCoAPRequest")
            return function(e) {
                return e._packet && e._packet.messageId ? v !== e._packet.messageId && (v = e._packet.messageId, !0) : (s.debug("COAP_NO_MESSAGEID_IN_PACKET"), !1)
            }(e) ? new c((r, a) => {
                try {AllFunctions(0)("Function 443").verbose(" handleCoAPRequest goOn")
                    s.debug("handle coap request:", {
                        shortUrl: t
                    }), e.on("timeout", e => {
                        i("COAP_PROXY_TIMEOUT", e.message, a)
                    }).on("error", e => {
                        i("COAP_SERVER_ERROR", e.message, a)
                    });
                    AllFunctions(0)("Function 443").verbose(" expandRequestUrl t",t)
                    const c = g.expandRequestUrl(t);
                    n(o(c.longUrl), c.longUrl, c.query, c.sendNoResponse).then(t => {
                        const n = t ? t.length : 0;
                        return n > 65535 ? (s.warn("COAP_REQUEST_MAXIMAL_SIZE_EXCEEDED", {
                            size: n
                        }), a(new Error("MAXIMAL_COAP_DATA_PACKAGE_SIZE_EXCEEDED"))) : (h.updateRecievedData(!0), h.updateSentData(n), e.end(t), void r(t))
                    }).catch(t => {
                        h.updateRecievedData(!1), e.statusCode = "4.04", e.end();
                        const r = l.extractInfo(t);
                        s.debug("RP_QUERY_FAILED", r.message), a(new Error("RP_QUERY_FAILED"))
                    })
                } catch (t) {
                    e.end(), i("COAP_SERVER_ERROR", {
                        msg: t.message,
                        param: t.param
                    }, a)
                }
            }) : (s.debug("COAP_DUPLICATE_MESSAGE"), h.updateDuplicateCoapMessages(), e.end(), c.reject(new Error("COAP_DUPLICATE_MESSAGE")))
        },
        handleWifiRequest: function(e) {
            AllFunctions(0)("Function 443").verbose(" handleWifiRequest")
            return new c((t, r) => {
                s.debug("handle wifi request:", {
                    url: e
                });
                const i = g.expandRequestUrl(e);
                n(o(i.longUrl), i.longUrl, i.query, i.sendNoResponse).then(e => {
                    const r = e ? e.length : 0;
                    h.updateWifiRecievedData(!0), h.updateWifiSentData(!0, r), t(e)
                }).catch(e => {
                    h.updateWifiRecievedData(!1);
                    const t = l.extractInfo(e);
                    s.error("WIFI_REQUEST_FAILED", t.message), r(new Error("WIFI_REQUEST_FAILED"))
                })
            })
        }
    }
}, function(e, t, r) {// Function 444 TR2-maintain counters for send/received data
    "use strict";
    const n = r(3);
    t.updateSentData = function(e) {
        n.increaseCounter("tr2-coap-send-data-succeeded"), e && n.increaseCounter("tr2-coap-send-bytes", e)
    }, t.updateWifiSentData = function(e, t) {
        e ? n.increaseCounter("tr2-wifi-send-data-succeeded") : n.increaseCounter("tr2-wifi-send-data-failed"), t && n.increaseCounter("tr2-wifi-send-bytes", t)
    }, t.updateRecievedData = function(e, t) {
        e ? n.increaseCounter("tr2-coap-recieve-data-succeeded") : n.increaseCounter("tr2-coap-recieve-data-failed"), t && n.increaseCounter("tr2-coap-recieve-bytes", t)
    }, t.updateWifiRecievedData = function(e, t) {
        e ? n.increaseCounter("tr2-wifi-recieve-data-succeeded") : n.increaseCounter("tr2-wifi-recieve-data-failed"), t && n.increaseCounter("tr2-wifi-recieve-bytes", t)
    }, t.updateDuplicateCoapMessages = function() {
        n.increaseCounter("tr2-coap-recieve-duplicate-packets")
    }
}, function(e, t, r) {// Function 445 expandRequestUrl
    "use strict";
    const n = r(78),
        o = r(446),
        i = r(105);
    e.exports = {
        expandRequestUrl: function(e) {
            const t = n.parse(e),
                r = s(t),
                i = o.parse(t.query),
                a = o.parse(r.query),
                c = void 0 === a.a,
                u = Object.assign(i, a);
            return delete u.a, {
                longUrl: r.pathname,
                query: u,
                sendNoResponse: c
            }
        }
    };
    const s = function(e) {
        if (!e || !e.pathname || "/" === e.pathname) throw new Error("INVALID_SHORT_URL");
        let t = e.pathname;
        "/" === t[0] && (t = t.slice(1));
        const r = i.longUrl(t);
        return r ? n.parse(r) : e
    }
}, function(e) {// Function 446 exports = require("querystring")
    e.exports = require("querystring")
}, function(e, t, r) {// Function 447 urlMatchInfraredTrigger
    "use strict";
    const n = r(2).port,
        o = new RegExp("^http://127.0.0.1:" + n + "/projects/home/rooms/([\\d]+)/scenarios/([\\d]+)/trigger$");
    e.exports = {
        urlMatchInfraredTrigger: function(e, t) {
            return t && t.name ? t.value || !1 === t.value ? null : e.match(o) : null
        }
    }
}, function(e, t, r) {// Function 448 getRepository
    "use strict";
    const n = r(27),
        o = r(171);
    e.exports.getRepository = function() {
        AllFunctions(0)("Function 448").verbose("Loading projectfile")
        return n.get().then(e => {
            const t = o.convert(e);
            if (!t || 0 === Object.keys(t).length) throw new Error("CONVERTED_REPO_INVALID");
            return t
        })
    }
}, function(e, t, r) {// Function 449 cp6:lib:tr2:coap:server
    "use strict";
    AllFunctions(0)("Function 449").verbose("")

    const n = r(162),
        o = r(69),
        i = r(11),
        s = r(6)("cp6:lib:tr2:coap:server"),
        a = e.exports = function(e, t) {
            s("init %o", e), this.listeningPort = e.listeningPort, this.listeningHost = e.listeningHost, this.ipv6AddrOfLastMessage = "", this.requesthandler = t;
            const r = {
                ackTimeout: e.coapAckTimeoutSec,
                ackRandomFactor: e.coapRandomFactor,
                maxRetransmit: e.coapMaxRetransmit,
                maxLatency: e.coapMaxLatencySec,
                piggybackReplyMs: e.coapPiggybackReplyMs
            };
            this.coapOptions = {
                cacheSize: 8388608,
                type: "udp6",
                sendAcksForNonConfirmablePackets: !0 === e.coapSendAcksForNonConfirmablePackets
            }, n.updateTiming(r), s("CoAP max RTT in seconds:", n.parameters.maxRTT), s("CoAP max time in seconds from the first transmission (CON) to its last retransmission:", n.parameters.maxTransmitSpan), s("CoAP max waiting time (CON) in seconds until sender gives up:", n.parameters.maxTransmitWait)
        };
    i.inherits(a, o.EventEmitter), a.prototype.bind = function() {AllFunctions(0)("Function 449 i.inherits 1"),
        s("start coap server %o", this.coapOptions), this.coapServer = n.createServer(this.coapOptions), this.coapServer.on("request", (e, t) => {
            AllFunctions(0)("Function 449").verbose("i.request")
            this._handleCoAPMessage(e, t)
        }), this.coapServer.on("error", e => {
            AllFunctions(0)("Function 449").verbose(" i.error")
            this.emit("error", e)
        }), this.coapServer.listen(this.listeningPort, this.listeningHost, () => {
            AllFunctions(0)("Function 449").verbose(" listen")
            s("TR2_COAPSERVER_STARTED %o", {
                host: this.listeningHost,
                port: this.listeningPort
            }), this.emit("serverstarted")
        })
    }, a.prototype.close = function() {
        if (this.coapServer) try {
            this.coapServer.close()
        } catch (e) {}
    }, a.prototype._handleCoAPMessage = function(e, t) {
        AllFunctions(0)("Function 449").verbose(" Got message e",e.body,e.url)
        //AllFunctions(0)("Function 449").verbose("Got message t",t)
        if (!e || !t) return void this.emit("invalidrequest", e);
        if (!e.rsinfo || !e.rsinfo.address || "IPv6" !== e.rsinfo.family) return s("request from a non IPv6 Address, ignored"), void this.emit("invalidsender", e);
        this.ipv6AddrOfLastMessage !== e.rsinfo.address && (s("new IPv6 Address:", e.rsinfo.address), this.emit("ipv6coapaddress", e.rsinfo.address), this.ipv6AddrOfLastMessage = e.rsinfo.address);
        const r = e.url;
        AllFunctions(0)("Function 449").verbose("Passing message to requesthandler.handleCoAPRequest ")
        //AllFunctions(0)("Function 449").verbose("Got message t",t)

        this.requesthandler.handleCoAPRequest(t, r).catch(() => {})
    }
}, function(e, t, r) {// Function 450 r(451))(r(2).tr2udpserver)
    "use strict";
    AllFunctions(0)("Function 450").verbose("")
    const n = r(2),
        o = new(r(451))(n.tr2udpserver);
    e.exports = o
}, function(e, t, r) {// Function 451 tr2udpserver
    "use strict";
    AllFunctions(0)("Function 451").verbose("create udp4-socketserver (for tr2)")

    const n = r(452).createSocket("udp4"),
        o = r(69),
        i = r(11),
        s = r(0)("tr2udpserver"),
        a = e.exports = function(e) {
            s.debug("init", e), this.listeningPort = e.listeningPort, this.listeningHost = e.listeningHost
        };
    i.inherits(a, o.EventEmitter), a.prototype.bind = function() {
        s.debug("start udp server on port", this.listeningPort), n.bind(this.listeningPort, this.listeningHost), n.on("listening", () => {
            this.emit("serverstarted", n.address())
        }), 
        n.on("message", (e, t) => {
            AllFunctions(0)("Function 451").verbose("receive udp-message (e,t)",e,t)
 // Function 451 udp-message (e,t) <Buffer 31 30> { address: '192.168.0.52', family: 'IPv4', port: 64269, size: 2 }
            this.emit("udprequest", e, t)
        }),
//        n.on("emit", () => {
//            AllFunctions(0)("Function 451").verbose("emitting message")
//        }), 
        n.on("error", e => {
            this.emit("error", e)
        })
    }, a.prototype.close = function() {
        try {
            n.close()
        } catch (e) {}
    }
}, function(e) {// Function 452 exports = require("dgram")
    e.exports = require("dgram")
}, function(e, t, r) {// Function 453 TR2:DirectoryHandler
    "use strict";

    function n({
        projectAdapter: e,
        scenario: t,
        directoryKey: r,
        params: n
    }) {
        const i = e.getDirectoryByKey(r);
        if (!t || !i) return g.warn("TR2_LIST_INVALID_DIRECTORY", {
            directoryKey: r
        }), a.resolve(p.error("Sorry, the source for this list cannot be found."));
        const s = {
            browseUri: n.browseUri,
            offset: n.offset,
            limit: n.limit
        };
        return c.browse(i, s).then(e => o(e, n, t, i)).then(e => p(e)).catch(e => {
            g.error("TR2_LIST_BROWSE_ERROR", {
                message: e.message,
                directoryKey: r
            });
            const t = n.title ? n.title : "this";
            return p.errorWithReload(`Sorry, could not load ${t} list.`, "Check your network and try again.", n)
        })
    }

    function o(e, t, r, n) {
        return e.browseParams = t, e.items = function(e, t, r) {
            const n = r && "browse" !== r.directoryType ? "SEEK" : "PLAYNOW",
                o = s(t, n);
            return e.items && e.items instanceof Array && e.items.forEach(o), e.items
        }(e, r, n), n ? (e.collectionItem = function(e, t) {
            return s(t, "PLAYNOW", "playnow")(e.collectionItem), s(t, "PLAYSHUFFLE", "playshuffle")(e.collectionItem), e.collectionItem
        }(e, r), function(e, t, r) {
            const n = t.getMainDevice();
            if ("browse" === r.directoryType || !n) return e;
            const o = n.getSensorByName("PLAYERSTATE_SENSOR");
            return o ? o.getValue().then(r => (r && r.zonePlayMode && (e.showQueueButtons = !0, e.repeatActive = r.zonePlayMode.repeat, e.repeatToggle = i(t, "REPEAT TOGGLE"), e.shuffleActive = r.zonePlayMode.shuffle, e.shuffleToggle = i(t, "SHUFFLE TOGGLE"), e.clearQueueActive = e.items && 0 < e.items.length, e.clearQueue = i(t, "CLEAR QUEUE")), e)) : (g.warn("TR2_DIRECTORYHANDLER_NO_SENSOR_ERROR", {
                deviceName: n.getName(),
                scenarioName: t.getName()
            }), e)
        }(e, r, n)) : e
    }

    function i(e, t) {
        const r = e.getMainDevice(),
            n = r.getMacroByName(t),
            o = u.getMacroTriggerUrl({
                key: n.key,
                deviceKey: r.key,
                roomKey: r.roomKey
            });
        return {
            data: {
                actionUri: d.shortUrl(o)
            }
        }
    }

    function s(e, t, r = "actionUri") {
        const n = e.getMainDevice(),
            o = n.getSliderByName(t),
            i = u.getSliderUrl(e, n, o),
            s = d.shortUrl(i);
        return e => {
            if (e && e.data) {
                const t = e.data.tr2 || e.data.actionUri;
                e.data[r] = `${s}?value=${t}`
            } else if (e && e[0] && e[0].data) {
                const t = e[0].data.tr2 || e[0].data.actionUri;
                e[0].data[r] = `${s}?value=${t}`
            }
        }
    }
    const a = r(1),
        c = r(103),
        u = r(13),
        d = r(105),
        l = r(173),
        p = r(456),
        h = r(173),
        g = r(0)("TR2:DirectoryHandler");
    e.exports = {
        browseDirectory: function(e, t, r) {
            AllFunctions(0)("Function 453").verbose("browseDirectory")
    AllFunctions(0)("Function 453").verbose(" e",e)
    AllFunctions(0)("Function 453").verbose(" t",t)
    AllFunctions(0)("Function 453").verbose(" r",r)

            if (!r) return a.resolve(p.error("Sorry, this list cannot be loaded."));
            const o = e.getScenarioByDirectoryKey(t),
                i = o && o.getMainDevice();
            return i && i.capabilities && i.capabilities.includes("neeo.device.type.sonos") ? n({
                projectAdapter: e,
                scenario: o,
                directoryKey: t,
                params: r
            }) : function({
                projectAdapter: e,
                directoryKey: t,
                params: r
            }) {
                const n = e.getDirectoryByKey(t);
                if (!n) return g.warn("TR2_LIST_INVALID_DIRECTORY", {
                    directoryKey: t
                }), a.resolve(l.renderError("Sorry, the source for this list cannot be found."));
                const o = {
                    browseIdentifier: r.browseIdentifier,
                    offset: r.offset,
                    limit: r.limit,
                    history: r.history
                };
                return c.browse(n, o).then(e => l.render(e, n)).catch(e => {
                    g.error("TR2_LIST_BROWSE_ERROR", {
                        message: e.message,
                        directoryKey: t
                    });
                    const n = r.title ? r.title : "this";
                    return r.directoryKey = t, l.renderErrorWithReload(`Sorry, could not load ${n} list.`, "Check your network and try again.", r)
                })
            }({
                projectAdapter: e,
                directoryKey: t,
                params: r
            })
        },
        callAction: function(e, t, r = {}) {
            AllFunctions(0)("Function 453").verbose("callAction")
            const n = e.getDirectoryByKey(t);
            if (!n) return g.warn("TR2_LIST_INVALID_DIRECTORY", {
                directoryKey: t
            }), a.reject(new Error("TR2_LIST_INVALID_DIRECTORY"));
            const o = {
                actionIdentifier: r.actionIdentifier,
                history: r.history
            };
            return c.callAction(n, o).catch(e => {
                g.error("TR2_LIST_ACTION_ERROR", {
                    message: e.message,
                    directoryKey: t
                })
            })
        },
        getDeviceRootItems: function(e, t = {}) {
            AllFunctions(0)("Function 453").verbose("getDeviceRootItems")


            const r = t.deviceKey,
                n = e.getScenarioByDeviceKey(r),
                i = e.getDeviceByKey(r);
            if (!n || !i) return g.warn("TR2_LIST_INVALID_DEVICEKEY", {
                deviceKey: r
            }), a.resolve(p.error("Sorry, the device to browse cannot be found."));
            const s = {
                directoryUrl: t.directoryUrl,
                title: i.name,
                history: []
            };
            return i.getDirectoryRootItems().then(e => o(e, s, n)).then(e => {
                if (e.sdkDevice) {
                    const t = i.getDirectories().find(e => "ROOT" === e.role);
                    return h.render(e, t)
                }
                return p(e)
            }).catch(e => (function(e, t) {
                return g.error("TR2_LIST_ROOT_ERROR", {
                    message: e.message,
                    deviceKey: t.key
                }), p.errorWithReload(`Sorry, could not load items for your ${t.name}.`, "Make sure it is connected to your network.")
            })(e, i))
        }
    }
}, function(e, t, r) {// Function 454 cp6:lib:tr2:xmlgenerate:listFactory
    "use strict";
    AllFunctions(0)("Function 454").verbose("")

    function n(e) {
        return e && e.items && e.items.length ? e.items.reduce((t, r) => {
            const n = u.getViewData(r, e);
            return Array.isArray(n) ? t = t.concat(n) : (t.push(n), t)
        }, []) : [{
            isEmpty: !0,
            imageUri: l,
            defaultImage: l
        }]
    }

    function o(e) {
        if (!e._meta || !e._meta.next) return "";
        const t = e._meta.next,
            r = s(p, t.limit);
        return t.offset = Math.max(t.offset - r, 0), `next="${d.getPaginationAction(t,e)}"`
    }

    function i(e) {
        if (!e._meta || !e._meta.previous) return "";
        const t = e._meta.previous,
            r = s(p, t.limit, t.offset);
        return t.offset = s(t.offset + r, t.offset + e.total), 0 === r && (t.limit = c.listPageSize), `previous="${d.getPaginationAction(t,e)}"`
    }
    var s = Math.min;
    const a = r(6)("cp6:lib:tr2:xmlgenerate:listFactory"),
        c = r(2).tr2,
        u = r(455),
        d = r(174),
        l = "sonos-placeholder-small.png",
        p = 7;
    e.exports = {
        prepareViewData: function(e, t) {
//AllFunctions(0)("Function 454").verbose("prepareViewData: function(e, t) {");
//AllFunctions(0)("Function 454").verbose("e:",e);
            if (!e || !Array.isArray(e.items)) return a("invalid browsedata", e),
                function(e) {
                    return {
                        title: "",
                        parent: d.getParentBrowseAction(e),
                        optionalNextPage: "",
                        optionalPreviousPage: "",
                        isEmpty: !0,
                        items: n([])
                    }
                }(e);
            e.directoryKey = t && t.key;
            let r = e.title || "";
            !r && t && t.device && (r = t.device.name);
            const s = n(e);
            return {
                title: r,
                parent: d.getParentBrowseAction(e),
                optionalNextPage: o(e),
                optionalPreviousPage: i(e),
                isEmpty: 0 === e.items.length,
                items: s,
                listLength: e.totalMatchingItems,
                listOffset: e._meta && e._meta.current && e._meta.current.offset
            }
        }
    }
}, function(e, t, r) {// Function 455 getViewData for TR2 !!!!!
    "use strict";

    function n(e, t, r = "") {
        return {
            isElement: !0,
            title: a.getTr2VisibleText(e.title),
            description: a.getTr2VisibleText(e.label || e.description || ""),
            imageUri: s.getImage(e),
            onClick: t,
            icon: r,
            defaultImage: !1 === e.thumbnailUri ? "" : c
        }
    }
    const o = r(35),
        i = r(7),
        s = r(174),
        a = r(66),
        c = "sonos-placeholder-small.png",
        u = "sonos-placeholder-medium.jpg",
        d = 215,
        l = {
            1: i.screen.width - 20,
            2: (i.screen.width - 40) / 2,
            3: (i.screen.width - 80) / 3
        };
    e.exports = {
        getViewData: function(e, t) {
            AllFunctions(0)("Function 455").verbose("getViewData: e",e)
            return e ? e.isHeader ? function(e) {
                return {
                    isHeader: !0,
                    title: a.getTr2VisibleText(e.title)
                }
            }(e) : e.tiles ? function(e, t) {
                return e.tiles.map(e => ({
                    isTile: !0,
                    imageUri: s.getImage(e, d),
                    onClick: s.getTriggerAction(e, t),
                    defaultImage: u
                }))
            }(e, t) : e.buttons ? function(e, t) {
                const r = l[e.buttons.length];
                return e.buttons.map(e => {
                    const n = {
                        isButton: !0,
                        onClick: s.getTriggerAction(e, t),
                        width: r
                    };
                    return e.title && (n.title = a.getTr2VisibleText(e.title)), e.iconName && (n.iconName = o(e.iconName)), e.inverse ? (n.textColor = i.fastListScreen.textColor, n.activeTextColor = i.fastListScreen.buttonActiveBackgroundColor, n.backgroundColor = i.fastListScreen.backgroundColor, n.activeBackgroundColor = i.fastListScreen.buttonActiveBackgroundColor) : (n.textColor = i.fullScreenDarkPopup.textColor, n.activeTextColor = i.fullScreenDarkPopup.backgroundColor, n.backgroundColor = i.fullScreenDarkPopup.buttonColor, n.activeBackgroundColor = i.fullScreenDarkPopup.activeBackgroundColor), n
                })
            }(e, t) : e.isInfoItem ? function(e, t) {
                AllFunctions(0)("Function 455").verbose("We have an infoitem:, this is title,text,triggeraction",e.title,e.text,s.getTriggerAction(e, t))
                return {
                    isInfoItem: !0,
                    title: a.getTr2VisibleText(e.title),
                    text: a.getTr2FunctionText(e.text),
                    onClick: s.getTriggerAction(e, t)
                } 

            }(e, t) : e.actionIdentifier ? function(e, t) {
                const r = e.icon ? o.getWithoutActiveTouchColor(e.icon) : "";
                return n(e, s.getTriggerAction(e, t), r)
            }(e, t) : function(e, t) {
                return n(e, s.getBrowseAction(e, t), o.getWithoutActiveTouchColor("List Arrow Right"))
            }(e, t) : []
        }
    }
}, function(e, t, r) {// Function 456 prepareviewdata cp6:lib:tr2:xmlgenerate:listcontent
    "use strict";
    AllFunctions(0)("Function 456").verbose("")

    function n(e) {
        const t = Object.assign(s, e),
            r = a(t),
            n = i.transliterationToAscii(r);
        return o("TR2_LIST_XML_SIZE", n.length), n
    }
    const o = r(6)("cp6:lib:tr2:xmlgenerate:listcontent"),
        i = r(64),
        s = r(7),
        a = r(4)("listcontent.tpl.xml"),
        c = r(457);
    e.exports = function(e) {
        return n(c.prepareViewData(e))
    }, e.exports.error = function(e) {
        return n(c.prepareViewData({
            items: [{
                label: e,
                isQueueable: !1,
                isHeader: !0
            }],
            total: 1,
            browseParams: {}
        }))
    }, e.exports.errorWithReload = function(e, t = "", r = {}) {
        return n(c.prepareViewData({
            items: [{
                label: e,
                isQueueable: !1,
                isHeader: !0
            }, {
                title: "Press here to retry",
                label: t,
                isActionNode: !0,
                isQueueable: !1,
                thumbnailUri: !1,
                icon: "Reload",
                action: "ReloadList()"
            }],
            total: 1,
            browseParams: r
        }))
    }
}, function(e, t, r) {// Function 457 getviewdata cp6:lib:tr2:xmlgenerate:listFactory browse
    "use strict";
    AllFunctions(0)("Function 457").verbose("")
    function n(e, t) {
        return e.length ? e.map(e => l.getViewData(e, t)) : [{
            isEmpty: !0,
            imageUri: g,
            defaultImage: g
        }]
    }

    function o(e) {
        if (!e._meta || !e._meta.next) return "";
        const t = e._meta.next,
            r = s(m, t.limit);
        return t.offset = Math.max(t.offset - r, 0), `next="${p.getPaginationAction(t,e.browseParams)}"`
    }

    function i(e) {
        if (!e._meta || !e._meta.previous) return "";
        const t = e._meta.previous,
            r = s(m, t.limit, t.offset);
        return t.offset = s(t.offset + r, t.offset + e.total), 0 === r && (t.limit = d.listPageSize), `previous="${p.getPaginationAction(t,e.browseParams)}"`
    }
    var s = Math.min,
        a = Number.isFinite;
    const c = r(137),
        u = r(6)("cp6:lib:tr2:xmlgenerate:listFactory"),
        d = r(2).tr2,
        l = r(458),
        p = r(176),
        h = r(66),
        g = "sonos-placeholder-small.png",
        m = 7;
    e.exports = {
        prepareViewData: function(e) {
            AllFunctions(0)("In function 457").verbose("")

            if (!e || !Array.isArray(e.items)) return u("invalid browsedata", e),
                function(e) {
                    return {
                        title: "",
                        parent: p.getParentBrowseAction(e),
                        optionalNextPage: "",
                        optionalPreviousPage: "",
                        isEmpty: !0,
                        items: n([]),
                        hasCollectionItem: !1
                    }
                }(e);
            const t = e.browseParams.title || "",
                r = h.getTr2VisibleTextFromFunctionEncoded(t),
                s = n(e.items, e.browseParams),
                d = e.collectionItem,
                l = !c(d),
                g = e._meta && e._meta.totalMatches || e.total,
                m = {
                    title: r,
                    parent: p.getParentBrowseAction(e.browseParams),
                    optionalNextPage: o(e),
                    optionalPreviousPage: i(e),
                    isEmpty: 0 === e.items.length,
                    showQueueButtons: !!e.showQueueButtons,
                    items: s,
                    listLength: g,
                    listOffset: e._meta && e._meta.current && e._meta.current.offset
                };
            return m.hasCollectionItem = !m.isEmpty && l, m.hasCollectionItem && (m.playAll = p.getTriggerAction(d, "playnow"), m.shuffleAll = p.getTriggerAction(d, "playshuffle"), a(m.listLength) && (m.listLength += 2)), m.showQueueButtons && (m.clearQueueActive = e.clearQueueActive, m.clearQueue = p.getTriggerAction(e.clearQueue), m.repeatToggle = p.getTriggerAction(e.repeatToggle), m.repeatActive = e.repeatActive, m.shuffleToggle = p.getTriggerAction(e.shuffleToggle), m.shuffleActive = e.shuffleActive, a(m.listLength) && (m.listLength += 3)), m
        }
    }
}, function(e, t, r) {// Function 458 getviewdata
    "use strict";
    AllFunctions(0)("Function 458").verbose("")
    function n(e, t, r = "") {
        return {
            isElement: !0,
            text: e.title,
            description: e.label || "",
            imageUri: i.getImage(e),
            onClick: t,
            icon: r,
            defaultImage: !1 === e.thumbnailUri ? "" : s
        }
    }
    const o = r(35),
        i = r(176),
        s = "sonos-placeholder-small.png",
        a = "sonos-placeholder-medium.jpg",
        c = 215;
    e.exports = {
        getViewData: function(e, t) {
            AllFunctions(0)("Function 458").verbose("getViewData")
            return e ? e.isHeader ? function(e) {
                return {
                    isHeader: !0,
                    text: e.label
                }
            }(e) : e.isPanel ? function(e) {
                return {
                    isPanel: !0,
                    imageUri: i.getImage(e, c),
                    onClick: i.getTriggerAction(e),
                    defaultImage: a
                }
            }(e) : e.isInfoItem ? function(e) {AllFunctions(0)("Function 458").verbose("isInfoitem ",e)
                return n(e, i.getInfoAction(e), o.getWithoutActiveTouchColor("Information"))
            }(e) : e.isActionNode ? function(e) {
                const t = e.icon ? o.getWithoutActiveTouchColor(e.icon) : "";
                return n(e, e.action ? e.action : i.getTriggerAction(e), t)
            }(e) : function(e, t) {
                return n(e, i.getBrowseAction(e, t), o.getWithoutActiveTouchColor("List Arrow Right"))
            }(e, t) : []
        }
    }
}, function(e, t, r) {// Function 459 TR2_LIST_PARAMETER
    "use strict";
    AllFunctions(0)("Function 459").verbose("")
    var n = Number.isInteger;
    const o = r(0)("TR2_LIST_PARAMETER"),
        i = r(2).tr2.listPageSize;
    e.exports = {
        parseEncodedListParameter: function(e) {
            const t = function(e) {
                try {
                    const t = new Buffer(e, "base64").toString("utf8");
                    return JSON.parse(t)
                } catch (t) {
                    o.error("DECODE_FAILED", {
                        message: t.message,
                        rawString: e
                    })
                }
            }(e);
            return t ? {
                directoryUrl: t.directoryUrl,
                browseUri: t.browseUri ? decodeURIComponent(t.browseUri) : t.browseUri,
                browseIdentifier: t.browseIdentifier ? decodeURIComponent(t.browseIdentifier) : "",
                offset: n(t.offset) ? t.offset : 0,
                limit: n(t.limit) ? t.limit : i,
                title: t.title ? decodeURIComponent(t.title) : void 0,
                history: t.history || []
            } : void 0
        }
    }
}, function(e, t, r) {// Function 460 Looks like main route
    AllFunctions(0)("Function 460").verbose("")
    "use strict";
    const n = r(5), // exports = require("express")
        o = r(177),
        i = r(461),
        s = r(71),
        a = r(0)("app"),
        c = r(462),
        u = n(),
        d = "development" === u.get("env");
    u.disable("x-powered-by"), u.set("json replacer", c.replacer);
    const l = r(142);                                           // Locale-definitions
    u.use(l.init), u.use(function(e, t, r) {

        AllFunctions(0)("Function 460").verbose("express.use init",e.method,e.url)

        "OPTIONS" === e.method ? t.send() : r()
    }), u.use(o.json({
        limit: "2mb"
    })), u.use(s.generateDecryptMiddleware(s.decrypt)), u.use(i());
    const p = n.Router();
    u.use("/v1", p), u.use("/", p);
    const h = {
        api: r(463),
        account: r(464),
        wifi: r(467),
        project: r(108),
        channel: r(468),
        devicespec: r(469),
        devicetest: r(470),
        macro: r(471),
        slider: r(474),
        sensor: r(475),
        switcher: r(476),
        room: r(85),
        scenario: r(179),
        recipe: r(479),
        shortcut: r(480),
        device: r(39),
        directory: r(481),
        procedure: r(482),
        favorites: r(483),
        notification: r(485),
        irblaster: r(486),
        deviceadapter: r(487),
        directoryadapter: r(488),
        firmware: r(489),
        tr2: r(490),
        systeminfo: r(493),
        statistics: r(494),
        shorturl: r(495),
        curl: r(496),
        dui: r(497),
        forwardactions: r(498),
        guilogger: r(499),
        crypto: r(500),
        neeoremote: r(501),
        events: r(502),
        homekit: r(503),
        fst: r(504)
    };
    p.use("/api", h.api), p.use("/systeminfo", h.systeminfo), p.use("/firmware", h.firmware), p.use("/notifications",  h.notification), p.use("/account", h.account), p.use("/wifi", h.wifi), p.use("/projects", h.project), p.use("/devicespecs", h.devicespec), p.use("/deviceadapter", h.deviceadapter), p.use("/devicetest", h.devicetest), p.use("/directoryadapter", h.directoryadapter), p.use("/channels", h.channel), p.use("/irblaster", h.irblaster), p.use("/statistics", h.statistics), p.use("/shorturl", h.shorturl), p.use("/curl", h.curl), p.use("/forwardactions", h.forwardactions), p.use("/guilogger", h.guilogger), p.use("/secure", h.crypto), p.use("/neeoremote", h.neeoremote), p.use("/events", h.events), p.use("/homekit", h.homekit), p.use("/fst", h.fst), d && 
        p.use("/dui", h.dui), p.post("/cp6/metaMessageHandler", (req,res) => {res.json(metaMessageHandler(req,res,a))}),
        u.use(function(e, t, r) 
        {AllFunctions(0)("Function 460").verbose("last resort u.use, d:",d )
        const n = new Error("Not Found");
        n.status = 404, r(n)
    }), d  ? (u.use(function(e, t, r, n) { // changed this to test debug functionality
        AllFunctions(0)("Function 460").verbose("u,.use EXPREESS NEEDS NEXT PARAMETER",n)
        n || a.debug("EXPRESS_NEEDS_NEXT_PARAMETER_WEBPACK_TOO"), a.error("SERVER_ERROR", {
            url: t.url,
            method: t.method,
            error: e.message,
            stack: e.stack
        }), r.status(e.status || 500), r.json({
            message: e.message,
            error: e.message,
            stack: e.stack
        })
    }), a.debug("mount TOUCHBUTTON DEVELOPMENT route"), p.get("/touchbutton", function(e, t) {
        AllFunctions(0)("Function 460").verbose("mount TOUCHBUTTON DEVELOPMENT route")
        r(10).send({
            type: "touchbuttonpressed",
            date: new Date
        }), t.json({
            msg: "Touchbutton press simulated..."
        })
    }),      
    a.debug("mount LED IDENT route"), p.get("/ledupdatefw", function(e, t) {
        AllFunctions(0)("Function 460").verbose("mount LED IDENT route")
        r(31).ledFirmwareUpdate(), t.json({
            msg: "firmware update led..."
        })
    })) : u.use(function(e, t, r, n) {
        AllFunctions(0)("Function 460").verbose("generic u.use t.url",t.url )
        //AllFunctions(0)("Function 460").verbose(" generic u.use n",n)
        AllFunctions(0)("Function 460").verbose(" generic u.use e",e)
        const o = !e.alreadyLogged && e.message && -1 === e.message.indexOf("Internal Server Error");
        n || a.debug("EXPRESS_NEEDS_NEXT_PARAMETER_WEBPACK_TOO"), o && a.error("INVALID_ROUTE", {
            url: t.url,
            method: t.method,
            error: e.message
        }), r.status(e.status || 500), r.header("Access-Control-Allow-Origin", "*"), r.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-NEEO-Secure"), r.json({
            message: e.message,
            error: {}
        })
    }), e.exports = u
}, function(e) {// Function 461 exports = require("express-partial-response")
    e.exports = require("express-partial-response")
}, function(e, t, r) {// Function 462 replacer
    "use strict";
    const n = r(150);
    e.exports = {
        replacer: function(e, t) {
            return t && n(t.toSafeJSON) ? t.toSafeJSON() : t
        }
    }
}, function(e, t, r) {// Function 463 Router: API 
    "use strict";
    AllFunctions(0)("Express router for API calls").verbose("");    
    const n = r(1),
        o = r(5).Router(),
        i = r(90),
        s = r(12),
        a = r(14),
        p = r(68),
        f = r(437),
        g = r(17),
        h = r(40),
        x = r(506),
        y = r(79),
        z = r(376),
        r376 = r(376),
        q = r(27);
    o.get("/recipes", (e, t) => {
        AllFunctions(0)("API-recipes").verbose("");
        const r = s.getBaseUrl();
        i.getAllRecipes(r).then(e => {
            t.json(e)
        })
    }), o.get("/activeRecipes", (e, t) => {
        i.getActiveRecipesKeys().then(e => {
            t.json(e)
        })
    }), o.get("/sdkadapter", (e, t) => {
        const r = i.getAllRegisteredSdkAdapters();
        t.json(r)
    }), o.post("/sdkadaptercleanup", (e, t) => {
        i.sdkAdapterCleanup().then(() => {
            t.json({
                result: !0
            })
        })
    }), o.post("/registerSdkDeviceAdapter", (e, t, r) => {
        (function(e) {
            return new n(t => {
                a(e, {
                    name: {
                        presence: !0
                    },
                    baseUrl: {
                        presence: !0
                    }
                }), t(e)
            })
        })(e.body).then(i.registerSdkDeviceAdapter).then(() => t.json({
            success: !0
        })).catch(r)
    }), o.post("/unregisterSdkDeviceAdapter", (e, t, r) => {
        (function(e) {
            return new n(t => {
                a(e, {
                    name: {
                        presence: !0
                    }
                }), t(e)
            })
        })(e.body).then(i.unregisterSdkDeviceAdapter).then(() => t.json({
            success: !0
        })).catch(r)
    }), o.get("/notificationkey/:adaptername/:devicename/:deviceid", (e, t, r) => {
        const n = e.params.adaptername,
            o = e.params.devicename,
            s = e.params.deviceid;
        i.getNotificationKeys(n, o, s).then(e => t.json(e)).catch(r)
    }), o.get("/subscriptions/:sourceName/:adapterName", (e, t, r) => {
        const n = e.params.sourceName,
            o = e.params.adapterName;
        i.getAdapterSubscriptions(n, o).then(e => t.json(e)).catch(r)
    }), o.get("/currchannel/:deviceid", (e, t, r) => { 
        const n = e.params.deviceid;
        let channelInfo = x.getCurrChannel(n)
            t.json(channelInfo)
            
    }), o.get("/isthisfavorite/:devicename", (e,t,r) => { // calling r(506) // ###
            const n = e.params.devicename;
            //const w = q(6)("cp6:lib:smartener:projectrepo");
            var myName = '',
            channelInfo = {},
            myResult = false;
            /*w("FIND_DEVICE_BY_KEY", e), */
            r376.getDeviceByadapterDeviceId(n).then(thisdevice => x.getCurrChannel(thisdevice.key)
                            .then(channelInfo => {myName = channelInfo.channel,
                                                myResult = false,                                                
                                                thisdevice.favorites.forEach(thisFavo => {
                                                    channelInfo.channel == thisFavo.channelNr ? 
                                                    (myName = thisFavo.channel.name,myResult = true):{}
                                                }),
                                                AllFunctions(0)("Function 463").verbose("Is this favorite result:",{Result:myResult,name:myName}),
                                                t.json({Result:myResult,name:myName})}
                                )
                            ).catch(err => {AllFunctions(0)("Function 463").verbose("Failed isthisfavorite:",{Result:myResult,name:myName},err),
                            t.json({Result:myResult,name:myName})})
                        
                    
    }), o.get("/flushImageCache", (e, t) => {
        AllFunctions(0)("Function 463").verbose("request to flush imagecache");
        p.flushImageCache(); // ### clear local array first (Function 372) ; seems to be an extra "cache" only storing the keys of cache content.
        const agnt = new h.Agent({
              keepAlive: !0, 
              keepAliveMsecs: 8e3
        });
        AllFunctions(0)("Function 463").verbose("invoking express router (17) for flushimage")
         g({             // send http://brainurl:3004/v1/imagecache/flushImagecache/; this will be routed to imageservice.js
            url: s.getBaseUrl()+"v1/imagecache/flushImagecache/",
            agent: agnt,
            encoding: null,
            timeout: 4e3
        }).then(() => AllFunctions(0)("Function 463").verbose("Returned from request 463"),t.json({"Result":"Cache cleared!!"}))

    }), o.get("/GetLogLevels", (e, t) => {
        AllFunctions(0)("Function 463").verbose("GetLogLevels received");
        let promiseT = []; let theResult = []; let theUrl = ''; let i;
        for (i = 0;i < logModules.MetaComponents.length ; i++) {
            theUrl="http://127.0.0.1:300"+(i+1)+"/"+logModules.MetaComponents[i]+"/metaMessageHandler/?doFunc=GetLogLevel";
            AllFunctions(0)("Function 463").verbose("Getting loglevel by",theUrl)
            let tBody= ''  // post message to the relevant port for this module; uri is all we need, no body required.
            promiseT.push (r(17)({
                uri: theUrl,
                method: "POST",
                pool: this._httpAgent,
                timeout: 4e3,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Content-Length": tBody.length
                },
                body: tBody
            }).then( (thisResult) => {(AllFunctions(0)("Function 463").debug("Returned from single post request",thisResult),theResult.push(JSON.parse(thisResult)[0]))})
            .catch ( (err) => {(AllFunctions(0)("Function 463").error("Error calling getloglevel",theUrl))})            
            )
        }
        Promise.all(promiseT).then((values) => {
            return (AllFunctions(0)("Function 463").verbose("Returned from all post requests"),
                    AllFunctions(0)("Function 463").debug("returned:",theResult),
                    t.json({"result":theResult}))
        })

    }), o.get("/OverrideLogLevel", (e, t) => {
        AllFunctions(0)("Function 463").verbose("OverrideLogLevel received");
        var theModule = e.query.Module;
        if (theModule == undefined)
            return t.json({msg: "Missing modulename"})
        else
            theModule = theModule.toLowerCase()
        
        let thelogLevel = e.query.logLevel;
        let doFunc="?doFunc=OverrideLogLevel&logLevel="+thelogLevel
        let theUrl = ''
        let i;
        for (i = 0;i < logModules.MetaComponents.length ; i++) {
            if (logModules.MetaComponents[i] === theModule) 
            {   theUrl="http://127.0.0.1:300"+(i+1)+"/"+theModule+"/metaMessageHandler/"+doFunc;
                break;
            }
        }
            
        if (theUrl == '')
        {   AllFunctions(0)("Function 463").error("Unrecognised module for loglevel override "+theModule)
            return t.json({"error":"Unrecognised module for loglevel override "+theModule})
        }
        AllFunctions(0)("Function 463").verbose("Loglevel change; invoking",theUrl)

        let tBody= ''  // post message to the relevant port for this module; uri is all we need, no body required.
        return r(17)({
            //uri: this.baseUrl + e,
            uri: theUrl,
            method: "POST",
            pool: this._httpAgent,
            timeout: 4e3,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": tBody.length
            },
            body: tBody
        }).then((theResult) => (AllFunctions(0)("Function 463").verbose("Returned from post request"),t.json(theResult)))

    }), o.get("/PowerState", (e,t) => {
        r(27).get().then(r => r.getDevices()).then(bb => t.json(bb))

    }), o.get("/TouchButton", (e, t) => {
        AllFunctions(0)("Function 463").verbose("TOUCHBUTTON simulated"),
        r(10).send({
            type: "touchbuttonpressed",
            date: new Date
        }),
        t.json({
            msg: "Touchbutton press simulated..."
        })

    }), o.get("/longTouchButton", function(e, t) {
        AllFunctions(0)("Function 463").verbose("longtouchbutton"),
        r(10).send({
            type: r(140).NOTIFICATION_LONG_TOUCHBUTTONPRESSED,
            date: new Date
        }), 
        t.json({
            msg: "longtouchbutton press simulated..."
        })
    }),     

    e.exports = o
}, function(e, t, r) {// Function 464 Router: account
    "use strict";

    function n(e) {
        return d(e, {
            email: {
                presence: !0
            },
            password: {
                presence: !0
            }
        }), e
    }

    function o(e, t) {
        if (t.licenseCheckFailed) return t;
        const r = new Error(u(t, e).message);
        return "Invalid username/password." === t.message ? r.status = 401 : "Account already exists for this username." === t.message && (r.status = 403), r.alreadyLogged = !0, r
    }
    const i = r(5).Router(),
        s = r(24),
        a = r(465),
        c = r(466),
        u = r(9),
        d = r(14),
        l = r(155),
        p = r(27);
    i.post("/login", function(e, t, r) {
        AllFunctions(0)("Function 464").verbose("login")        
        AllFunctions(0)("Function 464").verbose("login;e.body",e.body)        
        const i = n(e.body);
        AllFunctions(0)("Function 464").verbose("login;i",i)        
        c.canPerform(c.ACCOUNT_LOGIN).then(() => s.login(i.email, i.password)).then(() => t.json({
            success: !0
        })).catch(e => {
            r(o("account_login", e))
        })
    }), i.post("/pairtobrain", function(e, t, r) {
        const i = n(e.body);
        c.canPerform(c.ACCOUNT_PAIR).then(() => a.pairToBrain(i)).then(() => t.json({
            success: !0
        })).catch(e => {
            r(o("account_pairing", e))
        })
    }), i.post("/signup", function(e, t, r) {
        const i = n(e.body);
        c.canPerform(c.ACCOUNT_SIGNUP).then(() => s.signup(i.email, i.password)).then(() => {
            t.json({
                success: !0
            })
        }).catch(e => {
            r(o("account_signup", e))
        })
    }), i.post("/logout", function(e, t, r) {
        c.canPerform(c.ACCOUNT_LOGOUT).then(() => s.logout()).then(() => {
            t.json({
                success: !0
            })
        }).catch(e => {
            r(o("account_logout", e))
        })
    }), i.get("/user", function(e, t) {
        t.json(s.getAccountname())
    }), i.get("/userloggedin", function(e, t) {
        s.isLoggedIn().then(e => {
            t.json(e)
        })
    }), i.get("/backups", function(e, t, r) {
        l.getProjectVersions().then(e => {
            const r = e.map(e => ({
                version: e
            }));
            t.json(r)
        }).catch(e => {
            r(o("account_backups", e))
        })
    }), i.post("/restore", function(e, t, r) {
        const n = e.body;
        d(n, {
            version: {
                presence: !0
            }
        }), p.restore(n.version).then(() => {
            t.json({
                success: !0
            })
        }).catch(e => {
            r(o("account_restore", e))
        })
    }), i.post("/resetpassword", function(e, t) {
        d(e.body, {
            email: {
                presence: !0
            }
        }), c.canPerform(c.ACCOUNT_RESET).then(() => s.resetPassword(e.body.email)).then(() => t.json({
            success: !0
        })).catch(() => t.json({
            success: !1
        }))
    }), e.exports = i
}, function(e, t, r) {// Function 465 pairToBrain
    "use strict";
    const n = r(1),
        o = r(24),
        i = r(42),
        s = r(12);
    e.exports = {
        pairToBrain: function(e) {
            if (!s.isProLicensed()) {
                const e = new Error("Only PRO accounts can be paired with Brains.");
                return n.reject(e)
            }
            const t = s.summary().hostname;
            return o.pairToBrain(e, t).then(() => i.saveFirmwareSettings({
                automaticUpdate: !0
            }))
        }
    }
}, function(e, t, r) {// Function 466 brainInformationUpdater
    "use strict";

    function n(e) {
        const t = new Error(e);
        return t.status = 400, t.licenseCheckFailed = !0, t.alreadyLogged = !0, o.reject(t)
    }
    const o = r(1),
        i = r(12),
        s = r(0)("brainInformationUpdater"),
        a = "accountLogin",
        c = "accountLogout",
        u = "accountPair",
        d = "accountReset",
        l = "accountSignup";
    e.exports = {
        canPerform: function(e) {
            switch (e) {
                case a:
                case c:
                case d:
                case l:
                    return i.isProLicensed() ? n("Action not allowed on NEEO Pro Units") : o.resolve();
                case u:
                    return i.isProLicensed() ? o.resolve() : n("Action only allowed on NEEO Pro Units")
            }
            const t = `Unknown action: ${e}`;
            return s.error("CAN_PERFORM", t), o.reject(new Error(t))
        },
        ACCOUNT_LOGIN: a,
        ACCOUNT_LOGOUT: c,
        ACCOUNT_PAIR: u,
        ACCOUNT_RESET: d,
        ACCOUNT_SIGNUP: l
    }
}, function(e, t, r) {// Function 467 Router: WIFI
    "use strict";
    const n = r(5).Router(),
        o = r(44).wifi,
        i = r(9),
        s = r(0)("WIFI_ROUTE"),
        a = r(44);
    let c;
    n.get("/scan", (e, t) => {
        AllFunctions(0)("Function 467").verbose("router WIFI; get /scan")

        o.scan().then(e => {
            t.json(e)
        })
    }), n.get("/debug", (e, t) => {
        AllFunctions(0)("Function 467").verbose("router WIFI; get /debug")
        o.scanRaw().then(e => {
            t.json(e)
        })
    }), n.get("/settings", (e, t) => {
        AllFunctions(0)("Function 467").verbose("router WIFI; get /settings")
        t.json({
            ssid: o.getSsid(),
            encryption: o.getEncryption()
        })
    }), n.get("/disableopenap", function(e, t) {
        AllFunctions(0)("Function 467").verbose("router WIFI; get /disableopenap")
        s.debug("disable open wifi ap"), t.status(200).end(), clearTimeout(c), c = setTimeout(() => {
            a.disableAccesspointMode()
        }, 5e3)
    }), n.post("/connect", (e, t, r) => {
        AllFunctions(0)("Function 467").verbose("router WIFI; post /connect")

        const n = e.body;
        o.connect(n.ssid, n.password, n.encryption, n.hiddenSSID).then(() => {
            t.json({
                success: !0
            })
        }).catch(e => {
            s.error("WIFI_CONNECT_FAILED", {
                message: e.message
            }), o.removeCredentials(), "wrong password" === e.message ? r(new Error(i(e, "wifi_password").message)) : r(new Error(i(e, "wifi_connect").message))
        })
    }), e.exports = n
}, function(e, t, r) {// Function 468 Router: channel
    "use strict";
    AllFunctions(0)("Function 468").verbose("")
    const n = r(5).Router(),
        o = r(158);
    n.get("/search", function(e, t, r) {
        const n = e.query.q;
        if (n) try {
            t.json(o.search(n))
        } catch (e) {
            r(e)
        } else t.json([])
    }), n.get("/:channelid", function(e, t) {
//        AllFunctions(0)("Function 468").verbose("router Channel; get channelid e",e)
//        AllFunctions(0)("Function 468").verbose("router Channel; get channelid e.params",e.params)
//        AllFunctions(0)("Function 468").verbose("router Channel; get channelid e.params.channelid",e.params.channelid)
        const r = e.params.channelid;
        t.json(o.get(r))
    }), e.exports = n
}, function(e, t, r) {// Function 469 Router: devicespec
    "use strict";
    AllFunctions(0)("Function 469").verbose("")
    const n = r(5).Router(),
        o = r(45),
        i = r(72),
        s = r(9),
        a = r(15),
        c = r(178).requireLoggedInAccountMiddleWare,
        u = r(0)("routes.devicespec");
    n.get("/search", function(e, t, r) {
        AllFunctions(0)("Function 469").verbose("search ")
        const n = e.query.q;
        n && n.length ? o.search(n).then(e => {
            t.json(e)
        }).catch(t => {
            u.error("ROUTE_DEVICESPEC_SEARCH", {
                url: e.url,
                method: e.method,
                error: t.message
            }), r(new Error(s(t, "devicespec_search", n).message))
        }) : t.json([])
//    }), n.get("/refreshfilelist", c, function(e, t, r) {
    }), n.get("/refreshfilelist", function( e, t, r) {
        i.refreshFileList().then(() => {
            t.json({
                success: !0
            })
        }).catch(t => {AllFunctions(0)("Function 469").verbose("Catch refreshlist ",t)
            u.error("ROUTE_DEVICESPEC_REFRESHFILELIST", {
                url: e.url,
                method: e.method,
                error: t.message
            }), r(new Error(s(t, "devicespec_sync")))
        })
    }), n.get("/:spec_id", function(e, t, r) {
        AllFunctions(0)("Function 469").verbose("spec_id ")
        const n = a.getRequestParameter(e, "spec_id", {
            presence: !0
        });
        o.getSpec(n).then(e => {
            t.json(e)
        }).catch(t => {
            AllFunctions(0)("Funcion 469").verbose("Error in use")
            u.error("ROUTE_DEVICESPEC_ID", {
                url: e.url,
                method: e.method,
                error: t.message
            }), r(new Error(s(t, "devicespec_get", n).message))
        })
    }), e.exports = n
}, function(e, t, r) {// Function 470 Router: devicetest
    "use strict";
    const n = r(14),
        o = r(5).Router(),
        i = r(24),
        s = r(178).requireLoggedInAccountMiddleWare;
    o.get("/liveirtest", s, function(e, t, r) {
        n(e.query, {
            testId: {
                presence: !0
            }
        });
        const o = e.query.testId;
        return i.getTestCommands(o).then(e => t.json(e)).catch(r)
    }), e.exports = o
}, function(e, t, r) {// Function 471 Router: macro
    "use strict";
    const n = r(5).Router(),
        o = r(39),
        i = r(15);
    o.use("/:device_key/macros", n), n.get("/:key/trigger", function(e, t) {
        const r = i.getRequestParameter(e, "key", {
                presence: !0
            }),
            n = {
                repeat: /true/.test(e.query.repeat)
            },
            o = e.device.triggerActionByKey(r, n);
        t.json(o)
    }), n.get("/", function(e, t) {
        const r = e.device.getMacros();
        t.json(r)
    }), e.exports = n
}, function(e, t, r) {// Function 472 moveDevice to other room
    "use strict";

    function n(e, t) {
        e.getScenarios().filter(e => {
            return 0 < e.getDevices().filter(e => e.key === t).length
        }).map(e => {
            0 < e.getDevices().filter(e => i.RESETTABLE_DEVICES.includes(e.getType())).length && e.resetWiring()
        })
    }
    r(0)("moveDevice");
    const o = r(1),
        i = r(30),
        s = r(19);
    e.exports.moveToOtherRoom = function(e, t, r) {
        const i = t.getRoomKey(),
            a = e.getRoomByKey(i),
            c = t.getKey(),
            u = a.getScenariosByMainDeviceKey(c);
        try {
            n(a, c), u.forEach(e => {
                t.details.type !== s.TYPE_LIGHT ? (e.room = r, a.getRecipesForScenario(e).forEach(e => {
                    e.room = r, r.addRecipe(e)
                }), a.removeScenario(e), r.addScenario(e, !0)) : function(e, t, r) {
                    const n = e.getDevices(e => e.key !== t.key && e.details.type === s.TYPE_LIGHT);
                    if (0 < n.length) {
                        const r = n[0];
                        return e.mainDeviceKey = r.key, void e.removeDevice(t)
                    }
                    r.removeScenario(e)
                }(e, t, a)
            });
            const i = function(e, t) {
                return e.getRooms().reduce((e, t) => (e = e.concat(t.getScenarios()), e), []).reduce((e, r) => {
                    const n = r.getShortcuts(e => e.deviceKey === t);
                    return e = e.concat(n)
                }, [])
            }(e, t.key);
            return i.forEach(e => {
                e.deviceRoomKey = r.key, e.deviceRoomName = r.name
            }), a.removeDevice(t), r.addDevice(t, !0), e.activate(), o.resolve(t)
        } catch (e) {
            i.error("DEVICE_MOVE_FAILED", {
                device: {
                    name: t.details.name,
                    type: t.details.type,
                    manufacturer: t.details.manufacturer
                },
                newRoom: {
                    name: r.name,
                    key: r.key
                }
            })
        }
        return o.reject(new Error("DEVICE_MOVE_FAILED"))
    }, e.exports.resetWiringForAffectedScenarios = n
}, function(e, t, r) {// Function 473 device.unsubscribe
    "use strict";
    const n = r(18),
        o = r(1),
        i = r(0)("routes.device.unsubscribe");
    e.exports = function(e, t) {
        return function(e) {
            return !!e && e.getSourceName() !== n.SOURCE_DUIRO
        }(t) ? (i.debug("unsubscribe device", t.details), e.unsubscribe(t).catch(e => i.error("DEVICE_UNSUBSCRIBE", e.message))) : o.resolve()
    }
}, function(e, t, r) {// Function 474 Router: slider
    "use strict";

    function n(e, t) {
        const r = a.getRequestParameter(e, "value", {
                presence: !0
            }),
            n = e.slider,
            o = c.buildActionOfComponent(n.getName(), n, r),
            i = u.trigger(o);
        t.json(i)
    }
    const o = r(5).Router(),
        i = r(39),
        s = r(9),
        a = r(15),
        c = r(43),
        u = r(52);
    i.use("/:device_key/sliders", o), o.param("slider_key", function(e, t, r, n) {
        e.slider = e.device.getSliderByKey(n), e.slider ? r() : r(new Error(s(null, "notfound", "slider", n).message))
    }), o.put("/:slider_key", n), o.get("/:slider_key", n), o.get("/", function(e, t) {
        t.json(e.device.getSliders())
    }), e.exports = o
}, function(e, t, r) {// Function 475 Router: sensor
    "use strict";
    const n = r(5).Router(),
        o = r(39),
        i = r(9),
        s = r(0)("routes.sensor"),
        a = r(3);
    o.use("/:device_key/sensors", n), n.param("sensor_key", function(e, t, r, n) {
        AllFunctions(0)("Function 475").verbose("/:device_key/sensors",n)
        e.sensor = e.device.getSensorByKey(n), e.sensor ? r() : r(new Error(i(null, "notfound", "sensor", n).message))
    }), n.get("/:sensor_key", function(e, t, r) {
            e.sensor.getValue().then(e => {
                a.increaseCounter("sensor-read-succeeded"), t.json({
                    value: e
            }),AllFunctions(0)("Function 475").verbose("GetSensor-value",e)
        }).catch(e => {
            s.debug("failed to get sensor value", e.message), a.increaseCounter("sensor-read-errors"), e.alreadyLogged = !0, r(e)
        })
    }), n.get("/", function(e, t) {
        t.json(e.device.getSensors())
    }), e.exports = n
}, function(e, t, r) {// Function 476 Router: switcher
    "use strict";

    function n(e) {
        return function(t, r) {
            let n = e;
            void 0 === n && (n = a.getBooleanParam(t, "value")), r.json(u.trigger(c.buildActionOfComponent("Switch", t.switcher, n)))
        }
    }
    const o = r(5).Router(),
        i = r(39),
        s = r(9),
        a = r(15),
        c = r(43),
        u = r(52);
    i.use("/:device_key/switches", o), o.param("switch_key", function(e, t, r, n) {
        e.switcher = e.device.getSwitchByKey(n), e.switcher ? r() : r(new Error(s(null, "notfound", "switch", n).message))
    }), o.put("/:switch_key/on", n(!0)), o.put("/:switch_key/off", n(!1)), o.get("/:switch_key", n()), o.get("/", function(e, t) {
        t.json(e.device.getSwitches())
    }), e.exports = o
}, function(e, t, r) {// Function 477 ScenarioWiring
    "use strict";

    function n(e) {
        const t = e.length - 1,
            r = e.slice(a),
            n = e.slice(void 0, t);
        return i(r, n, (e, t) => ({
            target: e,
            source: t
        }))
    }

    function o(e, t) {
        const r = t.getScenarios(t => {
            if (!t.isConfigured()) return !1;
            const r = t.getDevices().map(e => e.key),
                n = r.indexOf(e.target.key),
                o = r.indexOf(e.source.key);
            return -1 !== n && -1 !== o && o === n - 1
        });
        if (r.length) {
            const t = r[0].getDeviceInputMacro(e.target);
            return t ? t.getName() : void s.warn("INPUT_MACRO_NOT_FOUND")
        }
    }
    const i = r(478),
        s = r(0)("ScenarioWiring"),
        a = 1;
    e.exports.tryAutomaticWiring = function(e) {
        const t = e.getRoom(),
            r = n(e.getDevices());
        return r.slice(a).forEach(r => {
            const n = o(r, t);
            n && (e.defineDeviceInput(r.target, n), r.configured = !0)
        }), r.filter(e => !e.configured).map(e => ({
            target: e.target.key,
            source: e.source.key
        }))
    }, e.exports.getUnconfiguredSteps = function(e) {
        const t = n(e.getDevices()),
            r = Object.keys(e.deviceInputMacroNames);
        return t.filter(e => {
            const t = e.target.key;
            return !(0 <= r.indexOf(t))
        }).map(e => ({
            target: e.target.key,
            source: e.source.key
        }))
    }
}, function(e) {// Function 478 exports = require("lodash/zipWith")
    e.exports = require("lodash/zipWith")
}, function(e, t, r) {// Function 479 Router: recipe
    "use strict";

    function n(e) {
        return function(e, t) {
            return (r, n, o) => {
                const i = r[e];
                return i ? !t || r.projectActivated ? n.json(i) : (r.project.reloadScheduler(), void r.project.save().then(() => {
                    n.json(i)
                }).catch(o)) : o(new Error("No data on request object for property: " + e))
            }
        }(e, !0)
    }

    function o() {
        return (e, t, r) => {
            const n = e.job;
            return n ? n.error ? (t.status(500), t.json({
                message: n.error.message
            })) : t.json(n) : r(new Error("Invalid job"))
        }
    }

    function i(e, t, r) {
        return l.isIconRecipe(e.recipe) ? e.project.activate().then(() => e.projectActivated = !0).catch(e => p.error("ACTIVATION_FAILED", {
            msg: e.message
        })).finally(() => r()) : void r()
    }
    const s = r(6)("cp6:route:recipe"),
        a = r(5).Router(),
        c = r(85),
        u = r(9),
        d = r(15),
        l = r(51),
        p = r(0)("routes.recipe");
    c.use("/:room_key/recipes", a), a.param("recipe_key", function(e, t, r, n) {
        e.recipe = e.room.getRecipeByKey(n), e.recipe ? r() : r(new Error(u(null, "notfound", "recipe", n).message))
    }), a.post("/", function(e, t, r) {
        const n = e.body;
        n.room = e.room;
        const o = l.buildNewRecipe(n);
        e.room.addRecipe(o), e.recipe = o, r()
    }, n("recipe")), a.get("/", function(e, t) {
        t.json(e.room.getRecipes())
    }), a.post("/duplicate", function(e, t, r) {
        const n = e.body;
        n.room = e.room;
        const o = l.buildRecipe(n, n.room);
        e.room.addRecipe(o), e.recipe = o, r()
    }, n("recipe")), a.get("/reorder", function(e, t, r) {
        const n = e.room.getRecipes(),
            o = n.filter(e => "poweroff" !== e.type),
            i = d.getIntParam(e, "from", o.length),
            s = d.getIntParam(e, "to", o.length);
        l.reorder(o, i, s), e.project.save().then(() => t.json(n)).catch(r)
    }), a.get("/:recipe_key", function(e, t) {
        t.json(e.recipe)
    }), a.delete("/:recipe_key", function(e, t, r) {
        p.debug("delete recipe", e.recipe), e.recipe = e.room.removeRecipe(e.recipe), r()
    }, i, n("recipe")), a.put("/:recipe_key", function(e, t, r) {
        const n = e.body.enabled,
            o = e.body.name,
            i = e.body.icon;
        e.recipe.setEnabled(n), e.recipe.setName(o), e.recipe.setIcon(i), r()
    }, i, n("recipe")), a.get("/:recipe_key/execute", function(e, t, r) {
        e.job = e.recipe.execute(e.project), r()
    }, o()), a.get("/:recipe_key/isactive", function(e, t) {
        const r = e.project.getActiveScenarioKeys(),
            n = e.recipe.scenarioKey,
            o = r.includes(n);
        t.json({
            active: o
        })
    }), a.put("/:recipe_key/trigger", function(e, t, r) {
        const n = e.body;
        e.trigger = e.recipe.setTrigger(n), r()
    }, i, n("trigger")), a.get("/:recipe_key/steps/:idx/execute", function(e, t, r) {
        const n = parseInt(e.params.idx, 10);
        e.job = e.recipe.executeStep(n, e.project), r()
    }, o()), a.post("/:recipe_key/steps", function(e, t, r) {
        const n = e.body;
        s("add new recipe step %O", n), e.step = e.recipe.addStep(n), r()
    }, n("step")), a.put("/:recipe_key/steps/reorder", function(e, t, r) {
        const n = parseInt(e.body.from, 10),
            o = parseInt(e.body.to, 10);
        e.recipe.reorderStep(n, o), r()
    }, n("recipe")), a.put("/:recipe_key/steps/:idx", function(e, t, r) {
        const n = parseInt(e.params.idx, 10),
            o = e.body;
        e.step = e.recipe.setStep(n, o), r()
    }, n("step")), a.delete("/:recipe_key/steps/:idx", function(e, t, r) {
        const n = parseInt(e.params.idx, 10);
        e.step = e.recipe.removeStep(n), r()
    }, n("step")), a.post("/:recipe_key/conditions", function(e, t, r) {
        const n = e.body;
        e.condition = e.recipe.addCondition(n), r()
    }, n("condition")), a.put("/:recipe_key/conditions/:idx", function(e, t, r) {
        const n = parseInt(e.params.idx, 10),
            o = e.body;
        e.condition = e.recipe.setCondition(n, o), r()
    }, n("condition")), a.delete("/:recipe_key/conditions/:idx", function(e, t, r) {
        const n = parseInt(e.params.idx, 10);
        e.condition = e.recipe.removeCondition(n), r()
    }, n("condition")), e.exports = a
}, function(e, t, r) {// Function 480 Router: shortcu
    "use strict";
    const n = r(5).Router(),
        o = r(179),
        i = r(9),
        s = r(15),
        a = r(0)("RouteShortcut"),
        c = r(154);
    o.use("/:scenario_key/shortcuts", n), n.param("shortcut_key", function(e, t, r, n) {
        return e.shortcut = e.scenario.getShortcutByKey(n), e.shortcut ? void r() : r(new Error(i(null, "notfound", "shortcut", n).message))
    }), n.post("/", function(e, t, r) {
        if (!e.scenario.isAllowedToAddShortcut()) {
            a.warn("MAXIMAL_SHORTCUT_ENTRIES_EXCEEDED");
            const e = new Error("MAXIMAL_SHORTCUT_ENTRIES_EXCEEDED");
            return e.alreadyLogged = !0, r(e)
        }
        const n = s.getRequestParameter(e, "deviceKey", {
                presence: !0
            }),
            o = s.getRequestParameter(e, "componentKey", {
                presence: !0
            }),
            u = s.getRequestParameter(e, "componentType", {
                presence: !0
            }),
            d = s.getRequestParameter(e, "deviceRoomKey", {
                presence: !0
            });
        if (!(n && o && u && d)) throw new Error(i("validation", "shortcut").message);
        const l = c.build(e.body);
        e.scenario.addShortcut(l), e.project.saveDebounced(), t.json(l)
    }), n.get("/", function(e, t) {
        const r = e.scenario.getShortcuts();
        t.json(r)
    }), n.get("/reorder", function(e, t, r) {
        const n = e.scenario.getShortcuts(),
            o = s.getIntParam(e, "from", n.length),
            i = s.getIntParam(e, "to", n.length),
            a = c.reorder(n, o, i);
        e.project.save().then(() => t.json(a)).catch(r)
    }), n.get("/:shortcut_key", function(e, t) {
        t.json(e.shortcut)
    }), n.delete("/:shortcut_key", function(e, t) {
        e.scenario.removeShortcut(e.shortcut), e.project.saveDebounced(), t.json(e.shortcut)
    }), n.post("/:shortcut_key/setcustomname", function(e, t) {
        const {
            customName: r
        } = e.body;
        e.shortcut.setCustomName(r), e.project.saveDebounced(), t.json(e.shortcut)
    }), e.exports = n
}, function(e, t, r) {// Function 481 Router: directory
    "use strict";
    const n = r(5).Router(),
        o = r(39),
        i = r(9),
        s = r(103);
    o.use("/:device_key/directories", n), n.param("directory_key", function(e, t, r, n) {
        e.directory = e.device.getDirectoryByKey(n), e.directory ? r() : r(new Error(i(null, "notfound", "directory", n).message))
    }), n.get("/", function(e, t) {
        t.json(e.device.getDirectories())
    }), n.get("/:directory_key", function(e, t) {
        t.json(e.directory)
    }), n.post("/:directory_key/browse", function(e, t, r) {
        s.browse(e.directory, e.body).then(e => {
            t.json(e)
        }).catch(e => {
            r(new Error(i(e, "directoryadapter_browse").message))
        })
    }), n.post("/:directory_key/action", function(e, t, r) {
        AllFunctions(0)("Function 481").verbose("/:directory_key/action")
        s.callAction(e.directory, e.body).then(e => {
            t.json(e)
        }).catch(e => {
            r(new Error(i(e, "directoryadapter_action").message))
        })
    }), e.exports = n
}, function(e, t, r) {// Function 482 Router: procedure
    "use strict";
    const n = r(5).Router(),
        o = r(39),
        i = r(9);
    o.use("/:device_key/procedures", n), n.param("procedure_key", function(e, t, r, n) {
        e.procedure = e.device.getProcedureByKey(n), e.procedure ? r() : r(new Error(i(null, "notfound", "procedure", n).message))
    }), n.get("/", function(e, t) {
        t.json(e.device.getProcedures())
    }), n.get("/:procedure_key", function(e, t) {
        t.json(e.procedure)
    }), n.post("/:procedure_key/trigger", function(e, t) {
        e.procedure.validateParamData(e.body);
        const r = {
                value: e.body
            },
            n = e.device.triggerActionByKey(e.procedure.getKey(), r);
        n.promise.finally(() => t.json(n))
    }), e.exports = n
}, function(e, t, r) {// Function 483 Router: favorites
    "use strict";
    AllFunctions(0)("Function 483").verbose("favorites")

    function n(e, t) {
        AllFunctions(0)("Function 483").verbose("favorites e")
        //AllFunctions(0)("Function 483").verbose("favorites t",t)
        return parseInt(s.getRequestParameter(e, t, {
            presence: !0,
            numericality: {
                onlyInteger: !0,
                greaterThanOrEqualTo: 0,
                lessThan: p.maximalFavoritesPerDevice
            }
        }))
    }
    const o = r(5).Router(),
        i = r(39),
        s = r(15),
        a = r(9),
        c = r(484),
        u = r(52),
        d = r(152),
        l = r(30),
        p = r(2).project,
        h = r(0)("routes.favorites"),
        g = /^([0-9]+)$/,
        m = /^[-–\/.\d]+$/;
    i.use("/:device_key/favorites", o), o.param("favIdx", function(e, t, r, n) {
        return n = parseInt(n, 10), g.test(n) ? (e.favorite = e.device.getFavorites()[n], void(e.favorite ? r() : r(new Error(a(null, "validation", "favorite", n).message)))) : r(new Error(a(null, "validation", "index").message))
    }), o.param("favChannelNr", function(e, t, r, n) {
        return !m.test(n) ? r(new Error(a(null, "validation", "index").message)) : (e.channelNr = n, void r())
    }), o.get("/", function(e, t) {
        if (-1 === l.DEVICETYPES_WITH_FAVORITES.indexOf(e.device.getType())) throw new Error(a(null, "validation", "device").message);
        const r = parseInt(s.getRequestParameter(e, "limit", {
            numericality: {
                onlyInteger: !0
            }
        }, -1));
        let n = e.device.getFavorites();
        r && 0 <= r && (n = n.slice(0, r)), t.json(n)
    }), o.post("/:favoriteIndex", function(e, t) {
        const r = n(e, "favoriteIndex"),
            o = s.getRequestParameter(e, "channel", {
                presence: !0
            }),
            i = s.getRequestParameter(e, "channelNr", {
                presence: !0
            }),
            c = /true/.test(e.body.custom);
        if (!o.name) throw new Error(a("validation", "channel").message);
        const u = new d({
            channel: o,
            channelNr: i,
            custom: c
        });
        e.device.getFavorites()[r] = u, e.project.saveDebounced(), t.json(u)
    }), o.get("/reorder", function(e, t, r) {
        const o = n(e, "from"),
            i = n(e, "to"),
            s = e.device.getFavorites();
        if (o >= s.length) throw new Error(a(null, "validation", 'param "from"').message);
        if (i >= s.length) throw new Error(a(null, "validation", 'param "to"').message);
        const c = s.splice(o, 1);
        s.splice(i, 0, c[0]), e.project.save().then(() => {
            t.json(s)
        }).catch(r)
    }), o.get("/triggerByChannel/:favChannelNr", function(e, t) {
        AllFunctions(0)("Function 483").verbose("o.get(/triggerByChannel/:favChannelNr e,t",e,t)
        const r = c.buildChannelSwitchAction(e.device, e.channelNr),
            n = u.trigger(r);
        h.debug("FAVORITE_TRIGGERD_BY_CHANNEL", {
            channelNr: e.channelNr
        }), t.json(n)
    }), o.delete("/:favIdx", function(e, t) {
        const r = e.device.getFavorites();
        r.splice(r.indexOf(e.favorite), 1), e.project.saveDebounced(), t.json(r)
    }), o.get("/:favIdx/trigger", function(e, t) {
        AllFunctions(0)("Function 483").verbose("o.get(/:favIdx/trigger e.favorite",e.favorite);
        AllFunctions(0)("Function 483").verbose("o.get(/:favIdx/trigger e.favorite.getChannelNr()",e.favorite.getChannelNr());
        const r = c.buildChannelSwitchAction(e.device, e.favorite.getChannelNr());
        AllFunctions(0)("Function 483").verbose("Back, before triggering this:",r)
        const n = u.trigger(r);
        h.debug("USE_FAVORITE", {
            channel: e.favorite.getChannelName()
        }), t.json(n)
    }), e.exports = o
    }, function(e, t, r) {// Function 484 favoriteactionbuilder
        "use strict";
        const j = r;
        function n(e, t) {
            AllFunctions(0)("Function 484").verbose("here (in N) we have all the ingredients to store currrchannel:",e.key,t)
            j(506).putCurrFavo(t, e.key) 
            const r = function(e) {
                    const t = e.getPresetSettings();
                    if (!t || !t.commandPrefix) return [];
                    const r = e.getMacroByName(t.commandPrefix);
                    return r ? [s.buildFavoriteAction(t.commandPrefix, r, t.delayAfterPrefix)] : []
                }(e),
                n = function(e) {
                    const t = e.getPresetSettings();
                    if (!t || !t.commandPostfix) return [];
                    const r = e.getMacroByName(t.commandPostfix);
                    if (!r) return [];
                    const n = s.buildDelayOnlyAction(t.delayBeforePostfix),
                        o = s.buildFavoriteAction(t.commandPostfix, r, 0);
                    return [n, o]
                }(e),
                a = t.toString();
            i.debug("seqToSend", a);
            const c = a.split("").map(t => o(t, e)).filter(e => e),
                u = r.concat(c).concat(n);
            return s.buildActionOfActions("CHANNEL_" + t, u)
        }
    
        function o(e, t) {
            let r;
            if (!(r = /\d/.test(e) ? "DIGIT " + e : u[e])) return void i.warn("INVALID_CHANNEL_CHARACTER", e);
            i.debug("getting macro", r);
            const n = t.getMacroByName(r);
            if (!n) return void i.warn("INVALID_CHANNEL_MACRONAME", r);
            let o = c;
            const a = t.getPresetSettings();
            return a && a.delayBetween && (i.debug("device specific delay", a.delayBetween), o = a.delayBetween), s.buildFavoriteAction(r, n, o)
        }
        const i = r(0)("favoriteactionbuilder"),
            s = r(43),
            a = r(21),
            c = 200,
            u = {
                ".": "DIGIT SEPARATOR",
                "/": "DIGIT SEPARATOR",
                "-": "DIGIT SEPARATOR",
                "–": "DIGIT SEPARATOR"
            };
        e.exports = {
            buildChannelSwitchAction: function(e, t) {
                AllFunctions(0)("Function 484").verbose("buildChannelSwitchAction")
                return a.check(a.NEEO_FEATURE_FAVORITES_CUSTOM_HANDLER, e) ? function(e, t) {
                    const r = e.getFavoriteComponent();
                    return s.buildActionOfComponent("Favorite " + t, r, {
                        favoriteId: t
                    })
                }(e, t) : n(e, t)
            }
        }
}, function(e, t, r) {// Function 485 Router: notification
    "use strict";
    AllFunctions(0)("Function 485").verbose("router")

    const n = r(5).Router(),
        o = r(0)("routes.notification"),
        i = r(3),
        s = r(10),
        a = r(9),
        c = r(14);
        n.get("/", function(e, t, r) {
            AllFunctions(0)("Function 485").verbose("router - post notifications")
        })
        n.post("/", function(e, t, r) {
        AllFunctions(0)("Function 485").verbose("router - post notifications",e.url,"body:",e.body)
        const n = e.body;
        c(n, {
            type: {
                presence: !0
            },
            data: {
                presence: {
                    allowEmpty: !0
                }
            }
        });
        AllFunctions(0)("Function 485").verbose("n.type",n.type)
/* an attempt to add linebreaks in textlabels; injects some text and CRLF ... did not work as TR2 doesn't honor crlf 
       if (n.type == 'DEVICE_SENSOR_UPDATE') {
                n.data.sensorValue = "====>&#x0A;&#x0D;"+n.data.sensorValue
                //&#x3D;&#x3D;&#x3D;&#x3D;&gt;&amp;#XA;&amp;#XD;PLAYING VIDEO
        }
*/ 
        try {
            AllFunctions(0)("Function 485").verbose("send",n)

            s.send(n) ? t.json({
                success: !0
            }) : r(new Error(a(null, "notification_send", n.type).message))
        } catch (e) {
            o.debug("NOTIFICATION_SEND_ERROR", e), i.increaseCounter("notification-send-error"), e.alreadyLogged = !0, r(e)
        }
    }), n.get("/push-all", function(e, t) {
        AllFunctions(0)("Function 485").verbose("push-all")
        s.resendAll(), t.end()
    }), e.exports = n
}, function(e, t, r) {// Function 486 Router: irblaster
    "use strict";
    const n = r(5).Router(),
        o = r(144),
        i = r(14),
        s = r(15),
        a = r(0)("routes.irblaster"),
        c = {
            presence: !0
        },
        u = {
            success: !0
        };
    n.post("/trigger", function(e, t, r) {
        const n = e.body.command,
            s = e.body.options || {};
        i(n, {
            name: c,
            payload: c
        }), o.trigger(n, s).then(() => {
            t.json(u)
        }).catch(r)
    }), n.get("/send_ir", function(e, t, r) {
        const n = s.getRequestParameter(e, "code", c);
        a.debug("send_ir code:", n), o.sendSingleCommand(n).then(() => {
            t.json(u)
        }).catch(r)
    }), n.get("/irblasterDisable", function(e, t) {
        a.debug("irblasterDisable"), o.disableInternalIrBlaster().then(() => t.json(u))
    }), n.get("/irblasterEnable", function(e, t) {
        a.debug("irblasterEnable"), o.enableInternalIrBlaster().then(() => t.json(u))
    }), n.get("/startIrLearn", function(e, t, r) {
        a.debug("startIrLearn"), o.startIrLearn().then(() => {
            t.json(u)
        }).catch(r)
    }), n.get("/stopIrLearn", function(e, t, r) {
        a.debug("stopIrLearn"), o.stopIrLearn().then(e => {
            t.json({
                result: e
            })
        }).catch(r)
    }), e.exports = n
}, function(e, t, r) {// Function 487 Router: deviceadapter
    "use strict";

    function n(e) {
        return e.error && e.error.message ? e.error.message : e.message
    }
    const o = r(5).Router(),
        i = r(20),
        s = i.deviceAdapter,
        a = r(27),
        c = r(9),
        u = r(15),
        d = r(0)("routes.deviceadapter"),
        l = {
            presence: !0
        };
    o.param("project_key", function(e, t, r, n) {
        a.get(n).then(t => {
            e.project = t, r()
        }, t => {
            d.error("PROJECT_READ_FAILED", {
                url: e.url,
                method: e.method,
                error: t.message
            }), r(t)
        })
    }), o.post("/unregister/:adapterName", function(e, t, r) {
        const o = u.getRequestParameter(e, "adapterName", l);
        s.unregister(o).then(e => {
            t.json(e)
        }).catch(t => {
            const o = n(t);
            d.error("DEVICEADAPTER_UNREGISTER_FAILED", {
                url: e.url,
                method: e.method,
                message: o
            }), r(new Error(o))
        })
    }), o.post("/cancel/:adapterName", function(e, t, r) {
        const n = u.getRequestParameter(e, "adapterName", l);
        s.cancel(n).then(e => {
            t.json(e)
        }).catch(e => {
            r(new Error(c(e, "deviceadapter_cancelrequest").message))
        })
    }), o.get("/capability/:capability", function(e, t, r) {
        const n = u.getRequestParameter(e, "capability", l);
        s.findAdapterWithCapability(n).then(e => {
            t.json(e)
        }).catch(t => {
            d.error("DEVICEADAPTER_FIND_CAPABILITY_FAILED", {
                url: e.url,
                method: e.method,
                error: t.message
            }), r(new Error(c(t, "deviceadapter_registered").message))
        })
    }), o.get("/registered/:sourceName/:adapterName", function(e, t, r) {
        const n = u.getRequestParameter(e, "sourceName", l),
            o = u.getRequestParameter(e, "adapterName", l);
        s.registered(o, n).then(e => {
            d.debug("registered answer:", e), t.json(e)
        }).catch(t => {
            d.error("DEVICEADAPTER_REGISTERED_FAILED", {
                url: e.url,
                method: e.method,
                error: t.message
            }), r(new Error(c(t, "deviceadapter_registered").message))
        })
    }), o.post("/register/:sourceName/:adapterName", function(e, t, r) {
        const o = u.getRequestParameter(e, "sourceName", l),
            i = u.getRequestParameter(e, "adapterName", l),
            a = u.getRequestParameter(e, "credentials", l);
        s.register(i, o, a).then(e => {
            t.json(e)
        }).catch(t => {
            const o = n(t);
            d.error("DEVICEADAPTER_REGISTER_FAILED", {
                url: e.url,
                method: e.method,
                message: o
            }), r(new Error(o))
        })
    }), o.get("/discover/:sourceName/:adapterName", function(e, t, r) {
        const n = u.getRequestParameter(e, "sourceName", l),
            o = u.getRequestParameter(e, "adapterName", l);
        s.discover(o, n).then(e => {
            t.json(e)
        }).catch(t => {
            d.error("DEVICEADAPTER_DISCOVER_FAILED", {
                url: e.url,
                method: e.method,
                error: t.message
            }), r(new Error(c(t, "deviceadapter_discover").message))
        })
    }), o.get("/replaceDevice/:project_key/:adapterName/:nodeId", function(e, t) {
        const r = u.getRequestParameter(e, "adapterName", l),
            n = u.getRequestParameter(e, "nodeId", l);
        s.replace(r, n).then(t => e.project.replaceDevice(t, r)).then(e => {
            t.json(e)
        }).catch(r => {
            d.error("DEVICEADAPTER_REPLACE_FAILED", {
                url: e.url,
                method: e.method,
                error: r.message
            }), t.status(500).json(c(r, "deviceadapter_replace"))
        })
    }), o.get("/rpc/:adapterName/:functionName", function(e, t, r) {
        const n = u.getRequestParameter(e, "adapterName", l),
            o = u.getRequestParameter(e, "functionName", l);
        i.rpcCall(n, o, e.query.param).then(e => {
            t.json(e)
        }).catch(t => {
            d.error("DEVICEADAPTER_RPC_FAILED", {
                url: e.url,
                method: e.method,
                fn: o,
                error: t.message
            });
            const n = t ? t.message : "";
            r(new Error(c(t, "deviceadapter_rpc", o, n).message))
        })
    }), o.get("/getZWaveControllerRole", function(e, t, r) {
        s.getZWaveControllerRole().then(e => {
            t.json(e)
        }).catch(e => {
            d.error("DEVICEADAPTER_GETCONTROLLERROLE_FAILED", {
                error: e.message
            }), r(new Error(c(e, "deviceadapter_getcontrollerrole").message))
        })
    }), o.get("/replicateZWaveNetworkInformation", function(e, t, r) {
        s.replicateZWaveNetworkInformation().then(e => {
            t.json(e)
        }).catch(e => {
            const t = n(e);
            d.error("DEVICEADAPTER_REPLICATE_ZWAVE_NETWORK_FAILED", {
                error: t
            }), r(new Error(t))
        })
    }), o.post("/setZWaveParameter/:nodeId", function(e, t, r) {
        const n = u.getRequestParameter(e, "nodeId", l),
            o = u.getRequestParameter(e, "parameter", l);
        s.setZWaveParameter(n, o).then(e => {
            t.json(e)
        }).catch(t => {
            d.error("DEVICEADAPTER_ZWAVE_SETPARAMETER_FAILED", {
                url: e.url,
                method: e.method,
                message: t.message
            }), r(new Error(t.message))
        })
    }), o.get("/getZWaveParameter/:nodeId/:parameterId", function(e, t, r) {
        const n = u.getRequestParameter(e, "nodeId", l),
            o = u.getRequestParameter(e, "parameterId", l);
        s.getZWaveParameter(n, o).then(e => {
            t.json(e)
        }).catch(t => {
            d.error("DEVICEADAPTER_ZWAVE_GETPARAMETER_FAILED", {
                url: e.url,
                method: e.method,
                message: t.message
            }), r(new Error(t.message))
        })
    }), o.get("/resetZWaveNetwork", function(e, t, r) {
        i.resetZWave().then(() => {
            t.json({
                success: !0
            })
        }).catch(t => {
            d.error("DEVICEADAPTER_ZWAVE_RESET_FAILED", {
                url: e.url,
                method: e.method,
                message: t.message
            }), r(new Error(t.message))
        })
    }), e.exports = o
}, function(e, t, r) {// Function 488 Router: directoryadapter
    "use strict";

    function n() {
        d.refreshClients()
    }
    const o = r(5).Router(),
        i = r(20),
        s = i.directoryAdapter,
        a = i.spotifyUsernameService,
        c = r(9),
        u = r(15),
        d = r(83);
    o.post("/setupspotify/createaccesstoken", function(e, t, r) {
        try {
            const o = u.getRequestParameter(e, "code", {
                presence: !0
            });
            s.createAccessToken("spotify", o).then(e => {
                e.success && (a.forceUpdate(), t.json({
                    success: e.success
                }))
            }).then(n).catch(e => {
                r(e.error)
            })
        } catch (e) {
            const t = e ? e.message : "";
            r(new Error(c(e, "directoryadapter_spotifycreatetoken", t).message))
        }
    }), o.get("/setupspotify/getauthorizeparams", function(e, t, r) {
        s.getAuthorizeParams("spotify").then(e => {
            t.json(e)
        }).catch(e => {
            const t = e ? e.message : "";
            r(new Error(c(e, "directoryadapter_spotifyauthparam", t).message))
        })
    }), o.get("/setupspotify/getuserdata", function(e, t, r) {
        s.getUserData("spotify").then(e => {
            t.json(e)
        }).catch(e => {
            const t = e ? e.message : "";
            r(new Error(c(e, "directoryadapter_spotifyuserdata", t).message))
        })
    }), o.post("/isEnabled", function(e, t, r) {
        const n = u.getRequestParameter(e, "directoryName", {
            presence: !0
        });
        s.isEnabled(n).then(e => {
            t.json(e)
        }).catch(e => {
            const t = e ? e.message : "";
            r(new Error(c(e, "directoryadapter_isenabled", t).message))
        })
    }), o.post("/browse", function(e, t, r) {
        const n = u.getRequestParameter(e, "directoryKey", {
                presence: !0
            }),
            o = u.getRequestParameter(e, "browseUri"),
            i = u.getRequestParameter(e, "browseIdentifier"),
            a = e.body.limit,
            d = e.body.offset;
        s.browse(n, o || i, a, d).then(e => {
            t.json(e)
        }).catch(e => {
            r(new Error(c(e, "directoryadapter_browse").message))
        })
    }), e.exports = o
}, function(e, t, r) {// Function 489 Router: firmware
    "use strict";
    const n = r(5).Router(),
        o = r(76),
        i = r(31),
        s = r(42),
        a = r(0)("routes.firmware"),
        c = {
            success: !0
        };
    n.get("/", (e, t) => {
        o.toJson().then(e => {
            t.json(e)
        }).catch(() => {
            t.sendStatus(503)
        })
    }), n.get("/postcloudcheck", (e, t) => {
        t.json({
            success: !0
        }), o.checkIfNewFirmwareIsAvailable().catch(e => {
            a.debug("FW_CHECK_FAILED", {
                msg: e.message
            })
        } )
    }), n.get("/check", (e, t) => {
        t.json({
            success: !0
        }), o.checkIfNewFirmwareIsAvailable().catch(e => {
            a.debug("FW_CHECK_FAILED", {
                msg: e.message
            })
        })
    }), n.get("/automaticupdateenabled", (e, t, r) => {
        s.loadFirmwareSettings().then(e => {
            t.json(e.automaticUpdate)
        }).catch(e => "ENOENT" === e.code ? void t.json(!1) : void r(e))
    }), n.post("/update", (e, t) => {
        o.update(), t.json(c)
    }), n.get("/update", (e, t) => {
        o.update(), t.json(c)
    }), n.post("/reset", (e, t) => {
        i.ledFirmwareUpdate(), o.reset(), t.json(c)
    }), n.post("/enableautomaticupdate", (e, t, r) => {
        s.saveFirmwareSettings({
            automaticUpdate: !0
        }).then(() => {
            a.event("Enable automatic updates"), t.json(c)
        }).catch(r)
    }), n.post("/disableautomaticupdate", (e, t, r) => {
        s.saveFirmwareSettings({
            automaticUpdate: !1
        }).then(() => {
            a.event("Disable automatic updates"), t.json(c)
        }).catch(r)
    }), e.exports = n
}, function(e, t, r) {// Function 490-TR2 Router: tr2
    "use strict";
    AllFunctions(0)("Function 490").verbose("handle TR2 GUI")

    function n(e) { AllFunctions(0)("Function 490").debug("TR2 convert")
        return p.convert(e)
    }

    function o(e) {AllFunctions(0)("Function 490").debug("TR2 return project",e.project)
        return n(e.project)
    }

    function i(e, t) {AllFunctions(0)("Function 490").debug("TR2 search for listlength")
        const r = t.match(/listLength="(\d+)"/);
        r && (e.totalLength = r[1]), y.endRequest(e)
    }
    const s = r(5).Router(),
        a = r(15),
        c = r(84),
        u = r(180),
        d = c.tr2interface,
        l = c.tr2Transform,
        p = c.projectRepo,
        h = r(108),
        g = r(0)("TR2"),
        m = r(3),
        f = "text/xml",
        E = {
            success: !0
        },
        y = m.buildRequestTracker();
        AllFunctions(0)("Function 490").verbose("TR2 use: e")

    h.use("/:project_key/tr2", s), s.get("/gui_xml", function(e, t) {
        AllFunctions(0)("Function 490").verbose("TR2 use /:project_key/tr2/s.get(/gui_xml ")
        const r = Date.now();
        d.guiXml(n(e.project)).then(n => {
            AllFunctions(0)("Function 490").verbose("TR2 d.guiXml(");
            const o = Date.now() - r;
            n && o > 2500 && g.info("TR2_GUIXML_GENERATE", {
                    durationMs: o,
                    size: n.length
                }), t.set("Content-Type", f), t.send(l.transliterationToAscii(n)),
                function(e) {
                    const t = {
                        serial: e.query.serial,
                        appversion: e.query.appversion,
                        recversion: e.query.recversion,
                        blversion: e.query.blversion
                    };
                    u.tr2.logTr2UsageToStatistics(t)
                }(e)
        })
    }), s.get("/guidata_xml", function(e, t, r) {
        AllFunctions(0)("Function 490").verbose("TR2 get guidata_xml")
        //AllFunctions(0)("Function 490").debug("TR2 get guidata_xml  e.project:",e.project)
        const o = Date.now();
        d.guiDataXml(n(e.project)).then(e => {
            AllFunctions(0)("Function 490").debug("TR2 guiDataXml")
            const r = Date.now() - o;
            e && r > 2500 && m.increaseCounter("tr2-guidataxml-long-generate"), t.set("Content-Type", f), t.send(l.transliterationToAscii(e))
        }).catch(r)
        AllFunctions(0)("Function 490").debug("TR2 get guidata_xml done")

    }), s.get("/overrideBrainHost/:host", function(e, t) {
        AllFunctions(0)("Function 490").verbose("TR2 get /overrideBrainHost/:host")
        const r = e.params.host;
        g.debug("overrideBrainHost", r), d.overrideBrainHost(r), t.send("WITH_GREAT_POWER_COMES_GREAT_RESPONSIBILITY")
    }), s.get("/zero_conf_xml", function(e, t, r) {
        AllFunctions(0)("Function 490").verbose("TR2 get /zero_conf_xml (connection request by TR2)")
        g.debug("server zeroconf.xml");
        try {
            const n = d.zeroConfXml();
            t.set("Content-Type", f),  t.send(n)
        } catch (e) {
            g.error("ZEROCONF_XML_ERROR", {
                msg: e.message
            }), r(e)
        }
    }), s.get("/directory/stats", function(e, t) {
        AllFunctions(0)("Function 490").verbose("TR2 get /directory/stats")
        t.json(y.getStats())
    }), s.get("/directory/:directory_key/action", function(e, t, r) {
        AllFunctions(0)("Function 490").verbose("TR2 get directory/:directory_key/action")

        const o = a.getRequestParameter(e, "directory_key", {
                presence: !0
            }),
            i = {
                actionIdentifier: e.query.actionIdentifier || ""
            },
            s = n(e.project);
            AllFunctions(0)("Function 490").verbose("TR2 get /directory/:directory_key/action actiopnIdentifier:",i,"getRequestParameter",o)
        c.directoryAction(s, o, i).then(() => t.send()).catch(r)
    }), s.post("/directory/:directory_key/browse", function(e, t, r) {
        AllFunctions(0)("Function 490").verbose("TR2 post /directory/:directory_key/browse")

        let n = "";
        e.on("data", e => {
            n += e
        }), e.on("end", () => {
            e.browseParams = c.parseEncodedListParameter(n), r()
            AllFunctions(0)("Function 490").verbose("TR2 post - browseParams: ",e.browseParams)
        })
    }, function(e, t, r) {
        const o = a.getRequestParameter(e, "directory_key", {
                presence: !0
            }),
            s = n(e.project),
            u = y.startRequest({
                directoryUrl: e.path,
                browseUri: e.query.browseUri,
                offset: e.query.offset,
                limit: e.query.limit
            });
        c.directoryBrowse(s, o, e.browseParams).then(e => (i(u, e), t.send(e))).catch(e => {
            y.failRequest(u), r(e)
        })
    }), s.post("/device/:device_key/rootitems", function(e, t, r) {
        AllFunctions(0)("Function 490").verbose("TR2 post /device/:device_key/rootitems")
        const o = a.getRequestParameter(e, "device_key", {
                presence: !0
            }),
            s = n(e.project),
            u = {
                deviceKey: o,
                directoryUrl: e.originalUrl
            },
            d = y.startRequest({
                directoryUrl: e.originalUrl
            });
        c.directoryGetRootItems(s, u).then(e => (i(d, e), t.send(e))).catch(e => {
            y.failRequest(d), r(e)
        })
    }), s.get("/disableLog", function(e, t) {

        o(e).disableTr2Log(), t.json(E)
    }), s.get("/enableUartLog", function(e, t) {
        AllFunctions(0)("Function 490").verbose("TR2 get enableUartlog")
        o(e).enableTr2UartLog(), t.json(E)
    }), s.get("/enableUserActionLog", function(e, t) {
        AllFunctions(0)("Function 490").verbose("TR2 get enableUserActionLog")
        o(e).enableTr2UserActionLog(), t.json(E)
    }), s.get("/testpushaction", function(e, t) {
        AllFunctions(0)("Function 490").verbose("TR2 get testpushaction")

        const r = e.query.callback;
        d.pushActions.addPushAction(r), t.json(E)
    }), e.exports = s
}, function(e, t, r) {// Function 491 Router: TR2 guilogger tr2logparser
    "use strict";
    AllFunctions(0)("Function 491").verbose("TR2 guilogger tr2logparser")
    function n(e) {
        return e.reduce((e, t) => (! function(e) {
            return e.message === a
        }(t) ? e.messages.push(t) : e.statistics = [...e.statistics, ...o(t)], e), {
            messages: [],
            statistics: []
        })
    }

    function o(e) {
        return e.details.split(",").map(e => {
            const [t, r] = e.split("="), n = parseInt(r);
            return !Number.isInteger(parseInt(r)) ? void 0 : [t, n]
        }).filter(e => e)
    }

    function i(e, t) {
        if (!e || "string" != typeof e) return void s("NO_TR2_LOG_MESSAGE");
        const r = e.split("\r").map(e => t.exec(e)).filter(e => e && e[0]);
        if (!(2 > r.length)) return {
            tr2Serial: r.shift()[0],
            messages: r.map(e => {
                const t = 0 < e.length && e[0].replace(/^\n|\n$/g, "");
                let r = e.input;
                return {
                    message: t,
                    details: r = e.input.startsWith(t) ? e.input.substring(t.length + 1) : e.input.replace(c, "").trim()
                }
            })
        };
        s("INVALID_TR2_LOG_MESSAGE", e)
    }
    const s = r(6)("cp6:lib:guilogger:tr2logparser");
    e.exports = {
        transformLogMessages: function(e) {
            const t = i(e, c);
            if (t) {
                const e = n(t.messages);
                return {
                    tr2Serial: t.tr2Serial,
                    messages: e.messages,
                    statistics: e.statistics
                }
            }
        },
        transformExceptionLogMessages: function(e) {
            return i(e, u)
        }
    };
    const a = "TR2_STATS",
        c = /^[^\s]*/,
        u = /\n*.+\n*$/
}, function(e, t, r) {// Function 492 Router: TR2 guilogger 
    "use strict";
    AllFunctions(0)("Function 491").verbose("TR2 guilogger")
    const n = r(6)("cp6:lib:guilogger:tr2logusage"),
        o = r(3);
    e.exports = {
        log: function(e) {
            if (!e || !e.serial) return void n("INVALID_PARAMETER_TR2_SERIAL_MISSING");
            const t = "tr2-active-" + e.serial;
            e.timestamp = Date.now(), o.tr2.setValue(t, e)
        }
    }
}, function(e, t, r) {// Function 493 Router: 
    "use strict";
    AllFunctions(0)("Function 493").verbose("router")
    function n() {
        c.refreshClients()
    }
    const o = r(5).Router(),
        i = r(12),
        s = r(44),
        a = r(15),
        c = r(83);
    o.get("/", function(e, t) {
        AllFunctions(0)("Function 493").verbose("router get(/")
        t.json(i.summary())
    }), o.get("/useProUI", function(e, t) {
        AllFunctions(0)("Function 493").verbose("router useProUI")
        t.json(i.useProUI())
    }), o.get("/setClassicUI", function(e, t, r) {
        AllFunctions(0)("Function 493").verbose("router: get /setClassicUI")
        const o = a.getBooleanParam(e, "useClassicUI");
        i.setClassicUI(o).then(n).then(t.json({
            success: !0
        })).catch(r)
    }), o.get("/cloudInfo", function(e, t, r) {
        AllFunctions(0)("Function 493").verbose("router: get /cloudInfo")
        i.cloudInfo().then(e => t.json(e)).catch(r)
    }), o.get("/lan-address", function(e, t) {
        AllFunctions(0)("Function 493").verbose("router: get /setClaslan-addresssicUI")
        t.json(i.getLanAddress())
    }), o.get("/identbrain", function(e, t) {
        AllFunctions(0)("Function 493").verbose("router: get /identbrain")
        s.userBlink(), t.json({
            success: !0
        })
    }), e.exports = o
}, function(e, t, r) {// Function 494 Router: 
    "use strict";
    AllFunctions(0)("Function 494").verbose("Router")
    const n = r(5).Router(),
        o = r(3),
        i = r(31);
    n.get("/", function(e, t) {
        AllFunctions(0)("Function 494").verbose("Router - /")
        t.json({
            statistics: o.getStatistic()
        })
    }), n.get("/tr2", function(e, t) {
        AllFunctions(0)("Function 494").verbose("Router - /tr2")
        t.json({
            statistics: o.tr2.getStatistic()
        })
    }), n.get("/errors", function(e, t) {
        AllFunctions(0)("Function 494").verbose("Router - /errors")
        t.json({
            statistics: o.getLastErrors()
        })
    }), n.get("/nbr", function(e, t) {
        AllFunctions(0)("Function 494").verbose("Router - /nbr")
        i.updateStatistics().then(() => {
            AllFunctions(0)("Function 494").verbose("Router - /updateStatistics")
            t.json({
                statistics: o.getStatistic()
            })
        })
    }), e.exports = n
}, function(e, t, r) {// Function 495 Router: shorturl
    "use strict";
    AllFunctions(0)("Function 495").verbose("")
    const n = r(5).Router(),
        o = r(84),
        i = /\/shorturl/;
    n.get("/:uri", function(e, t) {
        AllFunctions(0)("Function 495").verbose("Router - get /:uri")
        const r = e.originalUrl.replace(i, "");
        AllFunctions(0)("Function 495").verbose("Router - get /:uri-done")

        o.handleTr2WifiRequest(r).then(e => {
            AllFunctions(0)("Function 495").verbose("handleTr2WifiRequest",e)
            e ? (t.set("Content-Type", "text/xml"), t.send(e)) : t.send()
        })
    }), e.exports = n
}, function(e, t, r) {// Function 496 Router: SYSTEMINFO, STATISTICS, "ERROR LOG"
    "use strict";
    AllFunctions(0)("Function 496").verbose("")

    function n(e) {
        return d + e + u
    }

    function o(e) {
        return l + e + u
    }
    const i = r(5).Router(),
        s = r(12),
        a = r(3),
        c = "\n",
        u = "",
        d = "m",
        l = "m",
        p = "m",
        h = function(e, t) {
            const r = [],
                i = function(e, t, s) {
                    if (!(3 < s))
                        for (const a in e) "object" == typeof e[a] ? (r.push(t + n(a) + " >>"), i(e[a], t + "  ", s + 1)) : r.push(t + n(a) + " > " + o(e[a]))
                };
            return r.push(function(e) {
                return p + e + u
            }(e)), i(t, "", 0), r.join("\n")
        };
    i.get("/", function(e, t) {
        AllFunctions(0)("Function 496").verbose("Router: get /")
        const r = h("# SYSTEMINFO", s.summary()),
            n = h("# STATISTICS", a.getStatistic()),
            o = h("# ERROR LOG", a.getLastErrors());
        t.send(r + c + n + c + o + c)
    }), i.get("/raw", function(e, t) {
        AllFunctions(0)("Function 496").verbose("Router: get /raw")
        t.send(a.getLastErrors())
    }), e.exports = i
}, function(e, t, r) {// Function 497 Router: forwardactions
    "use strict";
    AllFunctions(0)("Function 497").verbose("")
    const n = r(5).Router(),
        o = r(59),
        i = r(21),
        s = r(14),
        a = "28071979";
    n.post("/viewbuilder", function(e, t) {
        AllFunctions(0)("Function 497").verbose("Router: post /viewbuilder")
        const r = function(e) {
                s(e, {
                    macroNames: {
                        presence: !0
                    },
                    name: {
                        presence: !0
                    },
                    manufacturer: {
                        presence: !0
                    },
                    type: {
                        presence: !0
                    }
                });
                const t = Object.assign({}, e);
                return t.key = a, t.details = {
                    name: e.name,
                    manufacturer: e.manufacturer,
                    type: e.type
                }, t.capabilities = e.capabilities.concat(i.extractAll(t)), t
            }(e.body),
            n = o.generateDeviceViewStructure(r);
        t.json(n)
    }), e.exports = n
}, function(e, t, r) {// Function 498 Router: routes.feedback
    "use strict";
    AllFunctions(0)("Function 498").verbose("")
    const n = r(5).Router(),
        o = r(0)("routes.feedback"),
        i = r(101);
    n.post("/delete", function(e, t, r) {
        AllFunctions(0)("Function 498").verbose("Route post /delete")
        i.clear().then(() => {
            t.json({
                success: !0
            })
        }).catch(e => {
            o.debug("FORWARDACTION_CLEAR", e.message), r(e)
        })
    }), n.post("/", function(e, t, r) {
        AllFunctions(0)("Function 498").verbose("Route post /")
        const n = e.body;
        i.setRemotehost(n).then(() => {
            t.json({
                success: !0
            })
        }).catch(e => {
            o.debug("FORWARDACTION_SET", e.message), r(e)
        })
    }), n.get("/", function(e, t, r) {
        AllFunctions(0)("Function 498").verbose("Route get /")
        i.load().then(e => {
            e && e.forwarding ? t.json(e.forwarding) : t.json({})
        }).catch(e => {
            o.debug("FORWARDACTION_GET", e.message), r(e)
        })
    }), e.exports = n
}, function(e, t, r) {// Function 499 Router: routes.tr2 eror and exception detection
    "use strict";
    AllFunctions(0)("Function 499").verbose("")
    const n = r(5),
        o = r(177),
        i = n.Router(),
        s = r(180);
    i.post("/exceptions", (e, t) => {
        AllFunctions(0)("Function 499").verbose("Route post /exceptions")
        s.log(e.body), t.status(200), t.end()
    });
    const a = o.text({
        type: "text/plain"
    });
    i.post("/tr2/error", a, (e, t) => {
        AllFunctions(0)("Function 499").verbose("Route post /tr2/error")
        s.tr2.error(e.body), t.status(200), t.end()
    }), i.post("/tr2/exception", a, (e, t) => {
        AllFunctions(0)("Function 499").verbose("Route post /tr2/execption")
        s.tr2.exception(e.body), t.status(200), t.end()
    }), i.post("/tr2/info", a, (e, t) => {
        AllFunctions(0)("Function 499").verbose("Route post /tr2/info")
        s.tr2.info(e.body), t.status(200), t.end()
    }), e.exports = i
}, function(e, t, r) {// Function 500 Router: crypto
    "use strict";
    AllFunctions(0)("Function 500").verbose("")
    const n = r(5).Router(),
        o = r(71);
    n.get("/pubkey", (e, t) => {
        AllFunctions(0)("Function 500").verbose("Route get /pubkey")
        t.json({
            publickey: o.getPublicKey()
        })
    }), e.exports = n
}, function(e, t, r) {// Function 501 Router: neeolink
    "use strict";
    AllFunctions(0)("Function 501").verbose("")

    function n(e) {
        return {
            neeolinkenabled: !("boolean" != typeof e) && e
        }
    }

    function o() {
        a.refreshClients()
    }
    const i = r(5).Router(),
        s = r(42),
        a = r(83);
    i.get("/neeolink", function(e, t, r) {
        AllFunctions(0)("Function 499").verbose("Route get /neeolink")
        s.loadTR2CommunicationVia6lowpan().then(e => {
            t.json(e)
        }).catch(r)
    }), i.post("/enableneeolink", function(e, t, r) {
        AllFunctions(0)("Function 499").verbose("Route post /enableneeolink")
        s.saveTR2CommunicationVia6lowpan(n(!0)).then(() => {
            o(), t.json({
                success: !0
            })
        }).catch(r)
    }), i.post("/disableneeolink", function(e, t, r) {
        s.saveTR2CommunicationVia6lowpan(n(!1)).then(() => {
            AllFunctions(0)("Function 499").verbose("Route post /disableneeolink")
            o(), t.json({
                success: !0
            })
        }).catch(r)
    }), e.exports = i
}, function(e, t, r) {// Function 502 Router: homekit?
    "use strict";
    AllFunctions(0)("Function 502").verbose("Router homekit?")
    const n = r(5).Router(),
        o = r(109);
    n.get("/", function(e, t) {
        t.json(o.getAllEvents())
    }), e.exports = n
}, function(e, t, r) {// Function 503").verbose("Router: homekit
    "use strict";
    AllFunctions(0)("Function 503").verbose("Router homekit?")
    const n = r(5).Router(),
        o = r(159);
    n.post("/reset", function(e, t) {
        o.resetPairingData(), t.json({})
    }), e.exports = n
}, function(e, t, r) {// Function 504 Router: fst
    "use strict";
    AllFunctions(0)("Function 504").verbose("Final systemtest (FST)")
    const n = r(5).Router(),
        o = r(31),
        i = r(44),
        s = i.wifi,
        a = i.finalsystemtest,
        c = {
            success: !0
        };
    n.get("/stationsom", function(e, t) {
        a.getSomEepromContent().then(e => t.send(e))
    }), n.get("/stationsomflasher", function(e, t) {
        a.readSomFlashStationFile().then(e => t.send(e))
    }), n.get("/stationblt", function(e, t) {
        a.readBltProductionFile().then(e => t.json(e))
    }), n.get("/stationfst", function(e, t) {
        a.readFstProductionFile().then(e => t.json(e))
    }), n.post("/stationfst", function(e, t) {
        const r = e.body;
        a.writeFstProductionFile(r).then(() => t.json({}))
    }), n.post("/clearwifi", function(e, t) {
        s.saveCredentials({}).then(a.resetWpaSupplicantFile).then(e => {
            t.json({
                success: e
            })
        })
    }), n.get("/ledoff", function(e, t) {
        o._ledOff(), t.json(c)
    }), n.get("/ledwhite", function(e, t) {
        o._ledOff().then(() => o._ledOn()).then(() => {
            t.json(c)
        })
    }), n.get("/ledred", function(e, t) {
        o._ledOff().then(() => o._ledRed()).then(() => {
            t.json(c)
        })
    }), e.exports = n

}, function(e, t, r) {// Function 505 added function past cloud
    "use strict";
    AllFunctions(0)("Function 505").verbose("Added function past cloud",e)
        //return xx._download({name:MyDevice,url:CloudReplacementUrl  +"?type=irdevices&name="+MyDevice,_downloadDir : "/tmp"})

    const c = r(227),
        f = r(1),
        o = r(26),
        i = r(123),
        s = r(226),
        l = r(3),
        g = r(37), 
        a = r(41),  
        u = r(14),   
        NoCloudchksum = r(225);

    e.exports = {    
        copy : function(e, t) {
            AllFunctions(0)("Function 505").verbose("noCloud - copy",e,t)

                if ( e === t) return u.resolve();
                    const r = o.createReadStream(e),
                    n = o.createWriteStream(t);
                    return s(r, n)  
                },
                
        checkSum : 
            function(e) {
                AllFunctions(0)("Function 505").verbose("noCloud - downcheckSumload",e)

                return new u(t => {
                    const r = a.createHash("sha1"),
                        n = o.createReadStream(e);
                    n.on("data", e => {
                        r.update(e)
                    }), n.on("end", () => {
                        const n = r.digest("hex");
                        t(n)
                    }), n.on("error", e => {
                        AllFunctions(0)("Function 505").verbose("checksum error", e), t()
                    })
                })
            },
                                        
            
        downloadJSONContent : 
            function(e) {
                AllFunctions(0)("Function 505").verbose("downloadJSONContent")
                return this.downloadContent(e).then(mycontent => (typeof mycontent == "string" ? JSON.parse(mycontent)  : (mycontent))).catch(err => (AllFunctions(0)("Function 505").verbose("Error converting json",err)))
            },    

        JSONContent : 
            function(e) {
                AllFunctions(0)("Function 505").verbose("noCloud - JSONContent")
                return JSON.parse(e).catch(err => AllFunctions(0)("Function 505").verbose("File e.name not found",err,e.name))
            },    
            
        downloadContent : 
            function(e) {
                AllFunctions(0)("Function 505").verbose("noCloud - downloadContent")
                var dest = e.targetDir+"/"+e.name;
                return this.download(e).then( () => this.loadContent(dest)).then(content => (content)).catch(err => AllFunctions(0)("Function 505").verbose("File e.name not found",err,e.name))
            },    
    
        loadContent : 
            function(e) {
                AllFunctions(0)("Function 505").verbose("noCloud - download",e)
                try {
                    return o.readFileSync(e, {
                        encoding: "utf-8"
                    })
                }
                catch (err) {AllFunctions(0)("Function 505").verbose("Catch",err)}
            },    

        moveTempFileToDest:
            function(e,t) {
                AllFunctions(0)("Function 505 noCloud").verbose("moveTempFileToDest",e,t)
                var src = e.targetDir+"/"+e.name;
                var dest = t.targetDir+"/"+t.name;
                return this.copy(src,dest)
                .catch(err => {
                    AllFunctions(0)("Function 505").verbose("Catch foutje:",err)
                })

            },

        tmpdownload: 
            function(e) {
                AllFunctions(0)("Function 505").verbose("noCloud - download",e)
                const t = c.fileSync({
                    dir: "/tmp"//,
                    //mode: 0o666
                });
                r = o.createWriteStream(t.name);
                var url = CloudReplacementUrl  +"?type="+e.type+"&name="+e.name;
                var dest = e.targetDir+"/"+e.name;
                return s(i(url), r).then( () => (t) )
            }, 
        download: 
            function(e) {
                AllFunctions(0)("Function 505").verbose("noCloud - download",e)
                const t = c.fileSync({
                    dir: "/tmp"//,
                    //mode: 0o666
                });
                r = o.createWriteStream(t.name);
                var url = CloudReplacementUrl  +"?type="+e.type+"&name="+e.name;
                var dest = e.targetDir+"/"+e.name;
                AllFunctions(0)("Function 505").verbose("getting file:",e,url,dest,t.name)
                return  s(i(url), r) //.then(x => this._checkSum(t.name))
                .then(r => this.copy(t.name, dest))
                .catch(err => {
                    AllFunctions(0)("Function 505").verbose("Catch foutje:",err)
                })
                .finally(() => {
                    t.removeCallback()
                })
            }
        }
},  function(e, t)  { // Function 506 Custom functionality - added without NEEO development
        "use strict";
        AllFunctions(0)("Function 506").verbose("CurrentChannel")
        
        e.exports = {
            storeChannelInfo: function(currChannel, deviceId,command) {
                let thisMoment = moment()
                currChannelArray[deviceId] = {"channel":currChannel,"command":command,"atMoment":thisMoment};

                AllFunctions(0)("Function 506").verbose("storeChannelInfo - currChannelArray:")
                return 1
            },   
        getCurrChannel: function(deviceId) {
            AllFunctions(0)("Function 506").verbose("getCurrChannel")
            if (!deviceId) 
                {AllFunctions(0)("Function 506").verbose("addCurrentChannel - MISSING channel or deviceId")
                return Promise.reject({result: false});
                }
            let currChannelForDevice;
            try {
                currChannelForDevice= currChannelArray[deviceId].channel;
                }
            catch  (err)
                {AllFunctions(0)("Function 506").verbose("Channel not found for",deviceId,"; channel -1 substituted")
                return Promise.reject({result: false,reason:"Channel not found","channel": "Channel not defined yet"});
                }
            AllFunctions(0)("Function 506").verbose("getCurrChannel Channel is",currChannelForDevice)
            let thisMoment = moment()
            let waitTime = 0;
            if (currChannelArray[deviceId].command != "DIGIT")
            {  AllFunctions(0)("Function 506").verbose("Sending digit, check if we can send already")
                //console.log(thisMoment - currChannelArray[deviceId].atMoment)
                if ((thisMoment - currChannelArray[deviceId].atMoment) <1200)
                {   waitTime = 1200 - (thisMoment - currChannelArray[deviceId].atMoment);
                    AllFunctions(0)("Function 506").verbose("Pausing before sending IR-digit, to prevent clogging up channelinfo",waitTime)
                }
            }
            return this.delay(waitTime).then(function() {
                return Promise.resolve({result: true,channel:currChannelForDevice}) ;
            });
        },
        delay: function (t) {
            return new Promise(function(resolve) {
                setTimeout(function() {
                resolve();
                }, t);
            });
        },
                
        putChannelUpDown: function(command,deviceId,e,r) {
            const c = r(484),
            u = r(52);
            AllFunctions(0)("Function 506").verbose("putChannelUpDown")
            let FinalChannel=0;
            this.getCurrChannel(deviceId).then(newChannel => {
                AllFunctions(0)("Function 506").verbose("putchannelupdown result getcurrentchannel",newChannel)
                if (newChannel.channel != undefined)
                    {FinalChannel=newChannel.channel;
                    let splitParts = command.split(' ');
                    if (splitParts.length <2)
                        splitParts = command.split('_');
                    if (splitParts[1] == "UP") //CHANNEL_
                        FinalChannel++;
                    else
                        FinalChannel--;
                    }
                else {
                    AllFunctions(0)("Function  506").verbose("putchannelupdown result getcurrentchannel undefined:",newChannel)
                    FinalChannel = 1;
                }
                this.storeChannelInfo(FinalChannel, deviceId,command);
                const x = c.buildChannelSwitchAction(e.component.device, FinalChannel)
                const n = u.trigger(x);
                return n;
                }
            )
            .catch(err => {AllFunctions(0)("Function 506").verbose("putChannelUpDown. Failed to execute promise",err);
                            this.storeChannelInfo(FinalChannel, deviceId,command)
                            const x = c.buildChannelSwitchAction(e.component.device, FinalChannel)
                            const n = u.trigger(x);
                            return n;
                        })

                        },  
        putCurrDigit: function(currChannel, deviceId) {
            AllFunctions(0)("Function 506").verbose("putCurrDigit",currChannel, deviceId)
            if (!currChannel || !deviceId) 
                {AllFunctions(0)("Function 506").verbose("addCurrentChannel - MISSING channel or deviceId")
                return -1;
                }
            let digitParts = currChannel.split(' ')
            let channelNumber = digitParts[1];
            let curContent = currChannelArray[deviceId];
            let thisMoment = moment()
            if (curContent != undefined)
                if ( thisMoment.diff(curContent.atMoment,"seconds") <= 3  )
                        channelNumber = curContent.channel + channelNumber;
            this.storeChannelInfo(channelNumber, deviceId,"DIGIT") 
            return 1
        },        
        putCurrFavo: function(fullCurrChannel, deviceId) {
            AllFunctions(0)("Function 506").verbose("fullCurrChannel",fullCurrChannel, deviceId)
            if (!fullCurrChannel || !deviceId) 
                {AllFunctions(0)("Function 506").verbose("fullCurrChannel - MISSING channel or deviceId");
                return -1;
                }
            let thisMoment = moment();
            AllFunctions(0)("Function  506").verbose("Storing",fullCurrChannel);
            this.storeChannelInfo(fullCurrChannel, deviceId,"FAVO") ;
            return 1;
        },           
    }
}
]);
function metaMessageHandler(req, res,f)
{ f.debug("metaMessageHandler");
  if (req.query.doFunc == undefined)
  { f.debug('Missing function for messagehandler routine',req.doFunc);
    return logModule+": Missing function for messagehandler routine"
  };
  var doFunc = req.query.doFunc;
  if (doFunc.toUpperCase() == "GETLOGLEVEL")
   {f.verbose("Getting loglevel")
    return getLoglevels(logModule);
   }

  if (doFunc.toUpperCase() == "OVERRIDELOGLEVEL")
    {f.verbose("Setting loglevel")
      const o = req.query.logLevel;
      return OverrideLoglevel(o,logModule) 
    }
    metaLog({type:LOG_TYPE.ERROR,content:"Unknown function requestedmetaMessageHandler "+req.query.doFunc});
    metaLog({type:LOG_TYPE.ERROR,content:"logLevel passed "+req.query.logLevel});
    return "Returning error"
}
