import { assert } from 'chai';

import escomplex from '../../../src';

import * as testconfig  from '../testconfig';

if (testconfig.modules['index'])
{
   suite('typhonjs-escomplex:', () =>
   {
      suite('escomplex:', () =>
      {
         test('analyzeModule function is exported', () =>
         {
            assert.isFunction(escomplex.analyzeModule);
         });

         test('analyzeModuleAST function is exported', () =>
         {
            assert.isFunction(escomplex.analyzeModuleAST);
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

         test('processProject function is exported', () =>
         {
            assert.isFunction(escomplex.processProject);
         });

         test('analyzeModuleAsync function is exported', () =>
         {
            assert.isFunction(escomplex.analyzeModuleAsync);
         });

         test('analyzeModuleASTAsync function is exported', () =>
         {
            assert.isFunction(escomplex.analyzeModuleASTAsync);
         });

         test('analyzeProjectAsync function is exported', () =>
         {
            assert.isFunction(escomplex.analyzeProjectAsync);
         });

         test('analyzeProjectASTAsync function is exported', () =>
         {
            assert.isFunction(escomplex.analyzeProjectASTAsync);
         });

         test('parseAsync function is exported', () =>
         {
            assert.isFunction(escomplex.parseAsync);
         });

         test('processProjectAsync function is exported', () =>
         {
            assert.isFunction(escomplex.processProjectAsync);
         });

         test('sanity test - analyzeModule', () =>
         {
            const result = escomplex.analyzeModule('class Foo {}; class Bar extends Foo { constructor() { super(); } }');

            assert.isObject(result);
            assert.strictEqual(result.aggregate.sloc.logical, 4);
         });

         test('sanity test - analyzeModuleAST', () =>
         {
            const ast = escomplex.parse('class Foo {}; class Bar extends Foo { constructor() { super(); } }');

            assert.isObject(ast);
            assert.strictEqual(ast.type, 'File');
            assert.isObject(ast.program);

            const result = escomplex.analyzeModuleAST(ast);

            assert.isObject(result);
            assert.strictEqual(result.aggregate.sloc.logical, 4);
         });

         test('sanity test - analyzeProject', () =>
         {
            const sources =
            [
               { code: 'class Foo {}; class Bar extends Foo { constructor() { super(); } }', srcPath: '/path/to/file/a' },
               { code: 'const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];', srcPath: '/path/to/file/b' }
            ];

            const results = escomplex.analyzeProject(sources);

            assert.isObject(results);
            assert.isArray(results.modules);
            assert.strictEqual(results.modules.length, 2);
            assert.isObject(results.modules[0]);
            assert.strictEqual(results.modules[0].aggregate.sloc.logical, 4);
            assert.strictEqual(results.modules[1].aggregate.sloc.logical, 2);
         });

         test('sanity test - analyzeProjectAST', () =>
         {
            const modules =
            [
               {
                  ast: escomplex.parse('class Foo {}; class Bar extends Foo { constructor() { super(); } }'),
                  srcPath: '/path/to/file/a'
               },
               {
                  ast: escomplex.parse('const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];'),
                  srcPath: '/path/to/file/b'
               }
            ];

            const results = escomplex.analyzeProjectAST(modules);

            assert.isObject(results);
            assert.isArray(results.modules);
            assert.strictEqual(results.modules.length, 2);
            assert.isObject(results.modules[0]);
            assert.strictEqual(results.modules[0].aggregate.sloc.logical, 4);
            assert.strictEqual(results.modules[1].aggregate.sloc.logical, 2);
         });

         test('sanity test - parse', () =>
         {
            const ast = escomplex.parse('class Foo {}; class Bar extends Foo { constructor() { super(); } }');

            assert.isObject(ast);
            assert.strictEqual(ast.type, 'File');
            assert.isObject(ast.program);
         });

         test('sanity test - processProject', () =>
         {
            const sources =
            [
               { code: 'class Foo {}; class Bar extends Foo { constructor() { super(); } }', srcPath: '/path/to/file/a' },
               { code: 'const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];', srcPath: '/path/to/file/b' }
            ];

            let results = escomplex.analyzeProject(sources, { skipCalculation: true });

            results = escomplex.processProject(results);

            assert.isObject(results);
            assert.isArray(results.modules);
            assert.strictEqual(results.modules.length, 2);
            assert.isObject(results.modules[0]);
            assert.strictEqual(results.modules[0].aggregate.sloc.logical, 4);
            assert.strictEqual(results.modules[1].aggregate.sloc.logical, 2);
         });

         test('sanity test - analyzeModuleAsync', () =>
         {
            const promise = escomplex.analyzeModuleAsync('class Foo {}; class Bar extends Foo { constructor() { super(); } }');

            promise.then((result) =>
            {
               assert.isObject(result);
               assert.strictEqual(result.aggregate.sloc.logical, 4);
            });
         });

         test('sanity test - analyzeModuleASTAsync', () =>
         {
            const ast = escomplex.parse('class Foo {}; class Bar extends Foo { constructor() { super(); } }');

            assert.isObject(ast);
            assert.strictEqual(ast.type, 'File');
            assert.isObject(ast.program);

            const promise = escomplex.analyzeModuleASTAsync(ast);

            promise.then((result) =>
            {
               assert.isObject(result);
               assert.strictEqual(result.aggregate.sloc.logical, 4);
            });
         });

         test('sanity test - analyzeProjectAsync', () =>
         {
            const sources =
            [
               { code: 'class Foo {}; class Bar extends Foo { constructor() { super(); } }', srcPath: '/path/to/file/a' },
               { code: 'const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];', srcPath: '/path/to/file/b' }
            ];

            const promise = escomplex.analyzeProjectAsync(sources);

            promise.then((results) =>
            {
               assert.isObject(results);
               assert.isArray(results.modules);
               assert.strictEqual(results.modules.length, 2);
               assert.isObject(results.modules[0]);
               assert.strictEqual(results.modules[0].aggregate.sloc.logical, 4);
               assert.strictEqual(results.modules[1].aggregate.sloc.logical, 2);
            });
         });

         test('sanity test - analyzeProjectASTAsync', () =>
         {
            const modules =
            [
               {
                  ast: escomplex.parse('class Foo {}; class Bar extends Foo { constructor() { super(); } }'),
                  srcPath: '/path/to/file/a'
               },
               {
                  ast: escomplex.parse('const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];'),
                  srcPath: '/path/to/file/b'
               }
            ];

            const promise = escomplex.analyzeProjectASTAsync(modules);

            promise.then((results) =>
            {
               assert.isObject(results);
               assert.isArray(results.modules);
               assert.strictEqual(results.modules.length, 2);
               assert.isObject(results.modules[0]);
               assert.strictEqual(results.modules[0].aggregate.sloc.logical, 4);
               assert.strictEqual(results.modules[1].aggregate.sloc.logical, 2);
            });
         });

         test('sanity test - parseAsync', () =>
         {
            const promise = escomplex.parseAsync('class Foo {}; class Bar extends Foo { constructor() { super(); } }');

            promise.then((ast) =>
            {
               assert.isObject(ast);
               assert.strictEqual(ast.type, 'File');
               assert.isObject(ast.program);
            });
         });

         test('sanity test - processProjectAsync', () =>
         {
            const sources =
            [
               { code: 'class Foo {}; class Bar extends Foo { constructor() { super(); } }', srcPath: '/path/to/file/a' },
               { code: 'const iter = [2, 3, 4]; const spreadTest = [1, ...iter, 5];', srcPath: '/path/to/file/b' }
            ];

            escomplex.analyzeProjectAsync(sources, { skipCalculation: true }).then((results) =>
            {
               return escomplex.processProjectAsync(results);
            }).then((results) =>
            {
               assert.isObject(results);
               assert.isArray(results.modules);
               assert.strictEqual(results.modules.length, 2);
               assert.isObject(results.modules[0]);
               assert.strictEqual(results.modules[0].aggregate.sloc.logical, 4);
               assert.strictEqual(results.modules[1].aggregate.sloc.logical, 2);
            });
         });
      });
   });
}
