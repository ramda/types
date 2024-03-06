import { expectError, expectType } from 'tsd';

import { isNil, isNotNil, filter, gt, pipe, prop } from '../es';

type Foobar = { foo?: string; };
type Values = { value: number };
const gt5 = gt(5);

// filter(() => val is p)(list)
// curried filter(isNotNil) with no type annotation defaults to `{}`, the the full function's return type ends up as {}[]
// the return type here is {}[] due to the "collapsing generic issue", read more about that here: https://github.com/ramda/types/discussions/54
expectType<{}[]>(filter(isNotNil)([] as (string | undefined)[]));
// you can fix by setting the generic on isNotNil, the type gets narrows to be just `string` (intended purpose)
expectType<string[]>(filter(isNotNil<string | undefined>)([] as (string | undefined)[]));
// deeper types can't be narrowed by default with isNotNil
expectType<Foobar[]>(filter((x: Foobar) => isNotNil(x.foo))([] as Foobar[]));
// type annotations required for function composition with other ramda funcs
expectType<Foobar[]>(
  filter(
    pipe(prop('foo')<Foobar>, isNotNil)
    //                   ^ this give typescript a "hint" that `prop('foo')(foobar: Foobar)`, which trickles out to both `pipe` an `isNotNil` here
  )([] as Foobar[])
);
// to narrow deeply, set custom return type on arrow function
expectType<Required<Foobar>[]>(filter((x: Foobar): x is Required<Foobar> => isNotNil(x.foo))([] as Foobar[]));
// can do isNil too
expectType<undefined[]>(filter(isNil<string | undefined>)([] as (string | undefined)[]));
// TODO: test pipe(filter)

// for when predicate doesn't type narrow


// filter(() => boolean)(list)
expectType<number[]>(filter(gt5)([] as number[]));
// can't use and untyped arrow function
// @ts-expect-error
filter(x => gt5(x.value))([] as Values[]); // prop `value` does not exist on `unknown`, remove ts-expect-error to display error (test fails without)
// fix by setting the generic on `filter`
expectType<Values[]>(filter<Values>(x => gt5(x.value))([] as Values[]));
// or typing the arrow func
expectType<Values[]>(filter((x: Values) => gt5(x.value))([] as Values[]));
// using an inline `isNotNil` function that does not type narrow returns `number | undefined`, and not `number` like the tests above
expectType<(number | undefined)[]>(filter((x: number | undefined) => x != null)([] as (number | undefined)[]));
// TODO: test pipe(filter)

// filter(() => narrow)(dist)
type Dict = Record<string, string | undefined>;

// same is as the first test, returns `Record<string, {}>`
expectType<Record<string, {}>>(filter(isNotNil)({} as Dict));
// can fix with a type annotation
expectType<Record<string, string>>(filter(isNotNil<string | undefined>)({} as Dict));

// notice that `dict` is not inherently supported by `filter` when used with `pipe`
// this is because when a function is passed a function, it takes last overload, which only supports `list`
// this is a limitation of typescript, not ramda
expectError(pipe(filter(isNotNil<string | undefined>))({} as Dict));
// you can get around this by using an arrow function
expectType<Record<string, string>>(pipe((dict: Dict) => filter(isNotNil, dict))({} as Dict));

// filter(() => val is p, list)
// full signature can directly match list/dict type, and apply it to the generic on isNotNil
expectType<string[]>(filter(isNotNil, [] as (string | undefined)[]));
// this also means it can infer `x` for arrow functions
expectType<Foobar[]>(filter(x => isNotNil(x.foo), [] as Foobar[]));
// as well as for function composition with other ramda funcs
expectType<Foobar[]>(
  filter(pipe(prop('foo'), isNotNil), [] as Foobar[])
);
// still need to set custom return type to narrow deeply, but you don't need to set the type on `x`
expectType<Required<Foobar>[]>(filter((x): x is Required<Foobar> => isNotNil(x.foo), [] as Foobar[]));
// is Nil works un-annotated as well
expectType<undefined[]>(filter(isNil, [] as (string | undefined)[]));

// filter(() => boolean, list)
expectType<number[]>(filter(gt5, [] as number[]));
// arrow function `x` arg get's type inferred correctly
filter(x => gt5(x.value), [] as Values[]);
// using an inline `isNotNil` function that does not type narrow returns `number | undefined`
expectType<(number | undefined)[]>(filter(x => x != null, [] as (number | undefined)[]));

// filter(() => narrow, dist)
// no need for type annotations when using full signature
expectType<Record<string, string>>(filter(isNotNil, {} as Dict));
