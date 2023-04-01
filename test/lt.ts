import { expectType } from 'tsd';

import { __ } from '../types/__';
import { lt } from '../types/lt';

expectType<boolean>(lt(1, 2));
expectType<boolean>(lt('a', 'b'));
expectType<boolean>(lt(false, true));
expectType<boolean>(lt(new Date(0), new Date(Date.now())));

expectType<boolean>(lt(__, 2)(1));
expectType<boolean>(lt(__, 'b')('a'));
expectType<boolean>(lt(__, true)(false));
expectType<boolean>(lt(__, new Date(Date.now()))(new Date(0)));

expectType<boolean>(lt(1)(2));
expectType<boolean>(lt('a')('b'));
expectType<boolean>(lt(false)(true));
expectType<boolean>(lt(new Date(0))(new Date(Date.now())));
