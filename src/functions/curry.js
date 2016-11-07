const __curry = require('./__curry');
const curryN = require('./curryN');


const curry = f =>
  (f.length <= 6
    ? curryN(f.length, f)
    : __curry(f));

module.exports = curry;
