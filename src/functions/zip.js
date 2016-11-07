const curry = require('./curry');
const map = require('./map');

// zip :: [a] -> [b] -> [[a, b]]
const zip = curry((as, bs) =>
  map((a, i) => [a, bs[i]], as));

module.exports = zip;
