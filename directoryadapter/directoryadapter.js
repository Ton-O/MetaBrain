const logModule = "directoryadapter";
process.env.StartupPath = __dirname;
const { metaMessage, LOG_TYPE, LOG_LEVEL,initialiseLogComponents, initialiseLogSeverity,OverrideLoglevel, getLoglevels } = require("/opt/meta/metaMessage");
function metaLog(message) {
    let initMessage = { component:logModule, ORIGIN:logModule,type:LOG_TYPE.ERROR, content:'', deviceId: "" };
    let myMessage = {...initMessage, ...message}
    return metaMessage (myMessage);
  } 
initialiseLogSeverity("QUIET",logModule); 
//OverrideLoglevel("QUIET",logModule)   // normally, no logs will be produced
//OverrideLoglevel("DEBUG",logModule) // but activate this line if you want DEBUG logging (or VERBOSE etc)
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
    b.i = function (a) {
      return a;
    };
    b.d = function (a, c, d) {
      if (!b.o(a, c)) {
        Object.defineProperty(a, c, {
          configurable: false,
          enumerable: true,
          get: d
        });
      }
    };
    b.n = function (a) {
      var c = a && a.__esModule ? function () {
        return a['default'];
      } : function () {
        return a;
      };
      b.d(c, 'a', c);
      return c;
    };
    b.o = function (a, b) {
      return Object.prototype.hasOwnProperty.call(a, b);
    };
    b.p = '/';
    return b(b.s = 28);
  }
  ([function (a, b, c) {
  //  c(0)('Function 0').debug('Logging Init');

    'use strict';

    function d() {
      if (!l) {
        if (/true/.test(h.network)) {
          m = g.createClient({
            token: h.token,
            subdomain: h.subdomain,
            json: true
          });
        }
      }
    }
    function e(a) {
      this.label = a || h.tag;
    }
    var f = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function (a) {
      return typeof a;
    } : function (a) {
      return a && 'function' == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? 'symbol' : typeof a;
    };
    var g = c(23);
    var h = c(1).log;
    var i = c(24).hostname();
    var j = h.version;
    var k = /true/.test(h.console) && 'silent' !== process.env.LOG_LEVEL;
    var l = false;
    var m = undefined;
    var n = undefined;
    var o = 0;
    setInterval(function () {
      o = 0;
    }, 3600000);
    e._log = function (a, b) {
      return function () {
        var c = Array.prototype.shift.call(arguments);
        var d = Array.prototype.slice.call(arguments);
        if (d.length) {
          d = 1 === d.length ? d[0] : d;
        }
        //if (k) {
        if (true) {
          var e = d ? c + ' ' + JSON.stringify(d) : c;
          metaLog({type:a, content:"["+ this.label + "] "+e,deviceId:"_"})
          console.log('%s - %s: [ %s ] %s', new Date().toISOString(), a, this.label, e);
        }
        var g = {
          host: i,
          app: h.tag,
          version: j,
          level: a, //.toUpperCase(),
          source: this.label,
          message: c,
          timestamp: Date.now()
        };
        g.params = ['string', 'number', 'boolean'].includes('undefined' == typeof d ? 'undefined' : f(d)) ? {
          msg: d
        } : d;
        if (b && m) {
          o++;
          if (o < h.maximalUpstreamLogMessagePerHour) {
            m.log(g);
          } else if (o === h.maximalUpstreamLogMessagePerHour) {
            g.source = 'LOG';
            g.message = 'LOG_COUNT_EXCEEDED';
            g.level = 'WARN';
            g.params = undefined;
            m.log(g);
          }
        }
        if ('error' === a && n) {
          n(g);
        }
      };
    };
    e.prototype.always = e._log(LOG_TYPE.ALWAYS, !1);
    e.prototype.debug = e._log(LOG_TYPE.DEBUG, !1);
    e.prototype.verbose = e._log(LOG_TYPE.VERBOSE, !1);
    e.prototype.info = e._log(LOG_TYPE.INFO, !0);
    e.prototype.warn = e._log(LOG_TYPE.WARNING, !0);
    e.prototype.error = e._log(LOG_TYPE.ERROR, !0);
  /*  e.prototype.debug = e._log('debug', false);
    e.prototype.verbose = e._log('verbose', false);
    e.prototype.info = e._log('info', true);
    e.prototype.warn = e._log('warn', true);
    e.prototype.error = e._log('error', true);*/
    a.exports = function (a) {
      if (!l) {
        d();
        l = true;
      }
      return new e(a);
    };
    a.exports.registerErrorCallback = function (a) {
      n = a;
    };
  }, function (a) {
    'use strict';
    //c(0)('Function 0').debug('Init setup pgm env (var, env, ip, directories, log)');
  
    var b = process.env.IP || '127.0.0.1';
    var c = process.env.PORT || 3003;
    var d = process.env.CP6_HOSTNAME || 'localhost';
    var e = process.env.CP6_PORT || 3001;
    var f = process.env.FLUSH_BRAINSTATS_S || 14400;
    a.exports = {
      env: process.env.NODE_ENV || 'development',
      port: c,
      ip: b,
      directories: ['spotify'],
      log: {
        level: process.env.LOG_LEVEL || 'info',
        console: process.env.LOG_CONSOLE || true,
        network: process.env.LOG_NETWORK || false,
        token: process.env.LOG_TOKEN || 'b8f841c9-9962-4462-9b16-5b513ae48ac0',
        subdomain: process.env.LOG_SUBDOMAIN || 'neeo',
        tag: process.env.LOG_TAG || 'DIA',
        version: process.env.NEEO_RELEASE || 'DEV',
        maximalUpstreamLogMessagePerHour: 100
      },
      notification: {
        hostname: d,
        port: e,
        maxQueueSize: process.env.NOTIFICATION_MAX_QUEUE_SIZE || 50
      },
      statistics: {
        flushIntervalSeconds: f
      },
      store: {
        dataRoot: process.env.STORE_DATAFILE || './data/store.json',
        type: process.env.STORE_TYPE || 'single'
      },
      spotify: {
        api: {
          clientId: process.env.SPOTIFY_CLIENT_ID || 'f3f91a84e71646848965b8356746d919',
          clientSecret: process.env.SPOTIFY_CLIENT_SECRET || 'd10d97788e074cb98883d2ae5580be18',
          redirectUri: process.env.SPOTIFY_REDIRECT_URI || 'http://localhost/callback'
        },
        scopes: ['user-read-private', 'user-library-read', 'playlist-read-private']
      }
    };
  }, function (a) {
    //c(0)('Function 1').debug('Init');


    a.exports = require('express');
  }, function (a) {
    'use strict';
  
    var b = undefined;
    var c = a.exports = function (a) {
      this.section = a;
    };
    c.setStore = function (a) {
      b = a;
    };
    c.loadAll = function () {
      if (!b) {
        return null;
      }
      var a = b.allSync();
      if (a instanceof Error) {
        throw a;
      }
      return a;
    };
    c.saveAll = function (a) {
      if (!b) {
        throw new Error('store is not set');
      }
      if (!a) {
        throw new Error('save config must not be empty');
      }
      b.replace(a);
    };
    c.prototype.getSection = function () {
      return this.section;
    };
    c.prototype.save = function (a, c) {
      if (b) {
        b.saveSync(this.section + '.' + a, c);
      }
    };
    c.prototype.load = function (a) {
      if (!b) {
        return null;
      }
      var c = b.getSync(this.section + '.' + a);
      if (c instanceof Error) {
        throw c;
      }
      return c;
    };
  }, function (a, b, c) {
    'use strict';
    c(0)('Function 3').debug('Init Spotify');

    var d = c(26);
    var e = c(12);
    var f = c(1).spotify;
    a.exports = new e({
      api: new d(f.api),
      scopes: f.scopes
    });
  }, function (a) {
    a.exports = require('bluebird');
  }, function (a, b, c) {
    'use strict';
    c(0)('Function 4').debug('Init statistics');

    var d = c(1).statistics;
    var e = c(25);
    var f = new e(d);
    var g = c(0)('Statistics');
    var h = 1e3 * d.flushIntervalSeconds;
    var i = undefined;
    a.exports = {
      getInstance: function () {
        return f;
      },
      increaseCounter: function (a, b) {
        f.increaseCounter(a, b);
      },
      setValue: function (a, b) {
        f.setValue(a, b);
      },
      startTask: function () {
        g.debug('startTask, flushIntervalMs', h);
        i = setInterval(function () {
          g.debug('statistics.logAndFlushStatistics');
          var a = f.getStatistic();
          if (0 < Object.keys(a).length) {
            g.info('STATISTICS_KPI_DIA_APP', a);
          } else {
            g.debug('NO_STATISTICS_FOUND_TO_LOG');
          }
          f.clearStatistics();
        }, h);
      },
      stopTask: function () {
        clearInterval(i);
        i = undefined;
      }
    };
  }, function (a, b, c) {
    'use strict';
    c(0)('Function 5').debug('server (init handle exceptions)');

    var d = c(0)('server');
    var e = c(9);
    var f = 'development' === process.env.NODE_ENV;
    e.initializeServices();
    process.on('SIGTERM', function () {
      d.info('TERMINATE_APPLICATION');
      e.shutdownServices();
    });
    process.on('SIGHUP', function () {
      d.info('SIGHUP_SIGNALED');
    });
    process.on('uncaughtException', function (a) {
      d.error('UNCAUGHT_EXCEPTION', {
        error: a.message
      });
      process.exit(1);
    });
    process.on('unhandledRejection', function (a) {
      var b = f ? a.stack : undefined;
      d.error('UNHANDLED_REJECTION', {
        msg: a.message,
        stack: b
      });
    });
  }, function (a, b, c) {
    'use strict';
    c(0)('Function 6').debug('Init app');

    var d = c(2);
    var e = c(18);
    var f = c(0)('app');
    var g = d();
    g.disable('x-powered-by');
    g.use(e.json({
      limit: '2mb'
    }));
    g.use('/favicon.ico', function (a, b) {
      b.send();
    });
    var h = d.Router();
    g.use('/v1', h);
    g.use('/', h);
    var i = {
      config: c(15),
      rootitems: c(16),
      spotify: c(17)
    };
    h.use('/config', i.config);
    h.use('/root', i.rootitems);
    h.use('/spotify', i.spotify);
    h.post('/directoryadapter/metaMessageHandler',function (req, res) {res.json(metaMessageHandler(req,res,f))}),

          
    g.use(function (a, b, c) {
      f.error('INVALID_URL_REQUESTED', {
        url: a.url
      });
      var d = new Error('Not Found');
      d.status = 404;
      c(d);
    });
    if ('development' === g.get('env')) {
      g.use(function (a, b, c, d) {
        if (!d) {
          f.debug('EXPRESS_NEEDS_NEXT_PARAMETER_WEBPACK_TOO');
        }
        f.error('SERVER_ERROR', {
          url: b.url,
          method: b.method,
          error: a.message,
          stack: a.stack
        });
        c.status(a.status || 500);
        c.json({
          message: a.message,
          error: a.message,
          stack: a.stack
        });
      });
    } else {
      g.use(function (a, b, c, d) {
        if (!d) {
          f.debug('EXPRESS_NEEDS_NEXT_PARAMETER_WEBPACK_TOO');
        }
        f.error('SERVER_ERROR', {
          url: b.url,
          method: b.method,
          error: a.message
        });
        c.status(a.status || 500);
        c.json({
          message: a.message,
          error: {}
        });
      });
    }
    a.exports = g;
  }, function (a, b, c) {
    'use strict';
    c(0)('Function 7').debug('Init neeo:bootstrap???)');

    function d() {
      return new g(function (a) {
        p = h.createServer(o);
        p.listen(i.port, i.ip, function () {
          j.debug('DIRECTORYADAPTER_PROJECT_STARTED', {
            ip: i.ip,
            port: i.port
          });
          var b = Math.floor(1e3 * (process.uptime() - e));
          j.info('STARTUP_COMPLETE', {
            durationMs: b
          });
          a();
        });
      });
    }
    var e = process.uptime();
    var f = c(19)('neeo:bootstrap');
    var g = c(5);
    var h = c(20);
    var i = c(1);
    var j = c(0)('server');
    var k = c(3);
    var l = c(6);
    var m = c(13);
    var n = c(4);
    var o = c(8);
    var p = undefined;
    a.exports = {
      initializeServices: function () {
        f('BOOTSTRAP_START', process.uptime());
        k.setStore(m);
        l.startTask();
        n.initialize();
        return d();
      },
      shutdownServices: function () {
        f('TERMINATE_SERVICES');
        if (p) {
          p.close();
        }
        l.stopTask();
      }
    };
  }, function (a, b, c) {
    'use strict';
    c(0)('Function 8').debug('Init');

    var d = c(1).directories;
    var e = c(3);
    var f = a.exports = function (a) {
      if (!a) {
        throw new Error('missing directory type!');
      }
      if (0 > d.indexOf(a)) {
        throw new Error('invalid directory type ' + a);
      }
      this.type = a;
      this.repo = new e(a);
    };
    f.prototype.getType = function () {
      return this.type;
    };
    f.prototype.getRepo = function () {
      return this.repo;
    };
    f.prototype.getAdapter = function () {
      throw new Error('to be implemented!');
    };
    f.prototype.register = function () {
      throw new Error('to be implemented!');
    };
  }, function (a, b, c) {
    'use strict';
    c(0)('Function 9').debug('Init Spotify adapter');

    var d = Math.max;
    var e = Math.min;
    var f = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function (a) {
      return typeof a;
    } : function (a) {
      return a && 'function' == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? 'symbol' : typeof a;
    };
    var g = c(22);
    var h = c(5);
    var i = c(0)('Spotify Adapter');
    var j = a.exports = function (a) {
      this.api = a.api;
    };
    j.prototype._fixOptions = function (a) {
      a.limit = d(0, e(a.limit || 20, 50));
      a.offset = d(0, a.offset || 0);
    };
    j.prototype.getUserData = function () {
      return this.api.getMe().then(function (a) {
        return a.body;
      }).then(function (a) {
        return {
          username: a.id,
          email: a.email || null,
          displayName: a.display_name || null
        };
      }).catch(function (a) {
        i.warn('SPOTIFY_GET_USER_DATA_FAILED', a.message);
        return a;
      });
    };
    j.BROWSE_URI_ROUTES = {
      root: {
        pattern: /^(|root)$/,
        adapterFn: '_getRootItems'
      },
      featuredPlaylists: {
        pattern: /^featured-playlists$/,
        adapterFn: '_getFeaturedPlaylists'
      },
      newReleases: {
        pattern: /^new-releases$/,
        adapterFn: '_getNewReleases'
      },
      categories: {
        pattern: /^categories$/,
        adapterFn: '_getCategories'
      },
      categoryPlaylists: {
        pattern: /^categories:(\w+)$/,
        adapterFn: '_getCategoryPlaylists',
        paramKeys: ['categoryId']
      },
      me: {
        pattern: /^me$/,
        adapterFn: '_getMeItems'
      },
      mePlaylists: {
        pattern: /^me:playlists$/,
        adapterFn: '_getUserPlaylists'
      },
      meTracks: {
        pattern: /^me:tracks$/,
        adapterFn: '_getMySavedTracks',
        addCollectionItem: true
      },
      meAlbums: {
        pattern: /^me:albums$/,
        adapterFn: '_getMySavedAlbums'
      },
      album: {
        pattern: /^spotify:(?:album|artist):(\w+)$/,
        adapterFn: '_getAlbumTracks',
        paramKeys: ['albumId'],
        addCollectionItem: true
      },
      userPlaylist: {
        pattern: /^spotify:user:(\w+):playlist:(\w+)$/,
        adapterFn: '_getPlaylistTracks',
        paramKeys: ['userId', 'playlistId'],
        addCollectionItem: true
      },
      playlist: {
        pattern: /^spotify:playlist:(\w+)$/,
        adapterFn: '_getPlaylistTracks',
        paramKeys: ['playlistId'],
        addCollectionItem: true
      }
    };
    j.prototype._getBrowseRouteInfo = function (a) {
      for (var b in j.BROWSE_URI_ROUTES) {
        var c = j.BROWSE_URI_ROUTES[b];
        if (c.pattern.test(a)) {
          var d = function () {
            var b = (a.match(c.pattern) || []).slice(1);
            var d = c.paramKeys || [];
            var e = {};
            d.forEach(function (a, c) {
              e[a] = b[c];
            });
            return {
              v: {
                adapterFn: c.adapterFn,
                addCollectionItem: c.addCollectionItem || false,
                data: e
              }
            };
          }();
          if ('object' === ('undefined' == typeof d ? 'undefined' : f(d))) {
            return d.v;
          }
        }
      }
      throw new Error('invalid browseURI ' + JSON.stringify(a));
    };
    j.prototype._setBrowseMeta = function (a, b) {
      a._meta = {
        current: {
          browseUri: b.browseUri,
          offset: b.offset,
          limit: b.limit
        }
      };
      if (a.total > b.offset + a.items.length) {
        a._meta.next = {
          browseUri: b.browseUri,
          offset: b.offset + a.items.length,
          limit: b.limit
        };
      }
      if (0 < b.offset) {
        a._meta.previous = {
          browseUri: b.browseUri,
          offset: d(b.offset - b.limit, 0),
          limit: e(b.limit, b.offset)
        };
      }
    };
    j.prototype.browse = function (a) {
      var b = this;
      a.browseUri = a.browseUri || '';
      var c = this._getBrowseRouteInfo(a.browseUri);
      var d = Object.assign(a, c.data);
      this._fixOptions(d);
      return this[c.adapterFn](d).then(function (a) {
        if (c.addCollectionItem) {
          a.collectionItem = b._formatBase({
            title: 'Play All',
            isActionNode: true,
            isQueueable: true,
            browseUri: d.browseUri,
            actionUri: d.browseUri
          });
        }
        return a;
      }).then(function (a) {
        b._setBrowseMeta(a, d);
        return a;
      });
    };
    j.prototype._getRootItems = function () {
      return h.resolve({
        items: [this._formatBase({
          title: 'Featured',
          browseUri: 'featured-playlists',
          thumbnailUri: 'LOCAL:spotify-featured'
        }), this._formatBase({
          title: 'New Releases',
          browseUri: 'new-releases',
          thumbnailUri: 'LOCAL:spotify-newreleases'
        }), this._formatBase({
          title: 'Genres and Moods',
          browseUri: 'categories',
          thumbnailUri: 'LOCAL:spotify-genres'
        }), this._formatBase({
          title: 'Your Music',
          browseUri: 'me',
          thumbnailUri: 'LOCAL:spotify-yourmusic'
        })],
        total: 4
      });
    };
    j.prototype._getMeItems = function () {
      return h.resolve({
        items: [this._formatBase({
          title: 'Playlists',
          browseUri: 'me:playlists',
          thumbnailUri: 'LOCAL:spotify-playlists'
        }), this._formatBase({
          title: 'Songs',
          browseUri: 'me:tracks',
          actionUri: 'me:tracks',
          thumbnailUri: 'LOCAL:spotify-songs'
        }), this._formatBase({
          title: 'Albums',
          browseUri: 'me:albums',
          thumbnailUri: 'LOCAL:spotify-albums'
        })],
        total: 3
      });
    };
    j.prototype._getFormattedItemData = function (a, b, c) {
      return a.then(function (a) {
        return a.body;
      }).then(function (a) {
        var d = {
          items: [],
          total: 0
        };
        var e = a;
        if ('function' == typeof b) {
          e = b(a);
        }
        return !e ? (i.warn('SPOTIFY_GET_FORMATTED_DATA_ITEMS_FAILED'), d) : (d.total = e.total, d.items = e.items.map(c), d);
      });
    };
    j.prototype._getFeaturedPlaylists = function (a) {
      var b = this;
      var c = this.api.getFeaturedPlaylists({
        offset: a.offset,
        limit: a.limit
      });
      return this._getFormattedItemData(c, function (a) {
        return a.playlists;
      }, function (a) {
        return b._formatPlaylist(a);
      });
    };
    j.prototype._getNewReleases = function (a) {
      var b = this;
      var c = this.api.getNewReleases({
        offset: a.offset,
        limit: a.limit
      });
      return this._getFormattedItemData(c, function (a) {
        return a.albums;
      }, function (a) {
        return b._formatPlaylist(a);
      });
    };
    j.prototype._getCategories = function (a) {
      var b = this;
      var c = this.api.getCategories({
        offset: a.offset,
        limit: a.limit
      });
      return this._getFormattedItemData(c, function (a) {
        return a.categories;
      }, function (a) {
        return b._formatCategory(a);
      });
    };
    j.prototype._getCategoryPlaylists = function (a) {
      var b = this;
      var c = this.api.getPlaylistsForCategory(a.categoryId, {
        offset: a.offset,
        limit: a.limit
      });
      return this._getFormattedItemData(c, function (a) {
        return a.playlists;
      }, function (a) {
        return b._formatPlaylist(a);
      });
    };
    j.prototype._getPlaylistTracks = function (a) {
      var b = this;
      var c = this.api.getPlaylistTracks(a.playlistId, {
        offset: a.offset,
        limit: a.limit
      });
      return this._getFormattedItemData(c, null, function (a) {
        return b._formatTrack(a.track);
      });
    };
    j.prototype._getArtistAlbums = function (a) {
      var b = this;
      var c = this.api.getArtistAlbums(a.albumId, {
        offset: a.offset,
        limit: a.limit
      });
      return this._getFormattedItemData(c, null, function (a) {
        return b._formatPlaylist(a);
      });
    };
    j.prototype._getAlbumTracks = function (a) {
      var b = this;
      var c = this.api.getAlbumTracks(a.albumId, {
        offset: a.offset,
        limit: a.limit
      });
      return this._getFormattedItemData(c, null, function (a) {
        return b._formatTrack(a);
      });
    };
    j.prototype._getUserId = function () {
      return this.api.getMe().then(function (a) {
        return a.body;
      }).then(function (a) {
        return a.id;
      });
    };
    j.prototype._getUserPlaylists = function (a) {
      var b = this;
      var c = this._getUserId().then(function (c) {
        return b.api.getUserPlaylists(c, {
          offset: a.offset,
          limit: a.limit
        });
      });
      return this._getFormattedItemData(c, null, function (a) {
        return b._formatPlaylist(a);
      });
    };
    j.prototype._getMySavedTracks = function (a) {
      var b = this;
      var c = this.api.getMySavedTracks({
        offset: a.offset,
        limit: a.limit
      });
      return this._getFormattedItemData(c, null, function (a) {
        return b._formatTrack(a.track);
      });
    };
    j.prototype._getMySavedAlbums = function (a) {
      var b = this;
      var c = this.api.getMySavedAlbums({
        offset: a.offset,
        limit: a.limit
      });
      return this._getFormattedItemData(c, null, function (a) {
        return b._formatPlaylist(a.album);
      });
    };
    var l = function (a, b, c) {
      var f = g.get(a, b);
      if (!f || !(f instanceof Array) || !f.length) {
        return null;
      }
      var h = d(1, e(f.length, c));
      return f[f.length - h].url;
    };
    j.prototype._formatTrack = function (a) {
      return this._formatBase({
        title: a.name,
        label: a.artists && a.artists instanceof Array ? a.artists.reduce(function (a, b) {
          return a + ', ' + b.name;
        }, '').slice(2) : '',
        thumbnailUri: l(a, 'album.images', 2),
        isActionNode: true,
        isQueueable: true,
        browseUri: a.uri,
        actionUri: a.uri
      });
    };
    j.prototype._formatPlaylist = function (a) {
      return this._formatBase({
        title: a.name,
        label: a.label,
        thumbnailUri: l(a, 'images', 2),
        isQueueable: true,
        browseUri: a.uri,
        actionUri: a.uri
      });
    };
    j.prototype._formatCategory = function (a) {
      return this._formatBase({
        title: a.name,
        label: a.label,
        thumbnailUri: l(a, 'icons', 2),
        browseUri: 'categories:' + a.id
      });
    };
    j.prototype._formatBase = function (a) {
      return {
        isElement: true,
        title: a.title || null,
        label: a.label || null,
        thumbnailUri: a.thumbnailUri || null,
        isActionNode: a.isActionNode || false,
        isQueueable: a.isQueueable || false,
        data: {
          browseUri: a.browseUri || null,
          actionUri: a.actionUri || null
        }
      };
    };
  }, function (a, b, c) {
    'use strict';
    c(0)('Function 10').debug('Init Spotify Directory');

    var d = c(27);
    var e = c(5);
    var f = c(10);
    var g = c(6);
    var h = c(11);
    var i = c(0)('Spotify Directory');
    var j = a.exports = function (a) {
      this.api = a.api;
      this.scopes = a.scopes;
      this.refreshTimeoutId = undefined;
      f.call(this, 'spotify');
    };
    d.inherits(j, f);
    j.prototype.initialize = function () {
      i.debug('Initializing');
      if (this._loadRefreshToken()) {
        this.refreshAccessToken();
      }
      return e.resolve();
    };
    j.prototype.isEnabled = function () {
      try {
        return this.getRepo().load('refresh_token');
      } catch (a) {
        return false;
      }
    };
    j.prototype._loadRefreshToken = function () {
      try {
        var a = this.getRepo();
        var b = a.load('refresh_token');
        this.api.setRefreshToken(b);
        g.increaseCounter('SPOTIFY_SAVED_REFRESHTOKEN_FOUND');
        i.debug('SPOTIFY_SAVED_REFRESHTOKEN_FOUND');
        return true;
      } catch (a) {
        i.debug('SPOTIFY_NO_SAVED_REFRESHTOKEN');
        return false;
      }
    };
    j.prototype._saveRefreshToken = function (a) {
      var b = this.getRepo();
      b.save('refresh_token', a);
    };
    j.prototype.getAdapter = function () {
      if (!this.refreshTimeoutId) {
        throw new Error('No active access Token for Spotify');
      }
      var a = {
        api: this.api
      };
      return new h(a);
    };
    j.prototype.getAuthorizeParams = function () {
      return {
        clientId: this.api.getClientId(),
        scopes: this.scopes
      };
    };
    j.prototype.createAccessToken = function (a) {
      var b = this;
      return this.api.authorizationCodeGrant(a).then(function (a) {
        return a.body;
      }).then(function (a) {
        i.debug('Set spotify access tokens.');
        b.api.setAccessToken(a.access_token);
        b.api.setRefreshToken(a.refresh_token);
        b._saveRefreshToken(a.refresh_token);
        b._setRefreshTimer(a.expires_in);
      }).catch(function (a) {
        g.increaseCounter('SPOTIFY_GRANT_ACCESSTOKEN_FAILED');
        i.warn('SPOTIFY_GRANT_ACCESSTOKEN', a.message);
        throw new Error(a.message);
      });
    };
    j.prototype.refreshAccessToken = function () {
      var a = this;
      return this.api.refreshAccessToken().then(function (a) {
        return a.body;
      }).then(function (b) {
        i.debug('Refreshed spotify access tokens.');
        a.api.setAccessToken(b.access_token);
        if (b.refresh_token) {
          a.api.setRefreshToken(b.refresh_token);
          a._saveRefreshToken(b.refresh_token);
        }
        a._setRefreshTimer(b.expires_in);
      }).catch(function (b) {
        i.debug('SPOTIFY_REFRESH_ACCESSTOKEN', b.message);
        g.increaseCounter('SPOTIFY_REFRESH_ACCESSTOKEN_FAILED');
        a._setRefreshTimer(300);
      });
    };
    j.prototype._setRefreshTimer = function (a) {
      var b = this;
      var c = 950 * a;
      i.debug('SPOTIFY_NEXT_REFRESH', {
        refreshInMs: c
      });
      this.refreshTimeoutId = setTimeout(function () {
        clearTimeout(b.refreshTimeoutId);
        b.refreshTimeoutId = undefined;
        b.refreshAccessToken();
      }, c);
    };
  }, function (a, b, c) {
    'use strict';
    c(0)('Function 11').debug('Init store');

    var d = c(1).store;
    var e = c(14);
    a.exports = new e(d);
  }, function (a, b, c) {
    'use strict';
    c(0)('Function 12').debug('Init store');

    function d(a, b) {
      if (!(a instanceof b)) {
        throw new TypeError('Cannot call a class as a function');
      }
    }
    function e(a, b) {
      if (!a) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return b && ('object' == typeof b || 'function' == typeof b) ? b : a;
    }
    function f(a, b) {
      if ('function' != typeof b && null !== b) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof b);
      }
      a.prototype = Object.create(b && b.prototype, {
        constructor: {
          value: a,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (b) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(a, b);
        } else {
          a.__proto__ = b;
        }
      }
    }
    var g = function () {
      function a(a, b) {
        var c;
        for (var d = 0; d < b.length; d++) {
          c = b[d];
          c.enumerable = c.enumerable || false;
          c.configurable = true;
          if ('value' in c) {
            c.writable = true;
          }
          Object.defineProperty(a, c.key, c);
        }
      }
      return function (b, c, d) {
        if (c) {
          a(b.prototype, c);
        }
        if (d) {
          a(b, d);
        }
        return b;
      };
    }();
    var h = c(21);
    var i = c(0)('Store');
    var j = function (a) {
      function b(a) {
        d(this, b);
        var c = e(this, (b.__proto__ || Object.getPrototypeOf(b)).call(this, a.dataRoot, {
          type: a.type
        }));
        i.debug('init type: ' + a.type + ' dataRoot: ' + a.dataRoot);
        return c;
      }
      f(b, a);
      g(b, [{
        key: 'reset',
        value: function () {
          i.info('RESET_STORE');
          for (var a in this.allSync()) this.deleteSync(a);
        }
      }, {
        key: 'replace',
        value: function (a) {
          i.info('REPLACE_STORE_DATA');
          this.reset();
          for (var b in a) this.saveSync(b, a[b]);
        }
      }]);
      return b;
    }(h);
    a.exports = j;
  }, function (a, b, c) {
    'use strict';
    c(0)('Function 13').debug('Init router');

    var d = c(2);
    var e = d.Router();
    var f = c(3);
    e.get('/', function (a, b) {
      var c = f.loadAll();
      b.json(c);
    });
    e.post('/', function (a, b) {
      var c = a.body;
      f.saveAll(c);
      b.json({
        success: true
      });
      process.exit(0);
    });

    a.exports = e;
  }, function (a, b, c) {
    'use strict';
    c(0)('Function 14').debug('Init router (getrootitems)');

    var d = c(2);
    var e = d.Router();
    var f = c(4);
    e.get('/getrootitems', function (a, b) {
      var c = {
        items: [],
        total: 0
      };
      if (f.isEnabled()) {
        c.items.push({
          title: 'Spotify',
          label: null,
          thumbnailUri: null,
          isActionNode: false,
          data: {
            browseUri: 'root',
            actionUri: null
          }
        });
        c.total += 1;
      }
      b.json(c);
    });
    a.exports = e;
  }, function (a, b, c) {
    'use strict';
    c(0)('Function 15').debug('Init routes Spotify');

    var d = c(2);
    var e = d.Router();
    var f = c(4);
    var g = c(0)('routes.spotify');
    e.get('/getauthorizeparams', function (a, b) {
      b.json(f.getAuthorizeParams());
    });
    e.post('/createaccesstoken', function (a, b, c) {
      var d = a.body.code;
      return f.createAccessToken(d).then(function () {
        b.json({
          success: true
        });
      }).catch(c);
    });
    e.get('/isEnabled', function (a, b, c) {
      try {
        f.getAdapter();
        b.json({
          success: true
        });
      } catch (a) {
        if (/No active access Token for Spotify/.test(a.message)) {
          b.json({
            success: false
          });
        } else {
          c(a);
        }
      }
    });
    e.all('*', function (a, b, c) {
      try {
        a.adapter = f.getAdapter();
      } catch (a) {
        var d = /No active access Token for Spotify/;
        return d.test(a.message) ? (g.debug('NO_ACTIVE_SPOTIFY_TOKEN'), b.status(a.status || 500), b.json({
          message: a.message
        })) : c(a);
      }
      c();
    });
    e.post('/browse', function (a, b, c) {
      a.adapter.browse(a.body || {}).then(function (a) {
        b.json(a);
      }).catch(c);
    });
    e.get('/getuserdata', function (a, b) {
      a.adapter.getUserData().then(function (a) {
        b.json(a);
      }).catch(function (a) {
        b.json(a.message);
      });
    });
    a.exports = e;
  }, function (a) {
    a.exports = require('body-parser');
  }, function (a) {
    a.exports = require('debug');
  }, function (a) {
    a.exports = require('http');
  }, function (a) {
    a.exports = require('jfs');
  }, function (a) {
    a.exports = require('lodash');
  }, function (a) {
    a.exports = require('loggly');
  }, function (a) {
    a.exports = require('os');
  }, function (a) {
    a.exports = require('simple-event-statistics');
  }, function (a) {
    a.exports = require('spotify-web-api-node');
  }, function (a) {
    a.exports = require('util');
  }, function (a, b, c) {
    a.exports = c(7);
  }]);
function metaMessageHandler(req, res,f)
{ f.debug("metaMessageHandler");
  if (req.query.doFunc == undefined)
  { f.debug('imageservice missing function for messagehandler routine',req.doFunc);
    return "imageservice missing function for messagehandler routine"
  };
  var doFunc = req.query.doFunc;
  if (doFunc.toUpperCase() == "GETLOGLEVEL")
   {f.verbose("Getting loglevel")
    return getLoglevels(logModule);
   }

  if (doFunc.toUpperCase() == "OVERRIDELOGLEVEL")
    {f.verbose("Setting loglevel")
      const o = req.query.logLevel;
      return OverrideLoglevel(o,logModule.toLowerCase()) 
    }
    metaLog({type:LOG_TYPE.ERROR,content:"Unknown function requestedmetaMessageHandler "+req.query.doFunc});
    metaLog({type:LOG_TYPE.ERROR,content:"logLevel passed "+req.query.logLevel});
    return "Returning error"
}
  