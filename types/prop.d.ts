/* eslint-disable @typescript-eslint/no-unused-vars */
import { Placeholder } from './util/tools';

// prop(key)(obj)
export function prop<K extends PropertyKey>(prop: K extends Placeholder ? never : K): <U extends Record<K, any>>(obj: U) => U[K];
// prop(__, obj))key
export function prop<U>(__: Placeholder, obj: U): <K extends keyof U>(prop: K) => U[K];
// prop(key, obj)
export function prop<K extends keyof U, U>(prop: K extends Placeholder ? never : K, obj: U): U[K];
