import { Placeholder, Ord } from './util/tools';

// maxBy(fn)
export function maxBy<T>(fn: (a: T) => Ord): {
  // maxBy(fn)(a)(b)
  (a: T): (b: T) => T;
  // maxBy(fn)(_, b)
  (__: Placeholder, b: T): (a: T) => T;
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
// maxBy(__, __, b)
export function maxBy<T>(__: Placeholder, __2: Placeholder, b: T): {
  // maxBy(__, __, b)(fn)(a)
  (fn: (a: T) => Ord): (a: T) => T;
  // maxBy(__, __, b)(__, a)(fn)
  (__: Placeholder, a: T): (fn: (a: T) => Ord) => T;
  // maxBy(__, __, b)(fn, a)
  (fn: (a: T) => Ord, a: T): T;
};
// maxBy(__, a, b)(fn)
export function maxBy<T>(__: Placeholder, a: T, b: T): (fn: (a: T) => Ord) => T;
// maxBy(fn, __, b)
export function maxBy<T>(fn: (a: T) => Ord, __: Placeholder, b: T): (a: T) => T;
// maxBy(fn, a, b)
export function maxBy<T>(fn: (a: T) => Ord, a: T, b: T): T;
