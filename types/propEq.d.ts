import { Placeholder, WidenLiterals } from './util/tools';

// propEq(val)
export function propEq<T>(val: T): {
  // propEq(val)(name)(obj)
  <K extends PropertyKey>(name: K): (obj: Record<K, WidenLiterals<T>>) => boolean;
  // propEq(val)(__, obj)(name)
  <U>(__: Placeholder, obj: U): <K extends keyof U>(name: K) => U[K] extends WidenLiterals<T> ? boolean : never;
  // propEq(val)(name, obj)
  <K extends PropertyKey>(name: K, obj: Record<K, WidenLiterals<T>>): boolean;
};

// propEq(__, name)
export function propEq<K extends PropertyKey>(__: Placeholder, name: K): {
  // propEq(val)(obj)
  <T>(val: T): (obj: Record<K, WidenLiterals<T>>) => boolean;
  // propEq(__, obj)(val)
  <U extends Record<K, any>>(__: Placeholder, obj: U): (val: WidenLiterals<U[K]>) => boolean;
  // propEq(val, obj)
  <T>(val: T, obj: Record<K, WidenLiterals<T>>): boolean;
};
// propEq(val, name)(obj)
export function propEq<T, K extends PropertyKey>(val: T, name: K): (obj: Record<K, WidenLiterals<T>>) => boolean;

// propEq(__, __, obj)
export function propEq<U>(__: Placeholder, __2: Placeholder, obj: U): {
  // propEq(__, __, obj)(val)(name)
  <T>(val: T): <K extends keyof U>(name: K) => boolean;
  // propEq(__, __, obj)(__, key)(name)
  <K extends keyof U>(__: Placeholder, key: K): (val: WidenLiterals<U[K]>) => boolean;
  // propEq(__, __, obj)(name, key)
  <K extends keyof U>(val: WidenLiterals<U[K]>, name: K): boolean;
};

// propEq(__, name, obj)(val)
export function propEq<K extends keyof U, U>(__: Placeholder, name: K, obj: U): (val: WidenLiterals<U[K]>) => boolean;
// propEq(val, __, obj)(name)
export function propEq<T, U>(val: T, __: Placeholder, obj: U): <K extends keyof U>(name: K) => U[K] extends WidenLiterals<T> ? boolean : never;
// propEq(val, name, obj)
export function propEq<K extends keyof U, U>(val: WidenLiterals<U[K]>, name: K, obj: U): boolean;
