import { expectError, expectType } from 'tsd';

import {__, propEq} from '../es';

type Obj = {
  union: 'foo' | 'bar';
  str: string;
  int: number;
  numLike: number | `${number}`;
  optional?: string;
  nullable: string | null;
  u: undefined;
  n: null;
};
type NumArr = number[];

// ######################
// propEq(val, name, obj)
expectType<boolean>(propEq('foo', 'union', {} as Obj));
expectType<boolean>(propEq('1' as string, 'union', {} as Obj));
// union of number with literal types should work fine
expectType<boolean>(propEq(1, 'numLike', {} as Obj));
expectType<boolean>(propEq('1', 'numLike', {} as Obj));
// optional types doesn't fire an error, if passed correct types
expectType<boolean>(propEq('str', 'optional', {} as Obj));
expectType<boolean>(propEq(undefined, 'optional', {} as Obj));
// fires an error only on wrong type
expectError(propEq(1, 'optional', {} as Obj));
expectError(propEq(null, 'optional', {} as Obj));
// nullable types doesn't fire an error, if passed correct types
expectType<boolean>(propEq('str', 'nullable', {} as Obj));
expectType<boolean>(propEq(null, 'nullable', {} as Obj));
// fires an error only on wrong type
expectError(propEq(1, 'nullable', {} as Obj));
expectError(propEq(undefined, 'nullable', {} as Obj));
// unknown field names fails
expectError(propEq('foo', 'unknown', {} as Obj));
// should work with arrays as well
expectType<boolean>(propEq(1, 0, [] as NumArr));
// numeric array should expect only numbers
expectError(propEq('foo', 0, [] as NumArr));
// array can't accept string as prop name
expectError(propEq(1, 'foo', [] as NumArr));

// ######################
// propEq(val)(name)(obj)
expectType<boolean>(propEq('foo')('union')({} as Obj));
expectType<boolean>(propEq('nope' as string)('union')({} as Obj));
// since we use an exact literal type, it should fire an error
expectError(propEq('nope')('union')({} as Obj));
// union of number with literal types should work fine
expectType<boolean>(propEq(1)('numLike')({} as Obj));
expectType<boolean>(propEq('1')('numLike')({} as Obj));
// optional types doesn't fire an error, if passed correct types
expectType<boolean>(propEq('str')('optional')({} as Obj));
expectType<boolean>(propEq(undefined)('optional')({} as Obj));
// fires an error only on wrong type
expectError(propEq(1)('optional')({} as Obj));
expectError(propEq(null)('optional')({} as Obj));
// nullable types doesn't fire an error, if passed correct types
expectType<boolean>(propEq('str')('nullable')({} as Obj));
expectType<boolean>(propEq(null)('nullable')({} as Obj));
// fires an error only on wrong type
expectError(propEq(1)('nullable')({} as Obj));
expectError(propEq(undefined)('nullable')({} as Obj));
// unknown field names fails
expectError(propEq('foo')('unknown')({} as Obj));

// ######################
// propEq(val)(name, obj)
expectType<boolean>(propEq('foo')('union', {} as Obj));
expectType<boolean>(propEq('nope' as string)('union', {} as Obj));
// since we use an exact literal type, it should fire an error
expectError(propEq('nope')('union', {} as Obj));
// union of number with literal types should work fine
expectType<boolean>(propEq(1)('numLike', {} as Obj));
expectType<boolean>(propEq('1')('numLike', {} as Obj));
// optional types doesn't fire an error, if passed correct types
expectType<boolean>(propEq('str')('optional', {} as Obj));
expectType<boolean>(propEq(undefined)('optional', {} as Obj));
// fires an error only on wrong type
expectError(propEq(1)('optional', {} as Obj));
expectError(propEq(null)('optional', {} as Obj));
// nullable types doesn't fire an error, if passed correct types
expectType<boolean>(propEq('str')('nullable', {} as Obj));
expectType<boolean>(propEq(null)('nullable', {} as Obj));
// fires an error only on wrong type
expectError(propEq(1)('nullable', {} as Obj));
expectError(propEq(undefined)('nullable', {} as Obj));
// unknown field names fails
expectError(propEq('foo')('unknown', {} as Obj));

// ######################
// propEq(val, name)(obj)
expectType<boolean>(propEq('foo', 'union')({} as Obj));
expectType<never>(propEq('nope' as string, 'union')({} as Obj));
// since we use an exact literal type, it should fire an error
expectType<never>(propEq('nope', 'union')({} as Obj));
// union of number with literal types should work fine
expectType<boolean>(propEq(1, 'numLike')({} as Obj));
expectType<boolean>(propEq('1', 'numLike')({} as Obj));
// optional types doesn't fire an error, if passed correct types
expectType<boolean>(propEq('str', 'optional')({} as Obj));
expectType<boolean>(propEq(undefined, 'optional')({} as Obj));
// fires an error only on wrong type
expectType<never>(propEq(1, 'optional')({} as Obj));
expectType<never>(propEq(null, 'optional')({} as Obj));
// nullable types doesn't fire an error, if passed correct types
expectType<boolean>(propEq('str', 'nullable')({} as Obj));
expectType<boolean>(propEq(null, 'nullable')({} as Obj));
// fires an error only on wrong type
expectType<never>(propEq(1, 'nullable')({} as Obj));
expectType<never>(propEq(undefined, 'nullable')({} as Obj));
// unknown field names fails
expectError(propEq('foo', 'unknown')({} as Obj));

// ##########################
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
