const test = require('tape');
const { maybe } = require('../../src/functions');
const { Maybe } = require('../../src/data');

const double = x => x * 2;
const doubleOrZero = maybe(0, double);

test('maybe :: b -> (a -> b) -> Maybe a -> b', (t) => {
  t.equal(doubleOrZero(Maybe.of(2)), 4);
  t.end();
});

test('maybe :: b -> (a -> b) -> Maybe a -> b', (t) => {
  t.equal(doubleOrZero(Maybe.Nothing()), 0);
  t.end();
});
