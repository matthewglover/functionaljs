const curry = require('./curry');


// maybe :: b -> (a -> b) -> Maybe a -> b
const map = curry((b, f, ma) =>
  (ma.isNothing()
    ? b
    : f(ma.__value)));

module.exports = map;
