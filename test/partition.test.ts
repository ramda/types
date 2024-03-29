import { expectType } from 'tsd';
import { partition } from '../types/partition';

// partition(fn, list)
// fn: (v) => v is T
expectType<[true[], false[]]>(partition((v): v is true => v, [true, false]));
// fn: (v) => bool
expectType<[boolean[], boolean[]]>(partition((v) => v, [true, false]));

// partition(fn)(list)
// fn: (v) => v is T
expectType<[true[], false[]]>(partition((v): v is true => !!v)([true, false]));
// fn: (v) => bool
expectType<[boolean[], boolean[]]>(partition((v) => !!v)([true, false]));
const isBool = (v: any): v is boolean => typeof v === 'boolean';
const extractBool = partition(isBool);
expectType<[boolean[], number[]]>(extractBool([1, true]));
