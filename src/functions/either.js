const curryN = require('./curryN');


// either :: (a -> c) -> (b -> c) -> Either a b -> c
const either = curryN(3, (f, g, ab) =>
  (ab.isLeft()
    ? f(ab.__value)
    : g(ab.__value)));

module.exports = either;
