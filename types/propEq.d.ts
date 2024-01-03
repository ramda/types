import { WidenLiterals } from './util/tools';

// propEq(val)
export function propEq<T>(val: T): {
  // propEq(val)(name)(obj)
  <K extends PropertyKey>(name: K): <U extends Partial<Record<K, any>>>(obj: Required<U> extends Record<K, any> ? T extends WidenLiterals<U[K]> ? U : never : never) => boolean;
  // propEq(val)(name, obj)
  <K extends PropertyKey, U extends Partial<Record<K, any>>>(name: K, obj: Required<U> extends Record<K, any> ? T extends WidenLiterals<U[K]> ? U : never : never): boolean;
};
// propEq(val, name)(obj)
export function propEq<T, K extends PropertyKey>(val: T, name: K): <U extends Partial<Record<K, any>>>(obj: Required<U> extends Record<K, any> ? T extends WidenLiterals<U[K]> ? U : never : never) => boolean;
// propEq(val, name, obj)
export function propEq<K extends keyof U, U>(val: U[K], name: K, obj: U): boolean;
