'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('contacts',
    [
      {
        nome: 'Juninho do Bairro',
        telefone: 47996005815,
        email: 'juninhodobairro@email.com',
        userId: 1,
        data_cadastro: new Date('2011-08-01T19:58:51.000Z'),
        data_alteracao: null,
      },
      {
        nome: 'Padaria da esquina',
        telefone: 33333333,
        email: 'padariapaoquentinhoo@email.com',
        userId: 2,
        data_cadastro: new Date('2011-08-01T19:58:51.000Z'),
        data_alteracao: null,
      },
      {
        nome: 'Maria Tereza',
        telefone: 88888888888,
        email: 'mariatereza@email.com',
        userId: 1,
        data_cadastro: new Date('2011-08-01T19:58:51.000Z'),
        data_alteracao: null,
      },
      {
        nome: 'Manicure Joelma',
        telefone: 22222222222,
        email: 'manicurejoelma@email.com',
        userId: 2,
        data_cadastro: new Date('2011-08-01T19:58:51.000Z'),
        data_alteracao: null,
      },
      {
        nome: 'Vó Maria',
        telefone: 11111111111,
        email: 'mariadolivramento@email.com',
        userId: 1,
        data_cadastro: new Date('2011-08-01T19:58:51.000Z'),
        data_alteracao: null,
      },
      {
        nome: 'Zé',
        telefone: 44444444444,
        email: 'zebirita@email.com',
        userId: 2,
        data_cadastro: new Date('2011-08-01T19:58:51.000Z'),
        data_alteracao: null,
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('contacts', null, {}),
};
