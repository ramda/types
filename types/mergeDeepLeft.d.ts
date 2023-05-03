import { MergeDeepObjects } from './util/tools';

export function mergeDeepLeft<L extends object>(l: L): <R extends object>(r: R) => MergeDeepObjects<R, L>;
export function mergeDeepLeft<L extends object, R extends object>(l: L, r: R): MergeDeepObjects<R, L>;
