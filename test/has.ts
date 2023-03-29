import { expectType } from 'tsd';
import { has } from '../types/has';
import { __ } from '../types/__';

expectType<boolean>(has(__, { foo: 'foo' })('foo'));
expectType<boolean>(has(__, { foo: 'foo' })('bar'));

expectType<boolean>(has('foo', { foo: 'foo' }));
expectType<boolean>(has('bar', { foo: 'foo' }));

expectType<boolean>(has('foo')({ foo: 'foo' }));
expectType<boolean>(has('bar')({ foo: 'foo' }));
