import test from 'ava';
import { identity } from '../../src/functions';
import { Future } from '../../src/data';


const resolvingAsync = (v, delay = 1) => ((reject, resolve) => {
  setTimeout(() => {
    // console.log('Resolving', v, Date.now());
    resolve(v);
  }, delay);
});

const rejectingAsync = (e, delay = 1) => ((reject) => {
  setTimeout(() => reject(e), delay);
});

const testError = new Error('Test error');


test('new Future returns instance of future', (t) => {
  const f = new Future();
  t.true(f instanceof Future);
});

test.cb('Future::fork - executes future, receiving resolved value to onResolve handler', (t) => {
  const f = new Future(resolvingAsync(10));

  f.fork(identity, (value) => {
    t.is(value, 10);
    t.end();
  });
});

test.cb('Future::fork - executes future, receiving rejected value to onReject handler', (t) => {
  const f = new Future(rejectingAsync(testError));

  f.fork((error) => {
    t.is(error, testError);
    t.end();
  });
});

test.cb('Future::map - (Future e a).map(a -> b) -> Future e b (resolving)', (t) => {
  const fa = new Future(resolvingAsync(10));
  const fb = fa.map(x => x * 2);

  t.true(fb instanceof Future);

  fb.fork(identity, (value) => {
    t.is(value, 20);
    t.end();
  });
});

test.cb('Future::map - (Future e a).map(a -> b) -> Future e b (rejecting)', (t) => {
  const fa = new Future(rejectingAsync(testError));
  const fb = fa.map(x => x * 2);

  t.true(fb instanceof Future);

  fb.fork((error) => {
    t.is(error, testError);
    t.end();
  });
});

test.cb('Future::map - (Future e a).map(a -> b) -> Future e b (rejecting)', (t) => {
  const fa = new Future(resolvingAsync(10));
  const fb = fa.map(() => {
    throw testError;
  });

  t.true(fb instanceof Future);
  fb.fork((error) => {
    t.is(error, testError);
    t.end();
  });
});

test.cb('Future::chain - (Future e a).chain(a -> Future e b) -> Future e b (resolving)', (t) => {
  const fa = new Future(resolvingAsync(10));
  const fb = fa.chain(x => new Future(resolvingAsync(x * 2)));

  t.true(fb instanceof Future);

  fb.fork(identity, (value) => {
    t.is(value, 20);
    t.end();
  });
});

test.cb('Future::chain - (Future e a).map(a -> Future e b) -> Future e b (1st rejecting)', (t) => {
  const fa = new Future(rejectingAsync(testError));
  const fb = fa.chain(x => new Future(resolvingAsync(x * 2)));

  t.true(fb instanceof Future);

  fb.fork((error) => {
    t.is(error, testError);
    t.end();
  });
});

test.cb('Future::chain - (Future e a).chain(a -> Future e b) -> Future e b (2nd rejecting)', (t) => {
  const fa = new Future(resolvingAsync(10));
  const fb = fa.chain(() => new Future(rejectingAsync(testError)));

  t.true(fb instanceof Future);

  fb.fork((error) => {
    t.is(error, testError);
    t.end();
  });
});

test.cb('Future::chain - (Future e a).chain(a -> Future e b) -> Future e b (rejecting)', (t) => {
  const fa = new Future(resolvingAsync(10));
  const fb = fa.chain(() => {
    throw testError;
  });

  t.true(fb instanceof Future);
  fb.fork((error) => {
    t.is(error, testError);
    t.end();
  });
});

test.cb('Future::ap - (Future e (a -> b)).ap(Future e a) -> Future e b (resolving)', (t) => {
  const double = x => x * 2;
  const fa = new Future(resolvingAsync(double));
  const fb = fa.ap(new Future(resolvingAsync(10)));

  t.true(fb instanceof Future);

  fb.fork(identity, (value) => {
    t.is(value, 20);
    t.end();
  });
});

test.cb('Future::ap - (Future e (a -> b)).ap(Future e a) -> Future e b (1st rejecting)', (t) => {
  const fa = new Future(rejectingAsync(testError));
  const fb = fa.ap(new Future(resolvingAsync(10)));

  t.true(fb instanceof Future);

  fb.fork((error) => {
    t.is(error, testError);
    t.end();
  });
});

test.cb('Future::ap - (Future e (a -> b)).ap(Future e a) -> Future e b (2nd rejecting)', (t) => {
  const double = x => x * 2;
  const fa = new Future(resolvingAsync(double));
  const fb = fa.ap(new Future(rejectingAsync(testError)));

  t.true(fb instanceof Future);

  fb.fork((error) => {
    t.is(error, testError);
    t.end();
  });
});

test.cb('Future::ap - (Future e (a -> b)).ap(Future e a) -> Future e b (Future e (a -> b) rejecting)', (t) => {
  const fa = Future.of(() => {
    throw testError;
  });
  const fb = fa.ap(Future.of(10));

  t.true(fb instanceof Future);

  fb.fork((error) => {
    t.is(error, testError);
    t.end();
  });
});

test.cb('Future::ap - (Future e (a -> b)).ap(Future e a) -> Future e b (Future e (a -> b) resolving multiple)', (t) => {
  const fa = Future.of(a => b => [a, b]);
  const fb = fa.ap(Future.of(10)).ap(Future.of(20));

  t.true(fb instanceof Future);

  fb.fork(identity, (x) => {
    t.deepEqual(x, [10, 20]);
    t.end();
  });
});

test.cb('Future::ap - (Future e (a -> b)).ap(Future e a) -> Future e b (Future e (a -> b) rejecting async)', (t) => {
  const fa = new Future(resolvingAsync(a => a, 1));
  const fb = fa.ap(Future.reject(testError));

  t.true(fb instanceof Future);

  fb.fork((error) => {
    t.is(error, testError);
    setTimeout(() => t.end(), 10);  // NOTE: Add short delay to check resolveFn exits without calling resolve before test ends;
  });
});

test.cb('Future::ap - (Future e (a -> b -> [a, b])).ap(Future e a).ap(Future e b) -> Future e [a, b], resolves in parallel (parallelism)', (t) => {
  const fa = Future.of(a => b => [a, b]);
  const fb = new Future(resolvingAsync(10, 20));
  const fc = new Future(resolvingAsync(20, 20));
  const fd = fa.ap(fb).ap(fc);
  t.plan(3);
  t.true(fd instanceof Future);
  const startTime = Date.now();
  fd.fork(identity, (x) => {
    t.deepEqual(x, [10, 20]);
    t.true(Date.now() - startTime < 40);
    t.end();
  });
});

test.cb('Future.of(a) -> Future e a', (t) => {
  const f = Future.of(10);

  t.true(f instanceof Future);

  f.fork(identity, (value) => {
    t.is(value, 10);
    t.end();
  });
});

test.cb('Future.reject(e) -> Future e', (t) => {
  const f = Future.reject(testError);

  t.true(f instanceof Future);

  f.fork((error) => {
    t.is(error, testError);
    t.end();
  });
});
