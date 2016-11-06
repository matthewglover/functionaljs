import test from 'ava';
import { zip } from '../../src/functions';


test('zip :: {String: *} -> [[String, *]]', (t) => {
  t.deepEqual(
    zip([1, 3], [2, 4]),
    [[1, 2], [3, 4]]);
});
