const Controller = require('./Controller.js');
const ClasseServices = require('../services/ClasseServices.js');

const classeServices = new ClasseServices();

class ClasseController extends Controller {
    constructor() {
        super(classeServices);
    }
    
    async pegaClasses(req, res) {
        const { idBloco } = req.params;

        try {
            const classePesquisa = await classeServices.pegaClassePorBloco(Number(idBloco));

            return res.status(200).json(classePesquisa);
        }
        
        catch (erro) {
            console.log(`Seu erro foi: ${erro}`);
        }
    }

    async pegaUmaClasse(req, res) {
        const { codClasse } = req.params;

        try {
            const classePesquisa = await classeServices.pegaClassePorConteudo(Number(codClasse));

            return res.status(200).json(classePesquisa);
        }
        
        catch (erro) {
            console.log(`Seu erro foi: ${erro}`);
        }
    }
}

module.exports = ClasseController;