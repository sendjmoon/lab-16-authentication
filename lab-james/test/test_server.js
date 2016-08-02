'use strict';
let createError = require('http-errors');
if (!process.env.APP_SECRET) throw new createError(400, 'Please set the env APP_SECRET');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Promise = require('promise');
mongoose.Promise = Promise;

const morgan = require('morgan');

let LOCAL_DB_SERVER = process.env.MONGOLAB_URI || 'mongodb://localhost/test_db';
mongoose.connect(LOCAL_DB_SERVER);

const authRouter = require('../route/auth_router');

app.use(morgan('dev'));
app.use('/api/auth', authRouter);


module.exports = exports = app;
