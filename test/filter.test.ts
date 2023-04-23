import {  expectNotType, expectType } from 'tsd';
import { compose, filter, identity, isNotNil, pipe, map } from '../es';

type Foobar = 'foo' | 'bar' | undefined;

// filter(isNotNil, list)
expectType<Array<'foo' | 'bar'>>(filter(isNotNil, [] as Foobar[]));
// filter(isNotNil)(lint)
expectType<Foobar[]>(filter(isNotNil)([] as Foobar[]));

const gt5 = (num: number) => num > 5;
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
// but for some reason that union type collapses to `number` when called curried ?!
expectType<number[]>(filter(gt5)(tuple));
// is ok if you cast to `readonly number[]`
expectType<number[]>(filter(gt5, tuple as readonly number[]));


expectType<number[]>(pipe(filter(gt5))(typed));
expectType<number[]>(compose(filter(gt5))(typed));

expectType<number[]>(pipe(filter(gt5), map(identity))(typed));
expectType<number[]>(compose(map(identity), filter(gt5))(typed));

//
// object
//

type Dictionary = Record<string, 'foo' | 'bar' | undefined>;

expectType<Record<PropertyKey, 'foo' | 'bar'>>(filter(isNotNil, {} as Dictionary));
