'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('properties', [
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
        description: "One Bedroom Villas for 2 is one type of our villa that can accomodate up to 2 person and free 1 child under 5 years old. It has a private pool right in front of the bedroom. It is suitable for you who want to spend your holiday.",
        city: "Yogyakarta",
        address: "Jl. Kaya Raya UKDW Dormitory no.8 Ngropoh, Chesurtunggal, Kec. Depok Kab.Sleman, Yogyakarta",
        userId: 1,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Breezy 3BR Sanctuary in Tembi Tourism Village",
        description: "Our home follows a modern architecture with contemporary interior that has an open space feel. It is comfortable, calming and welcoming. Big windows allow lots of light and breeze. The esthetics are minimalist and clutter free.",
        city: "Yogyakarta",
        address: "Jl. Dolby Goat Ngropoh, Chesurtunggal, Kec. Depok Kab.Sleman, Yogyakarta",
        userId: 1,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "RUMAH LIMAS JOGJA: Javanese Wooden House",
        description: "The house known as a 'limasan' is surrounded by a lush tropical garden, 10 km away from the cultural interest and beauty of Yogyakarta. Warm considerate hosts who keep the place immaculate and serve wonderful local dishes.",
        city: "Yogyakarta",
        address: "Jl. Sentul Gang UKDW Dormitory no.8 Ngropoh, Chesurtunggal, Kec. Depok Kab.Sleman, Yogyakarta",
        userId: 1,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Guru Giri Mountain Cabin (Barat/2 pax)",
        description: "The first Cabin concept in Yogyakarta. Guru Giri Mountain Cabin has a modern simple rental residence concept that is on a hill in a quiet and beautiful teak forest hill setting. Guru Giri has 2 Cabins, perfect for relaxing for a moment to let go.",
        city: "Yogyakarta",
        address: "Jl. Gang UKDW Dormitory no.8 Ngropoh, Chesurtunggal, Kec. Depok Kab.Sleman, Yogyakarta",
        userId: 1,
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Wood Omah Glamping",
        description: "The glamping with the wooden theme of the upside-down house on the hill has a view of the beach located in the middle of the forest. Take it easy at this unique and tranquil getaway.",
        city: "Yogyakarta",
        address: "Jl. UKDW Dormitory no.8 Ngropoh, Chesurtunggal, Kec. Depok Kab.Sleman, Yogyakarta",
        userId: 1,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Villa Verde The Garden, Villa",
        description: "Welcome to a cozy and spacious space. Our Cabin-villa M is suite for family (2 adults & 2 kids max 12 years old). With 1 king size bed and sofa bed, you can enjoy your family holiday.",
        city: "Yogyakarta",
        address: "Jl. UKMD Dormitory no.8 Ngropoh, Chesurtunggal, Kec. Depok Kab.Sleman, Yogyakarta",
        userId: 1,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Hidden gem villa in South Yogya",
        description: "Welcome to Sri-Gaïa Yogyakarta villa, a unique and tranquil place surrounded by rice fields. Perfect place to escape from your daily routine.",
        city: "Yogyakarta",
        address: "Jl. Besar Dormitory no.8 Ngropoh, Chesurtunggal, Kec. Depok Kab.Sleman, Yogyakarta",
        userId: 1,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Private Terrace in traditional villa Séna #3",
        description: "SÉNA is a warm and peaceful guest house in Kasongan village. The building is an old colonial house completely renovated in 2018.",
        city: "Yogyakarta",
        address: "Jl. Dormitory no.8 Ngropoh, Chesurtunggal, Kec. Depok Kab.Sleman, Yogyakarta",
        userId: 1,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('properties', null, {});
  }
};
