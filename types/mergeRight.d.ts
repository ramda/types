import { MergeObjects } from './util/tools';

// mergeRight is just Object.assign in code, which is just the type `L & R`
// were going to take is a step further and collapsing it to just L if `L extends R`
// see the test file for my details
export function mergeRight<L extends object, R extends object>(l: L, r: R): MergeObjects<L, R>;
export function mergeRight<L extends object>(l: L): <R extends object>(r: R) => MergeObjects<L, R>;
