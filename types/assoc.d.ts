import { Placeholder } from './util/tools';

// assoc(prop)
export function assoc<K extends PropertyKey>(prop: K): {
  // assoc(prop)(val)(obj)
  <T>(val: T): <U extends Record<K, T>>(obj: U) => U;

  // assoc(prop)(__, obj)(val)
  <U extends Record<K, any>>(__: Placeholder, obj: U): <T extends U[K]>(val: T) => U;

  // assoc(prop)(val, obj) when obj has key prop, tests if val is typeof obj[prop] for best return type
  <U extends Record<K, T>, T>(val: T, obj: U): U;
};

// assoc(__, val)
export function assoc<T>(__: Placeholder, val: T) : {
  // assoc(__, val)(prop)(obj)
  <K extends PropertyKey>(prop: K extends Placeholder ? never : K): <U extends Record<K, T>>(obj: U) => U;

  // assoc(__, val)(__, obj)(prop)
  <U>(__2: Placeholder, obj: U): <K extends keyof U>(prop: T extends U[K] ? K : never) => U;

  // assoc(__, val)(prop, obj)
  <U extends Record<K, T>, K extends keyof U>(prop: K, obj: U): U;
};

// assoc(prop, val)(obj)
export function assoc<K extends PropertyKey, T>(prop: K extends Placeholder ? never : K, val: T): <U extends Record<K, T>>(obj: U) => U;

// assoc (__, __, obj)
export function assoc<U>(__: Placeholder, __2: Placeholder, obj: U): {
  // assoc(__, __, obj)(prop)(val)
  <K extends keyof U>(prop: K extends Placeholder ? never : K): <T extends U[K]>(val: T) => U;

  // assoc(__, __, obj)(__, val)(prop)
  <T>(__: Placeholder, val: T): <K extends keyof U>(prop: T extends U[K] ? K : never) => U;

  // assoc(__, __, obj)(prop, val)
  <K extends keyof U, T extends U[K]>(prop: K, val: T): U;
};

// assoc(__, val, obj)(prop)
export function assoc<U, T extends U[keyof U]>(__: Placeholder, val: T, obj: U): <K extends keyof U>(prop: T extends U[K] ? K : never) => U;

// assoc(prop, __, obj)(val)
export function assoc<U, K extends keyof U>(prop: K, __: Placeholder, obj: U): <T extends U[K]>(val: T) => U;

// assoc(prop, val, obj)
export function assoc<U, K extends keyof U, T extends U[K]>(prop: K, val: T, obj: U): U;
