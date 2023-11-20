// string
export function init(list: string): string;
// empty tuple - purposefully `never, They literally have no init
export function tail(list: readonly []): never;
// length=1 tuples also return `never`. They literally have no init
export function init<T>(list: readonly [T]): never;
// non-empty tuples and array
// `infer Init` only works on types like `readonly [1, '2', 3]` where you will get back `['2', 3]`
// else, if the type is `string[]`, you'll get back `string[]`
export function init<T extends readonly [...any]>(list: T): T extends readonly [...infer Init, any] ? Init : T;
