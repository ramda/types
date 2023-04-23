import { Placeholder } from './util/tools';

export function forEach<T>(fn: (x: T) => void, list: T[]): T[];
export function forEach<T>(fn: (x: T) => void, list: readonly T[]): readonly T[];
export function forEach<T>(__: Placeholder, list: T[]): (fn: (x: T) => void) => T[];
export function forEach<T>(__: Placeholder, list: readonly T[]): (fn: (x: T) => void) => readonly T[];
export function forEach<T>(fn: (x: T) => void): {
  (list: T[]): T[];
  (list: readonly T[]): readonly T[];
};
