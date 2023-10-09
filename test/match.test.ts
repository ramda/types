import { expectType } from 'tsd';

import { __, match } from '../es';

// not much to test here
expectType<RegExpMatchArray>(match(/foo/, 'foo'));
expectType<RegExpMatchArray>(match(/foo/)('foo'));
expectType<RegExpMatchArray>(match(__, 'foo')(/foo/));
