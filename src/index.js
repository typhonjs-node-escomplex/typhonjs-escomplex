/*globals require, exports */
'use strict';

var espree = require('espree');

var core = require('escomplex-core/src/core');
var walker = require('escomplex-core/src/walker');

var esmRegex = /(^\s*|[}\);\n]\s*)(import\s*(['"]|(\*\s+as\s+)?[^"'\(\)\n;]+\s*from\s*['"]|\{)|export\s+\*\s+from\s+["']|export\s* (\{|default|function|class|var|const|let|async\s+function))/;

var espreeOptions = { loc: true, ecmaVersion: 6, ecmaFeatures: {} };
var espreeESMOptions = { loc: true, ecmaVersion: 6, sourceType: 'module', ecmaFeatures: {} };

exports.analyse = analyse;

function analyse (source, options) {
    if (Array.isArray(source)) {
        return analyseSources(source, options);
    }

    return typeof source === 'string' ? analyseSource(source, options) : void 0;
}

function analyseSources (sources, options) {
    return performAnalysis(
        sources.map(
            mapSource.bind(null, options)
        ).filter(filterSource),
        options
    );
}

function mapSource (options, source) {
    try {
        return {
            path: source.path,
            ast: getSyntaxTree(source.code)
        };
    } catch (error) {
        if (options.ignoreErrors) {
            return null;
        }

        error.message = source.path + ': ' + error.message;
        throw error;
    }
}

function filterSource (source) {
    return !!source;
}

function getSyntaxTree (source) {
    var options = esmRegex.test(source) ? espreeESMOptions : espreeOptions;
    return espree.parse(source, options);
}

function performAnalysis (ast, options) {
    return core.analyse(ast, walker, options);
}

function analyseSource (source, options) {
    return performAnalysis(getSyntaxTree(source), options);
}
