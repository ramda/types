import { expectType } from 'tsd';
import { mergeAll } from '../es';

/*
 * `mergeAll` is just `mergeAll = (...os) => Object.assign({}, ...os);`
 * `ts-toolbelt's `O.Assign` is exactly that, so not much to test here
 */

const foo = { foo: 'foo' };
const bar = { bar: 'bar' };
const foo2 = { foo: 2 };
const fooA = [foo, foo];

expectType<{ foo: string; }>(mergeAll([foo]));
expectType<{ foo: string; }>(mergeAll([foo, foo]));
expectType<{ foo: string; }>(mergeAll([foo, { ...foo }]));
expectType<{ foo: string; bar: string; }>(mergeAll([foo, bar]));
expectType<{ foo: number; }>(mergeAll([foo, foo2]));
expectType<{ foo: string }>(mergeAll(fooA));

const list: Array<{x: number}> = [{x: 1}, {x: 2}];
expectType<{x: number}>(mergeAll(list));

