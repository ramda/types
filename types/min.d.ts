import { Placeholder, Ord } from './util/tools';

export function min<T extends Ord>(a: T): (b: T) => T;
export function min<T extends Ord>(__: Placeholder, b: T): (a: T) => T;
export function min<T extends Ord>(a: T, b: T): T;
