import test from 'ava';
import { either } from '../../src/functions';
import { Either } from '../../src/data';

const left = () => 0;
const double = b => b * 2;
const doubleOrZero = either(left, double);

test('either :: (a -> c) -> (b -> c) -> Either a b -> c', (t) => {
  t.is(doubleOrZero(Either.of(2)), 4);
});

test('either :: (a -> c) -> (b -> c) -> Either a b -> c', (t) => {
  t.is(doubleOrZero(Either.Left(1)), 0);
});
