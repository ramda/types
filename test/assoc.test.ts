import { expectType } from 'tsd';
import { __, assoc } from '../es';

type BasicObj = {
  str: string;
  num: number;
};

const obj: BasicObj = { str: 'foo', num: 1 };

//
// assoc(key)
//

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


//
// assoc(__, val)
//

// assoc(__, val)(key)(obj)
expectType<BasicObj>(assoc(__, 'bar')('str')(obj));
expectType<Omit<BasicObj, 'str'> & Record<'str', number>>(assoc(__, 2)('str')(obj));
expectType<Omit<{ other: string }, 'str'> & Record<'str', string>>(assoc(__, 'bar')('str')({ other: 'whatever'}));

// assoc(__, val)(__, key)(obj)
expectType<BasicObj>(assoc(__, 'bar')(__, obj)('str'));
expectType<Omit<BasicObj, 'str'> & Record<'str', number>>(assoc(__, 2)(__, obj)('str'));
expectType<Omit<{ other: string }, 'str'> & Record<'str', string>>(assoc(__, 'bar')(__, { other: 'whatever'})('str'));

// assoc(__, val)(key, obj)
expectType<BasicObj>(assoc(__, 'bar')('str', obj));
expectType<Omit<BasicObj, 'str'> & Record<'str', number>>(assoc(__, 2)('str', obj));
expectType<Omit<{ other: string }, 'str'> & Record<'str', string>>(assoc(__, 'bar')('str', { other: 'whatever'}));

//
// assoc(key, val)
//

// assoc(key, val)(obj)
expectType<BasicObj>(assoc('str', 'bar')(obj));
expectType<Omit<BasicObj, 'str'> & Record<'str', number>>(assoc('str', 2)(obj));
expectType<Omit<{ other: string }, 'str'> & Record<'str', string>>(assoc('str', 'foo')({ other: 'whatever' }));
