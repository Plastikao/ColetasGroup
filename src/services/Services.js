const { ConnectionCheckOutFailedEvent } = require('mongodb')
const dataSource = require('../models')
const { Op } = require('sequelize')

class Services {
    constructor(nomeDoModel) {
        this.model = nomeDoModel
    }

    //#region CREATE
    async criaRegistro(dadosDoRegistro) {
        return dataSource[this.model].create(dadosDoRegistro)
    }
    //#endregion

    //#region READ
    async pegaTodosOsRegistros() {
        return dataSource[this.model].findAll()
    }

    async pegaUmProjetoPorProprietario(idProprietario) {
        return dataSource[this.model].findAll({
            where: { codProprietario: idProprietario },
        })
    }

    async pegaUmProjetoPorId(idProjeto) {
        return dataSource[this.model].findOne({
            where: { id: idProjeto },
        })
    }

    async pegaTodosOsBlocos(idProjeto) {
        return dataSource[this.model].findAll({
            where: { codProjeto: idProjeto },
        })
    }

    async pegaTodasAsClasses(idBloco) {
        return dataSource[this.model].findAll({
            where: { codBloco: idBloco },
        })
    }

    async pegaClassePorConteudoAberto(codClasse) {
        return dataSource[this.model].findOne({
            where: { id: codClasse },
        })
    }

    async pegaTodosOsConteudos(idClasse) {
        return dataSource[this.model].findAll({
            where: { codClasse: idClasse },
        })
    }

    async pegaUmConteudoAberto(idConteudo) {
        return dataSource[this.model].findOne({
            where: { id: idConteudo },
        })
    }

    async pegaUmRegistroPorNome(nome) {
        return dataSource[this.model].findOne({
            where: { nome: nome },
        })
    }

    async pegaUmRegistroPorEmail(email) {
        return dataSource[this.model].findOne({
            where: { email: email },
        })
    }

    async pegaUmRegistroPorSenha(senha) {
        return dataSource[this.model].findOne({
            where: { senha: senha },
        })
    }
    //#endregion

    //#region UPDATE
    async atualizaRegistro(dadosAtualizados, id) {
        const listadeRegistrosAtualizados = await dataSource[this.model].update(
            dadosAtualizados,
            {
                where: { id: id },
            }
        )

        if (listadeRegistrosAtualizados[0] === 0) {
            return false
        }

        return true
    }
    //#endregion

    /*
  async pegaTodosOsRegistros () {
    return dataSource[this.model].findAll();
  }

  async pegaUmRegistroPorId(id) {
    return dataSource[this.model].findByPk(id);
  }

  async pegaUmRegistroPorNome(nome) {
    return dataSource[this.model].findAll({where: {nome: {[Op.like]: `%${nome}%`}}});
  }

  async criaRegistro(dadosDoRegistro) {
    return dataSource[this.model].create(dadosDoRegistro);
  }

  async atualizaRegistro(dadosAtualizados, id) {
    const listadeRegistrosAtualizados = dataSource[this.model].update(dadosAtualizados, {
      where: { id: id }
    });
    if (listadeRegistrosAtualizados[0] === 0) {
      return false;
    }
    return true;
  }

  async excluiRegistro(id) {
    return dataSource[this.model].destroy({ where: { id: id } });
  }*/
}

module.exports = Services
