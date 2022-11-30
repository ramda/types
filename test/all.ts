import { expectType, expectError } from 'tsd';
import { all } from '../types/all';
import { equals } from '../types/equals';

expectType<boolean>(all(equals(3), [3, 3, 3]));
expectType<boolean>(all(equals(true))([false, false, false]));
expectType<boolean>(
  all((n) => n === 'hello')(['Goodbye', 'Ciao', 'Auf Wiedersehen'])
);

expectError(all((n: number) => n, [1, 3, 4]));
expectError(all((n: string) => n, [5, 6, 7]));
expectError(all((n: null | undefined) => n, [null, undefined, null]));
