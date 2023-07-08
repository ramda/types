import { expectType } from 'tsd';

import { fromPairs, toPairs } from '../es';

type Obj = { 0: number; foo: string; bar: string; [symbolKey]: boolean; };

const symbolKey = Symbol('key');
// literals
expectType<([0, number] | ['foo', string] | ['bar', string] | [typeof symbolKey, boolean])[]>(toPairs({} as { 0: number; foo: string; bar: string; [symbolKey]: boolean; }));
// typed
expectType<([0, number] | ['foo', string] | ['bar', string] | [typeof symbolKey, boolean])[]>(toPairs({} as Obj));
// indexed objects
expectType<[string, number][]>(toPairs({} as { [index: string]: number }));
// Record
expectType<[string, number][]>(toPairs({} as Record<string, number>));

// should be able to go toPair -> fromPair and get original type back
const obj: { foo: number; bar: number } = { foo: 1, bar: 2 };
const pairs = toPairs(obj);
const backAgain = fromPairs(pairs);
expectType<{ foo: number; bar: number }>(backAgain);
