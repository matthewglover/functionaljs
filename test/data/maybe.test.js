/* eslint-disable no-underscore-dangle, new-cap */
import test from 'ava';
import { Maybe, Just, Nothing } from '../../src/data';
import { compose } from '../../src/functions';

const double = x => x * 2;

test('Maybe.of - non-nil value returns instance of Maybe and Just', (t) => {
  const m = Maybe.of(10);
  t.true(m instanceof Maybe);
  t.true(m instanceof Just);
});

test('Maybe.of - null returns instance of Maybe and Nothing', (t) => {
  const m = Maybe.of(null);
  t.true(m instanceof Maybe);
  t.true(m instanceof Nothing);
});

test('Maybe.of - undefined returns instance of Maybe and Nothing', (t) => {
  const m = Maybe.of(undefined);
  t.true(m instanceof Maybe);
  t.true(m instanceof Nothing);
});

test('Maybe.Nothing - returns instance of Maybe and Nothing', (t) => {
  const m = Maybe.Nothing();
  t.true(m instanceof Maybe);
  t.true(m instanceof Nothing);
});

test('Maybe::isNothing - Maybe a ~> () -> boolean: Just returns false', (t) => {
  t.false(Maybe.of(1).isNothing());
});

test('Maybe::isNothing - Maybe a ~> () -> boolean: Nothing returns true', (t) => {
  t.true(Maybe.of(null).isNothing());
});

test('Maybe::isJust - Maybe a ~> () -> boolean: Just returns true', (t) => {
  t.true(Maybe.of(1).isJust());
});

test('Maybe::isJust - Maybe a ~> () -> boolean: Nothing returns false', (t) => {
  t.false(Maybe.of(null).isJust());
});

test('Maybe::equals - Maybe a ~> any -> boolean - Just', (t) => {
  const m = Maybe.of(10);
  t.true(m.equals(Maybe.of(10)));
  t.false(m.equals(Maybe.of(2)));
  t.false(m.equals(Maybe.of(null)));
});

test('Maybe::equals - Maybe a ~> any -> boolean - Nothing', (t) => {
  const m = Maybe.of(null);
  t.true(m.equals(Maybe.of(null)));
  t.true(m.equals(Maybe.of(undefined)));
  t.false(m.equals(Maybe.of(1)));
});

test('Maybe::map - Maybe a ~> (a -> b) -> Maybe b - Just a', (t) => {
  const ma = Maybe.of(10);
  const mb = ma.map(double);
  t.is(mb.__value, 20);
});

test('Maybe::map - Maybe a ~> (a -> b) -> Maybe b - Just a (null mapper)', (t) => {
  const ma = Maybe.of(10);
  const mb = ma.map(() => null);
  t.true(mb.isNothing());
});


test('Maybe::map - Maybe a ~> (a -> b) -> Maybe b - Nothing', (t) => {
  const ma = Maybe.of(null);
  const mb = ma.map(double);
  t.true(mb.isNothing());
});

test('Maybe::chain - Maybe a ~> (a -> Maybe b) -> Maybe b - Just a', (t) => {
  const ma = Maybe.of(10);
  const mb = ma.chain(compose(Maybe.of, double));
  t.is(mb.__value, 20);
});

test('Maybe::chain - Maybe a ~> (a -> Maybe b) -> Maybe b - (null mapper)', (t) => {
  const ma = Maybe.of(10);
  const mb = ma.chain(compose(Maybe.of, () => null));
  t.true(mb.isNothing());
});

test('Maybe::chain - Maybe a ~> (a -> Maybe b) -> Maybe b - Nothing', (t) => {
  const ma = Maybe.of(null);
  const mb = ma.chain(compose(Maybe.of, double));
  t.true(mb.isNothing());
});

test('Maybe::ap - Maybe (a -> b) ~> Maybe a -> Maybe b - Just (a -> b)', (t) => {
  const ma = Maybe.of(double);
  const mb = ma.ap(Maybe.of(10));
  t.is(mb.__value, 20);
});

test('Maybe::ap - Maybe (a -> b) ~> Maybe a -> Maybe b - Just (a -> null)', (t) => {
  const ma = Maybe.of(() => null);
  const mb = ma.ap(Maybe.of(10));
  t.true(mb.isNothing());
});

test('Maybe::ap - Maybe (a -> b) ~> Maybe a -> Maybe b - Just (a -> b)', (t) => {
  const ma = Maybe.of(() => null);
  const mb = ma.ap(Maybe.of(null));
  t.true(mb.isNothing());
});

test('Maybe::ap - Maybe (a -> b) ~> Maybe a -> Maybe b - Nothing', (t) => {
  const ma = Maybe.of(null);
  const mb = ma.ap(Maybe.of(1));
  t.true(mb.isNothing());
});
