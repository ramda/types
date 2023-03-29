/* eslint-disable @typescript-eslint/no-unused-vars */
import { Placeholder, Prop } from './util/tools';

export function prop<_, T>(__: Placeholder, value: T): {
  <P extends keyof Exclude<T, undefined>>(p: P): Prop<T, P>;
  <P extends keyof never>(p: P): Prop<T, P>;
};
export function prop<V>(__: Placeholder, value: unknown): (p: keyof never) => V;
export function prop<_, P extends keyof never, T>(p: P, value: T): Prop<T, P>;
export function prop<V>(p: keyof never, value: unknown): V;
export function prop<_, P extends keyof never>(p: P): <T>(value: T) => Prop<T, P>;
export function prop<V>(p: keyof never): (value: unknown) => V;
