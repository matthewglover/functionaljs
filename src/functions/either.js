const curry = require('./curry');


// either :: (a -> c) -> (b -> c) -> Either a b -> c
const either = curry((f, g, ab) =>
  (ab.isLeft()
    ? f(ab.__value)
    : g(ab.__value)));

module.exports = either;
