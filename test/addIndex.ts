import { expectType } from 'tsd';

import { __ } from '../types/__';
import { addIndex } from '../types/addIndex';
import { filter } from '../types/filter';
import { forEach } from '../types/forEach';
import { map } from '../types/map';
import { reduce } from '../types/reduce';
import { reject } from '../types/reject';

//
// Note about `addIndex`
// The generics need to be set to help determine the return type
// eg, if it's for filter or forEach or map or reduce
// TODO: figure out how to infer that correctly
// OR expose specific types to cast for ease
//

class Rectangle {
  constructor(public width: number, public height: number) {
    this.width = width;
    this.height = height;
  }

  area(): number {
    return this.width * this.height;
  }
}

const lastTwo = (_val: number, idx: number, list: number[]) => list.length - idx <= 2;

// filter
const filterIndexed = addIndex<number>(filter);

expectType<number[]>(filterIndexed(__, [8, 6, 7, 5, 3, 0, 9])(lastTwo)); // => [0, 9]
expectType<number[]>(filterIndexed(lastTwo)([8, 6, 7, 5, 3, 0, 9])); // => [0, 9]
expectType<number[]>(filterIndexed(lastTwo)([8, 6, 7, 5, 3, 0, 9])); // => [0, 9]

expectType<number[]>(filterIndexed(__, [8, 6, 7, 5, 3, 0, 9])(lastTwo)); // => [0, 9]

// forEach
const forEachIndexed = addIndex<number>(forEach);
const plusFive = (num: number, idx: number, list: number[]) => {
  list[idx] = num + 5;
};

expectType<number[]>(forEachIndexed(__, [1, 2, 3])(plusFive)); // => [6, 7, 8]
expectType<number[]>(forEachIndexed(plusFive, [1, 2, 3])); // => [6, 7, 8]
expectType<number[]>(forEachIndexed(plusFive)([1, 2, 3])); // => [6, 7, 8]

// map
const mapIndexed = addIndex<number, string>(map);
const squareEnds = (elt: number, idx: number, list: number[]) =>
  idx === 0 || idx === list.length - 1
    ? elt * elt
    : elt;

expectType<number[]>(mapIndexed(__, [8, 5, 3, 0, 9])(squareEnds)); // => [64, 5, 3, 0, 81]
expectType<number[]>(mapIndexed(squareEnds, [8, 5, 3, 0, 9])); // => [64, 5, 3, 0, 81]
expectType<number[]>(mapIndexed(squareEnds)([8, 5, 3, 0, 9])); // => [64, 5, 3, 0, 81]

expectType<string[]>(mapIndexed((val: string, idx: number) => `${idx}-${val}`)(['f', 'o', 'o', 'b', 'a', 'r']));

expectType<number[]>(
  mapIndexed(
    (rectangle, idx): number => rectangle.area() * idx,
    [new Rectangle(1, 2), new Rectangle(4, 7)]
  )
);

// reduce
const reduceIndexed = addIndex<string, { [elem: string]: number }>(reduce);
const letters = ['a', 'b', 'c'];

const objectify = (accObject: { [elem: string]: number }, elem: string, idx: number, _list: string[]) => {
  accObject[elem] = idx;
  return accObject;
};

expectType<{ [elem: string]: number; }>(reduceIndexed(objectify, {}, letters)); // => { 'a': 0, 'b': 1, 'c': 2 }
expectType<{ [elem: string]: number; }>(reduceIndexed(objectify)({}, letters)); // => { 'a': 0, 'b': 1, 'c': 2 }
expectType<{ [elem: string]: number; }>(reduceIndexed(objectify, {})(letters)); // => { 'a': 0, 'b': 1, 'c': 2 }
expectType<{ [elem: string]: number; }>(reduceIndexed(objectify)({})(letters)); // => { 'a': 0, 'b': 1, 'c': 2 }

// rejected
const rejectIndexed = addIndex<number>(reject);
expectType<number[]>(rejectIndexed(lastTwo, [8, 6, 7, 5, 3, 0, 9])); // => [8, 6, 7, 5, 3]
expectType<number[]>(rejectIndexed(lastTwo)([8, 6, 7, 5, 3, 0, 9])); // => [8, 6, 7, 5, 3]

() => {
  const mapIndexed = addIndex<string, string>(map);
  mapIndexed((val: string, idx: number) => `${idx}-${val}`)(['f', 'o', 'o', 'b', 'a', 'r']);
  // => ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
  const mapIndexed2 = addIndex<Rectangle, number>(map);
  // $ExpectType number[]
  mapIndexed2(
    (rectangle: Rectangle, idx: number): number => rectangle.area() * idx,
    [new Rectangle(1, 2), new Rectangle(4, 7)]
  );
  // => [2, 56]
};

() => {
  const reduceIndexed = addIndex<string, string>(reduce);
  // $ExpectType string
  reduceIndexed((acc: string, val: string, idx: number) => `${acc},${idx}-${val}`, '', [
    'f',
    'o',
    'o',
    'b',
    'a',
    'r'
  ]);
  // => ['0-f,1-o,2-o,3-b,4-a,5-r']
};
