'use strict';

var parser = require('./parser');

var core = require('./core');

exports.analyse = analyse;

function analyse(source, options, parserOptions) {
    if (Array.isArray(source)) {
        return analyseSources(source, options, parserOptions);
    }

    return analyseSource(source, options, parserOptions);
}

function analyseSources(sources, options, parserOptions) {
    return performAnalysis(sources.map(mapSource.bind(null, options, parserOptions)).filter(filterSource), options);
}

function mapSource(options, parserOptions, source) {
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

function filterSource(source) {
    return !!source;
}

function getSyntaxTree(source, parserOptions) {
    return parser.parse(source, parserOptions);
}

function performAnalysis(ast, options) {
    return core.analyse(ast, options);
}

function analyseSource(source, options, parserOptions) {
    return performAnalysis(getSyntaxTree(source, parserOptions), options);
}