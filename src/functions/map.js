const curry = require('./curry');


// map :: (a -> b) -> F a -> F b
const map = curry((f, F) => F.map(f));

module.exports = map;
