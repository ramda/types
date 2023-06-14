export function compose<A extends readonly unknown[], B>(
  fn1: (...args: A) => B,
): (...args: A) => B;

export function compose<A extends readonly unknown[], B, C>(
  fn2: (arg: B) => C,
  fn1: (...args: A) => B,
): (...args: A) => C;

export function compose<A extends readonly unknown[], B, C, D>(
  fn3: (arg: C) => D,
  fn2: (arg: B) => C,
  fn1: (...args: A) => B,
): (...args: A) => D;

export function compose<A extends readonly unknown[], B, C, D, E>(
  fn4: (arg: D) => E,
  fn3: (arg: C) => D,
  fn2: (arg: B) => C,
  fn1: (...args: A) => B,
): (...args: A) => E;

export function compose<A extends readonly unknown[], B, C, D, E, F>(
  fn5: (arg: E) => F,
  fn4: (arg: D) => E,
  fn3: (arg: C) => D,
  fn2: (arg: B) => C,
  fn1: (...args: A) => B,
): (...args: A) => F;

export function compose<A extends readonly unknown[], B, C, D, E, F, G>(
  fn6: (arg: F) => G,
  fn5: (arg: E) => F,
  fn4: (arg: D) => E,
  fn3: (arg: C) => D,
  fn2: (arg: B) => C,
  fn1: (...args: A) => B,
): (...args: A) => G;

export function compose<A extends readonly unknown[], B, C, D, E, F, G, H>(
  fn7: (arg: G) => H,
  fn6: (arg: F) => G,
  fn5: (arg: E) => F,
  fn4: (arg: D) => E,
  fn3: (arg: C) => D,
  fn2: (arg: B) => C,
  fn1: (...args: A) => B,
): (...args: A) => H;

export function compose<A extends readonly unknown[], B, C, D, E, F, G, H, I>(
  fn8: (arg: H) => I,
  fn7: (arg: G) => H,
  fn6: (arg: F) => G,
  fn5: (arg: E) => F,
  fn4: (arg: D) => E,
  fn3: (arg: C) => D,
  fn2: (arg: B) => C,
  fn1: (...args: A) => B,
): (...args: A) => I;

export function compose<A extends readonly unknown[], B, C, D, E, F, G, H, I, J>(
  fn9: (arg: I) => J,
  fn8: (arg: H) => I,
  fn7: (arg: G) => H,
  fn6: (arg: F) => G,
  fn5: (arg: E) => F,
  fn4: (arg: D) => E,
  fn3: (arg: C) => D,
  fn2: (arg: B) => C,
  fn1: (...args: A) => B,
): (...args: A) => J;

export function compose<A extends readonly unknown[], B, C, D, E, F, G, H, I, R>(
  ...funcs: [
    fnLast: (arg: any) => R,
    ...func: Array<(a: any) => any>,
    fn8: (arg: H) => I,
    fn7: (arg: G) => H,
    fn6: (arg: F) => G,
    fn5: (arg: E) => F,
    fn4: (arg: D) => E,
    fn3: (arg: C) => D,
    fn2: (arg: B) => C,
    fn1: (...args: A) => B
  ]
): (...args: A) => R;
