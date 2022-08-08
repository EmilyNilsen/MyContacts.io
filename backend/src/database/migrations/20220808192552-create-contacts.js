'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      telefone: { 
        type: Sequelize.INTEGER
      },
      email: { 
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      data_cadastro: {
        allowNull: false,
        type: Sequelize.DATE
      },
      data_alteração: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contacts');
  }
};
