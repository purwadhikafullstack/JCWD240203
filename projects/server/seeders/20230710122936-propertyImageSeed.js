'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('propertyImages', [
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-735147908258997419/original/7990ebca-0115-463f-83da-f92d11f72df9.jpeg?im_w=960',
        propertyId: 1
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-735147908258997419/original/faa2214f-11ec-4629-a2fb-93dfdcaacac4.jpeg?im_w=720',
        propertyId: 1
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-735147908258997419/original/1a351a85-d454-48b5-997a-91977363ddd2.jpeg?im_w=720',
        propertyId: 1
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-735147908258997419/original/ff5de639-4275-43d6-a031-653cc4131b55.jpeg?im_w=1200',
        propertyId: 1
      },
      {
        url: 'https://a0.muscache.com/im/pictures/f64dc5cb-f8e1-486f-ad34-bc221ddef898.jpg?im_w=720',
        propertyId: 2
      },
      {
        url: 'https://a0.muscache.com/im/pictures/3802c64d-6d20-4497-8f2a-057957dd3e25.jpg?im_w=1200',
        propertyId: 2
      },
      {
        url: 'https://a0.muscache.com/im/pictures/cb682e28-8fab-41b2-88a5-dae7c3c56363.jpg?im_w=1200',
        propertyId: 2
      },
      {
        url: 'https://a0.muscache.com/im/pictures/d5ad4cae-0587-4aee-b288-2ad213559aa8.jpg?im_w=1200',
        propertyId: 2
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-696812630351792682/original/26dffe9b-d506-4229-ae3b-a2b6ddc0fee0.jpeg?im_w=1200',
        propertyId: 3
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-696812630351792682/original/5203a02a-3ab4-48eb-9cf6-5b5da068785e.jpeg?im_w=720',
        propertyId: 3
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-696812630351792682/original/b829ad67-112f-4509-b23d-d9eff7ba5c4b.jpeg?im_w=720',
        propertyId: 3
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-696812630351792682/original/db94a6d9-fe04-4bd1-b7cf-5673ebf2ef1b.jpeg?im_w=720',
        propertyId: 3
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48746015/original/2ad4a5ab-f139-40de-8612-a6d382bb7872.jpeg?im_w=1200',
        propertyId: 4
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48746015/original/d4b1fe96-b9e3-4163-9119-78d054b59539.jpeg?im_w=1200',
        propertyId: 4
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48746015/original/68e71bac-1aba-4b8f-a8e6-6d28642f051a.jpeg?im_w=1200',
        propertyId: 4
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48746015/original/117d3e0b-b001-4a75-bff6-3c186700157b.jpeg?im_w=1200',
        propertyId: 4
      },
      {
        url: 'https://a0.muscache.com/im/pictures/96631044/710a6f1c_original.jpg?im_w=1200',
        propertyId: 5
      },
      {
        url: 'https://a0.muscache.com/im/pictures/96630992/1d706244_original.jpg?im_w=1200',
        propertyId: 5
      },
      {
        url: 'https://a0.muscache.com/im/pictures/96631021/6758da75_original.jpg?im_w=1200',
        propertyId: 5
      },
      {
        url: 'https://a0.muscache.com/im/pictures/96631132/d0f4b76b_original.jpg?im_w=1200',
        propertyId: 5
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('propertyImages', null, {})
  }
};
