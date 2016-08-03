'use strict';
const jwt = require('jsonwebtoken');
const assert = require('assert');
const User = require('../model/user');
const createError = require('http-errors');

module.exports = exports = function(req, res, next) {
  try {
    let authheader = req.headers.authorization;
    assert(authheader === typeof 'string', 'No auth token provided');
    authheader = authheader.split(' ');
    assert(authheader[0] === 'Bearer', 'No auth token provided');
    let decoded = jwt.verify(authheader[1], process.env.APP_SECRET);
    assert(decoded, 'Invalid Token');
    User.findOne({username: decoded.idd}, (err, user) => {
      assert(user !== null, 'No user found');
      if (!user) return createError(404, 'could not find user');
      if (err) return createError(400, 'bad request');
      req.user = user;
      // next hands off error to next piece of middleware
      next();
    });
    //this will catch all the errors from the assertions and give it whatever we pass
    // .catch({ErrorHandler(401, next});
  } catch (e) {
    return createError(400, 'bad request');
  }
};

// video 1: 1:47pm shows example
// when you sign in get the token
// copy the token then in httpie
// can set it into env variable TOKEN
// echo $TOKEN to see result
// cat test/example_user.js | http:3000/api/user/signin Authorization:'Bearer $TOKEN'



// module.exports = exports = function(req, res, next) {
//   new Promise((resolve, reject) => {
//     let authheader = req.headers.authorization;
//   });
// };
