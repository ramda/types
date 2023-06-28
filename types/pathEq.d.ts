import { Path } from './util/tools';

export function pathEq(val: any): {
  (path: Path): (obj: any) => boolean;
  (path: Path, obj: any): boolean;
};
export function pathEq(val: any, path: Path): (obj: any) => boolean;
export function pathEq(val: any, path: Path, obj: any): boolean;
