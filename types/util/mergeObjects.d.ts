import { A, M } from 'ts-toolbelt';

type KeyOfBoth<L extends object, R extends Object, K extends (keyof (L & R))> = K extends keyof L ? K extends keyof R ? 1 : 0 : 0;
type TakeRightToLeft<L extends object, R extends Object, K extends (keyof (L & R))> = K extends keyof R ? R[K] : (K extends keyof L ? L[K] : never);
type AreBothObject<L extends any, R extends any> = L extends object ? R extends object ? 1 : 0 : 0;
type IsPrimitive<T> = T extends M.Primitive ? 1 : 0;
type AllValuesPrimitives<U extends object> = IsPrimitive<U[keyof U]>;

/**
 * Takes the Lowest Common Denominator Type, right preferential
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
 */
type LCDT<L, R> = (<L extends R>(v: L) => L) extends (<L extends R>(v: L) => infer N) ? N extends L ? L
  : (L extends string ? N extends string ? L | N : N : (L extends number ? N extends number ? L | N : N : (L extends boolean ? N extends boolean ? L | N : N : N)))
  : R;

/**
 * MergeObjects
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
// export type MergeObjects<L extends object, R extends object> = {
//   0: _MergeObjects<L, R>,
//   1: R
// }[A.Extends<R, L>];
export type MergeObjects<L extends object, R extends object> = {
  [K in (keyof (L & R))]: {
    0: TakeRightToLeft<L, R, K>;
    // @ts-ignore
    1: LCDT<L[K], R[K]>
  }[KeyOfBoth<L, R, K>];
};

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
