const __curry = require('./__curry');
const identity = require('./identity');

const curry0 = identity;

const curry1 = f => function inner(a) {
  return (arguments.length >= 1
    ? f(a)
    : curry1(f));
};

// NOTE: must use function to use arguments.length
const curry2 = f => function inner(a, b) {
  switch (arguments.length) {
    case 0: return curry2(f);
    case 1: return curry1(bb => f(a, bb));
    default: return f(a, b);
  }
};

const curry3 = f => function inner(a, b, c) {
  switch (arguments.length) {
    case 0: return curry3(f);
    case 1: return curry2((bb, cc) => f(a, bb, cc));
    case 2: return curry1(cc => f(a, b, cc));
    default: return f(a, b, c);
  }
};

const curry4 = f => function inner(a, b, c, d) {
  switch (arguments.length) {
    case 0: return curry4(f);
    case 1: return curry3((bb, cc, dd) => f(a, bb, cc, dd));
    case 2: return curry2((cc, dd) => f(a, b, cc, dd));
    case 3: return curry1(dd => f(a, b, c, dd));
    default: return f(a, b, c, d);
  }
};

const curry5 = f => function inner(a, b, c, d, e) {
  switch (arguments.length) {
    case 0: return curry5(f);
    case 1: return curry4((bb, cc, dd, ee) => f(a, bb, cc, dd, ee));
    case 2: return curry3((cc, dd, ee) => f(a, b, cc, dd, ee));
    case 3: return curry2((dd, ee) => f(a, b, c, dd, ee));
    case 4: return curry1(ee => f(a, b, c, d, ee));
    default: return f(a, b, c, d, e);
  }
};

const curry6 = f => function inner(a, b, c, d, e, g) {
  switch (arguments.length) {
    case 0: return curry6(f);
    case 1: return curry5((bb, cc, dd, ee, gg) => f(a, bb, cc, dd, ee, gg));
    case 2: return curry4((cc, dd, ee, gg) => f(a, b, cc, dd, ee, gg));
    case 3: return curry3((dd, ee, gg) => f(a, b, c, dd, ee, gg));
    case 4: return curry2((ee, gg) => f(a, b, c, d, ee, gg));
    case 5: return curry1(gg => f(a, b, c, d, e, gg));
    default: return f(a, b, c, d, e, g);
  }
};

const curryFns = {
  curry0,
  curry1,
  curry2,
  curry3,
  curry4,
  curry5,
  curry6,
};

const curryN = (n, f) =>
  (n <= 6
    ? curryFns[`curry${n}`](f)
    : __curry(f));

module.exports = curryN;
