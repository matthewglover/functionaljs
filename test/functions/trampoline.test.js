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
    ? trampoline.thunk(() => thunkFactorial(p - 1, acc * p))
    : acc);

const trampolineFactorial = trampoline(thunkFactorial);

const factorial50 = 30414093201713378043612608166064768844377641568960512000000000000;

const zero = () => null;
const succ = prev => () => prev;

const one = succ(zero);
const two = succ(one);
const three = succ(two);

const natToInt = nat =>
  (nat === zero
    ? 0
    : 1 + natToInt(nat()));

const thunkNatToInt = (nat, acc = 0) =>
  (nat === zero
    ? acc
    : trampoline.thunk(() => thunkNatToInt(nat(), acc + 1)));

const trampolineNatToInt = trampoline(thunkNatToInt);

const intToNat = (n) => {
  let res = zero;
  for (let i = 0; i < n; i += 1) res = succ(res);
  return res;
};

const intToNatRecursive = n =>
  (n === 0
    ? zero
    : succ(intToNatRecursive(n - 1)));

const thunkIntToNat = (n, acc = zero) =>
  (n === 0
    ? acc
    : trampoline.thunk(() => thunkIntToNat(n - 1, succ(acc))));

const trampolineIntToNat = trampoline(thunkIntToNat);


const nat20000 = intToNat(20000);
const nat50000 = intToNat(50000);


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

test('natToInt turns natural to integer (recursively)', (t) => {
  t.equal(natToInt(three), 3);
  t.equal(natToInt(intToNat(20)), 20);
  t.end();
});

test('natToInt throws stack overflow for large numbers', (t) => {
  t.throws(() => natToInt(nat20000), /Maximum call stack size exceeded/);
  t.end();
});

test('trampolineNatToInt works even for large numbers', (t) => {
  t.equal(trampolineNatToInt(nat20000), 20000);
  t.equal(trampolineNatToInt(nat50000), 50000);
  t.end();
});


test('intToNatRecursive turns int to nat recursively', (t) => {
  t.equal(trampolineNatToInt(intToNatRecursive(100)), 100);
  t.end();
});

test('intToNatRecursive throws stack overflow for large numbers', (t) => {
  t.throws(() => trampolineNatToInt(intToNatRecursive(20000)), /Maximum call stack size exceeded/);
  t.end();
});

test('intToNatRecursive throws stack overflow for large numbers', (t) => {
  t.equal(trampolineNatToInt(trampolineIntToNat(20000)), 20000);
  t.end();
});
