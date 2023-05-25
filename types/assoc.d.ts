import { Placeholder, AssocResults } from './util/tools';

// assoc(prop)
export function assoc<K extends PropertyKey>(prop: K): {
  // assoc(prop)(val)
  <T>(val: T): {
    // assoc(prop)(val)(obj), when obj has key prop, tests if val is typeof obj[prop] for best return type
    <U>(obj: U): AssocResults<K, T, U>;
  }

  // assoc(prop)(__, obj)
  <U>(__: Placeholder, obj: U): {
    // assoc(prop)(__, obj)(val), when obj has key prop, tests if val is typeof obj[prop] for best return type
    <T>(val: T): AssocResults<K, T, U>;
  }

  // assoc(prop)(val, obj) when obj has key prop, tests if val is typeof obj[prop] for best return type
  <T, U>(val: T, obj: U): AssocResults<K, T, U>;
};

// assoc(__, val)
export function assoc<T>(__: Placeholder, val: T) : {
  // assoc(__, val)(prop)
  <K extends PropertyKey>(prop: K extends Placeholder ? never : K): {
    // assoc(__, val)(prop)(obj)
    <U>(obj: U): AssocResults<K, T, U>;
  }

  // assoc(__, val)(__, obj)
  <U>(__2: Placeholder, obj: U): {
    // assoc(__, val)(__, obj)(prop)
    <K extends PropertyKey>(prop: K): AssocResults<K, T, U>;
  };

  // assoc(__, val)(prop, obj)
  <K extends PropertyKey, U>(prop: K, obj: U): AssocResults<K, T, U>;
};

// assoc(prop, val)
export function assoc<K extends PropertyKey, T>(prop: K extends Placeholder ? never : K, val: T): {
  // assoc(prop, val)(obj), when obj has key prop, tests if val is typeof obj[prop] for best return type
  <U>(obj: U): AssocResults<K, T, U>;
};

// assoc (__, __, obj)
export function assoc<U>(__: Placeholder, __2: Placeholder, obj: U): {
  // assoc(__, __, obj)(prop)(val)
  <K extends PropertyKey>(prop: K extends Placeholder ? never : K): <T>(val: T) => AssocResults<K, T, U>;

  // assoc(__, __, obj)(__, val)(prop)
  <T>(__: Placeholder, val: T): <K extends PropertyKey>(key: K) => AssocResults<K, T, U>;

  // assoc(__, __, obj)(prop, val)
  <K extends PropertyKey, T>(prop: K, val: T): AssocResults<K, T, U>;
};

// assoc(prop, __, obj)(val), when prop is not keyof obj
export function assoc<K extends PropertyKey, U>(prop: K extends Placeholder ? never : K, __: Placeholder, obj: U): <T>(val: T) => U & Record<K, T>;
// assoc(prop, __, obj)(val), when K is keyof obj, tests if val is typeof obj[prop] for best return type
export function assoc<K extends keyof U, U>(prop: K, __: Placeholder, obj: U): <T>(val: T) => T extends U[K] ? U : Omit<U, K> & Record<K, T>;
// assoc(__, val, obj)(prop), this tests if prop is keyof obj and if val is typeof obj[prop] for best return type
export function assoc<T, U>(__: Placeholder, val: T extends Placeholder ? never : T, obj: U): <K extends PropertyKey>(prop: K) => K extends keyof U ? T extends U[K] ? U : Omit<U, K> & Record<K, T> : U & Record<K, T>;
// assoc(prop, val, obj) when prop is not keyof obj
export function assoc<K extends PropertyKey, T, U>(prop: K extends Placeholder ? never : K, val: T extends Placeholder ? never : T, obj: U): U & Record<K, T>;
// assoc(prop, val, obj) when prop is keyof obj  and val is not same type
export function assoc<K extends keyof U, T, U>(prop: K, val: T extends Placeholder ? never : T, obj: U): Omit<U, K> & Record<K, T>;
// assoc(prop, val, obj) when prop is keyof obj and val is same type
export function assoc<K extends keyof U, U>(prop: K, val: U[K], obj: U): U;
