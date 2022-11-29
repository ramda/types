import { expectType, expectError } from 'tsd';
import { add } from '../types/add';

expectType<number>(add(2, 3));
expectType<number>(add(7)(10));
expectType<(a: number) => number>(add(7));
// @ts-expect-error
expectError(add('foo', 'bar'));
// @ts-expect-error
expectError(add('foo')('bar'));

