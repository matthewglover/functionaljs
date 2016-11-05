
// values :: {String: *} -> [*]
const values = o =>
  Object.keys(o).map(k => o[k]);

module.exports = values;
