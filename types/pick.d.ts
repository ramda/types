import { ElementOf } from './util/tools';

export function pick<
  T1 extends PropertyKey
>(names: [T1]): <U extends Record<T1, any>>(obj: U) => string extends keyof U ? Record<string, U[keyof U]> : Pick<U, T1>;
export function pick<
  T1 extends PropertyKey,
  T2 extends PropertyKey
>(names: [T1, T2]): <U extends Record<T1 | T2, any>>(obj: U) => string extends keyof U ? Record<string, U[keyof U]> : Pick<U, T1 | T2>;
export function pick<
  T1 extends PropertyKey,
  T2 extends PropertyKey,
  T3 extends PropertyKey
>(names: [T1, T2, T3]): <U extends Record<T1 | T2 | T3, any>>(obj: U) => string extends keyof U ? Record<string, U[keyof U]> : Pick<U, T1 | T2 | T3>;
export function pick<
  T1 extends PropertyKey,
  T2 extends PropertyKey,
  T3 extends PropertyKey,
  T4 extends PropertyKey
>(names: [T1, T2, T3, T4]): <U extends Record<T1 | T2 | T3 | T4, any>>(obj: U) => string extends keyof U ? Record<string, U[keyof U]> : Pick<U, T1 | T2 | T3 | T4>;
export function pick<
  T1 extends PropertyKey,
  T2 extends PropertyKey,
  T3 extends PropertyKey,
  T4 extends PropertyKey,
  T5 extends PropertyKey
>(names: [T1, T2, T3, T4, T5]): <U extends Record<T1 | T2 | T3 | T4 | T5, any>>(obj: U) => string extends keyof U ? Record<string, U[keyof U]> : Pick<U, T1 | T2 | T3 | T4 | T5>;
export function pick<
  T1 extends PropertyKey,
  T2 extends PropertyKey,
  T3 extends PropertyKey,
  T4 extends PropertyKey,
  T5 extends PropertyKey,
  T6 extends PropertyKey
>(names: [T1, T2, T3, T4, T5, T6]): <U extends Record<T1 | T2 | T3 | T4 | T5 | T6, any>>(obj: U) => string extends keyof U ? Record<string, U[keyof U]> : Pick<U, T1 | T2 | T3 | T4 | T5 | T6>;
export function pick<
  T1 extends PropertyKey,
  T2 extends PropertyKey,
  T3 extends PropertyKey,
  T4 extends PropertyKey,
  T5 extends PropertyKey,
  T6 extends PropertyKey,
  T7 extends PropertyKey
>(names: [T1, T2, T3, T4, T5, T6, T7]): <U extends Record<T1 | T2 | T3 | T4 | T5 | T6 | T7, any>>(obj: U) => string extends keyof U ? Record<string, U[keyof U]> : Pick<U, T1 | T2 | T3 | T4 | T5 | T6 | T7>;
export function pick<
  T1 extends PropertyKey,
  T2 extends PropertyKey,
  T3 extends PropertyKey,
  T4 extends PropertyKey,
  T5 extends PropertyKey,
  T6 extends PropertyKey,
  T7 extends PropertyKey,
  T8 extends PropertyKey
>(names: [T1, T2, T3, T4, T5, T6, T7, T8]): <U extends Record<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8, any>>(obj: U) => string extends keyof U ? Record<string, U[keyof U]> : Pick<U, T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;
// back up for over 9, will require `as const` to work
export function pick<Names extends readonly PropertyKey[]>(names: Names): <U extends Record<ElementOf<Names>, any>>(obj: U) => string extends keyof U ? Record<string, U[keyof U]> : Pick<U, ElementOf<Names>>;
// because we can extend (keyof U)(), `names` always gets read as a union of the values, so we don't need to overload these!
export function pick<U, Names extends readonly (keyof U)[]>(names: Names, obj: U): string extends keyof U ? Record<string, U[keyof U]> : Pick<U, ElementOf<Names>>;
