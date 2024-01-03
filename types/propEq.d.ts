import { WidenLiterals } from './util/tools';

// propEq(val)
export function propEq<T>(val: T): {
  // propEq(val)(name)(obj)
  <K extends PropertyKey>(name: K): <U extends Record<K, any>>(obj: T extends WidenLiterals<U[K]> ? U : never) => boolean;
  // propEq(val)(name, obj)
  <K extends keyof U, U extends Record<PropertyKey, any>>(name: K, obj: T extends WidenLiterals<U[K]> ? U : never): boolean;
};
// propEq(val, name)(obj)
export function propEq<T, K extends PropertyKey>(val: T, name: K): <U extends Record<K, any>>(obj: T extends WidenLiterals<U[K]> ? U : never) => boolean;
// propEq(val, name, obj)
export function propEq<K extends keyof U, U>(val: U[K], name: K, obj: U): boolean;
