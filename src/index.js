'use strict';

var parser = require('./parser');

var core = require('./core');

exports.analyze = analyze;

function analyze (source, options, parserOptions) {
    if (Array.isArray(source)) {
        return analyzeSources(source, options, parserOptions);
    }

    return analyzeSource(source, options, parserOptions);
}

function analyzeSources (sources, options, parserOptions) {
    return performAnalysis(
        sources.map(
            mapSource.bind(null, options, parserOptions)
        ).filter(filterSource),
        options
    );
}

function mapSource (options, parserOptions, source) {
    try {
        return {
            path: source.path,
            ast: getSyntaxTree(source.code, parserOptions)
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

function getSyntaxTree (source, parserOptions) {
    return parser.parse(source, parserOptions);
}

function performAnalysis (ast, options) {
    return core.analyze(ast, options);
}

function analyzeSource (source, options, parserOptions) {
    return performAnalysis(getSyntaxTree(source, parserOptions), options);
}
