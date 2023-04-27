import { MergeDeepObjects } from './util/tools';

export function mergeDeepRight<L extends object, R extends object>(l: L, r: R): MergeDeepObjects<L, R>;
export function mergeDeepRight<L extends object>(l: L): <R extends object>(r: R) => MergeDeepObjects<L, R>;
