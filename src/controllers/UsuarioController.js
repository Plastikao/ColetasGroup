const Controller = require('./Controller.js');
const UsuarioServices = require('../services/UsuarioServices.js');

const usuarioServices = new UsuarioServices();

class UsuarioController extends Controller {
    constructor() {
        super(usuarioServices);
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
}

module.exports = UsuarioController;