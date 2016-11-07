const curryN = require('./curryN');

// flip :: (a, ... b -> c) -> (b..., a -> c)
const flip = f =>
  curryN(f.length, (...args) => f(...args.reverse()));

module.exports = flip;
