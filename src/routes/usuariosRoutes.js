const { Router } = require('express');
const UsuarioController = require('../controllers/UsuarioController.js');

const usuarioController = new UsuarioController();

const router = Router();

router.get('/usuarios/nome/:nome', (req, res) => usuarioController.pegaNome(req, res));
router.get('/usuarios/email/:email', (req, res) => usuarioController.pegaEmail(req, res));
router.get('/usuarios/senha/:senha', (req, res) => usuarioController.pegaSenha(req, res));
router.post('/usuarios', (req, res) => usuarioController.criaNovo(req, res));

//router.get('/pessoas', (req, res) => pessoaController.pegaTodos(req, res));
//router.get('/pessoas/:id', (req, res) => pessoaController.pegaUmPorId(req, res));
//router.get('/pessoas/busca/:nome', (req, res) => pessoaController.pegaUmPorNome(req, res));
//router.post('/pessoas', (req, res) => pessoaController.criaNovo(req, res));
//router.put('/pessoas/:id', (req, res) => pessoaController.atualiza(req, res));
//router.delete('/pessoas/:id', (req, res) => pessoaController.exclui(req, res));
//router.get('/pessoas/:estudanteId/matriculas', (req, res) => pessoaController.pegaMatriculas(req, res));
//router.post('/pessoas/:estudanteId/matriculas', (req, res) => matriculaController.criaNovo(req, res));

module.exports = router;