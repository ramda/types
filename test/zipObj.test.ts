import { expectType } from 'tsd';
import { zipObj } from '../types/zipObj';

const sym = Symbol.for('Symbol');

// zipObj(key, values)
expectType<{bool: true, number: 1, null: null, undefined: undefined}>(zipObj(['bool', 'number', 'null', 'undefined'], [true, 1, null, undefined]));
expectType<{1: 1, [sym]: symbol}>(zipObj([1, sym], [1, sym]));
expectType<{bool: boolean, number: number}>(zipObj(['bool', 'number'], [true, 1] as [boolean, number]));
expectType<{[key: string]: boolean}>(zipObj(['a'] as string[], [true, false] as boolean[]));
expectType<{a: boolean}>(zipObj(['a'], [true, false] as boolean[]));
expectType<{[key: string]: boolean}>(zipObj(['a'] as string[], [true, false]));
expectType<{bool: true, number: 1}>(zipObj(['bool', 'number'], [true, 1, 'string']));
expectType<{bool: true, number: 1, missing: undefined}>(zipObj(['bool', 'number', 'missing'], [true, 1]));

// zipObj(key)(values)
expectType<{bool: true, number: 1, null: null, undefined: undefined}>(zipObj(['bool', 'number', 'null', 'undefined'])([true, 1, null, undefined]));
expectType<{1: 1, [sym]: symbol}>(zipObj([1, sym])([1, sym]));
expectType<{bool: boolean, number: number}>(zipObj(['bool', 'number'])([true, 1] as [boolean, number]));
expectType<{[key: string]: boolean}>(zipObj(['a'] as string[])([true, false] as boolean[]));
expectType<{a: boolean}>(zipObj(['a'])([true, false] as boolean[]));
expectType<{[key: string]: boolean}>(zipObj(['a'] as string[])([true, false]));
expectType<{bool: true, number: 1}>(zipObj(['bool', 'number'])([true, 1, 'string']));
expectType<{bool: true, number: 1, missing: undefined}>(zipObj(['bool', 'number', 'missing'])([true, 1]));
