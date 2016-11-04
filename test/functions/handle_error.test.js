import test from 'ava';
import sinon from 'sinon';
import { handleError } from '../../src/functions';

const testError = new Error('Test error');

const errorFn = (x) => {
  if (x > 10) throw testError;
  return x;
};


test('handleError :: (e -> c) -> (a -> b) -> a -> (b | c) - returns b if no error', (t) => {
  const onError = sinon.spy();
  const res = handleError(onError, errorFn, 10);
  t.plan(2);
  t.is(res, 10);
  t.false(onError.called);
});

test('handleError :: (e -> c) -> (a -> b) -> a -> (b | c) - calls onError handler if error', (t) => {
  const onError = sinon.spy();
  handleError(onError, errorFn, 11);
  t.plan(3);
  t.true(onError.called);
  t.true(onError.calledOnce);
  t.true(onError.calledWith(testError));
});

test('handleError :: (e -> c) -> (a -> b) -> a -> (b | c) - calls onError handler if error', (t) => {
  const onError = e => ['error handled', e];
  const res = handleError(onError, errorFn, 11);
  t.deepEqual(res, ['error handled', testError]);
});

test('handleError :: (e -> c) -> (a -> b) -> a -> (b | c) - arguments curried', (t) => {
  const onError = e => ['error handled', e];
  const f = handleError(onError, errorFn);
  t.deepEqual(f(11), ['error handled', testError]);
});
