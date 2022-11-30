import { Placeholder, Prop } from './util/tools';

export function prop<T>(__: Placeholder, value: T): {
  <P extends keyof Exclude<T, undefined>>(p: P): Prop<T, P>;
  <P extends keyof never>(p: P): Prop<T, P>;
};
export function prop<P extends keyof never, T>(__: Placeholder, value: T): (p: P) => Prop<T, P>;
export function prop<P extends keyof never, T>(p: P, value: T): Prop<T, P>;
export function prop<P extends keyof never>(p: P): {
  <T>(value: Record<P, T>): T;
  <T>(value: T): Prop<T, P>;
};
export function prop<P extends keyof T, T>(p: P): {
  (value: T): Prop<T, P>;
};
export function prop<P extends keyof never, T>(p: P): {
  (value: Record<P, T>): T;
};
