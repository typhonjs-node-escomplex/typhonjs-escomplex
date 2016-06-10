/**
 * Code complexity reporting for Mozilla-format abstract syntax trees.
 */

'use strict';

var projectHandler = require('./project');
var moduleHandler = require('typhonjs-escomplex-module');

module.exports.analyze = analyze;
module.exports.processResults = processResults;

/**
 * Public function `analyze`.
 *
 * Returns an object detailing the complexity of abstract syntax tree(s).
 *
 * @param ast {object|array}  The abstract syntax tree(s) to analyze for
 *                            code complexity.
 * @param [options] {object}  Options to modify the complexity calculation.
 *
 */
function analyze (ast, options) {
    if (Array.isArray(ast)) {
        return projectHandler.analyze(ast, options);
    }

    return moduleHandler.analyze(ast, options);
}

/**
 * Public function `processResults`.
 *
 * Given an object with an array of results, it returns results with calculated aggregate values.
 *
 * @param report {object}  The report object with an array of results for calculating aggregates.
 * @param noCoreSize {boolean} Don't compute coresize or the visibility matrix.
 *
 */
function processResults(report, noCoreSize) {
    return projectHandler.processResults(report, noCoreSize);
}
