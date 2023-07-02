import { expectType } from 'tsd';

import { fromPairs } from '../es';

const symbolKey = Symbol('key');

// literals
expectType<{ foo: number; bar: number; }>(fromPairs([['foo', 1], ['bar', 2]]));
// typed
expectType<{ foo: number; bar: number; 0: number; [symbolKey]: number; }>(fromPairs([] as ['foo' | 'bar' | 0 | typeof symbolKey, number][]));
// keys that are not a union of values produced an index signature type
expectType<{ [x: string]: number }>(fromPairs([] as [string, number][]));
// 'foo' | 'bar' | string collapses to string, this is expected
expectType<{ [x: string]: number }>(fromPairs([] as ['foo' | 'bar' | string, number][]));
