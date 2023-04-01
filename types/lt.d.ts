import { Ord, Placeholder } from './util/tools';

export function lt<T extends Ord>(a: T, b: T): boolean;
export function lt<T extends Ord>(__: Placeholder, b: T): (a: T) => boolean;
export function lt<T extends Ord>(a: T): (b: T) => boolean;
