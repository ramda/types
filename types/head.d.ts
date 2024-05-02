import { ReadonlyNonEmptyArray } from '../es';

export function head(str: string): string | undefined;
// non-empty tuple - Readonly here catches regular tuples too
export function head<T>(list: readonly [T, ...any[]]): T;
// non-empty arrays - Readonly here catches regular arrays too
export function head<T>(list: ReadonlyNonEmptyArray<T>): T;
// arrays, because these could be empty, they return `T | undefined
export function head<T>(list: readonly T[]): T | undefined;
