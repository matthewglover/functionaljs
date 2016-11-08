const test = require('tape');
const { curryN } = require('../../src/functions');

const addA2 = (a, b) => a + b;
const addA3 = (a, b, c) => a + b + c;
const addA4 = (a, b, c, d) => a + b + c + d;
const addA5 = (a, b, c, d, e) => a + b + c + d + e;
const addA6 = (a, b, c, d, e, f) => a + b + c + d + e + f;

test('curryN :: ((a, b, ..., f) => g, n) => a => b => ... f => g - returns function', (t) => {
  const curried = curryN(addA2, 2);
  t.true(typeof curried === 'function');
  t.end();
});

test('curryN :: ((a, b, ..., f) => g, n) => a => b => ... f => g - return function which partially applies until all args received', (t) => {
  const curried = curryN(addA2, 2);
  t.true(typeof curried(1) === 'function');
  t.end();
});

test('curryN :: ((a, b, ..., f) => g, n) => a => b => ... f => g - return function which partially applies until all args received', (t) => {
  const curried = curryN(2, addA2);
  t.equal(curried()(1, 2), 3);
  t.equal(curried(1, 2), 3);
  t.equal(curried(1)(2), 3);
  t.end();
});

test('curryN :: ((a, b, ..., f) => g, n) => a => b => ... f => g - return function which partially applies until all args received', (t) => {
  const curried = curryN(3, addA3);
  t.equal(curried()(1, 2, 3), 6);
  t.equal(curried(1, 2, 3), 6);
  t.equal(curried(1)(2, 3), 6);
  t.equal(curried(1, 2)(3), 6);
  t.end();
});

test('curryN :: ((a, b, ..., f) => g, n) => a => b => ... f => g - return function which partially applies until all args received', (t) => {
  const curried = curryN(4, addA4);
  t.equal(curried()(1, 2, 3, 4), 10);
  t.equal(curried(1, 2, 3, 4), 10);
  t.equal(curried(1)(2, 3, 4), 10);
  t.equal(curried(1, 2, 3)(4), 10);
  t.equal(curried(1, 2)(3, 4), 10);
  t.end();
});

test('curryN :: ((a, b, ..., f) => g, n) => a => b => ... f => g - return function which partially applies until all args received', (t) => {
  const curried = curryN(5, addA5);
  t.equal(curried()(1, 2, 3, 4, 5), 15);
  t.equal(curried(1, 2, 3, 4, 5), 15);
  t.equal(curried(1)(2, 3, 4, 5), 15);
  t.equal(curried(1, 2)(3, 4, 5), 15);
  t.equal(curried(1, 2, 3)(4, 5), 15);
  t.equal(curried(1, 2, 3, 4)(5), 15);
  t.end();
});

test('curryN :: ((a, b, ..., f) => g, n) => a => b => ... f => g - return function which partially applies until all args received', (t) => {
  const curried = curryN(6, addA6);
  t.equal(curried()(1, 2, 3, 4, 5, 6), 21);
  t.equal(curried(1, 2, 3, 4, 5, 6), 21);
  t.equal(curried(1)(2, 3, 4, 5, 6), 21);
  t.equal(curried(1, 2)(3, 4, 5, 6), 21);
  t.equal(curried(1, 2, 3)(4, 5, 6), 21);
  t.equal(curried(1, 2, 3, 4)(5, 6), 21);
  t.equal(curried(1, 2, 3, 4, 5)(6), 21);
  t.end();
});

test('curryN :: ((a, b, ..., f) => g, n) => a => b => ... f => g - return function which partially applies until all args received', (t) => {
  const curried = curryN(1, a => a + 1);
  t.equal(curried()(1), 2);
  t.equal(curried(1), 2);
  t.end();
});
