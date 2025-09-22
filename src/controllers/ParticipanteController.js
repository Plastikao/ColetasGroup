const Controller = require('./Controller.js');
const ParticipanteServices = require('../services/ParticipanteServices.js');

const participanteServices = new ParticipanteServices();

class ParticipantesController extends Controller {
    constructor() {
        super(participanteServices);
    }

    async pegaParticipantes(req, res) {
        const { idProjeto } = req.params;

        try {
            const participantesPesquisa = await participanteServices.pegaParticipantesPorProjeto(Number(idProjeto));

            return res.status(200).json(participantesPesquisa);
        }
        
        catch (erro) {
            console.log(`Seu erro foi: ${erro}`);
        }
    }

    async pegaProjetos(req, res) {
        const { idUsuario } = req.params;

        try {
            const projetosPesquisa = await participanteServices.pegaProjetosCompartilhados(Number(idUsuario));

            return res.status(200).json(projetosPesquisa);
        }
        
        catch (erro) {
            console.log(`Seu erro foi: ${erro}`);
        }
    }
}
    
module.exports = ParticipantesController;