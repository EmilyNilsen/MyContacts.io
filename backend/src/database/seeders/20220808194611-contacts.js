'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('contacts',
    [
      {
        nome: 'Juninho do Bairro',
        telefone: 9999999,
        email: 'juninhodobairro@email.com',
        userId: 1,
        data_cadastro: new Date('2011-08-01T19:58:51.000Z'),
        data_alteração: new Date('2011-08-01T19:58:51.000Z'),
      },
      {
        nome: 'Padaria da esquina',
        telefone: 33333333,
        email: 'padariapaoquentinhoo@email.com',
        userId: 2,
        data_cadastro: new Date('2011-08-01T19:58:51.000Z'),
        data_alteração: new Date('2011-08-01T19:58:51.000Z'),
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('contacts', null, {}),
};
