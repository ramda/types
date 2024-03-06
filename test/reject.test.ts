import { expectError, expectType } from 'tsd';

import { isNil, isNotNil, reject, gt, pipe, prop } from '../es';

type Foobar = { foo?: string; };
type Values = { value: number };
const gt5 = gt(5);

// reject(() => val is p)(list)
// unlike `filter(isNotNil)`, `reject(isNil)` this works because `isNil`, and mostly by accident
// `reject(isNil)` return `(null | undefined) & T`, and `T` collapses to `{}`,
// but this combined with `Exclude<string | undefined, (null | undefined) & {}>` does yield the desired result of `string[]`
expectType<string[]>(reject(isNil)([] as (string | undefined)[]));
// deeper types can't be narrowed by default with isNil
expectType<Foobar[]>(reject((x: Foobar) => isNil(x.foo))([] as Foobar[]));
// type annotations required for function composition with other ramda funcs
expectType<Foobar[]>(
  reject(
    pipe(prop('foo')<Foobar>, isNil)
    //                   ^ this give typescript a "hint" that `prop('foo')(foobar: Foobar)`, which trickles out to both `pipe` an `isNil` here
  )([] as Foobar[])
);

// You'd expect this to work same as `filter(pred)s`, but `Exclude<Foobar, Required<Foobar>>` is tyring to remove `foo: string` from `foo?: string`
// `foo` doesn't exist, only `foo?`, so `Exclude<Foobar, Required<Foobar>>` just ends up being `Foobar`. Typescript is weird sometimes
expectType<Foobar[]>(reject((x: Foobar): x is Required<Foobar> => !isNil(x.foo))([] as Foobar[]));
// can do isNotNil too
expectType<undefined[]>(reject(isNotNil<string | undefined>)([] as (string | undefined)[]));
// combining with `pipe` requires same annotations
expectType<string[]>(pipe(reject(isNil<string | undefined>))([] as (string | undefined)[]));
// when using a function like gt5 which doesn't have a generic, passing reject to pipe has no negative consequences
expectType<number[]>(pipe(reject(gt5))([] as number[]));

// for when predicate doesn't type narrow


// reject(() => boolean)(list)
expectType<number[]>(reject(gt5)([] as number[]));
// can't use and untyped arrow function
// @ts-expect-error
reject(x => gt5(x.value))([] as Values[]); // prop `value` does not exist on `unknown`, remove ts-expect-error to display error (test fails without)
// fix by setting the generic on `reject`
expectType<Values[]>(reject<Values>(x => gt5(x.value))([] as Values[]));
// or typing the arrow func
expectType<Values[]>(reject((x: Values) => gt5(x.value))([] as Values[]));
// using an inline `isNil` function that does not type narrow returns `number | undefined`, and not `number` like the tests above
expectType<(number | undefined)[]>(reject((x: number | undefined) => x != null)([] as (number | undefined)[]));
// combining with `pipe` requires same annotations
expectType<Values[]>(pipe(reject<Values>(x => gt5(x.value)))([] as Values[]));
expectType<Values[]>(pipe(reject((x: Values) => gt5(x.value)))([] as Values[]));
// when using a function like gt5 which doesn't have a generic, passing reject to pipe has no negative consequences
expectType<number[]>(pipe(reject(gt5))([] as number[]));


// reject(() => narrow)(dist)
type Dict = Record<string, string | undefined>;

// works for the same reason as the first test
expectType<Record<string, string>>(reject(isNil)({} as Dict));
// can fix with a type annotation
expectType<Record<string, string>>(reject(isNil<string | undefined>)({} as Dict));

// notice that `dict` is not inherently supported by `reject` when used with `pipe`
// this is because when a function is passed a function, it takes last overload, which only supports `list`
// this is a limitation of typescript, not ramda
expectError(pipe(reject(isNil<string | undefined>))({} as Dict));
// you can get around this by using an arrow function
expectType<Record<string, string>>(pipe((dict: Dict) => reject(isNil, dict))({} as Dict));

// reject(() => val is p, list)
// full signature can directly match list/dict type, and apply it to the generic on isNil
expectType<string[]>(reject(isNil, [] as (string | undefined)[]));
// this also means it can infer `x` for arrow functions
expectType<Foobar[]>(reject(x => isNil(x.foo), [] as Foobar[]));
// as well as for function composition with other ramda funcs
expectType<Foobar[]>(
  reject(pipe(prop('foo'), isNil), [] as Foobar[])
);
// still need to set custom return type to narrow deeply, but you don't need to set the type on `x`
// see about why this returns `Foobar[]` while `filter()` returns `Required<Foobar>[]`
expectType<Foobar[]>(reject((x): x is Required<Foobar> => !isNil(x.foo), [] as Foobar[]));
// isNotNil works un-annotated as well
expectType<undefined[]>(reject(isNotNil, [] as (string | undefined)[]));

// reject(() => boolean, list)
expectType<number[]>(reject(gt5, [] as number[]));
// arrow function `x` arg get's type inferred correctly
reject(x => gt5(x.value), [] as Values[]);
// using an inline `isNil` function that does not type narrow returns `number | undefined`
expectType<(number | undefined)[]>(reject(x => x != null, [] as (number | undefined)[]));

// reject(() => narrow, dist)
// no need for type annotations when using full signature
expectType<Record<string, string>>(reject(isNil, {} as Dict));
