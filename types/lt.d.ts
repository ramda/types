import { Ord, Placeholder, WidenLiterals } from './util/tools';

export function lt<T extends Ord>(a: T, b: T): boolean;
export function lt<T extends Ord>(__: Placeholder, b: T): (a: WidenLiterals<T>) => boolean;
export function lt<T extends Ord>(a: T): (b: WidenLiterals<T>) => boolean;
