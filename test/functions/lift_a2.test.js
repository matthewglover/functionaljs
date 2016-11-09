/* eslint-disable no-underscore-dangle */
const test = require('tape');
const { liftA2, identity } = require('../../src/functions');
const { Maybe, Either, Future } = require('../../src/data');

const add = a => b => a + b;
const testError = new Error('Test error');

test('liftA2 :: (a -> b -> c) -> F a -> F b -> F c', (t) => {
  t.equal(liftA2(add, Maybe.of(2), Maybe.of(3)).__value, 5);
  t.end();
});

test('liftA2 :: (a -> b -> c) -> F a -> F b -> F c', (t) => {
  t.true(liftA2(add, Maybe.Nothing, Maybe.of(3)).isNothing());
  t.end();
});

test('liftA2 :: (a -> b -> c) -> F a -> F b -> F c', (t) => {
  t.equal(liftA2(add, Either.of(2), Either.of(3)).__value, 5);
  t.end();
});

test('liftA2 :: (a -> b -> c) -> F a -> F b -> F c', (t) => {
  t.equal(liftA2(add, Either.of(2), Either.Left(testError)).__value, testError);
  t.end();
});

test('liftA2 :: (a -> b -> c) -> F a -> F b -> F c', (t) => {
  liftA2(add, Future.of(2), Future.of(3)).fork(identity, (v) => {
    t.equal(v, 5);
    t.end();
  });
});

test('liftA2 :: (a -> b -> c) -> F a -> F b -> F c', (t) => {
  liftA2(add, Future.reject(testError), Future.of(3)).fork((error) => {
    t.equal(error, testError);
    t.end();
  });
});
