const curryN = require('./curryN');


// map :: (a -> b) -> F a -> F b
const map = curryN(2, (f, F) => F.map(f));

module.exports = map;
