const { Router } = require('express');
const ConteudoController = require('../controllers/ConteudoController.js');

const conteudoController = new ConteudoController();

const router = Router();

router.get('/conteudos/busca/:idClasse', (req, res) => conteudoController.pegaConteudos(req, res));
router.post('/conteudos', (req, res) => conteudoController.criaNovo(req, res));

module.exports = router;