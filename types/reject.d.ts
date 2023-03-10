export function reject<A, P extends A>(
  pred: (val: A) => val is P,
): {
  <B extends A>(list: readonly B[]): Array<Exclude<B, P>>;
  <B extends A>(dict: Record<string, B>): Record<string, Exclude<B, P>>;
};
export function reject<T>(
  pred: (value: T) => boolean,
): <P extends T, C extends readonly P[] | Record<string, P>>(collection: C) => C;
export function reject<A, B extends A, P extends A>(
  pred: (val: A) => val is P,
  list: readonly B[],
): Array<Exclude<B, P>>;
export function reject<A, B extends A, P extends A>(
  pred: (val: A) => val is P,
  dict: Record<string, B>,
): Record<string, Exclude<B, P>>;
export function reject<T, C extends readonly T[] | Record<string, T>>(pred: (value: T) => boolean, collection: C): C;
