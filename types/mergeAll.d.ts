import * as _ from 'ts-toolbelt';

// for when passing in an object literal of different objects, eg `mergeAll([obj1: T1, obj2: T2, obj3: T3])`
// you get back essentially a cleaner version of `T1 & T2 & T3`
export function mergeAll<T extends object, Ts extends readonly object[]>(list: [T, ...Ts]): _.O.Assign<T, Ts>;
// for when passing in an `T[]` where all the objects are the same shape `mergeAll([obj1, obj2, obj3]: T[])
// this just returns T
export function mergeAll<T>(list: readonly T[]): T;
