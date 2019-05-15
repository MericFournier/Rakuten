(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * API call manager
 * * */
var Apicall = function () {
    function Apicall() {
        _classCallCheck(this, Apicall);
    }

    _createClass(Apicall, [{
        key: "getData",


        /**
         * Make API call with both Fetch or Xhr depending on browser support
         * @param  {string} 'url' API endpoint
         * @return {object} 'data' from API
         */
        value: function getData(url) {
            return new Promise(function (resolve) {
                /** if brower support fetch api */
                if (window.fetch) {
                    fetch(url).then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        resolve(data);
                    });
                } else {
                    var req = new XMLHttpRequest();
                    req.overrideMimeType("application/json");
                    req.open('GET', url, true);
                    req.onload = function () {
                        var data = JSON.parse(req.responseText);
                        resolve(data);
                    };
                    req.send(null);
                }
            });
        }
    }]);

    return Apicall;
}();

exports.default = Apicall;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _API = require('./API');

var _API2 = _interopRequireDefault(_API);

var _LocalStorage = require('./LocalStorage');

var _LocalStorage2 = _interopRequireDefault(_LocalStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Egg that appear on the page
 * * */
var Eggs = function () {

    /**
     * Check if container and init egg
     */
    function Eggs() {
        _classCallCheck(this, Eggs);

        /** Element where th Egg will appear */
        var container = document.querySelector('.structure_content-main');
        if (container) {
            /** @private */
            this.container = container;
            this.init();
        }
    }

    /** Initialize the Egg */


    _createClass(Eggs, [{
        key: 'init',
        value: async function init() {
            var that = this;
            var container = this.container;
            /** define delay before show egg */
            var delay = this.getDelay();
            /** get data from api */
            var eggData = await this.getData();
            /** Add img egg to eggData */
            eggData.img = "http://prettypoun.p.r.pic.centerblog.net/o/b36ba9ca.png";
            /** create egg item */
            var eggItem = this.setItemEgg(eggData);
            /** insert eggItem */
            container.insertAdjacentHTML('afterbegin', eggItem.outerHTML);
            /** handle apparition */
            eggItem = container.querySelector('.egg');
            setTimeout(function () {
                eggItem.classList.add('active');
            }, delay);
            /** handle click */
            eggItem.onclick = function (e) {
                e.preventDefault();
                container.removeChild(eggItem);
                window.open(eggData.lienRedirect, '_blank');
                that.init();
            };
        }
        /**
         * Return a delay between 1s et 4s.
         * @return 'number' The delay value in ms.
         */

    }, {
        key: 'getDelay',
        value: function getDelay() {
            var min = 1000;
            var max = 4000;
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        /**
         * Get egg's data from the API or from Local Storage
         * @return {data} The egg's data.
         */

    }, {
        key: 'getData',
        value: async function getData() {
            var Store = new _LocalStorage2.default();
            var storageData = Store.getData('egg');
            if (storageData) {
                return storageData;
            } else {
                var API = new _API2.default();
                var result = await API.getData("https://www.mocky.io/v2/5cdc323e2d00008f14f5a63d");
                Store.register('egg', result);
                return result;
            }
        }

        /**
         * Create the DOM element for Egg
         * @param {object} 'egg', The egg's data from the API + The src image for Egg
         * @return {object} 'link', The DOM element of the Egg
         */

    }, {
        key: 'setItemEgg',
        value: function setItemEgg(egg) {
            // link item
            var link = document.createElement('a');
            link.classList.add('egg');
            link.setAttribute('href', egg.lienRedirect);
            link.setAttribute('target', '_blank');
            link.style.top = egg.positionY + "px";
            link.style.right = egg.positionX + "px";
            // image item
            var image = document.createElement('img');
            image.setAttribute('src', egg.img);
            image.setAttribute('alt', egg.Name);
            link.append(image);
            return link;
        }
    }]);

    return Eggs;
}();

exports.default = Eggs;

},{"./API":1,"./LocalStorage":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Local Storage manager
 * * */
var Storage = function () {
    function Storage() {
        _classCallCheck(this, Storage);
    }

    _createClass(Storage, [{
        key: "getData",

        /**
         * Get data from the Local Storage
         * @params {string} 'key' key index to find data in Local Storage
         * @return {boolean} 'false' if there's no data or {object} data.
         */
        value: function getData(key) {
            if (localStorage.getItem(key)) {
                return JSON.parse(localStorage.getItem(key));
            } else {
                return false;
            }
        }

        /**
         * Register data in the Local Storage
         * @params {string} 'key' key index to register data in Local Storage
         * @params {object} 'data' Data to register in the Local Storage
         */

    }, {
        key: "register",
        value: function register(key, data) {
            console.log(key, data);
            var dataVal = JSON.stringify(data);
            localStorage.setItem(key, dataVal);
        }
    }]);

    return Storage;
}();

exports.default = Storage;

},{}],4:[function(require,module,exports){
'use strict';

var _Eggs = require('./Eggs');

var _Eggs2 = _interopRequireDefault(_Eggs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Class egg */
new _Eggs2.default();

},{"./Eggs":2}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXNzZXRzL3NjcmlwdHMvQVBJLmpzIiwiYXBwL2Fzc2V0cy9zY3JpcHRzL0VnZ3MuanMiLCJhcHAvYXNzZXRzL3NjcmlwdHMvTG9jYWxTdG9yYWdlLmpzIiwiYXBwL2Fzc2V0cy9zY3JpcHRzL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNDQTs7O0lBR3FCLE87Ozs7Ozs7OztBQUVqQjs7Ozs7Z0NBS1EsRyxFQUFNO0FBQ1YsbUJBQU8sSUFBSSxPQUFKLENBQVksbUJBQVc7QUFDMUI7QUFDQSxvQkFBSSxPQUFPLEtBQVgsRUFBa0I7QUFDZCwwQkFBTSxHQUFOLEVBQ0ssSUFETCxDQUNVO0FBQUEsK0JBQVksU0FBUyxJQUFULEVBQVo7QUFBQSxxQkFEVixFQUVLLElBRkwsQ0FFVSxnQkFBUTtBQUNWLGdDQUFRLElBQVI7QUFDSCxxQkFKTDtBQUtILGlCQU5ELE1BTU87QUFDSCx3QkFBSSxNQUFNLElBQUksY0FBSixFQUFWO0FBQ0Esd0JBQUksZ0JBQUosQ0FBcUIsa0JBQXJCO0FBQ0Esd0JBQUksSUFBSixDQUFTLEtBQVQsRUFBZ0IsR0FBaEIsRUFBcUIsSUFBckI7QUFDQSx3QkFBSSxNQUFKLEdBQWMsWUFBTTtBQUNoQiw0QkFBSSxPQUFPLEtBQUssS0FBTCxDQUFXLElBQUksWUFBZixDQUFYO0FBQ0EsZ0NBQVEsSUFBUjtBQUNILHFCQUhEO0FBSUEsd0JBQUksSUFBSixDQUFTLElBQVQ7QUFDSDtBQUNKLGFBbEJNLENBQVA7QUFtQkg7Ozs7OztrQkEzQmdCLE87Ozs7Ozs7Ozs7O0FDSnJCOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7OztJQUdxQixJOztBQUVqQjs7O0FBR0Esb0JBQWM7QUFBQTs7QUFDVjtBQUNBLFlBQU0sWUFBWSxTQUFTLGFBQVQsQ0FBdUIseUJBQXZCLENBQWxCO0FBQ0EsWUFBSSxTQUFKLEVBQWU7QUFDWDtBQUNBLGlCQUFLLFNBQUwsR0FBaUIsU0FBakI7QUFDQSxpQkFBSyxJQUFMO0FBQ0g7QUFDSjs7QUFFRDs7Ozs7cUNBQ2M7QUFDVixnQkFBSSxPQUFPLElBQVg7QUFDQSxnQkFBSSxZQUFZLEtBQUssU0FBckI7QUFDQTtBQUNBLGdCQUFJLFFBQVEsS0FBSyxRQUFMLEVBQVo7QUFDQztBQUNELGdCQUFJLFVBQVUsTUFBTSxLQUFLLE9BQUwsRUFBcEI7QUFDQTtBQUNBLG9CQUFRLEdBQVIsR0FBYyx5REFBZDtBQUNDO0FBQ0QsZ0JBQUksVUFBVSxLQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsQ0FBZDtBQUNDO0FBQ0Qsc0JBQVUsa0JBQVYsQ0FBOEIsWUFBOUIsRUFBNEMsUUFBUSxTQUFwRDtBQUNDO0FBQ0Qsc0JBQVUsVUFBVSxhQUFWLENBQXdCLE1BQXhCLENBQVY7QUFDQSx1QkFBWSxZQUFNO0FBQ2Qsd0JBQVEsU0FBUixDQUFrQixHQUFsQixDQUFzQixRQUF0QjtBQUNILGFBRkQsRUFFRyxLQUZIO0FBR0M7QUFDRCxvQkFBUSxPQUFSLEdBQWtCLFVBQUMsQ0FBRCxFQUFPO0FBQ3JCLGtCQUFFLGNBQUY7QUFDQSwwQkFBVSxXQUFWLENBQXNCLE9BQXRCO0FBQ0EsdUJBQU8sSUFBUCxDQUFZLFFBQVEsWUFBcEIsRUFBa0MsUUFBbEM7QUFDQSxxQkFBSyxJQUFMO0FBQ0gsYUFMRDtBQU9IO0FBQ0Q7Ozs7Ozs7bUNBSWM7QUFDVixnQkFBSSxNQUFNLElBQVY7QUFDQSxnQkFBSSxNQUFNLElBQVY7QUFDQSxtQkFBTyxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsTUFBZSxNQUFJLEdBQUosR0FBUSxDQUF2QixJQUEwQixHQUFyQyxDQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7d0NBSWtCO0FBQ2QsZ0JBQUksUUFBUSxJQUFJLHNCQUFKLEVBQVo7QUFDQSxnQkFBSSxjQUFjLE1BQU0sT0FBTixDQUFjLEtBQWQsQ0FBbEI7QUFDQSxnQkFBSyxXQUFMLEVBQW1CO0FBQ2YsdUJBQU8sV0FBUDtBQUNILGFBRkQsTUFFTztBQUNILG9CQUFJLE1BQU0sSUFBSSxhQUFKLEVBQVY7QUFDQSxvQkFBSSxTQUFTLE1BQU0sSUFBSSxPQUFKLENBQVksa0RBQVosQ0FBbkI7QUFDQSxzQkFBTSxRQUFOLENBQWUsS0FBZixFQUFxQixNQUFyQjtBQUNBLHVCQUFPLE1BQVA7QUFDSDtBQUNKOztBQUVEOzs7Ozs7OzttQ0FLVyxHLEVBQU07QUFDYjtBQUNBLGdCQUFJLE9BQU8sU0FBUyxhQUFULENBQXVCLEdBQXZCLENBQVg7QUFDQSxpQkFBSyxTQUFMLENBQWUsR0FBZixDQUFtQixLQUFuQjtBQUNBLGlCQUFLLFlBQUwsQ0FBa0IsTUFBbEIsRUFBeUIsSUFBSSxZQUE3QjtBQUNBLGlCQUFLLFlBQUwsQ0FBa0IsUUFBbEIsRUFBMkIsUUFBM0I7QUFDQSxpQkFBSyxLQUFMLENBQVcsR0FBWCxHQUFpQixJQUFJLFNBQUosR0FBYyxJQUEvQjtBQUNBLGlCQUFLLEtBQUwsQ0FBVyxLQUFYLEdBQW1CLElBQUksU0FBSixHQUFjLElBQWpDO0FBQ0E7QUFDQSxnQkFBSSxRQUFRLFNBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFaO0FBQ0Esa0JBQU0sWUFBTixDQUFtQixLQUFuQixFQUF5QixJQUFJLEdBQTdCO0FBQ0Esa0JBQU0sWUFBTixDQUFtQixLQUFuQixFQUF5QixJQUFJLElBQTdCO0FBQ0EsaUJBQUssTUFBTCxDQUFZLEtBQVo7QUFDQSxtQkFBTyxJQUFQO0FBQ0g7Ozs7OztrQkF6RmdCLEk7Ozs7Ozs7Ozs7Ozs7QUNOckI7OztJQUdxQixPOzs7Ozs7OztBQUNqQjs7Ozs7Z0NBS1MsRyxFQUFNO0FBQ1gsZ0JBQUssYUFBYSxPQUFiLENBQXFCLEdBQXJCLENBQUwsRUFBaUM7QUFDN0IsdUJBQU8sS0FBSyxLQUFMLENBQVcsYUFBYSxPQUFiLENBQXFCLEdBQXJCLENBQVgsQ0FBUDtBQUNILGFBRkQsTUFFTztBQUNILHVCQUFPLEtBQVA7QUFDSDtBQUNKOztBQUVEOzs7Ozs7OztpQ0FLVSxHLEVBQUksSSxFQUFPO0FBQ2pCLG9CQUFRLEdBQVIsQ0FBWSxHQUFaLEVBQWdCLElBQWhCO0FBQ0EsZ0JBQUksVUFBVSxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQWQ7QUFDQSx5QkFBYSxPQUFiLENBQXFCLEdBQXJCLEVBQXlCLE9BQXpCO0FBQ0g7Ozs7OztrQkF2QmdCLE87Ozs7O0FDSHJCOzs7Ozs7QUFFQTtBQUNBLElBQUksY0FBSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlxuLyoqXG4gKiBBUEkgY2FsbCBtYW5hZ2VyXG4gKiAqICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcGljYWxsIHtcblxuICAgIC8qKlxuICAgICAqIE1ha2UgQVBJIGNhbGwgd2l0aCBib3RoIEZldGNoIG9yIFhociBkZXBlbmRpbmcgb24gYnJvd3NlciBzdXBwb3J0XG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAndXJsJyBBUEkgZW5kcG9pbnRcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9ICdkYXRhJyBmcm9tIEFQSVxuICAgICAqL1xuICAgIGdldERhdGEodXJsKSAge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICAvKiogaWYgYnJvd2VyIHN1cHBvcnQgZmV0Y2ggYXBpICovXG4gICAgICAgICAgICBpZiAod2luZG93LmZldGNoKSB7XG4gICAgICAgICAgICAgICAgZmV0Y2godXJsKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgICAgIHJlcS5vdmVycmlkZU1pbWVUeXBlKFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICAgICAgICAgICAgICByZXEub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICByZXEub25sb2FkICA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHJlcS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmVxLnNlbmQobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBBcGljYWxsIGZyb20gJy4vQVBJJztcbmltcG9ydCBTdG9yYWdlIGZyb20gJy4vTG9jYWxTdG9yYWdlJztcblxuLyoqXG4gKiBFZ2cgdGhhdCBhcHBlYXIgb24gdGhlIHBhZ2VcbiAqICogKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVnZ3Mge1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgY29udGFpbmVyIGFuZCBpbml0IGVnZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvKiogRWxlbWVudCB3aGVyZSB0aCBFZ2cgd2lsbCBhcHBlYXIgKi9cbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0cnVjdHVyZV9jb250ZW50LW1haW4nKTtcbiAgICAgICAgaWYgKGNvbnRhaW5lcikge1xuICAgICAgICAgICAgLyoqIEBwcml2YXRlICovXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEluaXRpYWxpemUgdGhlIEVnZyAqL1xuICAgIGFzeW5jIGluaXQgKCkge1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIGxldCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgLyoqIGRlZmluZSBkZWxheSBiZWZvcmUgc2hvdyBlZ2cgKi9cbiAgICAgICAgbGV0IGRlbGF5ID0gdGhpcy5nZXREZWxheSgpO1xuICAgICAgICAgLyoqIGdldCBkYXRhIGZyb20gYXBpICovXG4gICAgICAgIGxldCBlZ2dEYXRhID0gYXdhaXQgdGhpcy5nZXREYXRhKCk7XG4gICAgICAgIC8qKiBBZGQgaW1nIGVnZyB0byBlZ2dEYXRhICovXG4gICAgICAgIGVnZ0RhdGEuaW1nID0gXCJodHRwOi8vcHJldHR5cG91bi5wLnIucGljLmNlbnRlcmJsb2cubmV0L28vYjM2YmE5Y2EucG5nXCI7XG4gICAgICAgICAvKiogY3JlYXRlIGVnZyBpdGVtICovXG4gICAgICAgIGxldCBlZ2dJdGVtID0gdGhpcy5zZXRJdGVtRWdnKGVnZ0RhdGEpO1xuICAgICAgICAgLyoqIGluc2VydCBlZ2dJdGVtICovXG4gICAgICAgIGNvbnRhaW5lci5pbnNlcnRBZGphY2VudEhUTUwoICdhZnRlcmJlZ2luJywgZWdnSXRlbS5vdXRlckhUTUwgKTtcbiAgICAgICAgIC8qKiBoYW5kbGUgYXBwYXJpdGlvbiAqL1xuICAgICAgICBlZ2dJdGVtID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5lZ2cnKTtcbiAgICAgICAgc2V0VGltZW91dCggKCkgPT4ge1xuICAgICAgICAgICAgZWdnSXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgICAgLyoqIGhhbmRsZSBjbGljayAqL1xuICAgICAgICBlZ2dJdGVtLm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKGVnZ0l0ZW0pO1xuICAgICAgICAgICAgd2luZG93Lm9wZW4oZWdnRGF0YS5saWVuUmVkaXJlY3QsICdfYmxhbmsnKTtcbiAgICAgICAgICAgIHRoYXQuaW5pdCgpO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgZGVsYXkgYmV0d2VlbiAxcyBldCA0cy5cbiAgICAgKiBAcmV0dXJuICdudW1iZXInIFRoZSBkZWxheSB2YWx1ZSBpbiBtcy5cbiAgICAgKi9cbiAgICBnZXREZWxheSAoKSAgIHtcbiAgICAgICAgbGV0IG1pbiA9IDEwMDA7XG4gICAgICAgIGxldCBtYXggPSA0MDAwO1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihtYXgtbWluKzEpK21pbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGVnZydzIGRhdGEgZnJvbSB0aGUgQVBJIG9yIGZyb20gTG9jYWwgU3RvcmFnZVxuICAgICAqIEByZXR1cm4ge2RhdGF9IFRoZSBlZ2cncyBkYXRhLlxuICAgICAqL1xuICAgIGFzeW5jIGdldERhdGEgKCkgIHtcbiAgICAgICAgbGV0IFN0b3JlID0gbmV3IFN0b3JhZ2UoKTtcbiAgICAgICAgbGV0IHN0b3JhZ2VEYXRhID0gU3RvcmUuZ2V0RGF0YSgnZWdnJyk7XG4gICAgICAgIGlmICggc3RvcmFnZURhdGEgKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RvcmFnZURhdGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgQVBJID0gbmV3IEFwaWNhbGwoKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBBUEkuZ2V0RGF0YShcImh0dHBzOi8vd3d3Lm1vY2t5LmlvL3YyLzVjZGMzMjNlMmQwMDAwOGYxNGY1YTYzZFwiKTtcbiAgICAgICAgICAgIFN0b3JlLnJlZ2lzdGVyKCdlZ2cnLHJlc3VsdCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHRoZSBET00gZWxlbWVudCBmb3IgRWdnXG4gICAgICogQHBhcmFtIHtvYmplY3R9ICdlZ2cnLCBUaGUgZWdnJ3MgZGF0YSBmcm9tIHRoZSBBUEkgKyBUaGUgc3JjIGltYWdlIGZvciBFZ2dcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9ICdsaW5rJywgVGhlIERPTSBlbGVtZW50IG9mIHRoZSBFZ2dcbiAgICAgKi9cbiAgICBzZXRJdGVtRWdnKGVnZykgIHtcbiAgICAgICAgLy8gbGluayBpdGVtXG4gICAgICAgIGxldCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBsaW5rLmNsYXNzTGlzdC5hZGQoJ2VnZycpO1xuICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsZWdnLmxpZW5SZWRpcmVjdCk7XG4gICAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCdfYmxhbmsnKTtcbiAgICAgICAgbGluay5zdHlsZS50b3AgPSBlZ2cucG9zaXRpb25ZK1wicHhcIjtcbiAgICAgICAgbGluay5zdHlsZS5yaWdodCA9IGVnZy5wb3NpdGlvblgrXCJweFwiO1xuICAgICAgICAvLyBpbWFnZSBpdGVtXG4gICAgICAgIGxldCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsZWdnLmltZyk7XG4gICAgICAgIGltYWdlLnNldEF0dHJpYnV0ZSgnYWx0JyxlZ2cuTmFtZSk7XG4gICAgICAgIGxpbmsuYXBwZW5kKGltYWdlKTtcbiAgICAgICAgcmV0dXJuIGxpbms7XG4gICAgfVxuXG5cbn1cblxuIiwiLyoqXG4gKiBMb2NhbCBTdG9yYWdlIG1hbmFnZXJcbiAqICogKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JhZ2Uge1xuICAgIC8qKlxuICAgICAqIEdldCBkYXRhIGZyb20gdGhlIExvY2FsIFN0b3JhZ2VcbiAgICAgKiBAcGFyYW1zIHtzdHJpbmd9ICdrZXknIGtleSBpbmRleCB0byBmaW5kIGRhdGEgaW4gTG9jYWwgU3RvcmFnZVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59ICdmYWxzZScgaWYgdGhlcmUncyBubyBkYXRhIG9yIHtvYmplY3R9IGRhdGEuXG4gICAgICovXG4gICAgZ2V0RGF0YSAoa2V5KSAge1xuICAgICAgICBpZiAoIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkgKSB7XG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGRhdGEgaW4gdGhlIExvY2FsIFN0b3JhZ2VcbiAgICAgKiBAcGFyYW1zIHtzdHJpbmd9ICdrZXknIGtleSBpbmRleCB0byByZWdpc3RlciBkYXRhIGluIExvY2FsIFN0b3JhZ2VcbiAgICAgKiBAcGFyYW1zIHtvYmplY3R9ICdkYXRhJyBEYXRhIHRvIHJlZ2lzdGVyIGluIHRoZSBMb2NhbCBTdG9yYWdlXG4gICAgICovXG4gICAgcmVnaXN0ZXIgKGtleSxkYXRhKSAge1xuICAgICAgICBjb25zb2xlLmxvZyhrZXksZGF0YSk7XG4gICAgICAgIGxldCBkYXRhVmFsID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSxkYXRhVmFsKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgRWdncyBmcm9tICcuL0VnZ3MnO1xuXG4vKiogQ2xhc3MgZWdnICovXG5uZXcgRWdncygpO1xuIl19
