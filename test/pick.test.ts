import { expectType, expectError } from 'tsd';

import { pick } from '../es';

type Obj = { foo: number; bar: string; biz?: boolean };

const obj = {} as Obj;

expectType<{}>(pick([])(obj));
expectType<{ foo: number; }>(pick(['foo'])(obj));
expectType<{ foo: number; bar: string; }>(pick(['foo', 'bar'])(obj));
expectType<{ foo: number; bar: string; biz?: boolean }>(pick(['foo', 'bar', 'biz'])(obj));
// as long as some of the array has valid keys, it will accept it, but will return `never` if there are any invalid keys
expectType<never>(pick(['baz', 'bar', 'biz'])(obj));
// if the array is only invalid keys, it will error
expectError(pick(['baz'])(obj));
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
expectType<Record<string, number>>(pick(['foo', 'bar'], {} as Record<string, number>));
