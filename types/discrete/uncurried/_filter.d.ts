// _filter(() => narrow)
export function _filter<A, P extends A>(
  pred: (val: A) => val is P,
): <B extends A>(list: readonly B[]) => P[];

// _filter(() => boolean)
export function _filter<A>(
  pred: (value: A) => boolean,
): <B extends A>(list: readonly B[]) => A[];

// _filter(() => narrow, list) - readonly T[] falls into Record<string T> for some reason, so list needs to come first
export function _filter<A, P extends A>(pred: (val: A) => val is P, list: readonly A[]): P[];
export function _filter<A>(pred: (val: A) => boolean, list: readonly A[]): A[];
