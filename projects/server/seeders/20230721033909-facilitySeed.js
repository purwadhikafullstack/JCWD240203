'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('facilities', [
      {
        name: 'Wifi',
        icon: 'FiWifi'
      },
      {
        name: 'Free Parking',
        icon: 'FiAnchor'
      },
      {
        name: 'TV',
        icon: 'FiMonitor'
      },
      {
        name: 'Great View',
        icon: 'FiCamera'
      },
      {
        name: 'Gymnasium',
        icon: 'FiDribbble'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('facilities', null, {});
  }
};
