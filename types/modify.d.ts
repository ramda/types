// modify(prop)(fn)(obj)
export function modify<K extends PropertyKey>(prop: K):<T>(fn: (value: T) => T) => <U extends Record<K, T>>(object: U) => U;

// modify(prop, fn)(obj)
export function modify<K extends PropertyKey, T>(prop: K, fn: (value: T) => T): <U extends Record<K, T>>(object: U) => U;

// modify(prop, fn, obj)
export function modify<U, K extends keyof U>(prop: K, fn: (value: U[K]) => U[K], object: U): U;
