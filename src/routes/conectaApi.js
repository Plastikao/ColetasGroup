const express = require('express');
const pessoas = require('./usuariosRoutes.js');

module.exports = app => {
    app.use(
        express.json(),
        pessoas
    );
};