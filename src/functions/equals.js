/* eslint-disable no-use-before-define */
const curryN = require('./curryN');
const zip = require('./zip');
const typeOf = require('./type_of');
const apply = require('./apply');
const keys = require('./keys');
const every = require('./every');
const toPairs = require('./to_pairs');


// arrayEquals :: [a] -> [b] -> Boolean
const arrayEquals = (as, bs) =>
  as.length === bs.length &&
  every(apply(equals), zip(as, bs));


// objectEquals :: a -> b -> Boolean
const objectEquals = (ao, bo) => {
  const valuesEqual = ([k, v]) => equals(bo[k], v);

  return (
    keys(ao).length === keys(bo).length &&
    every(valuesEqual, toPairs(ao)));
};

// equals :: a -> b -> Boolean
const equals = curryN(2, (a, b) => {
  if (typeOf(a) !== typeOf(b)) return false;
  if (typeOf(a) === 'array') return arrayEquals(a, b);
  if (typeOf(a) === 'object') return objectEquals(a, b);
  return a === b;
});

module.exports = equals;
