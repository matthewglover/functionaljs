import test from 'ava';
import { curryN } from '../../src/functions';

const addA2 = (a, b) => a + b;
const addA3 = (a, b, c) => a + b + c;
const addA4 = (a, b, c, d) => a + b + c + d;
const addA5 = (a, b, c, d, e) => a + b + c + d + e;

test('curryN :: ((a, b, ..., f) => g, n) => a => b => ... f => g - returns function', (t) => {
  const curried = curryN(addA2, 2);
  t.true(typeof curried === 'function');
});

test('curryN :: ((a, b, ..., f) => g, n) => a => b => ... f => g - return function which partially applies until all args received', (t) => {
  const curried = curryN(addA2, 2);
  t.true(typeof curried(1) === 'function');
});

test('curryN :: ((a, b, ..., f) => g, n) => a => b => ... f => g - return function which partially applies until all args received', (t) => {
  const curried = curryN(2, addA2);
  t.is(curried()(1, 2), 3);
  t.is(curried(1, 2), 3);
  t.is(curried(1)(2), 3);
});

test('curryN :: ((a, b, ..., f) => g, n) => a => b => ... f => g - return function which partially applies until all args received', (t) => {
  const curried = curryN(3, addA3);
  t.is(curried()(1, 2, 3), 6);
  t.is(curried(1, 2, 3), 6);
  t.is(curried(1)(2, 3), 6);
  t.is(curried(1, 2)(3), 6);
});

test('curryN :: ((a, b, ..., f) => g, n) => a => b => ... f => g - return function which partially applies until all args received', (t) => {
  const curried = curryN(4, addA4);
  t.is(curried()(1, 2, 3, 4), 10);
  t.is(curried(1, 2, 3, 4), 10);
  t.is(curried(1)(2, 3, 4), 10);
  t.is(curried(1, 2, 3)(4), 10);
  t.is(curried(1, 2)(3, 4), 10);
});

test('curryN :: ((a, b, ..., f) => g, n) => a => b => ... f => g - return function which partially applies until all args received', (t) => {
  const curried = curryN(5, addA5);
  t.is(curried()(1, 2, 3, 4, 5), 15);
  t.is(curried(1, 2, 3, 4, 5), 15);
  t.is(curried(1)(2, 3, 4, 5), 15);
  t.is(curried(1, 2)(3, 4, 5), 15);
  t.is(curried(1, 2, 3)(4, 5), 15);
  t.is(curried(1, 2, 3, 4)(5), 15);
});

test('curryN :: ((a, b, ..., f) => g, n) => a => b => ... f => g - return function which partially applies until all args received', (t) => {
  const curried = curryN(1, a => a + 1);
  t.is(curried()(1), 2);
  t.is(curried(1), 2);
});
