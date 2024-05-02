import { expectError, expectType } from 'tsd';

import { flow } from '../es';

const strToNum = (str: string) => Number(str);
const numToStr = (num: number) => String(num);

expectType<number>(flow(1, []));
expectType<string>(flow(1, [numToStr]));
expectType<number>(flow(1, [numToStr, strToNum]));
expectType<string>(flow(1, [numToStr, strToNum, numToStr]));
expectType<number>(flow(1, [numToStr, strToNum, numToStr, strToNum]));
expectType<string>(flow(1, [numToStr, strToNum, numToStr, strToNum, numToStr]));
expectType<number>(flow(1, [numToStr, strToNum, numToStr, strToNum, numToStr, strToNum]));
expectType<string>(flow(1, [numToStr, strToNum, numToStr, strToNum, numToStr, strToNum, numToStr]));
expectType<number>(flow(1, [numToStr, strToNum, numToStr, strToNum, numToStr, strToNum, numToStr, strToNum]));
expectType<string>(flow(1, [numToStr, strToNum, numToStr, strToNum, numToStr, strToNum, numToStr, strToNum, numToStr]));

// with 10+, if you don't set the generic it returns unknown
expectType<unknown>(flow(1, [numToStr, strToNum, numToStr, strToNum, numToStr, strToNum, numToStr, strToNum, numToStr, strToNum]));
// setting the final return type has no typechecking against the actual chain of functions
expectType<Date>(flow<number, Date>(1, [numToStr, strToNum, numToStr, strToNum, numToStr, strToNum, numToStr, strToNum, numToStr, strToNum]));
// the Seed type has to match though, or it will error
expectError(flow<string, Date>(1, [numToStr, strToNum, numToStr, strToNum, numToStr, strToNum, numToStr, strToNum, numToStr, strToNum]));

// same applies if you have generic array of functions, even if the arg and return are typed
const seriesOfFunctions: Array<(a: string) => string> = [];
expectType<unknown>(flow(1, seriesOfFunctions));
// setting the final return type has no typechecking against the actual chain of functions
expectType<Date>(flow<number, Date>(1, seriesOfFunctions));
// the Seed type has to match though, or it will error
expectError(flow<string, Date>(1, seriesOfFunctions));
