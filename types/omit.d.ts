export function omit<K extends string>(names: readonly K[]): <T extends { [Property in K]: any }>(obj: T) => Omit<T, K>;
export function omit<T, K extends keyof T>(names: K[], obj: T): Omit<T, K>;
