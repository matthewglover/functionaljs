[![Build Status](https://travis-ci.org/matthewglover/functionaljs.svg?branch=master)](https://travis-ci.org/matthewglover/functionaljs) [![Coverage Status](https://coveralls.io/repos/github/matthewglover/functionaljs/badge.svg?branch=compose)](https://coveralls.io/github/matthewglover/functionaljs?branch=compose)

# FunctionalJS


## What

A functional JavaScript library to learn about functional programming.

## Why

There are great libraries like Ramda and Folktale, but it's good to understand what's going on under the hood.

## How

Using ES6 and Tape for testing.

## Features:


### Functions

- `ap :: Functor (a -> b) -> Functor a -> Functor b`
- `apply :: (a... -> b) -> [a...] -> b`
- `chain :: (a -> M b) -> M a -> M b`
- `compose :: (f -> g, ..., a -> b) -> a -> g`
- `curry :: ((a, b, ..., f) => g) => a => b => ... f => g` (up to arity of 6 uses curryN internally, then uses __curry)
- `curryN :: ((a, b, ..., f) => g, n) => a => b => ... f => g` (up to arity of 6 - then uses __curry)
- `either :: (a -> c) -> (b -> c) -> Either a b -> c`
- `equals :: a -> b -> Boolean`
- `every :: (a -> Boolean) -> [a] -> Boolean`
- `flip :: (a, ... b -> c) -> (b..., a -> c)` (up to 6 arity, flipped function curried)
- `handleError :: (e -> c) -> (a -> b) -> a -> (b | c)`
- `identity :: a -> a`
- `keys :: {String: *} -> [String]`
- `liftA2 :: (a -> b -> c) -> Functor a -> Functor b -> Functor c`
- `liftA3 :: (a -> b -> c -> d) -> Functor a -> Functor b -> Functor c -> Functor d`
- `liftA4 :: (a -> b -> c -> d -> e) -> Functor a -> Functor b -> Functor c -> Functor d -> Functor e`
- `liftA5 :: (a -> b -> c -> d -> e -> f) -> Functor a -> Functor b -> Functor c -> Functor d -> Functor e -> Functor f`
- `map :: (a -> b) -> F a -> F b`
- `maybe :: b -> (a -> b) -> Maybe a -> b`
- `once :: (a... -> b) -> (a... -> b)`
- `toPairs :: {String: *} -> [[String, *]]`
- `trampoline :: (*... -> a) -> (*... -> a) - requires recursive call to be wrapped in a thunk trampoline.Thunk(() => [return value])`
- `typeOf :: * -> String`
- `values :: {String: *} -> [*]`
- `zip :: {String: *} -> [[String, *]]`

### Data

#### Maybe

##### Static methods / properties
- `Maybe.of - a -> Just a`
- `Maybe.Nothing -> Nothing`

##### Instance methods

- `Maybe::ap - Maybe (a -> b) ~> Maybe a -> Maybe b`
- `Maybe::chain - Maybe a ~> (a -> Maybe b) -> Maybe b`
- `Maybe::equals - Maybe a ~> (Maybe b) -> Boolean`
- `Maybe::isJust - Maybe a ~> () -> Boolean`
- `Maybe::isNothing - Maybe a ~> () -> Boolean`
- `Maybe::map - Maybe a ~> (a -> b) -> Maybe b`


#### Either

##### Static methods
- `Either.of - b -> Right b`
- `Either.Left - a -> Left a`

##### Instance methods

- `Either::ap - Either a (b -> c) ~> Either b -> Either a c`
- `Either::chain - Either a b ~> (b -> Either a c) -> Either a c`
- `Either::map - Either a b ~> (b -> c) -> Either a c`
- `Either::isLeft - Either a b ~> () -> Boolean`
- `Either::isRight - Either a b ~> () -> Boolean`


#### Future

##### Static methods
- `Future.of - a -> Future e a`
- `Future.reject - e -> Future e`

##### Instance methods
- `Future::fork - Future e a ~> (e -> (), a -> ()) -> ()`
- `Future::map - Future e a ~> (a -> b) -> Future e b`
- `Future::chain - Future e a ~> (a -> Future b) -> Future e b`
- `Future::ap - Future e (a -> b) ~> Future e a -> Future e b`

### Todo

- Lenses
- Transducers
