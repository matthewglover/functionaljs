
// __curry :: ((a, b, ..., f) => g) => a => b => ... f => g
const __curry = (f, ...args) =>
  (args.length >= f.length
    ? f(...args)
    : (...moreArgs) => __curry(f, ...args.concat(moreArgs)));

module.exports = __curry;
