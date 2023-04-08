import { Placeholder } from './util/tools';

// if key does not extend a property whos value an Array, obj is simply wrapped in an array.
// Otherwise it is an array of that object, but that specific property retyped as the inner type, eg `Array<T>` becomes `T`
export function unwind<O extends object>(__: Placeholder, obj: O): {
  <K extends keyof O>(key: K): O[K] extends Array<infer T> ? Array<Omit<O, K> & Record<K, T>> : [O];
  <K extends PropertyKey>(key: K): [O];
};
export function unwind<K extends keyof O, O>(key: K, obj: O): O[K] extends Array<infer T> ? Array<Omit<O, K> & Record<K, T>> : [O];
// if K does not exist on O, [O] is returned
export function unwind<K extends PropertyKey, O>(key: K, obj: O): [O];
export function unwind<K extends PropertyKey>(key: K): {
  <O extends Record<K, any>>(obj: O): O[K] extends Array<infer T> ? Array<Omit<O, K> & Record<K, T>> : [O];
  <O>(obj: O): [O];
};
