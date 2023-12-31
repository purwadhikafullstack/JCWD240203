'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transactions', [
      {
        userId: 2,
        propertyId: 1,
        roomId: 1,
        stock: 2,
        price: 10800000,
        status: "completed",
        checkIn: "2023-07-18",
        checkOut: "2023-07-30"
      },
      {
        userId: 2,
        propertyId: 2,
        roomId: 3,
        stock: 2,
        price: 40800000,
        status: "completed",
        checkIn: "2023-07-4",
        checkOut: "2023-08-30"
      },
      {
        userId: 2,
        propertyId: 1,
        roomId: 1,
        stock: 2,
        price: 80800000,
        status: "completed",
        checkIn: "2023-07-18",
        checkOut: "2023-09-30"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transactions', null, {});
  }
};
