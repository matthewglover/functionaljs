const curryN = require('./curryN');


// every :: (a -> Boolean) -> [a] -> Boolean
const every = curryN(2, (predicate, array) => array.every(predicate));

module.exports = every;
