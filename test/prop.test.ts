import { expectError, expectType } from 'tsd';

import { __, find, isNil, pipe, prop, tap } from '../es';

type Foo = {
  a: string;
  b: number;
};

const foo: Foo = { a: '1', b: 2 };

// support objects
foo.a;
expectType<string>(prop('a')({} as Foo));
expectType<number>(prop('b')({} as Foo));
expectType<string>(prop(__, {} as Foo)('a'));
expectType<number>(prop(__, {} as Foo)('b'));
expectType<string>(prop('a', {} as Foo));
expectType<number>(prop('b', {} as Foo));

// reject keys unknown in either direction
// @ts-expect-error
foo.c;
expectError(prop('c')({} as Foo));
expectError(prop('a')({ c: 'error' }));
expectError(prop(__, {} as Foo)('c'));
expectError(prop(__, { c: 'error' })('a'));
expectError(prop('c', {} as Foo));
expectError(prop('a', { c: 'error' }));

// `Record` always works because of the nature of record
expectType<number>(prop('foo', {} as Record<string, number>));
expectType<number>(prop('bar', {} as Record<string, number>));
expectType<number>(prop('biz', {} as Record<string, number>));
expectType<number>(prop('baz', {} as Record<string, number>));

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
