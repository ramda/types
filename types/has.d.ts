import { Placeholder, ObjectHavingSome } from './util/tools';

export function has<K extends PropertyKey>(prop: K): (obj: unknown) => obj is ObjectHavingSome<K>;
export function has(__: Placeholder, obj: unknown): <P extends PropertyKey>(s: P) => boolean;
export function has<K extends PropertyKey>(prop: K, obj: unknown): obj is ObjectHavingSome<K>;

