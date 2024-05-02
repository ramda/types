import { ReadonlyNonEmptyArray } from '../es';

export function last(str: string): string | undefined;
// non-empty tuple - this can be a [T1, T2, T3] style tuple or a `NonEmptyArray` type that can be produced by `isNotEmpty`
export function last<T>(list: readonly [...any[], T]): T;
// non-empty arrays, these types don't fall into the non-empty overload, Readonly here catches regular arrays too
export function last<T>(list: ReadonlyNonEmptyArray<T>): T;
// arrays, because these could be empty, they return `T | undefined
// this is no different than the tuple form since `T[]` can be empty at runtime
export function last<T>(list: readonly T[]): T | undefined;
