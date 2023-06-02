import { Placeholder } from './util/tools';

// swap(indexA, indexB, list)
export function swap<T>(indexA: number, indexB: number, list: readonly T[]): T[];
// swap(indexA, indexB)(list)
export function swap<T>(indexA: number, indexB: number): (list: readonly T[]) => T[];
// swap(indexA)
export function swap(indexA: number): {
  // swap(indexA)(indexB, list)
  <T>(indexB: number, list: readonly T[]): T[];
  // swap(indexA)(__, list)(indexB)
  <T>(__: Placeholder, list: readonly T[]): (indexB: number) => T[];
  // swap(indexA)(indexB)(list)
  <T>(indexB: number): (list: readonly T[]) => T[];
};

// swap(__, indexB, list)(indexA)
export function swap<T>(
  __: Placeholder,
  indexB: number,
  list: readonly T[]
): (indexA: number) => T[];
// swap(indexA, __, list)(indexB)
export function swap<T>(
  indexA: number,
  __: Placeholder,
  list: readonly T[]
): (indexB: number) => T[];
// swap(__, __, list)
export function swap<T>(
  __: Placeholder,
  __2: Placeholder,
  list: readonly T[]
): {
  // swap(__, __, list)(indexA, indexB)
  (indexA: number, indexB: number): T[];
  // swap(__, __, list)(__, indexB)(indexA)
  (__3: Placeholder, indexB: number): (indexA: number) => T[];
  // swap(__, __, list)(indexA)(indexB)
  (indexA: number): (indexB: number) => T[];
};
