import { ElementOf } from './util/tools';

export function pick<const Names extends readonly PropertyKey[]>(names: Names): <U extends Partial<Record<ElementOf<Names>, any>>>(obj: U) => string extends keyof U ? Record<string, U[keyof U]> : ElementOf<Names> extends keyof U ? Pick<U, ElementOf<Names>> : never;
export function pick<U, const Names extends readonly (keyof U)[]>(names: Names, obj: U): string extends keyof U ? Record<string, U[keyof U]> : Pick<U, ElementOf<Names>>;
