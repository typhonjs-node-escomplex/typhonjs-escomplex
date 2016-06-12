'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
   /**
    * Initializes ESComplex.
    *
    * @param {object}   options - module and project options including user plugins to load including:
    * ```
    * (object)             module - Provides an object hash of the following options for the module runtime:
    *    (boolean)         loadDefaultPlugins - When false ESComplexProject will not load any default plugins.
    *    (Array<Object>)   plugins - A list of ESComplexModule plugins that have already been instantiated.
    *
    * (object)             project - Provides an object hash of the following options for the project runtime:
    *    (boolean)         loadDefaultPlugins - When false ESComplexProject will not load any default plugins.
    *    (Array<Object>)   plugins - A list of ESComplexProject plugins that have already been instantiated.
    * ```
    */

   function ESComplex() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      _classCallCheck(this, ESComplex);

      if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
         throw new TypeError('ctor error: `options` is not an `object`.');
      }

      this._escomplexModule = new _ESComplexModule2.default(options.module);
      this._escomplexProject = new _ESComplexProject2.default(options);
   }

   /**
    * Parses the given source code then processes the generated AST and calculates metrics via plugins.
    *
    * @param {string}   source - Javascript source code.
    * @param {object}   options - (Optional) module analyze options.
    * @param {object}   parserOptions - (Optional) overrides default babylon parser options.
    *
    * @returns {object} - A single module report.
    */


   _createClass(ESComplex, [{
      key: 'analyze',
      value: function analyze(source, options, parserOptions) {
         if (typeof source !== 'string') {
            throw new TypeError('analyze error: `source` is not a `string`.');
         }

         return this._escomplexModule.analyze(_Parser2.default.parse(source, parserOptions), options);
      }

      /**
       * Processes the given ast and calculates metrics via plugins.
       *
       * @param {object|Array}   ast - Javascript AST.
       * @param {object}         options - (Optional) module analyze options.
       *
       * @returns {object} - A single module report.
       */

   }, {
      key: 'analyzeAST',
      value: function analyzeAST(ast, options) {
         return this._escomplexModule.analyze(ast, options);
      }

      /**
       * Processes the given sources and calculates project metrics via plugins.
       *
       * @param {Array}    sources - Array of object hashes containing `code` and `path` entries.
       * @param {object}   options - (Optional) project processing options.
       * @param {object}   parserOptions - (Optional) overrides default babylon parser options.
       *
       * @returns {{reports: Array<{}>}} - An object hash with a `reports` entry that is an Array of module results.
       */

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
       * Processes the given modules and calculates project metrics via plugins.
       *
       * @param {Array}    modules - Array of object hashes containing `ast` and `path` entries.
       * @param {object}   options - (Optional) project processing options.
       *
       * @returns {{reports: Array<{}>}} - An object hash with a `reports` entry that is an Array of module results.
       */

   }, {
      key: 'analyzeProjectAST',
      value: function analyzeProjectAST(modules, options) {
         return this._escomplexProject.analyze(modules, options);
      }

      /**
       * Provides a convenience method to parse the given source code and return the babylon AST.
       *
       * @param {string}   source - Javascript source code.
       * @param {object}   options - (Optional) overrides default babylon parser options.
       *
       * @returns {object} - babylon generated AST.
       */

   }, {
      key: 'parse',
      value: function parse(source, options) {
         return _Parser2.default.parse(source, options);
      }

      /**
       * Processes existing project results and calculates metrics via plugins.
       *
       * @param {object}   results - An object hash with a `reports` entry that is an Array of module results.
       * @param {object}   options - (Optional) project processing options.
       *
       * @returns {{reports: Array<{}>}} - An object hash with a `reports` entry that is an Array of module results.
       */

   }, {
      key: 'processProjectResults',
      value: function processProjectResults(results, options) {
         return this._escomplexProject.processResults(results, options);
      }

      // Asynchronous Promise based methods ----------------------------------------------------------------------------

      /**
       * Parses the given source code then processes the generated AST and calculates metrics via plugins.
       *
       * @param {string}   source - Javascript source code.
       * @param {object}   options - (Optional) module analyze options.
       * @param {object}   parserOptions - (Optional) overrides default babylon parser options.
       *
       * @returns {object} - A single module report.
       */

   }, {
      key: 'analyzeThen',
      value: function analyzeThen(source, options, parserOptions) {
         var _this = this;

         return new Promise(function (resolve, reject) {
            try {
               resolve(_this.analyze(source, options, parserOptions));
            } catch (err) {
               reject(err);
            }
         });
      }

      /**
       * Processes the given ast and calculates metrics via plugins.
       *
       * @param {object|Array}   ast - Javascript AST.
       * @param {object}         options - (Optional) module analyze options.
       *
       * @returns {Promise<object>} - A single module report.
       */

   }, {
      key: 'analyzeASTThen',
      value: function analyzeASTThen(ast, options) {
         var _this2 = this;

         return new Promise(function (resolve, reject) {
            try {
               resolve(_this2.analyzeAST(ast, options));
            } catch (err) {
               reject(err);
            }
         });
      }

      /**
       * Processes the given sources and calculates project metrics via plugins.
       *
       * @param {Array}    sources - Array of object hashes containing `code` and `path` entries.
       * @param {object}   options - (Optional) project processing options.
       * @param {object}   parserOptions - (Optional) overrides default babylon parser options.
       *
       * @returns {Promise<{reports: Array<{}>}>} - An object hash with a `reports` entry that is an Array of module
       *                                            results.
       */

   }, {
      key: 'analyzeProjectThen',
      value: function analyzeProjectThen(sources, options, parserOptions) {
         var _this3 = this;

         return new Promise(function (resolve, reject) {
            try {
               resolve(_this3.analyzeProject(sources, options, parserOptions));
            } catch (err) {
               reject(err);
            }
         });
      }

      /**
       * Processes the given modules and calculates project metrics via plugins.
       *
       * @param {Array}    modules - Array of object hashes containing `ast` and `path` entries.
       * @param {object}   options - (Optional) project processing options.
       *
       * @returns {Promise<{reports: Array<{}>}>} - An object hash with a `reports` entry that is an Array of module
       *                                            results.
       */

   }, {
      key: 'analyzeProjectASTThen',
      value: function analyzeProjectASTThen(modules, options) {
         var _this4 = this;

         return new Promise(function (resolve, reject) {
            try {
               resolve(_this4.analyzeProjectAST(modules, options));
            } catch (err) {
               reject(err);
            }
         });
      }

      /**
       * Provides a convenience method to parse the given source code and return the babylon AST.
       *
       * @param {string}   source - Javascript source code.
       * @param {object}   options - (Optional) overrides default babylon parser options.
       *
       * @returns {Promise<object>} - babylon generated AST.
       */

   }, {
      key: 'parseThen',
      value: function parseThen(source, options) {
         var _this5 = this;

         return new Promise(function (resolve, reject) {
            try {
               resolve(_this5.parse(source, options));
            } catch (err) {
               reject(err);
            }
         });
      }

      /**
       * Processes existing project results and calculates metrics via plugins.
       *
       * @param {object}   results - An object hash with a `reports` entry that is an Array of module results.
       * @param {object}   options - (Optional) project processing options.
       *
       * @returns {Promise<{reports: Array<{}>}>} - An object hash with a `reports` entry that is an Array of module
       *                                            results.
       */

   }, {
      key: 'processProjectResultsThen',
      value: function processProjectResultsThen(results, options) {
         var _this6 = this;

         return new Promise(function (resolve, reject) {
            try {
               resolve(_this6.processProjectResults(results, options));
            } catch (err) {
               reject(err);
            }
         });
      }
   }]);

   return ESComplex;
}();

exports.default = ESComplex;
module.exports = exports['default'];