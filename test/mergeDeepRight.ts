import { expectType, expectNotAssignable } from 'tsd';
import { mergeDeepRight } from '../es';

type Foobarbizbaz = { foo: { bar: string; baz: string }; biz: string };
type FoobarS = { foo: { bar: string } };
type FoobarN = { foo: { bar: number } };

// when `L` extends `R`, we can simply return `R`
expectType<Foobarbizbaz>(mergeDeepRight({} as Foobarbizbaz, {} as FoobarS));
// else, it should not be assignable to `L`
expectNotAssignable<Foobarbizbaz>(mergeDeepRight({} as Foobarbizbaz, {} as FoobarN));
// and a new type is returned
expectType<{ foo: { bar: number; baz: string }; biz: string }>(mergeDeepRight({} as Foobarbizbaz, {} as FoobarN));

// the exception is when both `L` and `R` as the same types to begin with
expectType<Foobarbizbaz>(mergeDeepRight({} as Foobarbizbaz, {} as Foobarbizbaz));

type Translations = { lang: string, contact: { email?: string; emailLabel: string } };

// below are to test a regression brought up by: https://github.com/ramda/types/issues/17
// there will be type errors in merge1 and merge3Results below if casting / assignability breaks
const translations = [
  { lang: 'en', contact: { emailLabel: 'Email' } },
  { lang: 'de', contact: { email: 'moo@example.com', emailLabel: 'E-Mail' } }
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function merge<T extends { lang: string }>(arr: T[]) {
  return mergeDeepRight(arr[0], arr[1]) as T;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function merge2<T extends { lang: string }>(arr: T[]): T {
  // @ts-expect-error - for why this errors, see here: https://stackoverflow.com/a/59363875/10107466
  // If someone knows a way around this, please let us know!
  return mergeDeepRight(arr[0], arr[1]);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function merge3<T extends { lang: string }>(arr: T[]) {
  return mergeDeepRight(arr[0], arr[1]);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const merge3Result: Translations = merge3(translations);
