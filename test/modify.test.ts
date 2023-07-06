import { expectError, expectType } from 'tsd';

import { modify, toUpper, add, identity, pipe, map } from '../es';

type Obj = {
  foo: string;
  bar: number;
};

expectType<Obj>(modify('foo', toUpper, {} as Obj));
expectType<Obj>(modify('bar', add(1), {} as Obj));
expectType<Obj>(modify('foo', toUpper)({} as Obj));
expectType<Obj>(modify('bar', add(1))({} as Obj));
expectType<Obj>(modify('foo')(toUpper)({} as Obj));
expectType<Obj>(modify('bar')(add(1))({} as Obj));
expectType<Obj>(modify('foo')(toUpper, {} as Obj));
expectType<Obj>(modify('bar')(add(1), {} as Obj));

// fails when function has wrong argument type
expectError(modify('foo', add(1), {} as Obj));
expectError(modify('bar', toUpper, {} as Obj));

// fails when key does not exist on Obj
expectError(modify('unknownKey', toUpper, {} as Obj));

// works with generic fn
expectType<Obj>(modify('foo', identity, {} as Obj));

// pipe and map sanity checks
const f = pipe(
  map<Obj, Obj>(modify('foo', toUpper))
);

expectType<Obj[]>(f([] as Obj[]));
