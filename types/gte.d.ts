import { Ord, Placeholder } from './util/tools';

export function gte<T extends Ord>(a: T, b: T): boolean;
export function gte<T extends Ord>(__: Placeholder, b: T): (a: T) => boolean;
export function gte<T extends Ord>(a: T): (b: T) => boolean;
