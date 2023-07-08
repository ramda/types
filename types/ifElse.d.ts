export function ifElse<T, TF extends T, TOnTrueResult, TOnFalseResult>(
  pred: (a: T) => a is TF,
  onTrue: (a: TF) => TOnTrueResult,
  onFalse: (a: Exclude<T, TF>) => TOnFalseResult,
): (a: T) => TOnTrueResult | TOnFalseResult;
export function ifElse<TArgs extends readonly any[], TOnTrueResult, TOnFalseResult>(
  fn: (...args: TArgs) => boolean,
  onTrue: (...args: TArgs) => TOnTrueResult,
  onFalse: (...args: TArgs) => TOnFalseResult,
): (...args: TArgs) => TOnTrueResult | TOnFalseResult;
