import { Placeholder } from './util/tools';

export function take(n: number): <Collection extends readonly any[] | string>(xs: Collection) => Collection extends string ? string : Collection;
export function take(__: Placeholder, xs: string): (n: number) => string;
export function take<T>(__: Placeholder, xs: readonly T[]): (n: number) => T[];
export function take(n: number, xs: string): string;
export function take<T>(n: number, xs: readonly T[]): T[];
