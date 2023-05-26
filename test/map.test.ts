import { expectType, expectError } from 'tsd';
import { __, FunctorMap, map, toString, pipe, FunctorFantasyLand, identity } from '../es';

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
expectType<(list: readonly unknown[]) => string[]>(pipe(map(toString)));
expectType<(list: readonly string[]) => string[]>(pipe(map(parseInt), map(toString)));
// when the input arg is a generic, it defaults to unknown
expectType<(list: readonly unknown[]) => unknown[]>(pipe(map(identity)));
// can be overwritten by setting the generic
expectType<(list: readonly number[]) => number[]>(pipe(map<number, number>(identity)));


// object
expectType<Record<string, string>>(map(toString, {} as Record<string, number>));
expectType<Record<string, string>>(map(__, {} as Record<string, number>)(toString));
expectType<Record<string, string>>(map(toString)({} as Record<string, number>));
expectType<Record<string, number>>(map(parseInt)({} as Record<string, string>));
// no `pipe` support yet for objects

// make sure that `fn` is a union of the types for an object
type Foobar = {
  foo: string;
  bar: number;
};

declare function numFunc(val: number): string;
declare function strFunc(val: string): string;
declare function unionFunc(val: string | number): string;

expectError(map(numFunc, {} as Foobar));
expectError(map(strFunc, {} as Foobar));
expectType<Record<keyof Foobar, string>>(map(unionFunc, {} as Foobar));


// functor
type TestFunctorMap<A> = {
  map: <B>(fn: (a: A) => B) => TestFunctorMap<B>;
};

expectType<FunctorMap<number>>(map(parseInt, {} as TestFunctorMap<string>));
expectType<TestFunctorMap<number>>(map(parseInt, {} as TestFunctorMap<string>));
expectType<TestFunctorMap<string>>(map(toString, {} as TestFunctorMap<number>));
expectType<TestFunctorMap<number>>(map(__, {} as TestFunctorMap<string>)(parseInt));
expectType<TestFunctorMap<string>>(map(__, {} as TestFunctorMap<number>)(toString));
expectType<TestFunctorMap<string>>(map(toString)({} as TestFunctorMap<number>));
expectType<TestFunctorMap<number>>(map(parseInt)({} as TestFunctorMap<string>));
// no `pipe` support yet for Functor


// fantasy-land specific
type TestFunctorFantasyLand<A> = {
  ['fantasy-land/map']: <B>(fn: (a: A) => B) => TestFunctorFantasyLand<B>;
};

expectType<FunctorFantasyLand<number>>(map(parseInt, {} as TestFunctorFantasyLand<string>));
expectType<TestFunctorFantasyLand<number>>(map(parseInt, {} as TestFunctorFantasyLand<string>));
expectType<TestFunctorFantasyLand<string>>(map(toString, {} as TestFunctorFantasyLand<number>));
expectType<TestFunctorFantasyLand<number>>(map(__, {} as TestFunctorFantasyLand<string>)(parseInt));
expectType<TestFunctorFantasyLand<string>>(map(__, {} as TestFunctorFantasyLand<number>)(toString));
expectType<TestFunctorFantasyLand<number>>(map(parseInt)({} as TestFunctorFantasyLand<string>));
expectType<TestFunctorFantasyLand<string>>(map(toString)({} as TestFunctorFantasyLand<number>));
// no `pipe` support yet for FunctorFantasyLand
