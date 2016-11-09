/* eslint-disable no-underscore-dangle */
const test = require('tape');
const { liftA5, identity } = require('../../src/functions');
const { Maybe, Either, Future } = require('../../src/data');

const add = a => b => c => d => e => a + b + c + d + e;
const testError = new Error('Test error');

test('liftA5 :: (a -> b -> c -> d -> e -> f) -> Functor a -> Functor b -> Functor c -> Functor d -> Functor e -> Functor f', (t) => {
  t.equal(liftA5(add, Maybe.of(2), Maybe.of(3), Maybe.of(5), Maybe.of(6), Maybe.of(7)).__value, 23);
  t.end();
});

test('liftA5 :: (a -> b -> c -> d -> e -> f) -> Functor a -> Functor b -> Functor c -> Functor d -> Functor e -> Functor f', (t) => {
  t.true(liftA5(add, Maybe.Nothing, Maybe.of(3), Maybe.of(5), Maybe.of(6), Maybe.of(7)).isNothing());
  t.end();
});

test('liftA5 :: (a -> b -> c -> d -> e -> f) -> Functor a -> Functor b -> Functor c -> Functor d -> Functor e -> Functor f', (t) => {
  t.equal(liftA5(add, Either.of(2), Either.of(3), Either.of(5), Either.of(6), Either.of(7)).__value, 23);
  t.end();
});

test('liftA5 :: (a -> b -> c -> d -> e -> f) -> Functor a -> Functor b -> Functor c -> Functor d -> Functor e -> Functor f', (t) => {
  t.equal(liftA5(add, Either.of(2), Either.Left(testError), Either.of(5), Either.of(6), Either.of(7)).__value, testError);
  t.end();
});

test('liftA5 :: (a -> b -> c -> d -> e -> f) -> Functor a -> Functor b -> Functor c -> Functor d -> Functor e -> Functor f', (t) => {
  liftA5(add, Future.of(2), Future.of(3), Future.of(5), Future.of(6), Future.of(7)).fork(identity, (v) => {
    t.equal(v, 23);
    t.end();
  });
});

test('liftA5 :: (a -> b -> c -> d -> e -> f) -> Functor a -> Functor b -> Functor c -> Functor d -> Functor e -> Functor f', (t) => {
  liftA5(add, Future.reject(testError), Future.of(3), Future.of(5), Future.of(6), Future.of(7)).fork((error) => {
    t.equal(error, testError);
    t.end();
  });
});
