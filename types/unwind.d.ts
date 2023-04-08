import { Placeholder } from './util/tools';

export function unwind<K extends PropertyKey, O extends Record<K, any>>(key: K, obj: O): O[K] extends Array<infer T> ? Array<Omit<K, O> & Record<K, T>> : never;
export function unwind<O extends object>(__: Placeholder, obj: O): <K extends keyof O>(key: K) => O[K] extends Array<infer T> ? Array<Omit<K, O> & Record<K, T>> : never;
export function unwind<K extends PropertyKey>(key: K): < O extends Record<K, any>>(obj: O) => O[K] extends Array<infer T> ? Array<Omit<K, O> & Record<K, T>> : never;
