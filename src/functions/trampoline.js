
// trampoline :: (*... -> a) -> (*... -> a)
const trampoline = f => (...args) => {
  let result = f(...args);
  while (result instanceof Function) result = result();
  return result;
};

module.exports = trampoline;
