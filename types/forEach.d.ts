import { Placeholder } from './util/tools';

export function forEach<T>(fn: (x: T) => void): <U extends readonly T[]>(list: U) => U;
export function forEach<U extends readonly any[]>(__: Placeholder, list: U): (fn: (x: U extends readonly (infer T)[] ? T : never) => void) => U;
export function forEach<U extends readonly any[]>(fn: (x: U extends readonly (infer T)[] ? T : never) => void, list: U): U;
