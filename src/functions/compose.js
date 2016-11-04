
// simpleCompose (b -> c, a -> b) -> a -> c
const simpleCompose = (f, g) => x => f(g(x));

// compose (g -> h, ..., a -> b) -> a -> h
const compose = (...fns) => fns.reduce(simpleCompose);

module.exports = compose;
