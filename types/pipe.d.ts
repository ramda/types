export function pipe<A extends readonly unknown[], B>(
  fn1: (...args: A) => B,
): (...args: A) => B;

export function pipe<A extends readonly unknown[], B, C>(
  fn1: (...args: A) => B,
  fn2: (arg: B) => C,
): (...args: A) => C;

export function pipe<A extends readonly unknown[], B, C, D>(
  fn1: (...args: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D,
): (...args: A) => D;

export function pipe<A extends readonly unknown[], B, C, D, E>(
  fn1: (...args: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D,
  fn4: (arg: D) => E,
): (...args: A) => E;

export function pipe<A extends readonly unknown[], B, C, D, E, F>(
  fn1: (...args: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D,
  fn4: (arg: D) => E,
  fn5: (arg: E) => F,
): (...args: A) => F;

export function pipe<A extends readonly unknown[], B, C, D, E, F, G>(
  fn1: (...args: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D,
  fn4: (arg: D) => E,
  fn5: (arg: E) => F,
  fn6: (arg: F) => G,
): (...args: A) => G;

export function pipe<A extends readonly unknown[], B, C, D, E, F, G, H>(
  fn1: (...args: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D,
  fn4: (arg: D) => E,
  fn5: (arg: E) => F,
  fn6: (arg: F) => G,
  fn7: (arg: G) => H,
): (...args: A) => H;

export function pipe<A extends readonly unknown[], B, C, D, E, F, G, H, I>(
  fn1: (...args: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D,
  fn4: (arg: D) => E,
  fn5: (arg: E) => F,
  fn6: (arg: F) => G,
  fn7: (arg: G) => H,
  fn8: (arg: H) => I,
): (...args: A) => I;

export function pipe<A extends readonly unknown[], B, C, D, E, F, G, H, I, J>(
  fn1: (...args: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D,
  fn4: (arg: D) => E,
  fn5: (arg: E) => F,
  fn6: (arg: F) => G,
  fn7: (arg: G) => H,
  fn8: (arg: H) => I,
  fn9: (arg: I) => J,
): (...args: A) => J;

export function pipe<A extends readonly unknown[], B, C, D, E, F, G, H, I, J>(
  fn1: (...args: A) => B,
  fn2: (arg: B) => C,
  fn3: (arg: C) => D,
  fn4: (arg: D) => E,
  fn5: (arg: E) => F,
  fn6: (arg: F) => G,
  fn7: (arg: G) => H,
  fn8: (arg: H) => I,
  fn9: (arg: I) => J,
): (...args: A) => J;
export function pipe<A extends readonly unknown[], B, C, D, E, F, G, H, I, R>(
  ...funcs: readonly [
    fn1: (...args: A) => B,
    fn2: (arg: B) => C,
    fn3: (arg: C) => D,
    fn4: (arg: D) => E,
    fn5: (arg: E) => F,
    fn6: (arg: F) => G,
    fn7: (arg: G) => H,
    fn8: (arg: H) => I,
    ...func: ReadonlyArray<(a: any) => any>,
    fnLast: (a: any) => R
  ]
): (...args: A) => R;
