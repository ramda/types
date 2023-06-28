export function splitWhen<T>(pred: (val: T) => boolean): <U extends T>(list: readonly U[]) => [U[], U[]];
export function splitWhen<T>(pred: (val: T) => boolean, list: readonly T[]): [T[], T[]];
