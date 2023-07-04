import { ElementOf } from './util/tools';

export function pick<const Names extends readonly [PropertyKey, ...PropertyKey[]]>(names: Names): <U extends Record<ElementOf<Names>, any>>(obj: U) => string extends keyof U ? Record<string, U[keyof U]> : { [P in ElementOf<Names>]: U[P] };
export function pick<U, Names extends readonly [keyof U, ...(keyof U)[]]>(names: Names, obj: U): string extends keyof U ? Record<string, U[keyof U]> : { [P in ElementOf<Names>]: U[P] };
