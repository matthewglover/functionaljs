const test = require('tape');
const { typeOf } = require('../../src/functions');

test('typeOf :: * -> String', (t) => {
  t.equal(typeOf('abc'), 'string');
  t.end();
});

test('typeOf :: * -> String', (t) => {
  t.equal(typeOf(1), 'number');
  t.end();
});

test('typeOf :: * -> String', (t) => {
  t.equal(typeOf(0x01), 'number');
  t.end();
});

test('typeOf :: * -> String', (t) => {
  t.equal(typeOf(1e3), 'number');
  t.end();
});

test('typeOf :: * -> String', (t) => {
  t.equal(typeOf(false), 'boolean');
  t.end();
});

test('typeOf :: * -> String', (t) => {
  t.equal(typeOf([]), 'array');
  t.end();
});

test('typeOf :: * -> String', (t) => {
  t.equal(typeOf(new Array()), 'array');   // eslint-disable-line no-array-constructor
  t.end();
});

test('typeOf :: * -> String', (t) => {
  t.equal(typeOf({}), 'object');
  t.end();
});

test('typeOf :: * -> String', (t) => {
  t.equal(typeOf(new Object()), 'object');   // eslint-disable-line no-new-object
  t.end();
});

test('typeOf :: * -> String', (t) => {
  t.equal(typeOf(null), 'null');
  t.end();
});

test('typeOf :: * -> String', (t) => {
  t.equal(typeOf(undefined), 'undefined');
  t.equal(typeOf(), 'undefined');
  t.end();
});
