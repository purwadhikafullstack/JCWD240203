const db = require('../../models');
const { Op } = require('sequelize');
const { Sequelize } = require('sequelize')
const property = db.property;
const propertyImages = db.propertyImages;
const category = db.category;
const room = db.room;
const review = db.review;
const transaction = db.transaction;
const user = db.user

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

            result.rows = result.rows.map((property) => {
                let parsed = JSON.parse(JSON.stringify(property, null, 2))
                let temp = 0;
                property.reviews.forEach((review) => {
                    temp += review.rating;
                })
                temp /= property.reviews.length;
                parsed.average = temp;
                return parsed;
            })
            
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
    propertyDetailed: async(req, res) => {
        try {
            const id = req.params.id;
            const startDate = (!isNaN(new Date(req.query.start)))? new Date(req.query.start) : new Date();
            const endDate = (!isNaN(new Date(req.query.end)))? new Date(req.query.end) : new Date();

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
            let result = await property.findOne({
                include: [
                    {
                        model: room,
                    },
                    {
                        model: transaction,
                        where: transactionFilter,
                        required: false
                    },
                    {
                        model: review,
                        include: [
                            {
                                model: user,
                                attributes: ['id', 'username', 'email', 'desc', 'phoneNumber', 'gender', 'birthDate', 'profilePicture', 'idCard', 'status']
                            }
                        ]
                    },
                    {
                        model: propertyImages
                    },
                    {
                        model: user,
                        attributes: ['id', 'username', 'email', 'desc', 'phoneNumber', 'gender', 'birthDate', 'profilePicture', 'idCard', 'status']
                    }
                ],
                where: {
                    id: id
                },
                order: [
                    [{model: propertyImages} ,'id', 'ASC']
                ],
            })
            result = JSON.parse(JSON.stringify(result, null, 2));

            result.rooms = result.rooms.filter((room) => {
                let temp = 0;
                for(let transaction of result.transactions) {
                    temp += JSON.parse(JSON.stringify(transaction, null, 2)).stock
                    if(temp >= room.stock) {break};
                }
                if(room.stock > temp) {return room}; 
            });

            let temp = 0;
            if(result.reviews.length > 0) {
                result.reviews.forEach((review) => {
                    temp += review.rating;
                })
                temp /= result.reviews.length;
            }
            result.average = temp;

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