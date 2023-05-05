import { Placeholder, Ord } from './util/tools';

export function max<T extends Ord>(a: T): (b: T) => T;
export function max<T extends Ord>(__: Placeholder, b: T): (a: T) => T;
export function max<T extends Ord>(a: T, b: T): T;
