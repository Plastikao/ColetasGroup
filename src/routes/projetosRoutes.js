const { Router } = require('express');
const ProjetoController = require('../controllers/ProjetoController.js');

const projetoController = new ProjetoController();

const router = Router();

router.get('/projetos', (req, res) => projetoController.pegaTodos(req, res));
router.get('/projetos/:idProprietario', (req, res) => projetoController.pegaProjeto(req, res));
router.get('/projetos/busca/:idProjeto', (req, res) => projetoController.pegaProjetoPorId(req, res));
router.post('/projetos', (req, res) => projetoController.criaNovo(req, res));
router.put('/projetos/:id', (req, res) => projetoController.atualiza(req, res));

module.exports = router;