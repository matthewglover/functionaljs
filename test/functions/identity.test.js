import test from 'ava';
import { identity } from '../../src/functions';


test('identity :: x -> x', (t) => {
  const o = {};
  t.is(identity(o), o);
});
