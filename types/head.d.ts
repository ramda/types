// string - rejecting empty string literals
export function head<T extends string>(str: T extends '' ? never : T): string;
// non-empty tuple - this can be a [T1, T2, T3] style tuple or a `NonEmptyArray` type that can be produced by `isNotEmpty`
export function head<T>(list: readonly [T, ...any[]]): T;
// arrays, because these could be empty, they return `T | undefined
// this is no different than the tuple form since `T[]` can be empty at runtime
// rejects empty tuple
export function head<T extends readonly any[]>(list: T extends readonly [] ? never : T): T extends (infer V)[] ? (V | undefined) : never;
