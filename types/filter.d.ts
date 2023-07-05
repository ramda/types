import { Placeholder, ValueOfUnion } from './util/tools';

// filter(pred)(list)
// there is purposefully no support for anything other than T[] here
// See here: https://github.com/ramda/types/discussions/54
export function filter<T, P extends T>(pred: (value: T) => value is P): (filterable: readonly T[]) => P[];
export function filter<T>(pred: (value: T) => boolean): (filterable: readonly T[]) => T[];

// filter(__, collection)(pred)
export function filter<U>(__: Placeholder, filterable: U extends readonly any[] ? never : U): {
  <T extends ValueOfUnion<U>, P extends T>(pred: (value: T) => value is P): Partial<Record<keyof U, P>>;
  <T extends ValueOfUnion<U>>(pred: (value: T) => boolean): Partial<U>;
};
export function filter<T>(__: Placeholder, filterable: readonly T[]): {
  <P extends T>(pred: (value: T) => value is P): P[];
  (pred: (value: T) => boolean): T[];
};

// filter(pred, collection)
export function filter<U, T extends ValueOfUnion<U>, P extends T>(pred: (value: T) => value is P, filterable: U extends readonly any[] ? never : U): Partial<Record<keyof U, P>>;
export function filter<T, P extends T>(pred: (value: T) => value is P, filterable: readonly T[]): P[];
export function filter<U, T extends ValueOfUnion<U>>(pred: (value: T) => boolean, filterable: U extends readonly any[] ? never : U): Partial<U>;
export function filter<T>(pred: (value: T) => boolean, filterable: readonly T[]): T[];
