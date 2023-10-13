import { Placeholder } from 'ramda';

export function pluck<K extends PropertyKey>(prop: K extends Placeholder ? never : K): {
  <U extends Record<K, any>, IK extends string>(obj: Record<IK, U>): { [KK in keyof typeof obj]: U[K] };
  <U extends readonly unknown[] | Record<K, any>>(list: U[]): U extends readonly (infer T)[] ? T[] : U extends Record<K, infer T> ? T[] : never;
};
export function pluck<K extends keyof U, U extends Record<any, any>, IK extends keyof any>(prop: K, record: Record<IK, U>): { [KK in keyof typeof record]: U[K] };
export function pluck<K extends keyof U, U>(prop: K, list: readonly U[]): Array<U[K]>;
export function pluck<U extends Record<any, any>, IK extends keyof any>(__: Placeholder, record: Record<IK, U>): <K extends keyof U>(prop: K) => { [KK in keyof typeof record]: U[K] };
export function pluck<U>(__: Placeholder, list: readonly U[]): <K extends keyof U>(prop: K) => Array<U[K]>;
