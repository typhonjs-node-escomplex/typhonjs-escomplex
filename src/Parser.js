import * as babylon from '@babel/parser';

/**
 * Default babylon options applying most available plugins.
 *
 * Caveats include:
 * - that both decorators and decorators-legacy can not be used simultaneously.
 * - that both 'flow' and 'typescript' can not be used simultaneously
 *
 * @type {{plugins: string[]}}
 * @ignore
 */
const s_BABYLON_OPTIONS =
{
   plugins: ['asyncGenerators', 'bigInt', 'classProperties', 'classPrivateProperties', 'classPrivateMethods',
    ['decorators', { decoratorsBeforeExport: false }], 'doExpressions', 'dynamicImport',
     'exportDefaultFrom', 'exportNamespaceFrom',  'functionBind', 'functionSent', 'importMeta',
      'jsx', 'logicalAssignment', 'nullishCoalescingOperator', 'numericSeparator', 'objectRestSpread',
       'optionalCatchBinding', 'optionalChaining', ['pipelineOperator', { proposal: 'minimal' }], 'throwExpressions',
        'typescript']
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
   static parse(source, options = undefined)
   {
      options = typeof options === 'object' ? options : s_BABYLON_OPTIONS;
      options.sourceType = typeof options.sourceType === 'string' ? options.sourceType : 'unambiguous';
      return babylon.parse(source, options);
   }
}

