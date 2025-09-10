const Services = require('./Services.js');

class ConteudoServices extends Services {
    constructor() {
        super('Conteudo_Classe');
    }

    async pegaConteudoPorClasse(idClasse) {
        const conteudoPesquisa = await super.pegaTodosOsConteudos(idClasse);

        return conteudoPesquisa;
    }
}

module.exports = ConteudoServices;