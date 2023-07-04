import { Placeholder } from './util/tools';

export function groupBy<T, K extends string = string>(fn: (a: T) => K): (list: readonly T[]) => Record<K, T[]>;
export function groupBy<T>(__: Placeholder, list: readonly T[]): <K extends string = string>(fn: (a: T) => K) => Record<K, T[]>;
export function groupBy<T, K extends string = string>(fn: (a: T) => K, list: readonly T[]): Record<K, T[]>;
