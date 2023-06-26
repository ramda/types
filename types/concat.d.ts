import { Placeholder, WidenLiterals } from './util/tools';

// concat(string)(string)
export function concat<S1 extends string>(s1: S1): <S2 extends string>(s2: S2) => string extends (S1 | S2) ? string : `${S1}${S2}`;
// concat(list)(list)
export function concat<T>(list1: readonly T[]): (list2: readonly WidenLiterals<T>[]) => WidenLiterals<T>[];
// concat(__, string)(string)
export function concat<S2 extends string>(__: Placeholder, s2: S2): <S1 extends string>(s1: S1) => string extends (S1 | S2) ? string : `${S1}${S2}`;
// concat(__, list)(list)
export function concat<T>(__: Placeholder, list2: readonly T[]): (list1: readonly WidenLiterals<T>[]) => WidenLiterals<T>[];
// concat(string, string)
export function concat<S1 extends string, S2 extends string>(s1: S1, s2: S2): string extends (S1 | S2) ? string : `${S1}${S2}`;
// concat(list, list)
export function concat<T>(list1: readonly T[], list2: readonly T[]): WidenLiterals<T>[];
