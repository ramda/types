/* eslint-disable @typescript-eslint/no-unused-vars */
import { Placeholder } from './util/tools';

// placeholder
export function prop<U>(__: Placeholder, obj: U): {
  // key known
  <_, K extends keyof U>(key: K): U[K];
  // key unknown, return value settable in generic
  <V>(key: PropertyKey): V | undefined;
};
// most common use case, when key is known on the object
export function prop<K extends keyof U, U>(key: K, obj: U): U[K];
// if the key is not known, fall back to this, which defaultly returns unknown, but the generic allows for user to set the return value
export function prop<V>(key: PropertyKey, obj: unknown): V | undefined;
// key known, `_` is to keep typescript from getting confused when trying to use the type below
export function prop<_, K extends PropertyKey>(key: K): <U>(obj: U) => U extends (Record<K, infer T> | Array<infer T>) ? T : never;
// key unknown
export function prop<V>(key: PropertyKey): (obj: unknown) => V | unknown;
