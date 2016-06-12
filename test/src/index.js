'use strict';

import { assert } from 'chai';

// import ESComplex from '../../src/ESComplex.js';
import escomplex from '../../src/index.js';

suite('typhonjs-escomplex:', () =>
{
   suite('escomplex:', () =>
   {
      test('analyze function is exported', () =>
      {
         assert.isFunction(escomplex.analyze);
      });

      test('analyzeAST function is exported', () =>
      {
         assert.isFunction(escomplex.analyzeAST);
      });

      test('analyzeProject function is exported', () =>
      {
         assert.isFunction(escomplex.analyzeProject);
      });

      test('analyzeProjectAST function is exported', () =>
      {
         assert.isFunction(escomplex.analyzeProjectAST);
      });

      test('parse function is exported', () =>
      {
         assert.isFunction(escomplex.parse);
      });

      test('processProjectResults function is exported', () =>
      {
         assert.isFunction(escomplex.processProjectResults);
      });

      test('sanity test - analyze', () =>
      {
         const result = escomplex.analyze('class Foo {}; class Bar extends Foo { constructor() { super(); } }');

         assert.isObject(result);
         assert.strictEqual(result.aggregate.sloc.logical, 3);
      });

      test('sanity test - analyzeAST', () =>
      {
         const ast = escomplex.parse('class Foo {}; class Bar extends Foo { constructor() { super(); } }');

         assert.isObject(ast);
         assert.strictEqual(ast.type, 'File');
         assert.isObject(ast.program);

         const result = escomplex.analyzeAST(ast);

         assert.isObject(result);
         assert.strictEqual(result.aggregate.sloc.logical, 3);
      });

      test('sanity test - analyzeProject', () =>
      {
         const sources =
         [
            { code: 'class Foo {}; class Bar extends Foo { constructor() { super(); } }', path: '/path/to/file/a' },
            { code: 'const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];', path: '/path/to/file/b' }
         ];

         const results = escomplex.analyzeProject(sources);

         assert.isObject(results);
         assert.isArray(results.reports);
         assert.strictEqual(results.reports.length, 2);
         assert.isObject(results.reports[0]);
         assert.strictEqual(results.reports[0].aggregate.sloc.logical, 3);
         assert.strictEqual(results.reports[1].aggregate.sloc.logical, 2);
      });

      test('sanity test - analyzeProjectAST', () =>
      {
         const modules =
         [
            {
               ast: escomplex.parse('class Foo {}; class Bar extends Foo { constructor() { super(); } }'),
               path: '/path/to/file/a'
            },
            {
               ast: escomplex.parse('const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];'),
               path: '/path/to/file/b'
            }
         ];

         const results = escomplex.analyzeProjectAST(modules);

         assert.isObject(results);
         assert.isArray(results.reports);
         assert.strictEqual(results.reports.length, 2);
         assert.isObject(results.reports[0]);
         assert.strictEqual(results.reports[0].aggregate.sloc.logical, 3);
         assert.strictEqual(results.reports[1].aggregate.sloc.logical, 2);
      });

      test('sanity test - parse', () =>
      {
         const ast = escomplex.parse('class Foo {}; class Bar extends Foo { constructor() { super(); } }');

         assert.isObject(ast);
         assert.strictEqual(ast.type, 'File');
         assert.isObject(ast.program);
      });

      test('sanity test - processProjectResults', () =>
      {
         const sources =
         [
            { code: 'class Foo {}; class Bar extends Foo { constructor() { super(); } }', path: '/path/to/file/a' },
            { code: 'const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];', path: '/path/to/file/b' }
         ];

         let results = escomplex.analyzeProject(sources, { skipCalculation: true });

         results = escomplex.processProjectResults(results);

         assert.isObject(results);
         assert.isArray(results.reports);
         assert.strictEqual(results.reports.length, 2);
         assert.isObject(results.reports[0]);
         assert.strictEqual(results.reports[0].aggregate.sloc.logical, 3);
         assert.strictEqual(results.reports[1].aggregate.sloc.logical, 2);
      });

      test('sanity test - analyzeThen', () =>
      {
         const promise = escomplex.analyzeThen('class Foo {}; class Bar extends Foo { constructor() { super(); } }');

         promise.then((result) =>
         {
            assert.isObject(result);
            assert.strictEqual(result.aggregate.sloc.logical, 3);
         });
      });

      test('sanity test - analyzeASTThen', () =>
      {
         const ast = escomplex.parse('class Foo {}; class Bar extends Foo { constructor() { super(); } }');

         assert.isObject(ast);
         assert.strictEqual(ast.type, 'File');
         assert.isObject(ast.program);

         const promise = escomplex.analyzeASTThen(ast);

         promise.then((result) =>
         {
            assert.isObject(result);
            assert.strictEqual(result.aggregate.sloc.logical, 3);
         });
      });

      test('sanity test - analyzeProjectThen', () =>
      {
         const sources =
         [
            { code: 'class Foo {}; class Bar extends Foo { constructor() { super(); } }', path: '/path/to/file/a' },
            { code: 'const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];', path: '/path/to/file/b' }
         ];

         const promise = escomplex.analyzeProjectThen(sources);

         promise.then((results) =>
         {
            assert.isObject(results);
            assert.isArray(results.reports);
            assert.strictEqual(results.reports.length, 2);
            assert.isObject(results.reports[0]);
            assert.strictEqual(results.reports[0].aggregate.sloc.logical, 3);
            assert.strictEqual(results.reports[1].aggregate.sloc.logical, 2);
         });
      });

      test('sanity test - analyzeProjectASTThen', () =>
      {
         const modules =
         [
            {
               ast: escomplex.parse('class Foo {}; class Bar extends Foo { constructor() { super(); } }'),
               path: '/path/to/file/a'
            },
            {
               ast: escomplex.parse('const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];'),
               path: '/path/to/file/b'
            }
         ];

         const promise = escomplex.analyzeProjectASTThen(modules);

         promise.then((results) =>
         {
            assert.isObject(results);
            assert.isArray(results.reports);
            assert.strictEqual(results.reports.length, 2);
            assert.isObject(results.reports[0]);
            assert.strictEqual(results.reports[0].aggregate.sloc.logical, 3);
            assert.strictEqual(results.reports[1].aggregate.sloc.logical, 2);
         });
      });

      test('sanity test - parseThen', () =>
      {
         const promise = escomplex.parseThen('class Foo {}; class Bar extends Foo { constructor() { super(); } }');

         promise.then((ast) =>
         {
            assert.isObject(ast);
            assert.strictEqual(ast.type, 'File');
            assert.isObject(ast.program);
         });
      });

      test('sanity test - processProjectResultsThen', () =>
      {
         const sources =
         [
            { code: 'class Foo {}; class Bar extends Foo { constructor() { super(); } }', path: '/path/to/file/a' },
            { code: 'const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];', path: '/path/to/file/b' }
         ];

         escomplex.analyzeProjectThen(sources, { skipCalculation: true }).then((results) =>
         {
            return escomplex.processProjectResultsThen(results);
         }).then((results) =>
         {
            assert.isObject(results);
            assert.isArray(results.reports);
            assert.strictEqual(results.reports.length, 2);
            assert.isObject(results.reports[0]);
            assert.strictEqual(results.reports[0].aggregate.sloc.logical, 3);
            assert.strictEqual(results.reports[1].aggregate.sloc.logical, 2);
         });
      });
   });
});

// TODO: Mockery doesn't play nice w/ Babel; redoing the index tests soon...

/*
var assert, mockery, spooks, modulePath;

assert = require('chai').assert;
mockery = require('mockery');
spooks = require('spooks');

modulePath = '../../dist';

mockery.registerAllowable(modulePath);

suite('index:', function () {
    var log;

    setup(function () {
        log = {};
        mockery.enable({ useCleanCache: true, warnOnReplace: false, warnOnUnregistered: false });
        mockery.registerMock('./parser', {
            parse: spooks.fn({
                name: 'parser.parse',
                log: log,
                results: [ 'parser.parse result' ]
            })
        });
        mockery.registerMock('./core', {
            analyze: spooks.fn({
                name: 'core.analyze',
                log: log,
                results: [ 'core.analyze result' ]
            })
        });
    });

    teardown(function () {
        mockery.deregisterMock('./parser');
        mockery.deregisterMock('./core');
        mockery.disable();
        log = undefined;
    });

    test('require does not throw', function () {
        assert.doesNotThrow(function () {
            require(modulePath);
        });
    });

    test('require returns object', function () {
        assert.isObject(require(modulePath));
    });

    suite('require:', function () {
        var index;

        setup(function () {
            index = require(modulePath);
        });

        teardown(function () {
            index = undefined;
        });

        test('analyze function is exported', function () {
            assert.isFunction(index.analyze);
        });

        test('analyze does not throw', function () {
            assert.doesNotThrow(function () {
                index.analyze();
            });
        });

        test('parser.parse was not called', function () {
            assert.strictEqual(log.counts['parser.parse'], 0);
        });

        test('core.analyze was not called', function () {
            assert.strictEqual(log.counts['core.analyze'], 0);
        });

        suite('array source:', function () {
            var options, result;

            setup(function () {
                options = {};
                result = index.analyze([ { path: '/foo.js', code: 'console.log("foo");' },
                    { path: '../bar.js', code: '"bar";' } ], options);
            });

            teardown(function () {
                options = result = undefined;
            });

            test('parser.parse was called twice', function () {
                assert.strictEqual(log.counts['parser.parse'], 2);
            });

            test('parser.parse was passed two arguments first time', function () {
                assert.lengthOf(log.args['parser.parse'][0], 2);
            });

            test('parser.parse was given correct source first time', function () {
                assert.strictEqual(log.args['parser.parse'][0][0], 'console.log("foo");');
            });

            test('parser.parse was passed two arguments second time', function () {
                assert.lengthOf(log.args['parser.parse'][1], 2);
            });

            test('parser.parse was given correct source second time', function () {
                assert.strictEqual(log.args['parser.parse'][1][0], '"bar";');
            });

            test('core.analyze was called once', function () {
                assert.strictEqual(log.counts['core.analyze'], 1);
            });

            test('core.analyze was passed two arguments', function () {
                assert.lengthOf(log.args['core.analyze'][0], 2);
            });

            test('core.analyze was given correct asts', function () {
                assert.isArray(log.args['core.analyze'][0][0]);
                assert.lengthOf(log.args['core.analyze'][0][0], 2);

                assert.isObject(log.args['core.analyze'][0][0][0]);
                assert.strictEqual(log.args['core.analyze'][0][0][0].path, '/foo.js');
                assert.strictEqual(log.args['core.analyze'][0][0][0].ast, 'parser.parse result');
                assert.lengthOf(Object.keys(log.args['core.analyze'][0][0][0]), 2);

                assert.isObject(log.args['core.analyze'][0][0][1]);
                assert.strictEqual(log.args['core.analyze'][0][0][1].path, '../bar.js');
                assert.strictEqual(log.args['core.analyze'][0][0][1].ast, 'parser.parse result');
                assert.lengthOf(Object.keys(log.args['core.analyze'][0][0][1]), 2);
            });

            test('core.analyze was given correct options', function () {
                assert.strictEqual(log.args['core.analyze'][0][1], options);
            });

            test('correct result was returned', function () {
                assert.strictEqual(result, 'core.analyze result');
            });
        });

        suite('array source with bad code:', function() {
            var code;

            setup(function () {
                mockery.deregisterMock('./parser');
                mockery.disable();
                code = [ { path: '/foo.js', code: 'foo foo' }, { path: '../bar.js', code: '"bar";' } ];
                index = require(modulePath);
            });

            teardown(function () {
                code = undefined;
            });

            test('throws an error with default options', function() {
                assert.throws(function() {
                    index.analyze(code, {});
                }, '/foo.js: Unexpected token (1:4)');
            });

            test('swallows error with options.ignoreErrors', function() {
                assert.doesNotThrow(function() {
                    index.analyze(code, { ignoreErrors: true });
                });
            });
        });

        suite('string source:', function () {
            var options, result;

            setup(function () {
                options = {};
                result = index.analyze('foo bar baz', options);
            });

            teardown(function () {
                options = result = undefined;
            });

            test('parser.parse was called once', function () {
                assert.strictEqual(log.counts['parser.parse'], 1);
            });

            test('parser.parse was passed two arguments', function () {
                assert.lengthOf(log.args['parser.parse'][0], 2);
            });

            test('parser.parse was given correct source', function () {
                assert.strictEqual(log.args['parser.parse'][0][0], 'foo bar baz');
            });

            test('core.analyze was called once', function () {
                assert.strictEqual(log.counts['core.analyze'], 1);
            });

            test('core.analyze was passed two arguments', function () {
                assert.lengthOf(log.args['core.analyze'][0], 2);
            });

            test('core.analyze was given correct ast', function () {
                assert.strictEqual(log.args['core.analyze'][0][0], 'parser.parse result');
            });

            test('core.analyze was given correct options', function () {
                assert.strictEqual(log.args['core.analyze'][0][1], options);
            });

            test('correct result was returned', function () {
                assert.strictEqual(result, 'core.analyze result');
            });
        });

        suite('string esm source:', function () {
            var options, result;

            setup(function () {
                options = {};

                result = index.analyze('import foo from "./foo.js"; const s_BAR = 42; export default s_BAR;', options);
            });

            teardown(function () {
                options = result = undefined;
            });

            test('parser.parse was called once', function () {
                assert.strictEqual(log.counts['parser.parse'], 1);
            });

            test('parser.parse was passed two arguments', function () {
                assert.lengthOf(log.args['parser.parse'][0], 2);
            });

            test('parser.parse was given correct source', function () {
                assert.strictEqual(log.args['parser.parse'][0][0], 'import foo from "./foo.js"; const s_BAR = 42; export default s_BAR;');
            });

            test('core.analyze was called once', function () {
                assert.strictEqual(log.counts['core.analyze'], 1);
            });

            test('core.analyze was passed three arguments', function () {
                assert.lengthOf(log.args['core.analyze'][0], 2);
            });

            test('core.analyze was given correct ast', function () {
                assert.strictEqual(log.args['core.analyze'][0][0], 'parser.parse result');
            });

            test('core.analyze was given correct options', function () {
                assert.strictEqual(log.args['core.analyze'][0][1], options);
            });

            test('correct result was returned', function () {
                assert.strictEqual(result, 'core.analyze result');
            });
        });
    });
});
*/
