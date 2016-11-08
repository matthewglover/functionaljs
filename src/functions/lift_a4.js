const curry = require('./curry');
const compose = require('./compose');
const map = require('./map');
const ap = require('./ap');
const flip = require('./flip');

const apf = flip(ap);

// eslint-disable-next-line max-len
// liftA4 :: (a -> b -> c -> d -> e) -> Functor a -> Functor b -> Functor c -> Functor d -> Functor e
const liftA4 = curry((f, fa, fb, fc, fd) =>
  compose(apf(fd), apf(fc), apf(fb), map(f))(fa));

module.exports = liftA4;
