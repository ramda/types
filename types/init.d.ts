// string
export function init(list: string): string;
// `infer Init` only works on types like `readonly [1, '2', 3]` where you will get back `['2', 3]`
// else, if the type is `string[]`, you'll get back `string[]`
export function init<T extends readonly [...any]>(list: T): T extends readonly [...infer Init, any] ? Init : T;
