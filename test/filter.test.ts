import {  expectNotType, expectType } from 'tsd';
import { compose, filter, identity, isNotNil, pipe, map } from '../es';

type Foobar = 'foo' | 'bar' | undefined;

// filter(isNotNil, list)
expectType<Array<'foo' | 'bar'>>(filter(isNotNil, [] as Foobar[]));
// filter(isNotNil)(lint)
expectType<Foobar[]>(filter(isNotNil)([] as Foobar[]));

const gt5 = (num: number) => num > 5;
// const gt5 = <T extends number>(num: T) => num > 5;
const typed: number[] = [];
const infered = [1, 4, 6, 10];
const readOnlyArr: readonly number[] = [1, 4, 6, 10];
const tuple = [1, 4, 6, 10] as const;

// typed variables
expectType<number[]>(filter(gt5, typed));
expectType<number[]>(filter(gt5)(typed));
// un-typed variable
expectType<number[]>(filter(gt5, infered));
expectType<number[]>(filter(gt5)(infered));
// readonly
expectType<number[]>(filter(gt5, readOnlyArr));
expectType<number[]>(filter(gt5)(readOnlyArr));
// literal
expectType<number[]>(filter(gt5)([1, 4, 6, 10]));
// tuple
expectNotType<number[]>(filter(gt5, tuple));
// this works, but only if you generic the gt5 function to support tuple's `(1 | 4 | 6 | 10)[]` type
expectType<(1 | 4 | 6 | 10)[]>(filter(<T extends number>(num: T) => num > 5, tuple));
// but you don't have to do it for the curried type?
expectType<(1 | 4 | 6 | 10)[]>(filter(gt5)(tuple));

expectType<number[]>(pipe(filter(gt5))(typed));
expectType<number[]>(compose(filter(gt5))(typed));

expectType<number[]>(pipe(filter(gt5), map(identity))(typed));
expectType<number[]>(compose(map(identity), filter(gt5))(typed));

//
// object
//

type Dictionary = Record<string, 'foo' | 'bar' | undefined>;

expectType<Record<PropertyKey, 'foo' | 'bar'>>(filter(isNotNil, {} as Dictionary));
// curried doesn't get the benefit of type narrows :-(
expectType<Dictionary>(filter(isNotNil)({} as Dictionary));
