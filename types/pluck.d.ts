import { Placeholder } from 'ramda';

export function pluck<K extends PropertyKey>(prop: K extends Placeholder ? never : K): <U extends Record<K, any>>(list: U[]) => Array<U[K]>;
export function pluck<U>(__: Placeholder, list: U[]): <K extends keyof U>() => Array<U[K]>;
export function pluck<K extends keyof U, U>(p: K, list: readonly U[]): Array<U[K]>;
