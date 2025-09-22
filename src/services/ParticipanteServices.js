const Services = require('./Services.js');

class ParticipanteServices extends Services {
    constructor() {
        super('Participantes');
    }

    async pegaParticipantesPorProjeto(idProjeto) {
        const participantesPesquisa = await super.pegaTodosOsParticipantes(idProjeto);

        return participantesPesquisa;
    }

    async pegaProjetosCompartilhados(idUsuario) {
        const projetosPesquisa = await super.pegaTodosOsProjetosCompartilhados(idUsuario);

        return projetosPesquisa;
    }
}

module.exports = ParticipanteServices;