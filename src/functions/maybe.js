const curryN = require('./curryN');


// maybe :: b -> (a -> b) -> Maybe a -> b
const map = curryN(3, (b, f, ma) =>
  (ma.isNothing()
    ? b
    : f(ma.__value)));

module.exports = map;
