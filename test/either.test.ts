import { expectType, expectError } from 'tsd';

import { either } from '../es';

const lt10 = (x: number) => x < 10;
const gt20 = (x: number) => x > 20;

const isEmptyString = (x: string) => x === '';

expectType<(x: number) => boolean>(either(lt10, gt20));
expectError(either(lt10, isEmptyString));
expectError(either(isEmptyString, gt20));

expectType<(x: number) => boolean>(either(lt10)(gt20));
expectError(either(lt10)(isEmptyString));
expectError(either(isEmptyString)(gt20));

// 2+ arity
const areBothLt10 = (x: number, y: number) => x < 10 && y < 10;
const areBothGt20 = (x: number, y: number) => x > 20 && y > 20;

expectType<(x: number, y: number) => boolean>(either(areBothLt10, areBothGt20));
expectType<(x: number, y: number) => boolean>(either(areBothLt10)(areBothGt20));
