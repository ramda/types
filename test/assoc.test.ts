import { expectType } from 'tsd';
import { __, assoc } from '../es';

type BasicObj = {
  str: string;
  num: number;
};

const obj: BasicObj = { str: 'foo', num: 1 };

// assoc(key)(__, obj)(val)
expectType<BasicObj>(assoc('str')(__, obj)('bar'));
expectType<Omit<BasicObj, 'str'> & Record<'str', number>>(assoc('str')(__, obj)(2));
expectType<Omit<{ other: string }, 'str'> & Record<'str', string>>(assoc('str')(__, { other: 'whatever' })('foo'));

// assoc(key)(val, obj)
expectType<BasicObj>(assoc('str')('bar', obj));
expectType<Omit<BasicObj, 'str'> & Record<'str', number>>(assoc('str')(2, obj));
expectType<Omit<{ other: string }, 'str'> & Record<'str', string>>(assoc('str')('foo', { other: 'whatever' }));

// assoc(key)(val)(obj)
expectType<BasicObj>(assoc('str')('bar')(obj));
expectType<Omit<BasicObj, 'str'> & Record<'str', number>>(assoc('str')(2)(obj));
expectType<Omit<{ other: string }, 'str'> & Record<'str', string>>(assoc('str')('foo')({ other: 'whatever' }));
