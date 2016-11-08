const curry = require('./curry');

// handleError :: (e -> c) -> (a -> b) -> a -> (b | c)
const handleError = curry((errorHandler, f, x) => {
  try {
    return f(x);
  } catch (error) {
    return errorHandler(error);
  }
});

module.exports = handleError;
