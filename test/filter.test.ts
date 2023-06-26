/* eslint-disable @typescript-eslint/no-unused-vars */
import { expectAssignable, expectNotType, expectType } from 'tsd';
import { __, compose, filter, identity, isNotNil, pipe, map } from '../es';

type StringOrUndefined = string | undefined;

// when the predicate that is passed to filter has a generic argument, such as `isNotNil`
// typescript collapses `T` to `unknown`
expectAssignable<unknown[]>(filter(isNotNil)([] as StringOrUndefined[]));
expectAssignable<unknown[]>(filter(isNotNil, [] as StringOrUndefined[]));
expectAssignable<Record<string, unknown>>(filter(isNotNil)({} as Record<string, StringOrUndefined>));
expectAssignable<Record<string, unknown>>(filter(isNotNil, {} as Record<string, StringOrUndefined>));

// this is fixable by setting the generic on isNotNil
expectType<string[]>(filter(isNotNil<StringOrUndefined>)([] as StringOrUndefined[]));
expectType<string[]>(filter(isNotNil<StringOrUndefined>, [] as StringOrUndefined[]));
expectType<Partial<Record<string, string>>>(filter(isNotNil<StringOrUndefined>)({} as Record<string, StringOrUndefined>));
expectType<Partial<Record<string, string>>>(filter(isNotNil<StringOrUndefined>, {} as Record<string, StringOrUndefined>));
expectType<string[]>(filter(__, [] as StringOrUndefined[])(isNotNil<StringOrUndefined>));
expectType<Partial<Record<string, string>>>(filter(__, {} as Record<string, StringOrUndefined>)(isNotNil<StringOrUndefined>));

const gt5 = (num: number) => num > 5;
const typed: number[] = [];
const inferred = [1, 4, 6, 10];
const readOnlyArr: readonly number[] = [1, 4, 6, 10];
const constArray = [1, 4, 6, 10] as const;
const tuple: [number, number] = [1, 10];

// typed variables
expectType<number[]>(filter(gt5, typed));
// non generic predicated work as expected
expectType<number[]>(filter(gt5)(typed));
// un-typed variable
expectType<number[]>(filter(gt5, inferred));
expectType<number[]>(filter(gt5)(inferred));
// readonly
expectType<number[]>(filter(gt5, readOnlyArr));
expectType<number[]>(filter(gt5)(readOnlyArr));
// literal
expectType<number[]>(filter(gt5, [1, 4, 6, 10]));
expectType<number[]>(filter(gt5)([1, 4, 6, 10]));
// constArray
expectType<number[]>(filter(gt5, constArray));
expectType<number[]>(filter(gt5)(constArray));
// tuple
expectType<number[]>(filter(gt5, tuple));
expectType<number[]>(filter(gt5)(tuple));

// curried
// typed variables
expectType<number[]>(filter(__, typed)(gt5));
// un-typed variable
expectType<number[]>(filter(__, inferred)(gt5));
// readonly
expectType<number[]>(filter(__, readOnlyArr)(gt5));

//
// object
//
type Obj = { foo: number; bar: number; };

const typedO: Obj = { foo: 4, bar: 6 };
const inferredO = { foo: 4, bar: 6 };
const asConst = { foo: 4, bar: 6 } as const;

// typed variables
expectType<Partial<Obj>>(filter(gt5, typedO));
expectType<Partial<Obj>>(filter(gt5)(typedO));
// un-typed variable
expectType<Partial<Obj>>(filter(gt5, inferredO));
expectType<Partial<Obj>>(filter(gt5)(inferredO));
// readonly
expectType<Partial<{ readonly foo: 4, readonly bar: 6 }>>(filter(gt5, asConst));
expectType<Partial<{ readonly foo: 4, readonly bar: 6 }>>(filter(gt5)(asConst));
// literal
expectType<Partial<Obj>>(filter(gt5, { foo: 4, bar: 6 }));
expectType<Partial<Obj>>(filter(gt5)({ foo: 4, bar: 6 }));

// pipe
// the last overload is always selected when passing a function as an argument to a function like pipe
expectType<(list: readonly number[]) => number[]>(pipe(filter(gt5)));
// wrap in an arrow function to get Object overload
expectType<(obj: Obj) => Partial<Obj>>(pipe((obj: Obj) => filter(gt5, obj)));
expectType<Partial<Obj>>(pipe((obj: Obj) => filter(gt5, obj))(typedO));

// curried
// typed variables
expectType<Partial<Record<keyof Obj, number>>>(filter(__, typedO)(gt5));
// un-typed variable
expectType<Partial<Obj>>(filter(__, inferredO)(gt5));
// readonly
expectType<Partial<Record<'foo' | 'bar', 4 | 6>>>(filter(__, asConst)(gt5));
// literal
expectType<Partial<Obj>>(filter(__, { foo: 4, bar: 6 })(gt5));
