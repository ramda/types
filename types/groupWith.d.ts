export function groupWith<T>(fn: (a: T, b: T) => boolean): {
  (list: string): string[];
  (list: readonly T[]): T[][];
};
export function groupWith<T>(fn: (a: T, b: T) => boolean, list: string): string[];
export function groupWith<T>(fn: (a: T, b: T) => boolean, list: readonly T[]): T[][];
