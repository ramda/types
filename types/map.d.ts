import { FunctorMap, FunctorFantasyLand, Placeholder, ValueOfUnion } from './util/tools';

export function map<T, U>(fn: (x: T) => U, list: readonly T[]): U[];
export function map<T, U>(fn: (x: T) => U, obj: FunctorMap<T>): FunctorMap<U>;
export function map<T, U>(fn: (x: T) => U, obj: FunctorFantasyLand<T>): FunctorFantasyLand<U>;
export function map<O extends object, U>(fn: (x: ValueOfUnion<O>) => U, dict: O): Record<keyof O, U>;

export function map<T>(__: Placeholder, list: readonly T[]): <U>(fn: (x: T) => U) => U[];
export function map<A>(__: Placeholder, obj: FunctorMap<A>): <B>(fn: (a: A) => B) => FunctorMap<B>;
export function map<A>(__: Placeholder, obj: FunctorFantasyLand<A>): <B>(fn: (a: A) => B) => FunctorFantasyLand<B>;
export function map<O extends object>(__: Placeholder, dict: O): <U>(fn: (x: ValueOfUnion<O>) => U) => Record<keyof O, U>;

export function map<T, U>(fn: (x: T) => U): {
  (list: readonly T[]): U[];
  (obj: FunctorMap<T>): FunctorMap<U>;
  (obj: FunctorFantasyLand<T>): FunctorFantasyLand<U>;
  <O extends Record<string, T>>(dict: O): Record<keyof O, U>;
};
