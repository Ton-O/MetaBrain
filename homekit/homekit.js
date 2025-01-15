const logModule = "homekit";
process.env.StartupPath = __dirname;
const { metaMessage, LOG_TYPE, LOG_LEVEL,initialiseLogComponents, initialiseLogSeverity,OverrideLoglevel, getLoglevels } = require("/opt/meta/metaMessage");
function metaLog(message) {
    let initMessage = { component:logModule, type:LOG_TYPE.ERROR, content:'', deviceId: "" };
    let myMessage = {...initMessage, ...message}
    return metaMessage (myMessage);
  } 
initialiseLogSeverity("QUIET"); 
OverrideLoglevel("QUIET",logModule)   // normally, no logs will be produced
//OverrideLoglevel("DEBUG",logModule) // but activate this line if you want DEBUG logging
var theLog;
  module.exports = function(a) {
    function b(d) {
        if (c[d]) return c[d].exports;
        var e = c[d] = {
            i: d,
            l: !1,
            exports: {}
        };
        return a[d].call(e.exports, e, e.exports, b), e.l = !0, e.exports
    }
    var c = {};
    return b.m = a, b.c = c, b.i = function(d) {
        return d
    }, b.d = function(d, e, f) {
        b.o(d, e) || Object.defineProperty(d, e, {
            configurable: !1,
            enumerable: !0,
            get: f
        })
    }, b.n = function(d) {
        var e = d && d.__esModule ? function() {
            return d['default']
        } : function() {
            return d
        };
        return b.d(e, 'a', e), e
    }, b.o = function(d, e) {
        return Object.prototype.hasOwnProperty.call(d, e)
    }, b.p = '/', console.log("einde defs"), theLog = b(0),theLog("pffff").debug("en de nieuwe functie"),console.log(b(36)), b(b.s = 36)
}([
    function(a, b, c) {  //theLog("Function init 0");
        console.log("Function 0")
    'use strict';

    function d() {
        n || /true/.test(h.network) && (o = g.createClient({
            token: h.token,
            subdomain: h.subdomain,
            json: !0
        }))
    }

    function e(r) {
        this.label = r || h.tag
    }
    var f = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function(r) {
            return typeof r
        } : function(r) {
            return r && 'function' == typeof Symbol && r.constructor === Symbol && r !== Symbol.prototype ? 'symbol' : typeof r
        },
        g = c(35),
        h = c(1).log,
        j = c(9).hostname(),
        k = h.version,
        l = /true/.test(h.console) && 'silent' !== process.env.LOG_LEVEL,
        n = !1,
        o = void 0,
        p = void 0,
        q = 0;
    setInterval(function() {
        q = 0
    }, 3600000), e._log = function(r, s) {
        return function() {
            var t = Array.prototype.shift.call(arguments),
                u = Array.prototype.slice.call(arguments);
        //if (l) {
        //  var v = u ? t + ' ' + JSON.stringify(u) : t;

        if (true) {
            var v = u ? t + ' ' + JSON.stringify(u) : t;
            metaLog({type:r, content:"["+ this.label + "] "+v,deviceId:"_"})  
          console.log('%s - %s: [ %s ] %s', new Date().toISOString(), r, this.label, v);
        }
        var w = {
                host: j,
                app: h.tag,
                version: k,
                level: r, //  .toUpperCase(),
                source: this.label,
                message: t,
                timestamp: Date.now()
            };
            w.params = ['string', 'number', 'boolean'].includes('undefined' == typeof u ? 'undefined' : f(u)) ? {
                msg: u
            } : u, s && o && (q++, q < h.maximalUpstreamLogMessagePerHour ? o.log(w) : q === h.maximalUpstreamLogMessagePerHour && (w.source = 'LOG', w.message = 'LOG_COUNT_EXCEEDED', w.level = 'WARN', w.params = void 0, o.log(w))), 'error' === r && p && p(w)
        }
    }, e.prototype.always = e._log(LOG_TYPE.ALWAYS, !1), e.prototype.debug = e._log(LOG_TYPE.DEBUG, !1), e.prototype.verbose = e._log(LOG_TYPE.VERBOSE, !1), e.prototype.info = e._log(LOG_TYPE.INFO, !0), e.prototype.warn = e._log(LOG_TYPE.WARNING, !0), e.prototype.error = e._log(LOG_TYPE.ERROR, !0) 
    //e.prototype.debug = e._log('debug', !1), e.prototype.verbose = e._log('verbose', !1), e.prototype.info = e._log('info', !0), e.prototype.warn = e._log('warn', !0), e.prototype.error = e._log('error', !0), 
        a.exports = function(r) {
        return n || (d(), n = !0), new e(r)
    }, a.exports.registerErrorCallback = function(r) {
        p = r
    }
}, function(a) {        console.log("Function init 1");
    'use strict';
    console.log("Function 1")
    var d = process.env.IP || '127.0.0.1',
        e = process.env.PORT || 3005;
    a.exports = {
        env: process.env.NODE_ENV || 'development',
        port: e,
        ip: d,
        log: {
            level: process.env.LOG_LEVEL || 'info',
            console: process.env.LOG_CONSOLE || !0,
            network: process.env.LOG_NETWORK || !1,
            token: process.env.LOG_TOKEN || 'b8f841c9-9962-4462-9b16-5b513ae48ac0',
            subdomain: process.env.LOG_SUBDOMAIN || 'neeo',
            tag: process.env.LOG_TAG || 'HMK',
            version: process.env.NEEO_RELEASE || 'DEV',
            maximalUpstreamLogMessagePerHour: 100
        },
        homekit: {
            cp6IdentUri: process.env.NEEO_HOMEKIT_IDENT_URI || '/v1/systeminfo/identbrain',
            pincode: process.env.NEEO_HOMEKIT_PINCODE || '633-66-336',
            persistenceDirectory: process.env.NEEO_HOMEKIT_DATADIR || '/tmp/homekit.tmp'
        },
        alexa: {
            startListeningPort: process.env.NEEO_ALEXA_START_LISTENING_PORT || 9500
        },
        brain: {
            cp6RestPort: process.env.NEEO_PORT_CP6 || 3001,
            restCallTimeoutMs: process.env.NEEO_HOMEKIT_REST_CALL_TIMEOUT_MS || '4000'
        }
    }
}, function(a, b, c) {   theLog("Function init 2").verbose("");
    'use strict';
    theLog("Function init 2").verbose("starting");
    var d = c(10),
        e = c(1).brain,
        f = c(0)('rest');
        theLog("Function init 2").verbose("starting 2");

        a.exports.failsafeGetRequest = function(g, h) {theLog("Function init 2").verbose("failsafeGetRequest");
        return d({
            method: 'GET',
            uri: g,
            timeout: e.restCallTimeoutMs
        }).catch(function(j) {
            f.error(h, {
                error: j.message
            })
        })
    }, a.exports.getRequest = function(g) {theLog("Function init 2").verbose("getRequest");
        return d({
            method: 'GET',
            uri: g,
            timeout: e.restCallTimeoutMs
        })
    }, a.exports.getRequestWithJsonAnswer = function(g) {theLog("Function init 2").verbose("getRequestWithJsonAnswer");
        return d({
            method: 'GET',
            uri: g,
            json: !0,
            timeout: e.restCallTimeoutMs
        })
    }
}, function(a) {       console.log("Function init 3");
    a.exports = require('bluebird')
}, function(a) {       console.log("Function init 4");
    a.exports = require('express')
}, function(a, b, c) {   theLog("Function init 5").verbose("");
    'use strict';
    var d = c(29);
    a.exports.getUsername = function(e) {
        if (e) {
            for (var f = d.createHash('md5').update(JSON.stringify(e)).digest('hex'), g = '', h = 0, j = 0; 5 > j; j++) g += f.slice(h, h + 2) + ':', h += 2;
            return g += f.slice(h, h + 2), g
        }
    }
}, function(a, b, c) {   theLog("Function init 6").verbose("");
    'use strict';
    var d = c(0)('HomeKit'),
        e = c(1),
        f = c(21),
        g = c(19),
        h = 'http://' + e.ip + ':' + e.brain.cp6RestPort + e.homekit.cp6IdentUri,
        j = new Map,
        k = {
            resetPairing: 0,
            updatePowerState: 0,
            updateData: 0
        };
    a.exports.startServer = function() {
        return g.getSystemMacAddressAsync().then(function(l) {
            f.initializeBridge({
                hostname: g.getHostname(),
                persistenceDirectory: e.homekit.persistenceDirectory,
                identifyUri: h,
                macAddress: l,
                pincode: e.homekit.pincode
            })
        })
    }, a.exports.stopServer = function() {
        f.stopBridge()
    }, a.exports.resetPairing = function() {
        d.debug('reset pairing'), f.resetPairing(e.homekit.persistenceDirectory), k.resetPairing++
    }, a.exports.updatePowerState = function(l, m) {
        if (l && m) {
            d.debug('update power state', l, m);
            var n = l.powerKey;
            if (j.has(n)) {
                var o = j.get(n);
                f.updateAccessoirePowerState(o, m), k.updatePowerState++
            }
        }
    }, a.exports.updateData = function(l) {
        if (l && Array.isArray(l)) {
            j.clear();
            var m = l.filter(function(n) {
                return n && n.detail && n.url
            }).map(function(n) {
                d.debug('add', n.detail.devicename);
                var o = f.buildAccessoire(n);
                return o && f.suppportsPowerTracking(n) && j.set(n.powerKey, o), o
            });
            f.bridgePublishAccessories(m.filter(function(n) {
                return n
            })), k.updateData++
        }
    }, a.exports.getStatistics = function() {
        return k
    }
}, function(a, b, c) {   theLog("Function init 7").verbose("");
    'use strict';
    var d = c(6),
        e = c(18),
        f = c(25),
        h = new f([d, e]);
    a.exports.getFacade = function() {
        return h
    }
}, function(a) {       console.log("Function init 8");
    a.exports = require('hap-nodejs')
}, function(a) {       console.log("Function init 9");
    a.exports = require('os')
}, function(a) {       console.log("Function init 10");
    a.exports = require('request-promise')
}, function(a, b, c) {   theLog("Function init 11").verbose("");
    'use strict';
    var d = process.uptime(),
        e = c(34),
        f = c(12),
        g = e.createServer(f),
        h = c(0)('homekit'),
        j = c(1),
        k = c(13),
        l = 'development' === process.env.NODE_ENV;
    k.initializeServices(), g.listen(j.port, j.ip, function() {
        h.debug('HOMEKIT_PROJECT_STARTED', 'Listen address: ' + j.ip + ':' + j.port);
        var m = Math.floor(1e3 * (process.uptime() - d));
        h.info('STARTUP_COMPLETE', {
            durationMs: m
        })
    }), process.on('SIGTERM', function() {
        k.shutdownServices(), h.info('TERMINATE_APPLICATION'), g.close()
    }), process.on('SIGHUP', function() {
        h.info('SIGHUP_SIGNALED')
    }), process.on('uncaughtException', function(m) {
        h.error('UNCAUGHT_EXCEPTION', {
            error: m.message
        }), process.exit(1)
    }), process.on('unhandledRejection', function(m) {
        var n = l ? m.stack : void 0;
        h.error('UNHANDLED_REJECTION', {
            msg: m.message,
            stack: n
        })
    })
}, function(a, b, c) {   theLog("Function init 12").verbose("");
    'use strict';
    var d = c(4),
        e = c(28),
        f = c(0)('app'),
        g = d();
    g.disable('x-powered-by'), g.use(e.json({
        limit: '2mb'
    })), g.use('/favicon.ico', function(k, l) {
        l.send()
    });
    var h = d.Router();

    g.use('/v1', h), g.use('/', h);
    g.post('/homekit/metaMessageHandler',function (req, res) {res.json(metaMessageHandler(req,res,c))
 });
    var j = {
        braininterface: c(26),
        statistics: c(27)
    };

    h.use('/braininterface', j.braininterface), h.use('/statistics', j.statistics), g.use(function(k, l, m) {
        f.error('INVALID_URL_REQUESTED', {
            url: k.url
        });
        var n = new Error('Not Found');
        n.status = 404, m(n)
    }), 'development' === g.get('env') ? g.use(function(k, l, m, n) {
        n || f.debug('EXPRESS_NEEDS_NEXT_PARAMETER_WEBPACK_TOO'), f.error('SERVER_ERROR', {
            url: l.url,
            method: l.method,
            error: k.message,
            stack: k.stack
        }), m.status(k.status || 500), m.json({
            message: k.message,
            stack: k.stack
        })
    }) : g.use(function(k, l, m, n) {
        n || f.debug('EXPRESS_NEEDS_NEXT_PARAMETER_WEBPACK_TOO'), f.error('SERVER_ERROR', {
            url: l.url,
            method: l.method,
            error: k.message,
            stack: k.stack
        }), m.status(k.status || 500), m.json({
            message: k.message
        })
    }), a.exports = g
}, function(a, b, c) {   theLog("Function init 13").verbose("");
    'use strict';
    var f = c(30)('neeo:bootstrap'),
        g = c(7).getFacade();
    a.exports = {
        initializeServices: function() {
            f('BOOTSTRAP_START'), g.startServer()
        },
        shutdownServices: function() {
            f('TERMINATE_SERVICES'), g.stopServer()
        }
    }
}, function(a, b, c) {   theLog("Function init 14").verbose("");
    'use strict';
    var d = c(10),
        e = c(1).brain,
        f = c(0)('rest');
    a.exports.failsafeGetRequest = function(g, h) {
        return d({
            method: 'GET',
            uri: g,
            timeout: e.restCallTimeoutMs
        }).catch(function(j) {
            f.error(h, {
                error: j.message
            })
        })
    }
}, function(a, b, c) {   theLog("Function init 15").verbose("");
    'use strict';
    var d = c(0)('AlexaController'),
        e = c(14),
        f = c(3);
    a.exports.build = function(g) {
        if (d.debug('build controller'), !g || !g.url || !g.detail) throw new Error('INVALID_PARAMETER');
        return {
            handleAction: function(j) {
                return (d.debug('set action', j), 'on' === j) ? (d.debug('power on', g.detail.devicename), e.failsafeGetRequest(g.url.setPowerOn, 'BRAIN_RECIPE_TRIGGER_FAILED')) : g.url.setPowerOff ? (d.debug('power off', g.detail.devicename), e.failsafeGetRequest(g.url.setPowerOff, 'BRAIN_RECIPE_TRIGGER_FAILED')) : (d.debug('power off not implemented', g.detail.devicename), f.resolve())
            }
        }
    }
}, function(a, b, c) {   theLog("Function init 16").verbose("");
    'use strict';
    var d = c(15),
        e = c(0)('AlexaFactory');
    a.exports.buildDeviceEntry = function(f, g) {
        if (!g || !f) throw new Error('INVALID_PARAMETER');
        e.debug('build', f.detail.devicename);
        var h = d.build(f);
        return {
            name: decodeURIComponent(f.detail.devicename),
            port: g,
            handler: function(k) {
                h.handleAction(k)
            }
        }
    }
}, function(a, b, c) {   theLog("Function init 17").verbose("");
    'use strict';
    var d = c(31),
        e = new d;
    a.exports.stopServer = function() {
        e.stopServer()
    }, a.exports.updateData = function(f) {
        return e.updateDevices(f)
    }
}, function(a, b, c) {   theLog("Function init 18").verbose("");
    'use strict';
    var d = c(0)('Alexa'),
        e = c(1).alexa,
        f = c(17),
        g = c(16);
    a.exports.startServer = function() {}, a.exports.stopServer = function() {
        d.debug('stop server'), f.stopServer()
    }, a.exports.resetPairing = function() {}, a.exports.updatePowerState = function() {}, a.exports.updateData = function(h) {
        if (h && Array.isArray(h)) {
            var j = e.startListeningPort,
                k = h.map(function(l) {
                    return g.buildDeviceEntry(l, j++)
                });
            try {
                f.updateData(k)
            } catch (l) {
                d.warn('FAILED_TO_ACTIVATE_ALEXA_DISCOVERY', l)
            }
        }
    }
}, function(a, b, c) {   theLog("Function init 19").verbose("");
    'use strict';
    var d = c(0)('HomeKit DataSource'),
        e = c(3),
        f = e.promisify(c(33).getMac),
        g = c(9),
        h = g.hostname(),
        k = void 0;
    a.exports.getHostname = function() {
        return h
    }, a.exports.getSystemMacAddressAsync = function() {
        return k ? e.resolve(k) : f().then(function(l) {
            return k = l, k
        }).catch(function(l) {
            return d.error('MAC_ADDRESS_READ', l.message), '63:36:39:58:47:cf'
        })
    }
}, function(a, b, c) {   theLog("Function init 20").verbose("");
    'use strict';

    function d() {theLog("Function init 20").verbose("removeAllBridgedAccessories");
        o.removeAllBridgedAccessories(), o.destroy()
    }

    function e(r) {
        var s = void 0;
        theLog("Function init 20").verbose("e(r)",r);
        try {
            s = g.readdirSync(r)
        } catch (v) {
            return void h.warn('FAILED_TO_READ_DIRECTORY', v.message)
        }
        if (0 < s.length)
            for (var u, t = 0; t < s.length; t++) u = r + '/' + s[t], g.statSync(u).isFile() && g.unlinkSync(u)
    }

    function f() {
        return o !== void 0
    }
    theLog("Function init 20").verbose("part 2");
    var g = c(32),
        h = c(0)('Bridge'),
        j = c(2),
        k = c(8),
        l = k.uuid,
        m = k.Bridge,
        n = k.Accessory,
        o = void 0,
        p = void 0,
        q = void 0;
    a.exports.start = function(r) {
        h.debug('init server', {
            options: r
        }), p = r.macAddress, q = r.pincode, k.init(r.persistenceDirectory), o = new m(r.hostname, l.generate(r.hostname)), o.on('identify', function(s, t) {
            j.getRequest(r.identifyUri).then(function() {
                t()
            }).catch(function(u) {
                h.error('BRAIN_RECIPE_TRIGGER_FAILED', {
                    error: u.message
                }), t(!0)
            })
        })
    }, a.exports.stop = function() {
        d(), o = void 0
    }, a.exports.resetPairing = function(r) {
        h.info('RESET_PAIRING_DATA', r), e(r), process.exit(0)
    }, a.exports.updateAccessories = function(r) {
        if (!f()) throw new Error('BRIDGE_NOT_INITIALIZED');
        d(), o.addBridgedAccessories(r), h.debug('publish new accessoires'), o.publish({
            username: p,
            port: 51826,
            pincode: q,
            category: n.Categories.BRIDGE
        })
    }
}, function(a, b, c) {   console.log("Function 20")//theLog("Function init 21").verbose("");
    'use strict';

    function d(l) {
        var m = h.build(l);
        return k.build(m)
    }

    function e(l) {
        var m = j.build(l);
        return k.build(m)
    }
    var f = c(20),
        g = c(0)('index'),
        h = c(24),
        j = c(23),
        k = c(22);
    a.exports.initializeBridge = function(l) {
        f.start(l)
    }, a.exports.stopBridge = function() {
        f.stop()
    }, a.exports.resetPairing = function(l) {
        f.resetPairing(l)
    }, a.exports.bridgePublishAccessories = function(l) {
        f.updateAccessories(l)
    }, a.exports.buildAccessoire = function(l) {
        try {
            return l.isCustom ? d(l) : e(l)
        } catch (m) {
            g.error('FAILED_TO_BUILD_ACCESSOIRE', {
                error: m.message,
                data: l
            })
        }
    }, a.exports.updateAccessoirePowerState = function(l, m) {
        k.updatePowerState(l, m)
    }, a.exports.suppportsPowerTracking = function(l) {
        return l.powerKey !== void 0
    }
}, function(a, b, c) {   theLog("Function init 22").verbose("");
    'use strict';

    function d(n, o) {
        f.debug('updatePowerState', {
            name: n.displayName,
            powerState: o
        }), n.getService(k.Outlet).getCharacteristic(l.On).updateValue(o)
    }

    function e(n) {
        return !0 === n || 1 === n
    }
    var f = c(0)('switchableAccessoire'),
        g = c(8),
        h = g.uuid,
        j = g.Accessory,
        k = g.Service,
        l = g.Characteristic;
    a.exports.updatePowerState = d, a.exports.build = function(n) {
        function o() {
            r && (f.debug('cancel old setTimeout function'), clearTimeout(r)), r = setTimeout(function() {
                d(q, !1), r = null
            }, 1e3)
        }
        var p = h.generate('neeo:recipe:' + n.uid),
            q = new j(n.name, p),
            r = void 0;
        return q.getService(k.AccessoryInformation).setCharacteristic(l.Manufacturer, n.manufacturer).setCharacteristic(l.Model, n.model).setCharacteristic(l.SerialNumber, n.serialNumber), q.on('identify', function(s, t) {
            n.identify().then(function() {
                t()
            }).catch(function(u) {
                f.error('BRAIN_IDENTIFY_FAILED', {
                    error: u.message
                }), t(!0)
            })
        }), q.addService(k.Outlet, n.name).getCharacteristic(l.On).on('set', function(s, t) {
            n.setPower(e(s)).then(function() {
                'TRIGGER' === n.controllerType && o(), t()
            }).catch(function(u) {
                f.error('BRAIN_SETPOWER_FAILED', {
                    error: u.message
                }), t(!0)
            })
        }).on('get', function(s) {
            n.getPower().then(function(t) {
                f.debug('power state', {
                    device: n.name,
                    response: t
                }), s(null, t && !0 === t.active)
            }).catch(function(t) {
                f.error('BRAIN_IDENTIFY_FAILED', {
                    error: t.message
                }), s(!0)
            })
        }), q
    }
}, function(a, b, c) {   theLog("Function init 23").verbose("");
    'use strict';
    var d = c(0)('switchableController'),
        e = c(2),
        f = c(5);
    a.exports.build = function(h) {
        if (d.debug('build controller'), !h) throw new Error('INVALID_PARAMETER');
        return {
            name: decodeURIComponent(h.detail.devicename),
            room: decodeURIComponent(h.detail.roomname),
            pincode: h.pincode,
            username: f.getUsername(h.uid),
            manufacturer: decodeURIComponent(h.detail.manufacturer),
            model: decodeURIComponent(h.detail.model),
            serialNumber: decodeURIComponent(h.detail.roomname),
            uid: h.uid,
            power: h.isPoweredOn,
            controllerType: 'SWITCH',
            setPower: function(k) {
                return d.debug('set power', k), !0 === k ? (d.debug('power on', h.detail.devicename), e.failsafeGetRequest(h.url.setPowerOn, 'BRAIN_RECIPE_TRIGGER_FAILED')) : h.url.setPowerOff ? (d.debug('power off', h.detail.devicename), e.failsafeGetRequest(h.url.setPowerOff, 'BRAIN_RECIPE_TRIGGER_FAILED')) : void d.debug('ignored non existent power off request')
            },
            getPower: function() {
                return e.getRequestWithJsonAnswer(h.url.getPowerState)
            },
            identify: function() {
                return e.failsafeGetRequest(h.url.identify, 'BRAIN_IDENTIFY_FAILED')
            }
        }
    }
}, function(a, b, c) {   theLog("Function init 24").verbose("");
    'use strict';
    var d = c(3),
        e = c(0)('triggerableController'),
        f = c(2),
        g = c(5);
    a.exports.build = function(j) {
        if (e.debug('build controller'), !j) throw new Error('INVALID_PARAMETER');
        return {
            name: decodeURIComponent(j.detail.devicename),
            room: decodeURIComponent(j.detail.roomname),
            pincode: j.pincode,
            username: g.getUsername(j.uid),
            manufacturer: decodeURIComponent(j.detail.manufacturer),
            model: decodeURIComponent(j.detail.model),
            serialNumber: decodeURIComponent(j.detail.roomname),
            uid: j.uid,
            power: j.isPoweredOn,
            controllerType: 'TRIGGER',
            setPower: function(l) {
                return !0 === l ? f.failsafeGetRequest(j.url.setPowerOn, 'BRAIN_RECIPE_TRIGGER_FAILED') : d.resolve()
            },
            getPower: function() {
                return d.resolve({
                    active: !1
                })
            },
            identify: function() {
                return f.failsafeGetRequest(j.url.identify, 'BRAIN_IDENTIFY_FAILED')
            }
        }
    }
}, function(a, b, c) {   theLog("Function init 25").verbose("");
    'use strict';

    function d(k, l) {
        if (!(k instanceof l)) throw new TypeError('Cannot call a class as a function')
    }
    var e = function() {
            function k(l, m) {
                for (var o, n = 0; n < m.length; n++) o = m[n], o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(l, o.key, o)
            }
            return function(l, m, n) {
                return m && k(l.prototype, m), n && k(l, n), l
            }
        }(),
        f = c(0)('VirtualAssistant'),
        j = function() {
            function k(l) {
                d(this, k), this.powerKeyMapping = new Map, this.implementations = l
            }
            return e(k, [{
                key: 'startServer',
                value: function() {
                    this.implementations.forEach(function(m) {
                        m.startServer()
                    })
                }
            }, {
                key: 'stopServer',
                value: function() {
                    this.implementations.forEach(function(m) {
                        m.stopServer()
                    })
                }
            }, {
                key: 'resetPairing',
                value: function() {
                    this.implementations.forEach(function(m) {
                        m.resetPairing()
                    })
                }
            }, {
                key: 'updatePowerState',
                value: function(m) {
                    var n = this;
                    return Array.isArray(m) ? void(f.debug('update power state', m), this.powerKeyMapping.forEach(function(o, p) {
                        var q = !1;
                        m.includes('' + p) && (q = !0), n.implementations.forEach(function(r) {
                            r.updatePowerState(o, q)
                        })
                    })) : void f.debug('updatePowerState, invalid parameters')
                }
            }, {
                key: 'updateData',
                value: function(m) {
                    return Array.isArray(m) ? void(this.powerKeyMapping = k.buildPowerStateMap(m), this.implementations.forEach(function(n) {
                        n.updateData(m)
                    })) : void f.debug('updateData, invalid parameters')
                }
            }], [{
                key: 'entrySupportsPowerState',
                value: function(m) {
                    return m && m.urlSetPowerOn && m.urlSetPowerOff && m.powerKey
                }
            }, {
                key: 'buildPowerStateMap',
                value: function(m) {
                    var n = new Map;
                    return m.filter(function(o) {
                        return k.entrySupportsPowerState(o)
                    }).forEach(function(o) {
                        f.debug('add', o.devicename), n.set(o.powerKey, o)
                    }), n
                }
            }]), k
        }();
    a.exports = j
}, function(a, b, c) {   theLog("Function init 26").verbose("");
    'use strict';
    var d = c(4),
        e = d.Router(),
        f = c(7).getFacade();
    e.post('/', function(g, h) {
        try {
            f.updateData(g.body), h.json({
                success: !0
            })
        } catch (j) {
            h.json({
                success: !1
            })
        }
    }), e.post('/powerstate', function(g, h) {
        f.updatePowerState(g.body), h.json()
    }), e.post('/resetpairing', function(g, h) {
        h.json({}), f.resetPairing()
    }), a.exports = e
}, function(a, b, c) {   theLog("Function init 27").verbose("");
    'use strict';
    var d = c(4),
        e = d.Router(),
        f = c(6);
    e.get('/', function(g, h) {
        h.json({
            homekit: f.getStatistics()
        })
    }), a.exports = e
}, function(a) {       console.log("Function init 28");
    a.exports = require('body-parser')
}, function(a) {       console.log("Function init 29");
    a.exports = require('crypto')
}, function(a) {       console.log("Function init 30");
    a.exports = require('debug')
}, function(a) {       console.log("Function init 31");
    a.exports = require('fauxmojs')
}, function(a) {       console.log("Function init 32");
    a.exports = require('fs')
}, function(a) {       console.log("Function init 33");
    console.log("require http")

    a.exports = require('getmac')
}, function(a) {       console.log("Function init 34");
    console.log("require http")
    a.exports = require('http')
}, function(a) {       console.log("Function init 35");
    a.exports = require('loggly')
}, function(a, b, c) { theLog("Function init 36").verbose("");
    console.log("doing function 36")
    a.exports = c(11)
}]);
function metaMessageHandler(req, res,f)
{ metaLog({type:LOG_TYPE.DEBUG,content:"metaMessageHandler"});
  if (req.query.doFunc == undefined)
  { metaLog({type:LOG_TYPE.ERROR,content:'imageservice missing function for messagehandler routine '+req.doFunc});
    return "imageservice missing function for messagehandler routine"
    metaLog({type:LOG_TYPE.ERROR,content:"we shouldn't be here"})
  };
  var doFunc = req.query.doFunc;
  if (doFunc.toUpperCase() == "GETLOGLEVEL")
   {metaLog({type:LOG_TYPE.VERBOSE,content:"Getting loglevel"})
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