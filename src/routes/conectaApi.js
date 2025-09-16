const express = require('express');
const usuarios = require('./usuariosRoutes.js');
const projetos = require('./projetosRoutes.js');
const blocos = require('./blocosRoutes.js');
const classes = require('./classesRoutes.js');
const conteudos = require('./conteudosRoutes.js');
const participantes = require('./participantesRoutes.js')

module.exports = app => {
    app.use(
        express.json(),
        usuarios,
        projetos,
        blocos,
        classes,
        conteudos,
        participantes
    );
};