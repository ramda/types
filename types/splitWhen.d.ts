export function splitWhen<T>(pred: (val: T) => boolean): <T>(list: readonly T[]) => [T[], T[]];
export function splitWhen<T>(pred: (val: T) => boolean, list: readonly T[]): [T[], T[]];
