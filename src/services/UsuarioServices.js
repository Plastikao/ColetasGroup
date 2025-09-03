const Services = require('./Services.js');

class UsuarioServices extends Services {
    constructor() {
        super('Usuario');
    }

    async pegaUsuarioPorEmail(email) {
        const emailPesquisa = await super.pegaUmRegistroPorEmail(email);

        return emailPesquisa;
    }
}

module.exports = UsuarioServices;