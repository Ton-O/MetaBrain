const logModule = "deviceadapter";
process.env.StartupPath = __dirname;
const StartupPath = process.env.StartupPath;
const { metaMessage, LOG_TYPE, LOG_LEVEL,initialiseLogComponents, initialiseLogSeverity,OverrideLoglevel, getLoglevels } = require("/opt/meta/metaMessage");
function metaLog(message) {
    let initMessage = { component:logModule, ORIGIN:logModule,type:LOG_TYPE.ERROR, content:'', deviceId: "" };
    let myMessage = {...initMessage, ...message}
    return metaMessage (myMessage);
  } 
initialiseLogSeverity(logModule); 
//OverrideLoglevel("DEBUG",logModule) // but activate this line if you want DEBUG logging (or VERBOSE etc)
module.exports = function(t) {
    function r(n) {
        if (o[n]) return o[n].exports;
        var d = o[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(d.exports, d, d.exports, r), d.l = !0, d.exports
    }
    var o = {};
    return r.m = t, r.c = o, r.i = function(n) {
        return n
    }, r.d = function(n, d, c) {
        r.o(n, d) || Object.defineProperty(n, d, {
            configurable: !1,
            enumerable: !0,
            get: c
        })
    }, r.n = function(n) {
        var d = n && n.__esModule ? function() {
            return n['default']
        } : function() {
            return n
        };
        return r.d(d, 'a', d), d
    }, r.o = function(n, d) {
        return Object.prototype.hasOwnProperty.call(n, d)
    }, LogFunc=r(0),AllFunctions = r, r.p = '/', r(r.s = 212)
}
([ 
    function(t, r, o) { //o(0)("Function 0").verbose(" handle logging");
    'use strict';
    
    function n() {
        S || /true/.test(p.network) && (f = u.createClient({
            token: p.token,
            subdomain: p.subdomain,
            json: !0
        }))
    }

    function d(T) {
        this.label = T || p.tag
    }
    var c = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function(T) {
            return typeof T
        } : function(T) {
            return T && 'function' == typeof Symbol && T.constructor === Symbol && T !== Symbol.prototype ? 'symbol' : typeof T
        },
        u = o(194),
        p = o(5).log,
        m = o(34).hostname(),
        E = p.version,
        g = /true/.test(p.console) && 'silent' !== process.env.LOG_LEVEL,
        S = !1,
        f = void 0,
        I = void 0,
        O = 0;
    setInterval(function() {
        O = 0
    }, 3600000), d._log = function(T, N) {
        return function() {
            var A = Array.prototype.shift.call(arguments),
                C = Array.prototype.slice.call(arguments);
                if (C.length)
                    if (C.length == 1) 
                       C = C[0];
                        
            var D;
            if (C.length)
                if (C.length == 1) 
                    D =  A + ' ' + JSON.stringify(C[0]);
                    //D = C[0];
                else
                    D =  A + ' ' + JSON.stringify(C);
            else
                    D =  A;
            //console.log('%s - %s: [ %s ] %s', new Date().toISOString(), T, this.label, D)
            metaLog({type:T, content:"["+ this.label + "] "+D,deviceId:"_"})    
            var R = {
                host: m,
                app: p.tag,
                version: E,
                level: T, // T.toUpperCase(),
                source: this.label,
                message: A,
                timestamp: Date.now()
            };
            R.params = ['string', 'number', 'boolean'].includes('undefined' == typeof C ? 'undefined' : c(C)) ? {
                msg: C
            } : C, N && f && (O++, O < p.maximalUpstreamLogMessagePerHour ? f.log(R) : O === p.maximalUpstreamLogMessagePerHour && (R.source = 'LOG', R.message = 'LOG_COUNT_EXCEEDED', R.level = 'WARN', R.params = void 0, f.log(R))), 'error' === T && I && I(R)
             
        }
//    }, d.prototype.debug = d._log('debug', !1), d.prototype.verbose = d._log('verbose', !1), d.prototype.info = d._log('info', !0), d.prototype.warn = d._log('warn', !0), d.prototype.error = d._log('error', !0), t.exports = function(T) {
    }, d.prototype.always = d._log(LOG_TYPE.ALWAYS, !1), d.prototype.debug = d._log(LOG_TYPE.DEBUG, !1), d.prototype.verbose = d._log(LOG_TYPE.VERBOSE, !1), d.prototype.info = d._log(LOG_TYPE.INFO, !0), d.prototype.warn = d._log(LOG_TYPE.WARNING, !0), d.prototype.error = d._log(LOG_TYPE.ERROR, !0), t.exports = function(T) {
        return S || (n(), S = !0), new d(T)
    }, t.exports.registerErrorCallback = function(T) {
        I = T
    }
}, function(t) {//o(0)("Function 1").verbose("");
    t.exports = require('bluebird')
}, function(t) {//o(0)("Function 2").verbose("");
    t.exports = require('debug')
}, function(t, r, o) {o(0)("Function 3").verbose("");
    'use strict';

    function d(S, f) {
        var I = f.controller;
        if (!I) throw new Error('Missing Controller for ' + f.name);
        var O = f.deviceCapabilities || [];
        O.forEach(function(N) {
            S.addCapability(N)
        });
        var T = O.includes('alwaysOn');
        T || S.addButtonGroup('Power'), I.hasNotificationSupport() && S.registerSubscriptionFunction(function() {
            return I.setNotificationCallbacks.apply(I, arguments)
        })
    }
    var c = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function(S) {
            return typeof S
        } : function(S) {
            return S && 'function' == typeof Symbol && S.constructor === Symbol && S !== Symbol.prototype ? 'symbol' : typeof S
        },
        u = o(196),
        p = o(197),
        m = o(199),
        E = o(143),
        g = o(144),
        y = o(0)('DeviceAdapter:SDK');
    t.exports = u, t.exports.brainNotificationSdk = p, t.exports.buildSDKDevice = function(S) {
        if ('object' !== ('undefined' == typeof S ? 'undefined' : c(S))) throw new Error('INVALID_DEVICEPROFILE');
        y.debug('BUILD_SDK_DEVICE', {
            name: S.name,
            manufacturer: S.manufacturer,
            type: S.type
        });
        var f = u.buildCustomDevice(S.name).setManufacturer(S.manufacturer).setType(S.type).addButtonHandler(function(I, O) {
            return S.controller.onButtonPressed(I, O)
        }).registerInitialiseFunction(function() {
            return S.controller.initialize()
        });
        return S.discoveryInstructions && f.enableDiscovery(S.discoveryInstructions, function() {
            return S.controller.discover()
        }), S.timing && f.supportsTiming() && f.defineTiming(S.timing), f.playerControls && y.error('PLAYER_CONTROLS_NOT_IMPLEMENTED'), d(f, S), S.searchTokens.forEach(function(I) {
            return f.addAdditionalSearchToken(I)
        }), S.buttonList.forEach(function(I) {
            return f.addButton(I)
        }), S.deviceSubscriptionHandler && f.registerDeviceSubscriptionHandler(S.deviceSubscriptionHandler), f
    }, t.exports.DeviceController = E, t.exports.Subscriptions = g, t.exports.dynamicDeviceSdk = m
}, function(t, r, o) {o(0)("Function 4").verbose("CEC-Service buildCECDevice, buildButtonMap, buildCECController, forcePowerScan");
    'use strict';

    function d(L, U) {
        var k = U.deviceCapabilities || [];
        k.forEach(function(M) {
            L.addCapability(M)
        });
        var F = k.includes('alwaysOn');
        F || (L.addButtonGroup('Power'), L.addPowerStateSensor({
            getter: U.controller.getPowerState.bind(U.controller)
        }), L.registerSubscriptionFunction(U.controller.brainNotification.bind(U.controller)))
    }

    function p() {
        var L = Date.now() - w;
        return L < P ? (f.warn('REFUSE_TO_RESTART_LIBCEC'), S.resolve()) : (f.debug('TRIGGER STOP LIBCEC'), S.resolve().then(function() {
            return E()
        }).then(function() {
            return m()
        }).timeout(R).then(function() {
            w = Date.now()
        }).catch(function(U) {
            f.error('LIB_CEC_RESTART_FAILED', U.message)
        }))
    }

    function m() {
        var L = Date.now();
        S.resolve   // We're not interested in CEC-functions at the moment.
        return; 
        return T.registerTriggerScanFunction(N.scheduleOneTimePowerScan, p), T.initializeLibCEC().then(function() {
            N.scheduleOneTimePowerScan(), N.scheduleRecurringPowerScan();
            var U = Date.now() - L;
            f.debug('LIBCEC_STARTTIME', {
                durationMs: U
            })
        }).catch(function(U) {
            return f.debug('INIT_LIBCEC_FAILED', {
                error: U.message
            })
        }), S.resolve()
    }

    function E() {
        return N.clearSchedules(), T.failsafeStopLibCEC()
    }
    var y = o(202),
        S = o(1),
        f = o(0)('CEC-Service'),
        I = o(65),
        O = o(66),
        T = o(21),
        N = o(70),
        A = o(3),
        C = o(5).cec,
        D = {
            powerOnDelayMs: C.defaultDevicePowerOnDelayMs,
            sourceSwitchDelayMs: C.defaultSourceSwitchDelayMs,
            shutdownDelayMs: C.defaultShutdownDelayMs
        };
    t.exports = {
        buildCECDevice: function(L) {
            f.debug('BUILD_CEC_DEVICE', {
                name: L.name,
                manufacturer: L.manufacturer,
                type: L.type
            });
            var U = L.timing || D,
                k = A.buildCustomDevice(L.name).setManufacturer(L.manufacturer).setType(L.type).addButtonHandler(function(F, M) {
                    return L.controller.onButtonPressed(F, M)
                }).enableDiscovery(L.discoveryInstructions, function() {
                    return L.controller.discover()
                }).registerInitialiseFunction(m).registerDeviceSubscriptionHandler({
                    deviceAdded: function(M) {
                        return L.controller.deviceAdded(M)
                    },
                    deviceRemoved: function(M) {
                        return L.controller.deviceRemoved(M)
                    },
                    initializeDeviceList: function(M) {
                        return L.controller.initializeDeviceList(M)
                    }
                });
            return k.supportsTiming() && k.defineTiming(U), k.setDriverVersion(1), d(k, L), L.searchTokens.forEach(function(F) {
                return k.addAdditionalSearchToken(F)
            }), L.buttonMap.getSupportedButtons().forEach(function(F) {
                return k.addButton(F)
            }), k
        },
        buildButtonMap: function(L) {
            return new I(L)
        },
        buildCECController: function(L, U, k, F) {
            return new O(L, U, k, F)
        },
        initializeLibCEC: m,
        shutdownLibCEC: E,
        forcePowerScan: function(L) {
            var U = parseInt(L, 10);
            return f.debug('forcePowerScan', U), N.forcePowerScan(U)
        },
        keyCodes: y
    };
    var R = 12000,
        P = 5e3,
        w = 0
}, function(t) { // o(0)("Function 5").verbose("");
    'use strict';
    var n = process.env.IP || '127.0.0.1',
        d = process.env.PORT || 3002,
        c = process.env.CP6_HOSTNAME || '127.0.0.1',
        u = process.env.CP6_PORT || 3001,
        p = process.env.FLUSH_BRAINSTATS_S || 14400;
    t.exports = {
        env: process.env.NODE_ENV || 'development',
        port: d,
        ip: n,
        adapters: ['hue', 'sonos', 'zwave'],
        log: {
            level: process.env.LOG_LEVEL || 'info',
            console: process.env.LOG_CONSOLE || !0,
            network: process.env.LOG_NETWORK || !1,
            token: process.env.LOG_TOKEN || 'b8f841c9-9962-4462-9b16-5b513ae48ac0',
            subdomain: process.env.LOG_SUBDOMAIN || 'neeo',
            tag: process.env.LOG_TAG || 'DEA',
            version: process.env.NEEO_RELEASE || 'DEV',
            maximalUpstreamLogMessagePerHour: 200
        },
        db: {
            basePath: process.env.DB_BASE_PATH || __dirname + '/../db',
            adapters: ['hue', 'sonos', 'zwave'],
            maxSearchResults: process.env.DB_MAX_SEARCH_RESULTS || 10,
            threshold: process.env.DB_THRESHOLD || 0.5
        },
        notification: {
            hostname: c,
            port: u,
            maxQueueSize: process.env.NOTIFICATION_MAX_QUEUE_SIZE || 50
        },
        store: {
            dataFile: process.env.STORE_DATAFILE || './data/store.json',
            type: process.env.STORE_TYPE || 'single'
        },
        sonos: {
            disableIpDiscovery: process.env.SONOS_DISABLE_IP_DISCOVERY || !1,
            listLimit: process.env.SONOS_LIST_LIMIT || 32,
            spotifyAPILimit: process.env.SONOS_SPOTIFY_API_LIMIT || 64,
            apiKey: process.env.SONOS_API_KEY || '123e4567-e89b-12d3-a456-426655440000',
            sonosCertificate: process.env.SONOS_CA_CERT || '-----BEGIN CERTIFICATE-----\nMIIGUzCCBDugAwIBAgIJAN526bolv8HvMA0GCSqGSIb3DQEBCwUAMIGVMQswCQYD\nVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FudGEgQmFy\nYmFyYTETMBEGA1UECgwKU29ub3MsIEluYzEWMBQGA1UECwwNU29ub3MgRGV2aWNl\nczEsMCoGA1UEAwwjU29ub3MgRGV2aWNlIEF1dGhlbnRpY2F0aW9uIFJvb3QgQ0Ew\nIBcNMTUxMDA1MDE1MDM4WhgPMjA1NTA5MjUwMTUwMzhaMIGVMQswCQYDVQQGEwJV\nUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FudGEgQmFyYmFyYTET\nMBEGA1UECgwKU29ub3MsIEluYzEWMBQGA1UECwwNU29ub3MgRGV2aWNlczEsMCoG\nA1UEAwwjU29ub3MgRGV2aWNlIEF1dGhlbnRpY2F0aW9uIFJvb3QgQ0EwggIiMA0G\nCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQCYP0pOHXxJNjApEW1sl1pXZmty0HAI\nnDAO75u1wyazBmgtReQVK+OSrW3nm1obhZIaZy7tsz7oEgVI79pPwFSeEa9wsoaG\n5UzfiasSu5rsf+s5yGL7nnN658nNEIVDZAJdh6FAXzIt2TsvBqYp7HdO66ZBEBb9\nUK5848WlbQnLFyab4ZihuCHklxVzeOsalLDiQWdXhmM9GHar/gy9rufKvmSwlXPi\nhhU5KgwoK9rW9pIb8bAbTT3uiRfQh8SmH041CT28YXSDKLvPnja8xbigIVG0r8Fo\nw9L7F7az4lW1OaIuszNbejUjd+9yw4fBHeg9cEwcrkqkklIrtpjyDIpwN8dBf7Ff\nkUBQhHlbQyX37PsCl8pbpKsMrEvjDbTJW893slmIjnf0XLYqAr+JOsKZDs9VQRED\nmJJAUWKKz9H1J/Ed+rId7OGmAD1DeWDnHsgszU+38eS6Tcscdiuor+R94Wb+mSGg\nVL6rWWsLTW4lbmcYcKYCt5KMycr8bVw4kDxHKJmZVqcug7GfyMpcy8alE9NgswaM\nSNMpKPL/XABmvcLmd3O1xr15m5USrkdva1U/O90PLu73H1Uw/qGjx6KBKjygRDPl\ngrLRGBv+yHd3+5u0ztCD5Ag9R9xTxq5Pep/UwA4XTAZbsuOddH2lg+3iMYsDubEq\nSmKdWDDK+W0zGwIDAQABo4GhMIGeMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYE\nFPKs3CiyYmhuy6zGRmirXT9ti4IRMB8GA1UdIwQYMBaAFPKs3CiyYmhuy6zGRmir\nXT9ti4IRMA4GA1UdDwEB/wQEAwIBBjA7BgNVHR8ENDAyMDCgLqAshipodHRwOi8v\nY2VydHMud3Muc29ub3MuY29tL2NlcnRzL2RldmljZS9jcmwwDQYJKoZIhvcNAQEL\nBQADggIBAA/ISAUd1IKddANWy5MgqRCwJYWtGOriFqp9GcvPbrLUz6SfJ86lZCFz\n4GSrTSKQICXVaGuLOnC7fQMiBTbq9R7eKih5hrQZz8O/LqvobgLUNMzS1ahvgqx8\nYz0avj6T4//MKQSd4mt5wS6b3zCl7AZwtwA9drCcoAyUegl2/Pp4DoIRm9w91POL\nGurgSmHJ8D+8GZwyi5V9LWuvaglI97MzzmisgxRerkOEXFlT4fM6nT70bk39bFhK\nCQZmrRigrYA0A1rHemt0xr1YtdUkK3Uyu1yvSScXguIq/H/SGnOtcCX/q6uOBHRO\nhKAxLscUgEQefLbGo2awMJGdheNIAyTMA3jjd1rLpAFPbDaMPfDM8Wkmu0/SrJob\nuBaHP/xDd5A47J0dv3enkFnuaYkt0w9qiiUzXQzk8h6Si5VQ65EyxLyU/xxRt7Bk\nvU5XbaL5lL8AvAJBxO4Az1a+aLY0gXJzSCvuOH+9pdhDBU2DBr6ji9eCAp1fjESd\nJG5kQlpYoDrr+BT4divD5Onnq6OY3l2iVQW8V5JzELtn+YXjekjxrRTUKB+AJe3o\nPCBKkzssZY5+sXEQVIVXoRMk4xivZXyidTPqNlNFGuz57N7Qi/okHYOzeBuTZZiQ\nlpUhu6Y8JTH5zRGs/zdwXTIDbB0hQyoDHlIRcHcP6Ywg4Y6C+OL7\n-----END CERTIFICATE-----',
            discoveryTimeMs: 4e3,
            handshakeTimeoutMs: 8e3,
            rejectUnauthorized: process.env.SONOS_REJECT_UNAUTHORIZED || !1
        },
        hue: {
            pollingTimeMs: process.env.HUE_POLLING_INTERVAL || 2e3
        },
        zwave: {
            jsonrpchost: 'http://' + c + '/remote/json-rpc',
            notificationhost: 'ws://' + c + ':8081/remote/events',
            websocketsReconnectDelayMs: process.env.ZWAVE_WEBSOCKET_RECONNECT_DELAY_MS || 5e3,
            prosystNotificationCacheTimeoutMs: process.env.PROSYST_NOTIFICATION_CACHE_TIMEOUT_MS || 2e3,
            prosystNotificationCacheLimit: process.env.PROSYST_NOTIFICATION_CACHE_LIMIT || 32,
            initializationMaxRetries: process.env.PROSYST_API_INIT_RETRIES || 3,
            initializationRetryDelayMs: process.env.PROSYST_API_INIT_RETRY_DELAY || 2e4
        },
        cec: {
            port: process.env.CEC_PORT || '',
            defaultDevicePowerOnDelayMs: 3e3,
            defaultSourceSwitchDelayMs: 3e3,
            defaultShutdownDelayMs: 3e3,
            powerscanMaximalCallCount: 100,
            powerscanLogAsLongDurationMs: 18000,
            powerscanScanDelayMs: 1e3,
            recurringPowerscanIntervallMs: 300000,
            recurringPowerscanWaitTimeAfterLastKeypressMs: 1e4
        },
        statistics: {
            flushIntervalSeconds: p
        }
    }
}, function(t, r, o) {o(0)("Function  6").verbose("neeo:lib:statistics STATISTICS_KPI_DEA_APP");
    'use strict';
    var d = o(5).statistics,
        c = o(207),
        u = new c(d),
        p = o(0)('Statistics'),
        m = o(2)('neeo:lib:statistics'),
        E = o(178);
    E(function(y) {
        m('WARNING_EVENT_LOOP_BLOCKED', y), u.increaseCounter('eventLoopBlockedTimeMs', y)
    }, {
        threshold: 100
    }), t.exports = {
        getInstance: function() {
            return u
        },
        increaseCounter: function(S, f) {
            u.increaseCounter(S, f)
        },
        setValue: function(S, f) {
            u.setValue(S, f)
        },
        startTask: function() {
            return p.debug('startTask, interval', d.flushIntervalSeconds), setInterval(function() {
                p.debug('statistics.logAndFlushStatistics');
                var y = u.getStatistic();
                0 < Object.keys(y).length ? p.info('STATISTICS_KPI_DEA_APP', y) : p.debug('NO_STATISTICS_FOUND_TO_LOG'), u.clearStatistics()
            }, 1e3 * d.flushIntervalSeconds)
        }
    }
}, function(t) {
    t.exports = require('express')
}, function(t) {
    'use strict';

    function n(c, u) {
        var p = u.match(/\((\d+)\)/);
        return Array.isArray(p) ? c + ' ' + p[1] : c + u.replace(/\+/, ' ')
    }

    function d(c) {
        return c.replace(/([A-Z])/g, ' $1').replace(/^./, function(u) {
            return u.toUpperCase()
        }).trim()
    }
    t.exports.getActuatorPrefix = function(c) {
        return c ? '/zwave/secure/actuator/' : '/zwave/actuator/'
    }, t.exports.getEventPrefix = function(c) {
        return c ? '/zwave/secure/event/' : '/zwave/event/'
    }, t.exports.getSensorPrefix = function(c, u, p) {
        return u && !p ? c ? '/zwave/secure/sensorevent/' : '/zwave/sensorevent/' : c ? '/zwave/secure/sensor/' : '/zwave/sensor/'
    }, t.exports.humanizeLabel = function(c, u) {
        if (c) {
            var p = void 0;
            return p = / /.test(c) ? c : d(c), u ? n(p, u) : p
        }
    }, t.exports.buildNeeoSensorName = function(c, u) {
        if (c) return u || (u = ''), 'SENSOR_' + c.toUpperCase() + u
    }, t.exports.removeNonSensorValueParts = function(c) {
        if ('string' == typeof c) {
            var u = c.match(/(\s\[\d+\])/);
            u && u[1] && (c = c.replace(u[1], ''))
        }
        return c
    }
}, function(t) {
    'use strict';

    function n(c, u) {
        if (!(c instanceof u)) throw new TypeError('Cannot call a class as a function')
    }
    var d = function() {
        function c(u, p) {
            for (var m = 0, E; m < p.length; m++) E = p[m], E.enumerable = E.enumerable || !1, E.configurable = !0, 'value' in E && (E.writable = !0), Object.defineProperty(u, E.key, E)
        }
        return function(u, p, m) {
            return p && c(u.prototype, p), m && c(u, m), u
        }
    }();
    t.exports = function() {
        function c() {
            n(this, c)
        }
        return d(c, null, [{
            key: 'transformSensorResult',
            value: function(p) {
                return p
            }
        }, {
            key: 'transformEventValue',
            value: function(p) {
                return p
            }
        }, {
            key: 'transformActuatorValue',
            value: function(p) {
                return p
            }
        }, {
            key: 'buildRWActuator',
            value: function() {}
        }, {
            key: 'buildREActuator',
            value: function() {}
        }, {
            key: 'buildEventActuator',
            value: function() {}
        }]), c
    }()
}, function(t) {
    t.exports = require('events')
}, function(t) {
    t.exports = require('lodash/flattenDeep')
}, function(t, r, o) {o(0)("Function  12").verbose("neeo:lib:cec:powerstate");
    'use strict';

    function n(U) {
        if (Array.isArray(U)) {
            for (var k = 0, F = Array(U.length); k < U.length; k++) F[k] = U[k];
            return F
        }
        return Array.from(U)
    }

    function d() {
        C.clear()
    }

    function p(U) {
        return Array.isArray(U) && 0 !== U.length ? (I('UPDATE_CEC_POWER_STATE'), U.filter(function(k) {
            return k && k.physicalAddress && k.physicalAddress !== L && 'undefined' != typeof k.logicalAddress
        }).forEach(function(k) {
            var F = k.physicalAddress + ':' + k.logicalAddress;
            if (!w.includes(k.powerStatus)) return I('INVALID_POWERSTATE_IGNORED %o', k.powerStatus), void C.set(F, 'UNKNOWN');
            var M = C.get(F) !== k.powerStatus;
            if (M) {
                I('CEC_POWERSTATE_CHANGED %o', {
                    key: F,
                    currentState: k.powerStatus
                }), C.set(F, k.powerStatus);
                var x = k.powerStatus === R;
                y(k, x), S(F, x)
            } else I('POWERSTATE_NOT_CHANGED')
        }), !0) : (I('IGNORED_INVALID_SCAN_RESULT %o', U), !1)
    }

    function y(U, k) {
        var F = A.getReverseMappedCecAddress(U.logicalAddress, U.physicalAddress);
        N.powerstateChanged({
            neeoCecAddress: F.physicalAddress + ':' + F.logicalAddress,
            poweredOn: k
        })
    }

    function S(U, k) {
        return O.sendNotification({
            uniqueDeviceId: U,
            component: 'POWER',
            value: k,
            data: k,
            raw: !0,
            type: 'NEEO_CEC_POWERSTATE:' + U
        }, 'raw').catch(function(M) {
            I('FAILED_TO_SEND_NOTIFICATION', M.message)
        }), null
    }
    var I = o(2)('neeo:lib:cec:powerstate'),
        O = o(3).brainNotificationSdk,
        T = o(20),
        N = T.instance,
        A = o(19),
        C = new Map,
        D = 0,
        R = 'ON',
        P = 'STANDBY',
        w = [R, P],
        L = '15.15.15.15';
    t.exports = {
            resetPowerStateCache: d,
            updatePowerState: p,
            updatePowerStateByLogicalAddress: function(U) {
                if (!U || 'undefined' == typeof U.sourceLogicalAddress) return void I('INVALID_INPUT_DATA');
                var k = U.sourceLogicalAddress,
                    F = !0 === U.powerOn;
                C.forEach(function(M, x) {
                    if (x.endsWith(':' + k)) {
                        var B = x.split(':')[0],
                            V = {
                                physicalAddress: B,
                                logicalAddress: k,
                                powerStatus: F ? R : P
                            };
                        I('UPDATE_POWERSTATE_LAD %o', V), p([V])
                    }
                })
            },
            updateLastCecKeyAction: function() {
                D = Date.now()
            },
            getLastCecKeyActionTimestampMs: function() {
                return Date.now() - D
            },
            isDevicePoweredOn: function(U) {
                var k = C.get(U);
                return I('powerState present', k), k === R
            },
            getPowerState: function() {
                return [].concat(n(C))
            }
        },
        function() {
            I('ARMORED_POWERSTATE_INITIALISED_WATCHER'), N.once(T.POWERSTATE_INITIALISED, function() {
                I('CLEAR_POWERSTATE_CACHE'), d()
            })
        }()
}, function(t, r, o) {o(0)("Function  13").verbose("some neeo-0functions, many 'needs to be implemented'");
    'use strict';
    var n = o(1),
        d = o(5).adapters,
        c = o(15),
        u = o(0)('Device'),
        p = void 0,
        E = t.exports = function(g) {
            if (!g) throw new Error('missing device type!');
            if (0 > d.indexOf(g)) throw new Error('invalid device type ' + g);
            this.type = g, this.repo = new c(g), this.sensorValues = {}
        };
    E.setNotification = function(g) {
        p = g
    }, E.prototype._loadSubscriptions = function() {
        try {
            this.subscriptions = this.repo.load('subscriptions') || {}
        } catch (g) {
            u.debug('LOAD_SUBSCRIPTIONS', {
                type: this.type,
                msg: g.message
            }), this.subscriptions = {}
        }
    }, E.prototype._saveSubscriptions = function() {
        try {
            this.repo.save('subscriptions', this.subscriptions)
        } catch (g) {
            u.error('SAVE_SUBSCRIPTIONS', g.message)
        }
    }, E.prototype._resetSubscriptions = function() {
        this.subscriptions = {}, this._saveSubscriptions()
    }, E.prototype._hasSubscriptions = function() {
        return 0 < Object.keys(this.subscriptions).length
    }, E.prototype.handleStateUpdate = function(g, y, S) {
        var f = this,
            I = this.subscriptions[g] || [];
        this.sensorValues[g] = this.sensorValues[g] || {};
        var O = this.sensorValues[g][y];
        if (O !== S) return I.forEach(function(T) {
            f.sendNotification('DEVICE_SENSOR_UPDATE', {
                sensorEventKey: T + ':' + y,
                sensorValue: S
            })
        }), this.sensorValues[g][y] = S, !0
    }, E.prototype.unsubscribeAll = function() {
        return this._resetSubscriptions(), n.resolve()
    }, E.prototype.unsubscribe = function(g) {
        return this.subscriptions[g] ? (delete this.subscriptions[g], this._saveSubscriptions(), n.resolve()) : n.reject(new Error('device ' + g + ' has no subscription to unsuscribe'))
    }, E.prototype.sendNotification = function(g, y) {
        if (!p) throw new Error('notification module not initialized!');
        if (!g) throw new Error('uri is required!');
        p.send({
            type: g,
            data: y
        })
    }, E.prototype.subscribe = function(g, y) {
        if (!(g && y)) throw new Error('invalid subscription. deviceId: "' + g + '"');
        var S = this._hasSubscriptions();
        return (this.subscriptions[g] || (this.subscriptions[g] = []), -1 < this.subscriptions[g].indexOf(y)) ? (u.debug('device already subscribed', {
            deviceId: g,
            eventUriPrefix: y
        }), n.reject(new Error('device ' + g + ' is already subscribed to URI ' + y))) : (u.debug('subscribe device', {
            deviceId: g,
            eventUriPrefix: y
        }), this.subscriptions[g].push(y), this._saveSubscriptions(), S || (u.debug('enabling notifications'), this.enableNotifications()), n.resolve())
    }, E.prototype.getAdapter = function() {
        throw new Error('to be implemented!')
    }, E.prototype.discover = function() {
        throw new Error('to be implemented!')
    }, E.prototype.cancel = function() {
        return n.resolve()
    }, E.prototype.registered = function() {
        throw new Error('to be implemented!')
    }, E.prototype.register = function() {
        throw new Error('to be implemented!')
    }, E.prototype.unregister = function() {
        return n.resolve()
    }, E.prototype.enableNotifications = function() {
        throw new Error('to be implemented!')
    }, E.prototype.reset = function() {
        throw new Error('to be implemented!')
    }, E.prototype.initialize = function() {
        return u.debug('initialize', {
            type: this.type
        }), this._loadSubscriptions(), n.resolve()
    }, E.prototype.shutdown = function() {
        u.debug('shutdown', {
            type: this.type
        })
    }
}, function(t, r, o) {o(0)("Function  14").verbose("neeo:sdk:deviceadpater init of neeo-services");
    'use strict';
    var g = o(0)('NEEO_ADAPTER'),
        y = o(5),
        S = o(2)('neeo:sdk:deviceadpater'),
        f = o(3),
        I = o(74),
        O = o(77),
        T = o(76),
        N = o(79),
        A = o(85),
        C = o(99),
        D = o(114),
        R = o(117),
        P = o(119),
        w = o(80),
        L = o(129),
        U = o(91),
        k = o(138),
        F = o(135),
        M = o(116),
        x = o(104),
        B = o(122),
        G = O.initializeDevices([T, N, A, C, D, R, P, w, L, U, k, F, M, B, x]),
        Y = {
            brain: y.notification.hostname,
            port: y.port,
            name: 'neeo-deviceadapter',
            baseurl: 'http://' + y.ip + ':' + y.port + '/neeodeviceadapter',
            devices: G,
            maxConnectionAttempts: 16
        };
    t.exports = {
        initializeService: function(j) {
            return I.setWireRequestHandlerCallback(j), f.startServer(Y, I).then(function() {
                S('Internal SDK started')
            }).catch(function(K) {
                g.error('SDK_STARTUP_ERROR', {
                    msg: K.message
                }), process.exit(1)
            })
        },
        shutdownService: function() {
            S('Received kill signal, shutting down gracefully.');
            var j = setTimeout(function() {
                S('Could not close connections in time, forcefully shutting down'), process.exit(1)
            }, 1e4);
            return f.stopServer(Y).then(function() {
                S('Closed out remaining connections.'), clearTimeout(j)
            }).catch(function(K) {
                S('SHUTDOWN ERROR: %o', K), process.exit(1)
            })
        },
        getAdapter: function(j) {
            return I.getDeviceAdapter(j)
        },
        getAdapterDefinition: function(j) {
            return I.getDeviceAdapter(j)
        },
        getDevice: function(j) {
            return I.getDevice(j)
        },
        searchDevice: function(j) {
            return I.searchDevice(j)
        },
        getWorksWithNEEODeviceList: function() {
            return G
        }
    }
}, function(t, r, o) {o(0)("Function  15").verbose("neeo:lib:repo");
    'use strict';
    var n = o(2)('neeo:lib:repo'),
        d = void 0,
        c = t.exports = function(u) {
            this.section = u, this.prefix = u + '.'
        };
    c.setStore = function(u) {
        n('SET_STORE'), d = u
    }, c.loadAll = function() {
        if (!d) return null;
        var u = d.allSync();
        if (u instanceof Error) throw u;
        return u
    }, c.saveAll = function(u) {
        if (!d) throw new Error('store is not set');
        if (!u) throw new Error('save config must not be empty');
        d.replace(u)
    }, c.prototype.getSection = function() {
        return this.section
    }, c.prototype.save = function(u, p) {
        if (d) {
            if (!p) throw new Error('save value must not be empty');
            d.saveSync(this.prefix + u, p)
        }
    }, c.prototype.load = function(u) {
        if (!d) return null;
        var p = d.getSync(this.prefix + u);
        if (p instanceof Error) throw p;
        return p
    }, c.prototype.loadFailsafe = function(u) {
        try {
            return this.load(u)
        } catch (p) {}
    }, c.prototype.delete = function(u) {
        d && d.deleteSync(this.prefix + u)
    }
}, function(t, r, o) {o(0)("Function  16").verbose("com.prosyst.mbs.services.zwave.deviceclasses.*");
    'use strict';

    function n(y) {
        return -1 < g.indexOf(y)
    }
    var d = 'DeviceClass',
        c = [o(163), o(164), o(55), o(30), o(165), o(162), o(166), o(29)],
        g = ['com.prosyst.mbs.services.zwave.deviceclasses.PowerLevel', 'com.prosyst.mbs.services.zwave.deviceclasses.FirmwareUpdate', 'com.prosyst.mbs.services.zwave.deviceclasses.Configuration', 'com.prosyst.mbs.services.zwave.deviceclasses.Clock'];
    t.exports.getSupportedDeviceClasses = function() {
        return c.map(function(y) {
            return y.getProsystDeviceClass()
        })
    }, t.exports.mapNeeoDeviceClassToProsystDeviceClass = function(y) {
        var S = c.find(function(f) {
            return f.matchNeeoDeviceClass(y)
        });
        if (S) return S.getProsystDeviceClass()
    }, t.exports.mapProsystDeviceClassToNeeoDeviceClass = function(y) {
        var S = c.find(function(f) {
            return f.matchProsystDeviceClass(y)
        });
        if (S) return S.buildNeeoDeviceClass()
    }, t.exports.buildRWActuator = function(y, S, f) {
        if (y && !n(y[d])) {
            var I = c.find(function(O) {
                return O.matchProsystDeviceClass(y[d])
            });
            if (I) return I.buildRWActuator(y, S, f)
        }
    }, t.exports.buildREActuator = function(y, S, f) {
        if (y && !n(y[d])) {
            var I = c.find(function(O) {
                return O.matchProsystDeviceClass(y[d])
            });
            if (I) return I.buildREActuator(y, S, f)
        }
    }, t.exports.buildEventActuator = function(y, S, f) {
        if (y && !n(y[d])) {
            var I = c.find(function(O) {
                return O.matchProsystDeviceClass(y[d])
            });
            if (I) return I.buildEventActuator(y, S, f)
        }
    }, t.exports.transformSensorResult = function(y, S) {
        var f = c.find(function(I) {
            return I.matchProsystDeviceClass(S)
        });
        return f ? f.transformSensorResult(y) : y
    }, t.exports.transformEventValue = function(y, S) {
        var f = c.find(function(I) {
            return I.matchProsystDeviceClass(S)
        });
        return f ? f.transformEventValue(y) : y
    }, t.exports.transformActuatorValue = function(y, S) {
        var f = c.find(function(I) {
            return I.matchProsystDeviceClass(S)
        });
        return f ? f.transformActuatorValue(y) : y
    }
}, function(t, r, o) {o(0)("Function  17").verbose("ZWave:Sensorbuilder");
    'use strict';

    function n(X) {
        return X === M ? {
            name: 'alarmaccess',
            label: 'Access Control Alarm'
        } : X === x ? {
            name: 'alarmburglar',
            label: 'Burglar Alarm'
        } : X === B ? {
            name: 'alarmclock',
            label: 'Clock Alarm'
        } : X === V ? {
            name: 'alarmco',
            label: 'CO Alarm'
        } : X === G ? {
            name: 'alarmco2',
            label: 'CO2 Alarm'
        } : X === W ? {
            name: 'alarmemergency',
            label: 'Emergency Alarm'
        } : X === H ? {
            name: 'alarmpower',
            label: 'Power Management Alarm'
        } : X === Y ? {
            name: 'alarmheat',
            label: 'Heat Alarm'
        } : X === j ? {
            name: 'alarmsmoke',
            label: 'Smoke Alarm'
        } : X === K ? {
            name: 'alarmsystem',
            label: 'System Alarm'
        } : X === z ? {
            name: 'alarmwater',
            label: 'Water Alarm'
        } : (c.debug('alarm type not found, use generic alarm', X), {
            name: 'alarm',
            label: 'Alarm'
        })
    }

    function d(X) {
        return X === P ? {
            name: 'multiluminance',
            label: 'Luminance Sensor'
        } : X === L ? {
            name: 'multitemperature',
            label: 'Temperature Sensor'
        } : X === R ? {
            name: 'multigeneralpurposealarm',
            label: 'Alarm Sensor'
        } : X === w ? {
            name: 'multimeterwatt',
            label: 'Power Sensor'
        } : X === U ? {
            name: 'multihumidity',
            label: 'Humidity Sensor'
        } : X === k ? {
            name: 'multiultraviolet',
            label: 'Ultraviolet Sensor'
        } : X === F ? {
            name: 'multiseismicintensity',
            label: 'Seismic Intensity Sensor'
        } : (c.debug('unknown multilevel type', X), {
            name: 'multilevel',
            label: 'Multilevel Sensor'
        })
    }
    var c = o(0)('ZWave:Sensorbuilder'),
        u = o(8),
        p = o(16),
        m = o(55),
        S = 'com.prosyst.mbs.services.hdm.deviceclasses.BinarySensor',
        f = 'com.prosyst.mbs.services.hdm.deviceclasses.BatteryLevel',
        I = 'com.prosyst.mbs.services.hdm.deviceclasses.MultiLevelSensor',
        O = 'com.prosyst.mbs.services.hdm.deviceclasses.BinarySliderSwitch',
        T = 'com.prosyst.mbs.services.hdm.deviceclasses.Meter',
        R = 'General Purpose Alarm',
        P = 'light',
        w = 'Power',
        L = 'temperature',
        U = 'humidity',
        k = 'Ultraviolet',
        F = 'Seismic Intensity',
        M = 'Access Control Alarm',
        x = 'Burglar Alarm',
        B = 'Clock Alarm',
        V = 'CO Alarm',
        G = 'CO2 Alarm',
        W = 'Emergency Alarm',
        H = 'Power Management Alarm',
        Y = 'Heat Alarm',
        j = 'Smoke Alarm',
        K = 'System Alarm',
        z = 'Water Alarm',
        q = {
            alarm: {
                name: 'AlarmSensor',
                type: 'binary'
            },
            alarmaccess: {
                name: 'AccessSensor',
                type: 'binary'
            },
            alarmburglar: {
                name: 'BurglarSensor',
                type: 'binary'
            },
            alarmclock: {
                name: 'ClockSensor',
                type: 'binary'
            },
            alarmco: {
                name: 'COSensor',
                type: 'binary'
            },
            alarmco2: {
                name: 'CO2Sensor',
                type: 'binary'
            },
            alarmemergency: {
                name: 'EmergencySensor',
                type: 'binary'
            },
            alarmpower: {
                name: 'PowerSensor',
                type: 'binary'
            },
            alarmheat: {
                name: 'HeatSensor',
                type: 'binary'
            },
            alarmsmoke: {
                name: 'SmokeSensor',
                type: 'binary'
            },
            alarmsystem: {
                name: 'SystemSensor',
                type: 'binary'
            },
            alarmwater: {
                name: 'WaterSensor',
                type: 'binary'
            },
            binary: {
                name: 'BinarySensor',
                type: 'binary'
            },
            binaryswitch: {
                name: 'BinarySwitch',
                type: 'binary'
            },
            binarysliderswitch: {
                name: 'BinarySliderSwitch',
                type: 'binary'
            },
            battery: {
                name: 'BatterySensor',
                type: 'range',
                range: [0, 100],
                unit: '%'
            },
            keypad: {
                name: 'Keypad',
                type: 'keypad'
            },
            meterwatt: {
                name: 'ElectricMeter',
                type: 'range',
                range: [0, 10000],
                unit: 'W'
            },
            meterkwh: {
                name: 'ElectricMeter',
                type: 'range',
                range: [0, 10],
                unit: 'KWH'
            },
            metervolt: {
                name: 'ElectricMeter',
                type: 'range',
                range: [0, 300],
                unit: 'V'
            },
            meterampere: {
                name: 'ElectricMeter',
                type: 'range',
                range: [0, 50],
                unit: 'A'
            },
            multitemperature: {
                name: 'TemperatureSensor',
                type: 'range',
                range: [-30, 100],
                unit: '\xB0'
            },
            multiluminance: {
                name: 'LightSensor',
                type: 'range',
                range: [0, 33000],
                unit: 'Lux'
            },
            multihumidity: {
                name: 'MultiHumiditySensor',
                type: 'range',
                range: [0, 100],
                unit: '%'
            },
            multimeterwatt: {
                name: 'ElectricMeter',
                type: 'range',
                range: [0, 10000],
                unit: 'W'
            },
            multilevel: {
                name: 'MultilevelSensor',
                type: 'range',
                range: [0, 100],
                unit: '%'
            },
            multilevelswitch: {
                name: 'MultilevelSwitchSensor',
                type: 'range',
                range: [m.getMinValue(), m.getMaxValue()],
                unit: '%'
            },
            multigeneralpurposealarm: {
                name: 'MultilevelSensor',
                type: 'range',
                range: [0, 100],
                unit: ''
            },
            multiultraviolet: {
                name: 'MultiUltravioletSensor',
                type: 'range',
                range: [0, 20],
                unit: 'UV Index'
            },
            multiseismicintensity: {
                name: 'MultiSeismicIntensitySensor',
                type: 'range',
                range: [1, 12],
                unit: 'Modified Mercalli Scale'
            },
            basic: {
                name: 'basicGet',
                type: 'range',
                range: [0, 255],
                unit: 'basic'
            }
        };
    t.exports.mapNeeoDeviceClassToProsystDeviceClass = function(X) {
        switch (X) {
            case 'binarysliderswitch':
            case 'getmultitemperature':
            case 'getmultilevel':
            case 'getmultiluminance':
            case 'getmultimeterwatt':
            case 'getmultihumidity':
            case 'getmultiultraviolet':
            case 'getmultigeneralpurposealarm':
                return I;
            case 'getbattery':
                return f;
            case 'getalarm':
            case 'getalarmaccess':
            case 'getalarmappliance':
            case 'getalarmburglar':
            case 'getalarmclock':
            case 'getalarmco':
            case 'getalarmco2':
            case 'getalarmemergency':
            case 'getalarmhome':
            case 'getalarmpower':
            case 'getalarmheat':
            case 'getalarmsmoke':
            case 'getalarmsystem':
            case 'getalarmwater':
            case 'getbinary':
                return S;
            case 'getmeterwatt':
                return T;
            default:
                var J = p.mapNeeoDeviceClassToProsystDeviceClass(X);
                if (J) return J;
                c.debug('DeviceClass not implemented!', X);
        }
    }, t.exports.mapProsystDeviceClassToNeeoDeviceClass = function(X, J) {
        switch (X) {
            case S:
                return {
                    name: 'binary', label: 'On Off Sensor'
                };
            case f:
                return {
                    name: 'battery', label: 'Battery Level'
                };
            case 'com.prosyst.mbs.services.hdm.deviceclasses.AlarmSensor':
            case 'com.prosyst.mbs.services.zwave.deviceclasses.ZWaveAlarmV2':
                return n(J);
            case 'com.prosyst.mbs.services.zwave.deviceclasses.ZWaveWakeUp':
                return void c.debug('ZWave wakeup sensor ignored');
            case 'com.prosyst.mbs.services.zwave.deviceclasses.FirmwareUpdate':
                return void c.debug('ZWave firmware update ignored');
            case T:
                return J !== 'energy' && c.debug('Unknown Meter Type', J), {
                    name: 'meterwatt',
                    label: 'Watt Sensor'
                };
            case I:
                return d(J);
            default:
                var $ = p.mapProsystDeviceClassToNeeoDeviceClass(X);
                return $ ? {
                    name: $.name,
                    label: $.label
                } : (c.debug('mapProsystDeviceClassToNeeoDeviceClass, deviceclass not implemented', X), {});
        }
    }, t.exports.mapVirtualSensorDeviceClassToNeeoDeviceClass = function(X) {
        switch (X) {
            case 'getbinarysliderswitch':
                return O;
            default:
                c.debug('DeviceClass not implemented, are you sure this is a virtual class?', X);
        }
    }, t.exports.convertDeviceClassToNeeoSensorName = function(X, J) {
        var $ = this.mapProsystDeviceClassToNeeoDeviceClass(X, J);
        if ($ && $.name) return u.buildNeeoSensorName($.name)
    }, t.exports.buildNeeoSensor = function(X, J, $, ee) {
        function te(Ee) {
            if (!q[Ee]) throw new Error('invalid sensor class:', Ee);
            return q[Ee]
        }

        function ae(Ee) {
            return Ee.Properties && Ee.Properties[0].Metadata && -1 < Ee.Properties[0].Metadata.access.indexOf('R')
        }

        function re(Ee) {
            return Ee.Properties && Ee.Properties[0].Metadata && -1 < Ee.Properties[0].Metadata.access.indexOf('E')
        }
        if (X) {
            var ie = X['DeviceClass'],
                oe = X['Type'],
                ne = re(X),
                le = ae(X),
                de = this.mapProsystDeviceClassToNeeoDeviceClass(ie, oe);
            if (!de || !de.name || !(le || ne) || void 0 !== oe && oe === 'Unsupported Sensor') return void c.debug('Sensor not implemented (or no read access / not an event):', X);
            var ce = te(de.name),
                ue = J || '',
                pe = u.getSensorPrefix($, ne, le);
            c.debug('build sensor', de.name);
            var me = '';
            return me = ee ? pe + 'virtual/get' + de.name + ue + '/' + ee : pe + 'get' + de.name + ue, {
                type: 'sensor',
                name: u.buildNeeoSensorName(de.name, ue),
                path: me,
                label: u.humanizeLabel(de.label, J),
                sensor: ce
            }
        }
    }, t.exports.buildVirtualActuatorConfiguration = function(X) {
        var J = {
            DeviceClassType: 'Actuator'
        };
        switch (X) {
            case 'BinarySliderSwitch':
            case 'BasicGetClass':
                J.DeviceClass = O, J.Operations = [{
                    Name: 'turnOn',
                    Metadata: {
                        description: 'Turns on the binary switch.'
                    }
                }, {
                    Name: 'turnOff',
                    Metadata: {
                        description: 'Turns off the binary switch.'
                    }
                }], J.Properties = [{
                    Name: 'state',
                    Value: 1,
                    Polling: 0,
                    Metadata: {
                        description: 'Binary switch state. Value 0 denotes that switch is off. Value 1 denotes that switch is on.',
                        enum: {
                            "Switched Off": '0',
                            "Switched On": '1'
                        },
                        access: 'RE'
                    }
                }];
                break;
            default:
        }
        return J
    }
}, function(t, r, o) {o(0)("Function  18").verbose("getRequestParameters");
    'use strict';

    function n(c, u, p, m) {
        var E = c.params[u];
        if (E || 'undefined' == typeof m || (E = m), void 0 === p) throw new Error('need a validation object to work correctly');
        if (void 0 !== E) {
            var g = {};
            g[u] = E;
            var y = {};
            y[u] = p, d(g, y)
        }
        if ('undefined' == typeof E) throw new Error('parameter is missing: ' + u);
        return E
    }
    var d = o(56);
    r.getRequestParameter = n, r.getRequestParameterInteger = function(c, u, p, m) {
        var E = n(c, u, p, m);
        return parseInt(E)
    }, r.getRequestParameterFloat = function(c, u, p, m) {
        var E = n(c, u, p, m);
        return parseFloat(E)
    }
}, function(t, r, o) {o(0)("Function  19").verbose("neeo:lib:cec:AddressMapper");
    'use strict';

    function p(N, A) {
        if (!N || !A) return N;
        var C = T.filter(A),
            D = C.length;
        if (0 === D || 1 < D) return m('NO_OR_MULTIPLE_DEVICES_FOUND__NOT_UPDATE_LOGICAL_ADDRESS', D), N;
        var R = C[0].logicalAddress,
            P = C[0].physicalAddress;
        return m('RETURN_UPDATED_LOGICAL_ADDRESS', {
            in: N.logicalAddress,
            out: R
        }), m('RETURN_UPDATED_PHYSICAL_ADDRESS', {
            in: N.physicalAddress,
            out: P
        }), I.set(R, N.logicalAddress), O.set(P, N.physicalAddress), {
            physicalAddress: P,
            logicalAddress: R
        }
    }
    var m = o(2)('neeo:lib:cec:AddressMapper'),
        E = o(20).instance,
        g = o(33);
    t.exports = {
        clearDiscoveryData: function() {
            T = [], I.clear(), O.clear()
        },
        getRefreshedCecAddessObject: function(N, A) {
            if (!N) return !1;
            o(0)("Function  19").verbose("cec:AddressMappe getRefreshedCecAddessObject")
            var C = N.split(':'),
                D = C[y],
                R = parseInt(C[S], 10),
                P = !g.isPhysicalAddressValid(D),
                w = !g.isLogicalAddressValid(R);
            o(0)("Function 19").verbose("getRefreshedCecAddessObject done")

            if (P || w) return !1;
            return p({
                physicalAddress: D,
                logicalAddress: R
            }, A)
        },
        updateCecDiscoveryData: function(N) {
            if (!Array.isArray(N)) return m('UPDATE_CEC_DISCOVERY_DATA_FAILED_NOT_ARRAY'), !1;
            T = N.filter(function(C) {
                if (!C) return !1;
                if (!C.osdName || C.osdName === f) return !1;
                var D = Number.isInteger(C.logicalAddress),
                    R = 'string' == typeof C.physicalAddress;
                return !0 === C.physicalAddressValid && D && R
            });
            var A = T.length;
            return 0 === A ? A : (m('UPDATED_CEC_DISCOVERY_DATA %o:', T), E.powerstateInitialised(), A)
        },
        getReverseMappedCecAddress: function(N, A) {
            var C = I.get(N) || N,
                D = O.get(A) || A,
                R = {
                    physicalAddress: D,
                    logicalAddress: C
                };
            return m('NEEO_MAPPED_CEC_ADDRESS %o', R), R
        }
    };
    var y = 0,
        S = 1,
        f = 'NEEO Brain',
        I = new Map,
        O = new Map,
        T = void 0
}, function(t, r, o) {o(0)("Function  20").verbose("notification of powerstate");
    'use strict';

    function n(S, f) {
        if (!(S instanceof f)) throw new TypeError('Cannot call a class as a function')
    }

    function d(S, f) {
        if (!S) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return f && ('object' == typeof f || 'function' == typeof f) ? f : S
    }

    function c(S, f) {
        if ('function' != typeof f && null !== f) throw new TypeError('Super expression must either be null or a function, not ' + typeof f);
        S.prototype = Object.create(f && f.prototype, {
            constructor: {
                value: S,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), f && (Object.setPrototypeOf ? Object.setPrototypeOf(S, f) : S.__proto__ = f)
    }
    var u = function() {
            function S(f, I) {
                for (var O = 0, T; O < I.length; O++) T = I[O], T.enumerable = T.enumerable || !1, T.configurable = !0, 'value' in T && (T.writable = !0), Object.defineProperty(f, T.key, T)
            }
            return function(f, I, O) {
                return I && S(f.prototype, I), O && S(f, O), f
            }
        }(),
        p = o(10),
        m = 'powerstateIntialised',
        E = 'powerstateChanged',
        g = function(S) {
            function f() {
                return n(this, f), d(this, (f.__proto__ || Object.getPrototypeOf(f)).call(this))
            }
            return c(f, S), u(f, [{
                key: 'powerstateInitialised',
                value: function() {
                    this.emit(m)
                }
            }, {
                key: 'powerstateChanged',
                value: function(O) {
                    this.emit(E, O)
                }
            }]), f
        }(p),
        y = new g;
    t.exports = {
        instance: y,
        POWERSTATE_INITIALISED: m,
        POWERSTATE_CHANGED: E
    }
}, function(t, r, o) {o(0)("Function  21").verbose("neeo:lib:cec:nodeCecWrapper CEC-Wrapper");
    'use strict';

    function n() {console.log("Function 21, n.... startCecadapter");
        return w >= P ? (N.debug('CEC_DISABLED_INITIALIZATION_SKIPPED'), O.increaseCounter('CEC_DISABLED_INITILAZATION_SKIPPED'), S.reject(new Error('CEC Max failed startup reached'))) : (N.debug('CEC_INITIALIZATION_START'), f.startCECAdapter(T.port, D.ipcCallbackFunction).catch(function(L) {
            return w++, N.error('CEC_INITIALIZATION', {
                message: L.message,
                failedStartupCount: w
            }), S.reject(new Error('CEC Initialization Failed'))
        }))
    }
    var S = o(1),
        f = o(33),
        I = o(2)('neeo:lib:cec:nodeCecWrapper'),
        O = o(6),
        T = o(5).cec,
        N = o(0)('CEC-Wrapper'),
        A = o(12),
        C = o(19),
        D = o(68),
        R = o(69),
        P = 1;
    t.exports = {
        registerTriggerScanFunction: function(L, U) {
            D.registerTriggerScanFunction(L, U)
        },
        initializeLibCEC: n,
        failsafeStopLibCEC: function() {
            o(0)("Function  21").verbose("failsafeStopLibCEC")
            return N.debug('failsafeStopLibCEC'), f.stopCECAdapter().catch(function(L) {
                N.error('CEC_STOP_FAILED', L.message)
            })
        },
        power: function(L) {
            o(0)("Function  21").verbose("nodeCecWrapper power")

            return n().then(function() {
                return f.power(L)
            })
        },
        standBy: function(L) {
            o(0)("Function  21").verbose("nodeCecWrapper standby")

            return n().then(function() {
                return f.standBy(L)
            })
        },
        sendKeyPressRelease: function(L, U) {
            o(0)("Function  21").verbose("nodeCecWrapper sendKeyPressRelease")

            return A.updateLastCecKeyAction(), n().then(function() {
                return f.sendKeyPressRelease(L, U)
            })
        },
        scan: function() {
            o(0)("Function  21").verbose("nodeCecWrapper scan")

            return n().then(function() {
                return f.scan()
            }).then(function(L) {
                return I('scan result %o', L), A.updatePowerState(L), C.updateCecDiscoveryData(L), L
            })
        },
        powerScan: function() {
            o(0)("Function  21").verbose("nodeCecWrapper powerscan")

            return N.debug('POWER SCAN'), n().then(function() {
                return f.powerScan()
            })
        },
        setStreamPath: function(L) {
            o(0)("Function  21").verbose("nodeCecWrapper setStreamOath")

            return n().then(function() {
                var U = R.getSetStreamPathPayload(L);
                return I('transmit raw command: <%s>', U), f.transmit(U)
            })
        }
    };
    var w = 0
}, function(t, r, o) {o(0)("Function  22").verbose("new db");
    'use strict';
    var n = o(71),
        d = o(5).db;
    t.exports = new n(d)
}, function(t, r, o) {o(0)("Function  23").verbose("new hue");
    'use strict';
    var n = o(72),
        d = o(5).hue;
    t.exports = new n(d)
}, function(t) {
    'use strict';
    t.exports = {
        MACRO_POWER_ON: 'POWER ON',
        MACRO_POWER_OFF: 'POWER OFF',
        MACRO_POWER_TOGGLE: 'POWER_TOGGLE',
        COMPONENT_BRIGHTNESS: 'brightness',
        COMPONENT_POWER: 'power'
    }
}, function(t, r, o) {o(0)("Function  25").verbose("neeo:mystrom:service");
    'use strict';

    function n() {
        return V.udpDiscovery().then(function(ae) {
            return M('cache updated %o', ae), ee = ae, te = Date.now(), ae
        })
    }

    function d(ae) {
        return 'string' == typeof ae && H.SUPPORTED_SWITCH_NAMES.includes(ae.toUpperCase())
    }

    function c() {
        var ae = Date.now() - te;
        return ae < Z ? void M('DEVICE_CACHE_REFRESH_SKIP') : void(M('REDISCOVER_DEVICES %o', {
            timeSinceLastRefresh: ae
        }), te = Date.now(), n().then(function() {
            M('DEVICE_CACHE_REFRESH_DONE')
        }).catch(function(re) {
            M('DEVICE_CACHE_REFRESH_FAILED', {
                msg: re.messsage
            })
        }))
    }

    function S() {
        ee.filter(function(ae) {
            return d(ae.model.name)
        }).forEach(f), ee.filter(function(ae) {
            return R(ae.model.name)
        }).forEach(I)
    }

    function f(ae) {
        N(ae.ip, 'report', z).then(function(re) {
            M('SWITCH_POLLING UPDATED: %o', {
                mac: ae.macAddress,
                deviceState: re
            }), H.mapDeviceState(ae.macAddress, re).forEach(function(ie) {
                return M('SWITCH_POLLING UPDATED: %o', {
                    state: ie
                }), J.dispatch(ie.deviceId, ie.key, ie.value, q)
            })
        }).catch(function(re) {
            M('SWITCH POLLING UNREACHABLE: %o', {
                mac: ae.macAddress,
                error: re.message
            }), c()
        })
    }

    function I(ae) {
        var re = D(ae.macAddress);
        N(ae.ip, 'api/v1/device/' + re, z).then(function(oe) {
            var se = oe[re];
            return se ? void W.mapDeviceState(ae.macAddress, se).forEach(function(ne) {
                return M('BULB POLLING UPDATED: %o', {
                    state: ne
                }), J.dispatch(ne.deviceId, ne.key, ne.value, Q)
            }) : void M('INVALID_POLLING_DATA %o', oe)
        }).catch(function(oe) {
            M('BULB POLLING UNREACHABLE: %o', {
                mac: ae.macAddress,
                error: oe.message
            }), c()
        })
    }

    function O(ae) {
        return new x(function(re, ie) {
            var oe = ee.find(function(se) {
                return se.macAddress === ae
            });
            return oe ? re(oe.ip) : void(M('Unable to find device %s in cache (cache size: %s)', ae, ee.length), ie(new Error('Device unavailable: ' + ae)))
        })
    }

    function T(ae, re) {
        return O(ae).then(function(ie) {
            return N(ie, re)
        }).catch(function(ie) {
            throw c(), ie
        })
    }

    function N(ae, re, ie) {
        return B.get('http://' + ae + '/' + re, {
            timeout: ie,
            httpAgent: j
        }).then(function(oe) {
            return oe.data
        })
    }

    function A(ae, re) {
        return O(ae).then(function(ie) {
            return C(ae, ie, re)
        }).catch(function(ie) {
            throw c(), ie
        })
    }

    function C(ae, re, ie) {
        var oe = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : z,
            se = D(ae);
        return B.post('http://' + re + '/' + ('api/v1/device/' + se), ie, {
            timeout: oe,
            httpAgent: j
        }).then(function(le) {
            return le.data
        })
    }

    function D(ae) {
        return ae.replace(/:/g, '').toUpperCase()
    }

    function R(ae) {
        return W.SUPPORTED_BULB_NAMES.includes(ae)
    }
    var M = o(2)('neeo:mystrom:service'),
        x = o(1),
        B = o(58),
        V = o(94),
        G = o(92),
        W = o(93),
        H = o(95),
        Y = o(32),
        j = new Y.Agent({
            keepAlive: !0,
            keepAliveMsecs: 8e3
        }),
        z = 3e3,
        Z = 6e4,
        Q = 'updateBulb',
        q = 'updateSwitch',
        J = G.build(),
        $ = void 0,
        ee = [],
        te = 0;
    t.exports = {
        on: function() {
            return J.on.apply(J, arguments)
        },
        discoverDevices: n,
        startDeviceWatch: function() {
            $ || (M('STARTING DEVICE STATE WATCH'), $ = setInterval(S, 4e3), S())
        },
        stopDeviceWatch: function() {
            M('STOPPING DEVICE STATE WATCH'), clearInterval($), $ = void 0
        },
        isWifiSwitch: d,
        isBulb: R,
        EVENT_UPDATE_SWITCH: q,
        setRelayState: function(ae, re) {
            var ie = re ? 1 : 0;
            return T(ae, 'relay?state=' + ie).then(function() {
                J.dispatch(ae, H.STATE_KEY_RELAY, re, q)
            })
        },
        getRelayState: function(ae) {
            return x.resolve(J.getStateFor(ae, H.STATE_KEY_RELAY))
        },
        toggleRelayState: function(ae) {
            var re = J.getStateFor(ae, H.STATE_KEY_RELAY);
            return T(ae, 'toggle').then(function() {
                J.dispatch(ae, H.STATE_KEY_RELAY, !re, q)
            })
        },
        getPowerUsage: function(ae) {
            var re = J.getStateFor(ae, H.STATE_KEY_POWERUSE);
            return x.resolve(re ? re : '0.0')
        },
        EVENT_UPDATE_BULB: Q,
        bulbPowerOn: function(ae) {
            return J.dispatch(ae, W.STATE_KEY_ON, !0, Q), A(ae, W.BULB_POWER_ON_PAYLOAD)
        },
        bulbPowerOff: function(ae) {
            return J.dispatch(ae, W.STATE_KEY_ON, !1, Q), A(ae, W.BULB_POWER_OFF_PAYLOAD)
        },
        bulbPowerToggle: function(ae) {
            var re = J.getStateFor(ae, W.STATE_KEY_ON);
            return J.dispatch(ae, W.STATE_KEY_ON, !re, Q), A(ae, W.BULB_POWER_TOGGLE_PAYLOAD)
        },
        getBulbPowerState: function(ae) {
            var re = J.getStateFor(ae, W.STATE_KEY_ON);
            return M('getBulbPowerState %o', {
                macAddress: ae,
                powerState: re
            }), x.resolve(re)
        },
        bulbBrightness: function(ae, re) {
            var ie = W.convertBrightnessToPayload(re);
            return J.dispatch(ae, W.STATE_KEY_COLOR, re, Q), A(ae, ie)
        },
        getBulbBrightness: function(ae) {
            var re = J.getStateFor(ae, W.STATE_KEY_COLOR);
            return M('getBulbBrightness %o', {
                macAddress: ae,
                brightness: re
            }), x.resolve(re)
        }
    }
}, function(t) {
    'use strict';

    function n(c, u) {
        if (!(c instanceof u)) throw new TypeError('Cannot call a class as a function')
    }
    var d = function() {
        function c(u, p) {
            for (var m = 0, E; m < p.length; m++) E = p[m], E.enumerable = E.enumerable || !1, E.configurable = !0, 'value' in E && (E.writable = !0), Object.defineProperty(u, E.key, E)
        }
        return function(u, p, m) {
            return p && c(u.prototype, p), m && c(u, m), u
        }
    }();
    t.exports = function() {
        function c(u) {
            n(this, c), this.browseUriPrefix = '', this.tr2index = '', u && (this.browseUriPrefix = u.browseUriPrefix || '', this.tr2index = isFinite(u.tr2index) ? u.tr2index : '')
        }
        return d(c, [{
            key: 'setBrowseUriPrefix',
            value: function(p) {
                this.browseUriPrefix = p
            }
        }, {
            key: 'getTr2Index',
            value: function() {
                return '' === this.browseUriPrefix && '' === this.tr2index ? '' : encodeURIComponent(this.browseUriPrefix) + '.' + this.tr2index
            }
        }, {
            key: 'serialize',
            value: function() {
                throw new Error('MISSING_IMPLEMENTATION')
            }
        }]), c
    }()
}, function(t, r, o) {o(0)("Function  27").verbose("SonosDiscovery");
    'use strict';
    var n = o(208),
        d = o(146),
        c = o(5).sonos,
        u = o(0)('SonosDiscovery');
    u.error = u.debug, u.warn = u.debug, u.info = u.debug, c.log = u, t.exports = new d({
        discovery: new n(c),
        listLimit: c.listLimit
    })
}, function(t, r, o) {o(0)("Function  28").verbose("new zwave");
    'use strict';
    var n = o(158),
        d = o(206),
        c = o(5).zwave,
        u = new d(c);
    t.exports = new n(u, c)
}, function(t, r, o) {o(0)("Function  29").verbose("com.prosyst.mbs.services.zwave.deviceclasses.Basic basicswitch");
    'use strict';

    function n(N, A) {
        if (!(N instanceof A)) throw new TypeError('Cannot call a class as a function')
    }

    function d(N, A) {
        if (!N) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return A && ('object' == typeof A || 'function' == typeof A) ? A : N
    }

    function c(N, A) {
        if ('function' != typeof A && null !== A) throw new TypeError('Super expression must either be null or a function, not ' + typeof A);
        N.prototype = Object.create(A && A.prototype, {
            constructor: {
                value: N,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(N, A) : N.__proto__ = A)
    }
    var u = function() {
            function N(A, C) {
                for (var D = 0, R; D < C.length; D++) R = C[D], R.enumerable = R.enumerable || !1, R.configurable = !0, 'value' in R && (R.writable = !0), Object.defineProperty(A, R.key, R)
            }
            return function(A, C, D) {
                return C && N(A.prototype, C), D && N(A, D), A
            }
        }(),
        p = o(8),
        m = o(9),
        E = o(30),
        g = o(17),
        y = 'com.prosyst.mbs.services.zwave.deviceclasses.Basic',
        S = 'basicswitch',
        I = 0;
    t.exports = function(N) {
        function A() {
            return n(this, A), d(this, (A.__proto__ || Object.getPrototypeOf(A)).apply(this, arguments))
        }
        return c(A, N), u(A, null, [{
            key: 'matchProsystDeviceClass',
            value: function(D) {
                return y === D
            }
        }, {
            key: 'getProsystDeviceClass',
            value: function() {
                return y
            }
        }, {
            key: 'matchNeeoDeviceClass',
            value: function(D) {
                return -1 < ['basicGet', 'basicSet', 'getbasic'].indexOf(D)
            }
        }, {
            key: 'buildNeeoDeviceClass',
            value: function() {
                return {
                    name: 'basic',
                    label: 'Basic'
                }
            }
        }, {
            key: 'buildRWActuator',
            value: function(D, R, P) {
                var w = [],
                    L = p.getActuatorPrefix(P);
                w.push({
                    type: 'slider',
                    name: 'SET_' + S.toUpperCase() + R,
                    label: p.humanizeLabel(S, R),
                    path: L + 'basicSet' + R,
                    slider: {
                        type: 'range',
                        sensor: p.buildNeeoSensorName(E.getName(), R),
                        range: [I, 99],
                        unit: '%'
                    }
                });
                var U = E.buildBasicGetToggle(D, R, P);
                w.push(U);
                var k = g.buildVirtualActuatorConfiguration('BasicGetClass'),
                    M = g.buildNeeoSensor(k, R, P, 'basicGet');
                return w.push(M), w
            }
        }, {
            key: 'transformActuatorValue',
            value: function(D) {
                return 'false' === D ? I : 'true' === D ? 255 : D
            }
        }]), A
    }(m)
}, function(t, r, o) {o(0)("Function  30").verbose("com.prosyst.mbs.services.hdm.deviceclasses.BinarySliderSwitch'");
    'use strict';

    function n(S, f) {
        if (!(S instanceof f)) throw new TypeError('Cannot call a class as a function')
    }

    function d(S, f) {
        if (!S) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return f && ('object' == typeof f || 'function' == typeof f) ? f : S
    }

    function c(S, f) {
        if ('function' != typeof f && null !== f) throw new TypeError('Super expression must either be null or a function, not ' + typeof f);
        S.prototype = Object.create(f && f.prototype, {
            constructor: {
                value: S,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), f && (Object.setPrototypeOf ? Object.setPrototypeOf(S, f) : S.__proto__ = f)
    }
    var u = function() {
            function S(f, I) {
                for (var O = 0, T; O < I.length; O++) T = I[O], T.enumerable = T.enumerable || !1, T.configurable = !0, 'value' in T && (T.writable = !0), Object.defineProperty(f, T.key, T)
            }
            return function(f, I, O) {
                return I && S(f.prototype, I), O && S(f, O), f
            }
        }(),
        p = o(8),
        m = o(9),
        g = 'com.prosyst.mbs.services.hdm.deviceclasses.BinarySliderSwitch',
        y = 'binarysliderswitch';
    t.exports = function(S) {
        function f() {
            return n(this, f), d(this, (f.__proto__ || Object.getPrototypeOf(f)).apply(this, arguments))
        }
        return c(f, S), u(f, null, [{
            key: 'getName',
            value: function() {
                return y
            }
        }, {
            key: 'matchProsystDeviceClass',
            value: function(O) {
                return g === O
            }
        }, {
            key: 'getProsystDeviceClass',
            value: function() {
                return 'com.prosyst.mbs.services.hdm.deviceclasses.MultiLevelSwitch'
            }
        }, {
            key: 'matchNeeoDeviceClass',
            value: function(O) {
                return -1 < [y, 'setbinaryswitch', 'getbinaryswitch', 'turnOff', 'turnOn'].indexOf(O)
            }
        }, {
            key: 'buildNeeoDeviceClass',
            value: function() {
                return {
                    name: y,
                    label: 'Toggle'
                }
            }
        }, {
            key: 'transformSensorResult',
            value: function(O) {
                return !!(0 < O)
            }
        }, {
            key: 'transformEventValue',
            value: function(O) {
                return 'true' === O ? 'turnOn' : 'turnOff'
            }
        }, {
            key: 'transformActuatorValue',
            value: function(O) {
                return 'false' === O ? O = 0 : 'true' == O && (O = 99), O
            }
        }, {
            key: 'buildRWActuator',
            value: function(O, T, N) {
                var A = p.getActuatorPrefix(N);
                return {
                    type: 'switch',
                    name: y.toUpperCase() + ' On/Off' + T,
                    label: p.humanizeLabel('Toggle', T),
                    sensor: p.buildNeeoSensorName(y, T),
                    path: A + y + T,
                    virtualDeviceName: g
                }
            }
        }, {
            key: 'buildBasicGetToggle',
            value: function(O, T, N) {
                var A = f.buildRWActuator(O, T, N);
                return A.path = A.path.replace(y, 'basicSet'), A
            }
        }]), f
    }(m)
}, function(t) {
    'use strict';
    var n = 'hdm:ZWave:',
        d = t.exports.convertToNodeId = function(c) {
            if (!c || 0 !== c.indexOf(n)) throw new Error('Invalid UID: ' + c);
            var u = c.split(n);
            if (2 !== u.length) throw new Error('Invalid UID: ' + c);
            return u[1].split('/').join(':').replace('#', '+')
        };
    t.exports.convertToNodeIdWithoutChildId = function(c) {
        var u = d(c);
        return u.includes('+') ? u.split('+')[0] : u
    }, t.exports.convertToUid = function(c) {
        if (!c || -1 === c.indexOf(':')) throw new Error('Invalid NodeId: ' + c);
        var u = c.split(':').join('/').replace('+', '#').replace('/secure', ':secure');
        return n + u
    }, t.exports.getChildSuffix = function(c) {
        return c && c.includes('#') && '+' + c.split('#')[1]
    }, t.exports.convertToZwaveNodeId = function(c) {
        if (!c || -1 === c.indexOf(':')) throw new Error('Invalid NodeId: ' + c);
        return parseInt(c.split(':')[1], 10)
    }, t.exports.assembleNodeId = function(c, u, p) {
        if (!c || -1 === c.indexOf(':')) throw new Error('Invalid NodeId: ' + c);
        return p ? c + ':secure' + u : c + u
    }, t.exports.isUidSecure = function(c) {
        return c && -1 < c.indexOf(':secure')
    }
}, function(t) {
    t.exports = require('http')
}, function(t) {
    t.exports = require('os') //was node-cec'
}, function(t) {
    t.exports = require('os')
}, function(t) {
    t.exports = require('util')
}, function(t, r, o) {o(0)("Function  36").verbose("Hue Adapter");
    'use strict';

    function n(y) {
        return Math.round(1e6 / y)
    }

    function d(y) {
        return Math.round(1e6 / y)
    }
    var c = o(1),
        u = o(0)('Hue Adapter'),
        p = o(48),
        m = o(59),
        E = 1100,
        g = t.exports = function(y) {
            this.api = y.api, this.bridgeip = y.bridgeip, this.description = y.description, this.username = y.username, this.bridgeuid = y.bridgeuid, this.createLightState = y.createLightState, this.getStateCache = new p(E, 'HUE-STATE' + this.bridgeuid), this.getLightsCache = new p(E, 'HUE-LIGHT' + this.bridgeuid), this.waitingOnPollingAnswer = !1
        };
    g.TYPE_LIGHT = 'light', g.TYPE_GROUP = 'group', g.TYPES = [g.TYPE_LIGHT, g.TYPE_GROUP], g.parseId = function(y) {
        y = y || '';
        var S = y.split('|');
        if (3 !== S.length) throw new Error('invalid id: "' + y + '"');
        var f = {
            bridgeuid: S[0],
            type: S[1],
            id: S[2]
        };
        if (-1 === g.TYPES.indexOf(f.type)) throw new Error('invalid type in id: "' + f.type + '"');
        return f
    }, g.prototype.createId = function(y, S) {
        return this.bridgeuid + '|' + y + '|' + S
    }, g.prototype.getLights = function() {
        var y = this;
        return this.getLightsCache.getValue(function() {
            return y.api.lights()
        }).then(function(S) {
            return S ? S.lights : (u.warn('GET_LIGHT_EMPTY'), [])
        })
    }, g.prototype.getStatus = function(y, S) {
        var f = this;
        if (y === g.TYPE_LIGHT) return this.lightStatus(S);
        return y === g.TYPE_GROUP ? this.getGroup(S).then(function(I) {
            var O = !I || !Array.isArray(I.lights) || 0 === I.lights.length;
            return O ? c.reject(new Error('Empty group: ' + S)) : f.getStatus(g.TYPE_LIGHT, I.lights[0])
        }) : c.reject(new Error('invalid type: "' + y + '"'))
    }, g.prototype.discover = function() {
        var y = this;
        return c.all([this.getLights(), this.getGroups()]).spread(function(S, f) {
            var I = [];
            return m.forEach(S, function(O) {
                I.push({
                    id: y.createId(g.TYPE_LIGHT, O.id),
                    name: O.name,
                    reachable: !O.state || O.state.reachable
                })
            }), m.forEach(f, function(O) {
                I.push({
                    id: y.createId(g.TYPE_GROUP, O.id),
                    name: O.name,
                    lights: '0' === O.id ? 'All' : O.lights.join(',')
                })
            }), I
        })
    }, g.prototype.registered = function() {
        return this.username && 0 !== this.username.length ? this.getGroups().then(function(y) {
            return !!y
        }).catch(function(y) {
            return y ? u.warn('REGISTERED_TEST_FAILED', {
                error: y.message
            }) : u.warn('REGISTERED_TEST_FAILED'), !1
        }) : (u.debug('EMPTY USER'), c.resolve(!1))
    }, g.prototype.register = function() {
        var y = this;
        return u.debug('register user on bridge', this.bridgeip), this.api.registerUser(this.bridgeip, this.description).then(function(S) {
            return u.debug('successful registered user', {
                user: S,
                ip: y.bridgeip,
                id: y.bridgeuid
            }), S
        })
    }, g.prototype.unregister = function() {
        var y = this;
        return u.debug('unregister user from bridge', this.bridgeip), this.api.deleteUser(this.username).then(function() {
            y.username = void 0
        })
    }, g.prototype.getGroup = function(y) {
        return this.api.getGroup(y)
    }, g.prototype.getGroups = function() {
        return this.api.getGroups()
    }, g.prototype.lightStatus = function(y) {
        return this.api.lightStatus(y)
    }, g.prototype._createState = function(y) {
        return this.createLightState(y)
    }, g.prototype.getState = function() {
        var y = this;
        return this.getStateCache.getValue(function() {
            return y.api.getFullState()
        })
    }, g.prototype._setState = function(y, S, f) {
        return y === g.TYPE_LIGHT ? this.api.setLightState(S, f) : this.api.setGroupLightState(S, f)
    }, g.prototype.setOnState = function(y, S, f) {
        return f = f || !1, this._setState(y, S, this._createState({
            on: f
        }))
    }, g.prototype.setBrightness = function(y, S, f) {
        return this._setState(y, S, this._createState({
            on: 0 < f,
            bri: f
        }))
    }, g.prototype.setHue = function(y, S, f) {
        return this._setState(y, S, this._createState({
            on: !0,
            colormode: 'hsb',
            hue: f
        }))
    }, g.prototype.setSaturation = function(y, S, f) {
        return this._setState(y, S, this._createState({
            on: !0,
            colormode: 'hsb',
            sat: f
        }))
    }, g.prototype.setColorTemperature = function(y, S, f) {
        var I = n(f);
        return this._setState(y, S, this._createState({
            on: !0,
            colormode: 'ct',
            ct: I
        }))
    }, g.prototype.setHsl = function(y, S, f) {
        var I = 255 & f,
            O = 255 & f >> 8,
            T = 65535 & f >> 16,
            N = this._createState({
                on: !0,
                colormode: 'hsb'
            });
        return u.debug('set hsl. h: ' + T + ', s:' + O + ', l:' + I), N.hsl(T, O, I), this._setState(y, S, N)
    }, g.prototype.setColored = function(y, S, f) {
        return this._setState(y, S, this._createState({
            colormode: 'hsb',
            sat: f ? 255 : 0
        }))
    }, g.prototype.isColored = function(y, S) {
        return this.getStatus(y, S).then(function(f) {
            return 0 < f.sat
        })
    }, g.prototype.allOff = function() {
        return this._setState(g.TYPE_GROUP, 0, this._createState({
            on: !1
        }))
    }, g.prototype.poll = function(y) {
        var S = this;
        this.waitingOnPollingAnswer = !0;
        var f = function(O, T, N) {
            if (!N) return void u.debug('invalid state', O);
            var A = S.createId(O, T);
            y.handleStateUpdate(A, 'BRIGHTNESS_SENSOR', N.bri), y.handleStateUpdate(A, 'LIGHT_SENSOR', N.on), 'undefined' != typeof N.hue && y.handleStateUpdate(A, 'HUE_SENSOR', N.hue), 'undefined' != typeof N.sat && y.handleStateUpdate(A, 'SATURATION_SENSOR', N.sat), 'undefined' != typeof N.ct && y.handleStateUpdate(A, 'COLOR_TEMPERATURE_SENSOR', d(N.ct))
        };
        return this.getState().then(function(I) {
            var O = void 0;
            for (var T in I.lights) O || (O = I.lights[T].state), f(g.TYPE_LIGHT, T, I.lights[T].state);
            for (var N in f(g.TYPE_GROUP, '0', O), I.groups) {
                var A = I.groups[N].lights[0];
                A && f(g.TYPE_GROUP, N, I.lights[A].state)
            }
        }).finally(function() {
            S.waitingOnPollingAnswer = !1
        })
    }
}, function(t, r, o) {o(0)("Function  37").verbose("duplicate of 46 with smaller list of buttons ");
    'use strict';
    var n = o(4),
        d = n.keyCodes,
        c = {
            PLAY: d.PLAY,
            PAUSE: d.PAUSE,
            STOP: d.STOP,
            "PLAY PAUSE TOGGLE": {
                on: 'PLAY',
                off: 'PAUSE'
            },
            "CURSOR ENTER": {
                on: 'PLAY',
                off: 'PAUSE'
            }
        };
    t.exports = n.buildButtonMap(c)
}, function(t, r, o) {o(0)("Function  38").verbose("duplicate of 46?");
    'use strict';
    var n = o(4),
        d = n.keyCodes,
        c = {
            "CURSOR UP": d.UP,
            "CURSOR DOWN": d.DOWN,
            "CURSOR LEFT": d.LEFT,
            "CURSOR RIGHT": d.RIGHT,
            "CURSOR ENTER": d.SELECT,
            "FUNCTION BLUE": d.F1_BLUE,
            "FUNCTION RED": d.F2_RED,
            "FUNCTION GREEN": d.F3_GREEN,
            "FUNCTION YELLOW": d.F4_YELLOW,
            "DIGIT 0": d.NUMBER0,
            "DIGIT 1": d.NUMBER1,
            "DIGIT 2": d.NUMBER2,
            "DIGIT 3": d.NUMBER3,
            "DIGIT 4": d.NUMBER4,
            "DIGIT 5": d.NUMBER5,
            "DIGIT 6": d.NUMBER6,
            "DIGIT 7": d.NUMBER7,
            "DIGIT 8": d.NUMBER8,
            "DIGIT 9": d.NUMBER9,
            PLAY: d.PLAY,
            PAUSE: d.PAUSE,
            STOP: d.STOP,
            REVERSE: d.REWIND,
            FORWARD: d.FAST_FORWARD,
            PREVIOUS: d.BACKWARD,
            NEXT: d.FORWARD,
            "CHANNEL UP": d.FORWARD,
            "CHANNEL DOWN": d.BACKWARD,
            MENU: d.CONTENTS_MENU,
            "MENU HOME": d.ROOT_MENU,
            BACK: d.EXIT,
            EXIT: d.EXIT,
            CLEAR: d.CLEAR,
            SELECT: d.SELECT,
            ANGLE: d.ANGLE,
            INFO: d.DISPLAY_INFORMATION,
            "MENU DISC": d.DVD_MENU,
            "MENU SETTINGS": d.SETUP_MENU,
            "POWER OFF": d.ROOT_MENU,
            "CEC ACTIVATE": d.UNKNOWN
        };
    t.exports = n.buildButtonMap(c)
}, function(t, r, o) {o(0)("Function  39").verbose("neeo:myStrom:Controller");
    'use strict';

    function n(y, S) {
        if (!(y instanceof S)) throw new TypeError('Cannot call a class as a function')
    }
    var d = function() {
            function y(S, f) {
                for (var I = 0, O; I < f.length; I++) O = f[I], O.enumerable = O.enumerable || !1, O.configurable = !0, 'value' in O && (O.writable = !0), Object.defineProperty(S, O.key, O)
            }
            return function(S, f, I) {
                return f && y(S.prototype, f), I && y(S, I), S
            }
        }(),
        c = o(1),
        u = o(0)('neeo:myStrom:Controller'),
        p = o(3),
        m = o(25),
        E = p.Subscriptions;
    t.exports = function() {
        function y() {
            var S = this;
            n(this, y), this._initializationPromise = void 0, this._notificationsEnabled = !0, this._subscriptions = E.build(), this._notifyBrain = function() {
                return c.reject(new Error('NOT INITIALIZED'))
            }, this._markDeviceOn = function() {
                return u.debug('MARKDEVICEON NOT INITIALIZED')
            }, this._markDeviceOff = function() {
                return u.debug('MARKDEVICEOFF NOT INITIALIZED')
            }, this.powerSwitchHandler = {
                setter: function() {
                    return S.setPowerState.apply(S, arguments)
                },
                getter: function() {
                    return S.getPowerState.apply(S, arguments)
                }
            }
        }
        return d(y, [{
            key: 'initialize',
            value: function() {
                return this._initializationPromise ? this._initializationPromise : (u.debug('INITIALIZING_MYSTROM_CONTROLLER'), this._initializationPromise = c.resolve(), c.delay(1e3).then(function() {
                    return m.discoverDevices()
                }).then(function(f) {
                    return u.debug('INITIALIZED_MYSTROM', {
                        devicesCached: f.length
                    })
                }).catch(function(f) {
                    u.error('INTIALIZATION_DISCOVERY_FAILED', {
                        msg: f.message
                    })
                }), this._initializationPromise)
            }
        }, {
            key: '_sendBrainNotification',
            value: function(f, I, O) {
                var T = !this._subscriptions.isSubscribed(f);
                return T ? c.resolve() : void this._notifyBrain({
                    uniqueDeviceId: f,
                    component: I,
                    value: O
                }).catch(function(N) {
                    u.debug('NOTIFICATION_FAILED', N.message)
                })
            }
        }, {
            key: '_sendBrainPowerStateNotification',
            value: function(f, I) {
                var O = !this._subscriptions.isSubscribed(f);
                return O ? c.resolve() : I ? this._markDeviceOn(f) : this._markDeviceOff(f)
            }
        }, {
            key: 'setNotificationCallbacks',
            value: function(f, I) {
                this._notifyBrain = f, I && I.powerOnNotificationFunction && (this._markDeviceOn = I.powerOnNotificationFunction), I && I.powerOffNotificationFunction && (this._markDeviceOff = I.powerOffNotificationFunction)
            }
        }, {
            key: 'getDeviceSubscriptionHandler',
            value: function() {
                var f = this;
                return {
                    deviceAdded: function(O) {
                        u.debug('DEVICE_SUBSCRIPTION_ADDED', {
                            deviceId: O
                        }), f._subscriptions.add(O), f.initialize().then(m.startDeviceWatch).catch(function(T) {
                            return u.debug('INITIALIZATION_FAILED', {
                                msg: T.message
                            })
                        })
                    },
                    deviceRemoved: function(O) {
                        u.debug('DEVICE_SUBSCRIPTION_REMOVED', {
                            deviceId: O
                        }), f._subscriptions.remove(O), 0 === f._subscriptions.count() && (u.debug('DEVICE_SUBSCRIPTION_EMPTY_STOP_WATCH'), m.stopDeviceWatch())
                    },
                    initializeDeviceList: function(O) {
                        u.debug('DEVICES_SUBSCRIPTIONS_INITIALIZED', {
                            deviceIds: O
                        }), f._subscriptions.resetWith(O), 0 < f._subscriptions.count() && f.initialize().then(m.startDeviceWatch).catch(function(T) {
                            return u.debug('INITIALIZATION_FAILED', {
                                msg: T.message
                            })
                        })
                    }
                }
            }
        }], [{
            key: 'formatDiscoverResult',
            value: function(f) {
                return {
                    id: f.macAddress,
                    name: f.model.description,
                    room: '(' + f.macAddress + ')'
                }
            }
        }]), y
    }()
}, function(t) {
    'use strict';
    t.exports = {
        getRoundedPowerUsage: function(d) {
            var c = parseFloat(d);
            return isNaN(c) ? '0.0' : c.toFixed(1)
        }
    }
}, function(t) {
    'use strict';
    t.exports = {
        DEVICE_NAME: 'Brain'
    }
}, function(t, r, o) {o(0)("Function  42").verbose("CEC ACTIVATE");
    'use strict';
    var n = o(4),
        d = n.keyCodes,
        c = Object.keys(d).reduce(function(u, p) {
            var m = d[p];
            return u['CEC ' + p] = m, u
        }, {});
    c['CEC ACTIVATE'] = d.UNKNOWN, t.exports = n.buildButtonMap(c)
}, function(t) {
    'use strict';
    t.exports = {
        MACRO_REBOOT_BRAIN: 'REBOOT_BRAIN',
        MACRO_LEDOFF: 'LED_OFF',
        MACRO_LEDON: 'LED_ON',
        ONBOOT_SENSOR: 'ONBOOT'
    }
}, function(t, r, o) {o(0)("Function  44").verbose(" duplicate of 46?");
    'use strict';
    var n = o(4),
        d = n.keyCodes,
        c = {
            "CURSOR UP": d.UP,
            "CURSOR DOWN": d.DOWN,
            "CURSOR LEFT": d.LEFT,
            "CURSOR RIGHT": d.RIGHT,
            "CURSOR ENTER": d.ENTER,
            "FUNCTION BLUE": d.F1_BLUE,
            "FUNCTION RED": d.F2_RED,
            "FUNCTION GREEN": d.F3_GREEN,
            "FUNCTION YELLOW": d.F4_YELLOW,
            "DIGIT 0": d.NUMBER0,
            "DIGIT 1": d.NUMBER1,
            "DIGIT 2": d.NUMBER2,
            "DIGIT 3": d.NUMBER3,
            "DIGIT 4": d.NUMBER4,
            "DIGIT 5": d.NUMBER5,
            "DIGIT 6": d.NUMBER6,
            "DIGIT 7": d.NUMBER7,
            "DIGIT 8": d.NUMBER8,
            "DIGIT 9": d.NUMBER9,
            PLAY: d.PLAY,
            PAUSE: d.PAUSE,
            STOP: d.STOP,
            REVERSE: d.REWIND,
            FORWARD: d.FAST_FORWARD,
            PREVIOUS: d.BACKWARD,
            NEXT: d.FORWARD,
            "CHANNEL UP": d.FORWARD,
            "CHANNEL DOWN": d.BACKWARD,
            MENU: d.DVD_MENU,
            BACK: d.CLEAR,
            EXIT: d.EXIT,
            EJECT: d.EJECT,
            CLEAR: d.CLEAR,
            SELECT: d.SELECT,
            ANGLE: d.ANGLE,
            INFO: d.DISPLAY_INFORMATION,
            PLAYSTATION: d.ROOT_MENU,
            "MENU DISC": d.DVD_MENU,
            "MENU SETTINGS": d.SETUP_MENU,
            "MENU HOME": d.ROOT_MENU,
            "POWER TOGGLE": d.POWER_TOGGLE_FUNCTION
        };
    t.exports = n.buildButtonMap(c)
}, function(t, r, o) {o(0)("Function  45").verbose(" duplicate of 46?");
    'use strict';
    var n = o(4),
        d = n.keyCodes,
        c = {
            "CURSOR UP": d.UP,
            "CURSOR DOWN": d.DOWN,
            "CURSOR LEFT": d.LEFT,
            "CURSOR RIGHT": d.RIGHT,
            "CURSOR ENTER": d.ENTER,
            "FUNCTION BLUE": d.F1_BLUE,
            "FUNCTION RED": d.F2_RED,
            "FUNCTION GREEN": d.F3_GREEN,
            "FUNCTION YELLOW": d.F4_YELLOW,
            "DIGIT 0": d.NUMBER0,
            "DIGIT 1": d.NUMBER1,
            "DIGIT 2": d.NUMBER2,
            "DIGIT 3": d.NUMBER3,
            "DIGIT 4": d.NUMBER4,
            "DIGIT 5": d.NUMBER5,
            "DIGIT 6": d.NUMBER6,
            "DIGIT 7": d.NUMBER7,
            "DIGIT 8": d.NUMBER8,
            "DIGIT 9": d.NUMBER9,
            PLAY: d.PLAY,
            PAUSE: d.PAUSE,
            STOP: d.STOP,
            REVERSE: d.REWIND,
            FORWARD: d.FAST_FORWARD,
            PREVIOUS: d.BACKWARD,
            NEXT: d.FORWARD,
            "CHANNEL UP": d.FORWARD,
            "CHANNEL DOWN": d.BACKWARD,
            MENU: d.TOP_MENU,
            BACK: d.CLEAR,
            EXIT: d.EXIT,
            EJECT: d.EJECT,
            CLEAR: d.CLEAR,
            SELECT: d.SELECT,
            ANGLE: d.ANGLE,
            INFO: d.DISPLAY_INFORMATION,
            PLAYSTATION: d.ROOT_MENU,
            "MENU DISC": d.DVD_MENU,
            "MENU SETTINGS": d.SETUP_MENU,
            "MENU HOME": d.ROOT_MENU,
            "POWER TOGGLE": d.POWER_TOGGLE_FUNCTION
        };
    t.exports = n.buildButtonMap(c)
}, function(t, r, o) {o(0)("Function  46").verbose(" Build a map of buttons");
    'use strict';
    var n = o(4),
        d = n.keyCodes,
        c = {
            "CURSOR UP": d.UP,
            "CURSOR DOWN": d.DOWN,
            "CURSOR LEFT": d.LEFT,
            "CURSOR RIGHT": d.RIGHT,
            "CURSOR ENTER": d.ENTER,
            PLAY: d.PLAY,
            PAUSE: d.PAUSE,
            STOP: d.STOP,
            REVERSE: d.REWIND,
            FORWARD: d.FAST_FORWARD,
            PREVIOUS: d.BACKWARD,
            NEXT: d.FORWARD,
            "CHANNEL UP": d.FORWARD,
            "CHANNEL DOWN": d.BACKWARD,
            "VOLUME UP": d.VOLUME_UP,
            "VOLUME DOWN": d.VOLUME_DOWN,
            "MUTE TOGGLE": d.MUTE,
            MENU: d.ROOT_MENU,
            BACK: d.EXIT,
            EXIT: d.EXIT,
            CLEAR: d.CLEAR,
            SELECT: d.SELECT,
            INFO: d.DISPLAY_INFORMATION,
            "MENU SETTINGS": d.SETUP_MENU,
            "MENU HOME": d.ROOT_MENU,
            "POWER ON": d.POWER_ON_FUNCTION,
            "POWER OFF": d.POWER_OFF_FUNCTION
        };
    t.exports = n.buildButtonMap(c)
}, function(t) {
    'use strict';
    var u = 'playerVolume:1';
    t.exports = {
        NS_PLAYBACK: 'playback:1',
        NS_PLAYBACK_METADATA: 'playbackMetadata:1',
        NS_GROUPVOLUME: 'groupVolume:1',
        NS_PLAYERVOLUME: u,
        PLAYER_SPECIFIC_NS_LIST: [u]
    }
}, function(t, r, o) {o(0)("Function  48").verbose(" buildInstance");
    'use strict';
    var n = o(198).default;
    t.exports = n, t.exports.buildInstance = function(d, c) {
        return new n(d, c)
    }
}, function(t, r, o) {o(0)("Function  49").verbose(" directory-functions");
    'use strict';

    function n(f) {
        return new g(f)
    }
    var E = o(151),
        g = o(152),
        y = o(153),
        S = o(154);
    t.exports = {
        buildListPanel: function(f) {
            return new S(f)
        },
        buildListElement: n,
        buildInfoListElement: function(f) {
            return n({
                title: f.title,
                label: f.label,
                isQueueable: !1,
                isTriggerNode: !1,
                isInfoItem: !0,
                thumbnailUri: f.thumbnailUri,
                itemInfo: f.detailtext
            })
        },
        buildFolderListElement: function(f) {
            return n({
                title: f.title,
                label: f.label,
                isQueueable: f.isQueueable,
                isTriggerNode: !1,
                thumbnailUri: f.thumbnailUri,
                browseUri: f.browseUri,
                actionUri: f.actionUri,
                tr2index: f.tr2index
            })
        },
        buildListHeader: function(f) {
            return new y(f)
        },
        buildList: function() {
            return new E
        }
    }
}, function(t) {
    'use strict';
    var c = ['x-sonosapi-stream:', 'x-sonosapi-radio:', 'pndrradio:', 'x-sonosapi-hls:', 'x-sonosapi-hls-static:', 'x-sonosprog-http:'];
    t.exports = {
        isStream: function(u) {
            return u && u.length && c.some(function(p) {
                return u.startsWith(p)
            })
        },
        isSpotifyUri: function(u) {
            return /^(spotify\:|me\:tracks)/.test(u)
        }
    }
}, function(t, r, o) {o(0)("Function  51").verbose(" neeo:deviceadapter:lib:sonos:group");
    'use strict';

    function n(g) {
        if (Array.isArray(g)) {
            for (var y = 0, S = Array(g.length); y < g.length; y++) S[y] = g[y];
            return S
        }
        return Array.from(g)
    }
    var m = o(2)('neeo:deviceadapter:lib:sonos:group'),
        E = new Map;
    t.exports = {
        handleTopologyChange: function(g) {
            Array.isArray(g) || m('INVALID_DATA_FORMAT'), g.forEach(function(y) {
                if (!y || !y.coordinator || !y.members) return void m('INVALID_TOPOLOGY_MESSAGE');
                if (y.uuid !== y.coordinator.uuid) return void m('MESSAGE_NOT_FROM_COORDINATOR');
                var S = y.coordinator.roomName,
                    f = y.members.map(function(I) {
                        return I.roomName
                    }).filter(function(I) {
                        return I
                    });
                f.forEach(function(I) {
                    E.delete(I), E.set(I, S)
                }), m(S, 'contains now', f), m('state', E)
            })
        },
        getMappedName: function(g) {
            return E.has(g) ? E.get(g) : (m('MAPPED_NAME_NOT_FOUND', g), g)
        },
        getNotificationNames: function(g) {
            var y = [].concat(n(E.keys())).map(function(S) {
                if (E.get(S) === g) return S
            }).filter(function(S) {
                return S
            });
            return 0 === y.length ? [g] : y
        },
        getAllKnownSonosRoomNames: function() {
            return [].concat(n(E.keys()))
        }
    }
}, function(t, r, o) {o(0)("Function  52").verbose(" neeo:deviceadapter:lib:sonos:instantFavorites");
    'use strict';

    function n(E, g) {
        if (!(E instanceof g)) throw new TypeError('Cannot call a class as a function')
    }
    var d = function() {
            function E(g, y) {
                for (var S = 0, f; S < y.length; S++) f = y[S], f.enumerable = f.enumerable || !1, f.configurable = !0, 'value' in f && (f.writable = !0), Object.defineProperty(g, f.key, f)
            }
            return function(g, y, S) {
                return y && E(g.prototype, y), S && E(g, S), g
            }
        }(),
        c = o(2)('neeo:deviceadapter:lib:sonos:instantFavorites'),
        u = o(1),
        p = 'instantFavorites',
        m = void 0;
    t.exports = function() {
        function E() {
            n(this, E)
        }
        return d(E, null, [{
            key: 'setRepo',
            value: function(y) {
                m = y
            }
        }, {
            key: 'saveAtPosition',
            value: function(y, S, f) {
                if (c('Starting to save at position ' + f + ' for ' + y), !m) return u.reject(new Error('INSTANT_FAVORITES_REPO_NOT_DEFINED'));
                var I = m.loadFailsafe(p) || {},
                    O = I[y] || [],
                    T = O.find(function(N) {
                        return N.position === f
                    });
                return T ? T.item = S : (O.push({
                    item: S,
                    position: f
                }), I[y] = O), m.save(p, I), u.resolve({
                    success: !0
                })
            }
        }, {
            key: 'loadAll',
            value: function(y) {
                if (!m) throw new Error('INSTANT_FAVORITES_REPO_NOT_DEFINED');
                var S = m.loadFailsafe(p) || {},
                    f = S[y];
                if (!f) return [];
                var I = f.sort(function(O, T) {
                    return O.position - T.position
                }).map(function(O) {
                    return {
                        attr: {
                            id: O.item.browseUri
                        },
                        uri: O.item.actionUri,
                        metaData: O.item.metaData,
                        tr2: O.item.tr2,
                        title: O.item.title,
                        absoluteAlbumArtURI: O.item.thumbnailUri,
                        albumArtURI: O.item.thumbnailUri,
                        position: O.position
                    }
                });
                return I
            }
        }, {
            key: 'deleteAllByKey',
            value: function(y) {
                c('Deleting all Instant Favorites for ' + y);
                var S = m.loadFailsafe(p) || {};
                return delete S[y], m.save(p, S), u.resolve({
                    success: !0
                })
            }
        }]), E
    }()
}, function(t, r, o) {o(0)("Function  53").verbose(" Store creation");
    'use strict';
    var n = o(5).store,
        d = o(156);
    t.exports = new d(n)
}, function(t, r, o) {o(0)("Function  54").verbose(" mapNeeoDeviceClassToProsystDeviceClass and buildNeeoActuator");
    'use strict';

    function n(O) {
        return O.Properties !== void 0 && 0 < O.Properties.length && O.Properties[0].Metadata
    }

    function d(O) {
        return n(O) && -1 < O.Properties[0].Metadata.access.indexOf('R')
    }

    function c(O) {
        return n(O) && -1 < O.Properties[0].Metadata.access.indexOf('W')
    }

    function u(O) {
        return n(O) && -1 < O.Properties[0].Metadata.access.indexOf('E')
    }

    function p(O) {
        if (!O.Operations) return !0;
        var T = O.Operations.some(function(N) {
            return N.Arguments && 0 < N.Arguments
        });
        return !T
    }

    function m(O, T, N, A) {
        var C = [],
            D = S.buildRWActuator(O, T, N);
        return D && (C.push(D), C.push(A.buildNeeoSensor(O, T, N))), C
    }

    function E(O, T, N, A) {
        var C = [],
            D = S.buildREActuator(O, T, N),
            R = S.buildEventActuator(O, T, N);
        return D && R && (C.push(D), C.push(R), C.push(A.buildNeeoSensor(O, T, N))), C
    }

    function g(O, T, N, A) {
        var C = [],
            D = S.buildEventActuator(O, T, N);
        return D && (C.push(D), C.push(A.buildNeeoSensor(O, T, N))), C
    }

    function y(O, T, N) {
        var A = S.buildRWActuator(O, T, N);
        return [A]
    }
    var S = o(16),
        f = o(29),
        I = f.getProsystDeviceClass();
    t.exports.mapNeeoDeviceClassToProsystDeviceClass = function(O) {
        return S.mapNeeoDeviceClassToProsystDeviceClass(O)
    }, t.exports.buildNeeoActuator = function(O, T, N, A) {
        T = T || '';
        var C = d(O),
            D = c(O),
            R = u(O);
        return C && D ? m(O, T, N, A) : C && R ? E(O, T, N, A) : p(O) ? g(O, T, N, A) : O.DeviceClass === I ? y(O, T, N) : []
    }
}, function(t, r, o) {o(0)("Function  55").verbose(" com.prosyst.mbs.services.hdm.deviceclasses.MultiLevelSwitch");
    'use strict';

    function n(T, N) {
        if (!(T instanceof N)) throw new TypeError('Cannot call a class as a function')
    }

    function d(T, N) {
        if (!T) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return N && ('object' == typeof N || 'function' == typeof N) ? N : T
    }

    function c(T, N) {
        if ('function' != typeof N && null !== N) throw new TypeError('Super expression must either be null or a function, not ' + typeof N);
        T.prototype = Object.create(N && N.prototype, {
            constructor: {
                value: T,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), N && (Object.setPrototypeOf ? Object.setPrototypeOf(T, N) : T.__proto__ = N)
    }
    var u = function() {
            function T(N, A) {
                for (var C = 0, D; C < A.length; C++) D = A[C], D.enumerable = D.enumerable || !1, D.configurable = !0, 'value' in D && (D.writable = !0), Object.defineProperty(N, D.key, D)
            }
            return function(N, A, C) {
                return A && T(N.prototype, A), C && T(N, C), N
            }
        }(),
        p = o(8),
        m = o(9),
        E = o(30),
        g = o(17),
        y = 'com.prosyst.mbs.services.hdm.deviceclasses.MultiLevelSwitch',
        S = 'multilevelswitch',
        f = 0,
        I = 99,
        O = 255;
    t.exports = function(T) {
        function N() {
            return n(this, N), d(this, (N.__proto__ || Object.getPrototypeOf(N)).apply(this, arguments))
        }
        return c(N, T), u(N, null, [{
            key: 'getMinValue',
            value: function() {
                return f
            }
        }, {
            key: 'getMaxValue',
            value: function() {
                return I
            }
        }, {
            key: 'matchProsystDeviceClass',
            value: function(C) {
                return y === C
            }
        }, {
            key: 'getProsystDeviceClass',
            value: function() {
                return y
            }
        }, {
            key: 'matchNeeoDeviceClass',
            value: function(C) {
                return -1 < [S, 'setswitchmultilevelswitch', 'setmultilevelswitch', 'getmultilevelswitch'].indexOf(C)
            }
        }, {
            key: 'buildNeeoDeviceClass',
            value: function() {
                return {
                    name: S,
                    label: 'Level Sensor'
                }
            }
        }, {
            key: 'transformActuatorValue',
            value: function(C) {
                return 'false' === C ? C = f : 'true' == C && (C = O), C = 0 | C, C > I && C !== O && (C = I), C
            }
        }, {
            key: 'buildRWActuator',
            value: function(C, D, R) {
                var P = p.getActuatorPrefix(R),
                    w = [];
                w.push({
                    type: 'slider',
                    name: 'SET_' + S.toUpperCase() + D,
                    label: p.humanizeLabel(S, D),
                    path: P + 'set' + S + D,
                    slider: {
                        type: 'range',
                        sensor: p.buildNeeoSensorName(S, D),
                        range: [f, I],
                        unit: '%'
                    }
                });
                var L = E.buildRWActuator(C, D, R);
                w.push(L);
                var U = g.buildVirtualActuatorConfiguration('BinarySliderSwitch'),
                    F = g.buildNeeoSensor(U, D, R, 'get' + S);
                return w.push(F), w
            }
        }]), N
    }(m)
}, function(t, r, o) {o(0)("Function  56").verbose(" some simple validation routines");
    'use strict';
    var n = o(210),
        d = t.exports = function() {
            var c = n.apply(this, arguments);
            if (c) throw new Error('Validation failed: ' + JSON.stringify(c))
        };
    d.isInteger = function() {
        var c = n.isInteger.apply(this, arguments);
        if (!c) throw new Error('Validation failed: no integer')
    }, d.isArray = function() {
        var c = n.isArray.apply(this, arguments);
        if (!c) throw new Error('Validation failed: no array')
    }, d.isString = function() {
        var c = n.isString.apply(this, arguments);
        if (!c) throw new Error('Validation failed: no string')
    }
}, function(t, r, o) {o(0)("Function  57").verbose(" neeo:routes:sdkadapter");
    'use strict';

    function n(f, I) {
        d(f);
        var O = new Error(f);
        O.status = 404, I(O)
    }
    var d = o(2)('neeo:routes:sdkadapter'),
        c = o(7),
        u = c.Router(),
        p = o(14),
        m = o(3).dynamicDeviceSdk,
        E = o(6),
        g = o(0)('SDK Adapter'),
        y = m.COMPONENTS,
        S = void 0;
    u.param('adapterid', function(f, I, O, T) {
        console.log("deviceadapter routes:",u)
        return p.getAdapter(T).then(function(N) {
            return N ? (f.adapter = N, O(), null) : void n('ADAPTER_NOT_FOUND', O)
        }).catch(function(N) {
            d('GET_ADAPTER_FAILED', N.message), n('GET_ADAPTER_FAILED', O)
        })
    }), u.param('component', function(f, I, O, T) {
        var N = f.adapter.handler.get(T);
        if (N) return f.handler = N, O();
        var A = f.adapter.adapterName;
        return A ? void(m.storeDataInRequest(f, A, T), O()) : (d('handler not defined for', T), void n('COMPONENT_HANDLER_NOT_FOUND', O))
    }), u.param('deviceid', function(f, I, O, T) {
        f.deviceid = T;
        var N = m.validateDeviceIdRoute(f);
        if (!N) return n('DEVICEID_ROUTE_INVALID_PARAMETERS', O);
        var A = f.handler;
        return A ? O() : void m.storeDiscoveryHandlerInRequest(f).then(function(C) {
            return C ? void O() : (d('device not found with deviceId', T), n('DYNAMIC_REGISTERED_DEVICEID_NOT_FOUND', O))
        }).catch(function(C) {
            n(C.message, O)
        })
    }), u.param('value', function(f, I, O, T) {
        return 'undefined' == typeof T || null === T ? n('VALUE_NOT_DEFINED', O) : void(f.value = T, O())
    }), u.get('/:adapterid/discover', function(f, I, O) {
        d('discover request');
        var T = f.adapter.handler.get(y.NEEO_SDK_DISCOVER_COMPONENT);
        S.discover(T).then(function(N) {
            return I.json(N)
        }).catch(O)
    }), u.post('/:adapterid/register', function(f, I, O) {o(0)("Function  57").verbose(" Route register");

        d('register request');
        var T = f.body,
            N = f.adapter.handler.get(y.NEEO_SDK_REGISTER_COMPONENT);
        S.register(N, T).then(function(A) {
            I.json(A)
        }).catch(O)
    }), u.get('/:adapterid/registered', function(f, I, O) {o(0)("Function  57").verbose(" Route registered request");
        d('registered request');
        var T = f.adapter.handler.get(y.NEEO_SDK_REGISTER_COMPONENT);
        S.isRegistered(T).then(function(N) {
            return I.json(N)
        }).catch(O)
    }), u.get('/:adapterid/subscribe/:deviceId/:eventUriPrefix', function(f, I, O) { o(0)("Function  57").verbose(" Route subscrbe");
        var T = f.params.deviceId,
            N = f.adapter.handler.get(y.NEEO_SDK_DEVICE_SUBSCRIPTION_COMPONENT);
        S.subscribe(N, T).then(function() {
            return I.json({
                success: !0
            })
        }).catch(O)
    }), u.get('/:adapterid/unsubscribe/:deviceId', function(f, I, O) { o(0)("Function  57").verbose(" Route unsubscribe");
        var T = f.params.deviceId,
            N = f.adapter.handler.get(y.NEEO_SDK_DEVICE_SUBSCRIPTION_COMPONENT);
        S.unsubscribe(N, T).then(function() {
            return I.json({
                success: !0
            })
        }).catch(O)
    }), u.get('/:adapterid/:component/:deviceid', function(f, I, O) { o(0)("Function  57").verbose(" Route get request");
        d('get request %o', f.params);
        var T = {
            handler: f.handler,
            deviceid: f.deviceid
        };
        S.handleGet(T).then(function(N) {
            return I.json(N)
        }).catch(O)
    }), u.post('/:adapterid/:component/:deviceid', function(f, I, O) { o(0)("Function  57").verbose(" Route post request");
        d('post request %o', f.params, f.body);
        var T = {
            handler: f.handler,
            deviceid: f.deviceid,
            body: f.body
        };
        S.handleGet(T).then(function(N) {
            return I.json(N)
        }).catch(O)
    }), u.post('/:adapterid/:component/:deviceid/action', function(f, I, O) { o(0)("Function  57").verbose(" Route post request action" );
        d('post request %o', f.params, f.body);
        var T = {
            handler: f.handler,
            deviceid: f.deviceid,
            body: f.body
        };
        S.handleAction(T).then(function(N) {
            return I.json(N)
        }).catch(O)
    }), u.get('/:adapterid/:component/:deviceid/:value', function(f, I, O) { o(0)("Function  57").verbose(" Route set request to ");
        d('set request %o', f.params);
        var T = {
            handler: f.handler,
            deviceid: f.deviceid,
            value: f.value
        };
        S.handleSet(T).then(function(N) {
            return I.json(N)
        }).catch(O)
    }), u.use(function(f, I, O, T) { o(0)("Function  57").verbose(" Request error");
        T || d('EXPRESS_NEEDS_NEXT_PARAMETER_WEBPACK_TOO'), E.increaseCounter('SDK_' + f.message), g.debug('REQUEST_ERROR', {
            msg: f.message,
            stack: f.stack
        }), O.status(f.status || 500), O.json({
            message: f.message,
            error: {}
        })
    }), t.exports = u, t.exports.registerHandler = function(f) {
        m.registerHandler(f), S = f, d('REQUEST_HANDLER_REGISTERED')
    }
}, function(t) {
    t.exports = require('axios')
}, function(t) {
    t.exports = require('lodash')
}, function(t) {
    t.exports = require('lodash/isArray')
}, function(t) {
    t.exports = require('request')
}, function(t, r, o) {o(0)("Function  62").verbose(" deviceadapter error handler");
    'use strict';
    var n = o(0)('deviceadapter'),
        d = o(64),
        c = o(6);
    d.initializeServices(), process.on('SIGTERM', function() {
        n.info('TERMINATE_APPLICATION'), d.shutdownServices()
    }), process.on('SIGHUP', function() {
        n.info('SIGHUP_SIGNALED')
    }), process.on('uncaughtException', function(p) {
        n.error('UNCAUGHT_EXCEPTION', {
            error: p.message
        }), process.exit(1)
    }), process.on('unhandledRejection', function(p) {
        var m = 'development' === process.env.NODE_ENV,
            E = m ? p.stack : void 0;
        p && p.message === 'connect ECONNREFUSED 127.0.0.1:80' ? c.increaseCounter('PROSYS_API_ECONNREFUSED') : n.error('UNHANDLED_REJECTION', {
            msg: p.message,
            stack: E
        })
    })
}, function(t, r, o) {o(0)("Function  63").verbose(" some high level router");
    'use strict';
    var n = o(7),
        d = o(179),
        c = o(0)('app'),
        u = o(53),
        p = n();
    p.disable('x-powered-by'), p.use(d.json({
        limit: '2mb'
    })), p.use('/favicon.ico', function(g, y) {
        return y.send()
    });
    var m = n.Router();
    p.use('/v1', m), p.use('/', m);
    var E = {
        db: o(171),
        config: o(170),
        manager: o(174),
        capability: o(168),
        cec: o(169),
        hue: o(173),
        sonos: o(176),
        zwave: o(177),
        sdkAdapterDb: o(175),
        sdkAdapter: o(57)
    };
    m.post('/reset', function(g, y, S) {
        return c.info('RESET_DEVICEADAPTER'), u.reset(), S()
    }, E.zwave), m.get('/dummy/:dummy', function(g, y) {
        y.json({
            success: !0
        })
    }), m.use('/db', E.db), m.use('/config', E.config), m.use('/capability', E.capability), m.use('/', E.manager), m.use('/hue', E.hue), m.use('/sonos', E.sonos), m.use('/zwave', E.zwave), m.use('/neeodeviceadapter', E.sdkAdapterDb), m.use('/device', E.sdkAdapter), 
            m.use('/cec', E.cec), 
            p.use(function(g, y, S) {
                                        c.error('INVALID_URL_REQUESTED', {
                                        url: g.url
                                        });
                                        var f = new Error('Not Found');
                                        f.status = 404, S(f)
    }), 'development' === p.get('env') ? p.use(function(g, y, S, f) {
        f || c.debug('EXPRESS_NEEDS_NEXT_PARAMETER_WEBPACK_TOO'), c.error('SERVER_ERROR', {
            url: y.url,
            method: y.method,
            error: g.message,
            stack: g.stack
        }), S.status(g.status || 500), S.json({
            message: g.message,
            stack: g.stack
        })
    }) : p.use(function(g, y, S, f) {
        f || c.debug('EXPRESS_NEEDS_NEXT_PARAMETER_WEBPACK_TOO'), c.error('SERVER_ERROR', {
            url: y.url,
            method: y.method,
            error: g.message
        }), S.status(g.status || 500), S.json({
            message: g.message,
            error: {}
        })
    }), t.exports = p
}, function(t, r, o) {o(0)("Function  64").verbose(" neeo:bootstrap - initializeServices, shutdownServices");
    'use strict';

    function c() {
        return T.initialize(), E.resolve()
    }

    function u() {
        return new E(function(k) {
            U = w.createServer(L), U.listen(P.port, P.ip, function() {
                g.debug('DEVICEADAPTER_PROJECT_STARTED', {
                    ip: P.ip,
                    port: P.port
                });
                var F = Math.floor(1e3 * (process.uptime() - p));
                g.info('STARTUP_COMPLETE', {
                    durationMs: F
                }), k()
            })
        })
    }
    var p = process.uptime(),
        m = o(2)('neeo:bootstrap'),
        E = o(1),
        g = o(0)('server'),
        y = o(13),
        S = o(6),
        f = o(141),
        I = o(23),
        O = o(27),
        T = o(28),
        N = o(14),
        A = o(53),
        C = o(15),
        D = o(57),
        R = o(4),
        P = o(5),
        w = o(32),
        L = o(63),
        U = void 0;
    t.exports = {
        initializeServices: function() {
            m('BOOTSTRAP_START', process.uptime()), C.setStore(A), y.setNotification(f), S.startTask();
            var k = D.registerHandler;
            return E.all([c(), O.initialize(), I.initialize()]).then(function() {
                return u()
            }).then(function() {
                return N.initializeService(k)
            })/*.then(function() {  // we'll skip cec-initialization for now
                return R.initializeLibCEC()
            })*/
        },
        shutdownServices: function() {
            m('TERMINATE_SERVICES'), R.shutdownLibCEC(), U.close(), N.shutdownService(), I.shutdown(), T.shutdown(), O.shutdown()
        }
    }
}, function(t) {
    'use strict';

    function n(p, m) {
        if (!(p instanceof m)) throw new TypeError('Cannot call a class as a function')
    }
    var d = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function(p) {
            return typeof p
        } : function(p) {
            return p && 'function' == typeof Symbol && p.constructor === Symbol && p !== Symbol.prototype ? 'symbol' : typeof p
        },
        c = function() {
            function p(m, E) {
                for (var g = 0, y; g < E.length; g++) y = E[g], y.enumerable = y.enumerable || !1, y.configurable = !0, 'value' in y && (y.writable = !0), Object.defineProperty(m, y.key, y)
            }
            return function(m, E, g) {
                return E && p(m.prototype, E), g && p(m, g), m
            }
        }(),
        u = ['POWER OFF', 'POWER ON'];
    t.exports = function() {
        function p(m) {
            if (n(this, p), !m || 'object' !== ('undefined' == typeof m ? 'undefined' : d(m))) throw new Error('INVALID_BUTTONMAPPING');
            var E = Object.keys(m);
            E.map(function(g) {
                return m[g]
            }).filter(function(g) {
                return g && 'object' === ('undefined' == typeof g ? 'undefined' : d(g))
            }).forEach(function(g) {
                if (!E.includes(g.on) || !E.includes(g.off)) throw new Error('INVALID_VIRTUALTOGGLEBUTTON')
            }), this._buttonMap = m
        }
        return c(p, [{
            key: 'getSupportedButtons',
            value: function() {
                return Object.keys(this._buttonMap).filter(function(E) {
                    return !u.includes(E)
                }).map(function(E) {
                    return {
                        name: E
                    }
                })
            }
        }, {
            key: 'isSupportedViaCEC',
            value: function(E) {
                var g = this.getCECKeyCode(E);
                return Number.isInteger(g)
            }
        }, {
            key: 'isSupportedViaVirtualToggle',
            value: function(E) {
                var g = this.getCECKeyCode(E);
                return !!(g && g.on && g.off)
            }
        }, {
            key: 'getCECKeyCode',
            value: function(E) {
                return this._buttonMap[E]
            }
        }]), p
    }()
}, function(t, r, o) {o(0)("Function  66").verbose(" CEC ACTIVATE DEVICE");
    'use strict';

    function n(N, A) {
        if (!(N instanceof A)) throw new TypeError('Cannot call a class as a function')
    }

    function d(N) {
        return N.physicalAddress + ':' + N.logicalAddress
    }

    function c(N) {
        return N
    }
    var u = function() {
            function N(A, C) {
                for (var D = 0, R; D < C.length; D++) R = C[D], R.enumerable = R.enumerable || !1, R.configurable = !0, 'value' in R && (R.writable = !0), Object.defineProperty(A, R.key, R)
            }
            return function(A, C, D) {
                return C && N(A.prototype, C), D && N(A, D), A
            }
        }(),
        p = o(21),
        m = o(0),
        E = o(1),
        g = o(19),
        y = o(12),
        S = o(20),
        f = S.instance,
        I = 'POWER ON',
        O = 'POWER OFF',
        T = 'CEC ACTIVATE DEVICE';
    t.exports = function() {
        function N(A, C, D, R) {
            var P = this;
            n(this, N), this._buttonMap = C, this._discoveryFilterFn = D, this._discoveryModifyResultFn = R || c, this._log = m('CEC ' + A), this.markDeviceOn = function() {}, this.markDeviceOff = function() {}, this._deviceIdSet = new Set, f.on(S.POWERSTATE_CHANGED, function(w) {
                w && 0 !== P._deviceIdSet.size && (P._log.debug('REPORT_CHANGED_POWERSTATE', w.poweredOn), P._deviceIdSet.has(w.neeoCecAddress) && (w.poweredOn ? P.markDeviceOn(w.neeoCecAddress) : P.markDeviceOff(w.neeoCecAddress)))
            }), f.once(S.POWERSTATE_INITIALISED, function() {
                P._log.debug('POWERSTATE_INITIALISED'), P._heatUpCecAddressMapper()
            })
        }
        return u(N, [{
            key: '_getRefreshedCecAddress',
            value: function(C) {
                return g.getRefreshedCecAddessObject(C, this._discoveryFilterFn)
            }
        }, {
            key: '_heatUpCecAddressMapper',
            value: function() {
                var C = this;
                this._log.debug('HEAT_UP_CEC_MAPPER__MAKE_REVERSE_MAPPING_WORKS'), this._deviceIdSet.forEach(function(D) {
                    C._getRefreshedCecAddress(D)
                })
            }
        }, {
            key: 'onButtonPressed',
            value: function(C, D) {
                var R = this,
                    P = this._getRefreshedCecAddress(D);
                if (!P) return this._log.warn('BUTTON_PRESS_INVALID_CEC_DEVICE', {
                    action: C,
                    deviceId: D
                }), E.resolve();
                switch (C) {
                    case I:
                        return this._log.debug(I, P), p.power(P.logicalAddress).then(function() {
                            return R.markDeviceOn(D)
                        });
                    case O:
                        var w = this._buttonMap.isSupportedViaCEC(C);
                        return w ? (this._log.debug('POWER_OFF_OVERRIDE', P), this._sendSimpleCECCommand(C, P).then(function() {
                            return R.markDeviceOff(D)
                        })) : (this._log.debug(O, P), p.standBy(P.logicalAddress).then(function() {
                            return R.markDeviceOff(D)
                        }));
                    case T:
                        return this._log.debug(T, P), p.setStreamPath(P);
                    default:
                        var L = this._buttonMap.isSupportedViaCEC(C);
                        if (L) return this._sendSimpleCECCommand(C, P);
                        var U = this._buttonMap.isSupportedViaVirtualToggle(C);
                        return U ? this._sendVirtualToggleCECCommand(C, P) : (this._log.warn('UNSUPPORTED_CEC_ACTION', {
                            action: C,
                            cecAddress: P
                        }), E.resolve());
                }
            }
        }, {
            key: '_sendSimpleCECCommand',
            value: function(C, D) {
                this._log.debug('CEC_KEY_PRESS', {
                    action: C,
                    cecAddress: D
                });
                var R = this._buttonMap.getCECKeyCode(C);
                return p.sendKeyPressRelease(D.logicalAddress, R)
            }
        }, {
            key: '_isVirtualCommandInStateOn',
            value: function(C) {
                return this.toggleCommandState ? !0 === this.toggleCommandState[C] : (this.toggleCommandState = {}, !1)
            }
        }, {
            key: '_sendVirtualToggleCECCommand',
            value: function(C, D) {
                this._log.debug('VIRTUAL_CEC_KEY_PRESS', {
                    action: C,
                    cecAddress: D
                });
                var R = this._buttonMap.getCECKeyCode(C);
                return this._isVirtualCommandInStateOn(C) ? (this.toggleCommandState[C] = !1, this._sendSimpleCECCommand(R.off, D)) : (this.toggleCommandState[C] = !0, this._sendSimpleCECCommand(R.on, D))
            }
        }, {
            key: 'discover',
            value: function() {
                var C = this;
                return this._log.debug('START_CEC_DISCOVERY'), p.scan().then(function(D) {
                    return C._log.info('CEC_DISCOVERY', D), D.filter(C._discoveryFilterFn).map(function(R) {
                        return C._discoveryModifyResultFn({
                            id: d(R),
                            name: R.osdName
                        })
                    })
                })
            }
        }, {
            key: 'getPowerState',
            value: function(C) {
                var D = this._getRefreshedCecAddress(C);
                if (!D) return this._log.warn('POWER_STATE_INVALID_CEC_DEVICE', {
                    deviceId: C
                }), E.resolve(!1);
                var R = D.physicalAddress + ':' + D.logicalAddress;
                return this._log.debug('getPowerState', R), y.isDevicePoweredOn(R)
            }
        }, {
            key: 'brainNotification',
            value: function(C, D) {
                this._log.debug('register brain notification functions'), this.updateCallback = C, D && D.powerOnNotificationFunction && (this._log.debug('register brain powerOn notification'), this.markDeviceOn = D.powerOnNotificationFunction), D && D.powerOffNotificationFunction && (this._log.debug('register brain powerOff notification'), this.markDeviceOff = D.powerOffNotificationFunction)
            }
        }, {
            key: 'deviceAdded',
            value: function(C) {
                this._log.debug('DEVICE_ADDED', C), this._deviceIdSet.add(C), this._getRefreshedCecAddress(C)
            }
        }, {
            key: 'deviceRemoved',
            value: function(C) {
                this._log.debug('DEVICE_REMOVED', C), this._deviceIdSet.delete(C)
            }
        }, {
            key: 'initializeDeviceList',
            value: function() {
                var C = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [];
                this._log.debug('DEVICELIST_INITIALISED', C), this._deviceIdSet = new Set(C)
            }
        }]), N
    }()
}, function(t, r, o) {o(0)("Function  67").verbose(" neeo:lib:cec:parser - parseReportPowerStatus, parseStandby, parseActiveSource");
    'use strict';

    function n(g) {
        return 0 <= g && 15 >= g
    }

    function d(g, y) {
        var S = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : 2;
        if ('string' != typeof g) return void m('INPUT_NOT_STRING');
        var f = g.split(' ');
        if (f.length !== S) return void m('INPUT_INVALID', g);
        var I = parseInt(f[0], 10),
            O = parseInt(f[1], 10);
        return n(I) && n(O) ? {
            sourceLogicalAddress: I,
            destinationLogicalAddress: O,
            powerOn: y(f)
        } : void m('INVALID_LOGICAL_ADDRESS', g)
    }
    var m = o(2)('neeo:lib:cec:parser');
    t.exports = {
        parseReportPowerStatus: function(g) {
            return d(g, function(S) {
                return S[2] === '00'
            }, 3)
        },
        parseStandby: function(g) {
            return d(g, function() {
                return !1
            })
        },
        parseActiveSource: function(g) {
            return d(g, function() {
                return !0
            })
        }
    }
}, function(t, r, o) {o(0)("Function  68").verbose(" CEC-Logger; ipcCallbackFunction, registerTriggerScanFunction");
    'use strict';

    function c(f, I) {
        if (I) {
            var O = y.find(function(T) {
                return I.startsWith(T)
            });
            return O ? void p.increaseCounter('CEC_' + I) : 'WARNING' === f || 'ERROR' === f ? void m.warn('CEC-LOG', {
                level: f,
                message: I
            }) : void m.debug('CEC-LOG', {
                level: f,
                message: I
            })
        }
    }

    function u(f, I) {
        if (f) {
            m.debug('CEC-COMMAND', {
                cecOpcode: f,
                param: I
            });
            var O = void 0;
            'CEC_OPCODE_REPORT_POWER_STATUS' === f ? (O = E.parseReportPowerStatus(I), O && g.updatePowerStateByLogicalAddress(O)) : 'CEC_OPCODE_STANDBY' === f ? (O = E.parseStandby(I), O && g.updatePowerStateByLogicalAddress(O)) : 'CEC_OPCODE_ACTIVE_SOURCE' === f ? (O = E.parseActiveSource(I), O && g.updatePowerStateByLogicalAddress(O)) : void 0;
            S && ['CEC_OPCODE_ACTIVE_SOURCE', 'CEC_OPCODE_STANDBY', 'CEC_OPCODE_ROUTING_CHANGE', 'CEC_OPCODE_SET_SYSTEM_AUDIO_MODE'].includes(f) && (m.debug('TRIGGER_POWERSCAN'), S())
        }
    }
    var p = o(6).getInstance(),
        m = o(0)('CEC-Logger'),
        E = o(67),
        g = o(12),
        y = ['LOW_ERROR', 'HIGH_ERROR', 'sunxi ', 'failed to request the physical address', 'FIXME LG seems to have bugged out.'];
    t.exports = {
        ipcCallbackFunction: function(f) {
            return f ? 'CEC-ALERT' === f.source ? p.increaseCounter('CEC_ALERT_' + f.data) : 'CEC-LOG' === f.source ? ('ERROR' === f.data && f.param && f.param.startsWith('NEEO_RESTART_LIBCECREQUEST') && m.debug('RESTART_LIBCEC_DISABLED'), c(f.data, '' + f.param)) : 'CEC-COMMAND' === f.source ? u(f.data, f.param) : 'CEC-POWERSCAN' === f.source ? g.updatePowerState([f.data]) : void m.debug('CEC_INFORMATION_MESSAGE', {
                source: f.source,
                data: f.data,
                parameter: f.param
            }) : void 0
        },
        registerTriggerScanFunction: function(f) {
            S = f
        }
    };
    var S = void 0
}, function(t) { o(0)("Function  69").verbose(" getSetStreamPathPayload");
    'use strict';

    function n(y) {
        var S = y.split(p);
        return [S[0], S[1], u, S[2], S[3]].join('')
    }
    var c = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function(y) {
            return typeof y
        } : function(y) {
            return y && 'function' == typeof Symbol && y.constructor === Symbol && y !== Symbol.prototype ? 'symbol' : typeof y
        },
        u = ':',
        p = '.';
    t.exports = {
        getSetStreamPathPayload: function(y) {
            if (!y || !y.physicalAddress || c(y.logicalAddress) === void 0) return '';
            if (y.physicalAddress.toUpperCase() === 'F.F.F.F') return '';
            var S = n(y.physicalAddress),
                f = parseInt(y.logicalAddress),
                I = f.toString(16) + 'F';
            return I + u + '86' + u + S
        }
    }
}, function(t, r, o) {o(0)("Function  70").verbose(" CEC-Scheduler - scheduler");
    'use strict';

    function d(C) {
        return A ? (E.debug('RECURRING_CEC_SCAN_ALREADY_STARTED'), !1) : (E.debug('SCHEDULE_RECURRING_CEC_SCAN'), A = setInterval(function() {
            var D = S.getLastCecKeyActionTimestampMs();
            D < I ? (E.debug('POSTPONE_POWER_SCAN', D), C && C(null, !1)) : y.powerScan().then(function(R) {
                C && C(null, R)
            }).catch(function(R) {
                C && C(R), E.warn('CEC_RECURRING_POWERSCAN_FAILED', {
                    error: R.message
                })
            })
        }, f), !0)
    }

    function c(C, D) {
        var R = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : 0,
            P = Date.now() - C;
        if (R >= T) return E.warn('CEC_POWERSCAN_CALLCOUNT_EXCEEDED'), g.resolve('CEC_POWERSCAN_CALLCOUNT_EXCEEDED');
        if (P > D) return E.debug('timeBasedRecursivePowerTrigger: finished'), g.resolve('CEC_POWERSCAN_SCANTIME_EXCEEDED');
        E.debug('timeBasedRecursivePowerTrigger: retrigger powerscan');
        var w = 0 < R ? O : 0;
        return g.delay(w).then(function() {
            return y.powerScan()
        }).catch(function(L) {
            return E.debug('timeBasedRecursivePowerTrigger: failed powerscan', L.message)
        }).then(function() {
            return c(C, D, ++R)
        })
    }

    function p() {
        clearTimeout(N), N = null, clearInterval(A), A = null
    }
    var m = o(5).cec,
        E = o(0)('CEC-Scheduler'),
        g = o(1),
        y = o(21),
        S = o(12),
        f = m.recurringPowerscanIntervallMs,
        I = m.recurringPowerscanWaitTimeAfterLastKeypressMs,
        O = m.powerscanScanDelayMs,
        T = m.powerscanMaximalCallCount,
        N = null,
        A = null;
    t.exports = {
        forcePowerScan: function(C) {
            if (!C || 0 > C) return g.reject(new Error('INVALID_PARAMETER'));
            E.debug('FORCE POWER SCAN', C), p();
            var D = Date.now();
            return c(D, C).then(function() {
                return d()
            }).catch(function(R) {
                return E.warn('FORCE_POWER_SCAN_FAILED', {
                    error: R.message
                }), d()
            })
        },
        timeBasedRecursivePowerScanTrigger: c,
        scheduleOneTimePowerScan: function(C) {
            return N ? (E.debug('CEC_SCAN_ALREADY_PENDING'), !1) : (E.debug('SCHEDULE_CEC_SCAN', O), N = setTimeout(function() {
                E.debug('START_INITIAL_CEC_SCAN'), y.scan().then(function(D) {
                    N = null, C && C(null, D)
                }).catch(function(D) {
                    N = null, C && C(D), E.warn('CEC_POWERSCAN_FAILED', {
                        error: D.message
                    })
                })
            }, O), !0)
        },
        scheduleRecurringPowerScan: d,
        clearSchedules: p
    }
}, function(t, r, o) {o(0)("Function  71").verbose("DB, Looks like functions to load (deviceadapter's) adapters, build devices for them");
    'use strict';
    var n = o(184),
        d = o(0)('db'),
        c = o(59),
        u = o(209),
        p = t.exports = function(m) {
            d.debug('init', m), this.maxSearchResults = m.maxSearchResults, this.adapters = this._loadAdaptersFromJson(m.basePath, m.adapters), this.devices = this._buildDevices(this.adapters), this.deviceIndex = new u(this.devices, {
                unique: !0,
                delimiter: ' ',
                collectionKeys: ['manufacturer', 'name', 'type', 'tokens'],
                threshold: m.threshold
            })
        };
    p.prototype._loadAdaptersFromJson = function(m, E) {
        function g(f) {
            return m + '/' + f + '.json'
        }

        function y(f) {
            try {
                return JSON.parse(f)
            } catch (I) {
                return d.warn('JSON_PARSE_FAILED', {
                    error: I.message
                }), {}
            }
        }
        var S = {};
        return E.forEach(function(f) {
            var I = g(f);
            d.debug('loading device adapter file:', I);
            var O = n.readFileSync(I, {
                encoding: 'utf-8'
            });
            S[f] = y(O)
        }), S
    }, p.prototype._buildDevices = function(m) {
        var E = [],
            g = 0;
        return c.values(m).forEach(function(y) {
            y.devices.forEach(function(S) {
                E.push({
                    id: g++,
                    adapterName: y.adapterName,
                    type: S.type || y.type,
                    manufacturer: S.manufacturer || y.manufacturer,
                    setup: y.setup,
                    name: S.name,
                    tokens: S.tokens ? S.tokens.join(' ') : '',
                    device: S
                })
            })
        }), E
    }, p.prototype.search = function(m) {
        m = m || '', m = m.toLowerCase();
        var E = this.deviceIndex.search(m);
        return E.slice(0, this.maxSearchResults).map(function(g) {
            return g
        }) || []
    }, p.prototype.findAdapterWithCapability = function(m) {
        var E = [];
        return c.values(this.adapters).forEach(function(g) {
            g.capabilities && c.values(g.capabilities).forEach(function(y) {
                y.type === m && E.push(g.adapterName)
            })
        }), E
    }, p.prototype.findFirstExactMatch = function(m) {
        return this.deviceIndex.findFirstExactMatch(m)
    }, p.prototype.getDevice = function(m) {
        var E = c.clone(this.devices[m]);
        return E.capabilities = this.adapters[E.adapterName].capabilities, E
    }
}, function(t, r, o) {o(0)("Function  72").verbose(" Hue Device main functions");
    'use strict';
    var n = o(1),
        d = o(35),
        c = o(187),
        u = o(11),
        p = o(13),
        m = o(36),
        E = o(73),
        g = o(48),
        y = o(0)('Hue Device'),
        S = t.exports = function(f) {
            this.cache = {}, this.pollingTimeMs = f.pollingTimeMs, this.discoverHueCache = new g(4e3, 'HUE-DISCOVER'), p.call(this, 'hue')
        };
    d.inherits(S, p), S.prototype.parseId = function(f) {
        return m.parseId(f)
    }, S.prototype._getHueIdentifier = function(f) {
        return f.id ? f.id : f.internalipaddress
    }, S.prototype.getAdapter = function(f) {
        var I = this._getHueIdentifier(f);
        if (!I) throw y.warn('HUE_DEVICE_NOT_FOUND', {
            bridge: f
        }), new Error('HUE_DEVICE_NOT_FOUND');
        if (this.cache[I]) return this.cache[I];
        var O = this._loadCredentials(I);
        O || y.debug('HUE_DEVICE_NO_USER', {
            bridge: f
        }), y.debug('CREATE_HUE_INSTANCE');
        var T = E.buildHueAdapter(f.internalipaddress, O, I);
        return O && (y.info('ADD_ADAPTER_TO_CACHE', {
            bridgeId: I,
            usernameLength: O.length
        }), this.cache[I] = T), T
    }, S.prototype._cachedHueDiscovery = function() {
        return this.discoverHueCache.getValue(function() {
            return E.discoverHue()
        })
    }, S.prototype.detectAdapters = function() {
        var f = this;
        return this._cachedHueDiscovery().then(function(I) {
            return I.map(function(O) {
                try {
                    return f.getAdapter(O)
                } catch (T) {
                    return !1
                }
            }).filter(function(O) {
                return O
            })
        }).catch(function(I) {
            return y.error('HUE_DETECT_ADAPTERS_FAILED', I.message)
        })
    }, S.prototype._loadCredentials = function(f) {
        return this.repo.loadFailsafe(f)
    }, S.prototype._saveCredentials = function(f, I) {
        try {
            this.repo.save(f, I), y.info('HUE_SAVE_CREDENTIALS', f), y.debug('CLEAR_HUE_ADAPTER_CACHE'), this.cache = {}
        } catch (O) {
            y.error('HUE_SAVE_CREDENTIALS', O.message)
        }
    }, S.prototype._registerUser = function(f, I) {
        var O = this,
            T = this._getHueIdentifier(I);
        return y.info('UNREGISTERED_HUE_FOUND', {
            id: T
        }), f.register().then(function(N) {
            return y.info('HUE_REGISTERED_USER', {
                id: T,
                username: N
            }), O._saveCredentials(T, N), y.debug('HUE_CREDENTIALS_SAVED'), O.getAdapter(I)
        }).catch(function(N) {
            y.error('HUE_FAILED_TO_REGISTERED_USER', N.message)
        })
    }, S.prototype._registerIfNeeded = function(f) {
        var I = this,
            O = this.getAdapter(f);
        return O.registered().then(function(T) {
            return T ? (y.debug('REGISTERED_HUE_FOUND'), O) : I._registerUser(O, f)
        })
    }, S.prototype.discover = function() {
        var f = this;
        return this._cachedHueDiscovery().then(function(I) {
            return n.all(I.map(function(O) {
                return f._registerIfNeeded(O)
            })).then(function(O) {
                return y.debug('discovered adapters', O), n.all(O.map(function(T) {
                    if (T) return T.discover()
                }))
            }).then(function(O) {
                return u(O.filter(function(T) {
                    return T
                }))
            })
        })
    }, S.prototype.unregister = function() {
        return this.cache = {}, n.resolve()
    }, S.prototype.register = function() {
        return n.resolve()
    }, S.prototype.enableNotifications = function() {
        this._startPolling()
    }, S.prototype._startPolling = function() {
        var f = this;
        y.debug('HUE_POLLING_START', this.pollingTimeMs), this.pollingIntervalId = setInterval(function() {
            return f._poll()
        }, this.pollingTimeMs)
    }, S.prototype._poll = function() {
        var f = this;
        return this._hasSubscriptions() ? void c(this.cache, function(I) {
            I.waitingOnPollingAnswer ? y.debug('HUE_POLLING_BUSY') : I.poll(f).catch(function(O) {
                y.debug('HUE_POLLING_FAILED', O.message)
            })
        }) : (y.debug('HUE_POLLING_STOP_NO_SUBSCRIPTIONS'), void clearInterval(this.pollingIntervalId))
    }, S.prototype.initialize = function() {
        return y.debug('Initializing'), this._loadSubscriptions(), this._startPolling(), this.detectAdapters()
    }, S.prototype.shutdown = function() {
        this.pollingIntervalId && (y.debug('STOP_HUE_POLLING'), clearInterval(this.pollingIntervalId), this.pollingIntervalId = void 0)
    }
}, function(t, r, o) {o(0)("Function  73").verbose(" Hue Factory; buildHueAdapter, discoverHue");
    'use strict';

    function n(y) {
        return Array.isArray(y) && 0 !== y.length ? y.filter(function(S) {
            return S && S.id && S.internalipaddress
        }) : []
    }

    function d() {
        return p.upnpSearch().then(function(y) {
            return n(y)
        }).catch(function(y) {
            return u.warn('HUE_LOCAL_DISCOVERY_FAILED', {
                error: y.message
            }), []
        })
    }
    var c = o(36),
        u = o(0)('Hue Factory'),
        p = o(203),
        m = p.HueApi,
        E = p.lightState;
    t.exports.buildHueAdapter = function(y, S, f) {
        return new c({
            api: new m(y, S),
            createLightState: E.create,
            bridgeip: y,
            username: S,
            description: 'NEEO Brain',
            bridgeuid: f
        })
    }, t.exports.discoverHue = function() {
        return p.nupnpSearch().then(function(y) {
            console.log('bridges', y);
            var S = n(y);
            return 0 < S.length ? S : (u.debug('nupnpSearch returned nothing, try local search'), d())
        }).catch(function(y) {
            return u.warn('HUE_DISCOVERY_FAILED', {
                error: y.message
            }), d()
        })
    }
}, function(t, r, o) {o(0)("Function  74").verbose(" neeo:lib:internaladapter:BrainDriver; stop, getDeviceAdapter, getAdapterDefinition, searchDevice, getDevice,  setWireRequestHandlerCallback");
    'use strict';
    var n = o(2)('neeo:lib:internaladapter:BrainDriver'),
        d = void 0,
        c = {
            searchDevice: function() {
                throw new Error('NOT_INITIALIZED')
            },
            getDevice: function() {
                throw new Error('NOT_INITIALIZED')
            },
            getDeviceByAdapterId: function() {
                throw new Error('NOT_INITIALIZED')
            },
            getAdapterDefinition: function() {
                throw new Error('NOT_INITIALIZED')
            }
        };
    t.exports.start = function(u, p) {
        return n('START_DRIVER'), c = p, 'function' == typeof d && d(c), Promise.resolve()
    }, t.exports.stop = function() {
        return n('STOP_DRIVER'), Promise.resolve()
    }, t.exports.getDeviceAdapter = function(u) {
        return c.getDeviceByAdapterId(u)
    }, t.exports.getAdapterDefinition = function(u) {
        return c.getAdapterDefinition(u)
    }, t.exports.searchDevice = function(u) {
        return c.searchDevice(u)
    }, t.exports.getDevice = function(u) {
        return c.getDevice(u)
    }, t.exports.setWireRequestHandlerCallback = function(u) {
        d = u
    }
}, function(t, r, o) {o(0)("Function  75").verbose(" buildCECController('Chromecast'");
    'use strict';
    var d = o(4),
        c = o(37),
        u = ['Chromecast'];
    t.exports = d.buildCECController('Chromecast', c, function(m) {
        return u.includes(m.osdName)
    })
}, function(t, r, o) {o(0)("Function  76").verbose(" Chromecast:SDK buildCECDevice(m)");
    'use strict';
    var d = o(4),
        c = o(75),
        u = o(37),
        p = o(0)('Chromecast:SDK'),
        m = {
            name: 'Chromecast',
            manufacturer: 'Google',
            type: 'MEDIAPLAYER',
            searchTokens: ['chrome', 'ultra'],
            deviceCapabilities: ['alwaysOn'],
            discoveryInstructions: {
                headerText: 'This device requires HDMI CEC',
                description: 'To discover and then control Chromecast you will need to connect the NEEO Brain to your setup with an HDMI cable and enable HDMI Device Link on your TV/AVR.'
            },
            buttonMap: u,
            controller: c
        };
    t.exports = {
        buildDevices: function() {
            try {
                var E = d.buildCECDevice(m);
                return [E]
            } catch (g) {
                p.error('INITIALIZATION_FAILED', g.message)
            }
        }
    }
}, function(t) {
    'use strict';
    t.exports = {
        initializeDevices: function(d) {
            return d.reduce(function(c, u) {
                var p = u.buildDevices();
                return c.concat(p)
            }, []).filter(function(c) {
                return c
            })
        }
    }
}, function(t, r, o) {o(0)("Function  78").verbose(" Amazon FireTV', 'Fire TV Stick', 'Fire TV Cube' buildCECController('FireTV'");
    'use strict';
    var c = o(4),
        u = o(38),
        p = ['Amazon FireTV', 'Fire TV Stick', 'Fire TV Cube'];
    t.exports = c.buildCECController('FireTV', u, function(E) {
        if (!E.osdName) return !1;
        var g = E.osdName.toLowerCase();
        return p.map(function(y) {
            return y.toLowerCase()
        }).includes(g)
    }, function(E) {
        return {
            id: E.id,
            name: 'Fire TV',
            room: '(' + E.name + ')'
        }
    })
}, function(t, r, o) {o(0)("Function  79").verbose(" FireTV:SDK buildCECDevice");
    'use strict';
    var d = o(4),
        c = o(78),
        u = o(38),
        p = o(0)('FireTV:SDK'),
        m = {
            name: 'Fire TV',
            manufacturer: 'Amazon',
            type: 'MEDIAPLAYER',
            searchTokens: ['FireTV'],
            discoveryInstructions: {
                headerText: 'This device requires HDMI CEC',
                description: 'To discover and then control FireTV you will need to connect the NEEO Brain to your setup with an HDMI cable and enable HDMI Device Link on your TV/AVR and FireTV.\nPlease disable the screensaver on your Fire TV, to prevent it from turning off.'
            },
            buttonMap: u,
            controller: c
        };
    t.exports = {
        buildDevices: function() {
            try {
                var E = d.buildCECDevice(m);
                return [E]
            } catch (g) {
                p.error('INITIALIZATION_FAILED', g.message)
            }
        }
    }
}, function(t, r, o) {o(0)("Function  80").verbose(" neeo:ikea-tradfri:tradfri buildCustomDevice('Tr\xE5dfri').setSpecificName('myStrom Switch')");
    'use strict';
    var d = o(3),
        c = o(0)('neeo:ikea-tradfri:tradfri'),
        u = o(24),
        p = o(82),
        E = {
            name: u.COMPONENT_BRIGHTNESS,
            label: 'Dimmer',
            range: [0, 100],
            unit: '%'
        },
        g = {
            name: u.COMPONENT_POWER,
            label: 'Power'
        },
        y = {
            headerText: 'IKEA Tr\xE5dfri requirements',
            description: 'To discover the lights an IKEA Tr\xE5dfri Gateway is required, firmware version 1.2.42 or newer are supported.\nYour IKEA Tr\xE5dfri lights need to be paired with the Gateway, please follow the instructions in the official IKEA Tr\xE5dfri app.\nNote: At the momment only a single IKEA Tr\xE5dfri Gateway can be added.'
        },
        S = {
            type: 'SECURITY_CODE',
            headerText: 'Enter Tr\xE5dfri Security Code',
            description: 'The security code is located on the bottom of your IKEA Tr\xE5dfri Gateway.'
        },
        f = {
            name: u.MACRO_POWER_TOGGLE,
            label: 'Power Toggle'
        };
    t.exports = {
        buildDevices: function() {
            try {
                var I = p.build(),
                    O = d.buildCustomDevice('Tr\xE5dfri').setSpecificName('myStrom Switch').setManufacturer('IKEA').setType('LIGHT').addAdditionalSearchToken('tradfri').addCapability('bridgeDevice').enableDiscovery(y, function() {
                        return I.discover()
                    }).addButton(f).addButtonHandler(function(T, N) {
                        return I.onButtonPressed(T, N)
                    }).addButtonGroup('Power').addSlider(E, I.brightnessSliderCallback).addSwitch(g, I.powerSwitchCallback).addPowerStateSensor(I.powerSwitchCallback).enableRegistration(S, {
                        register: function(N) {
                            return I.register(N)
                        },
                        isRegistered: function() {
                            return I.isRegistered()
                        }
                    }).registerInitialiseFunction(function() {
                        return I.initialize()
                    }).registerSubscriptionFunction(function() {
                        return I.setNotificationCallbacks.apply(I, arguments)
                    }).registerDeviceSubscriptionHandler({
                        deviceAdded: function(N) {
                            return I.deviceAdded(N)
                        },
                        deviceRemoved: function(N) {
                            return I.deviceRemoved(N)
                        },
                        initializeDeviceList: function(N) {
                            return I.initializeDeviceList(N)
                        }
                    });
                return [O]
            } catch (T) {
                c.error('INITIALIZATION_FAILED', T.message)
            }
        }
    }
}, function(t, r, o) {o(0)("Function  81").verbose(" neeo:ikea-tradfri:lib:grouphandling");
    'use strict';

    function n(E, g) {
        if (!(E instanceof g)) throw new TypeError('Cannot call a class as a function')
    }
    var c = function() {
            function E(g, y) {
                for (var S = 0, f; S < y.length; S++) f = y[S], f.enumerable = f.enumerable || !1, f.configurable = !0, 'value' in f && (f.writable = !0), Object.defineProperty(g, f.key, f)
            }
            return function(g, y, S) {
                return y && E(g.prototype, y), S && E(g, S), g
            }
        }(),
        u = o(2)('neeo:ikea-tradfri:lib:grouphandling'),
        p = o(24),
        m = function() {
            function E(g) {
                n(this, E), this.sendNotificationToBrainFn = g
            }
            return c(E, [{
                key: 'updateTradfriGroups',
                value: function(y, S) {
                    var f = this;
                    if (!y || !S) return u('invalid parameters'), !1;
                    var I = S.getAllDevices().filter(function(O) {
                        return Array.isArray(O.clientObject.deviceIDs) && O.clientObject.deviceIDs.includes(y)
                    }).map(function(O) {
                        return O.clientObject
                    });
                    I.forEach(function(O) {
                        var T = O.deviceIDs.map(function(C) {
                            return S.getClientObjectIfReachable(C)
                        }).filter(function(C) {
                            return C
                        });
                        if (0 < T.length) {
                            var N = E.getGroupBrightness(T);
                            Number.isFinite(N) && f.sendNotificationToBrainFn(O.instanceId, p.COMPONENT_BRIGHTNESS, N);
                            var A = E.getGroupPowerstate(T);
                            'undefined' != typeof A && f.sendNotificationToBrainFn(O.instanceId, p.COMPONENT_POWER, A)
                        }
                    })
                }
            }], [{
                key: 'getGroupBrightness',
                value: function(y) {
                    var f = y.reduce(function(I, O) {
                        return I + O.dimmer
                    }, 0) / y.length;
                    return f
                }
            }, {
                key: 'getGroupPowerstate',
                value: function(y) {
                    var f = y.reduce(function(I, O) {
                        return I || O.onOff
                    }, !1);
                    return f
                }
            }]), E
        }();
    t.exports = {
        buildTradfriGroupHandling: function(E) {
            return new m(E)
        }
    }
}, function(t, r, o) {o(0)("Function 82 neeo:ikea-tradfri:controller");
    'use strict';

    function n(T, N) {
        if (!(T instanceof N)) throw new TypeError('Cannot call a class as a function')
    }
    var d = function() {
            function T(N, A) {
                for (var C = 0, D; C < A.length; C++) D = A[C], D.enumerable = D.enumerable || !1, D.configurable = !0, 'value' in D && (D.writable = !0), Object.defineProperty(N, D.key, D)
            }
            return function(N, A, C) {
                return A && T(N.prototype, A), C && T(N, C), N
            }
        }(),
        c = o(1),
        u = o(2)('neeo:ikea-tradfri:controller'),
        p = o(84),
        m = o(81),
        E = o(24),
        g = o(3),
        y = o(121),
        S = g.Subscriptions,
        I = 'IKEA_TRADFRI';
    t.exports = function() {
        function T() {
            var N = this;
            n(this, T), this._notificationsEnabled = !0, this._dataStore = y.getInstance('IKEA-TRADFRI'), this._deviceState = g.buildDeviceState(), this._deviceState.registerStateUpdate(function() {
                return N._handleStateUpdate.apply(N, arguments)
            }), this._subscriptions = S.build(), this.brightnessSliderCallback = this._getBrightnessCallbacks(), this.powerSwitchCallback = this._getPowerStateCallbacks(), this._tradfriGroupHandling = m.buildTradfriGroupHandling(function() {
                return N.sendBrainNotification.apply(N, arguments)
            }), this._tradfriService = p.buildProxyFallback()
        }
        return d(T, [{
            key: '_getBrightnessCallbacks',
            value: function() {
                var A = this;
                return {
                    setter: function(D, R) {
                        var P = parseInt(D, 10);
                        return A._tradfriService.setBrightness(P, R)
                    },
                    getter: function(D) {
                        var R = parseInt(D, 10);
                        return A._tradfriService.getBrightness(R)
                    }
                }
            }
        }, {
            key: '_getPowerStateCallbacks',
            value: function() {
                var A = this;
                return {
                    setter: function(D, R) {
                        var P = parseInt(D, 10);
                        return A._tradfriService.setPowerState(P, R)
                    },
                    getter: function(D) {
                        var R = parseInt(D, 10);
                        return A._tradfriService.getPowerState(R)
                    }
                }
            }
        }, {
            key: 'onButtonPressed',
            value: function(A, C) {
                return this._getMacroPromise(A, C).catch(function(D) {
                    u('macro failed', D.message)
                })
            }
        }, {
            key: 'discover',
            value: function() {
                var A = this;
                return u('discovery call'), c.delay(3e3).then(function() {
                    var C = A._deviceState.getAllDevices();
                    return C.filter(function(D) {
                        return D.id && D.clientObject
                    }).map(function(D) {
                        var R = D.clientObject._modelName,
                            P = D.clientObject.name;
                        return {
                            id: D.id,
                            name: R || P,
                            reachable: D.reachable
                        }
                    })
                })
            }
        }, {
            key: 'initialize',
            value: function() {
                var A = this;
                if (this.initializePromise) return u('initialization already done'), this.initializePromise;
                u('initialization start');
                var C = this._loadData();
                if (!C || !C.mdnsName) return void u('not configured, skip initialization');
                var D = {
                        identity: C.identity,
                        psk: C.psk
                    },
                    R = p.buildFromStoredGateway(this._deviceState, C.mdnsName, D);
                return this._tradfriService.isProxy() && this._tradfriService.setServicePromise(R), u('call service init'), this.initializePromise = R.then(function(P) {
                    u('initialization complete'), A._tradfriService = P
                }), this.initializePromise
            }
        }, {
            key: 'isRegistered',
            value: function() {
                var A = this._loadData(),
                    C = !!(A.mdnsName && A.identity && A.psk);
                return u('isRegisteredQuery', {
                    hasStoredData: C
                }), c.resolve(C)
            }
        }, {
            key: 'register',
            value: function(A) {
                var C = this;
                if (u('register', A), !A || !A.securityCode) {
                    var D = new Error('TRADFRI_REGISTER_INVALID_PAYLOAD_DATA');
                    return D.status = 400, c.reject(D)
                }
                var R = p.buildFromNewGateway(this._deviceState, A.securityCode);
                return this._tradfriService.isProxy() && this._tradfriService.setServicePromise(R), R.then(function(P) {
                    C._tradfriService = P;
                    var w = C._tradfriService.serialise();
                    u('save: %o', w), C._saveData(w)
                })
            }
        }, {
            key: '_unregister',
            value: function() {
                this._saveData({})
            }
        }, {
            key: '_clearCredentialsIfNeeded',
            value: function() {
                0 === this._subscriptions.count() && (u('Subscription count is 0, clearing registered Gateway'), this._unregister())
            }
        }, {
            key: 'initializeDeviceList',
            value: function(A) {
                u('init existing devices list', A), this._subscriptions.resetWith(A), this._clearCredentialsIfNeeded(), Array.isArray(A) && 0 < A.length && this.initialize()
            }
        }, {
            key: 'deviceAdded',
            value: function(A) {
                this._subscriptions.add(A)
            }
        }, {
            key: 'deviceRemoved',
            value: function(A) {
                this._subscriptions.remove(A), this._clearCredentialsIfNeeded()
            }
        }, {
            key: 'sendBrainNotification',
            value: function(A, C, D) {
                var R = !this._subscriptions.isSubscribed(A);
                if (R) return c.resolve();
                return this._notifyBrain({
                    uniqueDeviceId: A,
                    component: C,
                    value: D
                }).catch(function(w) {
                    u('NOTIFICATION_FAILED', w.message)
                })
            }
        }, {
            key: 'sendBrainPowerStateNotification',
            value: function(A, C) {
                var D = !this._subscriptions.isSubscribed(A);
                return D ? c.resolve() : C ? this._markDeviceOn(A) : this._markDeviceOff(A)
            }
        }, {
            key: 'setNotificationCallbacks',
            value: function(A, C) {
                this._notifyBrain = A, C && C.powerOnNotificationFunction && (this._markDeviceOn = C.powerOnNotificationFunction), C && C.powerOffNotificationFunction && (this._markDeviceOff = C.powerOffNotificationFunction)
            }
        }, {
            key: '_getMacroPromise',
            value: function(A, C) {
                var D = parseInt(C, 10);
                return A === E.MACRO_POWER_ON ? (u('Powering on ' + D), this._tradfriService.setPowerState(D, !0)) : A === E.MACRO_POWER_OFF ? (u('Powering off ' + D), this._tradfriService.setPowerState(D, !1)) : A === E.MACRO_POWER_TOGGLE ? (u('Power toggle ' + D), this._tradfriService.powerToggle(D)) : (u('Unsupported button: ' + A + ' for ' + D), c.resolve(!1))
            }
        }, {
            key: '_handleStateUpdate',
            value: function(A, C) {
                var D = C.neeotype !== 'light';
                D || (this.sendBrainNotification(A, E.COMPONENT_BRIGHTNESS, C.dimmer), this.sendBrainNotification(A, E.COMPONENT_POWER, C.onOff), this.sendBrainPowerStateNotification(A, C.onOff), this._tradfriGroupHandling.updateTradfriGroups(A, this._deviceState))
            }
        }, {
            key: '_loadData',
            value: function() {
                return this._dataStore.loadSync(I) || {}
            }
        }, {
            key: '_saveData',
            value: function(A) {
                var C = {
                    identity: A.identity,
                    psk: A.psk,
                    hostname: A.hostname,
                    mdnsName: A.mdnsName
                };
                this._dataStore.saveSync(I, C)
            }
        }], [{
            key: 'build',
            value: function() {
                return new T
            }
        }]), T
    }()
}, function(t, r, o) {o(0)("Function  83").verbose(" neeo:ikea-tradfri:deps'");
    'use strict';
    var m = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function(T) {
            return typeof T
        } : function(T) {
            return T && 'function' == typeof Symbol && T.constructor === Symbol && T !== Symbol.prototype ? 'symbol' : typeof T
        },
        E = o(2)('neeo:ikea-tradfri:deps'),
        g = o(205),
        y = g.TradfriClient,
        S = g.discoverGateway,
        f = g.AccessoryTypes;
    t.exports = {
        buildNewTradfriInstance: function(T, N) {
            var A = new y(T, O),
                C = void 0;
            return A.authenticate(N).then(function(D) {
                return C = D, A.connect(C.identity, C.psk)
            }).then(function() {
                return E('LGTM, connected!'), {
                    tradfriClient: A,
                    securityObject: C
                }
            })
        },
        restoreTradfriInstance: function(T, N) {
            var A = new y(T, O);
            return A.connect(N.identity, N.psk).then(function() {
                return E('LGTM, reconnected!'), A
            })
        },
        isLightbulb: function(T) {
            var N = 'object' === ('undefined' == typeof T ? 'undefined' : m(T));
            if (!N) return !1;
            var A = Array.isArray(T.lightList) && 0 < T.lightList.length,
                C = T.type === f.lightbulb;
            return A && C
        },
        isInvalidPairedLightDevice: function(T) {
            var N = 'object' === ('undefined' == typeof T ? 'undefined' : m(T));
            if (!N) return !1;
            var A = T.type !== f.lightbulb,
                C = T.name.includes('bulb');
            return A && C
        },
        discoverTradfriGateway: function() {
            return S()
        }
    };
    var O = {
        watchConnection: {
            pingInterval: 2e3,
            failedPingCountUntilOffline: 3
        }
    }
}, function(t, r, o) {o(0)("Function  84").verbose(" neeo:ikea-tradfri:service buildFromNewGateway, buildFromStoredGateway, buildProxyFallback");
    'use strict';

    function n(D, R) {
        if (!(D instanceof R)) throw new TypeError('Cannot call a class as a function')
    }

    function c() {
        return S.discoverTradfriGateway()
    }
    var m = function() {
            function D(R, P) {
                for (var w = 0, L; w < P.length; w++) L = P[w], L.enumerable = L.enumerable || !1, L.configurable = !0, 'value' in L && (L.writable = !0), Object.defineProperty(R, L.key, L)
            }
            return function(R, P, w) {
                return P && D(R.prototype, P), w && D(R, w), R
            }
        }(),
        E = o(2)('neeo:ikea-tradfri:service'),
        g = o(201),
        y = o(1),
        S = o(83),
        f = o(0)('Tradfri:Service'),
        N = 'TRADFRI_NOT_REACHABLE',
        C = function() {
            function D(R) {
                n(this, D), this.deviceState = R.deviceState, this.tradfriClient = R.tradfriClient, this.hostname = R.hostname, this.mdnsName = R.mdnsName, this.securityObject = R.securityObject, this._startObserve(), E('Tradfri discovery started')
            }
            return m(D, [{
                key: 'isProxy',
                value: function() {
                    return !1
                }
            }, {
                key: 'serialise',
                value: function() {
                    return {
                        identity: this.securityObject.identity,
                        psk: this.securityObject.psk,
                        hostname: this.hostname,
                        mdnsName: this.mdnsName
                    }
                }
            }, {
                key: '_startObserve',
                value: function() {
                    E('_startObserve'), this.tradfriClient.on('group updated', this.tradfriGroupUpdated.bind(this)).on('group removed', this.tradfriGroupRemoved.bind(this)).on('device updated', this.tradfriDeviceUpdated.bind(this)).on('device removed', this.tradfriDeviceRemoved.bind(this)).on('gateway offline', this.tradfriGatewayOffline.bind(this)).on('connection lost', this.tradfriConnectionLost.bind(this)).on('connection alive', this.tradfriConnectionAlive.bind(this)).on('error', this.tradfriError.bind(this)), this.tradfriClient.observeDevices().catch(function(P) {
                        E('observeDevices failed', P.message)
                    }), this.tradfriClient.observeGroupsAndScenes().catch(function(P) {
                        E('observeGroupsAndScenes failed', P.message)
                    })
                }
            }, {
                key: 'tradfriError',
                value: function() {
                    var P = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                    E('tradfriError %O', P.message), E(P)
                }
            }, {
                key: 'tradfriGatewayOffline',
                value: function() {
                    var P = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                    E('tradfriGatewayOffline %O', P.message)
                }
            }, {
                key: 'tradfriConnectionLost',
                value: function() {
                    var P = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                    E('tradfriConnectionLost %O', P.message)
                }
            }, {
                key: 'tradfriConnectionAlive',
                value: function() {
                    var P = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                    E('tradfriConnectionAlive %O', P.message)
                }
            }, {
                key: 'tradfriGroupUpdated',
                value: function(P) {
                    E('group update', P.name, P.instanceId), P.neeotype = 'group', this.deviceState.addDevice(P.instanceId, P, !0)
                }
            }, {
                key: 'tradfriGroupRemoved',
                value: function(P) {
                    E('group removed', P), this.deviceState.updateReachable(P, !1)
                }
            }, {
                key: 'tradfriSceneUpdated',
                value: function(P, w) {
                    E('scene updated', P, w.name)
                }
            }, {
                key: 'tradfriSceneRemoved',
                value: function(P, w) {
                    E('scene removed', P, w.name)
                }
            }, {
                key: '_alreadyLogged',
                value: function(P, w) {
                    (!this.logfence || 20 < this.logfence.length) && (this.logfence = []);
                    var L = 'X' + P + w,
                        U = this.logfence.includes(L);
                    return U || this.logfence.push(L), U
                }
            }, {
                key: 'tradfriDeviceUpdated',
                value: function(P) {
                    if (S.isLightbulb(P)) {
                        E('device update', P.name, P.instanceId);
                        var w = P.lightList[0];
                        w.neeotype = 'light', this.deviceState.addDevice(P.instanceId, w, !0)
                    } else S.isInvalidPairedLightDevice(P) ? this._alreadyLogged(P.name, P.instanceId) || f.warn('INVALID_PAIRED_LAMP_DETECTED', {
                        type: P.type,
                        name: P.name,
                        id: P.instanceId
                    }) : this._alreadyLogged(P.name, P.instanceId) || f.info('UNSUPPORTED_DEVICE_IGNORED', {
                        type: P.type,
                        name: P.name,
                        id: P.instanceId
                    })
                }
            }, {
                key: 'tradfriDeviceRemoved',
                value: function(P) {
                    E('device removed', P), this.deviceState.updateReachable(P, !1)
                }
            }, {
                key: 'stop',
                value: function() {
                    this.tradfriClient.destroy()
                }
            }, {
                key: 'getState',
                value: function(P) {
                    var w = this;
                    return new y(function(L, U) {
                        var k = w.deviceState.getClientObjectIfReachable(P);
                        return k ? void L(k) : U(new Error(N))
                    })
                }
            }, {
                key: 'getBrightness',
                value: function(P) {
                    return this.getState(P).then(function(w) {
                        return w.dimmer
                    })
                }
            }, {
                key: 'setBrightness',
                value: function(P, w) {
                    var L = parseInt(w, 10);
                    E('setBrightness', {
                        deviceId: P,
                        brightness: L
                    });
                    var U = this.deviceState.getClientObjectIfReachable(P);
                    return U ? U.setBrightness(L, 0.2) : y.reject(new Error(N))
                }
            }, {
                key: 'getPowerState',
                value: function(P) {
                    return this.getState(P).then(function(w) {
                        return !0 === w.onOff
                    })
                }
            }, {
                key: 'setPowerState',
                value: function(P, w) {
                    var L = this;
                    return new y(function(U, k) {
                        E('setPowerState', w);
                        var F = L.deviceState.getClientObjectIfReachable(P);
                        return F ? void(!0 === w ? F.turnOn() : F.turnOff(), U()) : (E('not reachable', P), k(new Error(N)))
                    })
                }
            }, {
                key: 'powerToggle',
                value: function(P) {
                    var w = this;
                    return new y(function(L, U) {
                        E('powerToggle', P);
                        var k = w.deviceState.getClientObjectIfReachable(P);
                        return k ? void k.toggle().then(function() {
                            return L()
                        }) : U(new Error(N))
                    })
                }
            }]), D
        }();
    t.exports = {
        buildFromNewGateway: function(D, R) {
            var P = void 0,
                w = void 0;
            return c().then(function(L) {
                if (!L || !L.name) {
                    var U = new Error('No Tr\xE5dfri gateway found on the network.');
                    return U.status = 404, y.reject(U)
                }
                return P = L.addresses.find(function(k) {
                    return g.isIPv4(k)
                }), P || (P = L.name), w = L.host, E('found gateway', w), S.buildNewTradfriInstance(w, R)
            }).then(function(L) {
                return E('build service'), new C({
                    deviceState: D,
                    tradfriClient: L.tradfriClient,
                    hostname: P,
                    mdnsName: w,
                    securityObject: L.securityObject
                })
            }).catch(function(L) {
                return E('buildTradfriInstance failed:', L.message), y.reject(L)
            })
        },
        buildFromStoredGateway: function(D, R, P) {
            return E('buildFromStoredGateway', {
                hostname: R,
                securityObject: P
            }), S.restoreTradfriInstance(R, P).then(function(w) {
                return E('build service'), new C({
                    deviceState: D,
                    tradfriClient: w,
                    hostname: R,
                    securityObject: P
                })
            }).catch(function(w) {
                throw E('buildTradfriInstance failed', w.message), w
            })
        },
        buildProxyFallback: function() {
            function D(U) {
                return function() {
                    for (var k = arguments.length, F = Array(k), M = 0; M < k; M++) F[M] = arguments[M];
                    return E('starting proxy handler for', U), L.delay(R).then(function(x) {
                        return E('fullfilling proxy handling for', U), x[U].apply(x, F)
                    })
                }
            }
            var R = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 1e3,
                P = void 0,
                w = void 0,
                L = new y(function(U, k) {
                    P = U, w = k
                });
            return L.catch(function(U) {
                E('buildProxyFallback failed', U.message)
            }), {
                setBrightness: D('setBrightness'),
                getBrightness: D('getBrightness'),
                setPowerState: D('setPowerState'),
                getPowerState: D('getPowerState'),
                powerToggle: D('powerToggle'),
                serialise: function() {
                    throw new Error('TRADFRI_GATEWAY_NOT_INITIALIZED')
                },
                isProxy: function() {
                    return !0
                },
                setServicePromise: function(k) {
                    k.then(P).catch(w)
                }
            }
        }
    }
}, function(t, r, o) {o(0)("Function  85").verbose(" LIFX:SDK buildCustomDevice('Smart Light').setManufacturer('LIFX')");
    'use strict';
    var d = o(3),
        c = o(0)('LIFX:SDK'),
        u = {
            name: 'brightness',
            label: 'Dimmer',
            range: [0, 100],
            unit: '%'
        },
        p = {
            name: 'power',
            label: 'Power'
        },
        m = {
            name: 'ambientlight',
            label: 'Ambient Light Sensor',
            range: [0, 10],
            unit: 'Brightness'
        },
        E = {
            headerText: 'Discover devices',
            description: 'NEEO will discover your LIFX lights, power them on and press NEXT (Requirement: LIFX Firmware version 2.0 or newer).'
        },
        g = {
            name: 'POWER_TOGGLE',
            label: 'Power Toggle'
        },
        y = {
            name: 'ALERT',
            label: 'Alert'
        };
    t.exports = {
        buildDevices: function() {
            var S = o(86);
            try {
                var f = d.buildCustomDevice('Smart Light').setManufacturer('LIFX').addAdditionalSearchToken('lamp').setType('LIGHT').addButtonGroup('Power').addButton(g).addButton(y).addButtonHandler(S.onButtonPressed).addSlider(u, S.brightnessSliderCallback).addSwitch(p, S.powerSwitchCallback).addSensor(m, S.ambientLightSensorCallback).addPowerStateSensor(S.powerSwitchCallback).enableDiscovery(E, S.discoverDevices).registerSubscriptionFunction(S.registerStateUpdateCallback).registerInitialiseFunction(S.initialise);
                return [f]
            } catch (I) {
                c.error('INITIALIZATION_FAILED', I.message)
            }
        }
    }
}, function(t, r, o) {o(0)("Function  86").verbose(" neeo:lifx-local:controller (light)");
    'use strict';

    function m(F, M, x) {
        U({
            uniqueDeviceId: F,
            component: M,
            value: x
        }).catch(function(B) {
            g('NOTIFICATION_FAILED', B.message)
        })
    }

    function E() {
        g('starting polling all lifx devices'), w.getAllDevices().forEach(function(F) {
            return F.reachable ? void L.getStateForPolling(F.id).then(function(M) {
                M.power ? R(F.id) : P(F.id), m(F.id, A, M.brightness), m(F.id, C, M.power), m(F.id, D, M.ambientlight)
            }).catch(function(M) {
                g('polling failed', M.message)
            }) : void g('lifx device %d unreachable, not pulling', F.id)
        })
    }
    var g = o(2)('neeo:lifx-local:controller'),
        y = o(88),
        S = o(3),
        A = 'brightness',
        C = 'power',
        D = 'ambientlight',
        R = function() {
            g('MARKDEVICEON FUNCTION NOT INITIALIZED')
        },
        P = function() {
            g('MARKDEVICEOFF FUNCTION NOT INITIALIZED')
        },
        w = S.buildDeviceState(),
        L = void 0,
        U = void 0,
        k = void 0;
    t.exports.brightnessSliderCallback = {
        setter: function(F, M) {
            return L.setBrightness(F, M)
        },
        getter: function(F) {
            return L.getBrightness(F)
        }
    }, t.exports.powerSwitchCallback = {
        setter: function(F, M) {
            return L.setPowerState(F, M)
        },
        getter: function(F) {
            return L.getPowerState(F)
        }
    }, t.exports.ambientLightSensorCallback = {
        getter: function(F) {
            return L.getAmbientLight(F)
        }
    }, t.exports.onButtonPressed = function(F, M) {
        return F === 'POWER ON' ? (g('Powering on ' + M), L.setPowerState(M, !0)) : F === 'POWER OFF' ? (g('Powering off ' + M), L.setPowerState(M, !1)) : F === 'ALERT' ? (g('Alert ' + M), L.showAlert(M)) : F === 'POWER_TOGGLE' ? (g('Power toggle ' + M), L.powerToggle(M)) : (g('Unsupported button: ' + F + ' for ' + M), Promise.resolve(!1))
    }, t.exports.discoverDevices = function() {
        g('discovery call');
        var F = w.getAllDevices();
        return F.filter(function(M) {
            return M.id && M.clientObject && M.clientObject.label
        }).map(function(M) {
            return {
                id: M.id,
                name: M.clientObject.label,
                reachable: M.reachable
            }
        })
    }, t.exports.registerStateUpdateCallback = function(F, M) {  // Homekit....
        g('registerStateUpdateCallback'), U = F, M && M.powerOnNotificationFunction && (R = M.powerOnNotificationFunction), M && M.powerOffNotificationFunction && (P = M.powerOffNotificationFunction)
    }, t.exports.initialise = function() {
        return k ? (g('already initialised, ignore call'), !1) : void(g('initialise LIFX service, start polling'), L = new y(w), k = setInterval(E, 4e3))
    }
}, function(t, r, o) {o(0)("Function  87").verbose(" buildLifxClientInstance");
    'use strict';
    var d = o(204).Client;
    t.exports = {
        buildLifxClientInstance: function() {
            return new d
        }
    }
}, function(t, r, o) {o(0)("Function  88").verbose(" neeo:lifx-local:service");
    'use strict';

    function n(N, A) {
        if (!(N instanceof A)) throw new TypeError('Cannot call a class as a function')
    }
    var d = function() {
            function N(A, C) {
                for (var D = 0, R; D < C.length; D++) R = C[D], R.enumerable = R.enumerable || !1, R.configurable = !0, 'value' in R && (R.writable = !0), Object.defineProperty(A, R.key, R)
            }
            return function(A, C, D) {
                return C && N(A.prototype, C), D && N(A, D), A
            }
        }(),
        c = o(2)('neeo:lifx-local:service'),
        u = o(1),
        p = o(87),
        m = 200,
        E = 800,
        y = 1,
        S = 400,
        f = 10,
        I = 'LIFX_NOT_REACHABLE',
        O = {
            debug: !1
        },
        T = function() {
            function N(A) { // Homekit
                n(this, N), this.deviceState = A, this.lifxClient = p.buildLifxClientInstance(), this.lifxClient.init(O), c('LIFX discovery started...'), this.lifxClient.on('light-new', function(C) {
                    c('discovered new light', C.id), A.addDevice(C.id, C)
                }), this.lifxClient.on('light-online', function(C) {
                    c('light-online', C.id), A.updateReachable(C.id, !0)
                }), this.lifxClient.on('light-offline', function(C) {
                    c('light-offline', C.id), A.updateReachable(C.id, !1)
                })
            }
            return d(N, [{
                key: 'stop',
                value: function() {
                    this.lifxClient.destroy()
                }
            }, {
                key: 'invalidateCache',
                value: function(C) {
                    this.deviceState.getCachePromise(C).invalidate()
                }
            }, {
                key: 'getState',
                value: function(C) {
                    var R = this.deviceState.getClientObjectIfReachable(C);
                    return R ? this.deviceState.getCachePromise(C).getValue(function() {
                        return new u(function(P, w) {
                            c('fetch new LIFX state', C), R.getState(function(L, U) {
                                L && w(L), U && U.color || w(new Error('INVALID_ANSWER')), P(U)
                            })
                        })
                    }) : u.reject(new Error(I))
                }
            }, {
                key: 'getBrightness',
                value: function(C) {
                    return this.getState(C).then(function(D) {
                        return D.color.brightness
                    })
                }
            }, {
                key: 'setBrightness',
                value: function(C, D) {
                    var R = this,
                        P = parseInt(D, 10),
                        w = this.deviceState.getClientObjectIfReachable(C);
                    return w ? this.getState(C).then(function(L) {
                        L.power !== y && w.on(0), w.color(L.color.hue, L.color.saturation, P, L.color.kelvin, m), R.invalidateCache(C)
                    }) : u.reject(new Error(I))
                }
            }, {
                key: 'getPowerState',
                value: function(C) {
                    return this.getState(C).then(function(D) {
                        return D.power === y
                    })
                }
            }, {
                key: 'setPowerState',
                value: function(C, D) {
                    var R = this;
                    return new u(function(P, w) {
                        c('setPowerState', D);
                        var L = R.deviceState.getClientObjectIfReachable(C);
                        return L ? void(D ? L.on(m) : L.off(m), R.invalidateCache(C), P()) : w(new Error(I))
                    })
                }
            }, {
                key: 'powerToggle',
                value: function(C) {
                    var D = this;
                    return this.getPowerState(C).then(function(R) {
                        D.setPowerState(C, !R)
                    })
                }
            }, {
                key: 'getAmbientLight',
                value: function(C) {
                    var D = this;
                    return new u(function(R, P) {
                        c('getAmbientLight');
                        var w = D.deviceState.getClientObjectIfReachable(C);
                        return w ? void w.getAmbientLight(function(L, U) {
                            L && P(L);
                            if (0 === U || 0 < U || P(new Error('NO_STATE_RECIEVED')), U > S) c('normalizedAmbientValue exceeded max value', U), R(10);
                            else {
                                var M = parseInt(1 / S * U * f + 0.5, f);
                                c(U, 'normalizedAmbientValue', M), R(M)
                            }
                        }) : P(new Error(I))
                    })
                }
            }, {
                key: 'getStateForPolling',
                value: function(C) {
                    var D = this,
                        R = void 0;
                    return this.getState(C).then(function(P) {
                        return R = P, D.getAmbientLight(C)
                    }).then(function(P) {
                        return {
                            brightness: R.color.brightness,
                            power: R.power === y,
                            ambientlight: P
                        }
                    })
                }
            }, {
                key: 'showAlert',
                value: function(C) {
                    var D = this;
                    if (this.alertTimeoutId) return u.reject(new Error('ALERT_ALREADY_RUNNING'));
                    var R = this.deviceState.getClientObjectIfReachable(C);
                    if (!R) return u.reject(new Error(I));
                    var P = void 0;
                    return this.getState(C).then(function(w) {
                        P = w.color, R.color(0, 100, 100, P.kelvin, E), D.alertTimeoutId = setTimeout(function() {
                            R.color(P.hue, P.saturation, P.brightness, P.kelvin, E), D.alertTimeoutId = void 0
                        }, 1e3), D.invalidateCache(C)
                    }).catch(function(w) {
                        return clearTimeout(D.alertTimeoutId), D.alertTimeoutId = void 0, u.reject(w)
                    })
                }
            }]), N
        }();
    t.exports = T
}, function(t, r, o) {o(0)("Function  89").verbose(" neeo:myStrom:lampController'");
    'use strict';

    function n(T, N) {
        if (!(T instanceof N)) throw new TypeError('Cannot call a class as a function')
    }

    function d(T, N) {
        if (!T) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return N && ('object' == typeof N || 'function' == typeof N) ? N : T
    }

    function c(T, N) {
        if ('function' != typeof N && null !== N) throw new TypeError('Super expression must either be null or a function, not ' + typeof N);
        T.prototype = Object.create(N && N.prototype, {
            constructor: {
                value: T,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), N && (Object.setPrototypeOf ? Object.setPrototypeOf(T, N) : T.__proto__ = N)
    }

    function u(T) {
        return y.isBulb(T.model.name)
    }
    var p = function() {
            function T(N, A) {
                for (var C = 0, D; C < A.length; C++) D = A[C], D.enumerable = D.enumerable || !1, D.configurable = !0, 'value' in D && (D.writable = !0), Object.defineProperty(N, D.key, D)
            }
            return function(N, A, C) {
                return A && T(N.prototype, A), C && T(N, C), N
            }
        }(),
        m = o(1),
        E = o(0)('neeo:myStrom:lampController'),
        g = o(39),
        y = o(25),
        S = 'POWER_SENSOR',
        O = {
            on: S,
            power: 'POWERUSE_SENSOR',
            color: 'BRIGHTNESS_SENSOR'
        };
    t.exports = function(T) {
        function N() {
            n(this, N);
            var A = d(this, (N.__proto__ || Object.getPrototypeOf(N)).call(this));
            return A.brightnessSliderCallback = A.sliderCallbacks(), y.on(y.EVENT_UPDATE_BULB, function() {
                return A._handleStateUpdate.apply(A, arguments)
            }), A
        }
        return c(N, T), p(N, [{
            key: 'discover',
            value: function() {
                return E.debug('START_WIFI_LAMP_DISCOVERY'), y.discoverDevices().then(function(C) {
                    return C.filter(u).map(g.formatDiscoverResult)
                })
            }
        }, {
            key: 'onButtonPressed',
            value: function(C, D) {
                return 'POWER ON' === C ? y.bulbPowerOn(D) : 'POWER OFF' === C ? y.bulbPowerOff(D) : 'POWER TOGGLE' === C ? y.bulbPowerToggle(D) : (E.debug('unknown myStrom action', C), m.resolve())
            }
        }, {
            key: 'setPowerState',
            value: function(C, D) {
                return D ? y.bulbPowerOn(C) : y.bulbPowerOff(C)
            }
        }, {
            key: 'getPowerState',
            value: function(C) {
                return y.getBulbPowerState(C)
            }
        }, {
            key: 'getPowerUseSensor',
            value: function(C) {
                return y.getPowerUsage(C)
            }
        }, {
            key: '_handleStateUpdate',
            value: function(C, D, R, P) {
                var L = O[D];
                P !== R && L && (E.debug('_handleStateUpdate', {
                    deviceId: C,
                    key: D,
                    sensor: L,
                    after: P
                }), this._sendBrainNotification(C, L, P), L === S && this._sendBrainPowerStateNotification(C, P))
            }
        }, {
            key: 'sliderCallbacks',
            value: function() {
                return {
                    setter: function(D, R) {
                        return y.bulbBrightness(D, R)
                    },
                    getter: function(D) {
                        return y.getBulbBrightness(D)
                    }
                }
            }
        }], [{
            key: 'build',
            value: function() {
                return new N
            }
        }]), N
    }(g)
}, function(t, r, o) {o(0)("Function  90").verbose(" neeo:myStrom:switchController");
    'use strict';

    function n(N, A) {
        if (!(N instanceof A)) throw new TypeError('Cannot call a class as a function')
    }

    function d(N, A) {
        if (!N) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return A && ('object' == typeof A || 'function' == typeof A) ? A : N
    }

    function c(N, A) {
        if ('function' != typeof A && null !== A) throw new TypeError('Super expression must either be null or a function, not ' + typeof A);
        N.prototype = Object.create(A && A.prototype, {
            constructor: {
                value: N,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(N, A) : N.__proto__ = A)
    }

    function u(N) {
        return y.isWifiSwitch(N.model.name)
    }
    var p = function() {
            function N(A, C) {
                for (var D = 0, R; D < C.length; D++) R = C[D], R.enumerable = R.enumerable || !1, R.configurable = !0, 'value' in R && (R.writable = !0), Object.defineProperty(A, R.key, R)
            }
            return function(A, C, D) {
                return C && N(A.prototype, C), D && N(A, D), A
            }
        }(),
        m = o(1),
        E = o(0)('neeo:myStrom:switchController'),
        g = o(39),
        y = o(25),
        I = 'POWER_SENSOR',
        T = {
            relay: I,
            power: 'POWERUSE_SENSOR'
        };
    t.exports = function(N) {
        function A() {
            n(this, A);
            var C = d(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this));
            return y.on(y.EVENT_UPDATE_SWITCH, function() {
                return C._handleStateUpdate.apply(C, arguments)
            }), C
        }
        return c(A, N), p(A, [{
            key: 'discover',
            value: function() {
                return E.debug('START_WIFI_SWITCH_DISCOVERY'), y.discoverDevices().then(function(D) {
                    return D.filter(u).map(g.formatDiscoverResult)
                })
            }
        }, {
            key: 'onButtonPressed',
            value: function(D, R) {
                return 'POWER ON' === D ? y.setRelayState(R, !0) : 'POWER OFF' === D ? y.setRelayState(R, !1) : 'POWER TOGGLE' === D ? y.toggleRelayState(R) : (E.debug('unknown myStrom action', D), m.resolve())
            }
        }, {
            key: 'setPowerState',
            value: function(D, R) {
                return y.setRelayState(D, R)
            }
        }, {
            key: 'getPowerState',
            value: function(D) {
                return y.getRelayState(D)
            }
        }, {
            key: 'getPowerUseSensor',
            value: function(D) {
                return y.getPowerUsage(D)
            }
        }, {
            key: '_handleStateUpdate',
            value: function(D, R, P, w) {
                var U = T[R];
                w !== P && U && (E.debug('_handleStateUpdate', {
                    deviceId: D,
                    key: R,
                    sensor: U,
                    after: w
                }), this._sendBrainNotification(D, U, w), U === I && this._sendBrainPowerStateNotification(D, w))
            }
        }], [{
            key: 'build',
            value: function() {
                return new A
            }
        }]), A
    }(g)
}, function(t, r, o) {o(0)("Function 91").verbose(" neeo:myStrom buildCustomDevice('WiFi Switch', mystrom switch");
    'use strict';
    var d = o(3),
        c = o(90),
        u = o(89),
        p = o(0)('neeo:myStrom'),
        m = {
            name: 'POWER TOGGLE',
            label: 'Power Toggle'
        },
        E = {
            name: 'power',
            label: 'Power'
        },
        g = {
            name: 'poweruse',
            label: 'Power Use',
            isLabelVisible: !0
        },
        y = 'myStrom',
        S = {
            headerText: 'Network discovery',
            description: 'NEEO will look for Switches on the same network as the Brain\nRequirement: myStrom Firmware version 3.78 or newer.'
        },
        f = c.build(),
        I = {
            headerText: 'Network discovery',
            description: 'NEEO will look for MyStrom Bulp\'s and LED Strip on the same network as the Brain\nRequirement: myStrom Firmware version 2.55 or newer.'
        },
        O = u.build();
    t.exports = {
        buildDevices: function() {
            try {
                var T = d.buildCustomDevice('WiFi Switch').setSpecificName('myStrom Switch').setManufacturer(y).setType('LIGHT').addAdditionalSearchToken('V2').addAdditionalSearchToken('EU').enableDiscovery(S, function() {
                        return f.discover()
                    }).addCapability('addAnotherDevice').addButton(m).addButtonHandler(function(C, D) {
                        return f.onButtonPressed(C, D)
                    }).addButtonGroup('Power').addTextLabel(g, function(C) {
                        return f.getPowerUseSensor(C)
                    }).addSwitch(E, f.powerSwitchHandler).addPowerStateSensor(f.powerSwitchHandler).registerInitialiseFunction(function() {
                        return f.initialize()
                    }).registerDeviceSubscriptionHandler(f.getDeviceSubscriptionHandler()).registerSubscriptionFunction(function() {
                        return f.setNotificationCallbacks.apply(f, arguments)
                    }),
                    A = d.buildCustomDevice('WiFi Bulb / LED Strip').setSpecificName('myStrom Lamp').setManufacturer(y).setType('LIGHT').addAdditionalSearchToken('LED').addAdditionalSearchToken('Strip').enableDiscovery(I, function() {
                        return O.discover()
                    }).addCapability('addAnotherDevice').addButton(m).addButtonHandler(function(C, D) {
                        return O.onButtonPressed(C, D)
                    }).addTextLabel(g, function(C) {
                        return O.getPowerUseSensor(C)
                    }).addSwitch(E, O.powerSwitchHandler).addSlider({
                        name: 'brightness',
                        label: 'Dimmer',
                        range: [0, 100],
                        unit: '%'
                    }, O.brightnessSliderCallback).addPowerStateSensor(O.powerSwitchHandler).registerInitialiseFunction(function() {
                        return O.initialize()
                    }).registerDeviceSubscriptionHandler(O.getDeviceSubscriptionHandler()).registerSubscriptionFunction(function() {
                        return O.setNotificationCallbacks.apply(O, arguments)
                    });
                return [T, A]
            } catch (C) {
                p.error('INITIALIZATION_FAILED', C.message)
            }
        }
    }
}, function(t, r, o) {o(0)("Function  92").verbose(" unclear");
    'use strict';

    function n(g, y, S) {
        return y in g ? Object.defineProperty(g, y, {
            value: S,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : g[y] = S, g
    }

    function d(g, y) {
        if (!(g instanceof y)) throw new TypeError('Cannot call a class as a function')
    }

    function c(g, y) {
        if (!g) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return y && ('object' == typeof y || 'function' == typeof y) ? y : g
    }

    function u(g, y) {
        if ('function' != typeof y && null !== y) throw new TypeError('Super expression must either be null or a function, not ' + typeof y);
        g.prototype = Object.create(y && y.prototype, {
            constructor: {
                value: g,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), y && (Object.setPrototypeOf ? Object.setPrototypeOf(g, y) : g.__proto__ = y)
    }
    var p = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function(g) {
            return typeof g
        } : function(g) {
            return g && 'function' == typeof Symbol && g.constructor === Symbol && g !== Symbol.prototype ? 'symbol' : typeof g
        },
        m = function() {
            function g(y, S) {
                for (var f = 0, I; f < S.length; f++) I = S[f], I.enumerable = I.enumerable || !1, I.configurable = !0, 'value' in I && (I.writable = !0), Object.defineProperty(y, I.key, I)
            }
            return function(y, S, f) {
                return S && g(y.prototype, S), f && g(y, f), y
            }
        }(),
        E = o(10);
    t.exports = function(g) {
        function y() {
            d(this, y);
            var S = c(this, (y.__proto__ || Object.getPrototypeOf(y)).call(this));
            return S.devices = {}, S
        }
        return u(y, g), m(y, [{
            key: 'dispatch',
            value: function(f, I, O, T) {
                if (void 0 === ('undefined' == typeof I ? 'undefined' : p(I))) throw new Error('STATES_STORE__KEY_UNDEFINED');
                var N = this.devices[f] || {},
                    A = Object.assign({}, N, n({}, I, O));
                this.devices = Object.assign({}, this.devices, n({}, f, A)), this.emit(T, f, I, N[I], A[I])
            }
        }, {
            key: 'getStateFor',
            value: function(f, I) {
                var O = this.devices[f] || {};
                return O[I]
            }
        }], [{
            key: 'build',
            value: function() {
                return new y
            }
        }]), y
    }(E)
}, function(t, r, o) {o(0)("Function  93").verbose(" WSB and WRS, BULB-actions");
    'use strict';

    function c(A, C) {
        switch (A) {
            case 'rgb':
                var D = parseInt(C.substr(0, 2), 16);
                return parseInt(D / 2.55 + 0.5);
            case 'hsv':
                return parseInt(C.split(';')[2], 10);
            case 'mono':
                return parseInt(C.split(';')[1], 10);
        }
    }
    var u = o(40),
        m = 'ramp=100&',
        S = m + 'action=on&color=',
        I = 'on',
        O = 'power',
        T = 'color',
        N = [I, O, T];
    t.exports = {
        SUPPORTED_BULB_NAMES: ['WSB', 'WRS'],
        BULB_POWER_ON_PAYLOAD: m + 'action=on',
        BULB_POWER_OFF_PAYLOAD: m + 'action=off',
        BULB_POWER_TOGGLE_PAYLOAD: m + 'action=toggle',
        BULB_SETCOLOR_PAYLOAD: S,
        STATE_KEY_ON: I,
        STATE_KEY_POWERUSE: O,
        STATE_KEY_COLOR: T,
        mapDeviceState: function(A, C) {
            return Object.keys(C).map(function(D) {
                var R = N.includes(D);
                if (R) {
                    var P = C[D];
                    switch (D) {
                        case I:
                            return {
                                deviceId: A, key: D, value: !0 === P
                            };
                        case O:
                            var w = u.getRoundedPowerUsage(P);
                            return {
                                deviceId: A, key: D, value: w
                            };
                        case T:
                            if ('string' != typeof P) return;
                            var L = C['mode'],
                                U = c(L, P);
                            return {
                                deviceId: A, key: D, value: U
                            };
                        default:
                            return {
                                deviceId: A, key: D, value: P
                            };
                    }
                }
            }).filter(function(D) {
                return D
            })
        },
        convertBrightnessToPayload: function(A) {
            var C = parseInt(2.55 * A + 0.5, 10),
                D = C.toString(16).padStart(2, '0');
            return S + (D + '000000')
        }
    }
}, function(t, r, o) {o(0)("Function  94").verbose("  neeo:mystrom:discovery udpDiscovery");
    'use strict';

    function d(N) {
        return N.toString(16).padStart(2, '0')
    }

    function c(N, A) {
        if (N && A && N.length === I) {
            var C = d(N[0]),
                D = d(N[1]),
                R = d(N[2]),
                P = d(N[3]),
                w = d(N[4]),
                L = d(N[5]),
                U = C + ':' + D + ':' + R + ':' + P + ':' + w + ':' + L,
                k = m(N[6]);
            return y('packet device: %o', {
                macAddress: U,
                model: k
            }), {
                macAddress: U,
                model: k,
                ip: A
            }
        }
    }

    function u() {
        var N = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : f;
        return O ? T : (y('run discovery for %s ms', N), T = new g(function(A, C) {
            var D = new Map,
                R = E.createSocket({
                    type: 'udp4',
                    reuseAddr: !0
                });
            R.on('message', function(P, w) {
                y('msg', P, w.address);
                var L = c(P, w.address);
                L && w.address && D.set(w.address, L)
            }), R.on('error', function(P) {
                y('discovery error', P.message), p(R).finally(function() {
                    return C(P)
                })
            }), R.bind(S), O = setTimeout(function() {
                p(R).finally(function() {
                    return A(Array.from(D.values()))
                })
            }, N)
        }), T)
    }

    function p(N) {
        return new g(function(A) {
            N.close(function() {
                y('UDP server terminated'), clearTimeout(O), O = void 0, T = void 0, A()
            })
        })
    }

    function m(N) {
        return {
            101: {
                name: 'WSW',
                description: 'WiFi Switch V1'
            },
            102: {
                name: 'WSB',
                description: 'WiFi Bulb E27'
            },
            103: {
                name: 'WBP',
                description: 'WiFi Button Plus'
            },
            104: {
                name: 'WBS',
                description: 'WiFi Button'
            },
            105: {
                name: 'WRS',
                description: 'WiFi LED Strip Controller'
            },
            106: {
                name: 'WS2',
                description: 'WiFi Switch V2'
            },
            107: {
                name: 'WSE',
                description: 'WiFi Switch EU'
            }
        } [N] || {}
    }
    var E = o(182),
        g = o(1),
        y = o(2)('neeo:mystrom:discovery'),
        S = 7979,
        f = 1e4,
        I = 8,
        O = void 0,
        T = void 0;
    t.exports = {
        udpDiscovery: function() {
            return u()
        },
        parseUdpPacket: c
    }
}, function(t, r, o) {o(0)("Function  95").verbose(" Looks like some functions for advanced power-plugs (power measure)");
    'use strict';
    var d = o(40),
        u = 'relay',
        p = 'power',
        m = [u, p];
    t.exports = {
        SUPPORTED_SWITCH_NAMES: ['WS2', 'WSE'],
        STATE_KEY_RELAY: u,
        STATE_KEY_POWERUSE: p,
        mapDeviceState: function(E, g) {
            return Object.keys(g).map(function(y) {
                var S = m.includes(y);
                if (S) {
                    var f = g[y];
                    switch (y) {
                        case u:
                            return {
                                deviceId: E, key: y, value: !0 === f
                            };
                        case p:
                            var I = d.getRoundedPowerUsage(f);
                            return {
                                deviceId: E, key: y, value: I
                            };
                        default:
                            return {
                                deviceId: E, key: y, value: f
                            };
                    }
                }
            }).filter(function(y) {
                return y
            })
        }
    }
}, function(t) {
    'use strict';
    var c = 'default';
    t.exports = {
        POWER_ON: 'POWER ON',
        POWER_OFF: 'POWER OFF',
        DEFAULT_ID: c,
        RANDOM_IMAGE_URL: ['https://picsum.photos/256/256', 'http://loremflickr.com/256/256', 'https://dummyimage.com/256x256/000/fff.png&text=PLACEHOLDER', 'http://fpoimg.com/256x256?text=PLACEHOLDER'],
        VERY_LONG_LABEL: 'This is a very long text content to check if text displays correctly 0123456789%&\'."</element><div>alert(\'hi\')</div>Well in fact we can write even MORE TEXT HERE AS THERE IS PLENTY OF SPACE. THE TEXT ELLIPSIS IS NOT USED FOR TEXTLABELS AS WE DEFINE A SPECIFIC HEIGHT. But we should definitely limit the number of possible characters',
        DISCOVERY: [{
            id: c,
            name: 'Blackcat',
            room: '(No1)',
            reachable: !0
        }, {
            id: 'nonreachable',
            name: 'Blackcat Non-Reachable',
            reachable: !1
        }],
        UPDATE_INTERVAL_MS: 1e3
    }
}, function(t, r, o) {o(0)("Function 97").verbose("neeo:blackcat:controller");
    'use strict';

    function n(j, K) {
        var z = {
            uniqueDeviceId: P.DEFAULT_ID,
            component: j,
            value: K
        };
        W(z).catch(function(Z) {
            R('failed to send update %o', {
                key: j,
                error: Z.message,
                updateMessage: z
            })
        })
    }

    function d() {
        return B ? void R('already running') : void(H(P.DEFAULT_ID), B = setInterval(u, k))
    }

    function c() {
        Y(P.DEFAULT_ID), clearInterval(B), B = void 0, n('power', !1)
    }

    function u() {
        U = parseInt(200 * Math.random(), 10), F = parseInt(100 * Math.random(), 10), x = parseInt(100 * Math.random(), 10), M = 0.31415926536 > Math.random(), R('BLACKcat interval', U), n('power', !0), n('veryLongSwitch', M), n('brightness', U), n('purr', k), n('veryLongSlider', F), n('SENSOR_SENSOR', x), n('uptime', Date.now() - L), n('large-image', f())
    }

    function f() {
        var j = parseInt(Date.now() / 4e3, 10);
        G !== j && (G = j, V = (V + 1) % P.RANDOM_IMAGE_URL.length);
        var K = P.RANDOM_IMAGE_URL[V].replace('PLACEHOLDER', '' + G);
        return K + '?' + G
    }
    var D = o(1),
        R = o(2)('neeo:blackcat:controller'),
        P = o(96),
        w = o(100),
        L = Date.now(),
        U = 0,
        k = P.UPDATE_INTERVAL_MS,
        F = 0,
        M = !0,
        x = 0,
        B = void 0,
        V = 0,
        G = 0,
        W = function() {
            return R('SENDCOMPONENTUPDATE FUNCTION NOT INITIALIZED'), Promise.resolve()
        },
        H = function() {
            R('MARKDEVICEON FUNCTION NOT INITIALIZED')
        },
        Y = function() {
            R('MARKDEVICEOFF FUNCTION NOT INITIALIZED')
        };
    t.exports = {
        initialize: function() {
            R('constructor')
        },
        discover: function() {
            return R('discovery call'), P.DISCOVERY
        },
        onButtonPressed: function(j, K) {
            switch (j) {
                case P.POWER_ON:
                    R('Powering on neeo:blackcat:' + K), d();
                    break;
                case P.POWER_OFF:
                    R('Powering off neeo:blackcat:' + K), c();
                    break;
                default:
                    return R('Another button: ' + j + ' for ' + K), !0;
            }
        },
        getLargeImageUri: f,
        getUptime: function() {
            return D.resolve(Date.now() - L)
        },
        getVeryLongLabel: function() {
            return D.resolve(P.VERY_LONG_LABEL)
        },
        sensor: {
            getter: function() {
                return D.resolve(x)
            }
        },
        brightnessSlider: {
            setter: function(j, K) {
                U = K, n('brightness', U)
            },
            getter: function() {
                return D.resolve(U)
            }
        },
        purrSlider: {
            setter: function(j, K) {
                k = K, n('purr', k), B !== void 0 && (R('purrrrring at ' + (1e3 / k).toFixed(1) + 'Hz'), clearInterval(B), B = setInterval(u, k))
            },
            getter: function() {
                return D.resolve(k)
            }
        },
        veryLongSlider: {
            setter: function(j, K) {
                F = K, n('veryLongSlider', F)
            },
            getter: function() {
                return D.resolve(F)
            }
        },
        powerSwitch: {
            setter: function(j, K) {
                return R('switchSet', K), !0 === K ? void d() : void c()
            },
            getter: function() {
                return D.resolve(B !== void 0)
            }
        },
        longSwitch: {
            setter: function(j, K) {
                M = K, n('veryLongSwitch', M)
            },
            getter: function() {
                return D.resolve(M)
            }
        },
        browse: {
            getter: function(K, z) {
                return w.handleBrowse(z)
            },
            action: function(K, z) {
                return w.handleAction(z)
            }
        },
        setNotificationCallbacks: function(j, K) {
            R('setNotificationCallbacks %O', K), W = j, K && K.powerOnNotificationFunction && (H = K.powerOnNotificationFunction), K && K.powerOffNotificationFunction && (Y = K.powerOffNotificationFunction)
        }
    }
}, function(t) {
    'use strict';
    t.exports = {
        folderIcon: 'https://neeo-sdk.neeo.io/folder.jpg',
        fileIcon: 'https://neeo-sdk.neeo.io/file.jpg'
    }
}, function(t, r, o) {o(0)("Function 99").verbose("BlackCat:SDK buildDevices Black Cat");
    'use strict';
    var d = o(3),
        c = o(97),
        u = o(0)('BlackCat:SDK'),
        p = {
            name: 'brightness',
            label: 'Brightness',
            range: [0, 200],
            unit: '%'
        },
        m = {
            name: 'purr',
            label: 'Purr Duration',
            range: [50, 5000],
            unit: 'ms'
        },
        E = {
            name: 'veryLongSlider',
            label: 'Magic Slider with a very unreasonably long label',
            range: [0, 100],
            unit: '%'
        },
        g = {
            name: 'sensor',
            label: 'Sensor',
            type: 'range',
            range: [0, 100],
            unit: '%'
        },
        y = {
            name: 'power',
            label: 'Power'
        },
        S = {
            name: 'veryLongSwitch',
            label: 'Switch with a very unreasonably long label'
        },
        f = {
            name: 'uptime',
            label: 'Uptime',
            isLabelVisible: !0
        },
        I = {
            name: 'veryLongLabel',
            label: 'This is a very unreasonably long text label',
            isLabelVisible: !1
        },
        O = {
            name: 'large-image',
            label: 'Large Image',
            size: 'large'
        },
        T = {
            name: 'LIST_TEST_MASTER',
            label: 'List Test Master'
        },
        N = {
            name: 'ALERT',
            label: 'Alert'
        },
        A = {
            name: 'DUMMY',
            label: 'Dummy'
        },
        C = {
            headerText: 'Dear User',
            description: 'This is just a dummy device to show some functions. There is nothing to see here, please press BACK.'
        };
    t.exports = {
        buildDevices: function() {
            try {
                var R = d.buildCustomDevice('Black Cat').setType('LIGHT').setManufacturer('6336').setDriverVersion(3).addAdditionalSearchToken('blackcat').addCapability('alwaysOn').setIcon('sonos').setSpecificName('Blackcat').addImageUrl(O, c.getLargeImageUri).addButton(N).addButton(A).addButtonGroup('Color Buttons').addButtonHandler(c.onButtonPressed).addSlider(p, c.brightnessSlider).addSlider(m, c.purrSlider).addSlider(E, c.veryLongSlider).addSwitch(y, c.powerSwitch).addSwitch(S, c.longSwitch).addSensor(g, c.sensor).addTextLabel(f, c.getUptime).addTextLabel(I, c.getVeryLongLabel).addPowerStateSensor(c.powerSwitch).addDirectory(T, c.browse).enableDiscovery(C, c.discover).registerInitialiseFunction(c.initialize).registerSubscriptionFunction(c.setNotificationCallbacks);
                return [R]
            } catch (P) {
                u.error('INITIALIZATION_FAILED', P.message)
            }
        }
    }
}, function(t, r, o) {o(0)("Function 100").verbose("neeo:blackcat:listhandler: handleAction, handleBrowse");
    'use strict';

    function n(U) {
        return Array.isArray(U) ? U : Array.from(U)
    }

    function u(U) {
        var k = U.list,
            F = U.parameters,
            M = T(F, 1),
            x = M[0],
            B = parseInt(x, 10);
        return B ? p(k, B) : m(k)
    }

    function p(U, k) {
        var F = U.offset,
            M = k - F,
            x = U.limit < M ? U.limit : M,
            B = Array(x).fill(42).map(function(V, G) {
                return {
                    title: 'Item ' + (F + G + R),
                    actionIdentifier: 'item:' + (F + G + R)
                }
            });
        return new N(function(V) {
            U.setListTitle('List of ' + k + ' items'), B.map(function(G) {
                return U.addListItem(G)
            }), U.setTotalMatchingItems(k), V(U)
        })
    }

    function m(U) {
        var F = [100, 200, 400, 800, 1600].map(function(M) {
            return {
                title: 'List with ' + M + ' items',
                browseIdentifier: L.LONG + ':' + M
            }
        });
        return new N(function(M) {
            U.setListTitle('List size options'), U.addListItems(F), U.setTotalMatchingItems(F.length), M(U)
        })
    }

    function E(U) {
        var k = U.list,
            F = U.parameters,
            M = T(F, 1),
            x = M[0],
            B = parseInt(x, 10);
        return B ? p(k, w).then(function(V) {
            return g(B, V)
        }) : y(k)
    }

    function g(U, k) {
        return N.delay(U).then(function() {
            return k
        })
    }

    function y(U) {
        var F = [250, 500, 1000, 2000, 4000, 8000].map(function(M) {
            return {
                title: 'List of ' + w + ' items with ' + M + 'ms delay',
                browseIdentifier: L.DELAYED + ':' + M
            }
        });
        return new N(function(M) {
            U.setListTitle('List delay options'), U.addListItems(F), U.setTotalMatchingItems(F.length), M(U)
        })
    }

    function S(U) {
        var k = U.list,
            F = ['This $^evil ^%list', 'Some\\eescape\\\'stuff'].map(function(M, x) {
                return {
                    title: M,
                    actionIdentifier: 'evil:' + x
                }
            });
        return new N(function(M) {
            k.setListTitle('Evil list'), k.addListItems(F), k.setTotalMatchingItems(F.length), M(k)
        })
    }

    function f(U) {
        var k = U.list;
        return new N(function(F) {
            var M = [{
                title: 'Long lists',
                thumbnailUri: D.folderIcon,
                browseIdentifier: L.LONG
            }, {
                title: 'Delayed lists',
                thumbnailUri: D.folderIcon,
                browseIdentifier: L.DELAYED
            }, {
                title: 'Evil list items',
                thumbnailUri: D.folderIcon,
                browseIdentifier: L.EVIL
            }];
            k.setListTitle('Master list'), k.addListItems(M), k.setTotalMatchingItems(M.length), F(k)
        })
    }

    function I() {
        var U = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : '',
            k = U.split(P),
            F = n(k),
            M = F[0],
            x = F.slice(1);
        return {
            listType: M,
            parameters: x
        }
    }

    function O(U) {
        var k = {
            browseIdentifier: U.browseIdentifier,
            offset: U.offset,
            limit: U.limit
        };
        return C.buildBrowseList(k)
    }
    var T = function() {
            function U(k, F) {
                var M = [],
                    x = !0,
                    B = !1,
                    V = void 0;
                try {
                    for (var G = k[Symbol.iterator](), W; !(x = (W = G.next()).done) && (M.push(W.value), !(F && M.length === F)); x = !0);
                } catch (H) {
                    B = !0, V = H
                } finally {
                    try {
                        !x && G['return'] && G['return']()
                    } finally {
                        if (B) throw V
                    }
                }
                return M
            }
            return function(k, F) {
                if (Array.isArray(k)) return k;
                if (Symbol.iterator in Object(k)) return U(k, F);
                throw new TypeError('Invalid attempt to destructure non-iterable instance')
            }
        }(),
        N = o(1),
        A = o(2)('neeo:blackcat:listhandler'),
        C = o(3),
        D = o(98),
        R = 1,
        P = ':',
        w = 500,
        L = {
            LONG: 'long',
            DELAYED: 'delayed',
            EVIL: 'evil'
        };
    t.exports = {
        handleAction: function(U) {
            A('browse.action()', U)
        },
        handleBrowse: function(U) {
            A('browse.getter()', U);
            var k = O(U),
                F = I(U.browseIdentifier),
                M = F.listType,
                x = F.parameters;
            return M === L.LONG ? u({
                list: k,
                parameters: x
            }) : M === L.DELAYED ? E({
                list: k,
                parameters: x
            }) : M === L.EVIL ? S({
                list: k
            }) : f({
                list: k
            })
        }
    }
}, function(t, r, o) {o(0)("Function 101").verbose("neeo:braindriver:controller: onButtonPressed, executeFavorite, discover, getDeviceSubscriptionHandler");
    'use strict';

    function n(f) {
        if (Array.isArray(f)) {
            for (var I = 0, O = Array(f.length); I < f.length; I++) O[I] = f[I];
            return O
        }
        return Array.from(f)
    }

    function d(f, I) {
        return y('onButtonPressed', f, I), S.triggerMacroAction(f, I)
    }

    function c(f, I) {
        return y('executeFavorite', f, I), S.triggerFavoriteByChannel(f, I)
    }

    function m(f) {
        var I = S.getSdkDeviceFromCache(f);
        return I ? (y('found sdk in cache'), g.resolve(I)) : S.convertDeviceIdToSdkDriver(f).then(function(O) {
            return O ? void(E(O), S.addSdkDeviceToCache(f, O), y('DEVICE_BUILD_SUCCESSFULLY_AND_REGISTERED', O.id)) : void y('DEVICE_BUILD_FAILED')
        }).catch(function(O) {
            y('FAILED_TO_BUILD_SDKDEVICE', O.message)
        })
    }

    function E(f) {
        var I = f.device;
        y('adding device handlers', f.id), I.addButtonHandler(d), I.supportsFavorites() && (y('favorites supported, adding execute favorites handler'), I.registerFavoriteHandlers({
            execute: c
        }))
    }
    var g = o(1),
        y = o(2)('neeo:braindriver:controller'),
        S = o(105);
    t.exports = {
        onButtonPressed: d,
        executeFavorite: c,
        discover: function(f) {
            return y('discovery call', f), f ? m(f) : S.discoverBrainDevices().then(function(I) {
                return I.forEach(E), I
            })
        },
        getDeviceSubscriptionHandler: function() {
            return {
                deviceAdded: function(I) {
                    y('DEVICE_SUBSCRIPTION_ADDED', {
                        deviceId: I
                    })
                },
                deviceRemoved: function(I) {
                    y('DEVICE_SUBSCRIPTION_REMOVED', {
                        deviceId: I
                    })
                },
                initializeDeviceList: function() {
                    var I = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : [],
                        O = [].concat(n(new Set(I)));
                    y('DEVICES_SUBSCRIPTIONS_INITIALIZED', {
                        uniqueDeviceIds: O
                    }), O.forEach(function(T) {
                        m(T)
                    })
                }
            }
        }
    }
}, function(t, r, o) {o(0)("Function 102").verbose("neeo:braindriver:discover'");
    'use strict';

    function d(y) {
        return !y || !y.txt || 'string' != typeof y.txt.rel || 'string' != typeof y.txt.hon || !y.host || !y.name
    }

    function c(y) {
        return y.txt.hon === g
    }
    var u = o(2)('neeo:braindriver:discover'),
        p = o(103),
        g = o(34).hostname();
    t.exports = {
        discoverBrains: function() {
            var y = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : 5e3;
            u('discoverBrains');
            var S = [],
                f = p.discoverBrains(function(I) {
                    return d(I) ? void u('invalid entry ignored %o', I) : c(I) ? void u('remove myself from results') : void(u('found a NEEO Brain: %o', I), S.push({
                        id: I.host,
                        name: I.name,
                        referer: I.referer
                    }))
                }, y);
            return f.then(function() {
                return S.slice(0, 8)
            })
        }
    }
}, function(t, r, o) {o(0)("Function 103").verbose("neeo:braindriver:mdns ,discoverBrains");
    'use strict';
    var d = o(2)('neeo:braindriver:mdns'),
        c = o(1),
        u = o(180);
    t.exports = {
        discoverBrains: function(m, E) {
            return new c(function(g) {
                var y = u().find({
                    type: 'neeo'
                }, m);
                d('START_MDNS_DISCOVERY'), y.start(), setTimeout(function() {
                    d('STOP_MDNS_DISCOVERY'), y.stop(), g()
                }, E)
            })
        }
    }
}, function(t, r, o) {o(0)("Function 104").verbose("neeo:braindriver:index buildCustomDevice setSpecificName('NEEO Brain'");
    'use strict';
    var d = o(3),
        c = o(101),
        u = o(41),
        p = o(0)('neeo:braindriver:index'),
        m = {
            headerText: 'NEEO Brain',
            description: 'This driver allows you to add infrared and HDMI-CEC devices from another NEEO Brain.',
            enableDynamicDeviceBuilder: !0
        };
    t.exports = {
        buildDevices: function() {
            try {
                var E = d.buildCustomDevice(u.DEVICE_NAME).setSpecificName('NEEO Brain').setIcon('neeo-brain').addAdditionalSearchToken('multibrain').setManufacturer('NEEO').enableDiscovery(m, c.discover).registerDeviceSubscriptionHandler(c.getDeviceSubscriptionHandler());
                return [E]
            } catch (g) {
                p.error('INITIALIZATION_FAILED', g.message)
            }
        }
    }
}, function(t, r, o) {o(0)("Function 105").verbose("neeo:braindriver:service");
    'use strict';
    var g = o(11),
        y = o(1),
        S = o(2)('neeo:braindriver:service'),
        f = o(110),
        I = o(102);
    t.exports = {
        discoverBrainDevices: function() {
            return I.discoverBrains().then(function() {
                var T = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : [];
                S('discoveredBrains %o', T);
                var N = T.map(function(A) {
                    return f.getDevicesFromBrainAndRegisterCallbacks(A)
                });
                return y.all(N)
            }).then(function(T) {
                return S('projects converted'), g(T).filter(function(N) {
                    return N
                })
            })
        },
        convertDeviceIdToSdkDriver: function(T, N) {
            var A = f.parseId(T);
            return A ? f.convertSpecificBrainDevice(A, N) : void S('invalid deviceId', T)
        },
        triggerMacroAction: function(T) {
            var N = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : '',
                A = f.parseId(N);
            return A && T ? f.triggerMacroByComponentName(A, T) : void S('INVALID_MACRO_PARAMETER', {
                deviceId: N,
                actionName: T
            })
        },
        triggerFavoriteByChannel: function() {
            var T = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : '',
                N = arguments[1],
                A = f.parseId(T);
            return A && N ? f.triggerFavoriteByChannelNr(A, N) : void S('INVALID_FAVORITE_PARAMETER', {
                deviceId: T,
                channelNr: N
            })
        },
        addSdkDeviceToCache: function(T, N) {
            O.set(T, N)
        },
        getSdkDeviceFromCache: function(T) {
            return O.get(T)
        },
        clearSdkDeviceCache: function() {
            O.clear()
        }
    };
    var O = new Map
}, function(t, r, o) {o(0)("Function 106").verbose("neeo:braindriver:brainDataFetcher getRestRequest");
    'use strict';
    var d = o(58),
        c = o(2)('neeo:braindriver:brainDataFetcher');
    t.exports = {
        getRestRequest: function(p) {
            return c('getRestRequest', p), d.get(p, {
                timeout: 4e3
            }).then(function(m) {
                return m.data
            })
        }
    }
}, function(t, r, o) {o(0)("Function 107").verbose("neeo:braindriver:projectConverter: convertProjectToSdkDevices, convertBrainObjectToSdkDevices");
    'use strict';

    function n(D, R) {
        if (!(D instanceof R)) throw new TypeError('Cannot call a class as a function')
    }

    function u(D) {
        if (!D || !D.details) return !1;
        var R = D.details.sourceName === f;
        if (R) return !0;
        var P = D.details.sourceName === I;
        if (!P) return !1;
        var w = D.adapterDeviceId.match(O);
        if (!Array.isArray(w) || 3 > w.length) return !1;
        var L = w[1],
            U = w[2],
            k = g.isPhysicalAddressValid(L),
            F = g.isLogicalAddressValid(U);
        return F && k
    }
    var p = function() {
            function D(R, P) {
                for (var w = 0, L; w < P.length; w++) L = P[w], L.enumerable = L.enumerable || !1, L.configurable = !0, 'value' in L && (L.writable = !0), Object.defineProperty(R, L.key, L)
            }
            return function(R, P, w) {
                return P && D(R.prototype, P), w && D(R, w), R
            }
        }(),
        m = o(11),
        E = o(2)('neeo:braindriver:projectConverter'),
        g = o(33),
        y = o(3),
        S = o(41),
        f = 'duiro',
        I = 'neeo-deviceadapter',
        O = /((?:\d+\.){3}\d+):(\d+)/,
        T = 'alwaysOn',
        N = 5e3;
    t.exports = {
        convertProjectToSdkDevices: function(D) {
            var R = new C(D);
            return R.runForAllDevices()
        },
        convertBrainObjectToSdkDevices: function(D, R) {
            var P = new C(R);
            return P.runForSpecificDevice(D)
        }
    };
    var C = function() {
        function D(R) {
            if (n(this, D), !R || !R.rooms) throw new Error('INVALID_PROJECT_JSON');
            if (this.projectJson = R, this.allRoomsNames = Object.keys(this.projectJson.rooms), E('allRoomsNames %o', this.allRoomsNames), 0 === this.allRoomsNames.length) throw new Error('INVALID_PROJECT_JSON_NO_ROOMS')
        }
        return p(D, [{
            key: 'runForAllDevices',
            value: function() {
                var P = this;
                E('start runForAllDevices project', this.projectJson.name);
                var w = this.allRoomsNames.map(function(L) {
                    return P.getDevicesFromRoom(P.projectJson.rooms[L])
                });
                return m(w).filter(function(L) {
                    return L
                })
            }
        }, {
            key: 'runForSpecificDevice',
            value: function(P) {
                var w = this;
                E('start runForSpecificDevice project', this.projectJson.name);
                var L = this.allRoomsNames.find(function(k) {
                        var F = w.projectJson.rooms[k];
                        return F && F.key === P.roomKey
                    }),
                    U = this.projectJson.rooms[L];
                return U ? this.getDeviceFromRoom(U, P.deviceKey) : void E('ROOM_NOT_FOUND', P.roomKey, L)
            }
        }, {
            key: 'getDevicesFromRoom',
            value: function(P) {
                var w = this,
                    L = P.key,
                    U = Object.keys(P.devices || []);
                return E('%s(%s): allDevices of room: %o', P.name, L, U), U.map(function(k) {
                    return w.convertDevice(L, P.devices[k])
                }).filter(function(k) {
                    return k
                })
            }
        }, {
            key: 'getDeviceFromRoom',
            value: function(P, w) {
                var L = P.key,
                    U = Object.keys(P.devices),
                    k = U.find(function(M) {
                        var x = P.devices[M];
                        return x && x.key === w
                    }),
                    F = P.devices[k];
                return F ? this.convertDevice(L, F) : void E('DEVICE_NOT_FOUND', w, k)
            }
        }, {
            key: 'convertDevice',
            value: function(P) {
                var w = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                try {
                    return this.buildSdkDevice(P, w)
                } catch (L) {
                    E('DEVICE_NOT_SUPPORTED_%s: %s', w.name, L.message)
                }
            }
        }, {
            key: 'buildSdkDevice',
            value: function(P, w) {
                if (!0 !== u(w)) return void E('unsupported devicesource', w.details.sourceName);
                var L = Object.keys(w.macros);
                if (0 === L.length) return void E('no macros found, bail out');
                var U = y.buildCustomDevice(S.DEVICE_NAME).setSpecificName(w.name).setManufacturer(w.details.manufacturer).setType(w.details.type).addCapability('dynamicDevice').addCapability('bridgeDevice');
                E('build', w.name, w.details.type);
                var k = w.details.timing;
                k && U.supportsTiming() && (E('add timing information %o', k), U.defineTiming({
                    powerOnDelayMs: Number.isInteger(k.standbyCommandDelay) ? k.standbyCommandDelay : N,
                    sourceSwitchDelayMs: Number.isInteger(k.sourceSwitchDelay) ? k.sourceSwitchDelay : 5e3,
                    shutdownDelayMs: Number.isInteger(k.shutdownDelay) ? k.shutdownDelay : N
                }));
                var F = w.details.deviceversion;
                Number.isInteger(F) && 0 < F && U.setDriverVersion(F);
                var M = Array.isArray(w.details.deviceCapabilities);
                return M && w.details.deviceCapabilities.includes(T) && (E('configure always on capability'), U.addCapability(T)), L.forEach(function(x) {
                    var B = w.macros[x];
                    U.addButton({
                        name: B.name,
                        label: B.label
                    })
                }), {
                    sdkDevice: U,
                    deviceKey: w.key,
                    roomKey: w.roomKey
                }
            }
        }]), D
    }()
}, function(t) {
    'use strict';

    function d() {
        var u = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : '';
        return u.toLowerCase()
    }
    t.exports = {
        
        getSpecificDeviceName: function(u) {
            var p = d(u.specificname),
                m = p.replace(' ', ''),
                E = d(u.type),
                g = d(u.manufacturer),
                y = p.includes(E) || m.includes(E),
                S = p.includes(g) || m.includes(g);
            return y && S ? u.specificname : S ? u.type + c + u.specificname : y ? u.manufacturer + c + u.specificname : u.manufacturer + c + u.type + c + u.specificname
        }
    };
    var c = ' '
}, function(t, r, o) {o(0)("Function 109").verbose("neeo:braindriver:dns : resolveBonjourNameToIp, addResolvedIP4BonjourEntry, invalidateEntry");
    'use strict';
    var u = o(183),
        p = o(2)('neeo:braindriver:dns');
    t.exports = {
        resolveBonjourNameToIp: function(E) {
            var g = m.get(E);
            return g ? g : void u.lookup(E, function(y, S, f) {
                if (y) return void p('FAILED_TO_RESOLVE', {
                    bonjourName: E,
                    error: y.message
                });
                var I = {
                    address: S,
                    family: f
                };
                p('RESOLVED_NAME %o', I), m.set(E, I)
            })
        },
        addResolvedIP4BonjourEntry: function(E, g) {
            var y = {
                address: g,
                family: 4
            };
            p('ADD_RESOLVED_NAME %s: %o', E, y), m.set(E, y)
        },
        invalidateEntry: function(E) {
            return m.delete(E)
        }
    };
    var m = new Map
}, function(t, r, o) {o(0)("Function 110").verbose("neeo:neeobrain:services: getDevicesFromBrainAndRegisterCallbacks,convertSpecificBrainDevice, triggerMacroByComponentName, triggerFavoriteByChannelNr, parseId");
    'use strict';

    function d(R) {
        if (!R || !R.referer) return void C.debug('NO_CACHEDATA_FOUND');
        if (R.referer.family !== D) return void C.debug('NOT_AN_IPV4_ADDRESS', R);
        var P = R.id,
            w = R.referer.address;
        O.addResolvedIP4BonjourEntry(P, w)
    }

    function E(R, P) {
        return f.getRestRequest(R).catch(function(w) {
            return O.invalidateEntry(P.id), S.reject(w)
        })
    }

    function g(R) {
        var P = O.resolveBonjourNameToIp(R.id),
            w = P && 4 === P.family;
        return w ? P.address : R.id
    }

    function y(R, P) {
        var w = P.sdkDevice,
            L = A.getSpecificDeviceName(w),
            U = T.stringify(R.id, P.roomKey, P.deviceKey);
        return {
            id: U,
            name: L,
            room: R.name,
            device: w
        }
    }
    var S = o(1),
        f = o(106),
        I = o(107),
        O = o(109),
        T = o(111),
        N = o(112),
        A = o(108),
        C = o(0)('neeo:neeobrain:services');
    t.exports = {
        getDevicesFromBrainAndRegisterCallbacks: function(R) {
            d(R);
            var P = g(R),
                w = N.buildProjectJsonUrl(P);
            return C.debug('getDevicesFromBrainAndRegisterCallbacks', {
                brainDiscoverObject: R,
                brainProjectUrl: w
            }), f.getRestRequest(w).then(function(L) {
                return C.debug('CONVERT_PROJECT'), I.convertProjectToSdkDevices(L)
            }).then(function(L) {
                return C.info('CONVERTED_NEEO_BRAIN_DRIVER', {
                    count: L.length
                }), L.map(function(U) {
                    return y(R, U)
                })
            }).catch(function(L) {
                C.warn('CONVERT_PROJECTDEVICES_FAILED', {
                    error: L.message,
                    brainDiscoverObject: R
                })
            })
        },
        convertSpecificBrainDevice: function(R) {
            C.debug('convertSpecificBrainDevice', R);
            var P = g(R),
                w = N.buildProjectJsonUrl(P);
            return f.getRestRequest(w).then(function(L) {
                return C.debug('CONVERT_PROJECT'), I.convertBrainObjectToSdkDevices(R, L)
            }).then(function(L) {
                return y(R, L)
            }).catch(function(L) {
                C.warn('CONVERT_PROJECTDEVICE_FAILED', L.message)
            })
        },
        triggerMacroByComponentName: function(R, P) {
            var w = g(R),
                L = N.buildTriggerMacroByNameUrl(w, R, P);
            return E(L, R)
        },
        triggerFavoriteByChannelNr: function(R, P) {
            var w = g(R),
                L = N.buildTriggerFavoriteByChannelUrl(w, R, P);
            return E(L, R)
        },
        parseId: function(R) {
            return T.parse(R)
        }
    };
    var D = 'IPv4'
}, function(t, r, o) {o(0)("Function 111").verbose("neeo:braindriver:serialiseId stringify and parse");
    'use strict';
    var c = o(2)('neeo:braindriver:serialiseId');
    t.exports = {
        stringify: function() {
            var p = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : '',
                m = 1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : '',
                E = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : '';
            return '' + p + u + m + u + E
        },
        parse: function() {
            var p = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : '',
                m = p.split(u);
            return 3 === m.length ? {
                id: m[0],
                roomKey: m[1],
                deviceKey: m[2]
            } : void c('INVALID_DEVICEID', p)
        }
    };
    var u = ':'
}, function(t) {
    'use strict';

    function u(y, S) {
        var f = S.roomKey,
            I = S.deviceKey;
        return '' + p + y + m + E + f + '/devices/' + I
    }
    t.exports = {
        buildTriggerMacroByNameUrl: function(y, S, f) {
            var I = encodeURI(f),
                O = u(y, S);
            return O + '/trigger?name=' + I
        },
        buildTriggerFavoriteByChannelUrl: function(y, S, f) {
            var I = u(y, S);
            return I + '/favorites/triggerByChannel/' + encodeURI(f)
        },
        buildProjectJsonUrl: function(y) {
            return '' + p + y + m + g
        }
    };
    var p = 'http://',
        m = ':3000',
        E = '/projects/home/rooms/',
        g = '/projects/home'
}, function(t, r, o) {o(0)("Function 113").verbose("NEEO BrainbuildCECController('NEEO CEC Cat'");
    'use strict';
    var d = o(4),
        c = o(42),
        p = ['Recorder 1', 'NEEO Brain'];
    t.exports = d.buildCECController('NEEO CEC Cat', c, function(m) {
        return !p.includes(m.osdName)
    })
}, function(t, r, o) {o(0)("Function 114").verbose("CECCat:SDK buildCECDevice");
    'use strict';
    var d = o(4),
        c = o(113),
        u = o(42),
        p = o(0)('CECCat:SDK'),
        m = {
            name: 'dmzrt',
            manufacturer: 'okqaf',
            type: 'ACCESSOIRE',
            searchTokens: [],
            discoveryInstructions: {
                headerText: 'Dear User',
                description: 'This is a non-functional testing device to verify functions.There is nothing to see here, please press BACK.'
            },
            buttonMap: u,
            controller: c
        };
    t.exports = {
        buildDevices: function() {
            try {
                var E = d.buildCECDevice(m);
                return [E]
            } catch (g) {
                p.error('INITIALIZATION_FAILED', g.message)
            }
        }
    }
}, function(t, r, o) {o(0)("Function 115").verbose("neeo:cranium:controller' onButtonPressed, getBootSensor, setNotificationCallbacks, getDeviceSubscriptionHandler");
    'use strict';

    function c() {
        R = !0;
        var L = g.uptime();
        if (O.debug('ONBOOT_NOTIFICATION_STARTS', {
                hasEventListeners: P,
                uptimeInS: L
            }), P && L < C) {
            var U = I.ONBOOT_SENSOR + '_SENSOR';
            return w({
                uniqueDeviceId: 'default',
                component: U,
                value: R
            }).catch(function(F) {
                O.error('NOTIFICATION_FAILED', F.message)
            })
        }
    }

    function m(L) {
        return new y(function(U, k) {
            S.exec(L, function(F) {
                return F ? k(F) : void U()
            })
        })
    }

    function E(L) {
        return new y(function(U, k) {
            f(L, function(F) {
                return F ? k(F) : void U()
            })
        })
    }
    var g = o(34),
        y = o(1),
        S = o(181),
        f = o(61),
        I = o(43),
        O = o(0)('neeo:cranium:controller'),
        C = 480;
    t.exports = {
        onButtonPressed: function(L) {
            return L === I.MACRO_LEDOFF ? (O.debug('LEDOFF'), E('http://127.0.0.1:3001/fst/ledOff')) : L === I.MACRO_LEDON ? (O.debug('LEDON'), E('http://127.0.0.1:3001/fst/ledwhite')) : L === I.MACRO_REBOOT_BRAIN ? (O.debug('REBOOT'), m('/sbin/reboot')) : (O.debug('Unsupported button', L), y.resolve(!1))
        },
        getBootSensor: function() {
            return R
        },
        setNotificationCallbacks: function(L) {
            O.debug('setNotificationCallbacks'), w = L, setTimeout(function() {
                c()
            }, 120000)
        },
        getDeviceSubscriptionHandler: function() {
            return O.debug('getDeviceSubscriptionHandler'), {
                deviceAdded: function() {},
                deviceRemoved: function() {},
                initializeDeviceList: function(U) {
                    O.debug('DEVICES_SUBSCRIPTIONS_INITIALIZED', {
                        deviceIds: U
                    }), P = Array.isArray(U) && 0 < U.length
                }
            }
        }
    };
    var R = !1,
        P = !1,
        w = function() {
            return y.reject(new Error('NOT INITIALIZED'))
        }
}, function(t, r, o) {o(0)("Function 116").verbose("buildCustomDevice neeo:cranium:index");
    'use strict';
    var d = o(3),
        c = o(115),
        u = o(43),
        p = o(0)('neeo:cranium:index'),
        m = {
            name: u.MACRO_REBOOT_BRAIN,
            label: 'Reboot Brain'
        },
        E = {
            name: u.MACRO_LEDOFF,
            label: 'Brain LED Off'
        },
        g = {
            name: u.MACRO_LEDON,
            label: 'Brain LED On'
        },
        y = {
            name: u.ONBOOT_SENSOR,
            label: 'On Boot Sensor',
            type: 'binary'
        };
    t.exports = {
        buildDevices: function() {
            try {
                var S = d.buildCustomDevice('Cranium').setSpecificName('NEEO Cranium').setManufacturer('NEEO').setIcon('neeo-brain').setType('ACCESSORY').addAdditionalSearchToken('Brain').addButton(m).addButton(E).addButton(g).addCapability('alwaysOn').addButtonHandler(function(f, I) {
                    return c.onButtonPressed(f, I)
                }).addSensor(y, {
                    getter: function() {
                        return c.getBootSensor()
                    }
                }).registerSubscriptionFunction(function() {
                    return c.setNotificationCallbacks.apply(c, arguments)
                }).registerDeviceSubscriptionHandler(c.getDeviceSubscriptionHandler());
                return [S]
            } catch (f) {
                p.error('INITIALIZATION_FAILED', f.message)
            }
        }
    }
}, function(t, r, o) {o(0)("Function 117").verbose("PS3:SDK buildCECDevice");
    'use strict';
    var d = o(4),
        c = o(118),
        u = o(44),
        p = o(0)('PS3:SDK'),
        m = {
            name: 'PlayStation 3 Slim/Super Slim',
            manufacturer: 'Sony',
            type: 'GAMECONSOLE',
            searchTokens: ['ps3', 'ps'],
            discoveryInstructions: {
                headerText: 'This device requires HDMI CEC',
                description: 'To discover and then control it you will need to connect the NEEO Brain to your setup with an HDMI cable and enable HDMI Device Link on your PS3 Slim or PS3 Super Slim (other models not supported).'
            },
            timing: {
                shutdownDelayMs: 8e3,
                powerOnDelayMs: 3e4
            },
            buttonMap: u,
            controller: c
        };
    t.exports = {
        buildDevices: function() {
            try {
                var E = d.buildCECDevice(m);
                return [E]
            } catch (g) {
                p.error('INITIALIZATION_FAILED', g.message)
            }
        }
    }
}, function(t, r, o) {o(0)("Function 118").verbose(" buildCECController('PlayStation3");
    'use strict';
    var d = o(4),
        c = o(44),
        u = ['PlayStation 3'];
    t.exports = d.buildCECController('PlayStation3', c, function(E) {
        return u.includes(E.osdName) && E.vendorId === 524358
    })
}, function(t, r, o) {o(0)("Function 119").verbose(" PS4:SDK buildCECDevice");
    'use strict';
    var d = o(4),
        c = o(120),
        u = o(45),
        p = o(0)('PS4:SDK'),
        m = {
            name: 'PlayStation 4',
            manufacturer: 'Sony',
            type: 'GAMECONSOLE',
            searchTokens: ['ps4', 'ps'],
            discoveryInstructions: {
                headerText: 'This device requires HDMI CEC',
                description: 'To discover and then control it you will need to connect the NEEO Brain to your setup with an HDMI cable and enable HDMI Device Link on your PS4.'
            },
            timing: {
                shutdownDelayMs: 35000,
                powerOnDelayMs: 17000
            },
            buttonMap: u,
            controller: c
        };
    t.exports = {
        buildDevices: function() {
            try {
                var E = d.buildCECDevice(m);
                return [E]
            } catch (g) {
                p.error('INITIALIZATION_FAILED', g.message)
            }
        }
    }
}, function(t, r, o) {o(0)("Function 120").verbose("buildCECController('PlayStation4");
    'use strict';
    var d = o(4),
        c = o(45),
        u = ['PlayStation 4'];
    t.exports = d.buildCECController('PlayStation4', c, function(m) {
        return u.includes(m.osdName)
    })
}, function(t, r, o) {o(0)("Function 121").verbose("REPO_WRAPPER");
    'use strict';

    function n(E, g) {
        if (!(E instanceof g)) throw new TypeError('Cannot call a class as a function')
    }
    var c = function() {
            function E(g, y) {
                for (var S = 0, f; S < y.length; S++) f = y[S], f.enumerable = f.enumerable || !1, f.configurable = !0, 'value' in f && (f.writable = !0), Object.defineProperty(g, f.key, f)
            }
            return function(g, y, S) {
                return y && E(g.prototype, y), S && E(g, S), g
            }
        }(),
        u = o(0)('REPO_WRAPPER'),
        p = o(15);
    t.exports = {
        getInstance: function(E) {
            return new m(E)
        }
    };
    var m = function() {
        function E(g) {
            n(this, E), this.repo = new p(g), u.debug('created')
        }
        return c(E, [{
            key: 'loadSync',
            value: function(y) {
                return u.debug('load', y), this.repo.loadFailsafe(y)
            }
        }, {
            key: 'saveSync',
            value: function(y, S) {
                u.debug('save', y);
                try {
                    this.repo.save(y, S)
                } catch (f) {
                    u.error('SAVE_FAILED', {
                        key: y,
                        error: f.message
                    })
                }
            }
        }, {
            key: 'deleteSync',
            value: function(y) {
                u.info('DELET_REPO', {
                    key: y
                }), this.repo.delete(y)
            }
        }]), E
    }()
}, function(t, r, o) {o(0)("Function 122").verbose("SHIELD TV:SDK buildCECDevice");
    'use strict';
    var d = o(4),
        c = o(123),
        u = o(46),
        p = o(0)('SHIELD TV:SDK'),
        m = {
            name: 'Shield TV',
            manufacturer: 'NVIDIA',
            type: 'GAMECONSOLE',
            searchTokens: ['nvidia', 'shield', 'tv'],
            discoveryInstructions: {
                headerText: 'This device requires HDMI CEC',
                description: 'To discover and then control it you will need to connect the NEEO Brain to your setup with an HDMI cable and enable HDMI Device Link on your Shield TV. Note: This driver only works with Shield TV Version 7.0.0 or higher!'
            },
            timing: {
                shutdownDelayMs: 4e3,
                powerOnDelayMs: 8e3
            },
            buttonMap: u,
            controller: c
        };
    t.exports = {
        buildDevices: function() {
            try {
                var E = d.buildCECDevice(m);
                return [E]
            } catch (g) {
                p.error('INITIALIZATION_FAILED', g.message)
            }
        }
    }
}, function(t, r, o) {o(0)("Function 123").verbose("buildCECController nvidea Shield");
    'use strict';
    var d = o(4),
        c = o(46),
        u = ['SHIELD'];
    t.exports = d.buildCECController('Shield TV', c, function(m) {
        return u.includes(m.osdName)
    })
}, function(t, r, o) {o(0)("Function 124").verbose("Connect/communicate Sonos:SDK:Service");
    'use strict';

    function n(k, F) {
        if (!(k instanceof F)) throw new TypeError('Cannot call a class as a function')
    }

    function d(k, F) {
        if (!k) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return F && ('object' == typeof F || 'function' == typeof F) ? F : k
    }

    function c(k, F) {
        if ('function' != typeof F && null !== F) throw new TypeError('Super expression must either be null or a function, not ' + typeof F);
        k.prototype = Object.create(F && F.prototype, {
            constructor: {
                value: k,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), F && (Object.setPrototypeOf ? Object.setPrototypeOf(k, F) : k.__proto__ = F)
    }
    var u = function() {
            function k(F, M) {
                for (var x = 0, B; x < M.length; x++) B = M[x], B.enumerable = B.enumerable || !1, B.configurable = !0, 'value' in B && (B.writable = !0), Object.defineProperty(F, B.key, B)
            }
            return function(F, M, x) {
                return M && k(F.prototype, M), x && k(F, x), F
            }
        }(),
        p = o(1),
        m = o(200),
        E = o(0)('Sonos:SDK:Service'),
        g = o(125),
        y = o(5).sonos,
        S = o(10),
        f = o(132),
        I = y.apiKey,
        O = y.sonosCertificate,
        T = y.rejectUnauthorized,
        N = y.handshakeTimeoutMs,
        A = y.discoveryTimeMs,
        C = 1,
        D = o(47),
        R = D.PLAYER_SPECIFIC_NS_LIST,
        P = {
            "POWER OFF": {
                name: 'pause'
            },
            PLAY: {
                name: 'play'
            },
            PAUSE: {
                name: 'pause'
            },
            "NEXT TRACK": {
                name: 'skipToNextTrack'
            },
            "PREVIOUS TRACK": {
                name: 'skipToPreviousTrack'
            },
            "VOLUME UP": {
                name: 'groupVolumeRelative',
                params: C
            },
            "VOLUME DOWN": {
                name: 'groupVolumeRelative',
                params: -1 * C
            }
        },
        w = {
            "PLAY TOGGLE": {
                sensor: 'PLAYING_SENSOR',
                onCommand: {
                    name: 'play'
                },
                offCommand: {
                    name: 'pause'
                }
            },
            "MUTE TOGGLE": {
                sensor: 'MUTE_SENSOR',
                onCommand: {
                    name: 'groupMute'
                },
                offCommand: {
                    name: 'groupUnmute'
                }
            },
            "REPEAT TOGGLE": {
                sensor: 'REPEAT_SENSOR',
                onCommand: {
                    name: 'repeat',
                    params: !0
                },
                offCommand: {
                    name: 'repeat',
                    params: !1
                }
            },
            "SHUFFLE TOGGLE": {
                sensor: 'SHUFFLE_SENSOR',
                onCommand: {
                    name: 'shuffle',
                    params: !0
                },
                offCommand: {
                    name: 'shuffle',
                    params: !1
                }
            }
        },
        L = {
            PLAYING: w['PLAY TOGGLE'],
            MUTE: w['MUTE TOGGLE']
        },
        U = {
            VOLUME: {
                name: 'playerVolume'
            },
            GROUP_VOLUME: {
                name: 'groupVolume'
            }
        };
    t.exports = function(k) {
        function F() {
            n(this, F);
            var M = d(this, (F.__proto__ || Object.getPrototypeOf(F)).call(this));
            return M.sonosClient = m.buildInstance(I, O, {
                handshakeTimeoutMs: N,
                rejectUnauthorized: T
            }), M.sonosClient.on('error', function(x) {
                return E.debug('API_ERROR', x.message)
            }), M.sonosClient.on('state', function(x, B, V) {
                return M._updateState(x, B, V)
            }), M.store = g.build(), M.store.on('update', function() {
                return M._trackSensorUpdates.apply(M, arguments)
            }), M
        }
        return c(F, k), u(F, [{
            key: 'discover',
            value: function() {
                return this.sonosClient.discover(A)
            }
        }, {
            key: 'trigger',
            value: function(x, B) {
                var V = this,
                    G = P[B];
                if (G) return E.debug('SENDING_COMMAND', {
                    action: B,
                    playerId: x,
                    name: G.name
                }), this.sonosClient.sendCommand(G.name, x, G.params);
                var W = w[B];
                return W ? this.getSensorValue(x, W.sensor).then(function(H) {
                    var Y = H ? W.offCommand : W.onCommand;
                    return E.debug('SENDING_TOGGLE_COMMAND', {
                        action: B,
                        playerId: x,
                        name: Y.name,
                        param: Y.param
                    }), V.sonosClient.sendCommand(Y.name, x, Y.params)
                }) : (E.warn('UNKNOWN_ACTION', {
                    playerId: x,
                    action: B
                }), p.resolve())
            }
        }, {
            key: 'setSwitch',
            value: function(x, B, V) {
                var G = L[B];
                if (G) {
                    var W = V ? G.onCommand : G.offCommand;
                    return E.debug('SETTING_SWITCH', {
                        playerId: x,
                        switchName: B,
                        switchOn: V,
                        name: W.name,
                        commandParam: W.param
                    }), this.sonosClient.sendCommand(W.name, x, W.params)
                }
                return E.warn('UNKNOWN_SWITCH', {
                    playerId: x,
                    switchName: B,
                    switchOn: V
                }), p.resolve()
            }
        }, {
            key: 'setSlider',
            value: function(x, B, V) {
                var G = U[B];
                return G ? (E.debug('SETTING_SLIDER', {
                    playerId: x,
                    name: G.name,
                    params: V
                }), this.sonosClient.sendCommand(G.name, x, V)) : (E.warn('UNKNOWN_SLIDER', {
                    playerId: x,
                    slider: B
                }), p.resolve())
            }
        }, {
            key: 'getSensorValue',
            value: function(x, B) {
                return this.store.getStateFor(x).then(function(V) {
                    return f.getSensorValue(V, B)
                }).then(function(V) {
                    return void 0 === V ? p.reject(new Error('DEVICE_VALUE_UNAVAILABLE ' + x + ':' + B)) : (E.debug('SENSOR_READ', {
                        sensorId: B,
                        value: V
                    }), V)
                }).catch(function(V) {
                    return E.debug('SENSOR_READ_FAILED', {
                        playerId: x,
                        sensorId: B,
                        msg: V.message
                    }), f.getSensorDefaultValue(B)
                })
            }
        }, {
            key: 'closeConnectionWith',
            value: function(x) {
                return this.sonosClient.closeConnectionWith(x)
            }
        }, {
            key: 'getOrCreateConnectionToCoordinatorOf',
            value: function(x) {
                return this.sonosClient.getOrCreateConnectionToCoordinatorOf(x)
            }
        }, {
            key: 'getAllFavorites',
            value: function(x) {
                return this.sonosClient.getAllFavorites(x)
            }
        }, {
            key: 'playFavorite',
            value: function(x, B) {
                return this.sonosClient.playFavorite(x, B)
            }
        }, {
            key: 'getGroupPlayerIds',
            value: function(x) {
                var B = this;
                return E.debug('GETTING_GROUP_PLAYER_IDS'), new p(function(V, G) {
                    var W = B.sonosClient.getCoordinatorIdFor(x);
                    if (!W) return G(new Error('No Group Id for ' + x));
                    var H = B.sonosClient.getPlayerIdsFor(W);
                    return E.debug('GROUP_PLAYER_IDS', {
                        deviceId: x,
                        coordinatorId: W,
                        groupedIds: H
                    }), 0 === H.length ? G(new Error('No players in group ' + W)) : void V(H)
                })
            }
        }, {
            key: '_trackSensorUpdates',
            value: function(x, B, V, G) {
                var W = this,
                    H = R.includes(B);
                return H ? void this._dispatchSensorUpdatesForDevice(x, B, V, G) : void this.sonosClient.getPlayerIdsFor(x).forEach(function(Y) {
                    W._dispatchSensorUpdatesForDevice(Y, B, V, G)
                })
            }
        }, {
            key: '_dispatchSensorUpdatesForDevice',
            value: function(x, B, V, G) {
                var W = this;
                f.getSensorsFor(B).forEach(function(H) {
                    var Y = H.sensorId,
                        j = f.getSensorDiff(V, G, Y),
                        K = j.before,
                        z = j.after;
                    K !== z && (E.debug('SENSOR_UPDATED', [x, Y, K, z]), W.emit('sensorUpdate', x, Y, z))
                })
            }
        }, {
            key: '_updateState',
            value: function(x, B, V) {
                this.store.dispatch(x, B, V)
            }
        }], [{
            key: 'build',
            value: function() {
                return new p(function(x) {
                    return x(new F)
                }).then(function(x) {
                    return x
                })
            }
        }]), F
    }(S)
}, function(t, r, o) {o(0)("Function 125").verbose("unknown so far");
    'use strict';

    function n(g, y, S) {
        return y in g ? Object.defineProperty(g, y, {
            value: S,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : g[y] = S, g
    }

    function d(g, y) {
        if (!(g instanceof y)) throw new TypeError('Cannot call a class as a function')
    }

    function c(g, y) {
        if (!g) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return y && ('object' == typeof y || 'function' == typeof y) ? y : g
    }

    function u(g, y) {
        if ('function' != typeof y && null !== y) throw new TypeError('Super expression must either be null or a function, not ' + typeof y);
        g.prototype = Object.create(y && y.prototype, {
            constructor: {
                value: g,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), y && (Object.setPrototypeOf ? Object.setPrototypeOf(g, y) : g.__proto__ = y)
    }
    var p = function() {
            function g(y, S) {
                for (var f = 0, I; f < S.length; f++) I = S[f], I.enumerable = I.enumerable || !1, I.configurable = !0, 'value' in I && (I.writable = !0), Object.defineProperty(y, I.key, I)
            }
            return function(y, S, f) {
                return S && g(y.prototype, S), f && g(y, f), y
            }
        }(),
        m = o(1),
        E = o(10);
    t.exports = function(g) {
        function y() {
            d(this, y);
            var S = c(this, (y.__proto__ || Object.getPrototypeOf(y)).call(this));
            return S.devices = {}, S
        }
        return u(y, g), p(y, [{
            key: 'dispatch',
            value: function(f, I, O) {
                var T = this.devices[f] || {},
                    N = Object.assign({}, T, n({}, I, O));
                this.devices = Object.assign({}, this.devices, n({}, f, N)), this._notify(f, I, T)
            }
        }, {
            key: 'getStateFor',
            value: function(f) {
                var I = this;
                return new m(function(O, T) {
                    var N = I.devices[f];
                    return N ? void O(N) : T(new Error('UNKNOWN_DEVICE ' + f))
                })
            }
        }, {
            key: '_notify',
            value: function(f, I, O) {
                var T = this.devices[f];
                this.emit('update', f, I, O, T)
            }
        }], [{
            key: 'build',
            value: function() {
                return new y
            }
        }]), y
    }(E)
}, function(t) {//#o(0)("Function 126").verbose("My Sonos - main");
    'use strict';

    function n(O) {
        if (Array.isArray(O)) {
            for (var T = 0, N = Array(O.length); T < O.length; T++) N[T] = O[T];
            return N
        }
        return Array.from(O)
    }

    function u(O) {
        var T = O.map(function(N) {
            return Object.assign({
                isTile: !0,
                actionIdentifier: ''
            }, N)
        });
        return 0 === T.length ? [] : 3 > T.length ? [{
            tiles: T
        }] : [{
            tiles: T.slice(0, 2)
        }, {
            tiles: T.slice(2, 4)
        }]
    }

    function p() {
        return [{
            title: f,
            thumbnailUri: 'LOCAL:sonos-favorites',
            browseIdentifier: I
        }, {
            isInfoItem: !0,
            title: 'Other Services',
            text: 'Tip: For fast access to all your music add it to your favorites in the SONOS app. This works independently of the music service you use.',
            affirmativeButtonText: 'OK'
        }]
    }

    function m(O) {
        var T = O.title;
        return {
            isHeader: !0,
            title: T
        }
    }

    function E(O) {
        var T = O.totalMatchingItems,
            N = O.objectId,
            A = O.offset,
            C = O.limit;
        return {
            _meta: {
                current: {
                    browseIdentifier: N,
                    offset: A,
                    limit: C
                },
                totalItems: T,
                totalMatchingItems: T
            }
        }
    }
    var f = 'My Sonos',
        I = 'FV:2';
    t.exports = {
        MY_SONOS_IDENTIFIER: I,
        getRootListFrom: function(O) {
            var T = this.getFavoritesList({
                    favoriteItems: O,
                    limit: 4
                }),
                N = [m({
                    title: 'Instant Favorites'
                })].concat(n(u(T.items)), [m({
                    title: 'SONOS'
                })], n(p()));
            return Object.assign({
                items: N
            }, E({
                totalMatchingItems: N.length,
                objectId: '',
                offset: 0,
                limit: N.length
            }))
        },
        getFavoritesList: function(O) {
            var T = O.favoriteItems,
                N = O.limit,
                A = N || T.length;
            return Object.assign({
                items: T.slice(0, A).map(function(C) {
                    return {
                        actionIdentifier: 'favorite:' + C.id,
                        thumbnailUri: C.imageUrl,
                        title: C.name,
                        label: C.description
                    }
                })
            }, E({
                totalMatchingItems: T.length,
                objectId: this.MY_SONOS_IDENTIFIER,
                offset: 0,
                limit: T.length
            }))
        }
    }
}, function(t) {//#o(0)("Function 127").verbose("Control-items - looks like player");
    'use strict';
    t.exports = {
        buttons: [{
            name: 'POWER ON'
        }, {
            name: 'POWER OFF'
        }, {
            name: 'PLAY'
        }, {
            name: 'PLAY TOGGLE'
        }, {
            name: 'PAUSE'
        }, {
            name: 'VOLUME UP'
        }, {
            name: 'VOLUME DOWN'
        }, {
            name: 'MUTE TOGGLE'
        }, {
            name: 'NEXT TRACK'
        }, {
            name: 'PREVIOUS TRACK'
        }, {
            name: 'SHUFFLE TOGGLE'
        }, {
            name: 'REPEAT TOGGLE'
        }, {
            name: 'CLEAR QUEUE'
        }],
        switches: [{
            name: 'PLAYING',
            callbackName: 'playSwitch'
        }, {
            name: 'MUTE',
            callbackName: 'muteSwitch'
        }, {
            name: 'SHUFFLE',
            callbackName: 'shuffleSwitch'
        }, {
            name: 'REPEAT',
            callbackName: 'repeatSwitch'
        }],
        sliders: [{
            name: 'VOLUME',
            range: [0, 100],
            unit: '%',
            callbackName: 'volumeSlider'
        }, {
            name: 'GROUP_VOLUME',
            label: 'Group Volume',
            range: [0, 100],
            unit: '%',
            callbackName: 'groupVolumeSlider'
        }],
        sensors: [{
            name: 'COVER_ART_SENSOR',
            type: 'string',
            callbackName: 'coverArtSensor'
        }, {
            name: 'TITLE_SENSOR',
            type: 'string',
            callbackName: 'titleSensor'
        }, {
            name: 'DESCRIPTION_SENSOR',
            type: 'string',
            callbackName: 'descriptionSensor'
        }, {
            name: 'GROUP_DEVICES_SENSOR',
            type: 'array',
            callbackName: 'groupSensor'
        }]
    }
}, function(t) {//#(0)("Function 128 getActionFrom  favorite");
    'use strict';
    var d = function() {
            function m(E, g) {
                var y = [],
                    S = !0,
                    f = !1,
                    I = void 0;
                try {
                    for (var O = E[Symbol.iterator](), T; !(S = (T = O.next()).done) && (y.push(T.value), !(g && y.length === g)); S = !0);
                } catch (N) {
                    f = !0, I = N
                } finally {
                    try {
                        !S && O['return'] && O['return']()
                    } finally {
                        if (f) throw I
                    }
                }
                return y
            }
            return function(E, g) {
                if (Array.isArray(E)) return E;
                if (Symbol.iterator in Object(E)) return m(E, g);
                throw new TypeError('Invalid attempt to destructure non-iterable instance')
            }
        }(),
        u = 'LOAD_FAVORITE';
    t.exports = {
        LOAD_FAVORITE_ACTION_TYPE: u,
        getActionFrom: function(m) {
            if (m.startsWith('favorite:')) {
                var E = m.split(':');
                if (2 > E.length) throw new Error(m + ' is not a valid action identifier');
                var g = d(E, 2),
                    y = g[0],
                    S = g[1];
                return {
                    type: u,
                    identifier: S
                }
            }
            return p
        }
    };
    var p = {
        type: null
    }
}, function(t, r, o) {o(0)("Function 129").verbose("Sonos:SDK buildDevices");
    'use strict';

    function d(y) {
        p.switches.forEach(function(S) {
            y.addSwitch({
                name: S.name
            }, E[S.callbackName])
        }), p.sliders.forEach(function(S) {
            y.addSlider({
                name: S.name,
                label: S.label,
                unit: S.unit,
                range: S.range
            }, E[S.callbackName])
        }), p.sensors.forEach(function(S) {
            y.addSensor({
                name: S.name,
                type: S.type,
                unit: S.unit,
                range: S.range
            }, E[S.callbackName])
        })
    }
    var c = o(0)('Sonos:SDK'),
        u = o(3),
        p = o(127),
        m = o(133),
        E = m.build(),
        g = {
            name: 'Fbabf FQX',
            manufacturer: 'Fbabf',
            type: 'MUSICPLAYER',
            searchTokens: [],
            deviceCapabilities: ['alwaysOn', 'addAnotherDevice', 'groupVolume'],
            discoveryInstructions: {
                headerText: 'Dear User',
                description: 'This is just a dummy device to show some functions. There is nothing to see here, please press BACK.'
            },
            timing: !1,
            buttonList: p.buttons,
            playerControls: {
                fullScreenControls: !0,
                enableBrowsing: !0,
                rootDirectory: 'SONOS_ROOT_DIRECTORY'
            },
            controller: E,
            deviceSubscriptionHandler: E.getDeviceSubscriptionHandler()
        };
    t.exports = {
        buildDevices: function() {
            try {
                var y = u.buildSDKDevice(g).setIcon('SONOS').setSpecificName('Sonos').addDirectory({
                    name: 'SONOS_ROOT_DIRECTORY',
                    label: 'ROOT',
                    role: 'ROOT'
                }, E.browseRoot);
                return d(y), [y]
            } catch (S) {
                c.error('INITIALIZATION_FAILED', S.message)
            }
        }
    }
}, function(t) {//#o(0)("Function 130").verbose("Struct with rawQueueButtonsDefinitions");
    'use strict';
    t.exports = {
        rawQueueButtonsDefinitions: [{
            title: 'Clear',
            inverse: !0,
            actionIdentifier: 'QUEUE_CLEAR'
        }, {
            iconName: 'Repeat',
            actionIdentifier: 'QUEUE_REPEAT'
        }, {
            iconName: 'Shuffle',
            actionIdentifier: 'QUEUE_SHUFFLE'
        }]
    }
}, function(t, r, o) {o(0)("Function 131").verbose("Player implementations");
    'use strict';
    var c = o(47),
        u = c.NS_GROUPVOLUME,
        p = c.NS_PLAYBACK,
        m = c.NS_PLAYBACK_METADATA,
        E = c.NS_PLAYERVOLUME,
        S = function(I) {
            return I !== 'PLAYBACK_STATE_PAUSED' && I !== 'PLAYBACK_STATE_IDLE'
        };
    t.exports = {
        getSensorDefinitions: function() {
            return {
                PLAYING_SENSOR: {
                    namespace: p,
                    paths: [p + '.playbackState'],
                    postProcess: S
                },
                REPEAT_SENSOR: {
                    namespace: p,
                    paths: [p + '.playModes.repeat']
                },
                SHUFFLE_SENSOR: {
                    namespace: p,
                    paths: [p + '.playModes.shuffle']
                },
                MUTE_SENSOR: {
                    namespace: u,
                    paths: [u + '.muted']
                },
                VOLUME_SENSOR: {
                    namespace: E,
                    paths: [E + '.volume']
                },
                GROUP_VOLUME_SENSOR: {
                    namespace: u,
                    paths: [u + '.volume']
                },
                DESCRIPTION_LEFT_SENSOR: {
                    namespace: m,
                    paths: [m + '.currentItem.track.artist.name', m + '.streamInfo']
                },
                DESCRIPTION_RIGHT_SENSOR: {
                    namespace: m,
                    paths: [m + '.currentItem.track.album.name']
                },
                COVER_ART_SENSOR: {
                    namespace: m,
                    paths: [m + '.currentItem.track.imageUrl'],
                    defaultValue: ''
                },
                TITLE_SENSOR: {
                    namespace: m,
                    paths: [m + '.currentItem.track.name', m + '.container.name'],
                    defaultValue: 'No information'
                }
            }
        },
        getCombinedSensorDefinitions: function() {
            return {
                DESCRIPTION_SENSOR: {
                    sensors: ['DESCRIPTION_LEFT_SENSOR', 'DESCRIPTION_RIGHT_SENSOR'],
                    defaultValue: 'No information'
                }
            }
        }
    }
}, function(t, r, o) {o(0)("Function 132").verbose(" o lcue at all.");
    'use strict';

    function n(U) {
        if (Array.isArray(U)) {
            for (var k = 0, F = Array(U.length); k < U.length; k++) F[k] = U[k];
            return F
        }
        return Array.from(U)
    }

    function d(U, k) {
        return u(k) ? p(U, k) : m(U, k)
    }

    function u(U) {
        return !w(f()[U])
    }

    function p(U, k) {
        var F = f()[k],
            M = F.sensors,
            x = F.defaultValue,
            B = M.map(function(V) {
                return m(U, V)
            }).filter(function(V) {
                return V && '' !== V
            }).join(', ');
        return '' === B ? x : B
    }

    function m(U, k) {
        var F = y(k);
        if (!F) throw new Error('SENSOR_UNKNOWN ' + k);
        var M = E(F, U);
        return F.postProcess ? F.postProcess(M) : M
    }

    function E(U, k) {
        var F = U.paths.find(function(x) {
                return g(k, x)
            }),
            M = R(k, F);
        return w(M) ? U.defaultValue : M
    }

    function g(U, k) {
        return !w(R(U, k))
    }

    function y(U) {
        return S()[U]
    }

    function S() {
        return L.getSensorDefinitions()
    }

    function f() {
        return L.getCombinedSensorDefinitions()
    }

    function I(U) {
        return f()[U]
    }

    function T() {
        return Object.keys(S()).map(function(U) {
            var k = y(U),
                F = k.namespace,
                M = k.path,
                x = k.postProcess;
            return {
                sensorId: U,
                namespace: F,
                path: M,
                postProcess: x
            }
        })
    }

    function N(U) {
        var k = U.map(function(F) {
            var M = F.sensorId;
            return C(M)
        }).filter(function(F) {
            return F
        });
        return P(k, function(F) {
            return F.sensorId
        })
    }

    function A(U) {
        return U.filter(function(k) {
            var F = k.sensorId;
            return !C(F)
        })
    }

    function C(U) {
        return Object.keys(f()).map(function(k) {
            return {
                sensorId: k,
                sensorIds: f()[k].sensors
            }
        }).find(function(k) {
            var F = k.sensorIds;
            return F.includes(U)
        })
    }
    var R = o(188),
        P = o(192),
        w = o(189),
        L = o(131);
    t.exports = {
        getSensorValue: d,
        getSensorDefaultValue: function(U) {
            var k = u(U) ? I(U) : y(U);
            return k ? k.defaultValue : void 0
        },
        getSensorsFor: function(U) {
            var k = T().filter(function(F) {
                return F.namespace === U
            });
            return [].concat(n(N(k)), n(A(k)))
        },
        getSensorDiff: function(U, k, F) {
            return {
                before: d(U, F),
                after: d(k, F)
            }
        }
    }
}, function(t, r, o) {o(0)("Function 133").verbose("Sensor Sonos:SDK:Controler neeo:internaladapter:sonos:SonosController");
    'use strict';

    function n(D, R) {
        if (!(D instanceof R)) throw new TypeError('Cannot call a class as a function')
    }

    function d(D, R) {
        if (!D) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return R && ('object' == typeof R || 'function' == typeof R) ? R : D
    }

    function c(D, R) {
        if ('function' != typeof R && null !== R) throw new TypeError('Super expression must either be null or a function, not ' + typeof R);
        D.prototype = Object.create(R && R.prototype, {
            constructor: {
                value: D,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), R && (Object.setPrototypeOf ? Object.setPrototypeOf(D, R) : D.__proto__ = R)
    }

    function u(D) {
        return {
            id: D.uuid,
            name: D.groupName
        }
    }
    var p = function() {
            function D(R, P) {
                var w = [],
                    L = !0,
                    U = !1,
                    k = void 0;
                try {
                    for (var F = R[Symbol.iterator](), M; !(L = (M = F.next()).done) && (w.push(M.value), !(P && w.length === P)); L = !0);
                } catch (x) {
                    U = !0, k = x
                } finally {
                    try {
                        !L && F['return'] && F['return']()
                    } finally {
                        if (U) throw k
                    }
                }
                return w
            }
            return function(R, P) {
                if (Array.isArray(R)) return R;
                if (Symbol.iterator in Object(R)) return D(R, P);
                throw new TypeError('Invalid attempt to destructure non-iterable instance')
            }
        }(),
        m = function() {
            function D(R, P) {
                for (var w = 0, L; w < P.length; w++) L = P[w], L.enumerable = L.enumerable || !1, L.configurable = !0, 'value' in L && (L.writable = !0), Object.defineProperty(R, L.key, L)
            }
            return function(R, P, w) {
                return P && D(R.prototype, P), w && D(R, w), R
            }
        }(),
        E = o(2)('neeo:internaladapter:sonos:SonosController'),
        g = o(1),
        y = o(195),
        S = o(0)('Sonos:SDK:Controler'),
        f = o(3).DeviceController,
        I = o(126),
        O = o(124),
        T = o(128),
        N = o(130),
        C = '_SENSOR';
    t.exports = function(D) {
        function R() {
            n(this, R);
            var P = d(this, (R.__proto__ || Object.getPrototypeOf(R)).call(this));
            return P._notificationsEnabled = !0, P._loadedDeviceIds = [], P.playSwitch = P._getSwitchCallbacks('PLAYING'), P.muteSwitch = P._getSwitchCallbacks('MUTE'), P.shuffleSwitch = P._getSwitchCallbacks('SHUFFLE'), P.repeatSwitch = P._getSwitchCallbacks('REPEAT'), P.volumeSlider = P._getSliderCallbacks('VOLUME'), P.groupVolumeSlider = P._getSliderCallbacks('GROUP_VOLUME'), P.coverArtSensor = P._getSensorCallbacks('COVER_ART_SENSOR'), P.titleSensor = P._getSensorCallbacks('TITLE_SENSOR'), P.descriptionSensor = P._getSensorCallbacks('DESCRIPTION_SENSOR'), P.groupSensor = {
                getter: function(L) {
                    return P.sonosService.getGroupPlayerIds(L)
                }
            }, P.browseRoot = P._getBrowseRootCallbacks(), P
        }
        return c(R, D), m(R, [{
            key: '_getSwitchCallbacks',
            value: function(w) {
                var L = this;
                return {
                    setter: function(k, F) {
                        return L.sonosService.setSwitch(k, w, F)
                    },
                    getter: function(k) {
                        return L.sonosService.getSensorValue(k, w + C)
                    }
                }
            }
        }, {
            key: '_getSliderCallbacks',
            value: function(w) {
                var L = this;
                return {
                    setter: function(k, F) {
                        return L.sonosService.setSlider(k, w, F)
                    },
                    getter: function(k) {
                        return L.sonosService.getSensorValue(k, w + C)
                    }
                }
            }
        }, {
            key: '_getSensorCallbacks',
            value: function(w) {
                var L = this;
                return {
                    getter: function(k) {
                        return L.sonosService.getSensorValue(k, w)
                    }
                }
            }
        }, {
            key: 'onButtonPressed',
            value: function(w, L) {
                return w === 'POWER ON' ? void 0 : this.sonosService.trigger(L, w).catch(function(U) {
                    return S.debug('BUTTON_PRESSED_FAILED', {
                        action: w,
                        deviceId: L,
                        msg: U.message,
                        stack: U.stack
                    })
                })
            }
        }, {
            key: 'discover',
            value: function() {
                return this.sonosService ? (S.debug('DISCOVERY_START'), this.sonosService.discover().then(function(w) {
                    return S.debug('DISCOVERY_DONE', {
                        players: w
                    }), w.map(u)
                }).catch(function(w) {
                    return S.error('DISCOVERY_FAILED', w.message), []
                })) : g.reject(new Error('SONOS_SERVICE_NOT_INITIALIZED'))
            }
        }, {
            key: 'initialize',
            value: function() {
                var w = this;
                return this.initializePromise ? (S.debug('INITIALIZED_ALREADY'), this.initializePromise) : (S.debug('INITIZATION_START'), this.initializePromise = O.build().then(function(L) {
                    w.sonosService = L, w._initializeConnectionWith(w._loadedDeviceIds), w.sonosService.on('sensorUpdate', function(U, k, F) {
                        w.sendBrainNotification(U, k, F)
                    }), S.debug('INITIALIZATION_DONE')
                }).catch(function(L) {
                    throw S.error('INITIALIZATION_FAILED', L.message), new Error('SONOS_CONTROLLER_INITIALIZE_FAILED')
                }), this.initializePromise)
            }
        }, {
            key: 'getPowerState',
            value: function(w) {
                S.error('NOT_YET_IMPLEMENTED', {
                    function: 'getPowerState',
                    deviceId: w
                })
            }
        }, {
            key: 'getDeviceSubscriptionHandler',
            value: function() {
                var w = this;
                return {
                    deviceAdded: function(U) {
                        return w._initializeConnectionWith([U])
                    },
                    deviceRemoved: function(U) {
                        return w.sonosService.closeConnectionWith(U)
                    },
                    initializeDeviceList: function(U) {
                        S.debug('SONOS_INITIALIZE_DEVICES', U), w._loadedDeviceIds = U, 0 < U.length && w.initialize()
                    }
                }
            }
        }, {
            key: '_initializeConnectionWith',
            value: function(w) {
                var L = this;
                w.forEach(function(U) {
                    return L.sonosService.getOrCreateConnectionToCoordinatorOf(U).catch(function(k) {
                        S.debug('SONOS_INITIALZE_CONNECTION_FAILED', {
                            deviceId: U,
                            msg: k.message
                        })
                    })
                })
            }
        }, {
            key: '_getBrowseRootCallbacks',
            value: function() {
                var w = this;
                return {
                    getter: function(U) {
                        var k = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                            F = !k.browseIdentifier,
                            M = F ? w._getSonosRootDirectory(U) : w._processGet(U, k);
                        return M.catch(function(x) {
                            S.error('SONOS_SDK_LIST_BUILD_ERROR', {
                                function: '_browseRoot',
                                error: x.message
                            })
                        })
                    },
                    action: function(U, k) {
                        var F = k.actionIdentifier;
                        return w._processAction(U, F)
                    }
                }
            }
        }, {
            key: '_getBrowseQueueCallbacks',
            value: function(w) {
                var L = this,
                    U = {
                        browseIdentifier: w
                    };
                return {
                    getter: function(F) {
                        return L._processQueueGet(F, U)
                    },
                    action: function(F, M) {
                        var x = M.actionIdentifier;
                        return L._processAction(F, x)
                    }
                }
            }
        }, {
            key: '_processQueueGet',
            value: function(w, L) {
                return this._processGet(w, L).then(function(U) {
                    return y.buildBrowseList(U._meta.current).addListButtons(N.rawQueueButtonsDefinitions).addListItems(U.items)
                })
            }
        }, {
            key: '_processGet',
            value: function(w, L) {
                if (L.browseIdentifier === I.MY_SONOS_IDENTIFIER) return this._getAllFavoriteItems(w).then(function(U) {
                    return I.getFavoritesList({
                        favoriteItems: U
                    })
                })
            }
        }, {
            key: '_processAction',
            value: function(w, L) {
                var U = T.getActionFrom(L),
                    k = U.type,
                    F = U.identifier;
                return k === T.LOAD_FAVORITE_ACTION_TYPE ? this.sonosService.playFavorite(w, F) : (E('ACTION_NOT_IMPLEMENTED %o', {
                    deviceId: w,
                    actionIdentifier: L
                }), g.reject(new Error('Not implemented yet!')))
            }
        }, {
            key: '_getSonosRootDirectory',
            value: function(w) {
                return this._getAllFavoriteItems(w).then(function(L) {
                    return I.getRootListFrom(L)
                })
            }
        }, {
            key: '_getAllFavoriteItems',
            value: function(w) {
                return this.sonosService.getAllFavorites(w).then(function(L) {
                    var U = p(L, 2),
                        k = U[0],
                        F = U[1];
                    return F.items
                })
            }
        }, {
            key: 'sendBrainNotification',
            value: function(w, L, U) {
                this._notifyBrain({
                    uniqueDeviceId: w,
                    component: L,
                    value: U
                }).catch(function(k) {
                    E('NOTIFICATION_FAILED', k.message)
                })
            }
        }, {
            key: 'setNotificationCallbacks',
            value: function(w, L) {
                this._notifyBrain = w, this._optionalNotification = L
            }
        }], [{
            key: 'build',
            value: function() {
                return new R
            }
        }]), R
    }(f)
}, function(t, r, o) {o(0)("Function 134").verbose("neeo:virtualSwitch:controller");
    'use strict';

    function n(I, O) {
        if (!(I instanceof O)) throw new TypeError('Cannot call a class as a function')
    }

    function d(I, O) {
        if (!I) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return O && ('object' == typeof O || 'function' == typeof O) ? O : I
    }

    function c(I, O) {
        if ('function' != typeof O && null !== O) throw new TypeError('Super expression must either be null or a function, not ' + typeof O);
        I.prototype = Object.create(O && O.prototype, {
            constructor: {
                value: I,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), O && (Object.setPrototypeOf ? Object.setPrototypeOf(I, O) : I.__proto__ = O)
    }

    function u(I) {
        return Array(I).fill(0).map(function(O, T) {
            var N = T + 1;
            return {
                id: N.toString(),
                name: 'Virtual Switch ' + N
            }
        })
    }
    var p = function() {
            function I(O, T) {
                for (var N = 0, A; N < T.length; N++) A = T[N], A.enumerable = A.enumerable || !1, A.configurable = !0, 'value' in A && (A.writable = !0), Object.defineProperty(O, A.key, A)
            }
            return function(O, T, N) {
                return T && I(O.prototype, T), N && I(O, N), O
            }
        }(),
        m = o(0)('neeo:virtualSwitch:controller'),
        E = o(1),
        g = o(3),
        y = g.DeviceController;
    t.exports = function(I) {
        function O() {
            n(this, O);
            var T = d(this, (O.__proto__ || Object.getPrototypeOf(O)).call(this));
            return T._notificationsEnabled = !0, T._state = new Map, T.powerSwitchHandler = {
                setter: function() {
                    return T.setPowerState.apply(T, arguments)
                },
                getter: function() {
                    return T.getPowerState.apply(T, arguments)
                }
            }, T
        }
        return c(O, I), p(O, [{
            key: 'initialize',
            value: function() {
                return E.resolve()
            }
        }, {
            key: 'discover',
            value: function() {
                var N = u(5);
                return E.resolve(N)
            }
        }, {
            key: 'onButtonPressed',
            value: function(N, A) {
                return 'POWER ON' === N ? this.setPowerState(A, !0) : 'POWER OFF' === N ? this.setPowerState(A, !1) : (m.debug('unknown virtual switch action', N), E.resolve())
            }
        }, {
            key: 'setPowerState',
            value: function(N, A) {
                return m.debug('set power state', N, A), this._state.set(N, A), this._sendBrainNotification(N, 'POWER_SENSOR', A), E.resolve()
            }
        }, {
            key: 'getPowerState',
            value: function(N) {
                return m.debug('set power state', N), E.resolve(this._state.get(N))
            }
        }, {
            key: '_sendBrainNotification',
            value: function(N, A, C) {
                this._notifyBrain({
                    uniqueDeviceId: N,
                    component: A,
                    value: C
                }).catch(function(D) {
                    m.debug('NOTIFICATION_FAILED', D.message)
                })
            }
        }, {
            key: 'setNotificationCallbacks',
            value: function(N) {
                this._notifyBrain = N
            }
        }], [{
            key: 'build',
            value: function() {
                return new O
            }
        }]), O
    }(y)
}, function(t, r, o) {o(0)("Function 135").verbose("neeo:virtualSwitch");
    'use strict';
    var d = o(3),
        c = o(134),
        u = o(0)('neeo:virtualSwitch'),
        p = {
            name: 'power',
            label: 'Power'
        },
        m = c.build(),
        E = {
            name: 'Virtual Switch',
            manufacturer: 'NEEO',
            type: 'ACCESSORY',
            searchTokens: [],
            deviceCapabilities: ['addAnotherDevice'],
            discoveryInstructions: {
                headerText: 'Virtual Switches',
                description: 'A virtual switch allows you to toggle a switch and  trigger recipes when it\u2019s state changes.\nDifferent switches can be used independently.'
            },
            timing: !1,
            buttonList: [],
            controller: m
        };
    t.exports = {
        buildDevices: function() {
            try {
                var g = d.buildSDKDevice(E);
                return g.addSwitch(p, m.powerSwitchHandler), g.setSpecificName('Virtual Switch'), [g]
            } catch (y) {
                u.error('INITIALIZATION_FAILED', y.message)
            }
        }
    }
}, function(t, r, o) {o(0)("Function 136").verbose("neeo:wemo:controller / wemo-handler");
    'use strict';

    function n(T, N) {
        if (!(T instanceof N)) throw new TypeError('Cannot call a class as a function')
    }

    function d(T, N) {
        if (!T) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return N && ('object' == typeof N || 'function' == typeof N) ? N : T
    }

    function c(T, N) {
        if ('function' != typeof N && null !== N) throw new TypeError('Super expression must either be null or a function, not ' + typeof N);
        T.prototype = Object.create(N && N.prototype, {
            constructor: {
                value: T,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), N && (Object.setPrototypeOf ? Object.setPrototypeOf(T, N) : T.__proto__ = N)
    }
    var u = function() {
            function T(N, A) {
                for (var C = 0, D; C < A.length; C++) D = A[C], D.enumerable = D.enumerable || !1, D.configurable = !0, 'value' in D && (D.writable = !0), Object.defineProperty(N, D.key, D)
            }
            return function(N, A, C) {
                return A && T(N.prototype, A), C && T(N, C), N
            }
        }(),
        p = o(1),
        m = o(0)('neeo:wemo:controller'),
        E = o(3),
        g = o(137),
        y = E.DeviceController,
        S = E.Subscriptions,
        f = null,
        O = {
            power: 'POWER_SENSOR'
        };
    t.exports = function(T) {
        function N() {
            n(this, N);
            var A = d(this, (N.__proto__ || Object.getPrototypeOf(N)).call(this));
            return A._initializationPromise = void 0, A._notificationsEnabled = !0, A._subscriptions = S.build(), A._service = g.build(), A.powerSwitchHandler = {
                setter: function() {
                    return A.setPowerState.apply(A, arguments)
                },
                getter: function() {
                    return A.getPowerState.apply(A, arguments)
                }
            }, A
        }
        return c(N, T), u(N, [{
            key: 'initialize',
            value: function() {
                var C = this;
                return this._initializationPromise ? this._initializationPromise : (m.debug('INITIALIZING_WEMO'), this._initializationPromise = p.resolve().then(function() {
                    C._service.on('update', function() {
                        return C._handleStateUpdate.apply(C, arguments)
                    }), m.debug('INITIALIZATION_DONE')
                }).catch(function(D) {
                    return m.error('INITIALIZATION_FAILED', D.message), p.reject(new Error('WEMO_CONTROLLER_INITIALIZE_FAILED'))
                }), this._initializationPromise)
            }
        }, {
            key: 'discover',
            value: function() {
                var C = this;
                return m.debug('START_WEMO_DISCOVERY'), this._service.discoverDevices(this._service.isSwitch).then(function() {
                    return C._service.getDiscoveredDevices()
                }).finally(function() {
                    return m.debug('FINISHED_WEMO_DISCOVERY')
                })
            }
        }, {
            key: 'onButtonPressed',
            value: function(C, D) {
                return 'POWER ON' === C ? this.setPowerState(D, !0) : 'POWER OFF' === C ? this.setPowerState(D, !1) : 'POWER TOGGLE' === C ? this._service.togglePowerState(D) : (m.debug('unknown wemo action', C, D), p.resolve())
            }
        }, {
            key: 'setPowerState',
            value: function(C, D) {
                return this._service.setPowerState(C, D)
            }
        }, {
            key: 'getPowerState',
            value: function(C) {
                return this._service.getPowerState(C)
            }
        }, {
            key: '_sendBrainNotification',
            value: function(C, D, R) {
                var P = !this._subscriptions.isSubscribed(C);
                return P ? p.resolve() : void this._notifyBrain({
                    uniqueDeviceId: C,
                    component: D,
                    value: R
                }).catch(function(w) {
                    m.debug('NOTIFICATION_FAILED', w.message)
                })
            }
        }, {
            key: '_sendBrainPowerStateNotification',
            value: function(C, D) {
                var R = !this._subscriptions.isSubscribed(C);
                return R ? p.resolve() : D ? this._markDeviceOn(C) : this._markDeviceOff(C)
            }
        }, {
            key: 'setNotificationCallbacks',
            value: function(C, D) {
                this._notifyBrain = C, D && D.powerOnNotificationFunction && (this._markDeviceOn = D.powerOnNotificationFunction), D && D.powerOffNotificationFunction && (this._markDeviceOff = D.powerOffNotificationFunction)
            }
        }, {
            key: 'getDeviceSubscriptionHandler',
            value: function() {
                var C = this;
                return {
                    deviceAdded: function(R) {
                        return m.debug('DEVICE_SUBSCRIPTION_ADDED', {
                            deviceId: R
                        }), C._subscriptions.add(R), C.initialize().then(function() {
                            return C._service.startBackgroundDiscovery()
                        }).catch(function(P) {
                            return m.debug('INITIALIZATION_FAILED', {
                                msg: P.message
                            })
                        }), f
                    },
                    deviceRemoved: function(R) {
                        m.debug('DEVICE_SUBSCRIPTION_REMOVED', {
                            deviceId: R
                        }), C._subscriptions.remove(R), 0 === C._subscriptions.count() && (m.debug('DEVICE_SUBSCRIPTION_EMPTY_STOP_WATCH'), C._service.stopBackgroundDiscovery())
                    },
                    initializeDeviceList: function(R) {
                        if (m.debug('DEVICES_SUBSCRIPTIONS_INITIALIZED', {
                                deviceIds: R
                            }), C._subscriptions.resetWith(R), 0 < C._subscriptions.count()) return C.initialize().then(function() {
                            return C._service.startBackgroundDiscovery()
                        }).catch(function(P) {
                            return m.debug('INITIALIZATION_FAILED', {
                                msg: P.message
                            })
                        }), f
                    }
                }
            }
        }, {
            key: '_handleStateUpdate',
            value: function(C, D, R) {
                var P = O[D];
                return P ? void(this._sendBrainNotification(C, P, R), P === 'POWER_SENSOR' && this._sendBrainPowerStateNotification(C, R)) : void m.debug('UNKNOWN_STATE_UPDATE', {
                    deviceId: C,
                    key: D,
                    value: R
                })
            }
        }], [{
            key: 'build',
            value: function() {
                return new N
            }
        }]), N
    }(y)
}, function(t, r, o) {o(0)("Function 137").verbose("neeo:wemo:service BackgroundDiscovery");
    'use strict';

    function n(k, F) {
        if (!(k instanceof F)) throw new TypeError('Cannot call a class as a function')
    }

    function d(k, F) {
        if (!k) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return F && ('object' == typeof F || 'function' == typeof F) ? F : k
    }

    function c(k, F) {
        if ('function' != typeof F && null !== F) throw new TypeError('Super expression must either be null or a function, not ' + typeof F);
        k.prototype = Object.create(F && F.prototype, {
            constructor: {
                value: k,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), F && (Object.setPrototypeOf ? Object.setPrototypeOf(k, F) : k.__proto__ = F)
    }

    function u(k) {
        return parseInt(k, 10) !== P
    }

    function p(k) {
        var F = k.clientObject;
        return {
            id: k.id,
            name: F.friendlyName,
            room: F.modelName + ' ' + F.modelNumber,
            reachable: k.reachable
        }
    }
    var m = function() {
            function k(F, M) {
                for (var x = 0, B; x < M.length; x++) B = M[x], B.enumerable = B.enumerable || !1, B.configurable = !0, 'value' in B && (B.writable = !0), Object.defineProperty(F, B.key, B)
            }
            return function(F, M, x) {
                return M && k(F.prototype, M), x && k(F, x), F
            }
        }(),
        E = o(1),
        g = o(10),
        y = o(0)('neeo:wemo:service'),
        S = o(139),
        f = o(3),
        N = !0,
        D = S.DEVICE_TYPE,
        P = 0,
        w = {
            POWER: 'power'
        },
        L = [/ECONNREFUSED/i, /EHOSTDOWN/i, /ESOCKETTIMEDOUT/i],
        U = function(k) {
            function F() {
                n(this, F);
                var M = d(this, (F.__proto__ || Object.getPrototypeOf(F)).call(this));
                return M._wemo = S.build(), M._discoverScanPromise = void 0, M._devices = f.buildDeviceState(), M.isSwitch = function(x) {
                    return [D.Switch, D.Insight, D.LightSwitch].includes(x.deviceType)
                }, M
            }
            return c(F, k), m(F, [{
                key: 'startBackgroundDiscovery',
                value: function() {
                    var x = this;
                    if (!this._discoveryInterval) {
                        var B = function() {
                            y.debug('BACKGROUND_DISCOVERY_START'), x.discoverDevices().then(function() {
                                y.debug('BACKGROUND_DISCOVERY_FINISHED')
                            }).catch(function(G) {
                                y.debug('BACKGROUND_DISCOVERY_ERROR', {
                                    msg: G.message
                                })
                            })
                        };
                        return this._discoveryInterval = setInterval(B, 1.2e5), setTimeout(B, 0), null
                    }
                }
            }, {
                key: 'stopBackgroundDiscovery',
                value: function() {
                    this._discoveryInterval && (clearInterval(this._discoveryInterval), this._discoveryInterval = void 0)
                }
            }, {
                key: 'getDiscoveredDevices',
                value: function() {
                    var x = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : function() {
                        return !0
                    };
                    return this._devices.getAllDevices().filter(x).map(p)
                }
            }, {
                key: 'discoverDevices',
                value: function() {
                    var x = this;
                    if (this._discoverScanPromise) return y.debug('DEVICE_DISCOVERY_ALREADY_RUNNING'), this._discoverScanPromise;
                    var B = Date.now();
                    return this._wemo.discover(function(V, G) {
                        if (V) return void y.error('DEVICE_DISCOVERY_ERROR', {
                            msg: V.message
                        });
                        var W = G.serialNumber,
                            H = {
                                deviceId: W,
                                name: G.friendlyName,
                                ip: G.host,
                                discoverAfterMs: Date.now() - B
                            };
                        x._devices.isDeviceRegistered(W) ? (y.debug('DEVICE_DISCOVERED_KNOWN', H), x._devices.isReachable(W, N)) : (y.debug('DEVICE_DISCOVERED_NEW', H), x._registerNewDevice(G))
                    }), this._discoverScanPromise = E.delay(8e3).then(function() {
                        return x._discoverScanPromise = void 0
                    }), this._discoverScanPromise
                }
            }, {
                key: '_registerNewDevice',
                value: function(x) {
                    var B = x.serialNumber,
                        V = this._wemo.client(x),
                        G = Object.assign({
                            client: V
                        }, x);
                    this._devices.addDevice(B, G, N), this._watchDevice(G)
                }
            }, {
                key: 'getPowerState',
                value: function(x) {
                    var B = this;
                    return this._getDevice(x).then(function(V) {
                        return E.fromCallback(function(G) {
                            V.client.getBinaryState(G)
                        })
                    }).then(function(V) {
                        var G = u(V);
                        return y.debug('GET_POWER_STATE', {
                            deviceId: x,
                            powerState: G,
                            rawPowerState: V
                        }), G
                    }).catch(function(V) {
                        return B._setDeviceUnreachableIfNeededFor(x, V), E.reject(V)
                    })
                }
            }, {
                key: 'setPowerState',
                value: function(x, B) {
                    var V = this;
                    return this._getDevice(x).then(function(G) {
                        return E.fromCallback(function(W) {
                            B ? G.client.setBinaryState(1, W) : G.client.setBinaryState(P, W)
                        }).catch(function(W) {
                            return V._setDeviceUnreachableIfNeededFor(x, W), E.reject(W)
                        })
                    })
                }
            }, {
                key: 'togglePowerState',
                value: function(x) {
                    var B = this;
                    return this.getPowerState(x).then(function(V) {
                        return B.setPowerState(x, !V)
                    })
                }
            }, {
                key: '_getDevice',
                value: function(x) {
                    var B = this;
                    return new E(function(V, G) {
                        var W = B._devices.getClientObjectIfReachable(x);
                        return W ? void V(W) : G(new Error(x + ' is not reachable'))
                    })
                }
            }, {
                key: '_watchDevice',
                value: function(x) {
                    var B = this,
                        V = x.serialNumber;
                    x.client.on('binaryState', function(G) {
                        var W = u(G);
                        y.debug('NOTIFICATION_POWERSTATE', {
                            deviceId: V,
                            name: x.friendlyName,
                            powerState: W,
                            rawPowerState: G
                        }), B.emit('update', V, w.POWER, W)
                    }), x.client.on('error', function(G) {
                        y.error('DEVICE_ERROR', {
                            msg: G.message,
                            code: G.code
                        }), B._setDeviceUnreachableIfNeededFor(V, G)
                    })
                }
            }, {
                key: '_setDeviceUnreachableIfNeededFor',
                value: function(x, B) {
                    var V = L.some(function(G) {
                        return null !== B.message.match(G)
                    });
                    V && this._devices.updateReachable(x, !1)
                }
            }], [{
                key: 'build',
                value: function() {
                    return new F
                }
            }]), F
        }(g);
    U.EVENTS = Object.assign({}, w), t.exports = U
}, function(t, r, o) {o(0)("Function 138").verbose("discover wemo-devices ");
    'use strict';
    var d = o(3),
        c = o(136),
        u = o(0)('neeo:wemo'),
        p = {
            name: 'power',
            label: 'Power'
        },
        m = c.build(),
        E = {
            name: 'Wemo',
            manufacturer: 'Belkin',
            type: 'LIGHT',
            searchTokens: ['Insight', 'Smart', 'Mini', 'Switch', 'Plug'],
            deviceCapabilities: ['addAnotherDevice'],
            discoveryInstructions: {
                headerText: 'Network discovery',
                description: 'NEEO will look for Wemo switches on the same network as the Brain\nWemo Insight, Smart Mini and wall switches are currently supported'
            },
            timing: !1,
            buttonList: [{
                name: 'POWER TOGGLE',
                label: 'Power Toggle'
            }],
            controller: m,
            deviceSubscriptionHandler: m.getDeviceSubscriptionHandler()
        };
    t.exports = {
        buildDevices: function() {
            try {
                var g = d.buildSDKDevice(E);
                return g.addSwitch(p, m.powerSwitchHandler), g.addPowerStateSensor(m.powerSwitchHandler), [g]
            } catch (y) {
                u.error('INITIALIZATION_FAILED', y.message)
            }
        }
    }
}, function(t, r, o) {o(0)("Function 139").verbose("determine device_type");
    'use strict';
    var d = o(211);
    t.exports = {
        build: function(c) {
            return new d(c)
        },
        DEVICE_TYPE: d.DEVICE_TYPE
    }
}, function(t, r, o) {o(0)("Function 140").verbose("neeo:lib:manager getadapter");
    'use strict';
    var n = o(2)('neeo:lib:manager'),
        d = {
            hue: o(23),
            sonos: o(27),
            zwave: o(28)
        },
        c = o(14),
        u = /^apt-/;
    r.getAdapter = function(p) {
        if (!p) throw new Error('missing adapter name');
        if (u.test(p)) return n('INTERNAL_SDK_ADAPTER_REQUESTED', p), c.getAdapter(p);
        if (!d[p]) throw new Error('no such adapter: ' + p);
        return d[p]
    }
}, function(t, r, o) {o(0)("Function 141").verbose("main function  send notification ");
    'use strict';
    var n = o(142),
        d = o(5).notification;
    t.exports = new n(d)
}, function(t, r, o) {o(0)("Function 142").verbose("Send notifications");
    'use strict';
    var n = o(0)('Notification'),
        d = o(61),
        c = o(32),
        u = new c.Agent({
            maxSockets: 1,
            keepAlive: !0,
            keepAliveMsecs: 16000
        }),
        p = o(6).getInstance(),
        m = t.exports = function(E) {
            n.debug('init', E), this.queueSize = 0, this.maxQueueSize = E.maxQueueSize, this.requestOptions = {
                uri: 'http://' + E.hostname + ':' + E.port + '/v1/notifications',
                method: 'POST',
                pool: u,
                headers: {
                    "Content-Type": 'application/json'
                }
            }
        };
    m.prototype.send = function(E, g) {
        var y = this;
        return E ? this.queueSize >= this.maxQueueSize ? void n.warn('MAX_QUEUESIZE_REACHED', this.maxQueueSize) : void(n.debug('sending:', E), this.queueSize++, this.requestOptions.json = E, d(this.requestOptions, function(S, f) {
            var I = f ? f.statusCode : -1;
            0 < y.queueSize && y.queueSize--, S || 200 !== I ? p.increaseCounter('SEND_NOTIFICATION_FAILED') : p.increaseCounter('SEND_NOTIFICATION_SUCCEEDED'), g && g(S, f)
        })) : void n.debug('empty notification ignored')
    }
}, function(t, r, o) {o(0)("Function 143").verbose("neeo:deviceadapter:sdk:devicecontroller");
    'use strict';

    function n(p, m) {
        if (!(p instanceof m)) throw new TypeError('Cannot call a class as a function')
    }
    var d = function() {
            function p(m, E) {
                for (var g = 0, y; g < E.length; g++) y = E[g], y.enumerable = y.enumerable || !1, y.configurable = !0, 'value' in y && (y.writable = !0), Object.defineProperty(m, y.key, y)
            }
            return function(m, E, g) {
                return E && p(m.prototype, E), g && p(m, g), m
            }
        }(),
        c = o(1),
        u = o(2)('neeo:deviceadapter:sdk:devicecontroller');
    t.exports = function() {
        function p() {
            n(this, p), this._notifyBrain = function() {
                return c.reject(new Error('NOT INITIALIZED'))
            }, this._markDeviceOn = function() {
                return u('MARKDEVICEON NOT INITIALIZED')
            }, this._markDeviceOff = function() {
                return u('MARKDEVICEOFF NOT INITIALIZED')
            }, this._notificationsEnabled = !1
        }
        return d(p, [{
            key: 'initialize',
            value: function() {}
        }, {
            key: 'onButtonPressed',
            value: function(E, g) {
                throw new Error('onButtonPressed not implemented ' + E + ' ' + g)
            }
        }, {
            key: 'discover',
            value: function() {
                throw new Error('discover not implemented')
            }
        }, {
            key: 'getPowerState',
            value: function(E) {
                throw new Error('getPowerState not implemented ' + E)
            }
        }, {
            key: 'hasNotificationSupport',
            value: function() {
                return this._notificationsEnabled
            }
        }, {
            key: 'setNotificationCallbacks',
            value: function(E, g) {
                throw new Error('brainNotification not implemented ' + E + ' ' + g)
            }
        }], [{
            key: 'build',
            value: function() {
                return new p
            }
        }]), p
    }()
}, function(t, r, o) {o(0)("Function 144").verbose("neeo:deviceadapter:sdk:subscriptions");
    'use strict';

    function n(p) {
        if (Array.isArray(p)) {
            for (var m = 0, E = Array(p.length); m < p.length; m++) E[m] = p[m];
            return E
        }
        return Array.from(p)
    }

    function d(p, m) {
        if (!(p instanceof m)) throw new TypeError('Cannot call a class as a function')
    }
    var c = function() {
            function p(m, E) {
                for (var g = 0, y; g < E.length; g++) y = E[g], y.enumerable = y.enumerable || !1, y.configurable = !0, 'value' in y && (y.writable = !0), Object.defineProperty(m, y.key, y)
            }
            return function(m, E, g) {
                return E && p(m.prototype, E), g && p(m, g), m
            }
        }(),
        u = o(2)('neeo:deviceadapter:sdk:subscriptions');
    t.exports = function() {
        function p() {
            d(this, p), this._subscriptions = []
        }
        return c(p, [{
            key: 'add',
            value: function(E) {
                this._subscriptions = [].concat(n(this._subscriptions), [E]), u('subscription added, %o', this._subscriptions)
            }
        }, {
            key: 'remove',
            value: function(E) {
                var g = this._subscriptions.indexOf(E);
                this._subscriptions = this._subscriptions.filter(function(y, S) {
                    return S !== g
                }), u('subscription removed, %o', this._subscriptions)
            }
        }, {
            key: 'resetWith',
            value: function(E) {
                this._subscriptions = E.filter(function(g) {
                    return g
                }), u('subscriptions reset, %o', this._subscriptions)
            }
        }, {
            key: 'isSubscribed',
            value: function(E) {
                return this._subscriptions.includes(E.toString())
            }
        }, {
            key: 'count',
            value: function() {
                return this._subscriptions.length
            }
        }], [{
            key: 'build',
            value: function() {
                return new p
            }
        }]), p
    }()
}, function(t, r, o) {o(0)("Function 145").verbose("sonos adapter");
    'use strict';
    var n = o(1),
        d = o(193),
        c = o(0)('sonos-adapter'),
        u = o(6),
        p = o(155),
        m = o(50),
        E = o(149),
        g = o(52),
        y = o(51),
        f = t.exports = function(I) {
            this.discovery = I.discovery, this.listLimit = I.listLimit, this.repo = I.repo, g.setRepo(this.repo)
        };
    f.prototype.pauseAll = function() {
        c.debug('pauseall'), d(this.discovery.players).forEach(function(I) {
            c.debug('pausing', I.roomName), I.pause()
        })
    }, f.prototype.resumeAll = function() {
        c.debug('resumeall'), d(this.discovery.players).forEach(function(I) {
            c.debug('resume', I.roomName), I.play()
        })
    }, f.prototype._getPlayer = function(I) {
        var O = this;
        return new n(function(T, N) {
            if (!I) return N(new Error('missing player room name!'));
            var A = y.getMappedName(I),
                C = O.discovery.getPlayer(A);
            return C ? void T(C) : N(new Error('SONOS_NO_PLAYER_IN_ROOM ' + A))
        })
    }, f.prototype._getPlayerSync = function(I) {
        if (!I) throw new Error('missing player room name!');
        var O = y.getMappedName(I),
            T = this.discovery.getPlayer(O);
        if (!T) throw new Error('SONOS_NO_PLAYER_IN_ROOM ' + O);
        return T
    }, f.prototype.getPlayerByUUID = function(I) {
        var O = this;
        return new n(function(T, N) {
            if (!I) return N(new Error('missing player uuid!'));
            var A = O.discovery.getPlayerByUUID(I);
            return A ? void T(A) : N(Error('no player with uuid: ' + I))
        })
    }, f.prototype._applyPlayerFn = function(I, O, T, N) {
        return this._getPlayer(I).then(function(A) {
            return new n(function(C, D) {
                N = N || [], c.debug('apply player fn', {
                    fn: O,
                    args: N
                }), N.push(function(R, P) {
                    R ? D(new Error(O + ' failed')) : T && P ? C(P) : C()
                }), A[O].apply(A, N)
            })
        })
    }, f.prototype.previousTrack = function(I) {
        return this._applyPlayerFn(I, 'previousTrack')
    }, f.prototype.nextTrack = function(I) {
        return this._applyPlayerFn(I, 'nextTrack')
    }, f.prototype.mute = function(I, O) {
        return this._applyPlayerFn(I, 'mute', !1, [O])
    }, f.prototype.clearQueue = function(I) {
        return this._applyPlayerFn(I, 'removeAllTracksFromQueue')
    }, f.prototype.removeFromQueue = function(I, O) {
        return this._applyPlayerFn(I, 'removeTrackFromQueue', !1, [O])
    }, f.prototype.play = function(I) {
        return this._applyPlayerFn(I, 'play')
    }, f.prototype.pause = function(I) {
        return this._applyPlayerFn(I, 'pause')
    }, f.prototype.muteToggle = function(I) {
        var O = this;
        return this.isMuted(I).then(function(T) {
            return O.mute(I, !T)
        })
    }, f.prototype.isMuted = function(I) {
        return this._getPlayer(I).then(function(O) {
            return O.coordinator.state.mute
        })
    }, f.prototype.playToggle = function(I) {
        var O = this;
        return this.isPlaying(I).then(function(T) {
            return T ? O.pause(I) : O.play(I)
        })
    }, f.prototype.isPlaying = function(I) {
        return this._getPlayer(I).then(function(O) {
            return 'PLAYING' === O.coordinator.state.currentState
        })
    }, f.prototype.isRandom = function(I) {
        return this._getPlayer(I).then(function(O) {
            return O.getState().zonePlayMode.shuffle
        })
    }, f.prototype.isRepeat = function(I) {
        return this._getPlayer(I).then(function(O) {
            return O.getState().zonePlayMode.repeat
        })
    }, f.prototype.repeatToggle = function(I) {
        var O = this;
        return this.isRepeat(I).then(function(T) {
            return O._applyPlayerFn(I, 'repeat', !1, [!T])
        })
    }, f.prototype.enableShuffleMode = function(I) {
        var O = this;
        return this.isRandom(I).then(function(T) {
            if (!T) {
                return O._applyPlayerFn(I, 'shuffle', !1, [!0])
            }
        })
    }, f.prototype.shuffleToggle = function(I) {
        var O = this;
        return this.isRandom(I).then(function(T) {
            return O._applyPlayerFn(I, 'shuffle', !1, [!T])
        })
    }, f.prototype.setVolume = function(I, O) {
        var T = this;
        return this.isMuted(I).then(function(N) {
            return N ? T.mute(I, !1) : void 0
        }).then(function() {
            return T._applyPlayerFn(I, 'setVolume', !1, [O])
        })
    }, f.prototype.volumeUp = function(I) {
        return this.setVolume(I, '+2')
    }, f.prototype.volumeDown = function(I) {
        return this.setVolume(I, '-2')
    }, f.prototype.seek = function(I, O) {
        var T = this;
        return this.queueInUse(I).then(function(N) {
            return N ? n.resolve() : T.useQueue(I, !0)
        }).then(function() {
            return T._applyPlayerFn(I, 'seek', !1, [parseInt(O) + 1])
        }).then(function() {
            return T.play(I)
        })
    }, f.prototype._augmentState = function(I) {
        return I.isPlaying = 'PLAYING' === I.playerState, I.queueInUse = !1, I.currentTrack && (I.queueInUse = 'track' === I.currentTrack.type, 'linein' === I.currentTrack.type && (I.currentTrack.title = 'TV / Line In')), I
    }, f.prototype.getStateSync = function(I) {
        var O = this._getPlayerSync(I).getState();
        return this._augmentState(O)
    }, f.prototype.getState = function(I) {
        var O = this;
        return this._getPlayer(I).then(function(T) {
            return O._augmentState(T.getState())
        })
    }, f.prototype.getVolume = function(I) {
        return this.getState(I).then(function(O) {
            return O.volume
        })
    }, f.prototype.queueInUse = function(I) {
        return this.getState(I).then(function(O) {
            return O.queueInUse
        })
    }, f.prototype.useQueue = function(I, O) {
        var T = this;
        return c.debug('use queue', I), this._getPlayer(I).then(function(N) {
            var A = 'x-rincon-queue:' + N.uuid + '#0';
            return T._applyPlayerFn(I, 'setAVTransportURI', !1, [A, ''])
        }).then(function() {
            return O ? n.resolve() : T.play(I)
        })
    }, f.prototype.currentCoverUrl = function(I) {
        return this.getState(I).then(function(O) {
            return O.currentTrack.albumArtURI
        })
    }, f.prototype._getSpotifyServiceType = function(I) {
        var O = void 0,
            T = p.getPossibleSpotifyServiceTypes();
        try {
            O = this.repo.load('spotifyType')
        } catch (N) {
            u.increaseCounter('sonos-spotify-type-not-stored'), O = T[0]
        }
        return I.spotifyRetryRunning && (O = T.find(function(N) {
            return O !== N
        })), O
    }, f.prototype.addToQueue = function(I, O) {
        var T = this,
            N = this.getStateSync(I),
            A = N.trackNo,
            C = O.playNow ? A : O.playNext ? A + 1 : 0;
        if (c.debug('addToQueue', {
                desiredTrackNbr: C,
                currentTrackNbr: A
            }), m.isStream(O.actionUri)) return this._applyPlayerFn(I, 'setAVTransportURI', !1, [O.actionUri, O.metaData]).then(function() {
            return T.play(I)
        });
        var D = void 0,
            R = void 0,
            P = 'spotify' === O.directoryId;
        if (P) {
            R = this._getSpotifyServiceType(O);
            var w = {
                userName: O.spotifyUsername,
                savedSpotifyServiceType: R
            };
            D = p.getSpotifyMetadata(w, I, O)
        } else D = n.resolve({
            uri: O.actionUri,
            metaData: O.metaData
        });
        return D.then(function(L) {
            return T._applyPlayerFn(I, 'addURIToQueue', !1, [L.uri, L.metaData, O.playNext, C])
        }).then(function() {
            return n.all([T.queueInUse(I), T.isPlaying(I)])
        }).spread(function(L, U) {
            c.debug('addToQueue', {
                queueInUse: L,
                isPlaying: U
            });
            var k = [];
            return !L && O.playNow && k.push(function() {
                return T.useQueue(I)
            }), !U && O.playNow && k.push(function() {
                return T.play(I)
            }), O.playNow && 0 < C && k.push(function() {
                return T.seek(I, C - 1)
            }), n.map(k, function(F) {
                return F()
            })
        }).then(function(L) {
            if (!P) return L;
            var U = !1,
                k = 'spotifyType';
            try {
                T.repo.load(k)
            } catch (F) {
                U = !0
            }
            return T.repo.save(k, R), (U || O.spotifyRetryRunning) && c.info('SONOS_SPOTIFY_NEW_TYPE_SAVED', {
                savedSpotifyServiceType: R,
                username: O.spotifyUsername
            }), L
        }).catch(function(L) {
            if (P && !O.spotifyRetryRunning) return O.spotifyRetryRunning = !0, T.addToQueue(I, O);
            throw L
        })
    }, f.prototype.queueItem = function(I, O) {
        var T = this;
        return m.isSpotifyUri(O.browseItem) ? (O.actionUri = O.browseItem, O.directoryId = 'spotify', this.addToQueue(I, O)) : this._getBrowseItem(I, O.browseItem, O.index).then(function(N) {
            return O.actionUri = N.uri, O.metaData = N.metaData, T.addToQueue(I, O)
        }).catch(function(N) {
            c.warn('SONOS_QUEUE_ITEM_ERROR', {
                error: N.message
            })
        })
    }, f.prototype.queueItems = function(I, O) {
        var T = this;
        return 'A:TRACKS' === O.browseItem || O.browseItem.startsWith('SQ:') ? this._getBrowseItems(I, O.browseItem, O.index).then(function(N) {
            return Promise.all(N.map(function(A) {
                var C = Object.assign({}, O);
                return C.actionUri = A.uri, C.metaData = A.metaData, T.addToQueue(I, C)
            }))
        }).catch(function(N) {
            c.warn('SONOS_QUEUE_ITEMS_ERROR', {
                error: N.message
            })
        }) : this.queueItem(I, O)
    }, f.prototype.browse = function(I, O) {
        var T = this;
        return E.browse(I, O, function(C, D) {
            return T._getPlayer(C).then(function(R) {
                return new n(function(P, w) {
                    R.browse(D.browseUri, D.offset, D.limit, function(L, U) {
                        L ? (c.warn('BROWSE_FAILED', {
                            msg: L,
                            params: D
                        }), w(L)) : (c.debug('browse on sonos succeeded'), P(U))
                    })
                })
            })
        }).timeout(1e4, 'TIMEOUT_SONOS_NOT_AVAILABLE')
    }, f.prototype.playAndShuffle = function(I, O) {
        var T = this;
        return this.clearQueue(I).then(function() {
            return T.queueItems(I, O)
        }).then(function() {
            return T.enableShuffleMode(I)
        })
    }, f.prototype._getBrowseItem = function(I, O, T) {
        return this._applyPlayerFn(I, 'browse', !0, [O, T, 1]).then(function(N) {
            return N && N.items[0] ? N.items[0] : n.reject(new Error('Invalid response data'))
        })
    }, f.prototype._getBrowseItems = function(I, O, T) {
        var N = this.listLimit;
        return void 0 !== T && (N = 1), this._applyPlayerFn(I, 'browse', !0, [O, T, N]).then(function(C) {
            return C && C.items && 0 < C.items.length ? C.items : n.reject(new Error('Invalid response data'))
        })
    }, f.prototype.addToInstantFavorites = function(I, O, T) {
        return g.saveAtPosition(I, O, T)
    }, f.prototype.removeInstantFavoritesByKey = function(I) {
        return g.deleteAllByKey(I)
    }
}, function(t, r, o) {o(0)("Function 146").verbose("sonos main driver");
    'use strict';
    var n = o(1),
        d = o(35),
        c = o(13),
        u = o(145),
        p = o(51),
        m = o(0)('Sonos'),
        E = t.exports = function(g) {
            this.discovery = g.discovery, c.call(this, 'sonos');
            var y = Object.assign(g, {
                repo: this.repo
            });
            this.adapter = new u(y)
        };
    d.inherits(E, c), E.prototype.enableNotifications = function() {
        var g = this;
        this._notificationsEnabled || (m.debug('enableNotifications'), this.discovery.on('transport-state', function(y) {
            return g._notificationHandler(y)
        }), this.discovery.on('volume', function(y) {
            return g._notificationHandler(y)
        }), this.discovery.on('mute', function(y) {
            return g._notificationHandler(y)
        }), this.discovery.on('group-mute', function(y) {
            return g._notificationHandler(y)
        }), this.discovery.on('topology-change', function(y) {
            return g._topologyHandler(y)
        }), this.discovery.on('queue-changed', function(y) {
            return g._queueHandler(y)
        }), this._notificationsEnabled = !0)
    }, E.prototype._notificationHandler = function(g) {
        return g && g.state ? 'TRANSITIONING' === g.state.playerState ? void m.debug('ignoring sonos "TRANSITIONING" state event') : void this._handleStateChange(g) : void m.debug('ignoring empty sonos state event')
    }, E.prototype._topologyHandler = function(g) {
        var y = this;
        p.handleTopologyChange(g), p.getAllKnownSonosRoomNames().forEach(function(S) {
            try {
                var f = y.adapter.getStateSync(S),
                    I = 'PLAYING' === f.playerState;
                y.handleStateUpdate(S, 'VOLUME_SENSOR', f.volume), y.handleStateUpdate(S, 'MUTED_SENSOR', f.mute), y.handleStateUpdate(S, 'PLAYING_SENSOR', I), y.handleStateUpdate(S, 'POWERSTATE', I), y.handleStateUpdate(S, 'PLAYERSTATE_SENSOR', f)
            } catch (O) {
                m.warn('TOPOLOGY_CHANGE_NOTIFICATION_FAILED', {
                    msg: O.message
                })
            }
        })
    }, E.prototype._queueHandler = function(g) {
        var y = this;
        this.getAdapter().getPlayerByUUID(g.uuid).then(function(S) {
            y.handleStateUpdate(S.roomName, 'QUEUESTATE_SENSOR', {
                data: {}
            })
        }).catch(function(S) {
            m.warn('SONOS_NOTIFICATION_FAILED', {
                msg: S.message
            })
        })
    }, E.prototype._handleStateChange = function(g) {
        var y = this,
            S = this.adapter._augmentState(g.state),
            f = 'PLAYING' === S.playerState,
            I = g.roomName;
        p.getNotificationNames(I).forEach(function(O) {
            y.handleStateUpdate(O, 'VOLUME_SENSOR', S.volume), y.handleStateUpdate(O, 'MUTED_SENSOR', S.mute), y.handleStateUpdate(O, 'PLAYING_SENSOR', f), y.handleStateUpdate(O, 'POWERSTATE', f), y.handleStateUpdate(O, 'PLAYERSTATE_SENSOR', S)
        })
    }, E.prototype.getAdapter = function() {
        return this.adapter
    }, E.prototype.discover = function() {
        return m.debug('discover'), n.resolve(this.discovery.getZones()).then(function(g) {
            return g.map(function(y) {
                return {
                    id: y.coordinator.roomName,
                    name: 'Sonos',
                    label: 'Sonos (' + y.coordinator.roomName + ')'
                }
            })
        })
    }, E.prototype.unsubscribe = function(g) {
        return this.adapter.removeInstantFavoritesByKey(g), n.resolve()
    }, E.prototype.register = function() {
        return n.resolve()
    }, E.prototype.unregister = function() {
        return n.resolve()
    }, E.prototype.initialize = function() {
        return m.debug('Initializing'), this._loadSubscriptions(), this.enableNotifications(), n.resolve()
    }, E.prototype.shutdown = function() {}
}, function(t, r, o) {o(0)("Function 147").verbose("SONOS_FAVORITE_DIRECTORY");
    'use strict';

    function n(S, f) {
        if (!(S instanceof f)) throw new TypeError('Cannot call a class as a function')
    }
    var d = function() {
            function S(f, I) {
                for (var O = 0, T; O < I.length; O++) T = I[O], T.enumerable = T.enumerable || !1, T.configurable = !0, 'value' in T && (T.writable = !0), Object.defineProperty(f, T.key, T)
            }
            return function(f, I, O) {
                return I && S(f.prototype, I), O && S(f, O), f
            }
        }(),
        c = o(49),
        u = 'FV:2',
        y = function() {
            function S(f, I, O) {
                n(this, S), this.items = f, this.numberOfEntriesInList = I, this.additionalListFunctions = O
            }
            return d(S, [{
                key: '_createPanelList',
                value: function(I) {
                    var O = c.buildList();
                    return this.items.forEach(function(T) {
                        var N = c.buildListPanel(T);
                        N.setBrowseUriPrefix(I), O.addElement(N)
                    }), O
                }
            }, {
                key: '_createElementList',
                value: function(I) {
                    var O = c.buildList();
                    return this.items.forEach(function(T) {
                        var N = c.buildListElement(T);
                        N.setBrowseUriPrefix(I), O.addElement(N)
                    }), O
                }
            }, {
                key: 'buildSonosBrowseList',
                value: function(I) {
                    var O = this._createElementList(I);
                    return O.setTotalListEntries(this.numberOfEntriesInList), this.additionalListFunctions && O.addListFunction(this.additionalListFunctions), O
                }
            }, {
                key: 'buildSonosInstantFavoritesList',
                value: function(I) {
                    var O = this._createPanelList(I),
                        T = c.buildListHeader('Instant Favorites');
                    O.addElementAtStart(T);
                    var N = c.buildListElement({
                            title: 'My Sonos',
                            thumbnailUri: 'LOCAL:sonos-favorites',
                            browseUri: u
                        }),
                        A = c.buildListElement({
                            title: 'Sonos Playlists',
                            thumbnailUri: 'LOCAL:sonos-playlists',
                            browseUri: 'SQ:'
                        }),
                        C = c.buildListElement({
                            title: 'Sonos Library',
                            thumbnailUri: 'LOCAL:sonos-library',
                            browseUri: 'A:'
                        }),
                        D = c.buildListHeader('SONOS');
                    return O.addElement(D), O.addElement(N), O.addElement(C), O.addElement(A), O
                }
            }]), S
        }();
    t.exports.buildBrowseResults = function(S, f, I, O) {
        return new y(S, f, I, O)
    }, t.exports.SONOS_FAVORITE_DIRECTORY = u
}, function(t, r, o) {o(0)("Function 148").verbose("Sonos parse input fields");
    'use strict';
    var d = o(150),
        c = [{
            pattern: /^A:ALBUM$/,
            formattingFn: d.getPlaylistFormat
        }, {
            pattern: /^A:TRACKS$/,
            formattingFn: d.getTrackFormat,
            addPlayAllEntry: !0
        }, {
            pattern: /^A:(\w*)$/,
            formattingFn: d.getLibraryFormat,
            paramKeys: ['type']
        }, {
            pattern: /^A:(\w*)\/(.+)$/,
            formattingFn: d.getTrackFormat,
            paramKeys: ['type', 'id'],
            addPlayAllEntry: !0,
            playAllItemCheck: function(p) {
                return ['ARTIST', 'ALBUMARTIST'].every(function(m) {
                    return -1 === p.indexOf(m)
                })
            }
        }, {
            pattern: /^FV:2$/,
            formattingFn: d.getFavoriteFormat
        }, {
            pattern: /^SQ:$/,
            formattingFn: d.getPlaylistFormat
        }, {
            pattern: /^SQ:(.+)$/,
            formattingFn: d.getTrackFormat,
            paramKeys: ['id'],
            addPlayAllEntry: !0
        }, {
            pattern: /^S:(.+)$/,
            formattingFn: d.getTrackFormat,
            paramKeys: ['id'],
            addPlayAllEntry: !0
        }, {
            pattern: /^Q:0$/,
            formattingFn: d.getTrackFormat
        }];
    t.exports = {
        getBrowseRouteInfo: function(u) {
            var p = c.find(function(S) {
                return S.pattern.test(u)
            });
            if (!p) throw new Error('invalid browseURI ' + JSON.stringify(u));
            var m = u.match(p.pattern).slice(1),
                E = p.paramKeys || [],
                g = {};
            E.forEach(function(S, f) {
                g[S] = m[f]
            });
            var y = p.addPlayAllEntry || !1;
            return p.playAllItemCheck && (y = p.playAllItemCheck(u)), {
                formattingFn: p.formattingFn,
                addPlayAllEntry: y,
                data: g
            }
        }
    }
}, function(t, r, o) {o(0)("Function 149").verbose("browse neeo:lib:sonos:directory");
    'use strict';

    function n(A, C) {
        if (A.addPlayAllEntry && C) return {
            isElement: !0,
            title: 'All',
            label: null,
            thumbnailUri: '',
            isActionNode: !0,
            isQueueable: !0,
            data: {
                browseUri: C,
                actionUri: C
            }
        }
    }

    function d(A, C, D) {
        try {
            D.browseUri = D.browseUri || '';
            var R = f.getBrowseRouteInfo(D.browseUri),
                P = Object.assign(D, R.data);
            return A(C, P).then(function(w) {
                var L = c(w.items, R.formattingFn, w.startIndex),
                    U = n(R, P.browseUri);
                return I.buildBrowseResults(L, w.totalMatches, U)
            })
        } catch (w) {
            return y.reject(w)
        }
    }

    function c(A, C) {
        var D = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : 0;
        return A.map(function(R, P) {
            return C(R, P + D)
        })
    }

    function u(A, C) {
        var D = {
            browseUri: I.SONOS_FAVORITE_DIRECTORY,
            offset: 0,
            limit: N
        };
        return d(A, C, D).then(function(R) {
            var P = p(R, C);
            return P.buildSonosInstantFavoritesList(D.browseUri)
        })
    }

    function p(A, C) {
        var D = {
                items: []
            },
            R = O.loadAll(C);
        if (0 < R.length) {
            var P = E(R, A.items),
                w = f.getBrowseRouteInfo(I.SONOS_FAVORITE_DIRECTORY),
                L = c(P, w.formattingFn);
            D = I.buildBrowseResults(L, R.length, [])
        }
        if (D.items.length) {
            var U = T - D.items.length,
                k = A.items.filter(function(F) {
                    var M = D.items.find(function(x) {
                        return F.actionUri === x.actionUri
                    });
                    return !M
                }).splice(0, U);
            D.items = m(R, D.items, k)
        } else D = A, D.items = A.items.splice(0, T);
        return D
    }

    function m(A, C, D) {
        var R = [];
        C.map(function(w) {
            var L = A.find(function(F) {
                return F.uri === w.actionUri
            });
            if (L) {
                var U = L.position - 1;
                R[U] = w;
                var k = A.indexOf(L);
                A.splice(k, 1)
            }
        });
        for (var P = 0; P < T; P++) R[P] || (R[P] = D.shift());
        return R
    }

    function E(A, C) {
        return A.map(function(D) {
            var R = C.findIndex(function(P) {
                return D.uri === P.actionUri
            });
            return -1 === R ? void 0 : (D.tr2 = R, D)
        }).filter(function(D) {
            return D
        })
    }
    var y = o(1),
        S = o(2)('neeo:lib:sonos:directory'),
        f = o(148),
        I = o(147),
        O = o(52),
        T = 4,
        N = 100;
    t.exports = {
        browse: function(A, C, D) {
            return (C.browseUri = C.browseUri || '', /^(|root)$/.test(C.browseUri)) ? (S('browse virtual root', C.browseUri), u(D, A).then(function(R) {
                return R.serialize(C)
            })) : (S('browse directory %o', C), d(D, A, C).then(function(R) {
                var P = R.buildSonosBrowseList(C.browseUri);
                return P.serialize(C)
            }))
        }
    }
}, function(t, r, o) {o(0)("Function 150").verbose("Musicplayer?");
    'use strict';

    function n(S) {
        return (S.artist ? S.album ? S.artist + ', ' + S.album : S.artist : S.album) || null
    }

    function d(S) {
        return /^\//.test(S.albumArtURI) ? S.absoluteAlbumArtURI : S.albumArtURI || 'none'
    }
    var E = o(50),
        g = o(49),
        y = 'No Title';
    t.exports = {
        getLabelText: n,
        getImageUri: d,
        getLibraryFormat: function(S, f) {
            var I = S ? S.title : 'No Title',
                O = !E.isStream(S.uri),
                N = S && S.attr ? S.attr.id : null,
                A = S && S.uri ? S.uri : null;
            return g.buildListElement({
                title: I,
                isQueueable: O,
                isTriggerNode: !1,
                browseUri: N,
                actionUri: A,
                tr2index: f
            })
        },
        getPlaylistFormat: function(S, f) {
            var I = S ? S.title : y,
                O = d(S),
                T = !E.isStream(S.uri),
                A = S && S.attr ? S.attr.id : null,
                C = S && S.uri ? S.uri : null;
            return g.buildListElement({
                title: I,
                thumbnailUri: O,
                isQueueable: T,
                isTriggerNode: !1,
                browseUri: A,
                actionUri: C,
                tr2index: f
            })
        },
        getTrackFormat: function(S, f) {
            var I = S ? S.title : y,
                O = n(S),
                T = d(S),
                N = !E.isStream(S.uri),
                C = S && S.attr ? S.attr.id : null,
                D = S && S.uri ? S.uri : null,
                R = S.metaData;
            return g.buildListElement({
                title: I,
                label: O,
                thumbnailUri: T,
                isQueueable: N,
                isTriggerNode: !0,
                browseUri: C,
                actionUri: D,
                tr2index: f,
                metaData: R
            })
        },
        getFavoriteFormat: function(S, f) {
            f = S.tr2 || f;
            var I = S ? S.title : y,
                O = d(S),
                T = !E.isStream(S.uri),
                N = S && S.attr ? S.attr.id : null,
                A = S && S.uri ? S.uri : null,
                D = S && S.metaData ? S.metaData : null;
            return g.buildListElement({
                title: I,
                thumbnailUri: O,
                isQueueable: T,
                isTriggerNode: !0,
                browseUri: N,
                actionUri: A,
                metaData: D,
                tr2index: f
            })
        }
    }
}, function(t, r, o) {o(0)("Function 151").verbose("Directory");
    'use strict';

    function n(p) {
        return Math.max(0, Math.min(p || c.listLimit, c.spotifyAPILimit))
    }

    function d(p) {
        return Math.max(0, p || 0)
    }
    var c = o(5).sonos,
        u = t.exports = function() {
            this.entries = [], this.listFunctions = [], this.listTotalEntries = 0
        };
    u.prototype.addElementAtStart = function(p) {
        this.entries = [p].concat(this.entries)
    }, u.prototype.addElement = function(p) {
        this.entries.push(p)
    }, u.prototype.addListFunction = function(p) {
        this.listFunctions.push(p)
    }, u.prototype.setTotalListEntries = function(p) {
        this.listTotalEntries = p
    }, u.prototype._buildMetadata = function(p) {
        var m = this.entries.length,
            E = {
                current: {
                    browseUri: p.browseUri,
                    offset: d(p.offset),
                    limit: n(p.limit)
                },
                totalMatches: this.listTotalEntries
            },
            g = p.offset + m;
        return this.listTotalEntries > g && (E.next = {
            browseUri: p.browseUri,
            offset: g,
            limit: n(p.limit)
        }), 0 < p.offset && (E.previous = {
            browseUri: p.browseUri,
            offset: Math.max(p.offset - p.limit, 0),
            limit: Math.min(p.limit, p.offset)
        }), E
    }, u.prototype.serialize = function(p) {
        if (!p) throw new Error('MISSING_PARAMETERS');
        var m = this.entries.map(function(E) {
            return E.serialize()
        });
        return {
            items: m,
            collectionItem: this.listFunctions,
            total: m.length,
            _meta: this._buildMetadata(p)
        }
    }
}, function(t, r, o) {o(0)("Function 152").verbose("Directory-item");
    'use strict';

    function n(m, E) {
        if (!(m instanceof E)) throw new TypeError('Cannot call a class as a function')
    }

    function d(m, E) {
        if (!m) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return E && ('object' == typeof E || 'function' == typeof E) ? E : m
    }

    function c(m, E) {
        if ('function' != typeof E && null !== E) throw new TypeError('Super expression must either be null or a function, not ' + typeof E);
        m.prototype = Object.create(E && E.prototype, {
            constructor: {
                value: m,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), E && (Object.setPrototypeOf ? Object.setPrototypeOf(m, E) : m.__proto__ = E)
    }
    var u = function() {
            function m(E, g) {
                for (var y = 0, S; y < g.length; y++) S = g[y], S.enumerable = S.enumerable || !1, S.configurable = !0, 'value' in S && (S.writable = !0), Object.defineProperty(E, S.key, S)
            }
            return function(E, g, y) {
                return g && m(E.prototype, g), y && m(E, y), E
            }
        }(),
        p = o(26);
    t.exports = function(m) {
        function E(g) {
            if (n(this, E), !g.title) throw new Error('TITLE_PARAMETER_MISSING');
            var y = d(this, (E.__proto__ || Object.getPrototypeOf(E)).call(this, g));
            return y.title = g.title, y.label = g.label, y.thumbnailUri = g.thumbnailUri, y.isTriggerNode = !0 === g.isTriggerNode, y.isQueueable = !0 === g.isQueueable, y.isInfoItem = !0 === g.isInfoItem, y.itemInfo = g.itemInfo, y.browseUri = g.browseUri, y.actionUri = g.actionUri, y.metaData = g.metaData, y
        }
        return c(E, m), u(E, [{
            key: 'serialize',
            value: function() {
                return {
                    isElement: !0,
                    title: this.title,
                    label: this.label,
                    thumbnailUri: this.thumbnailUri,
                    isActionNode: this.isTriggerNode,
                    isQueueable: this.isQueueable,
                    isInfoItem: this.isInfoItem,
                    itemInfo: this.itemInfo,
                    data: {
                        browseUri: this.browseUri,
                        actionUri: this.actionUri,
                        metaData: this.metaData,
                        tr2: this.getTr2Index()
                    }
                }
            }
        }]), E
    }(p)
}, function(t, r, o) {o(0)("Function 153").verbose("Build header??");
    'use strict';

    function n(m, E) {
        if (!(m instanceof E)) throw new TypeError('Cannot call a class as a function')
    }

    function d(m, E) {
        if (!m) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return E && ('object' == typeof E || 'function' == typeof E) ? E : m
    }

    function c(m, E) {
        if ('function' != typeof E && null !== E) throw new TypeError('Super expression must either be null or a function, not ' + typeof E);
        m.prototype = Object.create(E && E.prototype, {
            constructor: {
                value: m,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), E && (Object.setPrototypeOf ? Object.setPrototypeOf(m, E) : m.__proto__ = E)
    }
    var u = function() {
            function m(E, g) {
                for (var y = 0, S; y < g.length; y++) S = g[y], S.enumerable = S.enumerable || !1, S.configurable = !0, 'value' in S && (S.writable = !0), Object.defineProperty(E, S.key, S)
            }
            return function(E, g, y) {
                return g && m(E.prototype, g), y && m(E, y), E
            }
        }(),
        p = o(26);
    t.exports = function(m) {
        function E(g) {
            n(this, E);
            var y = d(this, (E.__proto__ || Object.getPrototypeOf(E)).call(this));
            return y.text = g, y
        }
        return c(E, m), u(E, [{
            key: 'serialize',
            value: function() {
                return {
                    isHeader: !0,
                    label: this.text
                }
            }
        }]), E
    }(p)
}, function(t, r, o) {o(0)("Function 154").verbose("Unclear... panel?");
    'use strict';

    function n(m, E) {
        if (!(m instanceof E)) throw new TypeError('Cannot call a class as a function')
    }

    function d(m, E) {
        if (!m) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return E && ('object' == typeof E || 'function' == typeof E) ? E : m
    }

    function c(m, E) {
        if ('function' != typeof E && null !== E) throw new TypeError('Super expression must either be null or a function, not ' + typeof E);
        m.prototype = Object.create(E && E.prototype, {
            constructor: {
                value: m,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), E && (Object.setPrototypeOf ? Object.setPrototypeOf(m, E) : m.__proto__ = E)
    }
    var u = function() {
            function m(E, g) {
                for (var y = 0, S; y < g.length; y++) S = g[y], S.enumerable = S.enumerable || !1, S.configurable = !0, 'value' in S && (S.writable = !0), Object.defineProperty(E, S.key, S)
            }
            return function(E, g, y) {
                return g && m(E.prototype, g), y && m(E, y), E
            }
        }(),
        p = o(26);
    t.exports = function(m) {
        function E(g) {
            n(this, E);
            var y = d(this, (E.__proto__ || Object.getPrototypeOf(E)).call(this, g));
            return y.thumbnailUri = g.thumbnailUri, y.isTriggerNode = !0, y.isQueueable = !0 === g.isQueueable, y.isInfoItem = !0 === g.isInfoItem, y.browseUri = g.browseUri, y.actionUri = g.actionUri, y.metaData = g.metaData, y
        }
        return c(E, m), u(E, [{
            key: 'serialize',
            value: function() {
                return {
                    isPanel: !0,
                    thumbnailUri: this.thumbnailUri,
                    isActionNode: this.isTriggerNode,
                    isQueueable: this.isQueueable,
                    data: {
                        browseUri: this.browseUri,
                        actionUri: this.actionUri,
                        metaData: this.metaData,
                        tr2: this.getTr2Index()
                    }
                }
            }
        }]), E
    }(p)
}, function(t, r, o) {o(0)("Function 155").verbose("sonos-spotify main implementaion of functions");
    'use strict';

    function n(S) {
        return S === E || '' + S === E ? g : m
    }

    function d(S, f) {
        return S.replace(/{([a-z]+)}/gi, function(I, O) {
            return f.hasOwnProperty(O) ? f[O] : I
        })
    }
    var c = o(1),
        u = o(0)('sonos-spotify'),
        m = '9',
        E = '3079',
        g = '12',
        y = function() {
            this.metadataTemplate = '<DIDL-Lite xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:upnp="urn:schemas-upnp-org:metadata-1-0/upnp/" xmlns:r="urn:schemas-rinconnetworks-com:metadata-1-0/" xmlns="urn:schemas-upnp-org:metadata-1-0/DIDL-Lite/"><item id="{uri}" parentID="" restricted="true"><upnp:class>{class}</upnp:class><desc id="cdudn" nameSpace="urn:schemas-rinconnetworks-com:metadata-1-0/">{namespace}</desc></item></DIDL-Lite>'
        };
    y.prototype.getPossibleSpotifyServiceTypes = function() {
        return [E, '2311']
    }, y.prototype._getSpotifyItemType = function(S) {
        return /^me:tracks$/.test(S) ? 'my_songs' : /^spotify:track:\w*$/.test(S) ? 'track' : /^spotify:user:\w*:playlist:\w*$/.test(S) ? 'playlist' : /^spotify:playlist:\w*$/.test(S) ? 'playlist' : /^spotify:album:\w*$/.test(S) ? 'album' : null
    }, y.prototype._transformSpotifyDirectoryUri = function(S) {
        return /^me:tracks$/.test(S) ? 'your_songs' : S
    }, y.prototype._getSpotifyItemMetaInfo = function(S) {
        return {
            track: {
                rand: '00032020',
                class: 'object.item.audioItem.musicTrack',
                prefix: 'x-sonos-spotify'
            },
            album: {
                rand: '0004206c',
                class: 'object.container.album.musicAlbum',
                prefix: 'x-rincon-cpcontainer'
            },
            playlist: {
                rand: '0006206c',
                class: 'object.container.playlistContainer',
                prefix: 'x-rincon-cpcontainer'
            },
            my_songs: {
                rand: '100e206c',
                class: 'object.container.playlistContainer',
                prefix: 'x-rincon-cpcontainer'
            }
        } [S]
    }, y.prototype._getAccountSpecificUri = function(S, f, I) {
        if (!f) return u.warn('MISSING_ITEMINFO'), {};
        var O = 'RINCON_AssociatedZPUDN',
            T = '?sid=9&flags=8224';
        if (S && S.userName) {
            var N = n(S.savedSpotifyServiceType);
            T = '?sid=' + N + '&flags=8224', O = 'SA_RINCON' + S.savedSpotifyServiceType + '_' + S.userName
        }
        var A = f.rand,
            C = this._transformSpotifyDirectoryUri(I),
            D = A + encodeURIComponent(C),
            R = f.class,
            P = f.prefix,
            w = 'x-rincon-cpcontainer' === P,
            L = encodeURIComponent(C + (w ? '' : T)),
            U = P + ':' + (w ? A : '') + L;
        return {
            metadataUri: D,
            enqueueUri: U,
            itemClass: R,
            namespace: O
        }
    }, y.prototype.getSpotifyMetadata = function(S, f, I) {
        var O = this;
        return new c(function(T, N) {
            if (!I.actionUri) return N(new Error('no actionUri provided'));
            var A = O._getSpotifyItemType(I.actionUri),
                C = O._getSpotifyItemMetaInfo(A);
            if (!C) return u.warn('SPOTIFY_UNKNOWN_MEDIA_TYPE', {
                uri: I.actionUri
            }), N(new Error('unknown media type'));
            var D = O._getAccountSpecificUri(S, C, I.actionUri),
                R = d(O.metadataTemplate, {
                    uri: D.metadataUri,
                    class: D.itemClass,
                    namespace: D.namespace
                });
            return T({
                uri: D.enqueueUri,
                metaData: R
            })
        })
    }, t.exports = new y
}, function(t, r, o) {o(0)("Function 156").verbose("Super expression See also Super()");
    'use strict';

    function n(g, y) {
        if (!(g instanceof y)) throw new TypeError('Cannot call a class as a function')
    }

    function d(g, y) {
        if (!g) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return y && ('object' == typeof y || 'function' == typeof y) ? y : g
    }

    function c(g, y) {
        if ('function' != typeof y && null !== y) throw new TypeError('Super expression must either be null or a function, not ' + typeof y);
        g.prototype = Object.create(y && y.prototype, {
            constructor: {
                value: g,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), y && (Object.setPrototypeOf ? Object.setPrototypeOf(g, y) : g.__proto__ = y)
    }
    var u = function() {
            function g(y, S) {
                for (var f = 0, I; f < S.length; f++) I = S[f], I.enumerable = I.enumerable || !1, I.configurable = !0, 'value' in I && (I.writable = !0), Object.defineProperty(y, I.key, I)
            }
            return function(y, S, f) {
                return S && g(y.prototype, S), f && g(y, f), y
            }
        }(),
        p = o(185),
        m = o(0)('Store'),
        E = function(g) {
            function y(S) {
                n(this, y);
                var f = d(this, (y.__proto__ || Object.getPrototypeOf(y)).call(this, S.dataFile, {
                    type: S.type
                }));
                return m.debug('init type:', S.type, 'dataFile:', S.dataFile), f
            }
            return c(y, g), u(y, [{
                key: 'reset',
                value: function() {
                    for (var f in m.info('RESET_STORE'), this.allSync()) this.deleteSync(f)
                }
            }, {
                key: 'replace',
                value: function(f) {
                    for (var I in m.info('REPLACE_STORE_DATA'), this.reset(), f) this.saveSync(I, f[I])
                }
            }]), y
        }(p);
    t.exports = E
}, function(t, r, o) {o(0)("Function 157").verbose("ZWave:Adapter  main implementaion of functions");
    'use strict';

    function n(R) {
        return {
            0: !1,
            1: !1,
            2: !0,
            5: !0,
            6: !1,
            "-1": !1
        } [R] || !1
    }

    function d(R) {
        return {
            0: 'NOT_INIT',
            1: 'OFFLINE',
            2: 'ONLINE',
            5: 'INITIALIZING',
            6: 'NOT_CONFIGURED',
            "-1": 'REMOVED'
        } [R] || 'UNKNOWN'
    }

    function c(R) {
        return R && -1 < R.indexOf('+') ? '#' + R.split('+')[1] : ''
    }

    function u(R) {
        return R && -1 < R.indexOf('+') ? R.split('+')[0] : R
    }
    var p = o(1),
        m = o(0)('ZWave:Adapter'),
        E = o(161),
        g = o(16),
        y = o(54),
        S = o(17),
        f = o(31),
        I = o(160),
        O = o(186),
        T = o(11),
        N = o(60),
        A = o(191),
        C = 'event.device.class',
        D = t.exports = function(R) {
            this.api = R.api, this.capabilities = {}
        };
    D.prototype.getAllDevices = function() {
        var R = this,
            P = [];
        return this.api.getAllZWaveDevices().then(function(w) {
            P = w;
            var L = w.map(function(U) {
                return R.api.getDeviceClasses(U.UID, !0)
            });
            return p.all(L)
        }).then(function(w) {
            P.forEach(function(L, U) {
                L.classObjectResult = w[U]
            })
        }).then(function() {
            return P.map(function(w) {
                return Object.assign({}, w, {
                    Status: d(w.Status)
                })
            })
        })
    }, D.prototype.discover = function() {
        var R = this.api.getZWaveControllerUid(),
            P = this.api.getAllZWaveDevices();
        return p.all([R, P]).spread(function(w, L) {
            if (!w) return p.reject(new Error('ZWAVE_DISCOVER_CONTROLLER_UID_UNDEFINED'));
            if (!L) return [];
            L = L.filter(function(M) {
                return M.UID !== w && !M.ParentUID
            });
            var k = L.map(function(F) {
                return {
                    id: f.convertToNodeId(F.UID),
                    reachable: n(F.Status),
                    status: d(F.Status),
                    device: I.lookupZwaveDevice(F.Properties)
                }
            });
            return p.resolve(k)
        })
    }, D.prototype.register = function() {
        return this.api.includeZWaveDevice().then(function(R) {
            m.debug('registered zwave device', R);
            var P = R.properties;
            return {
                id: f.convertToNodeId(P.UID),
                device: I.lookupZwaveDevice(P)
            }
        })
    }, D.prototype.unregister = function() {
        return this.api.excludeZWaveDevice().then(function(R) {
            if (R) {
                m.debug('unregistered zwave device', R);
                var P = R.properties;
                return {
                    id: f.convertToNodeId(P.UID),
                    device: I.lookupZwaveDevice(P)
                }
            }
        })
    }, D.prototype.forceunregister = function(R) {
        var P = f.convertToUid(R);
        return m.debug('start force unregister of zwave node with id:', P), this.api.removeFailedNode(P).then(function(w) {
            m.info('ZWAVE_FORCEDUNREGISTER_DEVICE', w)
        })
    }, D.prototype.replaceFailedNode = function(R) {
        var P = this,
            w = f.convertToZwaveNodeId(R);
        return m.debug('replace failed zwave node with id:', w), this.api.replaceFailedNode(w).then(function() {
            m.debug('replaced failed node with new device in Z-Wave network');
            var L = f.convertToUid(R);
            return P.api.getZWaveDeviceByUid(L)
        }).then(function(L) {
            return L && 0 !== L.length ? {
                id: f.convertToNodeId(L[0].UID),
                device: I.lookupZwaveDevice(L[0].Properties)
            } : p.reject(new Error('ZWAVE_REPLACE_FAILED_NODE_NO_DEVICE_RETURNED'))
        })
    }, D.prototype.getControllerRole = function() {
        return m.debug('start to get controller role'), this.api.getControllerRole().catch(function(R) {
            return m.warn('ZWAVE_GETCONTROLLERROLE_FAILED', R.message), p.reject(R.message)
        })
    }, D.prototype.getZWaveParameter = function(R, P) {
        var w = f.convertToUid(R);
        return this.api.getParameter(w, P)
    }, D.prototype.setZWaveParameter = function(R, P) {
        var w = f.convertToUid(R);
        return this.api.setParameter(w, P)
    }, D.prototype.replicateZWaveNetworkInformation = function() {
        return this.api.replicateZWaveNetworkInformation()
    }, D.prototype.controllerlearn = function() {
        return this.api.controllerLearn()
    }, D.prototype.cancelPendingJob = function() {
        return this.api.cancelPendingJob()
    }, D.prototype.controllerModeNormal = function() {
        return this.api.controllerModeNormal()
    }, D.prototype.resetController = function() {
        return this.api.resetController()
    }, D.prototype.getVirtualSensorsByUid = function(R) {
        var P = this,
            w = [],
            L = void 0;
        return L = this.capabilities[R] ? p.resolve(this.capabilities[R]) : this.getCapabilities(R), L.then(function() {
            var U = P.capabilities[R];
            return U && 0 < U.length && (w = U.filter(function(k) {
                return 'switch' === k.type && k.hasOwnProperty('virtualDeviceName')
            })), w
        })
    }, D.prototype.getCapabilities = function(R) {
        function P(F, M) {
            return [F].concat(M).filter(function(x) {
                return x
            })
        }
        var w = this,
            L = f.convertToUid(R),
            U = function(M) {
                return w.api.getZWaveDeviceByUid(M).then(function(x) {
                    return N(x) && x[0] ? x[0].ChildUIDs : void 0
                })
            },
            k = function(M) {
                return p.all(M.map(function(x) {
                    return w.api.getDeviceClasses(x, !0).then(function(B) {
                        return B || m.debug('empty response from uid recieved - no capabilities found for uid', x), E.buildCapabilities(x, B)
                    })
                }))
            };
        return m.debug('delay for 500ms until new device is available'), p.delay(500).then(function() {
            return w.api.getZWaveDeviceByUid(L)
        }).then(function(F) {
            if (!F || 1 > F.length) return m.warn('ZWAVE_CAPABILITIES_INVALID_ROOT_DEVICE', L), p.reject(new Error('ZWAVE_CAPABILITIES_INVALID_ROOT_DEVICE'));
            var M = F[0].ChildUIDs || [];
            return p.all(M.map(function(x) {
                return U(x)
            })).then(function(x) {
                var B = O(A(x)),
                    V = P(L, M.concat(B));
                return k(V)
            })
        }).then(function(F) {
            return w.capabilities[R] = T(F, !0).filter(function(M) {
                return M
            }), w.capabilities[R]
        })
    }, D.prototype.getSensorFromNotification = function(R) {
        if (R && R.properties && R.properties[C]) {
            var P = void 0;
            return R.properties[C].find(function(w) {
                var L = R.properties[w + '.type'];
                P = S.convertDeviceClassToNeeoSensorName(w, L);
                var U = f.getChildSuffix(R.properties.UID);
                return U && (P += U), P
            }), P
        }
    }, D.prototype.transformNotification = function(R, P) {
        return g.transformSensorResult(R, P)
    }, D.prototype.getSensorValue = function(R, P, w, L) {
        var U = L ? L : P,
            k = f.assembleNodeId(R, c(U), w),
            F = f.convertToUid(k),
            M = S.mapNeeoDeviceClassToProsystDeviceClass(u(U));
        return m.debug('getSensor for uid: ' + F + ', sensor: ' + M), this.api.getSensorValue(F, M).then(function(x) {
            return L && (M = S.mapVirtualSensorDeviceClassToNeeoDeviceClass(u(P))), g.transformSensorResult(x, M)
        })
    }, D.prototype.setActuatorValue = function(R, P, w, L) {
        var U = f.assembleNodeId(R, c(P), L),
            k = f.convertToUid(U),
            F = y.mapNeeoDeviceClassToProsystDeviceClass(u(P)),
            M = g.transformActuatorValue(w, F);
        return m.debug('setActuatorValue', {
            node: k,
            deviceClass: F,
            value: M
        }), this.api.setValue(k, F, M)
    }, D.prototype.setEventValue = function(R, P, w, L) {
        var U = f.assembleNodeId(R, c(P), L),
            k = f.convertToUid(U),
            F = y.mapNeeoDeviceClassToProsystDeviceClass(u(P)),
            M = g.transformEventValue(w, F);
        return m.debug('setEventValue', {
            node: k,
            trigger: F,
            value: w,
            actuatorName: u(P)
        }), this.api.invokeDCOOperation(k, F, M, {})
    }, D.prototype.setTriggerValue = function(R, P, w, L) {
        var U = f.assembleNodeId(R, c(P), L),
            k = f.convertToUid(U),
            F = u(P),
            M = y.mapNeeoDeviceClassToProsystDeviceClass(F);
        return m.debug('setTriggerValue', {
            node: k,
            trigger: M,
            value: w,
            actuatorName: F
        }), this.api.invokeDCOOperation(k, M, F, {})
    }
}, function(t, r, o) {o(0)("Function 158").verbose("ZWave:Device main implementaion of functions");
    'use strict';

    function n(O, T, N) {
        var A = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : 0;
        return O().catch(function(C) {
            var D = N - A;
            if (0 < D) {
                return c.delay(T).then(function() {
                    return n(O, T * (N - D + 2), N, A + 1)
                })
            }
            return c.reject(C)
        })
    }
    var d = o(35),
        c = o(1),
        u = o(13),
        p = o(157),
        m = o(159),
        E = o(0)('ZWave:Device'),
        g = o(6).getInstance(),
        I = t.exports = function(O, T) {
            this.api = O, this.adapter = new p({
                api: O
            }), this.initMaxRetries = T.initializationMaxRetries, this.initRetryDelayMs = T.initializationRetryDelayMs, this.eventhandler = new m({
                adapter: this.adapter,
                device: this
            }), u.call(this, 'zwave')
        };
    d.inherits(I, u), I.prototype.enableNotifications = function() {
        var O = this;
        this._notificationsEnabled || (this.api.getNotification().on('PROSYST_ZWAVE_HDM_STATE_EVENT', function(T) {
            O.eventhandler.handleStateEvent(T)
        }), this.api.getNotification().on('PROSYST_ZWAVE_PROGRESS', function(T) {
            O.sendNotification('zwave:progress', T)
        }), this._notificationsEnabled = !0)
    }, I.prototype.getAdapter = function() {
        return this.adapter
    }, I.prototype.getAllDevices = function() {
        return this.adapter.getAllDevices()
    }, I.prototype.register = function() {
        return this.adapter.register()
    }, I.prototype.unregister = function() {
        return this.adapter.unregister()
    }, I.prototype.forceunregister = function(O) {
        return this.adapter.forceunregister(O)
    }, I.prototype.replaceFailedNode = function(O) {
        return this.adapter.replaceFailedNode(O)
    }, I.prototype.controllerlearn = function() {
        return this.adapter.controllerlearn()
    }, I.prototype.cancel = function() {
        return this.adapter.cancelPendingJob()
    }, I.prototype.discover = function() {
        return this.adapter.discover()
    }, I.prototype.getCapabilities = function(O) {
        return this.adapter.getCapabilities(O)
    }, I.prototype.getControllerRole = function() {
        return this.adapter.getControllerRole()
    }, I.prototype.replicateZWaveNetworkInformation = function() {
        return this.adapter.replicateZWaveNetworkInformation()
    }, I.prototype.getZWaveParameter = function(O, T) {
        return this.adapter.getZWaveParameter(O, T)
    }, I.prototype.setZWaveParameter = function(O, T) {
        return this.adapter.setZWaveParameter(O, T)
    }, I.prototype.initialize = function() {
        var O = this;
        E.debug('Initializing'), this._loadSubscriptions(), this.enableNotifications();
        var T = Date.now();
        return n(function() {
            return O.api.initialize()
        }, this.initRetryDelayMs, this.initMaxRetries).then(function() {
            E.debug('PROSYSAPI_INITIALIZED');
            var N = Date.now() - T;
            g.setValue('zwave-prosyst-time-initialized', N)
        }).catch(function(N) {
            return E.error('PROSYSAPI_INITIALIZATION_ERROR', {
                message: N.message,
                retries: O.initMaxRetries
            })
        })
    }, I.prototype.shutdown = function() {}
}, function(t, r, o) {o(0)("Function 159").verbose("ZWave:Eventhandler ");
    'use strict';

    function n(f, I) {
        if (!(f instanceof I)) throw new TypeError('Cannot call a class as a function')
    }
    var d = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function(f) {
            return typeof f
        } : function(f) {
            return f && 'function' == typeof Symbol && f.constructor === Symbol && f !== Symbol.prototype ? 'symbol' : typeof f
        },
        c = function() {
            function f(I, O) {
                for (var T = 0, N; T < O.length; T++) N = O[T], N.enumerable = N.enumerable || !1, N.configurable = !0, 'value' in N && (N.writable = !0), Object.defineProperty(I, N.key, N)
            }
            return function(I, O, T) {
                return O && f(I.prototype, O), T && f(I, T), I
            }
        }(),
        u = o(0)('ZWave:Eventhandler'),
        p = o(31),
        m = o(167),
        g = 'event.device.class.object.property.value',
        y = 'event.device.class';
    t.exports = function() {
        function f(I) {
            n(this, f), this.device = I.device, this.adapter = I.adapter
        }
        return c(f, [{
            key: '_sendVirtualSensorsNotifications',
            value: function(O, T) {
                var N = this;
                this.adapter.getVirtualSensorsByUid(O).then(function(A) {
                    A.forEach(function(C) {
                        var D = N.adapter.transformNotification(T, C.virtualDeviceName);
                        N._sendNotification(O, C.sensor, D)
                    })
                })
            }
        }, {
            key: '_sendNotification',
            value: function(O, T, N) {
                var A = O + T + N;
                return m.containsEntry(A) ? (u.debug('value didnt change, omit call'), !1) : (m.addEntry(A), this.device.handleStateUpdate(O, T, N), !0)
            }
        }, {
            key: 'handleStateEvent',
            value: function(O) {
                if (!O) return void u.debug('invalid data recieved');
                var T = O.properties,
                    N = p.convertToNodeIdWithoutChildId(T.UID),
                    A = T['event.device.class.object.property.name'],
                    C = void 0,
                    D = void 0,
                    R = void 0,
                    P = void 0,
                    w = void 0;
                switch (A) {
                    case 'awake':
                        var L = T['com.prosyst.mbs.services.hdm.deviceclasses.BatteryLevel.lowBattery'];
                        if (L) {
                            this._sendNotification(N, 'SENSOR_BATTERY', 'lowBattery');
                            break
                        }
                        u.debug('not forwarding awake', {
                            id: N
                        });
                        break;
                    case 'value':
                        R = this.adapter.getSensorFromNotification(O), D = T[y][0] + '.type', P = f.parseScalingPropertyValue(T[g]), u.debug('forwarding value', {
                            id: N,
                            value: P,
                            class: C,
                            type: T[D]
                        }), this._sendNotification(N, R, P);
                        break;
                    case 'level':
                        R = this.adapter.getSensorFromNotification(O), P = f.parseScalingPropertyValue(T[g]), u.debug('forwarding level', {
                            id: N,
                            value: P,
                            neeoDeviceClass: R
                        }), w = this._sendNotification(N, R, P), w && (u.debug('send virtual sensor'), this._sendVirtualSensorsNotifications(N, P));
                        break;
                    case 'state':
                        R = this.adapter.getSensorFromNotification(O), C = T[y][0], P = T[g];
                        var k = this.adapter.transformNotification(P, C);
                        u.debug('forwarding state', {
                            id: N,
                            value: k,
                            class: C
                        }), w = this._sendNotification(N, R, k), w && this._sendVirtualSensorsNotifications(N, P);
                        break;
                    case 'total':
                        C = T[y][0], u.debug('Not forwarding total', {
                            id: N,
                            value: T[g],
                            class: C
                        });
                        break;
                    case 'current':
                        R = this.adapter.getSensorFromNotification(O), C = T[y][0], u.debug('forwarding current', {
                            id: N,
                            value: T[g],
                            class: C
                        }), this._sendNotification(N, R, T[g]);
                        break;
                    case 'alarm':
                        R = this.adapter.getSensorFromNotification(O), P = !1, u.debug('ZWAVE_ALARM', {
                            data: T[g]
                        }), T[g] && 'activated' === T[g].Severity && 0 !== T[g].EventCode && (P = !0), u.debug('forwarding, Alarm', {
                            id: N,
                            value: P,
                            class: R
                        }), w = this._sendNotification(N, R, P), w && (u.debug('send virtual sensor'), this._sendVirtualSensorsNotifications(N, P));
                        break;
                    case 'key':
                        R = this.adapter.getSensorFromNotification(O), P = T[g], u.debug('forwarding new key, UID: ' + N + ', Value: ' + JSON.stringify(P)), this._sendNotification(N, R, P);
                        break;
                    case 'houseId':
                        u.debug('Not forwarding, New House ID detected, UID: ' + N + ', Value:', JSON.stringify(T[g])), u.debug('CP6 Controller was in the LEARN mode -> now part of a new ZWave network + all devices reset + new home id is used');
                        break;
                    case 'isPrimary':
                        u.debug('Not forwarding isPrimary', {
                            id: N,
                            value: T[g]
                        });
                        break;
                    case 'isSecondary':
                        u.debug('Not forwarding isSecondary', {
                            id: N,
                            value: T[g]
                        });
                        break;
                    case 'isRealPrimary':
                        u.debug('Not forwarding isRealPrimary', {
                            id: N,
                            value: T[g]
                        });
                        break;
                    case 'isSUCPresent':
                        u.debug('Not forwarding isSUCPresent', {
                            id: N,
                            value: T[g]
                        });
                        break;
                    case 'isSUCSIS':
                        u.debug('Not forwarding isSUCSIS', {
                            id: N,
                            value: T[g]
                        });
                        break;
                    case 'sucNodeId':
                        u.debug('Not forwarding sucNodeId', {
                            id: N,
                            value: T[g]
                        });
                        break;
                    case 'version':
                        u.debug('Not forwarding version', {
                            id: N,
                            value: T[g]
                        });
                        break;
                    case 'protectionStates':
                        u.debug('Not forwarding protectionStates', {
                            id: N,
                            value: T[g]
                        });
                        break;
                    case 'protectionState':
                        u.debug('Not forwarding protectionState', {
                            id: N,
                            value: T[g]
                        });
                        break;
                    case 'override':
                        u.debug('Not forwarding override', {
                            id: N,
                            value: T[g]
                        });
                        break;
                    case 'configuration':
                        u.debug('Not forwarding configuration', {
                            id: N,
                            value: T[g]
                        });
                        break;
                    case 'role':
                        u.debug('Not forwarding role', {
                            id: N,
                            value: T[g]
                        });
                        break;
                    case 'mode':
                        u.debug('not forwarding mode', {
                            id: N,
                            mode: T['com.prosyst.mbs.services.hdm.deviceclasses.NetworkController.mode']
                        });
                        break;
                    case 'time':
                        u.debug('not forwarding time', {
                            id: N,
                            time: T[g]
                        });
                        break;
                    case 'colors':
                        u.debug('Not forwarding colors', {
                            id: N,
                            value: T[g]
                        });
                        break;
                    case 'temperature':
                        u.debug('Not forwarding temperature', {
                            id: N,
                            value: T[g]
                        });
                        break;
                    case 'batteryLevel':
                        u.debug('not forwarding batteryLevel', {
                            id: N,
                            value: T[g]
                        });
                        break;
                    case 'lowBattery':
                        u.debug('Not forwarding lowBattery, convered by awake check', {
                            id: N,
                            value: T[g]
                        });
                        break;
                    default:
                        u.warn('ZWAVE_NOTIFICATION_NOT_IMPLEMENTED', A);
                }
                return A
            }
        }], [{
            key: '_getSubscriptions',
            value: function(O, T) {
                var N = T.replace(':secure', ''),
                    A = T + ':secure',
                    C = O[T] || [];
                return /\:secure$/.test(T) && O[N] ? C = C.concat(O[N]) : O[A] && (C = C.concat(O[A])), C
            }
        }, {
            key: 'parseScalingPropertyValue',
            value: function(O) {
                if (void 0 !== ('undefined' == typeof O ? 'undefined' : d(O)) && void 0 !== O) {
                    var T = /^([0-9]*[.]?[0-9])+\s+\[(\d)\]$/;
                    if (T.test(O)) {
                        var N = T.exec(O);
                        return N[1]
                    }
                    return 'string' == typeof O ? (+O.split(' ')[0]).toString() : '' + O
                }
            }
        }]), f
    }()
}, function(t, r, o) {o(0)("Function 160").verbose("ZWave:Devicelookup");
    'use strict';
    var n = o(0)('ZWave:Devicelookup'),
        d = o(22),
        c = 'zwave.manufacturer_specific.manufacturer_id';
    t.exports.lookupZwaveDevice = function(y) {
        var S = {
            name: 'Z-Wave Device',
            type: 'Z-Wave',
            manufacturer: 'Unknown',
            isValid: !0
        };
        if (!y || !y[c]) return n.warn('INVALID_DEVICE_PROPERTIES', y), S.isValid = !1, S;
        var f = y[c],
            I = y['zwave.manufacturer_specific.product_type_id'],
            O = y['zwave.manufacturer_specific.product_id'],
            T = d.findFirstExactMatch(function(N) {
                return N && N.device && 'zwave' === N.adapterName ? N.device.manufacturerid === f && N.device.producttype === I && N.device.productid === O || void 0 : void 0
            });
        return T ? (S.name = T.name, S.type = T.type, S.manufacturer = T.manufacturer, S.dbId = T.id) : n.warn('ZWAVE_UNKNOWN_DEVICE_FOUND', {
            prosystProperties: y
        }), S
    }
}, function(t, r, o) {o(0)("Function 161").verbose("Zwave:Capabilities");
    'use strict';
    var n = o(60),
        d = o(190),
        c = o(11),
        u = o(17),
        p = o(54),
        m = o(0)('ZWave:Capabilities'),
        E = o(31),
        g = o(16),
        y = o(29),
        S = 'DeviceClassType';
    r.buildCapabilities = function(O, T) {
        var A = function(L) {
                return -1 < L.indexOf('#') ? '+' + L.split('#')[1] : ''
            }(O),
            C = E.isUidSecure(O),
            D = [];
        if (!n(T)) return m.debug('deviceClassObjects is not an Array!'), D;
        var R = g.getSupportedDeviceClasses().filter(function(w) {
                return w !== y.getProsystDeviceClass()
            }),
            P = T.some(function(w) {
                return R.includes(w.DeviceClass)
            });
        return P && d(T, {
            DeviceClass: y.getProsystDeviceClass()
        }), T.forEach(function(w) {
            switch (w[S]) {
                case 'Sensor':
                    D.push(u.buildNeeoSensor(w, A, C));
                    break;
                case 'Actuator':
                case void 0:
                    D.push(p.buildNeeoActuator(w, A, C, u));
                    break;
                default:
                    m.warn('ZWAVE_CAPABILITY_NOT_IMPLEMENTED', {
                        deviceClass: w,
                        key: S,
                        value: w[S]
                    });
            }
        }), c(D).filter(function(w) {
            return w
        })
    }
}, function(t, r, o) {o(0)("Function 162").verbose("com.prosyst.mbs.services.hdm.deviceclasses.BinarySensor");
    'use strict';

    function n(g, y) {
        if (!(g instanceof y)) throw new TypeError('Cannot call a class as a function')
    }

    function d(g, y) {
        if (!g) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return y && ('object' == typeof y || 'function' == typeof y) ? y : g
    }

    function c(g, y) {
        if ('function' != typeof y && null !== y) throw new TypeError('Super expression must either be null or a function, not ' + typeof y);
        g.prototype = Object.create(y && y.prototype, {
            constructor: {
                value: g,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), y && (Object.setPrototypeOf ? Object.setPrototypeOf(g, y) : g.__proto__ = y)
    }
    var u = function() {
            function g(y, S) {
                for (var f = 0, I; f < S.length; f++) I = S[f], I.enumerable = I.enumerable || !1, I.configurable = !0, 'value' in I && (I.writable = !0), Object.defineProperty(y, I.key, I)
            }
            return function(y, S, f) {
                return S && g(y.prototype, S), f && g(y, f), y
            }
        }(),
        p = o(8),
        m = o(9),
        E = 'com.prosyst.mbs.services.hdm.deviceclasses.BinarySensor';
    t.exports = function(g) {
        function y() {
            return n(this, y), d(this, (y.__proto__ || Object.getPrototypeOf(y)).apply(this, arguments))
        }
        return c(y, g), u(y, null, [{
            key: 'matchProsystDeviceClass',
            value: function(f) {
                return E === f
            }
        }, {
            key: 'getProsystDeviceClass',
            value: function() {
                return E
            }
        }, {
            key: 'matchNeeoDeviceClass',
            value: function() {
                return !1
            }
        }, {
            key: 'transformSensorResult',
            value: function(f) {
                return p.removeNonSensorValueParts(f)
            }
        }]), y
    }(m)
}, function(t, r, o) {o(0)("Function 163").verbose("com.prosyst.mbs.services.hdm.deviceclasses.BinarySwitch");
    'use strict';

    function n(y, S) {
        if (!(y instanceof S)) throw new TypeError('Cannot call a class as a function')
    }

    function d(y, S) {
        if (!y) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return S && ('object' == typeof S || 'function' == typeof S) ? S : y
    }

    function c(y, S) {
        if ('function' != typeof S && null !== S) throw new TypeError('Super expression must either be null or a function, not ' + typeof S);
        y.prototype = Object.create(S && S.prototype, {
            constructor: {
                value: y,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), S && (Object.setPrototypeOf ? Object.setPrototypeOf(y, S) : y.__proto__ = S)
    }
    var u = function() {
            function y(S, f) {
                for (var I = 0, O; I < f.length; I++) O = f[I], O.enumerable = O.enumerable || !1, O.configurable = !0, 'value' in O && (O.writable = !0), Object.defineProperty(S, O.key, O)
            }
            return function(S, f, I) {
                return f && y(S.prototype, f), I && y(S, I), S
            }
        }(),
        p = o(8),
        m = o(9),
        E = 'com.prosyst.mbs.services.hdm.deviceclasses.BinarySwitch',
        g = 'binaryswitch';
    t.exports = function(y) {
        function S() {
            return n(this, S), d(this, (S.__proto__ || Object.getPrototypeOf(S)).apply(this, arguments))
        }
        return c(S, y), u(S, null, [{
            key: 'matchProsystDeviceClass',
            value: function(I) {
                return E === I
            }
        }, {
            key: 'getProsystDeviceClass',
            value: function() {
                return E
            }
        }, {
            key: 'matchNeeoDeviceClass',
            value: function(I) {
                return -1 < [g, 'setbinaryswitch', 'getbinaryswitch', 'turnOff', 'turnOn'].indexOf(I)
            }
        }, {
            key: 'buildNeeoDeviceClass',
            value: function() {
                return {
                    name: g,
                    label: 'Toggle'
                }
            }
        }, {
            key: 'transformSensorResult',
            value: function(I) {
                return 1 === I || '1' === I
            }
        }, {
            key: 'transformEventValue',
            value: function(I) {
                return 'true' === I || !0 === I ? 'turnOn' : 'turnOff'
            }
        }, {
            key: 'buildRWActuator',
            value: function(I, O, T) {
                var N = p.getActuatorPrefix(T);
                return {
                    type: 'switch',
                    name: g.toUpperCase() + ' On/Off' + O,
                    label: p.humanizeLabel('Toggle', O),
                    sensor: p.buildNeeoSensorName(g, O),
                    path: N + g + O
                }
            }
        }, {
            key: 'buildREActuator',
            value: function(I, O, T) {
                var N = p.getEventPrefix(T);
                return {
                    type: 'switch',
                    name: g.toUpperCase() + ' On/Off' + O,
                    label: p.humanizeLabel('Toggle', O),
                    sensor: p.buildNeeoSensorName(g, O),
                    path: N + g + O
                }
            }
        }, {
            key: 'buildEventActuator',
            value: function(I, O, T) {
                var N = [],
                    A = p.getActuatorPrefix(T);
                return I.Operations.forEach(function(C) {
                    N.push({
                        type: 'button',
                        label: p.humanizeLabel(C.Name, O),
                        name: C.Name + O,
                        path: A + C.Name + O
                    })
                }), N
            }
        }]), S
    }(m)
}, function(t, r, o) {o(0)("Function 164").verbose("com.prosyst.mbs.services.zwave.deviceclasses.ColorSwitch");
    'use strict';

    function n(g, y) {
        if (!(g instanceof y)) throw new TypeError('Cannot call a class as a function')
    }

    function d(g, y) {
        if (!g) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return y && ('object' == typeof y || 'function' == typeof y) ? y : g
    }

    function c(g, y) {
        if ('function' != typeof y && null !== y) throw new TypeError('Super expression must either be null or a function, not ' + typeof y);
        g.prototype = Object.create(y && y.prototype, {
            constructor: {
                value: g,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), y && (Object.setPrototypeOf ? Object.setPrototypeOf(g, y) : g.__proto__ = y)
    }
    var u = function() {
            function g(y, S) {
                for (var f = 0, I; f < S.length; f++) I = S[f], I.enumerable = I.enumerable || !1, I.configurable = !0, 'value' in I && (I.writable = !0), Object.defineProperty(y, I.key, I)
            }
            return function(y, S, f) {
                return S && g(y.prototype, S), f && g(y, f), y
            }
        }(),
        p = o(8),
        m = o(9),
        E = 'com.prosyst.mbs.services.zwave.deviceclasses.ColorSwitch';
    t.exports = function(g) {
        function y() {
            return n(this, y), d(this, (y.__proto__ || Object.getPrototypeOf(y)).apply(this, arguments))
        }
        return c(y, g), u(y, null, [{
            key: 'matchProsystDeviceClass',
            value: function(f) {
                return E === f
            }
        }, {
            key: 'getProsystDeviceClass',
            value: function() {
                return E
            }
        }, {
            key: 'matchNeeoDeviceClass',
            value: function(f) {
                return -1 < [].indexOf(f)
            }
        }, {
            key: 'buildNeeoDeviceClass',
            value: function() {
                return {
                    name: '',
                    label: 'Color Switch'
                }
            }
        }, {
            key: 'buildEventActuator',
            value: function(f, I, O) {
                var T = [],
                    N = p.getActuatorPrefix(O);
                return f.Operations.forEach(function(A) {
                    T.push({
                        type: 'button',
                        label: p.humanizeLabel(A.Name, I),
                        name: A.Name + I,
                        path: N + A.Name + I
                    })
                }), T
            }
        }]), y
    }(m)
}, function(t, r, o) {o(0)("Function 165").verbose("com.prosyst.mbs.services.zwave.deviceclasses.Keypad");
    'use strict';

    function n(E, g) {
        if (!(E instanceof g)) throw new TypeError('Cannot call a class as a function')
    }

    function d(E, g) {
        if (!E) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return g && ('object' == typeof g || 'function' == typeof g) ? g : E
    }

    function c(E, g) {
        if ('function' != typeof g && null !== g) throw new TypeError('Super expression must either be null or a function, not ' + typeof g);
        E.prototype = Object.create(g && g.prototype, {
            constructor: {
                value: E,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), g && (Object.setPrototypeOf ? Object.setPrototypeOf(E, g) : E.__proto__ = g)
    }
    var u = function() {
            function E(g, y) {
                for (var S = 0, f; S < y.length; S++) f = y[S], f.enumerable = f.enumerable || !1, f.configurable = !0, 'value' in f && (f.writable = !0), Object.defineProperty(g, f.key, f)
            }
            return function(g, y, S) {
                return y && E(g.prototype, y), S && E(g, S), g
            }
        }(),
        p = o(9),
        m = 'com.prosyst.mbs.services.zwave.deviceclasses.Keypad';
    t.exports = function(E) {
        function g() {
            return n(this, g), d(this, (g.__proto__ || Object.getPrototypeOf(g)).apply(this, arguments))
        }
        return c(g, E), u(g, null, [{
            key: 'matchProsystDeviceClass',
            value: function(S) {
                return m === S
            }
        }, {
            key: 'getProsystDeviceClass',
            value: function() {
                return m
            }
        }, {
            key: 'matchNeeoDeviceClass',
            value: function() {
                return !1
            }
        }, {
            key: 'buildNeeoDeviceClass',
            value: function() {
                return {
                    name: 'keypad',
                    label: 'Keypad'
                }
            }
        }]), g
    }(p)
}, function(t, r, o) {o(0)("Function 166").verbose("com.prosyst.mbs.services.hdm.deviceclasses.MultiLevelSensor");
    'use strict';

    function n(g, y) {
        if (!(g instanceof y)) throw new TypeError('Cannot call a class as a function')
    }

    function d(g, y) {
        if (!g) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return y && ('object' == typeof y || 'function' == typeof y) ? y : g
    }

    function c(g, y) {
        if ('function' != typeof y && null !== y) throw new TypeError('Super expression must either be null or a function, not ' + typeof y);
        g.prototype = Object.create(y && y.prototype, {
            constructor: {
                value: g,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), y && (Object.setPrototypeOf ? Object.setPrototypeOf(g, y) : g.__proto__ = y)
    }
    var u = function() {
            function g(y, S) {
                for (var f = 0, I; f < S.length; f++) I = S[f], I.enumerable = I.enumerable || !1, I.configurable = !0, 'value' in I && (I.writable = !0), Object.defineProperty(y, I.key, I)
            }
            return function(y, S, f) {
                return S && g(y.prototype, S), f && g(y, f), y
            }
        }(),
        p = o(8),
        m = o(9),
        E = 'com.prosyst.mbs.services.hdm.deviceclasses.MultiLevelSensor';
    t.exports = function(g) {
        function y() {
            return n(this, y), d(this, (y.__proto__ || Object.getPrototypeOf(y)).apply(this, arguments))
        }
        return c(y, g), u(y, null, [{
            key: 'matchProsystDeviceClass',
            value: function(f) {
                return E === f
            }
        }, {
            key: 'getProsystDeviceClass',
            value: function() {
                return E
            }
        }, {
            key: 'matchNeeoDeviceClass',
            value: function() {
                return !1
            }
        }, {
            key: 'transformSensorResult',
            value: function(f) {
                return p.removeNonSensorValueParts(f)
            }
        }]), y
    }(m)
}, function(t, r, o) {o(0)("Function 167").verbose("Lookup or add entry from list; unclear what list");
    'use strict';
    var n = o(5).zwave,
        d = n.prosystNotificationCacheTimeoutMs,
        c = n.prosystNotificationCacheLimit,
        u = [],
        p = 0;
    t.exports.containsEntry = function(m) {
        var E = u.find(function(g) {
            var y = Date.now() - g.timestamp;
            if (m === g.value && y < d) return !0
        });
        return E !== void 0
    }, t.exports.addEntry = function(m) {
        u[p++] = {
            timestamp: Date.now(),
            value: m
        }, p %= c
    }, t.exports.clear = function() {
        u.length = 0, p = 0
    }
}, function(t, r, o) {o(0)("Function 168").verbose("Router:  Capability");
    'use strict';
    var n = o(7),
        d = n.Router(),
        c = o(22),
        u = o(18);
    d.get('/:capability', function(p, m) {
        var E = u.getRequestParameter(p, 'capability', {
            presence: !0
        });
        m.json(c.findAdapterWithCapability(E))
    }), t.exports = d
}, function(t, r, o) {o(0)("Function 169").verbose("Router: /powerscan/:scanDurationMs ");
    'use strict';
    var n = o(7),
        d = n.Router(),
        c = o(4);

    d.get('/powerscan/:scanDurationMs', function(u, p) {
        var m = u.params.scanDurationMs;
        c.forcePowerScan(m).then(function() {
            p.json()
        })
    }), t.exports = d
}, function(t, r, o) {o(0)("Function 170").verbose("Router: Config get and post");
    'use strict';
    var n = o(7),
        d = n.Router(),
        c = o(15),
        u = o(0)('Config Route');
    d.get('/', function(p, m) {
        var E = c.loadAll();
        m.json(E)
    }), d.post('/', function(p, m) {
        var E = p.body;
        c.saveAll(E), m.json({
            success: !0
        }), u.info('EXIT_DEVICEADAPTER'), process.exit(0)
    }), t.exports = d
}, function(t, r, o) {o(0)("Function 171").verbose("Router: search and /:device_id");
    'use strict';
    var n = o(7),
        d = n.Router(),
        c = o(22),
        u = o(18);
    d.get('/search', function(p, m) {
        var E = p.query.q;
        E && E.length ? m.json(c.search(E)) : m.json([])
    }), d.get('/:device_id', function(p, m) {
        var E = u.getRequestParameter(p, 'device_id', {
            presence: !0
        });
        m.json(c.getDevice(E))
    }), t.exports = d
}, function(t) {//#o(0)("Function 172").verbose("parseItemParam (check input for '.' then parseint on 2nd part of item)");
    'use strict';
    t.exports.parseItemParam = function(d) {
        if (!d || 'string' != typeof d) throw new Error('invalid item param');
        var c = d.includes('.') ? d.lastIndexOf('.') : d.length + 1,
            u = d.slice(0, c),
            p = d.slice(c + 1);
        if (!u) throw new Error('invalid item uri');
        var m = parseInt(p, 10);
        return {
            browseItem: decodeURIComponent(u),
            index: 0 <= m ? m : void 0
        }
    }
}, function(t, r, o) {o(0)("Function 173").verbose("Router: Hue");
    'use strict';

    function n(g) {
        return function(y, S, f) {
            y.adapter.getStatus(y.type, y.id).then(function(I) {
                var O = I.state[g];
                S.json({
                    value: O
                })
            }).catch(f)
        }
    }
    var d = o(7),
        c = d.Router(),
        u = o(23),
        p = o(18),
        m = o(0)('Hue Route'),
        E = o(6);
    c.param('id', function(g, y, S, f) {
        var I = u.parseId(f);
        g.adapter = u.getAdapter({
            id: I.bridgeuid
        }), g.type = I.type, g.id = I.id, m.debug('hue adapter', I), S()
    }), c.get('/alloff/:id', function(g, y, S) {
        g.adapter.allOff().then(function() {
            return y.json({
                success: !0
            })
        }).catch(S)
    }), c.get('/state/:id', function(g, y) {
        g.adapter.getState().then(function(S) {
            return y.json(S)
        })
    }), c.get('/hsl/:id', n('hsl')), c.get('/hsl/:id/:value', function(g, y, S) {
        var f = p.getRequestParameterInteger(g, 'value', {
            presence: !0
        });
        g.adapter.setHsl(g.type, g.id, f).then(function() {
            return y.json({
                success: !0
            })
        }).catch(S)
    }), c.get('/color/:id', n('hue')), c.get('/color/:id/:value', function(g, y, S) {
        var f = p.getRequestParameterInteger(g, 'value', {
            presence: !0
        });
        g.adapter.setHue(g.type, g.id, f).then(function() {
            return y.json({
                success: !0
            })
        }).catch(S)
    }), c.get('/colored/:id', function(g, y, S) {
        g.adapter.isColored(g.type, g.id).then(function(f) {
            return y.json({
                value: f
            })
        }).catch(S)
    }), c.get('/colored/:id/:value', function(g, y, S) {
        var f = /true/.test(g.params.value);
        g.adapter.setColored(g.type, g.id, f).then(function() {
            return y.json({
                success: !0
            })
        }).catch(S)
    }), c.get('/brightness/:id', n('bri')), c.get('/brightness/:id/:value', function(g, y, S) {
        var f = p.getRequestParameterInteger(g, 'value', {
            presence: !0
        });
        g.adapter.setBrightness(g.type, g.id, f).then(function() {
            return y.json({
                success: !0
            })
        }).catch(S)
    }), c.get('/saturation/:id', n('sat')), c.get('/saturation/:id/:value', function(g, y, S) {
        var f = p.getRequestParameterInteger(g, 'value', {
            presence: !0
        });
        g.adapter.setSaturation(g.type, g.id, f).then(function() {
            return y.json({
                success: !0
            })
        }).catch(S)
    }), c.get('/color-temperature/:id', n('ct')), c.get('/color-temperature/:id/:value', function(g, y, S) {
        var f = p.getRequestParameterInteger(g, 'value', {
            presence: !0
        });
        g.adapter.setColorTemperature(g.type, g.id, f).then(function() {
            return y.json({
                success: !0
            })
        }).catch(S)
    }), c.get('/on/:id', n('on')), c.get('/on/:id/:value', function(g, y, S) {
        var f = /true/.test(g.params.value);
        g.adapter.setOnState(g.type, g.id, f).then(function() {
            return y.json({
                success: !0
            })
        }).catch(S)
    }), c.get('/poweron/:id', function(g, y, S) {
        g.adapter.setOnState(g.type, g.id, !0).then(function() {
            return y.json({
                success: !0
            })
        }).catch(S)
    }), c.get('/poweroff/:id', function(g, y, S) {
        g.adapter.setOnState(g.type, g.id, !1).then(function() {
            return y.json({
                success: !0
            })
        }).catch(S)
    }), c.use(function(g, y, S, f) {
        f || m.debug('EXPRESS_NEEDS_NEXT_PARAMETER_WEBPACK_TOO'), E.increaseCounter('HUE_' + g.message), S.status(g.status || 500), S.json({
            message: g.message,
            error: {}
        })
    }), t.exports = c
}, function(t, r, o) {o(0)("Function 174").verbose("router: Route manager");
    'use strict';

    function n(m) {
        return function(E, g, y) {
            E.adapter[m](E.type, E.id).then(function(S) {
                S ? g.json(S) : g.json({
                    success: !0
                })
            }).catch(function(S) {
                u.error('ADAPTER_FAILED', {
                    msg: S.message,
                    adapterName: E.adapterName,
                    fn: m
                }), y(S)
            })
        }
    }
    var d = o(7),
        c = d.Router(),
        u = o(0)('Route Manager'),
        p = o(140);
    c.param('adapterName', function(m, E, g, y) {
        m.adapterName = y, m.adapter = p.getAdapter(y), g()
    }), c.use('/:adapterName/cancel', n('cancel')), c.use('/:adapterName/discover', n('discover')), c.use('/:adapterName/registered', n('registered')), c.post('/:adapterName/register', function(m, E) {
        var g = m.body.username,
            y = m.body.password;
        m.adapter.register({
            username: g,
            password: y
        }).then(function(S) {
            u.info('REGISTER_SUCCEEDED', {
                name: m.adapterName
            }), S ? E.json(S) : E.json({
                success: !0
            })
        }).catch(function(S) {
            S.message && !S.message.includes('ALREADY_PAIRED') && u.warn('REGISTER_FAILED', S.message), E.status(S.status || 403), E.json({
                message: S.message,
                error: {}
            })
        })

    }),
    c.post('/deviceadapter/metaMessageHandler',function (req, res) {res.json(metaMessageHandler(req,res,u))}),
    // above express route handles dynamic loglevel (changes)

    c.use('/:adapterName/unregister', n('unregister')), c.get('/:adapterName/subscribe/:deviceId/:eventUriPrefix', function(m, E, g) {
        var y = m.params.deviceId,
            S = m.params.eventUriPrefix;
        return 'function' == typeof m.adapter.subscribe ? void m.adapter.subscribe(y, S).then(function() {
            E.json({
                success: !0
            })
        }).catch(function(f) {
            u.warn('SUBSCRIBE_FAILED', f.message), g(f)
        }) : void E.json({
            success: !0
        })
    }), c.get('/:adapterName/unsubscribe/:deviceId', function(m, E, g) {
        var y = m.params.deviceId;
        return m.adapter && 'function' == typeof m.adapter.unsubscribe ? void m.adapter.unsubscribe(y).then(function() {
            E.json({
                success: !0
            })
        }).catch(function(S) {
            u.warn('UNSUBSCRIBE_FAILED', S.message), g(S)
        }) : (u.debug('adapter unsubscribe not found', m.adapterName), void E.json({
            success: !0
        }))
    }), c.get('/unsubscribeall', n('unsubscribeAll')), t.exports = c
}, function(t, r, o) {o(0)("Function 175").verbose("Router: db");
    'use strict';
    var n = o(7),
        d = n.Router(),
        c = o(18),
        u = o(14),
        p = {
            presence: !0
        };
    d.get('/db/search', function(m, E) {
        var g = m.query.q;
        g && g.length ? E.json(u.searchDevice(g)) : E.json([])
    }), d.get('/db/adapterdefinition/:adapter_name', function(m, E, g) {
        var y = c.getRequestParameter(m, 'adapter_name', p);
        u.getAdapterDefinition(y).then(function(S) {
            E.json(S)
        }).catch(g)
    }), d.get('/db/:device_id', function(m, E) {
        var g = c.getRequestParameter(m, 'device_id', p);
        E.json(u.getDevice(g))
    }), t.exports = d
}, function(t, r, o) {o(0)("Function 176").verbose("Router: Sonos Route");
    'use strict';

    function d(I) {
        return function(O, T) {
            var N = decodeURIComponent(O.params.roomname);
            O.adapter[I](N, O.params.value).then(function(A) {
                A ? T.json(A) : T.json({
                    success: !0
                })
            }).catch(function(A) {
                S.increaseCounter('SONOSACTION_' + A.message), T.status(A.status || 500), T.json({
                    message: A.message,
                    error: {}
                })
            })
        }
    }

    function c(I, O, T) {
        var N = I.params.item;
        I.itemParams = f.parseItemParam(N), T()
    }

    function u(I) {
        return function(O, T, N) {
            var A = decodeURIComponent(O.params.roomname);
            O.adapter[I](A).then(function(C) {
                T.json({
                    value: C
                })
            }).catch(N)
        }
    }
    var p = o(7),
        m = o(0)('Sonos Route'),
        E = p.Router(),
        g = o(27),
        y = o(56),
        S = o(6),
        f = o(172);
    E.all('*', function(I, O, T) {
        I.adapter = g.getAdapter(), T()
    }), E.get('/next/:roomname', d('nextTrack')), E.get('/previous/:roomname', d('previousTrack')), E.get('/playpause/:roomname', d('playToggle')), E.get('/playtoggle/:roomname/true', d('play')), E.get('/playtoggle/:roomname/false', d('pause')), E.get('/play/:roomname', d('play')), E.get('/pause/:roomname', d('pause')), E.get('/volumeup/:roomname', d('volumeUp')), E.get('/volumedown/:roomname', d('volumeDown')), E.get('/mute/:roomname', d('muteToggle')), E.get('/mute/:roomname/:value', d('mute')), E.get('/volume/:roomname/:value', d('setVolume')), E.get('/repeattoggle/:roomname', d('repeatToggle')), E.get('/shuffletoggle/:roomname', d('shuffleToggle')), E.get('/queue/use/:roomname', d('useQueue')), E.get('/queue/clear/:roomname', d('clearQueue')), E.get('/queue/get/:roomname', function(I, O) {
        O.json({})
    }), E.post('/queue/browse/:roomname', function(I, O, T) {
        I.body.browseUri = 'Q:0', I.url = I._parsedUrl.pathname.replace('/queue/browse', '/browse'), T()
    }), E.post('/queue/add/:roomname', function(I, O, T) {
        y(I.params, {
            roomname: {
                presence: !0
            }
        });
        var N = decodeURIComponent(I.params.roomname);
        y(I.body, {
            directoryId: {
                presence: !0
            },
            actionUri: {
                presence: !0
            }
        });
        var A = {
            directoryId: I.body.directoryId,
            actionUri: I.body.actionUri,
            metaData: I.body.metaData,
            playNow: /true/.test(I.body.playNow),
            playNext: /true/.test(I.body.playNext),
            spotifyUsername: I.body.spotifyUsername
        };
        I.adapter.addToQueue(N, A).then(function(C) {
            O.json(C)
        }).catch(T)
    }), E.post('/queue/remove/:roomname', function(I, O, T) {
        y(I.params, {
            roomname: {
                presence: !0
            }
        }), y(I.body, {
            index: {
                presence: !0,
                numericality: {
                    onlyInteger: !0
                }
            }
        });
        var N = I.params.roomname,
            A = I.body.index + 1;
        I.adapter.removeFromQueue(N, A).then(function() {
            O.json({
                success: !0
            })
        }).catch(T)
    }), E.post('/seek/:roomname', function(I, O, T) {
        y(I.params, {
            roomname: {
                presence: !0
            }
        }), y(I.body, {
            index: {
                presence: !0,
                numericality: {
                    onlyInteger: !0
                }
            }
        });
        var N = decodeURIComponent(I.params.roomname);
        I.adapter.seek(N, I.body.index).then(function(A) {
            O.json(A)
        }).catch(T)
    }), E.get('/seek/:roomname/:item/:spotifyUsername?', c, function(I, O, T) {
        y(I.params, {
            roomname: {
                presence: !0
            }
        });
        var N = decodeURIComponent(I.params.roomname),
            A = I.itemParams,
            C = I.params.spotifyUsername;
        C && (A.spotifyUsername = C), I.adapter.seek(N, A.index).then(function(D) {
            O.json(D)
        }).catch(T)
    }), E.get('/playnow/:roomname/:item/:spotifyUsername?', c, function(I, O, T) {
        y(I.params, {
            roomname: {
                presence: !0
            }
        });
        var N = decodeURIComponent(I.params.roomname),
            A = I.itemParams;
        A.playNow = !0;
        var C = I.params.spotifyUsername;
        C && (A.spotifyUsername = C), I.adapter.queueItems(N, A).then(function(D) {
            O.json(D)
        }).catch(T)
    }), E.get('/playshuffle/:roomname/:item/:spotifyUsername?', c, function(I, O, T) {
        y(I.params, {
            roomname: {
                presence: !0
            }
        });
        var N = decodeURIComponent(I.params.roomname),
            A = I.itemParams;
        A.playNow = !0;
        var C = I.params.spotifyUsername;
        C && (A.spotifyUsername = C), I.adapter.playAndShuffle(N, A).then(function(D) {
            O.json(D)
        }).catch(T)
    }), E.post('/addToInstantFavorites/:roomname', function(I, O, T) {
        var N = decodeURIComponent(I.params.roomname);
        I.adapter.addToInstantFavorites(N, I.body.item, I.body.position).then(function(A) {
            O.json(A)
        }).catch(T)
    }), E.get('/state/:roomname', u('getState')), E.get('/getvolume/:roomname', u('getVolume')), E.get('/muted/:roomname', u('isMuted')), E.get('/playing/:roomname', u('isPlaying')), E.get('/currentcover/:roomname', u('currentCoverUrl')), E.post('/browse/:roomname', function(I, O, T) {
        y(I.params, {
            roomname: {
                presence: !0
            }
        });
        var N = decodeURIComponent(I.params.roomname);
        I.adapter.browse(N, I.body || {}).then(function(A) {
            O.json(A)
        }).catch(T)
    }), E.use(function(I, O, T, N) {
        N || m.debug('EXPRESS_NEEDS_NEXT_PARAMETER_WEBPACK_TOO'), S.increaseCounter('SONOS_' + I.message), T.status(I.status || 500), T.json({
            message: I.message,
            error: {}
        })
    }), t.exports = E
}, function(t, r, o) {o(0)("Function 177").verbose("Router: zwave");
    'use strict';

    function d(N, A) {
        return function(C, D, R) {
            C.adapter[N](C.params.deviceId, C.params.sensorname, A).then(function(P) {
                D.json({
                    value: P
                })
            }).catch(R)
        }
    }

    function c(N, A) {
        return function(C, D, R) {
            C.adapter[N](C.params.deviceId, C.params.sensorname, A, C.params.virtualSensorName).then(function(P) {
                D.json({
                    value: P
                })
            }).catch(R)
        }
    }

    function u() {
        return function(N, A) {
            A.json({
                value: 0
            })
        }
    }

    function p(N, A) {
        return function(C, D, R) {
            C.adapter[N](C.params.deviceId, C.params.actuatorname, C.params.value, A).then(function() {
                D.json({
                    success: !0
                })
            }).catch(R)
        }
    }

    function m(N) {
        return T.some(function(A) {
            return A.test(N)
        })
    }
    var E = function() {
            function N(A, C) {
                var D = [],
                    R = !0,
                    P = !1,
                    w = void 0;
                try {
                    for (var L = A[Symbol.iterator](), U; !(R = (U = L.next()).done) && (D.push(U.value), !(C && D.length === C)); R = !0);
                } catch (k) {
                    P = !0, w = k
                } finally {
                    try {
                        !R && L['return'] && L['return']()
                    } finally {
                        if (P) throw w
                    }
                }
                return D
            }
            return function(A, C) {
                if (Array.isArray(A)) return A;
                if (Symbol.iterator in Object(A)) return N(A, C);
                throw new TypeError('Invalid attempt to destructure non-iterable instance')
            }
        }(),
        g = o(1),
        y = o(7),
        S = y.Router(),
        f = o(28),
        I = o(0)('ZWave Route'),
        O = o(6);
    S.get('/getZWaveDebugInfo', function(N, A, C) {
        g.all([f.getControllerRole(), f.getAllDevices()]).then(function(D) {
            var R = E(D, 2),
                P = R[0],
                w = R[1];
            I.debug('ZWAVE_DEBUG_INFO_SUCCEEDED'), A.json({
                controllerRole: P,
                devices: w
            })
        }).catch(function(D) {
            I.warn('ZWAVE_DEBUG_INFO_FAILED', D.message), C(D)
        })
    }), S.get('/controllerlearn', function(N, A, C) {
        f.controllerlearn().then(function(D) {
            I.debug('ZWAVE_CONTROLLERLEARN_SUCCEEDED'), A.json(D)
        }).catch(function(D) {
            I.warn('ZWAVE_CONTROLLERLEARN_FAILED', D.message), C(D)
        })
    }), S.get('/unregister', function(N, A, C) {
        f.unregister().then(function(D) {
            I.debug('ZWAVE_UNREGISTER_SUCCEEDED'), A.json(D)
        }).catch(function(D) {
            I.warn('ZWAVE_UNREGISTER_FAILED', D.message), C(D)
        })
    }), S.get('/forceunregister/:deviceId', function(N, A, C) {
        var D = N.params.deviceId;
        I.debug('forceunregister of ' + D), f.forceunregister(D).then(function(R) {
            I.debug('ZWAVE_FORCEUNREGISTER_SUCCEEDED'), A.json(R)
        }).catch(function(R) {
            I.warn('ZWAVE_FORCEUNREGISTER_FAILED', R.message), C(R)
        })
    }), S.get('/replacefailednode/:deviceId', function(N, A, C) {
        var D = N.params.deviceId;
        I.debug('replaceFailedNode of ' + D), f.replaceFailedNode(D).then(function(R) {
            I.debug('ZWAVE_REPLACEFAILEDNODE_SUCCEEDED'), A.json(R)
        }).catch(function(R) {
            I.warn('ZWAVE_REPLACEFAILEDNODE_FAILED', R.message), C(R)
        })
    }), S.get('/replicateZWaveNetworkInformation', function(N, A, C) {
        I.debug('replicating z-wave network information'), f.replicateZWaveNetworkInformation().then(function(D) {
            A.json(D)
        }).catch(C)
    }), S.get('/getControllerRole', function(N, A, C) {
        I.debug('get controller role'), f.getControllerRole().then(function(D) {
            A.json(D)
        }).catch(C)
    }), S.get('/getZWaveParameter/:nodeId/:parameterId', function(N, A, C) {
        var D = N.params.nodeId,
            R = N.params.parameterId;
        I.debug('getting Z-Wave device parameter', D, R), f.getZWaveParameter(D, R).then(function(P) {
            A.json(P)
        }).catch(C)
    }), S.post('/setZWaveParameter/:nodeId', function(N, A, C) {
        var D = N.params.nodeId,
            R = N.body;
        I.debug('setting Z-Wave device parameter', D, R), f.setZWaveParameter(D, R).then(function(P) {
            A.json(P)
        }).catch(C)
    }), S.get('/capabilities/:deviceId', function(N, A, C) {
        var D = N.params.deviceId;
        I.debug('get zwave capabilities of', D), f.getCapabilities(D).then(function(R) {
            A.json(R)
        }).catch(function(R) {
            I.warn('ZWAVE_CAPABILITIES_FAILED', R.message), C(R)
        })
    }), S.all('*', function(N, A, C) {
        N.adapter = f.getAdapter(), C()
    }), S.get('/sensor/:sensorname/:deviceId', d('getSensorValue', !1)), S.get('/secure/sensor/:sensorname/:deviceId', d('getSensorValue', !0)), S.get('/sensor/virtual/:sensorname/:virtualSensorName/:deviceId', c('getSensorValue', !1)), S.get('/secure/sensor/virtual/:sensorname/:virtualSensorName/:deviceId', c('getSensorValue', !0)), S.get('/sensorevent/:sensorname/:deviceId', u()), S.get('/secure/sensorevent/:sensorname/:deviceId', u()), S.get('/actuator/:actuatorname/:deviceId/:value', p('setActuatorValue', !1)), S.get('/secure/actuator/:actuatorname/:deviceId/:value', p('setActuatorValue', !0)), S.get('/event/:actuatorname/:deviceId/:value', p('setEventValue', !1)), S.get('/secure/event/:actuatorname/:deviceId/:value', p('setEventValue', !0)), S.get('/actuator/:actuatorname/:deviceId', p('setTriggerValue', !1)), S.get('/secure/actuator/:actuatorname/:deviceId', p('setTriggerValue', !0)), S.post('/reset', function(N, A, C) {
        I.debug('reset zwave controller'), N.adapter.resetController().then(function(D) {
            I.info('RESET_ZWAVECONTROLLER_SUCCESSFUL'), A.json(D)
        }).catch(function(D) {
            I.warn('RESET_ZWAVECONTROLLER_FAILED', D.message), C(D)
        })
    });
    var T = [/com.prosyst.mbs/, /ECONNREFUSED/, /ECONNRESET/, /ETIMEDOUT/, /^Cannot Execute in Platform State INITIALIZING/, /^Cannot Execute in Platform State STARTING/, /provide info for home device/, /home device with UID/, /USER_ABORT/, /TIMEOUT_HIT/, /UNKNOWN_PROSYST_ERROR/];
    S.use(function(N, A, C, D) {
        D || I.debug('EXPRESS_NEEDS_NEXT_PARAMETER_WEBPACK_TOO'), N && m(N.message) ? O.increaseCounter('ZWAVE_' + N.message) : I.error('ZWAVE_ERROR', {
            url: A.url,
            method: A.method,
            error: N.message
        }), C.status(N.status || 500), C.json({
            message: N.message,
            error: {}
        })
    }), t.exports = S
}, function(t) {
    t.exports = require('blocked')
}, function(t) {
    t.exports = require('body-parser')
}, function(t) {
    t.exports = require('bonjour')
}, function(t) {
    t.exports = require('child_process')
}, function(t) {
    t.exports = require('dgram')
}, function(t) {
    t.exports = require('dns')
}, function(t) {
    t.exports = require('fs')
}, function(t) {
    t.exports = require('jfs') 
}, function(t) {
    t.exports = require('lodash/flatten')
}, function(t) {
    t.exports = require('lodash/forEach')
}, function(t) {
    t.exports = require('lodash/get')
}, function(t) {
    t.exports = require('lodash/isNil')
}, function(t) {
    t.exports = require('lodash/remove')
}, function(t) {
    t.exports = require('lodash/uniq')
}, function(t) {
    t.exports = require('lodash/uniqBy')
}, function(t) {
    t.exports = require('lodash/values')
}, function(t) {
    t.exports = require('loggly')
}, function(t) {
    t.exports = require('neeo-sdk')
}, function(t) {
    t.exports = require('neeo-sdk/dist/lib/device')
}, function(t) {
    t.exports = require('neeo-sdk/dist/lib/device/brain')
}, function(t) {
    t.exports = require('neeo-sdk/dist/lib/device/implementationservices/promiseCache')
}, function(t) {
    t.exports = require('neeo-sdk/dist/lib/dynamicDevice/dynamicDevice')
}, function(t) {
    t.exports = require('neeo-sonos')
}, function(t) {
    t.exports = require('net')
}, function(t) {
    t.exports = require('node-cec/lib/CecKeyCodes')
}, function(t) {
    t.exports = require('node-hue-api')
}, function(t) {
    t.exports = require('node-lifx')
}, function(t) {
    t.exports = require('node-tradfri-client')
}, function(t) {
    t.exports = require('prosysapi') 
}, function(t) {
    t.exports = require('simple-event-statistics')
}, function(t) {
    t.exports = require('sonos-discovery')
}, function(t) {
    t.exports = require('tokensearch.js')
}, function(t) {
    t.exports = require('validate.js') 
}, function(t) {
    t.exports = require('wemo-client')
}, function(t, r, o) {o(0)("Function 213").verbose("exports = o(62)");
    t.exports = o(62)
}

]);
function metaMessageHandler(req, res)
{    metaLog({type:LOG_TYPE.DEBUG,content:"metaMessageHandler"});
    if (req.query.doFunc == undefined)
    { metaLog({type:LOG_TYPE.ERROR,content:'imageservice missing function for messagehandler routine '+req.doFunc});
      return  "imageservice missing function for messagehandler routine"
    };
    var doFunc = req.query.doFunc;
    if (doFunc.toUpperCase() == "GETLOGLEVEL")
    {   metaLog({type:LOG_TYPE.VERBOSE,content:"Getting loglevel"})
        return getLoglevels(logModule);
     }
  
    if (doFunc.toUpperCase() == "OVERRIDELOGLEVEL")
      {metaLog({type:LOG_TYPE.VERBOSE,content:"Setting loglevel"})
        const o = req.query.logLevel;
        return OverrideLoglevel(o,logModule.toLowerCase())
      }
  
    metaLog({type:LOG_TYPE.ERROR,content:"Unknown function requestedmetaMessageHandler "+req.query.doFunc});
    metaLog({type:LOG_TYPE.ERROR,content:"logLevel passed "+req.query.logLevel});
    return "Returning error"
  }
