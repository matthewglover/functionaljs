/* eslint-disable no-underscore-dangle */
const test = require('tape');
const { ap } = require('../../src/functions');
const { Maybe } = require('../../src/data');

const double = a => a * 2;

test('ap :: Functor (a -> b) -> Functor a -> Functor b', (t) => {
  t.equal(ap(Maybe.of(double), Maybe.of(10)).__value, 20);
  t.end();
});


test('ap :: Functor (a -> b) -> Functor a -> Functor b', (t) => {
  t.true(ap(Maybe.Nothing, Maybe.of(10)).isNothing());
  t.end();
});


test('ap :: Functor (a -> b) -> Functor a -> Functor b', (t) => {
  t.true(ap(Maybe.of(double), Maybe.Nothing).isNothing());
  t.end();
});
