export function uncurryN<T>(len: number, fn: (a: any) => any): (...args: unknown[]) => T;
export function uncurryN<T>(len: number): (fn: (a: any) => any) => (...args: unknown[]) => T;
