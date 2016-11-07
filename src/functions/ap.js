const curryN = require('./curryN');

// ap :: Functor (a -> b) -> Functor a -> Functor b
const ap = curryN(2, (fa, fb) => fa.ap(fb));

module.exports = ap;
