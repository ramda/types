export function modify<K extends PropertyKey, A>(
  prop: K,
  fn: (a: A) => A,
): <U extends Record<K, A>>(target: U) => U;
export function modify<K extends PropertyKey, A, B>(
  prop: K,
  fn: (a: A) => B,
): <U extends Record<K, A>>(target: U) => Omit<U, K> & Record<K, B>;

export function modify<U extends object, K extends keyof U>(
  prop: K,
  fn: (a: U[K]) => U[K],
  obj: U,
): U;
export function modify<U extends object, K extends keyof U, B>(
  prop: K,
  fn: (a: U[K]) => B,
  obj: U,
): Omit<U, K> & Record<K, B>;
