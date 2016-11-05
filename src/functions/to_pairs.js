const keys = require('./keys');
const values = require('./values');
const zip = require('./zip');


// toPairs :: {String: *} -> [String, *]
const toPairs = o =>
  zip(keys(o), values(o));

module.exports = toPairs;
