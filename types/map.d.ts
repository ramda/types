import { Functor, Placeholder, ValueOfUnion } from './util/tools';

export function map<T, U>(fn: (x: T) => U, list: readonly T[]): U[];
export function map<O extends object, U>(fn: (x: ValueOfUnion<O>) => U, dict: U): Record<keyof O, U>;

export function map<T>(__: Placeholder, list: readonly T[]): <U>(fn: (x: T) => U) => U[];
export function map<O extends object>(__: Placeholder, dict: O): <U>(fn: (x: ValueOfUnion<O>) => U) => Record<keyof O, U>;

export function map<T, U>(fn: (x: T) => U): (list: readonly T[]) => U[];
export function map<T, O>(fn: (x: T) => O): <U extends Record<string, T>>(dict: U) => Record<keyof U, O>;

// used in functors
export function map<T, U>(fn: (x: T) => U, obj: Functor<T>): Functor<U>;
export function map<T, U>(fn: (x: T) => U): (obj: Functor<T>) => Functor<U>;
