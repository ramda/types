import { Placeholder, AssocResults } from './util/tools';

// assoc(prop)
export function assoc<K extends PropertyKey>(prop: K extends Placeholder ? never : K): {
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
  // assoc(prop, val)(obj)
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

// assoc(__, val, obj)(prop)
export function assoc<T, U>(__: Placeholder, val: T, obj: U): <K extends PropertyKey>(prop: K extends Placeholder ? never : K) => AssocResults<K, T, U>;

// assoc(prop, __, obj)(val)
export function assoc<K extends PropertyKey, U>(prop: K, __: Placeholder, obj: U): <T>(val: T) => AssocResults<K, T, U>;

// assoc(prop, val, obj)
export function assoc<K extends PropertyKey, T, U>(prop: K, val: T, obj: U): AssocResults<K, T, U>;
