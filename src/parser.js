'use strict';

var espree = require('espree');

var esmRegex = /(^\s*|[}\);\n]\s*)(import\s*(['"]|(\*\s+as\s+)?[^"'\(\)\n;]+\s*from\s*['"]|\{)|export\s+\*\s+from\s+["']|export\s* (\{|default|function|class|var|const|let|async\s+function))/;

var espreeOptions = { loc: true, ecmaVersion: 6, ecmaFeatures: { jsx: true } };
var espreeESMOptions = { loc: true, ecmaVersion: 6, sourceType: 'module', ecmaFeatures: { jsx: true } };

exports.parse = parse;

function parse (source, options) {
    options = typeof options === 'object' ? options : esmRegex.test(source) ? espreeESMOptions : espreeOptions;
    return espree.parse(source, options);
}
