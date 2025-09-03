const dataSource = require('../models');
const { Op } = require('sequelize');

class Services {
    constructor(nomeDoModel) {
        this.model = nomeDoModel;
    }

//#region CREATE
    async criaRegistro(dadosDoRegistro) {
        return dataSource[this.model].create(dadosDoRegistro);
    }
//#endregion

//#region READ
    async pegaUmRegistroPorEmail(email) {
        return dataSource[this.model].findOne({
            where: { email: email }
        });
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

module.exports = Services;