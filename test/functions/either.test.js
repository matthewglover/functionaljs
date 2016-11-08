const test = require('tape');
const { either } = require('../../src/functions');
const { Either } = require('../../src/data');

const left = () => 0;
const double = b => b * 2;
const doubleOrZero = either(left, double);

test('either :: (a -> c) -> (b -> c) -> Either a b -> c', (t) => {
  t.equal(doubleOrZero(Either.of(2)), 4);
  t.end();
});

test('either :: (a -> c) -> (b -> c) -> Either a b -> c', (t) => {
  t.equal(doubleOrZero(Either.Left(1)), 0);
  t.end();
});
