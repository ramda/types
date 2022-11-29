import { expectType } from 'tsd';
import { and } from '../types/and';

expectType<string | boolean>(and('a')(false));
expectType<string | boolean>(and('true')('true'));
expectType<boolean | boolean>(and(false)(true));

// @ts-expect-error
expectType<number | boolean>(and(1, [2]));
// @ts-expect-error
expectType<number[] | boolean>(and([2], '1'));
// @ts-expect-error
expectType<null | boolean>(and(null, undefined));
