import test from 'ava';
import { curry } from '../../src/functions';

const addA2 = (a, b) => a + b;

test('curry :: ((a, b, ..., f) => g) => a => b => ... f => g - returns function', (t) => {
  const curried = curry(addA2);
  t.true(typeof curried === 'function');
});

test('curry :: ((a, b, ..., f) => g) => a => b => ... f => g - return function which partially applies until all args received', (t) => {
  const curried = curry(addA2);
  t.true(typeof curried(1) === 'function');
});

test('curry :: ((a, b, ..., f) => g) => a => b => ... f => g - return function which partially applies until all args received', (t) => {
  const curried = curry(addA2);
  t.is(curried(1, 2), curried(1)(2));
});
