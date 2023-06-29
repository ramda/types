import { FunctorMap, FunctorFantasyLand, Placeholder, ValueOfUnion } from './util/tools';

// map(fn)
export function map<A, B>(fn: (x: A) => B): {
  // first and last def are the same and are here on purpose
  // the list variant needs to come before the FunctorMap ones, because `T[]` is a `FunctorMap<T>`
  (list: readonly A[]): B[];
  (functor: FunctorFantasyLand<A>): FunctorFantasyLand<B>;
  (functor: FunctorMap<A>): FunctorMap<B>;
  <U extends Record<PropertyKey, A>>(dict: U): Record<keyof U, B>;
  // it also needs to be here when you pass map as an argument to a function, eg `compose(map(fn))`
  (list: readonly A[]): B[];
};

// map(__, list)
export function map<A>(__: Placeholder, list: readonly A[]): <B>(fn: (x: A) => B) => B[];
export function map<A>(__: Placeholder, obj: FunctorFantasyLand<A>): <B>(fn: (a: A) => B) => FunctorFantasyLand<B>;
export function map<A>(__: Placeholder, obj: FunctorMap<A>): <B>(fn: (a: A) => B) => FunctorMap<B>;
export function map<U extends object>(__: Placeholder, dict: U): <B>(fn: (x: ValueOfUnion<B>) => B) => Record<keyof U, B>;
// map(fn, list)
// first and last def are the same and are here on purpose
// the list variant needs to come before the FunctorMap ones, because `T[]` is a `FunctorMap<T>`
export function map<A, B>(fn: (x: A) => B, list: readonly A[]): B[];
export function map<A, B>(fn: (x: A) => B, obj: FunctorFantasyLand<A>): FunctorFantasyLand<B>;
export function map<A, B>(fn: (x: A) => B, obj: FunctorMap<A>): FunctorMap<B>;
export function map<U extends object, B>(fn: (x: ValueOfUnion<U>) => B, dict: U): Record<keyof U, B>;
// it also needs to be here when you pass map as an argument to a function, eg `flip(map)`
export function map<A, B>(fn: (x: A) => B, list: readonly A[]): B[];
