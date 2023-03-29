export function nth<T>(n: number, list: readonly T[]): T | undefined;
export function nth(n: number, list: string): string;
export function nth(n: number): <T extends readonly any[] | string>(list: T) => (T extends Array<infer E> ? E : string) | undefined;
