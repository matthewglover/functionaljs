/* eslint-disable no-underscore-dangle */
import test from 'ava';
import { map, identity } from '../../src/functions';
import { Either, Future, Maybe } from '../../src/data';


const double = x => x * 2;
const mapDouble = map(double);

test('map :: (a -> b) -> F a -> F b', (t) => {
  t.deepEqual(mapDouble([1, 2, 3]), [2, 4, 6]);
});

test('map :: (a -> b) -> F a -> F b', (t) => {
  t.is(mapDouble(Maybe.of(10)).__value, 20);
});

test('map :: (a -> b) -> F a -> F b', (t) => {
  t.true(mapDouble(Maybe.Nothing()).isNothing());
});

test('map :: (a -> b) -> F a -> F b', (t) => {
  t.is(mapDouble(Either.of(10)).__value, 20);
});

test('map :: (a -> b) -> F a -> F b', (t) => {
  t.is(mapDouble(Either.Left(10)).__value, 10);
});

test.cb('map :: (a -> b) -> F a -> F b', (t) => {
  mapDouble(Future.of(10)).fork(identity, (v) => {
    t.is(v, 20);
    t.end();
  });
});
