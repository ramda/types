import { Placeholder, ValueOfUnion } from './util/tools';

// filter(pred)(list)
// there is purposefully no support for anything other than T[] here
// See here: https://github.com/ramda/types/discussions/54
export function filter<T, P extends T>(pred: (value: T) => value is P): (list: T[]) => P[];
export function filter<T>(pred: (value: T) => boolean): (list: T[]) => T[];

// filter(__, collection)(pred)
export function filter<U>(__: Placeholder, dict: U): {
  <T extends ValueOfUnion<U>, P extends T>(pred: (value: T) => value is P): Record<keyof U, P>;
  <T extends ValueOfUnion<U>>(pred: (value: T) => boolean): U;
};
export function filter<T>(__: Placeholder, dict: T[]): {
  <P extends T>(pred: (value: T) => value is P): P[];
  (pred: (value: T) => boolean): T[];
};

// filter(pred, collection)
export function filter<U, T extends ValueOfUnion<U>, P extends T>(pred: (value: T) => value is P, obj: U): Record<keyof U, P>;
export function filter<T, P extends T>(pred: (value: T) => value is P, list: T[]): P[];
export function filter<U, T extends ValueOfUnion<U>>(pred: (value: T) => boolean, obj: U): U;
export function filter<T>(pred: (value: T) => boolean, list: T[]): T[];
