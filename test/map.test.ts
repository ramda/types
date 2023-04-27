import { expectType, expectAssignable } from 'tsd';
import { __, FunctorMap, map, toString, pipe } from '../es';

const arr: number[] = [];
const arrRO: readonly number[] = [];

// array
expectType<string[]>(map(toString, arr));
expectType<string[]>(map(toString, arrRO));

expectType<string[]>(map(__, arr)(toString));
expectType<string[]>(map(__, arrRO)(toString));

expectType<string[]>(map(toString)(arr));
expectType<string[]>(map(toString)(arrRO));

// when the first argument of the fn passed to map is not a generic, the type is preserved when passed into pipe
expectType<(list: readonly string[]) => number[]>(pipe(map(parseInt)));
// because first argument of `toString` is a generic, running through `pipe` gives us `(list: readonly unknown[])`
// this is a limitation of typescript
expectType<(list: readonly unknown[]) => string[]>(pipe(map(toString)));
// that only mapped is map is the first in line
expectType<(list: readonly string[]) => string[]>(pipe(map(parseInt), map(toString)));


// object
expectType<Record<string, string>>(map(toString, {} as Record<string, number>));
expectType<Record<string, string>>(map(__, {} as Record<string, number>)(toString));
expectType<Record<string, string>>(map(toString)({} as Record<string, number>));


// functor
type TestFunctorMap<A> = {
  map: <B>(fn: (a: A) => B) => TestFunctorMap<B>;
};

expectType<FunctorMap<string>>(map(toString, {} as TestFunctorMap<number>));
expectAssignable<TestFunctorMap<string>>(map(toString, {} as TestFunctorMap<number>));

type TestFunctorFantasyLand<A> = {
  ['fantasy-land/map']: <B>(fn: (a: A) => B) => TestFunctorFantasyLand<B>;
};

expectType<TestFunctorFantasyLand<string>>(map(__, {} as TestFunctorFantasyLand<number>)(toString));
expectType<TestFunctorFantasyLand<string>>(map(toString)({} as TestFunctorFantasyLand<number>));
