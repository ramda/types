import { expectType, expectError } from 'tsd';
import { __, assoc, map } from '../es';

type Obj = {
  str: string;
  num: number;
};

const obj: Obj = { str: 'foo', num: 1 };

//
// assoc(key)
//

// assoc(key)(__, obj)(val)
expectType<Obj>(assoc('str')(__, obj)('bar'));
// fails for wrong value type
expectError(assoc('str')(__, obj)(2));
// fails if key not unknown
expectError(assoc('what')(__, obj)('bar'));
// Record<string, number> works as expected
expectType<Record<string, number>>(assoc('what')(__, {} as Record<string, number>)(2));

// assoc(key)(val, obj)
expectType<Obj>(assoc('str')('bar', obj));
// fails for wrong value type
expectError(assoc('str')(2, obj));
// fails if key not unknown
expectError(assoc('what')('bar', obj));
// Record<string, number> works as expected
expectType<Record<string, number>>(assoc('what')(2, {} as Record<string, number>));

// assoc(key)(val)(obj)
expectType<Obj>(assoc('str')('bar')(obj));
// fails for wrong value type
expectError(assoc('str')(2)(obj));
// fails if key not unknown
expectError(assoc('what')('foo')(obj));
// Record<string, number> works as expected
expectType<Record<string, number>>(assoc('what')(2)({} as Record<string, number>));


//
// assoc(__, val)
//

// assoc(__, val)(key)(obj)
expectType<Obj>(assoc(__, 'bar')('str')(obj));
// fails for wrong value type
expectError(assoc(__, 2)('str')(obj));
// fails if key not unknown
expectError(assoc(__, 'bar')('what')(obj));
// Record<string, number> works as expected
expectType<Record<string, number>>(assoc(__, 2)('what')({} as Record<string, number>));

// assoc(__, val)(__, key)(obj)
expectType<Obj>(assoc(__, 'bar')(__, obj)('str'));
// fails for wrong value type
expectError(assoc(__, 2)(__, obj)('str'));
// fails if key not unknown
expectError(assoc(__, 'bar')(__, obj)('what'));
// Record<string, number> works as expected
expectType<Record<string, number>>(assoc(__, 2)(__, {} as Record<string, number>)('str'));

// assoc(__, val)(key, obj)
expectType<Obj>(assoc(__, 'bar')('str', obj));
// fails for wrong value type
expectError(assoc(__, 2)('str', obj));
// fails if key not unknown
expectError(assoc(__, 'bar')('what', obj));
// Record<string, number> works as expected
expectType<Record<string, number>>(assoc(__, 2)('str', {} as Record<string, number>));

//
// assoc(key, val)
//

// assoc(key, val)(obj)
expectType<Obj>(assoc('str', 'bar')(obj));
// fails for wrong value type
expectError(assoc('str', 2)(obj));
// fails if key not unknown
expectError(assoc('what', 'bar')(obj));
// Record<string, number> works as expected
expectType<Record<string, number>>(assoc('str', 2)({} as Record<string, number>));

//
// assoc__, __, obj)
//

// assoc(__, __, obj)(key)(val)
expectType<Obj>(assoc(__, __, obj)('str')('bar'));
// fails for wrong value type
expectError(assoc(__, __, obj)('str')(2));
// fails if key not unknown
expectError(assoc(__, __, obj)('what')('bar'));
// Record<string, number> works as expected
expectType<Record<string, number>>(assoc(__, __, {} as Record<string, number>)('str')(2));

// assoc(__, __, obj)(__, val)(key)
expectType<Obj>(assoc(__, __, obj)(__, 'bar')('str'));
// fails for wrong value type
expectError(assoc(__, __, obj)(__, 2)('str'));
// fails if key not unknown
expectError(assoc(__, __, obj)(__, 'bar')('what'));
// Record<string, number> works as expected
expectType<Record<string, number>>(assoc(__, __, {} as Record<string, number>)(__, 2)('str'));

// assoc(__, __, obj)(key, val)
expectType<Obj>(assoc(__, __, obj)('str', 'bar'));
// fails for wrong value type
expectError(assoc(__, __, obj)('str', 2));
// fails if key not unknown
expectError(assoc(__, __, obj)('what', 'bar'));
// Record<string, number> works as expected
expectType<Record<string, number>>(assoc(__, __, {} as Record<string, number>)('str', 2));

//
// rest
//

// assoc(__, val, obj)(prop)
expectType<Obj>(assoc(__,'bar', obj)('str'));
// fails for wrong value type
expectError(assoc(__, 2, obj)('str'));
// fails if key not unknown
expectError(assoc(__, 'bar', obj)('what'));
// Record<string, number> works as expected
expectType<Record<string, number>>(assoc(__, 2, {} as Record<string, number>)('str'));

// assoc(key, __, obj)(__, val)
expectType<Obj>(assoc('str', __, obj)('bar'));
// fails for wrong value type
expectError(assoc('str', __, obj)(2));
// fails if key not unknown
expectError(assoc('what', __, obj)('bar'));
// Record<string, number> works as expected
expectType<Record<string, number>>(assoc('str', __, {} as Record<string, number>)(2));

// assoc(key, val, obj)
expectType<Obj>(assoc('str', 'bar', obj));
// fails for wrong value type
expectError(assoc('str', 2, obj));
// fails if key not unknown
expectError(assoc('what', 'bar', obj));
// Record<string, number> works as expected
expectType<Record<string, number>>(assoc('str', 2, {} as Record<string, number>));

//
// map tests for sanity
//

expectType<Obj[]>([obj].map(assoc('str', 'bar')));
expectType<Obj[]>(map(assoc('str', 'bar'), [obj]));
