/* eslint-disable no-underscore-dangle */
const test = require('tape');
const { liftA4, identity } = require('../../src/functions');
const { Maybe, Either, Future } = require('../../src/data');

const add = a => b => c => d => a + b + c + d;
const testError = new Error('Test error');

test('liftA4 :: (a -> b -> c -> d -> e) -> Functor a -> Functor b -> Functor c -> Functor d -> Functor e', (t) => {
  t.equal(liftA4(add, Maybe.of(2), Maybe.of(3), Maybe.of(5), Maybe.of(6)).__value, 16);
  t.end();
});

test('liftA4 :: (a -> b -> c -> d -> e) -> Functor a -> Functor b -> Functor c -> Functor d -> Functor e', (t) => {
  t.true(liftA4(add, Maybe.Nothing, Maybe.of(3), Maybe.of(5), Maybe.of(6)).isNothing());
  t.end();
});

test('liftA4 :: (a -> b -> c -> d -> e) -> Functor a -> Functor b -> Functor c -> Functor d -> Functor e', (t) => {
  t.equal(liftA4(add, Either.of(2), Either.of(3), Either.of(5), Either.of(6)).__value, 16);
  t.end();
});

test('liftA4 :: (a -> b -> c -> d -> e) -> Functor a -> Functor b -> Functor c -> Functor d -> Functor e', (t) => {
  t.equal(liftA4(add, Either.of(2), Either.Left(testError), Either.of(5), Either.of(6)).__value, testError);
  t.end();
});

test('liftA4 :: (a -> b -> c -> d -> e) -> Functor a -> Functor b -> Functor c -> Functor d -> Functor e', (t) => {
  liftA4(add, Future.of(2), Future.of(3), Future.of(5), Future.of(6)).fork(identity, (v) => {
    t.equal(v, 16);
    t.end();
  });
});

test('liftA4 :: (a -> b -> c -> d -> e) -> Functor a -> Functor b -> Functor c -> Functor d -> Functor e', (t) => {
  liftA4(add, Future.reject(testError), Future.of(3), Future.of(5), Future.of(6)).fork((error) => {
    t.equal(error, testError);
    t.end();
  });
});
