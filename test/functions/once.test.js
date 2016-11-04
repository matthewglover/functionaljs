import test from 'ava';
import sinon from 'sinon';
import { once } from '../../src/functions';

test('once :: (a... -> b) -> (a... -> b) - returns a function', (t) => {
  const f = a => a;
  t.true(typeof once(f) === 'function');
});

test('once :: (a... -> b) -> (a... -> b) - first call runs inner function', (t) => {
  const f = a => a;
  const onceF = once(f);
  t.is(onceF(10), 10);
  t.is(onceF(10), undefined);
});

test('once :: (a... -> b) -> (a... -> b) - subsequent calls return undefined', (t) => {
  const f = a => a;
  const onceF = once(f);
  t.is(onceF(10), 10);
  t.is(onceF(10), undefined);
  t.is(onceF(10), undefined);
});

test('once :: (a... -> b) -> (a... -> b) - runs inner function once only', (t) => {
  const f = sinon.spy();
  const onceF = once(f);
  Array.from({ length: 10 }).forEach(onceF);
  t.true(f.calledOnce);
});
