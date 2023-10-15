import { WidenLiterals } from './util/tools';

// propEq(val)
export function propEq<T>(val: T): {
  // propEq(val)(name)(obj)
  <K extends PropertyKey>(name: K): <U extends Partial<Record<K, any>>>(obj: U) => T extends WidenLiterals<U[K]> ? boolean : never;
  // propEq(val)(name, obj)
  // type it this way for better error message for unknown keys
  <K extends keyof U, U extends Partial<Record<PropertyKey, any>>>(name: K, obj: U): T extends WidenLiterals<U[K]> ? boolean : never;
};
// propEq(val, name)(obj)
export function propEq<T, K extends PropertyKey>(val: T, name: K): <U extends Partial<Record<PropertyKey, any>>>(obj: U) => T extends WidenLiterals<U[K]> ? boolean : never;
// propEq(val, name, obj)
export function propEq<K extends keyof U, U>(val: U[K], name: K, obj: U): boolean;
