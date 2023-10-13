import { Placeholder } from './util/tools';

export function takeLast(n: number): <Collection extends readonly any[] | string>(xs: Collection) => Collection extends string ? string : Collection;
export function takeLast(__: Placeholder, xs: string): (n: number) => string;
export function takeLast<T>(__: Placeholder, xs: readonly T[]): (n: number) => T[];
export function takeLast(n: number, xs: string): string;
export function takeLast<T>(n: number, xs: readonly T[]): T[];

