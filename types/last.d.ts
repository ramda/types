import { ReadonlyNonEmptyArray } from '../es';

export function last(str: string): string | undefined;
// non-empty tuple - Readonly here catches regular tuples too
export function last<T>(list: readonly [...any[], T]): T;
// non-empty arrays - Readonly here catches regular arrays too
export function last<T>(list: ReadonlyNonEmptyArray<T>): T;
// arrays, because these could be empty, they return `T | undefined
export function last<T>(list: readonly T[]): T | undefined;
