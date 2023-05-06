import { Placeholder, Ord } from './util/tools';

// minBy(fn)
export function minBy<T>(fn: (a: T) => Ord): {
  // minBy(fn)(a)(b)
  (a: T): (b: T) => T;
  // minBy(fn)(_, b)
  (__: Placeholder, b: T): (a: T) => T;
  // minBy(fn)(a, b)
  (a: T, b: T): T;
};
// minBy(__, a)
export function minBy<T>(__: Placeholder, a: T): {
  // minBy(__, a)(fn)(b)
  (fn: (a: T) => Ord): (b: T) => T;
  // minBy(__, a)(__, b)(fn)
  (__: Placeholder, b: T): (fn: (a: T) => Ord) => T;
  // minBy(__, a)(fn, b)
  (fn: (a: T) => Ord, b: T): T;
};
// minBy(fn, a)(b)
export function minBy<T>(fn: (a: T) => Ord, a: T): (b: T) => T;
// minBy(__, __, b)
export function minBy<T>(__: Placeholder, __2: Placeholder, b: T): {
  // minBy(__, __, b)(fn)(a)
  (fn: (a: T) => Ord): (a: T) => T;
  // minBy(__, __, b)(__, a)(fn)
  (__: Placeholder, a: T): (fn: (a: T) => Ord) => T;
  // minBy(__, __, b)(fn, a)
  (fn: (a: T) => Ord, a: T): T;
};
// minBy(__, a, b)(fn)
export function minBy<T>(__: Placeholder, a: T, b: T): (fn: (a: T) => Ord) => T;
// minBy(fn, __, b)
export function minBy<T>(fn: (a: T) => Ord, __: Placeholder, b: T): (a: T) => T;
// minBy(fn, a, b)
export function minBy<T>(fn: (a: T) => Ord, a: T, b: T): T;
