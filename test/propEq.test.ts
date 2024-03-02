import { expectError, expectType } from 'tsd';

import { propEq } from '../es';

type Obj = {
  union: 'foo' | 'bar';
  str: string;
  num: number;
  u: undefined;
  n: null;
};

// propEq(val, name, obj)
expectType<boolean>(propEq('foo', 'union', {} as Obj));
// non-union string fails
expectError(propEq('nope', 'union', {} as Obj));
// completely different type fails
expectError(propEq(2, 'union', {} as Obj));

// propEq(val)(name)(obj)
expectType<boolean>(propEq('foo')('union')({} as Obj));
// 'nope' is inferred as 'string' here.
expectType<boolean>(propEq('nope')('union')({} as Obj));
// completely different type fails
expectError(propEq(2)('union')({} as Obj));

// propEq(val)(name), obj)
expectType<boolean>(propEq('foo')('union', {} as Obj));
// 'nope' is inferred as 'string' here.
expectType<boolean>(propEq('nope')('union', {} as Obj));
// completely different type fails
expectError(propEq(2)('union', {} as Obj));

// propEq(val, name)(obj)
expectType<boolean>(propEq('foo', 'union')({} as Obj));
// 'nope' is inferred as 'string' here.
expectType<boolean>(propEq('nope', 'union')({} as Obj));
// completely different type fails
expectError(propEq(2, 'union')({} as Obj));
