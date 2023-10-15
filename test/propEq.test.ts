import { expectError, expectType } from 'tsd';

import { propEq } from '../es';

type Obj = {
  union: 'foo' | 'bar';
  str: string;
  num: number;
  u: undefined;
  n: null;
};

const str: string = '';
// explanation

// `string` is too wide for `'foo' | 'bar` for assignment
({} as Obj).union = str;
// but for comparison is fine
({} as Obj).union === str;
// null and undefined are allowed as well
({} as Obj).str === null;
({} as Obj).str === undefined;

// this is why we use `WidenLiterals` in the type definition

// propEq(val, name, obj)
expectType<boolean>(propEq('foo', 'union', {} as Obj));
// any string works here, see the above explanation as to why
expectType<boolean>(propEq('else', 'union', {} as Obj));
// also null or undefined
expectType<boolean>(propEq(null, 'union', {} as Obj));
expectType<boolean>(propEq(undefined, 'union', {} as Obj));
// completely different type fails
expectError(propEq(2, 'union', {} as Obj));
// other props work as expected
expectType<boolean>(propEq(2, 'num', {} as Obj));
expectError(propEq(2, 'u', {} as Obj));
expectType<boolean>(propEq(2, 'num', {} as Obj));
expectError(propEq(2, 'n', {} as Obj));
expectType<boolean>(propEq(null, 'n', {} as Obj));
expectError(propEq(2, 'n', {} as Obj));
expectType<boolean>(propEq(undefined, 'u', {} as Obj));

// propEq(val)(name)(obj)
expectType<boolean>(propEq('foo')('union')({} as Obj));
// any string works here, see the above explanation as to why
expectType<boolean>(propEq('else')('union')({} as Obj));
// completely different type fails
expectError(propEq(2, 'union', {} as Obj));
// other props work as expected
expectType<boolean>(propEq(2, 'num', {} as Obj));
expectError(propEq(2)('u')({} as Obj));
expectType<boolean>(propEq(2)('num')({} as Obj));
expectError(propEq(2)('n')({} as Obj));
expectType<boolean>(propEq(null, 'n', {} as Obj));
expectError(propEq(2)('n')({} as Obj));
expectType<boolean>(propEq(undefined, 'u', {} as Obj));

// propEq(val)(name, obj)
expectType<boolean>(propEq('foo')('union', {} as Obj));
// 'nope' is inferred as 'string' here.
expectType<boolean>(propEq('nope')('union', {} as Obj));
// completely different type fails
expectError(propEq(2)('union', {} as Obj));
// other props work as expected
expectType<boolean>(propEq(2)('num', {} as Obj));
expectError(propEq(2)('u', {} as Obj));
expectType<boolean>(propEq(2)('num', {} as Obj));
expectError(propEq(2)('n', {} as Obj));
expectType<boolean>(propEq(null)('n', {} as Obj));
expectError(propEq(2)('n', {} as Obj));
expectType<boolean>(propEq(undefined, 'u', {} as Obj));

// propEq(val, name)(obj)
expectType<boolean>(propEq('foo', 'union')({} as Obj));
// any string works here, see the above explanation as to why
expectType<boolean>(propEq('else', 'union')({} as Obj));
// completely different type fails
expectError(propEq(2, 'union')({} as Obj));
// other props work as expected
expectType<boolean>(propEq(2, 'num')({} as Obj));
expectError(propEq(2, 'u')({} as Obj));
expectType<boolean>(propEq(2, 'num')({} as Obj));
expectError(propEq(2, 'n')({} as Obj));
expectType<boolean>(propEq(null, 'n')({} as Obj));
expectError(propEq(2, 'n')({} as Obj));
expectType<boolean>(propEq(undefined, 'u')({} as Obj));
