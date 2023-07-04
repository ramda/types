import { expectError, expectType } from 'tsd';

import { __, find, isNil, pipe, prop, tap } from '../es';

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

// prop(__, obj)(key)
expectType<string>(prop(__, {} as Foo)('a'));
expectType<number>(prop(__, {} as Foo)('b'));
// reject keys unknown in either direction
expectError(prop(__, {} as Foo)('c'));
expectError(prop(__, { c: 'error' })('a'));

// prop(prop, obj)
expectType<string>(prop('a', {} as Foo));
expectType<number>(prop('b', {} as Foo));
// reject keys unknown in either direction
expectError(prop('c', {} as Foo));
expectError(prop('a', { c: 'error' }));

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

// or `asserts` with a `tap`
expectType<string>(pipe(
  (todos: Todo[]) => find(todo => todo.isDone, todos)!,
  tap((x: Todo): asserts x => {
    if (isNil(x)) { throw new Error("Couldn't find Todo"); }
  }),
  prop('description')
)(todos));
