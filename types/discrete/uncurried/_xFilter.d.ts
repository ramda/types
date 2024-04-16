// _xFilter(() => narrow)
export function _xFilter<A, P extends A>(
  pred: (val: A) => val is P,
): Function; // TODO

// _xFilter(() => boolean)
export function _xFilter<A>(
  pred: (value: A) => boolean,
): Function; // TODO
