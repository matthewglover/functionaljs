/* eslint-disable no-underscore-dangle */
import test from 'ava';
import { liftA2, identity } from '../../src/functions';
import { Maybe, Either, Future } from '../../src/data';

const add = a => b => a + b;
const testError = new Error('Test error');

test('liftA2 :: (a -> b -> c) -> F a -> F b -> F c', (t) => {
  t.is(liftA2(add, Maybe.of(2), Maybe.of(3)).__value, 5);
});

test('liftA2 :: (a -> b -> c) -> F a -> F b -> F c', (t) => {
  t.true(liftA2(add, Maybe.Nothing(), Maybe.of(3)).isNothing());
});

test('liftA2 :: (a -> b -> c) -> F a -> F b -> F c', (t) => {
  t.is(liftA2(add, Either.of(2), Either.of(3)).__value, 5);
});

test('liftA2 :: (a -> b -> c) -> F a -> F b -> F c', (t) => {
  t.is(liftA2(add, Either.of(2), Either.Left(testError)).__value, testError);
});

test.cb('liftA2 :: (a -> b -> c) -> F a -> F b -> F c', (t) => {
  liftA2(add, Future.of(2), Future.of(3)).fork(identity, (v) => {
    t.is(v, 5);
    t.end();
  });
});

test.cb('liftA2 :: (a -> b -> c) -> F a -> F b -> F c', (t) => {
  liftA2(add, Future.reject(testError), Future.of(3)).fork((error) => {
    t.is(error, testError);
    t.end();
  });
});
