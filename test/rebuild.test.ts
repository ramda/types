import { expectType } from 'tsd';

import { rebuild } from '../es';

const oldObj = { foo: '123-456', bar: '678' };

const newObj = rebuild(([k, v]) => {
  return v.split('-').map((n, i) => [`${k}${i}`, n]);
}, oldObj);

expectType<Record<string, string>>(newObj);

const newObj2 = rebuild(([k, v]) => {
  return [[k, v.split('-')]];
}, oldObj);

expectType<Record<string, string[]>>(newObj2);

const newObj3 = rebuild(([k, v]) => {
  const innerObj = Object.fromEntries(v.split('-').map((n, i) => [i, n]));
  return [[k, innerObj]];
}, oldObj);

expectType<Record<string, Record<string, string>>>(newObj3);
