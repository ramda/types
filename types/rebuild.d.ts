import { Placeholder } from './util/tools';

// rebuild(fn)(obj)
export function rebuild<T, V>(fn: (kvp: [keyof T, T[keyof T]]) => [string, V][]): (obj: T) => Record<string, V>;
// rebuild(__, obj)(fn)
export function rebuild<T>(__: Placeholder, obj: T): <V>(fn: (kvp: [keyof T, T[keyof T]]) => [string, V][]) => Record<string, V>;
// rebuild(fn, obj)
export function rebuild<T, V>(fn: (kvp: [keyof T, T[keyof T]]) => [string, V][], obj: T): Record<string, V>;
