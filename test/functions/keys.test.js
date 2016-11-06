import test from 'ava';
import { keys } from '../../src/functions';

const o = {
  a: 1,
  b: '2',
  c: [1, 2, 3],
  d: { a: 1, b: 2, c: 3 },
  e: false,
  f: null,
  1: 3,
};


test('keys :: {String: *} -> [String]', (t) => {
  t.deepEqual(
    keys(o).sort(),
    ['a', 'b', 'c', 'd', 'e', 'f', '1'].sort());
});
