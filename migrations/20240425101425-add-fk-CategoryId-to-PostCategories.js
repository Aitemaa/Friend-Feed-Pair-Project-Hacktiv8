'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('PostCategories', 'CategoryId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Categories',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('PostCategories', 'CategoryId')
  }
};
