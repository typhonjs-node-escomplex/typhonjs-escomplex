'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _babylon = require('babylon');

var babylon = _interopRequireWildcard(_babylon);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var s_ESM_REGEX = /(^\s*|[}\);\n]\s*)(import\s*(['"]|(\*\s+as\s+)?[^"'\(\)\n;]+\s*from\s*['"]|\{)|export\s+\*\s+from\s+["']|export\s* (\{|default|function|class|var|const|let|async\s+function))/;

var s_BABYLON_OPTIONS = {
   plugins: ['asyncFunctions', 'asyncGenerators', 'classConstructorCall', 'classProperties', 'decorators', 'doExpressions', 'exportExtensions', 'exponentiationOperator', 'flow', 'functionBind', 'functionSent', 'jsx', 'objectRestSpread', 'trailingFunctionCommas']
};

var Parser = function () {
   function Parser() {
      _classCallCheck(this, Parser);
   }

   _createClass(Parser, null, [{
      key: 'parse',
      value: function parse(source, options) {
         options = (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' ? options : s_BABYLON_OPTIONS;
         options.sourceType = s_ESM_REGEX.test(source) ? 'module' : 'script';
         return babylon.parse(source, options);
      }
   }]);

   return Parser;
}();

exports.default = Parser;
module.exports = exports['default'];