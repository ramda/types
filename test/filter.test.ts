import { expectNotType, expectType } from 'tsd';
import { __, compose, filter, identity, isNotNil, pipe, map } from '../es';

type Foobar = 'foo' | 'bar' | undefined;

// filter(isNotNil, list)
expectType<Array<'foo' | 'bar'>>(filter(isNotNil, [] as Foobar[]));
// filter(isNotNil)(lint)
expectType<Foobar[]>(filter(isNotNil)([] as Foobar[]));
// filter(__, list)(isNotNil)
expectType<Array<'foo' | 'bar'>>(filter(__, [] as Foobar[])(isNotNil));

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
expectType<readonly number[]>(filter(gt5, readOnlyArr));
expectType<number[]>(filter(gt5)(readOnlyArr));
// literal
expectType<number[]>(filter(gt5, [1, 4, 6, 10]));
expectType<number[]>(filter(gt5)([1, 4, 6, 10]));
// tuple
expectNotType<number[]>(filter(gt5, tuple));
// when curried, you get -readonly [1, 4, 6, 10], need to figure out this one
expectType<[1, 4, 6, 10]>(filter(gt5)(tuple));

// pipe
expectType<number[]>(pipe(filter(gt5))(typed));
expectType<number[]>(pipe(filter(gt5), map(identity))(typed));

// compose
expectType<number[]>(compose(filter(gt5))(typed));
expectType<number[]>(compose(map(identity), filter(gt5))(typed));

// curried
// typed variables
expectType<number[]>(filter(__, typed)(gt5));
// un-typed variable
expectType<number[]>(filter(__, infered)(gt5));
// readonly
expectType<number[]>(filter(__, readOnlyArr)(gt5));

//
// object
//

type Dictionary = Record<string, 'foo' | 'bar' | undefined>;
// filter(isNotNil, dict)
expectType<Record<keyof Dictionary, 'foo' | 'bar'>>(filter(isNotNil, {} as Dictionary));
// // filter(isNotNil)(dict),  doesn't get the benefit of type narrows :-(
expectType<Dictionary>(filter(isNotNil)({} as Dictionary));

type Obj = { foo: number; bar: number; };

const typedO: Obj = { foo: 4, bar: 6 };
const inferedO = { foo: 4, bar: 6 };
const asConst = { foo: 4, bar: 6 } as const;

// typed variables
expectType<Obj>(filter(gt5, typedO));
expectType<Obj>(filter(gt5)(typedO));
// un-typed variable
expectType<Obj>(filter(gt5, inferedO));
expectType<Obj>(filter(gt5)(inferedO));
// readonly
expectType<{ readonly foo: 4, readonly bar: 6 }>(filter(gt5, asConst));
expectType<{ readonly foo: 4, readonly bar: 6 }>(filter(gt5)(asConst));
// literal
expectType<Obj>(filter(gt5, { foo: 4, bar: 6 }));
expectType<Obj>(filter(gt5)({ foo: 4, bar: 6 }));

// pipe
expectType<Obj>(pipe(filter(gt5), map(identity))(typedO));
expectType<Obj>(pipe(map(identity), filter(gt5))(typedO));

// compose
expectType<Obj>(compose(filter(gt5))(typedO));

// curried
// typed variables
expectType<Record<keyof Obj, number>>(filter(__, typedO)(gt5));
// un-typed variable
expectType<Obj>(filter(__, inferedO)(gt5));
// readonly
expectType<{ readonly foo: 4, readonly bar: 6 }>(filter(__, asConst)(gt5));
// literal
expectType<Obj>(filter(__, { foo: 4, bar: 6 })(gt5));
