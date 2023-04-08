import { expectType } from 'tsd';
import { unwind } from '../types/unwind';
import { __ } from '../types/__';

type Obj = { name: string; hobbies: string[]; colors: string[] };

const obj: Obj = { name: 'alice', hobbies: ['Golf', 'Hacking'], colors: ['red', 'green'] };

expectType<Array<Omit<Obj, 'hobbies'> & Record<'hobbies', string>>>(unwind('hobbies', obj));
expectType<[Obj]>(unwind('name', obj));
expectType<[Obj]>(unwind('foobar', obj));

expectType<Array<Omit<Obj, 'hobbies'> & Record<'hobbies', string>>>(unwind('hobbies')(obj));
expectType<[Obj]>(unwind('name')(obj));
expectType<[Obj]>(unwind('foobar')(obj));

expectType<Array<Omit<Obj, 'hobbies'> & Record<'hobbies', string>>>(unwind(__, obj)('hobbies'));
expectType<[Obj]>(unwind(__, obj)('name'));
expectType<[Obj]>(unwind(__, obj)('foobar'));
