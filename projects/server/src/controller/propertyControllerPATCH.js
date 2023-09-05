const db = require('../models');
const { deleteFiles } = require('../helper/deleteFiles');
const property = db.property;
const propertyimages = db.propertyimages;
const propertyfacility = db.propertyfacility;
const room = db.room;

module.exports = {
    updateProperty: async(req, res) => {
        const t = await db.sequelize.transaction();
        const propertyId = Number(req.params.id);
        const {propertyName, propertyDescription, city, address, status, categoryId, propertyRooms, facilities } = req.body;
        const images = req?.files?.images;

        if(!propertyName || !propertyDescription || !city || !address || !categoryId || !propertyRooms) {
            return res.status(400).send({
                isError: true,
                message: 'bad request !',
                data: null
            })
        };

        try {
            const parsedFacility = JSON.parse(facilities);
            const parsedRooms = JSON.parse(propertyRooms);
            await property.update({
                name: propertyName,
                description: propertyDescription,
                city: city,
                address: address,
                status: status,
                categoryId: categoryId
            }, {
                where: {
                    id: propertyId
                },
                transaction: t
            });
            
            const prevRoom = await room.findAll({
                where: {
                    propertyId: propertyId
                }
            });

            const dataRoom = []
            for(let room of parsedRooms) {
                let temp = {...room};
                temp.propertyId = propertyId;
                temp.deleted = 'false';
                dataRoom.push(temp);
            };

            const deletedRoom = [];
            for(let room of prevRoom) {
                let deleted = true;
                for(let i of parsedRooms) {
                    if(room?.id === i?.id) {
                        deleted = false;
                        break;
                    }
                };
                if(deleted) {
                    deletedRoom.push(room.id);
                }
            };
            
            // Update Images
            const dataImage = [];
            const oldRows = [];
            const old = [];
            
            if(images) {
                for(let image of images) {
                    dataImage.push({
                        url: `${process.env.API_IMG_LINK}/Property/${image.filename}`,
                        propertyId: propertyId
                    })
                };

                const prevImages = await propertyimages.findAll({
                    where: {
                        propertyId: propertyId
                    }
                });

                for(let image of prevImages) {
                    oldRows.push(image.id);
                    //unnecessary if statement for production. Delete it if you want
                    if(image.url.split(`${process.env.API_IMG_LINK}/`)[1]) {
                        old.push({path: 'src/Public/' + image.url.split(`${process.env.API_IMG_LINK}/`)[1]})
                    }
                }
    
                await propertyimages.bulkCreate(dataImage, {transaction: t});
                if(oldRows?.length > 0) {
                    await propertyimages.destroy({where: {id: oldRows}}, {transaction: t})
                }
            }


            const prevFacility = await propertyfacility.findAll({
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
            
            await propertyfacility.bulkCreate(dataFacility, {transaction: t});
            if(deletedFacility?.length > 0) {
                await propertyfacility.destroy({where: {id: deletedFacility}}, {transaction: t})
            }
            
            await room.bulkCreate(dataRoom, {
                updateOnDuplicate: ['name', 'description', 'stock', 'capacity', 'price'],
                transaction: t
            });
            if(deletedRoom?.length > 0) {
                await room.update({deleted: 'true'}, {where: {id: deletedRoom}});
            }
            
            await t.commit();

            if(old.length > 0) {
                deleteFiles(old)
            }

            return res.status(201).send({
                isError: false,
                message: 'Changes saved !',
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
