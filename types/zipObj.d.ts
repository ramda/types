export function zipObj<K extends PropertyKey>(keys: readonly K[]): <T>(values: readonly T[]) => { [P in K]: T };
export function zipObj<T, K extends PropertyKey>(keys: readonly K[], values: readonly T[]): { [P in K]: T };

