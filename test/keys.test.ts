import { expectType } from 'tsd';

import { keys } from '../es';

type Obj = {
  foo: string;
  bar: string;
};

// empty object literal
expectType<never[]>(keys({}));
// type literal
expectType<('foo' | 'bar')[]>(keys({ foo: '', bar: '' }));
// typed object
expectType<('foo' | 'bar')[]>(keys({} as Obj));
// index signatures
// for whatever reason, `keyof { [key: string]: string; }` returns `(string | number)[]`
expectType<(string | number)[]>(keys({} as { [key: string]: string; }));
// Record
expectType<string[]>(keys({} as Record<string, string>));
