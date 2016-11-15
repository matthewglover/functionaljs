
class Thunk {
  constructor(f) {
    this.f = f;
  }

  fork() {
    return this.f();
  }
}


// trampoline :: (*... -> a) -> (*... -> a)
const trampoline = f => (...args) => {
  let result = f(...args);
  while (result instanceof Thunk) result = result.fork();
  return result;
};

trampoline.thunk = f => new Thunk(f);

module.exports = trampoline;
