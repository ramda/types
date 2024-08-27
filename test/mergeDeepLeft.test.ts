import { expectType } from 'tsd';
import { mergeDeepLeft } from '../es';

const foo = { foo: 'foo', inner: { a: 1 } };
const bar = { bar: 'bar', inner: { b: 5 } };
const foo2 = { foo: 2 };

expectType<{ foo: string; bar: string; inner: { a: number; b: number } }>(mergeDeepLeft(foo, bar));
expectType<{ foo: string; inner: { a: number } }>(mergeDeepLeft(foo, foo2));
expectType<{ foo: number; inner: { a: number } }>(mergeDeepLeft(foo2, foo));

type TestType = {
  foo: string;
  bar: string;
  inner: { a: number; b: number }
};

const obj1 = {} as TestType;
const obj2 = {} as TestType;

expectType<TestType>(mergeDeepLeft(obj1, obj2));
expectType<TestType>(mergeDeepLeft(obj2, obj1));

expectType<TestType>(mergeDeepLeft(obj1, { foo: '', bar: '', inner: { a: 1, b: 2 } }));
expectType<TestType>(mergeDeepLeft({ foo: '', bar: '', inner: { a: 1, b: 2 } }, obj2));
