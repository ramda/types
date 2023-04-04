// string
export function tail(list: string): string;
// empty tuple - purposefully `never, They literally have no tail
export function tail(list: readonly []): never;
// length=1 tuples also return `never`. They literally have no tail
export function tail<T>(list: readonly [T]): never;
// non-empty tuples and array
// `infer Rest` only works on types like `readonly [1, '2', 3]` where you will get back `['2', 3]`
// else, if the type is `string[]`, you'll get back `string[]`
export function tail<T extends readonly [...any]>(tuple: T): T extends readonly [any, ...infer Rest] ? Rest : T;
