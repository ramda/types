export function splitWhenever<T>(pred: (a: T) => boolean): <T>(list: T[]) => T[][];
export function splitWhenever<T>(pred: (a: T) => boolean, list: T[]): T[][];
