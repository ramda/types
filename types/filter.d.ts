// filter(() => narrow)
export function filter<A, P extends A>(
  pred: (val: A) => val is P,
): {
  // if we put `Record<string, A>` first, it will actually pic up `A[]` as well
  // so it needs to go first
  <B extends A>(list: readonly B[]): P[];
  <B extends A>(dict: Record<string, B>): Record<string, P>;
  // but we also want `A[]` to be the default when doing `pipe(filter(fn))`, so it also needs to be last
  <B extends A>(list: readonly B[]): P[];
};

// filter(() => boolean)
export function filter<T>(
  pred: (value: T) => boolean,
): <P extends T, C extends readonly P[] | Record<string, P>>(collection: C) => C;

// filter(() => narrow, list) - readonly T[] falls into Record<string T> for some reason, so list needs to come first
export function filter<T, P extends T>(pred: (val: T) => val is P, list: readonly T[]): P[];
// filter(() => narrow, dist)
export function filter<T, P extends T>(pred: (val: T) => val is P, dict: Record<string, T>): Record<string, P>;
// filter(() => boolean, list | dist) - this case is not expected to be picked up directly
// it is here so operations like `flip(filter)` or `addIndex(filter)` get retained correctly type-wise (or best they can)
export function filter<T, C extends readonly T[] | Record<string, T>>(pred: (value: T) => boolean, collection: C): C;
