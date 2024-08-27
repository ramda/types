import { expectType } from 'tsd';
import { mergeLeft } from '../es';

const foo = { foo: 'foo' };
const bar = { bar: 'bar' };
const foo2 = { foo: 2 };

expectType<{ foo: string; bar: string; }>(mergeLeft(foo, bar));
expectType<{ foo: string; }>(mergeLeft(foo, foo2));

type TestType = {
  foo: string;
  bar: string;
};

const obj1 = {} as TestType;
const obj2 = {} as TestType;

expectType<TestType>(mergeLeft(obj1, obj2));
expectType<TestType>(mergeLeft(obj2, obj1));

expectType<TestType>(mergeLeft(obj1, { foo: '', bar: ''}));
expectType<TestType>(mergeLeft({ foo: '', bar: ''}, obj2));
