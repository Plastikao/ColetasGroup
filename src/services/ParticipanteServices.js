const Services = require('./Services.js');

class ParticipanteServices extends Services {
    constructor() {
        super('Participantes');
    }

    async pegaParticipantesPorProjeto(idProjeto) {
        const participantesPesquisa = await super.pegaTodosOsParticipantes(idProjeto);

        return participantesPesquisa;
    }
}

module.exports = ParticipanteServices;