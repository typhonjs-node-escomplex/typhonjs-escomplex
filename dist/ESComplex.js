'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ESComplexModule = require('typhonjs-escomplex-module/dist/ESComplexModule.js');

var _ESComplexModule2 = _interopRequireDefault(_ESComplexModule);

var _ESComplexProject = require('typhonjs-escomplex-project/dist/ESComplexProject.js');

var _ESComplexProject2 = _interopRequireDefault(_ESComplexProject);

var _Parser = require('./Parser.js');

var _Parser2 = _interopRequireDefault(_Parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Next generation code complexity reporting for Javascript abstract syntax trees (AST).
 */

var ESComplex = function () {
   function ESComplex() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      _classCallCheck(this, ESComplex);

      this._escomplexModule = new _ESComplexModule2.default(options);
      this._escomplexProject = new _ESComplexProject2.default(options);
   }

   _createClass(ESComplex, [{
      key: 'analyze',
      value: function analyze(source, options, parserOptions) {
         return this._escomplexModule.analyze(_Parser2.default.parse(source, parserOptions), options);
      }
   }, {
      key: 'analyzeProject',
      value: function analyzeProject(sources, options, parserOptions) {
         // Parse sources and map entries to include `ast` entry from `code`.
         var modules = sources.map(function (source) {
            try {
               return { ast: _Parser2.default.parse(source.code, parserOptions), path: source.path };
            } catch (error) {
               if (options.ignoreErrors) {
                  return null;
               }

               error.message = source.path + ': ' + error.message;
               throw error;
            }
         }).filter(function (source) {
            return !!source;
         });

         return this._escomplexProject.analyze(modules, options);
      }

      /**
       * Public function `processProjectResults`.
       *
       * Given an object with an array of results, it returns results with calculated aggregate values.
       *
       * @param {object}   results - The report object with an array of results for calculating aggregates.
       * @param {object}   options - Options for `typhonjs-escomplex-project`
       *
       */

   }, {
      key: 'processProjectResults',
      value: function processProjectResults(results) {
         var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

         return this._escomplexProject.processResults(results, options);
      }
   }]);

   return ESComplex;
}();

exports.default = ESComplex;
module.exports = exports['default'];