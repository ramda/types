/* eslint-disable @typescript-eslint/no-unused-vars */
import { expectAssignable, expectNotType, expectType } from 'tsd';
import { __, compose, filter, identity, isNotNil, pipe, map } from '../es';

type StringOrUndefined = string | undefined;

// when the predicate that is passed to filter has a generic argument, such as `isNotNil`
// when a predicate with a generic is passed to filter, using the curried variety collapses to unknown
expectType<unknown[]>(filter(isNotNil)([] as StringOrUndefined[]));
expectType<Record<string, unknown>>(filter(isNotNil)({} as Record<string, StringOrUndefined>));

// when calling filter(pred, list) or filter(pred, dict), this is not an issue
expectType<string[]>(filter(isNotNil, [] as StringOrUndefined[]));
expectType<Partial<Record<string, string>>>(filter(isNotNil, {} as Record<string, StringOrUndefined>));

// because if this, it is recommended not to create functions like this
const filterNils = filter(isNotNil);
expectType<(list: unknown[]) => unknown[]>(filterNils);
// unless you set the type themselves
const filterNils2: <T>(list: T[]) => NonNullable<T>[] = filter(isNotNil);

// this problem persists when using `filter(pred)` with `pipe`/`compose`
expectType<(list: readonly unknown[]) => unknown[]>(pipe(filter(isNotNil)));
// to get around this, simply wrap with an arrow function
expectAssignable<<T>(list: readonly T[]) => NonNullable<T>[]>(pipe(<T>(xs: readonly T[]) => filter(isNotNil, xs)));

// filter(__, listOrDict)(pred) does not have this issue
expectType<string[]>(filter(__, [] as StringOrUndefined[])(isNotNil));
expectType<Partial<Record<string, string>>>(filter(__, {} as Record<string, StringOrUndefined>)(isNotNil));

const gt5 = (num: number) => num > 5;
const typed: number[] = [];
const inferred = [1, 4, 6, 10];
const readOnlyArr: readonly number[] = [1, 4, 6, 10];
const tuple = [1, 4, 6, 10] as const;

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
// tuple
expectNotType<number[]>(filter(gt5, tuple));
expectType<number[]>(filter(gt5)(tuple));

// pipe
expectType<number[]>(pipe(filter(gt5))(typed));
expectType<number[]>(pipe(filter(gt5), map(identity))(typed));

// compose
expectType<number[]>(compose(filter(gt5))(typed));
// this one works for pipe above, but does not for compose, the issue is likely the compose definition and not filter
// expectType<number[]>(compose(map(identity), filter(gt5))(typed));

// curried
// typed variables
expectType<number[]>(filter(__, typed)(gt5));
// un-typed variable
expectType<number[]>(filter(__, inferred)(gt5));
// readonly
expectType<readonly number[]>(filter(__, readOnlyArr)(gt5));

//
// object
//
type Dictionary = Record<'a' | 'b', string | undefined>;
// filter(isNotNil, dict)
expectType<Partial<Record<'a' | 'b', string>>>(filter(isNotNil, {} as Dictionary));

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
expectType<Partial<{ readonly foo: 4, readonly bar: 6 }>>(filter(__, asConst)(gt5));
// literal
expectType<Partial<Obj>>(filter(__, { foo: 4, bar: 6 })(gt5));
