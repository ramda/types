import { Placeholder } from './util/tools';

// filter(pred)(collection)
export function filter<T, P extends T>(
  pred: (value: T) => value is P,
): <C extends readonly T[] | Record<string, T>>(collection: C) => C extends readonly any[] ? P[] : Partial<Record<keyof C, P>>;
export function filter<T>(
  pred: (value: T) => boolean,
): <C extends readonly T[] | Record<string, T>>(collection: C) => C extends readonly any[] ? T[] : Partial<C>;

// filter(__, collection)(pred)
export function filter<C>(__: Placeholder, dict: C): {
  <T extends C[keyof C], P extends T>(pred: (val: T) => val is P): C extends readonly any[] ? P[] : Partial<Record<keyof C, P>>;
  <T extends C[keyof C]>(pred: (val: T) => boolean): C extends readonly any[] ? T[] : Partial<Record<keyof C, T>>;
};

// filter(pred, collection)
export function filter<T, P extends T, C extends readonly T[] | Record<PropertyKey, T>>(
  pred: (value: T) => value is P,
  collection: C
): C extends readonly T[] ? P[] : Partial<Record<keyof C, P>>;
export function filter<T, C extends readonly T[] | Record<PropertyKey, T>>(
  pred: (value: T) => boolean,
  collection: C
): C extends readonly any[] ? T[] : Partial<C>;
