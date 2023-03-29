import * as _ from 'ts-toolbelt';

export function mergeAll<O extends object, Os extends readonly object[]>(list: [O, ...Os]): _.O.Assign<O, Os>;
