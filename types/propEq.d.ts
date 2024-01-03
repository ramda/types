// propEq(val)
export function propEq<const T>(val: T): {
  // propEq(val)(name)(obj)
  <K extends PropertyKey>(name: K): <U extends Partial<Record<K, any>>>(obj: Required<U> extends Record<K, any> ? T extends U[K] ? U : never : never) => boolean;
  // propEq(val)(name, obj)
  // type it this way for better error message for unknown keys
  <K extends keyof U, U extends Partial<Record<K, any>>>(name: K, obj: Required<U> extends Record<K, any> ? T extends U[K] ? U : never : never): boolean;
};
// propEq(val, name)(obj)
export function propEq<const T, K extends PropertyKey>(val: T, name: K): <U extends Partial<Record<K, any>>>(obj: Required<U> extends Record<K, any> ? T extends U[K] ? U : never : never) => boolean;
// propEq(val, name, obj)
export function propEq<K extends keyof U, U>(val: U[K], name: K, obj: U): boolean;
