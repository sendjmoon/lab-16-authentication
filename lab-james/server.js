'use strict';
if (!process.env.APP_SECRET) throw new createError(400, 'Please set the env APP_SECRET');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Promise = require('promise');
mongoose.Promise = Promise;

let createError = require('http-errors');
const morgan = require('morgan');

let LOCAL_DB_SERVER = process.env.MONGOLAB_URI || 'mongodb://localhost/dev_db';
mongoose.connect(LOCAL_DB_SERVER);

const authRouter = require('./route/auth_router');

app.use(morgan('dev'));
app.use('/api/auth', authRouter);

app.use((req, res, next) => {
  let newError = createError(404, 'Page not found');
  next(newError);
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send(err.message || 'Database error');
  next();
});

app.listen(3000, () => console.log('server is up'));
