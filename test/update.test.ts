import { expectType, expectError } from 'tsd';
import { __, update } from '../es';

// update(index)(value)(list)
expectType<string[]>(update(1)('z')(['a', 'b', 'c']));
// update(index)(__, list)(value)
expectType<string[]>(update(1)(__, ['a', 'b', 'c'])('z'));
// update(index)(value, list)
expectType<string[]>(update(1)('z', ['a', 'b', 'c']));

// update(__, value)(index)(list)
expectType<string[]>(update(__, 'z')(1)(['a', 'b', 'c']));
// update(__, value)(__, list)(index)
expectType<string[]>(update(__, 'z')(__, ['a', 'b', 'c'])(1));
// update(__, value)(index), list)
expectType<string[]>(update(__, 'z')(1, ['a', 'b', 'c']));

// update(index, value)(index)
expectType<string[]>(update(2, 'z')(['c', 'd', 'e']));

// update(__, __, list)(index)(value)
expectType<string[]>(update(__, __, ['a', 'b', 'c'])(1)('z'));
// update(__, __, list)(__, value)(index)
expectType<string[]>(update(__, __, ['a', 'b', 'c'])(__, 'z')(1));
// update(__, __, index)(index, value)
expectType<string[]>(update(__, __, ['a', 'b', 'c'])(1, 'z'));

// update(index, value, index)
expectType<string[]>(update(1, 'z', ['a', 'b', 'c']));

// some other types
expectType<number[]>(update(2, 42)([1, 2, 3]));
expectType<boolean[]>(update(2, true)([true, false, true]));

// fail if `value` returns different type
expectError(update(1, '42', [1, 2, 3]));
// fail if index is not a number
expectError(update('1', 'z', ['a', 'b', 'c']));
