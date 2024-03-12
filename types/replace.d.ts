import { Placeholder } from './util/tools';

// replace(pattern)
export function replace(pattern: RegExp | string): {
  // replace(pattern)(replacement)(str)
  (replacement: string | ((match: string, ...args: readonly any[]) => string)): (str: string) => string;
  // replace(pattern)(__, str)(replacement)
  (__: Placeholder, str: string): (replacement: string | ((match: string, ...args: readonly any[]) => string)) => string;
  // replace(pattern)(replacement, str)
  (replacement: string | ((match: string, ...args: readonly any[]) => string), str: string): string;
};

// replace(__, replacement)
export function replace(__: Placeholder, replacement: string | ((match: string, ...args: readonly any[]) => string)): {
  // replace(__, replacement)(pattern)(str)
  (pattern: RegExp | string): (str: string) => string;
  // replace(__, replacement)(__, str)(pattern)
  (__: Placeholder, str: string): (pattern: RegExp | string) => string;
  // replace(__, replacement)(pattern, str)
  (pattern: RegExp | string, str: string): string;
};

// replace(pattern, replacement)(str)
export function replace(pattern: RegExp | string, replacement: string | ((match: string, ...args: readonly any[]) => string)): (str: string) => string;

// replace(__, __, str)
export function replace(__: Placeholder, __: Placeholder, str: string): {
  // replace(__, __, str)(pattern)(replacement)
  (pattern: RegExp | string): (replacement: string | ((match: string, ...args: readonly any[]) => string)) => string;
  // replace(__, __, str)(__, replacement)(pattern)
  (__: Placeholder, replacement: string | ((match: string, ...args: readonly any[]) => string)): (pattern: RegExp | string) => string;
  // replace(__, __, str)(pattern, replacement)
  (pattern: RegExp | string, replacement: string | ((match: string, ...args: readonly any[]) => string)): string;
};

// replace(__, replacement, str)(pattern)
export function replace(
  __: Placeholder,
  replacement: string | ((match: string, ...args: readonly any[]) => string),
  str: string
): (pattern: RegExp | string) => string;

// replace(pattern, __, str)
export function replace(
  pattern: RegExp | string,
  __: Placeholder,
  str: string,
): (replacement: string | ((match: string, ...args: readonly any[]) => string)) => string;

// replace(pattern, replacement, str)
export function replace(
  pattern: RegExp | string,
  replacement: string | ((match: string, ...args: readonly any[]) => string),
  str: string,
): string;
