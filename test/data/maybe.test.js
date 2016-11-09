/* eslint-disable no-underscore-dangle */
const test = require('tape');
const { Maybe, Just, Nothing } = require('../../src/data');
const { compose } = require('../../src/functions');

const double = x => x * 2;

test('Maybe.of - non-nil value returns instance of Maybe and Just', (t) => {
  const m = Maybe.of(10);
  t.true(m instanceof Maybe);
  t.true(m instanceof Just);
  t.end();
});

test('Maybe.of - null returns instance of Maybe and Nothing', (t) => {
  const m = Maybe.of(null);
  t.true(m instanceof Maybe);
  t.true(m instanceof Nothing);
  t.end();
});

test('Maybe.of - undefined returns instance of Maybe and Nothing', (t) => {
  const m = Maybe.of(undefined);
  t.true(m instanceof Maybe);
  t.true(m instanceof Nothing);
  t.end();
});

test('Maybe.Nothing - returns instance of Maybe and Nothing', (t) => {
  const m = Maybe.Nothing;
  t.true(m instanceof Maybe);
  t.true(m instanceof Nothing);
  t.end();
});

test('Maybe::isNothing - Maybe a ~> () -> boolean: Just returns false', (t) => {
  t.false(Maybe.of(1).isNothing());
  t.end();
});

test('Maybe::isNothing - Maybe a ~> () -> boolean: Nothing returns true', (t) => {
  t.true(Maybe.of(null).isNothing());
  t.end();
});

test('Maybe::isJust - Maybe a ~> () -> boolean: Just returns true', (t) => {
  t.true(Maybe.of(1).isJust());
  t.end();
});

test('Maybe::isJust - Maybe a ~> () -> boolean: Nothing returns false', (t) => {
  t.false(Maybe.of(null).isJust());
  t.end();
});

test('Maybe::equals - Maybe a ~> Maybe b -> boolean - Just', (t) => {
  const m = Maybe.of(10);
  t.true(m.equals(Maybe.of(10)));
  t.false(m.equals(Maybe.of(2)));
  t.false(m.equals(Maybe.of(null)));
  t.end();
});

test('Maybe::equals - Maybe a ~> Maybe b -> boolean - Nothing', (t) => {
  const m = Maybe.of(null);
  t.true(m.equals(Maybe.of(null)));
  t.true(m.equals(Maybe.of(undefined)));
  t.false(m.equals(Maybe.of(1)));
  t.end();
});

test('Maybe::map - Maybe a ~> (a -> b) -> Maybe b - Just a', (t) => {
  const ma = Maybe.of(10);
  const mb = ma.map(double);
  t.equal(mb.__value, 20);
  t.end();
});

test('Maybe::map - Maybe a ~> (a -> b) -> Maybe b - Just a (null mapper)', (t) => {
  const ma = Maybe.of(10);
  const mb = ma.map(() => null);
  t.true(mb.isNothing());
  t.end();
});


test('Maybe::map - Maybe a ~> (a -> b) -> Maybe b - Nothing', (t) => {
  const ma = Maybe.of(null);
  const mb = ma.map(double);
  t.true(mb.isNothing());
  t.end();
});

test('Maybe::chain - Maybe a ~> (a -> Maybe b) -> Maybe b - Just a', (t) => {
  const ma = Maybe.of(10);
  const mb = ma.chain(compose(Maybe.of, double));
  t.equal(mb.__value, 20);
  t.end();
});

test('Maybe::chain - Maybe a ~> (a -> Maybe b) -> Maybe b - (null mapper)', (t) => {
  const ma = Maybe.of(10);
  const mb = ma.chain(compose(Maybe.of, () => null));
  t.true(mb.isNothing());
  t.end();
});

test('Maybe::chain - Maybe a ~> (a -> Maybe b) -> Maybe b - Nothing', (t) => {
  const ma = Maybe.of(null);
  const mb = ma.chain(compose(Maybe.of, double));
  t.true(mb.isNothing());
  t.end();
});

test('Maybe::ap - Maybe (a -> b) ~> Maybe a -> Maybe b - Just (a -> b)', (t) => {
  const ma = Maybe.of(double);
  const mb = ma.ap(Maybe.of(10));
  t.equal(mb.__value, 20);
  t.end();
});

test('Maybe::ap - Maybe (a -> b) ~> Maybe a -> Maybe b - Just (a -> null)', (t) => {
  const ma = Maybe.of(() => null);
  const mb = ma.ap(Maybe.of(10));
  t.true(mb.isNothing());
  t.end();
});

test('Maybe::ap - Maybe (a -> b) ~> Maybe a -> Maybe b - Just (a -> b)', (t) => {
  const ma = Maybe.of(() => null);
  const mb = ma.ap(Maybe.of(null));
  t.true(mb.isNothing());
  t.end();
});

test('Maybe::ap - Maybe (a -> b) ~> Maybe a -> Maybe b - Nothing', (t) => {
  const ma = Maybe.of(null);
  const mb = ma.ap(Maybe.of(1));
  t.true(mb.isNothing());
  t.end();
});
