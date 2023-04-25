import * as _ from 'ts-toolbelt';

// for when passing in an object literal of different objects, eg `mergeAll([obj1: O1, obj2: O2, obj3: O3])`
// you get back essentially a cleaner version of `O1 & O2 & O3`
export function mergeAll<O extends object, Os extends readonly object[]>(list: [O, ...Os]): _.O.Assign<O, Os>;
// for when passing in an `O[]` where all the objects are the same shape `mergeAll([obj1, obj2, obj3]: O[])
// this just returns the original type back
export function mergeAll<O>(list: O[]): O[];
// if O[] is readonly only, give back readonly
export function mergeAll<O>(list: readonly O[]): readonly O[];
