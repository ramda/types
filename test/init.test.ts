import { expectType } from 'tsd';
import { init } from '../es';

// string always return string
expectType<string>(init('abc'));
// emptyString still returns type string. this is due to `''.chartAt(0) => ''`
expectType<string>(init(''));

// array literals will read the first type correctly
expectType<[string, number]>(init(['fi', 1, 'fum']));
// but if the array is typed as an `Array<T> or T[]`, then return type will be `T`
expectType<Array<string | number>>(init(['fi', 1, 'fum'] as Array<string | number>));
// empty array literals return never
expectType<never>(init([]));
// but if it is typed, it will be `number[]`
expectType<number[]>(init([] as number[]));
// single entry tuples return never, since they literally have no init
expectType<never>(init([10] as const));
// tuples return the example type of the input tuple minus the first entry
expectType<[10, '10']>(init([10, '10', 10] as const));
expectType<['10', 10]>(init(['10', 10, '10'] as const));
// typed arrays return the same type
expectType<Array<number | string>>(init([10, 'ten'] as Array<number | string>));
expectType<Array<string | number>>(init(['10', 10] as Array<string | number>));
