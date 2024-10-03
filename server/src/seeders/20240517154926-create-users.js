'use strict';
const bcrypt = require('bcrypt');
const { SALT_ROUNDS, CUSTOMER, CREATOR } = require('../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Buyer',
        lastName: 'User',
        displayName: 'Buyer User',
        email: 'buyer@gmail.com',
        password: bcrypt.hashSync('buyer@gmail.com', SALT_ROUNDS),
        role: CUSTOMER,
      },
      {
        firstName: 'Creator',
        lastName: 'User',
        displayName: 'Creator User',
        email: 'creative@gmail.com',
        password: bcrypt.hashSync('creative@gmail.com', SALT_ROUNDS),
        role: CREATOR,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      email: {
        [Sequelize.Op.in]: ['create@gmail.com', 'buy@gmail.com'],
      },
    });
  },
};
