'use strict';

import ESComplexModule  from 'typhonjs-escomplex-module/src/ESComplexModule.js';
import ESComplexProject from 'typhonjs-escomplex-project/src/ESComplexProject.js';

import Parser           from './Parser.js';

/**
 * Next generation code complexity reporting for Javascript abstract syntax trees (AST).
 */
export default class ESComplex
{
   constructor(options = {})
   {
      this._escomplexModule = new ESComplexModule(options);
      this._escomplexProject = new ESComplexProject(options);
   }

   analyze(source, options, parserOptions)
   {
      return this._escomplexModule.analyze(Parser.parse(source, parserOptions), options);
   }

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
    * Public function `processProjectResults`.
    *
    * Given an object with an array of results, it returns results with calculated aggregate values.
    *
    * @param {object}   results - The report object with an array of results for calculating aggregates.
    * @param {object}   options - Options for `typhonjs-escomplex-project`
    *
    */
   processProjectResults(results, options = {})
   {
      return this._escomplexProject.processResults(results, options);
   }
}
