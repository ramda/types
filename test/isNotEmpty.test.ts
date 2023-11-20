import { expectType, expectError } from 'tsd';

// TODO: check this import to '../es' once this function actually exists in ramda
import { isNotEmpty } from '../types/isNotEmpty';
import { ReadonlyNonEmptyArray, NonEmptyArray } from '../es';


// test the type narrowing
const readonlyArr: readonly number[] = [];
if (isNotEmpty(readonlyArr)) {
  expectType<ReadonlyNonEmptyArray<number>>(readonlyArr);
}

// test the type narrowing
const arr: number[] = [];
if (isNotEmpty(arr)) {
  expectType<NonEmptyArray<number>>(arr);
}

// tuples fall through
const tuple: [number, string] = [1, '1'];
if (isNotEmpty(tuple)) {
  expectType<[number, string]>(tuple);
}
