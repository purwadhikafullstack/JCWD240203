'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cities', [
      {
        name: 'Jakarta',
        countryCode: 'ID'
      },
      {
        name: 'Bandung',
        countryCode: 'ID'
      },
      {
        name: 'Yogyakarta',
        countryCode: 'ID'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cities', null, {});
  }
};
