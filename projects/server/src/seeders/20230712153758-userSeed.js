'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        username: 'noname',
        email: 'idk@gmail.com',
        password: '$2b$10$ezvGpGyLF8eumcO5Ejcaj.G4k0YTL6eTt425KApegtbCrt3cddlIC',
        phoneNumber: '000000000',
        gender: 'Male',
        birthDate: '2003-11-10',
        profilePicture: 'http://localhost:8000/Public/default/DefaultProfile.png',
        status: 'verified',
        accountType: 'Local'
      },
      {
        username: 'John Doe',
        email: 'mkdir@gmail.com',
        password: '$2b$10$ezvGpGyLF8eumcO5Ejcaj.G4k0YTL6eTt425KApegtbCrt3cddlIC',
        phoneNumber: '000000000',
        gender: 'Male',
        birthDate: '2003-11-10',
        profilePicture: 'http://localhost:8000/Public/default/DefaultProfile.png',
        status: 'unverified',
        accountType: 'Local'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
