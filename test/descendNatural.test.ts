import { expectType } from 'tsd';
import { descendNatural, Ordering, toString } from '../es';

expectType<(a: number, b: number) => Ordering>(descendNatural('en', toString<number>));
expectType<(a: string, b: string) => Ordering>(descendNatural('en', toString<string>));
expectType<(a: number, b: number) => Ordering>(descendNatural('en')(toString<number>));
expectType<(a: string, b: string) => Ordering>(descendNatural('en')(toString<string>));
