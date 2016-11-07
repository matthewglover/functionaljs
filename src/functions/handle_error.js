const curryN = require('./curryN');

// handleError :: (e -> c) -> (a -> b) -> a -> (b | c)
const handleError = curryN(3, (errorHandler, f, x) => {
  try {
    return f(x);
  } catch (error) {
    return errorHandler(error);
  }
});

module.exports = handleError;
