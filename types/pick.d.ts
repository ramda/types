import * as _ from 'ts-toolbelt';

export function pick<T extends readonly [any, ...any], K extends string | number | symbol>(
  names: readonly K[],
  array: T,
): {
  [P in K as P extends number
    ? _.N.Greater<T['length'], P> extends 1
      ? P
      : never
    : never]: P extends keyof T ? T[P] : T[number];
};
export function pick<T, K extends string | number | symbol>(
  names: readonly K[],
  obj: T,
): { [P in keyof T as P extends K ? P : never]: T[P] };
export function pick<K extends string | number | symbol>(
  names: readonly K[],
): <T extends readonly [any, ...any] | object>(
  obj: T,
) => T extends readonly [any, ...any]
  ? {
    [P in K as P extends number
      ? _.N.Greater<T['length'], P> extends 1
        ? P
        : never
      : never]: P extends keyof T ? T[P] : T[number];
  }
  : { [P in keyof T as P extends K ? P : never]: T[P] };
