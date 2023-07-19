'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('reviews', [
      {
        userId: 2,
        propertyId: 1,
        rating: 5,
        description: 'I had a wonderful stay, would come again !'
      },
      {
        userId: 2,
        propertyId: 2,
        rating: 5,
        description: 'I had a wonderful stay, would come again !'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reviews', null, {});
  }
};
