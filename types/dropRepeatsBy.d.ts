export function dropRepeatsBy<T, U>(fn: (a: T) => U): (list: readonly T[]) => T[];
export function dropRepeatsBy<T, U>(fn: (a: T) => U, list: readonly T[]): T[];

