import * as _ from 'ts-toolbelt';
import { Placeholder } from './util/tools';

export function filter<T, U extends Record<PropertyKey, T>>(pred: (val: T) => boolean, dict: U): U;
// filter(__, list)(pred)
export function filter<T>(__: Placeholder, list: readonly T[]): {
  <P extends T>(pred: (val: T) => val is P): P[];
  (pred: (val: T) => boolean): T[];
};
// filter(__, dict)(pred)
export function filter<U extends object>(__: Placeholder, dict: U): {
  <T extends U[keyof U], P extends T>(pred: (val: T) => val is P): Record<keyof U, P>
  <T extends U[keyof U]>(pred: (val: T) => boolean): U;
};
// filter(pred)(listOrDict)
// have yet to get `val is P` variety working here, if anyone knows please help!
export function filter<T>(pred: (val: T) => boolean): <C extends readonly T[] | Record<PropertyKey, T>>(collection: C) => C extends readonly T[] ? _.L.Writable<C> : C;
// export function filter<T>(pred: (val: T) => boolean): {
//   <U extends readonly T[]>(list: U extends readonly T[] ? U : never): U extends readonly T[] ? _.L.Writable<U> : never;
//   <U extends Record<PropertyKey, T>>(dict: U extends readonly T[] ? never : U): U extends T[] ? never : U;
// };

// filter(pred, list)
// do the object variant first
export function filter<T extends U[keyof U], P extends T = T, U = any>(pred: (val: T) => val is P, dict: U): Record<keyof U, P>;
// this overload is to support when the predicate returns``val is p`, otherwise you'd lose that bit on the
// See for details: https://tsplay.dev/WoYjeN
export function filter<T, P extends T = T>(pred: (val: T) => val is P, list: T[]): P[];
export function filter<T, P extends T = T>(pred: (val: T) => val is P, list: readonly T[]): readonly P[];
// and finally, the regular `(val: T) => boolean` overload
export function filter<T>(pred: (val: T) => boolean, list: T[]): T[];
export function filter<T>(pred: (val: T) => boolean, list: readonly T[]): readonly T[];
