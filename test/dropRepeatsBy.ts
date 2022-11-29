import { expectType, expectError } from 'tsd';
import { dropRepeatsBy } from '../types/dropRepeatsBy';

expectType<number[]>(dropRepeatsBy(Math.abs, [1, -1, -2, 2, 3, 100]));
expectType<number[]>(dropRepeatsBy(Math.abs)([1, -1, -2, 2, 3, 100]));
expectType<(list: readonly number[]) => number[]>(dropRepeatsBy(Math.abs));

// @ts-expect-error
expectError(dropRepeatsBy(Math.abs, ['1', '-1', '-2', '100']));
// @ts-expect-error
expectError(dropRepeatsBy(Math.abs)(['1', '-1', '-2', '100']));
