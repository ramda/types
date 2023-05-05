import { expectType } from 'tsd';
import { defaultTo } from '../es';

expectType<'fallback'>(defaultTo('fallback', undefined));
expectType<'fallback'>(defaultTo('fallback', null));
expectType<string>(defaultTo('fallback')(undefined));
expectType<string>(defaultTo('fallback')(null));

expectType<'string value'>(defaultTo('fallback', 'string value'));
expectType<'string value'>(defaultTo('fallback')('string value'));

expectType<0>(defaultTo(0, undefined));
expectType<0>(defaultTo(0, null));
expectType<number>(defaultTo(0)(undefined));
expectType<number>(defaultTo(0)(null));

expectType<2>(defaultTo(0, 2));
expectType<2>(defaultTo(0)(2));

expectType<'two'>(defaultTo(0, 'two'));
expectType<'two'>(defaultTo(0)('two'));
expectType<2>(defaultTo('zero', 2));
expectType<2>(defaultTo('zero')(2));

const stringOrUndefined = Math.random() < 0.5 ? Math.random().toString(32) : undefined;
expectType<0 | string>(defaultTo(0, stringOrUndefined));
expectType<number | string>(defaultTo(0)(stringOrUndefined));
const stringOrNull = Math.random() < 0.5 ? Math.random().toString(32) : null;
expectType<0 | string>(defaultTo(0, stringOrNull));
expectType<number | string>(defaultTo(0)(stringOrNull));

const numberOrUndefined = Math.random() < 0.5 ? Math.random() : undefined;
expectType<'fallback' | number>(defaultTo('fallback', numberOrUndefined));
expectType<string | number>(defaultTo('fallback')(numberOrUndefined));
const numberOrNull = Math.random() < 0.5 ? Math.random() : null;
expectType<'fallback' | number>(defaultTo('fallback', numberOrNull));
expectType<string | number>(defaultTo('fallback')(numberOrNull));
