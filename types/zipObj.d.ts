import * as _ from 'ts-toolbelt';
import { _ZipObj } from './util/zipObj';

export function zipObj<K extends readonly PropertyKey[]>(keys: _.F.Narrow<K>):
<V extends {[key in keyof K]: unknown} | readonly unknown[]>(values: _.F.Narrow<V>) =>
_ZipObj<K, V>;

export function zipObj<K extends readonly PropertyKey[], V extends {[key in keyof K]: unknown} | readonly unknown[]>(keys: _.F.Narrow<K>, values: _.F.Narrow<V>):
_ZipObj<K, V>;
