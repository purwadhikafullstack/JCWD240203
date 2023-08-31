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
        stock: 5,
        deleted: 'false'
      },
      {
        propertyId: 2,
        name: 'Studio twin',
        price: 750000,
        description: 'a studio with 2 beds.',
        capacity: 2,
        stock: 5,
        deleted: 'false'
      },
      {
        propertyId: 2,
        name: 'King sized bedroom',
        price: 1000000,
        description: 'a room with a king sized bed.',
        capacity: 3,
        stock: 5,
        deleted: 'false'
      },
      {
        propertyId: 3,
        name: 'King sized bedroom villa',
        price: 1300000,
        description: 'a villa with a king sized bed.',
        capacity: 3,
        stock: 5,
        deleted: 'false'
      },
      {
        propertyId: 4,
        name: 'Small studio room',
        price: 850000,
        description: 'a small studio, with 1 bed.',
        capacity: 1,
        stock: 3,
        deleted: 'false'
      },
      {
        propertyId: 4,
        name: 'Medium studio room',
        price: 850000,
        description: 'a small studio, with twin beds.',
        capacity: 2,
        stock: 2,
        deleted: 'false'
      },
      {
        propertyId: 5,
        name: 'Wooden Limas House',
        price: 1050000,
        description: 'A standard Javanese Limas House',
        capacity: 2,
        stock: 3,
        deleted: 'false'
      },
      {
        propertyId: 6,
        name: '2 bed cabin',
        price: 1000000,
        description: 'A cabin with 2 beds',
        capacity: 2,
        stock: 3,
        deleted: 'false'
      },
      {
        propertyId: 7,
        name: 'A room with twin beds',
        price: 1200000,
        description: 'A nice medium room with 2 beds, cozy and comfy.',
        capacity: 2,
        stock: 3,
        deleted: 'false'
      },
      {
        propertyId: 8,
        name: 'Small Studio Villa',
        price: 500000,
        description: 'A small studio with 1 bed.',
        capacity: 1,
        stock: 10,
        deleted: 'false'
      },
      {
        propertyId: 8,
        name: 'Medium Studio Villa',
        price: 750000,
        description: 'A small studio with 2 bed.',
        capacity: 2,
        stock: 5,
        deleted: 'false'
      },
      {
        propertyId: 9,
        name: 'Standard Villa',
        price: 1050000,
        description: 'A room with a queen sized bed.',
        capacity: 2,
        stock: 3,
        deleted: 'false'
      },
      {
        propertyId: 10,
        name: 'Executive Room',
        price: 1800000,
        description: 'A spacious room with a queen sized bed, a bathub, and a private kitchen',
        capacity: 2,
        stock: 3,
        deleted: 'false'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rooms', null, {});
  }
};
