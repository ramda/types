import * as _ from 'ts-toolbelt';

export function mergeAll<O extends object, Os extends readonly object[]>(list: [O, ...Os]): _.O.Assign<O, Os>;
export function mergeAll<O>(list: readonly O[]): O;
