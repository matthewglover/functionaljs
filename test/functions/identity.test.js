const test = require('tape');
const { identity } = require('../../src/functions');


test('identity :: x -> x', (t) => {
  const o = {};
  t.equal(identity(o), o);
  t.end();
});
