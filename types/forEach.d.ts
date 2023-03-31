import { Placeholder } from './util/tools';

export function forEach<T>(fn: (x: T) => void, list: readonly T[]): T[];
export function forEach<T>(__: Placeholder, list: readonly T[]): (fn: (x: T) => void) => T[];
export function forEach<T>(fn: (x: T) => void): (list: readonly T[]) => T[];
