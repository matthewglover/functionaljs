const curry = require('./curry');
const map = require('./map');
const ap = require('./ap');

// liftA2 :: (a -> b -> c) -> Functor a -> Functor b -> Functor c
const liftA2 = curry((f, fa, fb) =>
  ap(map(f, fa), fb));

module.exports = liftA2;
