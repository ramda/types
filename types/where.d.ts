export function where<T>(spec: T): <U>(testObj: U) => boolean;
export function where<T, U>(spec: T, testObj: U): boolean;
