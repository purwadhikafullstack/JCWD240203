const db = require('../../models');
const { deleteFiles } = require('../helper/deleteFiles');
const property = db.property;
const propertyImages = db.propertyImages;
const propertyFacility = db.propertyFacility;
const room = db.room;
require('dotenv').config();

module.exports = {
    updateProperty: async(req, res) => {
        const t = await db.sequelize.transaction();
        const propertyId = Number(req.params.id);
        const {propertyName, propertyDescription, city, address, status, categoryId, propertyRooms, facilities } = req.body;
        const images = req?.files?.images;
        try {
            const parsedFacility = JSON.parse(facilities);
            const parsedRooms = JSON.parse(propertyRooms);
            // await property.update({
            //     name: propertyName,
            //     description: propertyDescription,
            //     city: city,
            //     address: address,
            //     status: status,
            //     categoryId: categoryId
            // }, {
            //     where: {
            //         id: propertyId
            //     },
            //     transaction: t
            // });
            
            const dataRoom = []
            for(let room of parsedRooms) {
                let temp = {...room};
                temp.propertyId = propertyId;
                dataRoom.push(temp);
            }

            // Update Images
            const dataImage = [];
            const oldRows = [];
            const old = [];
            
            if(images) {
                for(let image of images) {
                    dataImage.push({
                        url: `${process.env.LINK}/Property/${image.filename}`,
                        propertyId: propertyId
                    })
                };

                const prevImages = await propertyImages.findAll({
                    where: {
                        propertyId: propertyId
                    }
                });

                for(let image of prevImages) {
                    oldRows.push(image.id);
                    //unnecessary if statement for production delete it if you want
                    if(image.url.split(`${process.env.LINK}/`)[1]) {
                        old.push({path: 'Public/' + image.url.split(`${process.env.LINK}/`)[1]})
                    }
                }
    
                //await propertyImages.bulkCreate(dataImage, {transaction: t});
                // if(oldRows?.length > 0) {
                //     await propertyImages.bulkDestroy({where: {id: oldRows}}, {transaction: t})
                // }
            }


            const prevFacility = await propertyFacility.findAll({
                where: {
                    propertyId: propertyId
                }
            });
            
            const dataFacility = [];
            parsedFacility?.forEach((value) => {
                let existed = false;
                for(let facility of prevFacility) {
                    if(facility?.facilityId === value) {
                        existed = true;
                        break;
                    }
                }
                if(!existed) {
                    dataFacility.push({propertyId: propertyId, facilityId: value});
                }
            });
            
            const deletedFacility = [];
            for(let facility of prevFacility) {
                let deleted = true;
                for(let i of parsedFacility) {
                    if(facility?.facilityId === i) {
                        deleted = false;
                        break;
                    }
                };
                if(deleted) {
                    deletedFacility.push(facility.id);
                }
            };
            
            //  await propertyFacility.bulkCreate(dataFacility, {transaction: t});
            // if(deletedFacility?.length > 0) {
            //     await propertyFacility.bulkDestroy({where: {id: deletedFacility}}, {transaction: t})
            // }

            // await room.bulkCreate(allRooms, {
            //     updateOnDuplicate: ['name', 'description', 'stock', 'capacity', 'price'],
            //     transaction: t
            // });
            
            // await t.commit();

            if(old.length > 0) {
                deleteFiles(old)
            }

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
