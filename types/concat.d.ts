import { Placeholder } from './util/tools';

// concat(string)(string)
export function concat<S1 extends string>(s1: S1): <S2 extends string>(s2: S2) => `${S1}${S2}`;
export function concat(s1: string): (s2: string) => string;
// concat(list)(list)
export function concat<T>(list1: T[]): (list2: T[]) => T[];
// concat(__, string)(string)
export function concat<S2 extends string>(__: Placeholder, s2: S2): <S1 extends string>(s1: S1) => `${S1}${S2}`;
export function concat(__: Placeholder, s2: string): (s1: string) => string;
// concat(__, list)(list)
export function concat<T>(__: Placeholder, list2: T[]): (list1: T[]) => T[];
// concat(string, string)
export function concat<S1 extends string, S2 extends string>(s1: S1, s2: S2): `${S1}${S2}`;
export function concat(s1: string, s2: string): string;
// concat(list, list)
export function concat<T>(list1: T[], list2: T[]): T[];
