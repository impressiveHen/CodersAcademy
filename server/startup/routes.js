const express = require('express');
const users = require('../routes/users');
const cookieParser = require('cookie-parser');

module.exports = function(app) {
    app.use(express.json());
    app.use(cookieParser());
    app.use('/richmond/users', users);
};