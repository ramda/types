export function fromPairs<K extends string | number, V>(
  pairs: readonly [K, V][]
): { [P in K]: V };
