'use strict';

import * as babylon from 'babylon';

const s_ESM_REGEX = /(^\s*|[}\);\n]\s*)(import\s*(['"]|(\*\s+as\s+)?[^"'\(\)\n;]+\s*from\s*['"]|\{)|export\s+\*\s+from\s+["']|export\s* (\{|default|function|class|var|const|let|async\s+function))/;

const s_BABYLON_OPTIONS =
{
   plugins: ['asyncFunctions', 'asyncGenerators', 'classConstructorCall', 'classProperties',
    'decorators', 'doExpressions', 'exportExtensions', 'exponentiationOperator', 'flow', 'functionBind', 'functionSent',
     'jsx', 'objectRestSpread', 'trailingFunctionCommas']
};

export default class Parser
{
   static parse(source, options)
   {
      options = typeof options === 'object' ? options : s_BABYLON_OPTIONS;
      options.sourceType = s_ESM_REGEX.test(source) ? 'module' : 'script';
      return babylon.parse(source, options);
   }
}

