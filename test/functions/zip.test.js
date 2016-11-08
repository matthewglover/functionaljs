const test = require('tape');
const { zip } = require('../../src/functions');


test('zip :: {String: *} -> [[String, *]]', (t) => {
  t.deepEqual(
    zip([1, 3], [2, 4]),
    [[1, 2], [3, 4]]);
  t.end();
});
