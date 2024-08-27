import * as _ from 'ts-toolbelt';

// Note: ramda `mergeLeft` uses `Object.assign` in code, so we need to use `O.Assign` here, and not `O.Merge`
export function mergeLeft<U extends object>(l: U): (r: U) => U;
export function mergeLeft<L extends object>(l: L): <R extends object>(r: R) => _.O.Assign<R, [L], 'flat'>;
export function mergeLeft<U extends object>(l: U, r: U): U;
export function mergeLeft<L extends object, R extends object>(l: L, r: R): _.O.Assign<R, [L], 'flat'>;
