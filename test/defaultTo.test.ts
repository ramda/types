import { expectType } from 'tsd';
import { defaultTo } from '../es';

expectType<string>(defaultTo('no value', undefined));
expectType<string>(defaultTo('no value', null));
expectType<string>(defaultTo('no value')(undefined));
expectType<string>(defaultTo('no value')(null));

expectType<string>(defaultTo('no value', 'string value'));
expectType<string>(defaultTo('no value')('string value'));

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


const stringOrUndefined = (() => Math.random() < 0.5 ? Math.random().toString(32) : undefined)();
expectType<number | string>(defaultTo(0, stringOrUndefined));
const stringOrNull = (() => Math.random() < 0.5 ? Math.random().toString(32) : undefined)();
expectType<number | string>(defaultTo(0, stringOrNull));


const numberOrUndefined = Math.random() < 0.5 ? Math.random() : undefined;
expectType<string | number>(defaultTo('no value', numberOrUndefined));
const numberOrNull = Math.random() < 0.5 ? Math.random() : null;
expectType<string | number>(defaultTo('no value', numberOrNull));


