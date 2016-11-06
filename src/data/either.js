/* eslint-disable constructor-super, no-use-before-define, class-methods-use-this */
const { compose } = require('../functions');

class Either {

  constructor(v) {
    this.__value = v;
  }
}

Either.Right = x => Right.of(x);

Either.Left = x => Left.of(x);

Either.of = Either.Right;

class Right extends Either {

  map(f) {
    return this.chain(compose(Right.of, f));
  }

  chain(f) {
    return f(this.__value);
  }

  ap(ex) {
    return ex.map(this.__value);
  }
}

Right.of = x => new Right(x);

class Left extends Either {

  map() {
    return this;
  }

  chain() {
    return this;
  }

  ap() {
    return this;
  }
}

Left.of = x => new Left(x);

module.exports = {
  Either,
  Right,
  Left,
};
