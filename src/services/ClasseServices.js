const Services = require('./Services.js');

class ClasseServices extends Services {
    constructor() {
        super('Classes');
    }

    async pegaClassePorBloco(idBloco) {
        const classePesquisa = await super.pegaTodasAsClasses(idBloco);

        return classePesquisa;
    }
}

module.exports = ClasseServices;