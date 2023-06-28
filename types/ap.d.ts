export function ap<T, U>(fns: ReadonlyArray<(a: T) => U>): (vs: readonly T[]) => U[];
export function ap<R, A, B>(fn: (r: R, a: A) => B, fn1: (r: R) => A): (r: R) => B;
export function ap<T, U>(fns: ReadonlyArray<(a: T) => U>, vs: readonly T[]): U[];
