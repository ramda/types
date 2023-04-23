import { expectType } from 'tsd';
import { __, map, toString, Functor } from '../es';

const arr: number[] = [];
const arrRO: readonly number[] = [];

// array
expectType<string[]>(map(toString, arr));
expectType<string[]>(map(toString, arrRO));

expectType<string[]>(map(__, arr)(toString));
expectType<string[]>(map(__, arrRO)(toString));

expectType<string[]>(map(toString)(arr));
expectType<string[]>(map(toString)(arrRO));


// object
expectType<Record<string, string>>(map(toString, {} as Record<string, number>));
expectType<Record<string, string>>(map(__, {} as Record<string, number>)(toString));
expectType<Record<string, string>>(map(toString)({} as Record<string, number>));


// functor
const numberFunctor = {
  map: <U>(fn: (c: number) => U) => {
    const chars = 'Ifmmp!Xpsme'.split('');
    return chars.map(char => fn(char.charCodeAt(0)));
  }
};

expectType<Functor<string>>(map(toString, numberFunctor));
expectType<Functor<string>>(map(__, numberFunctor)(toString));
expectType<Functor<string>>(map(toString)(numberFunctor));
