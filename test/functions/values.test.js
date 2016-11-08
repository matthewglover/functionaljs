const test = require('tape');
const { values } = require('../../src/functions');

const o = {
  a: 1,
  b: '2',
  c: [1, 2, 3],
  d: { a: 1, b: 2, c: 3 },
  e: false,
  f: null,
};


test('values :: {String: *} -> [*]', (t) => {
  t.deepEqual(
    values(o),
    [
      1,
      '2',
      [1, 2, 3],
      { a: 1, b: 2, c: 3 },
      false,
      null,
    ]);
  t.end();
});
