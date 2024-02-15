import { expectType, expectError } from 'tsd';

import { pick } from '../ts4/es';

type Obj = { foo: number; bar: string; biz?: boolean };

const obj = {} as Obj;

expectType<{}>(pick([])(obj));
expectType<{ foo: number; }>(pick(['foo'] as const)(obj));
expectType<{ foo: number; bar: string; }>(pick(['foo', 'bar'] as const)(obj));
expectType<{ foo: number; bar: string; biz?: boolean }>(pick(['foo', 'bar', 'biz'] as const)(obj));
// as long as some of the array has valid keys, it will accept it, but will return `never` if there are any invalid keys
expectError(pick(['baz', 'bar', 'biz'] as const)(obj));
// errors (with better message) with array of all unknown keys
expectError(pick(['baz'] as const)(obj));
// make sure typed array works
expectType<typeof obj>(pick([] as (keyof typeof obj)[])(obj));

expectType<{}>(pick([], obj));
expectType<{ foo: number; }>(pick(['foo'], obj));
expectType<{ foo: number; bar: string; }>(pick(['foo', 'bar'], obj));
expectType<{ foo: number; bar: string; biz?: boolean }>(pick(['foo', 'bar', 'biz'], obj));
expectError(pick(['baz', 'bar', 'biz'], obj));
// make sure typed array works
expectType<typeof obj>(pick([] as (keyof typeof obj)[], obj));

// Record
expectType<Pick<Record<string, number>, 'foo' | 'bar'>>(pick(['foo', 'bar'] as const)({} as Record<string, number>));
expectType<Pick<Record<string, number>, 'foo' | 'bar'>>(pick(['foo', 'bar'], {} as Record<string, number>));
