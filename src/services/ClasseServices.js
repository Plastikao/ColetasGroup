const Services = require('./Services.js');

class ClasseServices extends Services {
    constructor() {
        super('Classes');
    }

    async pegaClassePorId(id) {
        const classePesquisa = await super.pegaUmRegistroPorId(id);

        return classePesquisa;
    }

    async pegaClassePorBloco(idBloco) {
        const classePesquisa = await super.pegaTodasAsClasses(idBloco);

        return classePesquisa;
    }

    async pegaClassePorConteudo(codClasse) {
        const classePesquisa = await super.pegaClassePorConteudoAberto(codClasse);

        return classePesquisa;
    }
}

module.exports = ClasseServices;