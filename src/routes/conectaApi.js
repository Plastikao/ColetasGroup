const express = require('express');
const usuarios = require('./usuariosRoutes.js');
const projetos = require('./projetosRoutes.js');
const blocos = require('./blocosRoutes.js');

module.exports = app => {
    app.use(
        express.json(),
        usuarios,
        projetos,
        blocos
    );
};