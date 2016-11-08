/* eslint-disable no-underscore-dangle */
const test = require('tape');
const { map, identity } = require('../../src/functions');
const { Either, Future, Maybe } = require('../../src/data');


const double = x => x * 2;
const mapDouble = map(double);

test('map :: (a -> b) -> F a -> F b', (t) => {
  t.deepEqual(mapDouble([1, 2, 3]), [2, 4, 6]);
  t.end();
});

test('map :: (a -> b) -> F a -> F b', (t) => {
  t.equal(mapDouble(Maybe.of(10)).__value, 20);
  t.end();
});

test('map :: (a -> b) -> F a -> F b', (t) => {
  t.true(mapDouble(Maybe.Nothing()).isNothing());
  t.end();
});

test('map :: (a -> b) -> F a -> F b', (t) => {
  t.equal(mapDouble(Either.of(10)).__value, 20);
  t.end();
});

test('map :: (a -> b) -> F a -> F b', (t) => {
  t.equal(mapDouble(Either.Left(10)).__value, 10);
  t.end();
});

test('map :: (a -> b) -> F a -> F b', (t) => {
  mapDouble(Future.of(10)).fork(identity, (v) => {
    t.equal(v, 20);
    t.end();
  });
});
