import { expectType, expectAssignable, expectNotType } from 'tsd';
import { mergeLeft } from '../es';

// object literals

const foobar = { foo: 'bar', bar: 'bar' };
const foo = { foo: 'foo' };
const bar = { bar: 'bar' };
const foo2 = { foo: 2 };

// without the `Extends` bit in the type definition, this would be `{ foo: string; bar: string; } & { foo: string ; }`
// which is redundant and looks bad as a return type
expectType<{ bar: string; foo: string; }>(mergeLeft(foobar, foo));
expectType<{ bar: string; foo: string; }>(mergeLeft(foobar, bar));
// we also expect a direct collapse of the types to avoid the ugly `{ foo: string } & { bar: string }`
expectNotType<{ bar: string } & { foo: string; }>(mergeLeft(foo, bar));
expectType<{ bar: string; foo: string; }>(mergeLeft(foo, bar));
// this is esspecially important when you merge objects with keys that have different types
expectNotType<{ foo: string } & { foo: number; }>(mergeLeft(foo, bar));
expectAssignable<{ foo: number; }>(mergeLeft(foo2, foo));

// typed objects

type Foo = {
  foo: string
};

type Bar = {
  bar: string;
};

type Foobar = {
  foo: string;
  bar: string;
};

// `Foo & Bar` is ugly and poorly shows what you're actually getting back
expectNotType<Bar & Foo>(mergeLeft({} as Foo, {} as Bar));
// so instead the types are collapsed
expectType<{ bar: string, foo: string }>(mergeLeft({} as Foo, {} as Bar));
// however, when `L extends R`, that should just return L
expectNotType<Foo & Foobar>(mergeLeft({} as Foobar, {} as Foo));
expectType<Foobar>(mergeLeft({} as Foobar, {} as Foo));
expectNotType<Bar & Foobar>(mergeLeft({} as Foobar, {} as Bar));
expectType<Foobar>(mergeLeft({} as Foobar, {} as Bar));

// this is especially important when merging an object literal into a typed object
expectNotType<{ foo: string } & Foobar>(mergeLeft({} as Foobar, foo));
expectType<Foobar>(mergeLeft({} as Foobar, foo));
expectNotType<{ bar: string } & Foobar>(mergeLeft({} as Foobar, bar));
expectType<Foobar>(mergeLeft({} as Foobar, bar));

// however, when any of the prop types do not match, we get back a new object and not an intersection
expectNotType<{ foo: number } & Foobar>(mergeLeft({} as Foobar, foo2));
expectType<{ bar: string; foo: number; }>(mergeLeft(foo2, {} as Foobar));

// these should also work both ways, as long as one type extends the other, choosing the more expansive type is ideal
expectNotType<Foobar & Foo>(mergeLeft({} as Foo, {} as Foobar));
expectType<Foobar>(mergeLeft({} as Foo, {} as Foobar));
expectNotType<Foobar & Bar>(mergeLeft({} as Bar, {} as Foobar));
expectType<Foobar>(mergeLeft({} as Bar, {} as Foobar));
expectNotType<Foobar & { foo: string }>(mergeLeft(foo, {} as Foobar));
expectType<Foobar>(mergeLeft(foo, {} as Foobar));
expectNotType<Foobar & { bar: string }>(mergeLeft(bar, {} as Foobar));
expectType<Foobar>(mergeLeft(bar, {} as Foobar));
