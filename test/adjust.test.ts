import { expectType, expectError } from 'tsd';
import { __, adjust, identity, toUpper } from '../es';

// adjust(index)(fn)(list)
expectType<string[]>(adjust(1)(toUpper)(['a', 'b', 'c']));
// adjust(index)(__, list)(fn)
expectType<string[]>(adjust(1)(__, ['a', 'b', 'c'])(toUpper));
// adjust(index)(fn, list)
expectType<string[]>(adjust(1)(toUpper, ['a', 'b', 'c']));

// adjust(__, fn)(index)(list)
expectType<string[]>(adjust(__, toUpper)(1)(['a', 'b', 'c']));
// adjust(__, fn)(__, list)(index)
expectType<string[]>(adjust(__, toUpper)(__, ['a', 'b', 'c'])(1));
// adjust(__, fn)(index), list)
expectType<string[]>(adjust(__, toUpper)(1, ['a', 'b', 'c']));

// adjust(index, fn)(index)
expectType<string[]>(adjust(2, toUpper)(['c', 'd', 'e']));

// adjust(__, __, list)(index)(fn)
expectType<string[]>(adjust(__, __, ['a', 'b', 'c'])(1)(toUpper));
// adjust(__, __, list)(__, fn)(index)
expectType<string[]>(adjust(__, __, ['a', 'b', 'c'])(__, toUpper)(1));
// adjust(__, __, index)(index, fn)
expectType<string[]>(adjust(__, __, ['a', 'b', 'c'])(1, toUpper));

// adjust(index, fn, index)
expectType<string[]>(adjust(1, toUpper, ['a', 'b', 'c']));

expectType<string[]>(adjust(1)(identity)(['a', 'b', 'c']));
expectType<string[]>(adjust(1, identity)(['a', 'b', 'c']));
expectType<string[]>(adjust(1, identity, ['a', 'b', 'c']));

// some other types
expectType<number[]>(adjust(2, (n: number) => n * 2)([1, 2, 3]));
expectType<boolean[]>(adjust(2, (n: boolean) => !n)([true, false, true]));

// fail if `fn` returns different type
expectError(adjust(1, (x: number) => x.toString(), [1, 2, 3]));
// fail if index is not a number
expectError(adjust('1', toUpper, ['c', 'd', 'e']));
// fail is `fn` returns void
expectError(adjust(2, () => {}, [2, 3, 4]));
