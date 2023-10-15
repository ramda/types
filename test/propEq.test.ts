import { expectError, expectType } from 'tsd';

import { propEq } from '../es';

type Obj = {
  literals: 'A' | 'B';
  union: number | string;
  nullable: number | null;
  optional?: number;
};

const obj = {} as Obj;

// propEq(val)(name)(obj)
expectType<boolean>(propEq('A')('literals')(obj));
// any string works here and will return boolean, we can live with that
expectType<boolean>(propEq('C')('literals')(obj));
// a different base type returns `never`
expectType<never>(propEq(2)('literals')(obj));
// unions work
expectType<boolean>(propEq(2)('union')(obj));
expectType<boolean>(propEq('2')('union')(obj));
expectType<never>(propEq(true)('union')(obj));
// nullable works
expectType<boolean>(propEq(2)('nullable')(obj));
expectType<boolean>(propEq(null)('nullable')(obj));
// optionals work
expectType<boolean>(propEq(2)('optional')(obj));
expectType<boolean>(propEq(undefined)('optional')(obj));
// unknownKey errors
expectError(propEq('whatever')('unknownKey')(obj));

// propEq(val)(name, obj)
expectType<boolean>(propEq('A')('literals', obj));
// any string works here and will return boolean, we can live with that
expectType<boolean>(propEq('C')('literals', obj));
// a different base type returns `never`
expectType<never>(propEq(2)('literals', obj));
// unions work
expectType<boolean>(propEq(2)('union', obj));
expectType<boolean>(propEq('2')('union', obj));
expectType<never>(propEq(true)('union', obj));
// nullable works
expectType<boolean>(propEq(2)('nullable', obj));
expectType<boolean>(propEq(null)('nullable', obj));
// optionals work
expectType<boolean>(propEq(2)('optional', obj));
expectType<boolean>(propEq(undefined)('optional', obj));
// unknownKey errors
expectError(propEq('whatever')('unknownKey', obj));

// propEq(val, name)(obj)
expectType<boolean>(propEq('A', 'literals')(obj));
// any string works here and will return boolean, we can live with that
expectType<boolean>(propEq('C', 'literals')(obj));
// a different base type returns `never`
expectType<never>(propEq(2, 'literals')(obj));
// unions work
expectType<boolean>(propEq(2, 'union')(obj));
expectType<boolean>(propEq('2', 'union')(obj));
expectType<never>(propEq(true, 'union')(obj));
// nullable works
expectType<boolean>(propEq(2, 'nullable')(obj));
expectType<boolean>(propEq(null, 'nullable')(obj));
// optionals work
expectType<boolean>(propEq(2, 'optional')(obj));
expectType<boolean>(propEq(undefined, 'optional')(obj));
// unknownKey errors
expectError(propEq('whatever', 'unknownKey')(obj));

// propEq(val, name, obj)
expectType<boolean>(propEq('A', 'literals', obj));
// any string works here and will return boolean, we can live with that
expectError(propEq('C', 'literals', obj));
// a different base type returns `never`
expectError(propEq(2, 'literals', obj));
// unions work
expectType<boolean>(propEq(2, 'union', obj));
expectType<boolean>(propEq('2', 'union', obj));
expectError(propEq(true, 'union', obj));
// nullable works
expectType<boolean>(propEq(2, 'nullable', obj));
expectType<boolean>(propEq(null, 'nullable', obj));
// optionals work
expectType<boolean>(propEq(2, 'optional', obj));
expectType<boolean>(propEq(undefined, 'optional', obj));
// unknownKey errors
expectError(propEq('whatever', 'unknownKey', obj));
