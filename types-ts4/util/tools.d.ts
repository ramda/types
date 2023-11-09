/**
 * Extract the types from an array
 * Works with Tuples, eg `ElementOf<typeof ['p1', 'p2']>` => `'p1' | 'p2'`
 *
 * <created by @harris-miller>
 */
export type ElementOf<Type extends readonly any[]> = Type extends readonly (infer Values)[] ? Values : never;
