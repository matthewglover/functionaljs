const curryN = require('./curryN');

// flip :: (a, ... b -> c) -> (b..., a -> c)
const flip = (f) => {
  const flipped = (...args) => f(...args.reverse());

  // Curry flipped function if possible
  return f.length <= 6
    ? curryN(f.length, flipped)
    : flipped;
};

module.exports = flip;
