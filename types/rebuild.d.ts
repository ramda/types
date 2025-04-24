import { Placeholder } from './util/tools';

// rebuild(fn)(obj)
export function rebuild<A, B>(fn: (kvp: [string, A]) => [string, B][]): (obj: Record<string, A>) => Record<string, B>;
// rebuild(__, obj)(fn)
export function rebuild<A>(__: Placeholder, obj: Record<string, A>): <B>(fn: (kvp: [string, A]) => [string, B][]) => Record<string, B>;
// rebuild(fn, obj)
export function rebuild<A, B>(fn: (kvp: [string, A]) => [string, B][], obj: Record<string, A>): Record<string, B>;
