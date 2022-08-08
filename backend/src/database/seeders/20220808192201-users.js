'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('users',
    [
      {
        id: 1,
        email: 'leo@test.com',
        password: 'leoteste@',
      },
      {
        id: 2,
        email: 'edu@test.com',
        password: 'edutest@',
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
