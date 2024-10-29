'use strict';
const bcrypt = require('bcrypt');
const { SALT_ROUNDS, CUSTOMER, CREATOR, MODERATOR } = require('../constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'ModeratorFirst',
        lastName: 'ModeratorFirst',
        displayName: 'ModeratorFirst',
        email: 'moderatorFirst@gmail.com',
        password: bcrypt.hashSync('moderatorFirst@gmail.com', SALT_ROUNDS),
        role: MODERATOR,
      },
      {
        firstName: 'ModeratorSecond',
        lastName: 'ModeratorSecond',
        displayName: 'ModeratorSecond',
        email: 'moderatorSecond@gmail.com',
        password: bcrypt.hashSync('moderatorSecond@gmail.com', SALT_ROUNDS),
        role: MODERATOR,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      email: {
        [Sequelize.Op.in]: [
          'moderatorFirst@gmail.com',
          'moderatorSecond@gmail.com',
        ],
      },
    });
  },
};
