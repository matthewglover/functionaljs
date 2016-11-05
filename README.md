[![Build Status](https://travis-ci.org/matthewglover/functionaljs.svg?branch=master)](https://travis-ci.org/matthewglover/functionaljs) [![Coverage Status](https://coveralls.io/repos/github/matthewglover/functionaljs/badge.svg?branch=compose)](https://coveralls.io/github/matthewglover/functionaljs?branch=compose)

# FunctionalJS


## What

A functional JavaScript library to learn about functional programming.

## Why

There are great libraries like Ramda and Folktale, but it's good to understand what's going on under the hood.

## How

Using ES6 and AVA for testing.

## Features:


### Functions

- `compose :: (f -> g, ..., a -> b) -> a -> g`
- `curry :: ((a, b, ..., f) => g) => a => b => ... f => g`
- `equals :: a -> b -> Boolean`
- `handleError :: (e -> c) -> (a -> b) -> a -> (b | c)`
- `identity :: a -> a`
- `once :: (a... -> b) -> (a... -> b)`

### Data

#### Future

##### Static m

##### Instance methods
- `Future::fork - Future e a ~> (e -> (), a -> ()) -> ()`
- `Future::map - Future e a ~> (a -> b) -> Future e b`
- `Future::chain - Future e a ~> (a -> Future b) -> Future e b`
- `Future::ap - Future e (a -> b) ~> Future e a -> Future e b`
