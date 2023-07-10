'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: "Executive Suite Ocean View",
        description: "You won't want to leave this charming, one-of-a-kind place.",
        city: "Yogyakarta",
        address: "Jl. Kebaya Raya Gang UKDW Dormitory no.8 Ngropoh, Chesurtunggal, Kec. Depok Kab.Sleman, Yogyakarta",
        userId: 1,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Dejaboe Homestay Seturan",
        description: "Welcome to DeJaboe Homestay Seturan Yogyakarta This room is on the 1st floor, featuring a queen sized bed (160 x 200), a private living room with sofa, and a private small kitchen.",
        city: "Yogyakarta",
        address: "Jl. Seturan Raya Gang UKDW Dormitory no.8 Ngropoh, Chesurtunggal, Kec. Depok Kab.Sleman, Yogyakarta",
        userId: 1,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "1 Bedroom Villa with Private Pool for 2",
        description: "One Bedroom Villas for 2 pax is one type of our villa that can accomodate up to 2 person and free 1 child under 5 years old. It has a private pool right in front of the bedroom. It is suitable for you who want to spend your time with your best friend or your loved one.",
        city: "Yogyakarta",
        address: "Jl. Kaya Raya UKDW Dormitory no.8 Ngropoh, Chesurtunggal, Kec. Depok Kab.Sleman, Yogyakarta",
        userId: 1,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Breezy 3BR Sanctuary in Tembi Tourism Village",
        description: "Our home follows a modern architecture with contemporary interior that has an open space feel. It is comfortable, calming and welcoming. Big windows allow lots of light and breeze. The esthetics are minimalist and clutter free. It's designed to make work from home enjoyable. Or simply perfect getaway where you can rest, relax and rejuvenate.",
        city: "Yogyakarta",
        address: "Jl. Dolby Goat Ngropoh, Chesurtunggal, Kec. Depok Kab.Sleman, Yogyakarta",
        userId: 1,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "RUMAH LIMAS JOGJA: Javanese Wooden House",
        description: "The house known as a 'limasan' is surrounded by a lush tropical garden, 10 km away from the cultural interest and beauty of Yogyakarta . Warm considerate hosts who keep the place immaculate and serve wonderful local dishes in an atmosphere of calm and beauty. The well furnished room is large with two double sized four poster beds, a nice veranda with garden views and plenty of space. An oasis of serenity but within reach of all the sights and activities that make Jogja special.",
        city: "Yogyakarta",
        address: "Jl. Sentul Gang UKDW Dormitory no.8 Ngropoh, Chesurtunggal, Kec. Depok Kab.Sleman, Yogyakarta",
        userId: 1,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('property', null, {});
  }
};
