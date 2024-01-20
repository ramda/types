import { ElementOf } from './util/tools';

export function pick<const Keys extends readonly PropertyKey[]>(names: Keys): <U extends Partial<Record<ElementOf<Keys>, any>>>(obj: ElementOf<Keys> extends keyof U ? U : never) => ElementOf<Keys> extends keyof U ? Pick<U, ElementOf<Keys>> : never;
export function pick<U, Keys extends keyof U>(names: readonly Keys[], obj: U): Pick<U, Keys>;
