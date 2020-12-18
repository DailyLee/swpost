!function(){Array.prototype.find||Object.defineProperty(Array.prototype,"find",{value:function(e){if(null==this)throw new TypeError('"this" is null or not defined');var t=Object(this),n=t.length>>>0;if("function"!=typeof e)throw new TypeError("predicate must be a function");for(var r=arguments[1],o=0;o<n;){var i=t[o];if(e.call(r,i,o,t))return i;o++}}}),Array.prototype.includes||Object.defineProperty(Array.prototype,"includes",{value:function(e,t){if(null==this)throw new TypeError('"this" is null or not defined');var n=Object(this),r=n.length>>>0;if(0===r)return!1;for(var o,i,a=0|t,s=Math.max(a>=0?a:r-Math.abs(a),0);s<r;){if((o=n[s])===(i=e)||"number"==typeof o&&"number"==typeof i&&isNaN(o)&&isNaN(i))return!0;s++}return!1}}),Array.prototype.some||(Array.prototype.some=function(e){if(null==this)throw new TypeError("Array.prototype.some called on null or undefined");if("function"!=typeof e)throw new TypeError;for(var t=Object(this),n=t.length>>>0,r=arguments.length>=2?arguments[1]:void 0,o=0;o<n;o++)if(o in t&&e.call(r,t[o],o,t))return!0;return!1}),Array.prototype.findIndex||Object.defineProperty(Array.prototype,"findIndex",{value:function(e){if(null==this)throw new TypeError('"this" is null or not defined');var t=Object(this),n=t.length>>>0;if("function"!=typeof e)throw new TypeError("predicate must be a function");for(var r=arguments[1],o=0;o<n;){var i=t[o];if(e.call(r,i,o,t))return o;o++}return-1}}),Array.prototype.reduce||Object.defineProperty(Array.prototype,"reduce",{value:function(e){if(null===this)throw new TypeError("Array.prototype.reduce called on null or undefined");if("function"!=typeof e)throw new TypeError(e+" is not a function");var t,n=Object(this),r=n.length>>>0,o=0;if(arguments.length>=2)t=arguments[1];else{for(;o<r&&!(o in n);)o++;if(o>=r)throw new TypeError("Reduce of empty array with no initial value");t=n[o++]}for(;o<r;)o in n&&(t=e(t,n[o],o,n)),o++;return t}});var e=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},t=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),n=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},o=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=e[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,i=e}finally{try{!r&&s.return&&s.return()}finally{if(o)throw i}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments[1];return e.reduce(function(e,t){return e.then(t)},Promise.resolve(t))}var a=function(){function n(){e(this,n)}return t(n,[{key:"beforeCache",value:function(e,t){return t}},{key:"beforeResponse",value:function(e,t){return t}},{key:"cacheDidUpdate",value:function(e){}}]),n}();function s(e){var t=e.cacheName,n=e.request,r=e.matchOptions,o=void 0===r?{}:r,a=e.plugins,s=void 0===a?[]:a,c=t?caches.open(t):Promise.resolve(caches);return c.then(function(e){var t,r=(t=n.url,o.ignoreSearch?t.split("?")[0]:t);return e.match(r).then(function(e){if(e)return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.request,r=t.cachedResponse;return i(e.map(function(e){return function(t){return e.beforeResponse(n,t)}}),r)}(s,{request:n,cachedResponse:e});throw new Error("no match cache"+r)})})}var c={put:function(e){var t=e.cacheName,n=e.request,r=e.response,o=e.event,a=e.plugins,c=void 0===a?[]:a,u=e.cacheOptions,h=void 0===u?{}:u;!function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.request,r=t.response;i(e.map(function(e){return function(t){return e.beforeCache(n,t)}}),r)}(c,{request:n,response:r});var f=h.ignoreSearch?n.url.split("?")[0]:n.url,l=function(e){!function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments[1];e.map(function(e){return e.cacheDidUpdate(t)})}(c,{cacheName:t,event:o,newResponse:r,oldResponse:e})};return caches.open(t).then(function(e){return s({cacheName:t,request:n,event:o}).then(l).catch(function(){s({request:n,event:o}).then(l)}),self.isIos?e.add(f):e.put(f,r.clone())})},match:s};var u={fetch:function(e){var t=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).fetchOptions;return fetch(e,t).then(function(e){if(200!==e.status){var t=new Error("Fetch Failed");throw t.response=e,t}return e})}};function h(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.cacheName,n=e.fetchOptions,r=e.matchOptions,o=arguments[1];return function(e){var i=e.request;return c.match({request:i,cacheName:t,matchOptions:r,plugins:o}).catch(function(){return u.fetch(i,{fetchOptions:n})})}}var f="pre-cache:",l="runtime-cache";function p(e,t,n){return e.arrayBuffer().then(function(t){var r=function(e,t,n){var r=e.byteLength;if(n&&n>r||t&&t<0)throw new Error("range-not-satisfiable:"+{size:r,end:n,start:t});var o=void 0,i=void 0;return void 0!==t&&void 0!==n?(o=t,i=n+1):void 0!==t&&void 0===n?(o=t,i=r):void 0!==n&&void 0===t&&(o=r-n,i=r),{start:o,end:i}}(t,n.start,n.end),o=t.slice(r.start,r.end),i=o.byteLength,a=new Response(o,{status:206,statusText:"Partial Content",headers:e.headers});return a.headers.set("status","206"),a.headers.set("content-length",String(i)),a.headers.set("content-range","bytes "+r.start+"-"+(r.end-1)+"/"+t.byteLength),a})}function d(e,t){if(206===t.status)return t;var n=e.headers.get("range");if(!n)throw new Error("no range header");return p(t,0,function(e){var t=e.trim().toLowerCase();if(!t.startsWith("bytes="))throw new Error("unit-must-be-bytes "+t);if(t.includes(","))throw new Error("single-range-only:"+t);var n=/(\d*)-(\d*)/.exec(t);if(!n||!n[1]&&!n[2])throw new Error("invalid-range-values:"+t);return{start:""===n[1]?void 0:Number(n[1]),end:""===n[2]?void 0:Number(n[2])}}(n))}var v=function(o){function i(){return e(this,i),r(this,(i.__proto__||Object.getPrototypeOf(i)).apply(this,arguments))}return n(i,a),t(i,[{key:"beforeResponse",value:function(e,t){try{return t&&e.headers.get("range")&&self.isSafari?d(e,t):t}catch(e){return Promise.reject(e)}}}]),i}();var g=function(){function n(t){e(this,n),this.pages=[],this.resources=[],this.router=t,this.initEventListener()}return t(n,[{key:"initEventListener",value:function(){self.addEventListener("activate",function(){console.log("####activate####"),self.clients.claim()})}},{key:"precache",value:function(e){return function(e){return Promise.all(e.map(function(e){var t=e.url,n=e.assets,r=void 0===n?[]:n;return caches.open(f+t).then(function(e){return Promise.all(r.map(function(t){return e.match(t).then(function(n){if(!n)return e.add(t).catch(function(){})})}))})}))}(e)}},{key:"addRoute",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments[1];this.pages=t,t&&0===t.length&&(this.resources=[]);for(var r=0;r<t.length;r++){var o=t[r].assets;this.resources=this.resources.concat(o)}var i=h({matchOptions:n,fetchOptions:{credentials:"same-origin",mode:"cors"}},[new v]);this.router.registerRoute("precacheRoute",function(t){return e.resources.some(function(e){return e===t.url})},function(t){return!!e.resources.find(function(e){return e===t.request.url})&&i(t)})}},{key:"precacheAndRoute",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments[1];return this.addRoute(e,t),this.precache(e)}},{key:"clearExpireCache",value:function(){return e=this.pages,t=e.map(function(e){return f+e.url}),caches.keys().then(function(e){return Promise.all(e.map(function(e){return!t.includes(e)&&e.startsWith(f)?caches.delete(e):Promise.resolve("no caches to delete")}))});var e,t}}]),n}();function y(e,t){switch(Object.prototype.toString.call(e)){default:return!1;case"[object String]":return t.url===e;case"[object RegExp]":return t.url.match(e);case"[object Function]":return e(t)}}function m(e,t){try{var n=t(e);if(n instanceof Promise){var r=n.then(function(e){if(!(e instanceof Response))throw Error("返回结果异常");return e}).catch(function(t){return t.response||fetch(e.request.clone())}).catch(function(){});return void e.respondWith(r)}n instanceof Response&&e.respondWith(n)}catch(e){console.log(e)}}var w=function(){function n(t){e(this,n),this.useProxy=!0,this.routes=[],this.initEventListener(t)}return t(n,[{key:"initEventListener",value:function(e){var t=this;try{self.addEventListener("install",function(t){console.log("####install####"),t.waitUntil(e&&e(t))}),self.addEventListener("fetch",function(e){if(console.log("fetch routes.length",t.routes.length),t.useProxy)for(var n=0;n<t.routes.length;n++){var r=t.routes[n];if(y(r.rule,e.request)){m(e,r.handler);break}}})}catch(e){console.log("initEventListenerError",e)}}},{key:"registerRoute",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"route-cache",t=arguments[1],n=arguments[2];this.unRegisterRoute(e),this.routes.push({ruleName:e,rule:t,handler:n})}},{key:"unRegisterRoute",value:function(e){var t=this.routes.findIndex(function(t){return t.ruleName===e});-1!==t&&this.routes.splice(t,1)}},{key:"setProxy",value:function(e){this.useProxy=e}}]),n}();function b(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.fetchOptions,n=e.cacheName,r=void 0===n?l:n,o=e.matchOptions,i=e.cacheOptions,a=arguments[1];return function(e){var n=e.request,s=u.fetch(n,{fetchOptions:t}).then(function(t){c.put({cacheName:r,request:n,response:t,event:e,cacheOptions:i,plugins:a})});return function(e){var t=e.request,n=e.cacheName,r=e.matchOptions,o=e.plugins;return c.match({request:t,cacheName:n,matchOptions:r,plugins:o}).catch(function(){return c.match({request:t,matchOptions:r,plugins:o})})}({request:n,cacheName:r,matchOptions:o,plugins:a}).catch(function(){return s})}}var x={"zh-cn":/^zh-cn/i,"zh-tw":/^zh-tw/i,"en-us":/^en\b/i,"fr-fr":/^fr\b/i,"de-de":/^de\b/i,"es-es":/^es\b/i,"pt-pt":/^pt\b/i,"ru-ru":/^ru\b/i,"ja-jp":/^ja\b/i,"ko-kr":/^ko\b/i,"th-th":/^th\b/i,"vi-vn":/^vi\b/i,"id-id":/^id\b/i};function O(e){for(var t=location.search.substring(1).split("&"),n=0;n<t.length;n++){var r=t[n].split("=");if(r[0]===e)return decodeURIComponent?decodeURIComponent(r[1]):r[1]}return null}function E(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments[1];return"string"==typeof e&&"string"==typeof t&&e.toLowerCase().includes(t.toLowerCase())}function R(e){return new Promise(function(t){return setTimeout(t,e)})}var j=2e3;function k(e){if(!e)return Promise.resolve(null);var t=Date.now();return function e(t,n){return Promise.resolve(t).then(function(r){return r().then(function(r){return r||R(n).then(function(){return e(t,n)})})})}(function(){return n=e,self.clients.matchAll({type:"window"}).then(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return Date.now()-t>j?Promise.reject(Error("find resulting window timeout")):e.find(function(e){return n===e.id})});var n},100).catch(function(){return null})}var P=O("platform"),_=O("network")||"WiFi";function T(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.enable,n=e.load_limit,r=void 0===n?3:n,o=e.pages,i=void 0===o?[]:o,a=(new Date).getTime(),s=i.map(function(e){return e.assets=e.res_list.map(function(e){return encodeURI(e)}),e}).filter(function(e){return function(e){return E(e.platform,P)}(e)&&function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.end_time,n=void 0===t?"":t,r=e.start_time,o=void 0===r?"":r,i=new Date(n.replace(/-/g,"/")).getTime(),s=new Date(o.replace(/-/g,"/")).getTime();return a<i&&a>=s}(e)}),c=s.filter(function(e){return function(e){return E(e.network,_)}(e)});return t?caches.keys().then(function(e){return{precachePages:c.filter(function(t){return!!e.includes(t.url)||--r>=0}),routePages:s,enable:t}}):{precachePages:[],routePages:s,enable:t}}function q(){return"[object process]"===Object.prototype.toString.call("undefined"!=typeof process?process:0)?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{}}var A,S,N,C,L=(A=Date.now(),S=0,N={now:function(){var e=Date.now()-A;return e<S&&(e=S),S=e,e},timeOrigin:A},(C=q().performance)&&C.now?(void 0===C.timeOrigin&&(C.timeOrigin=C.timing&&C.timing.navigationStart||A),C):N);function U(){return(L.timeOrigin+L.now())/1e3}var I=new(function(){function n(){e(this,n)}return t(n,[{key:"init",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.dsn=e.dsn,this.createApi(),this.globalObject=q(),this.proxyFetch(),this.initEventListener(),this.isSea="webstatic-sea.mihoyo.com"===location.href,this.isTest="webstatic-sea-test.mihoyo.com"===location.href||"webstatic-test.mihoyo.com"===location.href}},{key:"initEventListener",value:function(){var e=this;self.addEventListener("error",function(t){e.captureException(t.error)})}},{key:"proxyFetch",value:function(){var e=this;this.globalObject.originalFetch=this.globalObject.fetch;var t=function(t,n){return e.globalObject.originalFetch(t,n).then(function(e){if(e.status>=300||e.status<200)throw new TypeError("proxyFetch:Failed to fetch，status："+e.status);return e}).catch(function(r){var o=new TypeError("proxyFetch:"+r.message);throw e.captureException(o,{fetchInfo:{url:t.url||t,method:n?n.method:"GET"}}),r})};this.globalObject.fetch=t}},{key:"createApi",value:function(){var e=this.dsn.split("https://")[1].split("@sentry.mihoyo.com/"),t=o(e,2),n=t[0],r=t[1],i=this.isSea?"https://sentry-sea.mihoyo.com":"https://sentry.mihoyo.com";this.api=i+"/api/"+r+"/store/?sentry_key="+n+"&sentry_version=7"}},{key:"postException",value:function(e){if(!this.isTest)return this.globalObject.originalFetch(this.api,{method:"post",headers:{accept:"*/*","accept-language":"zh-CN,zh;q=0.9,en;q=0.8","content-type":"text/plain;charset=UTF-8","sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"cross-site"},body:JSON.stringify(e)}).catch(function(){})}},{key:"createData",value:function(e,t){var n=t.fetchInfo,r=this.globalObject,i=r.navigator,a=r.location,s=i?i.userAgent:"unknown ua",c=a?a.href:"unknown url",u=function(){var e=q(),t=e.crypto||e.msCrypto;if(void 0!==t&&t.getRandomValues){var n=new Uint16Array(8);t.getRandomValues(n),n[3]=4095&n[3]|16384,n[4]=16383&n[4]|32768;var r=function(e){for(var t=e.toString(16);t.length<4;)t="0"+t;return t};return r(n[0])+r(n[1])+r(n[2])+r(n[3])+r(n[4])+r(n[5])+r(n[6])+r(n[7])}return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})}(),h=[];if(n){var f=n.method,l=n.url,p=(void 0===l?"":l).split("?"),d=o(p,1)[0],v=Object.prototype.toString.call(d);"[object String]"!==v&&(d="unknown request url;url type:"+v),h.push({timestamp:U(),category:"fetch",data:{method:(f||"get").toLocaleUpperCase(),url:d},level:"error",type:"http"})}return{event_id:u,request:{headers:{"User-Agent":s},url:c},exception:{values:[{type:e.name,value:e.message,mechanism:{handled:!0,type:"generic"}}]},breadcrumbs:h,level:"error",platform:"javascript",timeStamp:U()}}},{key:"captureException",value:function(e){var t=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).fetchInfo,n=this.createData(e,{fetchInfo:t});this.postException(n)}}]),n}());function D(e){return{cacheName:e.cacheName,updatedURL:e.event.request.url}}var F=function(o){function i(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.headersToCheck,o=void 0===n?["content-length","etag","last-modified"]:n,a=t.generatePayload,s=void 0===a?D:a;e(this,i);var c=r(this,(i.__proto__||Object.getPrototypeOf(i)).call(this));return c._headersToCheck=o,c._generatePayload=s,c}return n(i,a),t(i,[{key:"cacheDidUpdate",value:function(e){this._notifyIfUpdated(e)}},{key:"_notifyIfUpdated",value:function(e){var t=this;if(e.oldResponse){var n,r,o,i=e.event.resultingClientId;if(n=e.oldResponse,r=e.newResponse,(o=this._headersToCheck).some(function(e){return n.headers.has(e)&&r.headers.has(e)})&&!o.every(function(e){var t=n.headers.has(e)===r.headers.has(e),o=n.headers.get(e)===r.headers.get(e);return t&&o}))"navigate"===(e.event.request?e.event.request.mode:"")?k(i).then(function(n){!n||self.isSafari?R(3500).then(function(){return t._postMessage2Window(e)}):t._postMessage2Window(e)}):this._postMessage2Window(e)}}},{key:"_postMessage2Window",value:function(e){var t={type:"CACHE_UPDATED",meta:"mihoyo-sw-broadcast-update",payload:this._generatePayload(e)};console.log("sw postMessage2Window",t),self.clients.matchAll({type:"window"}).then(function(e){for(var n=0;n<e.length;n++)e[n].postMessage(t)})}}]),i}();I.init({dsn:"https://690b1e8e41244bb1aafa7bf1b7ef559e@sentry.mihoyo.com/23"}),console.log("###worker start###",self);try{var W=self.navigator?self.navigator.userAgent:"Safari";self.isSafari=(/Safari/i.test(W)||!!W.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))&&!/Chrome/i.test(W),self.isIos=/ios/i.test(O("platform"));var M=O("gameBiz"),z=O("lang");M.endsWith("_cn")&&(z="zh-cn");var $=function(e){return Object.keys(x).find(function(t){return x[t].test(e)})||"zh-cn"}(z),B=1e3*Math.floor((new Date).getTime()/1e4)*10,V=location.origin+"/admin/swpreload/"+M+"/"+$+".json?timestamp="+B,G=new w,H=new g(G);G.registerRoute("htmlRoute",function(e){var t=e.url.split("?")[0].split("#")[0];return/.*\.html$/.test(t)&&!/\/sw.html$/.test(t)},b({cacheName:l,matchOptions:{ignoreSearch:!0},cacheOptions:{ignoreSearch:!0}},[new F])),G.registerRoute("jsonRoute",/https:\/\/webstatic(-sea)?(-test)?.mihoyo.com\/.*\.json(\?.*)?$/,b({cacheName:l},[new F])),G.registerRoute("precacheRoute",/https:\/\/webstatic(-sea)?(-test)?.mihoyo.com\/.*\.(js|css|png|jpe?g|gif)(\?.*)?$/,h({fetchOptions:{mode:"cors",credentials:"same-origin"}}));fetch(V).then(function(e){return e.json()}).then(T).then(function(e){var t=e.precachePages,n=e.routePages,r=e.enable;return G.setProxy(r),G.unRegisterRoute("precacheRoute"),t&&t.length?H.precacheAndRoute(t):H.addRoute(n)}).catch(function(e){throw G.unRegisterRoute("precacheRoute"),H.addRoute([]),e}).then(function(){return H.clearExpireCache()}).then(self.skipWaiting).catch(function(e){return I.captureException(e)})}catch(e){throw"ios"===O("platform")&&I.captureException(e),e}}();
