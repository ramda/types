import { Placeholder } from './util/tools';

// there is a generic handler for Applicatives, follow by a special handler for arrays for each overload

// of(ctor)(val)
// export function of<Ctor extends { of: (value: any) => any; }>(ctor: Ctor): (val: Parameters<Ctor['of']>[0]) => ReturnType<Ctor['of']>;
export function of(ctor: ArrayConstructor): <T>(value: T) => T[];
// of(__, val)(ctor)
// export function of(__: Placeholder, val: any): <Ctor extends { of: (value: any) => any; }>(ctor: Ctor) => ReturnType<Ctor['of']>;
export function of<T>(__: Placeholder, val: T): (ctor: ArrayConstructor) => T[];
// of(ctor, val)
// export function of<Ctor extends { of: (value: any) => any; }>(ctor: Ctor, val: Parameters<Ctor['of']>[0]): ReturnType<Ctor['of']>;
export function of<T>(ctor: ArrayConstructor, value: T): T[];
