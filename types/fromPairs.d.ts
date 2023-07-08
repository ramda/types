export function fromPairs<K extends PropertyKey, V>(
  pairs: readonly [K, V][]
): { [P in K]: V };
