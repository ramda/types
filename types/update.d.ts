import { Placeholder } from './util/tools';

// update(index)
export function update(index: number): {
  // update(index)(value)(list)
  <T>(value: T): (list: readonly T[]) => T[];
  // update(index)(__, list)(value)
  <T>(__: Placeholder, list: readonly T[]): (value: T) => T[];
  // update(index)(value, list)
  <T>(value: T, list: readonly T[]): T[];
};

// update(__, value)
export function update<T>(__: Placeholder, value: T): {
  // update (__, value)(index)(list)
  (index: number): (list: readonly T[]) => T[];
  // update(__, value)(__, list)(index
  (__: Placeholder, list: readonly T[]): (index: number) => T[];
  // update(__, value)(index, list)
  (index: number, list: readonly T[]): T[];
};

// update(index, value)(list)
export function update<T>(index: number, value: T): (list: readonly T[]) => T[];

// update(__, value, list)(index)
export function update<T>(__: Placeholder, value: T, list: readonly T[]): (index: number) => T[];

// update(index, __, list)(value)
export function update<T>(index: number, __: Placeholder, list: readonly T[]): (value: T) => T[];

// update(index, value, list)
export function update<T>(index: number, value: T, list: readonly T[]): T[];
