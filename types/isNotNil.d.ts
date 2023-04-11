import { U } from 'ts-toolbelt';

export function isNotNil<T>(
  value: T
): value is U.NonNullable<T>;
