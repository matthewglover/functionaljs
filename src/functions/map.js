const curry = require('./curry');

const map = curry((f, F) => F.map(f));

module.exports = map;
