import { expectError, expectType } from 'tsd';

import { __, maxBy, prop } from '../es';

type Obj = {
  str: string;
  date: Date;
  bool: boolean;
};

// please note how literals work in this situation
expectType<1 | 2>(maxBy(Math.abs, 1, 2));
// using variables that are type `number` is the more general use-case here
const a: number = 1;
const b: number = 2;
expectType<number>(maxBy(Math.abs, a, b));
// you can also upcast inline to get the same result
expectType<number>(maxBy(Math.abs, 1 as number, 2 as number));
// now check the other Ord types
expectType<Obj>(maxBy(prop('str'), {} as Obj, {} as Obj));
expectType<Obj>(maxBy(prop('bool'), {} as Obj, {} as Obj));
expectType<Obj>(maxBy(prop('date'), {} as Obj, {} as Obj));

// Placeholder
// expectType<number>(max(__, b)(a));
expectType<number>(maxBy(__, 1 as number, 2 as number)(Math.abs));
// curried
// notice how literals work fine here because `T` is pulled directly from Math.abs
// in the full function typescript will hard union them, but here it cannot
expectType<number>(maxBy(Math.abs)(1)(2));

// don't allow different types
expectError(maxBy(Math.abs, 1, '2'));
