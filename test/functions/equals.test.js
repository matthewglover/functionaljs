import test from 'ava';
import { equals } from '../../src/functions';


test('equals :: a -> b -> Boolean - compares booleans', (t) => {
  t.true(equals(true, true));
  t.true(equals(false, false));
  t.false(equals(false, true));
});

test('equals :: a -> b -> Boolean - compares strings', (t) => {
  t.true(equals('abc', 'abc'));
  t.false(equals('cba', 'bca'));
});

test('equals :: a -> b -> Boolean - compares numbers', (t) => {
  t.true(equals(1, 1));
  t.false(equals(1, 2));
});

test('equals :: a -> b -> Boolean - compares null', (t) => {
  t.true(equals(null, null));
  t.false(equals(null, undefined));
});

test('equals :: a -> b -> Boolean - no type coercion', (t) => {
  t.false(equals(1, '1'));
  t.false(equals(1, true));
});

test('equals :: a -> b -> Boolean - compares arrays', (t) => {
  t.true(equals([1, 2, 3], [1, 2, 3]));
  t.false(equals([1, 2, 3], [1, 2, 4]));
});

test('equals :: a -> b -> Boolean - compares objects', (t) => {
  t.true(equals({ a: 1, b: '2', c: false }, { a: 1, b: '2', c: false }));
  t.false(equals({ a: 1, b: '2', c: true }, { a: 1, b: '2', c: false }));
});

test('equals :: a -> b -> Boolean - compares objects', (t) => {
  t.true(
    equals({ a: 1, b: '2', c: [1, 2, { a: 'f', b: [1, 2, 3] }] },
      { a: 1, b: '2', c: [1, 2, { a: 'f', b: [1, 2, 3] }] }));
  t.false(
    equals({ a: 1, b: '2', c: [1, 2, { a: 'f', b: [1, 2, 3] }] },
      { a: 1, b: '2', c: [1, 2, { a: 'f', b: [1, 2, 3, 4] }] })
  );
});
