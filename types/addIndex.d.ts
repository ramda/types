import { AddIndex } from './util/tools';

// with `addIndex<P, V>`, the `P` and `V` are just used to to constrain `fn` being passed to `addIndex`
// allowing the return of the correct type
// those returning types need their own generics `T` and `U` to be separately determined
// when those contracts are fulfilled, otherwise you just get `undefined` everywhere

// WARNING, map MUST come before forEach for this to work! Overloading order is important!

// Special case for map
export const addIndex: AddIndex;
