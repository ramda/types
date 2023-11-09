import { expectType, expectError } from 'tsd';

import { pick } from '../es';

const obj = { foo: 1, bar: '2', biz: false };

expectType<{}>(pick([])(obj));
expectType<{ foo: number; }>(pick(['foo'])(obj));
expectType<{ foo: number; bar: string; }>(pick(['foo', 'bar'])(obj));
expectType<{ foo: number; bar: string; biz: boolean }>(pick(['foo', 'bar', 'biz'])(obj));
expectError(pick(['baz', 'bar', 'biz'])(obj));
// make sure typed array works
expectType<typeof obj>(pick([] as (keyof typeof obj)[])(obj));

expectType<{}>(pick([], obj));
expectType<{ foo: number; }>(pick(['foo'], obj));
expectType<{ foo: number; bar: string; }>(pick(['foo', 'bar'], obj));
expectType<{ foo: number; bar: string; biz: boolean }>(pick(['foo', 'bar', 'biz'], obj));
expectError(pick(['baz', 'bar', 'biz'], obj));
// make sure typed array works
expectType<typeof obj>(pick([] as (keyof typeof obj)[], obj));

// Record
expectType<Record<string, number>>(pick(['foo', 'bar'], {} as Record<string, number>));
