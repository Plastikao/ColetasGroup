const Controller = require('./Controller.js');
const BlocoServices = require('../services/BlocoServices.js');

const blocoServices = new BlocoServices();

class BlocoController extends Controller {
    constructor() {
        super(blocoServices);
    }
    
    async pegaBlocos(req, res) {
        const { idProjeto } = req.params;

        try {
            const blocoPesquisa = await blocoServices.pegaBlocoPorProjeto(Number(idProjeto));

            return res.status(200).json(blocoPesquisa);
        }
        
        catch (erro) {
            console.log(`Seu erro foi: ${erro}`);
        }
    }

    async pegaBloco(req, res) {
        const { idBloco } = req.params;

        try {
            const blocoPesquisa = await blocoServices.pegaBlocoPorClique(Number(idBloco));

            return res.status(200).json(blocoPesquisa);
        }
        
        catch (erro) {
            console.log(`Seu erro foi: ${erro}`);
        }
    }
}

module.exports = BlocoController;