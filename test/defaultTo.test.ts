import { expectType } from 'tsd';
import { defaultTo } from '../es';

expectType<string>(defaultTo('default value', undefined));
expectType<string>(defaultTo('default value', null));
expectType<string>(defaultTo('default value')(undefined));
expectType<string>(defaultTo('default value')(null));

expectType<string>(defaultTo('default value', 'string value'));
expectType<string>(defaultTo('default value')('string value'));

expectType<number>(defaultTo(0, undefined));
expectType<number>(defaultTo(0, null));
expectType<number>(defaultTo(0)(undefined));
expectType<number>(defaultTo(0)(null));

expectType<number>(defaultTo(0, 2));
expectType<number>(defaultTo(0)(2));

expectType<string>(defaultTo(0, 'two'));
expectType<string>(defaultTo(0)('two'));
expectType<number>(defaultTo('zero', 2));
expectType<number>(defaultTo('zero')(2));

const stringOrUndefined = Math.random() < 0.5 ? Math.random().toString(32) : undefined;
expectType<number | string>(defaultTo(0, stringOrUndefined));
expectType<number | string>(defaultTo(0)(stringOrUndefined));
const stringOrNull = Math.random() < 0.5 ? Math.random().toString(32) : null;
expectType<number | string>(defaultTo(0, stringOrNull));
expectType<number | string>(defaultTo(0)(stringOrNull));

const numberOrUndefined = Math.random() < 0.5 ? Math.random() : undefined;
expectType<string | number>(defaultTo('default value', numberOrUndefined));
expectType<string | number>(defaultTo('default value')(numberOrUndefined));
const numberOrNull = Math.random() < 0.5 ? Math.random() : null;
expectType<string | number>(defaultTo('default value', numberOrNull));
expectType<string | number>(defaultTo('default value')(numberOrNull));
