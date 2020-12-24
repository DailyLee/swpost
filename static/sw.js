(function () {
    /*eslint-disable*/
    (function () {
        // https://tc39.github.io/ecma262/#sec-array.prototype.find
        if (!Array.prototype.find) {
            Object.defineProperty(Array.prototype, 'find', {
                value: function value(predicate) {
                    // 1. Let O be ? ToObject(this value).
                    if (this == null) {
                        throw new TypeError('"this" is null or not defined');
                    }

                    var o = Object(this);

                    // 2. Let len be ? ToLength(? Get(O, "length")).
                    var len = o.length >>> 0;

                    // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                    if (typeof predicate !== 'function') {
                        throw new TypeError('predicate must be a function');
                    }

                    // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                    var thisArg = arguments[1];

                    // 5. Let k be 0.
                    var k = 0;

                    // 6. Repeat, while k < len
                    while (k < len) {
                        // a. Let Pk be ! ToString(k).
                        // b. Let kValue be ? Get(O, Pk).
                        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                        // d. If testResult is true, return kValue.
                        var kValue = o[k];
                        if (predicate.call(thisArg, kValue, k, o)) {
                            return kValue;
                        }
                        // e. Increase k by 1.
                        k++;
                    }

                    // 7. Return undefined.
                    return undefined;
                }
            });
        }

        // https://tc39.github.io/ecma262/#sec-array.prototype.includes
        if (!Array.prototype.includes) {
            Object.defineProperty(Array.prototype, 'includes', {
                value: function value(valueToFind, fromIndex) {

                    if (this == null) {
                        throw new TypeError('"this" is null or not defined');
                    }

                    // 1. Let O be ? ToObject(this value).
                    var o = Object(this);

                    // 2. Let len be ? ToLength(? Get(O, "length")).
                    var len = o.length >>> 0;

                    // 3. If len is 0, return false.
                    if (len === 0) {
                        return false;
                    }

                    // 4. Let n be ? ToInteger(fromIndex).
                    //    (If fromIndex is undefined, this step produces the value 0.)
                    var n = fromIndex | 0;

                    // 5. If n ≥ 0, then
                    //  a. Let k be n.
                    // 6. Else n < 0,
                    //  a. Let k be len + n.
                    //  b. If k < 0, let k be 0.
                    var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

                    function sameValueZero(x, y) {
                        return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
                    }

                    // 7. Repeat, while k < len
                    while (k < len) {
                        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                        // b. If SameValueZero(valueToFind, elementK) is true, return true.
                        if (sameValueZero(o[k], valueToFind)) {
                            return true;
                        }
                        // c. Increase k by 1.
                        k++;
                    }

                    // 8. Return false
                    return false;
                }
            });
        }

        // Production steps of ECMA-262, Edition 5, 15.4.4.17
        // Reference: http://es5.github.io/#x15.4.4.17
        if (!Array.prototype.some) {
            Array.prototype.some = function (fun /*, thisArg*/) {

                if (this == null) {
                    throw new TypeError('Array.prototype.some called on null or undefined');
                }

                if (typeof fun !== 'function') {
                    throw new TypeError();
                }

                var t = Object(this);
                var len = t.length >>> 0;

                var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
                for (var i = 0; i < len; i++) {
                    if (i in t && fun.call(thisArg, t[i], i, t)) {
                        return true;
                    }
                }

                return false;
            };
        }

        // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
        if (!Array.prototype.findIndex) {
            Object.defineProperty(Array.prototype, 'findIndex', {
                value: function value(predicate) {
                    // 1. Let O be ? ToObject(this value).
                    if (this == null) {
                        throw new TypeError('"this" is null or not defined');
                    }

                    var o = Object(this);

                    // 2. Let len be ? ToLength(? Get(O, "length")).
                    var len = o.length >>> 0;

                    // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                    if (typeof predicate !== 'function') {
                        throw new TypeError('predicate must be a function');
                    }

                    // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                    var thisArg = arguments[1];

                    // 5. Let k be 0.
                    var k = 0;

                    // 6. Repeat, while k < len
                    while (k < len) {
                        // a. Let Pk be ! ToString(k).
                        // b. Let kValue be ? Get(O, Pk).
                        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                        // d. If testResult is true, return k.
                        var kValue = o[k];
                        if (predicate.call(thisArg, kValue, k, o)) {
                            return k;
                        }
                        // e. Increase k by 1.
                        k++;
                    }

                    // 7. Return -1.
                    return -1;
                }
            });
        }

        // Production steps of ECMA-262, Edition 5, 15.4.4.21
        // Reference: http://es5.github.io/#x15.4.4.21
        // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
        if (!Array.prototype.reduce) {
            Object.defineProperty(Array.prototype, 'reduce', {
                value: function value(callback /*, initialValue*/) {
                    if (this === null) {
                        throw new TypeError('Array.prototype.reduce ' + 'called on null or undefined');
                    }
                    if (typeof callback !== 'function') {
                        throw new TypeError(callback + ' is not a function');
                    }

                    // 1. Let O be ? ToObject(this value).
                    var o = Object(this);

                    // 2. Let len be ? ToLength(? Get(O, "length")).
                    var len = o.length >>> 0;

                    // Steps 3, 4, 5, 6, 7
                    var k = 0;
                    var value;

                    if (arguments.length >= 2) {
                        value = arguments[1];
                    } else {
                        while (k < len && !(k in o)) {
                            k++;
                        }

                        // 3. If len is 0 and initialValue is not present,
                        //    throw a TypeError exception.
                        if (k >= len) {
                            throw new TypeError('Reduce of empty array ' + 'with no initial value');
                        }
                        value = o[k++];
                    }

                    // 8. Repeat, while k < len
                    while (k < len) {
                        // a. Let Pk be ! ToString(k).
                        // b. Let kPresent be ? HasProperty(O, Pk).
                        // c. If kPresent is true, then
                        //    i.  Let kValue be ? Get(O, Pk).
                        //    ii. Let accumulator be ? Call(
                        //          callbackfn, undefined,
                        //          « accumulator, kValue, k, O »).
                        if (k in o) {
                            value = callback(value, o[k], k, o);
                        }

                        // d. Increase k by 1.
                        k++;
                    }

                    // 9. Return accumulator.
                    return value;
                }
            });
        }
    })();

    var classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    var createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    var inherits = function (subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };

    var possibleConstructorReturn = function (self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };

    var slicedToArray = function () {
      function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;

        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);

            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"]) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }

        return _arr;
      }

      return function (arr, i) {
        if (Array.isArray(arr)) {
          return arr;
        } else if (Symbol.iterator in Object(arr)) {
          return sliceIterator(arr, i);
        } else {
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
      };
    }();

    function runPromiseInSequence() {
        var promises = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var input = arguments[1];

        return promises.reduce(function (acc, cur) {
            return acc.then(cur);
        }, Promise.resolve(input));
    }

    /**
     * 串行执行缓存之前的插件
     * @param plugins
     * @param request
     * @param response
     * @returns {*}
     */
    function applyBeforeCachePlugin() {
        var plugins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            request = _ref.request,
            response = _ref.response;

        var pluginHandlers = plugins.map(function (plugin) {
            return function (args) {
                return plugin.beforeCache(request, args);
            };
        });
        return runPromiseInSequence(pluginHandlers, response);
    }

    /**
     * 串行执行响应之前的插件
     * @param plugins
     * @param request
     * @param cachedResponse
     * @returns {*}
     */
    function applyBeforeResponsePlugin() {
        var plugins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            request = _ref2.request,
            cachedResponse = _ref2.cachedResponse;

        var pluginHandlers = plugins.map(function (plugin) {
            return function (args) {
                return plugin.beforeResponse(request, args);
            };
        });
        return runPromiseInSequence(pluginHandlers, cachedResponse);
    }

    /** *
     * 执行缓存更新的插件
     * @param plugins
     * @param options
     */
    function applyCacheDidUpdatePlugin() {
        var plugins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var options = arguments[1];

        plugins.map(function (plugin) {
            return plugin.cacheDidUpdate(options);
        });
    }

    var Plugin = function () {
        function Plugin() {
            classCallCheck(this, Plugin);
        }

        createClass(Plugin, [{
            key: "beforeCache",

            // eslint-disable-next-line class-methods-use-this
            value: function beforeCache(request, response) {
                return response;
            }

            // eslint-disable-next-line class-methods-use-this

        }, {
            key: "beforeResponse",
            value: function beforeResponse(request, response) {
                return response;
            }

            // eslint-disable-next-line class-methods-use-this,no-unused-vars

        }, {
            key: "cacheDidUpdate",
            value: function cacheDidUpdate(options) {}
        }]);
        return Plugin;
    }();

    function matchWrapper(_ref) {
        var cacheName = _ref.cacheName,
            request = _ref.request,
            _ref$matchOptions = _ref.matchOptions,
            matchOptions = _ref$matchOptions === undefined ? {} : _ref$matchOptions,
            _ref$plugins = _ref.plugins,
            plugins = _ref$plugins === undefined ? [] : _ref$plugins;

        var cachePromise = cacheName ? caches.open(cacheName) : Promise.resolve(caches);

        // 有些低版本手机 不支持ignoreSearch options 所以在这里手动处理一下，这样还能提升性能（chrome上有个ignoreSearch的性能bug）
        var ignoreSearchHandler = function ignoreSearchHandler(url) {
            return matchOptions.ignoreSearch ? url.split('?')[0] : url;
        };

        return cachePromise.then(function (cache) {
            var ignoreSearchUrl = ignoreSearchHandler(request.url);
            return cache.match(ignoreSearchUrl).then(function (cachedResponse) {
                if (cachedResponse) {
                    return applyBeforeResponsePlugin(plugins, { request: request, cachedResponse: cachedResponse });
                }
                throw new Error('no match cache' + ignoreSearchUrl);
            });
        });
    }

    function putWrapper(_ref2) {
        var cacheName = _ref2.cacheName,
            request = _ref2.request,
            response = _ref2.response,
            event = _ref2.event,
            _ref2$plugins = _ref2.plugins,
            plugins = _ref2$plugins === undefined ? [] : _ref2$plugins,
            _ref2$cacheOptions = _ref2.cacheOptions,
            cacheOptions = _ref2$cacheOptions === undefined ? {} : _ref2$cacheOptions;

        applyBeforeCachePlugin(plugins, { request: request, response: response });

        var requestUrl = cacheOptions.ignoreSearch ? request.url.split('?')[0] : request.url;

        var _applyCacheDidUpdatePlugin = function _applyCacheDidUpdatePlugin(cachedResponse) {
            applyCacheDidUpdatePlugin(plugins, {
                cacheName: cacheName,
                event: event,
                newResponse: response,
                oldResponse: cachedResponse
            });
        };

        return caches.open(cacheName).then(function (cache) {
            matchWrapper({ cacheName: cacheName, request: request, event: event }).then(_applyCacheDidUpdatePlugin)
            // 如果在cacheName的缓存中找不到，就在全部缓存中找一找（可能缓存在预加载的页面里了）
            .catch(function () {
                matchWrapper({ request: request, event: event }).then(_applyCacheDidUpdatePlugin);
            });

            if (self.isIos) {
                // TODO sw webview 上有个bug 导致clone出来的response无法put缓存；ios用cache.add方法，缺点是会多一次网络请求
                return cache.add(requestUrl);
            }
            return cache.put(requestUrl, response.clone());
        });
    }

    var cacheWrapper = {
        put: putWrapper,
        match: matchWrapper
    };

    function wrappedFetch(request) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            fetchOptions = _ref.fetchOptions;

        return fetch(request, fetchOptions).then(function (response) {
            if (response.status !== 200) {
                var error = new Error('Fetch Failed');
                // 透传response
                error.response = response;
                throw error;
            }
            return response;
        });
    }

    var fetchWrapper = {
        fetch: wrappedFetch
    };

    function cacheFirst() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            cacheName = _ref.cacheName,
            fetchOptions = _ref.fetchOptions,
            matchOptions = _ref.matchOptions;

        var plugins = arguments[1];

        // 优先匹配本地缓存
        return function (_ref2) {
            var request = _ref2.request;
            return cacheWrapper.match({
                request: request,
                cacheName: cacheName,
                matchOptions: matchOptions,
                plugins: plugins
            })
            // 匹配不到缓存或者缓存读取出现异常时，再去发起网络请求
            .catch(function () {
                return fetchWrapper.fetch(request, { fetchOptions: fetchOptions });
            });
        };
    }

    var precacheNamePrefix = 'pre-cache:';
    var runtimeCacheName = 'runtime-cache';

    function parseRangeHeader(rangeHeader) {
        var normalizedRangeHeader = rangeHeader.trim().toLowerCase();
        if (!normalizedRangeHeader.startsWith('bytes=')) {
            throw new Error('unit-must-be-bytes ' + normalizedRangeHeader);
        }

        // Specifying multiple ranges separate by commas is valid syntax, but this
        // library only attempts to handle a single, contiguous sequence of bytes.
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range#Syntax
        if (normalizedRangeHeader.includes(',')) {
            throw new Error('single-range-only:' + normalizedRangeHeader);
        }

        var rangeParts = /(\d*)-(\d*)/.exec(normalizedRangeHeader);
        // We need either at least one of the start or end values.
        if (!rangeParts || !(rangeParts[1] || rangeParts[2])) {
            throw new Error('invalid-range-values:' + normalizedRangeHeader);
        }

        return {
            start: rangeParts[1] === '' ? undefined : Number(rangeParts[1]),
            end: rangeParts[2] === '' ? undefined : Number(rangeParts[2])
        };
    }

    function calculateEffectiveBoundaries(file, start, end) {
        var fileSize = file.byteLength;

        if (end && end > fileSize || start && start < 0) {
            throw new Error('range-not-satisfiable:' + {
                size: fileSize,
                end: end,
                start: start
            });
        }

        var effectiveStart = void 0;
        var effectiveEnd = void 0;

        if (start !== undefined && end !== undefined) {
            effectiveStart = start;
            // Range values are inclusive, so add 1 to the value.
            effectiveEnd = end + 1;
        } else if (start !== undefined && end === undefined) {
            effectiveStart = start;
            effectiveEnd = fileSize;
        } else if (end !== undefined && start === undefined) {
            effectiveStart = fileSize - end;
            effectiveEnd = fileSize;
        }

        return {
            start: effectiveStart,
            end: effectiveEnd
        };
    }

    function createPartialResponseByArrayBuffer(originalResponse, rangeHeader, boundaries) {
        return originalResponse.arrayBuffer().then(function (originalArrayBuffer) {
            var effectiveBoundaries = calculateEffectiveBoundaries(originalArrayBuffer, boundaries.start, boundaries.end);

            var slicedArrayBuffer = originalArrayBuffer.slice(effectiveBoundaries.start, effectiveBoundaries.end);
            var slicedBlobSize = slicedArrayBuffer.byteLength;

            var slicedResponse = new Response(slicedArrayBuffer, {
                // Status code 206 is for a Partial Content response.
                // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/206
                status: 206,
                statusText: 'Partial Content',
                headers: originalResponse.headers
            });

            slicedResponse.headers.set('status', '206');
            slicedResponse.headers.set('content-length', String(slicedBlobSize));
            slicedResponse.headers.set('content-range', 'bytes ' + effectiveBoundaries.start + '-' + (effectiveBoundaries.end - 1) + '/' + originalArrayBuffer.byteLength);

            return slicedResponse;
        });
    }

    function createPartialResponse(request, originalResponse) {
        if (originalResponse.status === 206) {
            return originalResponse;
        }

        var rangeHeader = request.headers.get('range');
        if (!rangeHeader) {
            throw new Error('no range header');
        }
        var boundaries = parseRangeHeader(rangeHeader);

        return createPartialResponseByArrayBuffer(originalResponse, rangeHeader, boundaries);
    }

    /**
     * range请求处理插件
     */

    var RangeRequestsPlugin = function (_Plugin) {
        inherits(RangeRequestsPlugin, _Plugin);

        function RangeRequestsPlugin() {
            classCallCheck(this, RangeRequestsPlugin);
            return possibleConstructorReturn(this, (RangeRequestsPlugin.__proto__ || Object.getPrototypeOf(RangeRequestsPlugin)).apply(this, arguments));
        }

        createClass(RangeRequestsPlugin, [{
            key: 'beforeResponse',

            // eslint-disable-next-line class-methods-use-this
            value: function beforeResponse(request, response) {
                try {
                    // chrome 上 206的响应偶发视频播放错误的情况（好像是chrome的一个bug），所以chrome上直接200返回，safari上返回206
                    if (response && request.headers.get('range') && self.isSafari) {
                        return createPartialResponse(request, response);
                    }
                    return response;
                } catch (e) {
                    return Promise.reject(e);
                }
            }
        }]);
        return RangeRequestsPlugin;
    }(Plugin);

    function cacheResources(pages) {
        // return Promise.all(pages.map(({ url: cacheName, assets: urls }) => {
        //     // 首先打开并缓存 CacheStorage 对象
        //     // eslint-disable-next-line no-underscore-dangle
        //     let _cache;
        //     return caches.open(precacheNamePrefix + cacheName)
        //         // 获取已存储的所有资源键值信息
        //         .then((cache) => {
        //             _cache = cache;
        //             return cache.keys();
        //         })
        //         // 获取已存储的资源 URL
        //         .then(requests => requests.map(request => request.url))
        //         // 找出新增资源里面未存储过的资源 URL
        //         .then(cachedURLs => urls.filter(url => !cachedURLs.includes(url)))
        //         // 最后调用 cache.add 缓存新增资源
        //         .then(updateURLs => Promise.all(updateURLs.map(updateURL => _cache.add(updateURL))))
        //         // .then(updateURLs => _cache.addAll(updateURLs))
        //         // eslint-disable-next-line no-console
        //         .catch(e => console.log(e));
        // }));

        return Promise.all(pages.map(function (_ref) {
            var cacheName = _ref.url,
                _ref$assets = _ref.assets,
                urls = _ref$assets === undefined ? [] : _ref$assets;
            return caches.open(precacheNamePrefix + cacheName).then(function (cache) {
                return Promise.all(urls.map(function (url) {
                    return cache.match(url).then(function (updateUrl) {
                        if (updateUrl) {
                            return undefined;
                        }
                        return cache.add(url).catch(function () {});
                    });
                }));
            });
        }));
    }

    function _clearExpireCache(pages) {
        var preCacheNames = pages.map(function (page) {
            return precacheNamePrefix + page.url;
        });
        return caches.keys().then(function (cachesKeys) {
            return Promise.all(cachesKeys.map(function (key) {
                if (!preCacheNames.includes(key) && key.startsWith(precacheNamePrefix)) {
                    return caches.delete(key);
                }
                return Promise.resolve('no caches to delete');
            }));
        });
    }

    var Precacher = function () {
        function Precacher(router) {
            classCallCheck(this, Precacher);

            // 需要缓存的页面信息
            this.pages = [];
            // 需要缓存的资源信息
            this.resources = [];
            this.router = router;
            this.initEventListener();
        }

        // eslint-disable-next-line class-methods-use-this


        createClass(Precacher, [{
            key: 'initEventListener',
            value: function initEventListener() {
                // 添加 activate 事件监听
                self.addEventListener('activate', function () {
                    // eslint-disable-next-line no-console
                    console.log('####activate####');
                    // 立刻接管作用域下的页面
                    self.clients.claim();
                });
            }

            // eslint-disable-next-line class-methods-use-this

        }, {
            key: 'precache',
            value: function precache(pages) {
                return cacheResources(pages);
            }
        }, {
            key: 'addRoute',
            value: function addRoute() {
                var _this = this;

                var pages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                var matchOptions = arguments[1];

                this.pages = pages;
                if (pages && pages.length === 0) {
                    this.resources = [];
                }
                for (var i = 0; i < pages.length; i++) {
                    var assets = pages[i].assets;

                    this.resources = this.resources.concat(assets);
                }

                var cacheFirstHandler = cacheFirst({
                    matchOptions: matchOptions,
                    fetchOptions: { credentials: 'same-origin', mode: 'cors' }
                }, [new RangeRequestsPlugin()]);

                this.router.registerRoute('precacheRoute', function (request) {
                    return _this.resources.some(function (resource) {
                        return resource === request.url;
                    });
                }, function (fetchEvent) {
                    var cacheResource = _this.resources.find(function (resource) {
                        return resource === fetchEvent.request.url;
                    });
                    if (cacheResource) {
                        return cacheFirstHandler(fetchEvent);
                    }
                    return false;
                });
            }
        }, {
            key: 'precacheAndRoute',
            value: function precacheAndRoute() {
                var pages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                var matchOptions = arguments[1];

                this.addRoute(pages, matchOptions);
                return this.precache(pages);
            }
        }, {
            key: 'clearExpireCache',
            value: function clearExpireCache() {
                return _clearExpireCache(this.pages);
            }
        }]);
        return Precacher;
    }();

    function match(rule, request) {
        switch (Object.prototype.toString.call(rule)) {
            default:
                return false;
            // url 文本匹配
            case '[object String]':
                return request.url === rule;

            // url 正则匹配
            case '[object RegExp]':
                return request.url.match(rule);

            // 支持自定义匹配
            case '[object Function]':
                return rule(request);
        }
    }

    function respond(event, handler) {
        try {
            // 执行响应处理方法，根据返回结果进行兜底
            var res = handler(event);
            // 异步的响应结果兜底
            if (res instanceof Promise) {
                var promise = res.then(function (response) {
                    // 如果返回结果非 Response 对象，抛出错误
                    if (!(response instanceof Response)) {
                        throw Error('返回结果异常');
                    }
                    return response;
                })
                // 异步响应错误处理，穿透response，如果没有response 重新fetch一次
                .catch(function (e) {
                    return e.response || fetch(event.request.clone());
                }).catch(function () {});

                event.respondWith(promise);
                return;
            }

            // 同步响应如果出现任何错误
            // 可以选择不调用 event.respondWith(r)
            // 让资源请求继续走浏览器默认的请求流程

            if (res instanceof Response) {
                event.respondWith(res);
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
        }
    }

    var Router = function () {
        function Router(waitUntilInstall) {
            classCallCheck(this, Router);

            this.useProxy = true;
            this.routes = [];
            this.initEventListener(waitUntilInstall);
        }

        createClass(Router, [{
            key: 'initEventListener',
            value: function initEventListener(waitUntilInstall) {
                var _this = this;

                try {
                    // install事件
                    self.addEventListener('install', function (event) {
                        // eslint-disable-next-line no-console
                        console.log('####install####');
                        event.waitUntil(
                        // install之前需要完成的方法
                        waitUntilInstall && waitUntilInstall(event));
                    });

                    self.addEventListener('fetch', function (event) {
                        // eslint-disable-next-line no-console
                        console.log('fetch routes.length', _this.routes.length);
                        if (_this.useProxy) {
                            // 当拦截到资源请求时，会遍历已注册的路由规则，并执行相应规则所对应的策略,同时满足多个路由规则，以routes数组里的第一个为准
                            for (var i = 0; i < _this.routes.length; i++) {
                                var route = _this.routes[i];
                                if (match(route.rule, event.request) && event.request.url.startsWith('https:')) {
                                    respond(event, route.handler);
                                    break;
                                }
                            }
                        }
                    });
                } catch (e) {
                    // eslint-disable-next-line no-console
                    console.log('initEventListenerError', e);
                }
            }
        }, {
            key: 'registerRoute',
            value: function registerRoute() {
                var ruleName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'route-cache';
                var rule = arguments[1];
                var handler = arguments[2];

                this.unRegisterRoute(ruleName);
                this.routes.push({ ruleName: ruleName, rule: rule, handler: handler });
            }
        }, {
            key: 'unRegisterRoute',
            value: function unRegisterRoute(ruleName) {
                var index = this.routes.findIndex(function (route) {
                    return route.ruleName === ruleName;
                });
                if (index !== -1) {
                    this.routes.splice(index, 1);
                }
            }
        }, {
            key: 'setProxy',
            value: function setProxy(use) {
                this.useProxy = use;
            }
        }]);
        return Router;
    }();

    function _getCachedResponse(_ref) {
        var request = _ref.request,
            cacheName = _ref.cacheName,
            matchOptions = _ref.matchOptions,
            plugins = _ref.plugins;

        // 首先读取本地缓存，成功则直接将本地缓存结果返回
        return cacheWrapper.match({
            request: request,
            cacheName: cacheName,
            matchOptions: matchOptions,
            plugins: plugins
        })
        // 从所有缓存中读取，主要考虑了，预缓存可能缓存了staleWhileRevalidate下的资源，所以从预缓存中找一找
        .catch(function () {
            return cacheWrapper.match({ request: request, matchOptions: matchOptions, plugins: plugins });
        });
    }

    function staleWhileRevalidate() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            fetchOptions = _ref2.fetchOptions,
            _ref2$cacheName = _ref2.cacheName,
            cacheName = _ref2$cacheName === undefined ? runtimeCacheName : _ref2$cacheName,
            matchOptions = _ref2.matchOptions,
            cacheOptions = _ref2.cacheOptions;

        var plugins = arguments[1];

        return function (event) {
            var request = event.request;
            // 发起网络请求
            var fetchPromise = fetchWrapper.fetch(request, { fetchOptions: fetchOptions }).then(function (response) {
                cacheWrapper.put({
                    cacheName: cacheName,
                    request: request,
                    response: response,
                    event: event,
                    cacheOptions: cacheOptions,
                    plugins: plugins
                });
            });
            // 查找缓存
            var cachedResponsePromise = _getCachedResponse({
                request: request,
                cacheName: cacheName,
                matchOptions: matchOptions,
                plugins: plugins
            });

            // 先返回缓存
            return cachedResponsePromise
            // 返回 fetch结果
            .catch(function () {
                return fetchPromise;
            });
        };
    }

    var mi18nKey = {
        'zh-cn': /^zh-cn/i,
        'zh-tw': /^zh-tw/i,
        'en-us': /^en\b/i,
        'fr-fr': /^fr\b/i,
        'de-de': /^de\b/i,
        'es-es': /^es\b/i,
        'pt-pt': /^pt\b/i,
        'ru-ru': /^ru\b/i,
        'ja-jp': /^ja\b/i,
        'ko-kr': /^ko\b/i,
        'th-th': /^th\b/i,
        'vi-vn': /^vi\b/i,
        'id-id': /^id\b/i
    };

    function getMi18nKey(lang) {
        return Object.keys(mi18nKey).find(function (key) {
            return mi18nKey[key].test(lang);
        }) || 'zh-cn';
    }

    function getQuery(variable) {
        var query = location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (pair[0] === variable) {
                return decodeURIComponent ? decodeURIComponent(pair[1]) : pair[1];
            }
        }
        return null;
    }

    function includesIgnoreCase() {
        var string1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var string2 = arguments[1];

        if (typeof string1 === 'string' && typeof string2 === 'string') {
            return string1.toLowerCase().includes(string2.toLowerCase());
        }
        return false;
    }

    function timeout(ms) {
        return new Promise(function (resolve) {
            return setTimeout(resolve, ms);
        });
    }

    function interval(callback, period) {
        return Promise.resolve(callback).then(function (fn) {
            return fn().then(function (res) {
                return res || timeout(period).then(function () {
                    return interval(callback, period);
                });
            });
        });
    }

    var MAX_RETRY_TIME = 2000;

    function resultingClientExists(resultingClientId) {
        if (!resultingClientId) {
            return Promise.resolve(null);
        }

        var startTime = Date.now();

        var findResultingWindow = function findResultingWindow(id) {
            return self.clients.matchAll({ type: 'window' }).then(function () {
                var existingWindows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

                if (Date.now() - startTime > MAX_RETRY_TIME) {
                    return Promise.reject(Error('find resulting window timeout'));
                }
                return existingWindows.find(function (w) {
                    return id === w.id;
                });
            });
        };

        return interval(function () {
            return findResultingWindow(resultingClientId);
        }, 100).catch(function () {
            return null;
        });
    }

    var platform = getQuery('platform');
    var network = getQuery('network') || 'WiFi';

    function handleConfig() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            enable = _ref.enable,
            _ref$load_limit = _ref.load_limit,
            load_limit = _ref$load_limit === undefined ? 3 : _ref$load_limit,
            _ref$pages = _ref.pages,
            pages = _ref$pages === undefined ? [] : _ref$pages;

        // eslint-disable-next-line no-param-reassign,no-plusplus
        var pageLoadLimitAvailable = function pageLoadLimitAvailable() {
            return --load_limit >= 0;
        };
        var time = new Date().getTime();
        var timeAvailable = function timeAvailable() {
            var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref2$end_time = _ref2.end_time,
                end_time = _ref2$end_time === undefined ? '' : _ref2$end_time,
                _ref2$start_time = _ref2.start_time,
                start_time = _ref2$start_time === undefined ? '' : _ref2$start_time;

            // 兼容ios date replace(/-/g, '/')
            var endTime = new Date(end_time.replace(/-/g, '/')).getTime();
            var startTime = new Date(start_time.replace(/-/g, '/')).getTime();
            return time < endTime && time >= startTime;
        };
        var networkAvailable = function networkAvailable(page) {
            return includesIgnoreCase(page.network, network);
        };
        var platformAvailable = function platformAvailable(page) {
            return includesIgnoreCase(page.platform, platform);
        };

        // 格式化page
        var formatPages = pages.map(function (page) {
            page.assets = page.res_list.map(function (item) {
                return encodeURI(item);
            });
            return page;
        });

        // 在可用时间内和平台可用的page
        var platformAndTimeAvailablePages = formatPages.filter(function (page) {
            return platformAvailable(page) && timeAvailable(page);
        });
        // 当前网络情况下可用的page
        var availablePages = platformAndTimeAvailablePages.filter(function (page) {
            return networkAvailable(page);
        });

        // 缓存中有的页面，直接加入预缓存列表,缓存中没有的，将limit数量的页面加入预缓存列表
        return enable ? caches.keys().then(function (cachesPage) {
            var precacheFilter = function precacheFilter(page) {
                return cachesPage.includes(page.url) ? true : pageLoadLimitAvailable();
            };
            var precachePages = availablePages.filter(precacheFilter);
            return { precachePages: precachePages, routePages: platformAndTimeAvailablePages, enable: enable };
        }) : { precachePages: [], routePages: platformAndTimeAvailablePages, enable: enable };
    }

    function isNodeEnv() {
        return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
    }

    function getGlobalObject() {
        // eslint-disable-next-line no-nested-ternary
        return isNodeEnv() ? global
        // eslint-disable-next-line no-nested-ternary
        : typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : {};
    }

    function uuid4() {
        var global = getGlobalObject();
        var crypto = global.crypto || global.msCrypto;
        // eslint-disable-next-line no-void
        if (!(crypto === void 0) && crypto.getRandomValues) {
            // Use window.crypto API if available
            var arr = new Uint16Array(8);
            crypto.getRandomValues(arr);
            // set 4 in byte 7
            // eslint-disable-next-line no-bitwise
            arr[3] = arr[3] & 0xfff | 0x4000;
            // set 2 most significant bits of byte 9 to '10'
            // eslint-disable-next-line no-bitwise
            arr[4] = arr[4] & 0x3fff | 0x8000;
            var pad = function pad(num) {
                var v = num.toString(16);
                while (v.length < 4) {
                    v = '0' + v;
                }
                return v;
            };
            return pad(arr[0]) + pad(arr[1]) + pad(arr[2]) + pad(arr[3]) + pad(arr[4]) + pad(arr[5]) + pad(arr[6]) + pad(arr[7]);
        }
        // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // eslint-disable-next-line no-bitwise
            var r = Math.random() * 16 | 0;
            // eslint-disable-next-line no-bitwise
            var v = c === 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
    }

    var crossPlatformPerformance = function () {
        var INITIAL_TIME = Date.now();
        var prevNow = 0;

        var performanceFallback = {
            now: function now() {
                var now = Date.now() - INITIAL_TIME;
                if (now < prevNow) {
                    now = prevNow;
                }
                prevNow = now;
                return now;
            },

            timeOrigin: INITIAL_TIME
        };

        var _getGlobalObject = getGlobalObject(),
            performance = _getGlobalObject.performance;

        if (!performance || !performance.now) {
            return performanceFallback;
        }
        // Polyfill for performance.timeOrigin.
        //
        // While performance.timing.navigationStart is deprecated in favor of performance.timeOrigin, performance.timeOrigin
        // is not as widely supported. Namely, performance.timeOrigin is undefined in Safari as of writing.
        // tslint:disable-next-line:strict-type-predicates
        if (performance.timeOrigin === undefined) {
            // As of writing, performance.timing is not available in Web Workers in mainstream browsers,
            // so it is not always a
            // valid fallback. In the absence of a initial time provided by the browser, fallback to INITIAL_TIME.
            // @ts-ignore
            // tslint:disable-next-line:deprecation
            performance.timeOrigin = performance.timing && performance.timing.navigationStart || INITIAL_TIME;
        }
        return performance;
    }();

    function timestampWithMs() {
        return (crossPlatformPerformance.timeOrigin + crossPlatformPerformance.now()) / 1000;
    }

    // sentry 提供的包太大，这里实现sentry手动上报，我称之为乞丐版sentry

    var BeggarSentry = function () {
        function BeggarSentry() {
            classCallCheck(this, BeggarSentry);
        }

        createClass(BeggarSentry, [{
            key: 'init',
            value: function init() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                this.dsn = options.dsn;
                this.createApi();
                this.globalObject = getGlobalObject();
                this.proxyFetch();
                this.initEventListener();
                this.isSea = location.href === 'webstatic-sea.mihoyo.com';
                this.isTest = location.href === 'webstatic-sea-test.mihoyo.com' || location.href === 'webstatic-test.mihoyo.com';
            }

            // eslint-disable-next-line class-methods-use-this

        }, {
            key: 'initEventListener',
            value: function initEventListener() {
                var _this = this;

                self.addEventListener('error', function (event) {
                    _this.captureException(event.error);
                });
                // self.addEventListener('unhandledrejection', (event) => {
                //     this.captureException(new Error(event.reason));
                // });
            }
        }, {
            key: 'proxyFetch',
            value: function proxyFetch() {
                var _this2 = this;

                this.globalObject.originalFetch = this.globalObject.fetch;

                var proxyFetch = function proxyFetch(input, init) {
                    return _this2.globalObject.originalFetch(input, init).then(function (response) {
                        if (response.status >= 300 || response.status < 200) {
                            throw new TypeError('proxyFetch:Failed to fetch\uFF0Cstatus\uFF1A' + response.status);
                        }
                        return response;
                    }).catch(function (e) {
                        var myError = new TypeError('proxyFetch:' + e.message);
                        _this2.captureException(myError, {
                            fetchInfo: { url: input.url || input, method: init ? init.method : 'GET' }
                        });
                        throw e;
                    });
                };

                this.globalObject.fetch = proxyFetch;
            }
        }, {
            key: 'createApi',
            value: function createApi() {
                var _dsn$split$1$split = this.dsn.split('https://')[1].split('@sentry.mihoyo.com/'),
                    _dsn$split$1$split2 = slicedToArray(_dsn$split$1$split, 2),
                    sentry_key = _dsn$split$1$split2[0],
                    id = _dsn$split$1$split2[1];

                var host = this.isSea ? 'https://sentry-sea.mihoyo.com' : 'https://sentry.mihoyo.com';
                this.api = host + '/api/' + id + '/store/?sentry_key=' + sentry_key + '&sentry_version=7';
            }

            // eslint-disable-next-line consistent-return

        }, {
            key: 'postException',
            value: function postException(data) {
                if (!this.isTest) {
                    return this.globalObject.originalFetch(this.api, {
                        method: 'post',
                        headers: {
                            accept: '*/*',
                            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
                            'content-type': 'text/plain;charset=UTF-8',
                            'sec-fetch-dest': 'empty',
                            'sec-fetch-mode': 'cors',
                            'sec-fetch-site': 'cross-site'
                        },
                        body: JSON.stringify(data)
                    }).catch(function () {});
                }
            }
        }, {
            key: 'createData',
            value: function createData(e, _ref) {
                var fetchInfo = _ref.fetchInfo;
                var _globalObject = this.globalObject,
                    navigator = _globalObject.navigator,
                    location = _globalObject.location;


                var ua = navigator ? navigator.userAgent : 'unknown ua';
                var refer = location ? location.href : 'unknown url';

                var event_id = uuid4();
                var breadcrumbs = [];
                if (fetchInfo) {
                    var method = fetchInfo.method,
                        _fetchInfo$url = fetchInfo.url,
                        url = _fetchInfo$url === undefined ? '' : _fetchInfo$url;
                    // 去掉query参数的url

                    var _url$split = url.split('?'),
                        _url$split2 = slicedToArray(_url$split, 1),
                        simpleUrl = _url$split2[0];

                    var urlString = Object.prototype.toString.call(simpleUrl);
                    if (urlString !== '[object String]') {
                        simpleUrl = 'unknown request url;url type:' + urlString;
                    }
                    breadcrumbs.push({
                        timestamp: timestampWithMs(),
                        category: 'fetch',
                        data: { method: (method || 'get').toLocaleUpperCase(), url: simpleUrl },
                        level: 'error',
                        type: 'http'
                    });
                }
                var request = { headers: { 'User-Agent': ua }, url: refer };
                var exception = {
                    values: [{
                        type: e.name,
                        value: e.message,
                        mechanism: {
                            handled: true,
                            type: 'generic'
                        }
                    }]
                };
                return {
                    event_id: event_id,
                    request: request,
                    exception: exception,
                    breadcrumbs: breadcrumbs,
                    level: 'error',
                    platform: 'javascript',
                    timeStamp: timestampWithMs()
                };
            }
        }, {
            key: 'captureException',
            value: function captureException(exception) {
                var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                    fetchInfo = _ref2.fetchInfo;

                var data = this.createData(exception, { fetchInfo: fetchInfo });

                this.postException(data);
            }
        }]);
        return BeggarSentry;
    }();

    var beggarSentry = new BeggarSentry();

    var responsesAreSame = function responsesAreSame(firstResponse, secondResponse, headersToCheck) {
        var atLeastOneHeaderAvailable = headersToCheck.some(function (header) {
            return firstResponse.headers.has(header) && secondResponse.headers.has(header);
        });

        if (!atLeastOneHeaderAvailable) {
            // Just return true, indicating the that responses are the same, since we
            // can't determine otherwise.
            return true;
        }

        return headersToCheck.every(function (header) {
            var headerStateComparison = firstResponse.headers.has(header) === secondResponse.headers.has(header);
            var headerValueComparison = firstResponse.headers.get(header) === secondResponse.headers.get(header);

            return headerStateComparison && headerValueComparison;
        });
    };

    var CACHE_UPDATED_MESSAGE_TYPE = 'CACHE_UPDATED';
    var CACHE_UPDATED_MESSAGE_META = 'mihoyo-sw-broadcast-update';

    function defaultPayloadGenerator(data) {
        return {
            cacheName: data.cacheName,
            updatedURL: data.event.request.url
        };
    }

    var BroadCastUpdatePlugin = function (_Plugin) {
        inherits(BroadCastUpdatePlugin, _Plugin);

        function BroadCastUpdatePlugin() {
            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref$headersToCheck = _ref.headersToCheck,
                headersToCheck = _ref$headersToCheck === undefined ? ['content-length', 'etag', 'last-modified'] : _ref$headersToCheck,
                _ref$generatePayload = _ref.generatePayload,
                generatePayload = _ref$generatePayload === undefined ? defaultPayloadGenerator : _ref$generatePayload;

            classCallCheck(this, BroadCastUpdatePlugin);

            var _this = possibleConstructorReturn(this, (BroadCastUpdatePlugin.__proto__ || Object.getPrototypeOf(BroadCastUpdatePlugin)).call(this));

            _this._headersToCheck = headersToCheck;
            _this._generatePayload = generatePayload;
            return _this;
        }

        // cacheupdate hook


        createClass(BroadCastUpdatePlugin, [{
            key: 'cacheDidUpdate',
            value: function cacheDidUpdate(options) {
                this._notifyIfUpdated(options);
            }
        }, {
            key: '_notifyIfUpdated',
            value: function _notifyIfUpdated(options) {
                var _this2 = this;

                if (!options.oldResponse) {
                    return;
                }
                var resultingClientId = options.event.resultingClientId;

                // eslint-disable-next-line no-console

                console.log('event', options.event);
                // eslint-disable-next-line no-console
                console.log('event.clientId', options.event.clientId);
                // eslint-disable-next-line no-console
                console.log('event.resultingClientId', options.event.resultingClientId);
                this.testClientsGet(resultingClientId);

                if (!responsesAreSame(options.oldResponse, options.newResponse, this._headersToCheck)) {
                    // For navigation requests, wait until the new window client exists
                    // before sending the message
                    var mode = options.event.request ? options.event.request.mode : '';
                    if (mode === 'navigate') {
                        resultingClientExists(resultingClientId).then(function (resultingWin) {
                            // Safari does not currently implement postMessage buffering and
                            // there's no good way to feature detect that, so to increase the
                            // chances of the message being delivered in Safari, we add a timeout.
                            // We also do this if `resultingClientExists()` didn't return a client,
                            // which means it timed out, so it's worth waiting a bit longer.
                            if (!resultingWin || self.isSafari) {
                                // 3500 is chosen because (according to CrUX data) 80% of mobile
                                // websites hit the DOMContentLoaded event in less than 3.5 seconds.
                                // And presumably sites implementing service worker are on the
                                // higher end of the performance spectrum.
                                timeout(3500).then(function () {
                                    return _this2._postMessage2Window(options);
                                });
                            } else {
                                _this2._postMessage2Window(options);
                            }
                        });
                    } else {
                        this._postMessage2Window(options);
                    }
                }
            }

            // eslint-disable-next-line class-methods-use-this

        }, {
            key: 'testClientsGet',
            value: function testClientsGet(resultingClientId) {
                self.clients.get(resultingClientId).then(function (client) {
                    // eslint-disable-next-line no-console
                    console.log('getClient success', client);
                }).catch(function (e) {
                    // eslint-disable-next-line no-console
                    console.log('getClient error', e);
                });
            }
        }, {
            key: '_postMessage2Window',
            value: function _postMessage2Window(options) {
                var messageData = {
                    type: CACHE_UPDATED_MESSAGE_TYPE,
                    meta: CACHE_UPDATED_MESSAGE_META,
                    payload: this._generatePayload(options)
                };
                // eslint-disable-next-line no-console
                console.log('sw postMessage2Window');

                self.clients.matchAll({ type: 'window' }).then(function (windows) {
                    // eslint-disable-next-line no-console
                    console.log('sw matchWindow windows.length:', windows.length);

                    for (var i = 0; i < windows.length; i++) {
                        windows[i].postMessage(messageData);
                    }
                });
            }
        }]);
        return BroadCastUpdatePlugin;
    }(Plugin);

    beggarSentry.init({
        dsn: 'https://690b1e8e41244bb1aafa7bf1b7ef559e@sentry.mihoyo.com/23'
    });
    // eslint-disable-next-line no-console
    console.log('###worker start###', self);

    try {
        var ua = self.navigator ? self.navigator.userAgent : 'Safari';
        // 判断是否是苹果系（safari iPhone iPad之类）的浏览器
        self.isSafari = (/Safari/i.test(ua) || !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) && !/Chrome/i.test(ua);
        self.isIos = /ios/i.test(getQuery('platform'));

        var gameBiz = getQuery('gameBiz');
        var lang = getQuery('lang');
        // 如果gameBiz带有_cn 表示是国服，lang 为zh-cn
        if (gameBiz.endsWith('_cn')) {
            lang = 'zh-cn';
        }
        var mi18nKey$1 = getMi18nKey(lang);

        // 10s刷新一次
        var ts = Math.floor(new Date().getTime() / (1000 * 10)) * 1000 * 10;
        var api = location.origin + '/admin/swpreload/' + gameBiz + '/' + mi18nKey$1 + '.json?timestamp=' + ts;

        var router = new Router();
        var precacher = new Precacher(router);

        // html(sw.html 不缓存) json策略高于预缓存的策略，放在预缓存初始化之前
        // html 文件采用staleWhileRevalidate模式缓存,忽略search参数
        // sw.html 文件不缓存
        var htmlHandler = function htmlHandler(_ref) {
            var url = _ref.url;

            var urlIgnoreSearchAndHash = url.split('?')[0].split('#')[0];
            return (/.*\.html$/.test(urlIgnoreSearchAndHash) && !/\/sw.html$/.test(urlIgnoreSearchAndHash)
            );
        };
        router.registerRoute('htmlRoute', htmlHandler, staleWhileRevalidate({
            cacheName: runtimeCacheName,
            matchOptions: { ignoreSearch: true },
            cacheOptions: { ignoreSearch: true }
        }, [new BroadCastUpdatePlugin()]));

        router.registerRoute('jsonRoute', /https:\/\/webstatic(-sea)?(-test)?.mihoyo.com\/.*\.json(\?.*)?$/, staleWhileRevalidate({
            cacheName: runtimeCacheName
        }, [new BroadCastUpdatePlugin()]));

        // 先注册预加载的route，等预加载配置获取之后更新这个route
        router.registerRoute('precacheRoute', /https:\/\/webstatic(-sea)?(-test)?.mihoyo.com\/.*\.(js|css|png|jpe?g|gif)(\?.*)?$/, cacheFirst({
            fetchOptions: { mode: 'cors', credentials: 'same-origin' }
        }));

        try {
            // 动态加载js
            self.importScripts('./mihoyoCloudFunc.js');
            self.mihoyoCloudFunc().then(function (res) {
                // eslint-disable-next-line no-console
                console.log('mihoyoCloudFunc', res);
            });
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log('importScripts error', e);
        }

        var fetchAndRouteCache = function fetchAndRouteCache() {
            return fetch(api).then(function (res) {
                return res.json();
            }).then(handleConfig).then(function (_ref2) {
                var precachePages = _ref2.precachePages,
                    routePages = _ref2.routePages,
                    enable = _ref2.enable;

                // 设置fetch代理是否开启
                router.setProxy(enable);

                // 注销预注册的route
                router.unRegisterRoute('precacheRoute');

                // 预加载的route
                if (precachePages && precachePages.length) {
                    return precacher.precacheAndRoute(precachePages);
                }
                return precacher.addRoute(routePages);
            }).catch(function (e) {
                // 注销之前预注册的route
                router.unRegisterRoute('precacheRoute');

                precacher.addRoute([]);

                throw e;
            });
        };

        // 执行预加载
        fetchAndRouteCache()
        // 根据配置清理过期的缓存
        .then(function () {
            return precacher.clearExpireCache();
        })
        // 直接激活sw
        .then(self.skipWaiting)
        // 异步错误上报
        .catch(function (e) {
            return beggarSentry.captureException(e);
        });
    } catch (e) {
        if (getQuery('platform') === 'ios') {
            // ios 同步错误上报
            beggarSentry.captureException(e);
        }
        throw e;
    }

}());
