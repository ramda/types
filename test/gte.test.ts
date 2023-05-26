import { expectType } from 'tsd';

import { __, gte, pipe, Ord } from '../es';

expectType<boolean>(gte(1, 2));
expectType<boolean>(gte('a', 'b'));
expectType<boolean>(gte(false, true));
expectType<boolean>(gte(new Date(0), new Date(Date.now())));

expectType<boolean>(gte(__, 2)(1));
expectType<boolean>(gte(__, 'b')('a'));
expectType<boolean>(gte(__, true)(false));
expectType<boolean>(gte(__, new Date(Date.now()))(new Date(0)));

expectType<boolean>(gte(1)(2));
expectType<boolean>(gte('a')('b'));
expectType<boolean>(gte(false)(true));
expectType<boolean>(gte(new Date(0))(new Date(Date.now())));

// pipe
expectType<(a: Ord, b: Ord) => boolean>(pipe(gte));
