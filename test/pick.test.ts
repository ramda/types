import { expectType, expectError } from 'tsd';

import { pick, KeysAsTuple } from '../es';

const obj = { foo: 1, bar: '2', biz: false };

expectType<{}>(pick([])(obj));
expectType<{ foo: number; }>(pick(['foo'])(obj));
expectType<{ foo: number; bar: string; }>(pick(['foo', 'bar'])(obj));
expectType<{ foo: number; bar: string; biz: boolean }>(pick(['foo', 'bar', 'biz'])(obj));
expectError(pick(['baz', 'bar', 'biz'])(obj));

expectType<{}>(pick([], obj));
expectType<{ foo: number; }>(pick(['foo'], obj));
expectType<{ foo: number; bar: string; }>(pick(['foo', 'bar'], obj));
expectType<{ foo: number; bar: string; biz: boolean }>(pick(['foo', 'bar', 'biz'], obj));
expectError(pick(['baz', 'bar', 'biz'], obj));

// Record
expectType<Record<string, number>>(pick(['foo', 'bar'], {} as Record<string, number>));

const names: string[] = ['foo', 'bar'];
// in cases where names is either `string[]` or `(keyof obj)[]`, cast with supplied `KeysAsTuple` type function
expectType<typeof obj>(pick(names as KeysAsTuple<typeof obj>, obj));
// this case however is inaccurate, best to cast as a `Partial` in a real-world scenario
expectType<Partial<typeof obj>>(pick(names as KeysAsTuple<typeof obj>, obj) as Partial<typeof obj>);
