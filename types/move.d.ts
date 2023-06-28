export function move(from: number): {
  (to: number): <T>(list: readonly T[]) => T[];
  <T>(to: number, list: readonly T[]): T[];
};
export function move(from: number, to: number): <T>(list: readonly T[]) => T[];
export function move<T>(from: number, to: number, list: readonly T[]): T[];
