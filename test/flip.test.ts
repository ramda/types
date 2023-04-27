import { expectType } from 'tsd';

import { flip, lt } from '../es';

expectType<boolean>(flip(lt)(2, 1));
expectType<boolean>(flip(lt)(2)(1));
