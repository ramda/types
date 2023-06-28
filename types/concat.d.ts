import { Placeholder } from './util/tools';

// concat(string)(string)
export function concat<S1 extends string>(s1: S1): <S2 extends string>(s2: S2) => string extends (S1 | S2) ? string : `${S1}${S2}`;
// concat(list)(list)
export function concat<T>(list1: readonly T[]): (list2: readonly T[]) => T[];
// concat(__, string)(string)
export function concat<S2 extends string>(__: Placeholder, s2: S2): <S1 extends string>(s1: S1) => string extends (S1 | S2) ? string : `${S1}${S2}`;
// concat(__, list)(list)
export function concat<T2>(__: Placeholder, list2: readonly T2[]): <T1>(list1: (readonly T2[] extends readonly T1[] ? readonly T1[] : never)) => T1[];
// concat(string, string)
export function concat<S1 extends string, S2 extends string>(s1: S1, s2: S2): string extends (S1 | S2) ? string : `${S1}${S2}`;
// concat(list, list)
export function concat<T1, T2 extends T1>(list1: readonly T1[], list2: readonly T2[]): T1[];
