import * as _ from 'ts-toolbelt';

export function isNotNil<T>(value: T): value is NonNullable<T>;
