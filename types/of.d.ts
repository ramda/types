import { Placeholder } from './util/tools';

// of(ctor)(val)
// special handler for array
export function of(ctor: ArrayConstructor): <T>(value: T) => T[];
// generic handler for all Applicatives
export function of<Ctor extends { of: (value: any) => any; }>(ctor: Ctor): (val: Parameters<Ctor['of']>[0]) => ReturnType<Ctor['of']>;
// of(__, val)(ctor)
export function of<T>(__: Placeholder, val: T): (ctor: ArrayConstructor) => T[];
export function of(__: Placeholder, val: any): <Ctor extends { of: (value: any) => any; }>(ctor: Ctor) => ReturnType<Ctor['of']>;
// of(ctor, val)
// special handler for array
export function of<T>(ctor: ArrayConstructor, value: T): T[];
// generic handler for all Applicatives
export function of<Ctor extends { of: (value: any) => any; }>(ctor: Ctor, val: Parameters<Ctor['of']>[0]): ReturnType<Ctor['of']>;
