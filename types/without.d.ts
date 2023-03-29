export function without<T>(list1: readonly unknown[], list2: readonly T[]): T[];
export function without<T>(list1: readonly T[] | readonly unknown[]): (list2: readonly T[]) => T[];
