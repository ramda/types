import { Ordering } from './util/tools';

export function descendNatural<T>(locales: string | string[]): (fn: (obj: T) => string) => (a: T, b: T) => Ordering;
export function descendNatural<T>(locales: string | string[], fn: (obj: T) => string): (a: T, b: T) => Ordering;
export function descendNatural<T>(locales: string | string[], fn: (obj: T) => string, a: T, b: T): Ordering;
