/**
 * Created by Administrator on 2018/9/6.
 */

//polyfill,根据不同浏览器对requestAnimationFrame的支持情况，在程序运行时自行决定将要执行的代码
window.requestNextAnimationFrame = (function () {
    var originalWebkitMethod,
        wrapper = undefined,
        callback = undefined,
        geckoversion = 0,
        userAgent = navigator.userAgent,
        index = 0,
        self = this;

    if (window.webkitRequestAnimationFrame){
        wrapper = function (time) {
            if (time == undefined){
                time = +new Date();
            }
            self.callback(time);
        };
        originalWebkitMethod = window.webkitRequestAnimationFrame;
        window.webkitRequestAnimationFrame = function (callback, element) {
            self.callback = callback;
            originalWebkitMethod(wrapper, element);
        }
    }

    if (window.mozRequestAnimationFrame){
        index = userAgent.indexOf('rv:');

        if (userAgent.indexOf('Gecko') != -1){
            geckoversion = userAgent.substr(index+3, 3);

            if (geckoversion === '2.0'){
                window.mozRequestAnimationFrame = undefined;
            }
        }
    }

    return window.requestAnimationFrame    ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||

        function (callback, element) {
            var start,
                finish;

            window.setTimeout(function () {
                start = +new Date();
                callback(start);
                finish = +new Date();

                self.timeout = 1000/60 - (finish - start);
            }, self.timeout);
        }
})();