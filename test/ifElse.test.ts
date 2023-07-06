import { expectType, expectError } from 'tsd';

import { ifElse } from '../es';

type Foo = {
  type: 'foo',
  str: string;
};

type Bar = {
  type: 'bar',
  num: number;
};

type FooOrBar = Foo | Bar;

const isFoo = (x: FooOrBar): x is Foo => x.type === 'foo';
const isBar = (x: FooOrBar): x is Bar => x.type === 'bar';

expectType<(x: FooOrBar) => string | number>(ifElse(isFoo, (x: Foo) => x.str, (x: Bar) => x.num));
expectType<(x: FooOrBar) => number | string>(ifElse(isBar, (x: Bar) => x.num, (x: Foo) => x.str));

// unary
const lt10 = (x: number) => x < 10;
expectType<(x: number) => string>(ifElse(lt10, (x: number) => 'lt10', (x: number) => 'gte10'));
// different return types are ok
expectType<(x: number) => string | number>(ifElse(lt10, (x: number) => '', (x: number) => 0));
// different argument types are not
expectError(ifElse(lt10, (x: number) => '', (x: string) => ''));

// binary
const areBothGt10 = (x: number, y: number) => x > 10 && y > 10;
expectType<(x: number, y: number) => string>(ifElse(areBothGt10, (x: number, y: number) => 'lt10', (x: number, y: number) => 'gte10'));
