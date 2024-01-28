import { expectType } from 'tsd';
import { filter, isNil } from '../es';

expectType<boolean>(isNil(1));
expectType<boolean>(isNil('a'));
expectType<boolean>(isNil(true));

expectType<boolean>(isNil(null));
expectType<boolean>(isNil(undefined));

const maybeNumber = (): number | null => {
  if (Math.random() > 0.5) {
    return null;
  }
  return 123;
};

expectType<number | null>(maybeNumber());

const r = maybeNumber();

if (isNil(r)) {
  expectType<null>(r);
}

expectType<undefined[]>(filter(isNil, [] as (string | undefined)[]));
