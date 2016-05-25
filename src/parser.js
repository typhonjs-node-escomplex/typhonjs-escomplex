'use strict';

var babylon = require('babylon');

var esmRegex = /(^\s*|[}\);\n]\s*)(import\s*(['"]|(\*\s+as\s+)?[^"'\(\)\n;]+\s*from\s*['"]|\{)|export\s+\*\s+from\s+["']|export\s* (\{|default|function|class|var|const|let|async\s+function))/;

var babylonOptions = { plugins: ['asyncFunctions', 'asyncGenerators', 'classConstructorCall', 'classProperties',
    'decorators', 'doExpressions', 'exportExtensions', 'exponentiationOperator', 'flow', 'functionBind', 'functionSent',
    'jsx', 'objectRestSpread', 'trailingFunctionCommas'] };

exports.parse = parse;

function parse (source, options) {
    options = typeof options === 'object' ? options : babylonOptions;
    options.sourceType = esmRegex.test(source) ? 'module' : 'script';
    return babylon.parse(source, options);
}
