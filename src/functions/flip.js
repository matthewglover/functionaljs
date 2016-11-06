const curryN = require('./curryN');

const flip = f =>
  curryN(f.length, (...args) => f(...args.reverse()));

module.exports = flip;
