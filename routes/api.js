var express = require('express');
var app = express();
const book = require('./book')
const booking = require('./booking')
const user = require('./user')

/* GET users listing. */
app.use('/book', book);
app.use('/booking', booking);
app.use('/user', user)

module.exports = app;
