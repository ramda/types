import { expectType } from 'tsd';

import { toPairs } from '../es';

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
