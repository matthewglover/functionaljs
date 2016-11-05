const curry = require('./curry');


// every :: (a -> Boolean) -> [a] -> Boolean
const every = curry((predicate, array) => array.every(predicate));

module.exports = every;
