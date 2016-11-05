/* eslint-disable constructor-super, no-use-before-define, class-methods-use-this */
const { equals, compose } = require('../functions');

class Maybe {

  isNothing() {
    return this instanceof Nothing;
  }

  isJust() {
    return this instanceof Just;
  }
}

Maybe.of = x =>
  (x === null || x === undefined
    ? aNothing
    : new Just(x));

Maybe.Nothing = () => aNothing;

class Just extends Maybe {

  constructor(v) {
    super();
    this.__value = v;
  }

  map(f) {
    return this.chain(compose(Maybe.of, f));
  }

  ap(mb) {
    return mb.map(this.__value);
  }

  chain(f) {
    return f(this.__value);
  }

  equals(mb) {
    return equals(this.__value, mb.__value);
  }
}

class Nothing extends Maybe {

  map() {
    return this;
  }

  chain() {
    return this;
  }

  ap() {
    return this;
  }

  equals(mx) {
    return mx.isNothing();
  }
}

const aNothing = new Nothing();


module.exports = {
  Maybe,
  Just,
  Nothing,
};
