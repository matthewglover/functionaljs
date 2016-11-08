const curry = require('./curry');


// apply :: (a... -> b) -> [a...] -> b
const apply = curry((f, args) => f(...args));

module.exports = apply;
