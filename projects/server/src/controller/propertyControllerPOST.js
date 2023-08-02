const db = require('../../models');
const { deleteFiles } = require('../helper/deleteFiles');
const property = db.property;
const category = db.category;
const propertyImages = db.propertyImages;
const propertyFacility = db.propertyFacility;
const room = db.room;
const price = db.price;
require('dotenv').config();

module.exports = {
    addProperty: async(req, res) => {
        const t = await db.sequelize.transaction();
        const {propertyName, propertyDescription, city, address, userId, categoryId, propertyRooms, facilities } = req.body;
        const images = req.files.images;
        try {
            const parsedFacility = JSON.parse(facilities);
            let newRooms = JSON.parse(propertyRooms);
            const newProperty =  await property.create({
                name: propertyName,
                description: propertyDescription,
                city: city,
                address: address,
                userId: userId,
                categoryId: categoryId
            }, {
                transaction: t
            });
            
            for(let room of newRooms) {
                room.propertyId = newProperty.id;
            }

            const dataImage = [];

            if(images) {
                for(let image of images) {
                    dataImage.push({
                        url: `${process.env.LINK}/Property/${image.filename}`,
                        propertyId: newProperty.id
                    })
                }
            }
            
            const dataFacility = [];
            parsedFacility?.forEach((value) => {
                dataFacility.push({propertyId: newProperty.id, facilityId: value})
            });
            
            await propertyFacility.bulkCreate(dataFacility, {transaction: t});
            
            await propertyImages.bulkCreate(dataImage, {transaction: t});

            await room.bulkCreate(newRooms, {transaction: t});
            
            await t.commit();
            return res.status(201).send({
                isError: false,
                message: 'Property added !',
                data: null
            })
        }
        catch(error) {
            for(let i in req?.files) {deleteFiles(req.files[i])};
            await t.rollback();
            return res.status(500).send({
                isError: true,
                message: error.message,
                data: null
            });
        }
    }
}