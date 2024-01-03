import { expectType, expectError } from 'tsd';

import { omit } from '../es';

const obj = { foo: 1, bar: '2', biz: false };

expectType<{ foo: number; bar: string; biz: boolean; }>(omit([])(obj));
expectType<{ bar: string; biz: boolean }>(omit(['foo'])(obj));
expectType<{ biz: boolean }>(omit(['foo', 'bar'])(obj));
expectType<{}>(omit(['foo', 'bar', 'biz'])(obj));
expectError(omit(['baz', 'bar', 'biz'])(obj));
// make sure typed array works
expectType<{}>(omit([] as (keyof typeof obj)[])(obj));

expectType<{ foo: number; bar: string; biz: boolean; }>(omit([], obj));
expectType<{ bar: string; biz: boolean }>(omit(['foo'], obj));
expectType<{ biz: boolean }>(omit(['foo', 'bar'], obj));
expectType<{}>(omit(['foo', 'bar', 'biz'], obj));
expectError(omit(['baz', 'bar', 'biz'], obj));
// make sure typed array works
expectType<{}>(omit([] as (keyof typeof obj)[], obj));

// Record
expectType<Record<string, number>>(omit(['foo', 'bar'], {} as Record<string, number>));
