import { expectType } from 'tsd';
import { __, reduce, pipe, compose } from '../es';

const sum = (acc: number, val: number) => acc + val;

// reduce(f, acc, list)
expectType<number>(reduce(sum, 0, [] as number[]));

// reduce(__, acc, list)(f)
expectType<number>(reduce(__, 0, [] as number[])(sum));

// reduce(f, _, list)(acc)
expectType<number>(reduce(sum, __, [] as number[])(0));

// reduce(__, __, list)(f, acc)
expectType<number>(reduce(__, __, [] as number[])(sum, 0));
// reduce(__, __, list)(__, acc)(f)
expectType<number>(reduce(__, __, [] as number[])(__, 0)(sum));
// reduce(__, __, list)(f)(acc)
expectType<number>(reduce(__, __, [] as number[])(sum)(0));

// reduce(f, acc)(list)
expectType<number>(reduce(sum, 0)([] as number[]));

// reduce(__, acc)(f, list)
expectType<number>(reduce(__, 0)(sum, [] as number[]));
// reduce(__, acc)(__, list)(f)
expectType<number>(reduce(__, 0)(__, [] as number[])(sum));
// reduce(__, acc)(f)(list)
expectType<number>(reduce(__, 0)(sum)([] as number[]));

// reduce(f)(acc, list)
expectType<number>(reduce(sum)(0, [] as number[]));
// reduce(f)(__, list)(acc)
expectType<number>(reduce(sum)(__, [] as number[])(0));
// reduce(f)(acc)(list)
expectType<number>(reduce(sum)(0)([] as number[]));


// sanity checks for compose and pipe
expectType<(list: readonly number[]) => number>(pipe(reduce(sum, 0)));
expectType<(list: readonly number[]) => number>(compose(reduce(sum, 0)));
