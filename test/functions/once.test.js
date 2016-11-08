const test = require('tape');
const sinon = require('sinon');
const { once } = require('../../src/functions');

test('once :: (a... -> b) -> (a... -> b) - returns a function', (t) => {
  const f = a => a;
  t.true(typeof once(f) === 'function');
  t.end();
});

test('once :: (a... -> b) -> (a... -> b) - first call runs inner function', (t) => {
  const f = a => a;
  const onceF = once(f);
  t.equal(onceF(10), 10);
  t.equal(onceF(10), undefined);
  t.end();
});

test('once :: (a... -> b) -> (a... -> b) - subsequent calls return undefined', (t) => {
  const f = a => a;
  const onceF = once(f);
  t.equal(onceF(10), 10);
  t.equal(onceF(10), undefined);
  t.equal(onceF(10), undefined);
  t.end();
});

test('once :: (a... -> b) -> (a... -> b) - runs inner function once only', (t) => {
  const f = sinon.spy();
  const onceF = once(f);
  Array.from({ length: 10 }).forEach(onceF);
  t.true(f.calledOnce);
  t.end();
});
