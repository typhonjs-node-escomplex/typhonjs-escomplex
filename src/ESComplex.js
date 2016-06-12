'use strict';

import ESComplexModule  from 'typhonjs-escomplex-module/src/ESComplexModule.js';
import ESComplexProject from 'typhonjs-escomplex-project/src/ESComplexProject.js';

import Parser           from './Parser.js';

/**
 * Next generation code complexity reporting for Javascript abstract syntax trees (AST).
 */
export default class ESComplex
{
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
   constructor(options = {})
   {
      if (typeof options !== 'object') { throw new TypeError('ctor error: `options` is not an `object`.')}

      this._escomplexModule = new ESComplexModule(options.module);
      this._escomplexProject = new ESComplexProject(options);
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
   analyze(source, options, parserOptions)
   {
      if (typeof source !== 'string') { throw new TypeError('analyze error: `source` is not a `string`.'); }

      return this._escomplexModule.analyze(Parser.parse(source, parserOptions), options);
   }

   /**
    * Processes the given ast and calculates metrics via plugins.
    *
    * @param {object|Array}   ast - Javascript AST.
    * @param {object}         options - (Optional) module analyze options.
    *
    * @returns {object} - A single module report.
    */
   analyzeAST(ast, options)
   {
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
   analyzeProject(sources, options, parserOptions)
   {
      // Parse sources and map entries to include `ast` entry from `code`.
      const modules = sources.map((source) =>
      {
         try
         {
            return { ast: Parser.parse(source.code, parserOptions), path: source.path };
         }
         catch (error)
         {
            if (options.ignoreErrors) { return null; }

            error.message = `${source.path}: ${error.message}`;
            throw error;
         }
      })
      .filter((source) => !!source);

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
   analyzeProjectAST(modules, options)
   {
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
   parse(source, options)
   {
      return Parser.parse(source, options);
   }

   /**
    * Processes existing project results and calculates metrics via plugins.
    *
    * @param {object}   results - An object hash with a `reports` entry that is an Array of module results.
    * @param {object}   options - (Optional) project processing options.
    *
    * @returns {{reports: Array<{}>}} - An object hash with a `reports` entry that is an Array of module results.
    */
   processProjectResults(results, options)
   {
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
   analyzeThen(source, options, parserOptions)
   {
      return new Promise((resolve, reject) =>
      {
         try { resolve(this.analyze(source, options, parserOptions)); }
         catch (err) { reject(err); }
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
   analyzeASTThen(ast, options)
   {
      return new Promise((resolve, reject) =>
      {
         try { resolve(this.analyzeAST(ast, options)); }
         catch (err) { reject(err); }
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
   analyzeProjectThen(sources, options, parserOptions)
   {
      return new Promise((resolve, reject) =>
      {
         try { resolve(this.analyzeProject(sources, options, parserOptions)); }
         catch (err) { reject(err); }
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
   analyzeProjectASTThen(modules, options)
   {
      return new Promise((resolve, reject) =>
      {
         try { resolve(this.analyzeProjectAST(modules, options)); }
         catch (err) { reject(err); }
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
   parseThen(source, options)
   {
      return new Promise((resolve, reject) =>
      {
         try { resolve(this.parse(source, options)); }
         catch (err) { reject(err); }
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
   processProjectResultsThen(results, options)
   {
      return new Promise((resolve, reject) =>
      {
         try { resolve(this.processProjectResults(results, options)); }
         catch (err) { reject(err); }
      });
   }
}
