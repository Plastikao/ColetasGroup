const Services = require('./Services.js');

class BlocoServices extends Services {
    constructor() {
        super('Blocos');
    }

    async pegaBlocoPorProjeto(idProjeto) {
        const blocoPesquisa = await super.pegaTodosOsBlocos(idProjeto);

        return blocoPesquisa;
    }

    async pegaBlocoPorClique(idBloco) {
        const blocoPesquisa = await super.pegaUmRegistroPorId(idBloco);

        return blocoPesquisa;
    }
}

module.exports = BlocoServices;