/*globals require, exports */
'use strict';

var check = require('check-types');
var esprima = require('esprima');
var walker = require('escomplex-core/src/walker');
var core = require('escomplex-core/src/core');

var esmRegex = /(^\s*|[}\);\n]\s*)(import\s*(['"]|(\*\s+as\s+)?[^"'\(\)\n;]+\s*from\s*['"]|\{)|export\s+\*\s+from\s+["']|export\s* (\{|default|function|class|var|const|let|async\s+function))/;

var es5Options = { loc: true };

var esmOptions = { loc: true, sourceType: 'module' };

exports.analyse = analyse;

function analyse (source, options) {
    if (check.array(source)) {
        return analyseSources(source, options);
    }

    return analyseSource(source, options);
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
    var options = esmRegex.test(source) ? esmOptions : es5Options;

    return esprima.parse(source, options);
}

function performAnalysis (ast, options) {
    return core.analyse(ast, walker, options);
}

function analyseSource (source, options) {
    return performAnalysis(getSyntaxTree(source), options);
}
