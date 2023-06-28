import * as _ from 'ts-toolbelt';

export function mergeDeepRight<L extends object>(l: L): <R extends object>(r: R) => _.O.Assign<L, [R], 'deep'>;
export function mergeDeepRight<L extends object, R extends object>(l: L, r: R): _.O.Assign<L, [R], 'deep'>;
