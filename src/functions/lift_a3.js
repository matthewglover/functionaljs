const curryN = require('./curryN');
const compose = require('./compose');
const map = require('./map');
const ap = require('./ap');
const flip = require('./flip');

const apf = flip(ap);

// liftA3 :: (a -> b -> c -> d) -> Functor a -> Functor b -> Functor c
const liftA3 = curryN(4, (f, fa, fb, fc) =>
  compose(apf(fc), apf(fb), map(f))(fa));

module.exports = liftA3;
