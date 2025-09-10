const Services = require('./Services.js');

class ProjetoServices extends Services {
    constructor() {
        super('Projeto');
    }

    async pegaProjetoPorProprietario(idProprietario) {
        const projetoPesquisa = await super.pegaUmProjetoPorProprietario(idProprietario);

        return projetoPesquisa;
    }

    async pegaProjetoPorIdAberto(idProjeto) {
        const projetoPesquisa = await super.pegaUmProjetoPorId(idProjeto);

        return projetoPesquisa;
    }

    async pegaBlocoPorProjeto(idProjeto) {
        const blocoPesquisa = await super.pegaTodosOsBlocos(idProjeto);

        return blocoPesquisa;
    }
}

module.exports = ProjetoServices;