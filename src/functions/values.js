const keys = require('./keys');
const map = require('./map');

// values :: {String: *} -> [*]
const values = o =>
  map(k => o[k], keys(o));

module.exports = values;
