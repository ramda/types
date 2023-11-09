import { expectType, expectError } from 'tsd';

import { pick } from '../ts4/es';

const obj = { foo: 1, bar: '2', biz: false };

expectType<{}>(pick([])(obj));
expectType<Partial<typeof obj>>(pick(['foo'])(obj));
expectType<Partial<typeof obj>>(pick(['foo', 'bar'])(obj));
expectType<Partial<typeof obj>>(pick(['foo', 'bar', 'biz'])(obj));
// this won't error because ts4 can't automatically try and deduce the values in the array
expectType<Partial<typeof obj>>(pick(['baz', 'bar', 'biz'])(obj));
// it can when the array is typed as a const
expectError(pick(['baz', 'bar', 'biz'] as const)(obj));
expectType<typeof obj>(pick([] as (keyof typeof obj)[])(obj));

expectType<{}>(pick([], obj));
expectType<Partial<typeof obj>>(pick(['foo'], obj));
expectType<Partial<typeof obj>>(pick(['foo', 'bar'], obj));
expectType<Partial<typeof obj>>(pick(['foo', 'bar', 'biz'], obj));
// binary function works as expect though because `names` is typed as `(keyof obj)[]`
expectError(pick(['baz', 'bar', 'biz'], obj));
expectType<typeof obj>(pick([] as (keyof typeof obj)[], obj));

// Record
expectType<Record<string, number>>(pick(['foo', 'bar'], {} as Record<string, number>));
