import { expectError, expectType } from 'tsd';

import { max } from '../es';

// please note how literals work in this situation
expectType<1 | 2>(max(1, 2));
// using variables that are type `number` is the more general use-case here
const a: number = 1;
const b: number = 2;
expectType<number>(max(a, b));
// you can also upcast inline to get the same result
expectType<number>(max(1 as number, 2 as number));
// now check the other Ord types
expectType<string>(max('a' as string, 'b' as string));
expectType<boolean>(max(true as boolean, false as boolean));
expectType<Date>(max(new Date(Date.now() - 1), new Date(Date.now())));

// curried
expectType<(b: number) => number>(max(a));

// don't allow different types
expectError(max(1, '2'));
