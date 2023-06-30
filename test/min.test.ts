import { expectError, expectType } from 'tsd';

import { __, min } from '../es';

// please note how literals work in this situation
expectType<1 | 2>(min(1, 2));
// using variables that are type `number` is the more general use-case here
const a: number = 1;
const b: number = 2;
expectType<number>(min(a, b));
// so I don't have to make a bunch of variables, we can just do that cast inline
expectType<number>(min(1 as number, 2 as number));
// now check the other Ord types
expectType<string>(min('a' as string, 'b' as string));
expectType<boolean>(min(true as boolean, false as boolean));
expectType<Date>(min(new Date(Date.now() - 1), new Date(Date.now())));

// Placeholder
expectType<number>(min(__, b)(a));
// curried
expectType<(b: number) => number>(min(a));

// don't allow different types
expectError(min(1, '2'));
