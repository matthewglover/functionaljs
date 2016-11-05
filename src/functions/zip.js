
// zip :: [a] -> [b] -> [[a, b]]
const zip = (as, bs) =>
  as.map((a, i) => [a, bs[i]]);

module.exports = zip;
