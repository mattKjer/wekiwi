// https://raw.githubusercontent.com/petermichaux/polyfill/master/src/array.js

(function() {
    function ToInteger(inputArg) {

        var number = Number(inputArg);

        if (isNaN(number)) {
            return 0;
        }

        if (0 === number || Infinity === number || -Infinity === number) {
            return number;
        }

        return (number < 0 ? -1 : 1) * Math.floor(Math.abs(number));
    }


    if (!Array.prototype.indexOf) {

        Array.prototype.indexOf = function(searchElement /*, fromIndex */) {

            if (this == null) {
                throw new TypeError("can't convert " + this + " to object");
            }
            var O = Object(this);

            var len = O.length >>> 0;

            if (len === 0) {
                return -1;
            }

            var n = (arguments.length > 1) ? ToInteger(arguments[1]) : 0;

            if (n >= len) {
                return -1;
            }

            var k;
            if (n >= 0) {
                k = n;
            }
            else {
                k = len - Math.abs(n);
                if (k < 0) {
                    k = 0;
                }
            }

            while (k < len) {
                if (k in O) {
                    if (searchElement === O[k]) {
                        return k;
                    }
                }
                k++;
            }

            return -1;
        };

    }


    if (!Array.prototype.lastIndexOf) {

        Array.prototype.lastIndexOf = function(searchElement /*, fromIndex */) {

            if (this == null) {
                throw new TypeError("can't convert " + this + " to object");
            }
            var O = Object(this);

            var len = O.length >>> 0;

            if (len === 0) {
                return -1;
            }

            var n = (arguments.length > 1) ? ToInteger(arguments[1]) : (len - 1);

            var k = (n >= 0) ?
                        Math.min(n, len-1) :
                        (len - Math.abs(n));

            while (k >= 0) {
                if ((k in O) && (searchElement === O[k])) {
                    return k;
                }
                k--;
            }

            return -1;
        };

    }


    if (!Array.prototype.every) {

        Array.prototype.every = function(callbackfn /*, thisp */) {

            if (this == null) {
                throw new TypeError("can't convert " + this + " to object");
            }
            var O = Object(this);

            var len = O.length >>> 0;

            if (typeof callbackfn != "function") {
                throw new TypeError(callbackfn + " is not a function");
            }

            var T = arguments[1];

            var k = 0;

            while (k < len) {
                if ((k in O) && !callbackfn.call(T, O[k], k, O)) {
                    return false;
                }
                k++;
            }

            return true;
        };

    }


    if (!Array.prototype.forEach) {

        Array.prototype.forEach = function(callbackfn /*, thisArg */) {

            if (this == null) {
                throw new TypeError("can't convert " + this + " to object");
            }
            var O = Object(this);

            var len = O.length >>> 0;

            if (typeof callbackfn != "function") {
                throw new TypeError(callbackfn + " is not a function");
            }

            var T = arguments[1];

            var k = 0;

            while (k < len) {
                if (k in O) {
                    callbackfn.call(T, O[k], k, O);
                }
                k++;
            }

        };

    }


    if (!Array.prototype.filter) {

        Array.prototype.filter = function(callbackfn /*, thisArg */) {

            if (this == null) {
                throw new TypeError("can't convert " + this + " to object");
            }
            var O = Object(this);

            var len = O.length >>> 0;

            if (typeof callbackfn != "function") {
                throw new TypeError(callbackfn + " is not a function");
            }

            var T = arguments[1];

            var A = new Array();

            var k = 0;

            var to = 0;

            while (k < len) {
                if (k in O) {
                    if (callbackfn.call(T, kValue, k, O)) {
                        A[to++] = kValue;
                    }
                }
                k++;
            }

            return A;
        };

    }


    if (!Array.prototype.map) {

        Array.prototype.map = function(callbackfn /*, thisArg */) {

            if (this == null) {
                throw new TypeError("can't convert " + this + " to object");
            }
            var O = Object(this);

            var len = O.length >>> 0;

            if (typeof callbackfn != "function") {
                throw new TypeError(callbackfn + " is not a function");
            }

            var T = arguments[1];

            var A = new Array(len);

            var k = 0;

            while (k < len) {
                if (k in O) {
                    A[k] = callbackfn.call(T, O[k], k, O);
                }
                k++;
            }

            return A;
        };

    }


    if (!Array.prototype.some) {

        Array.prototype.some = function(callbackfn /*, thisArg */) {

            if (this == null) {
                throw new TypeError("can't convert " + this + " to object");
            }
            var O = Object(this);

            var len = O.length >>> 0;

            if (typeof callbackfn != "function") {
                throw new TypeError(callbackfn + " is not a function");
            }

            var T = arguments[1];

            var k = 0;

            while (k < len) {
                if ((k in O) && callbackfn.call(T, O[k], k, O)) {
                    return true;
                }
                k++;
            }

            return false;
        };

    }


    if (!Array.prototype.reduce) {

        Array.prototype.reduce = function(callbackfn /*, initialValue */) {

            if (this == null) {
                throw new TypeError("can't convert " + this + " to object");
            }
            var O = Object(this);

            var len = O.length >>> 0;

            if (typeof callbackfn != "function") {
                throw new TypeError(callbackfn + " is not a function");
            }

            if (len === 0 && arguments.length < 2) {
                throw new TypeError('reduce of empty array with no initial value');
            }

            var k = 0;

            var accumulator;
            if (arguments.length > 1) {
                accumulator = arguments[1];
            }
            else {
                var kPresent = false;
                while ((!kPresent) && (k < len)) {
                    kPresent = k in O;
                    if (kPresent) {
                        accumulator = O[k];
                    }
                    k++;
                }
                if (!kPresent) {
                    throw new TypeError('reduce of empty array with no initial value');
                }
            }

            while (k < len) {
                if (k in O) {
                    accumulator = callbackfn.call(undefined, accumulator, O[k], k, O);
                }
                k++;
            }

            return accumulator;
        };

    }


    if (!Array.prototype.reduceRight) {

        Array.prototype.reduceRight = function(callbackfn /*, initialValue */) {

            if (this == null) {
                throw new TypeError("can't convert " + this + " to object");
            }
            var O = Object(this);

            var len = O.length >>> 0;

            if (typeof callbackfn != "function") {
                throw new TypeError(callbackfn + " is not a function");
            }

            if (len === 0 && arguments.length < 2) {
                throw new TypeError('reduce of empty array with no initial value');
            }

            var k = len-1;

            var accumulator;
            if (arguments.length > 1) {
                accumulator = arguments[1];
            }
            else {
                var kPresent = false;
                while ((!kPresent) && (k >= 0)) {
                    kPresent = k in O;
                    if (kPresent) {
                        accumulator = O[k];
                    }
                    k--;
                }
                if (!kPresent) {
                    throw new TypeError('reduce of empty array with no initial value');
                }
            }

            while (k >= 0) {
                if (k in O) {
                    accumulator = callbackfn.call(undefined, accumulator, O[k], k, O);
                }
                k--;
            }

            return accumulator;
        };
    }
}());
