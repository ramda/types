// string
export function tail(list: string): string;
// `infer Tail` only works on types like `readonly [1, '2', 3]` where you will get back `['2', 3]`
// else, if the type is `string[]`, you'll get back `string[]`
export function tail<T extends readonly [...any]>(list: T): T extends readonly [any, ...infer Tail] ? Tail : T;
