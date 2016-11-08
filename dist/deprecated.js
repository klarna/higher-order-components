module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var deprecate = function deprecate(_ref) {
	  var name = _ref.name,
	      useInstead = _ref.useInstead,
	      readMore = _ref.readMore;
	  return console && console.error && console.error('Warning: \'' + name + '\' is deprecated and will be removed in the next major version.' + (useInstead ? '\nUse \'' + useInstead + '\' instead.' : '') + (readMore ? '\nRead more on ' + readMore : ''));
	};
	
	exports.default = function (_ref2) {
	  var name = _ref2.name,
	      useInstead = _ref2.useInstead,
	      readMore = _ref2.readMore;
	  return function (Target) {
	    function Deprecated(props) {
	      deprecate({
	        name: name || Target.displayName || Target.name,
	        useInstead: useInstead,
	        readMore: readMore
	      });
	
	      return _react2.default.createElement(Target, props);
	    }
	
	    Deprecated.displayName = Target.displayName || Target.name;
	
	    return Deprecated;
	  };
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ }
/******/ ]);
//# sourceMappingURL=deprecated.js.map