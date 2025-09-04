const Services = require('./Services.js');

class ProjetoServices extends Services {
    constructor() {
        super('Projeto');
    }

    async pegaProjetoPorProprietario(idProprietario) {
        const projetoPesquisa = await super.pegaUmProjetoPorProprietario(idProprietario);

        return projetoPesquisa;
    }
}

module.exports = ProjetoServices;