# the map(fn) => (list) => U overload

Lets start by looking at the previous definition

```typescript
export function map<T, U>(fn: (x: T) => U): (list: readonly T[]) => U[];
export function map<T, U>(fn: (x: T[keyof T & keyof U] | ValueOfUnion<T>) => U[keyof T & keyof U]): (list: T) => U;
// used in functors
export function map<T, U>(fn: (x: T) => U): (obj: Functor<T>) => Functor<U>;
```

This is not the correct way to write types for a function that returns overloads. Typescript will never reach the second 2 definitions.
This means that you cannot do this
```typescript
map(parseInt)(['1', '2']) // ok
map(parseInt)({ foo: '1', bar :'2' }) // errors
map(parseInt)(Just('1')) // errors
```

To fix this, a single function returns an overload of functions
```typescript
export function map<T, U>(fn (x: T) => U): {
  (list: readonly T[]): U[];
  <O extends Record<PropertyKey, T>(obj: O): Record<keyof O, U>;
  (functor: Functor<T>): Functor<U>;
};
```

Now the above situation works!

```typescript
map(parseInt)(['1', '2']) // ok => [1, 2]
map(parseInt)({ foo: '1', bar :'2' }) // ok => { foo: 1, bar: 2 }
map(praseInt)(Just('1')) // ok => Just(1)
```

There is however another problem. And that is when you pass `map(fn)` as an argument to another function, like `compose`

```typescript
compose(map(parseInt));
```

The problem with the above is that typescript specifically takes [the last defined overload](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) when a function is passed as an argument in this way.

This means that `map(parseInt)` above will return whatever is defined last. So in the case above, it is `(functor: Functor<T>) => Functor<U>`.
```typescript
compose(map(parseInt))(['1', '2']); // error
compose(map(parseInt))({ foo: '1', bar: '2' }); // error
compose(map(parseInt))(new Just('1')); // ok
```

So now we're back at the original problem, but in reverse. Lets fix that

```typescript
export function map<T, U>(fn: (x: T) => U): {
  (list: readonly T[]): U[];
  (obj: Functor<T>): Functor<U>;
  <O extends Record<PropertyKey, T>>(dict: O): Record<keyof O, U>;
  (list: readonly T[]): U[];
};
```

`(list: readonly T[]): U[];` is purposely both the first and the last overload here.

```typescript
// if we only have (list: readonly T[]): U[]; as the first, `map(fn)(list)` would fail, because its expecting a Record<>
map(parseInt) // => <O extends Record<PropertyKey, T>>(dict: O) => Record<keyof O, U>

// but if we only have it as the last, `map(fn)(list)` falls into the `FunctorMap` variety when `map(parseInt)` is passed to `compose` first
compose(map(parseInt))(['1', '2']) // => FunctorMap<number> !! not number[] !!

// but when we have both
map(parseInt) // => (list: readonly string[]) => number[]
compose(map(parseInt))(['1', '2']) // => [1, 2]
```

But if `compose(map(parseInt))` now works with `list: readonly T[]`, how can we get it to work for objects and Functors?

To solve this, we can use a fairly unknown typescript technique where we can "select" what the returned function is supposed to take as an argument

```typescript
export function map<T, U>(fn: (x: T) => U): {
  (list: readonly T[]): U[];
  (obj: Functor<T>): Functor<U>;
  <O extends Record<PropertyKey, T>>(dict: O): Record<keyof O, U>;
  (list: readonly T[]): U[];
};
export function map<H extends 'o' | 'f' | 'fl', T, U>(fn: (x: T) => U): {
  // the first 4 overloads work for `map(fn)(a)` or `const mapF = map(fn); mapF(a)` usages
  // in these circumstances `a` will auto pic the correct overload
  (obj: Functor<T>): Functor<U>;
  <O extends Record<PropertyKey, T>>(dict: O): Record<keyof O, U>;
  // that doesn't work when passing the function as an argument to another function
  // this fallback takes over in that case, and lets you use the generic helper `H` to set what the expected param type needs to be
  <O extends Record<PropertyKey, T>>(functor: {
    'o': O;
    'f': Functor<T>;
  }[H extends infer H_ ? H_ : never]): {
    'o': Record<keyof O, U>;
    'f': Functor<U>;
  }[H extends infer H_ ? H_ : never];
};
```

The second overload has 3 generics, the first generic can be set to either `'o'` or `'f'` to force the return function's argument type to be one of the other options.

```typescript
// when you need the return funcs argument to be an object
map<'o', string, number>(parseInt)({ foo: '1', bar: '2' });
// or a functor
map<'f', string, number>(parseInt)(Just('1')); // Just#map
```

The one downside with this is it makes you set the other generics as well, but that's a small caveat

Now we're able to have all of the following, which covers all supported use cases by `ramda`!

```typescript
map(parseInt, ['1', '2']); // => [1, 2]
map(parseInt, { foo: '1', bar: '2' }); // => { foo: 1, bar: 2 }
map(parseInt, Just('1')); // => Just(1)

map(__, ['1', '2'])(parseInt); // => [1, 2]
map(__, { foo: '1', bar: '2' })(parseInt); // => { foo: 1, bar: 2 }
map(__, Just('1'))(parseInt); // => Just(1)

map(parseInt)(['1', '2']); // => [1, 2]
map(parseInt)({ foo: '1', bar: '2' }); // => { foo: 1, bar: 2 }
map(parseInt)(Just('1')); // => Just(1)

compose(map(parseInt))(['1', '2']); // => [1, 2]
compose(map<'o', string, number>(parseInt))({ foo: '1', bar: '2' }); // => { foo: 1, bar: 2 }
compose(map<'f', string, number>(parseInt))(Just('1')); // => Just(1)
```
