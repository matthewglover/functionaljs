/* eslint-disable no-underscore-dangle */
import test from 'ava';
import { ap } from '../../src/functions';
import { Maybe } from '../../src/data';

const double = a => a * 2;

test('ap :: Functor (a -> b) -> Functor a -> Functor b', (t) => {
  t.is(ap(Maybe.of(double), Maybe.of(10)).__value, 20);
});


test('ap :: Functor (a -> b) -> Functor a -> Functor b', (t) => {
  t.true(ap(Maybe.Nothing(), Maybe.of(10)).isNothing());
});


test('ap :: Functor (a -> b) -> Functor a -> Functor b', (t) => {
  t.true(ap(Maybe.of(double), Maybe.Nothing()).isNothing());
});
