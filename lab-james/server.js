'use strict';
if (!process.env.APP_SECRET) throw new Error('Please set the env APP_SECRET');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Promise = require('promise');
mongoose.Promise = Promise;

const User = require('./model/user');

let createError = require('http-errors');
const morgan = require('morgan');

let LOCAL_DB_SERVER = process.env.MONGOLAB_URI || 'mongodb://localhost/dev_db';
mongoose.connect(LOCAL_DB_SERVER);

const authRouter = require('./route/auth_router');

app.use(morgan('dev'));
app.use('/api/auth', authRouter);

// app.get('/setup', function(err, res) {
//   let james = new User({
//     username: 'James',
//     password: 'guest1234'
//   });
//   james.save(function(err) {
//     if (err) throw err;
//     console.log('user James successfully created');
//     res.json({success: true});
//   });
// });

// app.use('*', (req, res, next) => {
//   return next(createError(404, 'something went wrong'));
// });

app.listen(3000, () => console.log('server is up'));
