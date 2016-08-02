'use strict';
const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const User = require('../model/user');
const createError = require('http-errors');
const BasicHTTP = require('../lib/basic_http');

let authRouter = module.exports = exports = Router();

// authRouter.post('/signup', jsonParser, (req, res, next) => {
//   User.findOne({name: req.body.username}, (err, user) => {
//     if (err) throw err;
//     if (!user)
//       res.json({success: false, message: 'No user found with that name.'});
//     if (user.password !== req.body.password)
//       res.json({success: false, message: 'Password did not match.'});
//     let token = jwt.sign(user, process.env.APP_SECRET, {
//       expiresInMinutes: 5
//     });
//
//     res.json({success: true, message: 'token time', token: token});
//   });
// });

authRouter.post('/signup', jsonParser, (req, res) => {
  let newUser = new User();
  newUser.username = req.body.username;
  newUser.password = req.body.password;
  newUser.generateHash(req.body.password)
    .then(() => {
      return newUser.save().then(res.json.bind(res), createError(400, 'bad request'));
    }, createError(500, 'server error'));
});

authRouter.get('/signin', BasicHTTP, (req, res, next) => {
  let authError = createError(401, 'Authentication failed');
  User.findOne({'username': req.auth.username})
    .then((user) => {
      if (!user) return authError;
      user.checkPassword(req.auth.password)
        .then(res.json.bind(res), authError);
    }, authError);
});
