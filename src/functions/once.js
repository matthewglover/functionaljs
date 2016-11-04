
const once = (f) => {
  let hasRun = false;
  return (...args) => {   // eslint-disable-line consistent-return
    if (!hasRun) {
      hasRun = true;
      return f(...args);
    }
  };
};

module.exports = once;
