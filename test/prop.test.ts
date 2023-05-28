import { expectError, expectType } from 'tsd';

import { __, find, pipe, prop } from '../es';

type Foo = {
  a: string;
  b: number;
};

// prop(key)(obj)
// support objects
expectType<string>(prop('a')({} as Foo));
expectType<number>(prop('b')({} as Foo));
// reject keys unknown in either direction
expectError(prop('c')({} as Foo));
expectError(prop('a')({ c: 'error' }));
// support arrays
expectType<number>(prop(0)([1, 2, 3, 4]));
// all numbers work as keys, no guarantee it will return a value
expectType<number>(prop(10)([1, 2, 3, 4]));

// prop(__, obj)(key)
expectType<string>(prop(__, {} as Foo)('a'));
expectType<number>(prop(__, {} as Foo)('b'));
// reject keys unknown in either direction
expectError(prop(__, {} as Foo)('c'));
expectError(prop(__, { c: 'error' })('a'));
// support arrays
expectType<number>(prop(__, [1, 2, 3, 4])(0));
// all numbers work as keys, no guarantee it will return a value
expectType<number>(prop(__, [1, 2, 3, 4])(10));

// prop(prop, obj)
expectType<string>(prop('a', {} as Foo));
expectType<number>(prop('b', {} as Foo));
// reject keys unknown in either direction
expectError(prop('c', {} as Foo));
expectError(prop('a', { c: 'error' }));
// support arrays
expectType<number>(prop(0, [1, 2, 3, 4]));
// all numbers work as keys, no guarantee it will return a value
expectType<number>(prop(10, [1, 2, 3, 4]));

//
// testing and example of unions with `undefined`
//

type Todo = { description: string; isDone: boolean };

const todos: Todo[] = [/* ... */];

// the find return `Todo | undefined`, so `prop` errors
expectError(pipe(
  find((todo: Todo) => todo.isDone),
  prop('description')
));

// add in non-null assertion to have it pass
expectType<string>(pipe(
  (todos: Todo[]) => find(todo => todo.isDone, todos)!,
  prop('description')
)(todos));
