import { FunctorMap, FunctorFantasyLand, Placeholder, ValueOfUnion } from './util/tools';

// map(fn)
// there is purposefully no support for anything other than T[] here
// See here: https://github.com/ramda/types/discussions/54
export function map<A, B>(fn: (value: A) => B): (list: readonly A[]) => B[];

// map(__, list)
// the list variant needs to come before the FunctorMap ones, because `T[]` is a `FunctorMap<T>`
export function map<A>(__: Placeholder, list: readonly A[]): <B>(fn: (value: A) => B) => B[];
export function map<A>(__: Placeholder, obj: FunctorFantasyLand<A>): <B>(fn: (value: A) => B) => FunctorFantasyLand<B>;
export function map<A>(__: Placeholder, obj: FunctorMap<A>): <B>(fn: (value: A) => B) => FunctorMap<B>;
export function map<U extends object>(__: Placeholder, dict: U): <B>(fn: (value: ValueOfUnion<B>) => B) => Record<keyof U, B>;

// map(fn, list)
// first and last def are the same and are here on purpose
// the list variant needs to come before the FunctorMap ones, because `T[]` is a `FunctorMap<T>`
export function map<A, B>(fn: (value: A) => B, list: readonly A[]): B[];
export function map<A, B>(fn: (value: A) => B, obj: FunctorFantasyLand<A>): FunctorFantasyLand<B>;
export function map<A, B>(fn: (value: A) => B, obj: FunctorMap<A>): FunctorMap<B>;
export function map<U extends object, B>(fn: (x: ValueOfUnion<U>) => B, dict: U): Record<keyof U, B>;
// it also needs to be here when you pass map as an argument to a function, eg `flip(map)`
export function map<A, B>(fn: (value: A) => B, list: readonly A[]): B[];
