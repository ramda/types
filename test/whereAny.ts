import { expectType } from 'tsd';
import { whereAny } from '../types/whereAny';
import { __ } from '../types/__';

expectType<boolean>(
  whereAny({
    foo: (a: number) => a < 10
  }, {
    foo: 5,
    bar: '10'
  })
);

expectType<boolean>(
  whereAny(__, {
    foo: 5,
    bar: '10'
  })({
    foo: (a: number) => a < 10
  })
);

expectType<boolean>(
  whereAny({
    foo: (a: number) => a < 10
  })({
    foo: 5,
    bar: '10'
  })
);
