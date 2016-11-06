const keys = require('./keys');

// values :: {String: *} -> [*]
const values = o =>
  keys(o).map(k => o[k]);

module.exports = values;
