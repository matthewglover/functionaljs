import test from 'ava';
import { maybe } from '../../src/functions';
import { Maybe } from '../../src/data';

const double = x => x * 2;
const doubleOrZero = maybe(0, double);

test('maybe :: b -> (a -> b) -> Maybe a -> b', (t) => {
  t.is(doubleOrZero(Maybe.of(2)), 4);
});

test('maybe :: b -> (a -> b) -> Maybe a -> b', (t) => {
  t.is(doubleOrZero(Maybe.Nothing()), 0);
});
