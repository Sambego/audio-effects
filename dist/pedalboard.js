/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _hasAudioContext = __webpack_require__(1);

	var _Input = __webpack_require__(2);

	var _Input2 = _interopRequireDefault(_Input);

	var _Output = __webpack_require__(5);

	var _Output2 = _interopRequireDefault(_Output);

	var _Volume = __webpack_require__(6);

	var _Volume2 = _interopRequireDefault(_Volume);

	var _Distortion = __webpack_require__(7);

	var _Distortion2 = _interopRequireDefault(_Distortion);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var defaultConfig = {};

	var Pedalboard = function () {
	    function Pedalboard(c) {
	        _classCallCheck(this, Pedalboard);

	        if (!_hasAudioContext.hasAudioContext) {
	            throw new Error('Your browser can not create an audioContext, please upgrade or use another browser!');
	        }

	        this.config = Object.assign({}, defaultConfig, c);
	        this.audioContext = new AudioContext();
	    }

	    _createClass(Pedalboard, [{
	        key: 'input',
	        value: function input() {
	            return new _Input2.default(this.audioContext);
	        }
	    }, {
	        key: 'output',
	        value: function output() {
	            return new _Output2.default(this.audioContext);
	        }
	    }, {
	        key: 'volume',
	        value: function volume() {
	            return new _Volume2.default(this.audioContext);
	        }
	    }, {
	        key: 'distortion',
	        value: function distortion() {
	            return new _Distortion2.default(this.audioContext);
	        }
	    }]);

	    return Pedalboard;
	}();

	exports.default = Pedalboard;
	;

	// Put the class on the window for temporary testing purposes
	!function () {
	    window.Pedalboard = Pedalboard;
	}();

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	                      value: true
	});
	window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;

	var hasAudioContext = exports.hasAudioContext = !!window.AudioContext;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _SingleAudioNode2 = __webpack_require__(3);

	var _SingleAudioNode3 = _interopRequireDefault(_SingleAudioNode2);

	var _hasGetUserMedia = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Input = function (_SingleAudioNode) {
	    _inherits(Input, _SingleAudioNode);

	    function Input() {
	        _classCallCheck(this, Input);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Input).apply(this, arguments));
	    }

	    _createClass(Input, [{
	        key: 'getUserMedia',
	        value: function getUserMedia() {
	            var _this2 = this;

	            return new Promise(function (resolve, reject) {
	                if (_hasGetUserMedia.hasGetUserMedia) {
	                    navigator.getUserMedia({
	                        audio: true
	                    }, function (stream) {
	                        _this2._node = _this2._audioContext.createMediaStreamSource(stream);

	                        resolve(stream);
	                    }, function (e) {
	                        reject(e);
	                    });
	                } else {
	                    reject('Your browser does not support the use of user-media, please upgrade or use another browser!');
	                }
	            });
	        }
	    }, {
	        key: 'node',
	        get: function get() {
	            return this._node;
	        },
	        set: function set(stream) {
	            this._node = this._audioContext.createMediaStreamSource(input);

	            return this._node;
	        }
	    }]);

	    return Input;
	}(_SingleAudioNode3.default);

	exports.default = Input;
	;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SingleAudioNode = function () {
	    function SingleAudioNode(audioContext) {
	        _classCallCheck(this, SingleAudioNode);

	        this._audioContext = audioContext;
	    }

	    _createClass(SingleAudioNode, [{
	        key: "connect",
	        value: function connect(node) {
	            // Check if the node is one created by pedalboard.js
	            //  otherwise assume it's a native one.
	            if (node.node) {
	                this._node.connect(node.node);
	            } else {
	                this._node.connect(node);
	            }

	            return node;
	        }
	    }, {
	        key: "disconnect",
	        value: function disconnect() {
	            this._node.disco;

	            return this._node;nnect();
	        }
	    }, {
	        key: "node",
	        get: function get() {
	            return this._node;
	        },
	        set: function set(node) {
	            return this._node = node;
	        }
	    }]);

	    return SingleAudioNode;
	}();

	exports.default = SingleAudioNode;
	;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	                         value: true
	});
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	var hasGetUserMedia = exports.hasGetUserMedia = !!navigator.getUserMedia;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _SingleAudioNode2 = __webpack_require__(3);

	var _SingleAudioNode3 = _interopRequireDefault(_SingleAudioNode2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Output = function (_SingleAudioNode) {
	    _inherits(Output, _SingleAudioNode);

	    function Output(audioContext) {
	        _classCallCheck(this, Output);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Output).call(this, audioContext));

	        if (_this._audioContext) {
	            _this._node = audioContext.destination;
	        }
	        return _this;
	    }

	    return Output;
	}(_SingleAudioNode3.default);

	exports.default = Output;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _SingleAudioNode2 = __webpack_require__(3);

	var _SingleAudioNode3 = _interopRequireDefault(_SingleAudioNode2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Volume = function (_SingleAudioNode) {
	    _inherits(Volume, _SingleAudioNode);

	    function Volume(audioContext) {
	        _classCallCheck(this, Volume);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Volume).call(this, audioContext));

	        _this._level = 1;
	        _this._mute = false;

	        _this._node = _this._audioContext.createGain();
	        _this._node.gain.value = _this._level;
	        return _this;
	    }

	    _createClass(Volume, [{
	        key: 'level',
	        set: function set(volume) {
	            var vol = parseFloat(volume);
	            vol = vol >= 0 ? vol : 0;

	            this._level = vol;
	            this._mute = vol === 0;
	            this._node.gain.value = vol;

	            return this._level;
	        },
	        get: function get() {
	            return this._level;
	        }
	    }, {
	        key: 'mute',
	        set: function set(mute) {
	            this._mute = !!mute;
	            this._node.gain.value = this._mute ? 0 : this._level;

	            return this._mute;
	        },
	        get: function get() {
	            return this._mute;
	        }
	    }]);

	    return Volume;
	}(_SingleAudioNode3.default);

	exports.default = Volume;
	;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _MultiAudioNode2 = __webpack_require__(8);

	var _MultiAudioNode3 = _interopRequireDefault(_MultiAudioNode2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _waveshaperNode = undefined,
	    _gainNode = undefined,
	    _biquadFilterNode = undefined;

	var _calculateDistortionCurve = function _calculateDistortionCurve(intens) {
	    var intensity = i || 150,
	        amount = 44100,
	        deg = Math.PI / 180;

	    var curve = new Float32Array(amount),
	        i = 0,
	        x = undefined;

	    for (; i < amount; ++i) {
	        x = i * 2 / amount - 1;
	        curve[i] = (3 + intensity) * x * 20 * deg / (Math.PI + intensity * Math.abs(x));
	    }

	    return curve;
	};

	var Distortion = function (_MultiAudioNode) {
	    _inherits(Distortion, _MultiAudioNode);

	    function Distortion(audioContext) {
	        _classCallCheck(this, Distortion);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Distortion).call(this, audioContext));

	        _this2._intensity = 150;
	        _this2._gain = 120;
	        _this2._lowPassFilter = false;

	        _waveshaperNode = _this2._audioContext.createWaveShaper();
	        _waveshaperNode.oversample = '4x';

	        _gainNode = _this2._audioContext.createGain();

	        _biquadFilterNode = _this2._audioContext.createBiquadFilter();
	        _biquadFilterNode.type = 'lowpass';
	        _biquadFilterNode.frequency.value = 2000;

	        _waveshaperNode.connect(_gainNode);
	        _gainNode.connect(_biquadFilterNode);

	        _this2._node = _waveshaperNode;
	        _this2._outputNode = _biquadFilterNode;
	        return _this2;
	    }

	    _createClass(Distortion, [{
	        key: 'intensity',
	        get: function get() {
	            return this._intensity;
	        },
	        set: function set(intensity) {
	            this._intensity = parseInt(intensity);
	            this._waveshaperNode.curve = _calculateDistortionCurve(this._intensity);

	            return this._intensity;
	        }
	    }, {
	        key: 'gain',
	        get: function get() {
	            return this._gain;
	        },
	        set: function set(gain) {
	            this._gain = parseFloat(gain);
	            this._gainNode.gain.value = this._gain;

	            return this._gain;
	        }
	    }, {
	        key: 'lowPassFilter',
	        get: function get() {
	            return this._lowPassFilter;
	        },
	        set: function set(lowPassFilter) {
	            this._lowPassFilter = !!lowPassFilter;
	            this._biquadFilterNode.frequency.value = _this.lowPassFilter ? 2000 : 1000;

	            return this._lowPassFilter;
	        }
	    }]);

	    return Distortion;
	}(_MultiAudioNode3.default);

	exports.default = Distortion;
	;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _SingleAudioNode2 = __webpack_require__(3);

	var _SingleAudioNode3 = _interopRequireDefault(_SingleAudioNode2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MultiAudioNode = function (_SingleAudioNode) {
	    _inherits(MultiAudioNode, _SingleAudioNode);

	    function MultiAudioNode() {
	        _classCallCheck(this, MultiAudioNode);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(MultiAudioNode).apply(this, arguments));
	    }

	    _createClass(MultiAudioNode, [{
	        key: 'connect',
	        value: function connect(node) {
	            // Check if the node is one created by pedalboard.js
	            //  otherwise assume it's a native one.
	            if (node.node) {
	                this._outputNode.connect(node.node);
	            } else {
	                this._outputNode.connect(node);
	            }

	            return node;
	        }
	    }, {
	        key: 'disconnect',
	        value: function disconnect() {
	            this._outputNode.disconnect();

	            return this._outputNode;
	        }
	    }, {
	        key: 'output',
	        get: function get() {
	            return this._node;
	        },
	        set: function set(output) {
	            return this._outputNode = output;
	        }
	    }]);

	    return MultiAudioNode;
	}(_SingleAudioNode3.default);

	exports.default = MultiAudioNode;
	;

/***/ }
/******/ ]);