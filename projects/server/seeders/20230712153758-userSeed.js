'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('People', [
      {
        username: 'noname',
        email: 'idk@gmail.com',
        password: '$2b$10$ezvGpGyLF8eumcO5Ejcaj.G4k0YTL6eTt425KApegtbCrt3cddlIC',
        phoneNumber: '000000000',
        gender: 'Male',
        birthDate: '11-10-2003'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  }
};
