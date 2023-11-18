import { expectType, expectError } from 'tsd';
import { head } from '../es';

// empty string literal errors
expectError(head(''));
// string always return string
expectType<string>(head('abc'));

// array literals will read the type of the first entry
expectType<string>(head(['fi', 1, 'fum']));
// but if the array is typed as an `Array<T> or T[]`, then return type will be `T`
expectType<string | number | undefined>(head(['fi', 1, 'fum'] as Array<string | number>));
// empty array literals return undefined
expectType<undefined>(head([]));
// empty tuple errors
const emptyTuple: [] = [];
expectError(head(emptyTuple));
// as does `[] as const`
expectError(head([] as const));
// but if it is typed, it will be `T | undefined`
expectType<number | undefined>(head([] as number[]));
// const tuples return the literal type of the first entry
expectType<10>(head([10, 'ten'] as const));
expectType<'10'>(head(['10', 10] as const));
// typed tuples return the underlying type
expectType<number>(head([10, 'ten'] as [number, string]));
expectType<string>(head(['10', 10] as [string, number]));
// typed arrays return `T | undefined`
expectType<number | string | undefined>(head([10, 'ten'] as Array<number | string>));
expectType<string | number | undefined>(head(['10', 10] as Array<string | number>));
