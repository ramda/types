import { Ord, Placeholder, WidenLiterals } from './util/tools';

export function lte<T extends Ord>(a: T): (b: WidenLiterals<T>) => boolean;
export function lte<T extends Ord>(__: Placeholder, b: T): (a: WidenLiterals<T>) => boolean;
export function lte<T extends Ord>(a: T, b: T): boolean;
