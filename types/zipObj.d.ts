import * as _ from 'ts-toolbelt';

export type _ZipObj<K extends readonly PropertyKey[], V extends {[key in keyof K]: unknown} | readonly unknown[]> =
    number extends V['length'] ?
      { [T in K[number]]: V[number] } :
      number extends K['length'] ?
        { [T in K[number]]: V[number] } : _.L.ZipObj<K, V>;

export function zipObj<K extends readonly PropertyKey[]>(keys: _.F.Narrow<K>):
<V extends {[key in keyof K]: unknown} | readonly unknown[]>(values: _.F.Narrow<V>) =>
_ZipObj<K, V>;

export function zipObj<K extends readonly PropertyKey[], V extends {[key in keyof K]: unknown} | readonly unknown[]>(keys: _.F.Narrow<K>, values: _.F.Narrow<V>):
_ZipObj<K, V>;
