import { Placeholder, Reduced } from './util/tools';

// reduce(f, acc, list)
export function reduce<T, U>(f: (acc: U, elem: T) => U | Reduced<U>, acc: U, list: readonly T[]): U;
// reduce(__, acc, list)(f)
export function reduce<T, U>(__: Placeholder, acc: U, list: readonly T[]): (f: (acc: U, elem: T) => U | Reduced<U>) => U;
// reduce(f, _, list)(acc)
export function reduce<T, U>(f: (acc: U, elem: T) => U | Reduced<U>, __: Placeholder, list: readonly T[]): (acc: U) => U;
// reduce(_, _, list)
export function reduce<T>(__: Placeholder, __2: Placeholder, list: readonly T[]): {
  // reduce(__, __, list)(f, acc)
  <U>(f: (acc: U, elem: T) => U | Reduced<U>, acc: U): U | Reduced<U>;
  // reduce(__, __, list)(__, acc)(f)
  <U>(__: Placeholder, acc: U): (f: (acc: U, elem: T) => U | Reduced<U>) => U | Reduced<U>;
  // reduce(__, __, list)(f)(acc)
  <U>(f: (acc: U, elem: T) => U | Reduced<U>): (acc: U) => U | Reduced<U>;
};
// reduce(f, acc)(list)
export function reduce<T, U>(f: (acc: U, elem: T) => U | Reduced<U>, acc: U): (list: readonly T[]) => U;
// reduce(__, acc)
export function reduce<T, U>(__: Placeholder, acc: U): {
  // reduce(__, acc)(f, list)
  (f: (acc: U, elem: T) => U | Reduced<U>, list: readonly T[]): U;
  // reduce(__, acc)(__, list)(f)
  (__: Placeholder, list: readonly T[]): (f: (acc: U, elem: T) => U | Reduced<U>) => U;
  // reduce(__, acc)(f)(list)
  (f: (acc: U, elem: T) => U | Reduced<U>): (list: readonly T[]) => U;
};
// reduce(f)
export function reduce<T, U>(f: (acc: U, elem: T) => U | Reduced<U>): {
  // reduce(f)(acc, list)
  (acc: U, list: readonly T[]): U;
  // reduce(f)(__, list)(acc)
  (__: Placeholder, list: readonly T[]): (acc: U) => U;
  // reduce(f)(acc)(list)
  (acc: U): (list: readonly T[]) => U;
};
