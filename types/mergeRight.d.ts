import * as _ from 'ts-toolbelt';

// Note: ramda `mergeLeft` uses `Object.assign` in code, so we need to use `O.Assign` here, and not `O.Merge`
export function mergeRight<U extends object>(l: U): (r: U) => U;
export function mergeRight<L extends object>(l: L): <R extends object>(r: R) => _.O.Assign<L, [R], 'flat'>;
export function mergeRight<U extends object>(l: U, r: U): U;
export function mergeRight<L extends object, R extends object>(l: L, r: R): _.O.Assign<L, [R], 'flat'>;
