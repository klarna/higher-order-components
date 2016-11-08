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
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	exports.default = function (_ref) {
	  var defaultProp = _ref.defaultProp,
	      handlerName = _ref.handlerName,
	      handlerSelector = _ref.handlerSelector,
	      prop = _ref.prop,
	      resetHandlerName = _ref.resetHandlerName;
	  return function (Target) {
	    var Uncontrolled = function (_PureComponent) {
	      _inherits(Uncontrolled, _PureComponent);
	
	      function Uncontrolled() {
	        _classCallCheck(this, Uncontrolled);
	
	        var _this = _possibleConstructorReturn(this, _PureComponent.call(this));
	
	        _this.handleHandler = _this.handleHandler.bind(_this);
	        _this.handleReset = _this.handleReset.bind(_this);
	        return _this;
	      }
	
	      Uncontrolled.prototype.componentDidMount = function componentDidMount() {
	        this.setState(_defineProperty({}, prop, this.props[prop] != null ? this.props[prop] : this.props[defaultProp]));
	      };
	
	      Uncontrolled.prototype.handleHandler = function handleHandler(e) {
	        if (this.props[prop] == null) {
	          this.setState(_defineProperty({}, prop, handlerSelector ? handlerSelector(e) : e));
	        }
	
	        this.props[handlerName] && this.props[handlerName](e);
	      };
	
	      Uncontrolled.prototype.handleReset = function handleReset(e) {
	        if (this.props[prop] == null) {
	          this.setState(_defineProperty({}, prop, undefined));
	        }
	
	        this.props[resetHandlerName] && this.props[resetHandlerName](e);
	      };
	
	      Uncontrolled.prototype.render = function render() {
	        var _this2 = this;
	
	        var props = _extends({}, Object.keys(this.props).filter(function (key) {
	          return key !== defaultProp;
	        }).reduce(function (copiedProps, propName) {
	          copiedProps[propName] = _this2.props[propName];
	          return copiedProps;
	        }, {}), _defineProperty({}, handlerName, this.handleHandler), resetHandlerName ? _defineProperty({}, resetHandlerName, this.handleReset) : {});
	
	        return _react2.default.createElement(Target, _extends({}, this.state, props));
	      };
	
	      return Uncontrolled;
	    }(_react.PureComponent);
	
	    Uncontrolled.displayName = Target.displayName || Target.name;
	
	    return Uncontrolled;
	  };
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ }
/******/ ]);
//# sourceMappingURL=uncontrolled.js.map