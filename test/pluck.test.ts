import { expectType, expectError } from 'tsd';

import { __, pluck } from '../es';

type Obj = { name: string; age: number };

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
expectType<string[]>(pluck('name', {} as Record<string, Obj>));
expectType<number[]>(pluck('age', {} as Record<string, Obj>));
expectError(pluck('nope', {} as Record<string, Obj>));

// pluck(key)(record)
expectType<string[]>(pluck('name')({} as Record<string, Obj>));
expectType<number[]>(pluck('age')({} as Record<string, Obj>));
expectError(pluck('nope')({} as Record<string, Obj>));

// pluck(__, record)(prop)
expectType<string[]>(pluck(__, {} as Record<string, Obj>)('name'));
expectType<number[]>(pluck(__, {} as Record<string, Obj>)('age'));
expectError(pluck(__, {} as Record<string, Obj>)('nope'));
