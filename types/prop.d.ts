/* eslint-disable @typescript-eslint/no-unused-vars */
import { Placeholder } from './util/tools';

// most common use case, when key is known on the object
export function prop<K extends keyof U, U>(key: K, obj: U): U[K];
// placeholder
export function prop<U>(__: Placeholder, obj: U): <K extends keyof U>(key: K) => U[K];
// curried
export function prop<K extends PropertyKey>(key: K): <U>(obj: U) => U extends Record<K, infer T> ? T : never;
