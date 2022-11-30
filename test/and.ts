import { expectAssignable } from 'tsd';
import { and } from '../types/and';

expectAssignable<string | boolean>(and('a')(false));
expectAssignable<string | boolean>(and('true')('true'));
expectAssignable<boolean | boolean>(and(false)(true));

expectAssignable<number | number[]>(and(1, [2]));
expectAssignable<number[] | string>(and([2], '1'));

// passing `null` falls into the __: Placeholder option
// TODO: figure this one out
// expectAssignable<null | boolean>(and(null, undefined));
