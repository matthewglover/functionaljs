const curryN = require('./curryN');
const map = require('./map');

// zip :: [a] -> [b] -> [[a, b]]
const zip = curryN(2, (as, bs) =>
  map((a, i) => [a, bs[i]], as));

module.exports = zip;
