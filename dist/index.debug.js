(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react")) : factory(root["React"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(1);
var PerformantScrollableList = /** @class */ (function (_super) {
    __extends(PerformantScrollableList, _super);
    function PerformantScrollableList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PerformantScrollableList.getScrollableParent = function (node) {
        var isElement = node instanceof HTMLElement;
        var overflowY = isElement && window.getComputedStyle(node).overflowY;
        var isScrollable = overflowY !== "visible" && overflowY !== "hidden";
        if (!node) {
            return null;
        }
        else if (isScrollable && node.scrollHeight >= node.clientHeight) {
            return node;
        }
        return PerformantScrollableList.getScrollableParent(node.parentNode) || document.body;
    };
    PerformantScrollableList.Provider = /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._rowHeight = 0;
            _this.lastScrollTop = 0;
            _this.safeScroll = 0;
            _this.SHOW_ALL_ROWS = {
                from: 0,
                to: Number.MAX_VALUE,
            };
            _this.visibleRows = __assign({}, _this.SHOW_ALL_ROWS);
            _this.onScroll = function () {
                var scrollTop = _this.root.scrollTop;
                var _a = _this.props, ChunkRowsCount = _a.ChunkRowsCount, rebaseOnScrollRowCounts = _a.rebaseOnScrollRowCounts;
                var rebaseDeviation = _this.rowHeight * (rebaseOnScrollRowCounts || ChunkRowsCount);
                if (Math.abs(scrollTop - _this.lastScrollTop) > rebaseDeviation) {
                    _this.lastScrollTop = scrollTop;
                    _this.forceUpdate();
                }
            };
            _this.getVisibleRowsIndexes = function () {
                if (!_this.rowHeight) {
                    return __assign({}, _this.SHOW_ALL_ROWS);
                }
                else {
                    var _a = _this.props, wrappedSelectorId = _a.wrappedSelectorId, itemSelector = _a.itemSelector, ChunkRowsCount = _a.ChunkRowsCount;
                    var rows = document.querySelectorAll("#" + wrappedSelectorId + " " + itemSelector);
                    var from = null;
                    var to = null;
                    for (var i = 0; i < rows.length; i++) {
                        var row = rows[i];
                        var position = row.getBoundingClientRect().top + _this.rowHeight;
                        if (position >= 0 && position <= _this.root.clientHeight) {
                            if (from === null) {
                                from = i;
                            }
                        }
                        else if (from !== null) {
                            to = i - 1;
                        }
                        if ([from, to].filter(function (x) { return x !== null; }).length === 2) {
                            break;
                        }
                    }
                    return {
                        from: from - ChunkRowsCount,
                        to: to + ChunkRowsCount,
                    };
                }
            };
            return _this;
        }
        class_1.prototype.componentDidMount = function () {
            var _this = this;
            setTimeout(function () {
                var _a = _this.props, wrappedSelectorId = _a.wrappedSelectorId, itemSelector = _a.itemSelector, getScrollableParent = _a.getScrollableParent;
                var node = document.querySelector("#" + wrappedSelectorId);
                var root;
                if (getScrollableParent) {
                    try {
                        root = getScrollableParent(wrappedSelectorId);
                    }
                    catch (e) {
                        console.error("PerformantScrollableList.Provider: getScrollableParent prop throw exception.\n              Rollback to PerformantScrollableList.Provider built-in scrollable parent finder", e);
                        root = PerformantScrollableList.getScrollableParent(node);
                    }
                }
                else {
                    if (process.env.NODE_ENV !== "production") {
                        console.warn("PerformantScrollableList.Provider: Consider using getScrollableParent prop if you are using custom\n              scroller that is not making the use of \"overflow: scroll\". e.g. slimScroll is implementing the scrollable\n              area in special mode where the scrollable is \"overflow: hidden\" which the built-in scrollable parent\n              finder will not find");
                    }
                    root = PerformantScrollableList.getScrollableParent(node);
                }
                if (root) {
                    _this.root = root;
                    _this.root.addEventListener("scroll", _this.onScroll);
                }
                else {
                    console.error("PerformantScrollableList.Provider: Can't find the scrollable parent");
                }
                _this.visibleRows = _this.getVisibleRowsIndexes();
                if (process.env.NODE_ENV !== "production") {
                    console.log("%c PerformantScrollableList.Provider: calculated visibleRows is: " + JSON.stringify(_this.visibleRows), "color: #00aa4f");
                }
            }, 0);
        };
        class_1.prototype.render = function () {
            var _this = this;
            var wrappedSelectorId = this.props.wrappedSelectorId;
            return this.props.render({
                isVisibleRow: function (index) {
                    if (index >= _this.visibleRows.from && index <= _this.visibleRows.to) {
                        return true;
                    }
                    else {
                        return false;
                    }
                },
            });
        };
        class_1.prototype.componentWillUnmount = function () {
            if (this.root) {
                this.root.removeEventListener("scroll", this.onScroll);
            }
        };
        class_1.prototype.componentDidUpdate = function () {
            var oldVisibleRows = __assign({}, this.visibleRows);
            this.visibleRows = this.getVisibleRowsIndexes();
            if (process.env.NODE_ENV !== "production") {
                var stringifyOldVisible = JSON.stringify(oldVisibleRows);
                var stringifyNewVisible = JSON.stringify(this.visibleRows);
                if (stringifyOldVisible !== stringifyNewVisible) {
                    console.log("%c PerformantScrollableList.Provider: NEW Calculated visibleRows is: " + JSON.stringify(this.visibleRows), "color: #00aa4f");
                }
            }
        };
        Object.defineProperty(class_1.prototype, "rowHeight", {
            get: function () {
                if (!this._rowHeight) {
                    var _a = this.props, wrappedSelectorId = _a.wrappedSelectorId, itemSelector = _a.itemSelector;
                    var firstRow = document.querySelector("#" + wrappedSelectorId + " " + itemSelector);
                    if (firstRow) {
                        this._rowHeight = firstRow.clientHeight;
                    }
                    if (process.env.NODE_ENV !== "production") {
                        if (!this._rowHeight) {
                            console.warn("PerformantScrollableList.Provider: didn't calculated yet the row height");
                        }
                        else {
                            console.log("%c PerformantScrollableList.Provider: successfully calculated the row height. " + this._rowHeight, "color: #00aa4f");
                        }
                    }
                }
                return this._rowHeight;
            },
            enumerable: true,
            configurable: true
        });
        return class_1;
    }(React.Component));
    PerformantScrollableList.Consumer = /** @class */ (function (_super) {
        __extends(class_2, _super);
        function class_2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_2.prototype.shouldComponentUpdate = function (nextProps) {
            return nextProps.isVisible;
        };
        class_2.prototype.render = function () {
            return this.props.children;
        };
        return class_2;
    }(React.Component));
    return PerformantScrollableList;
}(React.Component));
exports.PerformantScrollableList = PerformantScrollableList;
exports.default = PerformantScrollableList;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmYzA2YWY5ZTI5YmFmNjk4MThmMCIsIndlYnBhY2s6Ly8vLi9+L3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiUmVhY3RcIixcImNvbW1vbmpzMlwiOlwicmVhY3RcIixcImNvbW1vbmpzXCI6XCJyZWFjdFwiLFwiYW1kXCI6XCJyZWFjdFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvUGVyZm9ybWFudFNjcm9sbGFibGVMaXN0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDaEVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFT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SUFnQkosK0JBQUM7Q0FBQSxDQTVONkMsS0FBSyxDQUFDLFNBQVMsR0E0TjVEO0FBNU5ZLDREQUF3QjtBQThOckMsa0JBQWUsd0JBQXdCLENBQUMiLCJmaWxlIjoiZGlzdC9pbmRleC5kZWJ1Zy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcInJlYWN0XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcInJlYWN0XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdFwiKSkgOiBmYWN0b3J5KHJvb3RbXCJSZWFjdFwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXykge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGZjMDZhZjllMjliYWY2OTgxOGYwIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJyb290XCI6XCJSZWFjdFwiLFwiY29tbW9uanMyXCI6XCJyZWFjdFwiLFwiY29tbW9uanNcIjpcInJlYWN0XCIsXCJhbWRcIjpcInJlYWN0XCJ9XG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5pbnRlcmZhY2UgSVBlcmZvcm1hbnRTY3JvbGxhYmxlTGlzdENvbnN1bWVyUHJvcHMge1xuICBpc1Zpc2libGU6IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBJUGVyZm9ybWFudFNjcm9sbGFibGVMaXN0UHJvdmlkZXJQcm9wcyB7XG4gIHdyYXBwZWRTZWxlY3RvcklkOiBzdHJpbmc7XG4gIGl0ZW1TZWxlY3Rvcjogc3RyaW5nO1xuICBDaHVua1Jvd3NDb3VudDogbnVtYmVyO1xuICByZWJhc2VPblNjcm9sbFJvd0NvdW50cz86IG51bWJlcjtcbiAgcmVuZGVyKG9iamVjdDoge2lzVmlzaWJsZVJvdyhpbmRleDogbnVtYmVyKTogYm9vbGVhbn0pOiBKU1guRWxlbWVudDtcbiAgZ2V0U2Nyb2xsYWJsZVBhcmVudD8od3JhcHBlZFNlbGVjdG9ySWQ6IHN0cmluZyk6IEhUTUxFbGVtZW50O1xufVxuXG5leHBvcnQgY2xhc3MgUGVyZm9ybWFudFNjcm9sbGFibGVMaXN0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcHVibGljIHN0YXRpYyBQcm92aWRlciA9IGNsYXNzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElQZXJmb3JtYW50U2Nyb2xsYWJsZUxpc3RQcm92aWRlclByb3BzLCB7fT4ge1xuXG4gICAgcHJpdmF0ZSByb290OiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIF9yb3dIZWlnaHQ6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBsYXN0U2Nyb2xsVG9wID0gMDtcbiAgICBwcml2YXRlIHNhZmVTY3JvbGw6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBTSE9XX0FMTF9ST1dTOiB7XG4gICAgICBmcm9tOiBudW1iZXIsXG4gICAgICB0bzogbnVtYmVyLFxuICAgIH0gPSB7XG4gICAgICBmcm9tOiAwLFxuICAgICAgdG86IE51bWJlci5NQVhfVkFMVUUsXG4gICAgfTtcblxuICAgIHByaXZhdGUgdmlzaWJsZVJvd3M6IHtcbiAgICAgIGZyb206IG51bWJlcixcbiAgICAgIHRvOiBudW1iZXIsXG4gICAgfSA9IHsuLi50aGlzLlNIT1dfQUxMX1JPV1N9O1xuXG4gICAgcHVibGljIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICB3cmFwcGVkU2VsZWN0b3JJZCxcbiAgICAgICAgICBpdGVtU2VsZWN0b3IsXG4gICAgICAgICAgZ2V0U2Nyb2xsYWJsZVBhcmVudCxcbiAgICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3dyYXBwZWRTZWxlY3RvcklkfWApO1xuICAgICAgICBsZXQgcm9vdDtcbiAgICAgICAgaWYgKGdldFNjcm9sbGFibGVQYXJlbnQpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcm9vdCA9IGdldFNjcm9sbGFibGVQYXJlbnQod3JhcHBlZFNlbGVjdG9ySWQpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgIGBQZXJmb3JtYW50U2Nyb2xsYWJsZUxpc3QuUHJvdmlkZXI6IGdldFNjcm9sbGFibGVQYXJlbnQgcHJvcCB0aHJvdyBleGNlcHRpb24uXG4gICAgICAgICAgICAgIFJvbGxiYWNrIHRvIFBlcmZvcm1hbnRTY3JvbGxhYmxlTGlzdC5Qcm92aWRlciBidWlsdC1pbiBzY3JvbGxhYmxlIHBhcmVudCBmaW5kZXJgLFxuICAgICAgICAgICAgICBlLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJvb3QgPSBQZXJmb3JtYW50U2Nyb2xsYWJsZUxpc3QuZ2V0U2Nyb2xsYWJsZVBhcmVudChub2RlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICBgUGVyZm9ybWFudFNjcm9sbGFibGVMaXN0LlByb3ZpZGVyOiBDb25zaWRlciB1c2luZyBnZXRTY3JvbGxhYmxlUGFyZW50IHByb3AgaWYgeW91IGFyZSB1c2luZyBjdXN0b21cbiAgICAgICAgICAgICAgc2Nyb2xsZXIgdGhhdCBpcyBub3QgbWFraW5nIHRoZSB1c2Ugb2YgXCJvdmVyZmxvdzogc2Nyb2xsXCIuIGUuZy4gc2xpbVNjcm9sbCBpcyBpbXBsZW1lbnRpbmcgdGhlIHNjcm9sbGFibGVcbiAgICAgICAgICAgICAgYXJlYSBpbiBzcGVjaWFsIG1vZGUgd2hlcmUgdGhlIHNjcm9sbGFibGUgaXMgXCJvdmVyZmxvdzogaGlkZGVuXCIgd2hpY2ggdGhlIGJ1aWx0LWluIHNjcm9sbGFibGUgcGFyZW50XG4gICAgICAgICAgICAgIGZpbmRlciB3aWxsIG5vdCBmaW5kYCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJvb3QgPSBQZXJmb3JtYW50U2Nyb2xsYWJsZUxpc3QuZ2V0U2Nyb2xsYWJsZVBhcmVudChub2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyb290KSB7XG4gICAgICAgICAgdGhpcy5yb290ID0gcm9vdDtcbiAgICAgICAgICB0aGlzLnJvb3QuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLm9uU2Nyb2xsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUGVyZm9ybWFudFNjcm9sbGFibGVMaXN0LlByb3ZpZGVyOiBDYW4ndCBmaW5kIHRoZSBzY3JvbGxhYmxlIHBhcmVudFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmlzaWJsZVJvd3MgPSB0aGlzLmdldFZpc2libGVSb3dzSW5kZXhlcygpO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgJWMgUGVyZm9ybWFudFNjcm9sbGFibGVMaXN0LlByb3ZpZGVyOiBjYWxjdWxhdGVkIHZpc2libGVSb3dzIGlzOiAke0pTT04uc3RyaW5naWZ5KHRoaXMudmlzaWJsZVJvd3MpfWAsXG4gICAgICAgICAgICBcImNvbG9yOiAjMDBhYTRmXCIsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSwgMCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgd3JhcHBlZFNlbGVjdG9ySWQsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgcmV0dXJuIHRoaXMucHJvcHMucmVuZGVyKHtcbiAgICAgICAgaXNWaXNpYmxlUm93OiAoaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGlmIChpbmRleCA+PSB0aGlzLnZpc2libGVSb3dzLmZyb20gJiYgaW5kZXggPD0gdGhpcy52aXNpYmxlUm93cy50bykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICBpZiAodGhpcy5yb290KSB7XG4gICAgICAgIHRoaXMucm9vdC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHRoaXMub25TY3JvbGwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICBjb25zdCBvbGRWaXNpYmxlUm93cyA9IHsuLi50aGlzLnZpc2libGVSb3dzfTtcbiAgICAgIHRoaXMudmlzaWJsZVJvd3MgPSB0aGlzLmdldFZpc2libGVSb3dzSW5kZXhlcygpO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICBjb25zdCBzdHJpbmdpZnlPbGRWaXNpYmxlID0gSlNPTi5zdHJpbmdpZnkob2xkVmlzaWJsZVJvd3MpO1xuICAgICAgICBjb25zdCBzdHJpbmdpZnlOZXdWaXNpYmxlID0gSlNPTi5zdHJpbmdpZnkodGhpcy52aXNpYmxlUm93cyk7XG4gICAgICAgIGlmIChzdHJpbmdpZnlPbGRWaXNpYmxlICE9PSBzdHJpbmdpZnlOZXdWaXNpYmxlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgJWMgUGVyZm9ybWFudFNjcm9sbGFibGVMaXN0LlByb3ZpZGVyOiBORVcgQ2FsY3VsYXRlZCB2aXNpYmxlUm93cyBpczogJHtKU09OLnN0cmluZ2lmeSh0aGlzLnZpc2libGVSb3dzKX1gLFxuICAgICAgICAgICAgXCJjb2xvcjogIzAwYWE0ZlwiLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldCByb3dIZWlnaHQoKSB7XG4gICAgICBpZiAoIXRoaXMuX3Jvd0hlaWdodCkge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgd3JhcHBlZFNlbGVjdG9ySWQsXG4gICAgICAgICAgaXRlbVNlbGVjdG9yLFxuICAgICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgZmlyc3RSb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHt3cmFwcGVkU2VsZWN0b3JJZH0gJHtpdGVtU2VsZWN0b3J9YCk7XG4gICAgICAgIGlmIChmaXJzdFJvdykge1xuICAgICAgICAgIHRoaXMuX3Jvd0hlaWdodCA9IGZpcnN0Um93LmNsaWVudEhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgICBpZiAoIXRoaXMuX3Jvd0hlaWdodCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiUGVyZm9ybWFudFNjcm9sbGFibGVMaXN0LlByb3ZpZGVyOiBkaWRuJ3QgY2FsY3VsYXRlZCB5ZXQgdGhlIHJvdyBoZWlnaHRcIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgICBgJWMgUGVyZm9ybWFudFNjcm9sbGFibGVMaXN0LlByb3ZpZGVyOiBzdWNjZXNzZnVsbHkgY2FsY3VsYXRlZCB0aGUgcm93IGhlaWdodC4gJHt0aGlzLl9yb3dIZWlnaHR9YCxcbiAgICAgICAgICAgICAgXCJjb2xvcjogIzAwYWE0ZlwiLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuX3Jvd0hlaWdodDtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uU2Nyb2xsID0gKCkgPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBzY3JvbGxUb3AsXG4gICAgICB9ID0gdGhpcy5yb290O1xuICAgICAgY29uc3Qge1xuICAgICAgICBDaHVua1Jvd3NDb3VudCxcbiAgICAgICAgcmViYXNlT25TY3JvbGxSb3dDb3VudHMsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgY29uc3QgcmViYXNlRGV2aWF0aW9uID0gdGhpcy5yb3dIZWlnaHQgKiAocmViYXNlT25TY3JvbGxSb3dDb3VudHMgfHwgQ2h1bmtSb3dzQ291bnQpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIE1hdGguYWJzKHNjcm9sbFRvcCAtIHRoaXMubGFzdFNjcm9sbFRvcCkgPiByZWJhc2VEZXZpYXRpb25cbiAgICAgICkge1xuICAgICAgICB0aGlzLmxhc3RTY3JvbGxUb3AgPSBzY3JvbGxUb3A7XG4gICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFZpc2libGVSb3dzSW5kZXhlcyA9ICgpOiB7XG4gICAgICBmcm9tOiBudW1iZXI7XG4gICAgICB0bzogbnVtYmVyO1xuICAgIH0gPT4ge1xuXG4gICAgICBpZiAoIXRoaXMucm93SGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4udGhpcy5TSE9XX0FMTF9ST1dTLFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHdyYXBwZWRTZWxlY3RvcklkLFxuICAgICAgICAgIGl0ZW1TZWxlY3RvcixcbiAgICAgICAgICBDaHVua1Jvd3NDb3VudCxcbiAgICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IHJvd3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAjJHt3cmFwcGVkU2VsZWN0b3JJZH0gJHtpdGVtU2VsZWN0b3J9YCk7XG4gICAgICAgIGxldCBmcm9tID0gbnVsbDtcbiAgICAgICAgbGV0IHRvID0gbnVsbDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgbGV0IHJvdyA9IHJvd3NbaV07XG4gICAgICAgICAgbGV0IHBvc2l0aW9uID0gcm93LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHRoaXMucm93SGVpZ2h0O1xuICAgICAgICAgIGlmIChwb3NpdGlvbiA+PSAwICYmIHBvc2l0aW9uIDw9IHRoaXMucm9vdC5jbGllbnRIZWlnaHQpIHtcbiAgICAgICAgICAgIGlmIChmcm9tID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIGZyb20gPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoZnJvbSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdG8gPSBpIC0gMTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoW2Zyb20sIHRvXS5maWx0ZXIoeCA9PiB4ICE9PSBudWxsKS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZnJvbTogZnJvbSAtIENodW5rUm93c0NvdW50LFxuICAgICAgICAgIHRvOiB0byArIENodW5rUm93c0NvdW50LFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgc3RhdGljIENvbnN1bWVyID0gY2xhc3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8SVBlcmZvcm1hbnRTY3JvbGxhYmxlTGlzdENvbnN1bWVyUHJvcHMsIHt9PiB7XG5cbiAgICBwdWJsaWMgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wczogSVBlcmZvcm1hbnRTY3JvbGxhYmxlTGlzdENvbnN1bWVyUHJvcHMpIHtcbiAgICAgIHJldHVybiBuZXh0UHJvcHMuaXNWaXNpYmxlO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICB9XG5cbiAgfTtcblxuICBwdWJsaWMgc3RhdGljIGdldFNjcm9sbGFibGVQYXJlbnQobm9kZSk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgY29uc3QgaXNFbGVtZW50ID0gbm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50O1xuICAgIGNvbnN0IG92ZXJmbG93WSA9IGlzRWxlbWVudCAmJiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS5vdmVyZmxvd1k7XG4gICAgY29uc3QgaXNTY3JvbGxhYmxlID0gb3ZlcmZsb3dZICE9PSBcInZpc2libGVcIiAmJiBvdmVyZmxvd1kgIT09IFwiaGlkZGVuXCI7XG5cbiAgICBpZiAoIW5vZGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSBpZiAoaXNTY3JvbGxhYmxlICYmIG5vZGUuc2Nyb2xsSGVpZ2h0ID49IG5vZGUuY2xpZW50SGVpZ2h0KSB7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG5cbiAgICByZXR1cm4gUGVyZm9ybWFudFNjcm9sbGFibGVMaXN0LmdldFNjcm9sbGFibGVQYXJlbnQobm9kZS5wYXJlbnROb2RlKSB8fCBkb2N1bWVudC5ib2R5O1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGVyZm9ybWFudFNjcm9sbGFibGVMaXN0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1BlcmZvcm1hbnRTY3JvbGxhYmxlTGlzdC50c3giXSwic291cmNlUm9vdCI6IiJ9