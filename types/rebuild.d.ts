import { Placeholder } from './util/tools';

// rebuild(fn)(obj)
export function rebuild<Obj extends object, OutValue>(fn: (kvp: [keyof Obj, Obj[keyof Obj]]) => [string, OutValue][]): (obj: Obj) => Record<string, OutValue>;
// rebuild(__, obj)(fn)
export function rebuild<Obj extends object>(__: Placeholder, obj: Obj): <OutValue>(fn: (kvp: [keyof Obj, Obj[keyof Obj]]) => [string, OutValue][]) => Record<string, OutValue>;
// rebuild(fn, obj)
export function rebuild<Obj extends object, OutValue>(fn: (kvp: [keyof Obj, Obj[keyof Obj]]) => [string, OutValue][], obj: Obj): Record<string, OutValue>;
