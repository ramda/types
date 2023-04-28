# the map(fn) => (list) => U overload

Lets start by looking at the previous definition

```typescript

```

There is very unusual overload for `map(fn) => (c) => U`

The first overload is pretty self explanatory
```typescript
export function map<T, U>(fn: (x: T) => U): (list: readonly T[]) => U[];
```

This is for 90% of use-cases, when `c` is `list: readonly T[]`.

The second needs some explanation
```typescript
export function map<H extends 'o' | 'f' | 'fl', T, U>(fn: (x: T) => U): {
  // the first 4 overloads work for `map(fn)(a)` or `const mapF = map(fn); mapF(a)` usages
  // in these circumstances `a` will auto pic the correct overload
  (obj: FunctorMap<T>): FunctorMap<U>;
  (obj: FunctorFantasyLand<T>): FunctorFantasyLand<U>;
  <O extends Record<PropertyKey, T>>(dict: O): Record<keyof O, U>;
  // that doesn't work when passing the function as an argument to another function
  // this fallback takes over in that case, and lets you use the generic helper `H` to set what the expected param type needs to be
  <O extends Record<PropertyKey, T>>(functor: {
    'o': O;
    'f': FunctorMap<T>;
    'fl': FunctorFantasyLand<T>;
  }[H extends infer H_ ? H_ : never]): {
    'o': Record<keyof O, U>;
    'f': FunctorMap<U>;
    'fl': FunctorFantasyLand<U>;
  }[H extends infer H_ ? H_ : never];
};
```

This is here specifically for the use-case when you pass the result of `map(fn)` to another function, such as `compose` or `pipe`
```typescript
compose(map(fn))
```

Typescript specifically takes [the last defined overload](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) when a function is passed as an argument in this way

What that means is that if the definition was only this:
```typescript
export function map<T, U>(fn: (x: T) => U): {
  (obj: FunctorMap<T>): FunctorMap<U>;
  (obj: FunctorFantasyLand<T>): FunctorFantasyLand<U>;
  <O extends Record<PropertyKey, T>>(dict: O): Record<keyof O, U>;
}
```
Then `compose(map(fn))` would return a function that only excepted `(dict: O)`. Typescript looses the ability to correctly select the overload in the same way if you were to simply call the function after, eg `map(fn)(o)` or `map(fn)(functor)`

The solution for this is to add a special final overload
```typescript
  export function map<H extends 'o' | 'f' | 'fl', T, U>(fn: (x: T) => U): {
  // the first 4 overloads work for `map(fn)(a)` or `const mapF = map(fn); mapF(a)` usages
  // in these circumstances `a` will auto pic the correct overload
  (obj: FunctorMap<T>): FunctorMap<U>;
  (obj: FunctorFantasyLand<T>): FunctorFantasyLand<U>;
  <O extends Record<PropertyKey, T>>(dict: O): Record<keyof O, U>;
  // that doesn't work when passing the function as an argument to another function
  // this fallback takes over in that case, and lets you use the generic helper `H` to set what the expected param type needs to be
  <O extends Record<PropertyKey, T>>(functor: {
    'o': O;
    'f': FunctorMap<T>;
    'fl': FunctorFantasyLand<T>;
  }[H extends infer H_ ? H_ : never]): {
    'o': Record<keyof O, U>;
    'f': FunctorMap<U>;
    'fl': FunctorFantasyLand<U>;
  }[H extends infer H_ ? H_ : never];
};
```

What this does is is allow the user to set what `c` is in `map(fn) => (c) => U` via the generic

```typescript
// need `c` to be `Record<T, U>`?
map<'o', string, number>(parseInt)({ foo: '1', bar: '2' });
// a functor?
map<'f', T, U>(parseInt)(new Just('1')); // Just#map
// a fantasy-land functor
map<'fl', T, U>(parseInt)(new Just('1')); // Just#['fantasy-land/map']
```

Note: there is no way to automatically do both `#map` and `#['fantasy-land/map']` such that the return has the correct one. It must be manually selected
