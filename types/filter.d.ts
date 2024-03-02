export function filter<A, P extends A>(
  pred: (val: A) => val is P,
): {
  <B extends A>(dict: Record<string, B>): Record<string, P>;
  <B extends A>(list: readonly B[]): P[];
};
export function filter<T>(
  pred: (value: T) => boolean,
): <P extends T, C extends readonly P[] | Record<string, P>>(collection: C) => C;
export function filter<T, P extends T>(pred: (val: T) => val is P, dict: Record<string, T>): Record<string, P>;
export function filter<T, P extends T>(pred: (val: T) => val is P, list: readonly T[]): P[];
export function filter<T, C extends readonly T[] | Record<string, T>>(pred: (value: T) => boolean, collection: C): C;
