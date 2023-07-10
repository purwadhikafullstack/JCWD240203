'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('category', [
      {
        type: 'Hotel'
      },
      {
        type: 'Villa'
      },
      {
        type: 'Beach'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('category', null, {})
  }
};
