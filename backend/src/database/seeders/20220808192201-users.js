'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('users',
    [
      {
        email: 'leo@test.com',
        password: 'leoteste@',
      },
      {
        email: 'edu@test.com',
        password: 'edutest@',
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};
