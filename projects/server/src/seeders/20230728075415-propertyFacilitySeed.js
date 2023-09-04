'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('propertyfacilities', [
      {
        propertyId: 1,
        facilityId: 1
      },
      {
        propertyId: 1,
        facilityId: 2
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('propertyfacilities', null, {});
  }
};
