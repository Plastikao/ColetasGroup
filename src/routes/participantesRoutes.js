const { Router } = require('express');
const ParticipantesController = require('../controllers/ParticipanteController.js');

const participantesController = new ParticipantesController()
const router = Router()

router.get('/participantes/:idProjeto', (req, res) => participantesController.pegaParticipantes(req, res));
router.post('/participantes', (req, res) => participantesController.criaNovo(req, res));

module.exports = router;