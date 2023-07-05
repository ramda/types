import { expectType, expectError } from 'tsd';

import { path } from '../es';

type Obj = { one: { two: {
  three: { four: { five: { six: { seven: { eight: { nine: boolean } } } } } },
  other: boolean
} } };

expectType<Obj['one']>(path(['one'], {} as Obj));
expectType<Obj['one']['two']>(path(['one', 'two'], {} as Obj));
expectType<Obj['one']['two']['three']>(path(['one', 'two', 'three'], {} as Obj));
expectType<Obj['one']['two']['three']['four']>(path(['one', 'two', 'three', 'four'], {} as Obj));
expectType<Obj['one']['two']['three']['four']['five']>(path(['one', 'two', 'three', 'four', 'five'], {} as Obj));
expectType<Obj['one']['two']['three']['four']['five']['six']>(path(['one', 'two', 'three', 'four', 'five', 'six'], {} as Obj));
expectType<Obj['one']['two']['three']['four']['five']['six']['seven']>(path(['one', 'two', 'three', 'four', 'five', 'six', 'seven'], {} as Obj));
expectType<Obj['one']['two']['three']['four']['five']['six']['seven']['eight']>(path(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'], {} as Obj));
expectType<Obj['one']['two']['three']['four']['five']['six']['seven']['eight']['nine']>(path(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'], {} as Obj));

// sibling keys
expectType<boolean>(path(['one', 'two', 'other'], {} as Obj));
// incorrect paths
expectError(path(['one', 'two', 'nope'], {} as Obj));
