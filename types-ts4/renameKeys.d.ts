import { Placeholder, Prettify, Remap } from './util/tools';

// renameKeys(mapping)(obj)
export function renameKeys<U extends Record<PropertyKey, string>>(mapping: U): <T extends Record<keyof U, unknown>>(obj: T) => Prettify<Omit<T, keyof U> & Remap<T, U>>;
// renameKeys(__, obj)(mapping)
export function renameKeys<T>(__: Placeholder, obj: T): <U extends Partial<Record<keyof T, string>>>(mapping: U) => Prettify<Omit<T, keyof U> & Remap<T, U>>;
// renameKeys(mapping, obj)
export function renameKeys<T, U extends Partial<Record<keyof T, string>>>(mapping: U, obj: T): Prettify<Omit<T, keyof U> & Remap<T, U>>;
