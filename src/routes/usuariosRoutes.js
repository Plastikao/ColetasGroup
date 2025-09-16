const { Router } = require('express');
const UsuarioController = require('../controllers/UsuarioController.js');

const usuarioController = new UsuarioController();

const router = Router();

router.get('/usuarios/:id', (req, res) => usuarioController.pegaUsuario(req, res));
router.get('/usuarios/nome/:nome', (req, res) => usuarioController.pegaNome(req, res));
router.get('/usuarios/email/:email', (req, res) => usuarioController.pegaEmail(req, res));
router.get('/usuarios/senha/:senha', (req, res) => usuarioController.pegaSenha(req, res));
router.post('/usuarios', (req, res) => usuarioController.criaNovo(req, res));

module.exports = router;