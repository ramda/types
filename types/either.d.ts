export function either<Fn extends (...args: any[]) => boolean>(f: Fn): (g: Fn) => Fn;
export function either<Fn extends (...args: any[]) => boolean>(f: Fn, g: Fn): Fn;
