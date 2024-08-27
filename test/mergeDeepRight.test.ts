import { expectType } from 'tsd';
import { mergeDeepRight } from '../es';

const foo = { foo: 'foo', inner: { a: 1 } };
const bar = { bar: 'bar', inner: { b: 5 } };
const foo2 = { foo: 2 };

expectType<{ foo: string; bar: string; inner: { a: number; b: number } }>(mergeDeepRight(foo, bar));
expectType<{ foo: string; inner: { a: number } }>(mergeDeepRight(foo2, foo));
expectType<{ foo: number; inner: { a: number } }>(mergeDeepRight(foo, foo2));

type TestType = {
  foo: string;
  bar: string;
  inner: { a: number; b: number }
};

const obj1 = {} as TestType;
const obj2 = {} as TestType;

expectType<TestType>(mergeDeepRight(obj1, obj2));
expectType<TestType>(mergeDeepRight(obj2, obj1));

expectType<TestType>(mergeDeepRight(obj1, { foo: '', bar: '', inner: { a: 1, b: 2 } }));
expectType<TestType>(mergeDeepRight({ foo: '', bar: '', inner: { a: 1, b: 2 } }, obj2));
