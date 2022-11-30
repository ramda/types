export function tap<T, R extends T = T>(fn: (a: T) => asserts a is R, value: T): R;
export function tap<T, R extends T = T>(fn: (a: T) => asserts a is R): (value: T) => R;
export function tap<T>(fn: (a: T) => void, value: T): T;
export function tap<T>(fn: (a: T) => void): (value: T) => T;
