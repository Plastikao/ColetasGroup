const { Router } = require('express');
const ProjetoController = require('../controllers/ProjetoController.js');

const projetoController = new ProjetoController();

const router = Router();

router.get('/projetos', (req, res) => projetoController.pegaTodos(req, res));
router.get('/projetos/:idProprietario', (req, res) => projetoController.pegaProjeto(req, res));
router.get('/projetos/busca/:idProjeto', (req, res) => projetoController.pegaProjetoPorId(req, res));
router.post('/projetos', (req, res) => projetoController.criaNovo(req, res));
router.put('/projetos/:id', (req, res) => projetoController.atualiza(req, res));

//router.get('/pessoas', (req, res) => pessoaController.pegaTodos(req, res));
//router.get('/pessoas/:id', (req, res) => pessoaController.pegaUmPorId(req, res));
//router.get('/pessoas/busca/:nome', (req, res) => pessoaController.pegaUmPorNome(req, res));
//router.post('/pessoas', (req, res) => pessoaController.criaNovo(req, res));
//router.put('/pessoas/:id', (req, res) => pessoaController.atualiza(req, res));
//router.delete('/pessoas/:id', (req, res) => pessoaController.exclui(req, res));
//router.get('/pessoas/:estudanteId/matriculas', (req, res) => pessoaController.pegaMatriculas(req, res));
//router.post('/pessoas/:estudanteId/matriculas', (req, res) => matriculaController.criaNovo(req, res));

module.exports = router;