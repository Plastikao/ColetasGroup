const Services = require('./Services.js');

class ConteudoServices extends Services {
    constructor() {
        super('Conteudo_Classe');
    }

    async pegaConteudoPorClasse(idClasse) {
        const conteudoPesquisa = await super.pegaTodosOsConteudos(idClasse);

        return conteudoPesquisa;
    }

    async pegaConteudoPorId(idConteudo) {
        const conteudoPesquisa = await super.pegaUmConteudoAberto(idConteudo);

        return conteudoPesquisa;
    }
}

module.exports = ConteudoServices;