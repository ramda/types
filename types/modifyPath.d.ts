// import { Path } from './util/tools';

// TODO: there has to be a better way to do this
// Specifically, the recursive Omit/Record combos that act as our returns
export function modifyPath<U, K0 extends keyof U, T>(path: [K0], fn: (value: U[K0]) => T, obj: U): Omit<U, K0> & Record<K0, T>;
export function modifyPath<
  U,
  K0 extends keyof U,
  K1 extends keyof U[K0],
  T
>(path: [K0, K1], fn: (value: U[K0][K1]) => T, obj: U): Omit<U, K0> & Record<K0, Omit<U[K0], K1> & Record<K1, T>>;

export function modifyPath<
  U,
  K0 extends keyof U,
  K1 extends keyof U[K0],
  K2 extends keyof U[K0][K1],
  T
>(path: [K0, K1], fn: (value: U[K0][K1][K2]) => T, obj: U): Omit<U, K0> & Record<K0, Omit<U[K0], K1> & Record<K1, Record<K2, Omit<U[K0][K1], K2> & Record<K2, T>>>>;
