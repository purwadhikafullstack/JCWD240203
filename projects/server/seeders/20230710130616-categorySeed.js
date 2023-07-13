'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('categories', [
      {
        type: 'Hotel'
      },
      {
        type: 'Villa'
      },
      {
        type: 'Beach'
      },
      {
        type: 'cabin'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {})
  }
};
