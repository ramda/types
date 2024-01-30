export function partition<T, U extends T>(fn: (a: T) => a is U, list: readonly T[]): [U[], Exclude<T, U>[]];
export function partition<T>(fn: (a: T) => boolean, list: readonly T[]): [T[], T[]];

export function partition<T, U extends T>(fn: (a: T) => a is U): <L extends T = T>(list: readonly L[]) => [U[], Exclude<L, U>[]];
export function partition<T>(fn: (a: T) => boolean): <L extends T = T>(list: readonly L[]) => [L[], L[]];
