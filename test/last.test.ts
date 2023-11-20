import { expectType, expectError } from 'tsd';
import { last } from '../es';
import { isNotEmpty } from '../types/isNotEmpty';

// empty string literal errors
expectError(last(''));
// string always return string
expectType<string>(last('abc'));

// array literals will read the type of the first entry
expectType<string>(last(['fi', 1, 'fum']));
// but if the array is typed as an `Array<T> or T[]`, then return type will be `T`
expectType<string | number | undefined>(last(['fi', 1, 'fum'] as Array<string | number>));
// empty array literals return undefined
expectType<undefined>(last([]));
// empty tuple errors
const emptyTuple: [] = [];
expectError(last(emptyTuple));
// as does `[] as const`
expectError(last([] as const));
// but if it is typed, it will be `T | undefined`
expectType<number | undefined>(last([] as number[]));
// const tuples return the literal type of the first entry
expectType<'ten'>(last([10, 'ten'] as const));
expectType<10>(last(['10', 10] as const));
// typed tuples return the underlying type
expectType<string>(last([true, 10, 'ten'] as [boolean, number, string]));
expectType<number>(last([false, '10', 10] as [boolean, string, number]));
// typed arrays return `T | undefined`
expectType<number | string | undefined>(last([10, 'ten'] as Array<number | string>));
expectType<string | number | undefined>(last(['10', 10] as Array<string | number>));

// cross function testing with isNotEmpty
// test the type narrowing
const readonlyArr: readonly number[] = [];
if (isNotEmpty(readonlyArr)) {
  expectType<number>(last(readonlyArr));
}

const readonlyArr2: readonly number[] = [];
if (!isNotEmpty(readonlyArr2)) {
  // no-op
} else {
  expectType<number>(last(readonlyArr2));
}


const arr: number[] = [];
if (isNotEmpty(arr)) {
  expectType<number>(last(arr));
}

const arr2: number[] = [];
if (!isNotEmpty(arr2)) {
// no-op
} else {
  expectType<number>(last(arr2));
}
