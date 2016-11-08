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
	exports.uncontrolled = exports.themeable = exports.overridable = exports.deprecated = undefined;
	
	var _deprecated2 = __webpack_require__(1);
	
	var _deprecated3 = _interopRequireDefault(_deprecated2);
	
	var _overridable2 = __webpack_require__(3);
	
	var _overridable3 = _interopRequireDefault(_overridable2);
	
	var _themeable2 = __webpack_require__(5);
	
	var _themeable3 = _interopRequireDefault(_themeable2);
	
	var _uncontrolled2 = __webpack_require__(6);
	
	var _uncontrolled3 = _interopRequireDefault(_uncontrolled2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.deprecated = _deprecated3.default;
	exports.overridable = _overridable3.default;
	exports.themeable = _themeable3.default;
	exports.uncontrolled = _uncontrolled3.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
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
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactContextProps = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	exports.default = function () {
	  var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var designName = arguments[1];
	  return function (Target) {
	    var OverridableComponent = function (_PureComponent) {
	      _inherits(OverridableComponent, _PureComponent);
	
	      function OverridableComponent(props) {
	        _classCallCheck(this, OverridableComponent);
	
	        var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props));
	
	        _this.designName = designName || Target.displayName || Target.name;
	        _this.Component = Target;
	        return _this;
	      }
	
	      OverridableComponent.prototype.componentWillMount = function componentWillMount() {
	        this.styles = _extends({}, styles, this.props.styles);
	        this.getAndSetOverride();
	      };
	
	      OverridableComponent.prototype.componentWillUpdate = function componentWillUpdate() {
	        this.getAndSetOverride();
	      };
	
	      OverridableComponent.prototype.getAndSetOverride = function getAndSetOverride() {
	        if (!this.props.design.getOverrideFor) {
	          return;
	        }
	        var override = this.props.design.getOverrideFor(Object.assign(Target, { designName: this.designName }));
	        this.Component = override.Component;
	        this.styles = _extends({}, this.styles, override.css);
	      };
	
	      OverridableComponent.prototype.render = function render() {
	        var _props = this.props,
	            design = _props.design,
	            otherProps = _objectWithoutProperties(_props, ['design']); // eslint-disable-line
	
	
	        var props = _extends({}, otherProps, { styles: this.styles });
	        return _react2.default.createElement(this.Component, props);
	      };
	
	      return OverridableComponent;
	    }(_react.PureComponent);
	
	    OverridableComponent.displayName = Target.displayName || Target.name;
	
	    OverridableComponent.defaultProps = {
	      design: {},
	      styles: {}
	    };
	
	    return (0, _reactContextProps.withPropsFromContext)(OverridableComponent, ['design']);
	  };
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("react-context-props");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactContextProps = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var themeable = function themeable(adapter) {
	  return function (Target) {
	    var Themeable = (0, _reactContextProps.withPropsFromContext)(function (_ref) {
	      var customizations = _ref.customizations,
	          props = _objectWithoutProperties(_ref, ['customizations']);
	
	      return _react2.default.createElement(Target, _extends({}, props, customizations ? adapter(customizations, props) : {}));
	    }, ['customizations']);
	
	    Themeable.displayName = Target.displayName || Target.name;
	
	    return Themeable;
	  };
	};
	
	exports.default = themeable;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(2);
	
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
	
	        return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
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

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map