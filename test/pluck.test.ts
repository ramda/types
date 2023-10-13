import { expectType, expectError } from 'tsd';

import { __, pluck } from '../es';

type Obj = { name: string; age: number };

const record = {
  a: {name: 'foo', age: 13},
  b: {name: 'bar', age: 31, desc: 'barrr'}
};
const incorrectRecord = {
  a: {name: 'foo', age: 13},
  b: {name: 'bar', age: 31, desc: 'barrr'},
  c: {}
};

// pluck(key, list)
expectType<string[]>(pluck('name', [] as Obj[]));
expectType<number[]>(pluck('age', [] as Obj[]));
expectError(pluck('nope', [] as Obj[]));

// pluck(key)(list)
expectType<string[]>(pluck('name')([] as Obj[]));
expectType<number[]>(pluck('age')([] as Obj[]));
expectError(pluck('nope')([] as Obj[]));

// pluck(__, list)(prop)
expectType<string[]>(pluck(__, [] as Obj[])('name'));
expectType<number[]>(pluck(__, [] as Obj[])('age'));
expectError(pluck(__, [] as Obj[])('nope'));

// pluck(key, record)
expectType<{ a: string, b: string }>(pluck('name', record));
expectType<{ a: number, b: number }>(pluck('age', record));
expectError(pluck('nope', record));
expectError(pluck('age', incorrectRecord));

// pluck(key)(record)
expectType<{ a: string, b: string }>(pluck('name')(record));
expectType<{ a: number, b: number }>(pluck('age')(record));
expectError(pluck('nope')(record));
expectError(pluck('age')(incorrectRecord));

// pluck(__, record)(prop)
expectType<{ a: string, b: string }>(pluck(__, record)('name'));
expectType<{ a: number, b: number }>(pluck(__, record)('age'));
expectError(pluck(__, record)('nope'));
expectError(pluck(__, incorrectRecord)('age'));
