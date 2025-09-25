const Controller = require('./Controller.js');
const ConteudoServices = require('../services/ConteudoServices.js');

const conteudoServices = new ConteudoServices();

class ConteudoController extends Controller {
    constructor() {
        super(conteudoServices);
    }
    
    async pegaConteudos(req, res) {
        const { idClasse } = req.params;

        try {
            const conteudoPesquisa = await conteudoServices.pegaConteudoPorClasse(Number(idClasse));

            return res.status(200).json(conteudoPesquisa);
        }
        
        catch (erro) {
            console.log(`Seu erro foi: ${erro}`);
        }
    }

    async pegaUmConteudo(req, res) {
        const { idConteudo } = req.params;

        try {
            const conteudoPesquisa = await conteudoServices.pegaConteudoPorId(Number(idConteudo));

            return res.status(200).json(conteudoPesquisa);
        }
        
        catch (erro) {
            console.log(`Seu erro foi: ${erro}`);
        }
    }

    async pegaCheckbox(req, res) {
        const { idProjeto } = req.params;

        try {
            const checkboxPesquisa = await conteudoServices.pegaCheckboxPorProjeto(Number(idProjeto));

            return res.status(200).json(checkboxPesquisa);
        }
        
        catch (erro) {
            console.log(`Seu erro foi: ${erro}`);
        }
    }
}

module.exports = ConteudoController;