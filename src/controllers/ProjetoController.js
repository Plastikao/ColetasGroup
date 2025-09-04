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
            const projetoPesquisa = await projetoServices.pegaProjetoPorProprietario(String(idProprietario));

            return res.status(200).json(projetoPesquisa);
        }
        
        catch (erro) {
            console.log(`Seu erro foi: ${erro}`);
        }
    }
}

module.exports = ProjetoController;