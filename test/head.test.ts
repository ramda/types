import { expectType } from 'tsd';
import { head } from '../es';
import { isNotEmpty } from '../types/isNotEmpty';

// strings always return `string | undefined`, can't determine "emptiness" like you can with arrays
expectType<string | undefined>(head(''));
// string always return string
expectType<string | undefined>(head('abc'));

// array literals will read the type of the first entry
expectType<string>(head(['fi', 1, 'fum']));
// empty array literals return undefined
expectType<undefined>(head([]));

// typed empty array will be `T | undefined`
expectType<number | undefined>(head([] as number[]));
// as will a typed populated array
expectType<number | undefined>(head([1, 2, 3] as number[]));

// const tuples return the literal type of the last entry
expectType<10>(head([10] as const));
expectType<10>(head([10, 'ten'] as const));
expectType<'10'>(head(['10', 10] as const));
// typed tuples return the type of the last element
expectType<boolean>(head([true] as [boolean]));
expectType<number>(head([10, 'ten', true] as [number, string, boolean]));
expectType<string>(head(['10', 10, false] as [string, number, boolean]));
// typed empty tuple returns undefined, this is expected because there is no `T` here
expectType<undefined>(head([] as []));

// typed arrays return `T | undefined`
expectType<number | string | undefined>(head([10, 'ten'] as Array<number | string>));
expectType<string | number | undefined>(head(['10', 10] as Array<string | number>));
expectType<number | string | undefined>(head([10, 'ten'] as ReadonlyArray<number | string>));
expectType<string | number | undefined>(head(['10', 10] as ReadonlyArray<string | number>));

// cross function testing with isNotEmpty
// test the type narrowing
const readonlyArr: readonly number[] = [];
if (isNotEmpty(readonlyArr)) {
  expectType<number>(head(readonlyArr));
}

const readonlyArr2: readonly number[] = [];
if (!isNotEmpty(readonlyArr2)) {
  // no-op
} else {
  expectType<number>(head(readonlyArr2));
}


const arr: number[] = [];
if (isNotEmpty(arr)) {
  expectType<number>(head(arr));
}

const arr2: number[] = [];
if (!isNotEmpty(arr2)) {
  // no-op
} else {
  expectType<number>(head(arr2));
}
