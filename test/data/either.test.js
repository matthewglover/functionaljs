/* eslint-disable no-underscore-dangle */
import test from 'ava';
import { Either, Right, Left } from '../../src/data';
import { compose } from '../../src/functions';


const testError = new Error('Test error');

const double = x => x * 2;

test('Either.of :: returns instance of Either and Right', (t) => {
  const e = Either.of(10);
  t.true(e instanceof Either);
  t.true(e instanceof Right);
});

test('Either.Right :: returns instance of Either and Right', (t) => {
  const e = Either.Right(10);
  t.true(e instanceof Either);
  t.true(e instanceof Right);
});

test('Either.Left :: returns instance of Either and Left', (t) => {
  const e = Either.Left(testError);
  t.true(e instanceof Either);
  t.true(e instanceof Left);
});

test('Either::map - Either a b ~> (b -> c) -> Either a c - Right b', (t) => {
  const eb = Either.of(10);
  const ec = eb.map(double);
  t.is(ec.__value, 20);
});

test('Either::map - Either a b ~> (b -> c) -> Either a c - Left a', (t) => {
  const eb = Either.Left(testError);
  const ec = eb.map(double);
  t.true(ec instanceof Left);
  t.is(ec.__value, testError);
});

test('Either::chain - Either a b ~> (b -> Either a c) -> Either a c - Right b', (t) => {
  const eb = Either.of(10);
  const ec = eb.chain(compose(Either.of, double));
  t.true(ec instanceof Right);
  t.is(ec.__value, 20);
});

test('Either::chain - Either a b ~> (b -> Either a c) -> Either a c - (Either.Left)', (t) => {
  const eb = Either.Left(testError);
  const ec = eb.chain(compose(Either.of, double));
  t.true(ec instanceof Left);
  t.is(ec.__value, testError);
});

test('Either::chain - Either a b ~> (b -> Either a c) -> Either a c - (chain to Either.Left)', (t) => {
  const eb = Either.of(10);
  const ec = eb.chain(() => Either.Left(testError));
  t.true(ec instanceof Left);
  t.is(ec.__value, testError);
});

test('Either::ap - Either a (b -> c) ~> Either a b -> Either a c - (Right (b -> c))', (t) => {
  const eb = Either.of(double);
  const ec = eb.ap(Either.of(10));
  t.true(ec instanceof Right);
  t.is(ec.__value, 20);
});

test('Either::ap - Either a (b -> c) ~> Either a b -> Either a c - (Left a)', (t) => {
  const eb = Either.Left(testError);
  const ec = eb.ap(Either.of(10));
  t.true(ec instanceof Left);
  t.is(ec.__value, testError);
});

test('Either::ap - Either a (b -> c) ~> Either a b -> Either a c - (Right (b -> c), Left a)', (t) => {
  const eb = Either.of(double);
  const ec = eb.ap(Either.Left(testError));
  t.true(ec instanceof Left);
  t.is(ec.__value, testError);
});
