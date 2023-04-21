import { MergeObjects } from './util/tools';

// Note: ramda `mergeLeft` is just `mergeRight` with the operands flipped
export function mergeLeft<L extends object, R extends object>(l: L, r: R): MergeObjects<R, L>;
export function mergeLeft<L extends object>(l: L): <R extends object>(r: R) => MergeObjects<R, L>;
