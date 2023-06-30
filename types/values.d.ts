import { ValueOfUnion } from './util/tools';

export function values<T extends object>(obj: T): ValueOfUnion<T>[];
