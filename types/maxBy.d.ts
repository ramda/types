import { Placeholder, Ord } from './util/tools';

// Commutative means we can simplify the overloads for handlings placeholders
// maxBy(fn)
export function maxBy<T>(fn: (a: T) => Ord): {
  // maxBy(fn)(a)(b)
  (a: T): (b: T) => T;
  // maxBy(fn)(a, b)
  (a: T, b: T): T;
};
// maxBy(__, a)
export function maxBy<T>(__: Placeholder, a: T): {
  // maxBy(__, a)(fn)(b)
  (fn: (a: T) => Ord): (b: T) => T;
  // maxBy(__, a)(__, b)(fn)
  (__: Placeholder, b: T): (fn: (a: T) => Ord) => T;
  // maxBy(__, a)(fn, b)
  (fn: (a: T) => Ord, b: T): T;
};
// maxBy(fn, a)(b)
export function maxBy<T>(fn: (a: T) => Ord, a: T): (b: T) => T;
// maxBy(__, a, b)(fn)
export function maxBy<T>(__: Placeholder, a: T, b: T): (fn: (a: T) => Ord) => T;
// maxBy(fn, a, b)
export function maxBy<T>(fn: (a: T) => Ord, a: T, b: T): T;
