const Services = require('./Services.js');

class ClasseServices extends Services {
    constructor() {
        super('Classes');
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