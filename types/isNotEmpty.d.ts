import { NonEmptyArray, ReadonlyNonEmptyArray } from './util/tools';

// array has to come first, because readonly T[] falls through
export function isNotEmpty<T>(value: T[]): value is NonEmptyArray<T>;
export function isNotEmpty<T>(value: readonly T[]): value is ReadonlyNonEmptyArray<T>;
export function isNotEmpty(value: any): boolean;
