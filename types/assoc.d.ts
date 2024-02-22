import { Placeholder } from './util/tools';

// assoc(prop)
export function assoc<K extends PropertyKey>(prop: K): {
  // assoc(prop)(val)(obj)
  <T>(val: T): {
    <U>(obj: U): K extends keyof U ? U[K] extends T ? U : Record<K, T> & Omit<U, K> : U & Record<K, T>;
  }

  // assoc(prop)(__, obj)(val)
  <U>(__: Placeholder, obj: U): {
    <T>(val: T): K extends keyof U ? U[K] extends T ? U : Record<K, T> & Omit<U, K> : U & Record<K, T>;
  }

  // assoc(prop)(val, obj)
  <T, U>(val: T, obj: U): K extends keyof U ? U[K] extends T ? U : Record<K, T> & Omit<U, K> : U & Record<K, T>;
};

// assoc(__, val)
export function assoc<T>(__: Placeholder, val: T) : {
  // assoc(__, val)(prop)(obj)
  <K extends PropertyKey>(prop: K): {
    <U>(obj: U): K extends keyof U ? U[K] extends T ? U : Record<K, T> & Omit<U, K> : U & Record<K, T>;
  }

  // assoc(__, val)(__, obj)(prop)
  <U>(__2: Placeholder, obj: U): {
    <K extends PropertyKey>(prop: K): K extends keyof U ? U[K] extends T ? U : Record<K, T> & Omit<U, K> : U & Record<K, T>;
  };

  // assoc(__, val)(prop, obj)
  <K extends PropertyKey, U>(prop: K, obj: U): K extends keyof U ? U[K] extends T ? U : Record<K, T> & Omit<U, K> : U & Record<K, T>;
};

// assoc(prop, val)(obj)
export function assoc<T, K extends PropertyKey>(prop: K, val: T): {
  <U>(obj: U): U extends Record<K, any> ? U[K] extends T ? U : Record<K, T> & Omit<U, K> : U & Record<K, T>;
};

// assoc(__, __, obj)
export function assoc<U>(__: Placeholder, __2: Placeholder, obj: U): {
  // assoc(__, __, obj)(key)(val)
  <K extends PropertyKey>(key: K): {
    <T>(val: T): K extends keyof U ? U[K] extends T ? U : Record<K, T> & Omit<U, K> : U & Record<K, T>;
  }
  // assoc(__, __, obj)(__, value)(key)
  <T>(__: Placeholder, val: T): {
    <K extends PropertyKey>(key: K): K extends keyof U ? U[K] extends T ? U : Record<K, T> & Omit<U, K> : U & Record<K, T>;
  }
  // assoc(__, __, obj)(key, value)
  <K extends PropertyKey, T>(key: K, val: T): K extends keyof U ? U[K] extends T ? U : Record<K, T> & Omit<U, K> : U & Record<K, T>;
};

// assoc(__, val, obj)(prop)
export function assoc<T, U>(__: Placeholder, val: T, obj: U): <K extends PropertyKey>(prop: K) => K extends keyof U ? T extends U[K] ? U : Record<K, T> & Omit<U, K> : U & Record<K, T>;

// assoc(prop, __, obj)(val)
export function assoc<U, K extends PropertyKey>(prop: K, __: Placeholder, obj: U): <T>(val: T) => K extends keyof U ? U[K] extends T ? U : Record<K, T> & Omit<U, K> : U & Record<K, T>;

// assoc(prop, val, obj)
export function assoc<T, U, K extends PropertyKey>(prop: K, val: T, obj: U): K extends keyof U ? U[K] extends T ? U : Record<K, T> & Omit<U, K> : U & Record<K, T>;
