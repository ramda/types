import { Path } from './util/tools';

export function hasPath(list: Path): <T>(obj: T) => boolean;
export function hasPath<T>(list: Path, obj: T): boolean;
