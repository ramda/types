import { expectType, expectError } from 'tsd';
import { unwind } from '../types/unwind';
import { __ } from '../types/__';

type Obj = { name: string; hobbies: string[]; colors: string[] };

const obj: Obj = { name: 'alice', hobbies: ['Golf', 'Hacking'], colors: ['red', 'green'] };

// unwind(key, obj)
expectType<Array<Omit<Obj, 'hobbies'> & Record<'hobbies', string>>>(unwind('hobbies', obj));
expectType<[Obj]>(unwind('name', obj));
expectError(unwind('foobar', obj));

// unwind(key)(obj)
expectType<Array<Omit<Obj, 'hobbies'> & Record<'hobbies', string>>>(unwind('hobbies')(obj));
expectType<[Obj]>(unwind('name')(obj));
expectError(unwind('foobar')(obj));

// unwind(__, obj)(key)
expectType<Array<Omit<Obj, 'hobbies'> & Record<'hobbies', string>>>(unwind(__, obj)('hobbies'));
expectType<[Obj]>(unwind(__, obj)('name'));
expectError(unwind(__, obj)('foobar'));

// Records
// when value is `T[]`
expectType<Array<Omit<Record<string, string[]>, 'hobbies'> & Record<'hobbies', string>>>(unwind('hobbies', {} as Record<string, string[]>));
expectType<Array<Omit<Record<string, number[]>, 'hobbies'> & Record<'hobbies', number>>>(unwind('hobbies', {} as Record<string, number[]>));

expectType<Array<Omit<Record<string, string[]>, 'hobbies'> & Record<'hobbies', string>>>(unwind('hobbies')({} as Record<string, string[]>));
expectType<Array<Omit<Record<string, number[]>, 'hobbies'> & Record<'hobbies', number>>>(unwind('hobbies')({} as Record<string, number[]>));

expectType<Array<Omit<Record<string, string[]>, 'hobbies'> & Record<'hobbies', string>>>(unwind(__, {} as Record<string, string[]>)('hobbies'));
expectType<Array<Omit<Record<string, number[]>, 'hobbies'> & Record<'hobbies', number>>>(unwind(__, {} as Record<string, number[]>)('hobbies'));

// when value is `T`, not an array
expectType<[Record<string, string>]>(unwind('hobbies', {} as Record<string, string>));
expectType<[Record<string, number>]>(unwind('hobbies', {} as Record<string, number>));

expectType<[Record<string, string>]>(unwind('hobbies')({} as Record<string, string>));
expectType<[Record<string, number>]>(unwind('hobbies')({} as Record<string, number>));

expectType<[Record<string, string>]>(unwind(__, {} as Record<string, string>)('hobbies'));
expectType<[Record<string, number>]>(unwind(__, {} as Record<string, number>)('hobbies'));
