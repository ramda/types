import { expectType } from 'tsd';
import { mergeLeft } from '../types/mergeLeft';

const foo = { foo: 'foo' };
const bar = { bar: 'bar' };
const foo2 = { foo: 2 };

expectType<{ foo: string; bar: string; }>(mergeLeft(foo, bar));
expectType<{ foo: string; }>(mergeLeft(foo, foo2));
