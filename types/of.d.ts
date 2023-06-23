import { Placeholder } from './util/tools';

// of(ctor)(val)
export function of<Ctor extends { of: (value: any) => any; }>(ctor: Ctor): <T extends Parameters<Ctor['of']>[0]>(val: T) => Ctor extends ArrayConstructor ? T[] : ReturnType<Ctor['of']>;
// of(__, val)(ctor)
export function of<T>(__: Placeholder, val: T): <Ctor extends { of: (value: any) => any; }>(ctor: Ctor) => Ctor extends ArrayConstructor ? T[] : ReturnType<Ctor['of']>;
// of(ctor, val)
export function of<Ctor extends { of: (value: any) => any; }, T extends Parameters<Ctor['of']>[0]>(ctor: Ctor, val: T): Ctor extends ArrayConstructor ? T[] : ReturnType<Ctor['of']>;
