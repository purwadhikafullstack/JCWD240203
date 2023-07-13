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
      },
      {
        name: "Guru Giri Mountain Cabin (Barat/2 pax)",
        description: "The first Cabin concept in Yogyakarta. Guru Giri Mountain Cabin has a modern simple rental residence concept that is on a hill in a quiet and beautiful teak forest hill setting. Guru Giri has 2 Cabins, perfect for relaxing for a moment to let go of the routine with a partner, friends or family. We'll give you a grill with selected meats in the afternoon to accompany your leisure time and breakfast in the morning.",
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
        description: "Welcome to a cozy and spacious space. Our Cabin-villa M is suite for family (2 adults & 2 kids max 12 years old). With 1 king size bed and sofa bed, you can enjoy your family holiday. Your own private villa-cabin with private swimming pool and a tropical wall of plants, trees and flowers. This provides you privacy and comfort during your stay.",
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
        description: "SÉNA is a warm and peaceful guest house in Kasongan village. The building is an old colonial house completely renovated in 2018. On top of the cozy rooms, you can enjoy a very very spacious living room with many spots to take your time like : \n- A comfy TV salon \n- Reading areas in front of the the indoor garden \n- Boardgames \n- A playground for kids \n- And a fully equipped kitchen \nSo you can relax in between your explorations of Jogja.",
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
    await queryInterface.bulkDelete('property', null, {});
  }
};
