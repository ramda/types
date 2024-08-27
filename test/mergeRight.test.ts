import { expectType } from 'tsd';
import { mergeRight } from '../es';

const foo = { foo: 'foo' };
const bar = { bar: 'bar' };
const foo2 = { foo: 2 };

expectType<{ foo: string; bar: string; }>(mergeRight(foo, bar));
expectType<{ foo: number; }>(mergeRight(foo, foo2));

type TestType = {
  foo: string;
  bar: string;
};

const obj1 = {} as TestType;
const obj2 = {} as TestType;

expectType<TestType>(mergeRight(obj1, obj2));
expectType<TestType>(mergeRight(obj2, obj1));

expectType<TestType>(mergeRight(obj1, { foo: '', bar: ''}));
expectType<TestType>(mergeRight({ foo: '', bar: ''}, obj2));
