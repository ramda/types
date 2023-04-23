import { Functor, Placeholder, ValueOfUnion } from './util/tools';

export function map<T, U>(fn: (x: T) => U, list: readonly T[]): U[];
export function map<T, U>(fn: (x: T) => U, obj: Functor<T>): Functor<U>;
export function map<O extends object, U>(fn: (x: ValueOfUnion<O>) => U, dict: O): Record<keyof O, U>;

export function map<T>(__: Placeholder, list: readonly T[]): <U>(fn: (x: T) => U) => U[];
export function map<T>(__: Placeholder, obj: Functor<T>): <U>(fn: (x: T) => U) => Functor<U>;
export function map<O extends object>(__: Placeholder, dict: O): <U>(fn: (x: ValueOfUnion<O>) => U) => Record<keyof O, U>;

export function map<T, U>(fn: (x: T) => U): {
  (list: readonly T[]): U[];
  (obj: Functor<T>): Functor<U>;
  <O extends Record<string, T>>(dict: O): Record<keyof O, U>;
};
