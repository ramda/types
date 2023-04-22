import { expectType } from 'tsd';
import { isNotNil } from '../es';

expectType<boolean>(isNotNil(1));
expectType<boolean>(isNotNil('a'));
expectType<boolean>(isNotNil(true));

expectType<boolean>(isNotNil(null));
expectType<boolean>(isNotNil(undefined));

const maybeNumber = (): number | null => {
  if (Math.random() > 0.5) {
    return null;
  }
  return 123;
};

expectType<number | null>(maybeNumber());

const r = maybeNumber();

if (isNotNil(r)) {
  expectType<number>(r);
}
