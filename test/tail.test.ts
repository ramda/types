import { expectType } from 'tsd';
import { tail } from '../es';

// string always return string
expectType<string>(tail('abc'));
// emptyString still returns type string. this is due to `''.chartAt(0) => ''`
expectType<string>(tail(''));

// array literals will read the first type correctly
expectType<[number, string]>(tail(['fi', 1, 'fum']));
// but if the array is typed as an `Array<T> or T[]`, then return type will be `T`
expectType<Array<string | number>>(tail(['fi', 1, 'fum'] as Array<string | number>));
// empty array literals return never
expectType<never>(tail([]));
// but if it is typed, it will be `number[]`
expectType<number[]>(tail([] as number[]));
// single entry tuples return never, since they literally have no tail
expectType<never>(tail([10] as const));
// tuples return the example type of the input tuple minus the first entry
expectType<['10', 10]>(tail([10, '10', 10] as const));
expectType<[10, '10']>(tail(['10', 10, '10'] as const));
// typed arrays return the same type
expectType<Array<number | string>>(tail([10, 'ten'] as Array<number | string>));
expectType<Array<string | number>>(tail(['10', 10] as Array<string | number>));
