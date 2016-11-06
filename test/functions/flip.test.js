import test from 'ava';
import { flip } from '../../src/functions';

const divide = (a, b) => a / b;
const divide3 = (a, b, c) => a / b / c;

test('flip :: (a, ... b -> c) -> (b..., a -> c)', (t) => {
  t.is(flip(divide)(2, 3), 3 / 2);
});

test('flip :: (a, ... b -> c) -> (b..., a -> c)', (t) => {
  t.is(flip(divide3)(2, 3, 4), 4 / 3 / 2);
});
