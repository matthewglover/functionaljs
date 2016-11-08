import test from 'ava';
import { curry } from '../../src/functions';

const addA2 = (a, b) => a + b;
const addA7 = (a, b, c, d, e, f, g) => a + b + c + d + e + f + g;

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

test('curry :: ((a, b, ..., f) => g) => a => b => ... f => g - use fallback __curry for arity > 6', (t) => {
  const curried = curry(addA7);
  t.is(curried(1, 2, 3, 4, 5, 6, 7), curried(1)(2)(3)(4)(5)(6)(7));
});
