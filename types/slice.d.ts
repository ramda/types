export function slice(a: number): {
  (b: number, list: string): string;
  <T>(b: number, list: readonly T[]): T[];
};
export function slice(
  a: number,
  b: number,
): {
  (list: string): string;
  <T>(list: readonly T[]): T[];
};
export function slice(a: number, b: number, list: string): string;
export function slice<T>(a: number, b: number, list: readonly T[]): T[];
