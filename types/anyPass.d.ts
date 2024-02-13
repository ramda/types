// narrowing
export function anyPass<T, TF1 extends T, TF2 extends T>(
  predicates: [
    (a: T) => a is TF1,
    (a: T) => a is TF2
  ],
): (a: T) => a is TF1 | TF2;
export function anyPass<T, TF1 extends T, TF2 extends T, TF3 extends T>(
  predicates: [
    (a: T) => a is TF1,
    (a: T) => a is TF2,
    (a: T) => a is TF3
  ],
): (a: T) => a is TF1 | TF2 | TF3;
export function anyPass<T, TF1 extends T, TF2 extends T, TF3 extends T, TF4 extends T>(
  predicates: [
    (a: T) => a is TF1,
    (a: T) => a is TF2,
    (a: T) => a is TF3,
    (a: T) => a is TF4
  ],
): (a: T) => a is TF1 | TF2 | TF3 | TF4;
export function anyPass<T, TF1 extends T, TF2 extends T, TF3 extends T, TF4 extends T, TF5 extends T>(
  predicates: [
    (a: T) => a is TF1,
    (a: T) => a is TF2,
    (a: T) => a is TF3,
    (a: T) => a is TF4,
    (a: T) => a is TF5
  ],
): (a: T) => a is TF1 | TF2 | TF3 | TF4 | TF5;
export function anyPass<T, TF1 extends T, TF2 extends T, TF3 extends T, TF4 extends T, TF5 extends T, TF6 extends T>(
  predicates: [
    (a: T) => a is TF1,
    (a: T) => a is TF2,
    (a: T) => a is TF3,
    (a: T) => a is TF4,
    (a: T) => a is TF5,
    (a: T) => a is TF6
  ],
): (a: T) => a is TF1 | TF2 | TF3 | TF4 | TF5 | TF6;
// regular
export function anyPass<T1, T2>(
  predicates: [
    (a: T1) => boolean,
    (a: T2) => boolean
  ],
): (a: T1 & T2) => boolean;
export function anyPass<T1, T2, T3>(
  predicates: [
    (a: T1) => boolean,
    (a: T2) => boolean,
    (a: T3) => boolean
  ],
): (a: T1 & T2 & T3) => boolean;
export function anyPass<T1, T2, T3, T4>(
  predicates: [
    (a: T1) => boolean,
    (a: T2) => boolean,
    (a: T3) => boolean,
    (a: T4) => boolean
  ],
): (a: T1 & T2 & T3 & T4) => boolean;
export function anyPass<T1, T2, T3, T4, T5>(
  predicates: [
    (a: T1) => boolean,
    (a: T2) => boolean,
    (a: T3) => boolean,
    (a: T4) => boolean,
    (a: T5) => boolean
  ],
): (a: T1 & T2 & T3 & T4 & T5) => boolean;
export function anyPass<T1, T2, T3, T4, T5, T6>(
  predicates: [
    (a: T1) => boolean,
    (a: T2) => boolean,
    (a: T3) => boolean,
    (a: T4) => boolean,
    (a: T5) => boolean,
    (a: T6) => boolean
  ],
): (a: T1 & T2 & T3 & T4 & T5 & T6) => boolean;
// catch-all
export function anyPass<F extends (...args: any[]) => boolean>(predicates: readonly F[]): F;
