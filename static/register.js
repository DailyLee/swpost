Sentry.init({
    dsn: 'https://690b1e8e41244bb1aafa7bf1b7ef559e@sentry.mihoyo.com/23'
});
var dom = document.getElementById('register');

function swSupported() {
    function getBrowser() {
        var sys = {};
        var ua = navigator.userAgent.toLowerCase();
        var s = void 0;
        (s = ua.match(/edge\/([\d.]+)/)) ? sys.edge = s[1] : (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] : (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] : (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] : (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] : (s = ua.match(/opera.([\d.]+)/)) ? sys.opera = s[1] : (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;

        if (sys.edge) return { browser: 'Edge', version: sys.edge };
        if (sys.ie) return { browser: 'IE', version: sys.ie };
        if (sys.firefox) return { browser: 'Firefox', version: sys.firefox };
        if (sys.chrome) return { browser: 'Chrome', version: sys.chrome };
        if (sys.opera) return { browser: 'Opera', version: sys.opera };
        if (sys.safari) return { browser: 'Safari', version: sys.safari };

        return { browser: '', version: '0' };
    }

    var browser = getBrowser();
    // 确保chrome mobile 版本在43以上
    return (browser.browser !== 'Chrome' || Number(browser.version.split('.')[0]) > 43) && 'serviceWorker' in navigator;
}

if (swSupported()) {
    window.onload = function () {
        function getQuery(variable) {
            var query = location.search.substring(1);
            var vars = query.split('&');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                if (pair[0] === variable) {
                    return decodeURIComponent(pair[1]);
                }
            }
            return null;
        }

        function registerSw(swJs, swQuery, swScope) {
            // 先注销其他sw，防止作用域污染
            navigator.serviceWorker.getRegistrations().then(function (regs) {
                for (var i = 0; i < regs.length; i++) {
                    // 注销掉不是当前作用域的所有的 Service Worker
                    var serviceWorkerRegistration = regs[i];
                    var registerScope = location.origin + swScope.split('.')[1];
                    if (serviceWorkerRegistration.scope !== registerScope) {
                        serviceWorkerRegistration.unregister();
                    }
                }

                navigator.serviceWorker
                // 加上时间戳 保证每次页面加载都会重新注册sw 触发 install事件 更新预加载资源
                .register(swJs + '.js' + swQuery, { scope: swScope }).then(function (registration) {
                    dom.innerHTML = 'ServiceWorker registration successful with scope: ' + registration.scope;
                }).catch(function (err) {
                    dom.innerHTML = 'ServiceWorker registration failed: ' + err;
                    Sentry.captureException(err);
                });
            });
        }

        function unRegisterSw(swScope) {
            navigator.serviceWorker.getRegistration(swScope).then(function (registration) {
                if (registration && registration.unregister) {
                    registration.unregister();
                }
            });
        }

        try {
            // 10s更新一次
            var time = Math.floor(new Date().getTime() / (1000 * 10)) * 1000 * 10;
            var lang = getQuery('lang') || navigator.language;
            var gameBiz = getQuery('gameBiz');
            var network = getQuery('network');
            var platform = getQuery('platform');
            var unregister = getQuery('unregister');
            // href是 https://webstatic.mihoyo.com/sw-pre.html ，则sw.js为sw-pre.js
            var swJs = window.location.href.split('?')[0].split('/').pop().split('.html')[0];
            var swQuery = '?timestamp=' + time + '&lang=' + lang + '&gameBiz=' + gameBiz + '&network=' + network + '&platform=' + platform;
            var swScope = './' + gameBiz.split('_')[0] + '/';

            unregister === 'true' ? unRegisterSw(swScope) : registerSw(swJs, swQuery, swScope);
        } catch (e) {
            dom.innerHTML = 'ServiceWorker registration failed: ' + e;

            Sentry.captureException(e);
        }
    };
} else {
    dom.innerHTML = '###serviceWorker not support###';

    Sentry.captureException(new Error('serviceWorker not support'));
}
