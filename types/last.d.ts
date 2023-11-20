import { ReadonlyNonEmptyArray } from '../es';

// string - rejecting empty string literals
export function last<T extends string>(str: T extends '' ? never : T): string;
// non-empty tuple - this can be a [T1, T2, T3] style tuple or a `NonEmptyArray` type that can be produced by `isNotEmpty`
export function last<T>(list: readonly [...any[], T]): T;
// non-empty arrays, these types don't fall into the non-empty overload, Readonly here catches regular arrays too
export function last<T>(list: ReadonlyNonEmptyArray<T>): T;
// arrays, because these could be empty, they return `T | undefined
// this is no different than the tuple form since `T[]` can be empty at runtime
// rejects empty tuple
export function last<T extends readonly any[]>(list: T extends readonly [] ? never : T): T extends (infer V)[] ? (V | undefined) : never;
