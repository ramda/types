import { expectType } from 'tsd';
import { mergeRight } from '../types/mergeRight';

const foo = { foo: 'foo' };
const bar = { bar: 'bar' };
const foo2 = { foo: 2 };

expectType<{ foo: string; bar: string; }>(mergeRight(foo, bar));
expectType<{ foo: number; }>(mergeRight(foo, foo2));
