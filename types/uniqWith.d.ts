// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function uniqWith<T, U>(pred: (x: T, y: T) => boolean, list: readonly T[]): T[];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function uniqWith<T, U>(pred: (x: T, y: T) => boolean): (list: readonly T[]) => T[];
