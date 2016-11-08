const test = require('tape');
const { every } = require('../../src/functions');

const isEven = x => x % 2 === 0;
const evenNos = [2, 4, 6, 8, 12, 16];
const mixedNos = [2, 4, 6, 7, 8];

test('every :: (a -> Boolean) -> [a] -> Boolean', (t) => {
  const areEven = every(isEven);
  t.plan(2);
  t.true(areEven(evenNos));
  t.false(areEven(mixedNos));
});
