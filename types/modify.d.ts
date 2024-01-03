// modify(prop)
export function modify<K extends PropertyKey>(prop: K): {
  // modify(prop)(fn)(target)
  <A>(fn: (a: A) => A): <U extends Record<K, A>>(target: U) => U;
  <A, B>(fn: (a: A) => B): <U extends Record<K, A>>(target: U) => Omit<U, K> & Record<K, B>;
  // modify(prop)(fn, target)
  <A, U extends Record<K, A>>(fn: (a: A) => A, target: U): U;
  <A, B, U extends Record<K, A>>(fn: (a: A) => B, target: U): Omit<U, K> & Record<K, B>;
};

// modify (prop, fn)(target)
export function modify<K extends PropertyKey, A>(
  prop: K,
  fn: (a: A) => A,
): <U extends Record<K, A>>(target: U) => U;
export function modify<K extends PropertyKey, A, B>(
  prop: K,
  fn: (a: A) => B,
): <U extends Record<K, A>>(target: U) => Omit<U, K> & Record<K, B>;

// modify (prop, fn, target)
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
