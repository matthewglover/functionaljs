const curry = require('./curry');
const compose = require('./compose');
const map = require('./map');
const ap = require('./ap');
const flip = require('./flip');

const apf = flip(ap);

// eslint-disable-next-line max-len
// liftA4 :: (a -> b -> c -> d -> e -> f) -> Functor a -> Functor b -> Functor c -> Functor d -> Functor e -> Functor f
const liftA5 = curry((f, fa, fb, fc, fd, fe) =>
  compose(apf(fe), apf(fd), apf(fc), apf(fb), map(f))(fa));

module.exports = liftA5;
