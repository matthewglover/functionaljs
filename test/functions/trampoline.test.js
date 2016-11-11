const test = require('tape');
const { trampoline } = require('../../src/functions');


const add = (a, b) => a + b;

const pureFactorial = n =>
  (n > 0
    ? n * pureFactorial(n - 1)
    : 1);

const tailCallFactorial = (n, acc = 1) =>
  (n > 0
    ? tailCallFactorial(n - 1, acc * n)
    : acc);

const thunkFactorial = (p, acc = 1) =>
  (p > 0
    ? () => thunkFactorial(p - 1, acc * p)
    : acc);

const trampolineFactorial = trampoline(thunkFactorial);

const factorial50 = 30414093201713378043612608166064768844377641568960512000000000000;

test('trampoline :: (*... -> a) -> (*... -> a) - simple function', (t) => {
  t.deepEqual(trampoline(add)(1, 2), 3);
  t.end();
});

test('pureFactorial works', (t) => {
  t.equal(pureFactorial(2), 2);             // Check small numbers
  t.equal(pureFactorial(5), 120);
  t.equal(pureFactorial(50), factorial50);  // Check large numbers still work
  t.equal(pureFactorial(200), Infinity);    // Check function works (although ouside of Js numbers)
  t.throws(() => pureFactorial(20000), /Maximum call stack size exceeded/);   // Check stack overflow size
  t.end();
});

test('tailCallFactorial works until stack overflows', (t) => {
  t.equal(tailCallFactorial(2), 2);
  t.equal(tailCallFactorial(5), 120);
  t.equal(tailCallFactorial(50), factorial50);
  t.equal(tailCallFactorial(200), Infinity);
  t.throws(() => tailCallFactorial(20000), /Maximum call stack size exceeded/);
  t.end();
});

test('trampolineFactorial', (t) => {
  t.equal(trampolineFactorial(2), 2);
  t.equal(trampolineFactorial(5), 120);
  t.equal(trampolineFactorial(50), factorial50);
  t.equal(trampolineFactorial(200), Infinity);
  t.equal(trampolineFactorial(20000), Infinity);
  t.end();
});
