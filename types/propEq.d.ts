import { Placeholder } from 'ramda';
import { WidenLiterals } from '../util/tools';

export function propEq(__: Placeholder): never;
export function propEq<const V>(val: V): {
  <K extends number>(name: K): <U extends any[]>(array: V extends U[K] ? V[] : never) => boolean;
  <K extends Exclude<PropertyKey, number>>(name: K): <U extends Partial<Record<K, any>>>(obj: string extends V ? U : V extends U[K] ? U : never) => boolean;
  <U>(__: Placeholder, obj: U): <K extends keyof U>(name: string extends V ? U : V extends U[K] ? U : never) => boolean;
  <K extends keyof U, const U>(name: K, obj: string extends V ? U : V extends U[K] ? U : never): boolean;
};
export function propEq<K extends number>(__: Placeholder, name: K): {
  <U extends any[]>(__: Placeholder, array: U): (val: U[K]) => boolean;
  <U extends any[]>(val: U[K], array: U): boolean
  <V>(val: V): (array: V[]) => boolean
};
export function propEq<K extends Exclude<PropertyKey, number>>(__: Placeholder, name: K): {
  <U extends Record<K, any>>(__: Placeholder, obj: U): (val: U[K]) => boolean;
  <U extends Record<K, any>>(val: U[K], obj: U): boolean;
  <V>(val: V): (obj: Partial<Record<K, V>>) => boolean;
};
export function propEq<V, K extends number>(val: V, name: K): (array: V[]) => boolean;
export function propEq<const V, K extends string | symbol>(val: V, name: K): <U extends Partial<Record<K, any>>>(obj: U) => V extends U[K] ? boolean : never;

export function propEq<U>(__: Placeholder, ___: Placeholder, obj: U): {
  <K extends keyof U>(__: Placeholder, name: K): (val: U[K]) => boolean;
  <K extends keyof U>(val: U[K], name: K): boolean;
  <K extends keyof U>(val: U[K]): (name: K) => boolean;
};
export function propEq<K extends keyof U, const U>(__: Placeholder, name: K, obj: U): (val: U[K]) => boolean;
export function propEq<K extends keyof U, const U>(val: U[K], __: Placeholder, obj: U): (name: K) => boolean;
export function propEq<K extends keyof U, const U>(val: WidenLiterals<U[K]>, name: K, obj: U): boolean;
