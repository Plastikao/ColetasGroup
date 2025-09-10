const Controller = require('./Controller.js');
const UsuarioServices = require('../services/UsuarioServices.js');

const usuarioServices = new UsuarioServices();

class UsuarioController extends Controller {
    constructor() {
        super(usuarioServices);
    }

    async pegaNome(req, res) {
        const { nome } = req.params;

        try {
            const nomePesquisa = await usuarioServices.pegaUsuarioPorNome(String(nome));

            return res.status(200).json(nomePesquisa);
        }
        
        catch (erro) {
            console.log(`Seu erro foi: ${erro}`);
        }
    }

    async pegaEmail(req, res) {
        const { email } = req.params;

        try {
            const emailPesquisa = await usuarioServices.pegaUsuarioPorEmail(String(email));

            return res.status(200).json(emailPesquisa);
        }
        
        catch (erro) {
            console.log(`Seu erro foi: ${erro}`);
        }
    }

    async pegaSenha(req, res) {
        const { senha } = req.params;

        try {
            const senhaPesquisa = await usuarioServices.pegaUsuarioPorSenha(String(senha));

            return res.status(200).json(senhaPesquisa);
        }
        
        catch (erro) {
            console.log(`Seu erro foi: ${erro}`);
        }
    }
}

module.exports = UsuarioController;