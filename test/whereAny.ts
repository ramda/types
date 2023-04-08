import { expectType } from 'tsd';
import { whereAny } from '../types/whereAny';

expectType<boolean>(
  whereAny({
    foo: (a: number) => a < 10
  }, {
    foo: 5,
    bar: '10'
  })
);
