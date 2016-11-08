const test = require('tape');
const { toPairs } = require('../../src/functions');

const o = {
  a: 1,
  b: '2',
  c: [1, 2, 3],
  d: { a: 1, b: 2, c: 3 },
};


test('toPairs :: {String: *} -> [[String, *]]', (t) => {
  t.deepEqual(
    toPairs(o),
    [
      ['a', 1],
      ['b', '2'],
      ['c', [1, 2, 3]],
      ['d', { a: 1, b: 2, c: 3 }]]);
  t.end();
});

test('toPairs :: {String: *} -> [[String, *]]', (t) => {
  t.deepEqual(toPairs([]), []);
  t.end();
});
