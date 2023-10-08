import { expectType, expectError } from 'tsd';

import { path } from '../es';

type Obj = { one: { two: {
  three: { four: { five: { six: { seven: { eight: { nine: boolean } } } } } },
  other: boolean
} } };

const obj = {} as Obj;

expectType<Obj['one']>(path(['one'], obj));
expectType<Obj['one']['two']>(path(['one', 'two'], obj));
expectType<Obj['one']['two']['three']>(path(['one', 'two', 'three'], obj));
expectType<Obj['one']['two']['three']['four']>(path(['one', 'two', 'three', 'four'], obj));
expectType<Obj['one']['two']['three']['four']['five']>(path(['one', 'two', 'three', 'four', 'five'], obj));
expectType<Obj['one']['two']['three']['four']['five']['six']>(path(['one', 'two', 'three', 'four', 'five', 'six'], obj));
expectType<Obj['one']['two']['three']['four']['five']['six']['seven']>(path(['one', 'two', 'three', 'four', 'five', 'six', 'seven'], obj));
expectType<Obj['one']['two']['three']['four']['five']['six']['seven']['eight']>(path(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'], obj));
expectType<Obj['one']['two']['three']['four']['five']['six']['seven']['eight']['nine']>(path(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'], obj));

// sibling keys
expectType<boolean>(path(['one', 'two', 'other'], obj));
// incorrect paths
expectError(path(['one', 'two', 'nope'], obj));

// variable paths
// these work but are not recommended
const somePath: string[] = ['one', 'two', 'three'];
expectType<unknown>(path(somePath, obj));
// typing the generic will give you a better return, but will always be unions with `unknown`
expectType<Obj['one']['two']['three'] | unknown>(path<Obj['one']['two']['three']>(somePath, obj));
