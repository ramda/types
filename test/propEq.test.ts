import { expectError, expectType } from 'tsd';

import {__, propEq} from '../es';

type Obj = {
  union: 'foo' | 'bar';
  str: string;
  num: number;
  u: undefined;
  n: null;
};

// propEq(val, name, obj)
expectType<boolean>(propEq('foo', 'union', {} as Obj));
// propEq doesn't create unnecessary values constraint for object
expectType<boolean>(propEq(1, 'union', {} as Obj));
// unknown field names fails
expectError(propEq('foo', 'unknown', {} as Obj));

// propEq(val)(name)(obj)
expectType<boolean>(propEq('foo')('union')({} as Obj));
// 'nope' is inferred as 'string' here.
expectType<boolean>(propEq('nope')('union')({} as Obj));
// unknown field names fails
expectError(propEq('foo')('unknown')({} as Obj));

// propEq(val)(name), obj)
expectType<boolean>(propEq('foo')('union', {} as Obj));
// 'nope' is inferred as 'string' here.
expectType<boolean>(propEq('nope')('union', {} as Obj));
// unknown field names fails
expectError(propEq('foo')('unknown', {} as Obj));

// propEq(val, name)(obj)
expectType<boolean>(propEq('foo', 'union')({} as Obj));
// 'nope' is inferred as 'string' here.
expectType<boolean>(propEq('nope', 'union')({} as Obj));
// unknown field names fails
expectError(propEq('foo', 'unknown')({} as Obj));

// propEq(__, name, obj)(val)
expectType<boolean>(propEq(__, 'union', {} as Obj)('foo'));
// propEq(val, __, obj)(val)
expectType<boolean>(propEq('foo', __, {} as Obj)('union'));
// propEq(__, __, obj)(val, name)
expectType<boolean>(propEq(__, __, {} as Obj)('foo', 'union'));
// propEq(__, __, obj)(val)(name)
expectType<boolean>(propEq(__, __, {} as Obj)('foo')('union'));

expectError(propEq('foo', __, {} as Obj)('unknown'));
expectError(propEq(__, __, {} as Obj)('foo', 'unknown'));
expectError(propEq(__, __, {} as Obj)('foo')('unknown'));
