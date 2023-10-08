import { expectError, expectType } from 'tsd';

import { __, minBy, prop } from '../es';

type Obj = {
  str: string;
  date: Date;
  bool: boolean;
};

// please note how literals work in this situation
expectType<1 | 2>(minBy(Math.abs, 1, 2));
// using variables that are type `number` is the more general use-case here
const a: number = 1;
const b: number = 2;
expectType<number>(minBy(Math.abs, a, b));
// you can also upcast inline to get the same result
expectType<number>(minBy(Math.abs, 1 as number, 2 as number));
// now check the other Ord types
expectType<Obj>(minBy(prop('str'), {} as Obj, {} as Obj));
expectType<Obj>(minBy(prop('bool'), {} as Obj, {} as Obj));
expectType<Obj>(minBy(prop('date'), {} as Obj, {} as Obj));

// Placeholder
// expectType<number>(max(__, b)(a));
expectType<number>(minBy(__, 1 as number, 2 as number)(Math.abs));
// curried
// notice how literals work fine here because `T` is pulled directly from Math.abs
// in the full function typescript will hard union them, but here it cannot
expectType<number>(minBy(Math.abs)(1)(2));

// don't allow different types
expectError(minBy(Math.abs, 1, '2'));
