/* eslint-disable no-underscore-dangle */
import test from 'ava';
import { chain, identity, compose } from '../../src/functions';
import { Either, Future, Maybe } from '../../src/data';


const double = x => x * 2;


test('chain :: (a -> M b) -> M a -> M b', (t) => {
  t.is(chain(compose(Maybe.of, double), Maybe.of(10)).__value, 20);
});

test('chain :: (a -> M b) -> M a -> M b', (t) => {
  t.true(chain(compose(Maybe.of, double), Maybe.Nothing()).isNothing());
});

test('chain :: (a -> M b) -> M a -> M b', (t) => {
  t.is(chain(compose(Either.of, double), Either.of(10)).__value, 20);
});

test('chain :: (a -> M b) -> M a -> M b', (t) => {
  t.is(chain(compose(Either.of, double), Either.Left(10)).__value, 10);
});

test.cb('chain :: (a -> M b) -> M a -> M b', (t) => {
  chain(compose(Future.of, double), Future.of(10)).fork(identity, (v) => {
    t.is(v, 20);
    t.end();
  });
});
