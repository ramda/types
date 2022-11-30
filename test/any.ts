import { expectType, expectError } from 'tsd';
import { any } from '../types/any';
import { flip } from '../types/flip';
import { is } from '../types/is';
import { lt } from '../types/lt';
import { isNil } from '../types/isNil';
import { isNotNil } from '../types/isNotNil';

expectType<boolean>(any(isNotNil, [1, 2, null]));
expectType<boolean>(any(isNil, [null, 2, undefined]));
expectType<boolean>(any(flip(lt)(0), [1, 2, -1]));
expectType<boolean>(any(flip(lt)(0), [1, 2, -1]));
expectType<boolean>(any(is(String), [1, 2, -1]));
expectType<boolean>(any(is(Number), [1, 2, -1]));

expectError(any(flip(lt)(0), [null, 2, undefined]));
expectError(any(flip(lt)(0), { a: 2, b: 3 }));
expectError(any(flip(lt)(0), 'error!'));
