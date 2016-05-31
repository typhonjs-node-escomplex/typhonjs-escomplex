/**
 * Code complexity reporting for Mozilla-format abstract syntax trees.
 */

'use strict';

var projectHandler = require('./project');
var moduleHandler = require('escomplex-core');

module.exports.analyse = analyse;
module.exports.processResults = processResults;

/**
 * Public function `analyse`.
 *
 * Returns an object detailing the complexity of abstract syntax tree(s).
 *
 * @param ast {object|array}  The abstract syntax tree(s) to analyse for
 *                            code complexity.
 * @param [options] {object}  Options to modify the complexity calculation.
 *
 */
function analyse(ast, options) {
  if (Array.isArray(ast)) {
    return projectHandler.analyse(ast, options);
  }

  return moduleHandler.analyse(ast, options);
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