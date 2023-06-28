import * as _ from 'ts-toolbelt';
import { Take } from './util/tools';

export function nAry<N extends number>(
  n: N,
): <T extends (...arg: any) => unknown>(fn: T) => (...arg: _.T.Take<Parameters<T>, N>) => ReturnType<T>;
export function nAry<N extends number, T extends (...arg: any) => unknown>(
  n: N,
  fn: T,
): (...arg: _.T.Take<Parameters<T>, N>) => ReturnType<T>;
