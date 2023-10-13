import { expectType } from 'tsd';
import { __, takeLast } from '../es';

type Foo = { foo: string };

expectType<string>(takeLast(1)('foobar'));
expectType<Foo[]>(takeLast(1)([] as Foo[]));
expectType<string>(takeLast(__, 'foobar')(1));
expectType<Foo[]>(takeLast(__, [] as Foo[])(1));
expectType<string>(takeLast(1, 'foobar'));
expectType<Foo[]>(takeLast(1, [] as Foo[]));
