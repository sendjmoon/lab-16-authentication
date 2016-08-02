'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const saltRounds = 10;

let userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

userSchema.methods.generateHash = function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return reject(err);
      this.password = hash;
      console.log('hashed: ' + hash);
      resolve(token stuff);
    });
  });
};

userSchema.methods.checkPassword = function(password) {
  //load hash password
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, comparison) => {
      if (err) return reject(err);
      if (comparison === false)
        return reject(new createError(403, 'Forbidden'));
        resolve(token stuff);
    });
  });
};

module.exports = exports = mongoose.model('User', UserSchema);
