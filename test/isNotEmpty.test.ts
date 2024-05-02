import { expectType } from 'tsd';

// TODO: check this import to '../es' once this function actually exists in ramda
import { isNotEmpty } from '../types/isNotEmpty';
import { ReadonlyNonEmptyArray, NonEmptyArray } from '../es';


// test the type narrowing
const readonlyArr: readonly number[] = [];
if (isNotEmpty(readonlyArr)) {
  expectType<ReadonlyNonEmptyArray<number>>(readonlyArr);
}

const readonlyArr2: readonly number[] = [];
if (!isNotEmpty(readonlyArr2)) {
  // no-op
} else {
  expectType<ReadonlyNonEmptyArray<number>>(readonlyArr2);
}


const arr: number[] = [];
if (isNotEmpty(arr)) {
  expectType<NonEmptyArray<number>>(arr);
}

const arr2: number[] = [];
if (!isNotEmpty(arr2)) {
// no-op
} else {
  expectType<NonEmptyArray<number>>(arr2);
}


// tuples retain their type
const tuple: [number, string] = [1, '1'];
if (isNotEmpty(tuple)) {
  expectType<[number, string]>(tuple);
}

// `as const` retain their type
const tuple2 = [1, 2, 3] as const;
if (isNotEmpty(tuple2)) {
  expectType<readonly [1, 2, 3]>(tuple2);
}
