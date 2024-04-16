// _filterO(() => narrow)
export function _filterO<A, P extends A>(
  pred: (val: A) => val is P,
): <B extends A>(dict: Record<string, B>) => Record<string, P>;

// _filterO(() => boolean)
export function _filterO<A>(
  pred: (value: A) => boolean,
): (dict: Record<string, A>) => Record<string, A>;

// _filterO(() => narrow, list) - readonly T[] falls into Record<string T> for some reason, so list needs to come first
export function _filterO<A, P extends A>(pred: (val: A) => val is P, dict: Record<string, A>): Record<string, P>;
export function _filterO<A>(pred: (val: A) => boolean, dict: Record<string, A>): Record<string, A>;
