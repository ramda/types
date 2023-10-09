import { Placeholder } from './util/tools';

// ramda used `Array.prototype.match` in its implementation, but never returns undefined
// See: https://github.com/ramda/ramda/blob/v0.29.1/source/match.js#L26
export function match(regexp: RegExp): (str: string) => RegExpMatchArray;
export function match(__: Placeholder, str: string): (regexp: RegExp) => RegExpMatchArray;
export function match(regexp: RegExp, str: string): RegExpMatchArray;
