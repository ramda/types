export function o<B, C>(f: (b: B) => C): {
  <A>(g: (a: A) => B): (v: A) => C;
  <A>(g: (b: A) => B, v: A): C;
};
export function o<A, B, C>(f: (b: B) => C, g: (a: A) => B): (v: A) => C;
export function o<A, B, C>(f: (b: B) => C, g: (a: A) => B, v: A): C;
