const test = require('tape');
const sinon = require('sinon');
const { apply, identity } = require('../../src/functions');

test('apply :: (a... -> b) -> [a...] -> b - applies args to function', (t) => {
  const spy = sinon.spy();
  apply(spy, ['a', 'b', 'c']);
  t.plan(2);
  t.true(spy.calledOnce);
  t.true(spy.calledWithExactly('a', 'b', 'c'));
  t.end();
});

test('apply :: (a... -> b) -> [a...] -> b - returns result of apply args to function', (t) => {
  t.deepEqual(apply(identity, [[1, 2, 3]]), [1, 2, 3]);
  t.end();
});
