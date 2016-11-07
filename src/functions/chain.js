const curryN = require('./curryN');

// chain :: (a -> M b) -> M a -> M b
const chain = curryN(2, (f, M) => M.chain(f));

module.exports = chain;
