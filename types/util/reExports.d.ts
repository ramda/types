//
// If typescript `tsc` when building declaration files cannot access deep type reference, you get a opaque error
// This in particular will happen with pnpm if no hoisting is applying to the packages for types utilizing the
// the `ts-toolbelt` types package
// Re-exporting those types here makes those directly accessible to the consumer, fixing the issue
//

export type { Curry } from 'ts-toolbelt/out/Function/Curry';
export type { Take } from 'ts-toolbelt/out/List/Take';
export type { Flatten } from 'ts-toolbelt/out/List/Flatten';
export type { Merge } from 'ts-toolbelt/out/List/Merge';
export type { Assign } from 'ts-toolbelt/out/Object/Assign';
export type { Parameters } from 'ts-toolbelt/out/Function/Parameters';
export type { UnNest } from 'ts-toolbelt/out/List/UnNest';
export type { Narrow } from 'ts-toolbelt/out/Function/Narrow';
export type { ZipObj } from 'ts-toolbelt/out/List/ZipObj';
export type { x } from 'ts-toolbelt/out/Any/x';
export type { Primitive } from 'ts-toolbelt/out/Misc/Primitive';
