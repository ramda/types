import { expectAssignable } from 'tsd';
import { modifyPath, reverse, identity } from '../es';

// test paths 1 to 7
// with string -> number
//      unknown -> string
//      T -> T

type T0 = { t0: string };
type T1 = { t0: string; d0: { t1: string } };
type T2 = { t0: string; d0: { t1: string, d1: { t2: string } } };
type T3 = { t0: string; d0: { t1: string, d1: { t2: string, d2: { t3: string } } } };
type T4 = { t0: string; d0: { t1: string, d1: { t2: string, d2: { t3: string, d3: { t4: string } } } } };
type T5 = { t0: string; d0: { t1: string, d1: { t2: string, d2: { t3: string, d3: { t4: string, d4: { t5: string } } } } } };
type T6 = { t0: string; d0: { t1: string, d1: { t2: string, d2: { t3: string, d3: { t4: string, d4: { t5: string, d5: { t6: string } } } } } } };
type T7 = { t0: string; d0: { t1: string, d1: { t2: string, d2: { t3: string, d3: { t4: string, d4: { t5: string, d5: { t6: string, d6: { t7: string } } } } } } } };

expectAssignable<
{ t0: number }
>(modifyPath(['t0'], parseInt, {} as T0));
expectAssignable<T0>(modifyPath(['t0'], reverse, {} as T0));
expectAssignable<T0>(modifyPath(['t0'], identity, {} as T0));

expectAssignable<
{ t0: string, d0: { t1: number } }
>(modifyPath(['t0', 't1'], parseInt, {} as T1));
expectAssignable<T0>(modifyPath(['t0', 't1'], reverse, {} as T1));
expectAssignable<T0>(modifyPath(['t0', 't1'], identity, {} as T1));

expectAssignable<
{ t0: string, d0: { t1: string, d1: { t2: number } } }
>(modifyPath(['t0', 't1', 't2'], parseInt, {} as T2));
expectAssignable<T0>(modifyPath(['t0', 't1', 't2'], reverse, {} as T2));
expectAssignable<T0>(modifyPath(['t0', 't1', 't2'], identity, {} as T2));

expectAssignable<
{ t0: string, d0: { t1: string, d1: { t2: string, d3: { t3: number } } } }
>(modifyPath(['t0', 't1', 't2', 't3'], parseInt, {} as T3));
expectAssignable<T0>(modifyPath(['t0', 't1', 't2', 't3'], reverse, {} as T3));
expectAssignable<T0>(modifyPath(['t0', 't1', 't2', 't3'], identity, {} as T3));

expectAssignable<
{ t0: string, d0: { t1: string, d1: { t2: string, d3: { t3: string, d3: { t4: number } } } } }
>(modifyPath(['t0', 't1', 't2', 't3', 't4'], parseInt, {} as T4));
expectAssignable<T0>(modifyPath(['t0', 't1', 't2', 't3', 't4'], reverse, {} as T4));
expectAssignable<T0>(modifyPath(['t0', 't1', 't2', 't3', 't4'], identity, {} as T4));

expectAssignable<
{ t0: string, d0: { t1: string, d1: { t2: string, d3: { t3: string, d3: { t4: string, d4: { t5: number } } } } } }
>(modifyPath(['t0', 't1', 't2', 't3', 't4', 't5'], parseInt, {} as T5));
expectAssignable<T0>(modifyPath(['t0', 't1', 't2', 't3', 't4', 't5'], reverse, {} as T5));
expectAssignable<T0>(modifyPath(['t0', 't1', 't2', 't3', 't4', 't5'], identity, {} as T5));

expectAssignable<
{ t0: string, d0: { t1: string, d1: { t2: string, d3: { t3: string, d3: { t4: string, d4: { t5: string, d5: { t6: number } } } } } } }
>(modifyPath(['t0', 't1', 't2', 't3', 't4', 't5', 't6'], parseInt, {} as T6));
expectAssignable<T0>(modifyPath(['t0', 't1', 't2', 't3', 't4', 't5', 't6'], reverse, {} as T6));
expectAssignable<T0>(modifyPath(['t0', 't1', 't2', 't3', 't4', 't5', 't6'], identity, {} as T6));

expectAssignable<
{ t0: string, d0: { t1: string, d1: { t2: string, d3: { t3: string, d3: { t4: string, d4: { t5: string, d5: { t6: string, d6: { t7: number } } } } } } } }
>(modifyPath(['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'], parseInt, {} as T7));
expectAssignable<T0>(modifyPath(['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'], reverse, {} as T7));
expectAssignable<T0>(modifyPath(['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'], identity, {} as T7));
