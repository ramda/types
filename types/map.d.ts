import { Functor } from './util/tools';

export function map<T, U>(fn: (x: T) => U, list: readonly T[]): U extends void ? never : U[];
export function map<U extends object, O>(fn: (x: U[keyof U]) => O, dict: U): Record<keyof U, O>;
export function map<T, U>(fn: (x: T) => U): (list: readonly T[]) => U[];
export function map<T, O>(fn: (x: T) => O): <U extends Record<string, T>>(dict: U) => Record<keyof U, O>;
// these were here, not sure what they are doing. They don't represent the obj case well
// export function map<T, U>(fn: (x: T[keyof T & keyof U] | ValueOfUnion<T>) => U[keyof T & keyof U], list: T): U;
// export function map<T, U>(fn: (x: T[keyof T & keyof U] | ValueOfUnion<T>) => U[keyof T & keyof U]): (list: T) => U;

// used in functors
export function map<T, U>(fn: (x: T) => U, obj: Functor<T>): Functor<U>;
export function map<T, U>(fn: (x: T) => U): (obj: Functor<T>) => Functor<U>;
