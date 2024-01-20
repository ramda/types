import { Placeholder } from 'ramda';

export function pluck<K extends PropertyKey>(prop: K extends Placeholder ? never : K): {
  <U extends O[keyof O], UK extends keyof U, O extends Record<string, any>>(obj: K extends UK ? O : never): { [OK in keyof O]: O[OK][K] };
  <U extends readonly unknown[] | Record<K, any>>(list: readonly U[]): U extends readonly (infer T)[] ? T[] : U extends Record<K, infer T> ? T[] : never;
};
export function pluck<U>(__: Placeholder, list: readonly U[]): <K extends keyof U>(prop: U extends readonly any[] ? number : K) => U extends readonly (infer T)[] ? T[] : U extends Record<K, infer T> ? T[] : never;
export function pluck<U extends O[keyof O], O extends Record<string, any>>(__: Placeholder, record: O): <K extends keyof U>(prop: K) => { [KK in keyof O]: O[KK][K] };
export function pluck<
  K extends keyof U,
  U extends C[keyof C extends string ? keyof C : number],
  C extends { [k: string]: Record<string, any> } | ReadonlyArray<Record<string, any> | readonly any[]>
>(prop: K, collection: C): keyof C extends string ? { [CK in keyof C]: C[CK] extends Record<K, any> ? C[CK][K] : never } : Array<U[K]>;
