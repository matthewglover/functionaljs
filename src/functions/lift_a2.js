const curryN = require('./curryN');
const map = require('./map');
const ap = require('./ap');

// liftA2 :: (a -> b -> c) -> Functor a -> Functor b -> Functor c
const liftA2 = curryN(3, (f, fa, fb) =>
  ap(map(f, fa), fb));

module.exports = liftA2;
