import { Placeholder } from './util/tools';

// `string extends keyof U` is true only for `Record<string, T>`, where the keys are not known, something that still needs to be supported
export function dissoc<K extends PropertyKey>(prop: K extends Placeholder ? never : K): <U extends { [P in K]?: any}>(obj: string extends keyof U ? U : undefined extends U[K] ? U : never) => U;
export function dissoc<U>(__: Placeholder, obj: U): <K extends keyof U>(prop: string extends keyof U ? K : undefined extends U[K] ? K : never) => U;
export function dissoc<U, K extends keyof U>(prop: string extends keyof U ? K : undefined extends U[K] ? K : never, obj: U): U;
