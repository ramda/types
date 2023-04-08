import { Placeholder } from './util/tools';

export function whereAny<Spec extends Record<PropertyKey, (value: any) => boolean>, U>(spec: Spec, testObj: U): boolean;
export function whereAny<U>(__: Placeholder, testObj: U): <Spec extends Record<PropertyKey, (value: any) => boolean>>(spec: Spec) => boolean;
export function whereAny<Spec extends Record<PropertyKey, (value: any) => boolean>>(spec: Spec): <U extends Record<keyof Spec, any>>(testObj: U) => boolean;
