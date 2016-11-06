import test from 'ava';
import { typeOf } from '../../src/functions';

test('typeOf :: * -> String', (t) => {
  t.is(typeOf('abc'), 'string');
});

test('typeOf :: * -> String', (t) => {
  t.is(typeOf(1), 'number');
});

test('typeOf :: * -> String', (t) => {
  t.is(typeOf(0x01), 'number');
});

test('typeOf :: * -> String', (t) => {
  t.is(typeOf(1e3), 'number');
});

test('typeOf :: * -> String', (t) => {
  t.is(typeOf(false), 'boolean');
});

test('typeOf :: * -> String', (t) => {
  t.is(typeOf([]), 'array');
});

test('typeOf :: * -> String', (t) => {
  t.is(typeOf(new Array()), 'array');   // eslint-disable-line no-array-constructor
});

test('typeOf :: * -> String', (t) => {
  t.is(typeOf({}), 'object');
});

test('typeOf :: * -> String', (t) => {
  t.is(typeOf(new Object()), 'object');   // eslint-disable-line no-new-object
});

test('typeOf :: * -> String', (t) => {
  t.is(typeOf(null), 'null');
});

test('typeOf :: * -> String', (t) => {
  t.is(typeOf(undefined), 'undefined');
  t.is(typeOf(), 'undefined');
});
