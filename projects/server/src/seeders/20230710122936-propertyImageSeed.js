'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('propertyimages', [
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
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49291874/original/a2fd1bda-fb74-4ef1-8486-8e9890424f5b.jpeg?im_w=960',
        propertyId: 6
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49291874/original/22caf58d-886c-4133-9a1b-8ee4da040f10.jpeg?im_w=1200',
        propertyId: 6
      },
      {
        url: 'https://a0.muscache.com/im/pictures/372d17e1-17b9-4d03-8095-110840005de4.jpg?im_w=1200',
        propertyId: 6
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49649385/original/df0567c8-661a-4def-9948-bdc2257bc917.jpeg?im_w=720',
        propertyId: 6
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-894658291595830719/original/67b46610-e0ea-4e9d-b539-323835cdaa56.jpeg?im_w=1200',
        propertyId: 7
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-894658291595830719/original/bc0835c6-ff6f-4177-b86b-c05e548e0ced.jpeg?im_w=720',
        propertyId: 7
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-894658291595830719/original/b62d34e7-0ec3-4736-8ff1-809380a43b63.jpeg?im_w=1200',
        propertyId: 7
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-894658291595830719/original/d09e9ef9-411f-4bac-a042-08b7c116b9d8.jpeg?im_w=720',
        propertyId: 7
      },
      {
        url: 'https://a0.muscache.com/im/pictures/ceb53a88-5f97-4a2d-9efe-17dcf017d883.jpg?im_w=1200',
        propertyId: 8,
      },
      {
        url: 'https://a0.muscache.com/im/pictures/ae89b793-c6ba-44fb-8e55-98e73a89809d.jpg?im_w=720',
        propertyId: 8
      },
      {
        url: 'https://a0.muscache.com/im/pictures/72b4542a-3416-4afc-97d6-9341c5c07bdf.jpg?im_w=1200',
        propertyId: 8
      },
      {
        url: 'https://a0.muscache.com/im/pictures/c634ca8c-fbba-4dc3-9140-bb31c57cc6d8.jpg?im_w=720',
        propertyId: 8
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-54372110/original/4c0670d1-3426-4af1-847b-c7e3418ef6bb.jpeg?im_w=720',
        propertyId: 9
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-54372110/original/39f38cc3-852d-4cde-b1e8-58bbf64c0d4e.jpeg?im_w=720',
        propertyId: 9
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-54372110/original/04bb8d2c-2f85-4098-aba3-cb11450b441d.jpeg?im_w=720',
        propertyId: 9
      },
      {
        url: 'https://a0.muscache.com/im/pictures/c232b02a-4c86-4f78-a31e-c7c06d526b43.jpg?im_w=720',
        propertyId: 9
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-594453721697168056/original/92d9a3ec-6997-4d1c-a863-30b1a58058e1.jpeg?im_w=960',
        propertyId: 10
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-42829918/original/502db5d7-81e0-4d2b-bd2b-b46e0169365f.jpeg?im_w=720',
        propertyId: 10
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-42829918/original/0e0f82c8-0a58-48dc-9cce-9bc7533d5270.jpeg?im_w=1200',
        propertyId: 10
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-42829918/original/1361f125-aeed-4c9b-9a0b-0ae4353573a5.jpeg?im_w=1200',
        propertyId: 10
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('propertyimages', null, {})
  }
};
