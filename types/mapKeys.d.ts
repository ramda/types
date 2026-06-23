import { Placeholder } from './util/tools';

// mapKeys(fn)(obj)
export function mapKeys(fn: (key: string) => string): <T>(obj: Record<string, T>) => Record<string, T>;
// mapKeys(__, obj)(fn)
export function mapKeys<T>(__: Placeholder, obj: Record<string, T>): (fn: (key: string) => string) => Record<string, T>;
// mapKeys(fn, obj)
export function mapKeys<T>(fn: (key: string) => string, obj: Record<string, T>): Record<string, T>;
