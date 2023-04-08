import { Placeholder } from './util/tools';

// TODO: figure out how to get testObj to only work with keys defined in Spec, and vice versa when `__` is used
export function whereAny<Spec extends Record<PropertyKey, (value: any) => boolean>>(spec: Spec, testObj: any): boolean;
export function whereAny<Spec extends Record<PropertyKey, (value: any) => boolean>>(__: Placeholder, testObj: any): (spec: Spec) => boolean;
export function whereAny<Spec extends Record<PropertyKey, (value: any) => boolean>>(spec: Spec): (testObj: any) => boolean;
