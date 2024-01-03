import { WidenLiterals } from './util/tools';

// propEq(val)
export function propEq<T>(val: T): {
  // propEq(val)(name)(obj)
  <K extends PropertyKey>(name: K): (obj: Record<K, WidenLiterals<T>>) => boolean;
  // propEq(val)(name, obj)
  // type it this way for better error message for unknown keys
  <K extends keyof U, U extends Record<PropertyKey, WidenLiterals<T>>>(name: K, obj: U): boolean;
};
// propEq(val, name)(obj)
export function propEq<T, K extends PropertyKey>(val: T, name: K): (obj: Record<K, WidenLiterals<T>>) => boolean;
// propEq(val, name, obj)
export function propEq<K extends keyof U, U>(val: U[K], name: K, obj: U): boolean;
