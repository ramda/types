import { expectType, expectError } from 'tsd';

import { omit } from '../es';

type Obj = { foo: number; bar: string; biz?: boolean };

const obj = {} as Obj;

expectType<{ foo: number; bar: string; biz?: boolean; }>(omit([])(obj));
expectType<{ bar: string; biz?: boolean }>(omit(['foo'])(obj));
expectType<{ biz?: boolean }>(omit(['foo', 'bar'])(obj));
expectType<{}>(omit(['foo', 'bar', 'biz'])(obj));
// as long as some of the array has valid keys, it will accept it, but will return `never` if there are any invalid keys
expectType<never>(omit(['baz', 'bar', 'biz'])(obj));
// if the array is only invalid keys, it will error
expectError(omit(['baz'])(obj));
// make sure typed array works
expectType<{}>(omit([] as (keyof typeof obj)[])(obj));

expectType<{ foo: number; bar: string; biz?: boolean; }>(omit([], obj));
expectType<{ bar: string; biz?: boolean }>(omit(['foo'], obj));
expectType<{ biz?: boolean }>(omit(['foo', 'bar'], obj));
expectType<{}>(omit(['foo', 'bar', 'biz'], obj));
expectError(omit(['baz', 'bar', 'biz'], obj));
// make sure typed array works
expectType<{}>(omit([] as (keyof typeof obj)[], obj));

// Record
expectType<Record<string, number>>(omit(['foo', 'bar'], {} as Record<string, number>));
