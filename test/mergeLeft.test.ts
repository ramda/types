import { expectType, expectNotType } from 'tsd';
import { map, mergeLeft } from '../es';

// the `mergeRight` tests cover most everything here
// however, will test `map` since it's the largest useCase
type Entry = {
  type: string;
  payload: object;
  status: 'ok' | 'error'
};

// lets say that for `Entry[]` we have a `testEntry` function that validates `Entry#payload`
// and we simply want to change `status` to `'error'` in those cases
const entries = [] as Entry[];
// here, the object literal is `{ status: string }`, which makes our output NOT `Entry[]`
expectNotType<Entry[]>(map(mergeLeft({ status: 'error' }))(entries));
// it comes out as a new type
expectType<{ type: string; payload: object; status: string }[]>(map(mergeLeft({ status: 'error' }))(entries));
// one downside is that you have to `as const` object literals when doing this, it's a limitation of typescript
// TODO: with typescript@5 we can have `mergeLeft<const L, const R>` to fix this, `const {}` works just like `readonly Array<T>`
expectType<Entry[]>(map(mergeLeft({ status: 'error' } as const))(entries));

// and of course you get a new type if you change the type of any prop
expectType<{ type: string; payload: object; status: boolean }[]>(map(mergeLeft({ status: false }))(entries));
