const db = require('../../models');
const { Op } = require('sequelize');
const { Sequelize } = require('sequelize')
const property = db.property;
const propertyImages = db.propertyImages;
const category = db.category;
const room = db.room;
const review = db.review;
const transaction = db.transaction;

module.exports = {
    getProperty: async(req, res) => {
        try {
            const location = req.query.location || ''
            const startDate = new Date(req.query.start).getTime()|| Date.now();
            const endDate = req.query.end || '';
            const { limit, page } = req.query;

            const { where } = {
                where: {
                    city: (location)? location : {[Op.like]: '%%'}
                }
            }

            let result = await property.findAndCountAll({
                include: [
                    {
                        model: room,
                        include: [
                            {
                                model: transaction,
                                where: {
                                    status: 'completed',
                                    [Op.and]: [{
                                        checkIn: {[Op.lte]: Sequelize.fn('NOW')},
                                        checkOut: {[Op.gte]: Sequelize.fn('NOW')}
                                    }]
                                },
                                required: false
                            }
                        ],
                        where: {
                            stock: {
                                [Op.gt]: 0
                            }
                        }
                    },
                    {
                        model: propertyImages
                    },
                    {
                        model: category
                    },
                    {
                        model: review
                    }
                ],
                order: [
                    ['rooms', 'price', 'ASC'],
                    ['propertyImages','id', 'ASC']
                ],
                limit: limit*page || 5,
                where,
                distinct: true
            });

            result.rows = result.rows.filter((property) => {
                filteredRoom = property.rooms.filter((room) => {
                    let temp = 0;
                    for(let transaction of room.transactions) {
                        temp += JSON.parse(JSON.stringify(transaction, null, 2)).stock
                        if(temp >= room.stock) {break};
                    }
                    if(room.stock > temp) {return room}; 
                })
                if(filteredRoom.length > 0) {return property}
                else {result.count -= 1}
            });
            
            return res.status(200).send({
                isError: true,
                message: 'data fetched !',
                data: result
            });
        }
        catch(error) {
            return res.status(500).send({
                isError: true,
                message: error.message,
                data: null
            });
        }
    }
}