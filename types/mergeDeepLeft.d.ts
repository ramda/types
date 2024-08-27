import * as _ from 'ts-toolbelt';

export function mergeDeepLeft<U extends object>(l: U): (r: U) => U;
export function mergeDeepLeft<L extends object>(l: L): <R extends object>(r: R) => _.O.Assign<R, [L], 'deep'>;
export function mergeDeepLeft<U extends object>(l: U, r: U): U;
export function mergeDeepLeft<L extends object, R extends object>(l: L, r: R): _.O.Assign<R, [L], 'deep'>;
