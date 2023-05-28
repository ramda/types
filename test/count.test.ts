import { expectType, expectError } from 'tsd';
import { count } from '../es';

expectType<number>(count(x => x < 5, [1, 2, 3, 4, 5]));

// expectError when types don't match
expectError(count(x => x < 5, ['a', 'b', 'c']));
expectError(count(x => x === 'ok', [1, 2, 3, 4, 5]));
