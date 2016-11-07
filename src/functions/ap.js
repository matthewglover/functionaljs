const curry = require('./curry');

// ap :: Functor (a -> b) -> Functor a -> Functor b
const ap = curry((fa, fb) => fa.ap(fb));

module.exports = ap;
