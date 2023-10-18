import { expectType, expectError } from 'tsd';

import { __, pluck } from '../es';

type Obj = { name: string; age: number };

const record = {
  a: {name: 'foo', age: 13},
  b: {name: 'bar', age: 31, desc: 'barrr'}
};
const constRecord = {
  a: {name: 'foo', age: 13},
  b: {name: 'bar', age: 31, desc: 'barrr'}
} as const;
const incorrectRecord = {
  a: {name: 'foo', age: 13},
  b: {name: 'bar', age: 31, desc: 'barrr'},
  c: {}
};

// pluck(key)
{
  const getFirstItems = pluck(0);
  const getName = pluck('name');
  const getAge = pluck('age');
  const getNope = pluck('nope');

  // pluck(key)(list::Array[])
  {
    expectType<string[]>(getFirstItems([] as string[][]));
    expectType<number[]>(getFirstItems([] as number[][]));
    expectType<1[]>(getFirstItems([] as 1[][]));
    expectType<Obj[]>(getFirstItems([] as Obj[][]));
    expectError(getFirstItems('string')); // works in JS, but should not be valid in TS
    expectError(getFirstItems({} as Obj));
  }

  // pluck(key)(list::Record[])
  {
    expectType<string[]>(getName([] as Obj[]));
    expectType<number[]>(getAge([] as Obj[]));
    expectError(getNope([] as Obj[]));
    expectError(getFirstItems([] as Obj[]));
  }

  // pluck(key)(record::Record)
  {
    expectType<{ a: string, b: string }>(getName(record));
    expectType<{ a: number, b: number }>(getAge(record));
    expectType<{ readonly a: 'foo', readonly b: 'bar' }>(getName(constRecord));
    expectError(getNope(record));
    expectError(getAge(incorrectRecord));
    // expectType<{ readonly a: undefined, readonly b: 'barrr' }>(pluck('desc')(constRecord));
    // this ^ gives false negative result, but it can't be fixed right now
  }
}

// pluck(key, list::Record[])
{
  expectType<string[]>(pluck('name', [] as Obj[]));
  expectType<number[]>(pluck('age', [] as Obj[]));
  expectError(pluck('nope', [] as Obj[]));
  expectError(pluck(0, [] as Obj[]));
}

// pluck(key, list::Array[])
{
  expectType<string[]>(pluck(0, [] as string[][]));
  expectType<number[]>(pluck(1, [] as number[][]));
  expectType<1[]>(pluck(0, [] as 1[][]));
  expectType<Obj[]>(pluck(0, [] as Obj[][]));
  expectError(pluck(0, 'string')); // works in JS, but should not be valid in TS
  expectError(pluck(0, {} as Obj));
}

// pluck(key, record::Record)
{
  expectType<{ a: string, b: string }>(pluck('name', record));
  expectType<{ readonly a: 'foo', readonly b: 'bar' }>(pluck('name', constRecord));
  expectType<{ a: number, b: number }>(pluck('age', record));
  expectError(pluck(1, record));
  expectError(pluck('nope', record));
  expectError(pluck('age', incorrectRecord));
  // expectType<{ readonly a: undefined, readonly b: 'barrr' }>(pluck('desc', constRecord));
  // this ^ gives false negative result, but it can't be fixed right now
}

// pluck(__, list::Record[])(prop)
{
  const getFromObjList = pluck(__, [] as Obj[]);

  expectType<string[]>(getFromObjList('name'));
  expectType<number[]>(getFromObjList('age'));
  expectError(getFromObjList('nope'));
}

// pluck(__, list::Array[])(prop)
{
  expectType<string[]>(pluck(__, [] as string[][])(0));
  expectType<number[]>(pluck(__, [] as number[][])(1));
  expectError(pluck(__, [] as Obj[])(0));
}

// pluck(__, record::Record)(prop)
{
  expectType<{ a: string, b: string }>(pluck(__, record)('name'));
  expectType<{ a: number, b: number }>(pluck(__, record)('age'));
  expectError(pluck(__, record)('nope'));
  expectError(pluck(__, incorrectRecord)('age'));
}
