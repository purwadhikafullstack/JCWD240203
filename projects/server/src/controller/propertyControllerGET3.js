const { Op } = require('sequelize');
const db = require('../models');
const property = db.property;
const propertyimages = db.propertyimages;
const propertyfacility = db.propertyfacility;
const facility = db.facility;
const category = db.category;
const price = db.price;
const room = db.room;

module.exports = {
    getPropertyDetail: async(req, res) => {
        try {
            const propertyId = req.params.propertyId;
            const userId = req.params.id;

            const priceFilter = {
                [Op.and]: db.sequelize.where(db.sequelize.fn('year',db.sequelize.col('rooms.prices.start')), new Date().getFullYear()),      
                [Op.or]: [
                    {
                        start: {[Op.gte]: new Date()}
                    },
                    {
                        end: {[Op.gte]: new Date()}
                    }
                ]
            };

            let result = await property.findOne({
                include: [
                    { 
                        model: propertyfacility,
                        include: [{model: facility}]
                    },
                    { 
                        model: room,
                        include: [
                            {
                                model: price,
                                where: priceFilter,
                                required: false
                            }
                        ],
                        where: {deleted: 'false'}
                    },
                    { model: category },
                    { model: propertyimages }
                ],
                where: {
                    id: propertyId,
                    userId: userId,
                    [Op.or]: [{status: 'Public'}, {status: 'Private'}]
                },
                order: [
                    [{model: propertyimages} ,'id', 'ASC']
                ],
            });

            if(!result) {
                return res.status(404).send({
                    isError: true,
                    message: 'not found !',
                    data: null
                })
            }

            return res.status(200).send({
                isError: true,
                message: 'GET Success !',
                data: result
            });
        }
        catch(error) {
            return res.status(500).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    },
}