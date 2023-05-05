
export function defaultTo<Fallback, Value>(a: Fallback, b: Value): (Value extends (null | undefined) ? Fallback | Exclude<Value, null | undefined> : Value);
export function defaultTo<Fallback>(a: Fallback): <Value>(b: Value) => (Value extends (null | undefined) ? Fallback | Exclude<Value, null | undefined> : Value);


type DefaultTo<Fallback, Value> = (Value extends (null | undefined) ? Fallback | Exclude<Value, null | undefined> : Value);

type ShouldBeString1 = DefaultTo<string, undefined>;
type ShouldBeString2 = DefaultTo<string, null>;
type ShouldBeString3 = DefaultTo<number, string>;
type ShouldBeNumber = DefaultTo<string, number>;
type ShouldBeStringOrNumber1 = DefaultTo<string, number | undefined>;
type ShouldBeStringOrNumber2 = DefaultTo<string, number | null>;
