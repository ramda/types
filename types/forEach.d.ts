import { Placeholder } from './util/tools';

export function forEach<T, U extends readonly T[] = readonly T[]>(fn: (x: T) => void, list: U): U;
export function forEach<U extends readonly any[] = readonly any[]>(__: Placeholder, list: U): (fn: (x: U extends readonly (infer T)[] ? T : never) => void) => U;
export function forEach<T>(fn: (x: T) => void): <U extends readonly T[]>(list: U) => U;
