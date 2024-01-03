import { expectAssignable, expectType } from 'tsd';
import { modify, reverse, identity } from '../es';

type T0 = { t0: string };
type T1 = { t0: string; d0: { t1: string } };

expectAssignable<{ t0: number }>(modify('t0', parseInt, {} as T0));
expectType<T0>(modify('t0', reverse, {} as T0));
expectType<T0>(modify('t0', identity, {} as T0));

expectAssignable<
{ t0: number, d0: { t1: string } }
>(modify('t0', parseInt, {} as T1));
expectType<T1>(modify('t0', reverse, {} as T1));
expectType<T1>(modify('t0', identity, {} as T1));
