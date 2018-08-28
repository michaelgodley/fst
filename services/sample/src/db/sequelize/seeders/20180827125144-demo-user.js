'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
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
      }      
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
