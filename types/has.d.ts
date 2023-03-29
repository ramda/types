import { Placeholder } from './util/tools';

// `has` is just `has = (prop, obj) => `Object.prototype.hasOwnProperty.call(obj, prop)`;
// Go to Definition gives `hasOwnProperty(v: PropertyKey): boolean;`
export function has(__: Placeholder, obj: unknown): (s: PropertyKey) => boolean;
export function has(prop: PropertyKey, obj: unknown): boolean;
export function has(prop: PropertyKey): (obj: unknown) => boolean;
