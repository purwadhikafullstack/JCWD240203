'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('facilities', [
      {
        name: 'Wifi',
        icon: '<ReactIcon.FiWifi/>'
      },
      {
        name: 'Free Parking',
        icon: '<ReactIcons.FiMonitor/>'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('facilities', null, {});
  }
};
