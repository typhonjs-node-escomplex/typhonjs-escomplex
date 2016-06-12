'use strict';

import * as babylon from 'babylon';

/**
 * Provides a comprehensive regex test to determine if source code is an ES Module.
 * @type {RegExp}
 */
const s_ESM_REGEX = /(^\s*|[}\);\n]\s*)(import\s*(['"]|(\*\s+as\s+)?[^"'\(\)\n;]+\s*from\s*['"]|\{)|export\s+\*\s+from\s+["']|export\s* (\{|default|function|class|var|const|let|async\s+function))/;

/**
 * Default bablyon options applying all available plugins.
 * @type {{plugins: string[]}}
 */
const s_BABYLON_OPTIONS =
{
   plugins: ['asyncFunctions', 'asyncGenerators', 'classConstructorCall', 'classProperties',
    'decorators', 'doExpressions', 'exportExtensions', 'exponentiationOperator', 'flow', 'functionBind', 'functionSent',
     'jsx', 'objectRestSpread', 'trailingFunctionCommas']
};

/**
 * Provides a convenience wrapper around babylon applying an ES Modules regex test to automatically set `sourceType`
 * to `script` or `module`.
 */
export default class Parser
{
   /**
    * Parses the given source with babylon.
    *
    * @param {string}   source - Javascript source code to parse.
    * @param {object}   options - (Optional) overrides default babylon parser options.
    *
    * @returns {object}
    */
   static parse(source, options)
   {
      options = typeof options === 'object' ? options : s_BABYLON_OPTIONS;
      options.sourceType = s_ESM_REGEX.test(source) ? 'module' : 'script';
      return babylon.parse(source, options);
   }
}

