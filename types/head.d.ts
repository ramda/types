// empty tuple - purposefully `never`. `head` should never work on an empty string
export function head(str: ''): never;
// string
export function head(str: string): string;
// empty tuple - purposefully `never`. `head` should never work on tuple type with no length
export function head(list: readonly []): never;
// non-empty tuple - this can be a [T1, T2, T3] style tuple or a `NonEmptyArray` type that can be produced by `isNotEmpty`
export function head<T1, TRest>(list: readonly [T1, ...TRest[]]): T1;
// arrays, because these could be empty, they return `T | undefined`
// this is no different than the tuple form since `T[]` can be empty at runtime
export function head<T>(list: readonly T[]): T | undefined;
