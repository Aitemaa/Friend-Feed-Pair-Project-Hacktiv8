'use strict';
const hashing = require('../helpers/hashpassword');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require('../data/user.json').map(e => {
      e.createdAt = e.updatedAt = new Date();
      e.password = hashing(e.password);
      return e;
    });
    await queryInterface.bulkInsert('Users', data)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
