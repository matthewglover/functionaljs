const curryN = require('./curryN');


// apply :: (a... -> b) -> [a...] -> b
const apply = curryN(2, (f, args) => f(...args));

module.exports = apply;
