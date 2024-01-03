import { Placeholder, Ord } from './util/tools';

// Commutative means we can simplify the overloads for handlings placeholders
// minBy(fn)
export function minBy<T>(fn: (a: T) => Ord): {
  // minBy(fn)(a)(b)
  (a: T): (b: T) => T;
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
// minBy(__, a, b)(fn)
export function minBy<T>(__: Placeholder, a: T, b: T): (fn: (a: T) => Ord) => T;
// minBy(fn, a, b)
export function minBy<T>(fn: (a: T) => Ord, a: T, b: T): T;
