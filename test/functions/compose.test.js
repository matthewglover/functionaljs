const test = require('tape');
const { compose } = require('../../src/functions');

const add = a => b => a + b;
const mult = a => b => a * b;

test('compose :: combines two functions, applying right to left', (t) => {
  t.equal(compose(add(2), mult(3))(5), 17);
  t.end();
});

test('compose :: function order matters', (t) => {
  t.not(
    compose(add(2), mult(3))(5),
    compose(mult(3), add(2))(5)
  );
  t.end();
});

test('compose :: combines more than two functions, applying right to left', (t) => {
  t.equal(
    compose(add(2), mult(3), add(2), add(3))(5),
    32
  );
  t.end();
});

test('compose :: works with a single function', (t) => {
  t.equal(compose(add(2))(5), 7);
  t.end();
});
