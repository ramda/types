import { Placeholder } from './util/tools';

// `val as P` is for type narrowing
// must have a `boolean` option as well for if predicate does not narrow
// see for details:
// https://www.typescriptlang.org/play?#code/C4TwDgpgBAysBOBLAdgcwPLwHIFcC2ARhPFALxQDOCKqUAPlMvkfANwCwAUFwMYD2yKlEQU4SNGSgAKAG4BDADYAuWNTSZchYgEoV8hcIqU1tUgD4ooSHwBmUfWVLkA5FXGpnHTv0HBDmlklZRRUxGg1mHT1FQ0ZIknNLcAhbexinFyYteE9eASERADFFChAg-VCTCOzdKAI+PgUIOWQyCwBCdv0vLgATCB4FOXhoGxxkHmBEASgbRAVgYgAeABUAGigABSgIAA9F5F6jFbMpMBHelWDlKBXtNrSDES2NhRFgFRG5XoEFMpWANoAXVqm2BXn6g2Go3Gk2mrTmC2WJzOFyuFVu90S9UazWQr3en2aP2Qf1uwNqgKBPW8+T8byolXc1RYwMkAIADBtnM4NgBGblyXlQABM3IIzmpXDyvig8D5kkRi3gUhEYTQBKo2i8AHodVADVAAHoAfhlQngIsV82VqooAWImuA2q4esNxrNtNl8AAzNakSqiiUQE6XZw3YbTVwgA
export function filter<T, P extends T>(pred: (val: T) => val is P, list: readonly T[]): P[];
export function filter<T>(pred: (val: T) => boolean, list: readonly T[]): T[];
export function filter<T, P extends T>(pred: (val: T) => val is P, dict: Record<string, T>): Record<string, P>;
export function filter<T>(pred: (val: T) => boolean, dict: Record<string, T>): Record<string, T>;

export function filter<T>(__: Placeholder, list: readonly T[]): <P extends T>(pred: (val: T) => val is P) => P[];
export function filter<T>(__: Placeholder, list: readonly T[]): (pred: (val: T) => boolean) => T[];
export function filter<T>(__: Placeholder, dict: Record<string, T>): <P extends T>(pred: (val: T) => val is P) => Record<string, P>;
export function filter<T>(__: Placeholder, dict: Record<string, T>): (pred: (val: T) => boolean) => Record<string, T>;

export function filter<T, P extends T>(pred: (val: T) => val is P): {
  (list: readonly T[]): P[];
  (dict: Record<string, T>): Record<string, P>;
};
export function filter<T>(pred: (val: T) => boolean): {
  (list: readonly T[]): T[];
  (dict: Record<string, T>): Record<string, T>;
};
