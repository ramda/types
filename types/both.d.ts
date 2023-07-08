// both(f)(g) => (x: T) => boolean
export function both<T, RT1 extends T>(f: (a: T) => a is RT1): <RT2 extends T>(g: (a: T) => a is RT2) => (a: T) => a is RT1 & RT2;
export function both<Args extends any[]>(f: (...args: Args) => boolean): (g: (...args: Args) => boolean) => (...args: Args) => boolean;
// both(f, g) => (x: T) => boolean
export function both<T, RT1 extends T, RT2 extends T>(f: (a: T) => a is RT1, g: (a: T) => a is RT2): (a: T) => a is RT1 & RT2;
export function both<Args extends any[]>(f: (...args: Args) => boolean, g: (...args: Args) => boolean): (...args: Args) => boolean;
