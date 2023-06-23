import { expectType } from 'tsd';

import { __, of } from '../es';

// Array special handler
expectType<<T>(value: T) => T[]>(of(Array));

// of(ctor)(val)
expectType<string[]>(of(Array)('a'));
expectType<number[]>(of(Array)(1));
// of(__, val)(ctor)
expectType<string[]>(of(__, 'a')(Array));
expectType<number[]>(of(__, 1)(Array));
// of(ctor, val)
expectType<string[]>(of(Array, 'a'));
expectType<number[]>(of(Array, 1));

abstract class Maybe<A> {
  static of: <T>(val: T) => Maybe<T> = <T>(val: T) => new Just<T>(val);

  public value: A;

  constructor(value: A) {
    this.value = value;
  }

  abstract map<B>(fn: (value: A) => B): Maybe<B>;
}

class Just<A> extends Maybe<A> {
  constructor(value: A) {
    super(value);
  }

  map<B>(fn: (value: A) => B): Maybe<B> {
    return new Just(fn(this.value));
  }
}

// Applicatives
// `Maybe<unknown>` because no higher kinded types in typescript, cast it to be more specific

expectType<Maybe<unknown>>(of(Maybe)(1));
expectType<Maybe<number>>(of(Maybe)(1) as Maybe<number>);

expectType<Maybe<unknown>>(of(__, 1)(Maybe));
expectType<Maybe<number>>(of(__, 1)(Maybe) as Maybe<number>);

expectType<Maybe<unknown>>(of(Maybe, 1));
expectType<Maybe<number>>(of(Maybe, 1) as Maybe<number>);
