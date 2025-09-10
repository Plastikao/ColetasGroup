const { Router } = require('express');
const BlocoController = require('../controllers/BlocoController.js');

const blocoController = new BlocoController();

const router = Router();

router.get('/blocos/busca/:idProjeto', (req, res) => blocoController.pegaBlocos(req, res));
router.post('/blocos', (req, res) => blocoController.criaNovo(req, res));
router.put('/blocos/:id', (req, res) => blocoController.atualiza(req, res));

module.exports = router;