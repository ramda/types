// this import will not work here but does in the build
import { ElementOf } from './util/tools';

export function pick<Names extends readonly PropertyKey[]>(names: Names): <U extends Record<ElementOf<Names>, any>>(obj: U) => string extends keyof U ? Record<string, U[keyof U]> : Pick<U, ElementOf<Names>>;
export function pick<U, Names extends readonly (keyof U)[]>(names: Names, obj: U): string extends keyof U ? Record<string, U[keyof U]> : Pick<U, ElementOf<Names>>;
