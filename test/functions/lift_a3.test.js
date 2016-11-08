/* eslint-disable no-underscore-dangle */
const test = require('tape');
const { liftA3, identity } = require('../../src/functions');
const { Maybe, Either, Future } = require('../../src/data');

const add = a => b => c => a + b + c;
const testError = new Error('Test error');

test('liftA3 :: (a -> b -> c -> d) -> Functor a -> Functor b -> Functor c', (t) => {
  t.equal(liftA3(add, Maybe.of(2), Maybe.of(3), Maybe.of(5)).__value, 10);
  t.end();
});

test('liftA3 :: (a -> b -> c -> d) -> Functor a -> Functor b -> Functor c', (t) => {
  t.true(liftA3(add, Maybe.Nothing(), Maybe.of(3), Maybe.of(5)).isNothing());
  t.end();
});

test('liftA3 :: (a -> b -> c -> d) -> Functor a -> Functor b -> Functor c', (t) => {
  t.equal(liftA3(add, Either.of(2), Either.of(3), Either.of(5)).__value, 10);
  t.end();
});

test('liftA3 :: (a -> b -> c -> d) -> Functor a -> Functor b -> Functor c', (t) => {
  t.equal(liftA3(add, Either.of(2), Either.Left(testError), Either.of(5)).__value, testError);
  t.end();
});

test('liftA3 :: (a -> b -> c -> d) -> Functor a -> Functor b -> Functor c', (t) => {
  liftA3(add, Future.of(2), Future.of(3), Future.of(5)).fork(identity, (v) => {
    t.equal(v, 10);
    t.end();
  });
});

test('liftA3 :: (a -> b -> c -> d) -> Functor a -> Functor b -> Functor c', (t) => {
  liftA3(add, Future.reject(testError), Future.of(3), Future.of(5)).fork((error) => {
    t.equal(error, testError);
    t.end();
  });
});
