import { expectError, expectType } from 'tsd';

import { __, concat } from '../es';

expectType<'ABCDEF'>(concat('ABC')('DEF'));
expectType<'ABCDEF'>(concat(__, 'DEF')('ABC'));
expectType<'ABCDEF'>(concat('ABC', 'DEF'));

expectType<string>(concat('ABC')('DEF' as string));
expectType<string>(concat(__, 'DEF' as string)('ABC'));
expectType<string>(concat('ABC', 'DEF' as string));

expectType<string>(concat('ABC' as string)('DEF' as string));
expectType<string>(concat(__, 'DEF' as string)('ABC' as string));
expectType<string>(concat('ABC' as string, 'DEF' as string));

expectType<number[]>([1, 2, 3].concat([4, 5, 6]));
expectType<number[]>(concat([1, 2, 3])([4, 5, 6]));
expectType<number[]>(concat(__, [4, 5, 6])([1, 2, 3]));
expectType<number[]>(concat([1, 2, 3], [4, 5, 6]));

expectError(([1, 2, 3] as [1, 2, 3]).concat([4, 5, 6]));
expectError(concat([1, 2, 3] as [1, 2, 3])([4, 5, 6]));
expectError(concat(__, [4, 5, 6])([1, 2, 3] as [1, 2, 3]));
expectError(concat([1, 2, 3] as [1, 2, 3], [4, 5, 6]));

expectError(([1, 2, 3] as const).concat([4, 5, 6]));
expectError(concat([1, 2, 3] as const)([4, 5, 6]));
expectError(concat(__, [4, 5, 6])([1, 2, 3] as const));
expectError(concat([1, 2, 3] as const, [4, 5, 6]));

expectType<number[]>([1, 2, 3].concat([4, 5, 6] as const));
expectType<number[]>(concat([1, 2, 3])([4, 5, 6]  as const));
expectType<number[]>(concat(__, [4, 5, 6]  as const)([1, 2, 3]));
expectType<number[]>(concat([1, 2, 3], [4, 5, 6] as const));

// sanity check for arrays of completely different types
expectError(concat([] as number[])([] as { foo: string }[]));
expectError(concat(__, [] as { foo: string }[])([] as number[]));
expectError(concat([] as number[], [] as { foo: string }[]));
