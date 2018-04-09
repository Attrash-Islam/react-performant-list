(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react")) : factory(root["React"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
var React = __webpack_require__(0);
var consoleInfo = function (msg) {
    console.log("%c " + msg, "color: #0079f4");
};
var statistics = {
    rendered: 0,
    saved: 0,
};
var PerformantScrollableList = /** @class */ (function (_super) {
    __extends(PerformantScrollableList, _super);
    function PerformantScrollableList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PerformantScrollableList.getScrollableParent = function (node) {
        var isElement = node instanceof HTMLElement;
        var overflowY = isElement && window.getComputedStyle(node).overflowY;
        var isScrollable = overflowY !== "visible";
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
                if (Math.abs(scrollTop - _this.lastScrollTop) > _this.rowHeight * (_this.props.ChunkRowsCount / 2)) {
                    _this.lastScrollTop = scrollTop;
                    consoleInfo("FORCE RENDERING");
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
                var root = getScrollableParent ?
                    getScrollableParent(wrappedSelectorId) : PerformantScrollableList.getScrollableParent(node);
                if (root) {
                    _this.root = root;
                    _this.root.addEventListener("scroll", _this.onScroll);
                }
                else {
                    console.error("Can't find the scrollable parent");
                }
                _this.visibleRows = _this.getVisibleRowsIndexes();
                consoleInfo("Calculated visibleRows is: " + JSON.stringify(_this.visibleRows));
            }, 0);
        };
        class_1.prototype.render = function () {
            var _this = this;
            var wrappedSelectorId = this.props.wrappedSelectorId;
            return this.props.render({
                isVisibleRow: function (index) {
                    if (index >= _this.visibleRows.from && index <= _this.visibleRows.to) {
                        statistics.rendered++;
                        return true;
                    }
                    else {
                        statistics.saved++;
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
            this.visibleRows = this.getVisibleRowsIndexes();
            consoleInfo("NEW Calculated visibleRows is: " + JSON.stringify(this.visibleRows));
            consoleInfo("Rendered: " + statistics.rendered);
            consoleInfo("Skipped Rendering: " + statistics.saved);
            statistics.rendered = 0;
            statistics.saved = 0;
        };
        Object.defineProperty(class_1.prototype, "rowHeight", {
            get: function () {
                if (!this._rowHeight) {
                    var _a = this.props, wrappedSelectorId = _a.wrappedSelectorId, itemSelector = _a.itemSelector;
                    var firstRow = document.querySelector("#" + wrappedSelectorId + " " + itemSelector);
                    if (firstRow) {
                        this._rowHeight = firstRow.clientHeight;
                        consoleInfo("Calculated rowHeight is: " + this.rowHeight);
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


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiYzAzNTMxNzQ3ZDAzZTllZGFkMSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiUmVhY3RcIixcImNvbW1vbmpzMlwiOlwicmVhY3RcIixcImNvbW1vbmpzXCI6XCJyZWFjdFwiLFwiYW1kXCI6XCJyZWFjdFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvUGVyZm9ybWFudFNjcm9sbGFibGVMaXN0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDaEVBLCtDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQSxtQ0FBK0I7QUFFL0IsSUFBTSxXQUFXLEdBQUcsVUFBQyxHQUFXO0lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsUUFBTSxHQUFLLEVBQ1gsZ0JBQWdCLENBQ2pCLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixJQUFNLFVBQVUsR0FBRztJQUNqQixRQUFRLEVBQUUsQ0FBQztJ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LFFBQVEsQ0FBQztRQUM3QixDQUFDO1FBRUgsY0FBQztJQUFELENBQUMsQ0FWc0MsS0FBSyxDQUFDLFNBQVMsR0FVcEQ7SUFnQkosK0JBQUM7Q0FBQSxDQWxMNkMsS0FBSyxDQUFDLFNBQVMsR0FrTDVEO0FBbExZLDREQUF3QiIsImZpbGUiOiJkaXN0L2luZGV4LmRlYnVnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wicmVhY3RcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcInJlYWN0XCIpKSA6IGZhY3Rvcnkocm9vdFtcIlJlYWN0XCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMF9fKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYmMwMzUzMTc0N2QwM2U5ZWRhZDEiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMF9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcInJvb3RcIjpcIlJlYWN0XCIsXCJjb21tb25qczJcIjpcInJlYWN0XCIsXCJjb21tb25qc1wiOlwicmVhY3RcIixcImFtZFwiOlwicmVhY3RcIn1cbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmNvbnN0IGNvbnNvbGVJbmZvID0gKG1zZzogc3RyaW5nKSA9PiB7XG4gIGNvbnNvbGUubG9nKFxuICAgIGAlYyAke21zZ31gLFxuICAgIFwiY29sb3I6ICMwMDc5ZjRcIixcbiAgKTtcbn07XG5cbmNvbnN0IHN0YXRpc3RpY3MgPSB7XG4gIHJlbmRlcmVkOiAwLFxuICBzYXZlZDogMCxcbn07XG5cbmludGVyZmFjZSBJUGVyZm9ybWFudFNjcm9sbGFibGVMaXN0Q29uc3VtZXJQcm9wcyB7XG4gICRpbmRleDogbnVtYmVyO1xuICBpc1Zpc2libGU6IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBJUGVyZm9ybWFudFNjcm9sbGFibGVMaXN0UHJvdmlkZXJQcm9wcyB7XG4gIHdyYXBwZWRTZWxlY3RvcklkOiBzdHJpbmc7XG4gIGl0ZW1TZWxlY3Rvcjogc3RyaW5nO1xuICBDaHVua1Jvd3NDb3VudDogbnVtYmVyO1xuICByZW5kZXIob2JqZWN0OiB7aXNWaXNpYmxlUm93KGluZGV4OiBudW1iZXIpOiBib29sZWFufSk6IEpTWC5FbGVtZW50O1xuICBnZXRTY3JvbGxhYmxlUGFyZW50Pyh3cmFwcGVkU2VsZWN0b3JJZDogc3RyaW5nKTogSFRNTEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBjbGFzcyBQZXJmb3JtYW50U2Nyb2xsYWJsZUxpc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBwdWJsaWMgc3RhdGljIFByb3ZpZGVyID0gY2xhc3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8SVBlcmZvcm1hbnRTY3JvbGxhYmxlTGlzdFByb3ZpZGVyUHJvcHMsIHt9PiB7XG5cbiAgICBwcml2YXRlIHJvb3Q6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgX3Jvd0hlaWdodDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIGxhc3RTY3JvbGxUb3AgPSAwO1xuICAgIHByaXZhdGUgc2FmZVNjcm9sbDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIFNIT1dfQUxMX1JPV1M6IHtcbiAgICAgIGZyb206IG51bWJlcixcbiAgICAgIHRvOiBudW1iZXIsXG4gICAgfSA9IHtcbiAgICAgIGZyb206IDAsXG4gICAgICB0bzogTnVtYmVyLk1BWF9WQUxVRSxcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSB2aXNpYmxlUm93czoge1xuICAgICAgZnJvbTogbnVtYmVyLFxuICAgICAgdG86IG51bWJlcixcbiAgICB9ID0gey4uLnRoaXMuU0hPV19BTExfUk9XU307XG5cbiAgICBwdWJsaWMgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHdyYXBwZWRTZWxlY3RvcklkLFxuICAgICAgICAgIGl0ZW1TZWxlY3RvcixcbiAgICAgICAgICBnZXRTY3JvbGxhYmxlUGFyZW50LFxuICAgICAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgICBjb25zdCBub2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7d3JhcHBlZFNlbGVjdG9ySWR9YCk7XG4gICAgICAgIGNvbnN0IHJvb3QgPSBnZXRTY3JvbGxhYmxlUGFyZW50ID9cbiAgICAgICAgICBnZXRTY3JvbGxhYmxlUGFyZW50KHdyYXBwZWRTZWxlY3RvcklkKSA6IFBlcmZvcm1hbnRTY3JvbGxhYmxlTGlzdC5nZXRTY3JvbGxhYmxlUGFyZW50KG5vZGUpO1xuICAgICAgICBpZiAocm9vdCkge1xuICAgICAgICAgIHRoaXMucm9vdCA9IHJvb3Q7XG4gICAgICAgICAgdGhpcy5yb290LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgdGhpcy5vblNjcm9sbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkNhbid0IGZpbmQgdGhlIHNjcm9sbGFibGUgcGFyZW50XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy52aXNpYmxlUm93cyA9IHRoaXMuZ2V0VmlzaWJsZVJvd3NJbmRleGVzKCk7XG4gICAgICAgIGNvbnNvbGVJbmZvKGBDYWxjdWxhdGVkIHZpc2libGVSb3dzIGlzOiAke0pTT04uc3RyaW5naWZ5KHRoaXMudmlzaWJsZVJvd3MpfWApO1xuICAgICAgfSwgMCk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgd3JhcHBlZFNlbGVjdG9ySWQsXG4gICAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgcmV0dXJuIHRoaXMucHJvcHMucmVuZGVyKHtcbiAgICAgICAgaXNWaXNpYmxlUm93OiAoaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgIGlmIChpbmRleCA+PSB0aGlzLnZpc2libGVSb3dzLmZyb20gJiYgaW5kZXggPD0gdGhpcy52aXNpYmxlUm93cy50bykge1xuICAgICAgICAgICAgc3RhdGlzdGljcy5yZW5kZXJlZCsrO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhdGlzdGljcy5zYXZlZCsrO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgaWYgKHRoaXMucm9vdCkge1xuICAgICAgICB0aGlzLnJvb3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCB0aGlzLm9uU2Nyb2xsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgdGhpcy52aXNpYmxlUm93cyA9IHRoaXMuZ2V0VmlzaWJsZVJvd3NJbmRleGVzKCk7XG4gICAgICBjb25zb2xlSW5mbyhgTkVXIENhbGN1bGF0ZWQgdmlzaWJsZVJvd3MgaXM6ICR7SlNPTi5zdHJpbmdpZnkodGhpcy52aXNpYmxlUm93cyl9YCk7XG5cbiAgICAgIGNvbnNvbGVJbmZvKGBSZW5kZXJlZDogJHtzdGF0aXN0aWNzLnJlbmRlcmVkfWApO1xuICAgICAgY29uc29sZUluZm8oYFNraXBwZWQgUmVuZGVyaW5nOiAke3N0YXRpc3RpY3Muc2F2ZWR9YCk7XG5cbiAgICAgIHN0YXRpc3RpY3MucmVuZGVyZWQgPSAwO1xuICAgICAgc3RhdGlzdGljcy5zYXZlZCA9IDA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXQgcm93SGVpZ2h0KCkge1xuICAgICAgaWYgKCF0aGlzLl9yb3dIZWlnaHQpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHdyYXBwZWRTZWxlY3RvcklkLFxuICAgICAgICAgIGl0ZW1TZWxlY3RvcixcbiAgICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IGZpcnN0Um93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7d3JhcHBlZFNlbGVjdG9ySWR9ICR7aXRlbVNlbGVjdG9yfWApO1xuICAgICAgICBpZiAoZmlyc3RSb3cpIHtcbiAgICAgICAgICB0aGlzLl9yb3dIZWlnaHQgPSBmaXJzdFJvdy5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgY29uc29sZUluZm8oYENhbGN1bGF0ZWQgcm93SGVpZ2h0IGlzOiAke3RoaXMucm93SGVpZ2h0fWApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLl9yb3dIZWlnaHQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblNjcm9sbCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgc2Nyb2xsVG9wLFxuICAgICAgfSA9IHRoaXMucm9vdDtcblxuICAgICAgaWYgKFxuICAgICAgICBNYXRoLmFicyhzY3JvbGxUb3AgLSB0aGlzLmxhc3RTY3JvbGxUb3ApID4gdGhpcy5yb3dIZWlnaHQgKiAodGhpcy5wcm9wcy5DaHVua1Jvd3NDb3VudCAvIDIpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5sYXN0U2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgICAgICBjb25zb2xlSW5mbyhgRk9SQ0UgUkVOREVSSU5HYCk7XG4gICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFZpc2libGVSb3dzSW5kZXhlcyA9ICgpOiB7XG4gICAgICBmcm9tOiBudW1iZXI7XG4gICAgICB0bzogbnVtYmVyO1xuICAgIH0gPT4ge1xuXG4gICAgICBpZiAoIXRoaXMucm93SGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4udGhpcy5TSE9XX0FMTF9ST1dTLFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHdyYXBwZWRTZWxlY3RvcklkLFxuICAgICAgICAgIGl0ZW1TZWxlY3RvcixcbiAgICAgICAgICBDaHVua1Jvd3NDb3VudCxcbiAgICAgICAgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IHJvd3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAjJHt3cmFwcGVkU2VsZWN0b3JJZH0gJHtpdGVtU2VsZWN0b3J9YCk7XG4gICAgICAgIGxldCBmcm9tID0gbnVsbDtcbiAgICAgICAgbGV0IHRvID0gbnVsbDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgbGV0IHJvdyA9IHJvd3NbaV07XG4gICAgICAgICAgbGV0IHBvc2l0aW9uID0gcm93LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHRoaXMucm93SGVpZ2h0O1xuICAgICAgICAgIGlmIChwb3NpdGlvbiA+PSAwICYmIHBvc2l0aW9uIDw9IHRoaXMucm9vdC5jbGllbnRIZWlnaHQpIHtcbiAgICAgICAgICAgIGlmIChmcm9tID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIGZyb20gPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoZnJvbSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdG8gPSBpIC0gMTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoW2Zyb20sIHRvXS5maWx0ZXIoeCA9PiB4ICE9PSBudWxsKS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZnJvbTogZnJvbSAtIENodW5rUm93c0NvdW50LFxuICAgICAgICAgIHRvOiB0byArIENodW5rUm93c0NvdW50LFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgc3RhdGljIENvbnN1bWVyID0gY2xhc3MgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8SVBlcmZvcm1hbnRTY3JvbGxhYmxlTGlzdENvbnN1bWVyUHJvcHMsIHt9PiB7XG5cbiAgICBwdWJsaWMgc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wczogSVBlcmZvcm1hbnRTY3JvbGxhYmxlTGlzdENvbnN1bWVyUHJvcHMpIHtcbiAgICAgIHJldHVybiBuZXh0UHJvcHMuaXNWaXNpYmxlO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICB9XG5cbiAgfTtcblxuICBwdWJsaWMgc3RhdGljIGdldFNjcm9sbGFibGVQYXJlbnQobm9kZSk6IEhUTUxFbGVtZW50IHwgbnVsbCB7XG4gICAgY29uc3QgaXNFbGVtZW50ID0gbm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50O1xuICAgIGNvbnN0IG92ZXJmbG93WSA9IGlzRWxlbWVudCAmJiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS5vdmVyZmxvd1k7XG4gICAgY29uc3QgaXNTY3JvbGxhYmxlID0gb3ZlcmZsb3dZICE9PSBcInZpc2libGVcIjtcblxuICAgIGlmICghbm9kZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIGlmIChpc1Njcm9sbGFibGUgJiYgbm9kZS5zY3JvbGxIZWlnaHQgPj0gbm9kZS5jbGllbnRIZWlnaHQpIHtcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH1cblxuICAgIHJldHVybiBQZXJmb3JtYW50U2Nyb2xsYWJsZUxpc3QuZ2V0U2Nyb2xsYWJsZVBhcmVudChub2RlLnBhcmVudE5vZGUpIHx8IGRvY3VtZW50LmJvZHk7XG4gIH1cblxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL1BlcmZvcm1hbnRTY3JvbGxhYmxlTGlzdC50c3giXSwic291cmNlUm9vdCI6IiJ9