import { of } from '../es';

abstract class Maybe<A> {
  static of = <T>(val: T) => new Just<T>(val);

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

of(Maybe, 1);
