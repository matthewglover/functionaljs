const curry = require('./curry');

// chain :: (a -> M b) -> M a -> M b
const chain = curry((f, M) => M.chain(f));

module.exports = chain;
