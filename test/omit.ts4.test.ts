import { expectType, expectError } from 'tsd';

import { omit } from '../ts4/es';

type Obj = { foo: number; bar: string; biz?: boolean };

const obj = {} as Obj;

expectType<{ foo: number; bar: string; biz?: boolean; }>(omit([] as const)(obj));
expectType<{ bar: string; biz?: boolean }>(omit(['foo'] as const)(obj));
expectType<{ biz?: boolean }>(omit(['foo', 'bar'] as const)(obj));
expectType<{}>(omit(['foo', 'bar', 'biz'] as const)(obj));
// errors with `never` if array contains some but not all keys on obj
expectError(omit(['baz', 'bar', 'biz'] as const)(obj));
// errors (with better message) with array of all unknown keys
expectError(omit(['baz'] as const)(obj));
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
expectType<Omit<Record<string, number>, 'foo' | 'bar'>>(omit(['foo', 'bar'] as const)({} as Record<string, number>));
expectType<Omit<Record<string, number>, 'foo' | 'bar'>>(omit(['foo', 'bar'], {} as Record<string, number>));
