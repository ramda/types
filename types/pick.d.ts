import { ElementOf } from './util/tools';

export function pick<U, Names extends [keyof U, ...(keyof U)[]]>(names: Names, obj: U): { [P in ElementOf<Names>]: U[P] };
