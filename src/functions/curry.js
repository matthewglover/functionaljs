
// curry :: ((a, b, ..., f) => g) => a => b => ... f => g
const curry = (f, ...args) =>
  (args.length >= f.length
    ? f(...args)
    : (...moreArgs) => curry(f, ...args.concat(moreArgs)));

module.exports = curry;
