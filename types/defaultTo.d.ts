
export function defaultTo<Default, Value>(a: Default, b: Value): (Value extends (null | undefined) ? Default | Exclude<Value, null | undefined> : Value);
export function defaultTo<Default>(a: Default): <Value>(b: Value) => (Value extends (null | undefined) ? Default | Exclude<Value, null | undefined> : Value);


type DefaultTo<Default, Value> = (Value extends (null | undefined) ? Default | Exclude<Value, null | undefined> : Value);

type ShouldBeString1 = DefaultTo<string, undefined>;
type ShouldBeString2 = DefaultTo<string, null>;
type ShouldBeNumber = DefaultTo<string, number>;
type ShouldBeStringOrNumber1 = DefaultTo<string, number | undefined>;
type ShouldBeStringOrNumber2 = DefaultTo<string, number | null>;
