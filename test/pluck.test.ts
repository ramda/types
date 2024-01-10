import { expectType, expectError } from 'tsd';

import { __, pluck } from '../es';

type Obj = { name: string; age: number };
type Rec = {
  a: {name: string, age: number},
  b: {name: string, age: number, desc: string}
};
type ConstRec = {
  readonly a: {name: 'foo', age: 13},
  readonly b: {name: 'bar', age: 31, desc: 'barrr'}
};

// pluck(key)
const getFirstItems = pluck(0);
const getName = pluck('name');
const getAge = pluck('age');
const getNope = pluck('nope');

// pluck(key)(list::Array[])
expectType<string[]>(getFirstItems([] as string[][]));
expectType<number[]>(getFirstItems([] as number[][]));
expectType<1[]>(getFirstItems([] as 1[][]));
expectType<Obj[]>(getFirstItems([] as Obj[][]));
expectError(getFirstItems('string')); // works in JS, but should not be valid in TS
expectError(getFirstItems({} as Obj));


// pluck(key)(list::Record[])
expectType<string[]>(getName([] as Obj[]));
expectType<number[]>(getAge([] as Obj[]));
expectError(getNope([] as Obj[]));
expectError(getFirstItems([] as Obj[]));


// pluck(key)(record::Record)
expectType<{ a: string, b: string }>(getName({} as Rec));
expectType<{ a: number, b: number }>(getAge({} as Rec));
expectType<{ readonly a: 'foo', readonly b: 'bar' }>(getName({} as ConstRec));
expectError(getNope({} as Rec));
expectError(pluck('desc')({} as ConstRec)); // works in JS, but not valid in TS


// pluck(key, list::Record[])
expectType<string[]>(pluck('name', [] as Obj[]));
expectType<number[]>(pluck('age', [] as Obj[]));
expectError(pluck('nope', [] as Obj[]));
expectError(pluck(0, [] as Obj[]));


// pluck(key, list::Array[])
expectType<string[]>(pluck(0, [] as string[][]));
expectType<number[]>(pluck(1, [] as number[][]));
expectType<1[]>(pluck(0, [] as 1[][]));
expectType<Obj[]>(pluck(0, [] as Obj[][]));
expectError(pluck(0, 'string')); // works in JS, but should not be valid in TS
expectError(pluck(0, {} as Obj));


// pluck(key, record::Record)
expectType<{ a: string, b: string }>(pluck('name', {} as Rec));
expectType<{ readonly a: 'foo', readonly b: 'bar' }>(pluck('name', {} as ConstRec));
expectType<{ a: number, b: number }>(pluck('age', {} as Rec));
expectError(pluck(1, {} as Rec));
expectError(pluck('nope', {} as Rec));
expectError(pluck('desc', {} as ConstRec)); // works in JS, but not valid in TS


// pluck(__, list::Record[])(prop)
const getFromObjList = pluck(__, [] as Obj[]);

expectType<string[]>(getFromObjList('name'));
expectType<number[]>(getFromObjList('age'));
expectError(getFromObjList('nope'));


// pluck(__, list::Array[])(prop)
expectType<string[]>(pluck(__, [] as string[][])(0));
expectType<number[]>(pluck(__, [] as number[][])(1));
expectError(pluck(__, [] as Obj[])(0));


// pluck(__, record::Record)(prop)
expectType<{ a: string, b: string }>(pluck(__, {} as Rec)('name'));
expectType<{ a: number, b: number }>(pluck(__, {} as Rec)('age'));
expectError(pluck(__, {} as Rec)('nope'));

