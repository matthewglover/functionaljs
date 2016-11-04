const { compose, handleError, once } = require('../functions');


class Future {

  constructor(f) {
    this.__f = f;
  }

  map(f) {
    return this.chain(compose(Future.of, f));
  }

  chain(f) {
    return new Future((reject, resolve) =>
      this.fork(
        reject,
        handleError(reject, x => f(x).fork(reject, resolve))));
  }

  ap(fx) {
    return new Future((reject, resolve) => {
      let isRejected = false;
      let fnReady = false;
      let valueReady = false;
      let fn;
      let value;

      const rejectOnce = once((error) => {
        isRejected = true;
        reject(error);
      });

      const tryRun = () => {
        if (fnReady && valueReady) {
          resolve(fn(value));
        }
      };

      const resolveFn = (f) => {
        if (isRejected) return;
        fnReady = true;
        fn = f;
        tryRun();
      };

      const resolveVal = (v) => {
        if (isRejected) return;
        valueReady = true;
        value = v;
        tryRun();
      };

      this.fork(rejectOnce, handleError(rejectOnce, resolveFn));
      fx.fork(rejectOnce, handleError(rejectOnce, resolveVal));
    });
  }

  fork(reject, resolve) {
    this.__f(reject, resolve);
  }
}

Future.of = x => new Future((reject, resolve) => resolve(x));

Future.reject = error => new Future(reject => reject(error));


module.exports = Future;
