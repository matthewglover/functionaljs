const map = require('./map');

// zip :: [a] -> [b] -> [[a, b]]
const zip = (as, bs) =>
  map((a, i) => [a, bs[i]], as);

module.exports = zip;
