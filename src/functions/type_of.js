// typeOf :: a -> String
const typeOf = (x) => {
  if (Array.isArray(x)) return 'array';
  if (x === null) return 'null';
  return typeof x;
};

module.exports = typeOf;
