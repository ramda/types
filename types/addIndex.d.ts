import { Placeholder } from './util/tools';

// with `addIndex<P, V>`, the `P` and `V` are just used to to constrain `fn` being passed to `addIndex`
// allowing the return of the correct type
// those returning types need their own generics `T` and `U` to be separately determined
// when those contracts are fulfilled, otherwise you just get `undefined` everywhere

// WARNING, map MUST come before forEach for this to work! Overloading order is important!

// Special case for map
export function addIndex<P, V>(
  fn: (f: (item: P) => V, list: readonly P[]) => V[],
): {
  <T, U>(a: (item: T, idx: number, list: T[]) => U, b: readonly T[]): U[];
  <T>(__: Placeholder, b: readonly T[]): <U>(a: (item: T, idx: number, list: T[]) => U) => U[];
  <T, U>(a: (item: T, idx: number, list: T[]) => U): (b: readonly T[]) => U[];
};

// Special case for forEach
export function addIndex<P>(
  fn: (f: (item: P) => void, list: readonly P[]) => P[],
): {
  <T>(a: (item: T, idx: number, list: T[]) => void, b: readonly T[]): T[];
  <T>(__: Placeholder, b: readonly T[]): (a: (item: T, idx: number, list: T[]) => void) => T[];
  <T>(a: (item: T, idx: number, list: T[]) => void): (b: readonly T[]) => T[];
};

// Special case for filter
export function addIndex<P>(
  fn: (f: (item: P) => item is P, list: readonly P[]) => P[],
): {
  <T>(a: (item: T, idx: number, list: T[]) => void, b: readonly T[]): T[];
  <T>(__: Placeholder, b: readonly T[]): (a: (item: T, idx: number, list: T[]) => void) => T[];
  <T>(a: (item: T, idx: number, list: T[]) => void): (b: readonly T[]) => T[];
};

// Special case for reduce
export function addIndex<P, V>(
  fn: (f: (acc: V, item: P) => V, acc: V, list: readonly P[]) => V,
): {
  // addIndex(reducer)(f, acc, list)
  <T, U>(f: (acc: U, item: T, idx: number, list: T[]) => U, acc: U, list: readonly T[]): U;
  // addIndex(reducer)(__, acc, list)(f)
  <T, U>(__: Placeholder, acc: U, list: readonly T[]): (f: (acc: U, item: T, idx: number, list: T[]) => U) => U;
  // addIndex(reducer)(f, __, list)(acc)
  <T, U>(f: (acc: U, item: T, idx: number, list: T[]) => U, _: Placeholder, list: readonly T[]): (acc: U) => U;
  // addIndex(reducer)(__, __, list)
  <T>(__: Placeholder, __2: Placeholder, list: readonly T[]): {
    // addIndex(reducer)(__, __, list)(f, acc)
    <U>(f: (acc: U, item: T, idx: number, list: T[]) => U, acc: U): U;
    // addIndex(reducer)(__, __, list)(__, acc)(f)
    <U>(__: Placeholder, acc: U): (f: (acc: U, item: T, idx: number, list: T[]) => U) => U;
    // addIndex(reducer)(__, __, list)(f)(acc)
    <U>(f: (acc: U, item: T, idx: number, list: T[]) => U): (acc: U) => U;
  };
  // addIndex(reducer)(f, acc)(list)
  <T, U>(f: (acc: U, item: T, idx: number, list: T[]) => U, acc: U): (list: readonly T[]) => U;
  // addIndex(reducer)(__, acc)
  <U>(__: Placeholder, acc: U): {
    // addIndex(reducer)(__, acc)(f, list)
    <T>(f: (acc: U, item: T, idx: number, list: T[]) => U, list: readonly T[]): U;
    // addIndex(reducer)(__, acc)(__, list)(f)
    <T>(__: Placeholder, list: readonly T[]): (f: (acc: U, item: T, idx: number, list: T[]) => U) => U;
    // addIndex(reducer)(__, acc)(F)(list)
    <T>(f: (acc: U, item: T, idx: number, list: T[]) => U): (list: readonly T[]) => U;
  };
  // addIndex(reducer)(f)
  <T, U>(f: (acc: U, item: T, idx: number, list: T[]) => U): {
    // addIndex(reducer)(f)(acc, list)
    (acc: U, list: readonly T[]): U;
    // addIndex(reducer)(f)(__, list)(acc)
    (__: Placeholder, list: readonly T[]): (acc: U) => U;
    // addIndex(reducer)(f)(acc)(list)
    (acc: U): (list: readonly T[]) => U;
  };
};
