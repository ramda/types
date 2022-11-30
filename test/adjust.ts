import { expectType, expectError } from 'tsd';
import { adjust } from '../types/adjust';
import { toUpper } from '../types/toUpper';
import { isNil } from '../types/isNil';

expectType<string[]>(adjust(1, toUpper, ['a', 'b', 'c']));
expectType<string[]>(adjust(2, toUpper)(['c', 'd', 'e']));

expectType<number[]>(adjust(2, (n: number) => n * 2)([1, 2, 3]));
expectType<boolean[]>(adjust(2, (n: boolean) => !n)([true, false, true]));

expectError(adjust(1, toString, [1, 2, 3]));
expectError(adjust('1', toUpper, ['c', 'd', 'e']));
expectError(adjust(2, isNil)([2, 3, 4]));
