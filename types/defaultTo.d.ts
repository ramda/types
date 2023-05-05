import { DefaultTo } from './util/tools';

export function defaultTo<Fallback, Value>(a: Fallback, b: Value): DefaultTo<Fallback, Value>;
export function defaultTo<Fallback>(a: Fallback): <Value>(b: Value) => DefaultTo<Fallback, Value>;
