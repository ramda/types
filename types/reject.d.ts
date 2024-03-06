// reject(() => narrow)
export function reject<A, P extends A>(
  pred: (val: A) => val is P,
): {
  // if we put `Record<string, A>` first, it will actually pic up `A[]` as well
  // so it needs to go first
  <B extends A>(list: readonly B[]): Exclude<B, P>[];
  <B extends A>(dict: Record<string, B>): Record<string, Exclude<B, P>>;
  // but we also want `A[]` to be the default when doing `pipe(reject(fn))`, so it also needs to be last
  <B extends A>(list: readonly B[]): Exclude<B, P>[];
};

// reject(() => boolean)
export function reject<T>(
  pred: (value: T) => boolean,
): <P extends T, C extends readonly P[] | Record<string, P>>(collection: C) => C;

// reject(() => narrow, list) - readonly T[] falls into Record<string T> for some reason, so list needs to come first
export function reject<T, P extends T>(pred: (val: T) => val is P, list: readonly T[]): Exclude<T, P>[];
// reject(() => narrow, dist)
export function reject<T, P extends T>(pred: (val: T) => val is P, dict: Record<string, T>): Record<string, Exclude<T, P>>;
// reject(() => boolean, list | dist) - this case is not expected to be picked up directly
// it is here so operations like `flip(reject)` or `addIndex(reject)` get retained correctly type-wise (or best they can)
export function reject<T, C extends readonly T[] | Record<string, T>>(pred: (value: T) => boolean, collection: C): C;
