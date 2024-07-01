import { Ordering } from './util/tools';

export function ascendNatural(locales: string | string[]): <T>(fn: (obj: T) => string) => (a: T, b: T) => Ordering;
export function ascendNatural<T>(locales: string | string[], fn: (obj: T) => string): (a: T, b: T) => Ordering;
export function ascendNatural<T>(locales: string | string[], fn: (obj: T) => string, a: T, b: T): Ordering;
