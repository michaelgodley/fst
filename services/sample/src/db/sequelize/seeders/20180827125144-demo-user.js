'use strict';

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          userName: 'John Doe',
          email: 'jdoe@example.com',
          password: 'abcd1234',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userName: 'Jane Doe',
          email: 'janedoe@example.com',
          password: 'defg1234',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
