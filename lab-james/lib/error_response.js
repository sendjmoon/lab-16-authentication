'use strict';

const createError = require('http-errors');

module.exports = exports = function(statusCode, callback, message) {
  return function(error) {
    message = message || error.message;
    createError(error);
  };
};
