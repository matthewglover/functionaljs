/* eslint-disable no-underscore-dangle */
import test from 'ava';
import { liftA3, identity } from '../../src/functions';
import { Maybe, Either, Future } from '../../src/data';

const add = a => b => c => a + b + c;
const testError = new Error('Test error');

test('liftA3 :: (a -> b -> c -> d) -> Functor a -> Functor b -> Functor c', (t) => {
  t.is(liftA3(add, Maybe.of(2), Maybe.of(3), Maybe.of(5)).__value, 10);
});

test('liftA3 :: (a -> b -> c -> d) -> Functor a -> Functor b -> Functor c', (t) => {
  t.true(liftA3(add, Maybe.Nothing(), Maybe.of(3), Maybe.of(5)).isNothing());
});

test('liftA3 :: (a -> b -> c -> d) -> Functor a -> Functor b -> Functor c', (t) => {
  t.is(liftA3(add, Either.of(2), Either.of(3), Either.of(5)).__value, 10);
});

test('liftA3 :: (a -> b -> c -> d) -> Functor a -> Functor b -> Functor c', (t) => {
  t.is(liftA3(add, Either.of(2), Either.Left(testError), Either.of(5)).__value, testError);
});

test.cb('liftA3 :: (a -> b -> c -> d) -> Functor a -> Functor b -> Functor c', (t) => {
  liftA3(add, Future.of(2), Future.of(3), Future.of(5)).fork(identity, (v) => {
    t.is(v, 10);
    t.end();
  });
});

test.cb('liftA3 :: (a -> b -> c -> d) -> Functor a -> Functor b -> Functor c', (t) => {
  liftA3(add, Future.reject(testError), Future.of(3), Future.of(5)).fork((error) => {
    t.is(error, testError);
    t.end();
  });
});
