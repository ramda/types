import { expectType } from 'tsd';

import { __ } from '../types/__';
import { gt } from '../types/gt';

expectType<boolean>(gt(1, 2));
expectType<boolean>(gt('a', 'b'));
expectType<boolean>(gt(false, true));
expectType<boolean>(gt(new Date(0), new Date(Date.now())));

expectType<boolean>(gt(__, 2)(1));
expectType<boolean>(gt(__, 'b')('a'));
expectType<boolean>(gt(__, true)(false));
expectType<boolean>(gt(__, new Date(Date.now()))(new Date(0)));

expectType<boolean>(gt(1)(2));
expectType<boolean>(gt('a')('b'));
expectType<boolean>(gt(false)(true));
expectType<boolean>(gt(new Date(0))(new Date(Date.now())));
