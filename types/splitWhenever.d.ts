declare function splitWhenever<T>(pred: (a: T) => boolean): <T>(list: T[]) => T[][];
declare function splitWhenever<T>(pred: (a: T) => boolean, list: T[]): T[][];
