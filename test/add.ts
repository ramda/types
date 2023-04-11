import { expectType, expectError } from 'tsd';
import { add } from '../es';

expectType<number>(add(2, 3));
expectType<number>(add(7)(10));
expectType<(a: number) => number>(add(7));

expectError(add('foo', 'bar'));
expectError(add('foo')('bar'));

