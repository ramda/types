import { Ord, Placeholder } from './util/tools';

export function gt<T extends Ord>(a: T, b: T): boolean;
export function gt<T extends Ord>(__: Placeholder, b: T): (a: T) => boolean;
export function gt<T extends Ord>(a: T): (b: T) => boolean;
