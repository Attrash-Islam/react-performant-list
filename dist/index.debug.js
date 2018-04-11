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
    PerformantScrollableList.Provider = (_a = /** @class */ (function (_super) {
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
                    var rebaseOnScrollRowCounts = _this.props.rebaseOnScrollRowCounts;
                    var _a = _this.visibleRowsWithoutDeviation, from = _a.from, to = _a.to;
                    var visibleRowCount = to - from;
                    if (process.env.NODE_ENV !== "production") {
                        if (visibleRowCount < 0) {
                            console.error("PerformantScrollableList.Provider: visibleRowsWithoutDeviation exception.\n            Got: " + visibleRowCount + ", where it should be >= 0");
                        }
                    }
                    var rebaseDeviation = _this.rowHeight * (rebaseOnScrollRowCounts || visibleRowCount);
                    if (Math.abs(scrollTop - _this.lastScrollTop) > rebaseDeviation) {
                        _this.lastScrollTop = scrollTop;
                        _this.forceUpdate();
                    }
                };
                _this.getVisibleRowsIndexes = function () {
                    if (!_this.rowHeight || !_this.root) {
                        return __assign({}, _this.SHOW_ALL_ROWS);
                    }
                    else {
                        var _a = _this.props, wrappedSelectorId = _a.wrappedSelectorId, itemSelector = _a.itemSelector;
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
                        var DEFAULT_DEVIATION = PerformantScrollableList.Provider.DEFAULT_DEVIATION;
                        // All rows are visible
                        if (to === null) {
                            to = rows.length;
                        }
                        return {
                            from: from - DEFAULT_DEVIATION,
                            to: to + DEFAULT_DEVIATION,
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
            Object.defineProperty(class_1.prototype, "visibleRowsWithoutDeviation", {
                get: function () {
                    return {
                        from: this.visibleRows.from + PerformantScrollableList.Provider.DEFAULT_DEVIATION,
                        to: this.visibleRows.to - PerformantScrollableList.Provider.DEFAULT_DEVIATION,
                    };
                },
                enumerable: true,
                configurable: true
            });
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
        }(React.Component)),
        _a.DEFAULT_DEVIATION = 10,
        _a);
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
    var _a;
}(React.Component));
exports.PerformantScrollableList = PerformantScrollableList;
exports.default = PerformantScrollableList;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0OGVmNWYzYWYxMjY4MDI4ZTljOSIsIndlYnBhY2s6Ly8vLi9+L3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiUmVhY3RcIixcImNvbW1vbmpzMlwiOlwicmVhY3RcIixcImNvbW1vbmpzXCI6XCJyZWFjdFwiLFwiYW1kXCI6XCJyZWFjdFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvUGVyZm9ybWFudFNjcm9sbGFibGVMaXN0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDaEVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFT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MUMsQ0FBQzt3QkFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDOzRCQUMxQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dDQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLHlFQUF5RSxDQUFDLENBQUM7NEJBQzFGLENBQUM7NEJBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ04sT0FBTyxDQUFDLEdBQUcsQ0FDVCxtRkFBaUYsSUFBSSxDQUFDLFVBQVksRUFDbEcsZ0JBQWdCLENBQ2pCLENBQUM7NEJBQ0osQ0FBQzt3QkFDSCxDQUFDO29CQUNILENBQUM7b0JBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ3pCLENBQUM7OztlQUFBO1lBcUZILGNBQUM7UUFBRCxDQUFDLENBOU5zQyxLQUFLLENBQUMsU0FBUztRQUNyQyxvQkFBaUIsR0FBRyxFQUFHO1lBNk50QztJQUVZLGlDQUFRO1FBQWlCLDJCQUEyRDtRQUF6RTs7UUFVekIsQ0FBQztRQVJRLHVDQUFxQixHQUE1QixVQUE2QixTQUFpRDtZQUM1RSxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztRQUM3QixDQUFDO1FBRU0sd0JBQU0sR0FBYjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUM3QixDQUFDO1FBRUgsY0FBQztJQUFELENBQUMsQ0FWc0MsS0FBSyxDQUFDLFNBQVMsR0FVcEQ7SUFnQkosK0JBQUM7O0NBQUEsQ0EzUDZDLEtBQUssQ0FBQyxTQUFTLEdBMlA1RDtBQTNQWSw0REFBd0I7QUE2UHJDLGtCQUFlLHdCQUF3QixDQUFDIiwiZmlsZSI6ImRpc3QvaW5kZXguZGVidWcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJyZWFjdFwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIikpIDogZmFjdG9yeShyb290W1wiUmVhY3RcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18pIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0OGVmNWYzYWYxMjY4MDI4ZTljOSIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwiUmVhY3RcIixcImNvbW1vbmpzMlwiOlwicmVhY3RcIixcImNvbW1vbmpzXCI6XCJyZWFjdFwiLFwiYW1kXCI6XCJyZWFjdFwifVxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuaW50ZXJmYWNlIElQZXJmb3JtYW50U2Nyb2xsYWJsZUxpc3RDb25zdW1lclByb3BzIHtcbiAgaXNWaXNpYmxlOiBib29sZWFuO1xufVxuXG5pbnRlcmZhY2UgSVBlcmZvcm1hbnRTY3JvbGxhYmxlTGlzdFByb3ZpZGVyUHJvcHMge1xuICB3cmFwcGVkU2VsZWN0b3JJZDogc3RyaW5nO1xuICBpdGVtU2VsZWN0b3I6IHN0cmluZztcbiAgcmViYXNlT25TY3JvbGxSb3dDb3VudHM/OiBudW1iZXI7XG4gIHJlbmRlcihvYmplY3Q6IHtpc1Zpc2libGVSb3coaW5kZXg6IG51bWJlcik6IGJvb2xlYW59KTogSlNYLkVsZW1lbnQ7XG4gIGdldFNjcm9sbGFibGVQYXJlbnQ/KHdyYXBwZWRTZWxlY3RvcklkOiBzdHJpbmcpOiBIVE1MRWxlbWVudDtcbn1cblxuZXhwb3J0IGNsYXNzIFBlcmZvcm1hbnRTY3JvbGxhYmxlTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHB1YmxpYyBzdGF0aWMgUHJvdmlkZXIgPSBjbGFzcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxJUGVyZm9ybWFudFNjcm9sbGFibGVMaXN0UHJvdmlkZXJQcm9wcywge30+IHtcbiAgICBwcml2YXRlIHN0YXRpYyBERUZBVUxUX0RFVklBVElPTiA9IDEwO1xuICAgIHByaXZhdGUgcm9vdDogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBfcm93SGVpZ2h0OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgbGFzdFNjcm9sbFRvcCA9IDA7XG4gICAgcHJpdmF0ZSBzYWZlU2Nyb2xsOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgU0hPV19BTExfUk9XUzoge1xuICAgICAgZnJvbTogbnVtYmVyLFxuICAgICAgdG86IG51bWJlcixcbiAgICB9ID0ge1xuICAgICAgZnJvbTogMCxcbiAgICAgIHRvOiBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgIH07XG5cbiAgICBwcml2YXRlIHZpc2libGVSb3dzOiB7XG4gICAgICBmcm9tOiBudW1iZXIsXG4gICAgICB0bzogbnVtYmVyLFxuICAgIH0gPSB7Li4udGhpcy5TSE9XX0FMTF9ST1dTfTtcblxuICAgIHB1YmxpYyBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgd3JhcHBlZFNlbGVjdG9ySWQsXG4gICAgICAgICAgaXRlbVNlbGVjdG9yLFxuICAgICAgICAgIGdldFNjcm9sbGFibGVQYXJlbnQsXG4gICAgICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHt3cmFwcGVkU2VsZWN0b3JJZH1gKTtcbiAgICAgICAgbGV0IHJvb3Q7XG4gICAgICAgIGlmIChnZXRTY3JvbGxhYmxlUGFyZW50KSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJvb3QgPSBnZXRTY3JvbGxhYmxlUGFyZW50KHdyYXBwZWRTZWxlY3RvcklkKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICBgUGVyZm9ybWFudFNjcm9sbGFibGVMaXN0LlByb3ZpZGVyOiBnZXRTY3JvbGxhYmxlUGFyZW50IHByb3AgdGhyb3cgZXhjZXB0aW9uLlxuICAgICAgICAgICAgICBSb2xsYmFjayB0byBQZXJmb3JtYW50U2Nyb2xsYWJsZUxpc3QuUHJvdmlkZXIgYnVpbHQtaW4gc2Nyb2xsYWJsZSBwYXJlbnQgZmluZGVyYCxcbiAgICAgICAgICAgICAgZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByb290ID0gUGVyZm9ybWFudFNjcm9sbGFibGVMaXN0LmdldFNjcm9sbGFibGVQYXJlbnQobm9kZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgYFBlcmZvcm1hbnRTY3JvbGxhYmxlTGlzdC5Qcm92aWRlcjogQ29uc2lkZXIgdXNpbmcgZ2V0U2Nyb2xsYWJsZVBhcmVudCBwcm9wIGlmIHlvdSBhcmUgdXNpbmcgY3VzdG9tXG4gICAgICAgICAgICAgIHNjcm9sbGVyIHRoYXQgaXMgbm90IG1ha2luZyB0aGUgdXNlIG9mIFwib3ZlcmZsb3c6IHNjcm9sbFwiLiBlLmcuIHNsaW1TY3JvbGwgaXMgaW1wbGVtZW50aW5nIHRoZSBzY3JvbGxhYmxlXG4gICAgICAgICAgICAgIGFyZWEgaW4gc3BlY2lhbCBtb2RlIHdoZXJlIHRoZSBzY3JvbGxhYmxlIGlzIFwib3ZlcmZsb3c6IGhpZGRlblwiIHdoaWNoIHRoZSBidWlsdC1pbiBzY3JvbGxhYmxlIHBhcmVudFxuICAgICAgICAgICAgICBmaW5kZXIgd2lsbCBub3QgZmluZGAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByb290ID0gUGVyZm9ybWFudFNjcm9sbGFibGVMaXN0LmdldFNjcm9sbGFibGVQYXJlbnQobm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocm9vdCkge1xuICAgICAgICAgIHRoaXMucm9vdCA9IHJvb3Q7XG4gICAgICAgICAgdGhpcy5yb290LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5vblNjcm9sbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIlBlcmZvcm1hbnRTY3JvbGxhYmxlTGlzdC5Qcm92aWRlcjogQ2FuJ3QgZmluZCB0aGUgc2Nyb2xsYWJsZSBwYXJlbnRcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnZpc2libGVSb3dzID0gdGhpcy5nZXRWaXNpYmxlUm93c0luZGV4ZXMoKTtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYCVjIFBlcmZvcm1hbnRTY3JvbGxhYmxlTGlzdC5Qcm92aWRlcjogY2FsY3VsYXRlZCB2aXNpYmxlUm93cyBpczogJHtKU09OLnN0cmluZ2lmeSh0aGlzLnZpc2libGVSb3dzKX1gLFxuICAgICAgICAgICAgXCJjb2xvcjogIzAwYWE0ZlwiLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHdyYXBwZWRTZWxlY3RvcklkLFxuICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIHJldHVybiB0aGlzLnByb3BzLnJlbmRlcih7XG4gICAgICAgIGlzVmlzaWJsZVJvdzogKGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICBpZiAoaW5kZXggPj0gdGhpcy52aXNpYmxlUm93cy5mcm9tICYmIGluZGV4IDw9IHRoaXMudmlzaWJsZVJvd3MudG8pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgaWYgKHRoaXMucm9vdCkge1xuICAgICAgICB0aGlzLnJvb3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLm9uU2Nyb2xsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgY29uc3Qgb2xkVmlzaWJsZVJvd3MgPSB7Li4udGhpcy52aXNpYmxlUm93c307XG4gICAgICB0aGlzLnZpc2libGVSb3dzID0gdGhpcy5nZXRWaXNpYmxlUm93c0luZGV4ZXMoKTtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgY29uc3Qgc3RyaW5naWZ5T2xkVmlzaWJsZSA9IEpTT04uc3RyaW5naWZ5KG9sZFZpc2libGVSb3dzKTtcbiAgICAgICAgY29uc3Qgc3RyaW5naWZ5TmV3VmlzaWJsZSA9IEpTT04uc3RyaW5naWZ5KHRoaXMudmlzaWJsZVJvd3MpO1xuICAgICAgICBpZiAoc3RyaW5naWZ5T2xkVmlzaWJsZSAhPT0gc3RyaW5naWZ5TmV3VmlzaWJsZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYCVjIFBlcmZvcm1hbnRTY3JvbGxhYmxlTGlzdC5Qcm92aWRlcjogTkVXIENhbGN1bGF0ZWQgdmlzaWJsZVJvd3MgaXM6ICR7SlNPTi5zdHJpbmdpZnkodGhpcy52aXNpYmxlUm93cyl9YCxcbiAgICAgICAgICAgIFwiY29sb3I6ICMwMGFhNGZcIixcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgdmlzaWJsZVJvd3NXaXRob3V0RGV2aWF0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZnJvbTogdGhpcy52aXNpYmxlUm93cy5mcm9tICsgUGVyZm9ybWFudFNjcm9sbGFibGVMaXN0LlByb3ZpZGVyLkRFRkFVTFRfREVWSUFUSU9OLFxuICAgICAgICB0bzogdGhpcy52aXNpYmxlUm93cy50byAtIFBlcmZvcm1hbnRTY3JvbGxhYmxlTGlzdC5Qcm92aWRlci5ERUZBVUxUX0RFVklBVElPTixcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgcm93SGVpZ2h0KCkge1xuICAgICAgaWYgKCF0aGlzLl9yb3dIZWlnaHQpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHdyYXBwZWRTZWxlY3RvcklkLFxuICAgICAgICAgIGl0ZW1TZWxlY3RvcixcbiAgICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IGZpcnN0Um93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7d3JhcHBlZFNlbGVjdG9ySWR9ICR7aXRlbVNlbGVjdG9yfWApO1xuICAgICAgICBpZiAoZmlyc3RSb3cpIHtcbiAgICAgICAgICB0aGlzLl9yb3dIZWlnaHQgPSBmaXJzdFJvdy5jbGllbnRIZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLl9yb3dIZWlnaHQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlBlcmZvcm1hbnRTY3JvbGxhYmxlTGlzdC5Qcm92aWRlcjogZGlkbid0IGNhbGN1bGF0ZWQgeWV0IHRoZSByb3cgaGVpZ2h0XCIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgYCVjIFBlcmZvcm1hbnRTY3JvbGxhYmxlTGlzdC5Qcm92aWRlcjogc3VjY2Vzc2Z1bGx5IGNhbGN1bGF0ZWQgdGhlIHJvdyBoZWlnaHQuICR7dGhpcy5fcm93SGVpZ2h0fWAsXG4gICAgICAgICAgICAgIFwiY29sb3I6ICMwMGFhNGZcIixcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9yb3dIZWlnaHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblNjcm9sbCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgc2Nyb2xsVG9wLFxuICAgICAgfSA9IHRoaXMucm9vdDtcblxuICAgICAgY29uc3Qge1xuICAgICAgICByZWJhc2VPblNjcm9sbFJvd0NvdW50cyxcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICBjb25zdCB7XG4gICAgICAgIGZyb20sXG4gICAgICAgIHRvLFxuICAgICAgfSA9IHRoaXMudmlzaWJsZVJvd3NXaXRob3V0RGV2aWF0aW9uO1xuXG4gICAgICBjb25zdCB2aXNpYmxlUm93Q291bnQgPSB0byAtIGZyb207XG5cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgaWYgKHZpc2libGVSb3dDb3VudCA8IDApIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgYFBlcmZvcm1hbnRTY3JvbGxhYmxlTGlzdC5Qcm92aWRlcjogdmlzaWJsZVJvd3NXaXRob3V0RGV2aWF0aW9uIGV4Y2VwdGlvbi5cbiAgICAgICAgICAgIEdvdDogJHt2aXNpYmxlUm93Q291bnR9LCB3aGVyZSBpdCBzaG91bGQgYmUgPj0gMGAsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCByZWJhc2VEZXZpYXRpb24gPSB0aGlzLnJvd0hlaWdodCAqIChyZWJhc2VPblNjcm9sbFJvd0NvdW50cyB8fCB2aXNpYmxlUm93Q291bnQpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIE1hdGguYWJzKHNjcm9sbFRvcCAtIHRoaXMubGFzdFNjcm9sbFRvcCkgPiByZWJhc2VEZXZpYXRpb25cbiAgICAgICkge1xuICAgICAgICB0aGlzLmxhc3RTY3JvbGxUb3AgPSBzY3JvbGxUb3A7XG4gICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFZpc2libGVSb3dzSW5kZXhlcyA9ICgpOiB7XG4gICAgICBmcm9tOiBudW1iZXI7XG4gICAgICB0bzogbnVtYmVyO1xuICAgIH0gPT4ge1xuXG4gICAgICBpZiAoIXRoaXMucm93SGVpZ2h0IHx8ICF0aGlzLnJvb3QpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi50aGlzLlNIT1dfQUxMX1JPV1MsXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgd3JhcHBlZFNlbGVjdG9ySWQsXG4gICAgICAgICAgaXRlbVNlbGVjdG9yLFxuICAgICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3Qgcm93cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke3dyYXBwZWRTZWxlY3RvcklkfSAke2l0ZW1TZWxlY3Rvcn1gKTtcbiAgICAgICAgbGV0IGZyb20gPSBudWxsO1xuICAgICAgICBsZXQgdG8gPSBudWxsO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBsZXQgcm93ID0gcm93c1tpXTtcbiAgICAgICAgICBsZXQgcG9zaXRpb24gPSByb3cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgdGhpcy5yb3dIZWlnaHQ7XG4gICAgICAgICAgaWYgKHBvc2l0aW9uID49IDAgJiYgcG9zaXRpb24gPD0gdGhpcy5yb290LmNsaWVudEhlaWdodCkge1xuICAgICAgICAgICAgaWYgKGZyb20gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgZnJvbSA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChmcm9tICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0byA9IGkgLSAxO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChbZnJvbSwgdG9dLmZpbHRlcih4ID0+IHggIT09IG51bGwpLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIERFRkFVTFRfREVWSUFUSU9OLFxuICAgICAgICB9ID0gUGVyZm9ybWFudFNjcm9sbGFibGVMaXN0LlByb3ZpZGVyO1xuXG4gICAgICAgIC8vIEFsbCByb3dzIGFyZSB2aXNpYmxlXG4gICAgICAgIGlmICh0byA9PT0gbnVsbCkge1xuICAgICAgICAgIHRvID0gcm93cy5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGZyb206IGZyb20gLSBERUZBVUxUX0RFVklBVElPTixcbiAgICAgICAgICB0bzogdG8gKyBERUZBVUxUX0RFVklBVElPTixcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcHVibGljIHN0YXRpYyBDb25zdW1lciA9IGNsYXNzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElQZXJmb3JtYW50U2Nyb2xsYWJsZUxpc3RDb25zdW1lclByb3BzLCB7fT4ge1xuXG4gICAgcHVibGljIHNob3VsZENvbXBvbmVudFVwZGF0ZShuZXh0UHJvcHM6IElQZXJmb3JtYW50U2Nyb2xsYWJsZUxpc3RDb25zdW1lclByb3BzKSB7XG4gICAgICByZXR1cm4gbmV4dFByb3BzLmlzVmlzaWJsZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XG4gICAgfVxuXG4gIH07XG5cbiAgcHVibGljIHN0YXRpYyBnZXRTY3JvbGxhYmxlUGFyZW50KG5vZGUpOiBIVE1MRWxlbWVudCB8IG51bGwge1xuICAgIGNvbnN0IGlzRWxlbWVudCA9IG5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudDtcbiAgICBjb25zdCBvdmVyZmxvd1kgPSBpc0VsZW1lbnQgJiYgd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSkub3ZlcmZsb3dZO1xuICAgIGNvbnN0IGlzU2Nyb2xsYWJsZSA9IG92ZXJmbG93WSAhPT0gXCJ2aXNpYmxlXCIgJiYgb3ZlcmZsb3dZICE9PSBcImhpZGRlblwiO1xuXG4gICAgaWYgKCFub2RlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2UgaWYgKGlzU2Nyb2xsYWJsZSAmJiBub2RlLnNjcm9sbEhlaWdodCA+PSBub2RlLmNsaWVudEhlaWdodCkge1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIFBlcmZvcm1hbnRTY3JvbGxhYmxlTGlzdC5nZXRTY3JvbGxhYmxlUGFyZW50KG5vZGUucGFyZW50Tm9kZSkgfHwgZG9jdW1lbnQuYm9keTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBlcmZvcm1hbnRTY3JvbGxhYmxlTGlzdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9QZXJmb3JtYW50U2Nyb2xsYWJsZUxpc3QudHN4Il0sInNvdXJjZVJvb3QiOiIifQ==