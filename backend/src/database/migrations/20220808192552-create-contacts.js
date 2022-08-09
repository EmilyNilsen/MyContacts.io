'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contacts', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      telefone: { 
        type: Sequelize.BIGINT
      },
      email: { 
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      data_cadastro: {
        type: Sequelize.DATE
      },
      data_alteração: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contacts');
  }
};
