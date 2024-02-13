import { expectError, expectType } from 'tsd';

import { propEq } from '../es';

type Obj = {
  literals: 'A' | 'B';
  unions: number | string;
  nullable: number | null | undefined;
  optional?: number;
};

const obj = {} as Obj;

//
// literals
//

// happy path works as expected
expectType<boolean>(propEq('A')('literals')(obj));
expectType<boolean>(propEq('A', 'literals')(obj));
expectType<boolean>(propEq('A', 'literals', obj));

// accepts any type that obj[key] can be widened too
expectType<boolean>(propEq('C')('literals')(obj));
expectType<boolean>(propEq('C', 'literals')(obj));
// only propEq(val, key, obj) requests non-widened types
expectError(propEq('C', 'literals', obj));

// rejects if type cannot be widened too
expectError(propEq(2)('literals')(obj));
expectError(propEq(2, 'literals')(obj));
expectError(propEq(2, 'literals', obj));

// manually widened also works
expectType<boolean>(propEq('A' as string)('literals')(obj));
expectType<boolean>(propEq('A' as string, 'literals')(obj));
// only rejects for propEq(val, key, obj), `string` is too wide for 'A' | 'B'
expectError(propEq('A' as string, 'literals', obj));

// rejects if key is not on obj
expectError(propEq('A')('literals')({} as Omit<Obj, 'literals'>));
expectError(propEq('A', 'literals')({} as Omit<Obj, 'literals'>));
expectError(propEq('A', 'literals', {} as Omit<Obj, 'literals'>));

// rejects empty object literal
expectError(propEq('A')('literals')({}));
expectError(propEq('A', 'literals')({}));
expectError(propEq('A', 'literals', {}));

//
// unions
//

// happy path works as expected
expectType<boolean>(propEq('1')('unions')(obj));
expectType<boolean>(propEq('1', 'unions')(obj));
expectType<boolean>(propEq('1', 'unions', obj));

expectType<boolean>(propEq(1)('unions')(obj));
expectType<boolean>(propEq(1, 'unions')(obj));
expectType<boolean>(propEq(1, 'unions', obj));

// rejects if typeof val not part of union type
expectError(propEq(true)('unions')(obj));
expectError(propEq(true, 'unions')(obj));
expectError(propEq(true, 'unions', obj));

// rejects if key is not on obj
expectError(propEq('1')('unions')({} as Omit<Obj, 'unions'>));
expectError(propEq('1', 'unions')({} as Omit<Obj, 'unions'>));
expectError(propEq('1', 'unions', {} as Omit<Obj, 'unions'>));

// rejects empty object literal
expectError(propEq('1')('unions')({}));
expectError(propEq('1', 'unions')({}));
expectError(propEq('1', 'unions', {}));

//
// nullable
//

// happy path works as expected
expectType<boolean>(propEq(1)('nullable')(obj));
expectType<boolean>(propEq(1, 'nullable')(obj));
expectType<boolean>(propEq(1, 'nullable', obj));

expectType<boolean>(propEq(null)('nullable')(obj));
expectType<boolean>(propEq(null, 'nullable')(obj));
expectType<boolean>(propEq(null, 'nullable', obj));

expectType<boolean>(propEq(undefined)('nullable')(obj));
expectType<boolean>(propEq(undefined, 'nullable')(obj));
expectType<boolean>(propEq(undefined, 'nullable', obj));

// rejects if typeof val not part of union type
expectError(propEq(true)('nullable')(obj));
expectError(propEq(true, 'nullable')(obj));
expectError(propEq(true, 'nullable', obj));

// rejects if key is not on obj
expectError(propEq(1)('nullable')({} as Omit<Obj, 'nullable'>));
expectError(propEq(1, 'nullable')({} as Omit<Obj, 'nullable'>));
expectError(propEq(1, 'nullable', {} as Omit<Obj, 'nullable'>));

// rejects empty object literal
expectError(propEq(1)('nullable')({}));
expectError(propEq(1, 'nullable')({}));
expectError(propEq(1, 'nullable', {}));

//
// optional
//

// happy path works as expected
expectType<boolean>(propEq(1)('optional')(obj));
expectType<boolean>(propEq(1, 'optional')(obj));
expectType<boolean>(propEq(1, 'optional', obj));

expectType<boolean>(propEq(undefined)('optional')(obj));
expectType<boolean>(propEq(undefined, 'optional')(obj));
expectType<boolean>(propEq(undefined, 'optional', obj));

// `null` produces error for `optional`. this is expected because typescript strictNullCheck `null !== undefined`
expectError(propEq(null)('optional')(obj));
expectError(propEq(null, 'optional')(obj));
expectError(propEq(null, 'optional', obj));

// rejects if typeof val not part of union type
expectError(propEq(true)('optional')(obj));
expectError(propEq(true, 'optional')(obj));
expectError(propEq(true, 'optional', obj));

// rejects if key is not on obj
expectError(propEq(1)('optional')({} as Omit<Obj, 'optional'>));
expectError(propEq(1, 'optional')({} as Omit<Obj, 'optional'>));
expectError(propEq(1, 'optional', {} as Omit<Obj, 'optional'>));

// rejects empty object literal literal
expectError(propEq(1)('optional')({}));
expectError(propEq(1, 'optional')({}));
expectError(propEq(1, 'optional', {}));

//
// other non-happy paths
//

// rejects unknown key
expectError(propEq(1)('whatever')(obj));
expectError(propEq(1, 'whatever')(obj));
expectError(propEq(1, 'whatever', obj));

// rejects unknown key on emptyu object literal
expectError(propEq(1)('whatever')({}));
expectError(propEq(1, 'whatever')({}));
expectError(propEq(1, 'whatever', {}));
