import { expectType } from 'tsd';

import { splitEvery } from '../es';

expectType<number[][]>(splitEvery(2, [1, 2, 3, 4, 5, 6, 7]));
expectType<number[][]>(splitEvery(2)([1, 2, 3, 4, 5, 6, 7]));

expectType<string[]>(splitEvery(3, 'foobarbaz'));
expectType<string[]>(splitEvery(3)('foobarbaz'));
