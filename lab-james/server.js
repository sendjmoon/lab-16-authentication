'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Promise = require('promise');
mongoose.Promise = Promise;

let createError = require('http-errors');
const morgan = require('morgan');

let LOCAL_DB_SERVER = process.env.MONGOLAB_URI || 'mongodb://localhost/dev_db';
mongoose.connect(LOCAL_DB_SERVER);

// const authRouter = require('./route/auth_router');

app.use(morgan('dev'));
// app.use('/api', authRouter);

app.use('*', (req, res, next) => {
  return next(createError(404, 'something went wrong'));
});

app.listen(3000, () => console.log('server is up'));
