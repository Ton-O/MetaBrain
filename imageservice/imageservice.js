const { metaMessage, LOG_TYPE, LOG_LEVEL,initialiseLogComponents, initialiseLogSeverity,OverrideLoglevel, getLoglevels } = require("/opt/meta/metaMessage");

function metaLog(message) {
  let initMessage = { component:'imageservice', type:LOG_TYPE.ERROR, content:'', deviceId: "" };
  let myMessage = {...initMessage, ...message}
  return metaMessage (myMessage);
} 
  
initialiseLogSeverity("QUIET"); 
OverrideLoglevel("DEBUG","imageservice") 
module.exports = function (a) {
  function b(d) {
    if (c[d]) {
      return c[d].exports;
    }
    var e = c[d] = {
      i: d,
      l: false,
      exports: {}
    };
    a[d].call(e.exports, e, e.exports, b);
    e.l = true;
    return e.exports;
  }
  var c = {};
  b.m = a;
  b.c = c;
  b.i = function (d) {
    return d;
  };
  b.d = function (d, e, f) {
    if (!b.o(d, e)) {
      Object.defineProperty(d, e, {
        configurable: false,
        enumerable: true,
        get: f
      });
    }
  };
  b.n = function (d) {
    var e = d && d.__esModule ? function () {
      return d['default'];
    } : function () {
      return d;
    };
    b.d(e, 'a', e);
    return e;
  };
  b.o = function (d, e) {
    return Object.prototype.hasOwnProperty.call(d, e);
  };
  b.p = '/';
  return b(b.s = 33);
}([
    function (a) {//c(1)("Function 0").debug("set defaults")
  'use strict';

  var d = process.env.FETCH_IMAGE_TIMEOUT_MS || 8e3;
  a.exports = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3004,
    ip: process.env.IP || '0.0.0.0',
    bootstrap: {
      preloadListImageSize: process.env.PRELOAD_LIST_IMAGE_SIZE || 80,
      preloadListImageFormat: 'lz4'
    },
    cacheservice: {
      cacheTimeSeconds: process.env.CHASRV_ELEMENT_CACHE_TTL_S || 0,
      cacheTimeErrorItemSeconds: process.env.CHASRV_ERRELEMENT_CACHE_TTL_S || 60
    },
    defaults: {
      lazyGetTimeoutMS: process.env.LAZY_GET_TIMEOUT_MS || 100,
      maxImageSizePixel: process.env.MAX_IMAGE_SIZE_PIXEL || 1024
    },
    facade: {
      fetchTimeoutMs: d,
      queuesize: process.env.QUEUE_SIZE || 4,
      queuetype: process.env.QUEUE_TYPE || 'lifo'
    },
    imageservice: {
      fetchTimeoutMs: d,
      imageQuality: process.env.OUTPUT_JPG_QUALITY || 85,
      imagepath: process.env.IMAGE_PATH || 'app/data/images/',
      defaultimage: process.env.DEFAULT_IMAGE || 'sonos-nocover',
      favoriteFallbackImage: process.env.FAVORITE_FALLBACK_IMAGE || 'favorites-fallback',
      maximalUpstreamLogMessagePerHour: 100
    },
    log: {
      level: process.env.LOG_LEVEL || 'info',
      console: process.env.LOG_CONSOLE || true,
      network: process.env.LOG_NETWORK || false,
      token: process.env.LOG_TOKEN || 'b8f841c9-9962-4462-9b16-5b513ae48ac0',
      subdomain: process.env.LOG_SUBDOMAIN || 'neeo',
      tag: process.env.LOG_TAG || 'IMG',
      version: process.env.NEEO_RELEASE || 'DEV'
    },
    mimeTypes: {
      PNG: 'image/png',
      JPG: 'image/jpeg',
      LZ4: 'application/x-lzip',
      LZ4_BLACK: 'application/x-lzip-black'
    },
    supportedInputMimeTypes: ['application/x-lzip', 'application/x-lzip-black', 'image/png', 'image/jpeg', 'image/gif']
  };
}, function (a, b, c) {
  'use strict';

  function d() {
    if (!m) {
      if (/true/.test(h.network)) {
        n = g.createClient({
          token: h.token,
          subdomain: h.subdomain,
          json: true
        });
      }
    }
  }
  function e(q) {
    this.label = q || h.tag;
  }
  var f = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function (q) {
    return typeof q;
  } : function (q) {
    return q && 'function' == typeof Symbol && q.constructor === Symbol && q !== Symbol.prototype ? 'symbol' : typeof q;
  };
  var g = c(26);
  var h = c(0).log;
  var i = c(30).hostname();
  var j = h.version;
  var k = /true/.test(h.console) && 'silent' !== process.env.LOG_LEVEL;
  var m = false;
  var n = undefined;
  var o = undefined;
  var p = 0;
  setInterval(function () {
    p = 0;
  }, 3600000);
  e._log = function (q, r) {
    return function () {

      var s = Array.prototype.shift.call(arguments);
      var t = Array.prototype.slice.call(arguments);
/*      console.log("S:",s)
      console.log("R:",r)
      console.log('t;',t)*/
      let u; 
      if (t.length == 0||(t.length == 1 && t[0] == false))
        u = s
      else 
        if  (t = 1 === t.length ? t[0] : t)
          u = s + ' ' + JSON.stringify(t);
        //console.log("in _log u",u)

      metaLog({type:q, content:"["+ this.label + "] "+u,deviceId:"_"})
      //console.empty(getTime(),'%s - %s: [ %s ] %s', new Date().toISOString(), q, this.label, u);
      var v = {
        host: i,
        app: h.tag,
        version: j,
        level: q, //.toUpperCase(),
        source: this.label,
        message: s,
        timestamp: Date.now()
      };
      v.params = ['string', 'number', 'boolean'].includes('undefined' == typeof t ? 'undefined' : f(t)) ? {
        msg: t
      } : t;
      if (r && n) {
        p++;
        if (p < h.maximalUpstreamLogMessagePerHour) {
          n.log(v);
        } else if (p === h.maximalUpstreamLogMessagePerHour) {
          v.source = 'LOG';
          v.message = 'LOG_COUNT_EXCEEDED';
          v.level = 'WARN';
          v.params = undefined;
          n.log(v);
        }
      }
      if ('error' === q && o) {
        o(v);
      }
    };
  };
  e.prototype.always = e._log(LOG_TYPE.ALWAYS, !1), e.prototype.debug = e._log(LOG_TYPE.DEBUG, !1), e.prototype.verbose = e._log(LOG_TYPE.VERBOSE, !1), e.prototype.info = e._log(LOG_TYPE.INFO, !0), e.prototype.warn = e._log(LOG_TYPE.WARNING, !0), e.prototype.error = e._log(LOG_TYPE.ERROR, !0),
/*  e.prototype.debug = e._log('debug', false);
  e.prototype.verbose = e._log('verbose', false);
  e.prototype.info = e._log('info', true);
  e.prototype.warn = e._log('warn', true);
  e.prototype.error = e._log('error', true);*/
  a.exports = function (q) {
    if (!m) {
      d();
      m = true;
    }
    return new e(q);
  };
  a.exports.registerErrorCallback = function (q) {
    o = q;
  };
}, function (a, b, c) {c(1)("Function 2").debug("")
  'use strict';

  var d = c(1)('data');
  var e = c(0).imageservice;
  var f = c(24);
  var g = c(7);
  var h = c(31);
  var i = c(22);
  a.exports.getLocalImage = function (j) {
    var k = i[j];
    if (!k) {
      return void d.error('LOCAL_IMAGE_NOT_FOUND', {
        name: j
      });
    }
    var l = h.join(e.imagepath, k);
    d.debug('load local image', l);
    try {
      var m = f.readFileSync(l);
      return {
        buffer: m,
        contentType: g(m).mime
      };
    } catch (n) {
      d.error('FAILED_TO_LOAD_LOCAL_IMAGE', n.message);
    }
  };
  a.exports.getAllLocalImages = function () {
    return Object.keys(i);
  };
}, function (a) {//c(1)("Function 3").debug("")
  a.exports = require('express');
}, function (a, b, c) {c(1)("Function 4").debug("")
  'use strict';

  var d = c(15);
  var e = c(17);
  var f = c(14);
  var g = c(28);
  var h = c(0).facade;
  var i = new g(h.queuesize, h.queuetype);
  a.exports = new d({
    imageservice: e,
    cacheservice: f,
    queue: i,
    settings: h
  });
}, function (a, b, c) {c(1)("Function 5").debug("")
  'use strict';

  var d = c(4);
  var e = c(1)('imageservice router');
  var f = c(0).mimeTypes;
  var g = c(0).defaults;
  a.exports.getImageFormat = function (h, i, j, k) {
    switch (k.toUpperCase()) {
      case 'PNG':
        h.mimetype = f.PNG;
        break;
      case 'JPG':
      case 'JPEG':
        h.mimetype = f.JPG;
        break;
      case 'LZ4':
        h.mimetype = f.LZ4;
        break;
      case 'LZ4-BLACK':
        h.mimetype = f.LZ4_BLACK;
        break;
      default:
        h.mimetype = f.PNG;
    }
    j();
  };
  a.exports.validateImageWidth = function (h, i, j, k) {
    var l = parseInt(k);
    if (isNaN(l) || 1 > l || l > g.maxImageSizePixel) {
      e.debug('invalid width', l);
      j(new Error('INVALID_IMAGE_WIDTH_REQUESTED'));
    } else {
      h.width = l;
      j();
    }
  };
  a.exports.validateImageHeight = function (h, i, j, k) {
    var l = parseInt(k);
    if (isNaN(l) || 1 > l || l > g.maxImageSizePixel) {
      j(new Error('INVALID_IMAGE_HEIGHT_REQUESTED'));
    } else {
      h.height = l;
      j();
    }
  };
  a.exports.validateUrl = function (h, i, j, k) {
    if (!k || 4 > k.length) {
      j(new Error('INVALID_IMAGE_URL_REQUESTED'));
    } else {
      h.url = k;
      j();
    }
  };
  a.exports.fetchImage = function (h, i, j, k) {
    c(1)("Function 5").debug("fetchImage")
    var l = Date.now();
    e.debug('fetch', h);
    d.getImage(h).then(function (m) {

      var n = Date.now() - l;
      if (3e3 < n) {
        e.info('LONG_IMAGE_FETCH', {
          durationMs: n,
          url: h
        });
      }
      j.set('Content-Type', m.contentType);
      j.send(m.buffer);
    }).catch(k);
  };
  a.exports.fetchImageAndResize = function (h, i, j, k, l) {
    e.debug('fetch image and resize', {
      url: h,
      width: i.width,
      height: i.height
    });
    d.getResizeAndDitheredImage(h, i.width, i.height, l).then(function (m) {
      j.set('Content-Type', m.contentType);
      j.send(m.buffer);
    }).catch(k);
  };
  a.exports.resizeImage = function (h, i, j, k, l) {
    e.debug('resize and dither image', {
      width: i.width,
      height: i.height
    });
    d.resizeAndDitherImage(h, i.width, i.height, l).then(function (m) {
      j.set('Content-Type', m.contentType);
      j.send(m.buffer);
    }).catch(k);
  };
  //$$$
  a.exports.flushImageCache = function () {
    c(1)("Function 5").debug("flushimageCache")
    d.flushImageCache()
      return;
  };
  a.exports.getImageFromCache = function (h, i, j, k, l) {
    c(1)("Function 5").debug("getImageFromCache")
    var m = Date.now();

    d.getLazyResizeAndDitheredImage(h, i.width, i.height, l).then(function (n) {
      c(1)("Function 5").debug("getLazyResizeAndDitheredImage")
      if (n) {
        e.debug('resized image found in cache, convert time:', Date.now() - m);
        j.set('Content-Type', n.contentType);
        j.send(n.buffer);
      } else {
        e.debug('resized image not found in cache:', h, Date.now() - m);
        j.set('Content-Type', 'text/plain');
        j.send('NOT_FOUND');
        e.debug('add to queue', h);
        d.getResizeAndDitheredImage(h, i.width, i.height, l).catch(function (o) {
          e.debug('failed fetch image', o.message);
        });
      }
    }).timeout(g.lazyGetTimeoutMS, 'LAZY_TIMEOUT').catch(function (n) {
      e.warn('IMAGE_FROM_CACHE', n);
      j.set('Content-Type', 'text/plain');
      j.send('NOT_FOUND');
    });
  };
}, function (a) {//c(1)("Function 6").debug("")
  a.exports = require('bluebird');
}, function (a) {//c(1)("Function 7").debug("")
  a.exports = require('file-type');
}, function (a) {//c(1)("Function 8").debug("")
  a.exports = require('http');
}, function (a) {//c(1)("Function 9").debug("")
  a.exports = require('request');
}, function (a, b, c) {c(1)("Function 10").debug("")
  'use strict';

  var d = c(1)('server');
  var e = c(12);
  var f = 'development' === process.env.NODE_ENV;
  e.initializeServices();
  process.on('SIGTERM', function () {
    d.info('TERMINATE_APPLICATION');
    e.shutdownServices();
  });
  process.on('SIGHUP', function () {
    d.info('SIGHUP_SIGNALED');
  });
  process.on('uncaughtException', function (g) {
    d.error('UNCAUGHT_EXCEPTION', {
      error: g.message
    });
    process.exit(1);
  });
  process.on('unhandledRejection', function (g) {
    var h = f ? g.stack : undefined;
    d.error('UNHANDLED_REJECTION', {
      msg: g.message,
      stack: h
    });
  });
}, function (a, b, c) {c(1)("Function 11").debug("")
  'use strict';

  var d = c(3);
  var e = d();
  var f = c(1)('app');
  e.use(function (i, j, k) {
    if ('OPTIONS' === i.method) {
      j.send();
    } else {
      k();
    }
  });
  e.disable('x-powered-by');
  var g = d.Router();
  e.use('/v1', g);
  e.use('/', g);
  var h = {
    image: c(21),
    default: c(20)
  };
  g.use('/imagecache', h.image);
  g.use('/imagecache/default', h.default);
  e.use(function (i, j, k) {
    f.error('INVALID_URL_REQUESTED', {
      url: i.url
    });
    var l = new Error('Not Found');
    l.status = 404;
    k(l);
  });
  if ('development' === e.get('env')) {
    e.use(function (i, j, k, l) {
      if (!l) {
        f.debug('EXPRESS_NEEDS_NEXT_PARAMETER_WEBPACK_TOO');
      }
      f.error('SERVER_ERROR', {
        url: j.url,
        method: j.method,
        error: i.message,
        stack: i.stack
      });
      k.status(i.status || 500);
      k.json({
        message: i.message,
        error: i.message,
        stack: i.stack
      });
    });
  } else {
    e.use(function (i, j, k, l) {
      if (!l) {
        f.debug('EXPRESS_NEEDS_NEXT_PARAMETER_WEBPACK_TOO');
      }
      f.error('SERVER_ERROR', {
        url: j.url,
        method: j.method,
        error: i.message,
        stack: i.stack
      });
      k.status(i.status || 500);
      k.json({
        message: i.message,
        error: {}
      });
    });
  }
  a.exports = e;
}, function (a, b, c) {c(1)("Function 12").debug("")
  'use strict';

  function d() {
    return new Promise(function (r) {
      n.listen(k.port, k.ip, function () {
        j.debug('IMAGESERVICE_PROJECT_STARTED', {
          ip: k.ip,
          port: k.port
        });
        var s = Math.floor(1e3 * (process.uptime() - h));
        j.info('STARTUP_COMPLETE', {
          durationMs: s
        });
        r();
      });
    });
  }
  function e() {
    var r = k.bootstrap.preloadListImageSize;
    var s = k.bootstrap.preloadListImageFormat;
    var t = "http://127.0.0.1:" + k.port + '/imagecache/getresized/' + s + '/' + r + '/' + r + '/LOCAL%3A';
    var u = p.getAllLocalImages();
    u.forEach(function (v) {
      i('preload local image', v);
      o(t + v, function (w) {
        if (w && w.message) {
          j.warn('PRELOAD_LOCAL_IMAGE_FAILED', w.message);
        }
      });
    });
  }
  var h = process.uptime();
  var i = c(23)('neeo:bootstrap');
  var j = c(1)('server');
  var k = c(0);
  var l = c(8);
  var m = c(11);
  var n = l.createServer(m);
  var o = c(9);
  var p = c(2);
  a.exports = {
    initializeServices: function () {
      i('BOOTSTRAP_START');
      return d().then(function () {
        e();
      });
    },
    shutdownServices: function () {
      i('TERMINATE_SERVICES');
      n.close();
    }
  };
}, function (a, b, c) {c(1)("Function 13").debug("")
  'use strict';

  var d = c(6);
  var e = c(1)('cacheservice');
  var f = a.exports = function (g) {
    e.debug('init', g.settings);
    this.cache = g.cache;
    this.cacheTimeError = g.settings.cacheTimeErrorItemSeconds;
  };
  f.prototype.get = function (g) {
    var h = d.promisify(this.cache.get);
    return h(g);
  };
  f.prototype.set = function (g, h) {
    var i = d.promisify(this.cache.set);
    return i(g, h);
  };
  
  f.prototype.flushImageCache = function (g, h) {
    try {
      c(1)("Function 13").debug("Flusing image cache; current content:",this.cache.keys());
      this.cache.flushAll();
    c(1)("Function 13").debug("And now keys look like this:",this.cache.keys());
    return 
  } 
  catch (err) {c(1)("Function 13").debug("keys did not work",err)};
  };


  f.prototype.setErrorItem = function (g, h) {
    var i = d.promisify(this.cache.set);
    return i(g, h, this.cacheTimeError);
  };
  f.prototype.status = function () {
    var g = this;
    return new d(function (h) {
      var i = g.cache.getStats();
      var j = process.memoryUsage();
      var k = {
        hits: i.hits,
        misses: i.misses,
        keys: i.keys,
        ksize: i.ksize,
        vsize: i.vsize,
        heapTotalKb: parseInt(j.heapTotal) / 1024,
        heapUsedKb: parseInt(j.heapUsed) / 1024
      };
      h(k);
    });
  };
}, function (a, b, c) {
  c(1)("Function 14").debug("")
  'use strict';

  var d = c(13);
  var e = c(0).cacheservice;
  var f = c(29);
  var g = new f({
    stdTTL: e.cacheTimeSeconds,
    checkperiod: e.cacheTimeErrorItemSeconds,
    useClones: false
  });
  a.exports = new d({
    cache: g,
    settings: e
  });
}, function (a, b, c) {c(1)("Function 15").debug("")
  'use strict';

  var d = c(1)('facade');
  var e = a.exports = function (g) {
    d.debug('init', g.settings);
    this.imageservice = g.imageservice;
    this.cacheservice = g.cacheservice;
    this.queue = g.queue;
    this.settings = g.settings;
  };
  var f = function (h, i) {
    var j = this;
    return this.queue.ready().then(h).then(function (k) {
      j.cacheservice.set(i, k);
      return k;
    }).timeout(this.settings.fetchTimeoutMs, 'FETCH_IMAGE_TIMEOUT').catch(function (k) {
      d.warn('FETCH_IMAGE_FAILED', k.message);
      var l = {
        buffer: '',
        contentType: ''
      };
      j.cacheservice.setErrorItem(i, l);
      return l;
    }).finally(function () {
      d.debug('QUEUE JOB FINISHED', {
        waiting: j.queue.waitingCount(),
        runningCount: j.queue.runningCount()
      });
      j.queue.done();
    });
  };
  e.prototype.getResizeAndDitheredImage = function (g, h, i, j) {
    var k = this;
    var l = g + j + h + i;
    var m = undefined;
    return this.cacheservice.get(l).then(function (n) {
      return n ? (d.debug('return resized cacheimage'), n) : (d.debug('image not cached yet, fetch it if not cached yet and resize it'), k.getImage(g).then(function (o) {
        m = Date.now();       
        return k.imageservice.optimizeImageForTR2(o.buffer, h, i, j);
      }).then(function (o) {
        var p = Date.now() - m;
        if (500 < p) {
          d.info('LONG_IMAGE_RESIZE', {
            duration: p,
            url: g
          });
        }
        k.cacheservice.set(l, o);
        return o;
      }));
    });
  };
  e.prototype.resizeAndDitherImage = function (g, h, i, j) {
    return this.imageservice.optimizeImageForTR2(g, h, i, j);
  };
  e.prototype.getLazyResizeAndDitheredImage = function (g, h, i, j) {
    return this.cacheservice.get(g + j + h + i);
  };
  e.prototype.getImage = function (g) {
    var h = this;
    var i = function () {
      return h.imageservice.fetchImage(g);
    };
    return this.cacheservice.get(g).then(function (j) {
      return j ? j : f.call(h, i, g);
    });
  };
  e.prototype.getPlaceholderImage = function (g, h, i) {
    var j = this;
    var k = 'PLACEHOLDER_IMAGE' + i + g + h;
    var l = function () {
      var n = j.imageservice.defaultImage;
      return j.imageservice.optimizeImageForTR2(n.buffer, g, h, i);
    };
    return this.cacheservice.get(k).then(function (m) {
      return m ? m : f.call(j, l, k);
    });
  };
  e.prototype.cacheStatus = function () {
    var g = this;
    var h = this.imageservice.getCache();
    return this.cacheservice.status().then(function (i) {
      i.waitingqueue = g.queue.waitingCount();
      i.runningqueue = g.queue.runningCount();
      i.imgcache = h;
      return i;
    });
  };
  e.prototype.flushImageCache = function () {
    c(1)("Function 15").debug("flushImageCache")
    this.cacheservice.flushImageCache()
    return;
    
  };
    
}, function (a, b, c) {c(1)("Function 16").debug("")
  'use strict';

  var d = c(6);
  var e = c(1)('imageservice');
  var f = c(19);
  var g = c(18);
  var h = c(0).supportedInputMimeTypes;
  var j = a.exports = function (l) {
    e.debug('init', l.settings);
    this.sharp = l.sharp;
    this.request = l.request;
    this.settings = l.settings;
    this.filetype = l.filetype;
    this.defaultImage = l.defaultImage;
    this.fetchLocalImage = l.fetchLocalImage;
    this.sharp.cache(false);
    var m = this.sharp.simd(true);
    e.info('IMAGESERVICE_SIMD_STATUS', m);
  };
  j.prototype._getMimeType = function (l) {
    c(1)("Function 16").debug("_getMimeType:",l)
    var m = this.filetype(l);
    return m && m.mime ? h.includes(m.mime) ? m.mime : void e.warn('INVALID_MIME_TYPE', l[0] + ' ' + l[1] + ' ' + l[2]) : void e.warn('NO_MIME_TYPE_FOUND');
  };
  j.prototype.fetchImage = function (l) {
    c(1)("Function 16").debug("fetchImage:",l)
    var m = this;
    var n = l.match(/^LOCAL\:([A-Za-z\-\_]+)$/);
    return n ? new d(function (o) {
      var p = n[1];
      var q = m.fetchLocalImage(p) || m.defaultImage;
      o(q);
    }) : this.fetchRemoteImage(l);
  };
  j.prototype.fetchRemoteImage = function (l) {
    c(1)("Function 16").debug("fetchRemoteImage:",l)
    var m = this;
    return new d(function (n) {
      var o = {
        timeout: m.settings.fetchTimeoutMs,
        agent: g.getAgent(l)
      };
      m.request.get(l, o, function (p, q, r) {
        if (p) {
          e.error('DOWNLOAD_IMAGE_FAILED', {
            msg: p.message,
            url: l
          });
          return void n(m.defaultImage);
        }
        if (!r || 0 === r.length) {
          e.error('EMPTY_REPLY');
          return void n(m.defaultImage);
        }
        var s = m._getMimeType(r);
        return s ? void n({
          buffer: r,
          contentType: s
        }) : void n(m.defaultImage);
      });
    });
  };
  j.prototype._inplaceOrderedDithering = function (l, m) {
    var p;
    c(1)("Function 16").debug("_inplaceOrderedDithering")
    var n = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
    for (var o = 0; o < l.height; o++) {
      p = l.width * o;
      for (var q = 0; q < l.width; q++) {
        var r = (p + q) * l.channels;
        var s = ((3 & o) << 2) + q % 4;
        var t = n[s];
        m[r] = Math.min(m[r] + t, 255);
        m[r + 1] = Math.min(m[r + 1] + t, 255);
        m[r + 2] = Math.min(m[r + 2] + t, 255);
      }
    }
  };
  var k = {
    r: 0,
    g: 0,
    b: 0,
    alpha: 0
  };
  j.prototype.optimizeImageForTR2 = function (l, m, n, o) {
    var p = this;
    c(1)("Function 16").debug("optimizeImageForTR2")
    return new d(function (q) {
      var r = Date.now();
      var s = p.sharp(l).resize(m, n, {
        interpolator: 'bilinear',
        kernel: 'lanczos2'
      });
      if ('application/x-lzip-black' === o) {
        s.background(k).flatten();
      } else {
        s.background(k).embed();
      }
      s.raw().toBuffer(function (t, u, v) {
        if (t || !v || 3 > v.channels) {
          var w = t && t.message ? t.message : 'INVALID_CHANNELS_' + v.channels;
          e.error('RESIZE_IMAGE_FAILED', w);
          u = p.defaultImage;
        }
        var z = Date.now();
        p._inplaceOrderedDithering(v, u);
        e.debug('details', {
          image: v,
          resizeTime: z - r,
          ditheringTime: Date.now() - z
        });
        switch (o) {
          case 'image/jpeg':
            p.sharp(u, {
              raw: v
            }).jpeg({
              quality: p.settings.imageQuality
            }).toBuffer(function (B, C) {
              return q({
                buffer: C,
                contentType: o
              });
            });
            break;
          case 'image/png':
            p.sharp(u, {
              raw: v
            }).png().toBuffer(function (B, C) {
              return q({
                buffer: C,
                contentType: o
              });
            });
            break;
          case 'application/x-lzip-black':
          case 'application/x-lzip':
            {
              var A = f.convert(v, u, m, n);
              q({
                buffer: A,
                contentType: o
              });
              break;
            }
          default:
            p.sharp(u, {
              raw: v
            }).png().toBuffer(function (B, C) {
              return q({
                buffer: C,
                contentType: o
              });
            });
        }
      });
    });
  };
  j.prototype.getCache = function () {
    c(1)("Function 16").debug("getCache")
    return this.sharp.cache();
  };
  
}, function (a, b, c) {c(1)("Function 17").debug("")
  'use strict';

  var d = c(2);
  var e = c(7);
  var f = c(9).defaults({
    encoding: null
  });
  var g = c(0).imageservice;
  var h = c(32);
  var i = c(16);
  var j = new i({
    sharp: h,
    settings: g,
    request: f,
    defaultImage: d.getLocalImage(g.defaultimage),
    fetchLocalImage: d.getLocalImage,
    filetype: e
  });
  a.exports = j;
}, function (a, b, c) {c(1)("Function 18").debug("")
  'use strict';

  var f = c(8);
  var g = new f.Agent({
    keepAlive: true,
    keepAliveMsecs: 16000
  });
  var h = c(25);
  var i = new h.Agent({
    keepAlive: true,
    keepAliveMsecs: 16000
  });
  a.exports = {
    getAgent: function (j) {
      return j ? j.toLowerCase().startsWith('https://') ? i : g : g;
    }
  };
}, function (a, b, c) {c(1)("Function 19").debug("")
  'use strict';

  function d(n, o) {
    if (n) {
      n += '0'.repeat(o - n.length);
      return n;
    }
  }
  function e(n, o) {
    if (n) {
      var p = ('0'.repeat(o) + n.toString(16)).substr(-1 * o);
      p = p.match(/../g);
      p.reverse();
      p = p.join('');
      return d(p, o);
    }
  }
  function f(n, o) {
    var r;
    var p = 4 === n.channels ? 4 : 3;
    for (var q = 0; q < o.length; q += p) {
      r = o[q];
      o[q] = o[q + 2];
      o[q + 2] = r;
    }
  }
  function g(n, o, p, q) {
    var r = {
      signature: '345A4C00',
      width: e(n, 4),
      height: e(o, 4),
      size: e(p.length, 8),
      frames: '01',
      pixelFormat: 4 === q.channels ? '00' : '01',
      reserved: '0000'
    };
    var s = new Buffer("345A4C00" + r.width + r.height + r.size + ("01" + r.pixelFormat + '0000'), 'hex');
    return s;
  }
  var i = c(27);
  a.exports = {
    getHeader: g,
    inplaceReorderColorChannels: f,
    convert: function (n, o, p, q) {
      f(n, o);
      var r = Buffer.allocUnsafe(i.encodeBound(o.length));
      var s = i.encodeBlock(o, r);
      r = r.slice(0, s);
      var t = g(p, q, o, n);
      return Buffer.concat([t, r]);
    }
  };
}, function (a, b, c) {c(1)("Function 20").debug("")
  'use strict';

  var d = c(3);
  var e = d.Router();
  var f = c(5);
  var g = c(2);
  var h = c(0).imageservice;
  var i = g.getLocalImage(h.favoriteFallbackImage).buffer;
  e.get('/favorite', function (j, k) {
    c(1)("Function 20").debug("Router /favorite")
    k.set('Content-Type', 'image/png');
    k.send(i);
  });
  e.param('format', f.getImageFormat);
  e.param('width', f.validateImageWidth);
  e.param('height', f.validateImageHeight);
  e.get('/favorite/getresized/:format/:width/:height', function (j, k, l) {
    c(1)("Function 20").debug("Router /favorite/getresized")
    f.resizeImage(i, j, k, l, j.mimetype);
  });
  a.exports = e;
}, function (a, b, c) {c(1)("Function 21").debug("Express router")
  'use strict';

  var d = c(3);
  var e = d.Router();
  var f = c(4);
  var g = c(5);
  e.get('/status', function (k, l, m) {
    c(1)("Function 21").debug("router, /status")
    f.cacheStatus().then(function (n) {
      l.json(n);
    }).catch(m);
  });
  e.get('/get', function (k, l) {
    l.status(404).send('Not found');
  });
  e.param('url', g.validateUrl);
  e.get('/get/:url', function (k, l, m) {
    c(1)("Function 21").debug("router, /get",k.url)
    g.fetchImage(k.url, k, l, m);
  });
  e.param('width', g.validateImageWidth);
  e.param('height', g.validateImageHeight);
  e.get('/getresized/:width/:height', function (k, l) {
    l.status(404).send('Not found');
  });
  e.get('/getresized/:width/:height/:url', function (k, l, m) {
    g.fetchImageAndResize(k.params.url, k, l, m, 'application/x-lzip');
  });
  e.get('/flushImageCache', function (k, l, m) { //$$$
    c(1)("Function 21").debug(" get flushImageCache");
    g.flushImageCache();
  });
  e.get('/getresized/format/:format/:width/:height', function (k, l) {
    l.status(404).send('Not found');
  });
  e.param('format', g.getImageFormat);
  e.get('/getresized/:format/:width/:height/:url', function (k, l, m) {
    g.fetchImageAndResize(k.url, k, l, m, k.mimetype);
  });
  e.get('/getresized/format/:format/:width/:height/:url', function (k, l, m) {
    g.fetchImageAndResize(k.url, k, l, m, k.mimetype);
  });
  e.get('/getlazyresized/:format/:width/:height', function (k, l) {
    l.status(404).send('Not found');
  });
  e.get('/getlazyresized/:format/:width/:height/:url', function (k, l, m) {
    g.getImageFromCache(k.url, k, l, m, k.mimetype);
  });
  a.exports = e;
}, function (a) {//c(1)("Function 22").debug("Assign NEEO-fixed pictures")
  a.exports = {
    "sonos-nocover": 'sonos-nocover.jpg',
    "neeo-guy": 'neeo-guy.jpg',
    "favorites-fallback": 'favorites-fallback.png',
    "sonos-favorites": 'sonos_favorites.png',
    "sonos-library": 'sonos_library.png',
    "sonos-playlists": 'sonos_playlists.png',
    "sonos-spotify": 'sonos_spotify.png',
    "spotify-featured": 'spotify_featured.png',
    "spotify-genres": 'spotify_genres.png',
    "spotify-newreleases": 'spotify_newreleases.png',
    "spotify-yourmusic": 'spotify_yourmusic.png',
    "spotify-albums": 'spotify_albums.png',
    "spotify-playlists": 'spotify_playlists.png',
    "spotify-songs": 'spotify_songs.png'
  };
}, function (a) {//c(1)("Function 23").debug("")
  a.exports = require('debug');
}, function (a) {//c(1)("Function 24").debug("")
  a.exports = require('fs');
}, function (a) {//c(1)("Function 25").debug("")
  a.exports = require('https');
}, function (a) {//c(1)("Function 26").debug("")
  a.exports = require('loggly');
}, function (a) {//c(1)("Function 27").debug("")
  a.exports = require('lz4');
}, function (a) {//c(1)("Function 28").debug("")
  a.exports = require('madlib-promise-queue');
}, function (a) {//c(1)("Function 29").debug("")
  a.exports = require('node-cache');
}, function (a) {//c(1)("Function 30").debug("")
  a.exports = require('os');
}, function (a) {//c(1)("Function 31").debug("")
  a.exports = require('path');
}, function (a) {//c(1)("Function 32").debug("")
  a.exports = require('sharp');
}, function (a, b, c) {c(1)("Function 33").debug("")
  a.exports = c(10);
}]);