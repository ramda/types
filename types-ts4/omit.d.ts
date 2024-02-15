// this import will not work here but does in the build
import { ElementOf } from './util/tools';

export function omit<Keys extends readonly PropertyKey[]>(names: Keys): <U extends Partial<Record<ElementOf<Keys>, any>>>(obj: ElementOf<Keys> extends keyof U ? U : never) => ElementOf<Keys> extends keyof U ? Omit<U, ElementOf<Keys>> : never;
export function omit<U, Keys extends keyof U>(names: readonly Keys[], obj: U): Omit<U, Keys>;
