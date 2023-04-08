export { Placeholder } from './util/tools';

// Since typescript doesn't support Higher Kinded Types, it's virtually impossible to type sequence
// Having some sort of type definition is need at least because
export function sequence<T, F, T>(of: (a: T) => F, traversable: T[]): F[];
