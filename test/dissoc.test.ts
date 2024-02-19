import { expectType, expectError } from 'tsd';
import { __, dissoc } from '../es';

// `dissoc` does a `delete obj.key` under the hood, so the behavior for `dissoc` should make that
type Obj = {
  str: string;
  num: number;
  opt?: boolean;
  orUndefined: boolean | undefined;
  orNull: boolean | null;
};

const obj: Obj = { str: 'foo', num: 1, orUndefined: true, orNull: true };

// must mark failed operations with ts-expect-error, otherwise `npm run test` fails
// @ts-expect-error
delete obj.str;
// @ts-expect-error
delete obj.num;
delete obj.opt;
delete obj.orUndefined;
// @ts-expect-error
delete obj.orNull;

// only `opt` and `orUndefined` are allowed operations
// `dissoc` should match that behavior

expectError(dissoc('str', obj));
expectError(dissoc('num', obj));
expectType<Obj>(dissoc('opt', obj));
expectType<Obj>(dissoc('orUndefined', obj));
expectError(dissoc('orNull', obj));

expectError(dissoc('str')(obj));
expectError(dissoc('num')(obj));
expectType<Obj>(dissoc('opt')(obj));
expectType<Obj>(dissoc('orUndefined')(obj));
expectError(dissoc('orNull')(obj));

expectError(dissoc(__, obj)('str'));
expectError(dissoc(__, obj)('num'));
expectType<Obj>(dissoc(__, obj)('opt'));
expectType<Obj>(dissoc(__, obj)('orUndefined'));
expectError(dissoc(__, obj)('orNull'));

// Record<string, number> is allowed
const rec: Record<string, number> = { foo: 1, bar: 2 };

// delete operation is ok for all keys
delete rec.foo;
delete rec.bar;
delete rec.unknownKey;

// and so are for `dissoc`
dissoc('foo', rec);
dissoc('bar', rec);
dissoc('unknownKey', rec);

dissoc('foo')(rec);
dissoc('bar')(rec);
dissoc('unknownKey')(rec);

dissoc(__, rec)('foo');
dissoc(__, rec)('bar');
dissoc(__, rec)('unknownKey');
