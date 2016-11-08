/* eslint-disable no-underscore-dangle */
const test = require('tape');
const { chain, identity, compose } = require('../../src/functions');
const { Either, Future, Maybe } = require('../../src/data');


const double = x => x * 2;


test('chain :: (a -> M b) -> M a -> M b', (t) => {
  t.equal(chain(compose(Maybe.of, double), Maybe.of(10)).__value, 20);
  t.end();
});

test('chain :: (a -> M b) -> M a -> M b', (t) => {
  t.true(chain(compose(Maybe.of, double), Maybe.Nothing()).isNothing());
  t.end();
});

test('chain :: (a -> M b) -> M a -> M b', (t) => {
  t.equal(chain(compose(Either.of, double), Either.of(10)).__value, 20);
  t.end();
});

test('chain :: (a -> M b) -> M a -> M b', (t) => {
  t.equal(chain(compose(Either.of, double), Either.Left(10)).__value, 10);
  t.end();
});

test('chain :: (a -> M b) -> M a -> M b', (t) => {
  chain(compose(Future.of, double), Future.of(10)).fork(identity, (v) => {
    t.equal(v, 20);
    t.end();
  });
});
