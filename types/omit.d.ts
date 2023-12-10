import { ElementOf } from './util/tools';

export function omit<const Names extends readonly string[]>(names: Names): <U extends Record<ElementOf<Names>, any>>(obj: U) => Omit<U, ElementOf<Names>>;
export function omit<U, const Names extends readonly (keyof U)[]>(names: Names, obj: U): Omit<U, ElementOf<Names>>;
