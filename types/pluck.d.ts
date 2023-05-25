import { Placeholder } from 'ramda';

export function pluck<K extends PropertyKey>(prop: K extends Placeholder ? never : K): {
  <U extends unknown[] | Record<K, any>>(list: U[]): U extends (infer T)[] ? T[] : U extends Record<K, infer T> ? T[] : never;
};
export function pluck<U>(__: Placeholder, list: readonly U[]): <K extends keyof U>(prop: K) => Array<U[K]>;
export function pluck<K extends keyof U, U>(prop: K, list: readonly U[]): Array<U[K]>;
