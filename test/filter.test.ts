import { expectType } from 'tsd';

import { isNil, isNotNil, filter, gt, pipe, prop } from '../es';

// for when the predicate type narrows
type Foobar = { foo?: string; };


// filter(() => val is p)(list)
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

// for when predicate doesn't type narrow
type Values = { value: number };
const gt5 = gt(5);

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
