'use strict';
const createError = require('http-errors');
const assert = require('assert');

//takes a list of roles in an array
module.exports = exports = function(roles) {
  return function(req, res, next) {
    new Promise((resolve, reject) => {
      assert(req.user, 'No current user');
      // if user's an admin we call next
      if (req.user.role === 'admin') {
        next();
        return resolve();
      }
      // -1 is the could not find in the array
      assert(roles.indexOf(req.user.role) !== -1, 'Unauthorized');
      resolve();
    }).catch(createError(401, 'Authorization error'));
  };
};
