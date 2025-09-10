const Controller = require('./Controller.js');
const ProjetoServices = require('../services/ProjetoServices.js');

const projetoServices = new ProjetoServices();

class ProjetoController extends Controller {
    constructor() {
        super(projetoServices);
    }

    async pegaProjeto(req, res) {
        const { idProprietario } = req.params;

        try {
            const projetoPesquisa = await projetoServices.pegaProjetoPorProprietario(Number(idProprietario));

            return res.status(200).json(projetoPesquisa);
        }
        
        catch (erro) {
            console.log(`Seu erro foi: ${erro}`);
        }
    }

    async pegaProjetoPorId(req, res) {
        const { idProjeto } = req.params;

        try {
            const projetoPesquisa = await projetoServices.pegaProjetoPorIdAberto(Number(idProjeto));

            return res.status(200).json(projetoPesquisa);
        }
        
        catch (erro) {
            console.log(`Seu erro foi: ${erro}`);
        }
    }

    async pegaBlocos(req, res) {
        const { idProjeto } = req.params;

        try {
            const blocoPesquisa = await projetoServices.pegaBlocoPorProjeto(Number(idProjeto));

            return res.status(200).json(blocoPesquisa);
        }
        
        catch (erro) {
            console.log(`Seu erro foi: ${erro}`);
        }
    }
}

module.exports = ProjetoController;