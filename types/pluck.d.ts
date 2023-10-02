import { Placeholder } from 'ramda';

export function pluck<K extends PropertyKey>(prop: K extends Placeholder ? never : K): {
  <U extends readonly unknown[] | Record<K, any>>(obj: Record<PropertyKey, U>): U extends readonly (infer T)[] ? T[] : U extends Record<K, infer T> ? T[] : never;
  <U extends readonly unknown[] | Record<K, any>>(list: U[]): U extends readonly (infer T)[] ? T[] : U extends Record<K, infer T> ? T[] : never;
};
export function pluck<U>(__: Placeholder, obj: Record<PropertyKey, U>): <K extends keyof U>(prop: K) => Array<U[K]>;
export function pluck<U>(__: Placeholder, list: readonly U[]): <K extends keyof U>(prop: K) => Array<U[K]>;
export function pluck<K extends keyof U, U>(prop: K, obj: Record<PropertyKey, U>): Array<U[K]>;
export function pluck<K extends keyof U, U>(prop: K, list: readonly U[]): Array<U[K]>;
