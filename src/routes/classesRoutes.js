const { Router } = require('express');
const ClasseController = require('../controllers/ClasseController.js');

const classeController = new ClasseController();

const router = Router();

router.get('/classes/busca/:idBloco', (req, res) => classeController.pegaClasses(req, res));
router.post('/classes', (req, res) => classeController.criaNovo(req, res));

module.exports = router;