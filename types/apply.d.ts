import { Placeholder } from './util/tools';

// apply(args)(fn)
export function apply<F extends (...args: readonly any[]) => any>(fn: F): (args: Parameters<F>) => ReturnType<F>;
// apply(args, fn)
// overload Placeholder options with versions for 1-to-5 args for best constraining
export function apply<A extends readonly [any]>(__: Placeholder, args: A): <F extends (...args: A) => any>(fn: F) => ReturnType<F>;
export function apply<A extends readonly [any, any]>(__: Placeholder, args: A): <F extends (...args: A) => any>(fn: F) => ReturnType<F>;
export function apply<A extends readonly [any, any, any]>(__: Placeholder, args: A): <F extends (...args: A) => any>(fn: F) => ReturnType<F>;
export function apply<A extends readonly [any, any, any, any]>(__: Placeholder, args: A): <F extends (...args: A) => any>(fn: F) => ReturnType<F>;
export function apply<A extends readonly [any, any, any, any, any]>(__: Placeholder, args: A): <F extends (...args: A) => any>(fn: F) => ReturnType<F>;
export function apply<A extends readonly any[]>(__: Placeholder, args: A): <F extends (...args: A) => any>(fn: F) => ReturnType<F>;
// apply(args, fn)
export function apply<F extends (...args: readonly any[]) => any>(fn: F, args: Parameters<F>): ReturnType<F>;
