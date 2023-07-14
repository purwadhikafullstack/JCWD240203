'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('rooms', [
      {
        propertyId: 1,
        name: 'Room with twin beds',
        price: 900000,
        description: 'a room with twin beds, perfect for 2 guest.',
        capacity: 2,
        stock: 5
      },
      {
        propertyId: 2,
        name: 'Studio twin',
        price: 750000,
        description: 'a studio with 2 beds.',
        capacity: 2,
        stock: 5
      },
      {
        propertyId: 2,
        name: 'King sized bedroom',
        price: 1000000,
        description: 'a room with a king sized bed.',
        capacity: 3,
        stock: 5
      },
      {
        propertyId: 3,
        name: 'King sized bedroom villa',
        price: 1300000,
        description: 'a villa with a king sized bed.',
        capacity: 3,
        stock: 5
      },
      {
        propertyId: 4,
        name: 'Small studio room',
        price: 850000,
        description: 'a small studio, with 1 bed.',
        capacity: 1,
        stock: 3
      },
      {
        propertyId: 4,
        name: 'Medium studio room',
        price: 850000,
        description: 'a small studio, with twin beds.',
        capacity: 2,
        stock: 2
      },
      {
        propertyId: 5,
        name: 'Wooden Limas House',
        price: 1050000,
        description: 'A standard Javanese Limas House',
        capacity: 2,
        stock: 3
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rooms', null, {});
  }
};
