import { Placeholder } from './util/tools';

// assoc(prop, val, obj) when prop is keyof obj and val is same type
export function assoc<K extends keyof U, U>(prop: K, val: U[K], obj: U): U;
// assoc(prop, val, obj) when prop is keyof obj  and val is not same type
export function assoc<K extends keyof U, T, U>(prop: K, val: T extends Placeholder ? never : T, obj: U): Omit<U, K> & Record<K, T>;
// assoc(prop, val, obj) when prop is not keyof obj
export function assoc<K extends PropertyKey, T, U>(prop: K extends Placeholder ? never : K, val: T extends Placeholder ? never : T, obj: U): U & Record<K, T>;
// assoc(__, val, obj)(prop), this tests if prop is keyof obj and if val is typeof obj[prop] for best return type
export function assoc<T, U>(__: Placeholder, val: T extends Placeholder ? never : T, obj: U): <K extends PropertyKey>(prop: K) => K extends keyof U ? T extends U[K] ? U : Omit<U, K> & Record<K, T> : U & Record<K, T>;
// assoc(prop, __, obj)(val), when K is keyof obj, tests if val is typeof obj[prop] for best return type
export function assoc<K extends keyof U, U>(prop: K, __: Placeholder, obj: U): <T>(val: T) => T extends U[K] ? U : Omit<U, K> & Record<K, T>;
// assoc(prop, __, obj)(val), when prop is not keyof obj
export function assoc<K extends PropertyKey, U>(prop: K extends Placeholder ? never : K, __: Placeholder, obj: U): <T>(val: T) => U & Record<K, T>;
// assoc (__, __, obj)
export function assoc<U>(__: Placeholder, __2: Placeholder, obj: U): {
  // assoc(__, __, obj)(prop, val) when prop is keyof obj and val is same type
  <K extends keyof U>(prop: K, val: U[K]): U;
  // assoc(__, __, obj)(prop, val) when prop is keyof obj and val is not same type
  <K extends keyof U, T>(prop: K, val: T extends Placeholder ? never : T): Omit<U, K> & Record<K, T>;
  // assoc(__, __, obj)(prop, val) when prop is not keyof obj
  <K extends PropertyKey, T>(prop: K extends Placeholder ? never : K, val: T extends Placeholder ? never : T): U & Record<K, T>;
  // assoc(__, __, obj)(__, val)(prop)
  <T>(__: Placeholder, val: T extends Placeholder ? never : T): <K extends keyof U>(prop: K) => T extends U[K] ? U : Omit<U, K> & Record<K, T>;
  // assoc(__, __, obj)(prop)(val) prop is keyof obj
  <K extends keyof U>(prop: K): <T>(val: T extends Placeholder ? never : T) => T extends U[K] ? U : Omit<U, K> & Record<K, T>;
  // assoc(__, __, obj)(prop)(val) prop is not keyof obj
  <K extends PropertyKey>(prop: K extends Placeholder ? never : K): <T>(val: T extends Placeholder ? never : T) => U & Record<K, T>;
};
// assoc(prop, val) -- TODO, look into `map` problem
export function assoc<K extends PropertyKey, T>(prop: K extends Placeholder ? never : K, val: T): {
  // assoc(prop, val)(obj), when obj has key prop, tests if val is typeof obj[prop] for best return type
  <U extends Record<K, any>>(obj: U): T extends U[K] ? U : Omit<U, K> & Record<K, T>;
  // assoc(prop, val)(obj), when obj does not have key prop
  <U>(obj: U): U & Record<K, T>;
};
// assoc(__, val)
export function assoc<T>(__: Placeholder, val: T) : {
  // assoc(__, val)(prop, obj), when obj has key prop, tests if val is typeof obj[prop] for best return type
  <K extends keyof U, U>(prop: K, obj: U): U[K] extends T ? U : Omit<U, K> & Record<K, T>;
  // assoc(__, val)(prop, obj), when obj does not have key prop
  <K extends PropertyKey, U>(prop: K, obj: U): K extends Placeholder ? never : U & Record<K, T>;

  // assoc(__, val)(__, obj)
  <U>(__2: Placeholder, obj: U): {
    // assoc(__, val)(__, obj)(prop), prop is keyof obj, tests if val is typeof obj[prop] for best return type
    <K extends keyof U>(prop: K): U[K] extends T ? U : Omit<U, K> & Record<K, T>;
    // assoc(__, val)(__, obj)(prop), prop is not keyof obj
    <K extends PropertyKey>(prop: K): U & Record<K, T>;
  };

  // assoc(__, val)(prop)
  <K extends PropertyKey>(prop: K extends Placeholder ? never : K): {
    // assoc(__, val)(prop)(obj) when obj has key prop, tests if val is typeof obj[prop] for best return type
    <U extends Record<K, any>>(obj: U): U[K] extends T ? U : Omit<U, K> & Record<K, T>;
    // assoc(__, val)(prop)(obj) when obj does not have key prop
    <U>(obj: U): U & Record<K, T>;
  }
};
// assoc(prop)
export function assoc<K extends PropertyKey>(prop: K): {
  // assoc(prop)(val, obj) when obj has key prop, tests if val is typeof obj[prop] for best return type
  <T, U extends Record<K, any>>(val: T extends Placeholder ? never : T, obj: U): U[K] extends T ? U : Record<K, T> & Omit<U, K>;
  // assoc(prop)(val, obj) when obj does not have a key prop
  <T, U>(val: T, obj: U): U & Record<K, T>;

  // assoc(prop)(__, obj) when prop is keyof obj
  <U extends Record<K, any>>(__: Placeholder, obj: U): {
    // assoc(prop)(__, obj)(val) if val is typeof obj[prop]
    <T extends U[K]>(val: T): U;
    // assoc(prop)(__, obj)(val) if val is not typeof obj[prop]
    <T>(val: T): Record<K, T> & Omit<U, K>;
  }
  // assoc(prop)(__, obj) when prop is not keyof obj
  <U>(__: Placeholder, obj: U): <T>(val: T) => U & Record<K, T>;

  // assoc(prop)(val)
  <T>(val: T): {
    // assoc(prop)(val)(obj) when obj has key prop and val is typeof obj[prop]
    <U extends Record<K, T>>(obj: U): U;
    // assoc(prop)(val)(obj) when obj has key prop and val is not typeof obj[prop]
    <U extends Record<K, any>>(obj: U): Record<K, T> & Omit<U, K>;
    // assoc(prop)(val)(obj) when obj does not have key prop
    <U>(obj: U): U & Record<K, T>;
  }
};
