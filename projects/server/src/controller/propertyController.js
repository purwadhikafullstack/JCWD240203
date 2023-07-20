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
            const startDate = (!isNaN(new Date(req.query.start)))? new Date(req.query.start) : new Date();
            const endDate = (!isNaN(new Date(req.query.end)))? new Date(req.query.end) : new Date();
            const { limit, page } = req.query;

            const locationFilter = {
                    city: (location)? location : {[Op.like]: '%%'}
            };
            let transactionFilter = {
                status: 'completed',
                [Op.and]: [{
                    checkIn: {[Op.lte]: startDate},
                    checkOut: {[Op.gt]: endDate}
                }]
            };
            
            if(startDate > endDate) {
                delete transactionFilter[Op.and][0].checkIn;
                transactionFilter[Op.and][0].checkOut[Op.gt] = startDate;
            }

            let result = await property.findAndCountAll({
                include: [
                    {
                        model: room,
                        include: [
                            {
                                model: transaction,
                                where: transactionFilter,
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
                where: locationFilter,
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
    },
    getUserProperty: async(req, res) => {
        try {
            const id = req.params.id;

            const result = await property.findAll({
                include: [
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
                where: {
                    userId: id
                }
            })

            return res.status(200).send({
                isError: true,
                message: 'GET Success !',
                data: result
            })
        }
        catch(error) {
            return res.status(500).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    }
}