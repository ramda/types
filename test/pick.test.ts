import { expectType, expectError, expectAssignable } from 'tsd';

import { pick } from '../es';

type Obj = { foo: number, bar: string, biz: boolean, baz: Date; a: string; b: string; c: string; d: string, e: string };
const obj = {} as Obj;

expectType<Pick<Obj, never>>(pick([])(obj));
expectType<Pick<Obj, 'foo'>>(pick(['foo'])(obj));
expectType<Pick<Obj, 'foo' | 'bar'>>(pick(['foo', 'bar'])(obj));
expectType<Pick<Obj, 'foo' | 'bar' | 'biz'>>(pick(['foo', 'bar', 'biz'])(obj));
expectType<Pick<Obj, 'foo' | 'bar' | 'biz' | 'baz'>>(pick(['foo', 'bar', 'biz', 'baz'])(obj));
expectType<Pick<Obj, 'foo' | 'bar' | 'biz' | 'baz' | 'a'>>(pick(['foo', 'bar', 'biz', 'baz', 'a'])(obj));
expectType<Pick<Obj, 'foo' | 'bar' | 'biz' | 'baz' | 'a' | 'b'>>(pick(['foo', 'bar', 'biz', 'baz', 'a', 'b'])(obj));
expectType<Pick<Obj, 'foo' | 'bar' | 'biz' | 'baz' | 'a' | 'b' | 'c'>>(pick(['foo', 'bar', 'biz', 'baz', 'a', 'b', 'c'])(obj));
expectType<Pick<Obj, 'foo' | 'bar' | 'biz' | 'baz' | 'a' | 'b' | 'c' | 'd'>>(pick(['foo', 'bar', 'biz', 'baz', 'a', 'b', 'c', 'd'])(obj));
expectType<Pick<Obj, 'foo' | 'bar' | 'biz' | 'baz' | 'a' | 'b' | 'c' | 'd' | 'e'>>(pick(['foo', 'bar', 'biz', 'baz', 'a', 'b', 'c', 'd', 'e'] as const)(obj));

// while these technically work, they give back false positives, avoid their use
expectAssignable<Pick<Obj, keyof Obj>>(pick(['foo', 'bar', 'biz', 'baz', 'a', 'b', 'c', 'd', 'e'])(obj));
expectType<Pick<Obj, keyof Obj>>(pick([] as (keyof Obj)[])(obj));

expectError(pick(['what'])(obj));

expectType<Pick<Obj, never>>(pick([], obj));
expectType<Pick<Obj, 'foo'>>(pick(['foo'], obj));
expectType<Pick<Obj, 'foo' | 'bar'>>(pick(['foo', 'bar'], obj));
expectType<Pick<Obj, 'foo' | 'bar' | 'biz'>>(pick(['foo', 'bar', 'biz'], obj));
expectType<Pick<Obj, 'foo' | 'bar' | 'biz' | 'baz'>>(pick(['foo', 'bar', 'biz', 'baz'], obj));
expectType<Pick<Obj, 'foo' | 'bar' | 'biz' | 'baz' | 'a'>>(pick(['foo', 'bar', 'biz', 'baz', 'a'], obj));
expectType<Pick<Obj, 'foo' | 'bar' | 'biz' | 'baz' | 'a' | 'b'>>(pick(['foo', 'bar', 'biz', 'baz', 'a', 'b'], obj));
expectType<Pick<Obj, 'foo' | 'bar' | 'biz' | 'baz' | 'a' | 'b' | 'c'>>(pick(['foo', 'bar', 'biz', 'baz', 'a', 'b', 'c'], obj));
expectType<Pick<Obj, 'foo' | 'bar' | 'biz' | 'baz' | 'a' | 'b' | 'c' | 'd'>>(pick(['foo', 'bar', 'biz', 'baz', 'a', 'b', 'c', 'd'], obj));
expectType<Pick<Obj, 'foo' | 'bar' | 'biz' | 'baz' | 'a' | 'b' | 'c' | 'd' | 'e'>>(pick(['foo', 'bar', 'biz', 'baz', 'a', 'b', 'c', 'd', 'e'] as const, obj));

// while this technically work, they give back false positives, avoid their use
expectType<Pick<Obj, keyof Obj>>(pick([] as (keyof Obj)[], obj));

expectError(pick(['what'], obj));

expectType<Record<string, number>>(pick(['foo'])({} as Record<string, number>));
expectType<Record<string, number>>(pick(['foo', 'bar'])({} as Record<string, number>));
expectType<Record<string, number>>(pick(['foo', 'bar', 'biz'])({} as Record<string, number>));
expectType<Record<string, number>>(pick(['foo', 'bar', 'biz', 'baz'])({} as Record<string, number>));
expectType<Record<string, number>>(pick(['foo', 'bar', 'biz', 'baz', 'a'])({} as Record<string, number>));
expectType<Record<string, number>>(pick(['foo', 'bar', 'biz', 'baz', 'a', 'b'])({} as Record<string, number>));
expectType<Record<string, number>>(pick(['foo', 'bar', 'biz', 'baz', 'a', 'b', 'c'])({} as Record<string, number>));
expectType<Record<string, number>>(pick(['foo', 'bar', 'biz', 'baz', 'a', 'b', 'c', 'd'])({} as Record<string, number>));
expectType<Record<string, number>>(pick(['foo', 'bar', 'biz', 'baz', 'a', 'b', 'c', 'd', 'e'] as const)({} as Record<string, number>));

expectType<Record<string, number>>(pick([], {} as Record<string, number>));
expectType<Record<string, number>>(pick(['foo'], {} as Record<string, number>));
expectType<Record<string, number>>(pick(['foo', 'bar'], {} as Record<string, number>));
expectType<Record<string, number>>(pick(['foo', 'bar', 'biz'], {} as Record<string, number>));
expectType<Record<string, number>>(pick(['foo', 'bar', 'biz', 'baz'], {} as Record<string, number>));
expectType<Record<string, number>>(pick(['foo', 'bar', 'biz', 'baz', 'a'], {} as Record<string, number>));
expectType<Record<string, number>>(pick(['foo', 'bar', 'biz', 'baz', 'a', 'b'], {} as Record<string, number>));
expectType<Record<string, number>>(pick(['foo', 'bar', 'biz', 'baz', 'a', 'b', 'c'], {} as Record<string, number>));
expectType<Record<string, number>>(pick(['foo', 'bar', 'biz', 'baz', 'a', 'b', 'c', 'd'], {} as Record<string, number>));
expectType<Record<string, number>>(pick(['foo', 'bar', 'biz', 'baz', 'a', 'b', 'c', 'd', 'e'], {} as Record<string, number>));
