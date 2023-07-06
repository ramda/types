import { expectType, expectError } from 'tsd';

import { both } from '../es';

const gt10 = (x: number) => x > 10;
const lt20 = (x: number) => x < 20;

const isEmptyString = (x: string) => x === '';

expectType<(x: number) => boolean>(both(gt10, lt20));
expectError(both(gt10, isEmptyString));
expectError(both(isEmptyString, lt20));

expectType<(x: number) => boolean>(both(gt10)(lt20));
expectError(both(gt10)(isEmptyString));
expectError(both(isEmptyString)(lt20));

// contrived functions for sake of testing
const is1To3 = (x: number): x is 1 | 2 | 3 => true;
const is2To5 = (x: number): x is 2 | 3 | 4 | 5 => true;

expectType<(x: number) => x is 2 | 3>(both(is1To3, is2To5));
expectType<(x: number) => x is 2 | 3>(both(is1To3)(is2To5));

// 2+ arity
const areBothGt10 = (x: number, y: number) => x > 10 && y > 10;
const areBothLt20 = (x: number, y: number) => x < 20 && y < 20;

expectType<(x: number, y: number) => boolean>(both(areBothGt10, areBothLt20));
expectType<(x: number, y: number) => boolean>(both(areBothGt10)(areBothLt20));
