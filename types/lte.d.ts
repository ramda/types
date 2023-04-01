import { Ord, Placeholder } from './util/tools';

export function lte<T extends Ord>(a: T, b: T): boolean;
export function lte<T extends Ord>(__: Placeholder, b: T): (a: T) => boolean;
export function lte<T extends Ord>(a: T): (b: T) => boolean;
