import { NonEmptyArray, ReadOnlyNonEmptyArray } from './util/tools';

export function isNotEmpty<T>(value: readonly T[]): value is ReadOnlyNonEmptyArray<T>;
export function isNotEmpty<T>(value: T[]): value is NonEmptyArray<T>;
export function isNotEmpty(value: any): boolean;
