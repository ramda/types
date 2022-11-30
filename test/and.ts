import { expectType } from 'tsd';
import { and } from '../types/and';

expectType<string | boolean>(and('a')(false));
expectType<string | boolean>(and('true')('true'));
expectType<boolean | boolean>(and(false)(true));

expectType<number | boolean>(and(1, [2]));
expectType<number[] | boolean>(and([2], '1'));
expectType<null | boolean>(and(null, undefined));
