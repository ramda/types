import { Placeholder } from './util/tools';

type ObjectHavingSome<Key extends string> = {
  [K in Key]: { [P in K]: unknown };
}[Key];

export function has(__: Placeholder, obj: unknown): <P extends string>(s: P) => obj is ObjectHavingSome<P>;
export function has<P extends string>(s: P, obj: unknown): obj is ObjectHavingSome<P>;
export function has(__: Placeholder): <P extends string>(obj: unknown, s: P) => obj is ObjectHavingSome<P>;
export function has<P extends string>(s: P): (obj: unknown) => obj is ObjectHavingSome<P>;

