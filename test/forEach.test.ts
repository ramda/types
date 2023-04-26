import { expectType } from 'tsd';
import { __, forEach } from '../es';

const noop = <T>(val: T) => {};

const arr: number[] = [];
const arrRO: readonly number[] = [];

expectType<number[]>(forEach(noop, arr));
expectType<readonly number[]>(forEach(noop, arrRO));

expectType<number[]>(forEach(__, arr)(noop));
expectType<readonly number[]>(forEach(__, arrRO)(noop));

expectType<number[]>(forEach(noop)(arr));
expectType<readonly number[]>(forEach(noop)(arrRO));
