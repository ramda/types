import { expectAssignable, expectType } from 'tsd';

import { __, renameKeys } from '../es';

expectType<{ bar: number; other: string }>(renameKeys({ foo: 'bar' })({ foo: 123, other: 'abc' }));
expectType<{ foo: number; blah: string }>(renameKeys({ other: 'blah' })({ foo: 123, other: 'abc' }));

expectType<{ bar: number; other: string }>(renameKeys(__, { foo: 123, other: 'abc' })({ foo: 'bar' }));
expectType<{ foo: number; blah: string }>(renameKeys(__, { foo: 123, other: 'abc' })({ other: 'blah' }));

expectType<{ bar: number; other: string }>(renameKeys({ foo: 'bar' }, { foo: 123, other: 'abc' }));
expectType<{ foo: number; blah: string }>(renameKeys({ other: 'blah' }, { foo: 123, other: 'abc' }));

const nonConstObj = { foo: 'bar' };

const what = renameKeys(nonConstObj, { foo: 123, other: 'abc' });
//    ^?
// @ts-expect-error - I have no idea why declaring the type throws an error, but it can be calculated above
expectAssignable<{ [x: string]: number; other: string; }>(what);
