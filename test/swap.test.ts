import { expectType } from 'tsd';
import { __, pipe, compose, swap } from '../es';

const indexA = 0;
const indexB = 1;
const list: number[] = [];

expectType<number[]>(swap(indexA, indexB, list));

expectType<number[]>(swap(__, indexB, list)(indexA));

expectType<number[]>(swap(indexA, __, list)(indexB));

expectType<number[]>(swap(__, __, list)(indexA, indexB));
expectType<number[]>(swap(__, __, list)(__, indexB)(indexA));
expectType<number[]>(swap(__, __, list)(indexA)(indexB));

expectType<number[]>(swap(indexA, indexB)(list));

expectType<number[]>(swap(__, indexB)(indexA, list));
expectType<number[]>(swap(__, indexB)(__, list)(indexA));
expectType<number[]>(swap(__, indexB)(indexA)(list));

expectType<number[]>(swap(indexA)(indexB, list));
expectType<number[]>(swap(indexA)(__, list)(indexB));
expectType<number[]>(swap(indexA)(indexB)(list));

// sanity checks for compose and pipe
expectType<(list: readonly number[]) => number[]>(pipe(swap(indexA, indexB)));
expectType<(list: readonly number[]) => number[]>(compose(swap(indexA, indexB)));
