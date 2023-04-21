import { expectType, expectAssignable, expectNotAssignable } from 'tsd';
import { mergeDeepRight } from '../es';

// unlike mergeRight, its practically impossible to deeply infer if the type is the same as `L` give that `R` is `DeepPartial<R>`
// so what we really want to check for is assignability where we can

type Foobarbizbaz = { foo: { bar: string; baz: string }; biz: string };
type FoobarS = { foo: { bar: string } };
type FoobarN = { foo: { bar: number } };

expectAssignable<Foobarbizbaz>(mergeDeepRight({} as Foobarbizbaz, {} as FoobarS));
expectNotAssignable<Foobarbizbaz>(mergeDeepRight({} as Foobarbizbaz, {} as FoobarN));
expectType<{ foo: { bar: number; baz: string }; biz: string }>(mergeDeepRight({} as Foobarbizbaz, {} as FoobarN));
