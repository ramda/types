import { expectType } from 'tsd';
import { defaultTo, __ } from '../es';

expectType<'fallback'>(defaultTo('fallback', undefined));
expectType<'fallback'>(defaultTo('fallback', null));
expectType<string>(defaultTo('fallback')(undefined));
expectType<string>(defaultTo('fallback')(null));
expectType<'fallback'>(defaultTo(__, undefined)('fallback'));
expectType<'fallback'>(defaultTo(__, null)('fallback'));

expectType<'string value'>(defaultTo('fallback', 'string value'));
expectType<'string value'>(defaultTo('fallback')('string value'));

expectType<0>(defaultTo(0, undefined));
expectType<0>(defaultTo(0, null));
expectType<number>(defaultTo(0)(undefined));
expectType<number>(defaultTo(0)(null));
expectType<0>(defaultTo(__, undefined)(0));
expectType<0>(defaultTo(__, null)(0));

expectType<2>(defaultTo(0, 2));
expectType<2>(defaultTo(0)(2));
expectType<number>(defaultTo(__, 2)(0));

expectType<'two'>(defaultTo(0, 'two'));
expectType<'two'>(defaultTo(0)('two'));
expectType<string>(defaultTo(__, 'two')(0));
expectType<2>(defaultTo('zero', 2));
expectType<2>(defaultTo('zero')(2));
expectType<number>(defaultTo(__, 2)('zero'));

const stringOrUndefined = Math.random() < 0.5 ? Math.random().toString(32) : undefined;
expectType<0 | string>(defaultTo(0, stringOrUndefined));
expectType<number | string>(defaultTo(0)(stringOrUndefined));
expectType<0 | string>(defaultTo(__, stringOrUndefined)(0));
const stringOrNull = Math.random() < 0.5 ? Math.random().toString(32) : null;
expectType<0 | string>(defaultTo(0, stringOrNull));
expectType<number | string>(defaultTo(0)(stringOrNull));
expectType<0 | string>(defaultTo(__, stringOrNull)(0));


const numberOrUndefined = Math.random() < 0.5 ? Math.random() : undefined;
expectType<'fallback' | number>(defaultTo('fallback', numberOrUndefined));
expectType<string | number>(defaultTo('fallback')(numberOrUndefined));
expectType<'fallback' | number>(defaultTo(__, numberOrUndefined)('fallback'));
const numberOrNull = Math.random() < 0.5 ? Math.random() : null;
expectType<'fallback' | number>(defaultTo('fallback', numberOrNull));
expectType<string | number>(defaultTo('fallback')(numberOrNull));
expectType<'fallback' | number>(defaultTo(__, numberOrNull)('fallback'));
