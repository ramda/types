export function dropLast<T>(n: number): {
  (xs: string): string;
  (xs: readonly T[]): T[];
};
export function dropLast<T>(n: number, xs: readonly T[]): T[];
export function dropLast(n: number, xs: string): string;
