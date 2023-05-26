import { A, M } from 'ts-toolbelt';

// Here lies a loose collection of tools that compute types for the functions in "index.d.ts"
// The goal of this file is to keep "index.d.ts" readable as well as hiding implementations

// WHEN ADDING A NEW TOOL
// - Add documentation for the tool you've created
// - Add <created by @username> on your tool's docs

// TODO
// - Types need proper descriptions, so that we know what they do

/**
 * Array of functions to compose/pipe with.
 */
export type AtLeastOneFunctionsFlow<TArgs extends any[], TResult> =
    | [(...args: TArgs) => any, ...Array<(args: any) => any>, (...args: any[]) => TResult]
    | [(...args: TArgs) => TResult];
export type AtLeastOneFunctionsFlowFromRightToLeft<TArgs extends any[], TResult> =
    | [(...args: any) => TResult, ...Array<(args: any) => any>, (...args: TArgs) => any]
    | [(...args: TArgs) => TResult];

/**
 * R.cond's [predicate, transform] pair.
 */
export type CondPair<T extends any[], R> = [(...val: T) => boolean, (...val: T) => R];

/**
 * R.cond's [predicate, transform] pair in a typeguarded version
 */
export type CondPairTypeguard<T, TFiltered extends T, R> = [(value: T) => value is TFiltered, (value: TFiltered) => R];

/**
 * A conditional type to use with default values. (defaultTo, propOr, etc)
 * <created by @lax4mike>
 */
export type DefaultTo<Fallback, Value> = (Value extends (null | undefined) ? Fallback | Exclude<Value, null | undefined> : Value);

/**
 * Represents all objects evolvable with Evolver E
 * @param E
 */
export type Evolvable<E extends Evolver> = {
  [P in keyof E]?: Evolved<E[P]>;
};

/**
 * <needs description>
 * @param O
 * @param E
 */
export type Evolve<O extends Evolvable<E>, E extends Evolver> = {
  [P in keyof O]: P extends keyof E ? EvolveValue<O[P], E[P]> : O[P];
};

/**
 * <needs description>
 * @param A
 */
type Evolved<A> = A extends (value: infer V) => any ? V : A extends Evolver ? Evolvable<A> : never;

/**
 * A set of transformation to run as part of an evolve
 * @param T - the type to be evolved
 */
export type Evolver<T extends Evolvable<any> = any> = {
  // if T[K] isn't evolvable, don't allow nesting for that property
  [key in keyof Partial<T>]: ((value: T[key]) => T[key]) | (T[key] extends Evolvable<any> ? Evolver<T[key]> : never);
};

/**
 * <needs description>
 * @param O
 * @param E
 */
type EvolveNestedValue<O, E extends Evolver> = O extends object
  ? O extends Evolvable<E>
    ? Evolve<O, E>
    : never
  : never;

/**
 * <needs description>
 * @param V
 * @param E
 */
type EvolveValue<V, E> = E extends (value: V) => any
  ? ReturnType<E>
  : E extends Evolver
    ? EvolveNestedValue<V, E>
    : never;

/**
 * All falsy JavaScript values representable by the type system.
 *
 * @note Actually there are six (seven) falsy values in JS - the sixth being `NaN`;
 * the seventh being `document.all`. However `NaN` is not a valid literal type,
 * and `document.all` is an object so it's probably not a good idea to add it either.
 */
export type Falsy = undefined | null | 0 | '' | false;

/**
 * A functor satisfying the FantasyLand spec
 * @param A
 */
export type Functor<A> =
    | { ['fantasy-land/map']: <B>(fn: (a: A) => B) => Functor<B>; [key: string]: any }
    | { map: <B>(fn: (a: A) => B) => Functor<B>; [key: string]: any };

/**
 * A Functor - a simple type representing a Functor that used `map` is the method prop name
 */
export type FunctorMap<A> = {
  map<B>(fn: (a: A) => B): FunctorMap<B>;
};

/**
 * A FantasyLand Functor - a simple type representing a Functor wiih the fantasy-land specific prop name
 */
export type FunctorFantasyLand<A> = {
  ['fantasy-land/map']<B>(fn: (a: A) => B): FunctorFantasyLand<B>;
};

/**
 * R.any dispatches to `.any` of the second argument, if present.
 * This type infers the type of the first argument of that method and returns it
 */
export type InferAnyAType<T> = T extends { any: (fn: (a: infer A) => boolean) => boolean } ? A : never;

/**
 * A pair containing the key and corresponding value of an object.
 * @param K Key type
 * @param V Value type
 */
export type KeyValuePair<K, V> = [K, V];

/**
 * <needs description>
 * @param S Type of the full object
 * @param A Type of the lens focus
 */
export type Lens<S, A> = (functorFactory: (a: A) => Functor<A>) => (s: S) => Functor<S>;

/**
 * Returns true if T1 array length less than or equal to length of array T2, else returns false
 *
 * @param T1 First readonly array
 * @param T2 Second readonly array
 *
 * <created by @valerii15298>
 */
type Arr1LessThanOrEqual<
  T1 extends ReadonlyArray<any>,
  T2 extends ReadonlyArray<any>
> = T1['length'] extends T2['length']
  ? true
  : T2['length'] extends 0
    ? false
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    : T2 extends readonly [infer First, ...infer Rest]
      ? Arr1LessThanOrEqual<T1, Rest>
      : never;

/**
 * R.all dispatches to `.all` of the second argument, if present.
 * This type infers the type of the first argument of that method and returns it
 */
export type InferAllAType<T> = T extends { all: (fn: (a: infer A) => boolean) => boolean } ? A : never;

/**
 * Return true if types T1 and T2 can intersect, e.g. both are primitives or both are objects.
 * Taking into account branded types too.
 *
 * @param T1 First readonly array
 * @param T2 Second readonly array
 *
 * <created by @valerii15298>
 */
type Intersectable<T1, T2> = [T1] extends [T2]
  ? true
  : [T2] extends [T1]
    ? true
    : [T1] extends [object]
      ? [T2] extends [object]
        ? true
        : false
      : [T1] extends [M.Primitive]
        ? [T2] extends [M.Primitive]
          ? true
          : false
        : false;

/**
 * Check if type `T` is `any`
 *
 * @param T Type to check
 *
 * <created by @valerii15298>
 */
type IsAny<T> = 0 extends 1 & T ? true : false;

/**
 * Intersection when produced result can be usable type.
 * For example type `{a: any} & number` will not be reduced to `never`
 *  but `Intersection<{a: any}, number>` will be `never`
 * If one of type is any, another type will be returned.
 *
 * @param T1
 * @param T2
 *
 * <created by @valerii15298>
 */
type Intersection<T1, T2> = Intersectable<T1, T2> extends true
  ? IsAny<T1> extends true
    ? T2
    : IsAny<T2> extends true
      ? T1
      : T1 & T2
  : never;

/**
 * Merge second array with first one,
 * resulting array will have the same length as array T1,
 * every item in new array will be item from first array(T1) by corresponding index
 * intersected with item from second array(also with the same index) if such exist
 *
 * examples:
 *   `mergeArrWithLeft<[1, number, number, string], [number, 2, 7]>` => `[1, 2, 7, string]`
 *   `mergeArrWithLeft<[1, string], [number, "exact text", number, any]>` => `[1, "exact text"]`
 *
 * @param T1
 * @param T2
 *
 * <created by @valerii15298>
 */
export type mergeArrWithLeft<T1 extends ReadonlyArray<any>, T2 extends ReadonlyArray<any>> = readonly [
  ...{
    readonly [Index in keyof T1]: Index extends keyof T2 ? Intersection<T1[Index], T2[Index]> : T1[Index];
  }
];

/**
 * The same as mergeArrWithLeft but will merge smaller array to larger one,
 * so that data will not be lost and maximum length array will be returned
 *
 * example: MergeArrays<[1, number], [number, 2, string]>
 *   will result to => [1, 2, string]
 *
 * @param T1
 * @param T2
 *
 * <created by @valerii15298>
 */
type MergeArrays<T1 extends ReadonlyArray<any>, T2 extends ReadonlyArray<any>> = Arr1LessThanOrEqual<
T1,
T2
> extends true
  ? mergeArrWithLeft<T2, T1>
  : mergeArrWithLeft<T1, T2>;

/**
 * Given array of functions will return new array which will be constructed
 * merging all functions parameters array using mergeArrays generic.
 *
 * If provided array is not array of functions, return type will be empty array([])
 *
 * @param T Array of functions
 *
 * <created by @valerii15298>
 */
export type LargestArgumentsList<T extends ReadonlyArray<any>> = T extends readonly [
  (...args: infer Args) => any,
  ...infer Rest
]
  ? MergeArrays<LargestArgumentsList<Rest>, Args>
  : readonly [];

/**
 * Checks if type is `never`
 *
 * Returns `true` if type is `never`, else returns `false`
 *
 * @param T Type to check
 *
 * <created by @valerii15298>
 */
type IsNever<T> = [T] extends [never] ? true : false;

/**
 * Checks if array of types is contains `never` type
 *
 * Returns `true` if array contains `never` type, else returns `false`
 *
 * @param T Array of types to check
 *
 * <created by @valerii15298>
 */
type HasNever<T extends readonly any[]> = T extends readonly [infer First, ...infer Rest]
  ? IsNever<First> extends true
    ? true
    : HasNever<Rest>
  : false;

/**
 * Checks if corresponding types of arguments in functions overlap(have at least one type in common, except never)
 *
 * Returns `unknown` if arguments types overlap, else returns `ErrorMsg`
 *
 * @param T Type to check
 *
 * <created by @valerii15298>
 */
export type IfFunctionsArgumentsDoNotOverlap<T extends ReadonlyArray<Fn>, ErrorMsg extends string> = HasNever<
LargestArgumentsList<T>
> extends true
  ? ErrorMsg
  : unknown;

/**
 * Predicate for an object containing the key.
 */
export type ObjPred<T = unknown> = (value: any, key: unknown extends T ? string : keyof T) => boolean;

/**
 * Values that can be compared using the relational operators `<`/`<=`/`>`/`>=`
 */
export type Ord = number | string | boolean | Date;

/**
 * `a` is less than `b`
 */
export type LT = -1;
/**
 * `a` is equal to `b`
 */
export type EQ = 0;
/**
 * `a` is greater than `b`
 */
export type GT = 1;

/**
 * Represents two values' order
 */
export type Ordering = LT | EQ | GT;

/**
 * An object with at least one of its properties beeing of type `Key`.
 *
 * @example
 * ```
 * // $ExpectType { foo: unknown } | { bar: unknown }
 * type Foo = ObjectHavingSome<"foo" | "bar">
 * ```
 */
// Implementation taken from
// https://github.com/piotrwitek/utility-types/blob/df2502ef504c4ba8bd9de81a45baef112b7921d0/src/mapped-types.ts#L351-L362
export type ObjectHavingSome<Key extends string> = {
  [K in Key]: { [P in K]: unknown };
}[Key];

/**
 * Composition of `Partial` and `Record` types
 */
export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

/**
 * <needs description>
 */
export type Path = Array<number | string>;

/**
 * A placeholder used to skip parameters, instead adding a parameter to the returned function.
 */
export type Placeholder = A.x & { '@@functional/placeholder': true };

/**
 * Takes a lists of arguments and returns either `true` or `false`.
 *
 * Classical predicates only take one argument, but since ramda
 * supports multiple arguments, we also use them like that.
 *
 * Note that these predicates, don't represent typeguards,
 * meaning when this type is used, we can't get type narrowing.
 *
 * @see {@link PredTypeguard} for the typeguard version of this.
 */
export type Pred<T extends any[] = any[]> = (...a: T) => boolean;

/**
 * Takes an argument and returns either `true` or `false`.
 *
 * This is usually used as an overload before {@link Pred}.
 * If you would this type alone, the function would **required**
 * to be a typeguard, meaning a simple function just returning
 * a `boolean` wouldn't satisfy this constrain.
 */
export type PredTypeguard<T, TTypeguarded extends T> = (a: T) => a is TTypeguarded;

/**
 * A runtime-branded value used to stop `reduce` and `transduce` early.
 * @param A The type of the contained value
 */
export interface Reduced<A> {
  '@@transducer/value': A;
  '@@transducer/reduced': true;
}

/**
 * A type representing any function. Useful as a generic constraint.
 */
export type Fn = (...args: any[]) => unknown;

/**
 * Converts an array of functions to an array of their return types.
 * @param A The array of functions
 */
export type ReturnTypesOfFns<A extends ReadonlyArray<Fn>> = A extends readonly [(...args: any[]) => infer H, ...infer R]
  ? R extends readonly Fn[]
    ? readonly [H, ...ReturnTypesOfFns<R>]
    : readonly []
  : readonly [];

/**
 * Converts an array of functions taking a single parameter to an array of their parameter types.
 * @param A The array of functions
 */
export type InputTypesOfFns<A extends ReadonlyArray<Fn>> = A extends [infer H, ...infer R]
  ? H extends Fn
    ? R extends Fn[]
      ? [Parameters<H>[0], ...InputTypesOfFns<R>]
      : []
    : []
  : [];

/**
 * If `T` is a union, `T[keyof T]` (cf. `map` and `values` in `index.d.ts`) contains the types of object values that are common across the union (i.e., an intersection).
 * Because we want to include the types of all values, including those that occur in some, but not all members of the union, we first define `ValueOfUnion`.
 * @see https://stackoverflow.com/a/60085683
 * @param T The (possible) union
 */
export type ValueOfUnion<T> = T extends infer U ? U[keyof U] : never;

/**
 * Take first `N` types of an Tuple
 * @param N Length of prefix to take
 * @param Tuple Input tuple type
 */
export type Take<
  N extends number,
  Tuple extends any[],
  ReturnTuple extends any[] = []
> = ReturnTuple['length'] extends N
  ? ReturnTuple
  : Tuple extends [infer X, ...infer Xs]
    ? Take<N, Xs, [...ReturnTuple, X]>
    : never;

/**
 * A homogeneous tuple of length `N`.
 * @param T Type of every element of the tuple
 * @param N Length of the tuple
 */
export type Tuple<T, N extends number> = N extends N ? (number extends N ? T[] : _TupleOf<T, N, []>) : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;

/**
 * Map tuple of ordinary type to tuple of array type
 * [string, number] -> [string[], number[]]
 */
export type ToTupleOfArray<Tuple extends any[]> = Tuple extends []
  ? []
  : Tuple extends [infer X, ...infer Xs]
    ? [X[], ...ToTupleOfArray<Xs>]
    : never;

/**
 * Map tuple of ordinary type to tuple of function type
 * @param R Parameter type of every function
 * @param Tuple Return type of every function
 */
export type ToTupleOfFunction<R, Tuple extends any[]> = Tuple extends []
  ? []
  : Tuple extends [infer X, ...infer Xs]
    ? [(arg: R) => X, ...ToTupleOfFunction<R, Xs>]
    : never;

/**
 * Getter of property from any value. Supports objects, arrays, tuples and maybe values
 *
 * @param T Value type
 * @param P Maybe key type
 *
 * @example
 * ```typescript
 * type K = Prop<{ x: number } | undefined, 'x'>
 * type L = Prop<[1, ...string[]] | undefined, 0>
 * type M = Prop<[1, ...string[]] | undefined, 1>
 * ```
 *
 * <created by @anion155>
 */
export type Prop<T, P extends keyof never> = P extends keyof Exclude<T, undefined>
  ? T extends undefined ? undefined : T[Extract<P, keyof T>]
  : undefined;

/**
 * Recursively Update a deep property from a given path
 *
 * @param Keys array of keeps into the object
 * @param U The object to change
 * @param T the next type at the key path
 *
 * <created by @harris-miller>
 */
export type DeepModify<Keys extends readonly PropertyKey[], U, T> =
  Keys extends [infer K, ...infer Rest]
    ? K extends keyof U
      ? Rest extends readonly []
        ? Omit<U, K> & Record<K, T>
        : Rest extends readonly PropertyKey[]
          ? Omit<U, K> & Record<K, DeepModify<Rest, U[K], T>>
          : never
      : never
    : never;

/**
 * When you have `gt = <T extends Ord>(a: T, b: T) => boolean`, `a` and `b` are different strings, and `T` defaults to `string
 * However, `gt = <T extends Ord>(a: T) => (b: T) => boolean`, because `a` is evaluated without `b`, `T` is the literal of `a`
 * `WidenLiteral` exists to go from a literal type to its base type, eg
 * * `"foobar"` -> `string`
 * * `1` -> `number`
 * * `true` -> `boolean
 * @see https://stackoverflow.com/a/56333836/10107466
 *
 * <created by @harris-miller>
 */
export type WidenLiterals<T> =
  T extends boolean
    ? boolean
    : T extends string
      ? string
      : T extends number
        ? number
        : T;

type KeyOfBoth<L extends object, R extends Object, K extends (keyof (L & R))> = K extends keyof L ? K extends keyof R ? 1 : 0 : 0;
type TakeRightToLeft<L extends object, R extends Object, K extends (keyof (L & R))> = K extends keyof R ? R[K] : (K extends keyof L ? L[K] : never);
type AreBothObject<L extends any, R extends any> = L extends object ? R extends object ? 1 : 0 : 0;
type IsPrimitive<T> = T extends M.Primitive ? 1 : 0;
type AllValuesPrimitives<U extends object> = IsPrimitive<U[keyof U]>;

/**
 * LCDT (Lowest Common Denominator Type)
 *
 * Right preferential
 *
 * When the types are different, the right is always taken, eg
 * ```typescript
 * LCDT<string, number>; // number
 * LCDT<number, string>; // string
 * ```
 *
 * The important part happens when one types extends the other, but not the other way around.
 * This is to say that all squares are rectangles but not all rectangles are squares
 * ```typescript
 * LCDT<'a', string>; // string
 * LCDT<string, 'a'>; // string
 * ```
 * Also works with unions
 * ```typescript
 * LCDT<'a', 'a' | 'b'>; // 'a' | 'b'
 * LCDT<'a' | 'b', 'a'>; // 'a' | 'b'
 * LCDT<'a', 'b'>; // 'a' | 'b'
 * LCDT<'b', 'a'>; // 'b' | 'a'
 * ```
 *
 * Note:
 * You'd think that `type LCDT<L, R> = L extends R ? (R extends L ? L : R) : R;` works, but it doesn't
 * You have to re-infer R via `infer N` using this weird function syntax
 *
 * <created by @harris-miller>
 */
type LCDT<L, R> = (<L extends R>(v: L) => L) extends (<L extends R>(v: L) => infer N) ? N extends L ? L
  : (L extends string ? N extends string ? L | N : N : (L extends number ? N extends number ? L | N : N : (L extends boolean ? N extends boolean ? L | N : N : N)))
  : R;

export type _MergeObjects<L extends object, R extends object> = {
  [K in (keyof (L & R))]: {
    0: TakeRightToLeft<L, R, K>;
    // @ts-ignore
    1: LCDT<L[K], R[K]>
  }[KeyOfBoth<L, R, K>];
};


/**
 * MergeObjects
 *
 * A better collapse of types for Merging Two Objects
 * MergeRight is just Object.assign in code, and MergeLeft is just MergeRight with the operands flipped
 * What this Type does is better collapse the types together
 * eg
 * ```typescript
 * type Foo = { foo: string };
 * type Foobar = { foo: string; bar: string };
 *
 * Object.assign({}, {} as Foobar, {} as Foo); // Foobar & bar, a redundant intersection
 * mergeRight({} as Foobar, {} as Foo); // Foobar, since Foobar extends Foobar
 * mergeRight({} as Foobar, {} as Foo); // also Foobar, because regardless of the direction you merge, one type extends the other
 * ```
 *
 * <created by @harris-miller>
 */
export type MergeObjects<L extends object, R extends object> = {
  0: _MergeDeepObjects<L, R>,
  1: L
}[A.Extends<L, R>];

// first we text if all the values in both `L` and `R`, if true, defer to `MergeObjects` (see last line), otherwise...
export type _MergeDeepObjects<L extends object, R extends object> = [AllValuesPrimitives<L> & AllValuesPrimitives<R>] extends [0 | never] ? {
  // for all keys in both `L` and `R`
  [K in (keyof (L & R))]: {
    // if both keys exists
    1: {
      // merge them if they are both objects
      // @ts-ignore - typescript doesn't know `L[K]` and `R[K]` are both `object`, but `AreBothObject` guarantees that
      1: MergeDeepObjects<L[K], R[K]>;
      // otherwise  take the LCDT (see def above)
      // @ts-ignore - typescript don't know that `K` is both `keyof R` and `keyof L`, but `KeyOfBoth` guarantees that
      0: LCDT<L[K], R[K]>;
      // @ts-ignore - typescript don't know that `K` is both `keyof R` and `keyof L`, but `KeyOfBoth` guarantees that
    }[AreBothObject<L[K], R[K]>];
    // if key only exists on one of the objects, try taking the `R` value, then the `L`
    0: TakeRightToLeft<L, R, K>;
  }[KeyOfBoth<L, R, K>];
} : MergeObjects<L, R>;

/**
 * Deep version of MergeObjects
 *
 * <created by @harris-miller>
 */
export type MergeDeepObjects<L extends object, R extends object> = {
  0: _MergeDeepObjects<L, R>,
  1: L
}[A.Extends<L, R>];

