import { Placeholder } from './util/tools';

// filter(pred)
export function filter<T, P extends T>(pred: (val: T) => val is P): {
  <U extends Record<PropertyKey, T>>(dict: U extends readonly any[] ? never : U): Partial<Record<keyof U, P>>;
  (list: readonly T[]): P[];
};
export function filter<T>(pred: (val: T) => boolean): {
  <U extends Record<PropertyKey, T>>(dict: U extends readonly any[] ? never : U): Partial<U>;
  (list: readonly T[]): T[];
};

// filter(__, dict)(pred)
export function filter<U extends object>(__: Placeholder, dict: U extends readonly any[] ? never : U): {
  <T extends U[keyof U], P extends T>(pred: (val: T) => val is P): Partial<Record<keyof U, P>>;
  <T extends U[keyof U]>(pred: (val: T) => boolean): Partial<U>;
};

// filter(__, list)(pred)
export function filter<T>(__: Placeholder, list: readonly T[]): {
  <P extends T>(pred: (val: T) => val is P): P[];
  (pred: (val: T) => boolean): T[];
};

// filter(pred, list)
// do the object variant first
// always return `Partial` because this filters out keys if they don't match the predicate, and typescript cannot determine itself which keys would be removed
export function filter<T extends U[keyof U], P extends T, U>(pred: (val: T) => val is P, dict: U extends readonly any[] ? never : U): Partial<Record<keyof U, P>>;
export function filter<T, U extends Record<PropertyKey, T>>(pred: (val: T) => boolean, dict: U extends readonly any[] ? never : U): Partial<U>;
// array variant second
export function filter<T, P extends T>(pred: (val: T) => val is P, list: readonly T[]): P[];
export function filter<T>(pred: (val: T) => boolean, list: readonly T[]): T[];
