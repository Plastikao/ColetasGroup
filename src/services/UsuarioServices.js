const Services = require('./Services.js');

class UsuarioServices extends Services {
    constructor() {
        super('Usuario');
    }

    async pegaUsuarioPorId(id) {
        const usuarioPesquisa = await super.pegaUmRegistroPorId(id);

        return usuarioPesquisa;
    }

    async pegaUsuarioPorNome(nome) {
        const nomePesquisa = await super.pegaUmRegistroPorNome(nome);

        return nomePesquisa;
    }

    async pegaUsuarioPorEmail(email) {
        const emailPesquisa = await super.pegaUmRegistroPorEmail(email);

        return emailPesquisa;
    }

    async pegaUsuarioPorSenha(senha) {
        const senhaPesquisa = await super.pegaUmRegistroPorSenha(senha);

        return senhaPesquisa;
    }
}

module.exports = UsuarioServices;