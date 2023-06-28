import { expectType, expectError, expectAssignable } from 'tsd';
import { count, isNotNil } from '../es';

expectType<number>(count(x => x < 5, [1, 2, 3, 4, 5]));

// expectError when types don't match
expectError(count((x: number) => x < 5, ['a', 'b', 'c']));
expectError(count((x: string) => x === 'ok', [1, 2, 3, 4, 5]));

// expectType doesn't work here because the `T` defined in the generic is not the same `T` returned by `count(isNotNil)`
expectAssignable<<T>(list: readonly T[]) => number>(count(isNotNil));
