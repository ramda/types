import { Placeholder } from 'ramda';

export function propEq(__: Placeholder): never;
export function propEq<V>(val: V): {
  <K extends PropertyKey>(name: K): (obj: Record<K, any>) => boolean;
  <U extends Record<PropertyKey, any>>(__: Placeholder, obj: U): (name: keyof U) => boolean;
  <K extends keyof U, U extends Record<PropertyKey, any>>(name: K, obj: U): boolean;
};
export function propEq<K extends PropertyKey>(__: Placeholder, name: K): {
  (__: Placeholder, obj: Record<K, any>): <V>(val: V) => boolean;
  <V>(val: V, obj: Record<K, any>): boolean
  <V>(val: V): (obj: Record<K, any>) => boolean
};
export function propEq<V, K extends PropertyKey>(val: V, name: K): (obj: Record<K, any>) => boolean;


export function propEq<U extends Record<any, any>>(__: Placeholder, ___: Placeholder, obj: U): {
  (__: Placeholder, name: keyof U): {
    (__: Placeholder): never;
    <V>(val: V): boolean;
  }
  <V>(val: V, name: keyof U): boolean;
  (__: Placeholder): never;
  <V>(val: V): (name: keyof U) => boolean;
};
export function propEq<K extends PropertyKey>(__: Placeholder, name: K, obj: Record<K, any>): {
  (__: Placeholder): never;
  <V>(val: V): boolean;
};
export function propEq<V, U extends Record<any, any>>(val: V, __: Placeholder, obj: U): (name: keyof U) => boolean;
export function propEq<V, U extends Record<any, any>>(val: V, name: keyof U, obj: U): boolean;
