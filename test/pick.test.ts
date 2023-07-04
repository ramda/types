import { expectType } from 'tsd';

import { pick } from '../es';

const obj = { foo: 1, bar: '2', biz: false };

expectType<{ foo: number, bar: string }>(pick(['foo', 'bar'], obj));
