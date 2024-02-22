import { WidenLiterals } from './util/tools';

export function propEq<T>(val: T): {
  // propEq(val)(name)(obj)
  <K extends PropertyKey>(name: K): (obj: Partial<Record<K, WidenLiterals<T>>>) => boolean;
  // propEq(val)(name, obj)
  <K extends PropertyKey>(name: K, obj: Partial<Record<K, WidenLiterals<T>>>): boolean;
};
// propEq(val, name)(obj)
export function propEq<const T, const K extends PropertyKey>(val: T, name: K): (obj: Partial<Record<K, WidenLiterals<T>>>) => boolean;
// propEq(val, name, obj)
export function propEq<K extends keyof U, U>(val: U[K], name: K, obj: U): boolean;
