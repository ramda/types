import { expectType } from 'tsd';
import { ascendNatural, Ordering, toString } from '../es';

expectType<(a: number, b: number) => Ordering>(ascendNatural('en', toString<number>));
expectType<(a: string, b: string) => Ordering>(ascendNatural('en', toString<string>));
expectType<(a: number, b: number) => Ordering>(ascendNatural('en')(toString<number>));
expectType<(a: string, b: string) => Ordering>(ascendNatural('en')(toString<string>));
