import { FunctorMap, FunctorFantasyLand, Placeholder, ValueOfUnion } from './util/tools';

// map(fn)
export function map<T, U>(fn: (x: T) => U): {
  // first and last def are the same and are here on purpose
  // the list variant needs to come before the FunctorMap ones, because `T[]` is a `FunctorMap<T>`
  (list: readonly T[]): U[];
  (functor: FunctorFantasyLand<T>): FunctorFantasyLand<U>;
  (functor: FunctorMap<T>): FunctorMap<U>;
  <O extends Record<PropertyKey, T>>(dict: O): Record<keyof O, U>;
  // it also needs to be here when you pass map as an argument to a function, eg `compose(map(fn))`
  (list: readonly T[]): U[];
};
// see readme for details
export function map<H extends 'o' | 'f' | 'fl', T, U>(fn: (x: T) => U): {
  // the first 4 overloads work for `map(fn)(a)` or `const mapF = map(fn); mapF(a)` usages
  // in these circumstances `a` will auto pic the correct overload
  // that doesn't work when passing the function as an argument to another function
  // this fallback takes over in that case, and lets you use the generic helper `H` to set what the expected param type needs to be
  <O extends Record<PropertyKey, T>>(functor: {
    'o': O;
    'f': FunctorMap<T>;
    'fl': FunctorFantasyLand<T>;
  }[H extends infer H_ ? H_ : never]): {
    'o': Record<keyof O, U>;
    'f': FunctorMap<U>;
    'fl': FunctorFantasyLand<U>;
  }[H extends infer H_ ? H_ : never];
};
// map(__, list)
export function map<T>(__: Placeholder, list: readonly T[]): <U>(fn: (x: T) => U) => U[];
export function map<A>(__: Placeholder, obj: FunctorFantasyLand<A>): <B>(fn: (a: A) => B) => FunctorFantasyLand<B>;
export function map<A>(__: Placeholder, obj: FunctorMap<A>): <B>(fn: (a: A) => B) => FunctorMap<B>;
export function map<O extends object>(__: Placeholder, dict: O): <U>(fn: (x: ValueOfUnion<O>) => U) => Record<keyof O, U>;
// map(fn, list)
// first and last def are the same and are here on purpose
// the list variant needs to come before the FunctorMap ones, because `T[]` is a `FunctorMap<T>`
export function map<T, U>(fn: (x: T) => U, list: readonly T[]): U[];
export function map<T, U>(fn: (x: T) => U, obj: FunctorFantasyLand<T>): FunctorFantasyLand<U>;
export function map<T, U>(fn: (x: T) => U, obj: FunctorMap<T>): FunctorMap<U>;
export function map<O extends object, U>(fn: (x: ValueOfUnion<O>) => U, dict: O): Record<keyof O, U>;
// it also needs to be here when you pass map as an argument to a function, eg `flip(map)`
export function map<T, U>(fn: (x: T) => U, list: readonly T[]): U[];

