// both(f)(g) => (x: T) => boolean
export function both<T, RT1 extends T>(f: (a: T) => a is RT1): <RT2 extends T>(g: (b: T) => b is RT2) => (x: T) => RT1 & RT2;
export function both<T>(f: (a: T) => boolean): (g: (b: T) => boolean) => (x: T) => boolean;
// both(f, g) => (x: T) => boolean
export function both<T, RT1 extends T, RT2 extends T>(f: (a: T) => a is RT1, g: (b: T) => b is RT2): (x: T) => RT1 & RT2;
export function both<T>(f: (a: T) => boolean, g: (b: T) => boolean): (x: T) => boolean;
