import { Placeholder } from './util/tools';

// filter(pred)
export function filter<T, P extends T>(pred: (val: T) => val is P): (list: readonly T[]) => P[];
export function filter<T>(pred: (val: T) => boolean): (list: readonly T[]) => T[];

// see `map` for details
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function filter<H extends 'o', T = unknown, P extends T = T>(pred: (val: T) => val is P): <U extends Record<PropertyKey, T>>(dict: U) => Partial<Record<keyof U, P>>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function filter<H extends 'o', T>(pred: (val: T) => boolean): <U extends Record<PropertyKey, T>>(dict: U) => Partial<U>;

// filter(__, list)(pred)
export function filter<T>(__: Placeholder, list: readonly T[]): {
  <P extends T>(pred: (val: T) => val is P): P[];
  (pred: (val: T) => boolean): T[];
};
// filter(__, dict)(pred)
export function filter<U extends object>(__: Placeholder, dict: U): {
  <T extends U[keyof U], P extends T>(pred: (val: T) => val is P): Record<keyof U, P>;
  <T extends U[keyof U]>(pred: (val: T) => boolean): U;
};

// filter(pred, list)
// this overload is to support when the predicate returns``val is p`, otherwise you'd lose that bit on the
// See for details: https://tsplay.dev/WoYjeN
export function filter<T, P extends T>(pred: (val: T) => val is P, list: readonly T[]): P[];
// and separately defined `pred: (val: T) => boolean`
export function filter<T>(pred: (val: T) => boolean, list: readonly T[]): T[];
// do the object variant first
// always return `Partial` because this filters out keys if they don't match the predicate, and typescript cannot determine itself which keys would be removed
export function filter<T extends U[keyof U], P extends T, U>(pred: (val: T) => val is P, dict: U): Partial<Record<keyof U, P>>;
export function filter<T, U extends Record<PropertyKey, T>>(pred: (val: T) => boolean, dict: U): Partial<U>;
// re-declare at the end here for when we pass to `flip`, or the like
export function filter<T>(pred: (val: T) => boolean, list: readonly T[]): T[];
