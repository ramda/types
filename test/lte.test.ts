import { expectType } from 'tsd';

import { __, lte, pipe, Ord } from '../es';

expectType<boolean>(lte(1, 2));
expectType<boolean>(lte('a', 'b'));
expectType<boolean>(lte(false, true));
expectType<boolean>(lte(new Date(0), new Date(Date.now())));

expectType<boolean>(lte(__, 2)(1));
expectType<boolean>(lte(__, 'b')('a'));
expectType<boolean>(lte(__, true)(false));
expectType<boolean>(lte(__, new Date(Date.now()))(new Date(0)));

expectType<boolean>(lte(1)(2));
expectType<boolean>(lte('a')('b'));
expectType<boolean>(lte(false)(true));
expectType<boolean>(lte(new Date(0))(new Date(Date.now())));

// pipe
expectType<(a: Ord, b: Ord) => boolean>(pipe(lte));
