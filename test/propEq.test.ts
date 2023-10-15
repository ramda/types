import { expectError, expectType } from 'tsd';

import { propEq } from '../es';

type Obj = {
  union: 'foo' | 'bar';
  str: string;
  num: number;
  u: undefined;
  n: null;
};

// explanation
// `obj.union` is type `'A' | 'B'` and `val` is `string`
// typescript allows comparison because as long as one side extends the other, it's ok
function doesEq(val: string, obj: Obj) {
  return obj.union === val;
}
// this is different from assignment that errors because`string` is too wide for `'A' | 'B'`
function assign(val: string, obj: Obj) {
  // @ts-expect-error -- remove this to see the error (need this so `npm run test` pasts)
  obj.union = val;
}

// this is why we use `WidenLiterals` in the type definition

// propEq(val, name, obj)
expectType<boolean>(propEq('foo', 'union', {} as Obj));
// any string works here, see the above explanation as to why
expectType<boolean>(propEq('else', 'union', {} as Obj));
// completely different type fails
expectError(propEq(2, 'union', {} as Obj));

// propEq(val)(name)(obj)
expectType<boolean>(propEq('foo')('union')({} as Obj));
// any string works here, see the above explanation as to why
expectType<boolean>(propEq('else')('union')({} as Obj));
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
// any string works here, see the above explanation as to why
expectType<boolean>(propEq('else', 'union')({} as Obj));
// completely different type fails
expectError(propEq(2, 'union')({} as Obj));
