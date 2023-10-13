import { expectType } from 'tsd';
import { __, take } from '../es';

type Foo = { foo: string };

expectType<string>(take(1)('foobar'));
expectType<Foo[]>(take(1)([] as Foo[]));
expectType<string>(take(__, 'foobar')(1));
expectType<Foo[]>(take(__, [] as Foo[])(1));
expectType<string>(take(1, 'foobar'));
expectType<Foo[]>(take(1, [] as Foo[]));
