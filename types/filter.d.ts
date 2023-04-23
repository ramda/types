import * as _ from 'ts-toolbelt';
import { Placeholder } from './util/tools';

// `val as P` is for type narrowing
// must have a `boolean` option as well for if predicate does not narrow
// see for details:
// https://www.typescriptlang.org/play?#code/C4TwDgpgBAysBOBLAdgcwPLwHIFcC2ARhPFALxQDOCKqUAPlMvkfANwCwAUFwMYD2yKlEQU4SNGSgAKAG4BDADYAuWNTSZchYgEoV8hcIqU1tUgD4ooSHwBmUfWVLkA5FXGpnHTv0HBDmlklZRRUxGg1mHT1FQ0ZIknNLcAhbexinFyYteE9eASERADFFChAg-VCTCOzdKAI+PgUIOWQyCwBCdv0vLgATCB4FOXhoGxxkHmBEASgbRAVgYgAeABUAGigABSgIAA9F5F6jFbMpMBHelWDlKBXtNrSDES2NhRFgFRG5XoEFMpWANoAXVqm2BXn6g2Go3Gk2mrTmC2WJzOFyuFVu90S9UazWQr3en2aP2Qf1uwNqgKBPW8+T8byolXc1RYwMkAIADBtnM4NgBGblyXlQABM3IIzmpXDyvig8D5kkRi3gUhEYTQBKo2i8AHodVADVAAHoAfhlQngIsV82VqooAWImuA2q4esNxrNtNl8AAzNakSqiiUQE6XZw3YbTVwgA
export function filter<T, P extends T = T>(pred: (val: T) => val is P, list: readonly T[]): P[];
export function filter<T, P extends T = T>(pred: (val: T) => val is P, list: readonly T[]): P[];
export function filter<T, P extends T = T>(pred: (val: T) => val is P, dict: Record<PropertyKey, T>): Record<PropertyKey, P>;
export function filter<T>(pred: (val: T) => boolean, list: readonly T[]): T[];
export function filter<T>(pred: (val: T) => boolean, dict: Record<PropertyKey, T>): Record<PropertyKey, T>;

export function filter<T>(__: Placeholder, list: readonly T[]): <P extends T>(pred: (val: T) => val is P) => P[];
export function filter<T>(__: Placeholder, list: readonly T[]): (pred: (val: T) => boolean) => T[];
export function filter<T>(__: Placeholder, dict: Record<PropertyKey, T>): <P extends T>(pred: (val: T) => val is P) => Record<PropertyKey, P>;
export function filter<T>(__: Placeholder, dict: Record<PropertyKey, T>): (pred: (val: T) => boolean) => Record<PropertyKey, T>;

// have yet to get `val is P` variety working here, if anyone knows please help!
// export function filter<T, P extends T = T>(pred: (val: T) => val is P): <C extends readonly T[] | Record<PropertyKey, T>>(collection: C) => C extends readonly T[] ? P[] : Record<PropertyKey, P>;
// export function filter<T>(pred: (val: T) => boolean): <C extends readonly T[] | Record<PropertyKey, T>>(collection: C) => C extends readonly T[] ? _.L.Writable<T[]> : C;
export function filter<T>(pred: (val: T) => boolean): <C extends readonly T[] | Record<PropertyKey, T>>(collection: C) => C extends readonly T[] ? _.L.Writable<C> : C;
